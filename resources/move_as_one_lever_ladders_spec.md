# Move-as-One Lever Ladders – Concept & Implementation Spec

> This doc reconstructs and tightens the **Move-as-One Lever Ladders** concept: how levers are grouped into ladders, how maturity is defined, and how ladders plug into the overall Move-as-One framework and lifecycle (Discover → Design → Deploy → Drive).

---

## 1. What are Move-as-One Lever Ladders?

**Move-as-One Lever Ladders** are simple, 3–4 step maturity ladders for each key Outcome Pillar:

1. **Cost & Productivity**
2. **Service & Experience**
3. **Risk & Compliance**
4. *(Optional/advanced)* **ESG & Digitalisation** as a cross-cutting ladder

Each ladder:

- Groups value levers into **levels** reflecting practical maturity:
  - Level 1 – Foundational Visibility & Discipline
  - Level 2 – Core Optimisation & Automation
  - Level 3 – Advanced Orchestration & Proactive Control
  - Level 4 – Strategic / Network-Level Optimisation (optional for some pillars)
- Helps answer:
  - “Where are you today on this dimension?”
  - “Which levers are realistic **next steps** vs too far ahead?”
  - “What ROI can we model at each level?”

**Key intent:** ladders turn a large lever library into a **navigable progression**, and tie directly into the Move-as-One lifecycle and the product (Command Center + Value Studio).

---

## 2. Cost & Productivity Ladder

**North Stars:** C02 PKMMT, C05 Cost/shipment, C03/4 Cost % Revenue/COGS, E04 LTL%, E01–E03 utilisation.

### Level 1 – Foundational Cost Visibility & Buying Hygiene

Goal: Get a basic grip on **who is charging what, on which lanes, and with what performance**, and eliminate obvious leakages.

**Typical state:**
- Lane-level cost visibility is limited or manual.
- Spot buying is via phone/WhatsApp, rates not consistently recorded.
- Contracts exist but are not actively governed.

**Primary levers at L1:**
- **TB01 – Digital Spot Bidding (basic)**
  - Replace phone calls with structured spot bids via app/WhatsApp.
- **CV36 – Carrier Scorecards (basic)**
  - At least OTIF/placement performance visible lane/vendor-wise.
- **DB64 (light) – Basic Freight Audit & Checks**
  - Highlight obvious rate card vs invoice mismatches (even via reports).

### Level 2 – Core Dispatch Optimisation (Loads & Rates)

Goal: Reduce cost per unit by consolidating shipments and reducing dead freight while enforcing basic rate discipline.

**Primary levers at L2:**
- **C01 / LU10 – Load Optimizer (LTL→FTL consolidation)**
  - Consolidate by lane/cluster and time window.
- **C03 / LU12 – Weight + Volume Dual Optimisation**
  - Reduce deadweight and deadcube.
- **TB01 – Digital Spot Bidding (broader)**
  - Apply to a defined % of eligible spot volume.
- **TB02 (light) – Reverse Auction (simple rules)**
  - Basic multi-round auctions for selected lanes.

### Level 3 – Advanced Cost & Network Orchestration

Goal: Move from optimizing **individual loads and bids** to optimizing **lane portfolios and the network**.

**Primary levers at L3:**
- **C02 / RS19 – Route Optimisation (primary lanes)**
  - Optimise for distance/toll/time.
- **ND34 – Backhaul Lane Creation & Stitching**
  - Systematically reduce empty miles.
- **CV37 – Share-of-Business Caps**
  - Reduce dependency and extract better rates.
- **TB02 – Reverse Auction (rules + lane bundles)**
  - More sophisticated auctions with reserve prices, bundles.

### Level 4 – Strategic Cost Governance & Digital Twin (Optional)

Goal: Use **scenarios and digital twin** to shape contracts, modes, and footprint.

**Primary levers at L4:**
- **TB03 – Contract Governance & Fuel Indexation**
- **TB04 – Lane-Level Benchmarking vs Market**
- **ND35 – Mode Shift (Road→Rail/Sea) Lane Identification**
- **CT50/CT51 – Scenario Simulation & Digital Twin (cost-focused)**

---

## 3. Service & Experience Ladder

