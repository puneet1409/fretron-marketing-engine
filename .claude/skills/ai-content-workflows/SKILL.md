---
name: ai-content-workflows
description: Use for AI-assisted content creation at scale - from briefs to drafts to editing. Covers prompting strategies, quality control, human-in-the-loop processes, and content velocity optimization. Invoke when planning content production workflows or scaling content output with AI assistance.
context_tools:
  - fetch_company_news
  - extract_website_content
execution_capable: false
depends_on:
  - seo-and-content-strategy
  - writing-persuasive-copy
---

# AI Content Workflows

**Depends on**: `seo-and-content-strategy`, `writing-persuasive-copy`

## Core Insight

**AI doesn't replace writers. It replaces blank pages. The workflow is: AI generates → Human elevates → Brand differentiates.**

The companies winning at content aren't avoiding AI. They're building systems that use AI better than anyone else.

## The New Content Math

| Traditional | AI-Assisted |
|-------------|-------------|
| 1 writer = 4 articles/month | 1 writer + AI = 20 articles/month |
| Brief → Draft: 8 hours | Brief → Draft: 2 hours |
| Research: 4 hours | Research: 1 hour |
| Editing: 2 hours | Editing: 2 hours (same) |
| Total: 14 hours/article | Total: 5 hours/article |

**The 5x multiplier** comes from AI handling the blank-page problem.

---

## Content Workflow Stages

### The AI-Human Pipeline

```
STAGE 1: Strategy (Human)
   ↓
STAGE 2: Brief (AI-Assisted)
   ↓
STAGE 3: Research (AI-Assisted)
   ↓
STAGE 4: Draft (AI)
   ↓
STAGE 5: Enhancement (Human)
   ↓
STAGE 6: Optimization (AI-Assisted)
   ↓
STAGE 7: Review (Human)
   ↓
STAGE 8: Publish
```

### Stage Ownership

| Stage | Primary | AI Role | Human Role |
|-------|---------|---------|------------|
| Strategy | Human | Suggest topics | Decide priorities |
| Brief | AI-Assisted | Generate brief | Refine, add context |
| Research | AI-Assisted | Compile info | Verify, add insight |
| Draft | AI | Write 80% | Provide direction |
| Enhancement | Human | Suggest edits | Add expertise, voice |
| Optimization | AI-Assisted | Meta, schema | Final check |
| Review | Human | Flag issues | Approve |

---

## Stage 1: Strategy

### AI-Assisted Topic Generation

**Prompt for Topic Ideas**:
```
You're a content strategist for Fretron, a TMS software company targeting Indian logistics decision-makers.

Generate 20 blog topic ideas that:
1. Target keywords with search volume
2. Address pain points our ICP has
3. Naturally lead to our solution
4. Haven't been overdone by competitors

Our ICP: VP Operations, Logistics Managers, CFOs at mid-to-large Indian companies with significant logistics spend.

Pain points: freight costs, delivery delays, lack of visibility, compliance (GST, e-way bill), carrier management chaos.

Format: [Topic Title] | [Primary Keyword] | [Search Intent] | [Funnel Stage]
```

### Human Strategy Layer

AI suggests, human decides:
- Which topics align with business priorities?
- What's our unique angle?
- What can we say that competitors can't?
- Which topics build toward conversion?

---

## Stage 2: Content Brief

### AI-Generated Brief Template

**Brief Generation Prompt**:
```
Create a comprehensive content brief for: "[Topic]"

Include:
1. Target keyword and related keywords
2. Search intent (informational/commercial/transactional)
3. Target audience persona
4. Recommended word count
5. Outline with H2s and H3s
6. Key points to cover under each section
7. Competitor content to beat (analyze top 3 ranking)
8. Unique angle we should take
9. Internal links to include
10. CTA recommendation

Context: Fretron is a TMS for Indian logistics. Our differentiators are [list]. Our content should be helpful first, promotional second.
```

### Brief Enhancement (Human)

Add to AI-generated brief:
- [ ] Specific data points we have
- [ ] Customer stories to include
- [ ] Internal expertise to reference
- [ ] Unique insights only we know
- [ ] Brand voice reminders

---

## Stage 3: Research

### AI Research Workflow

**Research Prompt**:
```
Research the topic "[Topic]" for a B2B SaaS blog post.

Compile:
1. Key statistics (with sources)
2. Industry trends
3. Expert opinions/quotes
4. Common misconceptions
5. Related topics to mention
6. Questions people ask about this topic

Focus on Indian logistics market context.
Prioritize data from the last 2 years.
Flag any statistics that need verification.
```

### Human Research Layer

AI compiles, human verifies:
- [ ] Fact-check all statistics
- [ ] Add proprietary data from our customers
- [ ] Include insights from sales conversations
- [ ] Reference industry reports we have access to
- [ ] Add expert quotes from our team

---

## Stage 4: First Draft

### Drafting Prompts by Content Type

