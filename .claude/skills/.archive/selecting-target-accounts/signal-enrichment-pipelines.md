# Signal Enrichment Pipelines for Fretron ABM

Strategic signal collection for sophisticated account qualification.

## Six Strategic Signals

| Signal | What It Indicates | Scoring Impact |
|--------|-------------------|----------------|
| **IT/Digital Team Density** | Tech investment culture, internal champions | Fit score modifier |
| **Premium Institute Alumni** | Sophisticated buyers, quality culture | Fit score modifier |
| **Event Participation** | Industry engagement, thought leadership | Intent score boost |
| **Outbound Email Engagement** | Interest level, responsiveness | Intent score |
| **AASDR/Telecalling Response** | Active interest, qualification status | Intent score |
| **CJ Darcl Customer Data** | Shipping volume, growth trajectory | Fit score modifier |

---

## Pipeline 1: IT/Digital Team Density

### Why This Matters

Companies with strong digital/IT teams:
- Have budget allocated for technology
- Have internal technical evaluators who understand TMS value
- Can implement faster (lower Fretron risk)
- Are culturally ready for digital transformation

### Metric: Digital Density Ratio

```
Digital Density = (IT/Digital/Tech employees) / (Total employees) × 100
```

| Density | Tier | Interpretation |
|---------|------|----------------|
| >5% | Tier 1 | Tech-first culture, strong signal |
| 2-5% | Tier 2 | Moderate tech focus |
| <2% | Tier 3 | Traditional, may need more education |

### Data Collection Pipeline

#### Method 1: LinkedIn Sales Navigator (Primary)

**Step-by-step process:**

1. **Open Sales Navigator** → Go to target account
2. **Click "View all employees"**
3. **Apply title filters** (one at a time, note counts):

```
Filter Set A - Technology Leadership:
- CIO OR "Chief Information Officer"
- CTO OR "Chief Technology Officer"
- "VP Technology" OR "VP IT" OR "VP Digital"
- "Head of IT" OR "Head of Technology" OR "Head of Digital"
- "Director IT" OR "Director Technology"

Filter Set B - Digital/Analytics:
- "Digital Transformation"
- "Data Science" OR "Data Analytics" OR "Data Engineer"
- "Business Intelligence"
- "Digital" (broad)

Filter Set C - IT Operations:
- "IT Manager" OR "IT Lead"
- "System Administrator" OR "Systems Engineer"
- "Software Engineer" OR "Developer"
- "ERP" OR "SAP" (indicates IT investment)
```

4. **Record total for each filter set**
5. **Get total employee count** from company page
6. **Calculate density ratio**

**Time required:** 10-15 minutes per account

#### Method 2: Apollo.io Department Data

Apollo provides department breakdown for many companies:

1. Search for company in Apollo
2. View company profile
3. Check "Departments" section
4. Note: Engineering, IT, Technology headcounts
5. Calculate ratio

**Accuracy:** Moderate (not all companies have this data)
**Time required:** 2-3 minutes per account

#### Method 3: Job Posting Analysis (Leading Indicator)

Companies actively hiring tech = growing their digital capability

1. **Naukri.com:** Search "[Company Name]" + filter by IT/Software
2. **LinkedIn Jobs:** Same search
3. **Track:**
   - Number of open tech roles
   - Seniority of roles (hiring VP IT = major initiative)
   - Tech stack mentioned (modern = sophisticated)

**Time required:** 5 minutes per account

### Automation Opportunities

**Clay.com Workflow:**
```
1. Input: Company name, LinkedIn URL
2. Action: LinkedIn company enrichment
3. Action: Custom search for employee count by title keywords
4. Action: Calculate ratio
5. Output: Digital density score
```

**Manual Template (Google Sheets):**

| Company | Total Employees | IT/Digital Count | Density % | Tier | Notes |
|---------|-----------------|------------------|-----------|------|-------|
| Tata Steel | 35,000 | 1,200 | 3.4% | T2 | SAP team large |
| UltraTech | 20,000 | 400 | 2.0% | T3 | Growing digital |

### Scoring Integration

Add to Fit Score (not Intent):

| Digital Density | Points |
|-----------------|--------|
| >5% | +10 |
| 2-5% | +5 |
| <2% | +0 |

