import type { ValueLever } from "@/types";

export type Pillar = "cost" | "service" | "efficiency" | "compliance";
export type MaturityLevel = 1 | 2 | 3 | 4;

export interface LadderLevel {
  level: MaturityLevel;
  label: string;
  description: string;
  levers: ValueLever[];
}

export interface PillarLadder {
  pillar: Pillar;
  name: string;
  color: string;
  levels: LadderLevel[];
}

// Ladder level labels and descriptions per pillar
const ladderLabels: Record<Pillar, Record<MaturityLevel, { label: string; description: string }>> = {
  cost: {
    1: { label: "Foundational Cost Visibility", description: "Basic grip on rates, lanes, and performance" },
    2: { label: "Core Dispatch Optimization", description: "Consolidation and rate discipline" },
    3: { label: "Advanced Network Orchestration", description: "Lane portfolios and network optimization" },
    4: { label: "Strategic Cost Governance", description: "Scenarios, benchmarking, digital twin" },
  },
  service: {
    1: { label: "Foundational Service Visibility", description: "Track & trace, proof of delivery" },
    2: { label: "Operational Service Control", description: "Placement, exceptions, control tower" },
    3: { label: "Proactive Service Management", description: "Predictions, playbooks, risk scoring" },
    4: { label: "Experience-Oriented Design", description: "Network design for differentiated service" },
  },
  efficiency: {
    1: { label: "Basic Efficiency Tracking", description: "Utilization and throughput visibility" },
    2: { label: "Workflow Automation", description: "Digital processes and auto-planning" },
    3: { label: "AI & Predictive Optimization", description: "Predictive ETA, smart routing" },
    4: { label: "Network-Level Efficiency", description: "Hub-spoke, cross-dock, mode shift" },
  },
  compliance: {
    1: { label: "Regulatory Hygiene", description: "Document compliance and basic checks" },
    2: { label: "Automated Risk Controls", description: "System-driven blocks and flags" },
    3: { label: "Integrated Risk Analytics", description: "Claims analytics, audit engine" },
    4: { label: "Strategic Risk Management", description: "Predictive compliance and governance" },
  },
};

// Pillar display info
export const pillarInfo: Record<Pillar, { name: string; color: string; icon: string }> = {
  cost: { name: "Cost & Productivity", color: "#1E40AF", icon: "💰" },
  service: { name: "Service & Experience", color: "#10B981", icon: "⭐" },
  efficiency: { name: "Efficiency & Throughput", color: "#7C3AED", icon: "⚡" },
  compliance: { name: "Risk & Compliance", color: "#F59E0B", icon: "🛡️" },
};

/**
 * Group levers by pillar and maturity level to create ladder structure
 */
export function buildLadders(allLevers: ValueLever[]): PillarLadder[] {
  const pillars: Pillar[] = ["cost", "service", "efficiency", "compliance"];

  return pillars.map((pillar) => {
    // Get all levers for this pillar
    const pillarLevers = allLevers.filter((lever) => lever.pillars.includes(pillar));

    // Group by maturity level
    const levels: LadderLevel[] = [1, 2, 3, 4].map((level) => {
      const levelLevers = pillarLevers.filter((lever) => lever.maturityLevel === level);
      const labelInfo = ladderLabels[pillar][level as MaturityLevel];

      return {
        level: level as MaturityLevel,
        label: labelInfo?.label || `Level ${level}`,
        description: labelInfo?.description || "",
        levers: levelLevers,
      };
    });

    return {
      pillar,
      name: pillarInfo[pillar].name,
      color: pillarInfo[pillar].color,
      levels,
    };
  });
}

/**
 * Get current maturity level for a pillar based on activated levers
 * (For demo purposes, returns mock levels; in production would analyze active levers)
 */
export function getCurrentLevel(pillar: Pillar, activeLevers: string[]): MaturityLevel {
  // Mock implementation - would calculate based on active levers in production
  const mockLevels: Record<Pillar, MaturityLevel> = {
    cost: 1,
    service: 1,
    efficiency: 1,
    compliance: 1,
  };

  return mockLevels[pillar];
}

/**
 * Get next recommended level for a pillar
 */
export function getNextLevel(currentLevel: MaturityLevel): MaturityLevel | null {
  if (currentLevel >= 4) return null;
  return (currentLevel + 1) as MaturityLevel;
}

/**
 * Check if a pillar is "in progress" towards next level
 * (Mock implementation - would check deployment status in production)
 */
export function isLevelInProgress(pillar: Pillar, level: MaturityLevel): boolean {
  // Mock: Cost is moving from L1 to L2
  return pillar === "cost" && level === 2;
}
