# Stage 2: Data-backed Simulation Templates

## Purpose
Convert diagnostic insights into quantified business case using customer's actual shipment data.

## Timeline
- **Data request:** Immediately after intro meeting
- **Data receipt:** Within 3–5 business days
- **Analysis:** 3–5 business days
- **Results presentation:** 45-minute session

---

## 1. Data Spec Template

### Minimum Required Fields

**Shipment-level data for 3–6 months:**

| Field | Description | Example | Required |
|-------|-------------|---------|----------|
| Shipment ID | Unique identifier | SHP12345 | Yes |
| Date | Dispatch date | 2024-08-15 | Yes |
| Origin | Plant/DC name | Jamshedpur Plant | Yes |
| Destination | Customer/Hub name | Mumbai Hub | Yes |
| Lane ID | Optional lane code | JAM-MUM | No |
| Weight (MT) | Shipment weight in metric tons | 24.5 | Yes |
| Volume (m³) | Optional cube data | 42 | No |
| Distance (km) | Route distance | 1920 | Yes |
| Freight Cost (₹) | Total freight charge | 218500 | Yes |
| Vendor/Carrier | Transporter name | Tata Transport | Yes |
| Vehicle Type | Truck capacity | 32T Truck | Yes |
| Dispatch Time | Gate-out timestamp | 2024-08-15 08:30 | No |
| Delivery Time | POD timestamp | 2024-08-17 10:45 | No |
| Detention (hrs) | Plant + consignee detention | 5.5 | No |
| EWB Status | Valid/Invalid/Missing | Valid | No |
| POD Status | Received/Pending | Received | No |

### Format
- **Preferred:** Excel (.xlsx) or CSV
- **Acceptable:** Database export, ERP extract
- **Rows:** 500–5000 shipments (representative sample)

### Confidentiality
- No customer names needed (can mask as "Cust_001")
- No contract rates needed (actual freight paid is sufficient)
- Data handled under NDA

---

## 2. Internal Analysis Template

### Step 1: Baseline KPI Calculation

**Create Excel/Python workbook with tabs:**

#### Tab 1: Cost KPIs
- **C01:** Total Freight Cost = SUM(Freight Cost)
- **C02:** PKMMT = Total Freight / (Total MT × Total KM)
- **C05:** Cost per Shipment = Total Freight / Count(Shipments)
- **C06:** Accessorial Cost % = Detention Cost / Total Freight

**By Lane:**
- Group by Origin-Destination
- Calculate lane-level PKMMT
- Rank lanes by cost efficiency
- Identify top 10 worst-performing lanes

**By Vendor:**
- Calculate vendor-level PKMMT
- Compare vs market benchmarks
- Flag outlier vendors (>10% above median)

---

#### Tab 2: Efficiency KPIs
- **E01:** Weight Utilization = AVG(Weight / Vehicle Capacity)
- **E02:** Volume Utilization = AVG(Volume / Vehicle Volume Capacity) [if data available]
- **E04:** LTL % = COUNT(Weight < 0.8 × Capacity) / Total Shipments × 100
- **E06:** Avg Detention = AVG(Detention Hours)

**Consolidation Opportunity:**
- Identify same-day, same-lane LTL shipments
- Calculate potential FTL conversions
- Estimate PKMMT reduction from consolidation

---

#### Tab 3: Service KPIs
- **S01:** OTD % = COUNT(Delivery Time ≤ Promised Time) / Total × 100 [if timestamp available]
- **S05:** Avg Transit Time = AVG(Delivery Time - Dispatch Time) [if timestamps available]

**By Lane:**
- Calculate lane-level OTD %
- Identify worst-performing lanes
- Compare actual vs optimal transit time

---

#### Tab 4: Compliance KPIs
- **CP01:** EWB Compliance = COUNT(Valid EWB) / Total × 100
- **CP02:** POD Capture = COUNT(POD Received) / Total × 100

---

### Step 2: Lever Opportunity Analysis

**For each recommended lever, create a modeling tab:**

#### LU10: LTL→FTL Consolidation

**Method:**
1. Filter shipments with weight < 0.75 × capacity
2. Group by: Same Date, Same Origin, Same Destination, Distance ± 10%
3. Simulate consolidation into multi-drop FTL routes
4. Calculate:
   - Baseline: LTL shipments × LTL PKMMT
   - Simulated: Consolidated FTL trips × FTL PKMMT
   - Savings = (Baseline - Simulated) / Baseline × 100

**Output:**
- **Consolidation Opportunity:** X% of shipments (Y MT) can be consolidated
- **Current LTL%:** 38%
- **Post-Lever LTL%:** 22–26%
- **PKMMT Impact:** -8–12%
- **Annual Savings:** ₹X–Y

---

