---
name: orchestrating-marketing
description: Master hub for B2B marketing orchestration. Use when planning marketing strategy, sequencing activities, or determining which skill to use. Provides the big picture of how skills work together as an integrated system for B2B tech marketing and sales enablement.
knowledge_only: true
---

# Orchestrating B2B Marketing

## The Big Picture

These skills form an **integrated operating system** for B2B tech marketing. They work together as a coordinated system with clear dependencies.

```
                    ┌─────────────────────────────────────┐
                    │     TRUST-BUILDING-PRINCIPLES       │
                    │   (Foundation - the ask must match  │
                    │    the trust level established)     │
                    └───────────────┬─────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│   POSITIONING   │     │   BUYER TRIGGERS    │     │   CHAMPIONS     │
│ What to say &   │     │ When to engage &    │     │ How deals       │
│ how we differ   │     │ why they buy        │     │ actually close  │
└────────┬────────┘     └──────────┬──────────┘     └────────┬────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │    CHANNEL EXECUTION        │
                    └──────────────┬──────────────┘
                                   │
    ┌──────────────┬───────────────┼───────────────┬──────────────┐
    ▼              ▼               ▼               ▼              ▼
┌────────┐  ┌────────────┐  ┌───────────┐  ┌──────────┐  ┌────────┐
│  ABM   │  │  CONTENT   │  │ LINKEDIN  │  │  EMAIL   │  │ EVENTS │
│PROGRAMS│  │   & SEO    │  │ ORG+PAID  │  │CAMPAIGNS │  │PARTNER │
└────────┘  └────────────┘  └───────────┘  └──────────┘  └────────┘
```

## How the System Works

### The Trust Thread

**Every skill references `trust-building-principles`** because every touchpoint builds or destroys trust.

Before any action:
1. What trust level does this audience have?
2. What am I asking for?
3. Is there a mismatch?

### Customer Journey Flow

```
UNKNOWN → AWARE → INTERESTED → ENGAGED → TRUSTING → CUSTOMER → ADVOCATE
   0        1         2           3          4          5          5+

Channels by stage:
- 0→1: Content/SEO, LinkedIn organic, ABM awareness
- 1→2: Content offers, LinkedIn engagement, Email value
- 2→3: Email sequences, ABM warmup, Lead magnets
- 3→4: Champion enablement, Sales handoff
- 4→5: Demo, Proposal, Deal support
```

### Channel Coordination

| Channel | Primary Role | Trust Levels |
|---------|--------------|--------------|
| SEO/Content | Attract, educate | 0→2 |
| LinkedIn Organic | Build credibility | 1→3 |
| LinkedIn Paid | Amplify, retarget | 1→4 |
| Email | Nurture, convert | 2→4 |
| ABM | Orchestrate all for key accounts | 0→5 |
| Events | Trust transfer | 2→4 |
| Champions | Internal selling | 4→5 |

## Skill Classification by Capability

### Execution-Capable Skills (`execution_capable: true`)
Skills with `requires_tools` that can automate end-to-end workflows.

| Skill | Tools | Automation Scope |
|-------|-------|------------------|
| `linkedin-high-intent-outreach` | enrich, news, score, hubspot | Signal detection → prioritized DM list |
| `mapping-buyer-triggers` | fetch_company_news | Trigger detection → categorization |
| `cluster-abm` | score_account, hubspot | Cluster assignment workflow |
| `defining-icp-and-tiers` | score_account | ICP validation workflow |
| `tracking-competitor-moves` | news, extract_website | Competitor monitoring workflow |
| `running-abm-events` | hubspot tasks/notes | Pre/post event task creation |
| `selecting-and-researching-accounts` | score, enrich, hubspot | Full account research workflow |
| `warming-up-accounts` | hubspot, enrich | Warmup campaign orchestration |
| `running-abm-programs` | all ABM tools | ABM campaign orchestration |
| `writing-b2b-emails` | hubspot, enrich, news | Email sequence workflow |

### Context-Aware Skills (`execution_capable: false` + `context_tools`)
Skills that use tools for research but human executes the output.

| Skill | Context Tools | Human Executes |
|-------|---------------|----------------|
| `linkedin-organic-and-paid` | enrich, news | LinkedIn publishing/ads |
| `enabling-champions` | hubspot deals, enrich | Champion strategy |
| `events-and-partnerships` | hubspot tasks/notes | Event coordination |
| `planning-product-launches` | hubspot contacts/tasks | Launch execution |
| `accelerating-time-to-value` | hubspot deals, enrich | Pilot design |
| `ai-content-workflows` | news, extract_website | Content creation |
| `programmatic-seo` | extract_website, news | Page generation |
| `90-day-seo-playbook` | extract_website, news | SEO execution |
| `ai-citation-strategies` | extract_website, news | Entity building |
| `seo-and-content-strategy` | extract_website, news | Content publishing |

### Knowledge-Only Skills (`knowledge_only: true`)
Pure frameworks/principles—no tool integration, used for strategic guidance.

