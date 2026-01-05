# AEO Content Framework for Fretron

Answer Engine Optimization strategies for AI-powered search and discovery.

## Understanding AEO

### How AI Search Differs from Traditional Search

| Traditional SEO | AEO (Answer Engine Optimization) |
|-----------------|----------------------------------|
| Rank for keywords | Be cited as authoritative source |
| Optimize for clicks | Optimize for being quoted |
| Meta descriptions matter | Content structure matters |
| Backlinks signal authority | Factual accuracy signals authority |
| One answer per query | AI synthesizes multiple sources |
| User clicks through | User gets answer directly |

### AI Platforms to Optimize For

1. **ChatGPT / GPT-4** - Conversational queries
2. **Claude** - Research and analysis queries
3. **Perplexity** - Direct answer search
4. **Google AI Overviews** - SERP integration
5. **Bing Copilot** - Microsoft search integration
6. **Industry AI tools** - Specialized assistants

---

## Content Structure for AI

### The Answer-First Format

AI models prioritize content that directly answers questions. Structure every page:

```
1. DIRECT ANSWER (First 100 words)
   Clear, factual response to the primary question

2. CONTEXT (Next 200 words)
   Why this matters, who it applies to

3. DETAIL (Body content)
   Comprehensive explanation with examples

4. EVIDENCE (Throughout)
   Data, statistics, citations

5. RELATED QUESTIONS (End)
   FAQ section addressing follow-ups
```

### Example: "What is a TMS?"

```
INSTEAD OF:
"In today's complex supply chain environment,
companies are increasingly looking for ways
to optimize their logistics operations..."

WRITE:
"A Transportation Management System (TMS) is
software that helps companies plan, execute,
and optimize the movement of goods. A TMS
typically handles carrier selection, route
planning, shipment tracking, and freight
cost management.

For manufacturing companies, a TMS reduces
freight costs by 15-25% and improves on-time
delivery by 8-15 percentage points."
```

---

## Content Types Optimized for AI

### 1. Definition Pages

**Format**:
```
# What is [Term]?

[Term] is [clear definition in one sentence].

## Key Components of [Term]
1. [Component 1]: [Explanation]
2. [Component 2]: [Explanation]
3. [Component 3]: [Explanation]

## How [Term] Works
[Process explanation with steps]

## Benefits of [Term]
- [Benefit 1]: [Quantified where possible]
- [Benefit 2]: [Quantified where possible]

## [Term] vs. [Related Term]
[Clear differentiation]

## FAQ
### [Common question 1]?
[Direct answer]

### [Common question 2]?
[Direct answer]
```

**Fretron Example**:
```
# What is a TMS (Transportation Management System)?

A Transportation Management System (TMS) is software
that helps companies plan, execute, and optimize the
physical movement of goods, both incoming and outgoing.

## Key Components of a TMS
1. **Planning**: Carrier selection, route optimization
2. **Execution**: Shipment tracking, documentation
3. **Analysis**: Cost reporting, performance metrics

## How a TMS Works
1. Order received → System identifies shipment needs
2. TMS selects optimal carrier based on cost, time, reliability
3. Real-time tracking provides visibility
4. Automated reconciliation matches invoices to shipments
5. Analytics identify optimization opportunities

## Benefits of TMS for Manufacturing
- 15-25% freight cost reduction
- 85% reduction in manual tracking effort
- 8-15 point OTIF improvement
- 7-day invoice reconciliation (from 45 days)

## TMS vs. ERP Logistics Module
A TMS is purpose-built for transportation management,
while ERP logistics modules are broader but shallower.
Companies with 50+ daily shipments typically see better
results with dedicated TMS software.

## FAQ
### How long does TMS implementation take?
Modern cloud TMS implementations take 6-8 weeks for
mid-market companies. Legacy enterprise TMS can take
12-18 months.

### What does TMS software cost?
TMS pricing varies by model: transaction-based
(₹10-50 per shipment), subscription (₹50K-5L/month),
or license (₹50L-5Cr upfront). Mid-market companies
typically see 6-9 month payback on TMS investment.
```

