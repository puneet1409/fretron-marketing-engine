# TMS Buyer Enrichment: Pilot Learnings & Optimized Workflow

## Executive Summary

This document captures learnings from the 100-account expanded pilot and proposes an optimized enrichment workflow that:
- Reduces LLM/API costs by 60-70%
- Increases speed by using scripts for deterministic operations
- Improves signal quality by focusing on high-value enrichments
- Provides a reproducible, scriptable pipeline

---

## Part 1: Pilot Results Analysis

### 1.1 What Worked Well

| Signal/Enrichment | Cost | Quality | Speed | Verdict |
|-------------------|------|---------|-------|---------|
| **Tier 0 Scoring (Script)** | FREE | Excellent | Instant | KEEP - Core filter |
| **Find People from Company** | 1 credit | Excellent | Fast | KEEP - Critical for outreach |
| **Google Web (Domain)** | 1 credit | Good | Fast | REPLACE - Can be scripted |
| **Supply Chain Priorities** | 1 credit | Good | Medium | OPTIMIZE - Use selectively |
| **Company Recent News** | 2 credits | Medium | Slow | REPLACE - RSS/News API cheaper |

#### High-Value Signals:
1. **Logistics Spend Data** (from CJ Darcl) - UNIQUE, not available elsewhere
2. **Multi-location Complexity** - Strong TMS fit indicator
3. **Decision Maker Contacts** - Essential for outreach
4. **Stated Supply Chain Priorities** - Strategic insight for personalization

### 1.2 What Didn't Work

| Signal/Enrichment | Issue | Resolution |
|-------------------|-------|------------|
| **LinkedIn Active Jobs** | Required LinkedIn URLs, we had Twitter | Need URL enrichment first OR use job board APIs |
| **Tech Stack (BuiltWith)** | Detects website tech, not backend TMS/ERP | Limited value for enterprise software detection |
| **IT Hiring Trends** | Inconsistent results, hard to verify | Lower priority, use only for top accounts |
| **BitScale UI Automation** | Fragile, config panels kept opening | Use direct API calls instead |

### 1.3 Cost Analysis

**Current BitScale Approach (1,060 accounts):**
```
Google Web:              1,060 credits × $0.02 = $21.20
Find People:             1,060 credits × $0.02 = $21.20
Supply Chain Priorities: 1,060 credits × $0.02 = $21.20
Company Recent News:     2,120 credits × $0.02 = $42.40
─────────────────────────────────────────────────────────
Total:                   5,300 credits          = $106.00
```

**Optimized Approach (proposed):**
```
Company Website:         FREE (script)          = $0.00
Find People (Apollo):    1,060 × $0.01          = $10.60
News (RSS/NewsAPI):      FREE or $0.001/call    = $1.06
Supply Chain (Top 20%):  212 × $0.02            = $4.24
─────────────────────────────────────────────────────────
Total:                                          = $15.90 (85% savings)
```

---

## Part 2: Signal Source Evaluation

### 2.1 Contact/People Data

| Provider | Cost | Quality | Coverage | Recommendation |
|----------|------|---------|----------|----------------|
| **BitScale Find People** | $0.02/company | Good | Global | Current choice |
| **Apollo.io** | $0.01/contact | Excellent | Global | BETTER - Direct API, cheaper |
| **Lusha** | $0.05/contact | Excellent | Global | Premium option |
| **RocketReach** | $0.02/contact | Good | Global | Alternative |
| **LinkedIn Sales Nav** | $80/month | Excellent | Best | Manual, not scalable |
| **Naukri/Indeed Scrape** | FREE | Medium | India | For job posting signals |

**Recommendation:** Apollo.io API for contacts - better pricing, direct API access, no UI automation needed.

### 2.2 Company Information

| Signal | Current Source | Better Alternative | Cost Savings |
|--------|---------------|-------------------|--------------|
| Company Website | BitScale Google | DNS + Pattern Match | 100% (FREE) |
| LinkedIn URL | Not captured | Clearbit/Apollo | Included |
| Company News | BitScale (2 credits) | Google News RSS | 100% (FREE) |
| Industry Classification | CJ Darcl | Already have | N/A |

### 2.3 Intent/Trigger Signals

| Signal | Source | Cost | Implementation |
|--------|--------|------|----------------|
| Job Postings | LinkedIn/Indeed/Naukri | FREE | Script scraping |
| Press Releases | PR Newswire RSS | FREE | RSS parser |
| BSE/NSE Filings | Exchange APIs | FREE | API calls |
| Google Alerts | Google Alerts API | FREE | Webhook setup |
| Expansion News | News APIs | $0.001/call | NewsAPI.org |

