# 6-Month LinkedIn Retargeting Roadmap

Phased implementation plan for deploying LinkedIn as a Google Ads ecosystem enhancer.

---

## Month 1: Foundation

### Week 1-2: Technical Setup

**LinkedIn Insight Tag Audit**
```
Verification checklist:
□ Tag installed on ALL pages (not just landing pages)
□ Tag firing correctly (check LinkedIn Campaign Manager)
□ Conversion events configured:
  - Demo request form submit
  - Pricing page visit
  - Contact form submit
  - Calculator completion
□ Test conversions flowing into Campaign Manager
```

**Audience Creation**
```
Matched Audiences to Create:

WEBSITE VISITORS:
├── All visitors - 30 days
├── All visitors - 60 days
├── All visitors - 90 days
├── All visitors - 180 days
├── High-intent pages - 30 days
│   (pricing, demo, contact, case studies)
└── Calculator users - 90 days

COMPANY PAGE:
├── Followers
├── Page visitors - 30 days
├── Page visitors - 90 days
└── Page visitors - 180 days

UTM-SPECIFIC:
├── Google Ads traffic - 30 days
├── Google Ads traffic - 90 days
└── Google Ads traffic - 180 days
    (create via URL parameter matching)
```

### Week 3-4: ICP Filter Configuration

**Targeting Layers for Fretron**
```
Layer 1: Company Size
├── 201-500 employees
├── 501-1000 employees
└── 1001-5000 employees

Layer 2: Industry
├── Manufacturing (primary)
├── Metals & Mining
├── Building Materials
├── Consumer Goods
├── Chemicals
└── Food & Beverages

Layer 3: Job Function
├── Operations
├── Supply Chain
├── Logistics
└── Purchasing

Layer 4: Seniority
├── VP
├── Director
├── CXO
└── Manager (for nurture only)

Layer 5: Job Titles (optional refinement)
├── VP Logistics / VP Supply Chain / VP Operations
├── Head of Logistics / Head of Supply Chain
├── Director Logistics / Director Operations
├── CFO / COO (for executive campaigns)
└── Plant Head / General Manager
```

---

## Month 2: Nurture Launch

### Campaign Structure

```
CAMPAIGN GROUP: Google Traffic Qualifier
│
├── Campaign 1: Trust Building - MoFU
│   ├── Audience: Website 90 days + ICP filters
│   ├── Objective: Engagement
│   ├── Budget: ₹50K/month
│   ├── Bid: CPM (awareness)
│   └── Creative rotation:
│       ├── Thought leader post (industry insight)
│       ├── Case study teaser
│       └── Educational content
│
├── Campaign 2: Proof Points - MoFU
│   ├── Audience: Website 60 days + ICP filters
│   ├── Objective: Website visits
│   ├── Budget: ₹40K/month
│   ├── Bid: CPC
│   └── Creative rotation:
│       ├── Customer testimonial video
│       ├── Results carousel
│       └── ROI data point
│
└── Campaign 3: Consideration - MoFU
    ├── Audience: Website 30 days + ICP filters
    ├── Objective: Lead gen
    ├── Budget: ₹30K/month
    ├── Bid: CPC
    └── Creative rotation:
        ├── Benchmark report download
        ├── Cost calculator CTA
        └── Demo teaser
```

### Creative Calendar

| Week | Campaign 1 | Campaign 2 | Campaign 3 |
|------|------------|------------|------------|
| 1 | Industry insight | Customer quote | Calculator |
| 2 | Trend observation | Video testimonial | Report download |
| 3 | Framework share | Results carousel | Demo clip |
| 4 | Contrarian take | Before/after | Book demo |

---

## Month 3: Engagement Signals

### Define Engagement Triggers

```
ENGAGEMENT THRESHOLD = Any of:

High-Value Signals:
├── Clicked to pricing page (UTM tracked)
├── Clicked to demo page
├── Submitted lead gen form
├── Downloaded gated content
└── Watched 75%+ of video ad

Medium-Value Signals:
├── Clicked to case study page
├── Clicked to blog/resource
├── Watched 50%+ of video
└── Multiple ad clicks (2+)
```

### Create Engagement Audience

```
Steps:
1. Campaign Manager → Matched Audiences
2. Create from campaign engagement
3. Select: Video viewers (75%+)
4. Select: Lead gen form openers
5. Select: Website converters
6. Combine into "Engaged - Ready for BoFU"
```

### Launch BoFU Campaign

```
CAMPAIGN GROUP: Signal-Qualified BoFU
│
├── Campaign: Aggressive Conversion
│   ├── Audience: "Engaged - Ready for BoFU" only
│   ├── Objective: Conversions
│   ├── Budget: ₹60K/month
│   ├── Bid: Max conversions
│   └── Creative:
│       ├── Direct demo ask
│       ├── ROI calculator
│       ├── Competitive comparison
│       └── Limited-time offer
│
└── Settings:
    ├── Time-bound: 30 days only
    ├── Frequency cap: 2/day
    └── Exclude: Converted leads
```

---

## Month 4: Intelligence Layer

### Company Hub Setup

