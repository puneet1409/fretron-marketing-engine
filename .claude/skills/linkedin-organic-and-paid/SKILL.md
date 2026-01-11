---
name: linkedin-organic-and-paid
description: Use for LinkedIn marketing - organic presence building, thought leadership, and paid advertising including retargeting. Covers personal branding, company pages, LinkedIn Ads, and signal-based retargeting to amplify other channels. Invoke for LinkedIn strategy, content planning, or paid campaigns.
context_tools:
  - enrich_company
  - fetch_company_news
execution_capable: false
depends_on:
  - trust-building-principles
---

# LinkedIn Organic and Paid

**Depends on**: `trust-building-principles`

## Core Insight

**LinkedIn is where B2B buyers want to be influenced. Organic builds credibility, paid amplifies reach and qualifies traffic from other channels.**

Organic for trust-building. Paid for scale and cross-channel synergy.

## Organic Presence

### Personal vs Company

| Channel | Strength | Use For |
|---------|----------|---------|
| Personal profiles | Higher reach, more trust | Thought leadership, relationship |
| Company page | Brand credibility | Product updates, social proof |

**Priority**: Personal profiles of founders/experts often outperform company pages 5-10x.

### Content That Works

**High engagement**:
- Contrarian takes with evidence
- Specific results/numbers
- Behind-the-scenes insights
- Frameworks and mental models
- Industry observations

**Low engagement**:
- Product announcements
- Generic tips
- Obvious advice
- Self-promotional content

### Posting Principles

- **Hook**: First 2 lines must stop the scroll
- **Format**: Short paragraphs, line breaks, scannable
- **Value**: Would you save this if someone else posted it?
- **Engagement**: Ask questions, invite perspective
- **Consistency**: Regular posting > occasional viral

### Thought Leadership Formula

```
1. Observation from your domain
2. Why it matters (so what?)
3. What to do about it
4. Question or invitation to discuss
```

## LinkedIn Advertising

### Campaign Types by Goal

| Goal | Campaign Type | Audience |
|------|---------------|----------|
| Awareness | Brand awareness | Broad ICP |
| Engagement | Content promotion | Interested ICP |
| Conversion | Lead gen / Website | Engaged + qualified |

### Audience Building

**Native targeting**:
- Job title / function
- Company size
- Industry
- Seniority

**Custom audiences**:
- Website visitors (Insight Tag)
- Email list matches
- Engagement retargeting
- Lookalikes

## Signal-Based Retargeting

### The Ecosystem Enhancer Strategy

**Core insight**: LinkedIn can see ALL your website traffic and layer ICP filters on top. Use it to qualify and convert traffic from Google, organic, etc.

### Framework

```
1. CAPTURE: Website visitor audiences (30/60/90/180 day)
2. QUALIFY: Layer LinkedIn ICP filters (size, seniority, industry)
3. NURTURE: 90-day trust content to qualified visitors
4. CONVERT: BoFU campaigns to engaged subset
```

### Audience Windows

| Window | Use Case |
|--------|----------|
| 30 day | Hot - recent visitors, conversion focus |
| 60 day | Warm - nurture and build |
| 90 day | Standard nurture pool |
| 180 day | Extended awareness |

### Nurture Content Rotation

Over 90 days, serve:
- Thought leader content (credibility)
- Case studies (proof)
- Educational assets (value)
- Demo clips (consideration)

**Not**: Constant demo CTAs to cold audiences.

### Engagement Triggers

When someone:
- Clicks MoFU content
- Watches 75%+ of video
- Downloads asset
- Visits pricing page

→ Move to 30-day BoFU campaign with stronger CTAs.

---

## High-Intent Signal Tracking (NEW)

**Core insight**: LinkedIn is a goldmine of buying signals. Track them systematically to identify warm leads before outreach.

### Signal Detection System

#### 1. Competitor Engagement Monitoring

**What to track**:
- Comments on competitor company pages
- Likes on competitor product posts
- Follows of competitor executives
- Engagement with TMS-related content

**How to track**:
- Sales Navigator saved searches
- Manual monitoring of competitor pages weekly
- Google Alerts for competitor mentions + your ICP

**Competitors to monitor for TMS**:
- SAP Transportation Management
- Oracle TMS / Blue Yonder
- Locus, FarEye, LogiNext
- Shipsy, Pickrr

#### 2. Pain Point Keyword Monitoring

