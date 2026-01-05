"""
Master Enrichment Pipeline

Orchestrates the tiered enrichment workflow:
- Tier 0: FREE script-based (all accounts)
- Tier 1: API-based (qualified accounts, score >= 40)
- Tier 2: LLM-based (top accounts, score >= 80)

Cost Optimization:
- Tier 0: $0 (scripts)
- Tier 1: ~$0.02/account (APIs for qualified only)
- Tier 2: ~$0.05/account (LLM for top 20% only)

Total estimated: ~$16 per 1,000 accounts (vs $100+ with all-LLM approach)
"""

import pandas as pd
import json
import os
import argparse
from datetime import datetime
from typing import Dict, Optional
import logging

# Import tier modules
from tier0_enrichment import Tier0Enrichment, Tier0Config
from tier1_enrichment import Tier1Enrichment, Tier1Config
from tier2_enrichment import Tier2Enrichment, Tier2Config

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class EnrichmentPipeline:
    """
    Master enrichment pipeline with tiered approach.

    Architecture:
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │   TIER 0     │    │   TIER 1     │    │   TIER 2     │
    │  (FREE)      │───▶│  (LOW COST)  │───▶│  (SELECTIVE) │
    │  Scripts     │    │  APIs        │    │  LLM         │
    └──────────────┘    └──────────────┘    └──────────────┘

    Cost: $0              Cost: ~$0.02      Cost: ~$0.05
    All accounts         Score >= 40       Score >= 80
    """

    def __init__(self,
                 tier0_config: Tier0Config = None,
                 tier1_config: Tier1Config = None,
                 tier2_config: Tier2Config = None):
        """
        Initialize the pipeline.

        Args:
            tier0_config: Configuration for Tier 0
            tier1_config: Configuration for Tier 1
            tier2_config: Configuration for Tier 2
        """
        self.tier0 = Tier0Enrichment(tier0_config or Tier0Config())
        self.tier1 = Tier1Enrichment(tier1_config or Tier1Config())
        self.tier2 = Tier2Enrichment(tier2_config or Tier2Config())

        # Tracking
        self.stats = {
            'total_accounts': 0,
            'tier0_enriched': 0,
            'tier1_enriched': 0,
            'tier2_enriched': 0,
            'estimated_cost': 0.0
        }

    def run_tier0(self, df: pd.DataFrame,
                  include_news: bool = True) -> pd.DataFrame:
        """
        Run Tier 0 enrichment (FREE, all accounts).

        Args:
            df: Input DataFrame
            include_news: Include RSS news fetch

        Returns:
            DataFrame with Tier 0 enrichment
        """
        logger.info("=" * 60)
        logger.info("TIER 0: Script-Based Enrichment (FREE)")
        logger.info("=" * 60)

        results = self.tier0.enrich_batch(df, include_news=include_news)

        # Merge results
        enriched = df.merge(results, on='Company', how='left')

        self.stats['tier0_enriched'] = len(enriched)

        # Log summary
        logger.info(f"Tier 0 complete: {len(enriched)} accounts")
        logger.info(f"  - Websites found: {enriched['website_url'].notna().sum()}")
        logger.info(f"  - Trigger news: {enriched['has_trigger_news'].sum()}")

        return enriched

    def run_tier1(self, df: pd.DataFrame,
                  min_score: int = 40,
                  enrich_contacts: bool = True,
                  enrich_news: bool = True) -> pd.DataFrame:
        """
        Run Tier 1 enrichment (APIs, qualified accounts).

        Args:
            df: DataFrame with Tier 0 data
            min_score: Minimum tier0_score to enrich
            enrich_contacts: Include contact enrichment
            enrich_news: Include news enrichment

        Returns:
            DataFrame with Tier 1 enrichment
        """
        logger.info("=" * 60)
        logger.info(f"TIER 1: API-Based Enrichment (score >= {min_score})")
        logger.info("=" * 60)

        # Filter to qualified accounts
        qualified = df[df['tier0_score'] >= min_score].copy()
        unqualified = df[df['tier0_score'] < min_score].copy()

        logger.info(f"Qualified accounts: {len(qualified)} (of {len(df)} total)")

        if len(qualified) == 0:
            logger.warning("No qualified accounts for Tier 1")
            return df

        # Run Tier 1 enrichment
        results = self.tier1.enrich_batch(
            qualified,
            enrich_contacts=enrich_contacts,
            enrich_news=enrich_news
        )

        # Merge results
        qualified_enriched = qualified.merge(results, on='Company', how='left')

        # Combine with unqualified
        enriched = pd.concat([qualified_enriched, unqualified], ignore_index=True)

        self.stats['tier1_enriched'] = len(qualified)
        self.stats['estimated_cost'] += len(qualified) * 0.02

        # Log summary
        logger.info(f"Tier 1 complete: {len(qualified)} accounts enriched")
        if 'contact_count' in enriched.columns:
            logger.info(f"  - With contacts: {(enriched['contact_count'] > 0).sum()}")
            logger.info(f"  - With DM contacts: {enriched['has_dm_contact'].sum()}")

        return enriched

    def run_tier2(self, df: pd.DataFrame,
                  min_score: int = 80,
                  include_competitive_intel: bool = False,
                  include_personalization: bool = False) -> pd.DataFrame:
        """
        Run Tier 2 enrichment (LLM, top accounts only).

        Args:
            df: DataFrame with Tier 1 data
            min_score: Minimum tier0_score for LLM research
            include_competitive_intel: Include competitive analysis
            include_personalization: Generate personalized hooks

        Returns:
            DataFrame with Tier 2 enrichment
        """
        logger.info("=" * 60)
        logger.info(f"TIER 2: LLM-Based Enrichment (score >= {min_score})")
        logger.info("=" * 60)

        # Filter to top accounts
        top_accounts = df[df['tier0_score'] >= min_score].copy()
        other_accounts = df[df['tier0_score'] < min_score].copy()

        logger.info(f"Top accounts for LLM: {len(top_accounts)} (of {len(df)} total)")

        if len(top_accounts) == 0:
            logger.warning("No accounts qualify for Tier 2")
            return df

        # Warn about cost
        estimated_cost = len(top_accounts) * 0.03
        logger.warning(f"Estimated Tier 2 cost: ${estimated_cost:.2f}")

        # Run Tier 2 enrichment
        results = self.tier2.enrich_batch(
            top_accounts,
            include_supply_chain=True,
            include_competitive_intel=include_competitive_intel,
            include_personalization=include_personalization
        )

        # Merge results
        top_enriched = top_accounts.merge(results, on='Company', how='left')

        # Combine with other accounts
        enriched = pd.concat([top_enriched, other_accounts], ignore_index=True)

        self.stats['tier2_enriched'] = len(top_accounts)
        self.stats['estimated_cost'] += len(top_accounts) * 0.03

        # Log summary
        logger.info(f"Tier 2 complete: {len(top_accounts)} accounts enriched")
        if 'has_stated_priorities' in enriched.columns:
            logger.info(f"  - With stated priorities: {enriched['has_stated_priorities'].sum()}")

        return enriched

    def calculate_final_score(self, row: pd.Series) -> int:
        """
        Calculate final score incorporating all signals.

        Args:
            row: DataFrame row with all enrichment data

        Returns:
            Final priority score
        """
        score = row.get('tier0_score', 0) or 0

        # Contact signals
        if row.get('has_dm_contact'):
            score += 20
        elif row.get('contact_count', 0) > 0:
            score += 10

        # Trigger signals
        if row.get('has_trigger_news'):
            score += 15
        if row.get('has_news_trigger'):
            score += 10

        # Strategic signals
        if row.get('has_stated_priorities'):
            score += 25

        return score

    def run_full_pipeline(self, df: pd.DataFrame,
                         tier1_threshold: int = 40,
                         tier2_threshold: int = 80,
                         skip_tier1: bool = False,
                         skip_tier2: bool = False,
                         include_news: bool = True) -> pd.DataFrame:
        """
        Run the complete enrichment pipeline.

        Args:
            df: Input DataFrame with company data
            tier1_threshold: Minimum score for Tier 1
            tier2_threshold: Minimum score for Tier 2
            skip_tier1: Skip Tier 1 enrichment
            skip_tier2: Skip Tier 2 enrichment
            include_news: Include news enrichment

        Returns:
            Fully enriched DataFrame
        """
        self.stats['total_accounts'] = len(df)
        logger.info(f"\n{'='*60}")
        logger.info("STARTING ENRICHMENT PIPELINE")
        logger.info(f"Total accounts: {len(df)}")
        logger.info(f"Tier 1 threshold: {tier1_threshold}")
        logger.info(f"Tier 2 threshold: {tier2_threshold}")
        logger.info(f"{'='*60}\n")

        # TIER 0: FREE, all accounts
        enriched = self.run_tier0(df, include_news=include_news)

        # TIER 1: APIs, qualified accounts
        if not skip_tier1:
            enriched = self.run_tier1(
                enriched,
                min_score=tier1_threshold,
                enrich_news=include_news
            )

        # TIER 2: LLM, top accounts
        if not skip_tier2:
            enriched = self.run_tier2(
                enriched,
                min_score=tier2_threshold
            )

        # Calculate final scores
        logger.info("Calculating final scores...")
        enriched['final_score'] = enriched.apply(self.calculate_final_score, axis=1)

        # Sort by final score
        enriched = enriched.sort_values('final_score', ascending=False)

        # Assign final tiers
        enriched['final_tier'] = enriched['final_score'].apply(
            lambda x: 'A' if x >= 120 else ('B' if x >= 100 else ('C' if x >= 80 else ('D' if x >= 60 else 'E')))
        )

        # Log final summary
        self._log_summary(enriched)

        return enriched

    def _log_summary(self, df: pd.DataFrame):
        """Log pipeline summary."""
        logger.info("\n" + "=" * 60)
        logger.info("PIPELINE COMPLETE - SUMMARY")
        logger.info("=" * 60)
        logger.info(f"\nTotal accounts processed: {self.stats['total_accounts']}")
        logger.info(f"Tier 0 enriched: {self.stats['tier0_enriched']}")
        logger.info(f"Tier 1 enriched: {self.stats['tier1_enriched']}")
        logger.info(f"Tier 2 enriched: {self.stats['tier2_enriched']}")
        logger.info(f"\nEstimated cost: ${self.stats['estimated_cost']:.2f}")

        logger.info(f"\nFinal Tier Distribution:")
        logger.info(df['final_tier'].value_counts().to_string())

        logger.info(f"\nTop 10 accounts by final score:")
        top10 = df.head(10)[['Company', 'Category', 'final_score', 'final_tier']]
        logger.info(top10.to_string(index=False))


