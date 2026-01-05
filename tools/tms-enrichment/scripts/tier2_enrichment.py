"""
Tier 2 Enrichment: LLM-Based Enrichment (Selective)

This module provides high-value LLM-based enrichment for top accounts:
- Perplexity AI for supply chain research
- OpenAI for personalized messaging
- Claude for competitive analysis

IMPORTANT: Use selectively (top 20% of accounts) to control costs.

Cost: ~$0.02-0.05 per company
Speed: Medium (API latency)
Quality: 90-95% accuracy
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
class Tier2Config:
    """Configuration for Tier 2 LLM enrichment."""
    # API Keys
    perplexity_api_key: str = None
    openai_api_key: str = None
    anthropic_api_key: str = None

    # Perplexity settings
    perplexity_model: str = "llama-3.1-sonar-small-128k-online"
    perplexity_max_tokens: int = 800
    perplexity_temperature: float = 0.1

    # OpenAI settings
    openai_model: str = "gpt-4o-mini"
    openai_max_tokens: int = 500

    # Research prompts
    supply_chain_prompt_template: str = None
    competitive_intel_prompt_template: str = None
    personalization_prompt_template: str = None

    def __post_init__(self):
        # Load API keys from environment
        self.perplexity_api_key = self.perplexity_api_key or os.getenv('PERPLEXITY_API_KEY')
        self.openai_api_key = self.openai_api_key or os.getenv('OPENAI_API_KEY')
        self.anthropic_api_key = self.anthropic_api_key or os.getenv('ANTHROPIC_API_KEY')

        # Default prompts
        if self.supply_chain_prompt_template is None:
            self.supply_chain_prompt_template = """Research {company_name} India - specifically looking at investor presentations,
annual reports, and leadership interviews from the last 2 years.

Extract and summarize:
1. **Supply Chain Priorities**: Any stated goals or initiatives around supply chain, logistics, or distribution
2. **Digital Transformation**: Initiatives related to logistics technology, automation, or digital operations
3. **Transportation Challenges**: Pain points mentioned around fleet, transportation, or delivery
4. **Technology Stack**: Any mentions of TMS, WMS, ERP systems (SAP, Oracle, etc.)
5. **Recent Investments**: Capex or investments in logistics infrastructure (warehouses, fleet, tech)

Be specific and include quotes where available.
If no relevant information found, state "No public supply chain priorities found."
Format your response with clear headers for each section."""

        if self.competitive_intel_prompt_template is None:
            self.competitive_intel_prompt_template = """Research {company_name} in the {industry} industry in India.

Analyze:
1. **Current Systems**: What logistics/supply chain software do they likely use? (based on job postings, tech news, partnerships)
2. **Pain Points**: Common challenges for companies of this size/industry in India
3. **Decision Timeline**: Any indicators of upcoming technology decisions (budget cycles, leadership changes, strategic plans)
4. **Competitors**: Who are their main competitors and what logistics tech do those competitors use?
5. **Differentiators**: What makes this company unique that might affect their logistics needs?

Focus on actionable intelligence for a TMS sales conversation."""

        if self.personalization_prompt_template is None:
            self.personalization_prompt_template = """Based on the following company research, create a personalized outreach hook:

Company: {company_name}
Industry: {industry}
Contact: {contact_name} ({contact_title})
Research: {research_summary}

Create:
1. A compelling 2-sentence opening that references specific company initiatives
2. A relevant pain point or opportunity based on the research
3. A soft call-to-action appropriate for a first touch

