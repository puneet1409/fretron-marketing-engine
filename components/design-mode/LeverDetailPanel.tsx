"use client";

import { X, TrendingDown, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { LeverChip } from "@/components/shared/LeverChip";
import { getThemeLabel, getReadinessColor } from "@/lib/utils";
import type { ValueLever } from "@/types";
import kpisData from "@/data/kpis.json";

interface LeverDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lever: ValueLever | null;
}

export function LeverDetailPanel({ isOpen, onClose, lever }: LeverDetailPanelProps) {
  if (!isOpen || !lever) return null;

  const impactedKPIDetails = lever.impactedKPIs.map((impact) => {
    const kpi = kpisData.find((k) => k.id === impact.kpiId);
    return { ...impact, kpi };
  });

  const getReadinessStatus = (readiness: "green" | "amber" | "red") => {
    switch (readiness) {
      case "green":
        return { icon: CheckCircle2, text: "Ready", color: "text-green-600" };
      case "amber":
        return { icon: Clock, text: "Needs Setup", color: "text-amber-600" };
      case "red":
        return { icon: AlertCircle, text: "Not Ready", color: "text-red-600" };
    }
  };

  const dataStatus = getReadinessStatus(lever.readiness.data);
  const processStatus = getReadinessStatus(lever.readiness.process);
  const techStatus = getReadinessStatus(lever.readiness.technology);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-fretron-blue to-fretron-lightblue text-white">
          <div>
            <LeverChip leverId={lever.id} className="mb-2 bg-white/20 text-white border-white/40" />
            <h2 className="text-xl font-bold">{lever.name}</h2>
            <p className="text-sm text-blue-100 mt-1">{getThemeLabel(lever.theme)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{lever.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-xs font-semibold text-blue-900">
                  Maturity Level {lever.maturityLevel}
                </span>
              </div>
              {lever.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200"
                >
                  <span className="text-xs font-medium text-gray-700 capitalize">{pillar}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Industry Fit:</span>
              {lever.industries.map((industry) => (
                <span
                  key={industry}
                  className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700 uppercase"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* KPI Impact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected KPI Impact</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">KPI</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">Expected Impact</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {impactedKPIDetails.map((impact) => (
                    <tr key={impact.kpiId} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-semibold text-gray-900">
                          {impact.kpiId}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{impact.kpi?.name || "Unknown KPI"}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-green-700">
                          {impact.expectedImpactRange[0]} to {impact.expectedImpactRange[1]}
                          {impact.unit === "%" ? "%" : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <TrendingDown className="w-4 h-4 text-green-600 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Readiness Assessment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Readiness Assessment</h3>
            <div className="space-y-3">
              {/* Data Readiness */}
              <div className="p-4 rounded-lg border-2" style={{ borderColor: getReadinessColor(lever.readiness.data) }}>
                <div className="flex items-start gap-3 mb-3">
                  <dataStatus.icon className={`w-5 h-5 ${dataStatus.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">Data Readiness</span>
                      <span className={`text-sm font-medium ${dataStatus.color}`}>
                        {dataStatus.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {lever.readiness.data === "green" &&
                        "Data infrastructure in place. Ready to capture and analyze metrics."}
                      {lever.readiness.data === "amber" &&
                        "Partial data availability. Some manual collection may be required."}
                      {lever.readiness.data === "red" &&
                        "Significant data gaps. Investment in telemetry infrastructure needed."}
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: lever.readiness.data === "green" ? "100%" : lever.readiness.data === "amber" ? "50%" : "20%",
                      backgroundColor: getReadinessColor(lever.readiness.data),
                    }}
                  />
                </div>
              </div>

              {/* Process Readiness */}
              <div className="p-4 rounded-lg border-2" style={{ borderColor: getReadinessColor(lever.readiness.process) }}>
                <div className="flex items-start gap-3 mb-3">
                  <processStatus.icon className={`w-5 h-5 ${processStatus.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">Process Readiness</span>
                      <span className={`text-sm font-medium ${processStatus.color}`}>
                        {processStatus.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {lever.readiness.process === "green" &&
                        "Standard operating procedures defined and adopted."}
                      {lever.readiness.process === "amber" &&
                        "Process definition in progress. Change management needed."}
                      {lever.readiness.process === "red" &&
                        "No formal process exists. Requires process design and training."}
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: lever.readiness.process === "green" ? "100%" : lever.readiness.process === "amber" ? "50%" : "20%",
                      backgroundColor: getReadinessColor(lever.readiness.process),
                    }}
                  />
                </div>
              </div>

              {/* Technology Readiness */}
              <div className="p-4 rounded-lg border-2" style={{ borderColor: getReadinessColor(lever.readiness.technology) }}>
                <div className="flex items-start gap-3 mb-3">
                  <techStatus.icon className={`w-5 h-5 ${techStatus.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">Technology Readiness</span>
                      <span className={`text-sm font-medium ${techStatus.color}`}>
                        {techStatus.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {lever.readiness.technology === "green" &&
                        "Required TMS features available and configured."}
                      {lever.readiness.technology === "amber" &&
                        "Core features available, but configuration needed."}
                      {lever.readiness.technology === "red" &&
                        "Requires new modules or integrations."}
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: lever.readiness.technology === "green" ? "100%" : lever.readiness.technology === "amber" ? "50%" : "20%",
                      backgroundColor: getReadinessColor(lever.readiness.technology),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ROI & Benchmarks */}
          {(lever.typicalROI || lever.benchmarkSource) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ROI & Benchmarks</h3>
              <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                {lever.typicalROI && (
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-blue-900">Typical ROI: </span>
                    <span className="text-sm text-blue-800">{lever.typicalROI}</span>
                  </div>
                )}
                {lever.benchmarkSource && (
                  <div>
                    <span className="text-sm font-semibold text-blue-900">Source: </span>
                    <span className="text-sm text-blue-800">{lever.benchmarkSource}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Simulation Snapshot */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Simulation Snapshot</h3>
            <div className="p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
              <p className="text-sm text-gray-600 mb-3">
                Run this lever on your actual shipment data to see lane-by-lane impact projections
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-fretron-blue">8-15%</div>
                  <div className="text-xs text-gray-600 mt-1">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">90 days</div>
                  <div className="text-xs text-gray-600 mt-1">Typical Ramp-up</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">High</div>
                  <div className="text-xs text-gray-600 mt-1">Confidence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-fretron-blue bg-white border border-fretron-blue rounded-lg hover:bg-blue-50 flex items-center gap-2">
              Add to Roadmap
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-2 text-sm font-semibold text-white bg-fretron-blue rounded-lg hover:bg-fretron-blue/90 flex items-center gap-2">
              Activate Lever
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
