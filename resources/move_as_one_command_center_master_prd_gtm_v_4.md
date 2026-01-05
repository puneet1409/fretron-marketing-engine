# Move-as-One Command Center – Master PRD & GTM v4 (Dispatch Edition, Sales-Integrated)

> This is the master internal document: one place for **product**, **UX**, **Move-as-One framework** (KPIs, levers, ladders, readiness), and the **end‑to‑end buyer journey** (Discover → Design → Deploy → Drive).
>
> v4 folds in: unified Command Center UX, Value Studio, Move-as-One Lever Ladders, readiness (Data/SOP/Tech), impact calculation logic, and a product‑led buying journey where the platform itself is the core sales asset.

---

## 1. Purpose & Strategic Intent

### 1.1 Why we are building this

Fretron’s goal is **not** to sell “another TMS” or “another control tower dashboard”. We want to:

1. **Run the operation** – Give plants and logistics teams a real-time **Command Center** for dispatch cost, OTIF, risk, and digitalisation.
2. **Guide the transformation** – Give CXOs and logistics excellence leaders a **Value Studio** to:
   - Discover where value is leaking.
   - Choose the next **value levers** to pull.
   - Understand **readiness** and dependencies (data, SOPs, tech).
   - Model and track the **business case**.
3. **Be the sales engine** – Use the same surfaces (Command Center + Value Studio) to:
   - Facilitate **problem discovery & validation**.
   - Secure **executive sponsorship**.
   - Co‑create a **realistic roadmap** & business case.

### 1.2 Move-as-One in one sentence

**Move-as-One** is our framework that connects:

- **Outcomes** → **KPIs** → **Value Levers** → **Maturity Ladders** → **Readiness & Roadmap** → **Command Center views** → **Business case & ROI tracking**.

It is the **bridge between tech and business transformation**.

---

## 2. ICP, Personas, Modes

### 2.1 ICP (Dispatch Edition)

- Mid–large **manufacturing shippers** with heavy road outbound:
  - Steel & metals
  - Cement & building materials
  - FMCG / CPG
  - Chemicals
- Annual freight spend: **₹50–500 Cr**.

### 2.2 Personas

**Customer side**
- Head of Supply Chain / Logistics (primary economic buyer)
- CFO / Finance Controller (approver)
- Plant / Dispatch Head (day‑to‑day ops)
- CPO / Transport Procurement Head
- Digital / IT Lead

**Fretron side**
- AE (Account Executive)
- SE / Pre‑Sales Consultant
- CSM / Logistics Consultant
- Product & Implementation Squad

### 2.3 Modes of use

- **Prospect Mode**
  - Before contract; runs on:
    - Auto‑enriched context (logo, industry, plants; future)
    - Light diagnostics
    - Sample + narrow real data for simulations
  - Goal: discovery, validation, sponsorship, pilot.

- **Customer Mode**
  - After contract; runs on live data.
  - Goal: daily governance, ongoing ladder climb & value tracking.

The same UX (Command Center + Value Studio) supports both modes with different data and permissions.

---

## 3. Move-as-One Framework Overview

The Move-as-One framework has five core elements:

1. **Outcome Pillars & KPI Library** – What we measure.
2. **Value Lever Library** – What we can change.
3. **Lever Ladders** – How maturity progresses per pillar.
4. **Lever Readiness (Data / SOP / Tech)** – Whether a lever is realistically pullable now.
5. **Impact Logic** – How we estimate the effect of levers on KPIs.

These elements drive both:

- The **buyer journey** (Discover → Design → Deploy → Drive), and
- The **product UX** (Value Studio ↔ Command Center).

---

## 4. Outcome Pillars & KPI Library (Dispatch Edition)

### 4.1 Outcome Pillars

For Dispatch Edition we use four pillars:

1. **Cost & Productivity**
2. **Service & Experience**
3. **Risk & Compliance**
4. **ESG & Digitalisation**

Each KPI can belong to one or more pillars.

### 4.2 KPI Catalog – Names & Formulas

**Cost & Productivity**

- **C01 Total Freight Cost**  
  `Sum(freight_amount)` for period.

- **C02 Cost per MT‑km (PKMMT)**  
  `Total Freight Cost / (Sum(tonnes × km))`.

- **C03 Freight Cost % of Revenue**  
  `Total Freight Cost / Net Sales`.

- **C04 Freight Cost % of COGS**  
  `Total Freight Cost / Cost of Goods Sold`.

