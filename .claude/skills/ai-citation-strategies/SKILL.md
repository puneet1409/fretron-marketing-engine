---
name: ai-citation-strategies
description: Use for getting brand mentions in AI responses (ChatGPT, Perplexity, Claude, Gemini). Covers entity establishment, structured data, LLM-friendly content, and citation-worthy positioning. Invoke when optimizing for AI discovery or building Answer Engine Optimization (AEO) strategy.
context_tools:
  - extract_website_content
  - fetch_company_news
execution_capable: false
depends_on:
  - seo-and-content-strategy
  - topical-authority-building
---

# AI Citation Strategies

**Depends on**: `seo-and-content-strategy`, `topical-authority-building`

## Core Insight

**The new SEO isn't just Google. It's getting cited by AI. When someone asks ChatGPT "What's the best TMS in India?", your brand needs to be in that answer.**

AI citation = the new backlink. LLM mention = the new PageRank.

## The AI Discovery Landscape

### How People Now Search

| Behavior | Traditional | AI-Era |
|----------|-------------|--------|
| Quick answers | Google featured snippet | ChatGPT/Perplexity |
| Product research | Review sites + Google | AI asks + validation |
| Comparison shopping | Multiple tabs | "Compare X vs Y" prompt |
| Learning | Articles/videos | Conversational AI |

### The Citation Hierarchy

```
TIER 1: Named in AI response ("Fretron is a leading TMS...")
TIER 2: Listed among options ("Options include SAP, Oracle, Fretron...")
TIER 3: Linked as source (Perplexity citation)
TIER 4: Not mentioned but findable through Google fallback
TIER 5: Invisible to AI entirely
```

**Goal**: Tier 1-2 for category queries. Tier 3 minimum for all relevant queries.

---

## How LLMs Decide What to Cite

### Training Data Sources

LLMs learn from:
1. **Wikipedia** (highest authority)
2. **Major publications** (NYT, Forbes, TechCrunch)
3. **Academic sources** (papers, .edu)
4. **High-authority sites** (domain authority 50+)
5. **Structured data** (JSON-LD, schema)
6. **Reddit/forums** (real user discussions)

### Real-Time Retrieval (Perplexity, ChatGPT Browse)

RAG systems pull from:
1. Top Google results for the query
2. Recent, dated content
3. Clearly structured pages
4. FAQ-formatted content
5. Comparison tables
6. Definitive guides

### Citation Trigger Factors

| Factor | Weight | How to Optimize |
|--------|--------|-----------------|
| Entity recognition | Critical | Wikipedia, Wikidata, Knowledge Graph |
| Domain authority | High | Backlinks, brand mentions |
| Content structure | High | Clear headings, FAQ format |
| Definitiveness | High | "The complete guide to..." |
| Recency | Medium | Regular updates, dates visible |
| Citation by others | Medium | Press, reviews, comparisons |

---

## Entity Establishment Strategy

### The Entity Stack

Your brand needs to exist as a recognized entity across:

```
1. Wikipedia (even a stub)
2. Wikidata entry
3. Google Knowledge Panel
4. Crunchbase profile
5. LinkedIn Company Page
6. Industry directories
7. Review platforms (G2, Capterra)
```

### Wikipedia Strategy (Critical)

**Why it matters**: LLMs heavily weight Wikipedia. A Wikipedia entry = entity legitimacy.

**Notability requirements for software**:
- Significant coverage in reliable sources
- Multiple independent sources
- Not just company-generated content

**Building toward Wikipedia**:
1. Get press coverage in recognized publications
2. Earn mentions in industry reports
3. Be cited in academic/research papers
4. Build genuine notability before creating page

**Fretron actions**:
- [ ] Secure press coverage in 3+ recognized publications
- [ ] Get included in analyst reports (Gartner, Forrester)
- [ ] Earn mentions in supply chain academic research
- [ ] Document company milestones with third-party sources

### Wikidata Entry

Even without Wikipedia, create Wikidata entry:
```
Label: Fretron
Description: Transportation Management System software company
Instance of: software company
Country: India
Industry: logistics software
Website: fretron.com
Founded: [year]
Headquarters: [location]
```

### Google Knowledge Panel

