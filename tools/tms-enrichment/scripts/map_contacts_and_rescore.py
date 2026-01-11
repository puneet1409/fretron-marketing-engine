"""
Map BitScale contacts to enriched accounts and re-score for prioritization.
"""

import pandas as pd
import json
import re
from datetime import datetime
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent
ENRICHED_ACCOUNTS = BASE_DIR / "tiered_output/full_enrichment/enriched_2510_deduped.csv"
BITSCALE_CONTACTS = BASE_DIR / "tiered_output/full_enrichment/bitscale_enriched_contacts_20260105.csv"
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# Decision maker titles to look for
DM_TITLES = [
    'vp', 'vice president', 'director', 'head', 'chief', 'coo', 'cfo', 'ceo',
    'president', 'general manager', 'gm', 'svp', 'senior vice', 'avp',
    'dgm', 'agm', 'plant head', 'works manager'
]

# Relevant departments
RELEVANT_DEPTS = [
    'logistics', 'supply chain', 'operations', 'procurement', 'transport',
    'warehouse', 'distribution', 'fleet', 'sourcing', 'purchase', 'scm',
    'it', 'information technology', 'digital', 'transformation'
]

def is_decision_maker(title: str) -> bool:
    """Check if title indicates a decision maker."""
    if not title:
        return False
    title_lower = title.lower()
    return any(dm in title_lower for dm in DM_TITLES)

def is_relevant_department(title: str) -> bool:
    """Check if title is in a relevant department."""
    if not title:
        return False
    title_lower = title.lower()
    return any(dept in title_lower for dept in RELEVANT_DEPTS)

def extract_contacts_from_bitscale(row) -> list:
    """Extract contacts from BitScale 'Find People from Company' columns."""
    contacts = []

    # Check both contact columns
    for col in ['Find People from Company', 'Find People from Company 1']:
        if col in row and pd.notna(row[col]):
            contact_text = str(row[col])
            # Try to parse as JSON if it looks like JSON
            if contact_text.startswith('['):
                try:
                    parsed = json.loads(contact_text)
                    if isinstance(parsed, list):
                        contacts.extend(parsed)
                except:
                    pass
            else:
                # Try to extract structured contact info from text
                # Format often: "Name - Title - Email"
                lines = contact_text.split('\n')
                for line in lines:
                    if '-' in line or '@' in line:
                        contacts.append({'raw': line.strip()})

    return contacts

def score_contact(contact: dict) -> int:
    """Score a contact based on title and department relevance."""
    title = contact.get('title', '') or contact.get('raw', '')
    score = 0

    if is_decision_maker(title):
        score += 30
    if is_relevant_department(title):
        score += 20
    if contact.get('email'):
        score += 10
    if contact.get('linkedin_url') or contact.get('linkedin'):
        score += 5
    if contact.get('phone'):
        score += 5

    return score

def analyze_supply_chain_priorities(text: str) -> dict:
    """Extract key signals from supply chain priorities text."""
    if not text or pd.isna(text):
        return {'has_priorities': False, 'signals': [], 'signal_count': 0}

    text_lower = text.lower()
    signals = []

    # Key signals to look for
    signal_patterns = [
        ('digital_transformation', ['digital transformation', 'digitization', 'automation']),
        ('logistics_tech', ['tms', 'wms', 'logistics technology', 'transport management']),
        ('expansion', ['expansion', 'new plant', 'new warehouse', 'growth']),
        ('cost_optimization', ['cost reduction', 'cost optimization', 'efficiency']),
        ('sustainability', ['sustainable', 'green logistics', 'carbon']),
    ]

    for signal_name, keywords in signal_patterns:
        if any(kw in text_lower for kw in keywords):
            signals.append(signal_name)

    has_priorities = 'No public' not in text and 'limited' not in text_lower[:100]

    return {
        'has_priorities': has_priorities,
        'signals': signals,
        'signal_count': len(signals)
    }

