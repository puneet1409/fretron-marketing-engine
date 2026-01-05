---
name: selecting-target-accounts
description: Use this skill for ABM target account selection using ICP definition, scoring models, and tiering. Based on Full Funnel methodology. Covers identifying best-fit accounts, scoring and prioritizing, and building target account lists. Invoke when planning ABM programs or building account lists.
---

# Selecting Target Accounts for Fretron ABM

Build and prioritize target account lists for focused ABM campaigns.

## When to Use This Skill

- Building initial ABM target account list
- Defining Ideal Customer Profile (ICP)
- Scoring and prioritizing accounts
- Refreshing/expanding account lists
- Aligning sales and marketing on targets

## Trust Philosophy Integration

**Account selection impacts trust-building efficiency.**

- Well-selected accounts = Relevant outreach = Trust builds faster
- Poor selection = Irrelevant outreach = Trust never builds
- Wasted effort on wrong accounts = Resources diverted from right ones

**Principle**: Select accounts where your value proposition is most relevant. Relevance accelerates trust.

## Fretron Ideal Customer Profile (ICP)

### Firmographic Criteria

| Criterion | Tier 1 (Best Fit) | Tier 2 (Good Fit) | Tier 3 (Okay Fit) |
|-----------|-------------------|-------------------|-------------------|
| **Revenue** | ₹200-1000 Cr | ₹100-200 Cr or ₹1000-2000 Cr | ₹50-100 Cr or ₹2000+ Cr |
| **Industry** | Manufacturing, Steel, Cement | FMCG, Auto Parts, Chemical | Retail, Pharma, Others |
| **Shipment Volume** | 100-500 loads/day | 50-100 or 500-1000 loads/day | 20-50 or 1000+ loads/day |
| **Geography** | India (multi-plant) | India (single plant) | India + international |

### Technographic Criteria

| Criterion | Tier 1 | Tier 2 | Tier 3 |
|-----------|--------|--------|--------|
| **Current State** | Excel/Manual | Partial digitization | Legacy TMS (painful) |
| **ERP** | SAP/Oracle (no TMS) | Tally/local ERP | Complex ERP landscape |
| **IT Maturity** | Moderate (will adopt) | High (picky) | Low (hesitant) |

### Behavioral Criteria

| Signal | Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|--------|
| **Active Trigger** | Yes (new leader, growth) | Planned (next 6 months) | None visible |
| **Prior Engagement** | Engaged with content | Website visitor | None |
| **Buying Intent** | Active evaluation | Research phase | No intent signals |

## Signal-Based Account Selection (Kyle Poyar + Full Funnel)

### The 6 Signal Categories

Based on Kyle Poyar's Growth Unhinged and LeadGenius frameworks:

| Category | What It Reveals | Fretron-Specific Signals |
|----------|-----------------|--------------------------|
| **Firmographic** | Company structure, size | ₹200-1000 Cr revenue, manufacturing, multi-plant |
| **Technographic** | Tech stack, systems | Excel-based logistics, SAP/Oracle without TMS |
| **Intent** | Active research | Searching "TMS software India", logistics content |
| **Behavioral** | First-party engagement | Pricing page visit, case study download |
| **Engagement** | Interaction depth | Email replies, webinar Q&A, demo requests |
| **Demographic** | Persona signals | VP Logistics title, 5+ years tenure |

### High-Value Signals for Fretron

| Signal | Source | Priority | Why It Matters |
|--------|--------|----------|----------------|
| **VP/Head Logistics hired** | LinkedIn Sales Navigator | Critical | New leader = new initiatives |
| **New plant announced** | Google Alerts, news | Critical | Logistics complexity increasing |
| **SAP implementation roles** | LinkedIn/Naukri jobs | High | ERP modernization = TMS opportunity |
| **Pricing page visit (identified)** | Website visitor intel | High | Active evaluation |
| **Demo request** | Direct | Critical | Hand-raiser |
| **Competitor content engagement** | LinkedIn monitoring | High | Active comparison shopping |
| **Webinar attendance** | Event platform | Medium | Decision-maker interest |
| **Email reply** | Email platform | High | Engagement signal |

### Strategic Sophistication Signals (High-Value, Low-Noise)

These signals indicate company sophistication and likelihood to value Fretron:

