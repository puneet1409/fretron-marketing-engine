"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";
import type { KPI, KPIValue } from "@/types";

interface TrendChartProps {
  kpi: KPI;
  kpiValue: KPIValue;
  baselineHistory?: Array<{ month: string; value: number }>;
}

export function TrendChart({ kpi, kpiValue, baselineHistory }: TrendChartProps) {
  const [showScenario, setShowScenario] = useState(false);

  // Month labels for the last 6 months
  const monthLabels = ["M-5", "M-4", "M-3", "M-2", "M-1", "Current"];

  // Combine current sparkline with baseline if available
  const chartData = kpiValue.sparkline.map((value, index) => {
    const baseline = baselineHistory?.[index];
    return {
      month: monthLabels[index],
      actual: value,
      baseline: baseline?.value,
      targetLow: kpiValue.target * 0.95, // 5% band around target
      targetHigh: kpiValue.target * 1.05,
    };
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Trend & Targets</h3>
          <p className="text-xs text-gray-600 mt-0.5">6-month trend with target band</p>
        </div>

        {baselineHistory && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showScenario}
              onChange={(e) => setShowScenario(e.target.checked)}
              className="w-4 h-4 text-fretron-blue border-gray-300 rounded focus:ring-fretron-blue"
            />
            <span className="text-xs text-gray-700">Show Baseline</span>
          </label>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#D1D5DB" }}
          />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#D1D5DB" }}
            label={{ value: kpi.unit, angle: -90, position: "insideLeft", style: { fill: "#6B7280" } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "12px",
            }}
            labelStyle={{ color: "#111827", fontWeight: 600, marginBottom: "8px" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />

          {/* Target Band */}
          <Area
            type="monotone"
            dataKey="targetHigh"
            fill="#10B981"
            fillOpacity={0.1}
            stroke="none"
            name="Target Band"
          />
          <Area
            type="monotone"
            dataKey="targetLow"
            fill="#10B981"
            fillOpacity={0.1}
            stroke="none"
          />

          {/* Target Line */}
          <ReferenceLine
            y={kpiValue.target}
            stroke="#10B981"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ value: "Target", fill: "#10B981", fontSize: 12, position: "right" }}
          />

          {/* Baseline (if enabled) */}
          {showScenario && baselineHistory && (
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
              name="Baseline"
            />
          )}

          {/* Actual */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#1E40AF"
            strokeWidth={3}
            dot={{ fill: "#1E40AF", r: 4 }}
            activeDot={{ r: 6 }}
            name="Actual"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        <div className="bg-gray-50 rounded p-2">
          <div className="text-xs text-gray-600">Current</div>
          <div className="text-sm font-bold text-gray-900 mt-0.5">
            {kpiValue.current.toFixed(2)} {kpi.unit}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="text-xs text-gray-600">Target</div>
          <div className="text-sm font-bold text-green-600 mt-0.5">
            {kpiValue.target.toFixed(2)} {kpi.unit}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="text-xs text-gray-600">Last Quarter</div>
          <div className="text-sm font-bold text-gray-900 mt-0.5">
            {kpiValue.lastQuarter.toFixed(2)} {kpi.unit}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <div className="text-xs text-gray-600">Change vs LQ</div>
          <div className={`text-sm font-bold mt-0.5 ${
            (kpi.reversePolarityForGood
              ? kpiValue.current > kpiValue.lastQuarter
              : kpiValue.current < kpiValue.lastQuarter)
              ? "text-green-600"
              : "text-red-600"
          }`}>
            {((kpiValue.current - kpiValue.lastQuarter) / kpiValue.lastQuarter * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