---

## Pipeline 2: Premium Institute Alumni in Supply Chain

### Why This Matters

Companies hiring from premium institutes:
- Value expertise and pay for quality
- Have sophisticated buyers who understand SCM theory
- Supply chain has strategic importance (not just cost center)
- Alumni networks = referral potential

### Target Institutes

#### Tier 1 - Supply Chain Focused (Highest Signal)
| Institute | Why It Matters |
|-----------|----------------|
| **NITIE (IIM Mumbai)** | India's #1 SCM program, alumni network is gold |
| **IIM Ahmedabad** | Top B-school, operations management excellence |
| **IIM Bangalore** | Strong operations/SCM focus |
| **IIM Calcutta** | Operations research heritage |

#### Tier 1 - Technical Excellence
| Institute | Why It Matters |
|-----------|----------------|
| **IIT (any campus)** | Technical rigor, analytical mindset |
| **BITS Pilani** | Strong industry connections |
| **Top NITs** | Technical foundation |

#### Tier 2 - Premium Business
| Institute | Why It Matters |
|-----------|----------------|
| **ISB Hyderabad** | Executive education, senior leaders |
| **XLRI Jamshedpur** | Strong HR/operations focus |
| **MDI Gurgaon** | Operations management program |
| **SP Jain Mumbai** | SCM specialization |
| **IIM Indore/Lucknow/Kozhikode** | Growing reputation |
| **Great Lakes** | SCM specialization |

#### Tier 3 - Good Signal
| Institute | Why It Matters |
|-----------|----------------|
| **SIBM Pune** | Operations focus |
| **NMIMS** | Supply chain program |
| **SCMHRD Pune** | Dedicated SCM program |
| **IMT Ghaziabad** | Operations specialization |

### Data Collection Pipeline

#### Method 1: LinkedIn Sales Navigator Boolean Search

**For each target account, run these searches:**

```
Search 1 - NITIE Alumni in SCM Roles:
Company: [Target Company]
School: "NITIE" OR "National Institute of Industrial Engineering" OR "IIM Mumbai"
Title: "Supply Chain" OR "Logistics" OR "Procurement" OR "Operations"

Search 2 - IIM Alumni in SCM Roles:
Company: [Target Company]
School: "IIM" OR "Indian Institute of Management"
Title: "Supply Chain" OR "Logistics" OR "Procurement" OR "Operations"

Search 3 - IIT Alumni in SCM/Tech Roles:
Company: [Target Company]
School: "IIT" OR "Indian Institute of Technology"
Title: "Supply Chain" OR "Logistics" OR "Digital" OR "Analytics"
```

**Record for each search:**
- Number of matches
- Seniority levels (VP/Director = high signal)
- Specific names for outreach targeting

**Time required:** 15-20 minutes per account

#### Method 2: Focused Title + School Search

For key personas (VP Logistics, Head SCM), check their education:

1. Find the key decision-makers at target account
2. View their LinkedIn profiles
3. Check education section
4. Note institute and degree

**Time required:** 5 minutes per persona

#### Method 3: Alumni Network Leverage

If you have NITIE/IIM alumni on your team or advisory:

1. Check their LinkedIn for connections at target accounts
2. Warm introduction potential
3. Alumni events for networking

### Premium Institute Scoring

**Metric: Premium Alumni Index**

| Finding | Points |
|---------|--------|
| VP/Head SCM from Tier 1 institute | +15 |
| Director SCM from Tier 1 institute | +10 |
| Multiple Tier 1 alumni in SCM team | +10 |
| VP/Head from Tier 2 institute | +8 |
| Any Tier 1 alumni in logistics team | +5 |
| Tier 2/3 alumni present | +3 |
| No premium alumni found | +0 |

**Maximum: +15 points** (to Fit Score)

### Template for Tracking

| Company | Key SCM Person | Their Institute | Institute Tier | Alumni Count | Score |
|---------|----------------|-----------------|----------------|--------------|-------|
| Tata Steel | Rajesh Kumar, VP SCM | NITIE 2008 | T1 | 5 NITIE alumni | +15 |
| UltraTech | Amit Shah, Head Logistics | XLRI 2012 | T2 | 2 IIM alumni | +10 |
| JSW Steel | Priya Menon, Director | SIBM 2015 | T3 | 1 NITIE | +5 |

