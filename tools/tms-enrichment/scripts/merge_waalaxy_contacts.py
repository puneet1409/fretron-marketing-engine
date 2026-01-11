"""
Merge Waalaxy exported contacts with Tier A account data.
Run this after exporting contacts from Waalaxy.
"""

import pandas as pd
from pathlib import Path
from datetime import datetime
import re

# Paths
BASE_DIR = Path(__file__).parent.parent
TIER_A_FILE = BASE_DIR / "tiered_output/full_enrichment/tier_A_accounts_20260110_213733.csv"
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# Title scoring
HIGH_VALUE_TITLES = ['vp', 'vice president', 'director', 'head', 'chief', 'coo', 'cio', 'cto', 'cso']
MEDIUM_VALUE_TITLES = ['general manager', 'gm', 'dgm', 'agm', 'senior manager', 'plant head']
PRIORITY_DEPTS = ['logistics', 'supply chain', 'transport', 'fleet', 'distribution', 'scm']
SECONDARY_DEPTS = ['operations', 'procurement', 'warehouse', 'it', 'digital', 'technology']


def find_waalaxy_export():
    """Find the most recent Waalaxy export file."""
    exports = list(OUTPUT_DIR.glob("waalaxy_export*.csv"))
    if not exports:
        # Check for any CSV that might be a Waalaxy export
        exports = list(OUTPUT_DIR.glob("*waalaxy*.csv"))
    if not exports:
        print("[!] No Waalaxy export found in output directory")
        print(f"    Looking in: {OUTPUT_DIR}")
        print("    Expected filename pattern: waalaxy_export_YYYYMMDD.csv")
        return None

    # Return most recent
    return max(exports, key=lambda p: p.stat().st_mtime)


def normalize_company_name(name: str) -> str:
    """Normalize company name for matching."""
    if not name:
        return ""
    name = str(name).lower()
    # Remove common suffixes
    for suffix in ['limited', 'ltd', 'pvt', 'private', 'inc', 'corp', 'corporation']:
        name = name.replace(suffix, '')
    # Remove special chars
    name = re.sub(r'[^\w\s]', '', name)
    return name.strip()


def score_contact(title: str) -> int:
    """Score a contact based on title relevance."""
    if not title:
        return 0

    title_lower = title.lower()
    score = 0

    # Title level scoring
    if any(t in title_lower for t in HIGH_VALUE_TITLES):
        score += 40
    elif any(t in title_lower for t in MEDIUM_VALUE_TITLES):
        score += 25

    # Department scoring
    if any(d in title_lower for d in PRIORITY_DEPTS):
        score += 30
    elif any(d in title_lower for d in SECONDARY_DEPTS):
        score += 15

    return score


def match_contact_to_account(contact_company: str, accounts_df: pd.DataFrame) -> dict:
    """Match a contact's company to our Tier A accounts."""
    if not contact_company:
        return None

    contact_company_norm = normalize_company_name(contact_company)

    for _, account in accounts_df.iterrows():
        account_name_norm = normalize_company_name(account['Company'])

        # Check for match (either direction substring)
        if (account_name_norm in contact_company_norm or
            contact_company_norm in account_name_norm or
            # Fuzzy: check if major words match
            len(set(account_name_norm.split()) & set(contact_company_norm.split())) >= 2):
            return {
                'matched_company': account['Company'],
                'account_score': account.get('final_score', 0),
                'account_tier': account.get('final_tier', 'A'),
                'category': account.get('Category', ''),
                'priority_signals': account.get('priority_signals', '')
            }

    return None


