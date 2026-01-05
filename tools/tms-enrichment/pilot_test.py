"""
Pilot Test: End-to-end TMS buyer enrichment workflow with 20 accounts

Strategy:
1. Select 20 diverse accounts across score spectrum
2. Push to BitScale webhook
3. Enrich with: Website (1) + Tech Stack (2) + Jobs (2) = 5 credits each
4. Score based on signals
5. Validate and refine

Total pilot cost: 20 × 5 = 100 credits (vs 72,537 available)
"""

import pandas as pd
import requests
import json
import time
import os
from datetime import datetime

# BitScale webhook URL
WEBHOOK_URL = "https://api.bitscale.ai/api/source/webhook/pull/36e69c11-e8e5-4fc5-b974-dfcdffd98c31"

# TMS-related keywords for job signal detection
LOGISTICS_JOB_KEYWORDS = [
    'logistics', 'supply chain', 'transportation', 'fleet',
    'warehouse', 'distribution', 'freight', 'shipping',
    'procurement', 'sourcing', 'inventory', 'planning'
]

IT_JOB_KEYWORDS = [
    'it manager', 'technology', 'digital transformation',
    'software', 'erp', 'systems', 'automation'
]

# TMS vendors to detect (if present = competitor displacement needed)
TMS_VENDORS = [
    'sap tm', 'sap transportation', 'oracle transportation',
    'manhattan associates', 'blue yonder', 'jda', 'e2open',
    'descartes', 'mercurygate', 'trimble', 'omnitracs',
    'transporeon', 'fourkites', 'project44'
]

# ERP vendors (presence = enterprise buyer, integration ready)
ERP_VENDORS = [
    'sap', 'oracle', 'microsoft dynamics', 'netsuite',
    'infor', 'epicor', 'sage', 'tally'
]


def select_pilot_accounts(input_file: str, n_accounts: int = 20) -> pd.DataFrame:
    """
    Select diverse accounts for pilot test.

    Selection strategy:
    - 5 accounts from top scores (100+)
    - 5 accounts from high scores (80-99)
    - 5 accounts from medium scores (60-79)
    - 5 accounts from lower scores (40-59)
    """
    df = pd.read_csv(input_file)

    # Ensure we have tier0_score
    if 'tier0_score' not in df.columns:
        print("ERROR: tier0_score column not found. Run tier0_prefilter.py first.")
        return None

    # Select from each score band
    top = df[df['tier0_score'] >= 100].head(5)
    high = df[(df['tier0_score'] >= 80) & (df['tier0_score'] < 100)].head(5)
    medium = df[(df['tier0_score'] >= 60) & (df['tier0_score'] < 80)].head(5)
    lower = df[(df['tier0_score'] >= 40) & (df['tier0_score'] < 60)].head(5)

    pilot = pd.concat([top, high, medium, lower], ignore_index=True)

    print(f"\n=== Pilot Account Selection ===")
    print(f"Top tier (100+): {len(top)} accounts")
    print(f"High tier (80-99): {len(high)} accounts")
    print(f"Medium tier (60-79): {len(medium)} accounts")
    print(f"Lower tier (40-59): {len(lower)} accounts")
    print(f"Total pilot accounts: {len(pilot)}")

    print(f"\n=== Selected Accounts ===")
    display_cols = ['Company', 'Category', 'Total_Logistics_Spend_Rs_Cr', 'Employees', 'tier0_score']
    available_cols = [c for c in display_cols if c in pilot.columns]
    print(pilot[available_cols].to_string(index=False))

    return pilot


