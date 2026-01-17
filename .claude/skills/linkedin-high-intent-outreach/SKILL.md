---
name: linkedin-high-intent-outreach
description: Use for high-intent LinkedIn outreach - capturing real-time intent signals and hyper-personalized 1:1 messaging. Based on the framework that booked 12 demos in 5 days. Invoke when running LinkedIn outreach campaigns, detecting intent signals, or creating personalized DMs.
requires_tools:
  - enrich_company
  - fetch_company_news
  - score_account
  - hubspot_create_task
  - hubspot_add_note
  - hubspot_search_contacts
execution_capable: true
depends_on:
  - selecting-and-researching-accounts
  - trust-building-principles
  - warming-up-accounts
expects_context:
  - name: account_scores
    from_skill: selecting-and-researching-accounts
    required: false
  - name: triggers_detected
    from_skill: mapping-buyer-triggers
    required: false
provides_context:
  - name: outreach_tasks
    schema: "{contact, signal_detected, dm_draft, task_id}"
  - name: signal_scores
    schema: "{contact, total_intent_score, priority_tier}"
---

# LinkedIn High-Intent Outreach

**Depends on**: `selecting-and-researching-accounts`, `trust-building-principles`, `warming-up-accounts`

## Core Insight

**Cold outreach = 1-2% response. High-intent outreach = 25-40% response. The difference is INTENT SIGNALS.**

When someone comments on a competitor post, changes jobs, or shares a pain point, they're raising their hand. That's 100x stronger than any data point you can buy.

## Cold vs High-Intent Comparison

| Metric | Cold Outreach | High-Intent Outreach |
|--------|---------------|---------------------|
| Response rate | 1-2% | 25-40% |
| Messages to book meeting | 100 | 10 |
| Prospect mindset | Defensive | Already interested |
| Conversation quality | Uphill battle | Natural dialogue |

---

## The Intent Signal Categories

### 1. Engagement Signals (Highest Value)

| Signal | Intent Score | Why It Works |
|--------|-------------|--------------|
| Commented on competitor post | +40 | Actively evaluating |
| Liked competitor content | +25 | Aware of category |
| Shared industry pain post | +35 | Has the problem now |
| Engaged with influencer content | +20 | Learning about solutions |
| Posted question about problem | +40 | Seeking answers |

### 2. Job Change Signals

| Signal | Intent Score | Window |
|--------|-------------|--------|
| New role: VP/Director level | +35 | 90-day honeymoon |
| New role: C-Suite | +40 | New initiatives |
| Promoted to decision-maker | +30 | Expanding scope |
| Team hiring (supply chain roles) | +25 | Building capability |

### 3. Company Event Signals

| Signal | Intent Score | Source |
|--------|-------------|--------|
| Expansion announced | +30 | News/LinkedIn |
| Funding raised | +25 | News/Crunchbase |
| New facility opened | +30 | News/LinkedIn |
| Digital transformation initiative | +35 | LinkedIn/Job posts |
| Acquisition/merger | +25 | News |

### 4. Content Consumption Signals

| Signal | Intent Score | How to Track |
|--------|-------------|--------------|
| Website visit from LinkedIn | +20 | UTM tracking |
| Downloaded content | +25 | Form submissions |
| Watched webinar | +30 | Registration data |
| Attended event | +30 | Event tracking |

---

## Fretron TMS-Specific Intent Signals

### Pain Point Keywords to Monitor

**Logistics Operations**:
- "logistics nightmare"
- "tracking visibility"
- "freight costs"
- "carrier management"
- "delivery delays"
- "OTIF issues"

**Digital Transformation**:
- "digitizing supply chain"
- "manual processes"
- "Excel chaos"
- "tech modernization"
- "automation"

**Compliance**:
- "e-way bill challenges"
- "GST compliance"
- "fleet compliance"
- "audit issues"

### Competitor Engagement to Track

Monitor engagement with:
- SAP Transportation Management
- Oracle TMS
- Blue Yonder
- Locus (last-mile)
- FarEye
- LogiNext

### Influencer Accounts to Monitor

Track engagement with logistics/supply chain influencers on LinkedIn for your target geography.

---

## The High-Intent Outreach Process

### Step 1: Signal Detection

**Daily monitoring**:
1. LinkedIn Sales Navigator alerts for job changes
2. Google Alerts for company news
3. LinkedIn search for pain point keywords
4. Competitor page follower activity
5. Your content engagers

### Step 2: Signal Scoring

```
Total Intent Score = Sum of all detected signals

Priority Tiers:
- 60+ points = URGENT (reach out today)
- 40-59 points = HIGH (reach out this week)
- 20-39 points = MEDIUM (add to nurture)
- <20 points = LOW (monitor only)
```

### Step 3: Hyper-Personalized Outreach

