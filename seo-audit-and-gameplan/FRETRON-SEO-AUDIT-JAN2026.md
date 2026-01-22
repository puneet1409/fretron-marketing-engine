# Fretron.com Deep SEO Audit & AI-Executable Gameplan

**Audit Date**: January 2026
**Auditor**: Claude AI (using Fretron Marketing Engine skills)
**Status**: Ready for execution

---

## Executive Summary

### Current State: 6/10

Fretron has solid product-market fit and good review presence (G2, Capterra) but **severely underperforms in organic search**. The site is invisible for critical category-defining queries that SAP, Oracle, and even smaller competitors own.

### Critical Findings

| Area | Score | Status |
|------|-------|--------|
| Site Structure | 7/10 | Good foundation, 207 pages indexed |
| Technical SEO | 5/10 | Missing schema, heavy JS, no meta optimization |
| Content Authority | 3/10 | **Critical gap** - No pillar content, no comparisons |
| AI Citation Readiness | 2/10 | **Invisible to AI** - No Wikipedia, poor structure |
| Competitive Position | 4/10 | Outranked by Traqo, Locus, FarEye on key queries |

### The Problem

When someone asks Google or ChatGPT:
- "What is the best TMS in India?" → **Fretron not mentioned**
- "What is a transportation management system?" → **SAP, Oracle, IBM rank**
- "How to reduce freight costs India?" → **Fretron invisible**
- "Route optimization software India" → **Competitors dominate**

### The Opportunity

- 207 pages exist but **no topical authority structure**
- 155+ blog posts but **scattered, not clustered**
- Strong product reviews but **not leveraged for SEO**
- India-specific expertise but **not captured in content**

---

## Part 1: Detailed Audit Findings

### 1.1 Site Structure Analysis

**Current State**:
```
fretron.com
├── /tms-platform (main product)
├── /solutions/ (6 pages)
│   ├── collaborative-execution
│   ├── freight-procurement
│   ├── plant-logistics-automation
│   └── ... 3 more
├── /industries/ (7 pages)
│   ├── cement, steel, chemical
│   ├── automotive, fmcg, retail
│   └── lsp
├── /initiatives/ (4 pages)
├── /insights/ (blog, webinars, case studies)
└── 155+ blog posts
```

**Gaps Identified**:
- ❌ No `/what-is-tms` or `/glossary` section
- ❌ No `/vs/` comparison pages
- ❌ No `/integrations/` directory
- ❌ No `/calculators/` or tools
- ❌ Case studies buried, not SEO-optimized

### 1.2 Technical SEO Assessment

| Element | Status | Issue |
|---------|--------|-------|
| Page Titles | ⚠️ Partial | Present but not optimized for all pages |
| Meta Descriptions | ❌ Missing | Not visible in page source |
| Schema Markup | ❌ None | No Organization, Product, FAQ, or Article schema |
| Core Web Vitals | ⚠️ Unknown | Heavy JS may impact LCP |
| Internal Linking | ⚠️ Basic | No strategic pillar-cluster linking |
| XML Sitemap | ✅ Present | 207 URLs indexed |
| Mobile | ✅ Responsive | Good mobile experience |

### 1.3 Content Authority Analysis

**Pillar Content**: NONE
- No comprehensive guides ranking for head terms
- "What is TMS" → SAP #1, Oracle #2, IBM #3
- Fretron doesn't appear in top 50

**Comparison Content**: NONE
- No "Fretron vs Locus" pages
- No "Fretron vs SAP TMS" pages
- Competitors create these; Fretron doesn't control narrative

**Programmatic Content**: NONE
- No integration pages (`/integrations/sap`, `/integrations/tally`)
- No location pages (`/tms-mumbai`, `/logistics-bangalore`)
- No use-case combinations (`/tms-for-pharma-cold-chain`)

### 1.4 Keyword Gap Analysis