---

## Pipeline 3: Event Participation Signals

### Why This Matters

Event participation indicates:
- **Speakers:** Thought leaders, high visibility, strong signal
- **Panelists:** Industry recognition, likely to be approached by vendors
- **Attendees:** Active learners, engaged with industry trends
- **Sponsors:** Budget for visibility, marketing mindset

### Key Events to Monitor

#### Tier 1 Events (High Signal)
| Event | Organizer | Typical Timing | What to Track |
|-------|-----------|----------------|---------------|
| **CII Logistics Summit** | CII | Feb/Mar | Speakers, sponsors, attendees |
| **ET Logistics Leadership Summit** | Economic Times | Various | Speaker list, award winners |
| **CSCMP India Conference** | CSCMP India | Sep/Oct | Speakers, sponsors |
| **India Warehousing Show** | ITEI | Aug | Exhibitors, visitors |
| **AIMTC Annual Convention** | AIMTC | Various | Transporter networks |

#### Tier 2 Events (Good Signal)
| Event | Focus | What to Track |
|-------|-------|---------------|
| **Supply Chain Leadership Forum** | Leadership | Speakers |
| **Cold Chain Summit** | Cold chain logistics | Attendees |
| **E-commerce Logistics Summit** | E-comm focus | Speakers |
| **Manufacturing Excellence Awards** | Manufacturing | Nominees, winners |
| **Industry-specific logistics meets** | Vertical | Participants |

#### Tier 3 Events (Moderate Signal)
- Webinars by logistics tech companies
- LinkedIn Live events on SCM topics
- Industry association chapter meetings

### Data Collection Pipeline

#### Method 1: Event Website Scraping (Manual)

**Before/After major events:**

1. Visit event website
2. Find "Speakers" or "Agenda" page
3. Screenshot/copy speaker list
4. Note: Name, Title, Company
5. Cross-reference with target account list

**Template:**

| Event | Date | Person | Title | Company | On Target List? |
|-------|------|--------|-------|---------|-----------------|
| CII Logistics 2024 | Mar 2024 | Rajesh Kumar | VP SCM | Tata Steel | Yes - Tier 1 |
| ET Summit | Nov 2024 | Amit Shah | Head Logistics | Ultratech | Yes - Tier 1 |

**Time required:** 30-60 minutes per major event

#### Method 2: LinkedIn Event Tracking

**Search for event-related posts:**

```
LinkedIn Search:
"CII Logistics Summit" + "speaker" OR "speaking" OR "panelist"
"CSCMP India" + "attending" OR "looking forward"
#LogisticsSummit + India
```

**What to note:**
- Who posted about attending/speaking
- Who engaged (liked/commented)
- Company representation

**Automation:** Set up LinkedIn saved searches for event hashtags

#### Method 3: News & PR Monitoring

**Google Alerts for events:**
```
"CII Logistics Summit" + speaker
"Supply Chain Leadership" + award + India
"Logistics Excellence" + winner + [Industry]
```

**Check:**
- Press releases about speaking engagements
- Award announcements
- Post-event coverage with attendee quotes

#### Method 4: Event Sponsor Tracking

Sponsors have budget AND want visibility:

1. Check event website "Sponsors" page
2. Note: Platinum/Gold/Silver sponsors
3. These companies are investing in SCM visibility
4. Strong signal for technology investment

### Event Participation Scoring

**Add to Intent Score:**

| Signal | Points | Decay |
|--------|--------|-------|
| Spoke at Tier 1 event (last 12 mo) | +15 | 12 months |
| Sponsored Tier 1 event | +12 | 12 months |
| Spoke at Tier 2 event | +10 | 12 months |
| Attended Tier 1 event (confirmed) | +8 | 6 months |
| Won logistics/SCM award | +10 | 12 months |
| Multiple event appearances | +5 bonus | - |
| Posted about SCM events on LinkedIn | +3 | 3 months |

**Maximum: +20 points** (Intent Score)

---

## Pipeline 4: Outbound Email Engagement

### Why This Matters

