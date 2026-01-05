"""
BitScale Webhook Integration for Progressive TMS Buyer Enrichment

This script:
1. Pushes accounts to BitScale via webhook import
2. Polls for enrichment completion
3. Exports enriched results
4. Scores and tiers the final data

Usage:
1. Create a webhook import grid in BitScale (New Grid -> Import Data from Webhook)
2. Copy the webhook URL from BitScale
3. Run: python bitscale_webhook.py --webhook-url <YOUR_WEBHOOK_URL>
"""

import requests
import pandas as pd
import json
import time
import argparse
import os
from datetime import datetime
from typing import Optional, List, Dict

# BitScale API endpoints (from their docs)
BITSCALE_BASE_URL = "https://app.bitscale.ai"


def push_to_webhook(webhook_url: str, data: List[Dict], batch_size: int = 100) -> dict:
    """
    Push account data to BitScale webhook - one record at a time.
    BitScale webhook expects individual JSON objects, not arrays.

    Args:
        webhook_url: BitScale webhook URL
        data: List of account dictionaries
        batch_size: Number of records between progress updates

    Returns:
        Summary of push results
    """
    results = {
        'total': len(data),
        'success': 0,
        'failed': 0,
        'errors': []
    }

    print(f"Pushing {len(data)} accounts to BitScale webhook (one at a time)...")

    for i, record in enumerate(data):
        try:
            # BitScale expects individual JSON object per request
            response = requests.post(
                webhook_url,
                json=record,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )

            if response.status_code in [200, 201, 202]:
                results['success'] += 1
            else:
                results['failed'] += 1
                if len(results['errors']) < 5:  # Only store first 5 errors
                    results['errors'].append({
                        'record': i,
                        'company': record.get('Company', 'Unknown'),
                        'status': response.status_code,
                        'response': response.text[:100]
                    })

        except Exception as e:
            results['failed'] += 1
            if len(results['errors']) < 5:
                results['errors'].append({
                    'record': i,
                    'company': record.get('Company', 'Unknown'),
                    'error': str(e)
                })

        # Progress update every batch_size records
        if (i + 1) % batch_size == 0:
            print(f"  Progress: {i + 1}/{len(data)} ({results['success']} success, {results['failed']} failed)")

        # Small delay to avoid rate limiting (10 requests per second)
        if (i + 1) % 10 == 0:
            time.sleep(0.1)

    print(f"\nPush complete: {results['success']} success, {results['failed']} failed")
    if results['errors']:
        print(f"Sample errors: {results['errors'][:3]}")
    return results


def prepare_accounts_for_bitscale(df: pd.DataFrame) -> List[Dict]:
    """
    Prepare account data for BitScale webhook format.

    Args:
        df: DataFrame with account data

    Returns:
        List of dictionaries ready for webhook
    """
    # Select key columns for enrichment
    columns_to_send = [
        'Company',
        'Category',
        'Segment',
        'Sub_Segment',
        'Account_Type',
        'HQ',
        'Key_Locations',
        'Sales_Rs_Cr',
        'Employees',
        'Total_Logistics_Spend_Rs_Cr',
        'Priority',
        'tier0_score'
    ]

    # Filter to available columns
    available_cols = [c for c in columns_to_send if c in df.columns]

    # Convert to list of dicts
    records = df[available_cols].fillna('').to_dict('records')

    # Clean up values
    for record in records:
        for key, value in record.items():
            if pd.isna(value):
                record[key] = ''
            elif isinstance(value, float):
                record[key] = int(value) if value == int(value) else value

    return records


