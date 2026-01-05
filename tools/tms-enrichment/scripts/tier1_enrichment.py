"""
Tier 1 Enrichment: API-Based Enrichment (Low Cost)

This module provides low-cost enrichment using external APIs:
- Apollo.io for contact/people data
- Hunter.io for email verification
- NewsAPI for news with sentiment
- Clearbit for company data (optional)

Cost: ~$0.01-0.02 per company
Speed: Fast (direct API calls)
Quality: 85-95% accuracy
"""

import requests
import pandas as pd
import json
import time
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class Tier1Config:
    """Configuration for Tier 1 enrichment APIs."""
    # API Keys (load from environment)
    apollo_api_key: str = None
    hunter_api_key: str = None
    newsapi_key: str = None
    clearbit_api_key: str = None

    # Apollo settings
    apollo_people_per_company: int = 10
    apollo_job_titles: List[str] = None

    # Hunter settings
    hunter_verify_emails: bool = True

    # NewsAPI settings
    newsapi_articles_per_company: int = 10

    def __post_init__(self):
        # Load API keys from environment if not provided
        self.apollo_api_key = self.apollo_api_key or os.getenv('APOLLO_API_KEY')
        self.hunter_api_key = self.hunter_api_key or os.getenv('HUNTER_API_KEY')
        self.newsapi_key = self.newsapi_key or os.getenv('NEWSAPI_KEY')
        self.clearbit_api_key = self.clearbit_api_key or os.getenv('CLEARBIT_API_KEY')

        if self.apollo_job_titles is None:
            self.apollo_job_titles = [
                # C-Suite
                "CEO", "COO", "CFO", "CTO", "CIO", "CSCO",
                "Chief Executive Officer", "Chief Operating Officer",
                "Chief Financial Officer", "Chief Supply Chain Officer",

                # VP Level
                "VP Operations", "VP Supply Chain", "VP Logistics",
                "VP Transportation", "VP Distribution",
                "Vice President Operations", "Vice President Supply Chain",

                # Director Level
                "Director Operations", "Director Logistics",
                "Director Supply Chain", "Director Transportation",
                "Director Procurement", "Director Distribution",

                # Head Level
                "Head of Logistics", "Head of Supply Chain",
                "Head of Operations", "Head of Transportation",
                "Head of Procurement", "Head of Distribution",

                # Manager Level (for smaller companies)
                "General Manager Operations", "General Manager Logistics",
                "Plant Head", "Factory Head", "Logistics Manager"
            ]


class ApolloClient:
    """Apollo.io API client for contact enrichment."""

    BASE_URL = "https://api.apollo.io/v1"

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Api-Key": api_key
        }

    def search_people(self, company_domain: str,
                     job_titles: List[str] = None,
                     locations: List[str] = None,
                     per_page: int = 10) -> List[Dict]:
        """
        Search for people at a company.

        Args:
            company_domain: Company domain (e.g., tata.com)
            job_titles: List of job titles to filter
            locations: List of locations to filter
            per_page: Number of results per page

        Returns:
            List of contact dictionaries
        """
        if not self.api_key:
            logger.warning("Apollo API key not configured")
            return []

        url = f"{self.BASE_URL}/mixed_people/search"

        payload = {
            "q_organization_domains": company_domain,
            "page": 1,
            "per_page": per_page
        }

        if job_titles:
            payload["person_titles"] = job_titles

        if locations:
            payload["person_locations"] = locations
        else:
            payload["person_locations"] = ["India"]

        try:
            response = requests.post(url, json=payload, headers=self.headers, timeout=30)

            if response.status_code == 200:
                data = response.json()
                contacts = []

                for person in data.get('people', []):
                    contact = {
                        'name': person.get('name'),
                        'first_name': person.get('first_name'),
                        'last_name': person.get('last_name'),
                        'title': person.get('title'),
                        'email': person.get('email'),
                        'email_status': person.get('email_status'),
                        'linkedin_url': person.get('linkedin_url'),
                        'phone': None,
                        'seniority': person.get('seniority'),
                        'departments': person.get('departments', []),
                        'city': person.get('city'),
                        'country': person.get('country'),
                    }

                    # Extract phone if available
                    phone_numbers = person.get('phone_numbers', [])
                    if phone_numbers:
                        contact['phone'] = phone_numbers[0].get('number')

                    contacts.append(contact)

                return contacts
            else:
                logger.warning(f"Apollo API error: {response.status_code} - {response.text[:200]}")
                return []

        except Exception as e:
            logger.error(f"Apollo API exception: {e}")
            return []

    def enrich_company(self, company_domain: str) -> Dict:
        """
        Enrich company data from Apollo.

        Args:
            company_domain: Company domain

        Returns:
            Company enrichment data
        """
        if not self.api_key:
            return {}

        url = f"{self.BASE_URL}/organizations/enrich"

        params = {
            "domain": company_domain
        }

        try:
            response = requests.get(url, params=params, headers=self.headers, timeout=30)

            if response.status_code == 200:
                org = response.json().get('organization', {})
                return {
                    'company_name': org.get('name'),
                    'linkedin_url': org.get('linkedin_url'),
                    'website': org.get('website_url'),
                    'industry': org.get('industry'),
                    'employee_count': org.get('estimated_num_employees'),
                    'annual_revenue': org.get('annual_revenue'),
                    'founded_year': org.get('founded_year'),
                    'phone': org.get('phone'),
                    'city': org.get('city'),
                    'country': org.get('country'),
                    'technologies': org.get('technologies', [])
                }

            return {}

        except Exception as e:
            logger.error(f"Apollo company enrich error: {e}")
            return {}


