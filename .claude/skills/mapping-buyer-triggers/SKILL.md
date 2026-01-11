---
name: mapping-buyer-triggers
description: Use for identifying why and when buyers change using JTBD and demand-side sales principles. Maps forces that push toward change and jobs being hired. Invoke when understanding buyer motivation, designing trigger-based campaigns, or qualifying deal urgency.
requires_tools:
  - fetch_company_news
  - enrich_company
  - score_account
  - hubspot_add_note
execution_capable: true
depends_on:
  - trust-building-principles
expects_context:
  - name: target_accounts
    from_skill: selecting-and-researching-accounts
    required: false
provides_context:
  - name: triggers_detected
    schema: "{company, trigger_type, trigger_details, urgency_score}"
  - name: trigger_to_messaging
    schema: "{trigger_type, messaging_angle, content_suggestion}"
---

# Mapping Buyer Triggers

## Core Insight

**Buyers don't buy products. They hire products to make progress. For change to happen: PUSH + PULL > ALLEGIANCE + ANXIETY**

Strong triggers create urgency. Weak triggers = nurture, not push.

## The Four Forces

```
PUSH (from current situation)     PULL (toward new solution)
"This isn't working anymore"  →   "This looks better"

           ↓ Must exceed ↓

ALLEGIANCE (to current)           ANXIETY (about new)
"We know how this works"      ←   "What if it fails?"
```

## Trigger Categories

### Pain Triggers
- **Cost pressure** - CFO asking hard questions
- **Operational chaos** - Team burning out
- **Customer complaints** - OTIF dropping, penalties
- **Visibility gaps** - Can't answer basic questions

### Event Triggers (Highest Priority)
- **Leadership change** - New exec, new initiatives (90-day window)
- **Scale change** - Volume spike, expansion, new locations
- **Strategic initiative** - Digital transformation, ERP upgrade
- **Failure event** - Lost customer, audit findings, crisis

### Comparison Triggers
- **Competitive pressure** - Competitor using better tech
- **Peer influence** - Industry event, peer company implemented

## Jobs-to-be-Done

### Functional Jobs
- "Help me see what's happening"
- "Help me control costs"
- "Help me hit delivery targets"
- "Help me run efficiently"

### Emotional Jobs
- "Help me look competent"
- "Help me feel in control"
- "Help me grow my career"

## Trigger Qualification

### Strong Triggers (Prioritize)
- [ ] Specific event identified
- [ ] Executive sponsor with timeline
- [ ] Budget allocated or process clear
- [ ] Consequences of inaction are clear
- [ ] Multiple stakeholders involved

### Weak Triggers (Nurture)
- [ ] "Just exploring options"
- [ ] No specific event or timeline
- [ ] Single person, no exec involvement
- [ ] Current pain is tolerable
- [ ] No consequence for status quo

## Discovery Questions

**Situation**: "What prompted you to look at this now?"
**Pain**: "What's not working? What does it cost you?"
**Event**: "Was there a specific event that triggered this?"
**Timeline**: "Is there a deadline this connects to?"
**Stakeholders**: "Who else is feeling this pain?"

## Trigger + Trust Matrix

| | Low Trust | High Trust |
|---|---|---|
| **Strong Trigger** | Urgent nurture | Fast-track demo |
| **Weak Trigger** | Deprioritize | Long-term relationship |

**Strong trigger doesn't override trust requirements.** Lead with value first.

## Trigger Detection Sources

- LinkedIn job changes (Sales Navigator)
- Company announcements, press releases
- News/Google Alerts
- Intent data (if available)
- Field signals from customers/partners

---

## LinkedIn-Based Trigger Detection (NEW)

### Real-Time Trigger Signals

| Trigger Type | LinkedIn Signal | Priority | Action Window |
|--------------|-----------------|----------|---------------|
| **Pain Trigger** | Posted about logistics challenges | Critical | Same day |
| **Pain Trigger** | Commented on competitor pain post | High | 24 hours |
| **Event Trigger** | New role announcement | Critical | 90 days |
| **Event Trigger** | Company expansion post | Critical | 30 days |
| **Comparison Trigger** | Liked competitor content | Medium | 1 week |
| **Comparison Trigger** | Followed competitor page | Medium | 1 week |

### Pain Point Keywords to Monitor

**Logistics Operations**:
- "logistics nightmare", "tracking nightmare"
- "freight costs killing us", "carrier issues"
- "delivery delays", "OTIF dropping"
- "visibility problems", "can't see shipments"

**Digital Transformation**:
- "still using Excel", "manual processes"
- "need to digitize", "tech debt"
- "looking for solutions", "evaluating options"

**Compliance/Operations**:
- "e-way bill headache", "GST challenges"
- "audit findings", "compliance issues"
- "operations chaos", "scaling problems"

