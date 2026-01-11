---
name: selecting-and-researching-accounts
description: Use for building ABM target account lists using signal-based selection, scoring models, and research. Covers the 6 signal categories, account scoring, lookalike identification, and prioritization. Invoke when building account lists or scoring targets.
requires_tools:
  - enrich_company
  - fetch_company_news
  - extract_website_content
  - score_account
  - hubspot_search_companies
execution_capable: true
depends_on:
  - defining-icp-and-tiers
expects_context:
  - name: icp_criteria
    from_skill: defining-icp-and-tiers
    required: false
provides_context:
  - name: account_scores
    schema: "{company, total_score, tier, triggers_found, recommendation}"
  - name: prioritized_accounts
    schema: "[{company, tier, priority_rank}]"
---

# Selecting and Researching Accounts

**Depends on**: `defining-icp-and-tiers`

## Core Insight

**Signal-based selection beats static lists. Combine fit signals (who they are) with intent signals (what they're doing) to prioritize accounts ready to engage.**

## The 6 Signal Categories

| Category | What It Reveals | Examples |
|----------|-----------------|----------|
| **Firmographic** | Company structure | Revenue, employees, locations, industry |
| **Technographic** | Tech stack | Current solutions, ERP, tool mentions |
| **Intent** | Active research | Search behavior, content consumption |
| **Behavioral** | First-party engagement | Website visits, email opens, downloads |
| **Engagement** | Interaction depth | Replies, event attendance, demo requests |
| **Demographic** | Persona signals | Job titles, tenure, department size |

## High-Value Trigger Signals

| Signal | Priority | Why It Matters |
|--------|----------|----------------|
| New executive hired | Critical | New leader = new initiatives (90-day window) |
| Expansion announced | Critical | Growth = new needs |
| Relevant job postings | High | Hiring signals priorities |
| Pricing page visit | High | Active evaluation |
| Demo/contact request | Critical | Hand-raiser |
| Competitor engagement | High | Active comparison |

## LinkedIn High-Intent Signals (NEW)

Real-time intent signals from LinkedIn that indicate active buying interest:

### Engagement Signals (Highest Value)

| Signal | Intent Score | Detection Method |
|--------|-------------|------------------|
| Commented on competitor post | +40 | Sales Navigator saved search |
| Liked competitor content | +25 | Manual monitoring |
| Shared industry pain post | +35 | Boolean keyword search |
| Engaged with logistics influencer | +20 | Influencer follower tracking |
| Posted question about problem | +40 | Keyword alerts |

### Pain Point Keywords to Monitor

**For TMS/Logistics**:
- "logistics nightmare", "tracking visibility", "freight costs"
- "carrier management", "delivery delays", "OTIF issues"
- "digitizing supply chain", "manual processes", "Excel chaos"
- "e-way bill challenges", "GST compliance", "fleet compliance"

### Job Change Signals

| Signal | Intent Score | Action Window |
|--------|-------------|---------------|
| New role: VP/Director Supply Chain | +35 | First 90 days |
| New role: CDO/CIO | +40 | First 90 days |
| New role: COO | +40 | First 60 days |
| Promoted to decision-maker | +30 | First 60 days |

### Competitor Engagement to Track

Monitor followers/engagers of:
- SAP Transportation Management
- Oracle TMS / Blue Yonder
- Locus, FarEye, LogiNext (last-mile)
- Industry analysts posting about TMS

## Account Scoring Model

The `score_account` tool uses this model (see `TERMINOLOGY.md` for full reference):

### Score Components (100 points max)

| Component | Max Points | Description |
|-----------|------------|-------------|
| **Industry** | 30 | Fit with target verticals (Logistics=30, Mfg/FMCG=25, Retail/Pharma=20) |
| **Size** | 25 | Company size (Enterprise=25, Mid-market=20, SMB=10) |
| **Technology** | 20 | Tech stack (Has ERP=15, No TMS=20, Legacy=10) |
| **Signals** | 25 | Behavioral signals (Supply chain=20, Expansion/Digital=15, Hiring/Leadership=10) |

### ICP Score Tiers (A/B/C/D/E)

| Score | Tier | Meaning | Action |
|-------|------|---------|--------|
| 80-100 | **A** | Hot - Strong ICP fit + signals | Immediate outreach |
| 60-79 | **B** | Warm - Good fit, some signals | ABM warmup campaign |
| 40-59 | **C** | Cool - Moderate fit | Content nurture |
| 20-39 | **D** | Cold - Weak fit | Monitor for triggers |
| 0-19 | **E** | Disqualified - Poor fit | Do not pursue |

### Strategic Tier Assignment (1/2/3)

After ICP scoring, assign Strategic Tier based on resource investment:

| ICP Tier | Typical Strategic Tier | Personalization Level |
|----------|------------------------|----------------------|
| A/B | Tier 1 or 2 | Buyer-level or Account-level |
| C | Tier 2 or 3 | Account-level or Vertical |
| D/E | Not assigned | Monitor only |

**Note**: ICP Tier is automated output; Strategic Tier is human decision about investment.

## Signal Sources

**First-party (free)**: Website analytics, email tracking, event registration, form submissions

**Third-party (paid)**: LinkedIn Sales Navigator, Apollo/ZoomInfo, Google Alerts, Leadfeeder

**Manual research**: Trade publications, industry directories, job description analysis, LinkedIn company pages

## Account Research Process

1. **Define universe**: Apply ICP filters, pull from CRM and industry lists
2. **Enrich and score**: Gather firmographic/technographic data, check intent signals, calculate score
3. **Prioritize within tiers**: Trigger strength, entry point quality, strategic value, competitive situation
4. **Validate**: Sales review, quick research, contact mapping, competitive check

## Lookalike Identification

Analyze won deals for patterns:
- Which industry segments?
- What size range?
- What triggered them to buy?
- Champion title patterns?

Build lookalike criteria: "Companies like [Best Customer]" = [Industry] + [Size] + [Situation] + [Tech state]

## Account List Maintenance

**Quarterly review**:
- **Add**: New triggers, customer referrals, emerging ICP fits
- **Promote**: Engagement increased, new triggers emerged
- **Demote**: Confirmed competitor lock, no engagement 6+ months, company downturn

## Integration

- ICP definition → `defining-icp-and-tiers`
- After list built → `warming-up-accounts`
- Trigger mapping → `mapping-buyer-triggers`
- Outreach → `writing-b2b-emails`

---

## Tool Usage

### Account Research Workflow
```
1. enrich_company(company_name)
   → Firmographics, industry, tech stack, hiring signals

2. fetch_company_news(company_name)
   → Trigger events: expansion, leadership changes, supply chain mentions

3. extract_website_content(url)
   → Deeper analysis: products, services, contact info

4. score_account(company_name, industry, signals, ...)
   → ICP fit score, tier assignment, recommendation
```

### CRM Integration
```
hubspot_search_companies(query)
   → Check if account exists, find deal ID for association
```

### Batch Processing
For bulk account research, use the enrichment pipeline:
```bash
cd tools/tms-enrichment
python enrichment_pipeline.py --input accounts.csv --output enriched.csv
```

The MCP tools use the same scoring logic for consistency between single-account and batch operations.

---

## Human Checkpoints

Pause for human review when:
- Account list exceeds 50 accounts (validate prioritization)
- Tier A accounts identified (confirm before immediate outreach)
- Scoring produces unexpected results (validate data quality)

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `enrich_company` | No data found | Use `extract_website_content` on company domain |
| `fetch_company_news` | No news | Mark as "no recent triggers", use firmographics only |
| `score_account` | Missing inputs | Score with available data, flag for manual review |
| `hubspot_search_companies` | Not in CRM | Create new company record or skip CRM integration |