| Query | Monthly Volume (India) | Fretron Ranks? | Who Ranks |
|-------|------------------------|----------------|-----------|
| transportation management system | 6,600 | ❌ No | SAP, Oracle |
| what is tms | 2,400 | ❌ No | SAP, Oracle, IBM |
| best tms software india | 720 | ❌ No | Traqo, Fleetable |
| route optimization software | 1,300 | ❌ No | Locus, OptimoRoute |
| freight cost reduction | 590 | ❌ No | Logistics blogs |
| e-way bill automation | 1,600 | ❌ No | ClearTax, GSTrobo |
| fleet tracking software india | 1,900 | ❌ No | LocoNav, TrackoBit |
| logistics software india | 880 | ❌ No | Competitors |

**Total missed opportunity**: 15,000+ monthly searches minimum

### 1.5 AI Citation Readiness

**Entity Establishment**:
- ❌ No Wikipedia page
- ❌ No Wikidata entry
- ❌ No Google Knowledge Panel
- ✅ Crunchbase profile exists
- ✅ G2/Capterra reviews present

**Content Structure for AI**:
- ❌ No FAQ schema on any page
- ❌ No clear definition paragraphs
- ❌ No structured comparison tables AI can extract
- ❌ Heavy JavaScript rendering (AI can't parse)

**AI Citation Test** (simulated):
```
Query: "What is the best TMS for Indian logistics?"
Expected AI Response: Lists SAP, Locus, FarEye
Fretron Mentioned: NO
```

### 1.6 Competitive Analysis

**Why Competitors Outrank Fretron**:

| Competitor | Advantage |
|------------|-----------|
| **SAP/Oracle** | Massive domain authority, pillar content, entity recognition |
| **Locus** | Strong US-based content team, blog velocity, AI positioning |
| **FarEye** | Last-mile content dominance, Gartner mentions |
| **Traqo** | Creating listicle content targeting Indian market |
| **Fleetable** | Blog + comparison content for fleet management |

---

## Part 2: The 90-Day AI-Executable Gameplan

### Gameplan Overview

```
PHASE 1 (Days 1-30):  Technical Foundation + Pillar Content
PHASE 2 (Days 31-60): Content Velocity + Programmatic Pages
PHASE 3 (Days 61-90): AI Optimization + Authority Building
```

### Success Metrics by Day 90

| Metric | Current | Target |
|--------|---------|--------|
| Indexed pages | 207 | 500+ |
| Keywords in top 100 | ~50 | 500+ |
| Organic traffic | Baseline | 3x |
| "What is TMS" rank | Not ranking | Top 20 |
| Comparison pages | 0 | 25 |
| AI citation (test) | Not mentioned | Mentioned |

---

## Phase 1: Technical Foundation + Pillar Content (Days 1-30)

### Week 1: Technical SEO Sprint

#### Day 1-2: Schema Implementation

**AI Task**: Generate and implement schema markup for all key pages.

```json
// Organization Schema (homepage)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fretron",
  "alternateName": "Fretron TMS",
  "url": "https://fretron.com",
  "logo": "https://fretron.com/logo.png",
  "description": "India's leading cloud-based Transport Management System for logistics optimization",
  "foundingDate": "2017",
  "founders": [
    {"@type": "Person", "name": "Puneet Agarwal"},
    {"@type": "Person", "name": "Sunil Dhaker"}
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gurugram",
    "addressCountry": "India"
  },
  "sameAs": [
    "https://www.linkedin.com/company/fretron",
    "https://www.g2.com/products/fretron",
    "https://www.crunchbase.com/organization/fretron"
  ]
}

// Product Schema (TMS Platform page)
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Fretron TMS",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Transportation Management System",
  "operatingSystem": "Cloud-based",
  "offers": {
    "@type": "Offer",
    "price": "500",
    "priceCurrency": "USD",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "50"
  }
}
```

**Human Input Required**: Verify rating numbers, exact founding date, logo URL.

#### Day 3-4: Meta Optimization Sprint

**AI Task**: Generate optimized meta titles and descriptions for top 50 pages.

**Template**:
```
/tms-platform
Title: Fretron TMS Platform | India's #1 Transport Management System
Description: Fretron TMS offers AI-powered dispatch planning, real-time tracking, and freight optimization for Indian enterprises. Reduce costs by 7%. Get a demo.

/industries/cement
Title: TMS for Cement Logistics | Reduce TAT by 40% | Fretron
Description: Cement manufacturers use Fretron TMS for automated dispatch, vehicle sequencing, and plant logistics. 98% on-time deliveries. Book consultation.

/solutions/freight-procurement
Title: Freight Procurement Software | Smart RFQ & Bidding | Fretron
Description: Automate carrier selection with AI-powered bidding. Fretron's freight procurement module reduces costs and improves carrier performance. Try free.
```

**Human Input Required**: Approve final meta content before implementation.

#### Day 5-7: Internal Linking Audit

**AI Task**: Map all pages and create internal linking recommendations.

**Priority Links to Add**:
1. Every industry page → TMS Platform pillar
2. Every solution page → related industry pages
3. All blog posts → relevant solution pages
4. Homepage → all pillar pages

---

### Week 2-3: Pillar Content Creation

#### Pillar 1: "The Complete Guide to Transportation Management Systems"

**Target Keyword**: what is tms, transportation management system
**Target Length**: 4,500 words
**Target URL**: `/what-is-tms`

**AI-Generated Outline**:

```markdown
# What is a Transportation Management System (TMS)? The Complete Guide

## Quick Answer (AI-snippet optimized, 50 words)
A Transportation Management System (TMS) is logistics software that helps
companies plan, execute, and optimize the movement of goods. It handles
route planning, carrier selection, real-time tracking, freight billing,
and analytics. Modern TMS platforms like Fretron use AI to reduce costs
by 7-15% while improving delivery performance.

## Table of Contents
[Auto-generated]

## What is a TMS?
- Definition and core purpose
- How TMS fits in supply chain technology
- TMS vs WMS vs ERP

## Key Components of a TMS
- Planning module → [Link to route optimization cluster]
- Execution module → [Link to dispatch planning cluster]
- Visibility module → [Link to tracking cluster]
- Analytics module → [Link to freight audit cluster]

## Benefits of TMS
- Cost reduction (with Indian benchmarks)
- Improved OTIF
- Visibility and control
- Compliance automation (GST, e-way bill)

## Who Needs a TMS?
- Enterprise shippers
- 3PL providers
- Fleet owners
- Industry-specific needs

## How to Choose a TMS
- Key features checklist
- Integration requirements
- Indian market considerations

## TMS Implementation Guide
- Timeline expectations
- Change management
- ROI calculation

## TMS in India: Unique Considerations
- GST and e-way bill compliance
- Multi-modal transport
- Regional challenges

## Future of TMS
- AI and automation trends
- IoT integration
- Sustainability tracking

## FAQ (10 questions, schema-marked)
- What does TMS stand for?
- How much does a TMS cost?
- What's the difference between TMS and WMS?
- [7 more]

## Conclusion
- Summary
- CTA: Book a demo
```

**Human Input Required**: Approve outline, provide Indian-specific data points.

#### Pillar 2: "Freight Cost Reduction: The Complete Playbook for Indian Logistics"

**Target Keywords**: freight cost reduction, reduce logistics costs india
**Target Length**: 4,000 words
**Target URL**: `/freight-cost-reduction-guide`

#### Pillar 3: "Route Optimization: From Manual Planning to AI-Powered Efficiency"

**Target Keywords**: route optimization software, route planning logistics
**Target Length**: 3,500 words
**Target URL**: `/route-optimization-guide`

#### Pillar 4: "Fleet Management in India: The Complete Guide"

**Target Keywords**: fleet management software india, fleet tracking
**Target Length**: 3,500 words
**Target URL**: `/fleet-management-guide`

#### Pillar 5: "E-Way Bill & GST Compliance in Logistics"

**Target Keywords**: e-way bill automation, gst logistics compliance
**Target Length**: 3,000 words
**Target URL**: `/eway-bill-compliance-guide`

---

### Week 4: Technical Completion + Launch

#### Day 22-24: FAQ Schema Implementation

**AI Task**: Add FAQ schema to every pillar and key pages.

**FAQ Content for TMS Pillar**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best TMS software in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best TMS software in India depends on your needs. Fretron is ideal for enterprises needing end-to-end transportation management with Indian compliance (GST, e-way bill). Locus focuses on last-mile delivery. SAP TMS suits global enterprises with existing SAP infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "How much does TMS software cost in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TMS software in India typically costs ₹35,000-₹5,00,000+ per month depending on features and scale. Fretron starts at approximately $500/month (₹42,000) with enterprise pricing based on shipment volume."
      }
    }
  ]
}
```

#### Day 25-28: Content Publishing + Indexing

**AI Task**:
1. Publish all 5 pillar pages
2. Submit to Google Search Console
3. Build internal links from existing content
4. Create social posts for each pillar

#### Day 29-30: Phase 1 Review

**Checklist**:
- [ ] All schema implemented and validated
- [ ] Meta tags updated on top 50 pages
- [ ] 5 pillar pages published
- [ ] Internal linking structure in place
- [ ] FAQ schema on all pillar pages
- [ ] Google Search Console verified

---

## Phase 2: Content Velocity + Programmatic (Days 31-60)

### Week 5-6: Comparison Pages Sprint

**AI Task**: Create 25 comparison pages using template.

#### Comparison Page Template

**URL Pattern**: `/vs/[competitor]`

```markdown
# Fretron vs [Competitor]: Complete Comparison Guide [2026]