### Boolean Search Templates

**Pain Point Search**:
```
("logistics" OR "supply chain" OR "freight") AND ("challenge" OR "problem" OR "issue" OR "struggling") AND (VP OR Director OR Head OR Manager) AND India
```

**Evaluation Search**:
```
("looking for" OR "evaluating" OR "considering") AND ("TMS" OR "logistics software" OR "supply chain platform")
```

**Job Change Search**:
```
title:(VP OR Director OR Head OR Chief) AND (Supply Chain OR Logistics OR Operations OR Digital) AND "new position"
```

### Signal-to-Trigger Mapping

| LinkedIn Signal | Likely Trigger | Messaging Angle |
|-----------------|----------------|-----------------|
| Posted about scale problems | Scale change trigger | "When volume spikes break your systems" |
| New VP Supply Chain hired | Leadership change trigger | "First 90 days priorities" |
| Commented on cost post | Cost pressure trigger | "5 quick wins on freight spend" |
| Liked digital transformation content | Strategic initiative | "Tech-first logistics operations" |
| Company funding announcement | Budget available | "Investing in operational excellence" |

### Trigger Urgency Scoring

```
URGENT (reach out today):
- Pain point post + decision-maker title = 80+ points
- New role + target company = 70+ points
- Competitor comparison post = 75+ points

HIGH (reach out this week):
- Company news + relevant title = 50-69 points
- Liked competitor content = 40-49 points

MEDIUM (add to nurture):
- Follows industry influencer = 20-39 points
- General industry engagement = <20 points
```

## Trigger-Matched Content

| Trigger | Content |
|---------|---------|
| New leadership | "First 90 days: Quick wins" |
| Cost pressure | "5 levers you can pull this quarter" |
| Scale spike | "When [current approach] breaks" |
| Customer complaints | Case study from their industry |

---

## Tool Usage

### Automated Trigger Detection

The `fetch_company_news` tool detects these triggers automatically:

| Tool Output Category | Maps to Trigger Type | Urgency |
|---------------------|---------------------|---------|
| `leadership_change` | Event Trigger (Leadership) | Critical - 90 day window |
| `expansion` | Event Trigger (Scale) | Critical - 30 day window |
| `digital_transformation` | Event Trigger (Strategic) | High |
| `funding_growth` | Event Trigger (Scale/Budget) | High |
| `supply_chain` | Pain Trigger (Operational) | High |
| `challenges` | Pain Trigger (Cost/Chaos) | Medium-High |

### Trigger Detection Workflow

```
1. fetch_company_news(company_name)
   → Returns: triggers_found[], top_triggers[]

2. Map to trigger categories:
   - leadership_change → Event Trigger, 90-day window
   - expansion/funding → Event Trigger, budget available
   - supply_chain/challenges → Pain Trigger, immediate need

3. Calculate urgency score:
   - Multiple triggers = higher urgency
   - Leadership + pain = critical priority
   - Single trigger = moderate priority

4. hubspot_add_note(deal_id, trigger_summary)
   → Log triggers to CRM for sales visibility
```

### Trigger Scan for Account List

```
For each account in target_list:
  1. news = fetch_company_news(account)
  2. enrichment = enrich_company(account)
  3. Combine signals:
     - News triggers + hiring signals + tech changes
  4. Score urgency (see Trigger Urgency Scoring)
  5. Output: {company, triggers[], urgency_score, messaging_angle}
```

### Trigger-to-Messaging Mapping

After detection, map triggers to content:

| Detected Trigger | Messaging Angle | Suggested Content |
|-----------------|-----------------|-------------------|
| `leadership_change` | "First 90 days priorities" | Quick wins guide |
| `expansion` | "Scaling logistics for growth" | Capacity planning checklist |
| `supply_chain` | "Solving visibility gaps" | ROI calculator |
| `challenges` | "When current approach breaks" | Industry case study |
| `digital_transformation` | "Tech-first logistics" | Digital maturity assessment |

---

## Human Checkpoints

Pause for human review when:
- **Critical triggers detected**: Verify before immediate outreach
- **Multiple high-urgency accounts**: Prioritize limited resources
- **Trigger + Tier A account**: Confirm escalation to sales
- **Conflicting signals**: Resolve before action

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `fetch_company_news` | No news found | Use `enrich_company` for hiring/tech signals, mark "no recent triggers" |
| `enrich_company` | Company not found | Manual research via LinkedIn/website |
| `hubspot_add_note` | API error | Log to campaign state file instead |

---

## Integration

- Champion connection → `enabling-champions` (strong triggers create champions)
- Trust calibration → `trust-building-principles`
- Outreach timing → `writing-b2b-emails`
- Account prioritization → `running-abm-programs`
- Signal-based outreach → `linkedin-high-intent-outreach`