Email engagement signals reveal:
- **Opens:** Awareness, curiosity (weak signal alone)
- **Clicks:** Active interest in content/offer (strong signal)
- **Replies:** Engaged, willing to converse (very strong signal)
- **Meeting booked:** Ready for sales conversation (strongest signal)

### Email Engagement Tiers

| Behavior | Signal Strength | What It Means |
|----------|-----------------|---------------|
| No opens | Cold | Not seeing emails, wrong contact, or spam folder |
| Opens only | Lukewarm | Aware but not compelled to act |
| Opens + Clicks | Warm | Interested in content, exploring |
| Reply (any) | Hot | Engaged enough to respond |
| Reply (positive) | Very Hot | Interested, move to qualification |
| Meeting booked | Sales-ready | Hand-raiser, prioritize immediately |

### Data Collection Pipeline

#### Source: Email Platform (HubSpot, Mailchimp, Outreach, etc.)

**Metrics to Track Per Account:**

| Metric | How to Calculate | Update Frequency |
|--------|------------------|------------------|
| Total emails sent | Count of emails to account contacts | Real-time |
| Open rate | Opens / Sent × 100 | Weekly |
| Click rate | Clicks / Sent × 100 | Weekly |
| Reply rate | Replies / Sent × 100 | Weekly |
| Last engagement date | Most recent open/click/reply | Real-time |
| Engagement trend | Comparing last 30 days to prior 30 | Monthly |

**Engagement Score Calculation:**

```
Email Engagement Score =
  (Unique opens × 1) +
  (Unique clicks × 3) +
  (Replies × 10) +
  (Positive replies × 5 bonus) +
  (Meeting booked × 20)
```

#### Integration Workflow

1. **CRM Integration:** Sync email engagement to account record
2. **Threshold Alerts:** Notify sales when score crosses threshold
3. **Decay:** Reduce points by 50% after 30 days of no activity

### Email Engagement Scoring

**Add to Intent Score:**

| Signal | Points | Decay |
|--------|--------|-------|
| Meeting booked from email | +20 | None |
| Positive reply | +15 | 30 days |
| Any reply | +10 | 30 days |
| Multiple clicks (3+) | +8 | 14 days |
| Single click | +5 | 14 days |
| Multiple opens (5+) | +3 | 7 days |
| Single open | +1 | 7 days |

**Maximum: +20 points** (Intent Score, caps at meeting booked)

### Template for Tracking

| Account | Emails Sent | Open Rate | Click Rate | Replies | Last Activity | Score |
|---------|-------------|-----------|------------|---------|---------------|-------|
| Tata Steel | 12 | 45% | 12% | 1 | 2024-12-20 | +12 |
| UltraTech | 8 | 25% | 0% | 0 | 2024-11-15 | +3 |
| JSW Steel | 15 | 60% | 25% | 2 (positive) | 2024-12-26 | +18 |

---

## Pipeline 5: AASDR/Telecalling Engagement

### Why This Matters

Phone/AI SDR engagement provides:
- **Real-time qualification:** Direct conversation reveals fit and timing
- **Objection capture:** Understanding why they're not ready
- **Contact validation:** Confirming right person and working number
- **Urgency signals:** Hearing tone and priority level

### AASDR Outcome Categories

| Outcome | Signal Strength | Next Action |
|---------|-----------------|-------------|
| **Connected + Interested** | Very Hot | Schedule demo, add to Tier 1 |
| **Connected + Future Interest** | Warm | Nurture, follow up in X months |
| **Connected + Not Interested** | Cold | Note reason, deprioritize |
| **Voicemail Left** | Neutral | Continue sequence |
| **No Answer** | Neutral | Retry with different timing |
| **Wrong Number** | Data issue | Update contact, find new number |
| **Gatekeeper Block** | Need strategy | Try different entry point |
| **Referred to Colleague** | Warm | Follow referral, note champion |

### Data Collection Pipeline

#### Source: AASDR Platform / Call Logs

**Metrics to Track Per Account:**

