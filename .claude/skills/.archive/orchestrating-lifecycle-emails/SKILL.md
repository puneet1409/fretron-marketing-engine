---
name: orchestrating-lifecycle-emails
description: Use this skill for behavioral email automation including onboarding sequences, product usage triggers, re-engagement campaigns, and churn prevention. Covers lifecycle stage mapping, trigger design, and personalization strategies. Invoke when building automated email flows, improving onboarding, or re-engaging inactive users.
---

# Orchestrating Lifecycle Emails for Fretron

Design behavioral email flows that respond to user actions and lifecycle stage.

## When to Use This Skill

- Building onboarding email sequences
- Creating product usage-triggered emails
- Designing re-engagement campaigns
- Preventing churn with proactive outreach
- Personalizing emails by user behavior

## Lifecycle Email Philosophy

**Key Insight**: The best lifecycle emails feel like a helpful human noticed something and reached out—not like a marketing automation.

**Principles**:
- Trigger on behavior, not just time
- Personalize based on what they've done
- Help, don't sell
- Match message to lifecycle stage

## Fretron Customer Lifecycle

### Lifecycle Stages

```
PROSPECT ────────────────────────────────────────────────►
Downloaded content, attended webinar, visited site
Goal: Qualify and convert to trial/demo

EVALUATOR ───────────────────────────────────────────────►
In demo/pilot phase, actively evaluating
Goal: Prove value, accelerate decision

NEW CUSTOMER ────────────────────────────────────────────►
First 90 days post-contract
Goal: Successful onboarding, first value

ACTIVE CUSTOMER ─────────────────────────────────────────►
Using product regularly, seeing value
Goal: Expand usage, increase stickiness

AT-RISK ─────────────────────────────────────────────────►
Usage declining, engagement dropping
Goal: Identify issues, prevent churn

CHURNED ─────────────────────────────────────────────────►
Cancelled or not renewed
Goal: Win back when timing is right
```

### Stage Detection

| Stage | Detection Criteria |
|-------|-------------------|
| Prospect | In CRM, no opportunity |
| Evaluator | Active opportunity, pilot in progress |
| New Customer | <90 days since go-live |
| Active | Regular logins, feature usage above threshold |
| At-Risk | Login frequency down 50%+, support tickets up |
| Churned | Subscription cancelled/expired |

## Behavioral Trigger Framework

### Trigger Categories

**Positive Triggers** (Celebrate + Advance):
- First login
- First successful shipment tracked
- Milestone reached (100 shipments, etc.)
- New feature adopted
- High engagement week

**Negative Triggers** (Help + Prevent):
- No login for X days
- Feature not used after training
- Error encountered
- Support ticket opened
- Usage pattern changed

**Time-Based Triggers** (Scheduled Check-ins):
- X days post-signup
- X days post-training
- Contract renewal approaching
- Quarterly business review due

### Trigger Design Template

```markdown
## Trigger: [Name]

**Type**: [Positive/Negative/Time-based]
**Stage**: [Which lifecycle stage]

**Condition**:
IF [specific behavior/criteria]
AND [additional conditions if any]
THEN send [email name]

**Email Goal**: [What this email should accomplish]

**Wait Period**: [Delay before sending]
**Suppress If**: [Conditions to NOT send]

**Example**:
IF user has not logged in for 14 days
AND user is in New Customer stage
AND user has completed onboarding
THEN send "We miss you" re-engagement email
WAIT: 0 days
SUPPRESS IF: Support ticket open in last 7 days
```

## Email Sequences by Stage

### Stage 1: Prospect Nurture

**Goal**: Build trust, qualify interest, convert to demo

**Sequence**:
```
Trigger: Downloaded lead magnet
├── Email 1 (Day 0): Deliver asset + quick value
├── Email 2 (Day 3): Related insight/tip
├── Email 3 (Day 7): Case study in their industry
├── Email 4 (Day 14): Quick question (qualify interest)
└── Email 5 (Day 21): Soft demo offer
```

