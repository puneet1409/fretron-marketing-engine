# 🚀 Fretron Move-as-One Command Center Demo

> **V3 SALES-INTEGRATED:** Role-based personalization + unified scroll layout + interactive driver analysis + comprehensive Design Mode Value Studio!

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the demo
npm run dev

# 3. Open your browser
# Navigate to http://localhost:3000
```

## 🎯 What This Demo Does

This is a **fully functional** interactive demo that positions Fretron as a **value-lever-first TMS**, not just another feature checklist.

### ✅ **What's Working Now:**

**NEW in V3 - Core Product Design Enhancements:**

**Week 1 (Completed):**
- 🎯 **Role-Based Personalization**: Switch between CFO, Supply Chain, Plant Head, and Procurement views
- 📊 **Headline KPIs Row**: 4 role-specific priority metrics always visible at top
- 📜 **Unified Scroll Layout**: All pillars in one continuous scroll (no more tabs!)
- 📁 **Collapsible Pillar Sections**: Cost, Service, Efficiency, Compliance sections with expand/collapse
- 💾 **Smart Persistence**: Role selection saved to localStorage, auto-loads on return
- 🎨 **Enhanced Visual Hierarchy**: Improved spacing, colors, and professional polish

**Week 2 (Completed):**
- 📋 **Ops View (Compact Table)**: High-density table view showing more KPIs on screen
- 🔄 **View Density Toggle**: Switch between Board View (tiles) and Ops View (table)
- 🧭 **Breadcrumb Navigation**: Clear navigation context showing where you are
- 🔗 **Contextual Navigation**: Click breadcrumbs to navigate back through views
- 💾 **View Persistence**: Density preference saved to localStorage

1. **Run Mode Dashboard** (V3 Enhanced + Highly Interactive)
   - 4 pillar tabs (Cost, Service, Efficiency, Compliance)
   - **36 animated KPI tiles** with:
     - Hover effects (scale, glow, shadow)
     - Live sparklines showing 6-month trends
     - Status badges with color-coded indicators
     - Formula tooltips on hover
     - Pulsing "Impact Active" indicators for active levers
     - Click hint animations
   - Scenario switcher (Baseline vs Post-Lever-Activation)
   - **Enhanced Why Panel** with 3 interactive views:
     - **Summary Tab**: Contribution breakdown, active lever cards with metrics
     - **Driver Analysis Tab**: Interactive waterfall chart showing how levers drive KPI changes
     - **Network View Tab**: Visual graph showing lever-KPI relationships with hover interactions
     - "View Full Report" button → Opens detailed KPI Report
   - **KPI Report drill-down** with lane×vendor tables, filters, and export

2. **Design Mode - Value Studio** (Complete)
   - **Diagnostic Summary** tab:
     - Radar chart showing 4-pillar maturity scores
     - Pillar breakdown with progress bars and level badges
     - Overall assessment with savings potential
     - Top 5 recommended priority levers
     - "Request Simulation" CTA
   - **Lever Library** tab:
     - Searchable grid of all 87 value levers
     - Multi-filter: Theme, Pillar, Industry
     - Lever cards showing readiness indicators
     - Click any lever → Opens detailed Lever Detail Panel
   - **Lever Detail Panel**:
     - Full lever overview with maturity level
     - KPI impact table with expected ranges
     - Readiness assessment (Data/Process/Technology)
     - ROI benchmarks and sources
     - Action buttons (Activate Lever, Add to Roadmap)

3. **Real Data Comparison**
   - **Baseline scenario**: C02 ₹3.85, LTL 38%, OTIF 75%
   - **Post-Lever scenario**: C02 ₹3.35, LTL 28%, OTIF 83%
   - Shows 7 active levers with measured impact

4. **Complete Data Libraries**
   - 36 KPIs across 7 pillars
   - 87 value levers across 11 themes
   - Industry benchmarks and ROI ranges

5. **Buying Journey Artifacts** (in `/public/artifacts/`)
   - Stage 0: Outreach emails & call scripts
   - Stage 1: Intro deck outline & 10-question diagnostic
   - Stage 2: Simulation templates & data specs
   - Value Map visual specification

## 📖 Documentation

- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Complete walkthrough, demo scripts, customization tips
- **[README.md](./README.md)** - This file (quick start)
- **PRD** - Your original comprehensive spec (reference)

## 🎬 Enhanced Demo Script (V3)

**Role-Based Walkthrough (12 minutes):**

**Start: CFO View (3 minutes)**
1. **Select CFO role** → Headline KPIs automatically show: C02 (PKMMT), C03 (Freight %), C05 (Cost/Shipment), S04 (OTIF)
2. **Scroll through pillars** → Cost & Productivity section auto-expanded, others collapsed
3. **Click C02** → Open Why Panel with Driver Analysis tab showing waterfall chart
4. **Switch to Post-Lever scenario** → Headline shows 13-17% improvement immediately

**Switch: Supply Chain View (3 minutes)**
5. **Change role to Supply Chain** → Headline KPIs change to: C02, S04, V03 (Volume), E06 (Detention)
6. **Unified scroll view** → All pillars visible, Cost + Service + Efficiency sections expanded
7. **Click S04 (OTIF)** → Show Network View tab with lever-KPI relationships graph
8. **Hover over levers** → Interactive highlighting shows which KPIs each lever impacts

**Switch: Plant Head View (2 minutes)**
9. **Change to Plant Head role** → Headline shows: V03 (Dispatch Volume), E05 (Weight Util), E06, S01 (OTD)
10. **Efficiency section prominent** → Show operational KPIs for dispatch teams
11. **Click "View Full Report"** → Detailed lane×vendor performance tables

**Design Mode (4 minutes)**
12. **Switch to Design Mode** → Diagnostic Summary with radar chart
13. **Lever Library** → Filter by Cost pillar, see 87 levers
14. **Click LU10** → Lever detail with readiness, impact table, ROI benchmarks
15. **Show Activate Lever** → Demonstrate how to add to active set

**Key Messages:**
- "Different roles see different priorities - CFOs see cost, Plant Heads see volume/efficiency"
- "Unified scroll gives you the whole picture, not siloed tabs"
- "Role preferences persist - users don't re-configure every time"
- "This is the SAME product used in sales demos AND production"

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (styling)
- **Recharts** (sparklines)
- **Lucide React** (icons)

## 📊 What You Get

### **Interactive Demo Components:**
- ✅ **Run Mode**: KPI Dashboard with 36 live KPI tiles
- ✅ **Run Mode**: Why Panel (slide-over showing lever impact)
- ✅ **Run Mode**: KPI Report drill-down with lane×vendor tables
- ✅ **Run Mode**: Scenario comparison (Baseline vs Post-Lever)
- ✅ **Run Mode**: Sparklines showing 6-month trends
- ✅ **Run Mode**: Lever attribution with coverage & impact metrics
- ✅ **Design Mode**: Diagnostic Summary with radar chart
- ✅ **Design Mode**: Lever Library with search and filters
- ✅ **Design Mode**: Lever Detail Panel with readiness assessment

### **Data Assets:**
- ✅ **36 KPIs** with formulas, benchmarks, industry sources
- ✅ **87 Value Levers** with impact ranges, readiness checks
- ✅ **2 Demo Scenarios** (before/after lever activation)
- ✅ **Mock shipment data** (8 lanes, 5 vendors, 20 records)

### **GTM Artifacts** (ready to use):
- ✅ Email templates & cold call scripts
- ✅ Intro deck outline (12 slides)
- ✅ Light diagnostic (10 questions + scoring)
- ✅ Simulation templates (data specs, output formats)
- ✅ Value Map visual specification (for design team)

## 🎨 Customization

**Change scenario data:** Edit `/data/mock-scenarios.json`
**Add/modify KPIs:** Edit `/data/kpis.json`
**Update levers:** Edit `/data/levers.json`

See **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** for detailed customization instructions.

## 🚧 Future Enhancements (Optional)

**Run Mode:**
- ✅ KPI Report drill-down (lane × vendor tables) - **COMPLETE**
- [ ] Shipment List view (individual shipment details)
- [ ] Multi-scenario comparison side-by-side
- [ ] Custom scenario builder

**Design Mode:**
- ✅ Diagnostic Summary view with radar chart - **COMPLETE**
- ✅ Lever Library grid with filters - **COMPLETE**
- ✅ Lever Detail Panel - **COMPLETE**
- [ ] Interactive lever activation workflow
- [ ] Simulation output comparison view
- [ ] Roadmap builder with Gantt chart

## Project Structure

```
/app                    # Next.js app routes
/components             # React components
  /run-mode            # Command Center components
  /design-mode         # Value Studio components
  /shared              # Reusable components
