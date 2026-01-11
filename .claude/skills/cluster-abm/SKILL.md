---
name: cluster-abm
description: Use for Cluster ABM - segmenting accounts by awareness and readiness into Cluster ICP, Future Pipeline, and Active Focus. Covers differentiated programs per cluster and micro-segmentation. Invoke when planning demand gen for cold accounts or segmenting target lists.
requires_tools:
  - score_account
  - enrich_company
  - fetch_company_news
  - hubspot_search_companies
  - hubspot_add_note
execution_capable: true
depends_on:
  - defining-icp-and-tiers
  - selecting-and-researching-accounts
expects_context:
  - name: account_scores
    from_skill: selecting-and-researching-accounts
    required: true
  - name: triggers_detected
    from_skill: mapping-buyer-triggers
    required: false
provides_context:
  - name: cluster_assignments
    schema: "{company, cluster, promotion_triggers, program_type}"
  - name: cluster_summary
    schema: "{cluster_icp_count, future_pipeline_count, active_focus_count}"
---

# Cluster ABM

**Depends on**: `defining-icp-and-tiers`, `selecting-and-researching-accounts`

## Core Insight

**ICP fit ≠ buying intent. Segment by awareness and readiness, then run differentiated programs. Don't waste SDR time on accounts that don't know you exist.**

## The Three Clusters

| Cluster | Definition | Opportunity | Program |
|---------|------------|-------------|---------|
| **Cluster ICP** | Fit ICP but not vendor-aware, no evidence of challenge | <5% | Automated demand gen (marketing) |
| **Future Pipeline** | Vendor-aware but need not validated | <30% | SDR + Marketing nurture (shared) |
| **Active Focus** | Strong engagement, validated need, buying committee engaged | High | 80% of sales/marketing activities |

## Resource Allocation

```
Cluster ICP     → 100-500 accounts → Automated demand gen
Future Pipeline → 50-100 accounts  → 20% of resources
Active Focus    → 10-30 accounts   → 80% of resources
```

**Key principle**: Content and ads move Cluster ICP to Future Pipeline. SDR time is reserved for Future Pipeline and Active Focus.

## Cluster Segmentation Questions

For each account, assess:

| Question | Yes → | No → |
|----------|-------|------|
| Engaged with us? (website, content, event) | Future Pipeline+ | Cluster ICP |
| Evidence of challenge we solve? | Future Pipeline+ | Cluster ICP |
| Validated need with buying committee? | Active Focus | Future Pipeline |
| Strong buying signals? | Active Focus | Future Pipeline |

## Programs by Cluster

### Cluster ICP Program
**Goal**: Move from "Never heard of you" to "Vendor aware"

- Industry thought leadership (not product-focused)
- LinkedIn ads to job titles at cluster accounts
- Educational webinars
- Useful resources (benchmarks, guides)

**Metrics**: Accounts moving to Future Pipeline, website visits from cluster.

### Future Pipeline Program
**Goal**: Validate challenges and build buying committee relationships

- SDR meaningful engagement (LinkedIn commenting, personalized connects)
- Segment-specific content sequences
- Market research interviews
- Peer roundtables

**Questions to answer**: Does account have challenge we solve? Have they prioritized it? Who's the buying committee?

### Active Focus Program
**Goal**: Create champions and generate opportunities

- 1-to-1 executive briefings
- Personalized business cases
- Multi-thread across buying committee
- Champion development

**Metrics**: Opportunities created, pipeline value, win rate.

## Micro-Segmentation

Within Future Pipeline, group by:

- **Challenge**: Cost reduction vs growth vs risk vs digital transformation
- **Vertical**: Similar industry contexts for relevant examples
- **Stage**: Growth (scaling) vs Established (optimizing) vs Transformation

Create segment-specific content and messaging for each.

## Cluster Movement Triggers

### Promotion: Cluster ICP → Future Pipeline
- Content engagement (download, webinar)
- Website visit to intent pages
- LinkedIn connection accepted
- Responded to outreach

### Promotion: Future Pipeline → Active Focus
- Challenge validated through conversation
- Multiple buying committee members engaged
- Expressed timeline or budget

### Demotion Triggers
- Deal stalled, champion left, budget cycle missed → Active Focus → Future Pipeline
- No engagement after 6 months, confirmed no priority → Future Pipeline → Cluster ICP

---

## Tool Usage

### Cluster Assignment Workflow

Combine ICP score with engagement signals to assign clusters:

```
1. For each account:
   a. Get ICP tier from score_account or prior scoring
   b. Check CRM engagement via hubspot_search_companies
   c. Get recent triggers via fetch_company_news
   d. Apply cluster logic

2. Cluster Assignment Logic:
   - Tier A/B + Strong engagement + Triggers → Active Focus
   - Tier A/B/C + Some engagement OR Triggers → Future Pipeline
   - Tier C/D + No engagement + No triggers → Cluster ICP
   - Tier D/E + No engagement → Monitor Only (not clustered)
```

### ICP Tier to Cluster Mapping

| ICP Tier | Engagement Level | Triggers | → Cluster |
|----------|-----------------|----------|-----------|
| A/B | High (demo, meeting, multi-contact) | Any | **Active Focus** |
| A/B | Medium (content, email reply) | Yes | **Active Focus** |
| A/B | Medium (content, email reply) | No | **Future Pipeline** |
| A/B/C | Low (website visit, ad click) | Yes | **Future Pipeline** |
| A/B/C | Low (website visit, ad click) | No | **Cluster ICP** |
| C | None | No | **Cluster ICP** |
| D/E | Any | Any | **Monitor Only** |

### Cluster Update Workflow

```
1. hubspot_search_companies(company_name)
   → Check: deal stage, last activity, contact count

2. Engagement scoring:
   - Has deal in pipeline? → Active Focus
   - Multiple contacts engaged? → Future Pipeline+
   - Website visit <30 days? → Future Pipeline
   - No CRM activity? → Cluster ICP

3. fetch_company_news(company_name)
   → If triggers found, promote cluster

4. hubspot_add_note(company_id, cluster_assignment)
   → Log cluster and rationale to CRM
```

### Bulk Cluster Assignment

For initial segmentation of account list:
```
For each account in scored_list:
  1. tier = account.icp_tier
  2. engagement = check_crm_engagement(account)
  3. triggers = fetch_company_news(account).triggers_found
  4. cluster = apply_cluster_logic(tier, engagement, triggers)
  5. Output: {company, cluster, promotion_triggers[], next_action}
```

---

## Human Checkpoints

Pause for human review when:
- **Active Focus cluster >30 accounts**: Validate capacity for high-touch programs
- **Promotion to Active Focus**: Confirm buying signals before SDR assignment
- **Demotion from Active Focus**: Validate with sales before downgrading
- **Cluster reassignment conflicts**: When signals disagree

---

## Tool Failure Handling

| Tool | Failure Mode | Fallback |
|------|--------------|----------|
| `hubspot_search_companies` | Not in CRM | Assign to Cluster ICP (no engagement data) |
| `fetch_company_news` | No news | Use CRM engagement only for cluster |
| `hubspot_add_note` | API error | Log to campaign state file |

---

## Integration

- For ICP definition → `defining-icp-and-tiers`
- For account selection → `selecting-and-researching-accounts`
- For warmup tactics → `warming-up-accounts`
- For events → `running-abm-events`
- For trigger detection → `mapping-buyer-triggers`
