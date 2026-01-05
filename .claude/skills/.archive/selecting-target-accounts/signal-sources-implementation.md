# Signal Sources & Implementation Plan for Fretron ABM

Based on Kyle Poyar (Growth Unhinged), Full Funnel methodology, and LeadGenius signal frameworks.

## The 6 Signal Categories for Fretron

| Category | What It Reveals | Fretron-Specific Signals |
|----------|-----------------|--------------------------|
| **Firmographic** | Company structure, size, industry | Revenue ₹200-1000 Cr, manufacturing, multi-plant operations |
| **Technographic** | Tech stack, systems in use | Excel-based logistics, SAP/Oracle without TMS module |
| **Intent** | Active research behavior | Searching "TMS software India", reading logistics content |
| **Behavioral** | First-party engagement | Visited pricing page, downloaded case study, attended webinar |
| **Engagement** | Interaction depth | Email replies, webinar Q&A, demo requests |
| **Demographic** | Individual persona signals | VP Logistics title, 5+ years tenure, LinkedIn activity |

---

## Signal Sources: Complete Inventory

### 1. First-Party Signals (You Own & Control)

#### Website Visitor Intelligence
| Signal | Source | Implementation |
|--------|--------|----------------|
| Anonymous company visits | Leadfeeder, Warmly, Clearbit Reveal | Install JS snippet |
| Pricing page views | Google Analytics + Segment | Event tracking |
| Case study downloads | HubSpot/Marketo forms | Form submission tracking |
| Demo request submissions | CRM | Direct capture |
| Blog engagement by topic | GA4 content groups | Content tagging |

**Priority: HIGH** - Zero cost, immediate value, you control the data.

#### Email & Marketing Engagement
| Signal | Source | Implementation |
|--------|--------|----------------|
| Email opens/clicks | Email platform (HubSpot, Mailchimp) | Built-in tracking |
| Link clicks by content type | UTM parameters | Tagging discipline |
| Reply sentiment | Manual or AI classification | CRM notes |
| Unsubscribes/bounces | Email platform | List hygiene |

**Priority: HIGH** - Already captured if using email marketing.

#### Event & Webinar Signals
| Signal | Source | Implementation |
|--------|--------|----------------|
| Webinar registration | Zoom/Webinar platform | CRM integration |
| Attendance duration | Webinar analytics | API or export |
| Q&A participation | Manual capture | Post-event enrichment |
| On-demand replay views | Video platform (Vimeo, Wistia) | View tracking |

**Priority: MEDIUM** - Requires event program.

---

### 2. Third-Party Intent Signals (Vendor Provided)

#### Hiring Signals (HIGH VALUE)
| Signal | Source | Cost | India Coverage |
|--------|--------|------|----------------|
| VP/Head Logistics hiring | LinkedIn Sales Navigator | ₹6k-12k/month | Excellent |
| Supply Chain Manager roles | Naukri.com job scraping | Free/Manual | Excellent |
| SAP implementation roles | LinkedIn + Naukri | ₹6k-12k/month | Good |
| Logistics team expansion | iimjobs.com | Free browse | Good for senior |

**Why Hiring Signals Matter:**
- New VP Logistics = New initiatives budget
- SAP implementation team = ERP modernization
- Fleet/logistics expansion = Pain with current tools
- "Looking for TMS experience" in JD = Active evaluation

**Implementation Approach:**
1. LinkedIn Sales Navigator saved searches for:
   - "VP Logistics" OR "Head Supply Chain" OR "GM Logistics" hiring
   - "SAP" AND "logistics" in job descriptions
   - Companies adding 5+ logistics roles in 90 days
2. Weekly Naukri.com manual check for target accounts
3. Set Google Alerts for "[Company Name] logistics hiring"

#### Company Growth & Funding Signals
| Signal | Source | Cost | India Coverage |
|--------|--------|------|----------------|
| Funding announcements | Crunchbase, VCCircle | Free-$400/mo | Good |
| New plant announcements | Google Alerts, NewsAPI | Free | Excellent |
| Expansion news | Economic Times, Business Standard | Free | Excellent |
| Leadership changes | LinkedIn + Google Alerts | Free-₹12k/mo | Good |

**Implementation Approach:**
1. Google Alerts for:
   - "[Target Company] + new plant"
   - "[Target Company] + expansion"
   - "[Target Company] + logistics"
   - "manufacturing plant India [industry]"
2. Talkwalker Alerts (free) for broader coverage
3. Weekly scan of Manufacturing Today India, Business Standard manufacturing section

