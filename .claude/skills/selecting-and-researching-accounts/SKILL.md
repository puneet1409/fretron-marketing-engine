---
name: selecting-and-researching-accounts
description: Use for building ABM target account lists using signal-based selection, scoring models, and research. Covers the 6 signal categories, account scoring, lookalike identification, and prioritization. Invoke when building account lists or scoring targets.
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

## Account Scoring Model

### Fit Score (60 points max)

| Factor | Weight |
|--------|--------|
| Industry match | 15 pts (Tier 1=15, Tier 2=10, Tier 3=5) |
| Company size | 15 pts (Sweet spot=15, Target=10, Adjacent=5) |
| Volume/usage potential | 15 pts |
| Tech stack compatibility | 15 pts |

### Intent Score (40 points max)

| Signal | Points | Decay |
|--------|--------|-------|
| Demo request | +20 | None |
| Pricing page visit | +10 | 30 days |
| Executive hire trigger | +10 | 90 days |
| Expansion announcement | +10 | 90 days |
| Webinar attendance | +8 | 60 days |
| Content download | +6 | 60 days |

### Score Interpretation

| Score | Tier | Action |
|-------|------|--------|
| 80-100 | Strategic (T1) | High-touch ABM, executive involvement |
| 60-79 | Target (T2) | Medium-touch, role-based campaigns |
| 40-59 | Awareness (T3) | Programmatic, scaled |
| <40 | Not Now | Deprioritize or nurture only |

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