- **C05 Cost per Shipment**  
  `Total Freight Cost / Shipment Count`.

- **C06 Accessorial Cost %**  
  `Accessorial Cost (detention, demurrage, etc.) / Total Freight Cost`.

- **C07 Freight Cost Variance vs Budget**  
  `(Actual Freight Cost – Budgeted Freight Cost) / Budgeted Freight Cost`.

**Service & Experience**

- **S01 On‑Time Delivery (OTD) %**  
  `Deliveries on/before promised time / Total deliveries`.

- **S02 On‑Time Pickup (OTP) %**  
  `Pickups on/before scheduled time / Total pickups`.

- **S03 In‑Full Delivery (IFD) %**  
  `Orders delivered in full / Orders delivered`.

- **S04 OTIF %**  
  `(Deliveries that are both on‑time and in‑full) / Total deliveries`.

- **S05 Average Transit Time**  
  `Avg(actual_delivery_time – dispatch_time)`.

- **S06 Order Accuracy %**  
  `Orders with correct SKU/qty / Total orders`.

- **S07 Customer Complaint Rate**  
  `#Complaints / 100 shipments`.

**Efficiency & Throughput**

- **E01 Weight Utilisation %**  
  `Actual Load Weight / Vehicle Capacity (weight)`.

- **E02 Volume Utilisation %**  
  `Actual Load Volume / Vehicle Cube Capacity`.

- **E03 Combined Utilisation Index**  
  e.g. `0.5 × Weight Util + 0.5 × Volume Util` (configurable).

- **E04 LTL %**  
  `LTL Shipments / Total Shipments`.

- **E05 Loading/Unloading TAT**  
  `Avg(time_out_gate – time_in_gate)` at plant/consignee.

- **E06 Detention Time**  
  `Avg((time_out_gate – time_scheduled) beyond allowed free time)`.

- **E07 Empty Km %**  
  `Empty KM / Total KM`.

- **E08 Vehicle Fill Rate**  
  Trip‑level utilisation measure (e.g. min(weight_util, volume_util)).

**Risk & Compliance**

- **CP01 E‑Way Bill Compliance %**  
  `Trips with valid EWB / Trips where EWB required`.

- **CP02 POD Capture %**  
  `Delivered shipments with valid POD / Total delivered`.

- **CP03 Documentation Completeness %**  
  `Shipments with all required docs / Total shipments`.

- **CP04 Claims Frequency**  
  `Claims / 1,000 shipments`.

- **CP05 Claims Severity**  
  `Claim value / Freight cost`.

- **CP06 Regulatory Fine Incidents**  
  Count of overload/EWB/RTO fines in period.

**Volume & Placement**

- **V01 Total Dispatch Volume (MT)** – Sum of shipped tonnes.
- **V02 Shipment Count** – Number of shipments.
- **V03 On‑Time Placement %** – Vehicles placed on‑time / placement requests.

**ESG**

- **ESG01 CO₂ Intensity (g CO₂ / t‑km)**  
  `Estimated emissions / (tonne‑km)` using emission factors by mode/vehicle.

- **ESG02 Empty Km %**  
  Same as E07 but reported in ESG context.

- **ESG03 Green Fleet Share %**  
  `Shipments or tonnes moved via CNG/EV/BS‑VI / Total`.

**Digital Adoption / Process Maturity**

- **DA01 Digital Indent %**  
  `Indents raised via system/app/API / Total indents`.

- **DA02 E‑POD Adoption %**  
  `Shipments closed with ePOD / Total delivered`.

- **DA03 Auto‑Planned Load %**  
  `Loads created via optimisers / Total loads`.

- **DA04 Exception Playbook Adoption %**  
  `Alerts handled via defined workflows / Total alerts`.

---

## 5. Value Lever Library – Themes, Schema & Hero Levers

### 5.1 Themes (11 Families)

1. Buying & Rate (TBxx)
2. Load & Cube (LUxx)
3. Routing & Scheduling (RSxx)
4. Network & Footprint (NDxx)
5. Capacity & Vendor (CVxx)
6. Visibility & Control Tower (CTxx)
7. Yard & Plant (YGxx)
8. Docs, Billing & Cashflow (DBxx)
9. Risk, Safety & Compliance (RCxx)
10. Sustainability (SGxx)
11. Order, Inventory & Customer Collaboration (OCxx)

