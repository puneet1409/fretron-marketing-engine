# TMS Enrichment Scripts

Tiered enrichment pipeline for TMS buyer account enrichment.

## Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   TIER 0     │    │   TIER 1     │    │   TIER 2     │
│  (FREE)      │───▶│  (LOW COST)  │───▶│  (SELECTIVE) │
│  Scripts     │    │  APIs        │    │  LLM         │
└──────────────┘    └──────────────┘    └──────────────┘

Cost: $0              Cost: ~$0.02/co   Cost: ~$0.03/co
All accounts         Score >= 40       Score >= 80
```

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run full pipeline (Tier 0 only - FREE)
python enrichment_pipeline.py --input ../tiered_output/tier0_all_scored.csv --output ../tiered_output/enriched.csv --skip-tier1 --skip-tier2

# Run with Tier 1 (requires API keys)
export APOLLO_API_KEY=your_key
python enrichment_pipeline.py --input ../tiered_output/tier0_all_scored.csv --output ../tiered_output/enriched.csv --skip-tier2

# Run full pipeline (requires all API keys)
export APOLLO_API_KEY=your_key
export PERPLEXITY_API_KEY=your_key
python enrichment_pipeline.py --input ../tiered_output/tier0_all_scored.csv --output ../tiered_output/enriched.csv
```

## Scripts

| Script | Purpose | Cost |
|--------|---------|------|
| `tier0_enrichment.py` | FREE script-based enrichment | $0 |
| `tier1_enrichment.py` | API-based enrichment (Apollo, Hunter, NewsAPI) | ~$0.02/company |
| `tier2_enrichment.py` | LLM-based research (Perplexity, OpenAI) | ~$0.03/company |
| `enrichment_pipeline.py` | Master orchestration | Varies |

## Tier 0: FREE Enrichment

No API keys required. Provides:
- Tier 0 scoring based on firmographics
- Company website via DNS resolution
- LinkedIn URL via pattern matching
- Recent news via Google News RSS
- Trigger event detection

```bash
python tier0_enrichment.py --input accounts.csv --output enriched.csv
```

## Tier 1: API Enrichment

Requires API keys:
- `APOLLO_API_KEY` - For contact/people data
- `HUNTER_API_KEY` - For email verification (optional)
- `NEWSAPI_KEY` - For news with sentiment (optional)

Provides:
- Decision maker contacts (name, title, email, phone)
- Email verification
- Company news from NewsAPI

```bash
export APOLLO_API_KEY=your_key
python tier1_enrichment.py --input tier0_enriched.csv --output tier1_enriched.csv
```

## Tier 2: LLM Enrichment

Requires API key:
- `PERPLEXITY_API_KEY` - For supply chain research
- `OPENAI_API_KEY` - For personalization (optional)

Provides:
- Supply chain priorities research
- Competitive intelligence (optional)
- Personalized outreach hooks (optional)

```bash
export PERPLEXITY_API_KEY=your_key
python tier2_enrichment.py --input tier1_enriched.csv --output tier2_enriched.csv --min-score 80
```

## Cost Comparison

| Approach | Cost per 1,000 accounts |
|----------|-------------------------|
| All BitScale/LLM | ~$100 |
| Tiered Pipeline | ~$16 |
| **Savings** | **84%** |

## Environment Variables

Create a `.env` file:

```env
APOLLO_API_KEY=your_apollo_key
HUNTER_API_KEY=your_hunter_key
NEWSAPI_KEY=your_newsapi_key
PERPLEXITY_API_KEY=your_perplexity_key
OPENAI_API_KEY=your_openai_key
```

Load with:
```bash
source .env  # Linux/Mac
# or
set -a; source .env; set +a
```

## Output Fields

### Tier 0 Fields
- `tier0_score` - Firmographic score (0-120)
- `tier0_tier` - Tier label (tier_a to tier_e)
- `website_url` - Company website
- `linkedin_url` - LinkedIn company page
- `has_trigger_news` - Boolean for trigger events

### Tier 1 Fields
- `contact_count` - Number of contacts found
- `dm_contact_count` - Decision maker contacts
- `has_dm_contact` - Boolean
- `top_contact_name` - Best contact name
- `top_contact_email` - Best contact email
- `contacts_json` - Full contact list (JSON)

### Tier 2 Fields
- `supply_chain_research` - Research summary
- `has_stated_priorities` - Boolean
- `competitive_intel` - Competitive analysis (optional)
- `personalized_hook` - Outreach hook (optional)

### Final Fields
- `final_score` - Combined score
- `final_tier` - Priority tier (A-E)
