"""
Free contact enrichment using Google search + website scraping.
No paid APIs required - pure jugaad!
"""

import re
import time
import json
import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path
from urllib.parse import quote_plus, urljoin
import random

# Paths
BASE_DIR = Path(__file__).parent.parent
TIER_A_FILE = BASE_DIR / "tiered_output/full_enrichment/tier_A_accounts_20260110_213733.csv"
OUTPUT_DIR = BASE_DIR / "tiered_output/full_enrichment"

# User agents to rotate
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
]

# Target titles for logistics/supply chain decision makers
TARGET_KEYWORDS = [
    'VP Logistics', 'VP Supply Chain', 'VP Operations',
    'Director Logistics', 'Director Supply Chain', 'Director Operations',
    'Head Logistics', 'Head Supply Chain', 'Head Operations',
    'Chief Supply Chain', 'Chief Operating Officer', 'COO',
    'General Manager Logistics', 'GM Supply Chain', 'GM Operations',
    'DGM Logistics', 'AGM Supply Chain', 'Plant Head',
    'VP IT', 'CIO', 'CTO', 'Head Digital', 'VP Digital Transformation'
]

def get_headers():
    """Get randomized headers."""
    return {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
    }

def search_google(query: str) -> list:
    """Search Google and extract results (using DuckDuckGo HTML as fallback)."""
    results = []

    # Use DuckDuckGo HTML (no API needed, more permissive)
    url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"

    try:
        response = requests.get(url, headers=get_headers(), timeout=15)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract result snippets
            for result in soup.select('.result'):
                title_elem = result.select_one('.result__title')
                snippet_elem = result.select_one('.result__snippet')
                link_elem = result.select_one('.result__url')

                if title_elem:
                    results.append({
                        'title': title_elem.get_text(strip=True),
                        'snippet': snippet_elem.get_text(strip=True) if snippet_elem else '',
                        'url': link_elem.get_text(strip=True) if link_elem else ''
                    })
    except Exception as e:
        print(f"      Search error: {e}")

    return results[:10]  # Top 10 results

def extract_names_from_text(text: str) -> list:
    """Extract potential names from text using patterns."""
    names = []

    # Common Indian name patterns (First Last or First Middle Last)
    # Look for capitalized words that might be names
    name_pattern = r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b'

    # Find names near title keywords
    for keyword in ['VP', 'Director', 'Head', 'Chief', 'Manager', 'Officer', 'President']:
        # Pattern: Name, Title or Title - Name or Name (Title)
        patterns = [
            rf'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+),?\s*(?:{keyword})',
            rf'(?:{keyword})[^,\n]*?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)',
        ]

        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                if len(match) > 3 and ' ' in match:  # Has first and last name
                    names.append(match.strip())

    return list(set(names))[:5]  # Unique, max 5

def extract_contacts_from_linkedin_snippet(snippet: str, company: str) -> dict:
    """Extract contact info from LinkedIn search snippet."""
    contact = {'source': 'linkedin_search'}

    # Try to extract name and title from snippet
    # LinkedIn snippets often have: "Name - Title at Company"
    if ' - ' in snippet:
        parts = snippet.split(' - ')
        if len(parts) >= 2:
            contact['name'] = parts[0].strip()[:50]
            contact['title'] = parts[1].split(' at ')[0].strip()[:100] if ' at ' in parts[1] else parts[1][:100]

    return contact if contact.get('name') else None