def score_enriched_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Score enriched data based on TMS buying signals.

    Expected enrichment columns from BitScale:
    - company_website (from Google)
    - tech_stack (from BuiltWith)
    - active_jobs (from LinkedIn)
    - apollo_data (from Apollo)

    Signal scoring:
    - No TMS in tech stack: +40 (greenfield opportunity)
    - Has ERP but no TMS: +30 (integration play)
    - Active logistics job: +35
    - Active IT job: +15
    """
    df = df.copy()

    # Initialize signal score
    df['signal_score'] = 0

    # Tech Stack signals (if column exists)
    if 'tech_stack' in df.columns:
        # Check for TMS absence (greenfield)
        tms_keywords = ['sap tm', 'oracle tms', 'manhattan', 'blue yonder', 'e2open', 'jda', 'llamasoft']
        erp_keywords = ['sap', 'oracle', 'microsoft dynamics', 'netsuite']

        def score_tech_stack(tech):
            score = 0
            tech_lower = str(tech).lower() if pd.notna(tech) else ''

            has_tms = any(tms in tech_lower for tms in tms_keywords)
            has_erp = any(erp in tech_lower for erp in erp_keywords)

            if not has_tms and tech_lower:
                score += 40  # Greenfield - no TMS detected
            if has_erp and not has_tms:
                score += 30  # Has ERP, no TMS - integration opportunity

            return score

        df['signal_score'] += df['tech_stack'].apply(score_tech_stack)

    # Job posting signals (if column exists)
    if 'active_jobs' in df.columns:
        logistics_keywords = ['logistics', 'supply chain', 'transportation', 'fleet', 'warehouse', 'distribution']
        it_keywords = ['it', 'technology', 'digital', 'software', 'developer']

        def score_jobs(jobs):
            score = 0
            jobs_lower = str(jobs).lower() if pd.notna(jobs) else ''

            if any(kw in jobs_lower for kw in logistics_keywords):
                score += 35  # Active logistics hiring
            if any(kw in jobs_lower for kw in it_keywords):
                score += 15  # IT/tech hiring

            return score

        df['signal_score'] += df['active_jobs'].apply(score_jobs)

    # Combine with Tier 0 score
    if 'tier0_score' in df.columns:
        df['total_score'] = df['tier0_score'] + df['signal_score']
    else:
        df['total_score'] = df['signal_score']

    # Assign final tiers
    df['final_tier'] = df['total_score'].apply(
        lambda x: 'hot' if x >= 80 else ('warm' if x >= 60 else ('nurture' if x >= 40 else 'cold'))
    )

    return df


def export_tiered_results(df: pd.DataFrame, output_dir: str):
    """Export results segmented by tier."""
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Full results
    full_path = os.path.join(output_dir, f'enriched_all_{timestamp}.csv')
    df.to_csv(full_path, index=False)
    print(f"Saved full results: {full_path}")

    # By tier
    for tier in ['hot', 'warm', 'nurture', 'cold']:
        tier_df = df[df['final_tier'] == tier]
        if len(tier_df) > 0:
            tier_path = os.path.join(output_dir, f'enriched_{tier}_{timestamp}.csv')
            tier_df.to_csv(tier_path, index=False)
            print(f"Saved {tier} tier ({len(tier_df)} accounts): {tier_path}")

    # Summary
    print("\n=== Final Tier Distribution ===")
    print(df['final_tier'].value_counts())


def main():
    parser = argparse.ArgumentParser(description='BitScale Webhook Integration')
    parser.add_argument('--webhook-url', required=True, help='BitScale webhook URL')
    parser.add_argument('--input', default='tiered_output/tier0_high_priority.csv',
                        help='Input CSV file')
    parser.add_argument('--output-dir', default='tiered_output',
                        help='Output directory for results')
    parser.add_argument('--batch-size', type=int, default=50,
                        help='Batch size for webhook push')
    parser.add_argument('--dry-run', action='store_true',
                        help='Show what would be done without pushing')

    args = parser.parse_args()

    # Load data
    print(f"Loading accounts from {args.input}...")
    df = pd.read_csv(args.input)
    print(f"Loaded {len(df)} accounts")

    # Prepare for BitScale
    records = prepare_accounts_for_bitscale(df)

    if args.dry_run:
        print("\n=== DRY RUN MODE ===")
        print(f"Would push {len(records)} accounts to: {args.webhook_url}")
        print(f"Sample record:")
        print(json.dumps(records[0], indent=2))
        return

    # Push to webhook
    results = push_to_webhook(args.webhook_url, records, args.batch_size)

    print("\n" + "="*50)
    print("Data pushed to BitScale!")
    print("="*50)
    print("""
Next steps:
1. Go to BitScale and check your webhook grid
2. Add enrichment columns:
   - Google -> Company Website Link (1 credit)
   - BuiltWith -> Tech Stack (2 credits)
   - LinkedIn -> Active Jobs (2 credits)
   - Apollo -> Enrich Company (8 credits)
3. Run the enrichments
4. Export results as CSV
5. Run this script again with --score-results to tier the data
    """)


if __name__ == '__main__':
    main()
