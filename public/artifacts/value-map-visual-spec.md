# Move-as-One Value Map - Visual Design Specification

## Purpose
Single-page visual that shows the complete architecture:
**Outcome Pillars → KPIs → Value Levers → Industry Fit**

## Format
- **Size:** A3 landscape (or 16:9 slide for digital)
- **Style:** Clean, hierarchical, color-coded
- **Use Cases:**
  - Leave-behind at sales meetings
  - Email attachment
  - Website download (gated content)
  - Poster for booth/office

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER: Move-as-One Value Map - Dispatch Edition                      │
│  Subtitle: Manufacturing Shippers (Steel, CPG, Chemicals)               │
│  Logo: Fretron                                                           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TIER 1: OUTCOME PILLARS (4 columns)                                    │
├───────────────┬───────────────┬───────────────┬──────────────────────────┤
│ 🔵 COST &     │ 🟢 SERVICE &  │ 🟣 EFFICIENCY │ 🟡 RISK &                │
│ PRODUCTIVITY  │ EXPERIENCE    │ & THROUGHPUT  │ COMPLIANCE               │
├───────────────┴───────────────┴───────────────┴──────────────────────────┤
│  TIER 2: KPI REGISTRY (grouped by pillar)                                │
│                                                                           │
│  C01-C07      │ S01-S07       │ E01-E08       │ CP01-CP06                │
│  • PKMMT      │ • OTIF        │ • Weight Util │ • EWB Compliance         │
│  • Cost/Ship  │ • OTD, OTP    │ • Vol Util    │ • POD Capture            │
│  • Freight%   │ • Transit Time│ • LTL %       │ • Claims Freq            │
│               │ • Order Acc.  │ • Detention   │ • Doc Complete.          │
├───────────────────────────────────────────────────────────────────────────┤
│  TIER 3: VALUE LEVER LIBRARY (11 themes, color-coded chips)              │
│                                                                           │
│  🔴 Buying & Rate (TB01–TB09)                                             │
│  🟠 Load & Cube (LU10–LU18)                                               │
│  🟡 Routing & Scheduling (RS19–RS26)                                      │
│  🟢 Network & Footprint (ND27–ND35)                                       │
│  🔵 Capacity & Vendor (CV36–CV43)                                         │
│  🟣 Control Tower (CT44–CT51)                                             │
│  🟤 Yard & Plant (YG52–YG59)                                              │
│  ⚫ Docs & Billing (DB60–DB66)                                            │
│  🟥 Risk & Compliance (RC67–RC73)                                         │
│  🟩 Sustainability (SG74–SG78)                                            │
│  🟦 Order & Customer (OC79–OC87)                                          │
│                                                                           │
│  Each lever shown as chip with ID + short name + industry icons           │
├───────────────────────────────────────────────────────────────────────────┤
│  TIER 4: IMPACT RANGES (benchmark callouts)                              │
│                                                                           │
│  "5–15% Freight Cost Reduction" │ "3–5 pt OTIF Improvement"              │
│  "10–20% Efficiency Gain" │ "95%+ Compliance Achievement"                │
│                                                                           │
│  Sources: GoComet, SuperProcure, Accenture, HCLTech                      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Design Specs

### Header Section
**Dimensions:** Full width × 120px height