**Long-Form Guide (2000+ words)**:
```
Write a comprehensive guide on "[Topic]" for [Audience].

Follow this outline:
[Paste outline from brief]

Requirements:
- Write in second person ("you")
- Use active voice
- Include specific examples
- Break up text with bullets and tables
- Add a practical tip or insight in each section
- Aim for 8th grade reading level
- Don't be salesy - be helpful first

Voice: Professional but conversational. Expert advisor, not lecturer.

Word target: 2500 words
```

**Comparison Post**:
```
Write a fair comparison between [Product A] and [Product B].

Structure:
1. Quick comparison table (top of page)
2. Overview of each product
3. Feature-by-feature comparison
4. Pricing comparison (what we can share)
5. Best for: scenarios where each wins
6. How to decide

Tone: Objective, helpful, not promotional. A reader should trust this even though we make Product A.

Include: Scenarios where Product B might be the better choice (builds trust).
```

**How-To Article**:
```
Write a practical how-to guide: "[Title]"

Structure:
1. Why this matters (brief)
2. What you'll need / prerequisites
3. Step-by-step instructions
4. Common mistakes to avoid
5. Pro tips
6. What success looks like

Include: Screenshots/diagram placeholders where helpful.

Make it: Actionable. Reader should be able to follow these steps.
```

**Case Study**:
```
Write a case study about [Customer] using [Product] to solve [Problem].

Structure:
1. The Challenge (what wasn't working)
2. Why They Chose [Product]
3. The Implementation
4. The Results (specific metrics)
5. Key Takeaways

Format: Mix of narrative and bullet points.
Include: Direct quotes (placeholder for now).
Focus on: Transformation, not features.
```

---

## Stage 5: Human Enhancement

### The Enhancement Checklist

AI wrote the draft. Human makes it great:

**Expertise Layer**:
- [ ] Add insights only an expert would know
- [ ] Include "insider" tips
- [ ] Reference real customer situations
- [ ] Add nuance AI missed

**Voice Layer**:
- [ ] Adjust to match brand voice
- [ ] Remove AI-isms ("In conclusion", "It's important to note")
- [ ] Add personality and opinion
- [ ] Make it sound like a human wrote it

**Value Layer**:
- [ ] Is there original insight?
- [ ] Would someone share this?
- [ ] Does it answer the query completely?
- [ ] Is there a reason to choose this over competitors?

**Differentiation Layer**:
- [ ] What can we say that competitors can't?
- [ ] Where's our unique data or perspective?
- [ ] How does this position us as the expert?

### Common AI-isms to Remove

```
Remove/Replace:
- "In today's fast-paced world..." → [Just start with the point]
- "It's important to note that..." → [Just state it]
- "In conclusion..." → [Use "Bottom line:" or just end]
- "Delve into..." → [Explore, examine, look at]
- "Leverage" → [Use]
- "Utilize" → [Use]
- "In order to" → [To]
- "At the end of the day" → [Ultimately, or delete]
- "Game-changer" → [Something specific]
- "Best practices" → [What works, proven approaches]
```

---

## Stage 6: SEO Optimization

### AI-Assisted SEO Tasks

**Meta Title/Description**:
```
Write 3 meta title options and 3 meta description options for this article.

Article: [Title]
Primary keyword: [Keyword]
Character limits: Title (60), Description (155)

Requirements:
- Include primary keyword naturally
- Create curiosity or promise value
- Make it click-worthy but accurate
```

**Internal Linking**:
```
Review this article and suggest where to add internal links to these pages:
[List of related pages with URLs]

Format: [Suggested anchor text] → [URL] | [Location in article]
```

**Schema Markup**:
```
Generate FAQ schema for this article based on the questions answered.
Generate Article schema with the appropriate fields.
Output as JSON-LD.
```

---

## Stage 7: Quality Review

### Human Quality Checklist

Before publishing:

**Content Quality**:
- [ ] Does it answer the query completely?
- [ ] Is there original value?
- [ ] Would I share this?
- [ ] Is it better than what ranks #1?

**Brand Alignment**:
- [ ] Does it sound like us?
- [ ] Does it position us correctly?
- [ ] Is the CTA appropriate?

**Technical**:
- [ ] All links work
- [ ] Images have alt text
- [ ] Schema validates
- [ ] Mobile-friendly formatting

**Accuracy**:
- [ ] All facts verified
- [ ] Statistics sourced
- [ ] No hallucinated claims

---

## Prompt Engineering Best Practices

### The Perfect Prompt Formula

```
[ROLE]: Who AI should be
[CONTEXT]: Background and constraints
[TASK]: What to do
[FORMAT]: How to structure output
[EXAMPLES]: What good looks like
[REFINEMENT]: What to avoid
```

