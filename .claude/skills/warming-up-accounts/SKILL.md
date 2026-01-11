---
name: warming-up-accounts
description: Use for ABM account warmup - the 90-day framework, podcast play, market research play, and multi-channel coordination. Covers moving accounts from cold to warm before sales outreach. Invoke when planning warmup campaigns for target accounts.
requires_tools:
  - enrich_company
  - fetch_company_news
  - score_account
  - hubspot_search_companies
  - hubspot_create_task
  - hubspot_add_note
execution_capable: true
---

# Warming Up Accounts

**Depends on**: `selecting-and-researching-accounts`, `trust-building-principles`

## Core Insight

**Cold outreach to warm accounts converts 3-5x better than truly cold. Invest 30-90 days building familiarity before asking for meetings.**

## The 90-Day Framework

| Phase | Days | Goal | Trust Level |
|-------|------|------|-------------|
| **Research & Listening** | 1-30 | Build intelligence, passive presence | 0 → 1 |
| **Light Engagement** | 31-60 | Create familiarity, demonstrate relevance | 1 → 2 |
| **Value Delivery** | 61-90 | Deliver tangible value, earn conversation | 2 → 3 |

### Phase 1: Research & Listening
- Map company, org structure, triggers
- Identify buying committee members
- Follow, observe, occasional likes (no engagement yet)

### Phase 2: Light Engagement
- Meaningful comments that add value
- Connection requests with personalization
- First DMs: value-focused, no ask

### Phase 3: Value Delivery
- Custom insights for their situation
- Ask for perspective (flattering, not selling)
- Warm transition to conversation

---

## Warmup Plays

### Podcast Play (1-to-1)

**Why it works**: They're the expert, not the prospect. You learn their challenges while building relationship.

**Core elements**:
- Pre-production interview = discovery call in disguise
- Make them the hero of the story
- Ask for referrals at end of interview
- Follow up with value, then soft pitch

**Metrics that matter**: Acceptance rate (70-80% target), opportunities created. NOT downloads.

### Market Research Play (1-to-Few)

**Why it works**: Co-create valuable content while learning about challenges.

**Core elements**:
- 20-30 min interviews or survey fallback
- Compile insights into report
- Activate: webinar, personalized follow-ups, direct mail

**Use for**: New accounts, existing customers (expansion), stalled opportunities.

### Meaningful Commenting Play

**Good comment**: Adds insight, asks question, references their specific point.
**Bad comment**: Generic ("Great post!"), self-promotional, no value added.

**Cadence**: 2-3 meaningful comments per week. Respond to replies.

---

## High-Intent Signal-Based Warmup (NEW)

**Core insight**: Skip the 90-day framework when you detect strong intent signals. High-intent signals earn faster engagement.

### Signal-Based Acceleration

| Intent Signal | Trust Level Earned | Safe to DM? |
|---------------|-------------------|-------------|
| Commented on competitor post | +2 | Yes - reference it |
| Shared pain point publicly | +2 | Yes - offer value |
| New role (90-day window) | +1 | Yes - congrats + question |
| Engaged with your content | +2 | Yes - thank + expand |
| Downloaded your content | +3 | Yes - direct ask OK |

### High-Intent DM Framework

**23-Word Initial DM** (when signal detected):
```
Hey [Name],

Quick question - what's your biggest challenge with [topic from signal] right now?
```

**Signal-Specific Openers**:

**Competitor Engagement**:
```
Hey [Name], noticed you've been exploring [competitor topic]. Curious - what's driving the evaluation?
```

**Pain Point Post**:
```
Hey [Name], saw your post about [specific pain]. We solved that for [similar company]. Mind sharing what's not working?
```

**New Role**:
```
Hey [Name], congrats on the new role at [Company]! What's your biggest ops priority in your first 90 days?
```

### Response Handling

**After they respond (27 words max)**:
```
Interesting - we just helped [similar company] solve that exact problem.
[Specific result they achieved].

Mind if I send a 3-min video showing how?
```

**If no response (29 words, day 3-5)**:
```
Hey [Name], noticed [specific observation about their business].
We helped [similar company] navigate similar. Worth a quick chat?
```

### High-Intent vs Traditional Warmup

| Scenario | Approach | Timeline |
|----------|----------|----------|
| High-intent signal detected | Direct DM with signal reference | Same day |
| Medium intent (news, hiring) | Light engagement → DM in 3-5 days | 1 week |
| No intent signal | Full 90-day warmup | 90 days |
| Multiple signals stacked | Accelerate to meeting ask | 1-3 days |

### Direct Mail Play (1-to-1)

**When to use**: Last resort for qualified accounts that haven't responded digitally.

**Requirements**:
- Personalization from prior conversations
- Gift connected to personal interests (not generic swag)
- Track delivery, call within 24 hours

---

## Account Warmth Scoring

| Signal | Points |
|--------|--------|
| LinkedIn connection accepted | +10 |
| Responded to DM | +15 |
| Website visit | +15 |
| Content download | +20 |
| Replied to email | +20 |
| Agreed to call | +25 |
| Multiple contacts engaged | +15 |

**Thresholds**: 0-40 = Cold/Warming, 41-60 = Warm, 61+ = Hot (sales outreach appropriate)

---

## Common Mistakes

- **Too fast**: Pitching before rapport
- **Too generic**: Template everything
- **Too aggressive**: Multiple touches per day
- **Too passive**: Never transitioning to conversation

---

## Integration

- Before warmup → Build list with `selecting-and-researching-accounts`
- For trust calibration → Use `trust-building-principles`
- For email sequences → Use `writing-b2b-emails`
- For events → Use `running-abm-events`

---

## Tool Usage

### Research Phase (Days 1-30)
```
enrich_company(company_name) → Get firmographics, signals, tech stack
fetch_company_news(company_name) → Find recent triggers, expansion, leadership changes
hubspot_search_companies(query) → Check if account exists in CRM
```

### Engagement Tracking
```
hubspot_add_note(deal_id, "Warmup touchpoint: Commented on CEO's post about supply chain")
hubspot_create_task(deal_id, "Send personalized connection request", due_date)
```

### Campaign State
When running warmup campaigns, use campaign state files in `campaigns/<campaign-id>/`:
- `state.json`: Track which phase each account is in
- `research/<company>.md`: Store intel gathered
- `content/<company>-sequence.md`: Generated touchpoint sequences