**Elements:**
- **Left:**
  - Title: "Move-as-One Value Map"
  - Font: Bold, 36pt, Dark Gray (#1F2937)
  - Subtitle: "Dispatch Edition – Manufacturing Shippers"
  - Font: Regular, 18pt, Medium Gray (#6B7280)
- **Right:**
  - Fretron logo (80px height)
  - Tagline: "Logistics that moves as one"
  - Font: Regular, 12pt, Medium Gray

**Background:** White (#FFFFFF)
**Border Bottom:** 2px solid Light Gray (#E5E7EB)

---

### Tier 1: Outcome Pillars
**Dimensions:** Full width × 150px height

**Layout:** 4 equal-width columns with 20px spacing

**Each Pillar Card:**
- **Background:** Pillar color (see below)
- **Padding:** 24px
- **Border Radius:** 12px
- **Shadow:** 0 2px 8px rgba(0,0,0,0.1)

**Pillar Colors:**
- **Cost & Productivity:** Blue (#1E40AF)
- **Service & Experience:** Green (#10B981)
- **Efficiency & Throughput:** Purple (#7C3AED)
- **Risk & Compliance:** Amber (#F59E0B)

**Text:**
- **Icon:** 32px emoji (🔵 🟢 🟣 🟡)
- **Title:** Bold, 20pt, White (#FFFFFF)
- **Description (below):** Regular, 12pt, White opacity 90%
  - Cost: "Freight optimization & sourcing"
  - Service: "OTIF & customer experience"
  - Efficiency: "Utilization & throughput"
  - Risk: "Compliance & claims management"

---

### Tier 2: KPI Registry
**Dimensions:** Full width × 220px height

**Layout:** 4 columns (aligned with pillars above)

**Each Column:**
- **Header:** "XX KPIs" (e.g., "7 Cost KPIs")
  - Font: Semibold, 14pt, matching pillar color
- **KPI List:**
  - Bullet list with KPI codes (e.g., "C01", "S04")
  - Font: Regular, 11pt, Dark Gray
  - Line height: 1.8
  - Max 8 KPIs shown per column

**Example:**

**Cost & Productivity (7 KPIs)**
- C01: Total Freight Cost
- C02: Cost per MT-km (PKMMT)
- C03: Freight % of Revenue
- C04: Freight % of COGS
- C05: Cost per Shipment
- C06: Accessorial Cost %
- C07: Cost Variance vs Budget

---

### Tier 3: Value Lever Library
**Dimensions:** Full width × 450px height (largest section)

**Layout:** 11 theme rows, vertically stacked

**Each Theme Row:**
- **Theme Header:**
  - Color indicator (8px circle, theme color)
  - Theme name (e.g., "Buying & Rate")
  - Lever ID range (e.g., "TB01–TB09")
  - Font: Semibold, 13pt, Dark Gray
  - Spacing: 16px top/bottom

- **Lever Chips (horizontal scroll or wrap):**
  - Background: Light variant of theme color
  - Border: 1px solid theme color
  - Padding: 6px 12px
  - Border Radius: 16px (pill shape)
  - Font: Regular, 10pt
  - Content: "[ID] [Short Name] [Industry Icons]"
    - Example: "LU10 LTL→FTL Consolidation 🏭🏪⚗️"
  - Industry Icons:
    - 🏭 Steel/Metals
    - 🏪 CPG/FMCG
    - 🚚 3PL
    - ⚗️ Chemicals
    - 🏗️ Cement
  - Hover: Darker border, subtle shadow

**Theme Colors:**
- Buying & Rate (TB): Red (#DC2626)
- Load & Cube (LU): Orange (#EA580C)
- Routing (RS): Yellow (#CA8A04)
- Network (ND): Green (#16A34A)
- Capacity (CV): Blue (#2563EB)
- Control Tower (CT): Purple (#9333EA)
- Yard (YG): Brown (#92400E)
- Docs & Billing (DB): Black (#1F2937)
- Risk (RC): Red Dark (#991B1B)
- Sustainability (SG): Emerald (#059669)
- Order (OC): Cyan (#0891B2)

**Example Row:**

🔴 **Buying & Rate (TB01–TB09)**
[TB01 Digital Spot Bidding 🏭🏪⚗️] [TB02 Reverse Auctions 🏭🏪] [TB03 Rate Governance 🏭🏪⚗️] [TB04 Rate Benchmarking 🏭🏪🚚⚗️] [...]

---

### Tier 4: Impact Ranges
**Dimensions:** Full width × 120px height

**Layout:** 4 callout boxes, horizontally aligned

**Each Callout Box:**
- **Background:** Light variant of pillar color
- **Border:** 2px solid pillar color
- **Padding:** 16px
- **Border Radius:** 8px
- **Content:**
  - **Stat:** Bold, 24pt, pillar color (e.g., "5–15%")
  - **Label:** Regular, 12pt, Dark Gray (e.g., "Freight Cost Reduction")
  - **Icon:** 32px (📊 💹 ⚡ ✅)

**Examples:**
1. 📊 **5–15%** Freight Cost Reduction
2. 💹 **3–5 pts** OTIF Improvement
3. ⚡ **10–20%** Efficiency Gain
4. ✅ **95%+** Compliance Achievement

**Footer (below callouts):**
- Font: Regular, 9pt, Medium Gray
- Text: "Industry benchmarks from GoComet, SuperProcure, Accenture, HCLTech, IBM research"

---

## Color Palette

### Primary Colors:
- **Fretron Blue:** #1E40AF (main brand)
- **Fretron Light Blue:** #3B82F6 (accents)
- **Fretron Green:** #10B981 (success/service)
- **Fretron Amber:** #F59E0B (warning/risk)
- **Fretron Red:** #EF4444 (critical/off-track)

### Pillar Colors:
- **Cost:** #1E40AF (Blue)
- **Service:** #10B981 (Green)
- **Efficiency:** #7C3AED (Purple)
- **Compliance:** #F59E0B (Amber)

### Theme Colors (for 11 lever themes):
- See Tier 3 section above

### Neutral Colors:
- **Dark Gray:** #1F2937 (text)
- **Medium Gray:** #6B7280 (secondary text)
- **Light Gray:** #E5E7EB (borders, dividers)
- **Background:** #FFFFFF (white)

---

## Typography

### Font Family:
- **Primary:** Inter or SF Pro (for web/digital)
- **Alternative:** Arial or Helvetica (for print)

### Font Sizes:
- **H1 (Title):** 36pt, Bold
- **H2 (Subtitles):** 18–20pt, Semibold
- **H3 (Section Headers):** 14pt, Semibold
- **Body:** 11–12pt, Regular
- **Small Text:** 9–10pt, Regular
- **Stats:** 24pt, Bold

### Line Heights:
- **Headings:** 1.2
- **Body Text:** 1.6
- **Lists:** 1.8

---

## Icon System

### Pillar Icons (32px):
- Cost & Productivity: 💰 or 💵
- Service & Experience: ⭐ or 🎯
- Efficiency & Throughput: ⚡ or 🚀
- Risk & Compliance: 🛡️ or ✅

### Industry Icons (16px):
- Steel/Metals: 🏭
- CPG/FMCG: 🏪
- 3PL: 🚚
- Chemicals: ⚗️
- Cement: 🏗️

### Lever Impact Icons (24px):
- Cost Reduction: 📉
- Service Improvement: 📈
- Efficiency Gain: ⚡
- Compliance: ✅
- Sustainability: 🌱

---

## Hierarchy & Flow

### Visual Flow (Top → Bottom):
1. **Pillars** (What outcomes do we care about?)
   ↓
2. **KPIs** (How do we measure those outcomes?)
   ↓
3. **Levers** (What actions move those KPIs?)
   ↓
4. **Impact** (What results can we expect?)

### Connection Lines (Optional Enhancement):
- Subtle dashed lines connecting KPIs to their most-impacted levers
- Example: C02 (PKMMT) → LU10, TB01, RS19 (with thin gray dotted lines)
- Implementation: Only for digital/interactive version to avoid clutter

---

## Interactive Digital Version (Optional)

### Hover States:
- **Lever Chip Hover:**
  - Show tooltip with:
    - Full lever name
    - Expected impact range (e.g., "C02: -8–15%")
    - Maturity level (1/2/3)
    - Readiness indicators (🟢🟡🔴)

- **KPI Hover:**
  - Show tooltip with:
    - Full KPI name
    - Formula
    - Benchmark values (typical vs best-in-class)

### Click Actions:
- **Lever Chip Click:** Open lever detail panel (side drawer)
- **Pillar Click:** Filter view to show only that pillar's KPIs and levers
- **Industry Icon Click:** Filter levers by industry fit

---

## Print Specifications

### For A3 Print (297mm × 420mm):
- **Resolution:** 300 DPI
- **Bleed:** 3mm all sides
- **Safe Zone:** 10mm margin from bleed
- **Color Mode:** CMYK
- **File Format:** PDF with embedded fonts

### For A4 Print (210mm × 297mm):
- Same as A3 but with adjusted font sizes (-2pt across the board)
- May need to collapse lever chips into multi-line layout

---

## File Formats

### Master Source:
- **Figma:** Editable design file (preferred)
- **Adobe Illustrator:** Vector AI file (alternative)

### Export Formats:
1. **PDF:** Print-ready (A3, CMYK, 300 DPI)
2. **PNG:** Web/email (1920×1080px, RGB, 72 DPI)
3. **SVG:** Scalable web version
4. **PowerPoint:** Editable slide (16:9)

---

## Usage Guidelines

### Do's:
✅ Use as leave-behind at sales meetings
✅ Email as PDF attachment after intro calls
✅ Post on website as gated download
✅ Print as A3 poster for booth/office
✅ Include in intro deck as reference slide
✅ Customize industry icons based on prospect

### Don'ts:
❌ Don't modify color scheme (brand consistency)
❌ Don't remove source citations at bottom
❌ Don't use outdated version (check version number)
❌ Don't send without context (always accompany with explanation)

---

## Version Control

**Current Version:** v1.0 - Dispatch Edition (Nov 2024)

**Change Log:**
- v1.0 (Nov 2024): Initial release for Dispatch Edition
- Future: v1.1 to add Secondary/Tertiary distribution levers
- Future: v2.0 for Multi-modal Edition (rail/sea/air)

**File Naming:**
- `Fretron_ValueMap_DispatchEdition_v1.0_[Format].[ext]`
- Example: `Fretron_ValueMap_DispatchEdition_v1.0_Print_A3.pdf`

---

## Accessibility

### Color Contrast:
- Ensure all text meets WCAG AA standards (4.5:1 contrast ratio)
- Dark text on light backgrounds for body content
- White text on dark backgrounds for pillar headers

### Alternative Text (for digital versions):
- Each section has descriptive alt text
- Lever chips include full lever name in alt text
- Industry icons include text labels in tooltip

---

## Measurement & Success

### Engagement Metrics (for digital version):
- Time spent viewing: Target >60 seconds
- Click-through rate on lever chips: Target >15%
- Download rate (PDF): Target >40% of page visitors

### Sales Effectiveness:
- Prop usage in meetings: Target 80% of intro meetings
- Prospect feedback score: Target 8+/10 ("This is helpful")
- Conversion lift: +20% intro → simulation vs control

---

## Design Mockup (Text-based)

```
┌────────────────────────────────────────────────────────────────────┐
│  Move-as-One Value Map - Dispatch Edition              [LOGO]     │
│  Manufacturing Shippers (Steel, CPG, Chemicals)                     │
└────────────────────────────────────────────────────────────────────┘

┌───────────┬───────────┬───────────┬──────────────────────────────┐
│ 🔵 COST & │ 🟢 SERVICE│ 🟣 EFFIC. │ 🟡 RISK &                    │
│ PRODUCT.  │ & EXPER.  │ & THROU.  │ COMPLIANCE                   │
│           │           │           │                              │
│ Freight   │ OTIF &    │ Utiliz.   │ Compliance &                 │
│ optim.    │ customer  │ & through │ claims mgmt                  │
└───────────┴───────────┴───────────┴──────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ KPI REGISTRY                                                        │
│                                                                    │
│ C01-C07     S01-S07     E01-E08     CP01-CP06                      │
│ • PKMMT     • OTIF      • Wt Util   • EWB Comp.                    │
│ • Cost/Ship • OTD/OTP   • Vol Util  • POD Capt.                    │
│ • Freight%  • Transit   • LTL %     • Claims                       │
│ • Acces.%   • Ord Acc   • Detent.   • Doc Comp.                    │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ VALUE LEVER LIBRARY (80+ Levers, 11 Themes)                        │
│                                                                    │
│ 🔴 Buying & Rate (TB01–TB09)                                        │
│ [TB01 Digit Spot🏭🏪] [TB02 Rev Auct🏭🏪] [TB03 Rate Gov🏭🏪]       │
│                                                                    │
│ 🟠 Load & Cube (LU10–LU18)                                          │
│ [LU10 LTL→FTL🏭🏪] [LU11 3D Pack🏪] [LU12 Wt+Vol🏪⚗️]              │
│                                                                    │
│ 🟡 Routing & Scheduling (RS19–RS26)                                │
│ [RS19 Route Opt🏭🏪🚚] [RS20 Last-mile🏪🚚] [RS21 Time-win🏪]        │
│                                                                    │
│ [... continue for all 11 themes ...]                               │
└────────────────────────────────────────────────────────────────────┘

┌───────────┬───────────┬───────────┬──────────────────────────────┐
│ 📊        │ 💹        │ ⚡        │ ✅                           │
│ 5–15%     │ 3–5 pts   │ 10–20%    │ 95%+                         │
│ Freight   │ OTIF      │ Efficiency│ Compliance                   │
│ Cost ↓    │ Improve.  │ Gain      │ Achievement                  │
└───────────┴───────────┴───────────┴──────────────────────────────┘

Sources: GoComet, SuperProcure, Accenture, HCLTech research
```

---

## Next Steps for Design Team

1. **Create Figma/Illustrator Master File** (3–5 days)
   - Use specs above as blueprint
   - Get stakeholder review

2. **Export All Formats** (1 day)
   - PDF (A3 + A4)
   - PNG (web)
   - PowerPoint (editable)

3. **User Testing** (1 week)
   - Show to 3–5 prospects in sales meetings
   - Gather feedback on clarity, usefulness
   - Iterate based on input

4. **Launch** (1 day)
   - Upload to website
   - Distribute to sales team
   - Update CRM templates

**Timeline:** 2–3 weeks from kickoff to launch
