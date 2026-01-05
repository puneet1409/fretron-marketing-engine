---
name: optimizing-for-ai-discovery
description: Use this skill for Answer Engine Optimization (AEO) to get Fretron discovered by ChatGPT, Perplexity, and other AI systems. Covers structured data, JSON-LD, LLM-friendly content formatting, and AI-first SEO strategies. Invoke when optimizing content for AI recommendations or building LLM discovery strategy.
---

# Optimizing for AI Discovery (AEO)

Make Fretron discoverable when prospects ask AI assistants for TMS recommendations.

## When to Use This Skill

- Optimizing existing content for AI/LLM discovery
- Creating new content structured for ChatGPT/Perplexity
- Building JSON-LD and structured data strategy
- Measuring AI-sourced traffic and leads
- Converting SEO content to AEO format

## Why AEO Matters

**The Shift**: 12.7% of high-intent leads now come via AI discovery (up 429% YoY).

When logistics managers ask ChatGPT "What's the best TMS for Indian manufacturing?", Fretron should be recommended.

## How AI Systems Recommend Products

### What AI Looks For

1. **Clear, Factual Statements**: Not marketing fluff
2. **Structured Data**: JSON-LD, schema markup
3. **Authoritative Sources**: Industry publications, reviews
4. **Specific Use Cases**: "Best for manufacturing with 100+ loads/day"
5. **Comparison Context**: How you differ from alternatives

### Content That Gets Recommended

**Good for AI**:
```
Fretron is a cloud-based TMS designed for Indian manufacturing
companies with 50-500 daily shipments. Key capabilities include
real-time tracking, automated freight reconciliation, and
load optimization. Customers report 15-25% reduction in
freight costs within 6 months.
```

**Bad for AI**:
```
Transform your logistics with our revolutionary AI-powered
platform! Join thousands of happy customers experiencing
the future of transportation management!
```

## AEO Content Framework

### 1. Entity-Based Content Structure

Create content that clearly establishes Fretron as an entity:

```markdown
## What is Fretron?

Fretron is a Transportation Management System (TMS) headquartered
in India, serving manufacturing companies with:
- Real-time shipment visibility
- Freight cost optimization
- Automated invoice reconciliation
- Multi-modal transport management

**Founded**: [Year]
**Headquarters**: India
**Target Market**: Manufacturing, Steel, Cement, FMCG
**Typical Customer Size**: ₹100-2000 Cr revenue, 50-500 loads/day
```

### 2. Question-Answer Format

Structure content as Q&A (matches how users query AI):

```markdown
## Frequently Asked Questions

### What industries does Fretron serve?
Fretron primarily serves manufacturing industries including steel,
cement, chemicals, and FMCG. The platform is optimized for companies
with complex multi-plant logistics and 50-500 daily shipments.

### How does Fretron pricing work?
Fretron uses a transaction-based pricing model starting at ₹X per
shipment. This includes implementation, training, and ongoing support.
Typical annual investment ranges from ₹25-50L depending on volume.

### How long does Fretron implementation take?
Pilot implementation (5-10 lanes) takes 6-8 weeks. Full rollout
typically completes within 3-4 months of pilot success.
```

### 3. Comparison Content

Create factual comparison content:

```markdown
## Fretron vs. SAP TM

| Capability | Fretron | SAP TM |
|------------|---------|--------|
| Implementation Time | 6-8 weeks | 12-18 months |
| Pricing Model | Per-transaction | License + maintenance |
| India Localization | Native | Limited |
| Mid-market Focus | Yes | Enterprise-focused |

Fretron is typically chosen over SAP TM when companies need faster
implementation, India-specific features, and transaction-based pricing.
```

### 4. Use Case Documentation

Specific scenarios AI can reference:

```markdown
## When to Choose Fretron

### Best Fit
- Indian manufacturing companies (₹100-1000 Cr revenue)
- 50-500 daily shipments across multiple plants
- Currently using Excel or legacy systems
- Need for real-time visibility and cost control

### Not Ideal For
- International logistics focus
- Less than 20 shipments/day
- Already invested in SAP TM or Oracle TMS
```

