# ROI Calculator Methodology

Complete framework for building credible business cases and ROI projections for Fretron TMS.

---

## ROI Philosophy

### Building Credible Business Cases

**The Problem with ROI Calculators**:
- Prospects are skeptical of vendor-provided ROI
- Inflated numbers destroy trust
- Generic calculations feel irrelevant
- "Savings" that can't be measured aren't real

**The Fretron Approach**:
1. **Conservative**: Always use low end of ranges
2. **Specific**: Tie to their actual numbers
3. **Verifiable**: Show the math clearly
4. **Validated**: Reference similar customers

### ROI Credibility Spectrum

```
LOW CREDIBILITY                              HIGH CREDIBILITY
     │                                             │
     ▼                                             ▼
Generic      Industry       Company-Specific    Customer-
Calculator   Benchmarks     Calculations        Validated
     │            │              │                  │
"You'll save   "Steel      "Based on your      "[Customer X]
 15-25%"    companies     500 shipments/day,   saved ₹1.2 Cr
             save X"       we project..."      in similar
                                               situation"
```

---

## Value Lever Categories

### Category 1: Hard Cost Reduction

Directly measurable, shows up in P&L.

| Lever | Typical Impact | Measurement |
|-------|----------------|-------------|
| Freight rate optimization | 5-15% | Rate/MT-km reduction |
| Detention/demurrage reduction | 25-50% | D&D charges |
| Invoice reconciliation efficiency | 70-90% | Dispute $ reduction |
| Carrier consolidation | 3-8% | Volume leverage |

### Category 2: Efficiency Gains

Labor time savings that can be redeployed.

| Lever | Typical Impact | Measurement |
|-------|----------------|-------------|
| Tracking call elimination | 80-90% | Calls/day reduction |
| Manual data entry | 60-80% | Hours/week saved |
| Reconciliation time | 70-90% | Days to close |
| Report generation | 80-95% | Hours/week saved |

### Category 3: Service Improvements

Customer satisfaction and retention impact.

| Lever | Typical Impact | Measurement |
|-------|----------------|-------------|
| OTIF improvement | 5-15 pts | On-time delivery % |
| ETA accuracy | 20-40 pts | ETA accuracy % |
| Customer escalations | 50-70% | Complaints/week |
| Delivery window compliance | 10-20 pts | Window adherence % |

### Category 4: Risk Mitigation

Avoided costs and compliance.

| Lever | Typical Impact | Measurement |
|-------|----------------|-------------|
| Audit compliance | Varies | Penalty avoidance |
| Claim accuracy | 80-95% | Dispute resolution |
| Documentation compliance | 90%+ | Accuracy rate |
| Carrier insurance verification | 100% | Coverage validation |

---

## Input Variables

### Company Profile Inputs

| Variable | How to Capture | Typical Range |
|----------|----------------|---------------|
| Annual freight spend | Ask directly | ₹5 Cr - ₹100 Cr+ |
| Shipments per day | Ask directly | 50 - 500+ |
| Number of plants | Ask directly | 1 - 20+ |
| Number of carriers | Ask or estimate | 10 - 100+ |
| Logistics team size | Ask directly | 5 - 50+ |

### Current State Inputs

| Variable | How to Capture | Why It Matters |
|----------|----------------|----------------|
| Tracking calls/day | Ask or observe | Efficiency baseline |
| Reconciliation cycle (days) | Ask directly | Working capital impact |
| Current OTIF % | Ask or estimate | Service baseline |
| Detention/demurrage % | Ask or estimate | Cost baseline |
| Excel dependency | Yes/No | Complexity indicator |

### Industry Benchmarks

**Steel Industry**:
- Freight cost: 4-7% of revenue
- Detention: 2-5% of freight cost
- Reconciliation: 30-60 days
- OTIF: 75-90%

**Cement Industry**:
- Freight cost: 15-25% of revenue
- Detention: 3-6% of freight cost
- Reconciliation: 45-90 days
- OTIF: 70-85%

**FMCG Industry**:
- Freight cost: 3-5% of revenue
- Detention: 1-3% of freight cost
- Reconciliation: 15-30 days
- OTIF: 85-95%

---

## Calculation Formulas

### 1. Tracking Call Elimination

**Input Variables**:
- Calls per day: [A]
- Cost per call (fully loaded): ₹25-50 [B]
- Reduction expected: 85% [C]
- Working days/year: 300 [D]

**Formula**:
```
Annual Savings = A × B × C × D

Example:
400 calls × ₹35 × 0.85 × 300 = ₹35.7 L/year
```

**Validation Questions**:
- "How many tracking calls does your team make daily?"
- "How many FTEs focus primarily on tracking?"
- "What's the loaded cost of those team members?"

### 2. Freight Rate Optimization

