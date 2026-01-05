"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { KPI, KPIValue } from "@/types";

interface ContributionItem {
  name: string;
  value: number;
  change: number;
  isContributor: boolean;
}

interface ContributeDiluteTableProps {
  kpi: KPI;
  kpiValue: KPIValue;
}

type Dimension = "lanes" | "plants" | "vendors";

export function ContributeDiluteTable({ kpi, kpiValue }: ContributeDiluteTableProps) {
  // Mock data - in real app, would come from API
  const contributionData: Record<Dimension, ContributionItem[]> = {
    lanes: [
      { name: "Jamshedpur-Mumbai", value: kpiValue.current * 0.28, change: -5.2, isContributor: true },
      { name: "Vizag-Chennai", value: kpiValue.current * 0.18, change: -3.1, isContributor: true },
      { name: "Rourkela-Kolkata", value: kpiValue.current * 0.15, change: 2.4, isContributor: false },
      { name: "Jamshedpur-Delhi", value: kpiValue.current * 0.12, change: -1.8, isContributor: true },
      { name: "Bokaro-Hyderabad", value: kpiValue.current * 0.10, change: 3.7, isContributor: false },
    ],
    plants: [
      { name: "Jamshedpur", value: kpiValue.current * 0.42, change: -4.5, isContributor: true },
      { name: "Vizag", value: kpiValue.current * 0.28, change: -2.1, isContributor: true },
      { name: "Rourkela", value: kpiValue.current * 0.18, change: 2.8, isContributor: false },
      { name: "Bokaro", value: kpiValue.current * 0.12, change: 1.2, isContributor: false },
    ],
    vendors: [
      { name: "Agarwal Logistics", value: kpiValue.current * 0.35, change: -6.2, isContributor: true },
      { name: "VRL Group", value: kpiValue.current * 0.22, change: -2.8, isContributor: true },
      { name: "Gati KWE", value: kpiValue.current * 0.18, change: 1.5, isContributor: false },
      { name: "BlueDart Surface", value: kpiValue.current * 0.12, change: -1.2, isContributor: true },
      { name: "TCI Freight", value: kpiValue.current * 0.08, change: 3.4, isContributor: false },
    ],
  };

  const renderCompactBar = (item: ContributionItem, maxValue: number) => {
    const percentage = (Math.abs(item.value) / maxValue) * 100;
    const isImprovement = kpi.reversePolarityForGood ? item.change > 0 : item.change < 0;

    return (
      <div key={item.name} className="mb-2 last:mb-0">
        <div className="flex items-center justify-between text-xs mb-0.5">
          <div className="font-medium text-gray-900 truncate flex-1">{item.name}</div>
          <div className={`flex items-center gap-0.5 ml-2 ${isImprovement ? "text-green-600" : "text-red-600"}`}>
            {isImprovement ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
            <span className="font-medium">{Math.abs(item.change).toFixed(1)}%</span>
          </div>
        </div>
        <div className="relative h-4 bg-gray-100 rounded overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full rounded ${
              item.isContributor ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderDimensionColumn = (dimension: Dimension, title: string) => {
    const data = contributionData[dimension];
    const contributors = data.filter((item) => item.isContributor).slice(0, 3);
    const diluters = data.filter((item) => !item.isContributor).slice(0, 3);
    const maxValue = Math.max(...data.map((item) => Math.abs(item.value)));

    return (
      <div key={dimension} className="bg-gray-50 rounded-lg p-3">
        <h4 className="text-sm font-bold text-gray-900 mb-3">{title}</h4>

        {/* Contributors */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="text-xs font-semibold text-gray-700">Top Contributors</div>
          </div>
          <div>{contributors.map((item) => renderCompactBar(item, maxValue))}</div>
        </div>

        {/* Diluters */}
        {diluters.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="text-xs font-semibold text-gray-700">Top Diluters</div>
            </div>
            <div>{diluters.map((item) => renderCompactBar(item, maxValue))}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900">Contribute / Dilute Analysis</h3>
        <p className="text-xs text-gray-600 mt-0.5">Top contributors and diluters by dimension</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {renderDimensionColumn("lanes", "Lanes")}
        {renderDimensionColumn("plants", "Plants")}
        {renderDimensionColumn("vendors", "Vendors")}
      </div>
    </div>
  );
}
