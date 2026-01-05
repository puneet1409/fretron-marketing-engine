"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cn, formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { KPI, KPIValue } from "@/types";

interface OpsViewProps {
  kpis: KPI[];
  kpiValues: Map<string, KPIValue>;
  onKPIClick?: (kpiId: string) => void;
}

export function OpsView({ kpis, kpiValues, onKPIClick }: OpsViewProps) {
  const formatValue = (kpi: KPI, value: number) => {
    if (kpi.unit === "₹") {
      return formatCurrency(value);
    } else if (kpi.unit === "%") {
      return formatPercent(value, 1);
    } else {
      return formatNumber(value, 1) + (kpi.unit !== "count" && kpi.unit !== "score" ? ` ${kpi.unit}` : "");
    }
  };

  const kpisWithValues = kpis.filter((kpi) => kpiValues.has(kpi.id));

  if (kpisWithValues.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No KPIs available in this section
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-700 w-12">ID</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">KPI Name</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Current</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Target</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Δ vs LQ</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Levers</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {kpisWithValues.map((kpi) => {
            const kpiValue = kpiValues.get(kpi.id);
            if (!kpiValue) return null;

            const change = kpiValue.current - kpiValue.lastQuarter;
            const changePercent = kpiValue.lastQuarter !== 0
              ? ((change / kpiValue.lastQuarter) * 100)
              : 0;

            const isPositiveChange = change > 0;
            const isBetterChange =
              (kpi.id.startsWith("S") || kpi.id.startsWith("CP") || kpi.id.startsWith("DA"))
                ? isPositiveChange
                : !isPositiveChange;

            const leverCount = kpiValue.activeLeverIds?.length || 0;

            return (
              <tr
                key={kpi.id}
                onClick={() => onKPIClick?.(kpi.id)}
                className={cn(
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group",
                  kpiValue.status === "off_track" && "bg-red-50/30",
                  kpiValue.status === "at_risk" && "bg-amber-50/30"
                )}
              >
                {/* KPI ID */}
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-semibold text-gray-600">
                    {kpi.id}
                  </span>
                </td>

                {/* KPI Name */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{kpi.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 capitalize">{kpi.pillar}</div>
                </td>

                {/* Current Value */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold text-gray-900">
                    {formatValue(kpi, kpiValue.current)}
                  </span>
                </td>

                {/* Target */}
                <td className="px-4 py-3 text-right">
                  <span className="text-gray-600">
                    {formatValue(kpi, kpiValue.target)}
                  </span>
                </td>

                {/* Change vs Last Quarter */}
                <td className="px-4 py-3 text-right">
                  <div className={cn(
                    "inline-flex items-center gap-1 font-medium",
                    isBetterChange ? "text-green-600" : "text-red-600"
                  )}>
                    {isBetterChange ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{Math.abs(changePercent).toFixed(1)}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3 text-center">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    kpiValue.status === "on_track" ? "bg-green-100 text-green-700" :
                    kpiValue.status === "at_risk" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {kpiValue.status === "on_track" ? "On Track" :
                     kpiValue.status === "at_risk" ? "At Risk" : "Off Track"}
                  </span>
                </td>

                {/* Active Levers Count */}
                <td className="px-4 py-3 text-center">
                  {leverCount > 0 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {leverCount}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>

                {/* View Arrow */}
                <td className="px-4 py-3 text-center">
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-fretron-blue transition-colors" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
