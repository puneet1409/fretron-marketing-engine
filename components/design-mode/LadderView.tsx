"use client";

import { useState } from "react";
import { ArrowUp, CheckCircle2, Target } from "lucide-react";
import { LeverChip } from "@/components/shared/LeverChip";
import { buildLadders, getCurrentLevel, getNextLevel, isLevelInProgress, pillarInfo, type Pillar, type MaturityLevel } from "@/lib/ladder-utils";
import type { ValueLever } from "@/types";
import leversData from "@/data/levers.json";

interface LadderViewProps {
  onLeverSelect?: (lever: ValueLever) => void;
}

export function LadderView({ onLeverSelect }: LadderViewProps) {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const allLevers = leversData as ValueLever[];
  const ladders = buildLadders(allLevers);

  // Get active levers (mock for now)
  const activeLevers: string[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Move-as-One Lever Ladders
        </h2>
        <p className="text-gray-600">
          Progressive maturity framework across 4 outcome pillars · Climb from foundational to strategic optimization
        </p>
      </div>

      {/* Pillar Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedPillar(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedPillar === null
              ? "bg-fretron-blue text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Pillars
        </button>
        {ladders.map((ladder) => (
          <button
            key={ladder.pillar}
            onClick={() => setSelectedPillar(ladder.pillar)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPillar === ladder.pillar
                ? "text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor: selectedPillar === ladder.pillar ? ladder.color : undefined,
            }}
          >
            {pillarInfo[ladder.pillar].icon} {ladder.name}
          </button>
        ))}
      </div>

      {/* Ladder Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {ladders
          .filter((ladder) => selectedPillar === null || ladder.pillar === selectedPillar)
          .map((ladder) => {
            const currentLevel = getCurrentLevel(ladder.pillar, activeLevers);
            const nextLevel = getNextLevel(currentLevel);

            return (
              <div key={ladder.pillar} className="bg-white rounded-lg border-2 p-6" style={{ borderColor: ladder.color }}>
                {/* Pillar Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{pillarInfo[ladder.pillar].icon}</span>
                    <h3 className="text-lg font-bold" style={{ color: ladder.color }}>
                      {ladder.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100">
                      <Target className="w-3.5 h-3.5 text-gray-600" />
                      <span className="font-semibold text-gray-700">Level {currentLevel}</span>
                    </div>
                    {nextLevel && isLevelInProgress(ladder.pillar, nextLevel) && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">L{nextLevel} in progress</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ladder Levels */}
                <div className="space-y-4">
                  {ladder.levels.reverse().map((level) => {
                    const isCurrent = level.level === currentLevel;
                    const isNext = level.level === nextLevel;
                    const isPast = level.level < currentLevel;
                    const inProgress = isNext && isLevelInProgress(ladder.pillar, level.level);

                    return (
                      <div
                        key={level.level}
                        className={`relative rounded-lg border-2 p-4 transition-all ${
                          isCurrent
                            ? "border-green-500 bg-green-50"
                            : isNext
                            ? inProgress
                              ? "border-blue-500 border-dashed bg-blue-50"
                              : "border-gray-300 border-dashed bg-white"
                            : isPast
                            ? "border-gray-200 bg-gray-50 opacity-60"
                            : "border-gray-200 bg-white opacity-40"
                        }`}
                      >
                        {/* Level Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className="px-2 py-0.5 rounded text-xs font-bold text-white"
                                style={{ backgroundColor: ladder.color }}
                              >
                                L{level.level}
                              </div>
                              {isCurrent && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                              {inProgress && (
                                <div className="flex items-center gap-1 text-blue-600">
                                  <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
                                  <span className="text-xs font-medium">Next</span>
                                </div>
                              )}
                            </div>
                            <div className="text-sm font-bold text-gray-900">{level.label}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{level.description}</div>
                          </div>
                        </div>

                        {/* Levers */}
                        {level.levers.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="text-xs font-semibold text-gray-500 mb-2">
                              {level.levers.length} lever{level.levers.length !== 1 ? "s" : ""}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {level.levers.slice(0, 4).map((lever) => (
                                <LeverChip
                                  key={lever.id}
                                  leverId={lever.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onLeverSelect?.(lever);
                                  }}
                                  className="text-xs hover:scale-110 transition-transform cursor-pointer"
                                />
                              ))}
                              {level.levers.length > 4 && (
                                <span className="text-xs text-gray-500 self-center">
                                  +{level.levers.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Connection Lines */}
                <div className="mt-4 flex items-center justify-center">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ladder.color }}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-green-500 bg-green-50" />
            <span className="text-gray-700">Current Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-blue-500 border-dashed bg-blue-50" />
            <span className="text-gray-700">Next Level (In Progress)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-300 border-dashed bg-white" />
            <span className="text-gray-700">Next Level (Not Started)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border-2 border-gray-200 bg-gray-50 opacity-60" />
            <span className="text-gray-700">Completed Level</span>
          </div>
        </div>
      </div>
    </div>
  );
}