The tone should be professional but conversational. Do not be salesy or pushy.
Focus on providing value and showing genuine understanding of their business."""


class PerplexityClient:
    """Perplexity AI client for research queries."""

    BASE_URL = "https://api.perplexity.ai/chat/completions"

    def __init__(self, api_key: str, model: str = "llama-3.1-sonar-small-128k-online"):
        self.api_key = api_key
        self.model = model
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    def research(self, prompt: str,
                max_tokens: int = 800,
                temperature: float = 0.1) -> Dict:
        """
        Run a research query.

        Args:
            prompt: Research prompt
            max_tokens: Maximum response tokens
            temperature: Response temperature

        Returns:
            Research results
        """
        if not self.api_key:
            logger.warning("Perplexity API key not configured")
            return {'content': None, 'error': 'API key not configured'}

        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        try:
            response = requests.post(
                self.BASE_URL,
                json=payload,
                headers=self.headers,
                timeout=60
            )

            if response.status_code == 200:
                data = response.json()
                content = data['choices'][0]['message']['content']

                return {
                    'content': content,
                    'model': self.model,
                    'usage': data.get('usage', {}),
                    'citations': data.get('citations', [])
                }
            else:
                logger.warning(f"Perplexity error: {response.status_code} - {response.text[:200]}")
                return {'content': None, 'error': f"API error: {response.status_code}"}

        except Exception as e:
            logger.error(f"Perplexity exception: {e}")
            return {'content': None, 'error': str(e)}


class OpenAIClient:
    """OpenAI client for content generation."""

    BASE_URL = "https://api.openai.com/v1/chat/completions"

    def __init__(self, api_key: str, model: str = "gpt-4o-mini"):
        self.api_key = api_key
        self.model = model
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    def generate(self, prompt: str,
                system_prompt: str = None,
                max_tokens: int = 500,
                temperature: float = 0.7) -> Dict:
        """
        Generate content.

        Args:
            prompt: User prompt
            system_prompt: System prompt
            max_tokens: Maximum tokens
            temperature: Response temperature

        Returns:
            Generation results
        """
        if not self.api_key:
            logger.warning("OpenAI API key not configured")
            return {'content': None, 'error': 'API key not configured'}

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        try:
            response = requests.post(
                self.BASE_URL,
                json=payload,
                headers=self.headers,
                timeout=60
            )

            if response.status_code == 200:
                data = response.json()
                content = data['choices'][0]['message']['content']

                return {
                    'content': content,
                    'model': self.model,
                    'usage': data.get('usage', {})
                }
            else:
                logger.warning(f"OpenAI error: {response.status_code} - {response.text[:200]}")
                return {'content': None, 'error': f"API error: {response.status_code}"}

        except Exception as e:
            logger.error(f"OpenAI exception: {e}")
            return {'content': None, 'error': str(e)}


class Tier2Enrichment:
    """
    LLM-based enrichment for high-priority accounts only.

    Use Criteria (top 20%):
    - tier0_score >= 80
    - Has decision maker contacts
    - In target industry

    Capabilities:
    - Supply chain research via Perplexity
    - Competitive intelligence
    - Personalized outreach hooks
    """

    def __init__(self, config: Tier2Config = None):
        self.config = config or Tier2Config()

        # Initialize LLM clients
        self.perplexity = PerplexityClient(
            self.config.perplexity_api_key,
            self.config.perplexity_model
        )
        self.openai = OpenAIClient(
            self.config.openai_api_key,
            self.config.openai_model
        )

    def research_supply_chain(self, company_name: str) -> Dict:
        """
        Research company's supply chain priorities.

        Args:
            company_name: Company to research

        Returns:
            Research results
        """
        prompt = self.config.supply_chain_prompt_template.format(
            company_name=company_name
        )

        result = self.perplexity.research(
            prompt,
            max_tokens=self.config.perplexity_max_tokens,
            temperature=self.config.perplexity_temperature
        )

        return {
            'company': company_name,
            'supply_chain_research': result.get('content'),
            'has_priorities': result.get('content') and 'No public' not in result.get('content', ''),
            'citations': result.get('citations', []),
            'error': result.get('error')
        }

    def research_competitive_intel(self, company_name: str,
                                   industry: str) -> Dict:
        """
        Research competitive intelligence for deal stage.

        Args:
            company_name: Company name
            industry: Industry category

        Returns:
            Competitive intelligence
        """
        prompt = self.config.competitive_intel_prompt_template.format(
            company_name=company_name,
            industry=industry
        )

        result = self.perplexity.research(
            prompt,
            max_tokens=self.config.perplexity_max_tokens,
            temperature=self.config.perplexity_temperature
        )

        return {
            'company': company_name,
            'competitive_intel': result.get('content'),
            'has_intel': bool(result.get('content')),
            'error': result.get('error')
        }

    def generate_personalized_hook(self, company_name: str,
                                   industry: str,
                                   contact_name: str,
                                   contact_title: str,
                                   research_summary: str) -> Dict:
        """
        Generate personalized outreach hook.

        Args:
            company_name: Company name
            industry: Industry
            contact_name: Contact name
            contact_title: Contact title
            research_summary: Previous research summary

        Returns:
            Personalized hook
        """
        prompt = self.config.personalization_prompt_template.format(
            company_name=company_name,
            industry=industry,
            contact_name=contact_name,
            contact_title=contact_title,
            research_summary=research_summary
        )

        system_prompt = """You are an expert B2B sales writer specializing in enterprise logistics software.