| Signal | What It Indicates | How to Measure |
|--------|-------------------|----------------|
| **IT/Digital Team Density** | Tech investment culture, internal champions | (IT employees / Total employees) × 100 |
| **Premium Institute Alumni** | Sophisticated buyers, quality culture | NITIE/IIM/IIT alumni in SCM roles |
| **Event Participation** | Industry engagement, thought leadership | Speakers/attendees at CII, CSCMP events |

#### Digital Density Tiers
| Density | Tier | Interpretation |
|---------|------|----------------|
| >5% | Tier 1 | Tech-first culture, strong fit |
| 2-5% | Tier 2 | Moderate tech focus |
| <2% | Tier 3 | Traditional, may need more education |

#### Premium Institutes to Track
- **Tier 1 SCM:** NITIE (IIM Mumbai), IIM-A, IIM-B, IIM-C
- **Tier 1 Tech:** IIT (any), BITS Pilani, Top NITs
- **Tier 2:** ISB, XLRI, MDI, SP Jain, IIM-I/L/K, Great Lakes
- **Tier 3:** SIBM, NMIMS, SCMHRD, IMT

#### Key Events to Monitor
- CII Logistics Summit (Feb/Mar)
- CSCMP India Conference (Sep/Oct)
- ET Logistics Leadership Summit
- India Warehousing Show
- Industry-specific logistics meets

> **Full pipeline details:** See `signal-enrichment-pipelines.md` for data collection workflows

### Signal Sources by Type

**First-Party (You Own - FREE):**
- Website: GA4 events, Clearbit Reveal/Leadfeeder
- Email: HubSpot/Mailchimp engagement tracking
- Events: Webinar registration and attendance
- Forms: Demo requests, content downloads

**Third-Party (Purchased):**
- Hiring signals: LinkedIn Sales Navigator (₹12k/mo), Naukri.com (free manual)
- Company news: Google Alerts (free), Talkwalker (free)
- Contact enrichment: Apollo.io ($49-99/mo), Clay ($149/mo)
- Firmographics: CII/FICCI directories, Denave, Apollo

**Manual Research:**
- Trade publications: Manufacturing Today India, Business Standard
- Industry associations: CII, FICCI, sector-specific
- Job descriptions: Technology and tool mentions

> **Full implementation guide:** See `signal-sources-implementation.md` for detailed signal sources, tools, and 5-phase implementation roadmap.

## Account Scoring Model

### Scoring Framework (215-point scale)

**BASE FIT SCORE (60 points)**

| Factor | Weight | Scoring |
|--------|--------|---------|
| Industry match | 15 pts | Tier 1 = 15, Tier 2 = 10, Tier 3 = 5 |
| Company size | 15 pts | Tier 1 = 15, Tier 2 = 10, Tier 3 = 5 |
| Shipment volume | 15 pts | Tier 1 = 15, Tier 2 = 10, Tier 3 = 5 |
| Current tech state | 15 pts | Excel = 15, Partial = 10, Legacy = 5 |

**FIT BONUSES (50 points max)**

| Signal | Points | Source |
|--------|--------|--------|
| **CJ Darcl Volume** | | |
| Tier 1 (500+ loads/mo) | +15 pts | CJ Darcl data |
| Tier 2 (100-499 loads/mo) | +10 pts | |
| Tier 3 (20-99 loads/mo) | +5 pts | |
| **CJ Darcl Growth** | | |
| Hypergrowth (>50% YoY) | +10 pts | |
| Strong growth (20-50% YoY) | +7 pts | |
| Steady growth (5-20% YoY) | +4 pts | |
| **Digital Density** | | |
| >5% IT team ratio | +10 pts | LinkedIn employee search |
| 2-5% IT team ratio | +5 pts | |
| **Premium Alumni** | | |
| VP/Head SCM from Tier 1 | +10 pts | LinkedIn school filter |
| Director from Tier 1 | +7 pts | |
| Any Tier 1 alumni in SCM | +5 pts | |
| **Max Fit Bonus** | **+50 pts** | |

**ADJUSTED FIT SCORE = Base (60) + Bonuses (up to 50) = 110 max**

**BASE INTENT SCORE (40 points)**