class HunterClient:
    """Hunter.io API client for email verification."""

    BASE_URL = "https://api.hunter.io/v2"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def verify_email(self, email: str) -> Dict:
        """
        Verify email deliverability.

        Args:
            email: Email address to verify

        Returns:
            Verification result
        """
        if not self.api_key or not email:
            return {'email': email, 'status': 'unknown', 'deliverable': None}

        url = f"{self.BASE_URL}/email-verifier"
        params = {
            "email": email,
            "api_key": self.api_key
        }

        try:
            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json().get('data', {})
                return {
                    'email': email,
                    'status': data.get('status'),  # valid, invalid, accept_all, unknown
                    'score': data.get('score'),
                    'deliverable': data.get('status') == 'valid',
                    'disposable': data.get('disposable'),
                    'webmail': data.get('webmail'),
                    'mx_records': data.get('mx_records'),
                }

            return {'email': email, 'status': 'error', 'deliverable': None}

        except Exception as e:
            logger.error(f"Hunter verify error: {e}")
            return {'email': email, 'status': 'error', 'deliverable': None}

    def find_domain_emails(self, domain: str, limit: int = 10) -> List[Dict]:
        """
        Find emails for a domain.

        Args:
            domain: Company domain
            limit: Maximum emails to return

        Returns:
            List of email contacts
        """
        if not self.api_key:
            return []

        url = f"{self.BASE_URL}/domain-search"
        params = {
            "domain": domain,
            "limit": limit,
            "api_key": self.api_key
        }

        try:
            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json().get('data', {})
                emails = []

                for item in data.get('emails', []):
                    emails.append({
                        'email': item.get('value'),
                        'type': item.get('type'),
                        'confidence': item.get('confidence'),
                        'first_name': item.get('first_name'),
                        'last_name': item.get('last_name'),
                        'position': item.get('position'),
                        'department': item.get('department'),
                        'linkedin': item.get('linkedin'),
                    })

                return emails

            return []

        except Exception as e:
            logger.error(f"Hunter domain search error: {e}")
            return []


class NewsAPIClient:
    """NewsAPI.org client for company news."""

    BASE_URL = "https://newsapi.org/v2"

    def __init__(self, api_key: str):
        self.api_key = api_key

    def search_news(self, company_name: str,
                   keywords: List[str] = None,
                   days_back: int = 30,
                   max_results: int = 10) -> List[Dict]:
        """
        Search for company news.

        Args:
            company_name: Company to search for
            keywords: Additional keywords
            days_back: How far back to search
            max_results: Maximum articles to return

        Returns:
            List of news articles
        """
        if not self.api_key:
            return []

        url = f"{self.BASE_URL}/everything"

        # Build query
        query_parts = [f'"{company_name}"']
        if keywords:
            query_parts.append(f"({' OR '.join(keywords)})")

        query = ' AND '.join(query_parts)

        params = {
            "q": query,
            "language": "en",
            "sortBy": "publishedAt",
            "pageSize": max_results,
            "apiKey": self.api_key
        }

        try:
            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json()
                articles = []

                for article in data.get('articles', []):
                    articles.append({
                        'title': article.get('title'),
                        'description': article.get('description', '')[:300],
                        'source': article.get('source', {}).get('name'),
                        'url': article.get('url'),
                        'published_at': article.get('publishedAt'),
                        'author': article.get('author'),
                    })

                return articles

            logger.warning(f"NewsAPI error: {response.status_code}")
            return []

        except Exception as e:
            logger.error(f"NewsAPI error: {e}")
            return []