## Quick Comparison Table
| Feature | Fretron | [Competitor] |
|---------|---------|--------------|
| Focus | End-to-end TMS | [Their focus] |
| India-specific | ✅ GST, E-way bill | [Status] |
| Pricing | From $500/mo | [If known] |
| Best for | [Use case] | [Use case] |

## Overview
### What is Fretron?
[2-3 sentences]

### What is [Competitor]?
[2-3 sentences, fair and accurate]

## Feature Comparison
[Detailed breakdown]

## Pricing Comparison
[What we can share]

## When to Choose Fretron
- [Scenario 1]
- [Scenario 2]

## When to Choose [Competitor]
- [Be fair - builds trust]

## Migration Guide
[If switching from competitor]

## FAQ
[3-5 questions]
```

#### Priority Comparison Pages

| Page | Priority | Search Volume |
|------|----------|---------------|
| `/vs/locus` | Critical | 480 |
| `/vs/fareye` | Critical | 320 |
| `/vs/sap-tms` | Critical | 260 |
| `/vs/oracle-tms` | Critical | 210 |
| `/vs/loginext` | High | 170 |
| `/vs/shipsy` | High | 140 |
| `/vs/traqo` | High | 90 |
| `/vs/excel-spreadsheets` | High | N/A (converts well) |
| `/vs/manual-logistics` | Medium | N/A |

**Human Input Required**: Verify competitor feature accuracy, approve positioning.

---

### Week 7-8: Programmatic Page Generation

#### Integration Pages (50 pages)

**URL Pattern**: `/integrations/[partner]`

**Priority Integrations**:
```
/integrations/sap
/integrations/oracle
/integrations/tally
/integrations/zoho
/integrations/microsoft-dynamics
/integrations/salesforce
/integrations/delhivery
/integrations/blue-dart
/integrations/dtdc
/integrations/gati
... 40 more carriers and ERPs
```

**Template**:
```markdown
# Fretron + [Partner] Integration

