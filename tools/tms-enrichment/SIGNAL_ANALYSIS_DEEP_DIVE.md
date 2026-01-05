# TMS Buyer Signal Enrichment: Deep Dive Analysis

## Executive Summary

This document analyzes our TMS buyer signal enrichment strategy against the **LeadGenius 6 Signal Framework** (Kyle Poyar/Growth Unhinged methodology), evaluates what signals we've tried, and identifies gaps and opportunities.

---

## Part 1: The LeadGenius 6 Signal Framework

Based on [LeadGenius: The 6 Signal Categories That Power Smarter B2B Go-to-Market Strategies](https://www.leadgenius.com/resources/the-6-signal-categories-that-power-smarter-b2b-go-to-market-strategies):

| # | Signal Category | Definition | Key Data Points |
|---|----------------|------------|-----------------|
| 1 | **Firmographic** | Structural company characteristics | Headcount, revenue, locations, industry, growth/decline |
| 2 | **Technographic** | Technology stack and tools | Current software, legacy systems, recent adoptions |
| 3 | **Intent** | Research behavior signals | Content consumption, search patterns, topic surges |
| 4 | **Behavioral** | Actions on your properties | Website visits, demo requests, pricing page views |
| 5 | **Engagement** | Depth of interaction | Email opens, campaign responses, event attendance |
| 6 | **Demographic** | Individual characteristics | Titles, seniority, role changes, certifications |

---

## Part 2: Our Signal Mapping Against the Framework

### 2.1 Signals We Have (Strong Coverage)

#### FIRMOGRAPHIC SIGNALS - **95% Coverage**
| Signal | Source | Data Quality | Notes |
|--------|--------|--------------|-------|
| Company Name | CJ Darcl Dataset | Excellent | 2,510 accounts |
| Industry/Category | CJ Darcl | Excellent | 13 categories |
| Segment/Sub-Segment | CJ Darcl | Good | Detailed classification |
| Revenue (Sales_Rs_Cr) | CJ Darcl | Good | ₹400 Cr to ₹9.5 Lakh Cr range |
| Employee Count | CJ Darcl | Good | 600 to 1.3M employees |
| HQ Location | CJ Darcl | Excellent | City-level |
| Key Manufacturing Locations | CJ Darcl | Excellent | Multi-location data |
| **Logistics Spend** | CJ Darcl | **Unique** | ₹17 Cr to ₹5,500 Cr - KEY DIFFERENTIATOR |
| Account Type | CJ Darcl | Good | Expansion vs Penetration |
| Multi-location Complexity | Derived | Good | Location count scoring |

**TMS-Specific Firmographic Signals (Custom):**
- Logistics spend as % of revenue
- Number of manufacturing locations (logistics complexity)
- Geographic spread (state coverage)
- Industry logistics intensity

#### TECHNOGRAPHIC SIGNALS - **60% Coverage**
| Signal | Source | Status | Findings |
|--------|--------|--------|----------|
| Tech Stack Detection | BitScale BuiltWith | ✅ Working | Found 165-4101 technologies per company |
| TMS Vendor Detection | BitScale BuiltWith | ⚠️ Limited | Most companies don't expose TMS on website |
| ERP Presence | BitScale BuiltWith | ⚠️ Limited | SAP/Oracle detectable but not always |
| Website Technology | BitScale BuiltWith | ✅ Working | Good for digital maturity signal |

**Key Finding:** Traditional technographic signals (BuiltWith, SimilarTech) detect WEBSITE technologies, not BACKEND enterprise systems like TMS/ERP. This is a significant limitation for B2B enterprise software.

**Alternative Approaches Tried:**
- ✅ IT Hiring Trends (Perplexity) - Proxy for tech investment
- ✅ Supply Chain Priorities (Perplexity) - Proxy for modernization intent

#### DEMOGRAPHIC SIGNALS - **70% Coverage**
| Signal | Source | Status | Findings |
|--------|--------|--------|----------|
| Decision Makers | BitScale Find People | ✅ Working | Found 7-144 contacts per company |
| Titles/Roles | BitScale | ✅ Working | VP Ops, SCM Head, Logistics Manager |
| Contact Info | BitScale | ✅ Working | Emails, LinkedIn profiles |
| Role Changes | Not captured | ❌ Gap | Would need Sales Navigator |

**Top Companies by Contact Density:**
1. Reliance Industries: 144 contacts
2. Tata Motors: 77 contacts
3. Mahindra & Mahindra: 31 contacts
4. Hindalco Industries: 31 contacts
5. Maruti Suzuki: 25 contacts

---

### 2.2 Signals We're Missing (Gaps)

#### INTENT SIGNALS - **0% Coverage** (Major Gap)
| Signal | Why Missing | Potential Source | Cost |
|--------|-------------|------------------|------|
| Topic Research Surges | Requires intent data provider | Bombora, G2, TrustRadius | $$$$ |
| Content Downloads | 1st party - requires content | Build content/gated assets | Time |
| Competitor Comparisons | Requires review site data | G2, Capterra API | $$$ |
| Search Keywords | Requires search data | Google Ads, SEMrush | $$ |

**Impact:** Without intent signals, we can't identify accounts actively researching TMS solutions. We're relying purely on fit (firmographic) rather than timing (intent).

#### BEHAVIORAL SIGNALS - **0% Coverage** (Expected Gap)
| Signal | Why Missing | How to Build |
|--------|-------------|--------------|
| Website Visits | No tracking | Implement Clearbit Reveal, Leadfeeder |
| Demo Requests | No product demo | Build demo scheduling flow |
| Pricing Page Views | No pricing page | Create pricing/ROI calculator |
| Free Trial Usage | No freemium | N/A for TMS |

**Impact:** These are 1st party signals that require building Fretron's digital properties. Not addressable through enrichment.

#### ENGAGEMENT SIGNALS - **0% Coverage** (Expected Gap)
| Signal | Why Missing | How to Build |
|--------|-------------|--------------|
| Email Opens | No outreach yet | Requires SmartLead/Outreach |
| Campaign Responses | No campaigns | Requires marketing automation |
| Event Attendance | No events | Requires event strategy |

**Impact:** These signals emerge AFTER outreach begins. They measure campaign effectiveness, not prospect identification.

---

## Part 3: Custom TMS-Specific Signals We Created

### 3.1 Supply Chain Priorities (Perplexity AI)
**Prompt:** Research {Company Name} investor presentations, annual reports, leadership interviews. Extract: 1) Supply chain and logistics priorities, 2) Digital transformation in logistics, 3) Transportation challenges.

