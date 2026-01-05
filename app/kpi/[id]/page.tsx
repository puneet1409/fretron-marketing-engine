"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Lightbulb } from "lucide-react";
import { TrendChart } from "@/components/kpi-detail/TrendChart";
import { ContributeDiluteTable } from "@/components/kpi-detail/ContributeDiluteTable";
import { LeverSnapshot } from "@/components/kpi-detail/LeverSnapshot";
import type { KPI, KPIValue, ValueLever, Scenario } from "@/types";

// Import data
import kpisData from "@/data/kpis.json";
import leversData from "@/data/levers.json";
import scenariosData from "@/data/mock-scenarios.json";

export default function KPIDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const kpiId = params.id as string;
  const scenarioId = searchParams.get("scenario") || "baseline";

  // Get KPI data
  const kpi = kpisData.find((k: KPI) => k.id === kpiId);

  // Get scenario data
  const scenario = scenariosData.find((s: Scenario) => s.id === scenarioId) || scenariosData[0];
  const baselineScenario = scenariosData.find((s: Scenario) => s.id === "baseline");

  // Get KPI value from scenario
  const kpiValue = scenario.kpiValues.find((kv: KPIValue) => kv.kpiId === kpiId);
  const baselineKpiValue = baselineScenario?.kpiValues.find((kv: KPIValue) => kv.kpiId === kpiId);

  // Get active levers for this KPI
  const activeLevers = kpiValue?.activeLeverIds
    ? leversData.filter((lever: ValueLever) =>
        kpiValue.activeLeverIds.includes(lever.id)
      )
    : [];

  // Get suggested levers (if KPI is off-track or at-risk)
  const suggestedLevers = kpiValue?.status !== "on_track"
    ? leversData
        .filter((lever: ValueLever) =>
          lever.expectedImpact?.some((impact) => impact.kpiId === kpiId)
        )
        .filter((lever: ValueLever) => !activeLevers.some((al) => al.id === lever.id))
        .slice(0, 3)
    : [];

  // Handle not found
  if (!kpi || !kpiValue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">KPI Not Found</h1>
          <p className="text-gray-600 mb-6">The KPI "{kpiId}" could not be found.</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-fretron-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Status color mapping
  const statusColors = {
    on_track: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    at_risk: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
    off_track: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  };
  const statusColor = statusColors[kpiValue.status];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {kpi.id}: {kpi.name}
                  </h1>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} flex items-center gap-1.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`} />
                    {kpiValue.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{kpi.description}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {kpiValue.current.toFixed(2)}
              </div>
              <div className="text-xs text-gray-600">{kpi.unit}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
        {/* Trend & Targets */}
        <TrendChart
          kpi={kpi}
          kpiValue={kpiValue}
          baselineHistory={baselineKpiValue?.sparkline.map((value, index) => ({
            month: ["M-5", "M-4", "M-3", "M-2", "M-1", "Current"][index],
            value
          }))}
        />

        {/* Contribute/Dilute Analysis */}
        <ContributeDiluteTable kpi={kpi} kpiValue={kpiValue} />

        {/* Active Levers Snapshot */}
        {activeLevers.length > 0 && (
          <LeverSnapshot
            activeLevers={activeLevers}
            activeLeverData={scenario.activeLevers}
            kpiId={kpiId}
          />
        )}

        {/* Suggested Levers */}
        {suggestedLevers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-gray-900">Suggested Levers</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Consider activating these levers to improve this KPI
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {suggestedLevers.map((lever: ValueLever) => {
                const impact = lever.expectedImpact?.find((i) => i.kpiId === kpiId);
                return (
                  <div
                    key={lever.id}
                    className="bg-white rounded-lg border border-blue-200 p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <div className="text-xs font-semibold text-gray-500">{lever.id}</div>
                          <div className="text-xs font-bold text-gray-900">{lever.name}</div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{lever.description}</div>
                      </div>
                      {impact && (
                        <div className="text-xs font-semibold text-blue-600 ml-3 whitespace-nowrap">
                          {impact.min}–{impact.max}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Actions</h3>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 text-sm bg-fretron-blue text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                View Records
              </button>
              <button
                onClick={() => router.push("/?mode=design")}
                className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Explore Levers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