#### TB01: Digital Spot Bidding

**Method:**
1. Filter shipments with spot vendors (non-contracted)
2. Calculate avg spot PKMMT vs contracted PKMMT
3. Apply benchmark: 3–7% spot cost reduction via digital bidding

**Output:**
- **Spot Volume:** X% of total (₹Y annual)
- **Current Spot Premium:** Z% above contract rates
- **Post-Lever Spot Cost:** -3–7%
- **Annual Savings:** ₹X–Y on spot volume

---

#### RS19: Route Optimization

**Method:**
1. For each lane, calculate:
   - Actual distance (from data)
   - Shortest path distance (Google Maps API or internal map)
   - Deviation % = (Actual - Shortest) / Shortest × 100
2. Apply benchmark: 2–5% distance savings via optimization

**Output:**
- **Lanes with >10% Deviation:** X lanes (Y% of volume)
- **Avg Deviation:** Z%
- **Post-Lever Distance Reduction:** 2–5%
- **PKMMT Impact:** -2–5%
- **Transit Time Impact:** -5–12%
- **Annual Savings:** ₹X–Y

---

#### YG52: Gate Scheduling & Appointment Booking

**Method:**
1. Filter shipments with detention data
2. Calculate avg detention hours by plant
3. Apply benchmark: 30–50% detention reduction via gate scheduling

**Output:**
- **Current Avg Detention:** X hrs
- **High-Detention Plants:** [List]
- **Post-Lever Detention:** 30–50% reduction
- **Detention Cost Savings:** ₹X–Y per year
- **Throughput Improvement:** +Y trucks/day capacity

---

### Step 3: Combined Impact Model

**Create consolidated summary:**

| Lever | Baseline | Post-Lever | Impact | Annual Savings |
|-------|----------|------------|--------|----------------|
| LU10 (Consolidation) | PKMMT ₹3.85, LTL 38% | PKMMT ₹3.35, LTL 26% | -13% PKMMT | ₹X–Y |
| TB01 (Digital Bidding) | Spot premium 12% | Spot premium 6% | -5% spot cost | ₹X–Y |
| RS19 (Route Opt) | 8% route deviation | 3% deviation | -3% PKMMT | ₹X–Y |
| YG52 (Gate Scheduling) | 6.8 hrs detention | 3.5 hrs detention | -48% detention | ₹X–Y |
| **Total (Combined)** | **₹3.85 PKMMT** | **₹3.20–3.35 PKMMT** | **-13–17%** | **₹XX–YY** |

**ROI Calculation:**
- **Total Annual Savings:** ₹XX–YY
- **Implementation Cost:** ₹ZZ (TMS license + services)
- **Payback Period:** X months
- **3-Year NPV:** ₹XX

---

## 3. Simulation Output Template (Customer-facing)

### Cover Page

**Title:** Move-as-One Value Lever Simulation
**Subtitle:** [Company Name] - Dispatch Network Analysis
**Date:** [Date]
**Prepared by:** Fretron Technologies

---

### Executive Summary (1 page)

**Network Overview:**
- **Period Analyzed:** [Date Range]
- **Shipments:** X shipments (Y MT, ₹Z freight cost)
- **Plants:** X plants
- **Lanes:** X unique lanes
- **Vendors:** X carriers

**Baseline Performance:**
- **PKMMT:** ₹3.85
- **LTL%:** 38%
- **OTIF:** 78%
- **Avg Detention:** 6.8 hrs
- **EWB Compliance:** 92%

**Opportunity Identified:**

**3 High-Impact Levers:**
1. **LU10 (Consolidation):** -10–15% PKMMT → ₹X–Y annual savings
2. **TB01 (Digital Bidding):** -5–8% spot cost → ₹X–Y annual savings
3. **RS19 (Route Opt):** -3–5% PKMMT → ₹X–Y annual savings

**Total Impact:**
- **PKMMT Reduction:** -13–17% (₹3.85 → ₹3.20–3.35)
- **Annual Savings:** ₹XX–YY (8–12% of current freight spend)
- **OTIF Improvement:** +5–8 pts (78% → 83–86%)
- **ROI:** Payback in X months

---

### Section 1: Baseline Analysis (2–3 pages)

#### 1.1 Cost Performance

**Overall Cost Metrics:**
- Total Freight Cost: ₹XX Cr
- Avg Cost per Shipment: ₹XX,XXX
- PKMMT: ₹3.85

**Lane-level PKMMT (Top 10 Worst Lanes):**

| Lane | Volume (MT) | Distance (km) | PKMMT (₹) | vs Benchmark | Opportunity |
|------|-------------|---------------|-----------|--------------|-------------|
| JAM-MUM | 8,250 | 1,920 | ₹4.15 | +23% | High |
| JAM-DEL | 10,450 | 1,425 | ₹3.92 | +15% | Medium |
| JAM-PUN | 3,580 | 1,785 | ₹4.35 | +28% | High |
| [etc.] | | | | | |