### 5.2 Lever Schema (for every lever)

For each lever we capture:

- **ID** – e.g. C01, TB01, LU10
- **Name** – e.g. “Load Optimizer – LTL→FTL Consolidation”
- **Theme** – one of the 11 families
- **Pillar(s)** – Cost, Service, Risk, ESG, Digital
- **Primary KPIs impacted** – list of KPI codes with direction (↑/↓)
- **Secondary KPIs impacted** – optional
- **Typical Impact Bands** – e.g. `C02: -8% to -15%`, `S04: +2–4 pts`
- **Data requirements** – concrete fields & quality (lane master, weight, volume, timestamps, etc.)
- **SOP/process requirements** – decision‑rights, workflows, governance
- **Tech requirements** – modules, integrations, devices
- **Primary teams involved** – e.g. Plant Ops, Transport Procurement, Finance, IT
- **Maturity Level (per Ladder)** – default rung where this lever lives
- **Readiness Scoring Rules** – questions used to compute Data/SOP/Tech readiness
- **Impact Calculation Recipe** – mapping to the generic impact formula


### 5.3 Generic Impact Formula

For all levers, we use a common structure:

> **Impact = (Volumeₐffected × Deviationₘetric) × Lever_Efficiency**

Where:

- **Volumeₐffected** – the subset of shipments/tonnes where the lever applies.
- **Deviationₘetric** – the gap we’re closing (e.g. LTL vs FTL cost, spot vs contract, actual vs ideal route km).
- **Lever_Efficiency** – empirical or benchmark % of gap we can capture.

Each lever defines what these terms mean.

### 5.4 Dispatch Edition Hero Levers – Fully Spec’d Example Rows

These are the levers we will fully instantiate in v4; others follow the same schema with less detail initially.

#### 5.4.1 C01 / LU10 – Load Optimizer (LTL→FTL Consolidation)

- **Theme:** Load & Cube
- **Pillars:** Cost & Productivity, Service & Experience
- **Primary KPIs:**
  - C02 (↓): Cost per MT‑km
  - E04 (↓): LTL %
  - E01/E02 (↑): Utilisation
- **Secondary KPIs:**
  - V03 (↑): On‑Time Placement (if consolidation improves planning)
- **Impact Band (typical):**
  - C02: -8% to -15% on eligible lanes
  - E04: reduce LTL% by 10–20 pts on targeted flows
- **Data requirements:**
  - Clean lane master (origins, destinations, distances)
  - Shipment‑level weight & volume
  - Time windows for delivery (where relevant)
  - Vehicle type capacities (weight & cube)
- **SOP requirements:**
  - Indents raised with sufficient planning horizon (e.g. ≥24h pool)
  - Central or at least coordinated dispatch planning
  - Agreement that system‑generated load plans will be followed or formally overridden
- **Tech requirements:**
  - TMS integration for orders/shipments
  - Optimisation service / engine available
  - UI for planners to review & approve loads
- **Teams involved:**
  - Plant / Dispatch Ops
  - Central Logistics Planning
  - IT / Digital (for integration)
  - In some cases, Sales (for order‑cutoff alignment)
- **Maturity level:**
  - Cost Ladder: Level 2
- **Readiness scoring (examples):**
  - Data: “Do we capture weight & volume for >80% of shipments?”
  - SOP: “Do planners operate with a consolidated view of next‑day orders?”
  - Tech: “Is there an integration between order system and planning tool?”
- **Impact recipe:**
  - Volumeₐffected: tonnes on lanes where LTL % > threshold (e.g. 30%) and planning horizon allows consolidation
  - Deviationₘetric: difference between cost of actual fragmented LTL vs simulated FTL/multi‑drop plan
  - Lever_Efficiency: % of consolidation opportunity typically realisable (e.g. 40–70%)

#### 5.4.2 C03 / LU12 – Weight + Volume Dual Optimisation

- **Theme:** Load & Cube
- **Pillars:** Cost & Productivity
- **Primary KPIs:** C02 (↓), E01–E03 (↑)
- **Data:** As for C01 + accurate vehicle internal dimensions, stackability rules.
- **SOP:** Loading compliance to system plan; training for loaders.
- **Tech:** 3D load builder or heuristic algorithm; integration into load creation.
- **Teams:** Dispatch planning, Warehouse/loading crew.
- **Maturity:** Cost Ladder Level 2.
- **Impact recipe:**
  - Volumeₐffected: shipments on selected lanes/vehicles
  - Deviationₘetric: unused capacity before vs after optimised packing
  - Lever_Efficiency: proportion of theoretical utilisation uplift captured.

