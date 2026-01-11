---
name: defining-icp-and-tiers
description: Use for defining Ideal Customer Profile and account tiering. Covers the 6 Pillars framework (firmographics, qualification, buying committee, tiering, JTBD, buyer journey). Invoke when building ICP, defining tier criteria, or mapping buying committees.
requires_tools:
  - score_account
  - enrich_company
execution_capable: true
depends_on:
  - trust-building-principles
provides_context:
  - name: icp_criteria
    schema: "{industries, size_range, tech_requirements, qualification_signals, disqualifiers}"
  - name: tier_definitions
    schema: "{tier_1: criteria, tier_2: criteria, tier_3: criteria}"
  - name: buying_committee_map
    schema: "{champion_titles, sponsor_titles, stakeholders}"
---

# Defining ICP and Tiers

**Depends on**: `trust-building-principles`

## Core Insight

**ABM is about replicating your best deals. The key difference between good and bad ABM is how accounts are sourced. Build a list of accounts that have need AND that you can win and retain.**

## The 6 Pillars Framework

### Pillar 1: Firmographic & Demographic Criteria

Replicate best deals by analyzing won deal patterns:

| Dimension | Questions |
|-----------|-----------|
| Company size | Employee range? Revenue range? Sweet spot? |
| Industry | Which verticals have highest win rate? |
| Geography | Regions that close faster? |
| Volume | Usage thresholds that make sense? |
| Tech stack | Current solutions? ERP presence? |

### Pillar 2: Qualification & Disqualification

**Qualification signals**: Pain point indicators, technology readiness, buying signals (leadership changes, expansion), organizational fit (budget authority)

**Disqualification red flags**: Recently implemented competitor (<12 mo), long-term contract lock, company distress, too small, 100% outsourced function

### Pillar 3: Buying Committee

Enterprise deals average 14+ people. Map:

| Role | Typical Titles | Priority |
|------|----------------|----------|
| Champion | VP, Director | Critical |
| Executive sponsor | C-suite | Critical |
| Finance | CFO, Controller | High |
| IT/Technical | CIO, IT Director | High |
| End users | Managers, Team Leads | Medium |
| Potential blocker | Incumbent champion | Watch |

### Pillar 4: Account Tiering

| Tier | Criteria | Program | Count |
|------|----------|---------|-------|
| Tier 1 | Highest ACV, strategic logo, complex | Fully personalized 1:1 | 10-20 |
| Tier 2 | Good ACV, industry fit | Micro-segment campaigns | 30-50 |
| Tier 3 | Standard ACV, single location | Vertical campaigns, scaled | 100-200 |

**Tiering components**: Deal value (40%), strategic logo value (20%), tech readiness (15%), signal strength (15%), complexity (10%)

### Pillar 5: Jobs To Be Done

| JTBD | Trigger | Champion | Messaging Focus |
|------|---------|----------|-----------------|
| Cost reduction | CFO mandate, margin pressure | Finance | ROI, savings, payback |
| Growth enablement | Rapid growth, scaling constraints | Ops, COO | Scale without headcount |
| Risk mitigation | Penalties, compliance, audit | Operations | SLAs, visibility |
| Digital transformation | Board mandate, competitive pressure | CIO | Modern, fast implementation |

### Pillar 6: Buyer Journey & Channels

Interview won customers:
- What event created the need?
- Who raised the problem internally?
- What factors influenced the decision?
- What almost caused you NOT to buy?
- Where do you learn about technology?

Map journey: Problem Recognition → Solution Exploration → Vendor Evaluation → Decision

## ICP Documentation

Define your ICP with:
- **Firmographics**: Industry tiers, size ranges, geography, volume thresholds
- **Technographics**: Current solutions, tech stack, IT maturity
- **Qualification**: Must-haves, nice-to-haves, disqualifiers
- **Buying committee**: Champion titles, sponsor, stakeholders
- **JTBD**: Primary and secondary jobs
- **Journey**: Typical trigger, decision factors, preferred channels

---

## Two Tiering Systems

This skill defines **Strategic Tiers (1/2/3)** for resource allocation. See `TERMINOLOGY.md` for the distinction:

| System | Values | Purpose | Determined By |
|--------|--------|---------|---------------|
| **ICP Score Tier** | A/B/C/D/E | Engagement priority | `score_account` tool (automated) |
| **Strategic Tier** | 1/2/3 | Personalization depth | Human judgment (this skill) |

**Relationship**: ICP Tier A/B accounts typically become Strategic Tier 1-2. ICP Tier C may be Strategic Tier 2-3.

---

## Tool Usage

### ICP Validation Workflow

Use tools to validate accounts against ICP criteria:

```
1. enrich_company(company_name)
   → Get: industry, employee_count, technologies, signals
   → Validate against ICP firmographic criteria

2. score_account(company, industry, size, signals)
   → Get: total_score, tier (A/B/C/D/E), breakdown
   → Automated ICP fit assessment

3. Compare to ICP criteria:
   - Industry match? (from ICP definition)
   - Size in range? (from ICP definition)
   - Tech stack compatible? (from ICP definition)
   - Disqualifiers present? (check enrichment)
```

### Strategic Tier Assignment

After ICP scoring, assign Strategic Tier:

```
Strategic Tier 1 (10-20 accounts):
- ICP Tier A or B
- High ACV potential
- Strategic logo value
- Complex, multi-stakeholder

Strategic Tier 2 (30-50 accounts):
- ICP Tier A, B, or C
- Standard ACV
- Industry fit
- Moderate complexity

Strategic Tier 3 (100-200 accounts):
- ICP Tier B or C
- Standard ACV
- Single decision-maker likely
- Scalable approach
```

### Scoring Model Alignment

The `score_account` tool uses this model (see `TERMINOLOGY.md`):

| Component | Max Points | ICP Criteria Mapping |
|-----------|------------|---------------------|
| Industry | 30 | Pillar 1: Firmographics |
| Size | 25 | Pillar 1: Firmographics |
| Technology | 20 | Pillar 1: Tech stack |
| Signals | 25 | Pillar 2: Qualification signals |

---

## Human Checkpoints

Pause for human review when:
- **Defining ICP criteria**: Strategic decision, requires business input
- **Assigning Strategic Tier 1**: High-touch commitment, validate fit
- **Disqualifier edge cases**: Borderline situations need judgment
- **Buying committee mapping**: Account-specific research required

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `enrich_company` | No data found | Manual research, use known data |
| `score_account` | Missing inputs | Partial score with available data, flag for review |

---

## Integration

- After ICP defined → `selecting-and-researching-accounts`
- For JTBD messaging → `writing-persuasive-copy`
- For buying committee engagement → `enabling-champions`
- For cluster segmentation → `cluster-abm`