**North Stars:** S01 OTD, S04 OTIF, V03 placement, S05 transit time, S07 complaints.

### Level 1 – Foundational Service Visibility & Proof

Goal: See what’s happening and capture **proof of service** reliably.

**Primary levers at L1:**
- **CT44 – Track & Trace (GPS / Driver App)**
- **DB62 – E-POD**
- **S01/S04 metrics – Basic OTD/OTIF measurement on key lanes**

### Level 2 – Operational Service Control

Goal: Close the loop between **planning, placement, and live exceptions**.

**Primary levers at L2:**
- **V01 – Vehicle Placement Automation**
  - Digital indent & accept/reject via app/WhatsApp, with timestamps.
- **CT46 – Control Tower (Basic)**
  - Single pane for live delayed/at-risk shipments.
- **YG53 – Slot Booking (for high-volume plants)**
  - Manage loading/unloading windows.

### Level 3 – Proactive Service Management

Goal: Prevent service failures via **prediction and structured interventions**.

**Primary levers at L3:**
- **CT47 – Rules-based Exception Playbooks**
  - Standard responses to delay/detention.
- **CT48 – Predictive ETA & Risk Scoring**
- **OC84 – Service-Tier-Based Routing & SLAs**
  - Different promises for Gold/Silver/Bronze customers.

### Level 4 – Experience-Oriented Network Design (Optional)

Goal: Design network & flows for differentiated service **across** channels and customers.

**Primary levers at L4:**
- **ND27/ND28 – Hub-and-Spoke & Cross-Dock Design**
- **ND29 – Virtual Pooling of Inventory**
- **OC81/OC82 – Promo & VMI Load Planning (for CPG)**

---

## 4. Risk & Compliance Ladder

**North Stars:** CP01–CP06, E06 (detention), claims, regulatory fines.

### Level 1 – Basic Regulatory Hygiene & Document Discipline

Goal: Avoid obvious regulatory and documentation failures.

**Primary levers at L1:**
- **DB60 – E-Way Bill Automation**
- **DB62 – E-POD (with geo-check, even if not fully locked)**
- **RC72 – Doc Completeness Checks**
- **YG55 – Weighbridge Automation** (for proper weight capture)

### Level 2 – Automated Operational Risk Controls

Goal: Use systems to **block or flag** high-risk movements.

**Primary levers at L2:**
- **RC68 – Overload Interlocks**
  - Prevent gate-out on overload.
- **RC67 – Route Compliance & No-Go Zones**
  - Avoid risky areas.
- **DB65 – Automated Detention/Demurrage Computation**
  - Make detention visible and actionable.

### Level 3 – Integrated Risk & Audit Analytics

Goal: Use risk data to reshape operations and contracts.

**Primary levers at L3:**
- **RC73 – Claims & Incident Analytics**
- **CT47 – Exception Playbooks with Risk Emphasis**
- **DB64 – Full Freight Audit Engine**

---

## 5. ESG & Digitalisation Ladder (Cross-Cutting)

**North Stars:** ESG01–03, DA01–DA04.

### Level 1 – Digital Footprint

Goal: Logistically relevant processes are at least **digitally captured**.

**Primary levers at L1:**
- **DA01 – Digital Indent %**
- **DA02 – E-POD Adoption %**
- **DA03 – Auto-Planned Load % (even simple rules)**

### Level 2 – Workflow Automation

Goal: System drives workflows instead of manual coordination.

**Primary levers at L2:**
- **C01/C03 – Auto-Planned Loads**
- **CT47 – Exceptions with Playbooks**
- **DB61/63 – Auto Docs & Invoicing**

### Level 3 – AI & ESG Optimisation

Goal: Move from logs to **optimisation & sustainability**.

**Primary levers at L3:**
- **CT48 – Predictive ETA / AI risk**
- **SG74 – CO₂ Accounting**
- **SG76/SG77 – Mode Shift & Empty-Mile CO₂ Optimisation**

---

## 6. How Ladders Plug into the Move-as-One Framework

Move-as-One has 4 lifecycle stages:

1. **Discover**
2. **Design**
3. **Deploy**
4. **Drive**

Ladders provide the **scaffolding** for each stage:

### 6.1 Discover – Scoring Where They Are on Each Ladder