**Sample Results:**
| Company | Key Finding |
|---------|-------------|
| Mahindra | Investor materials emphasize supply chain resilience |
| Tata Motors | Prioritizes supply chain resilience, multi-modal logistics |
| Hindalco | IT department led by CTO, digital transformation focus |
| Reliance | Limited public supply chain information |
| Maruti Suzuki | Emphasizes production efficiency, supply chain optimization |

**Signal Value:** HIGH - Directly identifies companies with stated logistics priorities

### 3.2 IT Hiring Trends (Perplexity AI)
**Prompt:** Research {Company Name} IT digital transformation hiring. Find: 1) Recent IT leadership hires, 2) Tech job openings, 3) Digital initiatives, 4) IT team growth.

**Sample Results:**
| Company | Key Finding |
|---------|-------------|
| Hindalco | IT department led by CTO identified |
| Maruti Suzuki | Recent IT leadership hires found |
| Vedanta | No recent IT leadership hires identified |
| IOCL | No recent IT leadership hires available |

**Signal Value:** MEDIUM - IT hiring indicates digital investment but not specific to logistics

### 3.3 Company Recent News (BitScale)
**Purpose:** Identify trigger events - new plants, expansions, leadership changes

**Sample Results:**
| Company | Trigger Event |
|---------|---------------|
| Tata Motors | Q2 results show 25% sales growth |
| Hindalco | New copper smelter expansion announced |
| Reliance | Jio logistics arm expansion |

**Signal Value:** HIGH - Expansion triggers often precede logistics investment

---

## Part 4: Signal Effectiveness Assessment

### 4.1 Effectiveness Matrix

| Signal | Effort to Capture | Data Availability | Predictive Value | Recommendation |
|--------|------------------|-------------------|------------------|----------------|
| **Tier 0 Score** (Firmographic) | FREE | Excellent | HIGH | ✅ Keep - Core filter |
| **Tech Stack** | 2 credits | Good | LOW | ⚠️ Reduce - Limited TMS insight |
| **Find People** | 1 credit | Excellent | HIGH | ✅ Expand - Critical for outreach |
| **Social Media Handle** | 1 credit | Good | LOW | ⚠️ Optional - Nice to have |
| **Company News** | 2 credits | Good | MEDIUM | ✅ Keep - Trigger events |
| **Supply Chain Priorities** | 1 credit | Medium | HIGH | ✅ Expand - Strategic insight |
| **IT Hiring Trends** | 1 credit | Medium | MEDIUM | ⚠️ Keep - Secondary signal |