def scrape_leadership_page(website_url) -> list:
    """Scrape company's leadership/team page for contacts."""
    contacts = []

    # Handle NaN/None/empty values
    if not website_url or pd.isna(website_url) or str(website_url).lower() == 'nan':
        return contacts

    website_url = str(website_url)

    # Common leadership page paths
    leadership_paths = [
        '/about-us/leadership',
        '/about/leadership',
        '/about/team',
        '/about-us/team',
        '/leadership',
        '/team',
        '/management',
        '/about/management',
        '/about-us',
        '/about',
        '/company/leadership',
    ]

    base_url = website_url.rstrip('/')

    for path in leadership_paths[:5]:  # Try first 5 paths
        try:
            url = base_url + path
            response = requests.get(url, headers=get_headers(), timeout=10, allow_redirects=True)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                text = soup.get_text(separator=' ', strip=True)

                # Look for name + title patterns
                # Common patterns on leadership pages
                for elem in soup.find_all(['div', 'article', 'section'], class_=re.compile(r'team|leader|exec|member|profile', re.I)):
                    elem_text = elem.get_text(separator=' ', strip=True)

                    # Try to find name and title
                    names = extract_names_from_text(elem_text)
                    for name in names:
                        # Check if relevant title is nearby
                        for keyword in ['Logistics', 'Supply Chain', 'Operations', 'IT', 'Digital', 'COO', 'CIO']:
                            if keyword.lower() in elem_text.lower():
                                # Extract the title
                                title_match = re.search(
                                    rf'((?:VP|Director|Head|Chief|GM|Manager|Officer)[^,\n]{{0,50}}(?:{keyword})[^,\n]{{0,30}})',
                                    elem_text, re.IGNORECASE
                                )
                                contacts.append({
                                    'name': name,
                                    'title': title_match.group(1).strip() if title_match else f'Executive - {keyword}',
                                    'source': 'website',
                                    'url': url
                                })
                                break

                if contacts:
                    break  # Found contacts, stop searching

        except Exception:
            continue

        time.sleep(0.5)  # Be nice to servers

    return contacts[:5]  # Max 5 contacts per company

def search_linkedin_profiles(company_name: str) -> list:
    """Search for LinkedIn profiles of company executives."""
    contacts = []

    # Search queries for different roles
    search_queries = [
        f'site:linkedin.com/in "{company_name}" "VP Logistics" OR "Director Supply Chain" OR "Head Operations"',
        f'site:linkedin.com/in "{company_name}" "COO" OR "Chief Operating" OR "VP Operations"',
        f'site:linkedin.com/in "{company_name}" "CIO" OR "VP IT" OR "Head Digital"',
    ]

    for query in search_queries[:2]:  # Limit searches
        results = search_google(query)

        for result in results:
            if 'linkedin.com/in/' in result.get('url', '').lower():
                contact = extract_contacts_from_linkedin_snippet(result['title'], company_name)
                if contact and contact.get('name'):
                    contact['linkedin_hint'] = result['url']
                    contacts.append(contact)

        time.sleep(1)  # Rate limiting

    return contacts

def search_news_mentions(company_name: str) -> list:
    """Search news for executive mentions."""
    contacts = []

    query = f'"{company_name}" ("VP Logistics" OR "Director Supply Chain" OR "Head Operations" OR "COO") announcement OR appointed OR joins'
    results = search_google(query)

    for result in results:
        snippet = result.get('snippet', '') + ' ' + result.get('title', '')
        names = extract_names_from_text(snippet)

        for name in names:
            # Check if relevant title is in snippet
            for keyword in TARGET_KEYWORDS[:10]:
                if keyword.lower() in snippet.lower():
                    contacts.append({
                        'name': name,
                        'title': keyword,
                        'source': 'news',
                        'context': result.get('title', '')[:100]
                    })
                    break

    return contacts

def score_contact(contact: dict) -> int:
    """Score contact relevance."""
    score = 0
    title = (contact.get('title') or '').lower()

    # High-value titles
    if any(t in title for t in ['vp', 'vice president', 'director', 'head', 'chief']):
        score += 30
    elif any(t in title for t in ['manager', 'gm', 'general manager']):
        score += 20

    # Priority departments
    if any(d in title for d in ['logistics', 'supply chain', 'transport', 'fleet']):
        score += 25
    elif any(d in title for d in ['operations', 'procurement', 'warehouse']):
        score += 15
    elif any(d in title for d in ['it', 'digital', 'technology']):
        score += 10

    # Source reliability
    if contact.get('source') == 'website':
        score += 10
    elif contact.get('source') == 'linkedin_search':
        score += 8
    elif contact.get('source') == 'news':
        score += 5

    # Has LinkedIn hint
    if contact.get('linkedin_hint'):
        score += 5

    return score

def dedupe_contacts(contacts: list) -> list:
    """Remove duplicate contacts."""
    seen = set()
    unique = []

    for c in contacts:
        name = (c.get('name') or '').lower().strip()
        if name and name not in seen and len(name) > 3:
            seen.add(name)
            unique.append(c)

    return unique