#### Technographic Signals
| Signal | Source | Cost | India Coverage |
|--------|--------|------|----------------|
| SAP/Oracle ERP usage | BuiltWith, ZoomInfo | $100-500/mo | Moderate |
| No TMS detected | BuiltWith technology lookup | $100/mo | Moderate |
| Legacy system job postings | LinkedIn/Naukri | Free-₹12k | Good |
| Excel dependency mentions | Job descriptions, LinkedIn posts | Free | Good |

**Manual Technographic Research:**
- Check job descriptions for technology mentions
- LinkedIn posts from logistics managers mentioning tools
- Case study research on company websites
- Industry report mentions

#### Buyer Intent Data
| Signal | Source | Cost | India Coverage |
|--------|--------|------|----------------|
| TMS research topics | Bombora, 6Sense | $1000+/mo | Limited for India |
| G2 comparison visits | G2 Intent | $500+/mo | Limited for India |
| Content consumption | Bombora surge data | $1000+/mo | Limited |

**Note:** Third-party intent data has limited India coverage. Prioritize first-party and hiring signals instead.

---

### 3. Industry & Association Sources

#### Industry Directories
| Source | What It Provides | Access Method | Cost |
|--------|------------------|---------------|------|
| CII Member Directory | 9,100+ manufacturing companies | Membership or purchase | ₹50k+ |
| FICCI Corporate Members | 250,000+ indirect members | Website + networking | Free browse |
| Industry-specific associations | Vertical member lists | Association membership | Varies |
| Dun & Bradstreet India | Firmographic database | Subscription | ₹₹₹ |

**Target Associations by Industry:**

| Industry | Association | Value |
|----------|-------------|-------|
| Steel | Indian Steel Association (ISA) | Plant lists |
| Cement | Cement Manufacturers' Association (CMA) | Member directory |
| Auto | SIAM, ACMA | OEM + supplier lists |
| FMCG | FICCI FMCG Committee | Company contacts |
| Chemical | Indian Chemical Council | Member companies |
| Pharma | IDMA, IPA | Manufacturer lists |

#### Trade Publications for Trigger Monitoring
| Publication | Focus | Signal Type | Frequency |
|-------------|-------|-------------|-----------|
| Manufacturing Today India | Industry news | Expansion, new plants | Daily |
| Economic Times Manufacturing | Business news | M&A, investments | Daily |
| Business Standard Logistics | Supply chain news | Industry trends | Daily |
| CSCMP India Chapter | SCM community | Events, networking | Monthly |
| LogiNext Blog / ET Logistics | Logistics tech | Competition intel | Weekly |

---

### 4. LinkedIn-Based Signals (Critical Channel)

#### Sales Navigator Alerts to Configure
| Alert Type | What It Triggers | Priority |
|------------|------------------|----------|
| Senior Hires at Account | New VP/Director+ joins saved account | Critical |
| Job Changes | Saved lead moves to new company | High |
| Shared Experience | Connection at target account | Medium |
| Posted on LinkedIn | Decision-maker content engagement | Medium |
| Company News | Saved account in news | Medium |
| Account Growing | Headcount increase at saved account | High |
| Account Slowing | Headcount decrease (potential churn risk) | Medium |

#### LinkedIn Search Filters for Signals
```
Title Filters for Champions:
- VP Logistics OR VP Supply Chain OR VP Operations
- Head of Logistics OR Head of Supply Chain
- GM Logistics OR General Manager Operations
- Director Logistics OR Director Supply Chain
- Chief Supply Chain Officer

Company Filters:
- Industry: Manufacturing, Industrial, Automotive, Chemical
- Company headcount: 500-10,000
- Geography: India

Activity Filters:
- Posted on LinkedIn in past 30 days (engagement signal)
- Changed jobs in past 90 days (new initiatives)
- Follows logistics/TMS companies (interest signal)
```

#### Competitor Content Engagement (Kyle Poyar Tactic)
Monitor who engages with competitor LinkedIn posts:
- Follow competitor company pages (Oracle TMS, SAP TM, FourKites, etc.)
- Note who likes/comments on their posts
- These are active evaluators

---

### 5. Data Enrichment Tools

#### Recommended Stack for India
| Tool | Use Case | Cost | India Data Quality |
|------|----------|------|-------------------|
| **Apollo.io** | Contact enrichment, emails | $49-99/mo | Good |
| **LinkedIn Sales Navigator** | Company + contact intel | ₹6-12k/mo | Excellent |
| **Lusha** | Phone numbers, emails | $36+/mo | Moderate |
| **Clay** | Waterfall enrichment orchestration | $149+/mo | Good (multi-source) |
| **Denave** | India-specific B2B database | Custom | Excellent |
| **Clearbit** | Website visitor reveal | $99+/mo | Moderate |

#### Clay Waterfall Enrichment Approach
Clay aggregates 50+ data sources. For India manufacturing:

**Email Waterfall:**
1. Apollo.io (primary)
2. Lusha
3. LinkedIn profile scrape
4. Company website pattern match

**Phone Waterfall:**
1. LinkedIn Sales Navigator
2. Lusha
3. Apollo.io
4. Denave (India-specific)

**Firmographic Waterfall:**
1. LinkedIn company data
2. Apollo.io
3. Crunchbase
4. Manual research layer

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2) - FREE/LOW COST

**Objective:** Capture first-party signals, set up basic monitoring

| Task | Tool | Cost | Owner |
|------|------|------|-------|
| Install website visitor tracking | Google Analytics 4 | Free | Marketing |
| Set up pricing page alerts | GA4 custom events | Free | Marketing |
| Configure email engagement tracking | HubSpot/existing ESP | Existing | Marketing |
| Create 20 Google Alerts for triggers | Google Alerts | Free | Marketing |
| Set up Talkwalker Alerts backup | Talkwalker | Free | Marketing |
| Create target account list in CRM | CRM | Existing | Sales |
| Build LinkedIn saved searches | LinkedIn (free tier) | Free | Sales |

**Deliverables:**
- [ ] First-party signal capture active
- [ ] 20+ Google Alerts configured
- [ ] Initial target account list (50 companies)
- [ ] LinkedIn saved searches for ICP

---

### Phase 2: LinkedIn Intelligence (Week 3-4) - ₹12k/month

**Objective:** Systematic hiring and leadership change monitoring

| Task | Tool | Cost | Owner |
|------|------|------|-------|
| Purchase LinkedIn Sales Navigator | LinkedIn | ₹12k/mo | Sales |
| Import target account list | Sales Navigator | - | Sales |
| Configure all 7 alert types | Sales Navigator | - | Sales |
| Build saved searches for hiring signals | Sales Navigator | - | Sales |
| Set up weekly competitor engagement scan | Sales Navigator | - | Marketing |
| Create contact list for buying committee | Sales Navigator | - | Sales |

**Deliverables:**
- [ ] 50 target accounts imported to Sales Navigator
- [ ] Hiring signal alerts active
- [ ] Weekly competitor engagement reports
- [ ] 3-5 contacts per Tier 1 account identified

---

### Phase 3: Contact Enrichment (Week 5-6) - $99-149/month

**Objective:** Get emails and phones for identified contacts

| Task | Tool | Cost | Owner |
|------|------|------|-------|
| Set up Apollo.io account | Apollo.io | $49-99/mo | Sales |
| Enrich Tier 1 contacts (50-100) | Apollo.io | Credits | Sales |
| Verify email deliverability | Apollo/NeverBounce | Included | Sales |
| Add enriched data to CRM | CRM integration | - | Sales |
| Optional: Add Clay for waterfalls | Clay | $149/mo | Ops |

**Deliverables:**
- [ ] Tier 1 accounts fully enriched
- [ ] Valid emails for 80%+ contacts
- [ ] Phone numbers for 50%+ contacts
- [ ] CRM updated with enriched data

---

### Phase 4: Website Visitor Intelligence (Week 7-8) - $99-300/month

**Objective:** Identify anonymous website visitors from target accounts

| Task | Tool | Cost | Owner |
|------|------|------|-------|
| Evaluate Clearbit Reveal vs Leadfeeder | Free trials | Free trial | Marketing |
| Install chosen visitor intelligence | Selected tool | $99-300/mo | Marketing |
| Connect to CRM for account matching | Integration | - | Ops |
| Create alert for target account visits | Tool workflow | - | Marketing |
| Build "hot visitor" notification to sales | Slack/Email | - | Ops |

**Deliverables:**
- [ ] Real-time target account visit alerts
- [ ] Weekly visitor intelligence report
- [ ] Sales notified of high-intent visits within 24 hours

---

### Phase 5: Advanced Signal Orchestration (Week 9-12) - Custom

**Objective:** Combine signals into actionable scoring and workflows

| Task | Tool | Cost | Owner |
|------|------|------|-------|
| Design signal-based lead scoring model | CRM/Spreadsheet | - | Marketing + Sales |
| Weight signals by conversion correlation | Analysis | - | Marketing |
| Build automated "signal spike" alerts | CRM workflows | - | Ops |
| Create playbooks for each signal type | Notion/Docs | - | Sales |
| Monthly signal source audit | Review | - | Marketing |

**Signal Scoring Model:**
| Signal | Points | Decay |
|--------|--------|-------|
| Demo request | +50 | None |
| Pricing page visit (identified) | +30 | 30 days |
| VP/Head Logistics hired | +25 | 90 days |
| New plant announcement | +25 | 90 days |
| Webinar attendance | +20 | 60 days |
| Content download | +15 | 60 days |
| Email reply | +15 | 30 days |
| Competitor content engagement | +10 | 30 days |
| Website visit (identified) | +10 | 14 days |
| Email open | +5 | 7 days |