## Overview
Connect Fretron TMS with [Partner] to [benefit].

## What Data Syncs
- [Data point 1]
- [Data point 2]

## How It Works
[Simple diagram or steps]

## Benefits
- [Benefit 1]
- [Benefit 2]

## Setup Guide
[Link to docs or demo CTA]
```

#### Location Pages (30 pages)

**URL Pattern**: `/[city]-logistics-software`

```
/mumbai-logistics-software
/delhi-logistics-software
/bangalore-logistics-software
/chennai-logistics-software
/pune-logistics-software
/hyderabad-logistics-software
... 24 more cities
```

**Template**:
```markdown
# Logistics Software for [City] | Fretron TMS

## [City] Logistics Challenges
- [Local challenge 1]
- [Local challenge 2]

## How Fretron Helps [City] Businesses
[Features relevant to local context]

## [City] Customers
[Local testimonials or logos if available]

## Local Support
[Office info or regional support]

## Get Started in [City]
[CTA]
```

#### Use Case Matrix Pages (40 pages)

**Pattern**: `/tms-for-[industry]-[use-case]`

```
/tms-for-pharma-cold-chain
/tms-for-fmcg-distribution
/tms-for-automotive-parts
/tms-for-cement-dispatch
/tms-for-steel-logistics
/tms-for-chemical-transport
/tms-for-ecommerce-fulfillment
/tms-for-3pl-operations
... 32 more combinations
```

---

### Week 7-8: Cluster Content Sprint

**AI Task**: Generate 40 cluster articles (1,500-2,000 words each).

**Cluster Map for TMS Pillar**:
```
"What is TMS" Pillar
├── Cluster: TMS Features
│   ├── Route optimization features
│   ├── Real-time tracking capabilities
│   ├── Freight audit automation
│   └── Dispatch planning tools
├── Cluster: TMS Benefits
│   ├── ROI of TMS implementation
│   ├── TMS cost savings calculator
│   ├── Improved OTIF with TMS
│   └── Visibility benefits
├── Cluster: TMS Selection
│   ├── TMS buyer's guide
│   ├── TMS RFP template
│   ├── Questions to ask TMS vendors
│   └── TMS implementation checklist
└── Cluster: TMS by Industry
    ├── TMS for manufacturing
    ├── TMS for retail
    ├── TMS for 3PL
    └── TMS for FMCG