def main():
    print("=" * 60)
    print("FREE CONTACT ENRICHMENT (Jugaad Edition)")
    print("=" * 60)
    print("\nUsing: DuckDuckGo search + Website scraping")
    print("No paid APIs required!\n")

    # Load Tier A accounts
    print("1. Loading Tier A accounts...")
    accounts_df = pd.read_csv(TIER_A_FILE)
    print(f"   Found {len(accounts_df)} accounts to enrich\n")

    results = []
    all_contacts = []

    print("2. Enriching contacts...\n")

    for idx, account in accounts_df.iterrows():
        company_name = account['Company']
        website = account.get('website_url', '')

        print(f"   [{idx+1}/{len(accounts_df)}] {company_name}")

        contacts = []

        # Method 1: Scrape company website
        if website:
            print(f"       Checking website...")
            website_contacts = scrape_leadership_page(website)
            contacts.extend(website_contacts)
            print(f"       Found {len(website_contacts)} from website")

        # Method 2: Search LinkedIn profiles
        print(f"       Searching LinkedIn...")
        linkedin_contacts = search_linkedin_profiles(company_name)
        contacts.extend(linkedin_contacts)
        print(f"       Found {len(linkedin_contacts)} from LinkedIn search")

        # Method 3: Search news mentions (only if few contacts found)
        if len(contacts) < 3:
            print(f"       Searching news...")
            news_contacts = search_news_mentions(company_name)
            contacts.extend(news_contacts)
            print(f"       Found {len(news_contacts)} from news")

        # Dedupe and score
        contacts = dedupe_contacts(contacts)
        for c in contacts:
            c['score'] = score_contact(c)
            c['company'] = company_name

        contacts = sorted(contacts, key=lambda x: x['score'], reverse=True)

        # Best contacts
        dm_contacts = [c for c in contacts if c['score'] >= 30]
        best = contacts[0] if contacts else None

        print(f"       Total: {len(contacts)} contacts, {len(dm_contacts)} decision makers\n")

        # Build result
        result = {
            'Company': company_name,
            'Category': account.get('Category'),
            'final_score': account.get('final_score'),
            'final_tier': account.get('final_tier'),
            'website_url': website,
            'linkedin_url': account.get('linkedin_url'),
            'total_contacts_found': len(contacts),
            'dm_contacts_found': len(dm_contacts),
            'best_contact_name': best['name'] if best else '',
            'best_contact_title': best['title'] if best else '',
            'best_contact_source': best['source'] if best else '',
            'best_contact_score': best['score'] if best else 0,
            'all_dm_names': '; '.join([f"{c['name']} ({c['title']})" for c in dm_contacts[:5]])
        }
        results.append(result)

        # Store all contacts
        all_contacts.extend(contacts)

        # Rate limiting - be respectful
        time.sleep(2)

    # Create output
    results_df = pd.DataFrame(results)
    contacts_df = pd.DataFrame(all_contacts)

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)

    with_contacts = (results_df['total_contacts_found'] > 0).sum()
    with_dm = (results_df['dm_contacts_found'] > 0).sum()

    print(f"\nAccounts processed: {len(results_df)}")
    print(f"   With any contacts: {with_contacts} ({with_contacts/len(results_df)*100:.0f}%)")
    print(f"   With decision makers: {with_dm} ({with_dm/len(results_df)*100:.0f}%)")
    print(f"\nTotal contacts found: {len(all_contacts)}")

    if len(contacts_df) > 0:
        print("\nTop Contacts Found:")
        print("-" * 60)
        top = contacts_df.nlargest(10, 'score')
        for _, c in top.iterrows():
            print(f"   {c['score']:2d} | {c['company'][:25]:<25} | {c.get('name', 'N/A')} - {c.get('title', 'N/A')[:30]}")

    # Save outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    output_file = OUTPUT_DIR / f"tier_A_contacts_free_{timestamp}.csv"
    results_df.to_csv(output_file, index=False)
    print(f"\n[OK] Saved: {output_file}")

    if len(contacts_df) > 0:
        contacts_file = OUTPUT_DIR / f"all_contacts_free_{timestamp}.csv"
        contacts_df.to_csv(contacts_file, index=False)
        print(f"[OK] Saved: {contacts_file}")

    print("\n" + "=" * 60)
    print("ENRICHMENT COMPLETE")
    print("=" * 60)

if __name__ == '__main__':
    main()