**Key principle**: Reference the SPECIFIC signal you detected.

---

## The DM Framework That Actually Works

99% of LinkedIn DMs are instant deletes. They look like this:

**Garbage DMs (delete immediately)**:
- "Hey [Name], hope you're well! I help founders like yourself..."
- "Noticed you're doing great things on LinkedIn, we should connect!"
- "Hi sir, I offer very good LinkedIn services, please check"

These fail because they're templates, not conversations.

### The 3-Step Process

#### Step 1: Do REAL Research (Not Fake Research)

"Noticed you're doing great things on LinkedIn" is NOT research.

Spend 2 minutes actually looking at their profile:
- What's a recent post they made that you can reference?
- What's something specific about their business that caught your eye?
- What problem are they likely dealing with RIGHT NOW?

**Bad opener**: "Hey, noticed your posts, love your content!"

**Good opener**: "Hey [Name], saw your post about struggling to convert LinkedIn traffic—that exact problem is why most founders give up after 90 days"

The good opener proves you actually paid attention.

#### Step 2: Write Like You Talk

LinkedIn DMs are NOT legal documents.

**Don't write like this**:
> "I would be delighted to schedule a brief introductory call at your earliest convenience"

**Write like this**:
> "Are you down for a call Monday at 2pm or Thursday at 4pm?"

**The Read-Aloud Test**: Read your DM out loud. If you sound like a robot, rewrite it.

#### Step 3: Personalization ≠ Relevance

This is where most people mess up.

| Type | Example | Why It Fails/Works |
|------|---------|-------------------|
| Personalization only | "Hey noticed your most recent post, loved it!" | Mentions them, but irrelevant to anything |
| Personalization + Relevance | "Hey, noticed you guys just raised $10M. Congrats. We help funded SaaS companies build authority on LinkedIn so investors actually see the traction" | Matches message to their current state |

**Relevance** = connecting your message to:
- What they're dealing with RIGHT NOW
- What they're likely trying to accomplish

### The Simplicity Rule

Nobody's reading 8 paragraphs from a stranger.

**Maximum lengths**:
- First DM: 25-30 words
- Follow-up: 30-35 words
- One paragraph MAX

If you can cut a word without losing meaning, cut it.

### Good vs Bad DM Examples

**Scenario**: Target just announced Series A funding

| Bad DM | Good DM |
|--------|---------|
| "Hi [Name], I noticed you're in the logistics space. We help companies like yours improve efficiency. Would love to connect and see if there's synergy!" | "Hey [Name], congrats on the Series A. Most funded logistics companies we work with hit a wall scaling ops around month 4. How are you planning to handle that?" |

**Why bad fails**: Generic, no reference to their situation, "synergy" is meaningless

**Why good works**: Acknowledges specific event, references a relevant problem they'll likely face, asks genuine question

---

## The Message Templates

### Initial DM (23 words max)

**Generic Pattern**:
```
Hey [Name],

Quick question - what's your biggest challenge with [topic from signal] right now?
```

**Signal-Specific Variations**:

**Competitor Engagement**:
```
Hey [Name],

Noticed you've been exploring [competitor topic]. Curious - what's driving the evaluation?
```

**Pain Point Post**:
```
Hey [Name],

Saw your post about [specific pain]. We solved that for [similar company]. Mind sharing what's not working?
```

**New Role**:
```
Hey [Name],

Congrats on the new role at [Company]! What's your biggest ops priority in your first 90 days?
```

**Expansion News**:
```
Hey [Name],

Saw [Company] is expanding to [location]. How are you handling logistics for the new footprint?
```

### Meeting Booking DM (27 words max)

After they respond:
```
Interesting - we just helped [similar company] solve that exact problem. Cut their [specific metric] by [X]%.

Mind if I send a 3-min video showing how?
```

### Backup DM (29 words max)

If no response after 3-5 days:
```
Hey [Name], noticed [specific observation about their business/activity]. We helped [similar company] navigate similar. Worth a quick chat?
```

### Breakup DM

After 2 no-responses:
```
[Name] - seems like timing might be off. No worries. If [pain point] becomes urgent, happy to help. Good luck with [their initiative]!
```

---

## AI Prompts for Scale

### Research Prompt

```
Analyze this person's LinkedIn profile and recent activity:
[Profile URL or paste content]

Identify:
1. Their biggest business challenge based on recent posts/comments
2. Something specific they're working on right now
3. A genuine observation about their work (not generic compliment)
4. Any intent signals: job change, company news, competitor engagement

Keep output under 50 words total.
```

### Message Writing Prompt

