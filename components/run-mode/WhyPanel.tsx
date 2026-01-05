"use client";

import { useState } from "react";
import { X, TrendingDown, TrendingUp, BarChart3, Network, List } from "lucide-react";
import { LeverChip } from "@/components/shared/LeverChip";
import { DriverWaterfall } from "@/components/shared/DriverWaterfall";
import { LeverKPINetwork } from "@/components/shared/LeverKPINetwork";
import { cn, formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { KPI, KPIValue, ValueLever, LeverActivation } from "@/types";

interface WhyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI | null;
  kpiValue: KPIValue | null;
  activeLevers: ValueLever[];
  activeLeverData: LeverActivation[];
  onViewReport?: () => void;
}

export function WhyPanel({
  isOpen,
  onClose,
  kpi,
  kpiValue,
  activeLevers,
  activeLeverData,
  onViewReport,
}: WhyPanelProps) {
  const [activeView, setActiveView] = useState<"summary" | "drivers" | "network">("summary");

  if (!isOpen || !kpi || !kpiValue) return null;

  const formatValue = (value: number) => {
    if (kpi.unit === "₹") {
      return formatCurrency(value);
    } else if (kpi.unit === "%") {
      return formatPercent(value, 1);
    } else {
      return formatNumber(value, 1) + (kpi.unit !== "count" && kpi.unit !== "score" ? ` ${kpi.unit}` : "");
    }
  };

  // Mock contribution data (in real app, this would come from analytics)
  const contributions = [
    { label: "Jamshedpur-Mumbai lane", value: kpiValue.current * 0.28, change: -5.2 },
    { label: "Vizag-Chennai lane", value: kpiValue.current * 0.18, change: -3.1 },
    { label: "Rourkela-Kolkata lane", value: kpiValue.current * 0.15, change: 2.4 },
    { label: "Jamshedpur-Delhi lane", value: kpiValue.current * 0.22, change: -1.8 },
    { label: "Other lanes", value: kpiValue.current * 0.17, change: 0.5 },
  ];

  // Build driver data for waterfall chart
  const drivers = activeLevers.map((lever) => {
    const leverData = activeLeverData.find(l => l.leverId === lever.id);
    const observedImpact = leverData?.observedImpact?.find(i => i.kpiId === kpi.id);
    const impactValue = observedImpact
      ? (observedImpact.actualChange / 100) * kpiValue.lastQuarter
      : 0;

    return {
      name: lever.id,
      value: impactValue,
      type: impactValue < 0 ? "positive" as const : "negative" as const,
    };
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-500">{kpi.id}</span>
              <span className={cn(
                "px-2 py-0.5 rounded text-xs font-medium",
                kpiValue.status === "on_track" ? "bg-green-100 text-green-700" :
                kpiValue.status === "at_risk" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              )}>
                {kpiValue.status === "on_track" ? "On Track" :
                 kpiValue.status === "at_risk" ? "At Risk" : "Off Track"}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">{kpi.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{kpi.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Tabs */}
        <div className="sticky top-[88px] bg-white border-b border-gray-200 px-6 z-10">
          <div className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveView("summary")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeView === "summary"
                  ? "border-fretron-blue text-fretron-blue"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
              Summary
            </button>
            <button
              onClick={() => setActiveView("drivers")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeView === "drivers"
                  ? "border-fretron-blue text-fretron-blue"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Driver Analysis
            </button>
            {activeLevers.length > 0 && (
              <button
                onClick={() => setActiveView("network")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeView === "network"
                    ? "border-fretron-blue text-fretron-blue"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Network className="w-4 h-4" />
                Network View
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeView === "summary" && (
            <>
          {/* Summary Section */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Current</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatValue(kpiValue.current)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Target</div>
                <div className="text-lg font-bold text-fretron-blue">
                  {formatValue(kpiValue.target)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Last Quarter</div>
                <div className="text-lg font-bold text-gray-600">
                  {formatValue(kpiValue.lastQuarter)}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                {kpiValue.current > kpiValue.target ? (
                  <>
                    <strong>Gap:</strong> {formatValue(Math.abs(kpiValue.current - kpiValue.target))} above target.
                    {activeLevers.length > 0 ? " Active levers are showing impact but more time needed." : " Consider activating optimization levers."}
                  </>
                ) : (
                  <>
                    <strong>Progress:</strong> {formatValue(Math.abs(kpiValue.current - kpiValue.target))} from target.
                    {activeLevers.length > 0 ? " Levers are working as expected!" : " On track to meet target."}
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Contribution Breakdown */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Contribution Breakdown
            </h3>
            <div className="space-y-2">
              {contributions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {formatValue(item.value)}
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    item.change < 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {item.change < 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {Math.abs(item.change).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Levers Section */}
          {activeLevers.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Active Levers ({activeLevers.length})
              </h3>
              <div className="space-y-3">
                {activeLevers.map((lever) => {
                  const leverData = activeLeverData.find(l => l.leverId === lever.id);
                  const impactedKPI = lever.impactedKPIs.find(k => k.kpiId === kpi.id);
                  const observedImpact = leverData?.observedImpact?.find(i => i.kpiId === kpi.id);

                  return (
                    <div
                      key={lever.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-fretron-blue transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <LeverChip leverId={lever.id} leverName={lever.name} />
                          <p className="text-xs text-gray-600 mt-2">{lever.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">Coverage</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {leverData?.coverage || 0}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">Expected</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {impactedKPI
                              ? `${impactedKPI.expectedImpactRange[0]} to ${impactedKPI.expectedImpactRange[1]}%`
                              : "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-0.5">Observed</div>
                          <div className={cn(
                            "text-sm font-semibold",
                            observedImpact && observedImpact.actualChange < 0
                              ? "text-green-600"
                              : "text-gray-900"
                          )}>
                            {observedImpact ? `${observedImpact.actualChange}%` : "Pending"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Suggested Levers */}
          {activeLevers.length === 0 && (
            <section>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Suggested Levers
              </h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 mb-3">
                  Based on your current performance, these levers could help close the gap:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LeverChip leverId="LU10" leverName="LTL→FTL Consolidation" />
                    <span className="text-xs text-blue-700">Est. -10–15% impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LeverChip leverId="TB01" leverName="Digital Spot Bidding" />
                    <span className="text-xs text-blue-700">Est. -5–8% impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LeverChip leverId="RS19" leverName="Route Optimization" />
                    <span className="text-xs text-blue-700">Est. -3–5% impact</span>
                  </div>
                </div>
                <button className="mt-3 w-full px-4 py-2 bg-fretron-blue text-white rounded-lg text-sm font-medium hover:bg-fretron-blue/90 transition-colors">
                  Evaluate Levers in Value Studio
                </button>
              </div>
            </section>
          )}

            </>
          )}

          {/* Driver Analysis View */}
          {activeView === "drivers" && (
            <div className="space-y-4">
              <DriverWaterfall
                baseline={kpiValue.lastQuarter}
                target={kpiValue.target}
                current={kpiValue.current}
                drivers={drivers}
                unit={kpi.unit === "₹" ? "₹" : kpi.unit === "%" ? "%" : ""}
              />

              {activeLevers.length === 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>No active levers.</strong> Switch to Post-Lever scenario or activate levers in Value Studio to see driver analysis.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Network View */}
          {activeView === "network" && activeLevers.length > 0 && (
            <div>
              <LeverKPINetwork
                levers={activeLevers}
                selectedKPIId={kpi.id}
              />
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <button
              onClick={onViewReport}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
