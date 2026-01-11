"""
Full Enrichment Runner - Tier 0 and Tier 1 for all 2,500 accounts

This script runs:
1. Tier 0 (FREE): Website lookup, LinkedIn URLs, RSS news, scoring
2. Tier 1 (API): Contact enrichment via Apollo (if API key available)

Usage:
    python run_full_enrichment.py
"""

import pandas as pd
import socket
import feedparser
import requests
import re
import json
import time
import os
from urllib.parse import quote
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import logging
import sys

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('enrichment_log.txt')
    ]
)
logger = logging.getLogger(__name__)

# ============================================================================
# CONFIGURATION
# ============================================================================

INPUT_FILE = "../tiered_output/tier0_all_scored.csv"
OUTPUT_DIR = "../tiered_output/full_enrichment"
TIER1_MIN_SCORE = 40  # Minimum score for Tier 1 enrichment

# API Keys (set via environment variables)
APOLLO_API_KEY = os.getenv('APOLLO_API_KEY')

# Company name cleaning patterns
COMPANY_SUFFIXES = [
    ' limited', ' ltd', ' pvt', ' private', ' india',
    ' industries', ' corporation', ' corp', ' inc',
    ' llp', ' llc', ' & co', ' (india)'
]

# Trigger keywords for news
TRIGGER_KEYWORDS = [
    'expansion', 'logistics', 'supply chain', 'warehouse',
    'new plant', 'fleet', 'digital transformation', 'tms',
    'transportation', 'distribution', 'new facility',
    'manufacturing', 'capex', 'investment'
]

# Apollo job titles to search
APOLLO_JOB_TITLES = [
    "CEO", "COO", "CFO", "CTO", "CIO",
    "VP Operations", "VP Supply Chain", "VP Logistics",
    "Director Operations", "Director Logistics", "Director Supply Chain",
    "Head of Logistics", "Head of Supply Chain", "Head of Operations",
    "General Manager Operations", "Plant Head", "Logistics Manager"
]

# ============================================================================
# TIER 0: FREE ENRICHMENT FUNCTIONS
# ============================================================================

def clean_company_name(name: str) -> str:
    """Clean company name for URL generation."""
    clean = name.lower().strip()
    for suffix in COMPANY_SUFFIXES:
        clean = clean.replace(suffix, '')
    clean = re.sub(r'[^a-z0-9]', '', clean)
    return clean


def find_company_website(company_name: str) -> Optional[str]:
    """Find company website using DNS resolution."""
    clean_name = clean_company_name(company_name)
    if not clean_name:
        return None

    domain_patterns = [
        f"{clean_name}.com",
        f"{clean_name}.co.in",
        f"{clean_name}.in",
        f"{clean_name}india.com",
    ]

    for domain in domain_patterns:
        try:
            socket.setdefaulttimeout(2)
            socket.gethostbyname(domain)
            return f"https://www.{domain}"
        except:
            continue

    return None


def generate_linkedin_url(company_name: str) -> str:
    """Generate LinkedIn company URL."""
    slug = company_name.lower()
    for suffix in COMPANY_SUFFIXES:
        slug = slug.replace(suffix, '')
    slug = slug.strip()
    slug = re.sub(r'&', 'and', slug)
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return f"https://www.linkedin.com/company/{slug}"


def get_news_from_rss(company_name: str, max_results: int = 5) -> Tuple[List[Dict], bool, int]:
    """Get company news from Google News RSS."""
    query = quote(f'"{company_name}" India')
    rss_url = f"https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN"

    try:
        feed = feedparser.parse(rss_url)
        news_items = []
        trigger_count = 0

        for entry in feed.entries[:max_results]:
            title = entry.get('title', '')
            summary = entry.get('summary', '')
            content_lower = (title + ' ' + summary).lower()

            is_trigger = any(kw in content_lower for kw in TRIGGER_KEYWORDS)
            if is_trigger:
                trigger_count += 1

            news_items.append({
                'title': title,
                'link': entry.get('link', ''),
                'published': entry.get('published', ''),
                'is_trigger': is_trigger
            })

        return news_items, trigger_count > 0, trigger_count

    except Exception as e:
        return [], False, 0