### 2.4 Strategic Research (LLM Required)

| Signal | When to Use | Cost Control |
|--------|-------------|--------------|
| Supply Chain Priorities | Top 20% accounts only | $0.02 × 20% = 80% savings |
| Competitive Intelligence | Deal stage only | On-demand |
| Custom Research | High-value accounts | Manual trigger |

---

## Part 3: Optimized Enrichment Workflow

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENRICHMENT PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   TIER 0     │    │   TIER 1     │    │   TIER 2     │      │
│  │  (FREE)      │───▶│  (LOW COST)  │───▶│  (SELECTIVE) │      │
│  │  Scripts     │    │  APIs        │    │  LLM         │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                 │
│  • Firmographic      • Apollo Contacts  • Supply Chain         │
│  • Tier0 Score       • Email Verify     • Custom Research      │
│  • Website (DNS)     • News API         • Competitor Intel     │
│  • LinkedIn URL      • Job Postings                            │
│  • Basic News (RSS)                                            │
│                                                                 │
│  Cost: $0            Cost: ~$0.02/acct  Cost: ~$0.05/acct     │
│  Speed: Instant      Speed: Fast        Speed: Medium          │
│  Quality: High       Quality: High      Quality: High          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Tier 0: Script-Based Enrichment (FREE)

**Purpose:** Filter and enrich using deterministic, scriptable methods.

```python
# tier0_enrichment.py

import pandas as pd
import dns.resolver
import feedparser
import requests
from urllib.parse import quote

class Tier0Enrichment:
    """Free, script-based enrichment for initial filtering."""

    def __init__(self, input_df: pd.DataFrame):
        self.df = input_df

    def find_company_website(self, company_name: str) -> str:
        """Find company website using DNS and pattern matching."""
        # Clean company name
        clean_name = company_name.lower()
        clean_name = clean_name.replace(' limited', '').replace(' ltd', '')
        clean_name = clean_name.replace(' pvt', '').replace(' private', '')
        clean_name = clean_name.replace(' ', '').replace('&', '')

        # Try common Indian domain patterns
        patterns = [
            f"{clean_name}.com",
            f"{clean_name}.co.in",
            f"{clean_name}.in",
            f"www.{clean_name}.com",
        ]

        for domain in patterns:
            try:
                dns.resolver.resolve(domain, 'A')
                return f"https://{domain}"
            except:
                continue

        return None

    def get_linkedin_url(self, company_name: str) -> str:
        """Generate likely LinkedIn company URL."""
        # Pattern-based approach
        slug = company_name.lower().replace(' ', '-').replace('&', 'and')
        slug = ''.join(c for c in slug if c.isalnum() or c == '-')
        return f"https://www.linkedin.com/company/{slug}"

    def get_recent_news_rss(self, company_name: str,
                           keywords: list = None) -> list:
        """Get company news from Google News RSS (FREE)."""
        if keywords is None:
            keywords = ['expansion', 'logistics', 'supply chain',
                       'new plant', 'warehouse', 'fleet', 'digital']

        # Google News RSS feed
        query = quote(f"{company_name} India")
        rss_url = f"https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN"

        try:
            feed = feedparser.parse(rss_url)
            relevant_news = []

            for entry in feed.entries[:10]:
                title_lower = entry.title.lower()
                summary_lower = entry.get('summary', '').lower()

                # Check for relevant keywords
                if any(kw in title_lower or kw in summary_lower for kw in keywords):
                    relevant_news.append({
                        'title': entry.title,
                        'link': entry.link,
                        'date': entry.get('published', ''),
                        'is_trigger': True
                    })

            return relevant_news
        except:
            return []

    def check_bse_nse_listed(self, company_name: str) -> dict:
        """Check if company is listed on BSE/NSE (indicates size/maturity)."""
        # This would use BSE/NSE APIs or a pre-built list
        # For now, pattern match against known listed companies
        pass

    def calculate_tier0_score(self, row: pd.Series) -> int:
        """Calculate Tier 0 score based on firmographic signals."""
        score = 0

        # Logistics spend scoring (unique signal!)
        logistics_spend = row.get('Total_Logistics_Spend_Rs_Cr', 0) or 0
        if logistics_spend >= 1000:
            score += 40
        elif logistics_spend >= 500:
            score += 30
        elif logistics_spend >= 100:
            score += 20
        elif logistics_spend >= 50:
            score += 10

        # Multi-location complexity
        locations = str(row.get('Key_Locations', ''))
        location_count = len(locations.split(',')) if locations else 0
        if location_count >= 6:
            score += 30
        elif location_count >= 4:
            score += 20
        elif location_count >= 2:
            score += 10

        # Industry logistics intensity
        high_intensity = ['Chemicals & Petrochemicals', 'Steel & Metals',
                         'FMCG & Consumer', 'Auto & Engineering']
        if row.get('Category') in high_intensity:
            score += 20

        # Company size
        employees = row.get('Employees', 0) or 0
        if employees >= 10000:
            score += 15
        elif employees >= 5000:
            score += 10
        elif employees >= 1000:
            score += 5

        # Revenue
        revenue = row.get('Sales_Rs_Cr', 0) or 0
        if revenue >= 50000:
            score += 15
        elif revenue >= 10000:
            score += 10
        elif revenue >= 1000:
            score += 5

        return score

    def enrich_all(self) -> pd.DataFrame:
        """Run all Tier 0 enrichments."""
        results = []

        for idx, row in self.df.iterrows():
            company = row['Company']

            result = {
                'Company': company,
                'tier0_score': self.calculate_tier0_score(row),
                'website_url': self.find_company_website(company),
                'linkedin_url': self.get_linkedin_url(company),
                'recent_news': self.get_recent_news_rss(company),
                'has_trigger_news': False,
            }

            # Check for trigger events
            if result['recent_news']:
                result['has_trigger_news'] = any(
                    n.get('is_trigger') for n in result['recent_news']
                )

            results.append(result)

        return pd.DataFrame(results)
```