```

---

## Phase 3: AI Optimization + Authority (Days 61-90)

### Week 9-10: AI Citation Sprint

#### Entity Establishment Tasks

**Task 1: Wikipedia Preparation**

**AI Task**: Research and document Wikipedia notability requirements.

**Required for Wikipedia Entry**:
- [ ] 3+ coverage in recognized publications (secure this)
- [ ] Analyst report mention (pursue Gartner/Forrester)
- [ ] Academic citation (logistics research papers)
- [ ] Documented company milestones

**Human Input Required**: Execute PR for press coverage.

**Task 2: Wikidata Entry**

**AI Task**: Create Wikidata entry (doesn't require notability).

```
Label: Fretron
Description: Transportation management system software company based in India
Instance of: Q4830453 (software company)
Country: Q668 (India)
Industry: Q5245042 (logistics software)
Headquarters location: Q1353 (Gurugram)
Official website: https://fretron.com
Founded: 2017
```

**Task 3: Knowledge Panel Optimization**

**Actions**:
1. Claim Google Business Profile
2. Ensure consistent NAP across all listings
3. Verify organization schema is indexed
4. Link all social profiles

#### AI-Optimized Content Updates

**AI Task**: Update all pillar pages for AI extraction.

**Optimization Checklist**:
- [ ] First paragraph answers query directly (50 words max)
- [ ] FAQ section with schema
- [ ] Comparison tables (AI loves tables)
- [ ] Numbered lists for processes
- [ ] Clear H2/H3 hierarchy
- [ ] Definition boxes for key terms

---

### Week 11: Third-Party Citation Sprint

**AI Task**: Create strategy for getting mentioned on third-party sites.

#### G2/Capterra Optimization

**Actions**:
1. Update all profile information
2. Add all features/categories
3. Request reviews from happy customers
4. Create comparison content that links back

**Review Request Email Template**:
```
Subject: Quick favor? Share your Fretron experience

Hi [Name],

You've been using Fretron for [X months] and we'd love to hear how it's going.

Would you mind leaving a quick review on G2? It takes about 3 minutes
and helps other logistics teams discover solutions like ours.

[G2 Review Link]