def run_tier0_enrichment(df: pd.DataFrame) -> pd.DataFrame:
    """Run Tier 0 enrichment on all accounts."""
    logger.info("=" * 60)
    logger.info("TIER 0: FREE Script-Based Enrichment")
    logger.info(f"Processing {len(df)} accounts")
    logger.info("=" * 60)

    results = []
    total = len(df)

    for idx, row in df.iterrows():
        company = row.get('Company', 'Unknown')

        try:
            # Website lookup
            website = find_company_website(company)

            # LinkedIn URL
            linkedin = generate_linkedin_url(company)

            # News from RSS
            news, has_trigger, trigger_count = get_news_from_rss(company, max_results=3)

            results.append({
                'Company': company,
                'website_url': website,
                'linkedin_url': linkedin,
                'recent_news_json': json.dumps(news) if news else None,
                'has_trigger_news': has_trigger,
                'trigger_news_count': trigger_count,
            })

            # Progress
            if (idx + 1) % 100 == 0:
                pct = (idx + 1) / total * 100
                logger.info(f"Tier 0 Progress: {idx + 1}/{total} ({pct:.1f}%)")

            # Small delay for RSS
            time.sleep(0.1)

        except Exception as e:
            logger.error(f"Error on {company}: {e}")
            results.append({
                'Company': company,
                'website_url': None,
                'linkedin_url': generate_linkedin_url(company),
                'recent_news_json': None,
                'has_trigger_news': False,
                'trigger_news_count': 0,
                'error': str(e)
            })

    results_df = pd.DataFrame(results)
    enriched = df.merge(results_df, on='Company', how='left')

    logger.info(f"\nTier 0 Complete!")
    logger.info(f"  Websites found: {enriched['website_url'].notna().sum()}")
    logger.info(f"  Trigger news: {enriched['has_trigger_news'].sum()}")

    return enriched


# ============================================================================
# TIER 1: API ENRICHMENT FUNCTIONS
# ============================================================================

def search_apollo_contacts(company_domain: str) -> List[Dict]:
    """Search for contacts using Apollo.io API."""
    if not APOLLO_API_KEY:
        return []

    url = "https://api.apollo.io/v1/mixed_people/search"
    headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Api-Key": APOLLO_API_KEY
    }

    payload = {
        "q_organization_domains": company_domain,
        "person_titles": APOLLO_JOB_TITLES,
        "person_locations": ["India"],
        "page": 1,
        "per_page": 10
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)

        if response.status_code == 200:
            data = response.json()
            contacts = []

            for person in data.get('people', []):
                contact = {
                    'name': person.get('name'),
                    'title': person.get('title'),
                    'email': person.get('email'),
                    'linkedin_url': person.get('linkedin_url'),
                    'seniority': person.get('seniority'),
                }
                phone_numbers = person.get('phone_numbers', [])
                if phone_numbers:
                    contact['phone'] = phone_numbers[0].get('number')
                contacts.append(contact)

            return contacts
        else:
            logger.warning(f"Apollo error: {response.status_code}")
            return []

    except Exception as e:
        logger.error(f"Apollo exception: {e}")
        return []


def extract_domain(url: str) -> Optional[str]:
    """Extract domain from URL."""
    if not url:
        return None
    domain = url.replace('https://', '').replace('http://', '').replace('www.', '')
    domain = domain.split('/')[0]
    return domain


def run_tier1_enrichment(df: pd.DataFrame, min_score: int = 40) -> pd.DataFrame:
    """Run Tier 1 API enrichment on qualified accounts."""
    logger.info("=" * 60)
    logger.info(f"TIER 1: API-Based Enrichment (score >= {min_score})")
    logger.info("=" * 60)

    if not APOLLO_API_KEY:
        logger.warning("APOLLO_API_KEY not set - skipping Tier 1")
        logger.warning("Set environment variable: export APOLLO_API_KEY=your_key")
        return df

    # Filter qualified accounts
    qualified = df[df['tier0_score'] >= min_score].copy()
    unqualified = df[df['tier0_score'] < min_score].copy()

    logger.info(f"Qualified accounts: {len(qualified)} (of {len(df)} total)")

    if len(qualified) == 0:
        return df

    results = []
    total = len(qualified)

    for idx, row in qualified.iterrows():
        company = row.get('Company', 'Unknown')
        website = row.get('website_url')
        domain = extract_domain(website)

        try:
            if domain:
                contacts = search_apollo_contacts(domain)
            else:
                contacts = []

            # Calculate stats
            dm_contacts = [c for c in contacts if c.get('seniority') in ['vp', 'director', 'c_suite']]

            results.append({
                'Company': company,
                'contacts_json': json.dumps(contacts) if contacts else None,
                'contact_count': len(contacts),
                'dm_contact_count': len(dm_contacts),
                'has_dm_contact': len(dm_contacts) > 0,
                'top_contact_name': contacts[0].get('name') if contacts else None,
                'top_contact_title': contacts[0].get('title') if contacts else None,
                'top_contact_email': contacts[0].get('email') if contacts else None,
            })

            # Progress
            if (idx + 1) % 50 == 0:
                completed = len(results)
                pct = completed / total * 100
                logger.info(f"Tier 1 Progress: {completed}/{total} ({pct:.1f}%)")

            # Rate limiting
            time.sleep(0.3)

        except Exception as e:
            logger.error(f"Tier 1 error on {company}: {e}")
            results.append({
                'Company': company,
                'contacts_json': None,
                'contact_count': 0,
                'dm_contact_count': 0,
                'has_dm_contact': False,
                'error': str(e)
            })

    results_df = pd.DataFrame(results)
    qualified_enriched = qualified.merge(results_df, on='Company', how='left')

    # Combine with unqualified
    enriched = pd.concat([qualified_enriched, unqualified], ignore_index=True)

    logger.info(f"\nTier 1 Complete!")
    logger.info(f"  Companies with contacts: {(enriched['contact_count'] > 0).sum()}")
    logger.info(f"  Companies with DM contacts: {enriched['has_dm_contact'].sum()}")

    return enriched