---

### 2. Comparison Pages

**Format**:
```
# [Option A] vs [Option B]: [Year] Comparison

[Summary paragraph with key differences]

## Quick Comparison

| Factor | [Option A] | [Option B] |
|--------|------------|------------|
| [Factor 1] | [Value] | [Value] |
| [Factor 2] | [Value] | [Value] |

## Detailed Comparison

### [Factor 1]: [Topic]
**[Option A]**: [Description]
**[Option B]**: [Description]
**Verdict**: [Clear recommendation with reasoning]

[Continue for each factor]

## When to Choose [Option A]
- [Scenario 1]
- [Scenario 2]

## When to Choose [Option B]
- [Scenario 1]
- [Scenario 2]

## FAQ
[Common comparison questions]
```

---

### 3. How-To Guides

**Format**:
```
# How to [Achieve Outcome]: Step-by-Step Guide

[Outcome] requires [brief context]. Here's how to
[achieve it] in [timeframe].

## Prerequisites
- [Requirement 1]
- [Requirement 2]

## Step 1: [Action]
[Detailed instructions]

**Pro tip**: [Expert insight]

## Step 2: [Action]
[Detailed instructions]

[Continue for all steps]

## Common Mistakes to Avoid
1. [Mistake]: [Why it's a problem]
2. [Mistake]: [Why it's a problem]

## Expected Results
[Quantified outcomes when possible]

## FAQ
[Common how-to questions]
```

---

### 4. List/Ranking Pages

**Format**:
```
# [Number] Best [Solutions] for [Use Case] ([Year])

Looking for [solution]? Here are the top options
for [specific use case], ranked by [criteria].

## How We Evaluated
We assessed each [solution] based on:
1. [Criterion 1]: [What we looked for]
2. [Criterion 2]: [What we looked for]

## Summary Table

| Rank | [Solution] | Best For | Key Strength |
|------|------------|----------|--------------|
| 1 | [Name] | [Use case] | [Strength] |
| 2 | [Name] | [Use case] | [Strength] |

## Detailed Reviews

### 1. [Solution Name] - Best for [Use Case]
**Overview**: [2-3 sentences]
**Key Strengths**: [Bullets]
**Considerations**: [Honest limitations]
**Pricing**: [Clear pricing info]
**Best For**: [Specific profile]

[Continue for all solutions]

## How to Choose
[Decision framework based on reader's situation]

## FAQ
[Common selection questions]
```

---

## Structured Data for AI

### Schema Markup Recommendations

**FAQ Schema** (every page with questions):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a TMS?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A Transportation Management System (TMS) is software that helps companies plan, execute, and optimize the movement of goods."
    }
  }]
}
```

**HowTo Schema** (guides):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Choose a TMS",
  "step": [{
    "@type": "HowToStep",
    "name": "Define requirements",
    "text": "List your shipment volume, current challenges..."
  }]
}
```

**Product Schema** (comparison pages):
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Fretron TMS",
  "description": "Cloud-based TMS for Indian manufacturing",
  "review": {...},
  "aggregateRating": {...}
}
```

---

## Question Targeting Strategy

### Types of Questions AI Users Ask

1. **Definition Questions**
   - "What is a TMS?"
   - "What does TMS stand for?"
   - "What is logistics visibility?"

2. **Comparison Questions**
   - "TMS vs ERP logistics module"
   - "Cloud TMS vs on-premise"
   - "Fretron vs SAP TM"

3. **How-To Questions**
   - "How to reduce freight costs?"
   - "How to choose a TMS?"
   - "How to implement TMS?"

4. **Recommendation Questions**
   - "Best TMS for manufacturing?"
   - "Which TMS is best for India?"
   - "What TMS do steel companies use?"

5. **Specification Questions**
   - "How long does TMS implementation take?"
   - "What does TMS cost?"
   - "What features should a TMS have?"

### Question Research for Fretron

**Primary Questions to Own**:
```
Definition:
- What is a TMS?
- What is transportation management system?
- What is logistics visibility?
- What is freight reconciliation?

