"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

interface DriverWaterfallProps {
  baseline: number;
  target: number;
  current: number;
  drivers: {
    name: string;
    value: number;
    type: "positive" | "negative";
  }[];
  unit?: string;
}

export function DriverWaterfall({ baseline, target, current, drivers, unit = "" }: DriverWaterfallProps) {
  // Build waterfall data
  let cumulativeValue = baseline;
  const waterfallData = [
    {
      name: "Baseline",
      value: baseline,
      cumulative: baseline,
      isBaseline: true,
      isTarget: false,
      isCurrent: false,
    },
  ];

  drivers.forEach((driver, idx) => {
    cumulativeValue += driver.value;
    waterfallData.push({
      name: driver.name,
      value: driver.value,
      cumulative: cumulativeValue,
      isBaseline: false,
      isTarget: false,
      isCurrent: false,
    });
  });

  waterfallData.push({
    name: "Current",
    value: current,
    cumulative: current,
    isBaseline: false,
    isTarget: false,
    isCurrent: true,
  });

  waterfallData.push({
    name: "Target",
    value: target,
    cumulative: target,
    isBaseline: false,
    isTarget: true,
    isCurrent: false,
  });

  const getBarColor = (entry: any) => {
    if (entry.isBaseline) return "#94A3B8"; // gray
    if (entry.isTarget) return "#F59E0B"; // amber
    if (entry.isCurrent) return "#1E40AF"; // blue
    return entry.value < 0 ? "#10B981" : "#EF4444"; // green for reduction, red for increase
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-900 text-sm mb-1">{data.name}</p>
          <div className="text-xs text-gray-600">
            {data.isBaseline || data.isTarget || data.isCurrent ? (
              <p>Value: <strong>{data.cumulative.toFixed(2)}{unit}</strong></p>
            ) : (
              <>
                <p>Impact: <strong className={data.value < 0 ? "text-green-600" : "text-red-600"}>
                  {data.value > 0 ? "+" : ""}{data.value.toFixed(2)}{unit}
                </strong></p>
                <p>Cumulative: <strong>{data.cumulative.toFixed(2)}{unit}</strong></p>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">Driver Analysis</h4>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Improvement</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Degradation</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={waterfallData} margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#6B7280", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={target} stroke="#F59E0B" strokeDasharray="5 5" label={{ value: "Target", fill: "#F59E0B", fontSize: 11 }} />
            <Bar dataKey="cumulative" radius={[4, 4, 0, 0]}>
              {waterfallData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Baseline</div>
          <div className="text-lg font-bold text-gray-900">{baseline.toFixed(2)}{unit}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="text-xs text-blue-600 mb-1">Current</div>
          <div className="text-lg font-bold text-blue-900">{current.toFixed(2)}{unit}</div>
          <div className="flex items-center gap-1 text-xs font-medium mt-1">
            {current < baseline ? (
              <>
                <TrendingDown className="w-3 h-3 text-green-600" />
                <span className="text-green-600">
                  {((Math.abs(current - baseline) / baseline) * 100).toFixed(1)}% improvement
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3 text-red-600" />
                <span className="text-red-600">
                  {((Math.abs(current - baseline) / baseline) * 100).toFixed(1)}% increase
                </span>
              </>
            )}
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <div className="text-xs text-amber-600 mb-1">Target</div>
          <div className="text-lg font-bold text-amber-900">{target.toFixed(2)}{unit}</div>
          <div className="text-xs text-gray-600 mt-1">
            Gap: <strong className={current > target ? "text-red-600" : "text-green-600"}>
              {Math.abs(current - target).toFixed(2)}{unit}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
