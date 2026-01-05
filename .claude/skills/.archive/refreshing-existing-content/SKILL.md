---
name: refreshing-existing-content
description: Use this skill for auditing and updating existing blog posts, guides, and web pages for accuracy, freshness, and SEO performance. Covers content audit frameworks, update prioritization, and refresh strategies. Invoke when reviewing old content, improving SEO performance, or maintaining content accuracy.
---

# Refreshing Existing Content for Fretron

Audit and update content to maintain accuracy, freshness, and SEO value.

## When to Use This Skill

- Quarterly content audit
- Updating underperforming blog posts
- Refreshing outdated statistics or claims
- Improving SEO on existing pages
- Consolidating or pruning old content

## Why Content Refresh Matters

**Key Insight**: Updating existing content often delivers better ROI than creating new content.

**Benefits**:
- Maintains SEO rankings (freshness signal)
- Fixes outdated information (credibility)
- Improves conversion on existing traffic
- Compounds past investment
- Faster than creating from scratch

## Content Audit Framework

### Audit Criteria

**Performance Metrics**:

| Metric | Good | Needs Attention | Critical |
|--------|------|-----------------|----------|
| Monthly traffic | Growing | Flat | Declining |
| Bounce rate | <60% | 60-75% | >75% |
| Time on page | >2 min | 1-2 min | <1 min |
| Conversions | Converting | Low rate | Zero |

**Content Quality**:

| Factor | Fresh | Stale | Outdated |
|--------|-------|-------|----------|
| Statistics | <6 months old | 6-18 months | >18 months |
| Screenshots | Current UI | Minor changes | Old UI |
| Links | All working | Some broken | Many broken |
| Examples | Current | Still relevant | Dated |

**SEO Health**:

| Factor | Optimized | Needs Work | Poor |
|--------|-----------|------------|------|
| Target keyword | Ranking top 10 | Ranking 11-30 | Not ranking |
| Title/meta | Optimized | Partial | Missing/poor |
| Internal links | Well linked | Few links | Orphaned |
| Content depth | Comprehensive | Adequate | Thin |

### Audit Spreadsheet Template

```
| URL | Title | Publish Date | Last Updated | Monthly Traffic | Trend | Keyword Rank | Action |
|-----|-------|--------------|--------------|-----------------|-------|--------------|--------|
| /blog/post-1 | [Title] | 2023-01-15 | 2023-01-15 | 500 | ↓ | #15 | Update |
| /blog/post-2 | [Title] | 2024-06-01 | 2024-06-01 | 2000 | ↑ | #3 | Monitor |
```

### Priority Matrix

```
                    HIGH TRAFFIC
                         │
         PROTECT         │         OPTIMIZE
      (Keep fresh,       │      (Improve conversion,
       don't break)      │       add CTAs, expand)
                         │
    ─────────────────────┼─────────────────────
                         │
         PRUNE           │         REFRESH
      (Consolidate,      │      (Update content,
       redirect, or      │       improve SEO,
       delete)           │       republish)
                         │
                    LOW TRAFFIC

    LOW PERFORMANCE ─────────────── HIGH PERFORMANCE
```

## Content Refresh Playbook

### Type 1: Quick Refresh (30 minutes)

**When to Use**: Content is mostly good, minor updates needed

**Checklist**:
- [ ] Update statistics with current data
- [ ] Fix broken links
- [ ] Update screenshots if UI changed
- [ ] Refresh publish date
- [ ] Add 1-2 new internal links
- [ ] Check/update meta description

### Type 2: Moderate Refresh (2-3 hours)

**When to Use**: Content structure is good, needs expansion

**Checklist**:
- [ ] All items from Quick Refresh
- [ ] Add new section based on search intent
- [ ] Improve introduction/hook
- [ ] Add/update examples
- [ ] Expand thin sections
- [ ] Add FAQ section if missing
- [ ] Update/add images
- [ ] Improve CTAs

### Type 3: Major Refresh (Full rewrite)

**When to Use**: Content is fundamentally outdated or poor

**Checklist**:
- [ ] Research current search intent
- [ ] Create new outline
- [ ] Rewrite from scratch
- [ ] Maintain URL (for SEO equity)
- [ ] Add comprehensive coverage
- [ ] New images/graphics
- [ ] Strong CTAs
- [ ] Internal linking strategy
- [ ] Republish with new date

### Type 4: Consolidation

**When to Use**: Multiple posts on similar topic, none ranking well

**Process**:
1. Identify posts to consolidate
2. Choose strongest URL as target
3. Merge best content from all posts
4. Set up 301 redirects from other URLs
5. Update internal links pointing to old URLs

