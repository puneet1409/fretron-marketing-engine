---
name: programmatic-seo
description: Use for template-based page generation at scale targeting long-tail keywords. Covers database-driven content, comparison pages, integration pages, and glossary systems. Invoke when planning scalable SEO content that can generate 100s-1000s of pages from structured data.
context_tools:
  - extract_website_content
  - fetch_company_news
execution_capable: false
depends_on:
  - seo-and-content-strategy
  - topical-authority-building
---

# Programmatic SEO

**Depends on**: `seo-and-content-strategy`, `topical-authority-building`

## Core Insight

**Programmatic SEO = Database + Template + Scale. One template, thousands of pages, each targeting specific long-tail queries buyers actually search.**

In B2B SaaS, this isn't about spam. It's about systematically answering every question your buyers have before they know to ask.

## The AI Disruption Context

Traditional SEO: Write content → hope it ranks → wait months
Programmatic SEO: Build system → generate at scale → capture long-tail immediately
AI-Era Programmatic: LLMs can now generate unique, valuable content for each page variant

**The shift**: Google rewards topical depth. 1000 related pages > 10 generic pages.

---

## Programmatic Page Types for B2B SaaS

### 1. Comparison Pages (Highest Intent)

**Pattern**: `[Your Product] vs [Competitor]`

**For Fretron TMS**:
- `fretron-vs-sap-transportation-management`
- `fretron-vs-oracle-tms`
- `fretron-vs-locus`
- `fretron-vs-fareye`
- `fretron-vs-loginext`
- `fretron-vs-excel-spreadsheets` (seriously, this converts)

**Template Structure**:
```
1. Quick comparison table (above fold)
2. Feature-by-feature breakdown
3. Pricing transparency (what you can share)
4. Best for / Not best for sections
5. Migration guide CTA
6. Social proof from switchers
```

**Scale potential**: 20-50 pages (every competitor + alternatives)

### 2. Integration Pages

**Pattern**: `[Your Product] + [Integration Partner]`

**For Fretron TMS**:
- `fretron-sap-integration`
- `fretron-tally-integration`
- `fretron-zoho-integration`
- `fretron-shiprocket-integration`
- `fretron-delhivery-integration`
- `fretron-[any-carrier]-integration`

**Template Structure**:
```
1. Integration overview (what connects)
2. Data flow diagram
3. Setup steps
4. Use cases enabled
5. Customer example
6. "Connect Now" CTA
```

**Scale potential**: 50-200 pages (every ERP, carrier, WMS, marketplace)

### 3. Use Case Pages

**Pattern**: `[Product] for [Use Case/Industry/Role]`

**For Fretron TMS**:
- `tms-for-fmcg-distribution`
- `tms-for-pharmaceutical-cold-chain`
- `tms-for-automotive-parts`
- `tms-for-ecommerce-fulfillment`
- `tms-for-3pl-providers`
- `logistics-software-for-cfo`
- `fleet-management-for-plant-heads`

**Template Structure**:
```
1. Industry/role-specific pain points
2. How TMS solves each pain
3. ROI calculator or benchmark
4. Case study from that vertical
5. Feature highlights relevant to them
6. Demo CTA with industry context
```

**Scale potential**: 100+ pages (industry × role × use case matrix)

### 4. Location Pages

**Pattern**: `[Service] in [Location]`

**For Fretron TMS**:
- `tms-software-mumbai`
- `logistics-software-bangalore`
- `fleet-management-delhi-ncr`
- `transportation-management-chennai`
- `supply-chain-software-pune`

**Template Structure**:
```
1. Local logistics challenges
2. Regulatory context (GST, e-way bill for that state)
3. Local customer logos/testimonials
4. Regional traffic/infrastructure data
5. Local office/support info
6. Region-specific CTA
```

**Scale potential**: 50-100 pages (every major logistics hub)

### 5. Glossary/Definition Pages

**Pattern**: `What is [Term]`

**For Fretron TMS**:
- `what-is-tms`
- `what-is-otif`
- `what-is-freight-audit`
- `what-is-route-optimization`
- `what-is-eway-bill`
- `what-is-detention-demurrage`
- `what-is-proof-of-delivery`

**Template Structure**:
```
1. Clear definition (AI snippet optimized)
2. Why it matters
3. How to calculate/measure
4. Common challenges
5. How [Your Product] helps
6. Related terms (internal linking)
```

**Scale potential**: 200+ pages (every industry term)

### 6. Template/Calculator Pages

**Pattern**: `[Template/Calculator] for [Use Case]`

**For Fretron TMS**:
- `freight-cost-calculator`
- `route-optimization-roi-calculator`
- `tms-roi-calculator`
- `logistics-cost-breakdown-template`
- `carrier-performance-scorecard-template`

**Template Structure**:
```
1. Interactive tool (embed)
2. How to use instructions
3. What the results mean
4. Next steps based on results
5. Gated detailed report option
6. Demo CTA for full solution
```

**Scale potential**: 20-50 pages (high conversion, lead magnet territory)

---

## The Programmatic SEO Tech Stack

### Data Layer

| Component | Purpose | Tools |
|-----------|---------|-------|
| **Seed Database** | Store all variables | Airtable, Notion DB, Google Sheets |
| **Content Fragments** | Reusable content blocks | CMS custom fields, MDX |
| **Dynamic Data** | Pricing, features, metrics | API connections, scrapers |

### Generation Layer

