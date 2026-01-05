"use client";

import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { cn, formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { KPI, KPIValue } from "@/types";

interface HeadlineKPIsProps {
  kpis: KPI[];
  kpiValues: Map<string, KPIValue>;
  onKPIClick?: (kpiId: string) => void;
}

export function HeadlineKPIs({ kpis, kpiValues, onKPIClick }: HeadlineKPIsProps) {
  const formatValue = (kpi: KPI, value: number) => {
    if (kpi.unit === "₹") {
      return formatCurrency(value);
    } else if (kpi.unit === "%") {
      return formatPercent(value, 1);
    } else {
      return formatNumber(value, 1) + (kpi.unit !== "count" && kpi.unit !== "score" ? ` ${kpi.unit}` : "");
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Priority Metrics</h2>
            <p className="text-sm text-gray-600">Role-based headline KPIs</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Target className="w-4 h-4" />
            <span>Key Performance Indicators</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
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

            return (
              <button
                key={kpi.id}
                onClick={() => onKPIClick?.(kpi.id)}
                className={cn(
                  "relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 text-left",
                  "border-2 transition-all duration-300 group",
                  "hover:shadow-2xl hover:scale-105 hover:-translate-y-1",
                  kpiValue.status === "on_track" ? "border-green-200 hover:border-green-400" :
                  kpiValue.status === "at_risk" ? "border-amber-200 hover:border-amber-400" :
                  "border-red-200 hover:border-red-400"
                )}
              >
                {/* Status indicator dot */}
                <div className={cn(
                  "absolute top-4 right-4 w-3 h-3 rounded-full",
                  kpiValue.status === "on_track" ? "bg-green-500" :
                  kpiValue.status === "at_risk" ? "bg-amber-500" : "bg-red-500"
                )} />

                {/* KPI ID */}
                <div className="text-xs font-mono font-semibold text-gray-500 mb-2">{kpi.id}</div>

                {/* KPI Name */}
                <div className="font-semibold text-gray-900 text-sm mb-3 pr-6 line-clamp-2">
                  {kpi.name}
                </div>

                {/* Current Value - Large */}
                <div className="mb-3">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatValue(kpi, kpiValue.current)}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Target: {formatValue(kpi, kpiValue.target)}</span>
                  </div>
                </div>

                {/* Change indicator */}
                <div className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold",
                  isBetterChange ? "text-green-600" : "text-red-600"
                )}>
                  {isBetterChange ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(changePercent).toFixed(1)}% vs LQ</span>
                </div>

                {/* Hover overlay */}
                <div className={cn(
                  "absolute inset-0 rounded-xl pointer-events-none transition-opacity",
                  "opacity-0 group-hover:opacity-100",
                  kpiValue.status === "on_track" ? "bg-green-500/5" :
                  kpiValue.status === "at_risk" ? "bg-amber-500/5" : "bg-red-500/5"
                )} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