**Input Variables**:
- Annual freight spend: [A]
- Current rate optimization: [B] (usually 0-5%)
- Achievable optimization: 10-15% [C]
- Net improvement: C - B = [D]

**Formula**:
```
Annual Savings = A × D

Example:
₹25 Cr × 0.10 = ₹2.5 Cr/year
```

**Conservative Approach**:
```
Use minimum expected (10%) not maximum (15-20%)
First-year: 50% of potential (ramp-up)
```

**Validation Questions**:
- "Do you actively track rate compliance?"
- "How often do you renegotiate with carriers?"
- "What visibility do you have into rate benchmarks?"

### 3. Detention/Demurrage Reduction

**Input Variables**:
- Annual D&D charges: [A]
- Or: Annual freight spend × D&D % = [A]
- Reduction expected: 40% [B]

**Formula**:
```
Annual Savings = A × B

Example:
₹1.5 Cr (3% of ₹50 Cr) × 0.40 = ₹60 L/year
```

**Validation Questions**:
- "What do you pay in detention annually?"
- "What % of shipments incur detention?"
- "What's your average detention time?"

### 4. Reconciliation Efficiency

**Input Variables**:
- Monthly freight invoices processed: [A]
- Current reconciliation time (days): [B]
- Future reconciliation time (days): 7 [C]
- Average invoice value: [D]
- Cost of capital (annual %): 12% [E]

**Working Capital Formula**:
```
Working Capital Improvement = A × D × (B - C) / 365 × E / 12

Example:
500 invoices × ₹50,000 × (45 - 7) / 365 × 0.12 = ₹31.2 L/year
```

**Labor Savings Formula**:
```
Days saved × FTE cost × Frequency

Example:
38 days saved × ₹2,000/day × 12 months = ₹9.12 L/year
```

### 5. OTIF Improvement

**Input Variables**:
- Revenue at risk from poor OTIF: [A] (estimate 1-5% of revenue)
- Current OTIF: [B]
- Target OTIF: [C]
- Improvement rate: C - B = [D]

**Formula**:
```
Revenue Protected = A × (D / (1 - B))

Example:
₹2 Cr at risk × (0.10 / 0.15) = ₹1.33 Cr protected
```

**Validation Questions**:
- "Have you lost business due to delivery issues?"
- "What's the penalty for late deliveries?"
- "What does a 1% OTIF improvement mean for customer retention?"

### 6. Labor Productivity

**Input Variables**:
- Logistics team size: [A]
- Average loaded cost: [B]
- Time on manual tasks: [C] %
- Expected automation: [D] %

**Formula**:
```
Productivity Value = A × B × C × D

Example:
15 FTEs × ₹6 L/year × 0.60 (manual) × 0.70 (automated)
= ₹37.8 L/year in redeployable capacity
```

**Note**: Frame as "capacity freed" not "headcount reduction"

---

## ROI Summary Template

### One-Page Business Case

```
FRETRON TMS: BUSINESS CASE SUMMARY
═══════════════════════════════════════

Company: [Name]
Prepared For: [Contact Name, Title]
Date: [Date]
Prepared By: [Fretron Rep]

─────────────────────────────────────
YOUR CURRENT STATE
─────────────────────────────────────

Annual Freight Spend: ₹[X] Cr
Shipments/Day: [#]
Plants/Locations: [#]
Logistics Team Size: [#] FTEs
Current Tracking Method: [Excel/Manual/Partial TMS]

Key Challenges Identified:
• [Challenge 1]
• [Challenge 2]
• [Challenge 3]

─────────────────────────────────────
PROJECTED ANNUAL VALUE
─────────────────────────────────────

│ Value Lever                │ Conservative │ Realistic │
├────────────────────────────┼──────────────┼───────────┤
│ Tracking call reduction    │    ₹[X] L    │   ₹[X] L  │
│ Freight rate optimization  │    ₹[X] L    │   ₹[X] L  │
│ Detention reduction        │    ₹[X] L    │   ₹[X] L  │
│ Reconciliation efficiency  │    ₹[X] L    │   ₹[X] L  │
│ Other [specify]            │    ₹[X] L    │   ₹[X] L  │
├────────────────────────────┼──────────────┼───────────┤
│ TOTAL ANNUAL VALUE         │    ₹[X] Cr   │   ₹[X] Cr │

─────────────────────────────────────
INVESTMENT & ROI
─────────────────────────────────────

Annual Fretron Investment: ₹[X] L
(Transaction-based pricing at ₹[X]/shipment)

ROI Analysis (Conservative Scenario):
• Payback Period: [X] months
• Year 1 Net Benefit: ₹[X] L
• 3-Year Net Benefit: ₹[X] Cr
• ROI: [X]x investment

─────────────────────────────────────
VALIDATION
─────────────────────────────────────

Similar Customer Results:
• [Company A]: Achieved [X]% savings in [X] months
• [Company B]: Reduced tracking calls by [X]%

─────────────────────────────────────
ASSUMPTIONS
─────────────────────────────────────

• [Key assumption 1]
• [Key assumption 2]
• Conservative estimates used throughout
• First-year ramp-up factored in
• Results based on similar customer outcomes

─────────────────────────────────────
NEXT STEPS
─────────────────────────────────────

1. [Validate assumptions with your data]
2. [Review with [stakeholder]]
3. [Demo of specific capabilities]
```

