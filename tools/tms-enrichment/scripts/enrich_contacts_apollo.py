"""
Enrich Tier A accounts with decision-maker contacts using Apollo.io API.
"""

import os
import json
import time
import pandas as pd
import requests
from datetime import datetime
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent
TIER_A_FILE = BASE_DIR / "tiered_output/full_enrichment/tier_A_accounts_20260110_213733.csv"
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# Apollo API
APOLLO_API_URL = "https://api.apollo.io/v1/mixed_people/search"
APOLLO_API_KEY = os.getenv("APOLLO_API_KEY", "")

# Target titles for decision makers
TARGET_TITLES = [
    "VP Logistics", "VP Supply Chain", "VP Operations", "VP Procurement",
    "Director Logistics", "Director Supply Chain", "Director Operations",
    "Head of Logistics", "Head of Supply Chain", "Head of Operations",
    "Chief Supply Chain Officer", "Chief Operations Officer", "COO",
    "General Manager Logistics", "General Manager Supply Chain",
    "DGM Logistics", "DGM Supply Chain", "AGM Logistics", "AGM Supply Chain",
    "VP IT", "Director IT", "CIO", "CTO", "Head of IT", "Head of Digital",
    "VP Digital Transformation", "Director Digital",
    "Plant Head", "Works Manager", "Factory Head"
]

# Relevant seniorities
TARGET_SENIORITIES = ["vp", "director", "c_suite", "owner", "partner", "senior"]

# Relevant departments
TARGET_DEPARTMENTS = [
    "operations", "logistics", "supply_chain",
    "information_technology", "engineering"
]


def search_contacts_apollo(company_name: str, company_domain: str = None) -> list:
    """Search Apollo for contacts at a company."""
    if not APOLLO_API_KEY:
        print("   [!] Apollo API key not set")
        return []

    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }

    # Build search query
    payload = {
        "api_key": APOLLO_API_KEY,
        "q_organization_name": company_name,
        "person_seniorities": TARGET_SENIORITIES,
        "person_departments": TARGET_DEPARTMENTS,
        "page": 1,
        "per_page": 10
    }

    # Add domain if available
    if company_domain:
        payload["q_organization_domains"] = company_domain

    try:
        response = requests.post(APOLLO_API_URL, json=payload, headers=headers, timeout=30)

        if response.status_code == 200:
            data = response.json()
            people = data.get("people", [])

            contacts = []
            for person in people:
                contact = {
                    "name": f"{person.get('first_name', '')} {person.get('last_name', '')}".strip(),
                    "title": person.get("title", ""),
                    "email": person.get("email", ""),
                    "linkedin_url": person.get("linkedin_url", ""),
                    "phone": person.get("phone_numbers", [{}])[0].get("raw_number") if person.get("phone_numbers") else None,
                    "seniority": person.get("seniority", ""),
                    "departments": person.get("departments", []),
                    "company": person.get("organization", {}).get("name", company_name)
                }
                contacts.append(contact)

            return contacts
        else:
            print(f"   [!] Apollo API error: {response.status_code}")
            return []

    except Exception as e:
        print(f"   [!] Error searching Apollo: {e}")
        return []


def score_contact(contact: dict) -> int:
    """Score a contact based on relevance to TMS sale."""
    title = (contact.get("title") or "").lower()
    score = 0

    # Title scoring
    high_value_titles = ["vp", "vice president", "director", "head", "chief", "coo", "cio", "cto"]
    medium_value_titles = ["general manager", "gm", "dgm", "agm", "senior manager"]

    if any(t in title for t in high_value_titles):
        score += 40
    elif any(t in title for t in medium_value_titles):
        score += 25

    # Department scoring
    priority_depts = ["logistics", "supply chain", "transport", "fleet", "distribution"]
    secondary_depts = ["operations", "procurement", "warehouse", "it", "digital"]

    if any(d in title for d in priority_depts):
        score += 30
    elif any(d in title for d in secondary_depts):
        score += 15

    # Contact info scoring
    if contact.get("email"):
        score += 15
    if contact.get("linkedin_url"):
        score += 5
    if contact.get("phone"):
        score += 5

    return score


def extract_domain(url: str) -> str:
    """Extract domain from URL."""
    if not url:
        return None
    url = url.replace("https://", "").replace("http://", "").replace("www.", "")
    return url.split("/")[0] if url else None