**Deliverables:**
- [ ] Lead scoring model implemented
- [ ] Automated alerts for score thresholds
- [ ] Signal-based playbooks documented
- [ ] Monthly signal performance review process

---

## Budget Summary

| Phase | Monthly Cost | One-Time Setup |
|-------|--------------|----------------|
| Phase 1: Foundation | Free | 8 hours |
| Phase 2: LinkedIn Intelligence | ₹12,000 | 4 hours |
| Phase 3: Contact Enrichment | $99-149 (~₹8-12k) | 4 hours |
| Phase 4: Visitor Intelligence | $99-300 (~₹8-25k) | 2 hours |
| Phase 5: Orchestration | - | 16 hours |
| **Total Monthly** | **₹28-49k/month** | **34 hours setup** |

**ROI Justification:**
- One enterprise deal = ₹25-50L
- If signals help close 1 additional deal per quarter = ₹1-2 Cr/year
- Signal investment = ~₹6L/year
- ROI = 15-30x

---

## Quick Wins: Start This Week

### Day 1-2: Google Alerts Setup
Create alerts for:
```
"[Company Name]" + ("new plant" OR "expansion" OR "logistics")
"VP Logistics" + "hired" + "India" + "[Industry]"
"TMS" + "India" + "manufacturing"
"supply chain digitization" + "India"
"logistics technology" + "investment" + "India"
```

### Day 3-4: LinkedIn Signal Capture
1. Go to LinkedIn Sales Navigator (or free LinkedIn)
2. Search: `"VP Logistics" OR "Head Supply Chain" India manufacturing`
3. Filter: Changed jobs in past 90 days
4. Save search, enable alerts
5. Note companies hiring

### Day 5: Website Signal Setup
1. Ensure GA4 is installed
2. Create custom event for pricing page views
3. Create custom event for demo page views
4. Set up weekly email report

---

## Signal-to-Action Playbooks

### Signal: New VP Logistics Hired
**Trigger:** LinkedIn alert for senior hire at target account
**Action Sequence:**
1. Day 1: Research new hire's background, priorities
2. Day 3: Add to LinkedIn network with personalized note
3. Day 7: Share relevant industry content
4. Day 14: Market research warmup outreach
5. Day 30: Value-add connection (case study, benchmark)

### Signal: New Plant Announcement
**Trigger:** Google Alert for expansion news
**Action Sequence:**
1. Day 1: Research announcement details (location, timeline, product)
2. Day 2: Identify logistics implications
3. Day 3: Personalize outreach around expansion logistics challenges
4. Day 7: Send case study from similar expansion
5. Day 14: Offer logistics planning consultation

### Signal: Pricing Page Visit (Identified)
**Trigger:** Website visitor intelligence
**Action Sequence:**
1. Hour 1: Notify sales of visit
2. Hour 2-4: Research visitor and account
3. Day 1: Personalized follow-up (if contact known)
4. Day 1: LinkedIn connection (if contact unknown)
5. Day 3: Demo offer

### Signal: Competitor Content Engagement
**Trigger:** Manual weekly LinkedIn scan
**Action Sequence:**
1. Day 1: Note account and contact in CRM
2. Day 2: Add to LinkedIn network
3. Day 3: Share differentiated content
4. Day 7: Direct comparison offer
5. Day 14: Case study from competitor switch

---

## References

- [The New Account-Based Playbook - Kyle Poyar & Pocus](https://www.pocus.com/blog/the-new-account-based-playbook-with-kyle-poyar-growth-unhinged)
- [ICP Marketing Done Right - Growth Unhinged](https://www.growthunhinged.com/p/icp-marketing-done-right)
- [2025 State of B2B GTM Report](https://www.growthunhinged.com/p/2025-state-of-b2b-gtm-report)
- [6 Signal Categories - LeadGenius](https://www.leadgenius.com/resources/the-6-signal-categories-that-power-smarter-b2b-go-to-market-strategies)
- [Signal-Based GTM Tech Stack - Pocus](https://www.pocus.com/blog/building-your-signal-based-gtm-tech-stack)
- [Vladimir Blagojević ABM Warmup Playbook](https://lt.linkedin.com/posts/vladimirblagojevic_heres-a-step-by-step-abm-warm-up-playbook-activity-7006966278028431360-0Ce8)
- [Clay Waterfall Enrichment](https://www.clay.com/blog/data-waterfalls)
- [CII Member Directory](https://www.cii.in/membersdirectory/index.html)
- [FICCI Corporate Members](https://ficci.in/corporate_member)
- [Manufacturing Today India](https://www.manufacturingtodayindia.com)
