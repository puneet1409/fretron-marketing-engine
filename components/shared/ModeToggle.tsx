"use client";

import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "run" | "design";
  onChange: (mode: "run" | "design") => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
      <button
        onClick={() => onChange("run")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-all",
          mode === "run"
            ? "bg-white text-fretron-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        Run Mode
      </button>
      <button
        onClick={() => onChange("design")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-all",
          mode === "design"
            ? "bg-white text-fretron-blue shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        Value Studio
      </button>
    </div>
  );
}
