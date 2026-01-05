"use client";

import { useState, useEffect } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertCircle, CheckCircle2, PlayCircle, RotateCcw, Zap, Target } from "lucide-react";
import { LeverChip } from "@/components/shared/LeverChip";
import { InteractiveDiagnostic } from "@/components/design-mode/InteractiveDiagnostic";
import { loadDiagnosticResult, type DiagnosticResult, type DiagnosticMode } from "@/lib/diagnostic-engine";
import type { Pillar, ValueLever } from "@/types";

interface DiagnosticSummaryProps {
  onLeverSelect?: (lever: ValueLever) => void;
}

export function DiagnosticSummary({ onLeverSelect }: DiagnosticSummaryProps) {
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [selectedMode, setSelectedMode] = useState<DiagnosticMode>("light");

  // Load diagnostic result on mount
  useEffect(() => {
    const result = loadDiagnosticResult();
    setDiagnosticResult(result);
  }, []);

  const handleDiagnosticComplete = () => {
    setShowDiagnostic(false);
    const result = loadDiagnosticResult();
    setDiagnosticResult(result);
  };

  const handleDiagnosticCancel = () => {
    setShowDiagnostic(false);
  };

  // Show interactive diagnostic if user wants to run it
  if (showDiagnostic) {
    return (
      <InteractiveDiagnostic
        mode={selectedMode}
        onComplete={handleDiagnosticComplete}
        onCancel={handleDiagnosticCancel}
      />
    );
  }

  // If no diagnostic has been run, show empty state
  if (!diagnosticResult) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-10 h-10 text-fretron-blue" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Start Your Dispatch Value Audit
          </h3>
          <p className="text-gray-600 mb-6">
            Choose your assessment type to discover opportunities for freight cost savings and OTIF improvements.
          </p>

          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-4 mb-6 max-w-xl mx-auto">
            <button
              onClick={() => setSelectedMode("light")}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                selectedMode === "light"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className={`w-5 h-5 ${selectedMode === "light" ? "text-green-600" : "text-gray-600"}`} />
                <h4 className={`font-bold ${selectedMode === "light" ? "text-green-900" : "text-gray-900"}`}>
                  Light Diagnostic
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">~10 questions • 30-45 minutes</p>
              <p className="text-xs text-gray-500">Perfect for initial discovery calls. Quick outcome assessment across cost, service, detention & compliance.</p>
            </button>

            <button
              onClick={() => setSelectedMode("comprehensive")}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                selectedMode === "comprehensive"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-5 h-5 ${selectedMode === "comprehensive" ? "text-blue-600" : "text-gray-600"}`} />
                <h4 className={`font-bold ${selectedMode === "comprehensive" ? "text-blue-900" : "text-gray-900"}`}>
                  Comprehensive Diagnostic
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">44 questions • 60-90 minutes</p>
              <p className="text-xs text-gray-500">Deep-dive assessment for detailed maturity profiling and precise lever recommendations.</p>
            </button>
          </div>

          <button
            onClick={() => setShowDiagnostic(true)}
            className="px-6 py-3 bg-fretron-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <PlayCircle className="w-5 h-5" />
            Start {selectedMode === "light" ? "Light" : "Comprehensive"} Assessment
          </button>
        </div>
      </div>
    );
  }

  // Map pillar colors
  const pillarColors: Record<Pillar, string> = {
    cost: "#1E40AF",
    service: "#10B981",
    efficiency: "#7C3AED",
    compliance: "#F59E0B",
  };

  const pillarNames: Record<Pillar, string> = {
    cost: "Cost",
    service: "Service",
    efficiency: "Efficiency",
    compliance: "Risk",
  };

  // Build diagnostic data from result
  const diagnosticData = diagnosticResult.pillarScores.map((ps) => ({
    pillar: pillarNames[ps.pillar],
    score: ps.score,
    maxScore: 100,
    level: ps.maturityLevel,
    color: pillarColors[ps.pillar],
  }));

  const radarData = diagnosticData.map(d => ({
    subject: d.pillar,
    value: d.score,
    fullMark: 100,
  }));

  const recommendedLevers = diagnosticResult.recommendedLevers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Value Lever Diagnostic Summary
          </h2>
          <p className="text-gray-600">
            Based on your 44-question assessment across 4 pillars
          </p>
        </div>
        <button
          onClick={() => setShowDiagnostic(true)}
          className="px-4 py-2 border border-fretron-blue text-fretron-blue rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Re-run Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Maturity Radar
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                <Radar
                  name="Your Score"
                  dataKey="value"
                  stroke="#1E40AF"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Level 1 (0-33%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-gray-600">Level 2 (34-66%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Level 3 (67-100%)</span>
            </div>
          </div>
        </div>

        {/* Pillar Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pillar Breakdown
          </h3>
          <div className="space-y-4">
            {diagnosticData.map((item) => (
              <div key={item.pillar} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{item.pillar}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.level === 3 ? "bg-green-100 text-green-700" :
                      item.level === 2 ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      Level {item.level}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {item.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {item.level === 1 && "Foundational - High opportunity for improvement"}
                  {item.level === 2 && "Emerging - Moderate optimization potential"}
                  {item.level === 3 && "Advanced - Fine-tuning opportunities"}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm mb-1">
                  Overall Assessment
                </h4>
                <p className="text-sm text-blue-800">
                  You scored <strong>{diagnosticResult.overallScore}% overall</strong>.
                  Priority areas: <strong>{diagnosticResult.pillarScores
                    .filter(ps => ps.maturityLevel <= 2)
                    .map(ps => pillarNames[ps.pillar])
                    .join(" & ")}</strong>.
                  Expected savings potential: <strong>8-15% freight cost reduction</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Levers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recommended Priority Levers (Top {Math.min(recommendedLevers.length, 7)})
          </h3>
          <button className="text-sm font-medium text-fretron-blue hover:underline">
            View All Levers →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedLevers.slice(0, 6).map((lever, idx) => {
            const firstImpact = lever.expectedImpact?.[0];
            const impactText = firstImpact ? `${firstImpact.deltaMin}–${firstImpact.deltaMax}% ${firstImpact.kpiId}` : "High impact";

            return (
              <div
                key={lever.id}
                onClick={() => onLeverSelect?.(lever)}
                className="border border-gray-200 rounded-lg p-4 hover:border-fretron-blue hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-fretron-blue text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    <LeverChip leverId={lever.id} className="text-xs" />
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{lever.name}</h4>
                <p className="text-xs text-gray-600 mb-2">
                  Maturity Level {lever.maturityLevel} • {lever.pillars.map(p => pillarNames[p as Pillar]).join(" & ")}
                </p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">{impactText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-fretron-blue to-fretron-lightblue rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready for Data-backed Simulation?</h3>
            <p className="text-blue-100">
              Run these levers on your actual shipment data to see lane-by-lane impact and ROI projections
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-fretron-blue rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Request Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
