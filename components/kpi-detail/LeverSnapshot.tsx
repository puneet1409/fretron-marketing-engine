"use client";

import { TrendingDown, TrendingUp, CheckCircle2, Clock, Play } from "lucide-react";
import type { ValueLever, ActiveLever } from "@/types";

interface LeverSnapshotProps {
  activeLevers: ValueLever[];
  activeLeverData: ActiveLever[];
  kpiId: string;
}

export function LeverSnapshot({ activeLevers, activeLeverData, kpiId }: LeverSnapshotProps) {
  if (activeLevers.length === 0) {
    return null;
  }

  const statusConfig = {
    planned: {
      icon: Clock,
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      label: "Planned",
    },
    in_progress: {
      icon: Play,
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      label: "In Progress",
    },
    live: {
      icon: CheckCircle2,
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      label: "Live",
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900">Active Levers</h3>
        <p className="text-xs text-gray-600 mt-0.5">
          {activeLevers.length} lever{activeLevers.length !== 1 ? "s" : ""} currently impacting this KPI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeLevers.map((lever) => {
          const leverData = activeLeverData.find((l) => l.leverId === lever.id);
          const status = leverData?.status || "planned";
          const StatusIcon = statusConfig[status].icon;

          // Find observed impact for this KPI
          const observedImpact = leverData?.observedImpact?.find((i) => i.kpiId === kpiId);
          const hasObservedChange = observedImpact && observedImpact.actualChange !== 0;

          // Get expected impact range for this KPI
          const expectedImpact = lever.expectedImpact.find((i) => i.kpiId === kpiId);

          return (
            <div
              key={lever.id}
              className={`rounded-lg border p-3 ${statusConfig[status].border} ${statusConfig[status].bg}`}
            >
              {/* Lever Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-500">{lever.id}</div>
                  <div className="text-xs font-bold text-gray-900 mt-0.5">{lever.name}</div>
                </div>
                <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[status].text} ml-2`} />
              </div>

              {/* Compact Stats */}
              <div className="space-y-2 text-xs">
                {/* Coverage */}
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-gray-600">Coverage</span>
                    <span className="font-semibold text-gray-900">{leverData?.coverage || 0}%</span>
                  </div>
                  <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-fretron-blue rounded-full"
                      style={{ width: `${leverData?.coverage || 0}%` }}
                    />
                  </div>
                </div>

                {/* Impact */}
                {expectedImpact && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Impact</span>
                    <span className="font-semibold text-gray-900">
                      {expectedImpact.min}–{expectedImpact.max}%
                    </span>
                  </div>
                )}

                {/* Observed */}
                {hasObservedChange && observedImpact && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Observed</span>
                    <div className={`flex items-center gap-0.5 ${
                      observedImpact.actualChange < 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {observedImpact.actualChange < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                      <span className="font-semibold">{Math.abs(observedImpact.actualChange).toFixed(1)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
