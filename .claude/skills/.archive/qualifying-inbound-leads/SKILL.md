---
name: qualifying-inbound-leads
description: Use this skill for scoring and qualifying inbound demo requests, form submissions, and inquiries. Covers lead scoring frameworks, qualification criteria, routing logic, and research synthesis. Invoke when evaluating leads, building scoring models, or creating qualification playbooks.
---

# Qualifying Inbound Leads for Fretron

Score and classify inbound leads with reasoning and recommended actions.

## When to Use This Skill

- Evaluating a specific demo request
- Building/updating lead scoring model
- Creating qualification criteria
- Designing lead routing logic
- Training SDRs on qualification

## Fretron Lead Qualification Framework

### ICP Fit Criteria

**Firmographic Fit (40 points max)**:

| Criterion | Excellent (10) | Good (7) | Okay (4) | Poor (0) |
|-----------|----------------|----------|----------|----------|
| Revenue | ₹200-1000 Cr | ₹100-200 Cr or ₹1000-2000 Cr | ₹50-100 Cr | <₹50 Cr or >₹2000 Cr |
| Industry | Steel, Cement, Manufacturing | FMCG, Auto Parts, Chemical | Retail, Pharma | Services, Non-logistics |
| Shipments | 100-500/day | 50-100 or 500-1000/day | 20-50/day | <20/day |
| Geography | India multi-plant | India single plant | India + International | International only |

**Behavioral Signals (30 points max)**:

| Signal | High (10) | Medium (5) | Low (2) | None (0) |
|--------|-----------|------------|---------|----------|
| Engagement | Multiple pages, demo video, pricing | 2-3 pages | Single page | Form only |
| Content | Downloaded guide + case study | Downloaded one asset | Blog reader | None |
| Urgency | "Evaluating now", "Project approved" | "Planning for Q[X]" | "Exploring options" | "Just curious" |

**Role/Authority (30 points max)**:

| Role | Score | Notes |
|------|-------|-------|
| VP/Director Logistics/Supply Chain | 30 | Decision maker |
| Head of Operations | 25 | Strong influencer |
| CFO/COO | 25 | Budget authority |
| Manager level | 15 | Champion potential |
| IT/Tech lead | 10 | Influencer |
| Analyst/Executive | 5 | Researcher |
| Student/Consultant | 0 | Not a buyer |

### Lead Score Interpretation

| Score | Classification | Action |
|-------|----------------|--------|
| 80-100 | Hot | Immediate sales follow-up (<2 hours) |
| 60-79 | Warm | SDR follow-up (same day) |
| 40-59 | Cool | Nurture sequence + SDR outreach |
| 20-39 | Cold | Marketing nurture only |
| <20 | Disqualified | No follow-up / archive |

## Lead Qualification Process

### Step 1: Initial Classification

**When a lead comes in, immediately check:**

```markdown
## Quick Classification

**Source**: [Where they came from]
**Form Data**: [What they submitted]

### Instant Disqualifiers
- [ ] Student/academic email
- [ ] Competitor company
- [ ] Wrong geography (outside India)
- [ ] Wrong industry (no logistics need)
- [ ] Consultant doing research

If any checked → Disqualify, no follow-up
```

### Step 2: Research & Enrichment

**Company Research (5 minutes)**:
- Company website → Revenue estimate, industry, locations
- LinkedIn company page → Employee count, recent news
- LinkedIn search → Identify logistics/supply chain team

**Contact Research (3 minutes)**:
- LinkedIn profile → Role, tenure, background
- Mutual connections → Warm intro possibility
- Recent activity → What they're interested in

### Step 3: Scoring

```markdown
## Lead Score: [Company Name]

**Contact**: [Name], [Title]
**Date**: [Submission date]

### Firmographic Fit
- Revenue: [Estimate] → [X] points
- Industry: [Industry] → [X] points
- Shipments: [Estimate] → [X] points
- Geography: [Locations] → [X] points
**Firmographic Total**: [X]/40

### Behavioral Signals
- Engagement: [What they did on site] → [X] points
- Content: [What they downloaded] → [X] points
- Urgency: [What they indicated] → [X] points
**Behavioral Total**: [X]/30

### Role/Authority
- Title: [Title] → [X] points
**Role Total**: [X]/30

### TOTAL SCORE: [X]/100
### Classification: [Hot/Warm/Cool/Cold/Disqualified]
```

### Step 4: Reasoning Summary

**Write 2-3 sentence summary for sales**:

```markdown
## Lead Summary: [Company Name]

**Score**: [X]/100 ([Classification])

**Why this score**: [Company] is a [size] [industry] company with
[shipment volume]. [Contact name] is [title] which [gives/limits]
buying authority. [They indicated/showed] [urgency signal].

**Recommended action**: [Specific next step]

**Watch out for**: [Any concerns or questions to clarify]
```

## Qualification Questions

### Discovery Questions (For SDR Call)

**Situation**:
- "Can you tell me about how you manage logistics today?"
- "How many shipments do you handle daily?"
- "What systems are you currently using?"

**Problem**:
- "What prompted you to reach out now?"
- "What's not working about your current approach?"
- "How is this impacting the business?"

**Implication**:
- "What happens if this doesn't get solved?"
- "How much time/money is this costing?"
- "Who else is affected by this?"

**Timeline**:
- "When are you looking to make a decision?"
- "Is there a specific event driving this timeline?"
- "What needs to happen before you can move forward?"

**Authority**:
- "Who else is involved in evaluating solutions?"
- "What's the approval process for a project like this?"
- "Have you allocated budget for this initiative?"

### Disqualification Signals

**Red Flags During Conversation**:
- "Just exploring" with no timeline
- Can't articulate specific problem
- No budget discussion possible
- Decision maker unavailable and won't engage
- Looking for free consulting
- Competitor doing research

## Lead Routing Logic

### Routing Rules

```
IF Score >= 80 (Hot)
  → Route to AE immediately
  → Alert in Slack #hot-leads
  → SLA: Contact within 2 hours

IF Score 60-79 (Warm)
  → Route to SDR queue
  → SLA: Contact same day
  → Book AE meeting if qualified

IF Score 40-59 (Cool)
  → Add to SDR cadence
  → Add to marketing nurture
  → SLA: First touch within 48 hours

IF Score 20-39 (Cold)
  → Marketing nurture only
  → Monthly newsletter
  → Re-score if engagement increases

IF Score < 20 (Disqualified)
  → Archive
  → No outreach
  → Document reason
```

### Escalation Paths

**Uncertain Cases**:
- SDR can't determine fit → Escalate to Sales Manager
- High-value but low engagement → Flag for executive outreach
- Competitor's customer → Special handling, alert leadership

## SDR Qualification Playbook

### Initial Outreach (Email)

```markdown
Subject: Re: Your Fretron demo request

Hi [Name],

Thanks for your interest in Fretron. I see you're at [Company] -
we work with several [industry] companies on [relevant challenge].

To make sure I connect you with the right person on our team,
could you share:

1. What's driving your interest in a TMS right now?
2. Roughly how many shipments do you handle daily?

Happy to set up a quick call if that's easier - [calendar link].

Best,
[SDR Name]
```

### Qualification Call Script

**Opening (30 seconds)**:
"Thanks for taking the time, [Name]. I want to make sure we're
a good fit for each other before we go further. Mind if I ask
a few questions about your situation?"

**Discovery (5-7 minutes)**:
- Use SPIN questions above
- Listen for ICP fit signals
- Note specific pain points

**Qualification Decision**:
- Qualified → "Based on what you've shared, I think there's a good
  fit here. Let me connect you with [AE name] who specializes in
  [their industry]."
- Not qualified → "I appreciate you sharing this. Based on
  [honest reason], we might not be the best fit right now.
  [Offer alternative if appropriate]."

### Handoff to AE

```markdown
## Qualified Lead Handoff

**Company**: [Name]
**Contact**: [Name], [Title]
**Score**: [X]/100

### Situation
- Industry: [Industry]
- Size: [Revenue/employees]
- Shipments: [Volume]
- Current state: [How they manage today]

### Problem
- Primary pain: [Main challenge]
- Secondary pains: [Other issues]
- Impact: [Business impact]

### Timeline
- Decision timeline: [When]
- Driving event: [What's creating urgency]
- Budget: [Confirmed/unconfirmed/amount if known]

### Buying Committee
- Champion: [Name, title]
- Decision maker: [Name, title, if known]
- Others involved: [Names, roles]

### Recommended Approach
[Suggestion for AE on how to approach this meeting]

### Notes from Conversation
[Verbatim quotes or key moments from call]
```

## Scoring Model Maintenance

### Monthly Review

- Review conversion rates by score band
- Adjust point values if scores don't predict conversion
- Add/remove criteria based on win patterns
- Update ICP definition if market shifts

### Quarterly Calibration