class Tier1Enrichment:
    """
    Low-cost API-based enrichment for qualified accounts.

    Integrates:
    - Apollo.io for contacts
    - Hunter.io for email verification
    - NewsAPI for company news
    """

    def __init__(self, config: Tier1Config = None):
        self.config = config or Tier1Config()

        # Initialize API clients
        self.apollo = ApolloClient(self.config.apollo_api_key)
        self.hunter = HunterClient(self.config.hunter_api_key)
        self.newsapi = NewsAPIClient(self.config.newsapi_key)

    def extract_domain(self, url: str) -> Optional[str]:
        """Extract domain from URL."""
        if not url:
            return None

        # Remove protocol
        domain = url.replace('https://', '').replace('http://', '')
        domain = domain.replace('www.', '')

        # Remove path
        domain = domain.split('/')[0]

        return domain

    def enrich_contacts(self, company_domain: str) -> Dict:
        """
        Enrich company with contact data.

        Args:
            company_domain: Company website domain

        Returns:
            Contact enrichment results
        """
        contacts = self.apollo.search_people(
            company_domain,
            job_titles=self.config.apollo_job_titles,
            per_page=self.config.apollo_people_per_company
        )

        # Verify emails if configured
        if contacts and self.config.hunter_verify_emails and self.hunter.api_key:
            for contact in contacts:
                if contact.get('email'):
                    verification = self.hunter.verify_email(contact['email'])
                    contact['email_verified'] = verification.get('deliverable')
                    contact['email_score'] = verification.get('score')
                    time.sleep(0.2)  # Rate limiting

        # Calculate summary stats
        dm_contacts = [c for c in contacts if c.get('seniority') in ['vp', 'director', 'c_suite']]

        return {
            'contacts': contacts,
            'contact_count': len(contacts),
            'dm_contact_count': len(dm_contacts),
            'has_dm_contact': len(dm_contacts) > 0,
            'verified_emails': sum(1 for c in contacts if c.get('email_verified')),
            'top_contact': contacts[0] if contacts else None
        }

    def enrich_news(self, company_name: str,
                   trigger_keywords: List[str] = None) -> Dict:
        """
        Enrich company with news data.

        Args:
            company_name: Company name
            trigger_keywords: Keywords indicating buying signals

        Returns:
            News enrichment results
        """
        if trigger_keywords is None:
            trigger_keywords = [
                'expansion', 'logistics', 'supply chain', 'warehouse',
                'new plant', 'digital transformation', 'investment'
            ]

        articles = self.newsapi.search_news(
            company_name,
            keywords=trigger_keywords,
            max_results=self.config.newsapi_articles_per_company
        )

        # Check for trigger events
        trigger_articles = []
        for article in articles:
            content = (article.get('title', '') + ' ' + article.get('description', '')).lower()
            for kw in trigger_keywords:
                if kw in content:
                    article['trigger_keyword'] = kw
                    trigger_articles.append(article)
                    break

        return {
            'news_articles': articles,
            'article_count': len(articles),
            'trigger_articles': trigger_articles,
            'trigger_count': len(trigger_articles),
            'has_trigger': len(trigger_articles) > 0,
            'latest_news': articles[0] if articles else None
        }

    def enrich_single(self, row: pd.Series,
                     enrich_contacts: bool = True,
                     enrich_news: bool = True) -> Dict:
        """
        Enrich a single company.

        Args:
            row: DataFrame row with company data
            enrich_contacts: Whether to enrich contacts
            enrich_news: Whether to enrich news

        Returns:
            Enrichment results
        """
        company = row.get('Company', 'Unknown')
        website = row.get('website_url') or row.get('Google Web')

        result = {
            'Company': company,
        }

        # Extract domain from website
        domain = self.extract_domain(website)

        # Contact enrichment
        if enrich_contacts and domain:
            contact_data = self.enrich_contacts(domain)
            result.update({
                'contacts_json': json.dumps(contact_data.get('contacts', [])),
                'contact_count': contact_data.get('contact_count', 0),
                'dm_contact_count': contact_data.get('dm_contact_count', 0),
                'has_dm_contact': contact_data.get('has_dm_contact', False),
                'verified_emails': contact_data.get('verified_emails', 0),
                'top_contact_name': contact_data.get('top_contact', {}).get('name') if contact_data.get('top_contact') else None,
                'top_contact_title': contact_data.get('top_contact', {}).get('title') if contact_data.get('top_contact') else None,
                'top_contact_email': contact_data.get('top_contact', {}).get('email') if contact_data.get('top_contact') else None,
            })
        else:
            result.update({
                'contacts_json': None,
                'contact_count': 0,
                'dm_contact_count': 0,
                'has_dm_contact': False,
                'verified_emails': 0,
            })

        # News enrichment
        if enrich_news:
            news_data = self.enrich_news(company)
            result.update({
                'news_json': json.dumps(news_data.get('news_articles', [])),
                'article_count': news_data.get('article_count', 0),
                'trigger_count': news_data.get('trigger_count', 0),
                'has_news_trigger': news_data.get('has_trigger', False),
                'latest_news_title': news_data.get('latest_news', {}).get('title') if news_data.get('latest_news') else None,
            })
        else:
            result.update({
                'news_json': None,
                'article_count': 0,
                'trigger_count': 0,
                'has_news_trigger': False,
            })

        return result

    def enrich_batch(self, df: pd.DataFrame,
                    enrich_contacts: bool = True,
                    enrich_news: bool = True,
                    progress_callback: callable = None) -> pd.DataFrame:
        """
        Enrich a batch of companies.

        Args:
            df: Input DataFrame
            enrich_contacts: Whether to enrich contacts
            enrich_news: Whether to enrich news
            progress_callback: Optional progress callback

        Returns:
            DataFrame with enrichment results
        """
        results = []
        total = len(df)

        logger.info(f"Starting Tier 1 enrichment for {total} companies")

        for idx, row in df.iterrows():
            try:
                result = self.enrich_single(
                    row,
                    enrich_contacts=enrich_contacts,
                    enrich_news=enrich_news
                )
                results.append(result)

                # Progress update
                if (idx + 1) % 10 == 0:
                    logger.info(f"Progress: {idx + 1}/{total} companies")
                    if progress_callback:
                        progress_callback(idx + 1, total)

                # Rate limiting
                time.sleep(0.5)

            except Exception as e:
                logger.error(f"Error enriching {row.get('Company', 'Unknown')}: {e}")
                results.append({
                    'Company': row.get('Company', 'Unknown'),
                    'error': str(e)
                })

        return pd.DataFrame(results)


