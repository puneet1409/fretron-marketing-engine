---
name: seo-and-content-strategy
description: Use for SEO and content marketing - keyword research, content creation, AI/AEO optimization, comparison pages, and content refresh. Invoke when planning content strategy, writing for organic traffic, optimizing for search (traditional and AI), or auditing existing content.
context_tools:
  - extract_website_content
  - fetch_company_news
execution_capable: false
depends_on:
  - trust-building-principles
---

# SEO and Content Strategy

## Core Insight

**Create content that answers search intent better than anything else, then optimize for both Google and AI discovery.**

The bar: Would someone bookmark this? Would they share it? Is it genuinely the best answer?

## Search Intent Framework

Before writing, understand what the searcher wants:

| Intent | Searcher Wants | Content Format |
|--------|----------------|----------------|
| Informational | Learn something | How-to, explainer |
| Commercial | Compare options | Comparison, review |
| Transactional | Take action | Landing page |
| Navigational | Find specific page | Product page |

**Validate intent**: Google the keyword. What ranks? That's what Google thinks searchers want.

## Keyword Strategy

### Research Approach

1. **Seed terms**: What does your audience search when they have the problem you solve?
2. **Long-tail expansion**: More specific = higher intent = easier to rank
3. **Competitor gaps**: What do they rank for that you don't?
4. **Intent mapping**: Match keywords to funnel stage

### Prioritization Matrix

| Factor | Weight |
|--------|--------|
| Search volume | Consider, don't obsess |
| Intent alignment | High priority |
| Competition | Realistic assessment |
| Business value | Leads to revenue? |

### Keyword-to-Content Mapping

| Funnel Stage | Keyword Type | Content Type |
|--------------|--------------|--------------|
| Awareness | Problem-focused | Educational content |
| Consideration | Solution-focused | Comparison, how-to |
| Decision | Product-focused | Landing pages, demos |

## Content Structure

### On-Page SEO Essentials

- **Title**: Include keyword, under 60 chars, compelling
- **H1**: One per page, matches intent
- **H2/H3**: Logical hierarchy, keyword variations
- **First 100 words**: Include primary keyword naturally
- **URL**: Short, descriptive, includes keyword

### Content Quality Signals

E-E-A-T: Experience, Expertise, Authoritativeness, Trust

- **Experience**: Real examples, case studies, specific numbers
- **Expertise**: Author credentials, depth of coverage
- **Authority**: Backlinks, citations, brand recognition
- **Trust**: Accurate info, clear attribution, secure site

## AI/AEO Optimization

### Optimizing for AI Discovery

AI assistants (ChatGPT, Perplexity, Claude) source answers from the web.

**Structured data**: Schema markup helps AI understand your content
**Clear formatting**: Headers, lists, tables that AI can parse
**Direct answers**: Concise, quotable responses to questions
**Entity clarity**: Clearly establish what your product/company is

### AEO Principles

- Answer questions directly and early
- Use structured formats (lists, tables)
- Include specific data and numbers
- Build topical authority (comprehensive coverage)

## Comparison Pages

### Competitor Comparison Strategy

For "Your Product vs Competitor" pages:

1. **Be fair**: Acknowledge competitor strengths
2. **Be specific**: Feature-by-feature where you win
3. **Be current**: Outdated info kills credibility
4. **Lead with use case**: "Best for X" not "We're better"

### Comparison Page Structure

```
[H1] Product A vs Product B: Which is Right for You?
[Quick comparison table]
[Who should choose A] (be honest)
[Who should choose B] (this is you)
[Detailed comparison by category]
[Verdict / recommendation]
```

## Content Refresh

### When to Refresh

- Rankings dropping
- Information outdated
- Competitors published better content
- Conversion rate declining

### Refresh Checklist

- [ ] Update statistics and examples
- [ ] Add new sections competitors cover
- [ ] Improve formatting and readability
- [ ] Refresh internal links
- [ ] Update meta description
- [ ] Check and fix broken links

## Content Quality Test

Before publishing:

1. **Better than top 3?** If not, why would Google rank you?
2. **Would you bookmark it?** Real value test
3. **Specific and actionable?** Vague = forgettable
4. **Clear next step?** Every piece needs a CTA

## B2B Tech Context

**High-value topics**:
- "Best [category] for [use case]"
- "[Your product] vs [Competitor]"
- "How to [solve specific problem]"
- "[Industry] benchmarks"

**Link building**: Industry publications, partner content, expert roundups

---

## Context Tools

Tools support content research and competitor analysis, but content publishing requires human platform access.

```
extract_website_content(url)
→ Page content and structure analysis
→ Use for: Competitor research, SERP analysis, content gap identification

fetch_company_news(company_name)
→ Industry and company news
→ Use for: Timely content topics, news hooks, trend identification
```

### Research Applications

| Research Need | Tool | SEO Use |
|---------------|------|---------|
| Competitor content audit | `extract_website_content` | Identify gaps and opportunities |
| SERP analysis | `extract_website_content` | Understand what ranks |
| Timely topics | `fetch_company_news` | Find newsworthy angles |

---

## Integration

- Copy quality → `writing-persuasive-copy`
- Repurposing → `atomizing-content`
- Lead capture → `generating-lead-magnets`
