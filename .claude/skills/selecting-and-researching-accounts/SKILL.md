---
name: selecting-and-researching-accounts
description: Use for building ABM target account lists using signal-based selection, scoring models, and research. Covers Kyle Poyar's 6 signal categories, account scoring, lookalike identification, and prioritization. Invoke when building account lists, scoring accounts, or researching targets.
---

# Selecting and Researching Accounts

**Depends on**: `defining-icp-and-tiers`

## Core Insight

**Signal-based selection beats static lists. Combine fit signals (who they are) with intent signals (what they're doing) to prioritize accounts that are ready to engage.**

## The 6 Signal Categories (Kyle Poyar + Full Funnel)

| Category | What It Reveals | Examples |
|----------|-----------------|----------|
| **Firmographic** | Company structure, size | Revenue, employees, locations, industry |
| **Technographic** | Tech stack, systems | Current solutions, ERP, tool mentions |
| **Intent** | Active research | Search behavior, content consumption |
| **Behavioral** | First-party engagement | Website visits, email opens, downloads |
| **Engagement** | Interaction depth | Replies, event attendance, demo requests |
| **Demographic** | Persona signals | Job titles, tenure, department size |

## High-Value Trigger Signals

| Signal | Source | Priority | Why It Matters |
|--------|--------|----------|----------------|
| **New executive hired** | LinkedIn, job alerts | Critical | New leader = new initiatives |
| **Expansion announced** | News, Google Alerts | Critical | Growth = new needs |
| **Relevant job postings** | LinkedIn, job boards | High | Hiring signals priorities |
| **Pricing page visit** | Website analytics | High | Active evaluation |
| **Demo/contact request** | Direct | Critical | Hand-raiser |
| **Competitor engagement** | Social monitoring | High | Active comparison |
| **Event attendance** | Event platforms | Medium | Topic interest |
| **Content download** | Marketing automation | Medium | Research phase |

## Account Scoring Model

### Fit Score (60 points max)

| Factor | Weight | Scoring |
|--------|--------|---------|
| Industry match | 15 pts | Tier 1 = 15, Tier 2 = 10, Tier 3 = 5 |
| Company size | 15 pts | Sweet spot = 15, Target = 10, Adjacent = 5 |
| Volume/usage potential | 15 pts | High = 15, Medium = 10, Low = 5 |
| Tech stack compatibility | 15 pts | Ideal = 15, Compatible = 10, Complex = 5 |

### Intent Score (40 points max)

| Signal | Points | Decay |
|--------|--------|-------|
| Demo request | +20 pts | None |
| Pricing page visit | +10 pts | 30 days |
| Executive hire (trigger) | +10 pts | 90 days |
| Expansion announcement | +10 pts | 90 days |
| Webinar attendance | +8 pts | 60 days |
| Content download | +6 pts | 60 days |
| Website visit | +4 pts | 14 days |
| Email engagement | +5 pts | 30 days |

### Score Interpretation

| Score | Tier | Action |
|-------|------|--------|
| 80-100 | Strategic (T1) | High-touch ABM, executive involvement |
| 60-79 | Target (T2) | Medium-touch, role-based campaigns |
| 40-59 | Awareness (T3) | Programmatic, scaled |
| <40 | Not Now | Deprioritize or nurture only |

## Signal Sources

### First-Party (Free)
- **Website**: GA4 events, visitor identification tools
- **Email**: Open/click tracking, reply monitoring
- **Events**: Registration and attendance
- **Forms**: Demo requests, content downloads

### Third-Party (Paid)
- **Hiring signals**: LinkedIn Sales Navigator, job boards
- **Company news**: Google Alerts, news aggregators
- **Contact enrichment**: Apollo, ZoomInfo, Clearbit
- **Visitor intel**: Leadfeeder, Clearbit Reveal

### Manual Research
- Trade publications and industry news
- Industry association directories
- Job description analysis (tool mentions)
- LinkedIn company page activity

## Account Research Process

### Step 1: Define Universe
1. Apply ICP firmographic filters
2. Pull from CRM, databases, industry lists
3. Add customer referrals and lookalikes
4. Initial filter: geography, size, industry

### Step 2: Enrich and Score
1. Gather firmographic data
2. Research technographic state
3. Check for intent signals
4. Calculate fit + intent score
5. Assign tier

### Step 3: Prioritize Within Tiers

**Tier 1 Prioritization**:
- Strength of trigger (active > planned > none)
- Quality of entry point (warm contact > cold)
- Strategic value (reference potential, logo)
- Competitive situation (greenfield > competitive)

**Tier 2 Prioritization**:
- Engagement level with your content
- Expansion potential
- Speed to close likelihood

### Step 4: Validate
- Sales review (do AEs agree?)
- Quick research (are they active/growing?)
- Contact mapping (can we reach key personas?)
- Competitive check (locked with competitor?)

## Lookalike Account Identification

### From Best Customers
Analyze won deals for patterns:
- Which industry segments?
- What size range?
- What triggered them to buy?
- What was their before state?

Build lookalike criteria: "Companies like [Best Customer]" = [Industry] + [Size] + [Situation] + [Tech state]

### From Won Deals
- Average deal size by segment
- Sales cycle length by segment
- Win rate by segment
- Champion title patterns

Prioritize segments with high win rate, shorter cycle, larger deals.

## Signal-to-Action Playbooks

### New Executive Hired
| Day | Action |
|-----|--------|
| 1 | Research background, priorities |
| 3 | LinkedIn connection with personalized note |
| 7 | Share relevant industry content |
| 14 | Market research warmup outreach |
| 30 | Value-add follow-up (case study) |

### Expansion Announced
| Day | Action |
|-----|--------|
| 1 | Research announcement details |
| 2 | Identify implications for your solution |
| 3 | Personalize outreach around expansion |
| 7 | Send relevant case study |

### Pricing Page Visit (Identified)
| Hour/Day | Action |
|----------|--------|
| Hour 1 | Notify sales |
| Hour 2-4 | Research visitor and account |
| Day 1 | Personalized follow-up or LinkedIn connect |
| Day 3 | Demo offer |

## Account List Maintenance

### Quarterly Review
**Add accounts**:
- New triggers identified
- Customer referrals
- Emerging companies in ICP

**Remove/demote**:
- Closed lost (competitive lock)
- No engagement after 6 months
- Disqualified (not actually fit)

**Promote**:
- New triggers emerged
- Engagement increased
- Contact quality improved

### Signals to Monitor

**Promotion Signals**:
- Leadership change
- Funding/growth announcement
- Expansion news
- Content engagement spike
- Inbound inquiry

**Demotion Signals**:
- Confirmed using competitor (multi-year)
- Company downturn/layoffs
- Key contact left
- Zero engagement despite outreach

## Integration

- Before selection → Define ICP with `defining-icp-and-tiers`
- After list built → Use `warming-up-accounts` to engage
- For trigger mapping → Use `mapping-buyer-triggers`
- For outreach → Use `writing-b2b-emails`