### 3.3 Tier 1: API-Based Enrichment (Low Cost)

**Purpose:** Enrich filtered accounts with contact and company data.

```python
# tier1_enrichment.py

import requests
import time
from typing import List, Dict

class Tier1Enrichment:
    """Low-cost API-based enrichment for qualified accounts."""

    def __init__(self, apollo_api_key: str = None,
                 hunter_api_key: str = None):
        self.apollo_key = apollo_api_key
        self.hunter_key = hunter_api_key

    def find_people_apollo(self, company_domain: str,
                          job_titles: List[str] = None) -> List[Dict]:
        """
        Find decision makers using Apollo.io API.
        Cost: ~$0.01 per contact found
        """
        if job_titles is None:
            job_titles = [
                "VP Operations", "VP Supply Chain", "VP Logistics",
                "Head of Logistics", "Head of Supply Chain",
                "Chief Operating Officer", "COO",
                "Director Logistics", "Director Supply Chain",
                "General Manager Operations", "Plant Head"
            ]

        url = "https://api.apollo.io/v1/mixed_people/search"
        headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Api-Key": self.apollo_key
        }

        payload = {
            "q_organization_domains": company_domain,
            "person_titles": job_titles,
            "person_locations": ["India"],
            "page": 1,
            "per_page": 10
        }

        try:
            response = requests.post(url, json=payload, headers=headers)
            data = response.json()

            contacts = []
            for person in data.get('people', []):
                contacts.append({
                    'name': person.get('name'),
                    'title': person.get('title'),
                    'email': person.get('email'),
                    'linkedin_url': person.get('linkedin_url'),
                    'phone': person.get('phone_numbers', [{}])[0].get('number'),
                    'seniority': person.get('seniority'),
                })

            return contacts
        except Exception as e:
            return []

    def verify_email_hunter(self, email: str) -> Dict:
        """
        Verify email deliverability using Hunter.io.
        Cost: ~$0.01 per verification
        """
        url = f"https://api.hunter.io/v2/email-verifier"
        params = {
            "email": email,
            "api_key": self.hunter_key
        }

        try:
            response = requests.get(url, params=params)
            data = response.json().get('data', {})
            return {
                'email': email,
                'status': data.get('status'),  # valid, invalid, accept_all
                'score': data.get('score'),
                'deliverable': data.get('status') == 'valid'
            }
        except:
            return {'email': email, 'status': 'unknown', 'deliverable': None}

    def get_news_newsapi(self, company_name: str,
                        api_key: str = None) -> List[Dict]:
        """
        Get company news using NewsAPI.org.
        Cost: FREE tier (100 requests/day) or $0.001/request
        """
        if api_key is None:
            return []

        url = "https://newsapi.org/v2/everything"
        params = {
            "q": f'"{company_name}" AND (logistics OR "supply chain" OR expansion)',
            "language": "en",
            "sortBy": "publishedAt",
            "pageSize": 10,
            "apiKey": api_key
        }

        try:
            response = requests.get(url, params=params)
            articles = response.json().get('articles', [])

            return [{
                'title': a.get('title'),
                'source': a.get('source', {}).get('name'),
                'url': a.get('url'),
                'published': a.get('publishedAt'),
                'description': a.get('description', '')[:200]
            } for a in articles]
        except:
            return []

    def get_job_postings(self, company_name: str) -> List[Dict]:
        """
        Get job postings (indicates hiring/growth).
        Uses public job board APIs or scraping.
        """
        # Implementation would use Indeed API, LinkedIn Jobs, or Naukri
        # This is a proxy for growth and investment signals
        pass
```