| Signal | Points | Decay |
|--------|--------|-------|
| Demo request | +20 pts | None |
| Pricing page visit | +10 pts | 30 days |
| VP/Head hired (trigger) | +10 pts | 90 days |
| New plant/expansion | +10 pts | 90 days |
| Webinar attendance | +8 pts | 60 days |
| Content download | +6 pts | 60 days |
| Website visit | +4 pts | 14 days |

**INTENT BONUSES (65 points max)**

| Signal | Points | Decay | Source |
|--------|--------|-------|--------|
| **Event Participation** | | | |
| Spoke at Tier 1 event | +15 pts | 12 mo | Event websites |
| Sponsored Tier 1 event | +12 pts | 12 mo | |
| Won logistics/SCM award | +10 pts | 12 mo | |
| Attended Tier 1 event | +8 pts | 6 mo | |
| **Email Engagement** | | | |
| Meeting booked from email | +20 pts | None | Email platform |
| Positive reply | +15 pts | 30 days | |
| Any reply | +10 pts | 30 days | |
| Multiple clicks (3+) | +8 pts | 14 days | |
| Single click | +5 pts | 14 days | |
| **AASDR/Telecalling** | | | |
| Demo booked from call | +25 pts | None | AASDR logs |
| Expressed interest | +15 pts | 60 days | |
| Future evaluation | +10 pts | 90 days | |
| Gave referral | +8 pts | 60 days | |
| **Max Intent Bonus** | **+65 pts** | | |

**ADJUSTED INTENT SCORE = Base (40) + Bonuses (up to 65) = 105 max**

**TOTAL SCORE = Fit (110 max) + Intent (105 max) = 215 max**

**Score Interpretation:**

| Score | Tier | Action |
|-------|------|--------|
| 160-215 | Strategic (T1) | High-touch ABM, founder involvement, priority |
| 110-159 | Target (T2) | Medium-touch ABM, key personas |
| 60-109 | Awareness (T3) | Programmatic, nurture |
| <60 | Not Now | Deprioritize or exclude |

**Why This Works:**
- CJ Darcl data provides REAL shipping volume (not estimates)
- Outbound engagement (email + AASDR) rewards responsive accounts
- Sophistication bonuses (digital density, alumni) predict deal velocity
- Intent bonuses reward active engagement with your outreach
- Decay prevents stale data from inflating scores

## Account Selection Process

### Step 1: Define Universe

**Data Sources:**
- Existing CRM data (won deals, open opportunities)
- Industry databases (Dun & Bradstreet, ZoomInfo)
- LinkedIn Sales Navigator
- Industry associations, directories
- Customer referrals, lookalikes

**Initial Filter:**
- India-based
- B2B manufacturing/industrial
- ₹50+ Cr revenue
- 20+ shipments/day

### Step 2: Score and Tier

**For each account:**
1. Gather firmographic data
2. Research technographic state
3. Check for intent signals
4. Calculate fit + intent score
5. Assign tier

### Step 3: Prioritize Within Tiers

**Tier 1 Prioritization Factors:**
- Strength of trigger (active > planned)
- Quality of entry point (known contact > cold)
- Strategic value (reference potential, industry leader)
- Competitive presence (greenfield > competitive)

**Tier 2 Prioritization Factors:**
- Engagement level
- Expansion potential
- Speed to close likelihood

### Step 4: Validate and Refine

**Validation Steps:**
- Sales review (do AEs agree these are good?)
- Quick research (are they really active/growing?)
- Contact mapping (can we reach key personas?)
- Competitive check (are they locked with competitor?)

## Account List Templates

### Tier 1 Account Profile