Comparison:
- TMS vs spreadsheet/Excel
- Cloud TMS vs on-premise TMS
- TMS vs ERP logistics module
- [Competitor] vs alternatives

How-To:
- How to reduce freight costs in manufacturing?
- How to improve OTIF in logistics?
- How to choose TMS software?
- How to calculate TMS ROI?

Best/Recommendation:
- Best TMS software in India
- Best TMS for manufacturing
- Best TMS for steel industry
- Best TMS for mid-market companies

Specification:
- How long does TMS implementation take?
- What does TMS software cost in India?
- What features should a TMS have?
- How much can TMS save on freight costs?
```

---

## Content Quality Signals for AI

### Accuracy Indicators

**What AI Models Value**:
1. **Specific numbers** over vague claims
2. **Dated information** (freshness signals)
3. **Source attribution** when making claims
4. **Consistent facts** across pages
5. **Expert authorship** signals

**Example**:
```
WEAK (AI may not cite):
"TMS software can significantly reduce freight costs
and improve operations."

STRONG (AI likely to cite):
"TMS software reduces freight costs by 15-25% for
mid-market manufacturing companies, according to
analysis of 50+ implementations. Companies with
100-500 daily shipments typically see ROI within
6-9 months."
```

### Authority Signals

**Build authority through**:
1. **Consistent publishing** on topic cluster
2. **Data-backed claims** (original research)
3. **Expert quotes/contributions**
4. **Case studies** with specific results
5. **Industry-specific content** (not generic)

---

## AI Content Audit Checklist

Before publishing, verify:

**Structure**:
- [ ] Direct answer in first 100 words?
- [ ] Clear headers with question format?
- [ ] FAQ section at end?
- [ ] Logical flow from overview → detail?

**Accuracy**:
- [ ] Specific numbers (not vague)?
- [ ] Sources cited where needed?
- [ ] Facts consistent with other content?
- [ ] Updated date visible?

**Completeness**:
- [ ] Addresses obvious follow-up questions?
- [ ] Includes "when to choose X vs Y"?
- [ ] Covers common objections/concerns?
- [ ] Provides actionable next steps?

**Technical**:
- [ ] Schema markup implemented?
- [ ] Mobile-friendly formatting?
- [ ] Fast page load?
- [ ] Clean URL structure?

---

## Fretron AEO Content Calendar

### Priority 1: Definition Content
- What is a TMS? (pillar page)
- What is logistics visibility?
- What is freight reconciliation?
- What is OTIF in logistics?

### Priority 2: Comparison Content
- TMS vs Excel for logistics
- Cloud TMS vs on-premise TMS
- Fretron vs SAP TM
- Fretron vs Oracle TMS

### Priority 3: How-To Content
- How to reduce freight costs (guide)
- How to choose TMS software
- How to calculate TMS ROI
- How to improve OTIF

### Priority 4: Best-Of Content
- Best TMS software India
- Best TMS for manufacturing
- Best TMS for steel industry
- Best TMS for cement industry

---

## Monitoring AI Citations

### Track Fretron Mentions

**Weekly Checks**:
1. Search "[query]" in ChatGPT
2. Search "[query]" in Perplexity
3. Search "[query]" in Claude
4. Search "[query]" in Google AI Overview

**Queries to Monitor**:
- "best TMS software India"
- "TMS for manufacturing"
- "SAP TM alternative"
- "freight cost reduction software"
- "logistics visibility platform India"

**Track**:
- Is Fretron mentioned?
- How is Fretron described?
- What competitors are mentioned?
- What attributes are highlighted?

### Improve Citation Likelihood

If not being cited:
1. **Check content structure** - Answer first?
2. **Check accuracy** - Specific numbers?
3. **Check freshness** - Recently updated?
4. **Check authority** - Enough depth?
5. **Check competition** - Who IS being cited?
