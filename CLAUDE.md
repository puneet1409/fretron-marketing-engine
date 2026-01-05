# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fretron Move-as-One Command Center is an interactive sales demo application for Fretron TMS (Transportation Management System). It positions Fretron as a "value-lever-first TMS" through interactive dashboards showcasing KPI tracking and value lever activation. This is a Next.js 15 app with TypeScript and Tailwind CSS.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm run lint         # Run ESLint
```

## Architecture

### Two Main Modes

**Run Mode** (`app/page.tsx` → mode="run"): Live KPI dashboard with:
- Role-based personalization (CFO, Supply Chain, Plant Head, Procurement)
- Headline KPIs row showing 4 priority metrics per role
- Pillar sections (Cost, Service, Efficiency, Compliance) with expandable KPI tiles
- Scenario switching (Baseline vs Post-Lever-Activation)
- KPI drill-down via `/kpi/[id]` route

**Design Mode** (`app/page.tsx` → mode="design"): Value discovery journey with:
- Journey stages: Discover → Design → Deploy → Drive
- Diagnostic Summary with maturity radar charts
- Lever Library (87 value levers searchable/filterable)
- Ladder View for implementation roadmapping

### Component Organization

- `components/run-mode/` - Dashboard components (KPITile, PillarSection, HeadlineKPIs, WhyPanel)
- `components/design-mode/` - Value studio components (DiagnosticSummary, LeverLibrary, LeverDetailPanel)
- `components/shared/` - Reusable UI (Sparkline, StatusBadge, RoleSelector, ViewDensityToggle)
- `components/kpi-detail/` - KPI drill-down components (TrendChart, ContributeDiluteTable)

### Data Layer (`data/`)

All data is static JSON:
- `kpis.json` - 36 KPIs across 7 pillars with formulas and benchmarks
- `levers.json` - 87 value levers with readiness requirements and KPI impact ranges
- `mock-scenarios.json` - Baseline and Post-Lever scenarios with KPI values
- `diagnostic-questions.json` / `diagnostic-questions-light.json` - Maturity assessment questions
- `readiness-questions.json` - Technology/process readiness checks

### Business Logic (`lib/`)

- `simulation-engine.ts` - Calculates lever impact projections, ROI, and timeline forecasts
- `diagnostic-engine.ts` - Scores diagnostic answers and recommends levers
- `readiness-engine.ts` - Evaluates implementation readiness
- `ladder-utils.ts` - Lever prioritization and implementation sequencing
- `utils.ts` - Formatting (currency, percentages) and status color helpers

### Configuration (`config/`)

- `roles.ts` - Defines role-based views (headlineKPIs, primaryPillars per role)

### Types (`types/index.ts`)

Core domain types:
- `KPI`, `KPIValue` - Metric definitions and current values
- `ValueLever`, `LeverActivation` - Improvement levers and their activation state
- `Scenario` - Complete snapshot of KPI values with active levers
- `Pillar`, `LeverTheme`, `Industry` - Classification enums

### Path Alias

`@/*` maps to project root (e.g., `import { cn } from "@/lib/utils"`)

## Key Patterns

### State Persistence
Role selection and view density are persisted to localStorage via `saveSelectedRole()` and `saveViewDensity()`.

### Role-Based Filtering
`getRoleConfig(selectedRole)` returns which KPIs appear in headlines and which pillars auto-expand.

### KPI-Lever Relationships
Levers define `impactedKPIs` with expected impact ranges. KPIValues track `activeLeverIds` to show attribution.

### Indian Number Formatting
Currency uses Lakh/Crore notation (e.g., `₹1.5 Cr`). Use `formatCurrency()` from utils or simulation-engine.