```markdown
## Account: [Company Name]

### Firmographics
- Revenue: ₹[X] Cr
- Industry: [Specific vertical]
- Employees: [X]
- Locations: [Plants/Offices]
- Shipment Volume: [X] loads/day

### Current State
- Current Solution: [Excel/Legacy/Competitor]
- Known Challenges: [List]
- Tech Stack: [ERP, relevant systems]

### CJ Darcl Data
- Monthly Loads: [X]
- Volume Tier: [T1/T2/T3]
- YoY Growth: [X]%
- Growth Classification: [Hypergrowth/Strong/Steady/Flat]
- Primary Lanes: [Top routes]
- CJ Darcl Score: [X]/25

### Strategic Signals

#### Digital Maturity
- IT/Digital Team Size: [X] employees
- Digital Density: [X]% (IT/Total × 100)
- Digital Density Tier: [1/2/3]
- Key Tech Leaders: [Names, titles]
- Digital Density Score: [X]/10

#### Premium Institute Presence
- Key SCM Decision Maker: [Name, Title]
- Their Institute: [Name, Year] - Tier [1/2/3]
- Other Premium Alumni in SCM: [Count, institutes]
- Warm Connection Path: [Alumni in your network]
- Premium Alumni Score: [X]/15

#### Industry Engagement
- Event Appearances (past 12 mo): [List]
- Speaking Engagements: [Events, topics]
- Awards/Recognition: [List]
- Event Participation Score: [X]/20

### Outbound Engagement

#### Email Engagement
- Emails Sent: [X] | Open Rate: [X]% | Click Rate: [X]%
- Replies: [X] (Positive/Neutral/Negative)
- Last Activity: [Date]
- Email Score: [X]/20

#### AASDR/Telecalling
- Call Attempts: [X] | Connections: [X]
- Last Outcome: [INTERESTED/FUTURE_EVAL/NOT_NOW/etc.]
- Objections: [Key objections captured]
- Next Follow-up: [Date, action]
- AASDR Score: [X]/25

### Trigger/Timing
- Active Trigger: [Yes/No - describe]
- Urgency: [High/Medium/Low]
- Budget Cycle: [When]

### Contacts (Buying Committee)
| Name | Title | Role | Institute | Email | Call |
|------|-------|------|-----------|-------|------|
| [Name] | VP Logistics | Champion | NITIE '10 | Clicked | Interested |
| [Name] | CFO | Econ Buyer | IIM-A '05 | Opened | - |
| [Name] | CIO | Influencer | IIT-B '08 | - | Gatekeeper |

### Scoring Summary
| Component | Score | Max |
|-----------|-------|-----|
| **BASE FIT** | | |
| Industry + Size + Volume + Tech | [X] | 60 |
| **FIT BONUSES** | | |
| CJ Darcl Volume/Growth | [X] | 25 |
| Digital Density | [X] | 10 |
| Premium Alumni | [X] | 15 |
| **ADJUSTED FIT** | [X] | 110 |
| **BASE INTENT** | | |
| Triggers + Website + Content | [X] | 40 |
| **INTENT BONUSES** | | |
| Event Participation | [X] | 20 |
| Email Engagement | [X] | 20 |
| AASDR Engagement | [X] | 25 |
| **ADJUSTED INTENT** | [X] | 105 |
| **TOTAL** | [X] | 215 |

### Tier: [T1 (160+) / T2 (110-159) / T3 (60-109) / Not Now (<60)]

### Notes
- [Key observations]
- [Competitive intel]
- [Alumni leverage opportunities]
- [CJ Darcl insights]
- [Call/email highlights]
```

### Account List Summary

| Company | Industry | Revenue | Shipments | Score | Tier | Priority Rank |
|---------|----------|---------|-----------|-------|------|---------------|
| [Co 1] | Steel | ₹500Cr | 200/day | 85 | T1 | 1 |
| [Co 2] | Cement | ₹300Cr | 150/day | 78 | T1 | 2 |
| [Co 3] | FMCG | ₹400Cr | 100/day | 65 | T2 | 1 |

## List Size Guidelines

**Full Funnel ABM Recommendations:**

| Tier | # of Accounts | Resource Ratio | Engagement |
|------|---------------|----------------|------------|
| Tier 1 | 10-20 | 1 marketer per 10 | Personalized 1:1 |
| Tier 2 | 50-100 | 1 marketer per 50 | Semi-personalized |
| Tier 3 | 200-500 | Programmatic | Automated/scaled |

**For Fretron Starting Point:**
- Tier 1: 15 accounts (highest focus)
- Tier 2: 50 accounts (medium focus)
- Tier 3: 200 accounts (awareness)

## Lookalike Account Identification

### From Best Customers

**Analyze best current customers for patterns:**
- Which industry segments?
- What size range?
- What triggered them to buy?
- What was their before state?

**Build lookalike criteria:**
- "Companies like Exide" = Manufacturing, ₹500+ Cr, 100+ shipments, Excel chaos

### From Won Deals

**Pattern analysis:**
- Average deal size by segment
- Sales cycle length by segment
- Win rate by segment
- Champion title patterns

**Prioritize segments with:**
- High win rate
- Shorter sales cycle
- Larger deal size
- Happy customers (reference potential)

