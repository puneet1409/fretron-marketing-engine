# 🎯 Move-as-One Command Center - Demo Guide

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

---

## 🎬 What's Built & Working

### ✅ **Fully Functional Features**

#### **1. Run Mode - Command Center Dashboard**

**Navigation:**
- Top bar with Fretron branding
- **Scenario Selector**: Switch between "Baseline" and "Post-Lever Activation"
- **Pillar Tabs**: Cost, Service, Efficiency, Compliance
- Global filters (date range, plant, mode)

**KPI Dashboard:**
- **7 KPI tiles per pillar** displaying:
  - Current value vs target vs last quarter
  - Status badge (On Track / At Risk / Off Track)
  - 6-month sparkline showing trend
  - Change percentage from last quarter (color-coded)
  - **Active lever chips** showing which levers are affecting this KPI

**Interactive Elements:**
- Click any KPI tile → Opens **Why Panel** (slide-over from right)
- Click lever chip → Shows lever details (TODO: will open lever detail panel)

**Why Panel Features:**
- KPI summary (current, target, last quarter)
- Gap analysis with contextual explanation
- **Contribution breakdown** (top 5 lanes/plants impacting this KPI)
- **Active lever snapshot** showing:
  - Coverage %
  - Expected impact range
  - Observed impact (actual performance)
- **Suggested levers** (if no levers active)
- "View Full Report" button (placeholder for drill-down)

#### **2. Scenario Comparison**

**Baseline Scenario:**
- Shows typical "before" state for Indian steel manufacturer
- C02 (PKMMT): ₹3.85
- LTL%: 38%
- OTIF: 75%
- Detention: 6.8 hrs
- No active levers

**Post-Lever Activation Scenario:**
- Shows "after" state with 7 levers active:
  - **LU10**: LTL→FTL Consolidation (72% coverage, -13% PKMMT)
  - **TB01**: Digital Spot Bidding (45% coverage, -5% spot cost)
  - **RS19**: Route Optimization (85% coverage, -3% PKMMT, -12% transit time)
  - **YG52**: Gate Scheduling (100% coverage, -38% detention)
  - **DB60**: E-Way Bill Automation (95% coverage, +4 pts compliance)
  - **DB61**: Auto LR Generation (88% coverage)
  - **DB62**: E-POD (68% coverage, +7 pts POD capture)
- Shows improvement banner: "-13–17% PKMMT Reduction"
- C02 (PKMMT): ₹3.35 (improved from ₹3.85)
- LTL%: 28% (reduced from 38%)
- OTIF: 83% (improved from 75%)
- Detention: 4.2 hrs (reduced from 6.8 hrs)

#### **3. Data Layer (Complete)**

**36 KPIs Available:**
- Cost & Productivity: C01-C07 (7 KPIs)
- Service & Experience: S01-S07 (7 KPIs)
- Efficiency & Throughput: E01-E08 (8 KPIs)
- Risk & Compliance: CP01-CP06 (6 KPIs)
- Volume & Placement: V01-V03 (3 KPIs)
- ESG & Sustainability: ESG01-ESG03 (3 KPIs)
- Digital Adoption: DA01-DA04 (4 KPIs)

**87 Value Levers Available:**
- All 11 themes implemented (TB, LU, RS, ND, CV, CT, YG, DB, RC, SG, OC)
- Each lever has:
  - Impact ranges per KPI
  - Industry fit indicators
  - Readiness checklist
  - Benchmark sources

**Mock Data:**
- 8 lanes (Jamshedpur, Vizag, Rourkela → Mumbai, Delhi, Bangalore, etc.)
- 5 vendors (Tata Transport, Gati, VRL, Safexpress, Blue Dart)
- 20 sample shipments with full details

---

## 🎮 How to Demo

### **Walkthrough Script (10 minutes)**

#### **Act 1: The Problem (2 min)**
1. Start on **Baseline** scenario
2. Select **Cost & Productivity** pillar
3. Point out:
   - C02 (PKMMT): ₹3.85 - **At Risk** (red badge)
   - C05 (Cost per Shipment): ₹12,800 - **At Risk**
   - Sparklines showing stagnant or worsening trends
4. Click on **C02 tile** → Why Panel opens
5. Show:
   - "Gap: ₹0.65 above target. Consider activating optimization levers."
   - No active levers
   - Suggested levers: LU10, TB01, RS19