**Email Templates**:

**Email 1: Asset Delivery**
```
Subject: Your [Asset Name] is ready

Hi [Name],

Here's the [asset name] you requested:
[Download link]

Quick tip: Start with [specific section] - that's where
most [role]s find the biggest insights.

Questions? Just reply to this email.

Best,
[Signature]
```

**Email 4: Qualification Question**
```
Subject: Quick question about [topic]

Hi [Name],

I noticed you downloaded our [asset] a couple weeks ago.

Curious - are you actively looking to improve [problem area],
or just staying informed for now?

Either way is fine! Just helps me know if there's anything
specific I can help with.

Best,
[Signature]
```

### Stage 2: Evaluator Engagement

**Goal**: Prove value during trial/pilot, enable champion

**Sequence**:
```
Trigger: Pilot kickoff
├── Day 1: Welcome + what to expect
├── Day 3: First milestone check-in
├── Day 7: Feature highlight based on use case
├── Day 14: Progress summary + value calculator
├── Day 21: Champion enablement content
└── Day 28: Business case co-creation offer
```

**Email Templates**:

**Day 1: Pilot Welcome**
```
Subject: Your Fretron pilot starts now

Hi [Name],

Welcome to your Fretron pilot! Here's what to expect:

Week 1: [Milestone 1]
Week 2: [Milestone 2]
Week 3: [Milestone 3]
Week 4: [Review and decision]

Your success team:
- CSM: [Name] ([email])
- Support: [contact info]

First step: [Specific action to take today]

Let's make this pilot a success!

Best,
[CSM Name]
```

**Day 14: Value Summary**
```
Subject: Your pilot so far: [X] shipments tracked

Hi [Name],

Here's what you've accomplished in your first 2 weeks:

📦 Shipments tracked: [X]
⏱️ Estimated time saved: [X] hours
📊 Visibility improvement: [X]%

Based on this trajectory, you're on track for:
- Annual time savings: [X] hours
- Estimated cost reduction: ₹[X]

Want to review these numbers together? [Calendar link]

Best,
[CSM Name]
```

### Stage 3: New Customer Onboarding

**Goal**: Drive adoption, create habits, achieve first value

**Sequence**:
```
Trigger: Contract signed
├── Day 0: Welcome + kickoff scheduling
├── Day 7: Post-training check-in
├── Day 14: First milestone celebration
├── Day 30: 30-day review invitation
├── Day 45: Advanced feature introduction
├── Day 60: Expansion conversation
└── Day 90: QBR scheduling
```

**Behavioral Triggers (Layered)**:
```
IF first_shipment_tracked THEN send "Congrats on your first shipment"
IF 100_shipments_reached THEN send "You've hit a milestone!"
IF feature_X_not_used AND 30_days_since_training THEN send "Feature reminder"
```

**Email Templates**:

**First Shipment Celebration**
```
Subject: 🎉 Your first shipment is live in Fretron!

Hi [Name],

Congratulations! You just tracked your first shipment in Fretron:

Shipment: [ID]
Origin: [Origin]
Destination: [Destination]
Status: [Current status]

This is the beginning of complete logistics visibility.

Pro tip: [Specific next step to take]

Questions? [CSM Name] is here to help.

Best,
The Fretron Team
```

### Stage 4: Active Customer Growth

**Goal**: Increase usage, expand to new use cases, drive advocacy

**Sequence**:
```
Monthly: Usage summary + tips
Quarterly: QBR invitation
Triggered: New feature announcements
Triggered: NPS survey (based on usage milestone)
Triggered: Referral request (high NPS score)
```

**Email Templates**:

**Monthly Usage Summary**
```
Subject: Your Fretron month in review

Hi [Name],

Here's your [Month] summary:

📦 Shipments: [X] (↑[X]% vs last month)
⏱️ Avg tracking time: [X] min (down from [X] min)
📊 OTIF: [X]%

Top performing lane: [Origin] → [Destination]
Opportunity spotted: [Specific insight]

Tip for next month: [Actionable suggestion]

See full report →

Best,
[CSM Name]
```

**Referral Request (After High NPS)**
```
Subject: Know someone who'd benefit from Fretron?

Hi [Name],

Thanks for the great feedback! It means a lot that Fretron
is making a difference for [Company].

If you know other logistics leaders who might benefit from
similar results, I'd love an introduction.

In return, we offer [referral benefit] for successful referrals.

Just reply with their name and I'll take it from there—or
forward this email to them directly.

Thanks for being a great customer!

Best,
[Signature]
```

### Stage 5: At-Risk Intervention

**Goal**: Identify issues early, provide help, prevent churn

**Triggers**:
```
IF login_frequency < 50%_of_previous_month THEN flag_at_risk
IF support_tickets > 3_in_30_days THEN flag_at_risk
IF feature_usage_declined > 30% THEN flag_at_risk
IF renewal_date < 90_days AND no_expansion_discussion THEN flag_at_risk
```

**Sequence**:
```
At-Risk Detected:
├── Day 0: Internal alert to CSM
├── Day 1: Soft check-in email (not accusatory)
├── Day 3: CSM phone call attempt
├── Day 7: Value reminder email (if no response)
└── Day 14: Executive escalation (if still no engagement)
```

**Email Templates**:

**Soft Check-In**
```
Subject: Everything okay?

Hi [Name],

I noticed it's been a few weeks since you logged into Fretron.

Just wanted to check in - is everything working okay?
Any challenges I can help with?

If you're just busy, no worries! But if something's off,
I'd rather know so we can fix it.

Reply or book a quick call: [Calendar link]

Best,
[CSM Name]
```

**Value Reminder**
```
Subject: Quick reminder of what you've accomplished

Hi [Name],

Sometimes it helps to step back and see the big picture.

Since you started with Fretron:
- Shipments tracked: [X]
- Estimated time saved: [X] hours
- Visibility improvement: [X]%

We're here to help you get even more value. What's one thing
that would make Fretron more useful for you?

Best,
[CSM Name]
```

### Stage 6: Churned Win-Back

**Goal**: Stay top-of-mind, win back when timing is right

**Sequence**:
```
Trigger: Churn confirmed
├── Day 0: Graceful exit + feedback request
├── Day 30: Check-in (how's the alternative?)
├── Day 90: New feature announcement (if relevant)
├── Day 180: "We've improved" update
└── Day 365: Anniversary check-in
```

**Email Templates**:

**Graceful Exit**
```
Subject: Thank you (and a quick favor)

Hi [Name],

I understand Fretron isn't the right fit right now, and
I respect that decision.

Before you go, I'd appreciate 2 minutes of honest feedback:
[Survey link]

Your input helps us improve for future customers.

If anything changes, we're here. All the best to you and
the team at [Company].

Best,
[Signature]
```

## Personalization Framework

### Data Points for Personalization

| Data | Use In Emails |
|------|---------------|
| Industry | Case studies, examples, benchmarks |
| Role | Pain points, benefits emphasized |
| Company size | Scale of examples, pricing references |
| Usage patterns | Feature tips, adoption nudges |
| Engagement level | Frequency, depth of content |

### Personalization Levels

**Level 1: Basic**
- Name, company
- Industry segment

**Level 2: Behavioral**
- Features used/not used
- Last login date
- Milestone progress

**Level 3: Predictive**
- At-risk scoring
- Expansion likelihood
- Feature recommendations

## Integration with Other Skills

- Use → `designing-email-sequences` for copy frameworks
- Apply → `matching-ask-to-trust` for appropriate CTAs
- Reference → `building-trust-progressively` for nurture logic
- Combine with → `enabling-champions` for champion stage emails