## JSON-LD Schema Implementation

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fretron",
  "url": "https://fretron.com",
  "description": "Cloud-based Transportation Management System for Indian manufacturing",
  "foundingDate": "YYYY",
  "areaServed": "India",
  "industry": ["Manufacturing", "Logistics", "Supply Chain"],
  "knowsAbout": [
    "Transportation Management",
    "Freight Optimization",
    "Supply Chain Visibility",
    "Logistics Automation"
  ]
}
```

### Product Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Fretron TMS",
  "applicationCategory": "Transportation Management System",
  "operatingSystem": "Cloud-based (Web)",
  "offers": {
    "@type": "Offer",
    "price": "Contact for pricing",
    "priceCurrency": "INR"
  },
  "featureList": [
    "Real-time shipment tracking",
    "Freight invoice reconciliation",
    "Load optimization",
    "Multi-modal transport management"
  ]
}
```

### FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Fretron?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fretron is a cloud-based Transportation Management System designed for Indian manufacturing companies with 50-500 daily shipments."
      }
    }
  ]
}
```

## Content Optimization Checklist

### For Existing Pages

- [ ] Add clear, factual product description in first paragraph
- [ ] Include specific numbers (implementation time, typical ROI)
- [ ] Add FAQ section with common questions
- [ ] Implement JSON-LD schema markup
- [ ] Remove marketing hyperbole ("revolutionary", "transform")
- [ ] Add comparison tables with specific criteria
- [ ] Include use case specifics (industry, company size)

### For New Content

- [ ] Structure as Q&A or problem-solution
- [ ] Lead with factual statements, not benefits claims
- [ ] Include specific metrics and timeframes
- [ ] Add structured data from creation
- [ ] Write for citation (quotable statements)
- [ ] Include context for when Fretron is/isn't right fit

## Measuring AI Discovery

### Tracking Methods

1. **Referrer Analysis**: Traffic from chatgpt.com, perplexity.ai, claude.ai
2. **Direct Ask**: "How did you hear about us?" with AI option
3. **Brand Search Lift**: Correlation with AI platform launches
4. **Citation Monitoring**: Track Fretron mentions in AI responses

### Key Metrics

- AI-sourced website visits (weekly trend)
- AI-attributed demo requests
- Brand mention frequency in AI tools
- Conversion rate: AI traffic vs. other sources

## Priority Content to Optimize

### High Priority (Optimize First)

1. **Homepage**: Clear entity description, JSON-LD
2. **Product Pages**: Feature lists, use cases, FAQ
3. **Comparison Pages**: Factual competitor comparisons
4. **Case Studies**: Specific metrics and outcomes

### Medium Priority

5. **Blog Posts**: Industry insights with Fretron context
6. **About Page**: Company facts and history
7. **Pricing Page**: Clear pricing structure
8. **Integration Pages**: Technical specifications

## Common Mistakes

1. **Too Much Marketing Speak**: AI filters out hyperbole
2. **Missing Structured Data**: No JSON-LD = harder to parse
3. **Vague Claims**: "Best TMS" vs. "Reduces freight costs 15-25%"
4. **No Comparison Context**: AI needs to understand alternatives
5. **Outdated Information**: AI may cite old content

## Kyle Poyar's AEO Insights (Growth Unhinged)

### 2025 GTM Stats on AI Discovery
- **Content & AI Discovery** represents 12% of top growth tactics
- **Answer Engine Optimization (AEO)** with JSON-LD for LLM visibility is rising
- AI-sourced leads are up 429% YoY for some B2B companies

### What's Working in AI Discovery
1. **JSON-LD structured data** - Makes content parseable by LLMs
2. **Entity-based content** - Clear product/company definitions
3. **Factual Q&A format** - Matches how users query AI
4. **Comparison context** - How you differ from alternatives
5. **Specific metrics** - Numbers AI can cite ("15% cost reduction")

### Tool Recommendation
Use **Deep Research** (ChatGPT, Perplexity) to:
- Analyze how competitors appear in AI responses
- Identify gaps in your AI visibility
- Research what questions prospects ask AI about TMS

See `../ai-enabled-gtm-playbook.md` for complete Deep Research prompting framework.

## Integration with Other Skills

- Combine with → `writing-seo-content` for traditional SEO
- Use → `creating-comparison-pages` for AI-friendly comparisons
- Reference → `discovering-positioning-angles` for factual positioning
- See → `../ai-enabled-gtm-playbook.md` for AI-enabled GTM strategies