#### **Act 2: The Solution (3 min)**
1. Close Why Panel
2. Switch to **Post-Lever Activation** scenario
3. Notice the improvement banner: "-13–17% PKMMT Reduction, 7 levers active"
4. Same **Cost & Productivity** pillar now shows:
   - C02 (PKMMT): ₹3.35 - **On Track** (green badge)
   - C05 (Cost per Shipment): ₹11,500 - **On Track**
   - Sparklines showing downward trend (improvement)
5. Click on **C02 tile** → Why Panel opens
6. Show:
   - Progress: "₹0.15 from target. Levers are working as expected!"
   - **3 active levers** displayed:
     - LU10 (72% coverage, expected -8–15%, observed -13%)
     - TB01 (45% coverage, expected -3–7%, observed -5%)
     - RS19 (85% coverage, expected -2–5%, observed -3%)

#### **Act 3: Other Pillars (3 min)**
1. Switch to **Service & Experience** pillar
2. Baseline scenario:
   - S04 (OTIF): 75% - **Off Track**
   - S05 (Transit Time): 52 hrs - **At Risk**
3. Post-Lever scenario:
   - S04 (OTIF): 83% - **At Risk** (improving but not there yet)
   - S05 (Transit Time): 46 hrs - **On Track** (12% reduction via RS19)

4. Switch to **Efficiency & Throughput** pillar
5. Baseline scenario:
   - E04 (LTL %): 38% - **At Risk**
   - E06 (Detention): 6.8 hrs - **Off Track**
6. Post-Lever scenario:
   - E04 (LTL %): 28% - **On Track** (26% reduction via LU10)
   - E06 (Detention): 4.2 hrs - **At Risk** (38% reduction via YG52)

7. Switch to **Risk & Compliance** pillar
8. Show digital levers impact:
   - CP01 (EWB Compliance): 92% → 96% (DB60 active)
   - CP02 (POD Capture): 85% → 91% (DB62 active)

#### **Act 4: The Value Prop (2 min)**
1. Summarize:
   - "This isn't just monitoring—it's **causal attribution**"
   - "Each KPI is linked to specific levers"
   - "You can see expected vs observed impact"
   - "Switch scenarios to model before/after states"

2. Mention Design Mode (placeholder):
   - "In Value Studio, you'd run diagnostics to identify which levers fit YOUR network"
   - "Then simulate impact before activation"
   - "We start with diagnosis, not demos"

---

## 📊 KPI Summary by Pillar

### **Cost & Productivity (7 KPIs)**
- C01: Total Freight Cost - ₹125 Cr → ₹112 Cr
- **C02: PKMMT - ₹3.85 → ₹3.35** ⭐ Hero metric
- C03: Freight % of Revenue - (not in scenario)
- C04: Freight % of COGS - (not in scenario)
- **C05: Cost per Shipment - ₹12,800 → ₹11,500**
- **C06: Accessorial Cost % - 8.5% → 5.2%** (YG52 impact)
- C07: Cost Variance - (not in scenario)

### **Service & Experience (7 KPIs)**
- **S01: On-Time Delivery % - 82% → 88%** (RS19, YG52)
- S02: On-Time Pickup % - (not in scenario)
- S03: In-Full Delivery % - (not in scenario)
- **S04: OTIF % - 75% → 83%** ⭐ Hero metric
- **S05: Avg Transit Time - 52 hrs → 46 hrs** (RS19)
- S06: Order Accuracy % - (not in scenario)
- S07: Customer Complaint Rate - (not in scenario)

### **Efficiency & Throughput (8 KPIs)**
- **E01: Weight Utilization % - 68% → 78%** (LU10)
- **E02: Volume Utilization % - 62% → 68%** (LU10)
- E03: Combined Utilization Index - (not in scenario)
- **E04: LTL % - 38% → 28%** ⭐ Hero metric (LU10)
- E05: Loading TAT - (not in scenario)
- **E06: Detention Time - 6.8 hrs → 4.2 hrs** (YG52)
- **E07: Empty Km % - 28% → 28%** (no change, needs ND34/RS23)
- E08: Vehicle Fill Rate - (not in scenario)

### **Risk & Compliance (6 KPIs)**
- **CP01: E-Way Bill Compliance - 92% → 96%** (DB60)
- **CP02: POD Capture - 85% → 91%** (DB62)
- CP03: Doc Completeness - (not in scenario)
- CP04: Claims Frequency - (not in scenario)
- CP05: Claims Severity - (not in scenario)
- CP06: Regulatory Fines - (not in scenario)