/data                  # JSON data files
  kpis.json           # KPI library (30+ KPIs)
  levers.json         # Value Lever library (80+ levers)
  mock-scenarios.json # Demo scenarios
  mock-shipments.json # Sample shipment data
/types                 # TypeScript type definitions
/lib                   # Utility functions
/public/artifacts      # Buying journey artifacts
```

## Demo Scenarios

The demo includes hardcoded scenarios:

1. **Baseline**: Current state before lever activation
2. **Post-Lever-Activation**: Projected state with selected levers active

## KPI Library

30+ KPIs across pillars:
- **Cost & Productivity** (C01-C07): PKMMT, freight cost %, cost per shipment
- **Service & Experience** (S01-S07): OTIF, OTD, transit time
- **Efficiency** (E01-E08): Weight/volume utilization, LTL%, detention
- **Compliance** (CP01-CP06): E-way bill, POD, claims
- **Volume** (V01-V03): Dispatch volume, placement
- **ESG** (ESG01-ESG03): CO₂ intensity, green fleet
- **Digital Adoption** (DA01-DA04): Digital indent, ePOD

## Value Lever Library

80+ levers across themes:
- Buying & Rate (TB01-TB09)
- Load & Cube (LU10-LU18)
- Routing & Scheduling (RS19-RS26)
- Network & Footprint (ND27-ND35)
- Capacity & Vendor (CV36-CV43)
- Visibility & Control Tower (CT44-CT51)
- Yard & Plant (YG52-YG59)
- Docs, Billing & Cashflow (DB60-DB66)
- Risk & Compliance (RC67-RC73)
- Sustainability (SG74-SG78)
- Order & Customer (OC79-OC87)

## Buying Journey

Artifacts in `/public/artifacts/`:
- **Stage 0**: Outreach emails, LinkedIn templates, call scripts
- **Stage 1**: Intro deck, light diagnostic (10 questions)
- **Stage 2**: Simulation templates, data specs
- **Visual Assets**: Move-as-One Value Map

## 📞 Next Steps

### **For Sales & Marketing:**
1. Review `/public/artifacts/` for GTM materials
2. Practice the 5-minute demo script
3. Customize lever selection for target industries
4. Use Light Diagnostic in discovery calls

### **For Product/Engineering:**
1. Review data structures in `/data/` and `/types/`
2. Customize scenarios for real customer data
3. Build optional Design Mode components
4. Integrate with production TMS backend

### **For Prospects:**
1. Run the demo (`npm run dev`)
2. Complete the Light Diagnostic
3. Request data-backed simulation (Stage 2)
4. Pilot 3–5 levers on top lanes (90 days)

## 🎯 Demo Success Metrics

**Engagement:**
- Prospect asks: "Can we run this on our data?" ✅
- Time to value: <2 minutes (problem → solution)
- Click-through on Why Panel: >70%

**Conversion:**
- Intro Meeting → Diagnostic: 80% target
- Diagnostic → Simulation: 60-70% target
- Simulation → Pilot: 70-80% target

## 📚 Resources

- **DEMO_GUIDE.md** - Complete walkthrough & customization
- **/public/artifacts/** - All GTM materials
- **/data/** - KPI & lever libraries (JSON)
- **PRD** - Original requirements document

## License

Proprietary - Fretron Technologies Pvt Ltd

---

**Questions?** Check DEMO_GUIDE.md or contact the product team.

**Ready to demo?** Run `npm run dev` and open http://localhost:3000 🚀