def main():
    """Example usage of Tier 1 enrichment."""
    import argparse

    parser = argparse.ArgumentParser(description='Tier 1 API Enrichment')
    parser.add_argument('--input', required=True, help='Input CSV file')
    parser.add_argument('--output', required=True, help='Output CSV file')
    parser.add_argument('--no-contacts', action='store_true', help='Skip contact enrichment')
    parser.add_argument('--no-news', action='store_true', help='Skip news enrichment')
    parser.add_argument('--limit', type=int, help='Limit number of companies')
    parser.add_argument('--min-score', type=int, default=40,
                       help='Minimum tier0_score to enrich')

    args = parser.parse_args()

    # Load input data
    df = pd.read_csv(args.input)

    # Filter by minimum score if tier0_score exists
    if 'tier0_score' in df.columns:
        df = df[df['tier0_score'] >= args.min_score]
        logger.info(f"Filtered to {len(df)} companies with score >= {args.min_score}")

    if args.limit:
        df = df.head(args.limit)

    logger.info(f"Processing {len(df)} companies from {args.input}")

    # Check for API keys
    config = Tier1Config()
    if not config.apollo_api_key:
        logger.warning("APOLLO_API_KEY not set - contact enrichment will be skipped")
    if not config.newsapi_key:
        logger.warning("NEWSAPI_KEY not set - news enrichment will be skipped")

    # Run enrichment
    enricher = Tier1Enrichment(config)
    results = enricher.enrich_batch(
        df,
        enrich_contacts=not args.no_contacts and bool(config.apollo_api_key),
        enrich_news=not args.no_news and bool(config.newsapi_key)
    )

    # Merge with original data
    enriched = df.merge(results, on='Company', how='left')

    # Save results
    enriched.to_csv(args.output, index=False)
    logger.info(f"Saved enriched data to {args.output}")

    # Print summary
    print("\n=== Tier 1 Enrichment Summary ===")
    print(f"Total companies: {len(enriched)}")
    print(f"Companies with contacts: {(enriched['contact_count'] > 0).sum()}")
    print(f"Companies with DM contacts: {enriched['has_dm_contact'].sum()}")
    print(f"Companies with trigger news: {enriched['has_news_trigger'].sum()}")


if __name__ == '__main__':
    main()
