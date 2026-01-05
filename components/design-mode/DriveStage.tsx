"use client";

import { TrendingUp, TrendingDown, Activity, BarChart3, ArrowRight } from "lucide-react";

interface DriveStageProps {
  onGoToRunMode?: () => void;
}

export function DriveStage({ onGoToRunMode }: DriveStageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Drive Continuous Improvement
        </h2>
        <p className="text-gray-600">
          Track implementation results and optimize ongoing operations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Active Levers</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">5</div>
          <p className="text-xs text-gray-600 mt-1">Currently deployed</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Cost Reduction</span>
            <TrendingDown className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-700">-12.3%</div>
          <p className="text-xs text-gray-600 mt-1">vs. baseline</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">OTIF Improvement</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-700">+6.8 pt</div>
          <p className="text-xs text-gray-600 mt-1">Service gain</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">ROI Timeline</span>
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">5.2 mo</div>
          <p className="text-xs text-gray-600 mt-1">Payback period</p>
        </div>
      </div>

      {/* Active Lever Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Lever Performance Tracking
        </h3>

        <div className="space-y-3">
          {[
            {
              id: "LU10",
              name: "LTL→FTL Consolidation",
              status: "performing",
              actual: "-13.5%",
              target: "-10–15%",
              kpi: "PKMMT",
            },
            {
              id: "TB01",
              name: "Digital Spot Bidding",
              status: "performing",
              actual: "-7.2%",
              target: "-5–8%",
              kpi: "Spot Cost",
            },
            {
              id: "YG52",
              name: "Gate Scheduling",
              status: "underperforming",
              actual: "-28%",
              target: "-35–50%",
              kpi: "Detention",
            },
            {
              id: "RS19",
              name: "Route Optimization",
              status: "outperforming",
              actual: "-5.8%",
              target: "-3–5%",
              kpi: "PKMMT",
            },
            {
              id: "CT47",
              name: "Exception Alerting",
              status: "performing",
              actual: "+7.5 pt",
              target: "+5–10 pt",
              kpi: "OTIF",
            },
          ].map((lever) => (
            <div
              key={lever.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-mono rounded">
                      {lever.id}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-sm">{lever.name}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>Target: {lever.target}</span>
                    <span>•</span>
                    <span>KPI: {lever.kpi}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      lever.status === "outperforming"
                        ? "text-green-700"
                        : lever.status === "performing"
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {lever.actual}
                  </div>
                  <div className="text-xs text-gray-600">Actual</div>
                </div>
                {lever.status === "outperforming" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    Outperforming
                  </span>
                ) : lever.status === "performing" ? (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    On Track
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                    Needs Attention
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <div>
          <h3 className="text-lg font-semibold mb-1">View Full Command Center</h3>
          <p className="text-purple-100 text-sm">
            Track all KPIs in real-time with detailed drill-downs and analytics
          </p>
        </div>
        <button
          onClick={onGoToRunMode}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          Go to Run Mode
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