#### 5.4.3 TB01 – Digital Spot Bidding (Basic)

- **Theme:** Buying & Rate
- **Pillars:** Cost, Digitalisation
- **Primary KPIs:** C01, C02, C05
- **Data requirements:**
  - Basic load info: origin, destination, date, vehicle type, target rate band
  - Carrier contact list
- **SOP:**
  - Spot loads routed via app/WhatsApp instead of calls
  - Clear acceptance rules (timeouts, number of responses)
- **Tech:**
  - Carrier app/WhatsApp bot
  - Simple bidding screen and acceptance logic
- **Teams:**
  - Dispatch / Plant
  - Procurement (for oversight)
- **Maturity:** Cost Ladder Level 1→2 bridge.
- **Impact recipe:**
  - Volumeₐffected: spot shipments per month
  - Deviationₘetric: average difference between phone‑negotiated rate and median digital bid
  - Lever_Efficiency: fraction of that difference captured (e.g. 40–60%).

#### 5.4.4 C02 / RS19 – Route Optimisation (Primary Lanes)

…

> [In the actual working copy, similar details are added for hero levers: V01 Vehicle Placement Automation, CT44 Tracking, CT46 Control Tower (basic), E05/ YG55 Gate & Detention Hygiene, DB60 E‑Way Bill, DB62 E‑POD. Non‑hero levers are grouped by theme with shared dependency notes.]

---

## 6. Move-as-One Lever Ladders – Pillar Maturity Model

We define ladders per pillar to structure the journey.

### 6.1 Ladder Levels

Across pillars we use a common pattern:

- **Level 1 – Foundational Visibility & Discipline**
  - Basics measured; key flows digitised; obvious fires addressed.
- **Level 2 – Core Optimisation & Automation**
  - Loads, routes, and key workflows optimised and system‑driven.
- **Level 3 – Advanced Orchestration & Proactive Control**
  - Control tower, exceptions, predictive and cross‑functional levers.
- **Level 4 – Strategic & Network‑Level Optimisation** (optional)
  - Scenario analysis, digital twin, mode shift, network design.

### 6.2 Cost & Productivity Ladder (examples)

- **Level 1:**
  - TB01 Digital Spot Bidding (basic)
  - CV36 Carrier Scorecards (basic)
  - DB64 Basic freight audit
- **Level 2:**
  - C01 Load Optimizer
  - C03 Dual Optimisation
  - TB01 (broader coverage)
  - TB02 Simple reverse auctions
- **Level 3:**
  - C02 Route Optimisation
  - ND34 Backhaul stitching
  - CV37 SOB caps
  - TB02 Advanced auctions
- **Level 4:**
  - TB03 Contract governance & fuel indexation
  - TB04 Lane benchmarking
  - ND35 Mode shift identification
  - CT50/51 Cost‑focused scenarios

### 6.3 Service & Experience Ladder (examples)

- **Level 1:** CT44 Tracking, DB62 E‑POD, basic OTIF KPIs
- **Level 2:** V01 Vehicle Placement Automation, CT46 Control Tower (basic)
- **Level 3:** CT47 Exception playbooks, CT48 Predictive ETA, OC84 Service tiers
- **Level 4:** ND27/28 network redesign, OC81/82 promo/VMI flows

### 6.4 Risk & Compliance Ladder (examples)

- **Level 1:** DB60 EWB, DB62 basic E‑POD, RC72 doc checks, YG55 weighbridge
- **Level 2:** RC68 overload interlocks, RC67 route compliance, DB65 auto detention
- **Level 3:** RC73 claims analytics, DB64 full audit, CT47 risk‑weighted playbooks

### 6.5 ESG & Digitalisation Ladder (cross‑cutting)

- **Level 1:** DA01 Digital indents, DA02 E‑POD, DB60/61 digitised docs
- **Level 2:** CT47 automated workflows, DA03 auto‑planned loads, DB63 auto‑invoicing
- **Level 3:** CT48 predictive AI, SG74 CO₂ accounting, SG76/77 mode shift & empty‑mile CO₂.

Ladders are visualised and scored in Value Studio.

---

## 7. Lever Readiness – Data / SOP / Tech

### 7.1 Concept