## Account List Maintenance

### Quarterly Review

**Add accounts:**
- New triggers identified
- Referrals from customers
- Emerging companies in ICP

**Remove/demote accounts:**
- Closed lost (competitive lock)
- No engagement after 6 months
- Disqualified (not actually fit)

**Promote accounts:**
- New triggers emerged
- Engagement increased
- Contact quality improved

### Signals to Monitor

**Promotion Signals:**
- Leadership change (new VP Logistics, CFO)
- Funding/growth announcement
- Expansion news
- Content engagement spike
- Inbound inquiry

**Demotion Signals:**
- Confirmed using competitor (multi-year)
- Company downturn/layoffs
- Key contact left
- Zero engagement despite outreach

## Jen Abel Enterprise Account Selection Principles

### Tier 1 Logos ARE Early Adopters (Point 10)

> "Tier 1 logos are often the early enterprise adopters for startups."

**Counterintuitive Truth:**
- Big companies have innovation budgets
- They actively seek competitive advantage
- Smaller companies are often more risk-averse
- Don't assume enterprise = slow adopter

**Implications for Fretron:**
- Target Tier 1 manufacturing companies (Tata Steel, UltraTech, etc.)
- They have budget and appetite for innovation
- Reference value is massive
- Win one Tier 1 → unlock entire industry

**Tier 1 Approach:**
| What to Do | Why |
|------------|-----|
| Deploy founder in sales process | Signals importance, vision sharing |
| Offer pilot with clear success criteria | Reduces perceived risk |
| Emphasize differentiation, not features | Executives care about competitive edge |
| Target innovation/digital transformation budget | Often separate from IT budget |

### Truncated Deal Strategy (Point 2)

> "Truncating deals is the fastest way into enterprise, then expand — land $100K-300K — NOT $10K or $1MM."

**The Land-and-Expand Sweet Spot:**

| Deal Size | Problem |
|-----------|---------|
| ₹10L | Too small to matter, no executive attention |
| ₹25-50L | Sweet spot: meaningful but approvable |
| ₹1Cr+ | Too big for first deal, long approval cycles |

**Fretron Application:**
- **Land**: Single plant or 5-10 lanes — ₹25-50L deal
- **Prove**: 3-month pilot with measurable ROI
- **Expand**: Multi-plant rollout — ₹1-2 Cr deal

**Account Selection Implication:**
- Prioritize accounts where ₹25-50L is meaningful AND approvable
- Very large companies may need smaller % of plants to hit sweet spot
- Very small companies may not have ₹25L budget

### Enterprise Sales Cycle Reality (Point 7)

> "Enterprise deals can get done in 3-6 months — 9+ months is self-inflicted."

**What Causes 9+ Month Cycles (Self-Inflicted):**
- Wrong stakeholder level (N-3 instead of N)
- No compelling event/urgency
- Scope creep (started small, ballooned)
- Champion not enabled to sell internally
- Legal/procurement started too late

**Account Selection Implication:**
- Prioritize accounts with:
  - Active triggers (compelling event)
  - Known contacts at N or N-1 level
  - Clear budget cycle alignment
  - Prior engagement (warmer = faster)

**De-prioritize accounts with:**
- No visible trigger
- Only N-3 contacts available
- Recently signed competitor contract
- Complex procurement (government, etc.)

### Consulting Firms as Talent Source (Point 1)

> "Some of the best enterprise sales talent is sitting in management consulting firms — filtering for agency and creativity is key."

**For Account Research:**
- Former consultants now in target accounts may be natural champions
- They understand structured buying processes
- They can navigate internal politics
- LinkedIn filter: "Former McKinsey/BCG/Bain" + "Logistics/Operations"

### Account Prioritization with Jen Abel Criteria

**Enhanced Tier 1 Prioritization:**

| Factor | Weight | Scoring |
|--------|--------|---------|
| Active trigger | 20% | Yes = 20, Planned = 10, None = 0 |
| N/N-1 contact available | 20% | Yes = 20, N-2 only = 10, None = 0 |
| Deal size fit (₹25-50L viable) | 20% | Sweet spot = 20, Adjacent = 10, Poor = 0 |
| Reference potential | 15% | Industry leader = 15, Notable = 10, Standard = 5 |
| Founder involvement viable | 10% | Yes = 10, Maybe = 5, No = 0 |
| Innovation appetite | 15% | High = 15, Medium = 10, Low = 0 |

