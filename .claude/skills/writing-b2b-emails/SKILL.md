---
name: writing-b2b-emails
description: Use for all B2B email campaigns - cold outreach, nurture sequences, lifecycle automation, follow-ups. Applies trust-first principles to email design. Invoke for outbound sequences, lead nurturing, re-engagement, or auditing existing campaigns.
requires_tools:
  - hubspot_search_contacts
  - hubspot_get_deal_contacts
context_tools:
  - enrich_company
  - fetch_company_news
execution_capable: false
---

# Writing B2B Emails

**Depends on**: `trust-building-principles`

## Core Insight

**Emails build trust incrementally. Each email earns the right to the next ask.**

Don't compress the trust journey into one email. A sequence of value → credibility → gentle ask outperforms "Hi, want a demo?"

## Email Types by Trust Level

| Trust Level | Email Type | Goal | Ask |
|-------------|------------|------|-----|
| 0 (Unknown) | Pure value | Get noticed | None |
| 1 (Aware) | Insight share | Build relevance | Read more |
| 2 (Interested) | Resource/proof | Build credibility | Download, try |
| 3 (Engaged) | Soft ask | Start conversation | 10-min call |
| 4 (Trusting) | Direct ask | Convert | Demo, proposal |

## Cold Outreach Principles

### The Trust Letter Framework

**Email 1**: Pure value, no ask
- Specific observation about their situation
- Genuine insight they can use
- Zero pitch, zero CTA beyond "thought this might help"

**Email 2**: More value, soft bridge
- Additional insight or resource
- "If this resonates, happy to share more"

**Email 3**: Value + gentle ask
- Brief insight
- Reference how you've helped similar companies
- Low-commitment ask: "10 minutes to swap notes?"

---

## LinkedIn DM Templates (NEW)

**Core insight**: LinkedIn DMs are NOT emails. Shorter = better. 25 words max.

### The High-Intent DM Framework

When you detect an intent signal, skip formality. Reference the signal directly.

**Initial DM (23 words max)**:
```
Hey [Name],

Quick question - what's your biggest challenge with [topic from signal] right now?
```

### Signal-Specific DM Templates

**Competitor Engagement**:
```
Hey [Name], noticed you've been exploring [competitor/topic]. Curious - what's driving the evaluation?
```

**Pain Point Post**:
```
Hey [Name], saw your post about [specific pain]. We solved that for [similar company]. What's not working?
```

**New Role**:
```
Hey [Name], congrats on the new role! What's your biggest ops priority in your first 90 days?
```

**Company Expansion**:
```
Hey [Name], saw [Company] expanding to [location]. How are you handling logistics for the new footprint?
```

**Funding News**:
```
Hey [Name], congrats on the raise! When companies scale fast, logistics often breaks first. Feeling that yet?
```

### Response Handling DMs

**After They Respond (27 words)**:
```
Interesting - we just helped [similar company] solve that exact problem. Cut their [metric] by [X]%.

Mind if I send a 3-min video showing how?
```

**Backup DM - No Response (29 words)**:
```
Hey [Name], noticed [specific observation about their business]. We helped [similar company] navigate similar. Worth a quick chat?
```

**Breakup DM**:
```
[Name] - timing might be off. No worries. If [pain point] becomes urgent, happy to help. Good luck with [initiative]!
```

### DM vs Email Decision

| Situation | Channel | Why |
|-----------|---------|-----|
| High-intent signal detected | LinkedIn DM first | Faster, more personal |
| No LinkedIn response (5 days) | Email | Different channel |
| No email found | LinkedIn only | Only option |
| Both available, cold | Email first, then LinkedIn | Email less intrusive |
| Downloaded your content | Both simultaneously | They know you |

### What Kills LinkedIn DMs

- "I hope this finds you well"
- "I'd love to pick your brain"
- "We're the leading provider of..."
- Anything over 50 words
- Generic compliments
- Immediate pitch
- Exclamation points!

