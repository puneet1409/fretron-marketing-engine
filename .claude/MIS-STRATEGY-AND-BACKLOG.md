# Sales & Marketing MIS Strategy

## Research Synthesis: Modern B2B SaaS MIS Best Practices (2025)

### Key Trends

1. **Data-Driven Leadership is Mandatory**
   - By 2026, 65% of B2B sales organizations using data-driven strategies will outpace those running on gut instinct
   - 69% of B2B sales reps missed quota in 2024/2025 - proper KPI tracking is critical
   - Companies with weekly pipeline velocity tracking achieve **34% revenue growth** vs 11% for irregular tracking

2. **Activity Metrics That Matter**
   - SDRs average **40 calls + 40 emails per day**
   - Reps spend only **28% of their time actually selling** (Salesforce State of Sales)
   - Average B2B response time is **42 hours** - far too slow
   - **25-40% of meetings** should convert to qualified opportunities

3. **Multi-Channel Attribution Evolution**
   - 90% of teams still use basic single/multi-touch attribution - this is failing
   - AI-powered predictive attribution is becoming essential
   - Account-level attribution (vs individual) critical for enterprise B2B
   - Multi-channel campaigns drive **5x higher ROI** than single-channel

4. **Adaptive Notifications (Nudge Theory)**
   - Personalized push notifications improve **click-through rates by 300%**
   - Nudges must target System 1 thinking (fast, intuitive)
   - Reducing cognitive load is critical - bite-sized, prioritized
   - Loss aversion > gain seeking for behavior change

---

## Current State Analysis: Fretron Sales Team

### What Exists
- HubSpot audit scripts in `tools/hubspot-audit/`
- Owner activities report showing 0 logged activities for Avinash and Abhishek
- SmartLead email sequences (not synced to HubSpot)
- Gap analysis between Avinash's weekly updates and HubSpot data

### Critical Issues Identified
1. **No activity logging** - Last logged call/meeting from July 2020
2. **Stage mismatches** - 5+ deals at wrong stages
3. **Missing deals** - 7+ active engagements not in HubSpot
4. **No notes** - Lost deal context
5. **SmartLead disconnect** - Email activity invisible in HubSpot

### The Root Problem
> "AI can only auto-generate ~15% of the update with current HubSpot data."

AEs know their deals but aren't logging in HubSpot. The gap is **data entry**, not knowledge.

---

## The Vision: Intelligent Sales & Marketing MIS

### Core Principles

1. **Automate the Trackable, Nudge the Rest**
   - Auto-capture what we can (emails, meetings via calendar sync)
   - Smart nudges for what requires human input (notes, stage updates)

2. **Adaptive Over Overwhelming**
   - Start small, expand based on responsiveness
   - If ignored, reduce frequency and simplify asks
   - Focus on the single most important action

3. **Trust-First, Compliance-Second**
   - Frame as "enablement" not "surveillance"
   - Show the benefit (auto-generated reports) before the ask

4. **Leading Indicators Over Lagging**
   - Track activities that predict outcomes
   - Don't wait until a deal is lost to notice

---

## Comprehensive Backlog

### Epic 1: HubSpot Compliance Engine
*Goal: Ensure CRM data quality for AI automation*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| HC-1 | Auto-detect deals with stage mismatch (HubSpot vs reality signals) | P0 | M | High |
| HC-2 | Daily deal staleness check (no activity > X days) | P0 | S | High |
| HC-3 | Missing notes detector (deals in late stage with no notes) | P0 | S | High |
| HC-4 | Scheduled activity audit (weekly report generation) | P1 | M | Medium |
| HC-5 | SmartLead ↔ HubSpot sync verification | P1 | L | High |
| HC-6 | Duplicate contact/company detection | P2 | M | Medium |
| HC-7 | Required field enforcement by stage | P1 | M | High |

### Epic 2: Adaptive Notification System
*Goal: Behavior-aware, non-overwhelming nudges*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| AN-1 | Daily end-of-day digest (single email, prioritized actions) | P0 | M | High |
| AN-2 | Responsiveness tracking (who acts on nudges) | P1 | M | High |
| AN-3 | Adaptive frequency (reduce if ignored, increase if responsive) | P1 | L | High |
| AN-4 | Single-action focus (one CTA, not a list) | P0 | S | High |
| AN-5 | Positive reinforcement ("You logged 5 calls this week!") | P2 | S | Medium |
| AN-6 | Escalation path (notify manager if critical and ignored) | P2 | M | Medium |
| AN-7 | Slack/Teams integration option | P2 | M | Medium |