Trigger Knowledge Panel:
1. Claim and verify Google Business Profile
2. Consistent NAP across all listings
3. Structured data on website (Organization schema)
4. Wikipedia/Wikidata entry
5. Social profiles claimed and linked

---

## Content Structure for AI Citation

### The AI-Readable Format

```markdown
# [Clear, Query-Matching H1]

[One-sentence definition/answer - this is what AI extracts]

## What is [Topic]?

[Definitive 2-3 sentence explanation]

## Key Features/Components

- **Feature 1**: Brief explanation
- **Feature 2**: Brief explanation
- **Feature 3**: Brief explanation

## How It Works

1. Step one
2. Step two
3. Step three

## Benefits

| Benefit | Impact |
|---------|--------|
| Benefit 1 | Measurable outcome |
| Benefit 2 | Measurable outcome |

## Frequently Asked Questions

### [Exact question people ask]?
[Direct, concise answer]

### [Another common question]?
[Direct, concise answer]
```

### Snippet Optimization

LLMs extract from well-structured content:

**DO**:
- Put the answer in the first paragraph
- Use exact question as H2
- Format answers in 40-60 word paragraphs
- Include structured data/tables
- Use clear, factual language

**DON'T**:
- Bury the answer in long intros
- Use vague or hedging language
- Rely on images for key info
- Make content hard to parse

