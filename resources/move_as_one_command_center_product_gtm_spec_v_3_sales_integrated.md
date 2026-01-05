# Move-as-One Command Center – Product & GTM Spec v3 (Sales-Integrated Dispatch Edition)

> v3 = v2 (unified Command Center + Value Studio + GTM) **plus** a stronger focus on making the product itself the core sales asset for problem discovery, validation, executive sponsorship, and business case building. Also lays UX foundations for future personalization features (auto-fetching prospect data: logo, locations, industry, etc.).

---

## 1. Purpose & Strategic Intent

### 1.1 Purpose

Design Fretron’s **Move-as-One Command Center** so that it serves **two personas simultaneously**:

1. **Customer Operations** – day-to-day use in Run/Design modes once deployed.
2. **Sales & Pre-Sales** – a live, semi-configurable **Prospect Playground** that:
   - Guides problem discovery.
   - Helps validate pain points and levers with prospects.
   - Frames and stress-tests the transformation approach.
   - Co-creates an executive-ready business case.

We want:

- A **single product experience** that can be used:
  - In the first discovery meeting (with mocked but relevant data).
  - In deeper design/simulation workshops (with narrow real data).
  - In production post-sale.

- A **UX foundation** for future personalization features:
  - Automatic fetching of **company logo, website, industry**.
  - Enrichment with **plant locations, basic product categories, and public metrics**.
  - Auto-selection of relevant **Value Map** variant and **lever presets**.

### 1.2 Guiding Principles

1. **Product-led Sales** – the product itself structures the discovery conversation; decks and PDFs support, not lead.
2. **Same Surfaces for Pre-Sales & Post-Sales** – the Command Center and Value Studio used in a demo are the same patterns used in production, just with mocked or limited data.
3. **Progressive Personalisation** – start with light, safe auto-enrichment and gradually deepen based on trust and consent.
4. **Wedge, Not Everything** – v3 remains focused on the **Dispatch Edition** (primary/road outbound, cost & OTIF) to allow execution.

---

## 2. ICP, Personas & Use Modes

### 2.1 ICP (unchanged from v2)

- Mid–large **manufacturing shippers** with heavy road outbound (steel, cement, FMCG, chemicals).
- Annual transport spend: **₹50–500 Cr**.

### 2.2 Personas

**Customer-side:**
- Head of Supply Chain / Logistics
- CFO / Finance Controller
- Plant / Dispatch Head
- CPO / Transport Procurement Head
- Digital / IT Lead

**Internal (Fretron-side):**
- **AE (Account Executive)** – drives deal.
- **SE/Pre-Sales** – configures and runs Move-as-One demos.
- **CSM / Consultant** – runs Value Lever Audit and pilots, later continuous Drive.

### 2.3 Modes of Use

1. **Prospect Mode (Sales-Integrated)**
   - Used before contract.
   - Runs on a combination of:
     - Auto-enriched public data
     - Generic patterns
     - Narrow pilot datasets where available
   - Goals: discover problems, validate levers, secure executive sponsorship.

2. **Customer Mode (Post-Sale)**
   - Used in production with customer data.
   - Same surfaces; more levers and reports unlocked.

The UX must support **mode switching** in the background without confusing users (e.g., AE can see dev tools; customer in demo only sees curated views).

---

## 3. Core Concepts (Recap & Extensions)

From v2 we retain:

- **Move-as-One Value Map – Dispatch Edition**
- **Move-as-One Lever Ladders** (per pillar)
- **Move-as-One Command Center** (Run Mode)
- **Move-as-One Value Studio** (Design Mode)
- **Move-as-One Value Lever Audit** (Discover → Design → Deploy → Drive)

### v3 Extensions

1. **Prospect Profile & Session**
   - A lightweight **Prospect Profile** concept: company name, website, industry, primary plants/regions, approximate spend.
   - A **Session** concept: a specific demo/workshop context for that prospect, storing:
     - Selected ICP vertical (steel, FMCG, 3PL, etc.)
     - Chosen main KPIs & hero levers
     - Diagnostic results
     - Simulation results

2. **Auto-Enrichment Hooks (Future)**
   - Hooks for future services that can:
     - Fetch logo & branding colours.
     - Fetch industry classification.
     - Suggest plant locations (from public sites or known customers).
     - Suggest product categories (e.g., coils, cement bags, FMCG SKUs).
   - In v3, these are **UX placeholders** and configuration points; the concrete implementation is roadmap.

3. **Sales Tools Overlay**
   - An optional **Sales Overlay** for AEs/SEs:
     - "Stage" indicator (Discover/Design/Deploy).
     - Quick access to diagnostics, note-taking, and next-step CTAs.
     - Hidden from end-customer view in demos.

---

## 4. Unified Command Center UX (Run Mode) – v3

### 4.1 Layout (Single Pane, Role-Based)

**Header**

- Fretron logo + “Move-as-One Command Center”
- **Prospect/Customer Context (in Sales Mode):**
  - If in Prospect Mode: company name + logo (if available), industry chip.
  - If in Customer Mode: org name + environment indicator.