def calculate_final_score(row: pd.Series) -> int:
    """Calculate comprehensive final score."""
    score = row.get('tier0_score', 0) or 0

    # Contact signals
    dm_count = row.get('dm_contact_count', 0) or 0
    if dm_count >= 3:
        score += 25
    elif dm_count >= 1:
        score += 15

    total_contacts = row.get('total_contacts', 0) or 0
    if total_contacts >= 5:
        score += 10
    elif total_contacts >= 1:
        score += 5

    # Trigger signals
    if row.get('has_trigger_news'):
        trigger_count = row.get('trigger_news_count', 0) or 0
        score += min(20, trigger_count * 10)

    # Supply chain priorities
    if row.get('has_stated_priorities'):
        signal_count = row.get('priority_signal_count', 0) or 0
        score += 15 + min(10, signal_count * 3)

    # IT hiring (growth signal)
    if row.get('has_it_hiring') and 'digital' in str(row.get('it_hiring_summary', '')).lower():
        score += 10

    return score

def assign_tier(score: int) -> str:
    """Assign tier based on final score."""
    if score >= 120:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 50:
        return 'C'
    else:
        return 'D'

def main():
    print("=" * 60)
    print("ACCOUNT ENRICHMENT & RE-SCORING")
    print("=" * 60)

    # Load enriched accounts
    print("\n1. Loading enriched accounts...")
    accounts_df = pd.read_csv(ENRICHED_ACCOUNTS)
    print(f"   Loaded {len(accounts_df)} accounts")

    # Load BitScale contacts
    print("\n2. Loading BitScale contacts data...")
    try:
        bitscale_df = pd.read_csv(BITSCALE_CONTACTS, on_bad_lines='skip')
        print(f"   Loaded {len(bitscale_df)} BitScale rows")
    except Exception as e:
        print(f"   Error loading BitScale: {e}")
        bitscale_df = pd.DataFrame()

    # Process each account
    print("\n3. Processing accounts...")
    results = []

    for idx, account in accounts_df.iterrows():
        company_name = account['Company']

        # Find matching BitScale row
        bitscale_row = None
        if len(bitscale_df) > 0 and 'Company Name' in bitscale_df.columns:
            # Escape special regex characters in company name
            search_term = re.escape(company_name[:20])
            try:
                matches = bitscale_df[bitscale_df['Company Name'].str.contains(
                    search_term, case=False, na=False, regex=True
                )]
                if len(matches) > 0:
                    bitscale_row = matches.iloc[0]
            except Exception:
                # Fallback to exact match
                matches = bitscale_df[bitscale_df['Company Name'].str.lower() == company_name.lower()]
                if len(matches) > 0:
                    bitscale_row = matches.iloc[0]

        # Extract contacts
        contacts = []
        dm_contacts = []
        if bitscale_row is not None:
            contacts = extract_contacts_from_bitscale(bitscale_row)
            for c in contacts:
                c['score'] = score_contact(c)
                if is_decision_maker(c.get('title', '') or c.get('raw', '')):
                    dm_contacts.append(c)

        # Analyze supply chain priorities
        priorities = {'has_priorities': False, 'signals': [], 'signal_count': 0}
        if bitscale_row is not None:
            try:
                if 'Supply Chain Priorities' in bitscale_row.index:
                    priorities = analyze_supply_chain_priorities(bitscale_row['Supply Chain Priorities'])
            except Exception:
                pass

        # Check IT hiring
        has_it_hiring = False
        it_hiring_summary = ''
        if bitscale_row is not None:
            try:
                if 'IT Hiring Trends' in bitscale_row.index:
                    it_text = str(bitscale_row.get('IT Hiring Trends', '') or '')
                    has_it_hiring = bool(it_text) and len(it_text) > 10 and 'No' not in it_text[:50]
                    it_hiring_summary = it_text[:200] if has_it_hiring else ''
            except Exception:
                pass

        # Build result
        result = {
            'Company': company_name,
            'Category': account.get('Category'),
            'Segment': account.get('Segment'),
            'HQ': account.get('HQ'),
            'Sales_Rs_Cr': account.get('Sales_Rs_Cr'),
            'Employees': account.get('Employees'),
            'Total_Logistics_Spend_Rs_Cr': account.get('Total_Logistics_Spend_Rs_Cr'),
            'Key_Locations': account.get('Key_Locations'),

            # Original scores
            'tier0_score': account.get('tier0_score'),
            'original_tier': account.get('final_tier'),

            # URLs
            'website_url': account.get('website_url'),
            'linkedin_url': account.get('linkedin_url'),

            # News/Triggers
            'has_trigger_news': account.get('has_trigger_news'),
            'trigger_news_count': account.get('trigger_news_count'),

            # Contact signals (new)
            'total_contacts': len(contacts),
            'dm_contact_count': len(dm_contacts),
            'best_contact': dm_contacts[0] if dm_contacts else (contacts[0] if contacts else None),

            # Supply chain priorities (new)
            'has_stated_priorities': priorities['has_priorities'],
            'priority_signals': ','.join(priorities['signals']),
            'priority_signal_count': priorities['signal_count'],

            # IT hiring (new)
            'has_it_hiring': has_it_hiring,
            'it_hiring_summary': it_hiring_summary[:100] if it_hiring_summary else '',
        }

        # Calculate new final score
        result['final_score'] = calculate_final_score(pd.Series(result))
        result['final_tier'] = assign_tier(result['final_score'])

        results.append(result)

        if (idx + 1) % 500 == 0:
            print(f"   Processed {idx + 1} accounts...")

    # Create results dataframe
    results_df = pd.DataFrame(results)

    # Sort by final score
    results_df = results_df.sort_values('final_score', ascending=False)

    # Summary statistics
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    tier_counts = results_df['final_tier'].value_counts()
    print(f"\nTier Distribution:")
    for tier in ['A', 'B', 'C', 'D']:
        count = tier_counts.get(tier, 0)
        print(f"   Tier {tier}: {count} accounts")

    with_dm = (results_df['dm_contact_count'] > 0).sum()
    with_priorities = results_df['has_stated_priorities'].sum()
    with_triggers = results_df['has_trigger_news'].sum()

    print(f"\nSignal Coverage:")
    print(f"   Accounts with DM contacts: {with_dm} ({with_dm/len(results_df)*100:.1f}%)")
    print(f"   Accounts with stated priorities: {with_priorities} ({with_priorities/len(results_df)*100:.1f}%)")
    print(f"   Accounts with trigger news: {with_triggers} ({with_triggers/len(results_df)*100:.1f}%)")

    # Top 20 accounts
    print(f"\nTop 20 Accounts:")
    print("-" * 60)
    for i, row in results_df.head(20).iterrows():
        print(f"{row['final_tier']} | {row['final_score']:3d} | {row['Company'][:40]:<40}")

    # Save outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Full enriched output
    output_file = OUTPUT_DIR / f"rescored_accounts_{timestamp}.csv"
    results_df.to_csv(output_file, index=False)
    print(f"\n[OK] Saved full results to: {output_file}")

    # Tier A accounts only
    tier_a = results_df[results_df['final_tier'] == 'A']
    tier_a_file = OUTPUT_DIR / f"tier_A_accounts_{timestamp}.csv"
    tier_a.to_csv(tier_a_file, index=False)
    print(f"[OK] Saved Tier A accounts ({len(tier_a)}) to: {tier_a_file}")

    # Hot accounts (Tier A + triggers)
    hot = results_df[(results_df['final_tier'] == 'A') & (results_df['has_trigger_news'] == True)]
    hot_file = OUTPUT_DIR / f"hot_accounts_{timestamp}.csv"
    hot.to_csv(hot_file, index=False)
    print(f"[OK] Saved hot accounts ({len(hot)}) to: {hot_file}")

    print("\n" + "=" * 60)
    print("ENRICHMENT COMPLETE")
    print("=" * 60)

if __name__ == '__main__':
    main()
