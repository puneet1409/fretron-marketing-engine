# Marketing Measurement Framework

Comprehensive KPI framework for tracking marketing performance and ROI.

---

## Measurement Philosophy

### The Metrics Hierarchy

```
               REVENUE IMPACT
                     │
         ┌──────────┴──────────┐
         │                     │
    PIPELINE               EFFICIENCY
         │                     │
    ┌────┴────┐           ┌────┴────┐
    MQLs    SQLs        CAC      LTV
         │                     │
    ┌────┴────┐           ┌────┴────┐
 ENGAGEMENT  LEADS      CHANNEL    CONTENT
                        COSTS      COSTS
         │                     │
    ┌────┴────┐           ┌────┴────┐
  REACH    IMPRESSIONS   SPEND    TIME
```

### Metrics Principles

1. **Revenue-Connected**: Every metric should connect to revenue impact
2. **Actionable**: If you can't act on it, don't track it
3. **Timely**: Leading indicators matter more than lagging
4. **Segment-Aware**: Aggregate hides insights; segment everything
5. **Honest**: Track what matters, not what looks good

---

## Core Marketing KPIs

### Tier 1: Revenue KPIs (Monthly/Quarterly)

| KPI | Definition | Formula | Target |
|-----|------------|---------|--------|
| Marketing-Sourced Revenue | Revenue from marketing-generated pipeline | Closed-won ARR from marketing leads | ₹[X]L/quarter |
| Marketing-Influenced Revenue | Revenue where marketing touched the deal | Closed-won ARR with marketing touchpoints | ₹[X]L/quarter |
| Marketing ROI | Return on marketing investment | (Revenue - Marketing Cost) / Marketing Cost | 5-10x |
| Customer Acquisition Cost (CAC) | Cost to acquire a customer | Total Marketing + Sales Cost / New Customers | ₹[X]L |
| CAC Payback | Months to recover CAC | CAC / (ARR × Gross Margin ÷ 12) | <12 months |

### Tier 2: Pipeline KPIs (Weekly/Monthly)

