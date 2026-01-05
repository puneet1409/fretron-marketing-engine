/**
 * Role-based view configuration for Move-as-One Command Center
 * Each role sees different priority KPIs in the Headline row
 */

export type UserRole = "cfo" | "supply_chain" | "plant_head" | "procurement" | "custom";

export interface RoleConfig {
  id: UserRole;
  label: string;
  description: string;
  headlineKPIs: string[]; // KPI IDs that appear in headline row (max 4)
  primaryPillars: string[]; // Pillars that are expanded by default
}

export const roleConfigs: Record<UserRole, RoleConfig> = {
  cfo: {
    id: "cfo",
    label: "CFO / Finance",
    description: "Financial performance and cost optimization focus",
    headlineKPIs: ["C02", "C03", "C05", "S04"], // PKMMT, Freight%, Cost/Shipment, OTIF
    primaryPillars: ["cost", "service"],
  },
  supply_chain: {
    id: "supply_chain",
    label: "Head of Supply Chain",
    description: "End-to-end logistics performance and service levels",
    headlineKPIs: ["C02", "S04", "V03", "E06"], // PKMMT, OTIF, Dispatch Volume, Detention
    primaryPillars: ["cost", "service", "efficiency"],
  },
  plant_head: {
    id: "plant_head",
    label: "Plant / Dispatch Head",
    description: "Plant operations, dispatch efficiency, and volume tracking",
    headlineKPIs: ["V03", "E05", "E06", "S01"], // Dispatch Volume, Weight Util, Detention, OTD
    primaryPillars: ["volume", "efficiency", "service"],
  },
  procurement: {
    id: "procurement",
    label: "CPO / Procurement",
    description: "Vendor management, cost control, and contract compliance",
    headlineKPIs: ["C02", "C05", "CP01", "S04"], // PKMMT, Cost/Shipment, EWB Compliance, OTIF
    primaryPillars: ["cost", "compliance"],
  },
  custom: {
    id: "custom",
    label: "Custom View",
    description: "User-selected KPIs and configuration",
    headlineKPIs: ["C02", "S04", "E04", "CP01"], // Default custom selection
    primaryPillars: ["cost", "service", "efficiency", "compliance"],
  },
};

export const defaultRole: UserRole = "supply_chain";

/**
 * Get role configuration by ID
 */
export function getRoleConfig(roleId: UserRole): RoleConfig {
  return roleConfigs[roleId] || roleConfigs[defaultRole];
}

/**
 * Get all available roles
 */
export function getAllRoles(): RoleConfig[] {
  return Object.values(roleConfigs);
}

/**
 * Persist role selection to localStorage
 */
export function saveSelectedRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("fretron_selected_role", role);
  }
}

/**
 * Load role selection from localStorage
 */
export function loadSelectedRole(): UserRole {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("fretron_selected_role");
    if (saved && saved in roleConfigs) {
      return saved as UserRole;
    }
  }
  return defaultRole;
}