**Vendor Performance:**

| Vendor | Share (%) | Avg PKMMT | vs Market | Rating |
|--------|-----------|-----------|-----------|--------|
| Vendor A | 28% | ₹3.55 | Competitive | ⭐⭐⭐⭐ |
| Vendor B | 19% | ₹3.85 | Above Market | ⭐⭐⭐ |
| Vendor C | 24% | ₹3.42 | Best-in-class | ⭐⭐⭐⭐⭐ |
| [etc.] | | | | |

---

#### 1.2 Efficiency Performance

**Utilization Metrics:**
- Avg Weight Utilization: 68%
- LTL Shipments: 38%
- Avg Detention: 6.8 hrs

**Consolidation Opportunity Map:**

| Lane | LTL Shipments | Consolidation Potential | Estimated Savings |
|------|---------------|-------------------------|-------------------|
| JAM-MUM | 42% | 18 shipments → 12 FTL | ₹X,XX,XXX |
| JAM-DEL | 38% | 22 shipments → 15 FTL | ₹X,XX,XXX |
| [etc.] | | | |

---

#### 1.3 Service Performance

**OTIF Performance:**
- Overall OTIF: 78%
- OTD: 82%
- Avg Transit Time: 52 hrs (vs optimal 42 hrs)

**Worst-Performing Lanes:**

| Lane | OTIF % | Avg Delay | Root Cause |
|------|--------|-----------|------------|
| JAM-PUN | 68% | 8 hrs | Route inefficiency + detention |
| VIZ-BLR | 72% | 6 hrs | Vendor issues |
| [etc.] | | | |

---

### Section 2: Lever Simulation (3–4 pages)

#### 2.1 Lever #1: LU10 - LTL→FTL Consolidation

**Current State:**
- LTL Shipments: 38% (X shipments, Y MT)
- LTL PKMMT: ₹4.25 (vs FTL: ₹3.55)

**Simulation Logic:**
- Identified X same-day, same-lane LTL shipments
- Simulated consolidation into multi-drop FTL routes
- Assumed 2–3 drops per consolidated load

**Post-Lever State:**
- LTL Shipments: 22–26% (reduction of 12–16 pts)
- Blended PKMMT: ₹3.35–3.45 (reduction of 10–13%)

**Impact:**
- **PKMMT Reduction:** -10–13%
- **Annual Savings:** ₹X.X–Y.Y Cr
- **Coverage:** 72% of current LTL volume

**Implementation:**
- **Timeline:** 60 days (configure optimizer + process training)
- **Readiness:** Green (data available, standard process)
- **Risk:** Low (proven lever, minimal disruption)

---

#### 2.2 Lever #2: TB01 - Digital Spot Bidding

**Current State:**
- Spot Volume: 24% of total (₹X Cr annual)
- Spot PKMMT: ₹4.05 (vs contracted: ₹3.62)
- Spot Premium: 12%

**Simulation Logic:**
- Applied 3–7% spot cost reduction (industry benchmark for digital bidding)
- Assumed 80% of spot volume migrates to platform

**Post-Lever State:**
- Spot PKMMT: ₹3.85–3.95 (reduction of 3–5%)
- Spot Premium: 6–9%

**Impact:**
- **Spot Cost Reduction:** -3–5%
- **Annual Savings:** ₹X.X–Y.Y Cr on spot volume
- **Coverage:** 80% of spot loads

**Implementation:**
- **Timeline:** 30 days (platform setup + carrier onboarding)
- **Readiness:** Green (quick setup, minimal change)
- **Risk:** Low (carriers typically onboard willingly)

---

#### 2.3 Lever #3: RS19 - Primary Route Optimization

**Current State:**
- Avg Route Deviation: 8% vs shortest path
- Worst Lanes: JAM-PUN (15%), VIZ-BLR (12%)

**Simulation Logic:**
- Calculated optimal routes for top 10 lanes
- Applied 2–5% distance reduction (conservative estimate)

**Post-Lever State:**
- Avg Route Deviation: 3–4%
- Distance Savings: 2–5% on optimized lanes

**Impact:**
- **PKMMT Reduction:** -2–5% on optimized lanes
- **Transit Time Reduction:** -5–12%
- **OTIF Improvement:** +3–5 pts
- **Annual Savings:** ₹X.X–Y.Y Cr

**Implementation:**
- **Timeline:** 30 days (route modeling + carrier rollout)
- **Readiness:** Green (data available, standard rollout)
- **Risk:** Low (no process change, just better routes)

---

### Section 3: Combined Impact & Roadmap (2 pages)

