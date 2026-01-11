---
name: accelerating-time-to-value
description: Use for collapsing time between prospect discovery and first value realization. Covers onboarding optimization, quick wins, and activation metrics. Invoke when designing pilots, improving onboarding, or creating fast value demonstrations.
context_tools:
  - hubspot_get_deal
  - hubspot_create_task
  - enrich_company
execution_capable: false
depends_on:
  - trust-building-principles
---

# Accelerating Time-to-Value

## Core Insight

**Nearly all winning growth tactics collapse time between discovery and first positive outcome.**

The faster prospects experience value, the faster they convert and expand.

## Value Milestone Map

```
DISCOVERY → UNDERSTANDING → DEMO → SAMPLE VALUE → PILOT → FULL VALUE
   Day 0       Day 1-3       Day 7    Day 14        Day 30     Day 90

Compress each transition.
```

## Quick Win Strategies by Stage

### Discovery → Understanding (Target: Same Day)

- Interactive product tour (5-10 min, self-guided)
- Value calculator (input their numbers, see potential)
- Industry-specific landing pages

### Understanding → Demo (Target: 3 Days)

- On-demand demo video
- Self-service demo environment
- Instant calendar scheduling

### Demo → Sample Value (Target: 7 Days)

- Value simulator with their data
- Mini-audit (analyze their current state)
- Zero-integration trial (manual data entry)

### Sample → Pilot (Target: 14 Days)

- Pre-built pilot package (fixed scope, fixed price)
- No-code data import (Excel/CSV)
- Champion enablement kit

### Pilot → Full Value (Target: 45 Days)

- Phased rollout plan
- Self-service training
- Pre-built integrations

## The Value Audit (Quick Win Wedge)

**Input** (from prospect):
- 1 month shipment data
- Current costs
- OTIF performance

**Output** (from you):
- Quantified inefficiencies
- Specific improvement opportunities
- Value projection

**Timeline**: 5 business days
**Result**: Proof before commitment

## Activation Metrics

| Stage | "Activated" When... |
|-------|---------------------|
| Demo | Asks follow-up, requests pilot info |
| Pilot | First successful transaction tracked |
| Customer | 80% target volume flowing through |
| Value | Measured improvement vs baseline |

## Common Pitfalls

1. Showing features, not outcomes
2. One-size-fits-all onboarding
3. Pilot scope creep (start small)
4. No success criteria defined upfront
5. Training delayed until after go-live

---

## Context Tools

Tools provide deal and company context for designing time-to-value strategies.

```
hubspot_get_deal(deal_id)
→ Deal stage, value, timeline
→ Use for: Understanding pilot status, identifying stall points

hubspot_create_task(contact_id, title, due_date)
→ Create follow-up tasks for value milestones
→ Use for: Activation tracking, pilot check-ins

enrich_company(company_name)
→ Company size, industry, tech stack
→ Use for: Tailoring quick-win approaches to company context
```

### Context Applications

| Question | Tool | Use |
|----------|------|-----|
| What stage is this deal? | `hubspot_get_deal` | Determine next value milestone |
| What's their company profile? | `enrich_company` | Customize pilot package |
| Need to track activation? | `hubspot_create_task` | Create milestone tasks |

---

## Integration

- Lead magnets for value preview → `generating-lead-magnets`
- Champion enablement → `enabling-champions`
- Trust calibration → `trust-building-principles`