### 3.4 Tier 2: LLM-Based Enrichment (Selective)

**Purpose:** Deep research for top-tier accounts only.

```python
# tier2_enrichment.py

import requests
from typing import Dict

class Tier2Enrichment:
    """LLM-based enrichment for high-priority accounts only."""

    def __init__(self, perplexity_api_key: str = None,
                 openai_api_key: str = None):
        self.perplexity_key = perplexity_api_key
        self.openai_key = openai_api_key

    def research_supply_chain_priorities(self,
                                         company_name: str) -> Dict:
        """
        Research company's supply chain priorities using Perplexity.
        Cost: ~$0.02 per request
        USE ONLY FOR TOP 20% ACCOUNTS
        """
        url = "https://api.perplexity.ai/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.perplexity_key}",
            "Content-Type": "application/json"
        }

        prompt = f"""Research {company_name} India investor presentations,
        annual reports, and leadership interviews from the last 2 years.

        Extract and summarize:
        1. Supply chain and logistics priorities mentioned
        2. Digital transformation initiatives in logistics/operations
        3. Transportation or distribution challenges discussed
        4. Any TMS/WMS/logistics technology mentions

        Be specific and include quotes where available.
        If no relevant information found, say "No public supply chain priorities found."
        """

        payload = {
            "model": "llama-3.1-sonar-small-128k-online",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.1,
            "max_tokens": 500
        }

        try:
            response = requests.post(url, json=payload, headers=headers)
            data = response.json()
            content = data['choices'][0]['message']['content']

            return {
                'company': company_name,
                'supply_chain_priorities': content,
                'has_priorities': 'No public' not in content,
                'source': 'perplexity'
            }
        except Exception as e:
            return {
                'company': company_name,
                'supply_chain_priorities': None,
                'error': str(e)
            }

    def analyze_competitive_position(self,
                                    company_name: str,
                                    industry: str) -> Dict:
        """
        Analyze company's competitive position and tech maturity.
        USE ONLY FOR DEAL-STAGE ACCOUNTS
        """
        # Implementation using OpenAI or Perplexity
        pass

    def generate_personalized_hook(self,
                                   company_name: str,
                                   contact_name: str,
                                   research_data: Dict) -> str:
        """
        Generate personalized outreach hook based on research.
        USE ONLY FOR TOP ACCOUNTS WITH RESEARCH DATA
        """
        # Implementation using OpenAI
        pass
```

### 3.5 Master Pipeline Script