### Epic 3: Sales MIS Dashboard & Reports
*Goal: Automated weekly/monthly reporting*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| SM-1 | Weekly deal momentum report (auto-generated from HubSpot) | P0 | L | High |
| SM-2 | Activity scorecard per AE (calls, emails, meetings, notes) | P0 | M | High |
| SM-3 | Pipeline coverage tracker (current vs target) | P1 | M | High |
| SM-4 | Deal velocity analysis (days in each stage) | P1 | M | Medium |
| SM-5 | Win/loss analysis with reasons | P2 | L | Medium |
| SM-6 | Forecast accuracy tracking | P2 | L | Medium |
| SM-7 | AE leaderboard (gamification) | P3 | M | Low |

### Epic 4: Marketing MIS & Attribution
*Goal: Multi-channel campaign tracking and attribution*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| MA-1 | Lead source tracking across channels | P0 | M | High |
| MA-2 | First-touch attribution model | P1 | M | Medium |
| MA-3 | Multi-touch attribution (time-decay) | P2 | L | High |
| MA-4 | Campaign ROI calculator | P1 | M | High |
| MA-5 | Channel performance dashboard | P1 | M | Medium |
| MA-6 | ABM campaign attribution (account-level) | P2 | L | High |
| MA-7 | AI-powered budget allocation recommendations | P3 | XL | High |

### Epic 5: Sales-Marketing Alignment
*Goal: Unified funnel visibility and shared metrics*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| SA-1 | MQL → SQL → Opportunity conversion tracking | P0 | M | High |
| SA-2 | Lead handoff SLA monitoring | P1 | M | Medium |
| SA-3 | Marketing-sourced vs Sales-sourced pipeline split | P1 | S | Medium |
| SA-4 | Joint pipeline review dashboard | P1 | M | High |
| SA-5 | Lead quality feedback loop (sales → marketing) | P2 | M | High |
| SA-6 | RevOps unified metrics framework | P2 | L | High |

### Epic 6: AE Enablement Tools
*Goal: Make good behavior the easy behavior*

| ID | Story | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| AE-1 | Pre-call brief generation (auto-compiled context) | P1 | L | High |
| AE-2 | Post-call quick-log interface (mobile-friendly) | P0 | M | High |
| AE-3 | Meeting prep package (company intel + talking points) | P1 | L | High |
| AE-4 | Deal risk alerts (going cold, competitor mentioned) | P1 | M | Medium |
| AE-5 | Next-best-action recommendations | P2 | L | Medium |
| AE-6 | Automated follow-up reminders | P1 | M | Medium |

---

## Priority Matrix

### Phase 1: Foundation (Weeks 1-4)
*"Make compliance visible and easy"*

| Item | Why First |
|------|-----------|
| HC-1: Stage mismatch detection | Biggest data quality issue |
| HC-2: Deal staleness check | Prevents deals going cold |
| AN-1: Daily digest email | Single touchpoint, not overwhelming |
| AN-4: Single-action focus | Reduces cognitive load |
| AE-2: Post-call quick-log | Reduces friction for logging |
| SM-2: Activity scorecard | Shows baseline, enables improvement |

### Phase 2: Automation (Weeks 5-8)
*"Generate value from the data"*

| Item | Why Second |
|------|------------|
| SM-1: Weekly deal momentum report | The prize for good data |
| HC-4: Scheduled activity audit | Ongoing visibility |
| AN-2: Responsiveness tracking | Learn who responds |
| MA-1: Lead source tracking | Foundation for attribution |
| SA-1: Funnel conversion tracking | Marketing-sales alignment |

### Phase 3: Intelligence (Weeks 9-12)
*"Predict and optimize"*

| Item | Why Third |
|------|-----------|
| AN-3: Adaptive frequency | Personalize nudge behavior |
| AE-1: Pre-call briefs | Value exchange for data |
| SM-4: Deal velocity analysis | Identify bottlenecks |
| MA-2: First-touch attribution | Channel effectiveness |
| AE-4: Deal risk alerts | Proactive intervention |

### Phase 4: Advanced (Weeks 13+)
*"Full RevOps maturity"*

| Item | Why Later |
|------|-----------|
| MA-3: Multi-touch attribution | Requires data foundation |
| SA-6: RevOps unified metrics | Org-wide alignment |
| MA-7: AI budget recommendations | Requires historical data |
| SM-6: Forecast accuracy | Requires baseline |

---

## KPI Framework

### Weekly Sales MIS KPIs