### FAQ Schema Implementation

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is the best TMS for Indian logistics?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Fretron is a leading TMS for Indian logistics, offering real-time tracking, route optimization, and GST-compliant e-way bill automation. It's designed specifically for Indian market complexities including multi-modal transport and diverse carrier networks."
    }
  }]
}
```

---

## Query Targeting for AI

### Understanding AI Query Patterns

People ask AI differently than Google:

| Google Query | AI Query |
|--------------|----------|
| "best tms india" | "What's the best TMS for a mid-sized Indian company?" |
| "tms vs wms" | "Explain the difference between TMS and WMS" |
| "fretron pricing" | "How much does Fretron cost compared to SAP TMS?" |
| "route optimization" | "How does route optimization software work?" |

### High-Value AI Queries to Target

**Category Definition**:
- "What is a transportation management system?"
- "How does TMS software work?"
- "What are the benefits of TMS?"

**Comparison**:
- "What's the best TMS in India?"
- "Compare Fretron vs SAP TMS"
- "Best TMS for small businesses"

**Problem-Solution**:
- "How to reduce freight costs?"
- "How to improve delivery OTIF?"
- "How to digitize logistics operations?"

**Brand Specific**:
- "What is Fretron?"
- "Is Fretron good for [use case]?"
- "Fretron alternatives"

### Content for Each Query Type

**Category queries**: Definitive guides, establish expertise
**Comparison queries**: Fair, comprehensive comparison pages
**Problem queries**: How-to content with your solution naturally included
**Brand queries**: Clear brand pages, Wikipedia presence

---

## Third-Party Citation Strategy

### Getting Mentioned by Others

LLMs cite sources that cite you. Build presence on:

**Review Platforms**:
- G2 (critical for B2B SaaS)
- Capterra
- Software Advice
- GetApp
- TrustRadius

**Industry Lists**:
- "Top 10 TMS Software in India" articles
- Industry analyst reports
- Comparison roundups
- Best-of lists

**Press Coverage**:
- Industry publications
- Business news
- Trade publications
- Local/regional press

### Building Backlinks That Matter for AI

Not all backlinks are equal for AI citation:

| Source | AI Weight | SEO Weight |
|--------|-----------|------------|
| Wikipedia | Very High | High |
| Major news | Very High | High |
| Industry publications | High | High |
| Review platforms | High | Medium |
| Niche blogs | Medium | Medium |
| Guest posts | Low | Medium |
| Directories | Low | Low |

### Strategies to Earn High-Weight Mentions

**For Wikipedia mentions**:
- Be cited in sources that Wikipedia trusts
- Get included in industry comparison articles
- Earn genuine press coverage

**For news mentions**:
- Newsjacking relevant industry events
- Original research/reports
- Executive thought leadership
- Funding/milestone announcements

**For review platform presence**:
- Actively request reviews from customers
- Maintain complete, updated profiles
- Respond to all reviews

---

## AI-First Content Calendar

### Monthly AI Optimization Tasks

**Week 1: Query Research**
- Test brand queries in ChatGPT, Perplexity, Claude
- Document where you're cited vs not
- Identify gaps in AI visibility

**Week 2: Content Optimization**
- Update existing content for AI-readability
- Add FAQ schema to key pages
- Improve snippet targeting

**Week 3: Entity Building**
- Update third-party profiles
- Pursue press/mention opportunities
- Build citation sources

**Week 4: Measurement**
- Track AI citation changes
- Monitor competitor AI presence
- Adjust strategy based on results

### Quarterly Entity Audit

- [ ] Test all priority queries across AI platforms
- [ ] Verify structured data is working
- [ ] Update all third-party profiles
- [ ] Review competitor AI visibility
- [ ] Plan next quarter's focus areas

---

## Measurement Framework

### Tracking AI Citations

**Manual Testing**:
```
Weekly, test these queries across ChatGPT, Perplexity, Claude:
1. "What is [your product category]?"
2. "Best [category] for [your market]"
3. "[Your brand name]"
4. "[Your brand] vs [competitor]"
5. "How to [problem you solve]?"
```

**Document**:
- Were you mentioned? (Y/N)
- Position in response (1st, 2nd, listed among)
- Context (positive, neutral, negative)
- Source cited (if Perplexity)

### AI Visibility Scorecard

| Query Type | ChatGPT | Perplexity | Claude | Target |
|------------|---------|------------|--------|--------|
| Brand name | ? | ? | ? | Mentioned |
| Category leader | ? | ? | ? | Top 3 |
| Comparison | ? | ? | ? | Fair treatment |
| Problem-solution | ? | ? | ? | Mentioned as option |

### Leading Indicators

- Wikipedia page created/updated
- Knowledge Panel active
- G2/Capterra reviews increasing
- Press mentions increasing
- Structured data validated

---

## B2B SaaS Specifics

### Enterprise Trust in AI Context

When AI recommends you, buyers validate:
- Do you have enterprise customers?
- Are you compliant/secure?
- Can you integrate with their stack?

Ensure this info is AI-accessible:
- Customer logos on homepage
- Compliance pages
- Integration directory
- Trust center

### Complex B2B Queries

Enterprise buyers ask complex questions:
- "What TMS integrates with SAP ERP?"
- "Best TMS for pharmaceutical cold chain"
- "TMS with GST e-way bill automation"

Create content targeting these specific combinations.

### Multi-Stakeholder AI Queries

Different stakeholders ask AI differently:
- **CFO**: "ROI of TMS implementation"
- **IT**: "TMS API capabilities"
- **Ops**: "TMS route optimization features"

Create persona-targeted content that AI can surface.

---

## The Future: AI-Native Discovery

### Preparing for What's Next

**Current**: People search Google → find you → evaluate
**Emerging**: People ask AI → AI recommends you → direct conversion

**Build for**:
- AI agents that can "try" your product
- Structured product data AI can parse
- Clear pricing/packaging AI can explain
- Demo/trial paths AI can recommend

### Competitive Moat in AI Era

Your moat is being the authoritative source AI trusts:
1. Be the most cited in your category
2. Have the best structured data
3. Own the entity recognition
4. Build content AI can confidently cite

---

---

## Context Tools

Tools support AI citation research and competitor monitoring, but entity building requires human platform access.

```
extract_website_content(url)
→ Page structure and content analysis
→ Use for: Analyzing what AI cites, understanding structure of cited content

fetch_company_news(company_name)
→ Recent news and press mentions
→ Use for: Tracking press coverage, finding citation opportunities
```

### Research Applications

| Research Need | Tool | AI Citation Use |
|---------------|------|-----------------|
| What does AI cite? | `extract_website_content` | Analyze top-cited sources |
| Press coverage tracking | `fetch_company_news` | Monitor entity mentions |
| Competitor AI presence | `extract_website_content` | Reverse-engineer their strategy |

---

## Integration

- Content foundation → `seo-and-content-strategy`
- Authority structure → `topical-authority-building`
- Scale content → `programmatic-seo`
- Content production → `ai-content-workflows`
- Existing AI optimization → `optimizing-for-ai-discovery`