---

## Detailed ROI Model

### Three-Year Projection

```
FRETRON TMS: 3-YEAR VALUE MODEL
═══════════════════════════════════════

ASSUMPTIONS
─────────────────────────────────────
Annual Freight Spend: ₹[X] Cr
Shipments/Year: [X]
Growth Rate: [X]% annually
Implementation: 6-8 weeks

─────────────────────────────────────
YEAR 1 (Ramp-Up Year)
─────────────────────────────────────

│ Value Lever          │ Q1   │ Q2   │ Q3   │ Q4   │ Total │
├──────────────────────┼──────┼──────┼──────┼──────┼───────┤
│ Tracking efficiency  │ 25%  │ 75%  │ 100% │ 100% │ 75%   │
│ Rate optimization    │ 0%   │ 25%  │ 50%  │ 75%  │ 38%   │
│ Detention reduction  │ 0%   │ 50%  │ 75%  │ 100% │ 56%   │
│ Reconciliation       │ 50%  │ 100% │ 100% │ 100% │ 88%   │

Year 1 Value Capture: [X]% of full potential

VALUE BREAKDOWN:
Tracking Efficiency:     ₹[X] L × 0.75 = ₹[X] L
Rate Optimization:       ₹[X] L × 0.38 = ₹[X] L
Detention Reduction:     ₹[X] L × 0.56 = ₹[X] L
Reconciliation:          ₹[X] L × 0.88 = ₹[X] L
─────────────────────────────────────────────────
Year 1 Total Value:                     ₹[X] L

Investment:              ₹[X] L
Implementation:          ₹[X] L
─────────────────────────────────────────────────
Year 1 Total Investment:                ₹[X] L

YEAR 1 NET:              ₹[X] L (positive/negative)

─────────────────────────────────────
YEAR 2 (Full Operation)
─────────────────────────────────────

Full potential realized across all levers.

VALUE BREAKDOWN:
Tracking Efficiency:     ₹[X] L
Rate Optimization:       ₹[X] L
Detention Reduction:     ₹[X] L
Reconciliation:          ₹[X] L
Additional optimization: ₹[X] L
─────────────────────────────────────────────────
Year 2 Total Value:                     ₹[X] Cr

Investment:              ₹[X] L
─────────────────────────────────────────────────
YEAR 2 NET:              ₹[X] Cr

─────────────────────────────────────
YEAR 3 (Optimization)
─────────────────────────────────────

Continuous improvement + volume growth.

Year 3 Value (with growth): ₹[X] Cr
Year 3 Investment:          ₹[X] L
─────────────────────────────────────────────────
YEAR 3 NET:                 ₹[X] Cr

─────────────────────────────────────
3-YEAR SUMMARY
─────────────────────────────────────

│ Metric                │ Value     │
├───────────────────────┼───────────┤
│ Total 3-Year Value    │ ₹[X] Cr   │
│ Total 3-Year Cost     │ ₹[X] L    │
│ Net 3-Year Benefit    │ ₹[X] Cr   │
│ 3-Year ROI            │ [X]x      │
│ Payback Period        │ [X] months│
```

---

## Sensitivity Analysis

### Conservative vs. Realistic Scenarios

```
SCENARIO ANALYSIS
═══════════════════════════════════════

│ Lever                 │Conservative│ Realistic │ Optimistic│
├───────────────────────┼────────────┼───────────┼───────────┤
│ Rate optimization     │    5%      │    10%    │    15%    │
│ Detention reduction   │    30%     │    45%    │    60%    │
│ Tracking reduction    │    75%     │    85%    │    95%    │
│ Reconciliation time   │   -50%     │   -75%    │   -85%    │
├───────────────────────┼────────────┼───────────┼───────────┤
│ Total Annual Value    │  ₹[X] L    │  ₹[X] Cr  │  ₹[X] Cr  │
│ Payback Period        │  [X] mo    │   [X] mo  │   [X] mo  │
│ 3-Year ROI            │   [X]x     │    [X]x   │    [X]x   │
```

**Scenario Definitions**:

- **Conservative**: Customer is skeptical, adoption is slow, partial data integration
- **Realistic**: Typical implementation based on similar customers
- **Optimistic**: Highly engaged customer, full adoption, proactive optimization

### Break-Even Analysis

