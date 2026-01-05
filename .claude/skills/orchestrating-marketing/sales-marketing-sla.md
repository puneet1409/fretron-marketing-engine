# Sales-Marketing SLA Framework

Complete framework for marketing-sales alignment, lead handoff, and shared accountability.

---

## SLA Philosophy

### The Alignment Problem

```
MARKETING SAYS:          SALES SAYS:
"We gave you 100 leads"  "Those leads were garbage"
"Sales doesn't follow up" "Marketing doesn't understand"
"Pipeline is full"        "Nothing's qualified"
```

**The Fix**: Shared definitions, shared accountability, shared metrics.

### SLA Principles

1. **Shared Revenue Goal**: Both teams own the same number
2. **Clear Definitions**: What is an MQL? SQL? Everyone agrees.
3. **SLAs Cut Both Ways**: Marketing commits to quality, sales commits to follow-up
4. **Data Transparency**: Same dashboard, same truth
5. **Regular Cadence**: Weekly sync, monthly review, quarterly recalibration

---

## Lead Definitions

### Lead Lifecycle Stages

```
VISITOR → LEAD → MQL → SAL → SQL → OPPORTUNITY → CUSTOMER
    ↓        ↓      ↓     ↓      ↓         ↓
  Anon   Known  Qualified Accepted Qualified Pipeline
                by Mktg   by SDR   by AE
```

### Stage Definitions

**LEAD**:
- Known contact with at least email address
- Has engaged with at least one Fretron asset
- No qualification applied yet

**Marketing Qualified Lead (MQL)**:
- Lead score ≥60 (Fit score + Engagement score)
- Meets minimum ICP criteria:
  - Industry: Manufacturing (Steel/Cement/FMCG/Chemicals preferred)
  - Role: Logistics, Supply Chain, Operations, or Finance
  - Company size: 200-5000 employees
- Has demonstrated intent (demo request, pricing page, multiple content downloads)

**Sales Accepted Lead (SAL)**:
- SDR has attempted contact
- SDR confirms basic qualification
- SDR has scheduled or is pursuing discovery call

**Sales Qualified Lead (SQL)**:
- SDR has completed discovery call
- Meets BANT+T criteria:
  - Budget: Aware of investment required
  - Authority: Decision maker or clear path to decision maker
  - Need: Articulated pain point
  - Timeline: Active buying timeframe (≤6 months)
  - Trigger: Clear event driving the initiative
- Qualification score ≥10/15

**Opportunity**:
- AE has accepted handoff
- Demo scheduled or completed
- Entered in CRM as pipeline

---

## Lead Scoring Model

### Fit Score (0-50 Points)

| Attribute | Criteria | Points |
|-----------|----------|--------|
| Industry | Steel/Cement/FMCG | 15 |
| Industry | Other manufacturing | 10 |
| Industry | Non-manufacturing | 0 |
| Company Size | 501-5000 employees | 10 |
| Company Size | 201-500 employees | 7 |
| Company Size | <200 or >5000 | 3 |
| Revenue | ₹200-1000 Cr | 10 |
| Revenue | ₹100-200 Cr | 7 |
| Revenue | <₹100 Cr or >₹1000 Cr | 3 |
| Title | VP/Director level | 10 |
| Title | Manager level | 7 |
| Title | Individual contributor | 3 |
| Shipments | 100-500/day (estimated) | 5 |
| Shipments | 50-100/day | 3 |

### Engagement Score (0-50 Points)

| Behavior | Points | Decay |
|----------|--------|-------|
| Demo request | 20 | 90 days |
| Pricing page visit | 10 | 30 days |
| Case study download | 8 | 60 days |
| Webinar attendance | 8 | 60 days |
| Webinar registration (no show) | 3 | 30 days |
| ROI calculator usage | 8 | 60 days |
| Multiple content downloads (3+) | 5 | 60 days |
| Email opens (3+) | 3 | 30 days |
| Website visits (3+) | 3 | 30 days |
| LinkedIn engagement | 2 | 30 days |

### Score Interpretation

| Total Score | Grade | Classification | Action |
|-------------|-------|----------------|--------|
| 80-100 | A | Hot MQL | SDR contact within 5 minutes |
| 60-79 | B | Warm MQL | SDR contact within 1 hour |
| 40-59 | C | Cool Lead | Nurture + periodic SDR check |
| <40 | D | Cold Lead | Nurture only |

---

## Marketing Commitments

### Lead Quality SLA