| Metric | Definition | Update |
|--------|------------|--------|
| Total call attempts | Number of dials to account | Real-time |
| Connection rate | Connects / Attempts × 100 | Weekly |
| Conversation count | Meaningful conversations (2+ min) | Real-time |
| Qualification status | Qualified / Not Qualified / Pending | Per call |
| Objection captured | Why not interested (if applicable) | Per call |
| Next step agreed | Follow-up date, action item | Per call |
| Referral given | Name of referred contact | Per call |

#### Call Disposition Codes

Standardize these in your AASDR system:

| Code | Meaning | Score Impact |
|------|---------|--------------|
| `DEMO_BOOKED` | Meeting scheduled | +25 pts |
| `INTERESTED` | Wants follow-up, not ready now | +15 pts |
| `FUTURE_EVAL` | Evaluating in 3-6 months | +10 pts |
| `INFO_SENT` | Requested materials | +8 pts |
| `REFERRAL` | Gave another contact name | +8 pts |
| `NOT_NOW` | Timing not right | +3 pts |
| `NOT_FIT` | Wrong ICP, don't pursue | -10 pts |
| `COMPETITOR` | Using competitor, locked in | -5 pts |
| `NO_ANSWER` | Couldn't reach | +0 pts |
| `GATEKEEPER` | Blocked by assistant | +0 pts |

### AASDR Engagement Scoring

**Add to Intent Score:**

| Signal | Points | Decay |
|--------|--------|-------|
| Demo/meeting booked | +25 | None |
| Expressed active interest | +15 | 60 days |
| Future evaluation (3-6 mo) | +10 | 90 days |
| Requested info/materials | +8 | 30 days |
| Gave referral to decision-maker | +8 | 60 days |
| Polite decline, timing issue | +3 | 30 days |
| Hard no, wrong fit | -10 | - |
| Confirmed competitor lock-in | -5 | 6 months |

**Maximum: +25 points** (Intent Score)

### Call Intelligence to Capture

During AASDR calls, capture these data points:

| Field | Why It Matters |
|-------|----------------|
| Current solution | Competitive intelligence |
| Pain points mentioned | Messaging refinement |
| Budget cycle timing | When to re-engage |
| Decision-maker name | Contact expansion |
| Evaluation timeline | Pipeline forecasting |
| Competitor mentions | Battlecard material |

### Template for Tracking

| Account | Attempts | Connects | Outcome | Next Step | Score |
|---------|----------|----------|---------|-----------|-------|
| Tata Steel | 5 | 2 | INTERESTED | Send case study, call Jan 15 | +15 |
| UltraTech | 8 | 0 | NO_ANSWER | Try mobile, different time | +0 |
| JSW Steel | 3 | 1 | DEMO_BOOKED | Demo Jan 5 | +25 |
| Hindalco | 4 | 1 | FUTURE_EVAL | Q2 budget cycle | +10 |

---

## Pipeline 6: CJ Darcl Customer Data Integration

### Why This Matters

CJ Darcl network data provides:
- **Actual shipping volume:** Real transaction data, not estimates
- **Growth trajectory:** Trend over time shows expanding logistics needs
- **Lane data:** Which routes they ship on (geographic fit)
- **Frequency:** Regular vs sporadic shippers
- **Seasonality:** Understanding their business cycles

### CJ Darcl Data Value

| Data Point | Signal Value | Fretron Implication |
|------------|--------------|---------------------|
| **High Volume Shipper** | Large logistics operation | High TMS value, bigger deal size |
| **Growing Volume (YoY)** | Expanding business | Likely outgrowing manual processes |
| **Multi-Lane Shipper** | Complex network | Needs optimization, visibility |
| **Consistent Shipper** | Stable operations | Reliable customer potential |
| **New Customer (recent)** | Just started shipping more | May be evaluating solutions |

### Volume Tier Classification

| Monthly Loads | Tier | Interpretation |
|---------------|------|----------------|
| 500+ loads/month | Tier 1 | Enterprise shipper, high-priority target |
| 100-499 loads/month | Tier 2 | Mid-market, good potential |
| 20-99 loads/month | Tier 3 | Smaller, but may grow |
| <20 loads/month | Tier 4 | Low priority for direct sales |

### Growth Signal Classification