| Skill | Purpose |
|-------|---------|
| `trust-building-principles` | Foundation: ask must match trust level |
| `discovering-positioning-angles` | What to say, how to differentiate |
| `generating-demand` | Three Levels of Demand framework |
| `generating-lead-magnets` | Conversion asset design |
| `atomizing-content` | Content repurposing patterns |
| `writing-persuasive-copy` | Copy that converts |
| `running-bofu-google-ads` | Paid search strategy |
| `topical-authority-building` | Pillar/cluster architecture |
| `orchestrating-marketing` | This skill - the meta-orchestrator |

## Consolidated Skill Inventory

### Tier 1: Foundation
| Skill | Purpose |
|-------|---------|
| `trust-building-principles` | The ask must match the trust level. Required for all other skills. |

### Tier 2: Strategic
| Skill | Purpose |
|-------|---------|
| `discovering-positioning-angles` | What to say, how to differentiate |
| `mapping-buyer-triggers` | When to engage, why they buy |
| `generating-demand` | Three Levels of Demand (Content → Solution → Vendor) |

### Tier 3: Channel Execution
| Skill | Purpose |
|-------|---------|
| `running-abm-programs` | **ABM Hub** - orchestrates the ABM sub-skills below |
| `seo-and-content-strategy` | Organic traffic, SEO, AI discovery |
| `linkedin-organic-and-paid` | Professional network presence + paid |
| `writing-b2b-emails` | Outreach and nurture sequences |
| `events-and-partnerships` | Trust transfer channels |

### Tier 3b: ABM Sub-Skills (Full Funnel)
| Skill | Purpose |
|-------|---------|
| `defining-icp-and-tiers` | 6 Pillars ICP, tiering, JTBD, buying committee |
| `selecting-and-researching-accounts` | Signal-based selection, scoring, lookalikes |
| `warming-up-accounts` | 90-day framework, market research play, commenting |
| `running-abm-events` | Small format (dinners) + Large format (webinars) |
| `cluster-abm` | Cluster ICP, Future Pipeline, Active Focus segmentation |
| `linkedin-high-intent-outreach` | Signal-based LinkedIn outreach |

### Tier 4: Tactical
| Skill | Purpose |
|-------|---------|
| `enabling-champions` | Internal selling support |
| `generating-lead-magnets` | Conversion assets |
| `atomizing-content` | Content repurposing |
| `writing-persuasive-copy` | Copy that converts |
| `running-bofu-google-ads` | Bottom-funnel paid search |
| `accelerating-time-to-value` | Onboarding, pilots, quick wins |
| `planning-product-launches` | Multi-channel launch coordination |
| `tracking-competitor-moves` | Competitive intelligence |

### Tier 5: SEO & AI Discovery
| Skill | Purpose |
|-------|---------|
| `programmatic-seo` | Template-based page generation at scale |
| `90-day-seo-playbook` | Structured SEO execution timeline |
| `ai-citation-strategies` | AI/LLM visibility optimization |
| `topical-authority-building` | Pillar/cluster content architecture |
| `ai-content-workflows` | AI-assisted content production |

## Decision Trees

### "I need to generate pipeline"

```
Targeting named accounts?
├── YES → running-abm-programs (hub)
│         ├── Need to define ICP? → defining-icp-and-tiers
│         ├── Need to build list? → selecting-and-researching-accounts
│         ├── Need to warm up accounts? → warming-up-accounts
│         ├── Need to segment by readiness? → cluster-abm
│         └── Need to plan events? → running-abm-events
└── NO → seo-and-content-strategy + generating-lead-magnets
         └── Nurture: writing-b2b-emails
```

### "I need to write something"

```
What type?
├── Email → writing-b2b-emails
├── Landing page/ad → writing-persuasive-copy
├── Blog/SEO → seo-and-content-strategy
├── Social → linkedin-organic-and-paid OR atomizing-content
└── Sales materials → enabling-champions
```

### "Conversion is low"

```
Where?
├── Top (traffic→leads) → Check trust-building-principles, lead magnets
├── Middle (leads→meetings) → Check email sequences, trust progression
└── Bottom (meetings→deals) → Check enabling-champions, deal support
```

## Integration Patterns

### ABM + Everything
ABM coordinates all channels for named accounts:
- Uses positioning for messaging
- Uses triggers for timing
- Uses LinkedIn for warmup
- Uses email for outreach
- Uses content for value delivery
- Uses champions to close

### Content Flywheel
```
Create pillar content (seo-and-content-strategy)
→ Atomize (atomizing-content)
→ Distribute on LinkedIn (linkedin-organic-and-paid)
→ Gate for leads (generating-lead-magnets)
→ Nurture via email (writing-b2b-emails)
→ Learn, repeat
```

### Trust Escalation
```
LinkedIn impression (0→1)
→ Content engagement (1→2)
→ Lead magnet download (2)
→ Email value sequence (2→3)
→ Meeting accepted (3→4)
→ Demo delivered (4)
→ Champion enabled (4→5)
→ Deal closed
```

## Quick Reference