For each lever we assess readiness on 3 axes:

1. **Data Readiness** – Do we have the data required in clean, structured form?
2. **SOP / Process Readiness** – Are processes, roles, and norms in place to use the lever?
3. **Tech Readiness** – Are necessary systems/integrations/devices available or feasible quickly?

Each axis is scored and visualised as **Red / Amber / Green**.

### 7.2 Readiness Questions (Examples)

For a lever like C01 Load Optimizer:

- **Data:**
  - “Do you consistently capture weight & volume for >80% of shipments?”
  - “Do you have a lane master with distances and typical transit times?”
- **SOP:**
  - “Are dispatch decisions centralised or at least coordinated?”
  - “Do planners work with a 24–48h view of upcoming orders?”
- **Tech:**
  - “Is there a system of record for orders that can feed the planner?”
  - “Do planners have access to a shared planning tool?”

Each question is answered A/B/C (0/1/2 pts) and rolled up to an R/A/G per axis.

### 7.3 How Readiness Appears in UX

- **Value Studio – Lever Detail:**
  - 3 horizontal bars (Data, SOP, Tech) with accompanying text.
- **KPI Design View:**
  - Candidate levers listed with mini readiness icons.
- **Ladder View:**
  - Levers on the next rung show readiness state; the most “green” ones are recommended first.

---

## 8. End-to-End Buyer Journey & UX – Discover → Design → Deploy → Drive

### 8.1 Overview

We map the Move-as-One lifecycle onto concrete product & GTM steps:

1. **Discover** – Intro & Light Diagnostic (no data), using Value Studio Discover view
2. **Design** – Lever ladders, readiness & simulations, using Value Studio Design views
3. **Deploy** – Pilot using Command Center Run Mode + focused levers
4. **Drive** – BAU; re‑diagnostics and ladder climbing

### 8.2 Stage 1: Discover – How we Introduce Move-as-One

**Goal:** Get the prospect (esp. big boss) to:

- See their world in our **Outcome → Lever** framing.
- Experience a **light diagnostic** that feels concrete and non‑salesy.
- Walk away with a simple **Value Snapshot** (where they are; top levers).

**Flow (Sales‑Assisted, within the product):**

1. AE/SE creates a **Prospect Session** with company name, logo, industry.
2. Open **Value Studio – Discover** view:
   - Show simple Value Map (pillars, 2–3 KPIs and levers per pillar).
   - Explain in plain language:
     > “We think in terms of outcomes you care about and levers you can pull.”
3. Click `Run Quick Diagnostic`:
   - 10–15 questions, answered live.
   - Questions map to ladder levels per pillar.
4. Show **Ladder Overview**:
   - “On Cost you’re at Level 1; on Digital you’re at Level 2.”
5. Show **Top Suggested Levers** (list of 3–7) without going into deep tech.
6. Export a **one‑pager** as follow‑up: Ladder positions + candidate levers.

Concept introduction order:

- Outcomes → Levers → Diagnostic → “Levels” → “Ladder” visual.

No mention of “digital twin” or heavy jargon yet.

### 8.3 Stage 2: Design – Readiness & Simulation

**Goal:** Move from “nice framework” to **“here’s what we can actually do next quarter and what it’s worth.”**

**Readiness Introduction (Messaging):**

- Explain simply:
  > “For each lever, we look at data, process, and tech. There’s no point planning a lever you can’t pull yet. So we first check: are you ready?”

**UX:**

- In Value Studio – KPI Design View:
  - Choose a key KPI (e.g. C02, S04).
  - Show:
    - Current ladder level.
    - Candidate levers on the next rung.
    - Readiness bars (Data/SOP/Tech) for each.
- AE/SE captures answers to lever readiness questions (or customer self‑fills).
- System highlights 2–3 levers with highest readiness & impact.

**Simulation:**

- Once levers are chosen, Value Studio shows a **Simulation tab**:
  - Asks for data sample (lanes, fields) – either in-app instructions or integrated upload.
  - Simulation itself may be off‑platform v1, but results (impact bands) are entered back into the Session.
- UI presents per lever:
  - Baseline KPIs vs simulated KPIs.
- Combined **Business Case View**:
  - For chosen pilot scope and levers, estimate cost savings & service improvement.

Concept introduction order:

- Ladder → Next rung → Readiness → Levers chosen → Data sample → Simulation → Business case.

