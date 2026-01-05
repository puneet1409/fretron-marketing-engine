"use client";

import { LayoutGrid, List } from "lucide-react";

export type ViewDensity = "board" | "ops";

interface ViewDensityToggleProps {
  density: ViewDensity;
  onChange: (density: ViewDensity) => void;
}

export function ViewDensityToggle({ density, onChange }: ViewDensityToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange("board")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          density === "board"
            ? "bg-white text-fretron-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        title="Board View - Large tiles with detailed information"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Board</span>
      </button>
      <button
        onClick={() => onChange("ops")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          density === "ops"
            ? "bg-white text-fretron-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        title="Ops View - Compact table with more KPIs visible"
      >
        <List className="w-4 h-4" />
        <span>Ops</span>
      </button>
    </div>
  );
}

/**
 * Persist view density to localStorage
 */
export function saveViewDensity(density: ViewDensity): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("fretron_view_density", density);
  }
}

/**
 * Load view density from localStorage
 */
export function loadViewDensity(): ViewDensity {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("fretron_view_density");
    if (saved === "board" || saved === "ops") {
      return saved;
    }
  }
  return "board"; // Default to board view
}
