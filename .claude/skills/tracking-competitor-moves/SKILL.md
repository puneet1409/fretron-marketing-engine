---
name: tracking-competitor-moves
description: Use for competitive intelligence - monitoring competitor pricing, features, messaging, and market moves. Invoke when analyzing competitors, updating battlecards, or responding to competitive threats.
requires_tools:
  - fetch_company_news
  - extract_website_content
execution_capable: true
provides_context:
  - name: competitor_intel
    schema: "{competitor, recent_news, positioning, feature_updates}"
  - name: battlecard_updates
    schema: "{competitor, new_strengths, new_weaknesses, landmines}"
---

# Tracking Competitor Moves

## Core Insight

**Know your real competitors (what they actually use today) and compete on differentiation, not features.**

Track what matters to buying decisions, not everything competitors do.

## Competitive Analysis Framework

### What to Track

| Element | Where to Find | Frequency |
|---------|---------------|-----------|
| Positioning/messaging | Homepage, product pages | Monthly |
| New features | Blog, release notes | Weekly |
| Pricing | Pricing page, reviews | Quarterly |
| Customer wins | Case studies, LinkedIn | Monthly |
| Job postings | Careers page | Monthly (signals priorities) |

### Battlecard Template

```
## vs [Competitor]

**Quick Facts**: Founded, funding, customers, focus

**When We Win**: [2-3 scenarios]
**When We Lose**: [1-2 scenarios]

**Their Strengths**: [Acknowledge honestly]
**Their Weaknesses**: [Emphasize tactfully]

**Landmines**: Questions that expose their gaps
**Proof Points**: Our evidence against them
```

## Competitive Response Playbook

### When They Launch Feature

1. Does it matter to our ICP?
2. Is it real or vaporware?
3. Do we have it? Emphasize ours.
4. Don't have it? Minimize or roadmap.
5. Update battlecard, notify sales.

### When They Drop Price

1. Verify (real or promotional?)
2. What's the catch?
3. Emphasize value/TCO, not price match.

### When They Win Our Deal

1. Debrief: Why?
2. Document in win/loss
3. Update battlecard if pattern
4. Stay in touch (for when they regret)

## Win/Loss Analysis

After every competitive deal:
- Decision factors (what mattered?)
- What worked / didn't work
- Key learnings
- Battlecard update needed?

### Quarterly Review

- Win rate vs each competitor
- Common winning scenarios
- Common losing scenarios
- Recommended adjustments

## B2B Tech Competitive Context

**Real competitors often aren't other vendors:**
- Excel + manual processes
- "Do nothing" / status quo
- Internal IT build

**Position against actual alternatives**, not aspirational competitors.

---

## Tool Usage

### Competitor News Monitoring

```
1. fetch_company_news(competitor_name)
   → Get: recent announcements, funding, expansions, leadership changes
   → Detect: feature launches, customer wins, strategic moves

2. Analyze triggers for competitive implications:
   - expansion → Growing market presence
   - funding_growth → Resources for product development
   - leadership_change → Possible strategy shift
   - digital_transformation → New capabilities
```

### Competitor Website Analysis

```
1. extract_website_content(competitor_homepage_url)
   → Get: Current messaging, positioning, taglines
   → Compare to previous snapshot for changes

2. extract_website_content(competitor_pricing_url)
   → Get: Pricing structure, packages, features
   → Flag changes for sales notification

3. extract_website_content(competitor_features_url)
   → Get: Feature list, new capabilities
   → Compare to our feature set
```

### Competitive Monitoring Workflow

```
Weekly scan:
1. For each competitor:
   a. fetch_company_news(competitor)
   b. If significant news → Flag for review
   c. extract_website_content(key pages)
   d. Compare to baseline → Detect changes

2. Output: Competitive update report
   - New announcements
   - Messaging changes
   - Feature updates
   - Recommended responses
```

### Battlecard Update Workflow

When competitive change detected:
```
1. Assess impact:
   - Does this affect our positioning?
   - Does this change win/loss dynamics?
   - Does this require sales enablement?

2. Update battlecard:
   - Add new strength/weakness
   - Update landmine questions
   - Refresh proof points

3. Notify sales if significant
```

---

## Human Checkpoints

Pause for human review when:
- **Major competitor announcement**: Assess strategic implications
- **Pricing changes detected**: Validate before responding
- **New feature launch**: Evaluate competitive positioning
- **Battlecard updates**: Validate with sales before distribution

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `fetch_company_news` | No news found | Check LinkedIn, set up Google Alerts |
| `extract_website_content` | Page blocked/changed | Manual website review, screenshot for baseline |

---

## Integration

- Positioning implications → `discovering-positioning-angles`
- Comparison content → `seo-and-content-strategy`
- Deal coaching → `enabling-champions`
- Account triggers → `mapping-buyer-triggers` (competitor engagement signals)