Activities:

- Run Light Diagnostic (10–15 questions) mapping to pillars.
- Each answer contributes points to relevant ladder (Cost, Service, Risk, Digital).
- Compute maturity level per ladder:
  - 0–2 pts → Level 1 (Foundational)
  - 3–4 pts → Level 2 (Core Optimisation)
  - 5+ pts → Level 3 (Advanced)

Output:

- A simple **radar chart**: Cost Level X, Service Level Y, Risk Level Z, Digital Level W.
- A textual explanation:
  - “On Cost you are at **Level 1**: you have limited lane-level visibility, spot buying is manual, and consolidation is ad-hoc.”

### 6.2 Design – Choosing Next Rungs & Levers

Activities:

- For each ladder:
  - Identify **current rung**.
  - Highlight **next rung** (or at most next two).
- Map levers per rung:
  - “On Cost Ladder you’re at L1; L2 levers that fit you are: Load Optimizer, Digital Spot Bidding.”
- Use Value Studio to:
  - Show readiness per candidate lever (pre-reqs and practical feasibility).
  - Pick **2–3 levers** that collectively move you up one rung on one or two ladders.

Output:

- A short **Move-as-One roadmap**:
  - “Phase 1: move Cost Ladder from L1→L2 using C01, C03, TB01.
     Phase 2: move Service Ladder from L1→L2 with V01, CT46.”

### 6.3 Deploy – Implementing Selected Rung Levers

Activities:

- Implementation focuses on levers **for the next rung only**, not the full ladder.
- Success metrics are tied to:
  - Rung-specific KPIs (Cost Ladder → C02, E04; Service Ladder → S04, V03).
- Command Center Run Mode becomes the governance view:
  - Show those KPIs and levers as the primary cards in the dashboard.

Output:

- After 3–6 months, you expect to:
  - Achieve the KPI improvements associated with L2 for the chosen ladder.
  - Qualify to re-score ladder level in the next Drive stage.

### 6.4 Drive – Re-Diagnostic & Climbing the Ladders

Activities:

- Run diagnostic again, this time using **real data** from Command Center + updated Light/Deep Diagnostics.
- Re-score levels per ladder.
- Decide whether the company has **moved up a rung** on one or more ladders.
- Identify new candidate levers for **next rung**.

Output:

- Quarterly/annual **Move-as-One Progress Report**:
  - “In 2025, you moved Cost Ladder from Level 1→2, Service from 1→2; Risk remained at 1. Next year, we’ll target Risk L2 and begin Cost L3 on selected lanes.”

---

## 7. How Ladders Appear in the Product (Command Center & Value Studio)

### 7.1 Value Studio – Ladder View

We can show a simplified ladder visual per pillar:

- Vertical stack labeled L1, L2, L3, (L4).
- For each level:
  - Rung label (e.g., “Foundational Visibility”).
  - 2–3 lever chips.
- Highlight:
  - **Current level** (solid color)
  - **Next recommended level** (outlined)

Interactions:

- Clicking a lever chip opens Lever Detail.
- Clicking a rung label filters Lever Library to that rung’s levers.

### 7.2 Command Center – Ladder Status Badges

On the main Command Center header or Sales Overlay:

- Show a small “Move-as-One Ladder” widget:
  - Cost Ladder: L1→L2 (in progress)
  - Service Ladder: L1
  - Risk Ladder: L1

Over time (post-sale), customers can see their **“ladder climb”** as part of their transformation story.

---

## 8. Summary

Move-as-One Lever Ladders:

- Break the complex lever universe into **3–4 intuitive rungs per pillar**.
- Provide a **scoring system** to answer “Where are you now?” and “What’s next?”
- Drive the **Move-as-One lifecycle**:
  - Discover = initial ladder scoring.
  - Design = choosing the next rung & levers.
  - Deploy = implementing those levers.
  - Drive = re-scoring & climbing.
- Integrate cleanly into both:
  - The **Value Studio** (ladder visuals & lever readiness views).
  - The **Command Center** (KPIs & levers wired into daily ops).

This doc should be kept in sync with the broader **Move-as-One Command Center – Product & GTM Spec** and used as the canonical reference for how maturity and levers are presented together.