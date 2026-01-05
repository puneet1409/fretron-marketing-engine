import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function getKPIStatusColor(status: string): string {
  switch (status) {
    case "on_track":
      return "text-green-600 bg-green-50 border-green-200";
    case "at_risk":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "off_track":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function getKPIStatusLabel(status: string): string {
  switch (status) {
    case "on_track":
      return "On Track";
    case "at_risk":
      return "At Risk";
    case "off_track":
      return "Off Track";
    default:
      return "Unknown";
  }
}

export function getPillarColor(pillar: string): string {
  switch (pillar) {
    case "cost":
      return "bg-blue-500";
    case "service":
      return "bg-green-500";
    case "efficiency":
      return "bg-purple-500";
    case "compliance":
      return "bg-amber-500";
    case "volume":
      return "bg-indigo-500";
    case "esg":
      return "bg-emerald-500";
    case "digital":
      return "bg-cyan-500";
    default:
      return "bg-gray-500";
  }
}

export function getPillarLabel(pillar: string): string {
  switch (pillar) {
    case "cost":
      return "Cost & Productivity";
    case "service":
      return "Service & Experience";
    case "efficiency":
      return "Efficiency & Throughput";
    case "compliance":
      return "Risk & Compliance";
    case "volume":
      return "Volume & Placement";
    case "esg":
      return "ESG & Sustainability";
    case "digital":
      return "Digital Adoption";
    default:
      return pillar;
  }
}

export function getThemeLabel(theme: string): string {
  const labels: Record<string, string> = {
    buying_rate: "Buying & Rate",
    load_cube: "Load & Cube",
    routing_scheduling: "Routing & Scheduling",
    network_footprint: "Network & Footprint",
    capacity_vendor: "Capacity & Vendor",
    visibility_control_tower: "Visibility & Control Tower",
    yard_plant: "Yard & Plant",
    docs_billing: "Docs, Billing & Cashflow",
    risk_compliance: "Risk, Safety & Compliance",
    sustainability: "Sustainability",
    order_customer: "Order & Customer Collaboration",
  };
  return labels[theme] || theme;
}

export function getReadinessColor(level: string): string {
  switch (level) {
    case "green":
      return "bg-green-500";
    case "amber":
      return "bg-amber-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