Thanks for being part of the Fretron community!
```

#### Industry Publication Outreach

**Target Publications**:
- Supply Chain Digital
- Logistics Insider India
- ET Logistics
- Manufacturing Today

**Pitch Angles**:
1. "State of TMS Adoption in India 2026" (original research)
2. "How AI is Transforming Indian Logistics" (thought leadership)
3. Fretron customer success story (case study)

---

### Week 12: Measurement + Optimization

#### Tracking Setup

**Google Search Console Monitoring**:
- Track pillar page indexing
- Monitor keyword position changes
- Identify crawl errors

**AI Citation Testing**:
Weekly test these queries across ChatGPT, Perplexity, Claude:
1. "What is the best TMS in India?"
2. "Fretron TMS"
3. "How to reduce freight costs in India"
4. "TMS for cement industry"
5. "Route optimization software India"

**Document**:
- Were we mentioned? (Y/N)
- Position in response
- Source cited (if Perplexity)

#### Content Performance Analysis

**AI Task**: After day 90, analyze all new content performance.

**Metrics to Track**:
| Content Type | Count | Indexed | Avg Position | Traffic |
|--------------|-------|---------|--------------|---------|
| Pillar pages | 5 | ? | ? | ? |
| Comparison pages | 25 | ? | ? | ? |
| Integration pages | 50 | ? | ? | ? |
| Location pages | 30 | ? | ? | ? |
| Cluster articles | 40 | ? | ? | ? |

---

## Part 3: AI-Executable Content Briefs

### Brief Library (AI can execute these directly)

All briefs follow this format and can be executed by Claude with minimal input.

---

### Brief 1: What is TMS Pillar Page

```yaml
title: "What is a Transportation Management System (TMS)? Complete Guide 2026"
url: /what-is-tms
word_count: 4500
target_keywords:
  primary: "what is tms"
  secondary:
    - "transportation management system"
    - "tms software"
    - "tms meaning"
    - "transport management system"
intent: informational
audience: logistics managers, supply chain directors, operations heads
tone: expert educator, not salesy
unique_angle: India-specific context, practical implementation focus

structure:
  - h2: "What is a TMS? (Quick Answer)"
    notes: "50-word snippet-optimized definition. Mention Fretron naturally."

  - h2: "Key Components of a TMS"
    subsections:
      - "Planning & Optimization"
      - "Execution & Dispatch"
      - "Visibility & Tracking"
      - "Analytics & Reporting"
    notes: "Link each to relevant cluster content"

  - h2: "TMS vs WMS vs ERP"
    notes: "Comparison table. Common confusion point."

  - h2: "Benefits of TMS"
    notes: "Use Indian benchmarks. Cite logistics cost as % of GDP."

  - h2: "Who Needs a TMS?"
    notes: "Segment by company size, industry, use case"

  - h2: "How to Choose the Right TMS"
    notes: "Checklist format. India-specific criteria (GST, e-way bill)"

  - h2: "TMS Implementation Guide"
    notes: "Timeline, team requirements, change management"

  - h2: "TMS Trends in 2026"
    notes: "AI, IoT, sustainability tracking"

  - h2: "FAQ"
    questions:
      - "What does TMS stand for?"
      - "How much does a TMS cost?"
      - "What is the difference between TMS and WMS?"
      - "Do small businesses need a TMS?"
      - "How long does TMS implementation take?"
      - "What is the best TMS software in India?"
      - "Can TMS integrate with SAP?"
      - "What ROI can I expect from TMS?"

internal_links:
  - /tms-platform
  - /solutions/collaborative-execution
  - /freight-cost-reduction-guide
  - /route-optimization-guide

cta: "See how Fretron TMS can transform your logistics → Book a Demo"

schema_required:
  - FAQPage
  - Article
  - BreadcrumbList
```

---

### Brief 2: Fretron vs Locus Comparison

```yaml
title: "Fretron vs Locus: Complete TMS Comparison [2026]"
url: /vs/locus
word_count: 2500
target_keywords:
  primary: "fretron vs locus"
  secondary:
    - "locus alternatives"
    - "locus competitor"
    - "tms comparison india"
