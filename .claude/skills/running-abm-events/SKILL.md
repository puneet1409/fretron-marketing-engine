---
name: running-abm-events
description: Use for ABM event strategy - small format (dinners, roundtables), large format (webinars, summits), and cluster events. Covers event selection, execution, and post-event activation. Invoke when planning events for target accounts.
requires_tools:
  - hubspot_create_task
  - hubspot_add_note
  - hubspot_get_deal_contacts
  - hubspot_search_contacts
execution_capable: true
depends_on:
  - warming-up-accounts
  - trust-building-principles
expects_context:
  - name: target_accounts
    from_skill: selecting-and-researching-accounts
    required: false
  - name: cluster_assignments
    from_skill: cluster-abm
    required: false
provides_context:
  - name: event_attendees
    schema: "{event_name, attendees[], engagement_level}"
  - name: event_follow_ups
    schema: "{attendee, engagement_tier, follow_up_action, task_id}"
---

# Running ABM Events

**Depends on**: `warming-up-accounts`, `trust-building-principles`

## Core Insight

**Events compress trust-building time through shared experiences. Match event format to account tier and relationship depth.**

## Event Format Selection

| Format | Accounts | Trust Impact | Best For |
|--------|----------|--------------|----------|
| **1-to-1 Briefing** | 1 | Very High | Tier 1 deal acceleration |
| **Executive Dinner** | 5-10 | High | Tier 1 relationship building |
| **Roundtable** | 10-20 | High | Tier 1-2 thought leadership |
| **Cluster Event** | 20-50 | Medium-High | Accounts with shared challenge |
| **Webinar** | 50-200 | Medium | Tier 2-3 awareness |
| **Virtual Summit** | 200-5000 | Low-Medium | Broad awareness, content creation |

---

## Small Format Events (1-to-Few)

**Purpose**: Deep relationship building with Tier 1 accounts.

**Key principles**:
- Peer-to-peer value (curate guest list carefully)
- Facilitated discussion, not presentation
- No product pitching during event
- 80% listening, 20% sharing

**Post-event activation**: Thank you → Personalized follow-up → 1-to-1 offer if appropriate.

---

## Cluster Events

**When to use**: Accounts share a common trigger (M&A, expansion, compliance) or challenge.

**Core elements**:
- Survey cluster to identify shared challenges
- Design workshop for #1 shared challenge
- Offer 1-on-1 debriefing as activation
- Create personalized content hub for follow-up

**Results benchmark**: 12 accounts → 5 won deals possible with proper activation.

---

## Large Format Events

### Webinar

**State change method**: Change something every 3-5 minutes (speaker switch, poll, question, story).

**Post-event**: Segment by engagement → Personalized follow-up for attendees → Recording + key takeaways for no-shows.

### Virtual Summit

**Prerequisites** (don't skip): Existing relationships from podcast/content, customer speakers, partner network.

**Growth stacking strategy**:
1. Social engagement, permissionless co-marketing
2. Podcast series, industry report interviews
3. Panel discussion (3-4 speakers)
4. Mini-summit (10-15 speakers)
5. Multi-day summit (30-50+ speakers)

**Key insight**: Include YOUR workshops for warmup and demand creation. Run activation workshop for highly engaged accounts.

---

## Conference Participation

**Pre-event**: Get attendee list, identify targets, pre-book meetings.

**During**: Attend sessions where targets speak, approach with specific questions.

**Post-event segmentation**:

| Lead Type | Follow-Up Timing |
|-----------|------------------|
| Hot (demo request) | Same day |
| Warm (good conversation) | Day 1-2 |
| Cool (badge scan only) | Day 3-5, nurture |

---

## Event Selection Criteria

Questions to evaluate any event:

1. **Target account concentration**: How many ICP accounts will attend?
2. **Content opportunity**: Can we create/repurpose content?
3. **Relationship depth**: Does format match our relationship stage?
4. **Cost per target contact**: Is the investment justified?

---

## Tool Usage

### Pre-Event: Target Account Identification

```
1. hubspot_search_contacts(industry, title filters)
   → Identify contacts from target accounts to invite

2. For each target account:
   a. hubspot_get_deal_contacts(deal_id)
      → Get existing contacts in pipeline
   b. Prioritize by deal stage and engagement

3. hubspot_add_note(contact_id, "Invited to [Event Name]")
   → Log invitation for tracking
```

### Post-Event: Follow-Up Task Creation

Segment attendees by engagement and create tasks:

```
1. For each attendee:
   a. Classify engagement tier:
      - Hot: Asked questions, requested demo, stayed for full event
      - Warm: Attended, some engagement
      - Cool: Registered but didn't attend

2. Create follow-up tasks:
   hubspot_create_task({
     contact_id,
     title: "[Event] Follow-up - [Tier]",
     description: "Event: [name], Engagement: [notes], Action: [specific follow-up]",
     due_date: tier_based_date,  // Hot=today, Warm=day 2, Cool=day 5
     priority: tier_based_priority
   })

3. hubspot_add_note(contact_id, "Attended [Event]. Engagement: [level]. Key discussion: [topic]")
   → Log engagement for future reference
```

### Event Follow-Up Workflow

```
Post-Event Day 0 (same day):
- Hot leads: Personal email/call task created
- Log all attendee engagement notes

Post-Event Day 1-2:
- Warm leads: Follow-up tasks due
- Send recording + key takeaways

Post-Event Day 3-5:
- Cool leads: Nurture sequence tasks
- No-shows: Recording + nurture

Post-Event Week 2:
- Review: Who converted to next stage?
- Update cluster/pipeline status
```

### Cluster Event Coordination

For events targeting account clusters:
```
1. Get cluster members from cluster_assignments context
2. hubspot_search_contacts for contacts at cluster companies
3. Create invitation tasks for each target contact
4. Post-event: Update cluster status based on attendance
```

---

## Human Checkpoints

Pause for human review when:
- **Event format selection**: Budget and strategic alignment needed
- **Guest list curation**: Especially for small format events
- **Hot lead follow-up**: Personal outreach requires human touch
- **Content from event**: Approval before publishing

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `hubspot_search_contacts` | No contacts found | Manual attendee list import |
| `hubspot_create_task` | API error | Log tasks to spreadsheet, bulk import later |
| `hubspot_add_note` | API error | Store notes in campaign state file |

---

## Integration

- Before event → Warm up accounts with `warming-up-accounts`
- For content repurposing → Use `atomizing-content`
- For follow-up → Use `writing-b2b-emails`
- For cluster approach → Use `cluster-abm`
- For attendee research → Use `selecting-and-researching-accounts`
