import type { ValueLever, KPI } from "@/types";
import kpisData from "@/data/kpis.json";
import leversData from "@/data/levers.json";

export interface SimulationConfig {
  selectedLeverIds: string[];
  timeHorizon: number; // months
  assumptions: {
    adoptionRate: number; // 0-100%
    rampUpMonths: number;
    confidenceLevel: "conservative" | "moderate" | "aggressive";
  };
}

export interface LaneProjection {
  laneId: string;
  laneName: string;
  currentVolume: number; // shipments per month
  currentCost: number; // INR per shipment
  projectedCost: number; // INR per shipment
  costReduction: number; // percentage
  totalSavings: number; // INR per month
}

export interface KPIProjection {
  kpiId: string;
  kpiName: string;
  currentValue: number;
  projectedValue: number;
  delta: number;
  deltaPercentage: number;
  unit: string;
}

export interface LeverImpactProjection {
  leverId: string;
  leverName: string;
  readinessScore: "red" | "amber" | "green";
  implementationEffort: "low" | "medium" | "high";
  rampUpMonths: number;
  kpiImpacts: KPIProjection[];
  laneImpacts: LaneProjection[];
  totalMonthlySavings: number;
  annualizedSavings: number;
}

export interface SimulationResult {
  config: SimulationConfig;
  leverProjections: LeverImpactProjection[];
  aggregatedKPIImpacts: KPIProjection[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  roi: {
    investmentRequired: number;
    paybackMonths: number;
    threeYearROI: number; // percentage
  };
  timeline: {
    month: number;
    cumulativeSavings: number;
    activeLeverCount: number;
  }[];
  createdAt: string;
}

/**
 * Generate mock lane data for simulation
 */
function generateMockLanes(): Array<{ id: string; name: string; volume: number; cost: number }> {
  return [
    { id: "L01", name: "Jamshedpur → Kolkata", volume: 1200, cost: 3500 },
    { id: "L02", name: "Vizag → Chennai", volume: 800, cost: 4200 },
    { id: "L03", name: "Rourkela → Mumbai", volume: 600, cost: 8500 },
    { id: "L04", name: "Jamshedpur → Delhi", volume: 1000, cost: 6200 },
    { id: "L05", name: "Vizag → Bangalore", volume: 700, cost: 3800 },
    { id: "L06", name: "Rourkela → Kolkata", volume: 500, cost: 4100 },
    { id: "L07", name: "Jamshedpur → Pune", volume: 400, cost: 7200 },
    { id: "L08", name: "Vizag → Hyderabad", volume: 900, cost: 2800 },
  ];
}

/**
 * Calculate impact based on confidence level
 */
function applyConfidenceMultiplier(
  impactRange: [number, number],
  confidenceLevel: "conservative" | "moderate" | "aggressive"
): number {
  const [min, max] = impactRange;
  const mid = (min + max) / 2;

  switch (confidenceLevel) {
    case "conservative":
      return min;
    case "moderate":
      return mid;
    case "aggressive":
      return max;
  }
}

/**
 * Calculate ramp-up factor for a given month
 * Uses S-curve adoption pattern
 */
function calculateRampUpFactor(month: number, rampUpMonths: number): number {
  if (month >= rampUpMonths) return 1.0;
  // S-curve: slow start, fast middle, slow end
  const progress = month / rampUpMonths;
  return 1 / (1 + Math.exp(-10 * (progress - 0.5)));
}

/**
 * Calculate KPI projection for a lever
 */
function calculateKPIProjection(
  lever: ValueLever,
  kpiId: string,
  currentValue: number,
  confidenceLevel: "conservative" | "moderate" | "aggressive"
): KPIProjection | null {
  const kpi = kpisData.find((k) => k.id === kpiId) as KPI;
  if (!kpi) return null;

  const leverImpact = lever.impactedKPIs.find((impact) => impact.kpiId === kpiId);
  if (!leverImpact) return null;

  const impactPercentage = applyConfidenceMultiplier(
    leverImpact.expectedImpactRange,
    confidenceLevel
  );

  const delta = currentValue * (impactPercentage / 100);
  const projectedValue = currentValue + delta;

  return {
    kpiId,
    kpiName: kpi.name,
    currentValue,
    projectedValue,
    delta,
    deltaPercentage: impactPercentage,
    unit: kpi.unit,
  };
}

/**
 * Calculate lane-level impact
 */
function calculateLaneImpact(
  lever: ValueLever,
  lane: { id: string; name: string; volume: number; cost: number },
  confidenceLevel: "conservative" | "moderate" | "aggressive"
): LaneProjection {
  // Find cost-related KPI impact
  const costImpact = lever.impactedKPIs.find((impact) =>
    ["C01", "C02", "C03"].includes(impact.kpiId)
  );

  let costReduction = 0;
  if (costImpact) {
    costReduction = applyConfidenceMultiplier(costImpact.expectedImpactRange, confidenceLevel);
  }

  const projectedCost = lane.cost * (1 + costReduction / 100);
  const savingsPerShipment = lane.cost - projectedCost;
  const totalSavings = savingsPerShipment * lane.volume;

  return {
    laneId: lane.id,
    laneName: lane.name,
    currentVolume: lane.volume,
    currentCost: lane.cost,
    projectedCost,
    costReduction: -costReduction,
    totalSavings,
  };
}

/**
 * Calculate lever impact projection
 */
function calculateLeverImpact(
  lever: ValueLever,
  config: SimulationConfig
): LeverImpactProjection {
  const lanes = generateMockLanes();
  const { confidenceLevel } = config.assumptions;

  // Determine readiness score
  const readinessScores = [lever.readiness.data, lever.readiness.process, lever.readiness.technology];
  const hasRed = readinessScores.includes("red");
  const allGreen = readinessScores.every((s) => s === "green");
  const readinessScore = hasRed ? "red" : allGreen ? "green" : "amber";

  // Adjust ramp-up based on readiness
  const rampUpMultiplier = readinessScore === "green" ? 1 : readinessScore === "amber" ? 1.5 : 2;
  const rampUpMonths = Math.ceil(config.assumptions.rampUpMonths * rampUpMultiplier);

  // Calculate KPI impacts
  const kpiImpacts: KPIProjection[] = [];
  lever.impactedKPIs.forEach((impact) => {
    const projection = calculateKPIProjection(lever, impact.kpiId, 100, confidenceLevel);
    if (projection) {
      kpiImpacts.push(projection);
    }
  });

  // Calculate lane impacts
  const laneImpacts = lanes.map((lane) => calculateLaneImpact(lever, lane, confidenceLevel));

  // Calculate total savings
  const totalMonthlySavings = laneImpacts.reduce((sum, lane) => sum + lane.totalSavings, 0);
  const annualizedSavings = totalMonthlySavings * 12;

  // Determine implementation effort
  const implementationEffort =
    lever.maturityLevel === 1
      ? "low"
      : lever.maturityLevel <= 2
      ? "medium"
      : "high";

  return {
    leverId: lever.id,
    leverName: lever.name,
    readinessScore,
    implementationEffort,
    rampUpMonths,
    kpiImpacts,
    laneImpacts,
    totalMonthlySavings,
    annualizedSavings,
  };
}

/**
 * Aggregate KPI impacts across all levers
 */
function aggregateKPIImpacts(leverProjections: LeverImpactProjection[]): KPIProjection[] {
  const kpiMap = new Map<string, KPIProjection>();

  leverProjections.forEach((leverProj) => {
    leverProj.kpiImpacts.forEach((kpiImpact) => {
      if (kpiMap.has(kpiImpact.kpiId)) {
        const existing = kpiMap.get(kpiImpact.kpiId)!;
        // Compound the impacts (not additive)
        const compoundedDelta = existing.delta + kpiImpact.delta * (1 + existing.deltaPercentage / 100);
        kpiMap.set(kpiImpact.kpiId, {
          ...existing,
          delta: compoundedDelta,
          projectedValue: existing.currentValue + compoundedDelta,
          deltaPercentage: (compoundedDelta / existing.currentValue) * 100,
        });
      } else {
        kpiMap.set(kpiImpact.kpiId, { ...kpiImpact });
      }
    });
  });

  return Array.from(kpiMap.values());
}

/**
 * Generate timeline projection
 */
function generateTimeline(
  leverProjections: LeverImpactProjection[],
  timeHorizon: number,
  adoptionRate: number
): Array<{ month: number; cumulativeSavings: number; activeLeverCount: number }> {
  const timeline: Array<{ month: number; cumulativeSavings: number; activeLeverCount: number }> = [];

  for (let month = 1; month <= timeHorizon; month++) {
    let monthlySavings = 0;
    let activeLeverCount = 0;

    leverProjections.forEach((leverProj) => {
      const rampUpFactor = calculateRampUpFactor(month, leverProj.rampUpMonths);
      const adoptionFactor = adoptionRate / 100;

      if (rampUpFactor > 0.1) {
        // Consider lever "active" when ramp-up > 10%
        activeLeverCount++;
      }

      monthlySavings += leverProj.totalMonthlySavings * rampUpFactor * adoptionFactor;
    });

    const previousCumulative = month > 1 ? timeline[month - 2].cumulativeSavings : 0;
    timeline.push({
      month,
      cumulativeSavings: previousCumulative + monthlySavings,
      activeLeverCount,
    });
  }

  return timeline;
}

/**
 * Run simulation
 */
export function runSimulation(config: SimulationConfig): SimulationResult {
  const allLevers = leversData as ValueLever[];
  const selectedLevers = allLevers.filter((lever) => config.selectedLeverIds.includes(lever.id));

  // Calculate individual lever projections
  const leverProjections = selectedLevers.map((lever) => calculateLeverImpact(lever, config));

  // Aggregate KPI impacts
  const aggregatedKPIImpacts = aggregateKPIImpacts(leverProjections);

  // Calculate total savings
  const totalMonthlySavings = leverProjections.reduce(
    (sum, proj) => sum + proj.totalMonthlySavings * (config.assumptions.adoptionRate / 100),
    0
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  // Calculate ROI
  const implementationCost = selectedLevers.length * 2000000; // 20L per lever (mock)
  const paybackMonths = implementationCost / totalMonthlySavings;
  const threeYearSavings = totalAnnualSavings * 3;
  const threeYearROI = ((threeYearSavings - implementationCost) / implementationCost) * 100;

  // Generate timeline
  const timeline = generateTimeline(
    leverProjections,
    config.timeHorizon,
    config.assumptions.adoptionRate
  );

  return {
    config,
    leverProjections,
    aggregatedKPIImpacts,
    totalMonthlySavings,
    totalAnnualSavings,
    roi: {
      investmentRequired: implementationCost,
      paybackMonths,
      threeYearROI,
    },
    timeline,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Save simulation result to localStorage
 */
export function saveSimulationResult(result: SimulationResult): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("fretron_simulation_result", JSON.stringify(result));
}

/**
 * Load simulation result from localStorage
 */
export function loadSimulationResult(): SimulationResult | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("fretron_simulation_result");
  if (!saved) return null;

  try {
    return JSON.parse(saved) as SimulationResult;
  } catch (error) {
    console.error("Failed to parse simulation result:", error);
    return null;
  }
}

/**
 * Clear simulation result from localStorage
 */
export function clearSimulationResult(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("fretron_simulation_result");
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    // 1 crore
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // 1 lakh
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}