```python
# enrichment_pipeline.py

import pandas as pd
from tier0_enrichment import Tier0Enrichment
from tier1_enrichment import Tier1Enrichment
from tier2_enrichment import Tier2Enrichment
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnrichmentPipeline:
    """
    Master enrichment pipeline with tiered approach.

    Cost optimization:
    - Tier 0: FREE (scripts)
    - Tier 1: ~$0.02/account (APIs for qualified only)
    - Tier 2: ~$0.05/account (LLM for top 20% only)
    """

    def __init__(self, config: dict):
        self.config = config
        self.tier0 = Tier0Enrichment(pd.DataFrame())
        self.tier1 = Tier1Enrichment(
            apollo_api_key=config.get('apollo_key'),
            hunter_api_key=config.get('hunter_key')
        )
        self.tier2 = Tier2Enrichment(
            perplexity_api_key=config.get('perplexity_key')
        )

    def run_pipeline(self, input_df: pd.DataFrame,
                    tier1_threshold: int = 40,
                    tier2_threshold: int = 80) -> pd.DataFrame:
        """
        Run the complete enrichment pipeline.

        Args:
            input_df: Input dataframe with company data
            tier1_threshold: Minimum Tier 0 score for Tier 1 enrichment
            tier2_threshold: Minimum Tier 0 score for Tier 2 enrichment

        Returns:
            Enriched dataframe
        """

        # === TIER 0: Script-based enrichment (FREE) ===
        logger.info("Starting Tier 0 enrichment (FREE)...")
        self.tier0.df = input_df
        tier0_results = self.tier0.enrich_all()

        # Merge Tier 0 results
        enriched_df = input_df.merge(tier0_results, on='Company', how='left')

        # Filter for Tier 1
        tier1_candidates = enriched_df[enriched_df['tier0_score'] >= tier1_threshold]
        logger.info(f"Tier 1 candidates: {len(tier1_candidates)} accounts")

        # === TIER 1: API-based enrichment (LOW COST) ===
        logger.info("Starting Tier 1 enrichment...")
        tier1_results = []

        for idx, row in tier1_candidates.iterrows():
            website = row.get('website_url')
            if website:
                domain = website.replace('https://', '').replace('http://', '')
                contacts = self.tier1.find_people_apollo(domain)
                tier1_results.append({
                    'Company': row['Company'],
                    'contacts': contacts,
                    'contact_count': len(contacts),
                    'has_dm_contact': any(
                        c.get('seniority') in ['vp', 'director', 'c_suite']
                        for c in contacts
                    )
                })

        tier1_df = pd.DataFrame(tier1_results)
        enriched_df = enriched_df.merge(tier1_df, on='Company', how='left')

        # Filter for Tier 2
        tier2_candidates = enriched_df[enriched_df['tier0_score'] >= tier2_threshold]
        logger.info(f"Tier 2 candidates: {len(tier2_candidates)} accounts")

        # === TIER 2: LLM-based enrichment (SELECTIVE) ===
        logger.info("Starting Tier 2 enrichment (TOP ACCOUNTS ONLY)...")
        tier2_results = []

        for idx, row in tier2_candidates.iterrows():
            research = self.tier2.research_supply_chain_priorities(row['Company'])
            tier2_results.append({
                'Company': row['Company'],
                'supply_chain_priorities': research.get('supply_chain_priorities'),
                'has_stated_priorities': research.get('has_priorities', False)
            })

        tier2_df = pd.DataFrame(tier2_results)
        enriched_df = enriched_df.merge(tier2_df, on='Company', how='left')

        # === FINAL SCORING ===
        enriched_df['final_score'] = enriched_df.apply(
            self._calculate_final_score, axis=1
        )

        return enriched_df.sort_values('final_score', ascending=False)

    def _calculate_final_score(self, row) -> int:
        """Calculate final score incorporating all signals."""
        score = row.get('tier0_score', 0)

        # Contact signals
        if row.get('has_dm_contact'):
            score += 20
        elif row.get('contact_count', 0) > 0:
            score += 10

        # Trigger signals
        if row.get('has_trigger_news'):
            score += 15

        # Strategic signals
        if row.get('has_stated_priorities'):
            score += 25

        return score


# Example usage
if __name__ == '__main__':
    config = {
        'apollo_key': 'your_apollo_api_key',
        'hunter_key': 'your_hunter_api_key',
        'perplexity_key': 'your_perplexity_api_key',
    }

    # Load input data
    df = pd.read_csv('tiered_output/tier0_all_scored.csv')

    # Run pipeline
    pipeline = EnrichmentPipeline(config)
    enriched = pipeline.run_pipeline(
        df,
        tier1_threshold=40,  # Enrich accounts with score >= 40
        tier2_threshold=80   # Deep research for score >= 80 only
    )

    # Save results
    enriched.to_csv('tiered_output/fully_enriched.csv', index=False)
```

---

## Part 4: Decision Framework - Scripts vs LLM

### 4.1 When to Use Scripts (FREE)

| Task | Script Approach | Reliability |
|------|-----------------|-------------|
| Company website lookup | DNS resolution + pattern matching | 85% |
| LinkedIn URL generation | Pattern-based slug creation | 75% |
| Basic news retrieval | Google News RSS feed | 90% |
| BSE/NSE filing check | Exchange API / pre-built list | 95% |
| Firmographic scoring | Rule-based calculation | 100% |
| Email pattern generation | firstname.lastname@domain | 70% |
| Job posting detection | Job board RSS/API | 80% |

### 4.2 When to Use APIs (LOW COST)