| YoY Growth | Signal | Priority |
|------------|--------|----------|
| >50% growth | Hypergrowth | Highest - likely in pain |
| 20-50% growth | Strong growth | High - scaling challenges |
| 5-20% growth | Steady growth | Medium - proactive outreach |
| Flat (±5%) | Stable | Standard priority |
| Declining | Shrinking | Lower priority, unless turnaround |

### Data Integration Pipeline

#### Step 1: Data Export from CJ Darcl

**Required Fields:**

| Field | Description | Use |
|-------|-------------|-----|
| `company_name` | Shipper name | Account matching |
| `company_id` | Unique identifier | Deduplication |
| `monthly_loads_current` | Loads this month | Volume tier |
| `monthly_loads_prev_year` | Loads same month last year | Growth calc |
| `total_loads_ytd` | Year-to-date loads | Annual volume |
| `total_loads_prev_ytd` | Previous YTD | YoY comparison |
| `primary_lanes` | Top origin-destination pairs | Geographic fit |
| `first_shipment_date` | When they started | New vs established |
| `last_shipment_date` | Most recent activity | Active status |

#### Step 2: Data Processing

**Calculate derived metrics:**

```
Volume Tier = Based on monthly_loads_current
Growth Rate = (monthly_loads_current - monthly_loads_prev_year) / monthly_loads_prev_year × 100
Active Status = last_shipment_date within 90 days
New Customer = first_shipment_date within 12 months
```

#### Step 3: Account Matching

Match CJ Darcl records to target account list:

1. **Exact match:** Company name matches exactly
2. **Fuzzy match:** Similar names (use Levenshtein distance)
3. **Manual review:** Flag ambiguous matches for human verification
4. **Enrichment:** Add CJ Darcl data to matched account profiles

#### Step 4: Scoring Integration

**Add CJ Darcl data to Fit Score as volume/growth bonus**

### CJ Darcl Scoring

**Add to Fit Score (Volume & Growth Bonus):**

| Signal | Points | Notes |
|--------|--------|-------|
| Tier 1 volume (500+ loads/mo) | +15 | Enterprise shipper |
| Tier 2 volume (100-499 loads/mo) | +10 | Mid-market |
| Tier 3 volume (20-99 loads/mo) | +5 | Growth potential |
| Hypergrowth (>50% YoY) | +10 | Scaling pain likely |
| Strong growth (20-50% YoY) | +7 | Growing needs |
| Steady growth (5-20% YoY) | +4 | Expanding |
| New customer (<12 months) | +5 | Evaluating solutions |
| Multi-lane (5+ routes) | +5 | Complex network |

**Maximum: +25 points** (Fit Score - volume + growth + complexity)

### Template for CJ Darcl Data Tracking

| Account | Monthly Loads | Volume Tier | YoY Growth | Lanes | New Customer | CJ Darcl Score |
|---------|---------------|-------------|------------|-------|--------------|----------------|
| Tata Steel | 850 | T1 | +35% | 12 | No | +22 (T1+growth+lanes) |
| UltraTech | 420 | T2 | +15% | 8 | No | +14 (T2+steady+lanes) |
| JSW Steel | 280 | T2 | +65% | 6 | No | +22 (T2+hyper+lanes) |
| New Mfg Co | 85 | T3 | N/A | 3 | Yes | +10 (T3+new) |

### CJ Darcl Sync Workflow

**Weekly:**
1. Export latest CJ Darcl shipping data
2. Calculate volume tiers and growth rates
3. Match to target account list
4. Update account profiles with new data
5. Flag accounts with significant volume/growth changes

**Monthly:**
1. Full data refresh
2. Identify new CJ Darcl customers matching ICP
3. Add qualified new accounts to target list
4. Re-score all accounts with CJ Darcl data

### Prospecting from CJ Darcl Data

**Finding New Targets:**

CJ Darcl data can identify companies NOT on your target list but matching ICP:

```
Filter:
- Monthly loads > 100
- YoY growth > 20%
- Industry: Manufacturing (if available)
- NOT in current CRM

→ Export list for qualification
→ Research each for other ICP criteria
→ Add qualified accounts to target list
```

---

## Unified Enrichment Workflow

### Daily Pipeline Process

**Daily: Outreach Engagement Review (15 min)**
1. Check email platform for new opens/clicks/replies
2. Review AASDR call outcomes from previous day
3. Update hot accounts in CRM
4. Alert sales on high-engagement accounts