def main():
    print("=" * 60)
    print("WAALAXY CONTACT MERGE")
    print("=" * 60)

    # Find Waalaxy export
    print("\n1. Looking for Waalaxy export...")
    waalaxy_file = find_waalaxy_export()

    if not waalaxy_file:
        print("\n[!] Please export contacts from Waalaxy and save as:")
        print(f"    {OUTPUT_DIR}/waalaxy_export_YYYYMMDD.csv")
        return

    print(f"   Found: {waalaxy_file.name}")

    # Load files
    print("\n2. Loading data...")
    waalaxy_df = pd.read_csv(waalaxy_file)
    accounts_df = pd.read_csv(TIER_A_FILE)

    print(f"   Waalaxy contacts: {len(waalaxy_df)}")
    print(f"   Tier A accounts: {len(accounts_df)}")

    # Identify column names (Waalaxy exports vary)
    print("\n3. Identifying columns...")
    print(f"   Columns found: {list(waalaxy_df.columns)}")

    # Try to identify key columns
    name_cols = [c for c in waalaxy_df.columns if 'name' in c.lower() or 'first' in c.lower()]
    company_cols = [c for c in waalaxy_df.columns if 'company' in c.lower() or 'organization' in c.lower()]
    title_cols = [c for c in waalaxy_df.columns if 'title' in c.lower() or 'position' in c.lower() or 'headline' in c.lower()]
    email_cols = [c for c in waalaxy_df.columns if 'email' in c.lower() or 'mail' in c.lower()]
    linkedin_cols = [c for c in waalaxy_df.columns if 'linkedin' in c.lower() or 'url' in c.lower() or 'profile' in c.lower()]

    # Use first matching column or None
    name_col = name_cols[0] if name_cols else None
    company_col = company_cols[0] if company_cols else None
    title_col = title_cols[0] if title_cols else None
    email_col = email_cols[0] if email_cols else None
    linkedin_col = linkedin_cols[0] if linkedin_cols else None

    print(f"   Name column: {name_col}")
    print(f"   Company column: {company_col}")
    print(f"   Title column: {title_col}")
    print(f"   Email column: {email_col}")
    print(f"   LinkedIn column: {linkedin_col}")

    if not company_col:
        print("\n[!] Could not identify company column. Please check export format.")
        return

    # Process contacts
    print("\n4. Matching contacts to accounts...")
    results = []
    matched_count = 0

    for _, contact in waalaxy_df.iterrows():
        contact_company = contact.get(company_col, '')
        match = match_contact_to_account(contact_company, accounts_df)

        if match:
            matched_count += 1
            title = contact.get(title_col, '') if title_col else ''

            result = {
                'name': contact.get(name_col, '') if name_col else '',
                'title': title,
                'company_from_linkedin': contact_company,
                'email': contact.get(email_col, '') if email_col else '',
                'linkedin_url': contact.get(linkedin_col, '') if linkedin_col else '',
                'contact_score': score_contact(title),
                **match
            }
            results.append(result)

    print(f"   Matched: {matched_count}/{len(waalaxy_df)} contacts")

    if not results:
        print("\n[!] No contacts matched to Tier A accounts.")
        print("    Check that contact companies match account names.")
        return

    # Create results dataframe
    results_df = pd.DataFrame(results)
    results_df = results_df.sort_values(['account_score', 'contact_score'], ascending=[False, False])

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    companies_with_contacts = results_df['matched_company'].nunique()
    high_value = (results_df['contact_score'] >= 50).sum()
    with_email = results_df['email'].notna().sum() if 'email' in results_df.columns else 0

    print(f"\nAccounts with contacts: {companies_with_contacts}/22")
    print(f"Total matched contacts: {len(results_df)}")
    print(f"High-value contacts (score >= 50): {high_value}")
    print(f"Contacts with email: {with_email}")

    # Top contacts
    print("\nTop 15 Decision Makers:")
    print("-" * 60)
    for _, c in results_df.head(15).iterrows():
        email_indicator = "[E]" if c.get('email') else "   "
        print(f"  {c['contact_score']:2d} {email_indicator} | {c['matched_company'][:25]:<25} | {c.get('name', 'N/A')[:20]} - {c.get('title', '')[:25]}")

    # Save outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Full merged output
    output_file = OUTPUT_DIR / f"tier_A_enriched_contacts_{timestamp}.csv"
    results_df.to_csv(output_file, index=False)
    print(f"\n[OK] Saved: {output_file}")

    # High-priority contacts only
    hot_contacts = results_df[results_df['contact_score'] >= 40].copy()
    if len(hot_contacts) > 0:
        hot_file = OUTPUT_DIR / f"hot_contacts_for_outreach_{timestamp}.csv"
        hot_contacts.to_csv(hot_file, index=False)
        print(f"[OK] Saved hot contacts ({len(hot_contacts)}): {hot_file}")

    # Per-account summary
    account_summary = results_df.groupby('matched_company').agg({
        'name': 'count',
        'contact_score': 'max',
        'email': lambda x: x.notna().sum()
    }).rename(columns={'name': 'contact_count', 'contact_score': 'best_score', 'email': 'emails_found'})
    account_summary = account_summary.sort_values('best_score', ascending=False)

    summary_file = OUTPUT_DIR / f"account_contact_summary_{timestamp}.csv"
    account_summary.to_csv(summary_file)
    print(f"[OK] Saved account summary: {summary_file}")

    print("\n" + "=" * 60)
    print("MERGE COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()
