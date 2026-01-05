"use client";

import { Search, Lightbulb, Rocket, TrendingUp, ChevronRight, CheckCircle } from "lucide-react";

export type JourneyStage = "discover" | "design" | "deploy" | "drive";

interface JourneyNavigationProps {
  currentStage: JourneyStage;
  onStageChange: (stage: JourneyStage) => void;
  completedStages?: JourneyStage[];
}

const stages = [
  {
    id: "discover" as JourneyStage,
    label: "Discover",
    icon: Search,
    description: "Assess maturity & identify opportunities",
    color: "#3B82F6",
  },
  {
    id: "design" as JourneyStage,
    label: "Design",
    icon: Lightbulb,
    description: "Select levers & simulate impact",
    color: "#10B981",
  },
  {
    id: "deploy" as JourneyStage,
    label: "Deploy",
    icon: Rocket,
    description: "Plan implementation & execute",
    color: "#F59E0B",
  },
  {
    id: "drive" as JourneyStage,
    label: "Drive",
    icon: TrendingUp,
    description: "Track results & optimize",
    color: "#7C3AED",
  },
];

export function JourneyNavigation({ currentStage, onStageChange, completedStages = [] }: JourneyNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Move-as-One Journey</h2>
          <p className="text-xs text-gray-600">Follow the 4-stage transformation process</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          const isCompleted = completedStages.includes(stage.id);
          const isAccessible = index === 0 || completedStages.includes(stages[index - 1].id);

          return (
            <div key={stage.id} className="flex items-center flex-1">
              <button
                onClick={() => isAccessible && onStageChange(stage.id)}
                disabled={!isAccessible}
                className={`
                  flex-1 relative p-4 rounded-lg border-2 transition-all
                  ${isActive
                    ? "border-fretron-blue bg-blue-50 shadow-md"
                    : isCompleted
                    ? "border-green-500 bg-green-50 hover:shadow-md"
                    : isAccessible
                    ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-fretron-blue text-white"
                        : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-bold text-sm ${
                          isActive ? "text-fretron-blue" : isCompleted ? "text-green-700" : "text-gray-700"
                        }`}
                      >
                        {index + 1}. {stage.label}
                      </h3>
                      {isActive && (
                        <span className="px-2 py-0.5 bg-fretron-blue text-white text-xs font-semibold rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{stage.description}</p>
                  </div>
                </div>
              </button>

              {/* Connector Arrow */}
              {index < stages.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
