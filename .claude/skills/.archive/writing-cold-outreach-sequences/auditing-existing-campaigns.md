# Auditing Existing Cold Outreach Campaigns

Systematic framework for evaluating and improving cold outreach sequences.

## When to Use This Framework

- Reviewing SmartLead/Outreach campaigns for trust violations
- Diagnosing why reply rates are below target
- Before refreshing underperforming sequences
- Quarterly campaign health checks

## The Trust Audit Checklist

### Email 1 Audit (Most Critical)

**Pass/Fail Criteria:**

| Criterion | Pass | Fail |
|-----------|------|------|
| **Ask Level** | No ask OR micro-ask (reply with one word) | Meeting request, demo offer, any time commitment |
| **Opening Line** | About THEM (observation, trigger, insight) | About US ("We help companies...", "I'm reaching out...") |
| **Value Delivery** | Specific insight, data point, or resource | Generic claims ("5-15% savings") |
| **Personalization** | Company-specific or role-specific reference | Industry-level only or no personalization |
| **Length** | Under 100 words, scannable | Wall of text, multiple paragraphs |
| **Tone** | Peer-to-peer, helpful | Salesy, vendor-speak, apologetic |

**Scoring:**
- 6/6 Pass: Trust-first compliant
- 4-5 Pass: Needs minor fixes
- 2-3 Pass: Major rewrite needed
- 0-1 Pass: Start over

### Full Sequence Audit

**Trust Ladder Progression Check:**

| Email | Expected Trust Level | Expected Ask | Red Flags |
|-------|---------------------|--------------|-----------|
| 1 | 0 → 1 | Nothing | Any meeting ask |
| 2 | 1 → 2 | "Want the report?" | Pushing for call |
| 3 | 2 → 2.5 | Question (reply-worthy) | Demo mention |
| 4 | 2.5 → 3 | "10 min to swap notes?" | 30-min ask, formal meeting |
| 5 | 3 → 3.5 | Graceful exit or soft re-offer | Aggressive follow-up |

**Progression Violations:**
- Asking for demo in Email 2 = Skipping 2 rungs
- 30-minute meeting in Email 1 = Skipping 4 rungs
- "Just checking in" = No value, trust erosion

### Subject Line Audit

**Pass Criteria:**
- [ ] Under 40 characters
- [ ] No ALL CAPS
- [ ] No [BRACKETS] or {variables} visible
- [ ] Sounds human, not marketing
- [ ] Creates curiosity without clickbait
- [ ] References them, not us

**Fail Examples:**
- "Fretron can help [Company] save 15%" ❌
- "Quick question about freight management" ❌ (too generic)
- "RE: Your logistics challenges" ❌ (fake reply)
- "15 Minutes to Transform Your Supply Chain" ❌ (clickbait)

**Pass Examples:**
- "Quick observation about [Company]" ✓
- "[Industry] freight benchmarks" ✓
- "How [Peer Company] solved this" ✓
- "Should I close your file?" ✓

## Campaign Structure Audit

### Naming Convention Check

**Good Pattern:**
```
[Industry] - [Tier] - [Sequence Type] - [Version]
Example: "Steel - T1 - Value Sequence - v2"
```

**Problem Patterns:**
- "Steel Pain Point 1" → Pain is seller-centric framing
- "Avinash 2" → Owner name, not purpose
- "March Co-Hort 1" → Timing-based, not strategy-based
- "" (blank) → No name at all

### Behavioral Branching Audit

**Minimum Required Branches:**

```
Email 1 Sent
├── Opened → Email 2 (continue sequence)
│   ├── Clicked → Email 2B (accelerate, they're interested)
│   └── No Click → Email 2A (standard follow-up)
├── Not Opened → Email 1B (different subject line)
│   ├── Still Not Opened → Remove or wait 30 days
│   └── Opened → Rejoin main sequence
└── Bounced → Remove from sequence
```

**Advanced Branches (Tier 1 only):**
- Replied positively → Move to meeting booking sequence
- Replied with objection → Objection handling sequence
- Replied "not now" → Add to 90-day re-engagement
- Unsubscribed → Remove permanently, flag for exclusion

### Timing Audit

**Recommended Spacing:**

| Between | Minimum | Recommended | Maximum |
|---------|---------|-------------|---------|
| Email 1 → 2 | 3 days | 4 days | 7 days |
| Email 2 → 3 | 4 days | 5 days | 7 days |
| Email 3 → 4 | 5 days | 7 days | 10 days |
| Email 4 → 5 | 5 days | 7 days | 14 days |

**Timing Red Flags:**
- Same-day or next-day follow-ups (too aggressive)
- 14+ days between emails (lost momentum)
- Sending on weekends (lower engagement)
- All emails at same time of day (no testing)

## Pre-Outreach Audit (Most Overlooked)

### Was There Warmup Before Email 1?

