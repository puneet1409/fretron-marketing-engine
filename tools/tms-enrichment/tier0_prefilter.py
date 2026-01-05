"""
Tier 0: Pre-filter CJ Darcl accounts using existing data (FREE - no API credits)

Scoring Model:
- Total_Logistics_Spend_Rs_Cr > 1000: +30 pts
- Total_Logistics_Spend_Rs_Cr > 500: +20 pts
- Total_Logistics_Spend_Rs_Cr > 100: +10 pts
- Sales_Rs_Cr > 100000: +15 pts
- Sales_Rs_Cr > 50000: +10 pts
- Employees > 1000: +15 pts
- Employees > 500: +10 pts
- Category in TMS-fit industries: +15 pts
- Account_Type = 'Expansion': +10 pts
- Has Priority marked: +20 pts

Pass threshold: Score >= 25 -> ~1000 accounts for Tier 1 enrichment
"""

import pandas as pd
import os
from pathlib import Path

# TMS-fit industries (high logistics complexity)
TMS_FIT_CATEGORIES = [
    'FMCG & Consumer',
    'Auto & Engineering',
    'Chemicals & Petrochemicals',
    'Steel & Metals',
    'Mining & Minerals',
    'Pharma & Healthcare',
    'Cement & Building Materials'
]

TMS_FIT_SEGMENTS = [
    'Food Grains Staples',
    'Fmcg Foods Personal Care',
    'Auto Oem',
    'Petrochemicals Polymers',
    'Non Ferrous Metals',
    'Mining Minerals',
    'Paints Coatings'
]


def calculate_tier0_score(row):
    """Calculate pre-filter score based on existing CJ Darcl data"""
    score = 0

    # Logistics Spend scoring (strongest signal for TMS need)
    logistics_spend = row.get('Total_Logistics_Spend_Rs_Cr', 0) or 0
    if logistics_spend > 1000:
        score += 30
    elif logistics_spend > 500:
        score += 20
    elif logistics_spend > 100:
        score += 10

    # Revenue scoring (ability to pay)
    sales = row.get('Sales_Rs_Cr', 0) or 0
    if sales > 100000:
        score += 15
    elif sales > 50000:
        score += 10
    elif sales > 10000:
        score += 5

    # Employee count (operational complexity)
    employees = row.get('Employees', 0) or 0
    if employees > 1000:
        score += 15
    elif employees > 500:
        score += 10
    elif employees > 100:
        score += 5

    # Industry fit
    category = row.get('Category', '') or ''
    if category in TMS_FIT_CATEGORIES:
        score += 15

    segment = row.get('Segment', '') or ''
    if segment in TMS_FIT_SEGMENTS:
        score += 5

    # Account type (Expansion = growth signal)
    account_type = row.get('Account_Type', '') or ''
    if account_type == 'Expansion':
        score += 10
    elif account_type == 'Penetration':
        score += 5

    # Priority flag (already vetted)
    priority = row.get('Priority', '') or ''
    if priority and str(priority).strip():
        score += 20

    # Multi-location bonus (complex logistics)
    key_locations = row.get('Key_Locations', '') or ''
    if key_locations:
        location_count = len(str(key_locations).split(','))
        if location_count >= 5:
            score += 10
        elif location_count >= 3:
            score += 5

    return score


def prefilter_accounts(input_file: str, output_dir: str, pass_threshold: int = 25):
    """
    Pre-filter accounts and segment into tiers based on existing data.

    Args:
        input_file: Path to CJ Darcl CSV
        output_dir: Directory to save filtered outputs
        pass_threshold: Minimum score to pass to Tier 1

    Returns:
        DataFrame with scores and tier assignments
    """
    print(f"Loading data from {input_file}...")
    df = pd.read_csv(input_file)
    print(f"Loaded {len(df)} accounts")

    # Calculate scores
    print("Calculating Tier 0 scores...")
    df['tier0_score'] = df.apply(calculate_tier0_score, axis=1)

    # Sort by score descending
    df = df.sort_values('tier0_score', ascending=False)

    # Assign preliminary tiers
    df['tier0_tier'] = df['tier0_score'].apply(
        lambda x: 'high_priority' if x >= 40 else ('medium_priority' if x >= 25 else 'low_priority')
    )

    # Statistics
    high_priority = len(df[df['tier0_tier'] == 'high_priority'])
    medium_priority = len(df[df['tier0_tier'] == 'medium_priority'])
    low_priority = len(df[df['tier0_tier'] == 'low_priority'])

    print(f"\n=== Tier 0 Pre-Filter Results ===")
    print(f"High Priority (score >= 40): {high_priority} accounts")
    print(f"Medium Priority (score 25-39): {medium_priority} accounts")
    print(f"Low Priority (score < 25): {low_priority} accounts")
    print(f"Total passing to Tier 1: {high_priority + medium_priority} accounts")

    # Score distribution
    print(f"\nScore Distribution:")
    print(f"  Max: {df['tier0_score'].max()}")
    print(f"  Min: {df['tier0_score'].min()}")
    print(f"  Mean: {df['tier0_score'].mean():.1f}")
    print(f"  Median: {df['tier0_score'].median()}")

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Save filtered outputs
    tier1_df = df[df['tier0_score'] >= pass_threshold].copy()
    tier1_output = os.path.join(output_dir, 'tier1_accounts.csv')
    tier1_df.to_csv(tier1_output, index=False)
    print(f"\nSaved {len(tier1_df)} accounts for Tier 1 enrichment: {tier1_output}")

    # Save high priority separately (for immediate action)
    high_df = df[df['tier0_tier'] == 'high_priority'].copy()
    high_output = os.path.join(output_dir, 'tier0_high_priority.csv')
    high_df.to_csv(high_output, index=False)
    print(f"Saved {len(high_df)} high-priority accounts: {high_output}")

    # Save full scored dataset
    full_output = os.path.join(output_dir, 'tier0_all_scored.csv')
    df.to_csv(full_output, index=False)
    print(f"Saved full scored dataset: {full_output}")

    # Print top 20 accounts
    print(f"\n=== Top 20 Accounts by Tier 0 Score ===")
    top20 = df.head(20)[['Company', 'Category', 'Total_Logistics_Spend_Rs_Cr', 'Sales_Rs_Cr', 'Employees', 'tier0_score']]
    print(top20.to_string(index=False))

    return df


if __name__ == '__main__':
    # Paths
    input_file = r'C:\Users\punee\Dev\fretron-marketing-engine\tools\tms-enrichment\cjdarcl_accounts_for_enrichment.csv'
    output_dir = r'C:\Users\punee\Dev\fretron-marketing-engine\tools\tms-enrichment\tiered_output'

    # Run pre-filter
    df = prefilter_accounts(input_file, output_dir, pass_threshold=25)

    # Credit estimation
    tier1_count = len(df[df['tier0_score'] >= 25])
    print(f"\n=== Credit Estimation ===")
    print(f"Tier 1 (Website lookup, 1 credit): {tier1_count} × 1 = {tier1_count} credits")
    print(f"Tier 2 estimate (Tech+Jobs, 4 credits): ~{int(tier1_count * 0.8)} × 4 = ~{int(tier1_count * 0.8 * 4)} credits")
    print(f"Tier 3 estimate (Apollo, 8 credits): ~{int(tier1_count * 0.3)} × 8 = ~{int(tier1_count * 0.3 * 8)} credits")
    print(f"Estimated total: ~{tier1_count + int(tier1_count * 0.8 * 4) + int(tier1_count * 0.3 * 8)} credits")