### 4.2 What Worked Well

1. **Firmographic Pre-filtering (Tier 0)** - Reduced 2,510 accounts to actionable segments
2. **Logistics Spend Scoring** - Unique signal, not available elsewhere
3. **Find People from Company** - High-quality decision maker contacts
4. **Perplexity AI for Custom Research** - Flexible, cost-effective alternative to structured data

### 4.3 What Didn't Work

1. **LinkedIn Active Jobs** - Required LinkedIn URLs but most companies had Twitter
2. **Tech Stack for TMS Detection** - BuiltWith sees websites, not enterprise backends
3. **Apollo Integration** - Requires API key setup (user configuration)

### 4.4 What We Should Add

1. **LinkedIn Company URL Enrichment** - First get proper LinkedIn URLs, THEN job data
2. **Leadership Change Detection** - New CXO = budget cycle opportunity
3. **Funding/Investment News** - Growth capital = expansion projects
4. **Competitor Mentions** - Companies mentioning SAP TM, Oracle TMS frustrations

---

## Part 5: Expanded Pilot - 100 Account Selection Strategy

### 5.1 Selection Criteria

To create a representative sample, we'll select 100 accounts:

| Tier | Score Range | Count | % |
|------|-------------|-------|---|
| Tier A | 100+ | 20 | 20% |
| Tier B | 80-99 | 30 | 30% |
| Tier C | 60-79 | 30 | 30% |
| Tier D | 40-59 | 20 | 20% |

### 5.2 Industry Distribution (100 accounts)

| Industry | Target | Notes |
|----------|--------|-------|
| Chemicals & Petrochemicals | 15 | Largest segment, hazmat logistics |
| Steel & Metals | 15 | Heavy logistics, multi-modal |
| FMCG & Consumer | 15 | High velocity, cold chain |
| Auto & Engineering | 15 | JIT, supply chain complexity |
| Mining & Minerals | 10 | Bulk logistics, specialized |
| Building & Construction | 10 | Project logistics |
| Energy & Fuel | 10 | Pipeline + trucking |
| Agriculture & Food | 10 | Seasonal, cold chain |

### 5.3 Enrichment Strategy for 100 Accounts

**Phase 1: Core Signals (Est. 200 credits)**
- Find People from Company (100 × 1 = 100 credits)
- Supply Chain Priorities (100 × 1 = 100 credits)

**Phase 2: Trigger Detection (Est. 200 credits)**
- Company Recent News (100 × 2 = 200 credits)

**Phase 3: Technology Signal (Est. 200 credits)**
- Tech Stack (100 × 2 = 200 credits)

**Total Estimated: 600 credits** (vs 72,438 available)

---

## Part 6: Recommendations

### Immediate Actions
1. Run 100-account expanded pilot with optimized signal set
2. Drop low-value signals (Social Media Handle, IT Hiring Trends)
3. Add LinkedIn Company URL enrichment before job data

### Medium-term Improvements
1. Build intent signal capture via content marketing
2. Implement website visitor identification (Clearbit/Leadfeeder)
3. Add G2/TrustRadius review monitoring for competitor mentions

### Strategic Considerations
1. Intent data providers (Bombora) are expensive ($50K+/year) - evaluate ROI
2. 1st party behavioral signals require product/content investment
3. Consider building "TMS Readiness Assessment" as gated content for intent capture

---

## Sources
- [LeadGenius: The 6 Signal Categories](https://www.leadgenius.com/resources/the-6-signal-categories-that-power-smarter-b2b-go-to-market-strategies)
- [Kyle Poyar's Growth Unhinged: ABM Tactical Guide](https://www.growthunhinged.com/p/a-very-tactical-guide-to-abm)
- [Pocus: New Account-Based Playbook](https://www.pocus.com/blog/the-new-account-based-playbook-with-kyle-poyar-growth-unhinged)

---

*Analysis Date: January 2026*
*Pilot Size: 10 accounts → Expanding to 100 accounts*
*Credits Available: 72,438*