| KPI | Definition | Target | Frequency |
|-----|------------|--------|-----------|
| **Activity Volume** |
| Calls logged | Total calls logged in HubSpot | 15/week/AE | Weekly |
| Emails logged | Total emails logged | 20/week/AE | Weekly |
| Meetings held | Total meetings completed | 3/week/AE | Weekly |
| Notes added | Deal notes logged | 5/week/AE | Weekly |
| **Pipeline Health** |
| Deals touched | Deals with activity this week | 80% of active | Weekly |
| Stage progressions | Deals moved forward | 3+/week | Weekly |
| New deals created | New opportunities entered | 2+/week | Weekly |
| Stale deals | Deals with no activity >14 days | <20% | Weekly |
| **Velocity** |
| Response time | Time to first response on inbound | <4 hours | Weekly |
| Stage duration | Avg days in current stage | Varies by stage | Weekly |

### Monthly Sales MIS KPIs

| KPI | Definition | Target | Benchmark |
|-----|------------|--------|-----------|
| **Performance** |
| Quota attainment | Closed revenue / quota | 100% | 31% hit in 2024 |
| Win rate | Won / (Won + Lost) | 30%+ | 21% B2B avg |
| Pipeline coverage | Open pipeline / monthly target | 3-5x | Varies by cycle |
| **Efficiency** |
| Sales velocity | (Opps × Value × Win%) / Cycle | Trend up | Company-specific |
| CAC | Cost to acquire customer | < LTV/3 | Industry varies |
| Time to close | Avg days from created to won | Trend down | Company-specific |

### Marketing MIS KPIs

| KPI | Channel/Campaign | Frequency |
|-----|------------------|-----------|
| **Lead Generation** |
| Leads generated | By source | Weekly |
| MQL rate | Leads → MQL conversion | Weekly |
| SQL rate | MQL → SQL conversion | Weekly |
| **Channel Performance** |
| LinkedIn organic engagement | Impressions, clicks, follows | Weekly |
| Email campaign metrics | Open, click, reply rates | Per campaign |
| Content downloads | By asset | Weekly |
| ABM account engagement | By cluster | Weekly |
| **Attribution** |
| First-touch by channel | % of closed-won | Monthly |
| Multi-touch influence | Touchpoints before close | Monthly |
| Campaign ROI | Revenue / spend | Monthly |

### Role-Specific KPIs

| Role | Primary KPIs | Secondary KPIs |
|------|--------------|----------------|
| **AE (Closer)** | Quota attainment, Win rate, Avg deal size | Pipeline coverage, Stage velocity, Activity volume |
| **SDR (Opener)** | Meetings set, SQL generated, Activity volume | Response rate, Call-to-meeting ratio |
| **Marketing** | MQLs, Campaign ROI, Pipeline influenced | Content engagement, Channel performance |
| **RevOps** | Forecast accuracy, Data quality, Process adherence | System adoption, Report timeliness |

---

## Adaptive Notification Design

### The Philosophy: Nudge, Don't Nag

Based on behavioral science research:

1. **Personalization**: 300% improvement in action rates
2. **Single focus**: One clear CTA, not a list
3. **Loss framing**: "Deal X hasn't been updated" > "Update your deals"
4. **Immediate value**: Show what they'll get (auto-report) for what you ask

### Notification Hierarchy

```
Level 1: Gentle Nudge (Day 1)
├── Single priority action
├── Benefit framing ("So your report generates automatically")
├── One-tap action if possible

Level 2: Reminder (Day 3)
├── Same action if not completed
├── Add urgency ("2 days since last activity on ₹50L deal")
├── Still single focus

Level 3: Summary (Day 5)
├── List of pending items (max 3)
├── Highlight consequences ("X deals may go cold")
├── Manager cc option

Level 4: Escalation (Day 7+)
├── Manager notified directly
├── Framed as "support needed" not "compliance failure"
```

### Responsiveness Tracking

```typescript
interface AEProfile {
  responsiveness_score: number;  // 0-100
  preferred_channel: 'email' | 'slack' | 'hubspot';
  best_time: string;  // When they usually respond
  action_patterns: {
    logs_after_calls: boolean;
    updates_notes: boolean;
    moves_stages: boolean;
  };
  notification_config: {
    frequency: 'daily' | 'twice_weekly' | 'weekly';
    max_items: 1 | 3 | 5;
    escalation_threshold: number;  // days before escalate
  };
}
```

### Adaptive Rules

| Behavior Pattern | Adjustment |
|-----------------|------------|
| Acts on 80%+ of nudges | Increase items per digest, reduce urgency |
| Acts on 50-80% | Standard frequency |
| Acts on 20-50% | Single-item focus, reduce frequency |
| Acts on <20% | Weekly summary only, escalation earlier |
| Never acts | Manager notification, skip AE direct |