## Integration with Other Skills

- After selection → Use `warming-up-abm-accounts` to engage
- During warmup → Use `matching-ask-to-trust` for appropriate asks
- Look for triggers → Use `mapping-buyer-triggers` to qualify urgency
- For outreach → Use `writing-cold-outreach-sequences` for messaging
- For qualification → See `../jen-abel-enterprise-sales.md` for enterprise criteria

## Signal Gathering Quick Start

### Week 1: Free Signals (No Budget Required)

**Day 1-2: Google Alerts Setup**
```
Create alerts for:
- "[Target Company]" + ("new plant" OR "expansion" OR "logistics")
- "VP Logistics" + "hired" + "India" + "[Industry]"
- "TMS" + "India" + "manufacturing"
- "supply chain digitization" + "India"
```

**Day 3-4: LinkedIn Signal Capture**
1. Search: `"VP Logistics" OR "Head Supply Chain" India manufacturing`
2. Filter: Changed jobs in past 90 days
3. Save search, enable notifications
4. Note companies with recent hires

**Day 5: Website Signal Setup**
1. Ensure GA4 installed with pricing/demo page events
2. Set up weekly email report for key page visits

### Phase Implementation Summary

| Phase | Timeline | Cost | Key Deliverable |
|-------|----------|------|-----------------|
| 1. Foundation | Week 1-2 | Free | First-party signals active |
| 2. LinkedIn Intel | Week 3-4 | ₹12k/mo | Hiring signals monitored |
| 3. Enrichment | Week 5-6 | $99-149/mo | Contacts enriched |
| 4. Visitor Intel | Week 7-8 | $99-300/mo | Anonymous visits revealed |
| 5. Orchestration | Week 9-12 | - | Scoring model live |

> **Full implementation details:** See `signal-sources-implementation.md`

## Signal-to-Action Playbooks

### New VP/Head Logistics Hired
1. Day 1: Research background, priorities
2. Day 3: LinkedIn connection with personalized note
3. Day 7: Share relevant industry content
4. Day 14: Market research warmup outreach
5. Day 30: Value-add connection (case study)

### New Plant Announcement
1. Day 1: Research announcement (location, timeline)
2. Day 2: Identify logistics implications
3. Day 3: Personalize outreach around expansion challenges
4. Day 7: Send similar expansion case study

### Pricing Page Visit (Identified)
1. Hour 1: Notify sales
2. Hour 2-4: Research visitor and account
3. Day 1: Personalized follow-up or LinkedIn connection
4. Day 3: Demo offer

## Extended Framework Details

For deeper Full Funnel ABM methodology, see:
- `signal-sources-implementation.md` - **Complete signal sources, tools, and 5-phase implementation roadmap**
- `signal-enrichment-pipelines.md` - **Strategic signals: Digital density, Premium alumni, Event participation pipelines**
- `../warming-up-abm-accounts/market-research-warmup-playbook.md` - Market Research Warmup technique for engagement
- `../orchestrating-abm-campaigns/SKILL.md` - Full campaign coordination framework
- `../framework-enhancements-summary.md` - Overview of all framework integrations
- `../jen-abel-enterprise-sales.md` - Complete Jen Abel enterprise sales framework

## Key References

- [Kyle Poyar - New Account-Based Playbook](https://www.pocus.com/blog/the-new-account-based-playbook-with-kyle-poyar-growth-unhinged)
- [Kyle Poyar - ICP Marketing Done Right](https://www.growthunhinged.com/p/icp-marketing-done-right)
- [Kyle Poyar - 2025 State of B2B GTM](https://www.growthunhinged.com/p/2025-state-of-b2b-gtm-report)
- [LeadGenius - 6 Signal Categories](https://www.leadgenius.com/resources/the-6-signal-categories-that-power-smarter-b2b-go-to-market-strategies)
- [Pocus - Signal-Based GTM Stack](https://www.pocus.com/blog/building-your-signal-based-gtm-tech-stack)
- [Vladimir Blagojević - ABM Warmup Playbook](https://lt.linkedin.com/posts/vladimirblagojevic_heres-a-step-by-step-abm-warm-up-playbook-activity-7006966278028431360-0Ce8)
