"""
Expanded Pilot: 100 Account Selection and Enrichment

Selection Strategy:
- 100 accounts distributed across industries and score tiers
- Industry distribution based on TMS fit and logistics complexity
- Score tiers: 20% (100+), 30% (80-99), 30% (60-79), 20% (40-59)

Enrichment Strategy (Optimized based on 10-account pilot):
- Core: Find People from Company (1 credit)
- Core: Supply Chain Priorities via Perplexity (1 credit)
- Trigger: Company Recent News (2 credits)
- Tech: Tech Stack (2 credits) - reduced priority

Total: ~600 credits for 100 accounts (vs 72,438 available)
"""

import pandas as pd
import requests
import json
import time
import os
from datetime import datetime

# BitScale webhook URL
WEBHOOK_URL = "https://api.bitscale.ai/api/source/webhook/pull/36e69c11-e8e5-4fc5-b974-dfcdffd98c31"

# Industry targets for 100 accounts
INDUSTRY_TARGETS = {
    'Chemicals & Petrochemicals': 15,
    'Steel & Metals': 15,
    'FMCG & Consumer': 15,
    'Auto & Engineering': 15,
    'Mining & Minerals': 10,
    'Building & Construction': 10,
    'Energy & Fuel': 10,
    'Agriculture & Food': 10
}

# Score tier distribution
TIER_DISTRIBUTION = {
    'tier_a': {'min': 100, 'max': 200, 'pct': 0.20},  # 20 accounts
    'tier_b': {'min': 80, 'max': 99, 'pct': 0.30},    # 30 accounts
    'tier_c': {'min': 60, 'max': 79, 'pct': 0.30},    # 30 accounts
    'tier_d': {'min': 40, 'max': 59, 'pct': 0.20}     # 20 accounts
}


def select_diverse_accounts(input_file: str, n_accounts: int = 100) -> pd.DataFrame:
    """
    Select diverse accounts across industries and score tiers.
    """
    df = pd.read_csv(input_file)

    if 'tier0_score' not in df.columns:
        print("ERROR: tier0_score column not found")
        return None

    # Remove duplicates by company name
    df = df.drop_duplicates(subset=['Company'], keep='first')

    selected = []

    print(f"\n=== Selecting {n_accounts} Diverse Accounts ===\n")

    for industry, target in INDUSTRY_TARGETS.items():
        industry_df = df[df['Category'] == industry].copy()

        if len(industry_df) == 0:
            print(f"  {industry}: 0 available, skipping")
            continue

        # Calculate per-tier allocation for this industry
        tier_allocation = {
            'tier_a': int(target * 0.20),
            'tier_b': int(target * 0.30),
            'tier_c': int(target * 0.30),
            'tier_d': int(target * 0.20)
        }

        industry_selected = []

        for tier_name, alloc in tier_allocation.items():
            tier_config = TIER_DISTRIBUTION[tier_name]
            tier_df = industry_df[
                (industry_df['tier0_score'] >= tier_config['min']) &
                (industry_df['tier0_score'] <= tier_config['max'])
            ]

            # Take up to allocation, sorted by score descending
            tier_selection = tier_df.nlargest(alloc, 'tier0_score')
            industry_selected.append(tier_selection)

        # Combine and add to main selection
        if industry_selected:
            combined = pd.concat(industry_selected, ignore_index=True)
            # If we got fewer than target, try to fill from any tier
            if len(combined) < target:
                remaining = target - len(combined)
                already_selected = combined['Company'].tolist()
                extras = industry_df[~industry_df['Company'].isin(already_selected)].head(remaining)
                combined = pd.concat([combined, extras], ignore_index=True)

            selected.append(combined)
            print(f"  {industry}: {len(combined)} accounts selected")

    # Combine all
    final_df = pd.concat(selected, ignore_index=True)

    # Remove any remaining duplicates
    final_df = final_df.drop_duplicates(subset=['Company'], keep='first')

    print(f"\n=== Selection Summary ===")
    print(f"Total selected: {len(final_df)} accounts")
    print(f"\nScore Distribution:")
    print(f"  Score >= 100: {len(final_df[final_df['tier0_score'] >= 100])}")
    print(f"  Score 80-99:  {len(final_df[(final_df['tier0_score'] >= 80) & (final_df['tier0_score'] < 100)])}")
    print(f"  Score 60-79:  {len(final_df[(final_df['tier0_score'] >= 60) & (final_df['tier0_score'] < 80)])}")
    print(f"  Score 40-59:  {len(final_df[(final_df['tier0_score'] >= 40) & (final_df['tier0_score'] < 60)])}")

    print(f"\nIndustry Distribution:")
    print(final_df['Category'].value_counts().to_string())

    return final_df