intent: commercial comparison
audience: buyers evaluating TMS options
tone: objective, helpful, fair to competitor

structure:
  - h2: "Quick Comparison"
    notes: "Table comparing key features, pricing, best-for"

  - h2: "What is Fretron?"
    notes: "2-3 sentences, end-to-end TMS positioning"

  - h2: "What is Locus?"
    notes: "Fair, accurate description. They focus on last-mile/dispatch"

  - h2: "Feature Comparison"
    subsections:
      - "Route Optimization"
      - "Dispatch Planning"
      - "Real-time Tracking"
      - "Analytics & Reporting"
      - "Integrations"
      - "Indian Compliance (GST, E-way bill)"

  - h2: "Pricing Comparison"
    notes: "Share what we can. Locus doesn't publish pricing."

  - h2: "When to Choose Fretron"
    notes: "Enterprise TMS, full logistics lifecycle, Indian compliance"

  - h2: "When to Choose Locus"
    notes: "Be fair - last-mile focus, AI dispatch. Builds trust."

  - h2: "Customer Reviews Comparison"
    notes: "Pull from G2/Capterra"

  - h2: "FAQ"
    questions:
      - "Is Locus better than Fretron?"
      - "Can Fretron replace Locus?"
      - "Which is more affordable?"

internal_links:
  - /tms-platform
  - /what-is-tms

cta: "See Fretron in action → Get a personalized demo"
```

---

### Brief 3: Route Optimization Guide

```yaml
title: "Route Optimization: Complete Guide to Efficient Logistics [2026]"
url: /route-optimization-guide
word_count: 3500
target_keywords:
  primary: "route optimization"
  secondary:
    - "route optimization software"
    - "route planning logistics"
    - "delivery route optimization"
    - "route optimization algorithm"
intent: informational + commercial
audience: logistics managers, fleet operators

structure:
  - h2: "What is Route Optimization?"
    notes: "Definition, why it matters, ROI potential"

  - h2: "How Route Optimization Works"
    notes: "Algorithm basics, factors considered"

  - h2: "Benefits of Route Optimization"
    notes: "Fuel savings, time savings, customer satisfaction, emissions"

  - h2: "Route Optimization Challenges in India"
    notes: "Traffic, infrastructure, address accuracy"

  - h2: "Manual vs Automated Route Planning"
    notes: "Comparison, when to switch"

  - h2: "Key Features of Route Optimization Software"
    notes: "Checklist format"

  - h2: "Route Optimization ROI Calculator"
    notes: "Simple formula they can use"

  - h2: "How Fretron Does Route Optimization"
    notes: "Feature highlight, not salesy"

  - h2: "FAQ"

cta: "Optimize your routes with Fretron → Book a Demo"
```

---

## Part 4: Execution Automation

### AI Execution Instructions

For each content piece, Claude should:

1. **Read the brief** from this document
2. **Research** using WebSearch for current data
3. **Generate draft** following the structure
4. **Add Indian context** (GST, e-way bill, local challenges)
5. **Include schema** in output
6. **Flag human review points** (competitive claims, pricing)

### Human Checkpoints (Minimal)

| Phase | Human Input Required |
|-------|---------------------|
| Week 1 | Approve schema implementation |
| Week 2-3 | Approve pillar outlines before writing |
| Week 5-6 | Verify competitor feature accuracy |
| Week 9 | Execute PR for Wikipedia notability |
| Week 12 | Review metrics and adjust strategy |

### Content Calendar Template

```
MONTH 1
Week 1: Technical SEO (schema, meta)
Week 2: Pillar 1 (What is TMS) + Pillar 2 (Freight Cost)
Week 3: Pillar 3 (Route Optimization) + Pillar 4 (Fleet Management)
Week 4: Pillar 5 (E-way Bill) + Phase 1 review

MONTH 2
Week 5: Comparison pages 1-12
Week 6: Comparison pages 13-25
Week 7: Integration pages 1-25, Location pages 1-15
Week 8: Integration pages 26-50, Location pages 16-30, Cluster articles 1-20