def push_single_record(record: dict) -> dict:
    """Push a single record to BitScale webhook and return response."""
    try:
        response = requests.post(
            WEBHOOK_URL,
            json=record,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        return {
            'success': response.status_code in [200, 201, 202],
            'status_code': response.status_code,
            'response': response.text[:200] if response.text else ''
        }
    except Exception as e:
        return {
            'success': False,
            'status_code': 0,
            'error': str(e)
        }


def push_pilot_accounts(df: pd.DataFrame) -> dict:
    """Push pilot accounts to BitScale webhook."""

    # Prepare records
    columns_to_send = [
        'Company', 'Category', 'Segment', 'Sub_Segment', 'Account_Type',
        'HQ', 'Key_Locations', 'Sales_Rs_Cr', 'Employees',
        'Total_Logistics_Spend_Rs_Cr', 'Priority', 'tier0_score'
    ]
    available_cols = [c for c in columns_to_send if c in df.columns]

    results = {'success': 0, 'failed': 0, 'details': []}

    print(f"\n=== Pushing {len(df)} accounts to BitScale ===")

    for i, row in df.iterrows():
        record = {}
        for col in available_cols:
            val = row[col]
            if pd.isna(val):
                record[col] = ''
            elif isinstance(val, float):
                record[col] = int(val) if val == int(val) else val
            else:
                record[col] = val

        company = record.get('Company', f'Record {i}')
        result = push_single_record(record)

        if result['success']:
            results['success'] += 1
            print(f"  [OK] {company}")
        else:
            results['failed'] += 1
            print(f"  [FAIL] {company}: {result.get('status_code')} - {result.get('response', result.get('error', ''))[:50]}")

        results['details'].append({
            'company': company,
            **result
        })

        time.sleep(0.2)  # Rate limiting

    print(f"\nPush complete: {results['success']} success, {results['failed']} failed")
    return results


def calculate_signal_score(row: dict) -> dict:
    """
    Calculate signal score based on enriched data.

    Expected enrichment columns from BitScale:
    - tech_stack: Technologies detected on website
    - active_jobs: Current job openings

    Returns dict with score breakdown.
    """
    scores = {
        'tech_stack_score': 0,
        'job_signal_score': 0,
        'total_signal_score': 0,
        'signals_detected': []
    }

    # Tech stack analysis
    tech_stack = str(row.get('tech_stack', '')).lower()
    if tech_stack and tech_stack != 'nan':
        # Check for existing TMS (negative signal)
        has_tms = any(tms in tech_stack for tms in TMS_VENDORS)
        if has_tms:
            scores['tech_stack_score'] -= 50
            scores['signals_detected'].append('HAS_EXISTING_TMS')
        else:
            # No TMS = greenfield opportunity
            scores['tech_stack_score'] += 40
            scores['signals_detected'].append('NO_TMS_GREENFIELD')

        # Check for ERP (positive - enterprise buyer)
        has_erp = any(erp in tech_stack for erp in ERP_VENDORS)
        if has_erp and not has_tms:
            scores['tech_stack_score'] += 30
            scores['signals_detected'].append('HAS_ERP_NO_TMS')

    # Job posting analysis
    jobs = str(row.get('active_jobs', '')).lower()
    if jobs and jobs != 'nan':
        # Logistics/SCM hiring
        logistics_hiring = any(kw in jobs for kw in LOGISTICS_JOB_KEYWORDS)
        if logistics_hiring:
            scores['job_signal_score'] += 40
            scores['signals_detected'].append('LOGISTICS_HIRING')

        # IT/Digital hiring
        it_hiring = any(kw in jobs for kw in IT_JOB_KEYWORDS)
        if it_hiring:
            scores['job_signal_score'] += 20
            scores['signals_detected'].append('IT_HIRING')

    scores['total_signal_score'] = scores['tech_stack_score'] + scores['job_signal_score']
    return scores


def analyze_pilot_results(enriched_file: str, original_df: pd.DataFrame) -> pd.DataFrame:
    """
    Analyze enriched pilot results and calculate final scores.
    """
    enriched = pd.read_csv(enriched_file)

    # Merge with original scores
    if 'tier0_score' in original_df.columns:
        enriched = enriched.merge(
            original_df[['Company', 'tier0_score']],
            on='Company',
            how='left'
        )

    # Calculate signal scores
    print("\n=== Analyzing Enriched Data ===")

    results = []
    for _, row in enriched.iterrows():
        signal_scores = calculate_signal_score(row.to_dict())

        tier0 = row.get('tier0_score', 0) or 0
        total = tier0 + signal_scores['total_signal_score']

        # Determine final tier
        if total >= 100:
            tier = 'HOT'
        elif total >= 70:
            tier = 'WARM'
        elif total >= 40:
            tier = 'NURTURE'
        else:
            tier = 'COLD'

        results.append({
            'Company': row.get('Company'),
            'Category': row.get('Category'),
            'tier0_score': tier0,
            'tech_stack_score': signal_scores['tech_stack_score'],
            'job_signal_score': signal_scores['job_signal_score'],
            'total_signal_score': signal_scores['total_signal_score'],
            'final_score': total,
            'final_tier': tier,
            'signals': ', '.join(signal_scores['signals_detected']),
            'tech_stack_raw': row.get('tech_stack', '')[:100],
            'jobs_raw': row.get('active_jobs', '')[:100]
        })

    results_df = pd.DataFrame(results)

    # Print summary
    print("\n=== Pilot Results Summary ===")
    print(results_df[['Company', 'tier0_score', 'total_signal_score', 'final_score', 'final_tier', 'signals']].to_string(index=False))

    print("\n=== Tier Distribution ===")
    print(results_df['final_tier'].value_counts())

    return results_df


def main():
    import argparse
    parser = argparse.ArgumentParser(description='Pilot test for TMS buyer enrichment')
    parser.add_argument('--action', choices=['select', 'push', 'analyze'], required=True,
                        help='Action to perform')
    parser.add_argument('--input', default='tiered_output/tier0_all_scored.csv',
                        help='Input file for account selection')
    parser.add_argument('--enriched', help='Enriched CSV file for analysis')
    parser.add_argument('--output-dir', default='tiered_output/pilot',
                        help='Output directory')

    args = parser.parse_args()
    os.makedirs(args.output_dir, exist_ok=True)

    if args.action == 'select':
        # Select pilot accounts
        input_path = args.input
        if not os.path.isabs(input_path):
            input_path = os.path.join(os.path.dirname(__file__), input_path)

        pilot_df = select_pilot_accounts(input_path, n_accounts=20)

        if pilot_df is not None:
            output_path = os.path.join(args.output_dir, 'pilot_accounts.csv')
            pilot_df.to_csv(output_path, index=False)
            print(f"\nSaved pilot accounts to: {output_path}")

            print(f"\n=== Next Steps ===")
            print(f"1. Run: python pilot_test.py --action push")
            print(f"2. Go to BitScale and add enrichment columns")
            print(f"3. Run enrichments and export CSV")
            print(f"4. Run: python pilot_test.py --action analyze --enriched <exported_file.csv>")

    elif args.action == 'push':
        # Push pilot accounts to BitScale
        pilot_path = os.path.join(args.output_dir, 'pilot_accounts.csv')
        if not os.path.exists(pilot_path):
            print(f"ERROR: Pilot accounts file not found: {pilot_path}")
            print("Run --action select first")
            return

        pilot_df = pd.read_csv(pilot_path)
        results = push_pilot_accounts(pilot_df)

        # Save push results
        results_path = os.path.join(args.output_dir, 'push_results.json')
        with open(results_path, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved push results to: {results_path}")

        print(f"\n=== Next Steps ===")
        print(f"1. Go to BitScale: https://app.bitscale.ai")
        print(f"2. Open the webhook grid")
        print(f"3. Add enrichment columns:")
        print(f"   - Google -> Company Website Link (1 credit)")
        print(f"   - BuiltWith -> Tech Stack (2 credits)")
        print(f"   - LinkedIn -> Active Jobs (2 credits)")
        print(f"4. Click column play buttons to run enrichments")
        print(f"5. Export as CSV when done")
        print(f"6. Run: python pilot_test.py --action analyze --enriched <exported_file.csv>")

    elif args.action == 'analyze':
        if not args.enriched:
            print("ERROR: --enriched file required for analyze action")
            return

        # Load original pilot data for tier0 scores
        pilot_path = os.path.join(args.output_dir, 'pilot_accounts.csv')
        pilot_df = pd.read_csv(pilot_path) if os.path.exists(pilot_path) else pd.DataFrame()

        results_df = analyze_pilot_results(args.enriched, pilot_df)

        # Save results
        output_path = os.path.join(args.output_dir, f'pilot_results_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv')
        results_df.to_csv(output_path, index=False)
        print(f"\nSaved analysis results to: {output_path}")


if __name__ == '__main__':
    main()