| Metric | Commitment | Measurement |
|--------|------------|-------------|
| MQL Volume | [X] MQLs/month | Monthly count |
| MQL Acceptance Rate | ≥40% of MQLs become SALs | SAL/MQL ratio |
| Pipeline Contribution | ₹[X]L pipeline/quarter | Pipeline value from marketing leads |
| Lead Data Quality | ≥95% complete records | Required fields populated |

### Lead Response Data

Marketing commits to provide:
- Full contact information (name, title, email, phone, company)
- Lead source (specific campaign, content, channel)
- Engagement history (all touchpoints before MQL)
- Lead score breakdown (fit + engagement)
- Any known context (questions asked, content downloaded)

### Lead Handoff Process

**Immediate Notification**:
- MQL notification via CRM + Slack within 5 minutes
- All Grade A leads get phone + Slack alert
- Lead details accessible in CRM immediately

**Handoff Data Package**:
```
NEW MQL ALERT
─────────────────────────────────

Contact: [Name], [Title]
Company: [Company Name] | [Industry]
Lead Score: [X] (Fit: [X] / Engagement: [X])
Grade: [A/B/C]

Source: [Campaign/Channel]
Trigger: [Demo request / Content download / etc.]

Recent Engagement:
• [Date]: [Action]
• [Date]: [Action]
• [Date]: [Action]

Context:
[Any additional information from forms, chat, etc.]

─────────────────────────────────
REQUIRED: First contact within [X] minutes
```

---

## Sales Commitments

### Follow-Up SLA

| Lead Grade | First Attempt | Total Attempts | Timeframe |
|------------|---------------|----------------|-----------|
| Grade A (Hot) | 5 minutes | 8 attempts | 7 days |
| Grade B (Warm) | 1 hour | 6 attempts | 10 days |
| Grade C (Cool) | 24 hours | 4 attempts | 14 days |

### Attempt Cadence (Grade A Example)

| Attempt | Timing | Channel |
|---------|--------|---------|
| 1 | 0-5 min | Phone |
| 2 | 30 min | Email |
| 3 | 2 hours | Phone |
| 4 | Same day | LinkedIn |
| 5 | Day 2 | Phone |
| 6 | Day 3 | Email |
| 7 | Day 5 | Phone |
| 8 | Day 7 | Email (breakup) |

### SDR Activity SLA

| Metric | Daily Target | Weekly Target |
|--------|--------------|---------------|
| MQL Follow-ups | 100% same day | 100% of MQLs touched |
| Calls Made | 50+ | 250+ |
| Conversations | 10+ | 50+ |
| Discovery Calls | 2+ | 10+ |
| SQLs Generated | 1+ | 5+ |

### Lead Disposition SLA

SDRs must disposition every MQL within 7 days:

| Disposition | Definition | What Happens |
|-------------|------------|--------------|
| Qualified (SQL) | Meets all BANT+T criteria | Handoff to AE |
| Nurture | Interested but not ready | Return to marketing nurture |
| Disqualified | Bad fit or not interested | Document reason, close lead |
| Unable to Reach | 8 attempts, no response | Auto-nurture sequence |

### Disposition Notes Requirement

Every disposition must include:
1. Summary of conversations (if any)
2. Specific reason for disposition
3. Recommended next steps
4. Timeline for re-engagement (if applicable)

---

## AE Commitments

### Handoff Acceptance SLA

| Metric | Commitment |
|--------|------------|
| SQL Review Time | Within 4 hours of handoff |
| Acceptance/Rejection | Within 24 hours |
| Demo Scheduling | Within 48 hours of acceptance |

### Rejection Protocol

If AE rejects an SQL, they must provide:
1. Specific reason for rejection
2. Recommendation (re-qualify, nurture, disqualify)
3. Feedback call with SDR (within 48 hours)

### SQL Rejection Categories

| Category | Definition | Action |
|----------|------------|--------|
| Wrong Fit | Company doesn't match ICP | Review fit scoring |
| Not Ready | No active project/budget | Return to nurture |
| Misqualified | BANT+T criteria not actually met | SDR coaching |
| Competitor Committed | Already chose competitor | Competitive intel capture |
| Already in Pipeline | Duplicate from existing opp | Merge records |

### Rejection Rate Thresholds

- Healthy: <20% rejection rate
- Concern: 20-30% rejection rate (requires review)
- Critical: >30% rejection rate (emergency alignment session)

---

## Shared Metrics Dashboard

### Weekly Scorecard