### 8.4 Stage 3: Deploy – Pilot / POC Using Command Center

**Goal:** Prove value on a limited scope; show the Command Center as governance cockpit.

**UX:**

- Command Center Run Mode is set up for **Pilot Scope**:
  - Headline KPIs: C02, S04, E06
  - Filter defaults to lanes/plants in pilot
  - Lever chips show only the pilot levers (e.g. C01, TB01, CT46)
- Big boss experience:
  - Can open Command Center weekly to see:
    - Current vs baseline KPIs
    - Which levers are active and how they trend
- Value Studio Deploy view:
  - Shows levers with readiness bars and status (Planned → Live → Stabilised).

### 8.5 Stage 4: Drive – Continuous Ladder Climb

**Goal:** Make Move-as-One the ongoing **transformation cockpit**.

**UX:**

- Quarterly (or semi‑annual) **Re‑Diagnostic** button in Value Studio:
  - Prepopulates some answers from data (e.g. DA01–04, C02, S04).
  - Asks a few updated qualitative questions.
- Ladder view updates per pillar:
  - Shows progress over time.
- Command Center shows a **Transformation widget**:
  - Cost Ladder: L1 → L2 (achieved)
  - Service Ladder: L1 → L2 (in progress)
  - Risk Ladder: L1
- Value Studio suggests **next rung** levers:
  - Some may be advanced (e.g. route optimisation, backhaul, predictive ETA).

Big boss perception:

- “I’m not just buying software; I have a live roadmap and I can see how far we’ve come and what’s next.”

---

## 9. Self-Serve vs Sales-Assisted Onboarding

### 9.1 Shared Building Blocks

Both self‑serve and sales‑assisted journeys rely on the same components:

- Value Map (pillars, KPIs, hero levers)
- Light Diagnostic
- Ladder scoring
- Lever Readiness model
- Basic simulations (later)

### 9.2 Sales-Assisted (v1 focus)

- AE/SE drives Discover + Design sessions using Value Studio.
- Prospect sees:
  - A curated experience
  - Clear facilitation by Fretron team

### 9.3 Self-Serve (future capability)

We design UX so that later:

- New user can sign up for a **Move-as-One Trial/Diagnostic**:
  - Provide company name & basic info
  - Run Light Diagnostic in‑app
  - See their ladders and suggested levers
- They can optionally:
  - Upload small sample data for simulation
  - Invite Fretron to review results (sales‑assist triggers)

The PRD ensures components are modular, so sales-assisted flows can evolve into self‑serve with minimal redesign.

---

## 10. Implementation & Roadmap – Focused on Executability

### 10.1 Phase 1 (0–30 days) – Narrative & Mocks

- Lock the **Move-as-One narrative** and copy:
  - How we describe pillars, levers, ladders, readiness to a CXO.
- Build Figma mockups for:
  - Value Studio Discover view (Value Map + Diagnostic + Ladder overview)
  - KPI Design View (levers + readiness + simulation placeholder)
  - Command Center unified page (headline KPIs, pillar sections, transformation widget)
- Finalise Light Diagnostic Qs mapped to ladder levels.

### 10.2 Phase 2 (31–60 days) – Prospect Mode MVP

- Implement basic **Prospect Session** entity (internal‑only manageable).
- Build Value Studio Discover as a real screen (with stored diagnostic results).
- Implement static Command Center with sample data & scenario toggle.
- Run 1–2 real Discover + Design cycles with prospects.

### 10.3 Phase 3 (61–90 days) – Pilot + Early Design Mode Productisation

- Implement Command Center Run Mode for one real pilot customer.
- Implement minimal KPI Design View (showing active levers, candidate levers, readiness manually configured).
- Use external tools for simulation, but display results in Value Studio.

### 10.4 Beyond 90 Days – Personalisation & Self-Serve

- Build enrichment services for logo/industry/locations.
- Enable self-serve Move-as-One Diagnostic for inbound leads.
- Expand lever library details (dependencies & impact) across all 80+ levers.

---

This v4 master document ties together:

- Outcome KPIs (what we measure)
- Value levers (what we change)
- Ladders (how maturity progresses)
- Readiness (whether we can pull each lever)
- Impact logic (how we quantify effect)
- UX flows (how Command Center & Value Studio embody all of this)
- GTM & buyer journey (how we introduce it in a way that lands with executives).

All further design docs, sales materials and implementation plans should be derived from and kept consistent with this master spec.

