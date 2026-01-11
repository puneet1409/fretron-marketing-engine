# Marketing Skills Terminology Reference

This document defines authoritative terminology used across marketing skills to ensure consistency.

---

## Tiering Systems

Two tiering systems exist, serving different purposes:

### ICP Score Tier (A-E)

**Purpose**: Automated scoring output from `score_account` tool. Determines engagement priority.

| Tier | Score Range | Meaning | Action |
|------|-------------|---------|--------|
| A | 80-100 | Excellent ICP fit | Immediate prioritization |
| B | 60-79 | Good ICP fit | Active targeting |
| C | 40-59 | Moderate fit | Programmatic/nurture |
| D | 20-39 | Weak fit | Low priority |
| E | <20 | Poor fit | Exclude or defer |

**Source**: `score_account` tool in enrichment-mcp

### Strategic Tier (1-3)

**Purpose**: Manual assignment based on account value. Determines resource investment and personalization level.

| Tier | Accounts | Investment | Personalization |
|------|----------|------------|-----------------|
| T1 | 10-50 | High | 1:1 custom content, executive involvement |
| T2 | 50-200 | Medium | Role-based campaigns, semi-personalized |
| T3 | 200-1000 | Low | Programmatic, templated at scale |

**Source**: `defining-icp-and-tiers` skill (Full Funnel framework)

### When to Use Each

| Context | Use This Tier |
|---------|---------------|
| Running `score_account` tool | ICP Tier (A-E) |
| Planning campaign resource allocation | Strategic Tier (1-3) |
| Automated lead routing | ICP Tier (A-E) |
| Deciding personalization depth | Strategic Tier (1-3) |

**Relationship**: High ICP Score (A/B) accounts typically become T1/T2 Strategic accounts, but strategic tiering also considers deal size, logo value, and market positioning.

---

## Account Scoring Model (Tool-Authoritative)

The `score_account` tool uses this model:

| Category | Max Points | Scoring Criteria |
|----------|------------|------------------|
| **Industry** | 30 | Tier 1 industry = 30, Tier 2 = 20, Tier 3 = 10 |
| **Size** | 25 | Sweet spot employee range = 25, Adjacent = 15 |
| **Tech** | 20 | Tech stack compatibility signals |
| **Signals** | 25 | Intent + trigger signals combined |
| **Total** | 100 | |

### Signal Points (within Signals category)

| Signal Type | Points | Notes |
|-------------|--------|-------|
| Leadership change | +10 | 90-day window |
| Expansion announced | +10 | 90-day window |
| Hiring surge | +5 | Ongoing |
| Digital transformation | +10 | Active initiative |
| Supply chain challenges | +8 | Pain indicator |
| Funding/growth | +10 | Resource availability |

### Score to Tier Mapping

```
80-100 → Tier A → Strategic priority
60-79  → Tier B → Active targeting
40-59  → Tier C → Programmatic
20-39  → Tier D → Low priority
<20    → Tier E → Exclude
```

---

## Trigger Categories

### Tool Output Categories (`fetch_company_news`)

The news tool detects and categorizes triggers as:

| Tool Category | Description |
|---------------|-------------|
| `expansion` | Growth, new markets, acquisitions |
| `digital_transformation` | Tech initiatives, modernization |
| `supply_chain` | Logistics, operations changes |
| `leadership_change` | New executives, reorgs |
| `funding_growth` | Investment, revenue milestones |
| `challenges` | Problems, pain points mentioned |

### Skill Framework Categories (`mapping-buyer-triggers`)

Skills organize triggers conceptually as:

| Skill Category | Subcategories |
|----------------|---------------|
| **Pain Triggers** | Cost pressure, operational chaos, customer complaints, capability gaps |
| **Event Triggers** | Leadership change, scale trigger, strategic shift, failure event |
| **Comparison Triggers** | Competitive pressure, peer comparison |

### Mapping Tool → Skill

| Tool Output | Maps To |
|-------------|---------|
| `expansion` | Event Trigger (scale) |
| `digital_transformation` | Event Trigger (strategic shift) |
| `supply_chain` | Pain Trigger (operational chaos) OR Event Trigger |
| `leadership_change` | Event Trigger (leadership) |
| `funding_growth` | Event Trigger (scale) |
| `challenges` | Pain Trigger (various) |

---

## Tool Name Reference

Use these exact tool names in skills:

| Correct Name | Common Mistakes |
|--------------|-----------------|
| `extract_website_content` | ~~fetch_website_content~~ |
| `enrich_company` | ✓ |
| `fetch_company_news` | ✓ |
| `score_account` | ✓ |
| `hubspot_search_companies` | ✓ |
| `hubspot_create_task` | ✓ |

---

## Campaign State Terminology

| Term | Definition |
|------|------------|
| **Campaign ID** | Unique identifier for a campaign instance |
| **Stage** | Current phase: `research`, `warmup`, `outreach`, `nurture`, `closed` |
| **Accounts** | Target companies in the campaign |
| **Contacts** | Individual people within accounts |
| **Touches** | Recorded interactions (email, call, event, content) |

---

*Last updated: 2026-01-10*