```
MARKETING-SALES ALIGNMENT SCORECARD
Week of: [Date]

─────────────────────────────────────

MARKETING PERFORMANCE
MQLs Generated: [#] (Target: [#])
MQL Quality Score: [%] accepted
Pipeline Sourced: ₹[X]L (Target: ₹[X]L)
Grade A MQLs: [%] of total
Data Quality: [%] complete records

─────────────────────────────────────

SALES PERFORMANCE
Speed-to-Lead (Avg): [X] minutes (Target: <5 min)
Follow-Up Compliance: [%] within SLA
SQLs Created: [#] (from [#] MQLs)
MQL→SQL Rate: [%] (Target: 40%+)
SQL Rejection Rate: [%] (Target: <20%)

─────────────────────────────────────

PIPELINE HEALTH
New Pipeline: ₹[X]L
Marketing-Sourced: ₹[X]L ([%])
Velocity (Avg Days): [#]

─────────────────────────────────────

SLA COMPLIANCE
Marketing SLA: [%] compliant
Sales SLA: [%] compliant
Overall Health: [GREEN/YELLOW/RED]
```

### Metric Definitions

**Marketing SLA Compliance**:
- MQL volume ≥90% of target
- Acceptance rate ≥40%
- Data quality ≥95%

**Sales SLA Compliance**:
- Speed-to-lead within target for 90%+ of leads
- All MQLs dispositoned within 7 days
- SQL rejection rate <20%
- Activity metrics at 90%+ of target

---

## Meeting Cadence

### Daily Stand-Up (10 min)

**Attendees**: SDR team lead, Marketing ops
**Agenda**:
- Hot leads from yesterday (any issues?)
- Lead quality feedback (patterns?)
- Today's priorities

### Weekly Alignment (30 min)

**Attendees**: SDR team, Marketing manager, Sales manager
**Agenda**:
1. Review weekly scorecard (10 min)
2. Lead quality discussion (10 min)
   - Which leads converted?
   - Which leads were rejected? Why?
   - Pattern observations
3. Campaign feedback (5 min)
   - What messaging resonated?
   - What objections came up?
4. Next week priorities (5 min)

### Monthly Review (60 min)

**Attendees**: VP Sales, Marketing Director, SDR Manager, Marketing Ops
**Agenda**:
1. Monthly metrics review (15 min)
2. Funnel analysis (15 min)
3. SLA performance review (10 min)
4. Campaign effectiveness (10 min)
5. Process improvements (10 min)

### Quarterly Business Review (2 hours)

**Attendees**: Leadership team
**Agenda**:
1. Quarterly performance vs. goals
2. Attribution analysis
3. SLA recalibration
4. Next quarter planning
5. Resource allocation

---

## Escalation Process

### Issue Categories

**Level 1: Process Issues**
- Occasional missed SLA
- Data quality issues
- Minor handoff friction
- **Resolution**: Weekly alignment meeting

**Level 2: Pattern Issues**
- Consistent SLA misses (3+ weeks)
- Persistent quality complaints
- Lead flow problems
- **Resolution**: Manager-to-manager discussion

**Level 3: Systemic Issues**
- SLA failure >50%
- Major quality degradation
- Complete breakdown in process
- **Resolution**: Leadership escalation within 24 hours

### Escalation Template

```
ESCALATION NOTICE
─────────────────────────────────────

Issue Type: [Level 1/2/3]
Raised By: [Name, Team]
Date: [Date]

Issue Description:
[Clear, factual description of the problem]

Data/Evidence:
[Specific metrics, examples, or patterns]

Impact:
[Business impact of the issue]

Proposed Resolution:
[Suggested fix or discussion topics]

Requested Action:
[What you're asking for]

─────────────────────────────────────
```

---

## Feedback Loops

### Lead Quality Feedback

**SDR → Marketing (Continuous)**:
- Flag leads with incorrect data
- Note objections/feedback from calls
- Identify content gaps (questions without answers)

**Weekly Summary**:
```
LEAD QUALITY FEEDBACK
Week of: [Date]

POSITIVE PATTERNS:
• [Source/Campaign] leads converting well because [reason]
• [Industry] prospects particularly receptive to [message]

CONCERNS:
• [Source/Campaign] generating low-quality leads: [specific issue]
• Missing information: [what's needed]
• Messaging disconnect: [what prospects actually say]

CONTENT REQUESTS:
• Need materials on [topic]
• Case study for [industry/use case] would help

OBJECTION PATTERNS:
• Hearing [objection] frequently - need response
```

### Campaign Effectiveness Feedback

**Sales → Marketing (Post-Campaign)**:
```
CAMPAIGN FEEDBACK REPORT
Campaign: [Name]
Period: [Dates]

LEAD QUALITY:
Total Leads: [#]
Qualified: [%]
Quality Rating: [1-5]

WHAT WORKED:
• [Specific element that resonated]

WHAT DIDN'T:
• [Specific element that fell flat]

OBJECTIONS ENCOUNTERED:
• [Common objection 1]
• [Common objection 2]

SUGGESTIONS:
• [Improvement for next time]
```