**For Tier 1 Accounts, Check:**
- [ ] Were key contacts followed on LinkedIn 30+ days before?
- [ ] Were there 5+ LinkedIn engagements before first email?
- [ ] Was the account in awareness advertising?
- [ ] Did sender connect on LinkedIn before emailing?

**If all "No"**: The email was truly cold. Lower expectations or add warmup phase.

### Account Research Check

**Before any email sent, should have:**
- [ ] Company's current logistics setup known
- [ ] 3+ contacts identified with roles
- [ ] Recent trigger documented (expansion, hire, etc.)
- [ ] Pain hypothesis written

**If missing**: Personalization will be weak. Add research step.

## Metrics Interpretation

### Benchmark Comparison

| Metric | Cold (No Warmup) | Warm (After 30-Day Warmup) | Your Campaign |
|--------|------------------|---------------------------|---------------|
| Open Rate | 15-25% | 40-60% | ___% |
| Reply Rate | 1-3% | 10-20% | ___% |
| Positive Reply | 0.5-1% | 5-10% | ___% |
| Meeting Rate | 0.2-0.5% | 3-5% | ___% |

### Diagnostic by Metric

**Low Open Rate (<20%)**
- Subject lines too generic
- Sender reputation/deliverability issue
- Wrong time of day
- List quality (bad emails)

**Good Opens, Low Replies (<3%)**
- Email 1 asking too much too soon
- Value not resonating
- Wrong persona targeted
- Email too long

**Good Replies, Low Meetings (<1% of replies)**
- Reply handling too slow
- Meeting ask too big (30 min vs 10 min)
- No calendar link provided
- Handoff to sales fumbled

## Campaign Audit Template

### Campaign: [Name]

**Basic Info:**
- Campaign ID:
- Industry/Segment:
- Tier: 1 / 2 / 3
- Total Leads:
- Status: Active / Paused / Completed

**Pre-Outreach Check:**
- [ ] Warmup completed before sequence start
- [ ] Account research documented
- [ ] Value assets available to share

**Email 1 Audit:**
- Ask Level: Pass / Fail
- Opening Line: Pass / Fail
- Value Delivery: Pass / Fail
- Personalization: Pass / Fail
- Length: Pass / Fail
- Tone: Pass / Fail
- **Score: ___/6**

**Sequence Structure:**
- Total emails in sequence: ___
- Trust ladder progression: Correct / Skips rungs
- Timing spacing: Appropriate / Too fast / Too slow
- Behavioral branching: Implemented / Missing

**Metrics:**
- Open Rate: ___% (Benchmark: 40-60%)
- Reply Rate: ___% (Benchmark: 10-20%)
- Meeting Rate: ___% (Benchmark: 3-5%)

**Diagnosis:**
- Primary issue:
- Secondary issue:
- Root cause:

**Recommendations:**
1.
2.
3.

## Bulk Audit Process (For 50+ Campaigns)

### Step 1: Categorize

Sort all campaigns into:
- **Active**: Currently sending
- **Paused**: Stopped but salvageable
- **Completed**: Finished, use for learning
- **Drafted**: Never launched, review or delete

### Step 2: Triage Active Campaigns

For each active campaign:
1. Check Email 1 ask level (30 seconds)
2. If Email 1 asks for meeting → PAUSE immediately
3. If Email 1 is value-first → Continue, schedule full audit

### Step 3: Prioritize Audit Order

Audit in this order:
1. Highest volume active campaigns (most leads affected)
2. Worst-performing active campaigns (lowest reply rates)
3. Best-performing campaigns (learn what works)
4. Paused campaigns (decide restart or archive)

### Step 4: Pattern Recognition

After auditing 10+ campaigns, look for patterns:
- Common Email 1 mistakes across campaigns
- Which industries have best/worst metrics
- Which sender/SDR has best performance
- Time-of-day patterns

### Step 5: Create Improvement Playbook

Based on patterns:
1. Write new Email 1 templates by industry
2. Define standard branching structure
3. Set timing rules
4. Create audit SOP for ongoing use

## SmartLead-Specific Audit Points

### Campaign Settings Check
- [ ] Track opens enabled
- [ ] Track clicks enabled
- [ ] Daily send limit appropriate (not too aggressive)
- [ ] Timezone set correctly for recipients

### Lead Quality Check
- [ ] Email verification status
- [ ] Bounce rate under 3%
- [ ] Unsubscribe rate under 1%
- [ ] No spam complaints

### Sequence Configuration Check
- [ ] Variables rendering correctly (no {{firstName}} in sent emails)
- [ ] Links working and tracked
- [ ] Unsubscribe link present
- [ ] Reply detection working

## Post-Audit Actions

### Immediate (This Week)
1. Pause any campaign with Email 1 meeting ask
2. Fix subject lines on active campaigns
3. Add missing behavioral branches

### Short-Term (2 Weeks)
1. Rewrite Email 1 for top 5 campaigns
2. Create industry-specific value assets
3. Implement warmup before new sequences

### Ongoing
1. Weekly metrics review
2. Monthly full audit of new campaigns
3. Quarterly pattern analysis
