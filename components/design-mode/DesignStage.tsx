"use client";

import { useState } from "react";
import { Sliders, Zap } from "lucide-react";
import { ReadinessSummary } from "@/components/design-mode/ReadinessSummary";
import { SimulationEngine } from "@/components/design-mode/SimulationEngine";
import type { ValueLever } from "@/types";

interface DesignStageProps {
  onLeverSelect?: (lever: ValueLever) => void;
}

type DesignView = "readiness" | "simulation";

export function DesignStage({ onLeverSelect }: DesignStageProps) {
  const [view, setView] = useState<DesignView>("readiness");

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex gap-2 border-b border-gray-200 px-6">
          <button
            onClick={() => setView("readiness")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              view === "readiness"
                ? "border-green-500 text-green-700"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sliders className="w-4 h-4" />
            Readiness Assessment
          </button>
          <button
            onClick={() => setView("simulation")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              view === "simulation"
                ? "border-purple-500 text-purple-700"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Zap className="w-4 h-4" />
            Impact Simulation
          </button>
        </div>

        <div className="p-6">
          {/* Content */}
          {view === "readiness" ? <ReadinessSummary /> : <SimulationEngine />}
        </div>
      </div>
    </div>
  );
}

function ReadinessAssessmentPlaceholder() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sliders className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Readiness Assessment
        </h3>
        <p className="text-gray-600 mb-6">
          Answer 20 questions about your data, processes, and technology to determine which recommended levers you're ready to implement.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>What you'll assess:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>• Data Readiness: Do you have the required data quality and availability?</li>
            <li>• Process Readiness: Are your workflows standardized and documented?</li>
            <li>• Technology Readiness: Do you have the necessary systems and integrations?</li>
          </ul>
        </div>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
          Start Readiness Assessment
        </button>
      </div>
    </div>
  );
}

function SimulationPlaceholder() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Impact Simulation Engine
        </h3>
        <p className="text-gray-600 mb-6">
          Run data-backed simulations on your actual shipment data to see projected impact of selected levers across lanes, plants, and vendors.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Simulation outputs:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
            <li>• Lane-by-lane cost reduction projections</li>
            <li>• Service level improvements (OTIF, transit time)</li>
            <li>• ROI timeline and payback period</li>
            <li>• Implementation effort and resource requirements</li>
          </ul>
        </div>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
          Configure Simulation
        </button>
      </div>
    </div>
  );
}