```markdown
## Lead Scoring Calibration: Q[X] 2025

### Conversion by Score Band
| Band | Leads | Qualified | Opps | Won | Conversion |
|------|-------|-----------|------|-----|------------|
| 80-100 | [X] | [X%] | [X%] | [X%] | [X%] |
| 60-79 | [X] | [X%] | [X%] | [X%] | [X%] |
| 40-59 | [X] | [X%] | [X%] | [X%] | [X%] |
| 20-39 | [X] | [X%] | [X%] | [X%] | [X%] |

### Adjustments Needed
- [Criterion 1]: [Change and why]
- [Criterion 2]: [Change and why]

### New Signals to Consider
- [Potential new signal observed]
```

## Jen Abel Enterprise Qualification Criteria

### The 4 Must-Haves for Qualified Enterprise Deal

| Criteria | Test | Fretron Application |
|----------|------|---------------------|
| **Level** | Speaking to N or N-1 | VP Ops, CFO, or Logistics Head |
| **Access** | Have their cell phone | Personal mobile number |
| **Urgency** | Compelling event identified | Budget cycle, contract renewal, pain event |
| **Scope** | $100K-300K initial deal | ₹25-50L pilot scope |

**If any is missing, the deal isn't qualified — invest time elsewhere.**

### N or N-1 Qualification (Point 6)

> "If you're not speaking to N or N-1, it's not qualified. Influence is everything."

**For Fretron:**
| Level | Titles | Qualification Status |
|-------|--------|---------------------|
| N | CFO, CEO, COO | ✅ Qualified |
| N-1 | VP Supply Chain, VP Operations, Logistics Head | ✅ Qualified |
| N-2 | Transport Manager, Dispatch Lead | ⚠️ Champion potential, not qualified |
| N-3 | Logistics Executive, Analyst | ❌ Research phase only |

**Upgrade Questions:**
- "Who else should be involved in this evaluation?"
- "Who would need to approve a project like this?"
- "Would it help to include your leadership in our conversation?"

### Cell Phone = Qualified (Point 4)

> "If you don't have one of their cell numbers, it's not qualified."

Add this to qualification scoring:

| Signal | Points | Meaning |
|--------|--------|---------|
| Have their personal mobile | +15 | Real relationship established |
| Only corporate email | 0 | Standard vendor interaction |
| WhatsApp/Signal connected | +10 | Informal channel access |

### Differentiation Over Features (Point 5)

> "Differentiation and alpha is what you pitch — this is what execs get excited about."

**In Qualification Calls:**
- Lead with what makes Fretron different
- Focus on "alpha" (outsized returns competitors can't deliver)
- Executives care about competitive advantage, not feature lists

**Fretron's Alpha:**
- Only TMS built for Indian road freight complexity
- Real-time visibility competitors can't match
- Catches ₹X lakhs in billing errors others miss
- Implementation in weeks, not months

### Win Rate Reality Check (Point 11)

> "A high win rate (>50%) is often NOT a positive signal — it suggests price OR market size is very off."

**Use for Scoring Model Calibration:**

| Win Rate | Signal | Action |
|----------|--------|--------|
| <20% | Product-market or messaging issue | Review qualification criteria |
| 20-40% | Healthy — competitive, right market | Keep current approach |
| 40-50% | Strong — may be leaving money on table | Test higher pricing |
| >50% | Red flag — pricing too low or market too narrow | Expand market or raise prices |

**Quarterly Check:** If win rate exceeds 50%, re-evaluate if you're qualifying too tightly or pricing too low.

### Enterprise Deal Execution Notes

**Word Doc Before DocuSign (Point 13):**
- Send editable Word doc first
- Legal expects to make edits
- PDF/DocuSign signals inflexibility
- Adds 2 weeks but builds goodwill

**Payment Terms (Point 14):**
| Terms | Approach |
|-------|----------|
| Net 30 | Offer 2-3% discount |
| Net 60 | Standard — accept |
| Net 90+ | Push back, negotiate |

**Educate Procurement (Point 15):**
- Read every clause in their template
- Many clauses are generic (not applicable to SaaS)
- Politely explain what's not relevant
- They expect pushback — it's professional

## Integration with Other Skills

- Use → `selecting-target-accounts` ICP criteria for scoring
- Apply → `matching-ask-to-trust` for appropriate follow-up
- Reference → `designing-email-sequences` for nurture paths
- Combine with → `accelerating-time-to-value` for fast response
- See → `../jen-abel-enterprise-sales.md` for complete enterprise framework