### Weekly Pipeline Process

**Monday: Event Monitoring + Engagement Sync (45 min)**
1. Check upcoming event websites for speaker announcements
2. Review LinkedIn for event-related posts from target accounts
3. Update event participation tracker
4. Sync weekly email engagement metrics to account records
5. Review AASDR weekly summary

**Tuesday: New Hire Alerts (30 min)**
1. Review LinkedIn Sales Navigator alerts
2. Check for VP/Director level SCM hires
3. Research new hires' backgrounds (institute, previous companies)
4. Update account profiles

**Wednesday: Digital Density Batch (1 hour)**
1. Pick 5 target accounts for deep research
2. Run LinkedIn employee searches
3. Calculate digital density ratios
4. Update scoring

**Thursday: Premium Alumni Search (1 hour)**
1. Pick 5 target accounts
2. Run institute-based searches
3. Identify key alumni at each
4. Note warm introduction paths
5. Update account profiles

**Friday: CJ Darcl Sync + Consolidation (1 hour)**
1. Export latest CJ Darcl shipping data
2. Match to target accounts, update volume/growth scores
3. Update master account scoring
4. Flag accounts with score changes
5. Prioritize for next week's outreach
6. Report on signal trends

### Monthly Deep Dive

1. **Score all Tier 1 accounts** on all six signals
2. **Re-rank accounts** based on new scores
3. **Identify signal gaps** (accounts with missing data)
4. **CJ Darcl prospecting:** Find new high-volume shippers matching ICP
5. **Engagement analysis:** Review email/AASDR patterns for optimization
6. **Plan enrichment focus** for next month

---

## Updated Account Profile Schema

```markdown
## Account: [Company Name]

### Firmographics
- Revenue: ₹[X] Cr
- Industry: [Specific vertical]
- Employees: [X]
- Locations: [Plants/Offices]
- Shipment Volume: [X] loads/day

### Current State
- Current Solution: [Excel/Legacy/Competitor]
- Known Challenges: [List]
- Tech Stack: [ERP, relevant systems]

### CJ Darcl Data
- Monthly Loads: [X]
- Volume Tier: [T1/T2/T3/T4]
- YoY Growth: [X]%
- Growth Classification: [Hypergrowth/Strong/Steady/Flat/Declining]
- Primary Lanes: [List top routes]
- New Customer: [Yes/No - first shipment date]
- Last Shipment: [Date]
- CJ Darcl Score: [X]/25

### Strategic Signals

#### Digital Maturity
- Total Employees: [X]
- IT/Digital Team Size: [X]
- Digital Density: [X]%
- Digital Density Tier: [1/2/3]
- Key Tech Leaders: [Names, titles]
- Notes: [SAP implementation, digital initiatives, etc.]
- Digital Density Score: [X]/10

#### Premium Institute Presence
- Key SCM Decision Maker: [Name, Title]
- Their Institute: [Name, Year, Tier]
- Other Premium Alumni in SCM: [Count]
- Institutes Represented: [List]
- Warm Connection Path: [If any alumni connection exists]
- Premium Alumni Score: [X]/15

#### Industry Engagement
- Recent Event Appearances: [List with dates]
- Speaking Engagements: [List]
- Awards/Recognition: [List]
- Event Sponsorships: [List]
- LinkedIn Thought Leadership: [Active/Moderate/Low]
- Event Participation Score: [X]/20

### Outbound Engagement

#### Email Engagement
- Total Emails Sent: [X]
- Open Rate: [X]%
- Click Rate: [X]%
- Replies: [X] (Positive: [X], Neutral: [X], Negative: [X])
- Last Email Engagement: [Date]
- Email Engagement Score: [X]/20

#### AASDR/Telecalling Engagement
- Total Call Attempts: [X]
- Connections: [X]
- Connection Rate: [X]%
- Last Call Outcome: [DEMO_BOOKED/INTERESTED/FUTURE_EVAL/NOT_NOW/etc.]
- Call Notes: [Key insights from conversations]
- Objections Captured: [List]
- Referrals Given: [Names, if any]
- Next Follow-up: [Date and action]
- AASDR Score: [X]/25

### Trigger/Timing
- Active Trigger: [Yes/No - describe]
- Urgency: [High/Medium/Low]
- Budget Cycle: [When]

### Contacts (Buying Committee)
| Name | Title | Role | Institute | Email Eng. | Call Eng. |
|------|-------|------|-----------|------------|-----------|
| [Name] | VP Logistics | Champion | NITIE '10 | Clicked | Interested |
| [Name] | CFO | Economic Buyer | IIM-A '05 | Opened | No contact |
| [Name] | CIO | Influencer | IIT-B '08 | No open | Gatekeeper |

### Scoring Summary
| Component | Score | Max |
|-----------|-------|-----|
| **BASE FIT** | | |
| Industry Match | [X] | 15 |
| Company Size | [X] | 15 |
| Shipment Volume | [X] | 15 |
| Current Tech State | [X] | 15 |
| *Base Fit Subtotal* | [X] | 60 |
| **FIT BONUSES** | | |
| CJ Darcl Volume/Growth | [X] | 25 |
| Digital Density | [X] | 10 |
| Premium Alumni | [X] | 15 |
| *Fit Bonus Subtotal* | [X] | 50 |
| **ADJUSTED FIT SCORE** | [X] | 110 |
| **BASE INTENT** | | |
| Trigger Signals | [X] | 40 |
| *Base Intent Subtotal* | [X] | 40 |
| **INTENT BONUSES** | | |
| Event Participation | [X] | 20 |
| Email Engagement | [X] | 20 |
| AASDR Engagement | [X] | 25 |
| *Intent Bonus Subtotal* | [X] | 65 |
| **ADJUSTED INTENT SCORE** | [X] | 105 |
| **TOTAL SCORE** | [X] | 215 |

### Tier Assignment (Based on 215-point scale)
| Score | Tier | Action |
|-------|------|--------|
| 160+ | Strategic T1 | High-touch ABM, founder involvement |
| 110-159 | Target T2 | Medium-touch ABM |
| 60-109 | Awareness T3 | Programmatic nurture |
| <60 | Not Now | Deprioritize |

**Current Tier:** [T1/T2/T3/Not Now]

### Notes
- [Key observations]
- [Competitive intel]
- [Connection points]
- [Alumni leverage opportunities]
- [CJ Darcl insights]
- [Call/email conversation highlights]
```

