"""
Push qualified accounts to BitScale for Find People enrichment.
Updated to include customer flags and role queries.
"""

import pandas as pd
import requests
import json
import time
from datetime import datetime
import sys
from pathlib import Path

# BitScale webhook URL
WEBHOOK_URL = "https://api.bitscale.ai/api/source/webhook/pull/36e69c11-e8e5-4fc5-b974-dfcdffd98c31"

# Role queries for contact enrichment
ROLE_QUERIES = {
    'logistics_supply_chain': ['VP Logistics', 'VP Supply Chain', 'Director Logistics'],
    'procurement': ['VP Procurement', 'CPO', 'Director Procurement'],
    'finance': ['CFO', 'VP Finance', 'Finance Director'],
    'digital_transformation': ['CDO', 'VP Digital Transformation'],
    'it_technology': ['CIO', 'CTO', 'VP IT'],
    'operations': ['COO', 'VP Operations', 'Director Operations'],
    'sustainability': ['CSO', 'VP Sustainability', 'Head Sustainability'],
    'fleet_transport': ['Fleet Manager', 'Transport Manager']
}


def build_sales_nav_query(company_name, role_category):
    """Build Sales Navigator query for a role."""
    if role_category not in ROLE_QUERIES:
        return ''
    titles = ROLE_QUERIES[role_category]
    title_query = ' OR '.join([f'"{t}"' for t in titles])
    return f'Current company: "{company_name}" AND Title: ({title_query})'


def push_accounts(input_file: str, batch_size: int = 100):
    """Push accounts to BitScale webhook."""

    df = pd.read_csv(input_file)

    # Columns to send (including customer flags)
    columns_to_send = [
        'Company', 'Category', 'Segment', 'Sub_Segment', 'Account_Type',
        'HQ', 'Key_Locations', 'Sales_Rs_Cr', 'Employees',
        'Total_Logistics_Spend_Rs_Cr', 'tier0_score', 'final_tier',
        'website_url', 'linkedin_url', 'has_trigger_news',
        # Customer flags - CRITICAL for outreach safety
        'is_existing_customer', 'outreach_status', 'matched_with'
    ]

    available_cols = [c for c in columns_to_send if c in df.columns]

    results = {'success': 0, 'failed': 0, 'errors': []}
    total = len(df)

    print(f"\n=== Pushing {total} accounts to BitScale ===\n")
    print(f"Webhook: {WEBHOOK_URL[:50]}...")
    print(f"Columns: {len(available_cols)}")
    print()

    for idx, row in df.iterrows():
        record = {}
        for col in available_cols:
            val = row[col]
            if pd.isna(val):
                record[col] = ''
            elif isinstance(val, float):
                if val != val or val == float('inf') or val == float('-inf'):
                    record[col] = ''
                else:
                    record[col] = int(val) if val == int(val) else val
            elif isinstance(val, bool):
                record[col] = val
            else:
                record[col] = str(val)

        company = record.get('Company', f'Record {idx}')

        # Add role queries for contact enrichment
        for role in ROLE_QUERIES.keys():
            record[f'query_{role}'] = build_sales_nav_query(company, role)

        try:
            response = requests.post(
                WEBHOOK_URL,
                json=record,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )

            if response.status_code in [200, 201, 202]:
                results['success'] += 1
                if results['success'] % 50 == 0:
                    print(f"  [{results['success']:4d}/{total}] Progress: {results['success']/total*100:.1f}%")
            else:
                results['failed'] += 1
                if len(results['errors']) < 10:
                    results['errors'].append({
                        'company': company,
                        'status': response.status_code,
                        'response': response.text[:100]
                    })
                print(f"  [FAIL] {company}: {response.status_code}")

        except Exception as e:
            results['failed'] += 1
            print(f"  [ERROR] {company}: {str(e)[:50]}")

        # Rate limiting
        time.sleep(0.1)

    print(f"\n=== Push Complete ===")
    print(f"Success: {results['success']}")
    print(f"Failed: {results['failed']}")

    # Save results
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    results_file = f"../tiered_output/full_enrichment/bitscale_push_{timestamp}.json"
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"Results saved: {results_file}")

    return results

if __name__ == '__main__':
    # Default to the latest SAFE_TO_CONTACT file
    base_dir = Path(__file__).parent.parent
    output_dir = base_dir / "tiered_output/full_enrichment"

    # Find latest SAFE_TO_CONTACT file
    safe_files = sorted(output_dir.glob("SAFE_TO_CONTACT_*.csv"), reverse=True)

    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    elif safe_files:
        input_file = str(safe_files[0])
        print(f"Using latest: {safe_files[0].name}")
    else:
        input_file = str(output_dir / 'qualified_for_bitscale.csv')

    push_accounts(input_file)