#### 3.1 Combined Lever Impact

**Baseline vs Post-Lever Comparison:**

| Metric | Baseline | Post-Lever | Improvement |
|--------|----------|------------|-------------|
| **PKMMT** | ₹3.85 | ₹3.20–3.35 | -13–17% |
| **Total Freight Cost** | ₹125 Cr | ₹107–115 Cr | -8–14% |
| **LTL %** | 38% | 22–26% | -12–16 pts |
| **OTIF %** | 78% | 83–86% | +5–8 pts |
| **Avg Transit Time** | 52 hrs | 46–49 hrs | -6–12% |
| **Avg Detention** | 6.8 hrs | 6.5 hrs* | -5%* |

*YG52 (Gate Scheduling) not included in this simulation; would reduce detention by additional 30–50%

**Annual Savings:** ₹10–18 Cr per year (8–14% of freight spend)

---

#### 3.2 Activation Roadmap (90-day plan)

**Phase 1: Quick Wins (Days 1–30)**
- **TB01** (Digital Bidding): Platform setup, carrier onboarding
- **RS19** (Route Opt): Route modeling for top 10 lanes
- **Expected Impact:** -3–5% freight cost, +2–3 pts OTIF

**Phase 2: Core Optimization (Days 31–60)**
- **LU10** (Consolidation): Load optimizer configuration, process training
- **Expected Impact:** Additional -5–8% freight cost

**Phase 3: Stabilization (Days 61–90)**
- Monitor KPIs, fine-tune algorithms
- Roll out to remaining lanes
- **Expected Impact:** Full 8–14% savings realized

---

#### 3.3 Business Case

**Investment:**
- TMS Software License: ₹XX L per year
- Implementation Services: ₹XX L (one-time)
- Training & Change Management: ₹XX L (one-time)
- **Total Year 1 Cost:** ₹XX L

**Returns:**
- Year 1 Savings: ₹XX Cr (8–14% of ₹125 Cr)
- Year 2–3 Savings: ₹XX Cr per year (sustained)

**ROI:**
- **Payback Period:** 4–7 months
- **3-Year NPV:** ₹XX Cr
- **IRR:** XX%

---

### Section 4: Next Steps

**Pilot Proposal:**

**Scope:**
- **Lanes:** Top 5 lanes (60% of volume)
- **Levers:** LU10, TB01, RS19
- **Duration:** 90 days
- **Success Metrics:**
  - PKMMT reduction: Target -8–12%
  - OTIF improvement: Target +5 pts
  - Pilot ROI: Payback within pilot period

**Governance:**
- Weekly KPI reviews (Command Center dashboards)
- Bi-weekly steering committee meetings
- 90-day results presentation

**Investment:**
- Pilot Fee: ₹XX L (applied to full contract if converted)
- Full TMS Contract: ₹XX L per year (3-year term)

---

## 4. Presentation Deck Template (Summary)

**Slide 1: Executive Summary**
- Baseline KPIs + Opportunity Summary

**Slide 2: Cost Analysis**
- Lane-level PKMMT table + chart

**Slide 3: Efficiency Analysis**
- LTL % + Consolidation opportunity visualization

**Slide 4: Service Analysis**
- OTIF by lane + root cause analysis

**Slide 5: Lever #1 Simulation (LU10)**
- Before/After comparison

**Slide 6: Lever #2 Simulation (TB01)**
- Before/After comparison

**Slide 7: Lever #3 Simulation (RS19)**
- Before/After comparison

**Slide 8: Combined Impact & ROI**
- Savings waterfall chart
- 3-year business case

**Slide 9: 90-day Roadmap**
- Gantt chart showing lever activation sequence

**Slide 10: Pilot Proposal**
- Scope, success metrics, investment

---

## 5. Internal Playbook Notes

### Red Flags (when to pause simulation):
- Data quality issues: >20% missing/invalid records
- Atypical period: holiday season, COVID disruption, etc.
- Opportunity too low: <3% savings potential
- Maturity too high: Already optimized (Level 3 across all pillars)

### When to Expand Scope:
- If savings > 15%, consider adding YG52 (Gate Scheduling) to simulation
- If customer has rail network, add ND30 (Rail vs Road Mix)
- If customer has 3PL operations, add LU14 (Multi-principal Mixing)

### Pricing Guidance:
- **Pilot Fee:** ₹5–15 L (based on network size)
- **Full TMS Annual:** ₹20–80 L per year (based on freight spend and modules)
- **Implementation Services:** 20–30% of Year 1 license fee

---

## Success Metrics

**Target Conversion:** 70–80% from Simulation → Pilot
**Target Deal Size:** ₹60–120 L total contract value (3 years)
**Target Time-to-Close:** 30–45 days from simulation presentation to signed contract