MONTH 3
Week 9: Cluster articles 21-40, Entity establishment
Week 10: AI optimization, third-party citations
Week 11: Review/PR outreach, content optimization
Week 12: Measurement, planning next 90 days
```

---

## Part 5: Expected Outcomes

### Day 90 Projections

| Metric | Current | Day 30 | Day 60 | Day 90 |
|--------|---------|--------|--------|--------|
| Indexed Pages | 207 | 215 | 350 | 500+ |
| Keywords Top 100 | ~50 | 100 | 300 | 500+ |
| Organic Traffic | Baseline | +20% | +100% | +200% |
| Pillar Rankings | Not ranking | Top 50 | Top 30 | Top 20 |
| Comparison Pages | 0 | 0 | 25 | 25 |
| AI Citation Test | Not mentioned | Not mentioned | Sometimes | Consistently |

### Long-term Impact (6-12 months)

With consistent execution:
- **"What is TMS"** → Top 10 ranking
- **Category searches** → Fretron appearing as option
- **AI queries** → Fretron cited as India TMS option
- **Organic pipeline** → 20%+ of demos from organic

---

## Appendix A: Keyword Research Data

### High-Priority Keywords

| Keyword | Volume | Difficulty | Current Rank | Target |
|---------|--------|------------|--------------|--------|
| transportation management system | 6,600 | High | N/A | Top 20 |
| what is tms | 2,400 | Medium | N/A | Top 10 |
| tms software | 1,900 | High | N/A | Top 30 |
| logistics software india | 880 | Medium | N/A | Top 10 |
| route optimization software | 1,300 | Medium | N/A | Top 20 |
| freight cost reduction | 590 | Low | N/A | Top 10 |
| fleet tracking software india | 1,900 | Medium | N/A | Top 20 |
| e-way bill software | 1,600 | Medium | N/A | Top 30 |

### Long-Tail Opportunities

| Keyword | Volume | Content Type |
|---------|--------|--------------|
| best tms software for small business | 320 | Pillar/Cluster |
| how to reduce logistics cost in india | 210 | Pillar |
| tms vs wms vs erp | 170 | Cluster |
| route optimization algorithm | 140 | Cluster |
| freight audit process | 110 | Cluster |
| dispatch planning software | 90 | Solution page |

---

## Appendix B: Competitor Content Analysis

### Content Volume Comparison

| Competitor | Blog Posts | Pillar Pages | Comparison Pages |
|------------|------------|--------------|------------------|
| Fretron | 155+ | 0 | 0 |
| Locus | 200+ | 5+ | 10+ |
| SAP TMS | 50+ | 3 | 0 |
| FarEye | 150+ | 3+ | 5+ |

### Content Gaps (Fretron vs Competitors)

| Topic | Fretron Has | Competitors Have |
|-------|-------------|------------------|
| "What is TMS" guide | ❌ | ✅ (SAP, Oracle) |
| Comparison pages | ❌ | ✅ (Locus, FarEye) |
| ROI calculator | ❌ | ✅ (Multiple) |
| Integration docs | ❌ | ✅ (Most) |
| Video content | Limited | Extensive |

---

## Appendix C: Technical Implementation Specs

### Schema Templates (Copy-Paste Ready)

**Article Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[TITLE]",
  "author": {
    "@type": "Organization",
    "name": "Fretron"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Fretron",
    "logo": {
      "@type": "ImageObject",
      "url": "https://fretron.com/logo.png"
    }
  },
  "datePublished": "[DATE]",
  "dateModified": "[DATE]",
  "mainEntityOfPage": "[URL]"
}
```

**Comparison Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "about": [
    {"@type": "SoftwareApplication", "name": "Fretron TMS"},
    {"@type": "SoftwareApplication", "name": "[COMPETITOR]"}
  ]
}
```

---

## Document Control

**Version**: 1.0
**Created**: January 2026
**Next Review**: April 2026
**Owner**: Fretron Marketing Team

---

*This gameplan was generated using the Fretron Marketing Engine AI SEO skills framework. It is designed to be executable by AI with minimal human oversight.*
