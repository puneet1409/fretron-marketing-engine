"use client";

import { useState } from "react";
import { Target, Zap, ArrowRight } from "lucide-react";
import { LeverChip } from "./LeverChip";
import type { ValueLever } from "@/types";

interface LeverKPINetworkProps {
  levers: ValueLever[];
  selectedKPIId?: string;
  onLeverClick?: (lever: ValueLever) => void;
  onKPIClick?: (kpiId: string) => void;
}

export function LeverKPINetwork({ levers, selectedKPIId, onLeverClick, onKPIClick }: LeverKPINetworkProps) {
  const [hoveredLever, setHoveredLever] = useState<string | null>(null);
  const [hoveredKPI, setHoveredKPI] = useState<string | null>(null);

  // Extract all unique KPIs impacted by these levers
  const kpiMap = new Map<string, { count: number; avgImpact: number }>();
  levers.forEach((lever) => {
    lever.impactedKPIs.forEach((impact) => {
      const existing = kpiMap.get(impact.kpiId);
      const avgImpact = (impact.expectedImpactRange[0] + impact.expectedImpactRange[1]) / 2;
      if (existing) {
        existing.count += 1;
        existing.avgImpact = (existing.avgImpact + Math.abs(avgImpact)) / 2;
      } else {
        kpiMap.set(impact.kpiId, { count: 1, avgImpact: Math.abs(avgImpact) });
      }
    });
  });

  const kpis = Array.from(kpiMap.entries()).map(([kpiId, data]) => ({
    id: kpiId,
    leverCount: data.count,
    avgImpact: data.avgImpact,
  }));

  const isLeverHighlighted = (lever: ValueLever) => {
    if (!hoveredKPI && !selectedKPIId) return true;
    const targetKPI = hoveredKPI || selectedKPIId;
    return lever.impactedKPIs.some((k) => k.kpiId === targetKPI);
  };

  const isKPIHighlighted = (kpiId: string) => {
    if (!hoveredLever) return true;
    const lever = levers.find((l) => l.id === hoveredLever);
    return lever?.impactedKPIs.some((k) => k.kpiId === kpiId) || false;
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Lever-KPI Impact Network</h4>
        <p className="text-xs text-gray-600">
          Hover over levers or KPIs to see relationships. Line thickness = impact magnitude.
        </p>
      </div>

      {/* SVG Network Visualization */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 overflow-hidden">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side - Levers */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-fretron-blue" />
              <h5 className="text-xs font-semibold text-gray-700 uppercase">Value Levers ({levers.length})</h5>
            </div>
            {levers.map((lever, idx) => {
              const highlighted = isLeverHighlighted(lever);
              const totalImpact = lever.impactedKPIs.reduce((sum, k) => {
                return sum + Math.abs((k.expectedImpactRange[0] + k.expectedImpactRange[1]) / 2);
              }, 0);

              return (
                <div
                  key={lever.id}
                  className={`group relative transition-all duration-200 ${
                    highlighted ? "opacity-100" : "opacity-30"
                  }`}
                  onMouseEnter={() => setHoveredLever(lever.id)}
                  onMouseLeave={() => setHoveredLever(null)}
                >
                  <button
                    onClick={() => onLeverClick?.(lever)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      hoveredLever === lever.id
                        ? "border-fretron-blue bg-blue-50 shadow-md scale-105"
                        : "border-gray-200 bg-white hover:border-fretron-blue/50 hover:bg-gray-50"
                    }`}
                  >
                    <LeverChip leverId={lever.id} className="mb-1.5" />
                    <div className="text-xs font-medium text-gray-900 line-clamp-1">{lever.name}</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{lever.impactedKPIs.length} KPIs</span>
                      <span className="text-xs font-semibold text-green-600">
                        ~{totalImpact.toFixed(0)}% impact
                      </span>
                    </div>
                  </button>

                  {/* Connection Lines (rendered when hovered) */}
                  {hoveredLever === lever.id && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none">
                      {lever.impactedKPIs.map((impact, i) => (
                        <ArrowRight
                          key={impact.kpiId}
                          className="w-4 h-4 text-fretron-blue animate-pulse"
                          style={{
                            position: "absolute",
                            left: `${(i + 1) * 20}px`,
                            top: 0,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side - KPIs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-green-600" />
              <h5 className="text-xs font-semibold text-gray-700 uppercase">Impacted KPIs ({kpis.length})</h5>
            </div>
            {kpis.map((kpi, idx) => {
              const highlighted = isKPIHighlighted(kpi.id);
              const isSelected = selectedKPIId === kpi.id;

              return (
                <div
                  key={kpi.id}
                  className={`transition-all duration-200 ${highlighted ? "opacity-100" : "opacity-30"}`}
                  onMouseEnter={() => setHoveredKPI(kpi.id)}
                  onMouseLeave={() => setHoveredKPI(null)}
                >
                  <button
                    onClick={() => onKPIClick?.(kpi.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-green-600 bg-green-50 shadow-md"
                        : hoveredKPI === kpi.id
                        ? "border-green-500 bg-green-50 shadow-md scale-105"
                        : "border-gray-200 bg-white hover:border-green-500/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-gray-900">{kpi.id}</span>
                      {isSelected && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{kpi.leverCount} lever{kpi.leverCount !== 1 ? "s" : ""}</span>
                      <span className="text-xs font-semibold text-green-600">
                        ~{kpi.avgImpact.toFixed(1)}% avg
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#1E40AF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-fretron-blue bg-blue-50"></div>
          <span>Lever (hover to see connections)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border-2 border-green-600 bg-green-50"></div>
          <span>KPI (impacted metric)</span>
        </div>
      </div>
    </div>
  );
}
