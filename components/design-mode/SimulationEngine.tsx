"use client";

import { useState, useEffect } from "react";
import { Play, TrendingUp, DollarSign, Clock, BarChart3, Target, ChevronRight } from "lucide-react";
import {
  runSimulation,
  saveSimulationResult,
  loadSimulationResult,
  formatCurrency,
  type SimulationConfig,
  type SimulationResult,
} from "@/lib/simulation-engine";
import { loadDiagnosticResult } from "@/lib/diagnostic-engine";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import leversData from "@/data/levers.json";
import type { ValueLever } from "@/types";

export function SimulationEngine() {
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  // Load simulation result on mount
  useEffect(() => {
    const result = loadSimulationResult();
    setSimulationResult(result);
  }, []);

  const handleRunSimulation = (config: SimulationConfig) => {
    const result = runSimulation(config);
    saveSimulationResult(result);
    setSimulationResult(result);
    setShowConfig(false);
  };

  // Show configuration if no simulation has been run
  if (!simulationResult || showConfig) {
    return (
      <SimulationConfigurator
        onRun={handleRunSimulation}
        onCancel={() => setShowConfig(false)}
        hasExisting={simulationResult !== null}
      />
    );
  }

  return <SimulationResults result={simulationResult} onReconfigure={() => setShowConfig(true)} />;
}

interface SimulationConfiguratorProps {
  onRun: (config: SimulationConfig) => void;
  onCancel: () => void;
  hasExisting: boolean;
}

function SimulationConfigurator({ onRun, onCancel, hasExisting }: SimulationConfiguratorProps) {
  const diagnosticResult = loadDiagnosticResult();
  const recommendedLevers = diagnosticResult?.recommendedLevers || [];

  const [selectedLeverIds, setSelectedLeverIds] = useState<string[]>(
    recommendedLevers.slice(0, 5).map((l) => l.id)
  );
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [adoptionRate, setAdoptionRate] = useState(80);
  const [rampUpMonths, setRampUpMonths] = useState(3);
  const [confidenceLevel, setConfidenceLevel] = useState<"conservative" | "moderate" | "aggressive">("moderate");

  const toggleLever = (leverId: string) => {
    if (selectedLeverIds.includes(leverId)) {
      setSelectedLeverIds(selectedLeverIds.filter((id) => id !== leverId));
    } else {
      setSelectedLeverIds([...selectedLeverIds, leverId]);
    }
  };

  const handleRun = () => {
    const config: SimulationConfig = {
      selectedLeverIds,
      timeHorizon,
      assumptions: {
        adoptionRate,
        rampUpMonths,
        confidenceLevel,
      },
    };
    onRun(config);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Configure Simulation</h3>
        <p className="text-gray-600">
          Select levers and set assumptions to project impact on your operations
        </p>
      </div>

      {/* Lever Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Select Levers to Simulate</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {recommendedLevers.map((lever) => {
            const isSelected = selectedLeverIds.includes(lever.id);
            return (
              <button
                key={lever.id}
                onClick={() => toggleLever(lever.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center ${
                      isSelected ? "border-purple-500 bg-purple-500" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <ChevronRight className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{lever.name}</div>
                    <div className="text-xs text-gray-600">Maturity L{lever.maturityLevel}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {selectedLeverIds.length} lever{selectedLeverIds.length !== 1 ? "s" : ""} selected
        </div>
      </div>

      {/* Assumptions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Simulation Assumptions</h4>
        <div className="space-y-4">
          {/* Time Horizon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Horizon: {timeHorizon} months
            </label>
            <input
              type="range"
              min="6"
              max="36"
              step="6"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 months</span>
              <span>36 months</span>
            </div>
          </div>

          {/* Adoption Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adoption Rate: {adoptionRate}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={adoptionRate}
              onChange={(e) => setAdoptionRate(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Ramp-up Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ramp-up Period: {rampUpMonths} months
            </label>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={rampUpMonths}
              onChange={(e) => setRampUpMonths(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>

          {/* Confidence Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Level</label>
            <div className="grid grid-cols-3 gap-2">
              {(["conservative", "moderate", "aggressive"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setConfidenceLevel(level)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    confidenceLevel === level
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {hasExisting && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleRun}
          disabled={selectedLeverIds.length === 0}
          className="ml-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          Run Simulation
        </button>
      </div>
    </div>
  );
}

interface SimulationResultsProps {
  result: SimulationResult;
  onReconfigure: () => void;
}

function SimulationResults({ result, onReconfigure }: SimulationResultsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Simulation Results</h3>
          <p className="text-gray-600">
            {result.config.selectedLeverIds.length} lever{result.config.selectedLeverIds.length !== 1 ? "s" : ""} •{" "}
            {result.config.timeHorizon} month projection
          </p>
        </div>
        <button
          onClick={onReconfigure}
          className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          Reconfigure
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-600">Monthly Savings</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {formatCurrency(result.totalMonthlySavings)}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-600">Annual Savings</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {formatCurrency(result.totalAnnualSavings)}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-600">Payback Period</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {result.roi.paybackMonths.toFixed(1)} mo
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-gray-600">3-Year ROI</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {result.roi.threeYearROI.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Cumulative Savings Timeline</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
              <YAxis
                label={{ value: "Cumulative Savings (₹)", angle: -90, position: "insideLeft" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeSavings"
                stroke="#7C3AED"
                strokeWidth={3}
                name="Cumulative Savings"
                dot={{ fill: "#7C3AED", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lever Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Lever Impact Breakdown</h4>
        <div className="space-y-3">
          {result.leverProjections.map((leverProj) => (
            <div key={leverProj.leverId} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{leverProj.leverName}</h5>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-600">Ramp-up: {leverProj.rampUpMonths} months</span>
                    <span className="text-xs text-gray-600 capitalize">
                      Effort: {leverProj.implementationEffort}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-700">
                    {formatCurrency(leverProj.totalMonthlySavings)}/mo
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatCurrency(leverProj.annualizedSavings)}/yr
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
