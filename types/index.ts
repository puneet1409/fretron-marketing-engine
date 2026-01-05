// Core Enums

export enum Pillar {
  COST = "cost",
  SERVICE = "service",
  EFFICIENCY = "efficiency",
  COMPLIANCE = "compliance",
  VOLUME = "volume",
  ESG = "esg",
  DIGITAL = "digital",
}

export enum LeverTheme {
  BUYING_RATE = "buying_rate",
  LOAD_CUBE = "load_cube",
  ROUTING_SCHEDULING = "routing_scheduling",
  NETWORK_FOOTPRINT = "network_footprint",
  CAPACITY_VENDOR = "capacity_vendor",
  VISIBILITY_CONTROL_TOWER = "visibility_control_tower",
  YARD_PLANT = "yard_plant",
  DOCS_BILLING = "docs_billing",
  RISK_COMPLIANCE = "risk_compliance",
  SUSTAINABILITY = "sustainability",
  ORDER_CUSTOMER = "order_customer",
}

export enum Industry {
  STEEL = "steel",
  CPG = "cpg",
  THREEPLS = "3pl",
  CHEMICALS = "chemicals",
  CEMENT = "cement",
}

export enum LeverStatus {
  NOT_EVALUATED = "not_evaluated",
  CANDIDATE = "candidate",
  ACTIVE = "active",
  PARKED = "parked",
}

export enum KPIStatus {
  ON_TRACK = "on_track",
  AT_RISK = "at_risk",
  OFF_TRACK = "off_track",
}

export enum ReadinessLevel {
  GREEN = "green",
  AMBER = "amber",
  RED = "red",
}

// KPI Types

export interface KPI {
  id: string; // e.g., "C01", "S04", "E06"
  name: string;
  description: string;
  pillar: Pillar;
  unit: string; // e.g., "₹", "%", "hours"
  formula?: string;
  benchmarks?: {
    industry?: string;
    typical?: number;
    bestInClass?: number;
  };
}

export interface KPIValue {
  kpiId: string;
  current: number;
  target: number;
  lastQuarter: number;
  sparkline: number[]; // 6 data points for sparkline
  status: KPIStatus;
  activeLeverIds: string[];
}

// Value Lever Types

export interface ValueLever {
  id: string; // e.g., "TB01", "LU10", "RS19"
  name: string;
  description: string;
  theme: LeverTheme;
  pillars: Pillar[];
  impactedKPIs: {
    kpiId: string;
    expectedImpactRange: [number, number]; // e.g., [-8, -15] for -8% to -15%
    unit: "%" | "absolute";
  }[];
  industries: Industry[];
  maturityLevel: 1 | 2 | 3; // 1=Foundational, 2=Emerging, 3=Advanced
  readiness: {
    data: ReadinessLevel;
    process: ReadinessLevel;
    technology: ReadinessLevel;
  };
  benchmarkSource?: string;
  typicalROI?: string;
}

export interface LeverActivation {
  leverId: string;
  coverage: number; // % of volume or transactions
  activatedDate: string;
  observedImpact?: {
    kpiId: string;
    actualChange: number;
  }[];
}

// Scenario Types

export interface Scenario {
  id: string;
  name: string; // "Baseline" or "Post-Lever-Activation"
  description: string;
  kpiValues: KPIValue[];
  activeLever: LeverActivation[];
}

// Shipment & Drill-down Types

export interface Shipment {
  id: string;
  date: string;
  origin: string;
  destination: string;
  laneId: string;
  plant: string;
  vendor: string;
  vehicleType: string;
  weight: number; // in MT
  volume?: number; // in m³
  distance: number; // in km
  freightCost: number; // in ₹
  detention?: number; // in hours
  transitTime: number; // in hours
  onTime: boolean;
  inFull: boolean;
  ewbCompliant: boolean;
  podReceived: boolean;
}

export interface Lane {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  avgPKMMT: number;
  shipmentCount: number;
  totalVolume: number;
  totalCost: number;
  otifPercent: number;
}

export interface Vendor {
  id: string;
  name: string;
  shipmentCount: number;
  avgPKMMT: number;
  otifPercent: number;
  detentionHours: number;
}

// Diagnostic Types

export interface DiagnosticQuestion {
  id: string;
  question: string;
  pillar: Pillar;
  options: {
    value: number; // 0-2 score
    label: string;
  }[];
}

export interface DiagnosticResult {
  scores: {
    [key in Pillar]?: number;
  };
  maturityLevel: {
    [key in Pillar]?: 1 | 2 | 3;
  };
  recommendedLevers: string[]; // lever IDs
}

// Filter Types

export interface GlobalFilters {
  dateRange: {
    start: string;
    end: string;
  };
  plant?: string;
  region?: string;
  mode: "road" | "rail" | "all";
  scenarioId: string;
}

// UI State Types

export interface WhyPanelData {
  kpi: KPI;
  kpiValue: KPIValue;
  contributionBreakdown: {
    label: string;
    value: number;
    change: number;
  }[];
  activeLeverSnapshots: {
    lever: ValueLever;
    coverage: number;
    modeledImpact: [number, number];
    observedChange?: number;
  }[];
  suggestedLevers: ValueLever[];
}
