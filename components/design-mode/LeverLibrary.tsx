"use client";

import { useState } from "react";
import { Search, Filter, TrendingDown, Building2, Factory, Truck, FlaskConical, Building, Eye, EyeOff } from "lucide-react";
import { LeverChip } from "@/components/shared/LeverChip";
import { getThemeLabel, getReadinessColor } from "@/lib/utils";
import type { ValueLever } from "@/types";
import leversData from "@/data/levers.json";
import heroLeversData from "@/data/hero-levers.json";

interface LeverLibraryProps {
  onLeverSelect?: (lever: ValueLever) => void;
}

export function LeverLibrary({ onLeverSelect }: LeverLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedPillar, setSelectedPillar] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAllLevers, setShowAllLevers] = useState(false);

  const allLevers = leversData as ValueLever[];
  const heroLeverIds = heroLeversData.heroLevers.map(hl => hl.id);

  // Filter levers
  const filteredLevers = allLevers.filter(lever => {
    // Hero lever filter (only apply if showAllLevers is false)
    const matchesHeroFilter = showAllLevers || heroLeverIds.includes(lever.id);

    const matchesSearch = lever.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lever.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lever.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = selectedTheme === "all" || lever.theme === selectedTheme;
    const matchesPillar = selectedPillar === "all" || lever.pillars.includes(selectedPillar as any);
    const matchesIndustry = selectedIndustry === "all" || lever.industries.includes(selectedIndustry as any);

    return matchesHeroFilter && matchesSearch && matchesTheme && matchesPillar && matchesIndustry;
  });

  // Get unique themes, pillars
  const themes = [...new Set(allLevers.map(l => l.theme))];
  const pillars = ["cost", "service", "efficiency", "compliance"];
  const industries = ["steel", "cpg", "3pl", "chemicals", "cement"];

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case "steel": return <Factory className="w-3.5 h-3.5" />;
      case "cpg": return <Building2 className="w-3.5 h-3.5" />;
      case "3pl": return <Truck className="w-3.5 h-3.5" />;
      case "chemicals": return <FlaskConical className="w-3.5 h-3.5" />;
      case "cement": return <Building className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Value Lever Library
          </h2>
          <p className="text-gray-600">
            {showAllLevers
              ? `Showing all ${allLevers.length} value levers across 11 themes`
              : `Showing ${heroLeverIds.length} recommended levers for early implementation`
            }
          </p>
        </div>
        <button
          onClick={() => setShowAllLevers(!showAllLevers)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {showAllLevers ? (
            <>
              <EyeOff className="w-4 h-4" />
              Show Recommended Only
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show All Levers
            </>
          )}
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search levers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fretron-blue"
            />
          </div>

          {/* Theme Filter */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fretron-blue"
          >
            <option value="all">All Themes</option>
            {themes.map(theme => (
              <option key={theme} value={theme}>{getThemeLabel(theme)}</option>
            ))}
          </select>

          {/* Pillar Filter */}
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fretron-blue"
          >
            <option value="all">All Pillars</option>
            {pillars.map(pillar => (
              <option key={pillar} value={pillar}>
                {pillar.charAt(0).toUpperCase() + pillar.slice(1)}
              </option>
            ))}
          </select>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fretron-blue"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredLevers.length} of {allLevers.length} levers</span>
          {(searchQuery || selectedTheme !== "all" || selectedPillar !== "all" || selectedIndustry !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTheme("all");
                setSelectedPillar("all");
                setSelectedIndustry("all");
              }}
              className="text-fretron-blue hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Lever Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevers.map((lever) => {
          const primaryKPI = lever.impactedKPIs[0];

          return (
            <div
              key={lever.id}
              onClick={() => onLeverSelect?.(lever)}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-fretron-blue hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <LeverChip leverId={lever.id} className="text-xs" />
                <div className="flex items-center gap-1">
                  {lever.industries.slice(0, 3).map((industry) => (
                    <div
                      key={industry}
                      className="text-gray-400 group-hover:text-gray-600"
                      title={industry}
                    >
                      {getIndustryIcon(industry)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Name & Description */}
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                {lever.name}
              </h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {lever.description}
              </p>

              {/* Pillars */}
              <div className="flex flex-wrap gap-1 mb-3">
                {lever.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {pillar}
                  </span>
                ))}
              </div>

              {/* Impact */}
              {primaryKPI && (
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">
                    {primaryKPI.kpiId}: {primaryKPI.expectedImpactRange[0]} to {primaryKPI.expectedImpactRange[1]}{primaryKPI.unit}
                  </span>
                </div>
              )}

              {/* Readiness */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Readiness:</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getReadinessColor(lever.readiness.data)}`} title="Data" />
                  <div className={`w-2 h-2 rounded-full ${getReadinessColor(lever.readiness.process)}`} title="Process" />
                  <div className={`w-2 h-2 rounded-full ${getReadinessColor(lever.readiness.technology)}`} title="Technology" />
                </div>
                <span className="text-xs text-gray-400 ml-auto">
                  Level {lever.maturityLevel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredLevers.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No levers found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTheme("all");
              setSelectedPillar("all");
              setSelectedIndustry("all");
            }}
            className="px-4 py-2 bg-fretron-blue text-white rounded-lg hover:bg-fretron-blue/90"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