# ============================================================================
# FINAL SCORING
# ============================================================================

def calculate_final_score(row: pd.Series) -> int:
    """Calculate final score with all signals."""
    score = row.get('tier0_score', 0) or 0

    # Contact signals
    if row.get('has_dm_contact'):
        score += 20
    elif row.get('contact_count', 0) > 0:
        score += 10

    # Trigger signals
    if row.get('has_trigger_news'):
        score += 15

    return score


def get_final_tier(score: int) -> str:
    """Get final tier label."""
    if score >= 120:
        return 'A'
    elif score >= 100:
        return 'B'
    elif score >= 80:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'E'


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Run full enrichment pipeline."""
    start_time = datetime.now()
    logger.info(f"\n{'='*60}")
    logger.info("FULL ENRICHMENT PIPELINE - TIER 0 + TIER 1")
    logger.info(f"Started: {start_time}")
    logger.info(f"{'='*60}\n")

    # Get script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, INPUT_FILE)
    output_dir = os.path.join(script_dir, OUTPUT_DIR)

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Load data
    logger.info(f"Loading data from {input_path}")
    df = pd.read_csv(input_path)
    logger.info(f"Loaded {len(df)} accounts")

    # Run Tier 0
    df = run_tier0_enrichment(df)

    # Save Tier 0 checkpoint
    tier0_output = os.path.join(output_dir, 'tier0_enriched.csv')
    df.to_csv(tier0_output, index=False)
    logger.info(f"Saved Tier 0 results to {tier0_output}")

    # Run Tier 1
    df = run_tier1_enrichment(df, min_score=TIER1_MIN_SCORE)

    # Calculate final scores
    logger.info("\nCalculating final scores...")
    df['final_score'] = df.apply(calculate_final_score, axis=1)
    df['final_tier'] = df['final_score'].apply(get_final_tier)

    # Sort by final score
    df = df.sort_values('final_score', ascending=False)

    # Save final output
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    final_output = os.path.join(output_dir, f'fully_enriched_{timestamp}.csv')
    df.to_csv(final_output, index=False)
    logger.info(f"\nSaved final results to {final_output}")

    # Also save a latest version
    latest_output = os.path.join(output_dir, 'fully_enriched_latest.csv')
    df.to_csv(latest_output, index=False)

    # Summary
    end_time = datetime.now()
    duration = end_time - start_time

    logger.info(f"\n{'='*60}")
    logger.info("PIPELINE COMPLETE - SUMMARY")
    logger.info(f"{'='*60}")
    logger.info(f"Total accounts: {len(df)}")
    logger.info(f"Duration: {duration}")
    logger.info(f"\nWebsites found: {df['website_url'].notna().sum()}")
    logger.info(f"Trigger news: {df['has_trigger_news'].sum()}")
    if 'contact_count' in df.columns:
        logger.info(f"With contacts: {(df['contact_count'] > 0).sum()}")
        logger.info(f"With DM contacts: {df['has_dm_contact'].sum()}")

    logger.info(f"\nFinal Tier Distribution:")
    logger.info(df['final_tier'].value_counts().to_string())

    logger.info(f"\nTop 20 accounts:")
    top20 = df.head(20)[['Company', 'Category', 'final_score', 'final_tier', 'has_trigger_news']]
    logger.info(top20.to_string(index=False))

    return df


if __name__ == '__main__':
    main()
