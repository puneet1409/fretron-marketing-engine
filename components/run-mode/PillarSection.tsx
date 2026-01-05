"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { KPITile } from "./KPITile";
import { OpsView } from "./OpsView";
import type { KPI, KPIValue, ValueLever } from "@/types";
import type { ViewDensity } from "@/components/shared/ViewDensityToggle";

interface PillarSectionProps {
  pillar: {
    id: string;
    label: string;
    description?: string;
    color: string;
  };
  kpis: KPI[];
  kpiValues: Map<string, KPIValue>;
  getActiveLeversForKPI: (kpiId: string) => ValueLever[];
  onKPIClick: (kpiId: string) => void;
  defaultExpanded?: boolean;
  viewDensity?: ViewDensity;
}

export function PillarSection({
  pillar,
  kpis,
  kpiValues,
  getActiveLeversForKPI,
  onKPIClick,
  defaultExpanded = true,
  viewDensity = "board",
}: PillarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (kpis.length === 0) return null;

  const kpisWithValues = kpis.filter((kpi) => kpiValues.has(kpi.id));

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-1 h-12 rounded-full"
            style={{ backgroundColor: pillar.color }}
          />
          <div className="text-left">
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-fretron-blue transition-colors">
              {pillar.label}
            </h2>
            {pillar.description && (
              <p className="text-sm text-gray-600 mt-0.5">{pillar.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {kpisWithValues.length} {kpisWithValues.length === 1 ? "KPI" : "KPIs"}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-fretron-blue transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-fretron-blue transition-colors" />
          )}
        </div>
      </button>

      {/* KPI Grid or Table */}
      {isExpanded && (
        <div className={viewDensity === "board" ? "px-6 py-6 bg-gray-50" : "bg-white"}>
          {viewDensity === "board" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {kpisWithValues.map((kpi) => {
                const kpiValue = kpiValues.get(kpi.id);
                if (!kpiValue) return null;

                const activeLevers = getActiveLeversForKPI(kpi.id);

                return (
                  <KPITile
                    key={kpi.id}
                    kpi={kpi}
                    kpiValue={kpiValue}
                    activeLevers={activeLevers}
                    onClick={() => onKPIClick(kpi.id)}
                  />
                );
              })}
            </div>
          ) : (
            <OpsView
              kpis={kpisWithValues}
              kpiValues={kpiValues}
              onKPIClick={onKPIClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
