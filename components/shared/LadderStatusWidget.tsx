"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp, Target } from "lucide-react";
import { getCurrentLevel, getNextLevel, isLevelInProgress, pillarInfo, type Pillar } from "@/lib/ladder-utils";

export function LadderStatusWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pillars: Pillar[] = ["cost", "service", "efficiency", "compliance"];

  // Mock active levers
  const activeLevers: string[] = [];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-fretron-blue" />
          <span className="text-sm font-semibold text-gray-900">Move-as-One Progress</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-3 space-y-2">
          {pillars.map((pillar) => {
            const currentLevel = getCurrentLevel(pillar, activeLevers);
            const nextLevel = getNextLevel(currentLevel);
            const inProgress = nextLevel && isLevelInProgress(pillar, nextLevel);
            const info = pillarInfo[pillar];

            return (
              <div
                key={pillar}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{info.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{info.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="px-2 py-0.5 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: info.color }}
                  >
                    L{currentLevel}
                  </div>
                  {inProgress && nextLevel && (
                    <>
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <div className="px-2 py-0.5 rounded border-2 border-dashed text-xs font-bold text-blue-600 border-blue-600">
                        L{nextLevel}
                      </div>
                      <span className="text-xs text-blue-600 font-medium">in progress</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compact View */}
      {!isExpanded && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {pillars.map((pillar, index) => {
              const currentLevel = getCurrentLevel(pillar, activeLevers);
              const info = pillarInfo[pillar];

              return (
                <div key={pillar} className="flex items-center gap-1">
                  {index > 0 && <span className="text-gray-300">•</span>}
                  <span>{info.icon}</span>
                  <span className="font-semibold" style={{ color: info.color }}>
                    L{currentLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