def main():
    print("=" * 60)
    print("CONTACT ENRICHMENT - TIER A ACCOUNTS")
    print("=" * 60)

    # Check API key
    if not APOLLO_API_KEY:
        print("\n[!] APOLLO_API_KEY not set!")
        print("    Set it with: export APOLLO_API_KEY=your_key_here")
        print("    Or create .env file in tools/tms-enrichment/")
        return

    print(f"\n[OK] Apollo API key configured")

    # Load Tier A accounts
    print("\n1. Loading Tier A accounts...")
    accounts_df = pd.read_csv(TIER_A_FILE)
    print(f"   Found {len(accounts_df)} Tier A accounts")

    # Process each account
    print("\n2. Enriching contacts from Apollo...")
    results = []
    all_contacts = []

    for idx, account in accounts_df.iterrows():
        company_name = account['Company']
        website = account.get('website_url', '')
        domain = extract_domain(website)

        print(f"\n   [{idx+1}/{len(accounts_df)}] {company_name}")

        # Search Apollo
        contacts = search_contacts_apollo(company_name, domain)

        # Score and sort contacts
        for c in contacts:
            c['score'] = score_contact(c)
            c['source_company'] = company_name

        contacts = sorted(contacts, key=lambda x: x['score'], reverse=True)

        # Get top contacts
        dm_contacts = [c for c in contacts if c['score'] >= 40]
        best_contact = contacts[0] if contacts else None

        print(f"       Found {len(contacts)} contacts, {len(dm_contacts)} decision makers")

        # Build result row
        result = {
            'Company': company_name,
            'Category': account.get('Category'),
            'Segment': account.get('Segment'),
            'HQ': account.get('HQ'),
            'Sales_Rs_Cr': account.get('Sales_Rs_Cr'),
            'final_score': account.get('final_score'),
            'final_tier': account.get('final_tier'),
            'website_url': account.get('website_url'),
            'linkedin_url': account.get('linkedin_url'),
            'has_trigger_news': account.get('has_trigger_news'),
            'priority_signals': account.get('priority_signals'),

            # Contact enrichment
            'total_contacts': len(contacts),
            'dm_contacts': len(dm_contacts),
            'best_contact_name': best_contact['name'] if best_contact else '',
            'best_contact_title': best_contact['title'] if best_contact else '',
            'best_contact_email': best_contact['email'] if best_contact else '',
            'best_contact_linkedin': best_contact['linkedin_url'] if best_contact else '',
            'best_contact_score': best_contact['score'] if best_contact else 0,

            # All DM names for quick reference
            'dm_names': '; '.join([f"{c['name']} ({c['title']})" for c in dm_contacts[:5]])
        }

        results.append(result)

        # Store all contacts for detailed export
        for c in contacts:
            c['source_company'] = company_name
            c['source_tier'] = 'A'
            all_contacts.append(c)

        # Rate limiting
        time.sleep(1)  # Apollo rate limit: 60 req/min

    # Create output dataframes
    results_df = pd.DataFrame(results)
    contacts_df = pd.DataFrame(all_contacts)

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    with_contacts = (results_df['total_contacts'] > 0).sum()
    with_dm = (results_df['dm_contacts'] > 0).sum()
    total_contacts = len(all_contacts)
    total_dm = contacts_df[contacts_df['score'] >= 40].shape[0] if len(contacts_df) > 0 else 0

    print(f"\nAccounts enriched: {len(results_df)}")
    print(f"   With contacts: {with_contacts} ({with_contacts/len(results_df)*100:.0f}%)")
    print(f"   With decision makers: {with_dm} ({with_dm/len(results_df)*100:.0f}%)")
    print(f"\nTotal contacts found: {total_contacts}")
    print(f"   Decision makers: {total_dm}")

    # Top contacts preview
    if len(contacts_df) > 0:
        print("\nTop 10 Decision Makers Found:")
        print("-" * 60)
        top_contacts = contacts_df.nlargest(10, 'score')
        for _, c in top_contacts.iterrows():
            print(f"   {c['score']:3d} | {c['source_company'][:25]:<25} | {c['name']} - {c['title'][:30]}")

    # Save outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    # Enriched accounts
    output_file = OUTPUT_DIR / f"tier_A_with_contacts_{timestamp}.csv"
    results_df.to_csv(output_file, index=False)
    print(f"\n[OK] Saved enriched accounts: {output_file}")

    # All contacts detail
    contacts_file = OUTPUT_DIR / f"tier_A_contacts_detail_{timestamp}.csv"
    contacts_df.to_csv(contacts_file, index=False)
    print(f"[OK] Saved contacts detail: {contacts_file}")

    # High-priority contacts (score >= 50) for immediate outreach
    if len(contacts_df) > 0:
        hot_contacts = contacts_df[contacts_df['score'] >= 50].copy()
        hot_contacts = hot_contacts.sort_values('score', ascending=False)
        hot_file = OUTPUT_DIR / f"hot_contacts_for_outreach_{timestamp}.csv"
        hot_contacts.to_csv(hot_file, index=False)
        print(f"[OK] Saved hot contacts ({len(hot_contacts)}): {hot_file}")

    print("\n" + "=" * 60)
    print("ENRICHMENT COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()
