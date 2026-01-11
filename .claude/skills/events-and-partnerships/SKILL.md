---
name: events-and-partnerships
description: Use for event marketing and partner programs - conferences, webinars, co-marketing, and referral partnerships. Invoke when planning event participation, designing partner programs, or coordinating co-marketing initiatives.
context_tools:
  - hubspot_create_task
  - hubspot_add_note
execution_capable: false
depends_on:
  - trust-building-principles
---

# Events and Partnerships

**Depends on**: `trust-building-principles`

## Core Insight

**Events and partnerships provide trust transfer - leveraging others' credibility to accelerate your own.**

An introduction from a trusted partner starts you at trust level 2-3, not 0.

## Event Strategy

### Event Types by Goal

| Event Type | Best For | Investment |
|------------|----------|------------|
| Industry conferences | Brand awareness, networking | High |
| Hosted webinars | Lead gen, thought leadership | Medium |
| Executive dinners | Deep relationships, deals | High per contact |
| Partner events | Warm leads, credibility transfer | Low-medium |

### Event Selection Criteria

Before committing, ask:
- Are our ICP accounts/personas there?
- Can we differentiate, or will we be one of 50 vendors?
- What's the realistic outcome (leads, meetings, brand)?
- Does ROI math work?

### Event Execution Framework

**Pre-event**:
- Target account outreach (book meetings before)
- Social promotion
- Content/demo prep

**During event**:
- Focused conversations > badge scanning
- Capture specific follow-up actions
- Live social content

**Post-event**:
- Same-week follow-up (speed matters)
- Personalized based on conversation
- Nurture sequence for non-converters

### Webinar Best Practices

- **Topic**: Solve a problem, don't pitch
- **Format**: 30-40 min content, 15-20 Q&A
- **Promotion**: 2 weeks lead time minimum
- **Follow-up**: Recording + next step within 24 hours

## Partnership Strategy

### Partner Types

| Type | Value Exchange | Examples |
|------|----------------|----------|
| Referral | Revenue share for introductions | Consultants, agencies |
| Integration | Technical connection | Complementary software |
| Co-marketing | Shared audience access | Adjacent solutions |
| Reseller | Distribution channel | Regional partners |

### Partner Selection

Good partners have:
- Overlapping ICP (same buyers)
- Complementary offering (not competitive)
- Skin in the game (mutual benefit)
- Ability to execute (they'll actually do it)

### Co-Marketing Principles

**Give to get**: Lead with value you can provide them.

Effective co-marketing:
- Joint webinars (share audience)
- Co-authored content (shared credibility)
- Mutual referrals (warm intros)
- Shared case studies (when you work together)

**Avoid**: "Partner" in name only with no real collaboration.

### Referral Program Structure

| Element | Consideration |
|---------|---------------|
| Incentive | Revenue share vs flat fee vs mutual referrals |
| Process | How referrals are tracked and credited |
| Enablement | What partners need to refer effectively |
| Communication | Regular updates on referred deals |

## Trust Transfer Mechanics

### Why Partners Accelerate Trust

When a trusted advisor recommends you:
- Their credibility transfers to you
- Skepticism barriers drop
- Sales cycle compresses
- Win rates increase

### Maximizing Trust Transfer

- Partner should introduce with context (why relevant)
- You follow up quickly (respect the intro)
- Deliver value immediately (validate partner's judgment)
- Keep partner informed (they vouched for you)

## Measurement

### Event ROI

- Meetings booked (before + during)
- Pipeline influenced
- Deals sourced
- Cost per meeting/opportunity

### Partnership ROI

- Referrals received
- Referral conversion rate
- Partner-sourced revenue
- Co-marketing reach/leads

## B2B Tech Context

**Key events**: Industry conferences, SaaS events, vertical-specific shows
**Partnership focus**: Integration partners, implementation consultants, adjacent tools
**Co-marketing opportunity**: Webinars with complementary solutions

---

## Context Tools

Tools help track event and partnership activities in CRM.

```
hubspot_create_task(contact_id, title, due_date)
→ Create follow-up tasks for event leads
→ Use for: Post-event action items

hubspot_add_note(contact_id, body)
→ Log partner interactions, event conversations
→ Use for: Relationship tracking
```

---

## Integration

- Event follow-up → `writing-b2b-emails`
- Partner outreach → `trust-building-principles`
- Event content → `seo-and-content-strategy`
- ABM events → `running-abm-events`