### What Makes Cold Emails Work

- **Specific research** visible in first line
- **Relevance** to their actual situation
- **Value before ask** in every email
- **Easy asks** that match trust level
- **Genuine tone** - would you reply to this?

### What Kills Cold Emails

- "I know you're busy, but..."
- "We're the leading provider of..."
- "Just checking in"
- "Circling back"
- Generic compliments ("Love what you're doing!")
- Demo ask in email 1

## Sequence Architecture

### 5-Email Insight Sequence (3 weeks)

```
Day 0:  Industry insight (no ask)
Day 4:  Benchmark/data (implied value)
Day 8:  Peer example (social proof)
Day 12: Question (engagement)
Day 18: Soft ask (earn the meeting)
```

### Trigger-Based Sequence

When you detect a specific trigger (new hire, expansion, funding):

```
Day 0:  Acknowledge trigger + relevant insight
Day 3:  Resource specific to their situation
Day 7:  Peer example who navigated similar
```

### Lead Nurture Sequence (Post-Download)

```
Immediate: Delivery + quick tip
Day 2:    "Did you try it?" engagement check
Day 5:    Case study / proof
Day 8:    Direct offer (audit, demo)
```

## Email Mechanics

### Subject Lines
- Under 40 characters
- Lowercase feels personal
- Curiosity or specific value
- Bad: "Revolutionize Your Supply Chain Today!"
- Good: "quick question about freight costs"

### Body Copy
- One idea per email
- Short paragraphs (1-2 sentences)
- "You" > "We"
- 6th grade reading level
- Clear single CTA

### CTAs
- One per email
- Specific: "Reply 'audit'" > "Let me know"
- Match to trust level

## Lifecycle Automation

### Behavioral Triggers

| Trigger | Response |
|---------|----------|
| Pricing page visit | "Saw you checking pricing - questions?" |
| Demo page no-submit | "Here's a 2-min video instead" |
| Content binge | "You seem interested in X - here's more" |
| Went cold | "Still relevant? If not, I'll stop" |

### Re-Engagement

When leads go cold:
1. Value-first re-approach (new insight, resource)
2. "Should I close your file?" breakup email
3. Long-term nurture (monthly value, no ask)

## Measurement

| Metric | Cold Outreach | Nurture | Demo Follow-up |
|--------|---------------|---------|----------------|
| Open Rate | 25-40% | 40-60% | 60-80% |
| Reply Rate | 5-10% | 10-20% | 30-50% |
| Meeting Book | 2-5% | 5-15% | N/A |

**If reply rate < 5%**: Asking too much too soon. Add more value earlier.

## Forward-Worthy Test

From Fluint: Would the recipient forward this to their boss?

Every email may be forwarded. Write so your champion can use your words in internal meetings. Customer-language, not vendor-speak.

## Newsletters

### Newsletter Formats

| Format | Structure | Best For |
|--------|-----------|----------|
| Curated digest | 3-5 links + commentary | Busy readers |
| Single topic deep dive | One topic, 500-800 words | Thought leadership |
| Personal letter | Anecdote → insight → application | Relationship building |

### Newsletter Quality

- Subject under 40 chars, create curiosity
- Hook within first 2 sentences
- One main theme per issue
- Value before asking
- Single CTA
- Consistent send day/time

### Metrics

| Metric | Good | Great |
|--------|------|-------|
| Open rate | 25-30% | 35%+ |
| Click rate | 3-5% | 7%+ |
| Unsubscribe | <0.5% | <0.2% |

## B2B Tech Context

- Reference specific pain points (for logistics: Excel chaos, detention costs, visibility gaps)
- Use industry benchmarks when available
- Case studies from same vertical hit harder
- Timing: Tue-Thu mornings, avoid Monday inbox crush

## Integration

- Check trust level → `trust-building-principles`
- For ABM accounts → `running-abm-programs` for warmup integration
- For champions → `enabling-champions` for business case emails