```
Access: Campaign Manager → Plan → Company Hub

Key Reports to Build:
1. Accounts reached (by impression count)
2. Accounts by engagement level
3. Low-saturation accounts (< 3 impressions)
4. Title coverage per account

Actions:
├── Export high-impression, low-conversion accounts
│   → Trigger sales outreach
├── Export low-saturation ICP accounts
│   → Increase budget/frequency
└── Export engaged accounts
    → Add to ABM Tier 1 list
```

### CRM Integration

```
If using DemandSense or similar:

Setup Steps:
1. Connect CRM (Salesforce, HubSpot)
2. Sync company domains
3. Configure lookback window (90 days)
4. Map engagement levels to CRM fields

Reports to Generate:
├── Pipeline accounts with LinkedIn touch
├── Avg engagement before opportunity
├── Close rate: LinkedIn-touched vs not
├── Deal velocity comparison
└── Deal size comparison
```

---

## Month 5: Optimization

### Performance Review Framework

**Weekly Review**
```
Check:
□ CPM/CPC trending (stable or improving?)
□ CTR by creative (rotate underperformers)
□ Engagement rate by audience segment
□ Lead form completion rate
□ Video view rates (25%, 50%, 75%, 100%)
```

**Monthly Review**
```
Analyze:
□ Google Ads CPL trend (should decrease)
□ Quality of demos booked (sales feedback)
□ Company Hub account coverage
□ Engagement → BoFU flow rate
□ LinkedIn-influenced pipeline

Optimize:
□ Adjust ICP filters based on quality
□ Refresh creative (fatigue sets in ~6 weeks)
□ Rebalance budget between campaigns
□ Update audience windows if needed
```

### A/B Tests to Run

| Week | Test | Variants |
|------|------|----------|
| 1-2 | Audience window | 30 day vs 60 day |
| 3-4 | Creative format | Video vs carousel |
| 5-6 | CTA | Soft (learn more) vs hard (book demo) |
| 7-8 | Industry filter | Broad vs narrow |

---

## Month 6: Scale & Expand

### Scaling Decision Framework

```
IF LinkedIn showing positive signals:
├── Google CPL decreased 10%+
├── Demo quality improved (sales confirms)
├── Company Hub shows ICP coverage
└── Pipeline influence detectable

THEN scale:
├── Increase LinkedIn budget 50-100%
├── Expand audience windows (add 180 day)
├── Add new creative themes
└── Test new ICP segments
```

### Expansion Opportunities

```
1. Beyond Google Traffic:
   ├── Organic website visitors
   ├── Email list matched audiences
   └── Event attendees

2. New Engagement Triggers:
   ├── Webinar attendees → BoFU
   ├── Whitepaper downloaders → Nurture
   └── Chatbot engagers → Qualification

3. Cross-Channel Activation:
   ├── Export high-intent accounts to Meta
   ├── Push to programmatic (display/video)
   └── Trigger SDR outreach for hot accounts
```

---

## Budget Allocation Template

### Starting Budget (₹2L/month)

| Campaign | % | Amount | Objective |
|----------|---|--------|-----------|
| Trust Building | 40% | ₹80K | Awareness, frequency |
| Proof Points | 30% | ₹60K | Engagement |
| BoFU | 30% | ₹60K | Conversions |

### Scaled Budget (₹5L/month)

| Campaign | % | Amount | Objective |
|----------|---|--------|-----------|
| Trust Building | 30% | ₹1.5L | Broad awareness |
| Proof Points | 25% | ₹1.25L | Consideration |
| BoFU | 25% | ₹1.25L | Conversions |
| ABM Overlay | 20% | ₹1L | Named accounts |

---

## Reporting Dashboard

### Executive Summary (Monthly)

```
LINKEDIN RETARGETING PERFORMANCE
Period: [Month]

INVESTMENT
Total LinkedIn Spend: ₹[X]
As % of Google Spend: [X]%

REACH
ICP Accounts Reached: [#]
Avg Impressions/Account: [#]
Titles Reached/Account: [#]

ENGAGEMENT
MoFU Engagement Rate: [%]
Video View Rate (75%+): [%]
BoFU Conversion Rate: [%]

IMPACT
Google CPL Change: [+/-X%]
LinkedIn-Attributed Leads: [#]
Pipeline Influenced: ₹[X]
Deals with LinkedIn Touch: [#]

NEXT ACTIONS
1. [Action]
2. [Action]
3. [Action]
```

---

## Troubleshooting

### Low Reach/Impressions

**Causes**:
- Audience too narrow (too many filters)
- Budget too low for audience size
- Bid too low for competition

**Fixes**:
- Remove one ICP filter layer
- Increase daily budget
- Switch to automated bidding

### Low Engagement

**Causes**:
- Creative not resonating
- Wrong audience (not ICP fit)
- Frequency too high (fatigue)

**Fixes**:
- Test new creative angles
- Review audience composition
- Set frequency cap (2-3/week)

### No Google CPL Impact

**Causes**:
- Attribution window mismatch
- Too early (need 2-3 months)
- LinkedIn reach insufficient

**Fixes**:
- Align attribution windows
- Wait for data maturity
- Increase LinkedIn budget/reach

### Sales Not Seeing Quality Lift

**Causes**:
- ICP filters not strict enough
- Wrong audience windows
- Misalignment on quality definition

**Fixes**:
- Tighten company size/industry
- Focus on shorter windows (30-60 day)
- Sync with sales on qualification criteria