### **Volume & Placement (3 KPIs)**
- **V01: Total Dispatch Volume - 45,000 MT → 47,500 MT**
- V02: Shipment Count - (not in scenario)
- **V03: On-Time Placement % - 76% → 85%** (TB01)

### **ESG & Sustainability (3 KPIs)**
- **ESG01: CO₂ Intensity - 62 g/t-km → 58 g/t-km** (minor improvement)
- ESG02: Empty Km % (ESG view) - Same as E07
- ESG03: Green Fleet Share - (not in scenario)

### **Digital Adoption (4 KPIs)**
- **DA01: Digital Indent % - 68% → 82%** (DB60, DB61)
- **DA02: E-POD Adoption % - 58% → 78%** (DB62)
- DA03: Auto-Planned Load % - (not in scenario)
- DA04: Exception Playbook Adoption - (not in scenario)

---

## 🔧 Customization Guide

### **Changing Scenario Data**

Edit `/data/mock-scenarios.json`:

```json
{
  "id": "baseline",
  "kpiValues": [
    {
      "kpiId": "C02",
      "current": 3.85,  // ← Change this
      "target": 3.20,
      "lastQuarter": 3.95,
      "sparkline": [3.95, 3.92, 3.88, 3.87, 3.90, 3.85],
      "status": "at_risk",
      "activeLeverIds": []
    }
  ]
}
```

### **Adding New Levers to Post-Lever Scenario**

Edit `/data/mock-scenarios.json`:

```json
{
  "id": "post-lever",
  "activeLevers": [
    {
      "leverId": "NEW_LEVER_ID",  // ← Must exist in levers.json
      "coverage": 75,
      "activatedDate": "2024-11-01",
      "observedImpact": [
        { "kpiId": "C02", "actualChange": -5 }
      ]
    }
  ]
}
```

### **Modifying KPI Definitions**

Edit `/data/kpis.json`:

```json
{
  "id": "C02",
  "name": "Cost per MT-km (PKMMT)",  // ← Display name
  "description": "...",
  "pillar": "cost",  // ← Which tab it appears under
  "unit": "₹",  // ← How values are formatted
  "benchmarks": {
    "typical": 3.85,
    "bestInClass": 3.15
  }
}
```

### **Modifying Lever Definitions**

Edit `/data/levers.json`:

```json
{
  "id": "LU10",
  "name": "LTL→FTL Load Consolidation",
  "impactedKPIs": [
    {
      "kpiId": "C02",
      "expectedImpactRange": [-8, -15],  // ← Impact % range
      "unit": "%"
    }
  ]
}
```

---

## 📁 Project Structure

```
/
├── app/
│   ├── page.tsx                 ✅ Main Command Center (DONE)
│   ├── layout.tsx               ✅ Root layout (DONE)
│   └── globals.css              ✅ Global styles (DONE)
├── components/
│   ├── run-mode/
│   │   ├── KPITile.tsx         ✅ KPI card with sparkline (DONE)
│   │   └── WhyPanel.tsx        ✅ Slide-over panel (DONE)
│   └── shared/
│       ├── ModeToggle.tsx      ✅ Run | Design switcher (DONE)
│       ├── LeverChip.tsx       ✅ Lever badge component (DONE)
│       ├── Sparkline.tsx       ✅ Mini chart component (DONE)
│       └── StatusBadge.tsx     ✅ On Track / At Risk badge (DONE)
├── data/
│   ├── kpis.json               ✅ 36 KPIs (DONE)
│   ├── levers.json             ✅ 87 Levers (DONE)
│   ├── mock-scenarios.json     ✅ Baseline + Post-Lever (DONE)
│   └── mock-shipments.json     ✅ Sample data for drill-downs (DONE)
├── types/
│   └── index.ts                ✅ TypeScript definitions (DONE)
├── lib/
│   └── utils.ts                ✅ Helper functions (DONE)
└── public/artifacts/
    ├── stage-0-outreach-email.md           ✅ (DONE)
    ├── stage-1-intro-deck-outline.md       ✅ (DONE)
    ├── stage-1-light-diagnostic.md         ✅ (DONE)
    ├── stage-2-simulation-templates.md     ✅ (DONE)
    └── value-map-visual-spec.md            ✅ (DONE)
```

---

## 🚧 Optional Future Enhancements (Not in Phase 1)

### **Run Mode (Future):**
- [ ] KPI Report drill-down (table view of lanes × vendors)
- [ ] Shipment List view (detailed records)
- [ ] Export to PDF functionality
- [ ] Multi-scenario comparison side-by-side