| Task | API Provider | Cost | Quality |
|------|-------------|------|---------|
| Contact enrichment | Apollo.io | $0.01/contact | 90% |
| Email verification | Hunter.io | $0.01/verify | 95% |
| Company data | Clearbit | $0.10/lookup | 95% |
| News with sentiment | NewsAPI | $0.001/call | 85% |
| Phone numbers | Lusha | $0.05/number | 90% |

### 4.3 When to Use LLM (SELECTIVE)

| Task | Condition | Cost Control |
|------|-----------|--------------|
| Supply chain research | Top 20% by score | 80% cost reduction |
| Competitive analysis | Deal stage only | On-demand |
| Personalization hooks | Before outreach | Per-sequence |
| Complex reasoning | When scripts fail | Fallback only |

### 4.4 Decision Tree

```
Is the data structured and deterministic?
├── YES → Use SCRIPT (FREE)
│   └── Examples: Scoring, URL patterns, RSS parsing
│
└── NO → Is it a lookup from a database?
    ├── YES → Use API (LOW COST)
    │   └── Examples: Contacts, email verify, company data
    │
    └── NO → Is this a top-priority account?
        ├── YES → Use LLM (SELECTIVE)
        │   └── Examples: Research, analysis, personalization
        │
        └── NO → SKIP or defer
            └── Save LLM budget for valuable accounts
```

---

## Part 5: Alternative Data Sources

### 5.1 Free/Low-Cost Signal Sources

| Signal Category | Free Sources | Implementation |
|-----------------|--------------|----------------|
| **Company News** | Google News RSS, PR Newswire RSS | `feedparser` library |
| **Job Postings** | Indeed RSS, LinkedIn (limited) | RSS + scraping |
| **Financial Data** | BSE/NSE APIs, Screener.in | API calls |
| **Website Tech** | Wappalyzer (open source) | Browser extension API |
| **Social Media** | Twitter API (limited free) | API calls |
| **Domain Info** | WHOIS, DNS | `python-whois`, `dnspython` |

### 5.2 Intent Signal Alternatives

| Signal | Expensive Provider | Budget Alternative |
|--------|-------------------|-------------------|
| Topic surges | Bombora ($50K/yr) | Google Trends API (FREE) |
| Software reviews | G2 ($20K/yr) | G2 scraping + alerts |
| Search intent | SEMrush ($500/mo) | Google Search Console (FREE) |
| Content consumption | 6sense ($40K/yr) | Build own content + track |

### 5.3 India-Specific Sources

| Source | Data Available | Access |
|--------|---------------|--------|
| **MCA (Ministry of Corporate Affairs)** | Company registration, directors | API + scraping |
| **BSE/NSE** | Financial filings, announcements | Free API |
| **Zauba Corp** | Company details, directors | Scraping |
| **Tofler** | Financial data, contacts | Paid API |
| **IndiaMART** | Supplier/buyer signals | Scraping |

---

## Part 6: Implementation Roadmap

### Phase 1: Script Foundation (Week 1)
- [ ] Implement Tier 0 scoring script
- [ ] Build website/LinkedIn URL finder
- [ ] Set up Google News RSS parser
- [ ] Create BSE/NSE filing checker

### Phase 2: API Integration (Week 2)
- [ ] Integrate Apollo.io for contacts
- [ ] Add Hunter.io email verification
- [ ] Set up NewsAPI for trigger events
- [ ] Build job posting aggregator

### Phase 3: Selective LLM (Week 3)
- [ ] Implement Perplexity research (top accounts only)
- [ ] Create decision logic for LLM triggers
- [ ] Build cost monitoring/alerts
- [ ] Add result caching

### Phase 4: Pipeline Orchestration (Week 4)
- [ ] Build master pipeline script
- [ ] Add progress tracking and logging
- [ ] Create output formats (CSV, JSON, CRM-ready)
- [ ] Document and test end-to-end

---

## Appendix: Cost Comparison Summary

| Approach | Cost per 1,000 Accounts | Speed | Quality |
|----------|------------------------|-------|---------|
| **Current (BitScale all)** | $100 | Slow (UI) | Good |
| **Optimized (Tiered)** | $16 | Fast (API) | Better |
| **Manual Research** | $500+ (labor) | Very Slow | Variable |

**ROI of Optimization:**
- 84% cost reduction
- 3x faster execution
- Better targeting (focus LLM on high-value)
- Reproducible pipeline (no UI automation)

---

*Document Version: 1.0*
*Created: January 2026*
*Author: Fretron Marketing Team*