Your hooks are personalized, value-focused, and never pushy. You always reference specific company
initiatives or challenges."""

        result = self.openai.generate(
            prompt,
            system_prompt=system_prompt,
            max_tokens=self.config.openai_max_tokens,
            temperature=0.7
        )

        return {
            'company': company_name,
            'contact': contact_name,
            'personalized_hook': result.get('content'),
            'error': result.get('error')
        }

    def enrich_single(self, row: pd.Series,
                     include_supply_chain: bool = True,
                     include_competitive_intel: bool = False,
                     include_personalization: bool = False) -> Dict:
        """
        Enrich a single high-priority company.

        Args:
            row: DataFrame row
            include_supply_chain: Research supply chain priorities
            include_competitive_intel: Research competitive intelligence
            include_personalization: Generate personalized hooks

        Returns:
            Enrichment results
        """
        company = row.get('Company', 'Unknown')
        industry = row.get('Category', '')

        result = {
            'Company': company,
        }

        # Supply chain research
        if include_supply_chain:
            sc_result = self.research_supply_chain(company)
            result.update({
                'supply_chain_research': sc_result.get('supply_chain_research'),
                'has_stated_priorities': sc_result.get('has_priorities', False),
                'research_citations': json.dumps(sc_result.get('citations', [])),
            })
            time.sleep(1)  # Rate limiting

        # Competitive intel (usually only for deal stage)
        if include_competitive_intel:
            ci_result = self.research_competitive_intel(company, industry)
            result.update({
                'competitive_intel': ci_result.get('competitive_intel'),
                'has_competitive_intel': ci_result.get('has_intel', False),
            })
            time.sleep(1)

        # Personalization (requires prior research)
        if include_personalization and result.get('supply_chain_research'):
            contact_name = row.get('top_contact_name', '')
            contact_title = row.get('top_contact_title', '')

            if contact_name:
                hook_result = self.generate_personalized_hook(
                    company, industry, contact_name, contact_title,
                    result.get('supply_chain_research', '')
                )
                result.update({
                    'personalized_hook': hook_result.get('personalized_hook'),
                })
                time.sleep(1)

        return result

    def enrich_batch(self, df: pd.DataFrame,
                    include_supply_chain: bool = True,
                    include_competitive_intel: bool = False,
                    include_personalization: bool = False,
                    progress_callback: callable = None) -> pd.DataFrame:
        """
        Enrich a batch of high-priority companies.

        IMPORTANT: Filter to top accounts before calling this method.

        Args:
            df: Input DataFrame (should be pre-filtered to top accounts)
            include_supply_chain: Research supply chain
            include_competitive_intel: Research competitive intel
            include_personalization: Generate hooks
            progress_callback: Progress callback

        Returns:
            DataFrame with enrichment results
        """
        results = []
        total = len(df)

        logger.info(f"Starting Tier 2 LLM enrichment for {total} companies")
        logger.warning(f"Estimated cost: ${total * 0.02:.2f} - ${total * 0.05:.2f}")

        for idx, row in df.iterrows():
            try:
                result = self.enrich_single(
                    row,
                    include_supply_chain=include_supply_chain,
                    include_competitive_intel=include_competitive_intel,
                    include_personalization=include_personalization
                )
                results.append(result)

                # Progress update
                if (idx + 1) % 5 == 0:
                    logger.info(f"Progress: {idx + 1}/{total} companies")
                    if progress_callback:
                        progress_callback(idx + 1, total)

            except Exception as e:
                logger.error(f"Error enriching {row.get('Company', 'Unknown')}: {e}")
                results.append({
                    'Company': row.get('Company', 'Unknown'),
                    'error': str(e)
                })

        return pd.DataFrame(results)


def main():
    """Example usage of Tier 2 enrichment."""
    import argparse

    parser = argparse.ArgumentParser(description='Tier 2 LLM Enrichment (Selective)')
    parser.add_argument('--input', required=True, help='Input CSV file')
    parser.add_argument('--output', required=True, help='Output CSV file')
    parser.add_argument('--min-score', type=int, default=80,
                       help='Minimum tier0_score to enrich (default: 80)')
    parser.add_argument('--limit', type=int, help='Limit number of companies')
    parser.add_argument('--competitive-intel', action='store_true',
                       help='Include competitive intelligence')
    parser.add_argument('--personalization', action='store_true',
                       help='Generate personalized hooks')

    args = parser.parse_args()

    # Load input data
    df = pd.read_csv(args.input)

    # Filter to top accounts
    if 'tier0_score' in df.columns:
        df = df[df['tier0_score'] >= args.min_score]
        logger.info(f"Filtered to {len(df)} companies with score >= {args.min_score}")

    if args.limit:
        df = df.head(args.limit)

    logger.info(f"Processing {len(df)} TOP accounts from {args.input}")

    # Check for API keys
    config = Tier2Config()
    if not config.perplexity_api_key:
        logger.error("PERPLEXITY_API_KEY not set - cannot proceed")
        return

    # Warn about costs
    estimated_cost = len(df) * 0.03
    logger.warning(f"Estimated cost: ${estimated_cost:.2f}")
    response = input(f"Proceed with enrichment of {len(df)} companies? (y/n): ")
    if response.lower() != 'y':
        logger.info("Cancelled by user")
        return

    # Run enrichment
    enricher = Tier2Enrichment(config)
    results = enricher.enrich_batch(
        df,
        include_supply_chain=True,
        include_competitive_intel=args.competitive_intel,
        include_personalization=args.personalization
    )

    # Merge with original data
    enriched = df.merge(results, on='Company', how='left')

    # Save results
    enriched.to_csv(args.output, index=False)
    logger.info(f"Saved enriched data to {args.output}")

    # Print summary
    print("\n=== Tier 2 Enrichment Summary ===")
    print(f"Total companies: {len(enriched)}")
    print(f"Companies with stated priorities: {enriched['has_stated_priorities'].sum()}")
    if 'has_competitive_intel' in enriched.columns:
        print(f"Companies with competitive intel: {enriched['has_competitive_intel'].sum()}")
    if 'personalized_hook' in enriched.columns:
        print(f"Companies with personalized hooks: {enriched['personalized_hook'].notna().sum()}")


if __name__ == '__main__':
    main()