### Sample Daily Digest

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Your Day-End Update | Avinash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 TOP PRIORITY
───────────────────────────────────────────────────
Forace Group (₹15.2L)
Last touched: 18 days ago
You mentioned: "Shortlisted to final 2, F2F this week"
HubSpot shows: Problem Identification

→ [Update Stage] [Add Note] [Skip - Not Ready]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ TODAY'S WINS
───────────────────────────────────────────────────
• Logged 3 calls (target: 3) ✓
• Updated Emami Paper → Closed Won ✓

📈 THIS WEEK SO FAR
───────────────────────────────────────────────────
Calls: 8/15 | Emails: 12/20 | Notes: 2/5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Implementation Architecture

### Skill/Tool Structure

```
.claude/
├── subagents/
│   ├── mis/
│   │   ├── SUBAGENT.md
│   │   ├── workflows/
│   │   │   ├── daily-compliance-check.md
│   │   │   ├── weekly-report-generation.md
│   │   │   ├── adaptive-notification.md
│   │   │   └── deal-risk-analysis.md
│   │   └── prompts/
│   │       ├── digest-generation.md
│   │       └── activity-scoring.md
│   │
├── skills/
│   ├── sales-mis-tracking/
│   │   └── SKILL.md
│   ├── marketing-attribution/
│   │   └── SKILL.md
│   └── hubspot-compliance/
│       └── SKILL.md
│
└── mis-state/
    ├── ae-profiles/
    │   ├── avinash.json
    │   └── abhishek.json
    ├── notification-history/
    └── compliance-snapshots/
```

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   HubSpot       │     │  SmartLead      │     │  LinkedIn       │
│   (Deals, Contacts,   │ (Email sequences)│     │  (Engagement)   │
│    Activities)  │     └────────┬────────┘     └────────┬────────┘
└────────┬────────┘              │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     MIS Subagent        │
                    │  (Daily Compliance Check) │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  AE Profiles    │     │  Compliance     │     │  Reports        │
│  (Responsiveness)│     │  Snapshots      │     │  (Weekly/Monthly)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Adaptive Notification  │
                    │  Engine                 │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Daily Digest   │     │  Slack Alert    │     │  Manager        │
│  (Email)        │     │  (If configured) │     │  Escalation     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Sources

### Sales Metrics & Benchmarks
- [Top B2B Sales KPIs for 2025 - Martal](https://martal.ca/sales-kpis-lb/)
- [25 SaaS KPIs to Track - Valiotti Analytics](https://valiotti.com/blog/kpis-for-a-growing-saas-business/)
- [15 Sales Rep Productivity Metrics - Outdoo AI](https://www.outdoo.ai/blog/sales-rep-productivity-metrics)
- [31 B2B Sales KPIs - Default](https://www.default.com/post/b2b-sales-kpis)

### Multi-Channel Attribution
- [State of B2B Marketing Attribution 2025 - RevSure](https://www.revsure.ai/resources/whitepapers/the-state-of-b2b-marketing-attribution-2025)
- [Multi-Channel Marketing for B2B SaaS - Kalungi](https://www.kalungi.com/blog/multi-channel-marketing-b2b-saas-companies)
- [AI Marketing Mix Modeling - Winsome](https://winsomemarketing.com/saas-marketing/ai-marketing-mix-modeling-for-saas-optimizing-budget-across-channels)

### HubSpot & CRM Best Practices
- [HubSpot Security & Compliance - Huble](https://huble.com/blog/hubspot-security-compliance)
- [HubSpot Sales Activity Tracking - Sera](https://blog.seraleads.com/kb/optimized-sales-workflows/hubspot-sales-activities/)
- [HubSpot Automation Workflows - Default](https://www.default.com/post/hubspot-automation-workflows)

### Nudge Theory & Behavior
- [Nudge Theory - Wikipedia](https://en.wikipedia.org/wiki/Nudge_theory)
- [Nudge Notifications - Superworks](https://superworks.com/glossary/nudge-notifications/)
- [Dista Contextual Nudges](https://dista.ai/blog/dista-releases-nudge-feature/)

### Revenue Operations
- [B2B SaaS Revenue Dashboards 2025 - Ziggy](https://ziggy.agency/resource/why-your-b2b-saas-business-needs-a-revenue-demand-gen-dashboard-essential-features-for-2025/)
- [RevOps Metrics - TripleDart](https://www.tripledart.com/revops/revenue-operations-metrics)
- [10 B2B Sales Dashboards - Coefficient](https://coefficient.io/sales-operations/sales-dashboards)