| I want to... | Use this skill |
|--------------|----------------|
| Calibrate my CTA | trust-building-principles |
| Define messaging | discovering-positioning-angles |
| Know when to engage | mapping-buyer-triggers |
| Plan demand gen programs | generating-demand |
| Target named accounts | running-abm-programs (hub) |
| Define ICP and tiers | defining-icp-and-tiers |
| Build target account list | selecting-and-researching-accounts |
| Warm up cold accounts | warming-up-accounts |
| Segment by readiness | cluster-abm |
| Plan ABM events | running-abm-events |
| Write email sequences | writing-b2b-emails |
| Build organic traffic | seo-and-content-strategy |
| Build LinkedIn presence | linkedin-organic-and-paid |
| Create lead magnets | generating-lead-magnets |
| Repurpose content | atomizing-content |
| Write converting copy | writing-persuasive-copy |
| Close enterprise deals | enabling-champions |
| Plan events/partners | events-and-partnerships |
| Track AE activity compliance | MIS Subagent |
| Generate weekly sales report | MIS Subagent |
| Send adaptive nudges | MIS Subagent |

## Subagent Architecture

The Marketing Engine includes specialized subagents for automated workflows:

### Research & Intelligence Subagent
**Location**: `.claude/subagents/research/`
**Purpose**: Gather and synthesize account intelligence

| Workflow | Command | Output |
|----------|---------|--------|
| Account Research | "Research [company]" | AccountIntelligenceBrief |
| Trigger Detection | "Scan for triggers" | TriggerReport |
| Competitor Analysis | "Analyze [competitor]" | CompetitorIntelBrief |

**When to use**: Before starting any ABM campaign, when detecting buying signals, for competitive positioning.

### ABM Campaigns Subagent
**Location**: `.claude/subagents/abm/`
**Purpose**: Orchestrate account-based marketing campaigns

| Workflow | Command | Output |
|----------|---------|--------|
| Warmup Campaign | "Warm up [company]" | WarmupPlan + HubSpot tasks |
| Cluster Assignment | "Segment accounts" | ClusterAssignments |
| Event Planning | "Plan dinner for [location]" | EventPlan + task sequences |
| Progress Review | "Review campaign progress" | CampaignProgressReport |

**When to use**: For named account warmup, cluster management, event coordination, campaign tracking.

### MIS (Management Information System) Subagent
**Location**: `.claude/subagents/mis/`
**Purpose**: Automated sales activity tracking, CRM compliance, and adaptive notifications

| Workflow | Command | Output |
|----------|---------|--------|
| Daily Compliance Check | "Run compliance check" | ComplianceReport |
| Adaptive Notification | "Send daily digest" | NotificationPayload |
| Weekly Report | "Generate weekly MIS report" | WeeklyMISReport |
| Deal Risk Analysis | "Analyze deal risks" | RiskAssessment[] |

**When to use**: For CRM hygiene monitoring, AE activity tracking, automated nudges, weekly reporting.

**Core Philosophy**:
- Automate the trackable, nudge the rest
- Adaptive over overwhelming (adjust to responsiveness)
- Trust-first, compliance-second
- Leading indicators over lagging

### Subagent Invocation Patterns

**Research → ABM Flow**
```
"Research Delhivery"        → Get intel brief
[Approve pursuit]           → Human decision
"Warm up Delhivery"        → Create campaign
[Weekly] "Review progress"  → Track and iterate
```

**Trigger-Driven Flow**
```
"Scan for triggers"                   → Detect signals
[For hot triggers: decide action]     → Human decision
"Accelerate warmup for [company]"     → Modify campaign
```

**Event-Based Flow**
```
"Plan executive dinner for Mumbai"    → Create event plan
[Approve invite list]                 → Human decision
[After event]                         → Start warmup for attendees
```

**MIS Daily Flow**
```
[Daily 5pm] "Run compliance check"    → Identify gaps
"Send daily digest"                   → Adaptive notification
[AE action or ignore]                 → Updates responsiveness
[Weekly] "Generate weekly MIS"        → Report for leadership
```

**Deal Risk Flow**
```
"Analyze deal risks"                  → Identify stale deals
[For critical: decide action]         → Human reviews
"Send escalation for [deal]"          → Manager notification
```

### State Management

Campaign, research, and MIS state is persisted in:
- `.claude/research-cache/` - Account briefs, trigger reports
- `.claude/abm-campaigns/` - Active campaigns, events, clusters
- `.claude/mis-state/` - AE profiles, notification history, compliance snapshots
- `.claude/subagents/pending-requests.json` - Inter-subagent requests
- `.claude/subagents/trigger-alerts.json` - Urgent signals

See `CONTEXT-FLOW.md` for data flow between skills and subagents.

---

## Common Mistakes

**Skill in isolation**: Using email skill without checking trust level.
→ Fix: Always start with trust-building-principles.

**Channel silos**: LinkedIn team doesn't know what email says.
→ Fix: Use running-abm-programs for coordination.

**Tactics without strategy**: Campaigns without clear positioning.
→ Fix: Start with discovering-positioning-angles.

**Activity vs outcomes**: Measuring touches, not trust progression.
→ Fix: Track movement through trust levels.

**Skipping research**: Starting campaigns without intel brief.
→ Fix: Always run "Research [company]" before "Warm up [company]".