### Type 5: Pruning

**When to Use**: Content is low value, no traffic, not worth updating

**Options**:
- **Delete**: No redirects needed if truly no traffic
- **Redirect**: If some backlinks, redirect to related content
- **No-index**: Keep for reference but remove from search

## Refresh Templates

### Updated Statistics Template

**Before**:
```
"According to a 2022 study, 65% of companies struggle with..."
```

**After**:
```
"According to [Source Name]'s 2024 report, 72% of companies
struggle with... (up from 65% in 2022, indicating the problem
is growing)."
```

### Refreshed Introduction Template

**Before** (Weak):
```
"In today's world, logistics is important. This blog post will
discuss TMS systems."
```

**After** (Strong):
```
"Your dispatch team spends 40+ hours per week on manual tracking
calls. Meanwhile, freight costs keep rising and customers demand
real-time visibility. A Transportation Management System (TMS)
solves all three problems—here's how to choose the right one for
your manufacturing business."
```

### Added FAQ Section Template

```markdown
## Frequently Asked Questions

### How long does TMS implementation take?
For mid-market manufacturing companies, expect 6-8 weeks for a
pilot and 3-4 months for full deployment. Enterprise implementations
can take 6-12 months depending on complexity.

### What ROI can I expect from a TMS?
Typical ROI includes 10-20% freight cost reduction, 30-50%
efficiency improvement in dispatch operations, and measurable
OTIF improvements. Most companies see payback within 6-9 months.

### How does TMS integrate with our ERP?
Modern TMS platforms offer API-based integration with SAP, Oracle,
and other ERPs. Pre-built connectors reduce integration time from
months to weeks.
```

## SEO Refresh Tactics

### Title Tag Optimization

**Check for**:
- Primary keyword in title
- Under 60 characters
- Compelling (not just keyword stuffed)
- Different from H1

**Before**:
```
TMS Systems | Fretron
```

**After**:
```
TMS for Manufacturing: Cut Freight Costs 15-20% | Fretron
```

### Meta Description Optimization

**Check for**:
- Under 155 characters
- Includes primary keyword
- Includes call-to-action
- Compelling to click

**Before**:
```
Fretron offers TMS solutions for businesses.
```

**After**:
```
Reduce freight costs 15-20% with a TMS built for Indian
manufacturing. 6-week implementation. See how it works →
```

### Content Expansion for Search Intent

**Process**:
1. Search your target keyword
2. Analyze top 3 results - what do they cover?
3. Identify gaps in your content
4. Add sections to match/exceed coverage

**Example Expansion**:
- Original: "What is a TMS?" (500 words)
- Competitors cover: Features, benefits, selection criteria, implementation, ROI
- Expansion: Add sections on each missing topic (2000+ words)

### Internal Linking Refresh

**Find opportunities**:
1. Search site for related topics
2. Add links from high-authority pages to target page
3. Add links from target page to related content
4. Use descriptive anchor text

## Content Audit Schedule

### Monthly

- Check top 20 pages for broken links
- Review any significant traffic drops
- Update any time-sensitive content (dates, events)

### Quarterly

- Full content audit of blog/resources
- Prioritize refresh list
- Execute on top 5-10 refresh priorities
- Prune/consolidate underperforming content

### Annually

- Review all core website pages
- Update case studies with fresh results
- Refresh product pages for new features
- Update about/team pages

## Audit Report Template

```markdown
## Content Audit Report: Q[X] 2025

**Audit Date**: [Date]
**Content Reviewed**: [Number] pages

### Summary
- Pages audited: [X]
- Quick refresh needed: [X]
- Major refresh needed: [X]
- Consolidation candidates: [X]
- Prune candidates: [X]

### Priority Actions

**High Priority (This Quarter)**:
1. [Page URL] - [Action] - [Reason]
2. [Page URL] - [Action] - [Reason]
3. [Page URL] - [Action] - [Reason]

**Medium Priority (Next Quarter)**:
1. [Page URL] - [Action]
2. [Page URL] - [Action]

**Low Priority (Backlog)**:
1. [Page URL] - [Action]

### Content Consolidation Plan
- Merge [URL 1] + [URL 2] → [Target URL]
- Redirect [URL 3] → [Target URL]

### Prune List
- [URL] - [Delete/No-index/Redirect]

### Resources Needed
- [Hours for quick refreshes]
- [Hours for major refreshes]
- [Any external needs]
```

## Integration with Other Skills

- Use → `writing-seo-content` for major refreshes
- Apply → `researching-keywords` for search intent analysis
- Reference → `optimizing-for-ai-discovery` for AEO updates
- Combine with → `atomizing-content` to repromote refreshed content