```
BREAK-EVEN ANALYSIS
─────────────────────────────────────

At what point does Fretron pay for itself?

Annual Investment: ₹[X] L

Break-Even Requirements (any ONE of these):
• [X]% freight rate improvement, OR
• [X] fewer tracking calls/day, OR
• [X]% detention reduction, OR
• [X] days faster reconciliation

Probability Assessment:
Based on [X] similar implementations, break-even achieved in
[X] out of [X] cases within [X] months.
```

---

## Presentation Framework

### ROI Discussion Flow

**Step 1: Validate Inputs (5 min)**
```
"Before I show you the numbers, let me confirm I have
your situation right..."

[Review inputs, get corrections]

"Anything I'm missing that would significantly change
the picture?"
```

**Step 2: Show Current State Cost (5 min)**
```
"Based on what you've shared, here's what we estimate
your current situation costs..."

[Show hidden costs of status quo]

"Does this feel directionally accurate?"
```

**Step 3: Present Value Levers (10 min)**
```
"Here are the value levers that apply to your situation.
I've used conservative estimates—let me explain each one..."

[Walk through each lever with math visible]

"Which of these resonates most with what you're seeing?"
```

**Step 4: Show ROI Summary (5 min)**
```
"Putting it all together, here's the business case.
I want to be clear about what's conservative and what's
realistic..."

[Show one-page summary]

"Does this give you what you need for internal discussions?"
```

**Step 5: Address Skepticism (5 min)**
```
"I know ROI calculators can feel like selling tools.
Here's how I'd validate these numbers..."

[Reference similar customers, offer to connect]

"Would it help to speak with [similar customer]?"
```

---

## Validation Tactics

### Using Customer References

When presenting ROI, anchor to real results:

```
"This 15% rate optimization isn't hypothetical.
[Steel Company] achieved 18% in their first 6 months.
They're a similar size—₹20 Cr annual freight, 4 plants.
Happy to connect you with their logistics head."
```

### Inviting Scrutiny

Build trust by welcoming pushback:

```
"I'd rather you challenge these numbers now than feel
deceived later. Where would you push back?"

"What would you need to see to believe this?"

"Let's stress-test the most important lever—if that
one holds up, the rest is gravy."
```

### Pilot Approach

When ROI skepticism is high:

```
"I understand the skepticism. How about this:

Let's start with a 90-day pilot at one plant.
We'll agree on 2-3 metrics to track.
You measure the results yourself.

If we hit the targets, we expand.
If we don't, you walk away.

What would make that a fair test?"
```

---

## Common ROI Objections

### "Your numbers are too optimistic"

```
Response:
"You're right to be skeptical—vendor ROI calculators
usually are too optimistic. That's why I've used the
low end of our range (10% instead of 15-20%).

But let's stress-test it. Which number feels most
suspect to you? Let's dig into that one."

[Adjust calculation together]

"Even if we cut this in half, the payback is still
[X] months. Does that change the picture?"
```

### "We won't see those savings"

```
Response:
"Help me understand why. Is it that you don't believe
the lever exists, or that you don't believe we can
capture it?

[If lever doesn't exist]
Then let's take it out. Here's the case without it...

[If capture concern]
That's fair. Let's talk about what's required to
actually capture this. Here's what [similar company]
did..."
```

### "CFO won't believe this"

```
Response:
"What would make it credible for your CFO?

[If it's validation]
I can arrange a CFO-to-CFO call with a customer who's
seen similar results.

[If it's methodology]
Let's build the case together using your numbers and
your assumptions. Then it's your analysis, not mine.

[If it's proof]
What if we structured a pilot with clear metrics that
your CFO defines?"
```

### "We can't measure these savings"

```
Response:
"Some savings are easier to measure than others. Let's
separate them:

Directly measurable (show up in P&L):
• Detention charges reduction: ₹[X]
• Freight rate variance: ₹[X]

Indirectly measurable (require before/after):
• Tracking calls: Count them now, count them in 90 days
• Reconciliation time: Track it now, track it later

Strategic value (harder to quantify):
• Better carrier relationships
• Customer satisfaction

Even if we only count the directly measurable, the
case is still [X]x ROI. Make sense?"
```

---

## ROI Tool Checklist

### Before the Conversation

- [ ] Gather company profile data (public sources)
- [ ] Estimate freight spend (industry benchmarks)
- [ ] Identify likely value levers for their industry
- [ ] Prepare similar customer references
- [ ] Load template with pre-filled estimates

### During the Conversation

- [ ] Validate/correct input assumptions
- [ ] Capture actual numbers from prospect
- [ ] Note which levers resonate most
- [ ] Document skepticism points
- [ ] Agree on next steps for validation

### After the Conversation

- [ ] Send customized ROI summary
- [ ] Include calculation methodology
- [ ] Reference similar customers
- [ ] Offer validation call
- [ ] Follow up on skepticism points
