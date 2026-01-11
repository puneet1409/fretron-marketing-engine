---
name: running-abm-programs
description: Use as the orchestration hub for ABM programs. Routes to specialized ABM skills for ICP definition, account selection, warmup, events, and cluster-based approaches. Invoke when planning overall ABM strategy or needing guidance on which ABM skill to use.
requires_tools:
  - enrich_company
  - fetch_company_news
  - score_account
  - hubspot_search_companies
  - hubspot_get_deals
  - hubspot_create_task
  - hubspot_add_note
execution_capable: true
---

# Running ABM Programs

**Orchestration Hub for Full Funnel ABM**

## Core Insight

**ABM is trust-building at scale with named accounts. Select fewer, go deeper, coordinate channels.**

The goal is not "more accounts touched" but "right accounts moved through trust levels."

---

## ABM Program Architecture

### The Full Funnel ABM Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    RUNNING-ABM-PROGRAMS                     │
│                    (This Orchestration Hub)                 │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ FOUNDATION      │ │ EXECUTION       │ │ SEGMENTATION    │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ defining-icp-   │ │ warming-up-     │ │ cluster-abm     │
│ and-tiers       │ │ accounts        │ │                 │
│                 │ │                 │ │                 │
│ selecting-and-  │ │ running-abm-    │ │                 │
│ researching-    │ │ events          │ │                 │
│ accounts        │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## Skill Routing Guide

### "I need to define my ICP and tiering criteria"
→ Use `defining-icp-and-tiers`
- 6 Pillars Framework
- Firmographic/Technographic/Behavioral criteria
- Account tiering (Tier 1/2/3)
- Jobs To Be Done mapping
- Buying committee roles

### "I need to build and prioritize my target account list"
→ Use `selecting-and-researching-accounts`
- Signal-based selection (6 categories)
- Account scoring models
- Lookalike identification
- Trigger-based prioritization
- Account research process

### "I need to warm up cold accounts before sales outreach"
→ Use `warming-up-accounts`
- 90-Day Warmup Framework
- Market Research Play (1-to-Few)
- Meaningful Commenting Play
- Multi-channel coordination
- Warmth scoring

### "I need to plan ABM events"
→ Use `running-abm-events`
- Small format (executive dinners, roundtables)
- Large format (webinars, conferences)
- Event activation and follow-up
- Pre/during/post event playbooks

### "I need to segment accounts by awareness and readiness"
→ Use `cluster-abm`
- Cluster ICP (cold, unaware)
- Future Pipeline (aware, unvalidated)
- Active Focus (ready for sales)
- Differentiated programs per cluster
- Micro-segmentation

---

## ABM Program Lifecycle

### Phase 1: Foundation (Weeks 1-3)

| Task | Skill to Use |
|------|--------------|
| Define ICP with 6 Pillars | `defining-icp-and-tiers` |
| Set tier criteria | `defining-icp-and-tiers` |
| Build target account list | `selecting-and-researching-accounts` |
| Score and tier accounts | `selecting-and-researching-accounts` |
| Segment into clusters | `cluster-abm` |

### Phase 2: Warmup (Weeks 4-12)

| Task | Skill to Use |
|------|--------------|
| Launch 90-day warmup for Tier 1 | `warming-up-accounts` |
| Run market research play | `warming-up-accounts` |
| Begin meaningful commenting | `warming-up-accounts` |
| Plan 1-to-Few events | `running-abm-events` |

### Phase 3: Engagement (Weeks 8-16)

| Task | Skill to Use |
|------|--------------|
| Host executive roundtables | `running-abm-events` |
| Transition warm accounts to sales | `warming-up-accounts` |
| Multi-thread buying committee | `enabling-champions` |
| Develop champions | `enabling-champions` |

### Phase 4: Acceleration (Ongoing)

| Task | Skill to Use |
|------|--------------|
| Move accounts between clusters | `cluster-abm` |
| Scale with webinars | `running-abm-events` |
| Nurture Future Pipeline | `cluster-abm` |
| Measure and optimize | This skill |

---

## ABM Measurement Framework

### Metrics By Program Type

| Program | Leading Indicators | Lagging Indicators |
|---------|-------------------|-------------------|
| **Warmup** | Accounts engaged, content views | Meetings booked, reply rate |
| **Events** | Registrations, attendance | Meetings from attendees, pipeline |
| **Content** | Downloads, time on site | MQLs, form submissions |
| **Ads** | Impressions, account reach | Pipeline influenced, cost/opp |

### Leading Indicators (Weekly)

| Metric | What It Tells You |
|--------|-------------------|
| Accounts engaged | Reach - are we getting in front of targets? |
| Contact coverage | Multi-threading - how many people per account? |
| Content consumption | Interest - are they engaging? |
| Warmth score changes | Progression - are accounts moving stages? |

### Lagging Indicators (Monthly)

| Metric | Benchmark |
|--------|-----------|
| Meetings booked from ABM accounts | 5-10% of warmed accounts |
| Pipeline created | 20-30% of engaged accounts |
| Win rate: ABM vs non-ABM | ABM should be 2x+ higher |
| Deal size: ABM vs non-ABM | ABM should be 1.5x+ higher |
| Sales cycle: ABM vs non-ABM | ABM should be faster |

### The Real ABM Question

**Are we moving accounts through trust levels, or just touching them?**

Track cluster progression:
- Cluster ICP → Future Pipeline (awareness achieved)
- Future Pipeline → Active Focus (need validated)
- Active Focus → Opportunity (sales engaged)

---

## 4 Levels of ABM Personalization

| Level | Scope | Content Approach |
|-------|-------|------------------|
| **Vertical** | Industry | Same content for entire vertical (e.g., "Manufacturing logistics trends") |
| **JTBD** | Problem cluster | Grouped by job-to-be-done (e.g., "Reducing detention costs") |
| **Account** | Company | Account-specific content (their news, challenges, competitors) |
| **Buyer** | Individual | Role + account context (CFO at [Company] facing [specific issue]) |

**Effort increases with depth.** Match personalization level to account tier:
- Tier 1: Buyer-level personalization
- Tier 2: Account-level personalization
- Tier 3: JTBD/Vertical level

---

## Common ABM Failures

**Too many accounts**: Can't go deep enough. Start with 50-100 max.

**Marketing-only ABM**: Sales not involved until handoff fails. Involve sales in account selection from Day 1.

**Activity over outcomes**: Measuring touches instead of trust/cluster progression.

**Generic "personalization"**: {{FirstName}} isn't personalization. Account-specific insights are.

**No cluster segmentation**: Treating Cluster ICP same as Active Focus wastes resources.

---

## Inbound Lead Qualification

When inbound leads arrive, qualify quickly:

| Score | Classification | Action |
|-------|----------------|--------|
| 30-40 | Hot (ICP + buying signals) | Sales <2 hours |
| 20-29 | Warm (ICP + some interest) | SDR same-day |
| 10-19 | Cool (Partial fit) | Nurture + SDR |
| <10 | Cold/DQ | Marketing only |

**Qualification Questions**:
- "What prompted you to reach out now?" (trigger)
- "What's not working about current approach?" (pain)
- "Who else is involved in evaluating?" (authority)
- "What's your timeline for a decision?" (urgency)

---

## Integration Map

| Need | Skill |
|------|-------|
| Trust principles | `trust-building-principles` |
| Email sequences | `writing-b2b-emails` |
| Champion development | `enabling-champions` |
| Trigger detection | `mapping-buyer-triggers` |
| Content creation | `writing-persuasive-copy` |