- **Role selector**: CFO, Supply Chain, Plant, Risk, Custom.
- Global filters:
  - Date range (last 30/90 days, custom)
  - Plant / Region
  - Mode (Road, Rail)
  - Scenario (Baseline, Post-Lever) – for demos.
- Mode toggle: `Run | Design`
- (Sales only) Small **Sales Overlay** icon to open notes/next-step suggestions.

**Body**

- Row 1 – **Headline KPIs** (cross-pillar, role-specific):
  - For CFO: C02, C03, C05, S04.
  - For Supply Chain: C02, S04, V03, E06.
  - For Plant Head: V03, E05, E06, S01.
  - For Risk/Compliance: CP01, CP02, CP06, E06.

- Rows 2–5 – **Pillar Sections**:
  - Each section within same scroll:
    - Cost & Productivity
    - Service & Experience
    - Risk & Compliance
    - ESG & Digitalisation
  - Each section has:
    - 2–4 **primary KPIs** (larger cells in Board View).
    - Additional KPIs in compact rows (Ops View toggle).

- **Density toggle**: `Board View | Ops View`

### 4.2 KPI Tiles – Interaction

**Board View**

- Larger tiles with:
  - KPI name + code
  - Current value, target, last period
  - Sparkline
  - Status pill
  - Lever chips (active levers)

**Ops View**

- Compact rows:
  - KPI name, value, target, delta
  - Status icon
  - Lever count badge

**Hover (desktop)**

- Small tooltip with:
  - Value + delta
  - Top contributor lane/plant
  - Primary lever name(s)

**Click**

- Navigates to KPI Detail page.

---

## 5. KPI Detail UX (Run Mode)

**Header**

- KPI name + code + definition tooltip
- Pillar tags
- Prospect/company context & filters (role, plant, date, scenario)

**Body Sections**

1. **Trend & Targets**
   - Time-series chart with:
     - Actual vs target band
     - Option to overlay scenario (Baseline vs Post-Lever simulation in demo).

2. **Drilldown Summary**
   - Top contributors/diluters by dimension:
     - Lanes
     - Plants
     - Vendors
   - Simple toggle between dims.

3. **Active Levers Snapshot**
   - Cards showing:
     - Lever name & status (Planned/In-Progress/Live)
     - Coverage (% of relevant shipments)
     - Modeled impact band
     - Observed change indicator (up/down vs pre-activation)

4. **Suggested Levers** (if KPI off-track or no levers active)
   - 2–3 candidate levers with short explanation.

5. **Actions**

- `View Records` – opens filtered shipment/workbench view.
- `Explore levers for this KPI` – switches into Design Mode (Value Studio) with KPI-level context.

---

## 6. Value Studio UX (Design Mode)

### 6.1 Mode Switch & Context

When `Explore levers for this KPI` is clicked:

- Mode toggle changes to `Design`.
- Layout remains; only the body switches from performance view to design view.
- Breadcrumb shows: `Command Center > KPI > Design`.

### 6.2 KPI Design View (per KPI)

Sections:

1. **KPI & Pillar Context**
   - Quick summary of KPI performance
   - Related KPIs (e.g., for OTIF: OTD, IFD, transit time)

2. **Lever Readiness & Impact**
   - **Active levers** list:
     - Status, coverage, modeled vs actual impact.
   - **Candidate levers** list:
     - Readiness bars (Data, Process, Integration) - green/amber/red.
     - Impact band summary.
     - Maturity level (1/2/3).

3. **Lever Actions**

- `Activate Lever` – sets lever to Active, attaches it to KPI & pillar, optionally opens a small setup wizard.
- `Add to Roadmap` – backlog.
- `Mark Not Relevant` – hides from suggestions.

### 6.3 Lever Library (Global)

Available via Design Mode nav.

- Filter by:
  - Theme, Pillar, Industry, Status, Maturity.
- Lever card:
  - Name, ID, theme
  - KPIs impacted
  - Impact band
  - Industry tags (Steel, CPG, 3PL)

Lever Detail panel:

- Overview, KPIs, pre-reqs, simulation snapshot, actions.

---

## 7. Prospect Mode Foundations (Sales-Integrated UX)

### 7.1 Prospect Profile & Session Concept

**Prospect Profile** (internal object):

- Name
- Website / domain
- Industry classification (e.g., Steel, FMCG, 3PL)
- Country/region
- High-level footprint: number of plants/DCs, approximate lanes, annual freight spend (rough bands)

**Session**:

- Tied to a Prospect Profile.
- Stores:
  - Selected ICP vertical
  - Default role view
  - Selected hero KPIs and levers for the demo
  - Diagnostic results (Light Diagnostic answers)
  - Simulation results (aggregate, not raw shipment data)

Mode indicator in UI:

- Header chip: `Prospect Session: <Company>`
- Or `Customer: <Org>` in production.

### 7.2 Auto-Enrichment Hooks (Roadmap but UX-ready)

We lay out UX/slots for:

- **Logo & branding**
  - On entering website/domain, system can **try** auto-fetching logo and primary colour palette.
  - UI shows placeholder + “Fetch branding” button; if it fails, user can upload logo manually.