**Example**:
```
[ROLE]: You're a senior content writer at a B2B SaaS company specializing in logistics software.

[CONTEXT]: We're writing for Indian logistics decision-makers (VP Operations, Logistics Managers). They're time-pressed, skeptical of vendor content, and looking for practical advice.

[TASK]: Write a blog post about "How to Reduce Freight Costs Without Sacrificing Delivery Speed"

[FORMAT]:
- 2000 words
- H2 and H3 structure
- Include a table comparing approaches
- Add bullet points for scanability
- End with 3 key takeaways

[EXAMPLES]: Our best-performing posts use specific numbers ("saved 23% on freight") rather than vague claims ("significant savings").

[REFINEMENT]: Don't be salesy. Don't use "leverage," "utilize," or "game-changer." Don't start with "In today's..."
```

### Iterative Refinement

**First pass**: Generate the draft
**Second pass**: "Make section 3 more specific with an example"
**Third pass**: "The intro is weak. Make it hook the reader in the first sentence"
**Fourth pass**: "Add a counterpoint in section 4 - when would this approach NOT work?"

---

## Content Type Templates

### Template Library

Maintain prompts for each content type:

| Content Type | Word Count | AI Time | Human Time |
|--------------|------------|---------|------------|
| Long-form guide | 2500 | 30 min | 90 min |
| Comparison post | 1500 | 20 min | 60 min |
| How-to article | 1500 | 20 min | 45 min |
| Case study | 1200 | 25 min | 60 min |
| Glossary entry | 800 | 10 min | 20 min |
| List post | 1500 | 20 min | 45 min |

### Batch Processing

For efficiency, batch similar content:
```
Monday: Generate 5 briefs (AI)
Tuesday: Generate 5 drafts (AI)
Wednesday: Enhance 5 drafts (Human)
Thursday: Optimize and review (Mixed)
Friday: Publish and promote
```

---

## Quality Control at Scale

### The 80/20 Review

Not all content needs deep review:

**Deep Review (20%)**:
- Pillar content
- Controversial topics
- Customer-facing pages
- Anything making claims

**Standard Review (80%)**:
- Glossary entries
- List posts
- Programmatic pages
- Updates to existing content

### Automated Quality Checks

Before human review:
- [ ] Grammarly/ProWritingAid pass
- [ ] Hemingway readability check
- [ ] Plagiarism scan (Copyscape)
- [ ] Fact-check flagged claims
- [ ] SEO tool validation (Clearscope/Surfer)

---

## Team Workflow

### Roles in AI-Assisted Content

**Content Strategist**:
- Owns topic selection
- Defines priorities
- Reviews final output

**Content Operator**:
- Runs AI workflows
- Manages production
- Ensures consistency

**Subject Matter Expert**:
- Adds expertise layer
- Verifies accuracy
- Provides unique insights

**Editor**:
- Final quality check
- Brand voice guardian
- Publication approval

### Handoff Protocol

```
Strategist → Brief approved
    ↓
Operator → AI draft generated
    ↓
SME → Expertise added
    ↓
Operator → SEO optimized
    ↓
Editor → Final approval
    ↓
Published
```

---

## Avoiding AI Detection Issues

### Google's Stance

Google cares about quality, not origin. But AI-detectable content often IS lower quality.

### Quality Signals That Matter

- Original insights (can't be AI-generated)
- Specific examples (from real experience)
- Expert opinions (attributed)
- Unique data (proprietary)
- Strong voice (personality)

### Making AI Content Undetectable

Not by hiding AI use, but by genuinely improving it:
1. Add human expertise layer
2. Include original research
3. Reference specific experiences
4. Develop distinct voice
5. Make it better than pure-AI could produce

---

## B2B SaaS Context

### Content That Converts in B2B

AI can draft, but humans must:
- Add the "why you should trust us"
- Include customer proof
- Make technical content accessible
- Connect features to outcomes

### Multi-Stakeholder Content

Different versions for different readers:
- **Technical version**: Deep details
- **Executive version**: ROI focus
- **Practitioner version**: How-to focus

AI can generate variants; human ensures each resonates.

### Compliance and Accuracy

B2B content often involves:
- Regulatory claims (GST, compliance)
- Security assertions
- Performance promises

**Never publish AI-generated content about compliance without expert review.**

---

---

## Context Tools

Tools provide research context for content creation, but content writing itself is a human task.

```
fetch_company_news(company_name)
→ Recent news, triggers, events
→ Use for: Current examples, case study context, timely content hooks

extract_website_content(url)
→ Page content analysis
→ Use for: Competitor content research, source material analysis
```

### Research Applications

| Research Need | Tool | Content Use |
|---------------|------|-------------|
| Timely examples | `fetch_company_news` | Add current industry context |
| Competitor analysis | `extract_website_content` | Understand what to beat |
| Source verification | `extract_website_content` | Fact-check AI-generated claims |

---

## Integration

- SEO strategy → `seo-and-content-strategy`
- Scale production → `programmatic-seo`
- Authority building → `topical-authority-building`
- Persuasion → `writing-persuasive-copy`
- AI visibility → `ai-citation-strategies`
