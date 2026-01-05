"use client";

import { useState, useEffect } from "react";
import { Database, Cog, Cpu, AlertTriangle, CheckCircle, PlayCircle, RotateCcw } from "lucide-react";
import { InteractiveReadinessAssessment } from "@/components/design-mode/InteractiveReadinessAssessment";
import {
  loadReadinessResult,
  getReadinessColor,
  getReadinessRecommendation,
  type ReadinessResult,
  type ReadinessDimension,
} from "@/lib/readiness-engine";

export function ReadinessSummary() {
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  // Load readiness result on mount
  useEffect(() => {
    const result = loadReadinessResult();
    setReadinessResult(result);
  }, []);

  const handleAssessmentComplete = () => {
    setShowAssessment(false);
    const result = loadReadinessResult();
    setReadinessResult(result);
  };

  const handleAssessmentCancel = () => {
    setShowAssessment(false);
  };

  // Show interactive assessment if user wants to run it
  if (showAssessment) {
    return (
      <InteractiveReadinessAssessment
        onComplete={handleAssessmentComplete}
        onCancel={handleAssessmentCancel}
      />
    );
  }

  // If no assessment has been run, show empty state
  if (!readinessResult) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Readiness Assessment Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Complete a 20-question assessment to determine your readiness to implement recommended value levers.
          </p>
          <button
            onClick={() => setShowAssessment(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <PlayCircle className="w-5 h-5" />
            Start Readiness Assessment
          </button>
        </div>
      </div>
    );
  }

  const dimensionIcons = {
    data: Database,
    process: Cog,
    technology: Cpu,
  };

  const dimensionNames = {
    data: "Data",
    process: "Process",
    technology: "Technology",
  };

  const recommendation = getReadinessRecommendation(readinessResult.overallReadiness);
  const overallColor = getReadinessColor(readinessResult.overallReadiness);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Readiness Assessment Results
          </h2>
          <p className="text-gray-600">
            Based on your 20-question assessment across 3 dimensions
          </p>
        </div>
        <button
          onClick={() => setShowAssessment(true)}
          className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Re-assess
        </button>
      </div>

      {/* Overall Status */}
      <div
        className="rounded-lg p-6 text-white"
        style={{ backgroundColor: overallColor }}
      >
        <div className="flex items-center gap-4 mb-3">
          {readinessResult.overallReadiness === "green" ? (
            <CheckCircle className="w-12 h-12" />
          ) : (
            <AlertTriangle className="w-12 h-12" />
          )}
          <div>
            <h3 className="text-2xl font-bold">{recommendation.title}</h3>
            <p className="text-sm opacity-90 mt-1">
              Overall Readiness: <span className="font-bold uppercase">{readinessResult.overallReadiness}</span>
            </p>
          </div>
        </div>
        <p className="text-white opacity-95">{recommendation.message}</p>
      </div>

      {/* Dimension Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {readinessResult.dimensionReadiness.map((dr) => {
          const Icon = dimensionIcons[dr.dimension];
          const color = getReadinessColor(dr.score);

          return (
            <div
              key={dr.dimension}
              className="bg-white rounded-lg border-2 p-6"
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{dimensionNames[dr.dimension]}</h4>
                  <div
                    className="px-2 py-0.5 rounded text-xs font-bold text-white uppercase inline-block mt-1"
                    style={{ backgroundColor: color }}
                  >
                    {dr.score}
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Green answers</span>
                  <span className="font-semibold text-green-700">
                    {dr.greenCount}/{dr.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Amber answers</span>
                  <span className="font-semibold text-amber-600">
                    {dr.amberCount}/{dr.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Red answers</span>
                  <span className="font-semibold text-red-600">
                    {dr.redCount}/{dr.totalQuestions}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Green Coverage</span>
                  <span>{dr.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${dr.percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended Next Steps
        </h3>
        <ul className="space-y-3">
          {recommendation.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <span className="text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ready for Simulation?</h3>
            <p className="text-green-100 text-sm">
              {readinessResult.overallReadiness === "green"
                ? "Great! You're ready to run impact simulations on your selected levers."
                : "Address readiness gaps first, then proceed to impact simulation."}
            </p>
          </div>
          <button
            disabled={readinessResult.overallReadiness === "red"}
            className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {readinessResult.overallReadiness === "green" ? "Run Simulation" : "Not Ready Yet"}
          </button>
        </div>
      </div>
    </div>
  );
}