def push_accounts_to_bitscale(df: pd.DataFrame, batch_size: int = 50) -> dict:
    """
    Push accounts to BitScale webhook.
    """
    columns_to_send = [
        'Company', 'Category', 'Segment', 'Sub_Segment', 'Account_Type',
        'HQ', 'Key_Locations', 'Sales_Rs_Cr', 'Employees',
        'Total_Logistics_Spend_Rs_Cr', 'Priority', 'tier0_score', 'tier0_tier'
    ]

    available_cols = [c for c in columns_to_send if c in df.columns]

    results = {'success': 0, 'failed': 0, 'errors': []}

    print(f"\n=== Pushing {len(df)} accounts to BitScale ===\n")

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

        try:
            response = requests.post(
                WEBHOOK_URL,
                json=record,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )

            if response.status_code in [200, 201, 202]:
                results['success'] += 1
                print(f"  [{results['success']:3d}] OK: {company}")
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

        # Progress update
        if (results['success'] + results['failed']) % batch_size == 0:
            print(f"\n  Progress: {results['success'] + results['failed']}/{len(df)}")
            print(f"  Success: {results['success']}, Failed: {results['failed']}\n")

        # Rate limiting
        time.sleep(0.15)

    print(f"\n=== Push Complete ===")
    print(f"Success: {results['success']}")
    print(f"Failed: {results['failed']}")

    return results


def main():
    import argparse
    parser = argparse.ArgumentParser(description='Expanded 100-account pilot')
    parser.add_argument('--action', choices=['select', 'push', 'both'], default='select',
                        help='Action: select accounts, push to BitScale, or both')
    parser.add_argument('--input', default='tiered_output/tier0_all_scored.csv',
                        help='Input CSV file')
    parser.add_argument('--output-dir', default='tiered_output/expanded_pilot',
                        help='Output directory')
    parser.add_argument('--n-accounts', type=int, default=100,
                        help='Number of accounts to select')

    args = parser.parse_args()

    # Setup paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, args.input)
    output_dir = os.path.join(script_dir, args.output_dir)
    os.makedirs(output_dir, exist_ok=True)

    if args.action in ['select', 'both']:
        # Select diverse accounts
        pilot_df = select_diverse_accounts(input_path, args.n_accounts)

        if pilot_df is not None and len(pilot_df) > 0:
            # Save selection
            output_path = os.path.join(output_dir, 'expanded_pilot_100_accounts.csv')
            pilot_df.to_csv(output_path, index=False)
            print(f"\nSaved to: {output_path}")

            # Print top accounts
            print(f"\n=== Top 20 Selected Accounts ===")
            top20 = pilot_df.nlargest(20, 'tier0_score')[['Company', 'Category', 'tier0_score', 'Total_Logistics_Spend_Rs_Cr']]
            print(top20.to_string(index=False))

    if args.action in ['push', 'both']:
        # Load selected accounts
        pilot_path = os.path.join(output_dir, 'expanded_pilot_100_accounts.csv')

        if not os.path.exists(pilot_path):
            print(f"ERROR: {pilot_path} not found. Run --action select first.")
            return

        pilot_df = pd.read_csv(pilot_path)

        # Push to BitScale
        results = push_accounts_to_bitscale(pilot_df)

        # Save results
        results_path = os.path.join(output_dir, f'push_results_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json')
        with open(results_path, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nResults saved: {results_path}")

        print(f"""
=== Next Steps ===
1. Go to BitScale: https://app.bitscale.ai
2. Open your webhook grid
3. Add enrichment columns (in order of priority):

   HIGH PRIORITY:
   - Find People from Company (1 credit) - Decision makers
   - Perplexity -> Supply Chain Priorities (1 credit) - Custom prompt

   MEDIUM PRIORITY:
   - Company Recent News (2 credits) - Trigger events

   LOWER PRIORITY:
   - Tech Stack (2 credits) - Limited TMS insight

4. Run enrichments on all rows
5. Export and analyze results
""")


if __name__ == '__main__':
    main()
