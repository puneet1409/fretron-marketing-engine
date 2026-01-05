"use client";

import { LineChart, Line } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { KPI, KPIValue, ValueLever } from "@/types";

interface KPITooltipProps {
  kpi: KPI;
  kpiValue: KPIValue;
  activeLevers: ValueLever[];
  isVisible: boolean;
}

export function KPITooltip({ kpi, kpiValue, activeLevers, isVisible }: KPITooltipProps) {
  if (!isVisible) return null;

  // Calculate delta
  const delta = kpiValue.current - kpiValue.lastQuarter;
  const deltaPercent = ((delta / kpiValue.lastQuarter) * 100).toFixed(1);
  const isImprovement = kpi.reversePolarityForGood
    ? delta > 0
    : delta < 0;

  // Calculate target gap
  const targetGap = kpiValue.current - kpiValue.target;
  const targetGapAbs = Math.abs(targetGap);
  const isAboveTarget = targetGap > 0;

  // Get top contributor (mock data - in real app, would come from kpiValue)
  const topContributor = {
    name: "Jamshedpur-Mumbai lane",
    percentage: 28,
  };

  // Status color mapping
  const statusColors = {
    on_track: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    at_risk: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
    off_track: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  };

  const statusColor = statusColors[kpiValue.status];

  return (
    <div className="absolute z-[100] w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
      {/* Arrow pointing down */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45" />

      {/* Header: KPI ID & Name */}
      <div className="mb-3">
        <div className="text-xs font-semibold text-gray-500">{kpi.id}</div>
        <div className="text-sm font-bold text-gray-900">{kpi.name}</div>
      </div>

      {/* Value & Delta */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-gray-900">
            {kpiValue.current.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">{kpi.unit}</div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {isImprovement ? (
            <TrendingDown className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingUp className="w-4 h-4 text-red-600" />
          )}
          <span
            className={`text-sm font-medium ${
              isImprovement ? "text-green-600" : "text-red-600"
            }`}
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(2)} ({deltaPercent}%)
          </span>
          <span className="text-xs text-gray-500">vs LQ</span>
        </div>
      </div>

      {/* Mini Sparkline */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <div className="text-xs font-semibold text-gray-600 mb-2">6-Month Trend</div>
        <LineChart
          width={272}
          height={40}
          data={kpiValue.sparkline.map((value, index) => ({ value, index }))}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1E40AF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>

      {/* Top Contributor */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <div className="text-xs font-semibold text-gray-600 mb-1">Top Contributor</div>
        <div className="text-sm text-gray-900">
          {topContributor.name}{" "}
          <span className="text-gray-600">({topContributor.percentage}%)</span>
        </div>
      </div>

      {/* Active Levers */}
      {activeLevers.length > 0 && (
        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-600 mb-1">Active Levers</div>
          <div className="text-sm text-gray-900">
            {activeLevers.map((l) => l.id).join(", ")} ({activeLevers.length} total)
          </div>
        </div>
      )}

      {/* Status & Target Gap */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} flex items-center gap-1`}>
            <div className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
            {kpiValue.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </div>
        </div>
        <div className="text-xs text-gray-600">
          {targetGapAbs.toFixed(2)} {isAboveTarget ? "above" : "below"} target
        </div>
      </div>
    </div>
  );
}