**LinkedIn Boolean searches** (save and run weekly):

```
("logistics nightmare" OR "freight costs" OR "tracking visibility") AND (VP OR Director OR Head) AND (India)
```

```
("supply chain challenges" OR "carrier management" OR "OTIF issues") AND (Operations OR Logistics OR Supply Chain)
```

```
("digital transformation" AND logistics) OR ("automating" AND "supply chain")
```

#### 3. Job Change Alerts

**Sales Navigator settings**:
- Job changes in last 90 days
- Titles: VP, Director, Head, Chief + (Supply Chain, Logistics, Operations, Digital, Procurement)
- Geography: India
- Company size: 500+ employees

#### 4. Content Engagement Tracking

Track who engages with:
- Your company's posts
- Your team's personal posts
- Industry influencer content
- Logistics/supply chain hashtags

### Signal Scoring for Outreach Priority

| Signal | Points | Action |
|--------|--------|--------|
| Commented on competitor | +40 | DM within 24 hours |
| Posted about pain point | +35 | DM same day |
| New role (decision-maker) | +30 | DM within 48 hours |
| Liked competitor content | +20 | Add to nurture list |
| Follows logistics influencer | +15 | Light engagement first |
| Company announced expansion | +25 | DM within 1 week |

### Weekly Signal Review Cadence

**Monday (30 min)**:
- Review Sales Navigator alerts
- Check competitor page engagement
- Run saved Boolean searches

**Daily (15 min)**:
- Check notifications for your content engagers
- Respond to any high-intent signals immediately

**Friday (15 min)**:
- Export high-intent leads to CRM
- Update signal tracking list
- Plan next week's outreach

### Tools for Signal Tracking

| Tool | Use Case | Cost |
|------|----------|------|
| LinkedIn Sales Navigator | Job changes, saved searches | $99/mo |
| Gojiberry AI | Automated signal capture | Trial available |
| Google Alerts | Company news | Free |
| Phantombuster | Profile scraping (careful with ToS) | $59/mo |

---

## Cross-Channel Synergy

### LinkedIn + Google Ads

LinkedIn retargeting on Google traffic:
- Google drives in-market searches
- LinkedIn qualifies to ICP
- LinkedIn nurtures buying committee
- Result: Higher conversion on Google spend

**Math example**:
- Google only: 2% conversion
- Google + LinkedIn retargeting: 4-6% on warmed traffic
- Incremental LinkedIn return: 10-30x

### LinkedIn + ABM

Use LinkedIn as primary warmup channel for ABM:
- Organic engagement with target accounts
- Paid content to account list
- Direct outreach to warmed contacts

## Measurement

### Organic Metrics

- Impressions and reach
- Engagement rate (>2% good, >5% great)
- Profile views
- Connection requests received
- DM conversations started

### Paid Metrics

| Metric | Awareness | Engagement | Conversion |
|--------|-----------|------------|------------|
| Focus | CPM, Reach | CTR, Engagement | CPL, ROAS |
| Target | <$30 CPM | >0.5% CTR | <$100 CPL |

### Cross-Channel Attribution

Track:
- Google CPL trend (should improve with LinkedIn retargeting)
- LinkedIn-influenced pipeline in CRM
- Account coverage and impressions via Company Hub

## B2B Tech Context

- Decision-makers ARE on LinkedIn
- Technical content performs well
- Industry-specific insights beat generic
- Video and carousels currently favored by algorithm

---

## Context Tools

Tools provide research context for LinkedIn strategy, but execution requires LinkedIn platform access (no MCP available).

### Company Research for Targeting

```
enrich_company(company_name)
→ Industry, size, tech stack
→ Use for: LinkedIn Ads audience targeting, content personalization

fetch_company_news(company_name)
→ Recent triggers, expansion, leadership changes
→ Use for: Timely content topics, signal-based content themes
```

### Research Applications

| Research Need | Tool | Use In LinkedIn |
|---------------|------|-----------------|
| Target account context | `enrich_company` | Ad copy personalization |
| Content timing | `fetch_company_news` | Trigger-based content |
| Industry trends | `fetch_company_news` | Thought leadership topics |

---

## Integration

- Trust calibration → `trust-building-principles`
- ABM coordination → `running-abm-programs`
- Copy quality → `writing-persuasive-copy`
- Content source → `seo-and-content-strategy`
- Signal-based outreach → `linkedin-high-intent-outreach`