### **Design Mode (Future):**
- [ ] Diagnostic Summary view with radar chart
- [ ] Lever Library grid with filters (theme, pillar, industry)
- [ ] Lever Detail Panel (full lever info + simulation)
- [ ] Interactive lever activation toggle

### **Advanced Features (Future):**
- [ ] Real-time data integration (replace mock data)
- [ ] User authentication & multi-tenant support
- [ ] Custom scenario builder
- [ ] Advanced analytics & forecasting
- [ ] Mobile responsive design refinement

---

## 💡 Tips for Effective Demos

### **Do's:**
✅ Start with Baseline to show the problem
✅ Use C02 (PKMMT) as primary metric - everyone understands it
✅ Click into Why Panel to show lever attribution
✅ Switch to Post-Lever to show the art of the possible
✅ Highlight 3-5 hero levers (LU10, TB01, RS19, YG52, DB60)
✅ Use sparklines to show trend direction
✅ Emphasize "causal attribution" (not just monitoring)

### **Don'ts:**
❌ Don't click through all 36 KPIs - pick 5-7 per demo
❌ Don't spend time explaining every pillar - focus on Cost + Service
❌ Don't go into technical implementation details unless asked
❌ Don't promise features that aren't built yet (report drill-downs, etc.)

### **Key Messages:**
1. **"Most TMS demos show features. We show outcomes."**
2. **"This isn't just a dashboard—it's a value lever diagnostic tool."**
3. **"You can see which levers are working and by how much."**
4. **"We start with diagnosis (Design Mode), not demos."**

---

## 🎯 Demo Scenarios by Audience

### **CFO / Finance:**
- Focus on: **Cost & Productivity** pillar
- Hero KPIs: C02 (PKMMT), C05 (Cost/Shipment), C06 (Accessorial %)
- Show: ₹125 Cr → ₹112 Cr (10.4% savings)
- Emphasize: ROI, payback period, financial impact

### **Head of Supply Chain / Logistics:**
- Focus on: **Cost + Service** pillars
- Hero KPIs: C02, S04 (OTIF), E04 (LTL %), E06 (Detention)
- Show: Balanced cost reduction + service improvement
- Emphasize: Operational efficiency, vendor management

### **Plant / Dispatch Head:**
- Focus on: **Efficiency + Compliance** pillars
- Hero KPIs: E01/E02 (Utilization), E06 (Detention), CP01/CP02 (Doc compliance)
- Show: Yard throughput improvement, detention reduction
- Emphasize: Day-to-day operations, less firefighting

### **Procurement / CPO:**
- Focus on: **Cost** pillar + TB (Buying & Rate) levers
- Hero KPIs: C02 (PKMMT), C05 (Cost/Shipment)
- Show: TB01 (Digital Bidding), TB04 (Rate Benchmarking) impact
- Emphasize: Better sourcing, vendor accountability

---

## 📞 Support & Next Steps

**Questions?** Check:
- README.md for technical setup
- `/public/artifacts/` for GTM materials
- PRD document for full specification

**Want to extend the demo?**
- Add more scenarios in `mock-scenarios.json`
- Create industry-specific variants (CPG, Chemicals)
- Build out Design Mode components
- Integrate with real customer data

**Ready to show prospects?**
1. Practice the 10-minute walkthrough
2. Customize lever selection based on their industry
3. Have `/public/artifacts/stage-1-intro-deck-outline.md` ready
4. Prepare to run Light Diagnostic live
5. Be ready to discuss data-backed simulation (Stage 2)

---

## 🏆 Success Metrics

**Demo Effectiveness:**
- Time to value: <2 minutes (problem to solution)
- Prospect engagement: "Can I click around?"
- Key question: "How did you calculate these impact ranges?"
- Conversion signal: "Can we run this on our data?"

**When prospect asks:**
- "Is this real data?" → Explain it's representative mock data modeled on industry benchmarks
- "Can we see our lanes?" → Transition to Stage 2 (data-backed simulation)
- "What's the ROI?" → Point to Post-Lever scenario (-13–17% PKMMT = X% of their freight spend)
- "How long to implement?" → 60–90 days for 3–5 levers (show roadmap in PRD)

---

**Built with:** Next.js, TypeScript, Tailwind CSS, Recharts
**Version:** Phase 1 (Interactive Demo with Run Mode)
**Last Updated:** November 2024