---

## Automation Roadmap

### Phase 1: Manual + Templates (Now)
- Google Sheets for tracking
- Manual LinkedIn searches
- Weekly pipeline process

### Phase 2: Semi-Automated (Month 2-3)
- Clay.com for company enrichment
- LinkedIn Sales Navigator saved searches with alerts
- Zapier for event website monitoring

### Phase 3: Full Pipeline (Month 4+)
- Clay waterfall for all signals
- CRM integration for scoring
- Automated alert triggers
- Dashboard for signal monitoring

---

## Quick Reference: Search Queries

### LinkedIn Sales Navigator

**Digital Team Search:**
```
Current company: [Target]
Title: CIO OR CTO OR "VP Technology" OR "VP IT" OR "Head of IT" OR "Director IT" OR "Digital Transformation" OR "Data Science"
```

**Premium Alumni Search:**
```
Current company: [Target]
School: NITIE OR "IIM" OR "Indian Institute of Management"
Title: "Supply Chain" OR "Logistics" OR "Procurement" OR "Operations"
```

**Event Engagement Search:**
```
Keywords: "CII Logistics" OR "CSCMP" OR "supply chain summit"
Posted by: People at [Target Company]
Posted: Past month
```

### Google Alerts

```
"[Target Company]" + "supply chain" + ("award" OR "speaker" OR "event")
"[Target Company]" + "digital transformation" + "logistics"
"VP Logistics" OR "Head Supply Chain" + "joins" + "[Industry]"
"NITIE" OR "IIM" + "supply chain" + "appointed"
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Accounts with digital density data | 100% of Tier 1 | Monthly audit |
| Accounts with alumni data | 100% of Tier 1 | Monthly audit |
| Event signals captured | 80% of major events | Post-event check |
| Time per account enrichment | <30 min | Process timing |
| Signal-to-meeting correlation | Track and refine | Quarterly analysis |