- **Industry & vertical**
  - Auto-suggest NAICS-style or simple categories based on website description and keywords.
  - UI: dropdown pre-populated with suggestion + manual override.

- **Locations (Plants/DCs)**
  - Future: attempt to parse public site / LinkedIn / Google Maps for major plant locations.
  - For now: UI supports quick entry of up to 5–10 locations (name, city, state).

- **Product categories**
  - For Steel: coils, billets, rods, sheets.
  - For CPG: categories like beverages, detergents, packaged foods.
  - Auto-suggest based on industry; user refines.

The PRD notes these as **future integration points** (can be implemented using custom services and web APIs later) but designs UI so adding them later is non-breaking.

### 7.3 Prospect Demo Flow in Product

High-level sequence for AE/SE:

1. Create/Select **Prospect Profile**.
2. Run **Light Diagnostic** within Value Studio (Design Mode):
   - Captured as part of the Session.
3. Use the results to:
   - Auto-select hero KPIs for headline row.
   - Set initial active/candidate lever set (in Design Mode only; no real config).
4. Switch to **Run Mode** in a **Prospect Scenario**:
   - Show Command Center:
     - Headline KPIs with **generic but relevant** sample data.
     - Pillar sections pre-populated.
   - Show how the KPIs and levers would relate for a network like theirs.
5. Optionally, load **narrow real data** for selected lanes to replace/hybridize the sample in the KPI Detail & simulation sections.

The AE uses this flow to:

- Facilitate discussion:
  - “Do these KPIs capture your pain?”
  - “Do these levers feel realistic for you?”
- Co-create a preliminary **Move-as-One roadmap** and business case.

---

## 8. GTM: Move-as-One Lifecycle (Integrated with Product)

### 8.1 Stages (Reiterated)

1. **Discover** – Intro + Light Diagnostic (no data).
2. **Design** – Narrow data-backed simulation.
3. **Deploy** – Pilot with 2–3 levers.
4. **Drive** – BAU adoption with Command Center.

### 8.2 How Product Supports Each Stage

**Discover:**

- Use **Value Studio (Design Mode)** as interactive canvas for Light Diagnostic.
- Fill in Prospect Profile & Session basics.
- Show static Figma or light-running Command Center view with generic/demo data to illustrate end-state.

**Design:**

- Use **KPI Detail & Design View** to show how levers would impact chosen KPIs based on simulation.
- Present simulation results in-product or via linked slides.

**Deploy:**

- Turn on corresponding Fretron modules & data connectors.
- Use real Command Center Run Mode as weekly governance backbone.

**Drive:**

- Use quarterly **Re-Diagnostic** using real data to reposition maturity & levers.
- Update lever status & business case in Value Studio.

---

## 9. Data & Privacy Considerations (Prospect Mode)

- **No auto-fetch** without explicit consent.
- Make enrichment features opt-in:
  - “Fetch logo from public internet?”
  - “Attempt to detect your industry based on website?”
- Data used for simulation:
  - Keep initial scope narrow (few lanes, limited fields).
  - Store only aggregated metrics & deltas in the Session; raw data can be deleted or anonymised if requested.

---

## 10. Implementation Roadmap (Prioritised)

### Phase 1 – MVP for Sales-Integrated Product (0–30 days)

- Update Figma mocks to reflect:
  - Unified Command Center layout.
  - KPI Hover + Click patterns.
  - KPI Design View.
  - Prospect Profile + Session UX (basic).
- Implement Light Diagnostic externally (Google Form) and define how results map into Value Studio UI (mock only).
- Create Stage 1 & 2 decks and scripts aligned with product UX.

### Phase 2 – Prospect Mode MVP (31–60 days)

- Implement minimal in-app **Prospect Profile & Session** (even if internal-only):
  - Form for name, website, industry, footprint.
  - Storage of Light Diagnostic scores.
- Integrate Command Center Run Mode with **demo/sample datasets** and scenario selector (Baseline vs Post-Lever).
- Allow AE/SE to manually:
  - Choose which KPIs appear in headline row.
  - Mark levers as “active” or “candidate” for the Session.

### Phase 3 – Customer Mode & Early Design Mode Productisation (61–90 days)

- Implement Command Center Run Mode in a limited-scope customer deployment (pilot).
- Implement Value Studio Design View MVP for a subset of KPIs & levers.
- Start limited data-backed simulations using real customer data.

### Phase 4 – Personalisation & Enrichment (Roadmap beyond 90 days)

- Build services for logo, industry, and location enrichment.
- Integrate into Prospect Profile creation flow.
- Add optional public-metrics overlay (e.g., revenue band, approximate network complexity) to calibrate business case.

---

This v3 spec is now the **integrated Product + Sales + Roadmap** document:

- It keeps the strong structure from v2 (Command Center + Value Studio + Lifecycle).
- It explicitly positions the product as a **sales asset** for discovery and business case building.
- It lays UX-level placeholders for future personalization and enrichment features so they can be implemented incrementally without rethinking the foundation.