| KPI | Definition | Formula | Target |
|-----|------------|---------|--------|
| Marketing-Qualified Leads (MQLs) | Leads meeting qualification threshold | Leads with score > [X] | [#]/month |
| MQL-to-SQL Conversion | % of MQLs accepted by sales | SQLs / MQLs | 30-50% |
| Sales-Qualified Leads (SQLs) | MQLs accepted by sales | MQLs accepted as opportunities | [#]/month |
| SQL-to-Opportunity Conversion | % of SQLs becoming opportunities | Opportunities / SQLs | 50-70% |
| Pipeline Generated | Dollar value of new opportunities | Sum of opportunity values | ₹[X]L/month |
| Pipeline Velocity | Speed of pipeline movement | Pipeline × Win Rate × Velocity / Sales Cycle | ₹[X]L/month |

### Tier 3: Engagement KPIs (Weekly)

| KPI | Definition | Formula | Target |
|-----|------------|---------|--------|
| Website Visitors | Unique visitors to website | GA unique visitors | [#]/month |
| Visitor-to-Lead Conversion | % of visitors becoming leads | Leads / Visitors | 2-5% |
| Content Downloads | Gated content downloads | Total downloads | [#]/month |
| Demo Requests | Inbound demo requests | Form submissions | [#]/month |
| Email Engagement | Email open and click rates | Open rate, CTR | 25%, 3% |
| Event Attendance | Webinar/event registrations and attendance | Registrations, attendees | [#]/event |

---

## Channel-Specific Metrics

### Paid Advertising (Google Ads, LinkedIn)

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| Impressions | Ad views | Varies by budget |
| Click-Through Rate (CTR) | Clicks / Impressions | Google: 2-4%, LinkedIn: 0.4-0.6% |
| Cost Per Click (CPC) | Spend / Clicks | Google: ₹50-200, LinkedIn: ₹200-500 |
| Conversion Rate | Conversions / Clicks | 2-5% |
| Cost Per Lead (CPL) | Spend / Leads | ₹1,000-5,000 |
| Cost Per MQL | Spend / MQLs | ₹3,000-10,000 |
| ROAS | Revenue / Ad Spend | 5-10x |

### SEO / Organic

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| Organic Traffic | Non-paid search visitors | Growth >10%/quarter |
| Keyword Rankings | Position for target keywords | Top 10 for priority keywords |
| Domain Authority | SEO strength score | Increasing trend |
| Organic Leads | Leads from organic traffic | [#]/month |
| Organic Lead Cost | Content investment / Organic leads | <₹1,000/lead |

### Email Marketing

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| List Size | Total active subscribers | Growth >5%/month |
| Open Rate | Opens / Delivered | 25-35% |
| Click-Through Rate | Clicks / Opens | 3-5% |
| Unsubscribe Rate | Unsubscribes / Delivered | <0.5% |
| Email-Sourced Pipeline | Pipeline from email campaigns | ₹[X]L/quarter |

### Content Marketing

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| Content Production | Pieces published/month | [#]/month |
| Content Engagement | Avg. time on page, scroll depth | >3 min, >50% |
| Content Leads | Leads attributed to content | [#]/month |
| Content Shares | Social shares, backlinks | Increasing |
| Content ROI | Pipeline from content / Content investment | 3-5x |

### LinkedIn (Organic + Ads)

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| Followers | Company page followers | Growth >5%/month |
| Post Engagement | Likes, comments, shares | 2-4% engagement rate |
| Profile Views | Employee profile views | Increasing |
| LinkedIn Leads | Leads from LinkedIn | [#]/month |
| SSI Scores | Employee Social Selling Index | >60 |

### ABM Campaigns

| Metric | Definition | Benchmark |
|--------|------------|-----------|
| Account Engagement Score | Aggregate engagement by account | Increasing |
| Accounts Engaged | Accounts with any touchpoint | 50%+ of target |
| Account Penetration | Contacts engaged per account | 3+ per account |
| Account Pipeline | Pipeline from ABM accounts | ₹[X]L |
| ABM Deal Velocity | Speed vs. non-ABM deals | 20%+ faster |

---

## Funnel Metrics Dashboard

### Full-Funnel View

```
STAGE           │  COUNT  │ CONVERSION │  VALUE   │ VELOCITY
────────────────┼─────────┼────────────┼──────────┼──────────
Website Visitors│  10,000 │            │          │
       ↓        │         │    2%      │          │
Leads           │    200  │            │          │
       ↓        │         │   40%      │          │
MQLs            │     80  │            │          │
       ↓        │         │   50%      │          │
SQLs            │     40  │            │  ₹2 Cr   │
       ↓        │         │   60%      │          │  30 days
Opportunities   │     24  │            │  ₹1.5 Cr │
       ↓        │         │   25%      │          │  45 days
Closed Won      │      6  │            │  ₹40 L   │
────────────────┴─────────┴────────────┴──────────┴──────────
```

### Conversion Benchmarks

| Stage Transition | Good | Great | Needs Work |
|------------------|------|-------|------------|
| Visitor → Lead | 2% | 4%+ | <1% |
| Lead → MQL | 30% | 50%+ | <20% |
| MQL → SQL | 40% | 60%+ | <30% |
| SQL → Opportunity | 50% | 70%+ | <40% |
| Opportunity → Won | 20% | 30%+ | <15% |

---

## Reporting Cadence

### Daily Monitoring

| Metric | Tool | Action Threshold |
|--------|------|------------------|
| Website traffic | Google Analytics | >20% drop |
| Ad spend | Google/LinkedIn | Over/under pacing |
| Lead form submissions | CRM | 0 for 24 hours |
| Email deliverability | Email platform | Bounce >5% |

### Weekly Dashboard

```
WEEK OF: [Date]

PIPELINE HEALTH
New MQLs: [#] (vs. [#] last week, [%] to target)
New SQLs: [#] (vs. [#] last week, [%] to target)
Pipeline Added: ₹[X]L (vs. ₹[X]L last week)
Demo Requests: [#]

CHANNEL PERFORMANCE
Google Ads: [#] leads, ₹[X] CPL, [%] of target
LinkedIn Ads: [#] leads, ₹[X] CPL, [%] of target
Organic: [#] leads, [%] of total
Email: [#] leads from campaigns

CONTENT PERFORMANCE
Top performing: [Content piece] - [#] leads
Lowest performing: [Content piece] - [#] leads
New published: [#] pieces

ISSUES/ACTIONS
- [Issue needing attention]
- [Action being taken]
```

### Monthly Report

```
MONTH: [Month Year]

EXECUTIVE SUMMARY
[2-3 sentence overview of the month]

─────────────────────────────────────

PIPELINE CONTRIBUTION

Marketing-Sourced Pipeline: ₹[X]L ([%] of target)
Marketing-Influenced Pipeline: ₹[X]L
MQLs Generated: [#] ([%] of target)
SQLs Accepted: [#] ([%] of target)

vs. Last Month: [+/-X%]
vs. Same Month Last Year: [+/-X%]

─────────────────────────────────────

REVENUE IMPACT

Closed-Won (Marketing-Sourced): ₹[X]L
Closed-Won (Marketing-Influenced): ₹[X]L
Customer Acquisition Cost: ₹[X]L
Marketing ROI: [X]x

─────────────────────────────────────

CHANNEL BREAKDOWN

│ Channel      │ Leads │ MQLs │ Pipeline │ Cost │ CPL   │
├──────────────┼───────┼──────┼──────────┼──────┼───────┤
│ Google Ads   │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
│ LinkedIn Ads │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
│ Organic      │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
│ Email        │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
│ Events       │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
│ Referrals    │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │
├──────────────┼───────┼──────┼──────────┼──────┼───────┤
│ TOTAL        │  [#]  │ [#]  │   ₹[X]L  │ ₹[X] │ ₹[X]  │

─────────────────────────────────────

TOP PERFORMERS

Content: [Top content piece] - [#] leads
Campaign: [Top campaign] - [#] MQLs
Channel: [Top channel] - ₹[X] pipeline

─────────────────────────────────────

KEY LEARNINGS
1. [Learning/insight]
2. [Learning/insight]
3. [Learning/insight]

─────────────────────────────────────

NEXT MONTH PRIORITIES
1. [Priority]
2. [Priority]
3. [Priority]
```

### Quarterly Business Review

```
Q[#] [YEAR] MARKETING REVIEW

─────────────────────────────────────

PERFORMANCE VS. GOALS

│ Metric                │ Target │ Actual │ Status │
├───────────────────────┼────────┼────────┼────────┤
│ Pipeline Generated    │ ₹[X]L  │ ₹[X]L  │ [%]    │
│ MQLs                  │ [#]    │ [#]    │ [%]    │
│ SQLs                  │ [#]    │ [#]    │ [%]    │
│ Marketing Revenue     │ ₹[X]L  │ ₹[X]L  │ [%]    │
│ CAC                   │ ₹[X]L  │ ₹[X]L  │ [%]    │
│ Marketing ROI         │ [X]x   │ [X]x   │ [%]    │

─────────────────────────────────────

TREND ANALYSIS

[Quarter-over-quarter trends with charts]

─────────────────────────────────────

WIN/LOSS ANALYSIS

Wins:
- [What worked and why]

Losses:
- [What didn't work and why]

─────────────────────────────────────

COMPETITIVE INSIGHTS

[Market/competitive observations from quarter]

─────────────────────────────────────

NEXT QUARTER PLAN

Goals:
- [Goal 1]
- [Goal 2]
- [Goal 3]

Key Initiatives:
- [Initiative 1]
- [Initiative 2]
- [Initiative 3]

Budget Request: ₹[X]L
```

---

## Attribution Models

### First-Touch Attribution

**Use When**: Understanding awareness generation
**Calculation**: 100% credit to first marketing touchpoint
**Best For**: Evaluating top-of-funnel channels

### Last-Touch Attribution

**Use When**: Understanding conversion drivers
**Calculation**: 100% credit to last touchpoint before conversion
**Best For**: Evaluating bottom-of-funnel effectiveness

### Multi-Touch Attribution (Recommended)

**Linear Model**:
- Equal credit across all touchpoints
- Example: 5 touches = 20% each

**Position-Based Model**:
- 40% first touch
- 40% last touch
- 20% distributed among middle

**Time-Decay Model**:
- More credit to recent touchpoints
- Older touches get less credit

### Attribution Example

```
DEAL: [Company Name] - ₹25L ARR

TOUCHPOINT JOURNEY:
1. LinkedIn Ad (Awareness) - Day 0
2. Blog Visit (Organic) - Day 5
3. Whitepaper Download - Day 12
4. Webinar Attendance - Day 25
5. Demo Request - Day 30
6. Closed Won - Day 60

ATTRIBUTION CREDIT:
Linear:        ₹5L each (20% × 5 touches)
Position:      ₹10L first, ₹10L last, ₹1.67L × 3 middle
Time-Decay:    ₹2L, ₹3L, ₹4L, ₹6L, ₹10L (increasing)
```

---

## Lead Scoring Model

### Fit Score (0-50 Points)

| Criteria | Points |
|----------|--------|
| Industry: Steel/Cement/FMCG | 15 |
| Industry: Other manufacturing | 10 |
| Revenue: ₹200-1000 Cr | 10 |
| Revenue: ₹100-200 Cr | 7 |
| Shipments: 100-500/day | 10 |
| Shipments: 50-100/day | 7 |
| Multi-plant operations | 5 |
| Title: VP/Director | 10 |
| Title: Manager | 5 |

### Engagement Score (0-50 Points)

| Behavior | Points |
|----------|--------|
| Demo request | 20 |
| Pricing page visit | 10 |
| Multiple content downloads | 8 |
| Webinar attendance | 8 |
| Case study download | 5 |
| Email opens (3+) | 5 |
| Website visits (3+) | 5 |
| Social engagement | 3 |

### Score Thresholds

| Total Score | Classification | Action |
|-------------|----------------|--------|
| 80+ | A-Lead (Hot) | Immediate sales outreach |
| 60-79 | B-Lead (Warm) | SDR qualification |
| 40-59 | C-Lead (Cool) | Nurture + periodic check |
| <40 | D-Lead (Cold) | Long-term nurture only |

---

## Diagnostic Questions

### If Pipeline Is Low

- Are we generating enough leads? (Volume issue)
- Are leads converting to MQLs? (Quality issue)
- Are MQLs converting to SQLs? (Sales alignment issue)
- Are opportunities closing? (Sales execution issue)

### If CAC Is High

- Which channels have highest CAC?
- Is lead quality affecting conversion?
- Are sales cycles lengthening?
- Are we targeting wrong segments?

### If Conversion Is Low

- Is content aligned with buyer journey?
- Are we qualifying correctly?
- Is sales follow-up timely?
- Are we targeting right personas?

---

## Marketing Operations Checklist

### Monthly Operations

- [ ] Review and clean lead database
- [ ] Update lead scoring rules
- [ ] Audit tracking and attribution
- [ ] Review automation workflows
- [ ] Check data sync between systems

### Quarterly Operations

- [ ] Full funnel audit
- [ ] Attribution model review
- [ ] Lead scoring recalibration
- [ ] Competitive benchmark update
- [ ] Technology stack review
