"use client";

import { useState } from "react";
import { Sparkline } from "@/components/shared/Sparkline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LeverChip } from "@/components/shared/LeverChip";
import { KPITooltip } from "@/components/run-mode/KPITooltip";
import { ArrowUp, ArrowDown, Info, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { KPI, KPIValue, ValueLever } from "@/types";

interface KPITileProps {
  kpi: KPI;
  kpiValue: KPIValue;
  activeLevers: ValueLever[];
  onClick?: () => void;
  className?: string;
}

export function KPITile({ kpi, kpiValue, activeLevers, onClick, className }: KPITileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const change = kpiValue.current - kpiValue.lastQuarter;
  const changePercent = kpiValue.lastQuarter !== 0
    ? ((change / kpiValue.lastQuarter) * 100)
    : 0;

  const isPositiveChange = change > 0;
  const isBetterChange =
    (kpi.id.startsWith("S") || kpi.id.startsWith("CP") || kpi.id.startsWith("DA"))
      ? isPositiveChange
      : !isPositiveChange;

  const formatValue = (value: number) => {
    if (kpi.unit === "₹") {
      return formatCurrency(value);
    } else if (kpi.unit === "%" || kpi.unit === "per 100" || kpi.unit === "per 1000") {
      return formatPercent(value, 1);
    } else {
      return formatNumber(value, 1) + (kpi.unit !== "count" && kpi.unit !== "score" ? ` ${kpi.unit}` : "");
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative bg-white rounded-lg border-2 p-5 cursor-pointer group overflow-visible",
        "transition-all duration-300 ease-in-out",
        isHovered
          ? "shadow-xl border-fretron-blue scale-105 -translate-y-1 z-50"
          : "shadow-sm border-gray-200 hover:shadow-lg",
        className
      )}
    >
      {/* Rich Tooltip on Hover */}
      <KPITooltip
        kpi={kpi}
        kpiValue={kpiValue}
        activeLevers={activeLevers}
        isVisible={isHovered}
      />

      {/* Header: KPI ID and Status */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-500">{kpi.id}</span>
            <div className="relative">
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(!showTooltip);
                }}
              >
                <Info className="w-3.5 h-3.5" />
              </button>
              {showTooltip && kpi.formula && (
                <div className="absolute left-0 top-6 z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
                  <div className="font-semibold mb-1">Formula:</div>
                  <div className="text-gray-300">{kpi.formula}</div>
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {kpi.name}
          </h3>
        </div>
        <StatusBadge status={kpiValue.status} />
      </div>

      {/* Current Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatValue(kpiValue.current)}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>Target: {formatValue(kpiValue.target)}</span>
          <span className="text-gray-300">|</span>
          <div className={cn(
            "flex items-center gap-1",
            isBetterChange ? "text-green-600" : "text-red-600"
          )}>
            {isPositiveChange ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            <span>{Math.abs(changePercent).toFixed(1)}% vs LQ</span>
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 mb-4">
        <Sparkline
          data={kpiValue.sparkline}
          color={
            kpiValue.status === "on_track" ? "#10B981" :
            kpiValue.status === "at_risk" ? "#F59E0B" : "#EF4444"
          }
        />
      </div>

      {/* Active Levers */}
      {activeLevers.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs text-gray-500">Active Levers:</div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-green-600 animate-pulse" />
              <span className="text-xs font-semibold text-green-600">
                Impact Active
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeLevers.slice(0, 3).map((lever, idx) => (
              <div
                key={lever.id}
                className="animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <LeverChip
                  leverId={lever.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Open lever detail
                  }}
                  className="text-[10px] hover:scale-110 transition-transform"
                />
              </div>
            ))}
            {activeLevers.length > 3 && (
              <span className="text-xs text-gray-400 self-center">
                +{activeLevers.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Hover Indicator */}
      {isHovered && (
        <div className="absolute top-2 right-2 bg-fretron-blue text-white text-xs px-2 py-1 rounded-full animate-in fade-in slide-in-from-top-2">
          Click for details
        </div>
      )}

      {/* Status Glow Effect */}
      {isHovered && kpiValue.status === "off_track" && (
        <div className="absolute inset-0 rounded-lg bg-red-500/5 pointer-events-none" />
      )}
      {isHovered && kpiValue.status === "at_risk" && (
        <div className="absolute inset-0 rounded-lg bg-amber-500/5 pointer-events-none" />
      )}
    </div>
  );
}