```
Write a LinkedIn DM to [Name] who [specific intent signal detected].

Their context: [research output]

Rules:
- Sound like texting a colleague, not a sales robot
- Reference their specific situation (RELEVANCE, not just personalization)
- Connect your message to what they're dealing with RIGHT NOW
- Ask ONE simple question
- No sales language, no pitch, no "synergy"
- No exclamation points
- Maximum 25 words
- Read it aloud—if it sounds robotic, rewrite it

Bad: "Noticed you're doing great things, would love to connect"
Good: "Saw you're expanding to 3 new markets—how are you handling logistics for the new footprint?"
```

### Follow-Up Prompt

```
They responded: "[their response]"

Write a 25-word follow-up that:
- Acknowledges their specific situation
- Shares ONE relevant proof point
- Suggests easy next step
- Sounds conversational, not salesy
```

---

## Weekly Execution Cadence

### Daily (30 min)
- Check new intent signals (job changes, news, engagements)
- Send 5-10 personalized DMs to high-intent signals
- Respond to any replies

### Weekly
- Monday: Review last week's response rates
- Tuesday-Thursday: Peak outreach days
- Friday: Update signal tracking, plan next week

### Monthly
- Review which signals convert best
- Adjust scoring weights
- Update competitor/influencer monitoring list

---

## Measurement

| Metric | Cold Benchmark | High-Intent Target |
|--------|----------------|-------------------|
| Connection accept | 30% | 60%+ |
| DM response rate | 5% | 25-40% |
| Messages per meeting | 100 | 10-15 |
| Time to first meeting | 3-4 weeks | 5-7 days |

### Signal Attribution

Track which signals lead to meetings:
- New job signals → [conversion rate]
- Competitor engagement → [conversion rate]
- Pain point posts → [conversion rate]
- Company news → [conversion rate]

Double down on highest-converting signals.

---

## Tools Stack

**Signal Detection**:
- LinkedIn Sales Navigator (job changes, saved searches)
- Google Alerts (company news)
- Gojiberry AI or similar (automated signal capture)
- LinkedIn boolean searches (pain point posts)

**Outreach Execution**:
- LinkedIn native (safest)
- HeyReach, Expandi (automation with caution)

**Enrichment**:
- Apollo, ZoomInfo (emails for multi-channel)
- BitScale (contact finding)

---

## Tool Usage

### Execution Scope

**What CAN be automated**:
- Signal detection from news (`fetch_company_news`)
- Company research (`enrich_company`)
- Intent scoring (`score_account`)
- CRM task creation for outreach (`hubspot_create_task`)
- Logging signals and drafts to CRM (`hubspot_add_note`)
- Contact lookup (`hubspot_search_contacts`)

**What CANNOT be automated** (requires human):
- Sending LinkedIn DMs (no LinkedIn MCP, ToS restrictions)
- Connection requests
- Monitoring LinkedIn activity in real-time

### Signal Detection Workflow

```
1. fetch_company_news(company_name)
   → Detects: leadership_change, expansion, digital_transformation, funding_growth
   → Maps to intent signals

2. enrich_company(company_name)
   → Detects: hiring signals, tech stack changes
   → Additional context for personalization

3. score_account(company, industry, signals)
   → Calculates ICP tier
   → Combines with intent signals for priority
```

### Outreach Task Creation

```
1. hubspot_search_contacts(query)
   → Find contact in CRM

2. hubspot_create_task({
     contact_id,
     title: "LinkedIn DM - [Signal Type]",
     description: "[Draft DM based on signal]",
     due_date: today,
     priority: "HIGH"
   })
   → Creates task for human to execute

3. hubspot_add_note({
     contact_id,
     body: "Intent signal detected: [signal]. Suggested DM: [draft]"
   })
   → Logs signal for tracking
```

### Batch Signal Scan

For multiple accounts:
```
For each account in target_list:
  1. fetch_company_news(account)
  2. If triggers_found:
     - Calculate intent score
     - Draft personalized DM
     - Create HubSpot task
     - Log to campaign state
```

---

## Human Checkpoints

Pause for human review when:
- **Urgent signals detected** (60+ intent score): Verify signal before same-day outreach
- **C-suite targets identified**: Confirm messaging approach
- **Competitor engagement detected**: Validate competitive positioning
- **Batch outreach >10 contacts**: Review task list before creating

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `fetch_company_news` | No news found | Use `enrich_company` signals only, lower intent score |
| `enrich_company` | Company not found | Manual LinkedIn research, create task anyway |
| `hubspot_search_contacts` | Contact not in CRM | Create task with company name, find contact manually |
| `hubspot_create_task` | API error | Log to campaign state, retry later |

---

## Integration

- Account selection → `selecting-and-researching-accounts` (use signals for scoring)
- Warmup tactics → `warming-up-accounts` (light engagement before DM)
- Trust principles → `trust-building-principles` (match ask to trust)
- Email follow-up → `writing-b2b-emails` (multi-channel after LinkedIn)
- Trigger mapping → `mapping-buyer-triggers` (understand why now)