| Approach | Best For | Complexity |
|----------|----------|------------|
| **CMS Templates** | Simple pages | Low |
| **Static Site Generator** | Dev team available | Medium |
| **AI-Enhanced** | Unique content per page | High |
| **Headless CMS + Next.js** | Maximum flexibility | High |

### For Fretron (Next.js Stack)

```
/pages/vs/[competitor].tsx     → Comparison pages
/pages/integrations/[name].tsx → Integration pages
/pages/solutions/[industry].tsx → Use case pages
/pages/glossary/[term].tsx     → Definition pages
/pages/tools/[calculator].tsx  → Calculator pages
```

---

## AI-Enhanced Programmatic Content

### The Evolution

**Gen 1**: Same template, different variables (spammy)
**Gen 2**: Template + unique intro/outro (better)
**Gen 3**: AI-generated unique content per page (current best practice)

### AI Content Generation Workflow

```
1. Define page type and template structure
2. Create comprehensive brief for AI
3. Generate base content with Claude/GPT
4. Human review and enhancement
5. Add unique data points per page
6. Publish and monitor
```

### AI Prompts for Programmatic Pages

**Comparison Page Generation**:
```
Write a comparison between Fretron TMS and [COMPETITOR].

Context:
- Fretron strengths: [list]
- Competitor known for: [research]
- Target reader: logistics decision-maker in India

Structure:
1. Opening that acknowledges both options
2. Feature comparison (be fair, not salesy)
3. Pricing context
4. Best fit scenarios for each
5. Migration considerations

Tone: Helpful advisor, not salesperson
```

**Glossary Page Generation**:
```
Write a definition page for "[TERM]" in logistics/supply chain.

Requirements:
1. One-sentence definition (snippet-optimized, under 150 chars)
2. Why it matters to logistics managers
3. How to measure/calculate (if applicable)
4. Common challenges
5. Brief mention of how modern TMS helps
6. 3 related terms to explore

Tone: Expert educator
Reading level: Professional but accessible
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

1. **Audit existing content** for programmatic opportunities
2. **Build seed database** with all variables
3. **Create 1 template** for highest-impact page type
4. **Generate 10 test pages** manually with AI
5. **Validate search volume** and intent alignment

### Phase 2: Scale (Weeks 5-8)

1. **Automate generation** pipeline
2. **Scale to 50-100 pages**
3. **Implement internal linking** strategy
4. **Add schema markup** for rich snippets
5. **Monitor indexing** and rankings

### Phase 3: Optimize (Weeks 9-12)

1. **Analyze performance** by page type
2. **Improve underperforming templates**
3. **Add new page types**
4. **Build backlinks** to top performers
5. **Expand to new categories**

---

## Quality Signals That Matter

### Google's Helpful Content Criteria

For each programmatic page, verify:
- [ ] Does it provide original information beyond the template?
- [ ] Does it demonstrate first-hand expertise?
- [ ] Does it have a clear purpose beyond SEO?
- [ ] Would someone bookmark this or share it?
- [ ] Does it answer the query completely?

### Avoiding Thin Content Penalties

**DO**:
- Add unique data points per page
- Include original research or benchmarks
- Provide genuinely useful comparisons
- Make each page actually helpful

**DON'T**:
- Just swap variables in identical content
- Create pages with no search volume
- Publish low-effort AI content without review
- Ignore pages after publishing

---

## Measurement Framework

### Leading Indicators

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Pages indexed | 80%+ | 2 weeks |
| Average position | Top 50 | 4 weeks |
| Impressions growth | 20% MoM | Monthly |

### Lagging Indicators

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Organic traffic | 1000% increase | 6 months |
| Keyword coverage | 500+ ranking | 6 months |
| Demo requests from programmatic | 10% of total | 6 months |

### Page-Type Performance

Track separately:
- Comparison pages → High intent, lower volume
- Integration pages → Medium intent, technical audience
- Glossary pages → ToFu, high volume, low conversion
- Use case pages → MoFu, targeted traffic

---

## B2B SaaS Specific Considerations

### Long Sales Cycles

Programmatic pages build touchpoints:
- First touch: Glossary (learning)
- Second touch: Comparison (evaluating)
- Third touch: Integration (validating fit)
- Fourth touch: Demo (converting)

### Multiple Stakeholders

Create page variants for each persona:
- `/tms-for-cfo` → ROI focused
- `/tms-for-supply-chain-director` → Feature focused
- `/tms-for-it-team` → Integration focused

### Enterprise Trust Signals

Every programmatic page needs:
- Security/compliance mentions
- Enterprise customer logos
- Implementation support info
- Clear next steps (not pushy)

---

---

## Context Tools

Tools support programmatic content research, but page generation requires human review and publishing.

```
extract_website_content(url)
→ Competitor page analysis
→ Use for: Template research, understanding what to beat

fetch_company_news(company_name)
→ Company news and updates
→ Use for: Integration partner updates, competitor monitoring
```

### Research Applications

| Research Need | Tool | Programmatic Use |
|---------------|------|------------------|
| Competitor comparison pages | `extract_website_content` | Template inspiration |
| Integration partner updates | `fetch_company_news` | Keep integration pages current |
| Glossary research | `extract_website_content` | Definition accuracy |

---

## Integration

- Content strategy → `seo-and-content-strategy`
- Authority building → `topical-authority-building`
- AI visibility → `ai-citation-strategies`
- Comparison pages detail → `creating-comparison-content`