def main():
    """Run the enrichment pipeline from command line."""
    parser = argparse.ArgumentParser(
        description='TMS Account Enrichment Pipeline',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Run full pipeline
  python enrichment_pipeline.py --input accounts.csv --output enriched.csv

  # Only run Tier 0 (free)
  python enrichment_pipeline.py --input accounts.csv --output enriched.csv --skip-tier1 --skip-tier2

  # Run Tier 0 and Tier 1 only
  python enrichment_pipeline.py --input accounts.csv --output enriched.csv --skip-tier2

  # Custom thresholds
  python enrichment_pipeline.py --input accounts.csv --output enriched.csv --tier1-threshold 50 --tier2-threshold 90
        """
    )

    parser.add_argument('--input', required=True, help='Input CSV file')
    parser.add_argument('--output', required=True, help='Output CSV file')
    parser.add_argument('--tier1-threshold', type=int, default=40,
                       help='Minimum score for Tier 1 enrichment (default: 40)')
    parser.add_argument('--tier2-threshold', type=int, default=80,
                       help='Minimum score for Tier 2 enrichment (default: 80)')
    parser.add_argument('--skip-tier1', action='store_true',
                       help='Skip Tier 1 (API) enrichment')
    parser.add_argument('--skip-tier2', action='store_true',
                       help='Skip Tier 2 (LLM) enrichment')
    parser.add_argument('--no-news', action='store_true',
                       help='Skip news enrichment in Tier 0 and Tier 1')
    parser.add_argument('--limit', type=int,
                       help='Limit number of accounts to process')
    parser.add_argument('--output-format', choices=['csv', 'json', 'both'],
                       default='csv', help='Output format')

    args = parser.parse_args()

    # Load input data
    logger.info(f"Loading data from {args.input}")
    df = pd.read_csv(args.input)

    if args.limit:
        df = df.head(args.limit)
        logger.info(f"Limited to {args.limit} accounts")

    logger.info(f"Loaded {len(df)} accounts")

    # Initialize pipeline
    pipeline = EnrichmentPipeline()

    # Run pipeline
    enriched = pipeline.run_full_pipeline(
        df,
        tier1_threshold=args.tier1_threshold,
        tier2_threshold=args.tier2_threshold,
        skip_tier1=args.skip_tier1,
        skip_tier2=args.skip_tier2,
        include_news=not args.no_news
    )

    # Save output
    if args.output_format in ['csv', 'both']:
        csv_path = args.output if args.output.endswith('.csv') else f"{args.output}.csv"
        enriched.to_csv(csv_path, index=False)
        logger.info(f"Saved CSV to {csv_path}")

    if args.output_format in ['json', 'both']:
        json_path = args.output.replace('.csv', '.json') if args.output.endswith('.csv') else f"{args.output}.json"
        enriched.to_json(json_path, orient='records', indent=2)
        logger.info(f"Saved JSON to {json_path}")

    # Generate summary report
    summary_path = args.output.replace('.csv', '_summary.txt')
    with open(summary_path, 'w') as f:
        f.write(f"Enrichment Pipeline Summary\n")
        f.write(f"Generated: {datetime.now().isoformat()}\n")
        f.write(f"{'='*60}\n\n")
        f.write(f"Input: {args.input}\n")
        f.write(f"Total accounts: {pipeline.stats['total_accounts']}\n")
        f.write(f"Tier 1 enriched: {pipeline.stats['tier1_enriched']}\n")
        f.write(f"Tier 2 enriched: {pipeline.stats['tier2_enriched']}\n")
        f.write(f"Estimated cost: ${pipeline.stats['estimated_cost']:.2f}\n\n")
        f.write(f"Final Tier Distribution:\n")
        f.write(enriched['final_tier'].value_counts().to_string())
        f.write(f"\n\nTop 20 accounts:\n")
        top20 = enriched.head(20)[['Company', 'Category', 'final_score', 'final_tier']]
        f.write(top20.to_string(index=False))

    logger.info(f"Saved summary to {summary_path}")


if __name__ == '__main__':
    main()