---

## SLA Recalibration

### When to Recalibrate

- Quarterly (standard)
- After major process changes
- After significant market shifts
- When targets are consistently over/under-achieved

### Recalibration Process

1. **Data Collection** (Week 1)
   - Pull all SLA metrics for period
   - Identify outliers and trends
   - Gather qualitative feedback

2. **Analysis** (Week 2)
   - What's working? Why?
   - What's not working? Why?
   - External factors?

3. **Proposal** (Week 3)
   - Draft updated SLAs
   - Model impact of changes
   - Socialize with stakeholders

4. **Approval** (Week 4)
   - Leadership sign-off
   - Communication plan
   - Implementation date

### Recalibration Meeting Template

```
SLA RECALIBRATION REVIEW
Quarter: [Q# Year]

─────────────────────────────────────

CURRENT SLA PERFORMANCE

│ SLA Item              │ Target │ Actual │ Status │
├───────────────────────┼────────┼────────┼────────┤
│ MQL Volume            │ [#]    │ [#]    │ [✓/✗]  │
│ MQL Acceptance Rate   │ 40%    │ [%]    │ [✓/✗]  │
│ Speed-to-Lead (A)     │ 5 min  │ [X]min │ [✓/✗]  │
│ SQL Rate              │ 40%    │ [%]    │ [✓/✗]  │
│ Rejection Rate        │ <20%   │ [%]    │ [✓/✗]  │

─────────────────────────────────────

PROPOSED CHANGES

│ SLA Item       │ Current │ Proposed │ Rationale      │
├────────────────┼─────────┼──────────┼────────────────┤
│ [Item]         │ [Value] │ [Value]  │ [Reason]       │

─────────────────────────────────────

IMPACT ANALYSIS

If we make these changes:
• Pipeline impact: [+/-X%]
• Resource impact: [Description]
• Risk: [Description]

─────────────────────────────────────

DECISION

□ Approved as proposed
□ Approved with modifications: [Details]
□ Rejected: [Reason]

Signed: [VP Sales]  [Marketing Director]
Date: [Date]
```

---

## Technology Requirements

### CRM Configuration

**Required Fields**:
- Lead Source (dropdown with campaign tracking)
- Lead Score (auto-calculated)
- Lead Grade (A/B/C/D)
- First Touch Date
- MQL Date
- SAL Date
- SQL Date
- Disposition (with reason codes)
- First Attempt Date/Time
- Total Attempts
- Last Attempt Date

**Automation Required**:
- Lead score calculation (real-time)
- MQL alerts (Slack + email)
- Speed-to-lead timer (auto-start on MQL)
- SLA compliance tracking
- Auto-nurture enrollment (for recycled leads)

### Reporting Requirements

**Daily Reports**:
- New MQLs by grade
- Open MQLs past SLA
- Speed-to-lead violations

**Weekly Reports**:
- Full scorecard (automated)
- Conversion funnel
- SLA compliance summary

**Monthly Reports**:
- Trend analysis
- Source attribution
- Campaign ROI

---

## SLA Agreement Template

```
MARKETING-SALES SERVICE LEVEL AGREEMENT
Effective Date: [Date]
Review Date: [Quarterly]

─────────────────────────────────────

PARTIES

Marketing Team: [Name, Title]
Sales Team: [Name, Title]

─────────────────────────────────────

SHARED GOAL

Generate ₹[X]L in marketing-sourced pipeline per quarter.

─────────────────────────────────────

MARKETING COMMITMENTS

1. Deliver [X] MQLs per month, graded A-D
2. Maintain ≥40% MQL acceptance rate
3. Provide complete lead data within 5 minutes
4. Respond to quality feedback within 48 hours

─────────────────────────────────────

SALES COMMITMENTS

1. Contact Grade A leads within 5 minutes
2. Contact all MQLs within SLA timeframe
3. Disposition all leads within 7 days
4. Maintain <20% SQL rejection rate
5. Provide weekly quality feedback

─────────────────────────────────────

MEETING CADENCE

• Daily: 10-min lead sync
• Weekly: 30-min alignment
• Monthly: 60-min review
• Quarterly: 2-hour business review

─────────────────────────────────────

ESCALATION

Issues escalated to VP level if:
• SLA compliance <80% for 2+ weeks
• Rejection rate >30%
• No resolution from manager discussions

─────────────────────────────────────

SIGNATURES

Marketing: _________________ Date: _______
Sales: _________________ Date: _______
Approved: _________________ Date: _______
```
