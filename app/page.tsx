"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { RoleSelector } from "@/components/shared/RoleSelector";
import { ViewDensityToggle, loadViewDensity, saveViewDensity, type ViewDensity } from "@/components/shared/ViewDensityToggle";
import { Breadcrumb, type BreadcrumbItem } from "@/components/shared/Breadcrumb";
import { HeadlineKPIs } from "@/components/run-mode/HeadlineKPIs";
import { PillarSection } from "@/components/run-mode/PillarSection";
import { DiagnosticSummary } from "@/components/design-mode/DiagnosticSummary";
import { LeverLibrary } from "@/components/design-mode/LeverLibrary";
import { LadderView } from "@/components/design-mode/LadderView";
import { LeverDetailPanel } from "@/components/design-mode/LeverDetailPanel";
import { LadderStatusWidget } from "@/components/shared/LadderStatusWidget";
import { JourneyNavigation, type JourneyStage } from "@/components/design-mode/JourneyNavigation";
import { DesignStage } from "@/components/design-mode/DesignStage";
import { DeployStage } from "@/components/design-mode/DeployStage";
import { DriveStage } from "@/components/design-mode/DriveStage";
import { Truck, BarChart3, Library, TrendingUp } from "lucide-react";
import type { KPI, KPIValue, ValueLever, Scenario } from "@/types";
import type { UserRole } from "@/config/roles";
import { getRoleConfig, loadSelectedRole, saveSelectedRole } from "@/config/roles";

// Import data
import kpisData from "@/data/kpis.json";
import leversData from "@/data/levers.json";
import scenariosData from "@/data/mock-scenarios.json";

export default function Home() {
  const router = useRouter();

  // Track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Core state - initialize with defaults
  const [mode, setMode] = useState<"run" | "design">("run");
  const [selectedRole, setSelectedRole] = useState<UserRole>("supply_chain");
  const [viewDensity, setViewDensity] = useState<ViewDensity>("board");
  const [selectedScenario, setSelectedScenario] = useState("baseline");

  // Design Mode state
  const [journeyStage, setJourneyStage] = useState<JourneyStage>("discover");
  const [completedStages, setCompletedStages] = useState<JourneyStage[]>([]);
  const [designView, setDesignView] = useState<"diagnostic" | "library" | "ladders">("diagnostic");
  const [selectedLever, setSelectedLever] = useState<ValueLever | null>(null);

  // Load saved preferences on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    const savedRole = loadSelectedRole();
    const savedDensity = loadViewDensity();
    setSelectedRole(savedRole);
    setViewDensity(savedDensity);
  }, []);

  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    saveSelectedRole(role);
  };

  // Handle view density change
  const handleViewDensityChange = (density: ViewDensity) => {
    setViewDensity(density);
    saveViewDensity(density);
  };

  // Get current role config
  const roleConfig = getRoleConfig(selectedRole);

  // Pillar configurations with colors
  const pillars = [
    {
      id: "cost",
      label: "Cost & Productivity",
      description: "Freight cost efficiency and operational productivity metrics",
      color: "#1E40AF",
    },
    {
      id: "service",
      label: "Service & Experience",
      description: "On-time performance and customer service quality",
      color: "#10B981",
    },
    {
      id: "efficiency",
      label: "Efficiency & Throughput",
      description: "Asset utilization, detention, and operational efficiency",
      color: "#7C3AED",
    },
    {
      id: "compliance",
      label: "Risk & Compliance",
      description: "Documentation compliance and risk management",
      color: "#F59E0B",
    },
  ];

  // Get current scenario
  const scenario = scenariosData.find((s: Scenario) => s.id === selectedScenario) || scenariosData[0];

  // Get KPI values from scenario - create a Map for quick lookups
  const kpiValuesMap = useMemo(() => {
    const map = new Map<string, KPIValue>();
    scenario.kpiValues.forEach((kv: KPIValue) => {
      map.set(kv.kpiId, kv);
    });
    return map;
  }, [scenario]);

  // Get active levers for a KPI
  const getActiveLeversForKPI = (kpiId: string): ValueLever[] => {
    const kpiValue = kpiValuesMap.get(kpiId);
    if (!kpiValue || kpiValue.activeLeverIds.length === 0) return [];

    return leversData.filter((lever: ValueLever) =>
      kpiValue.activeLeverIds.includes(lever.id)
    );
  };

  // Get headline KPIs for current role
  const headlineKPIs = useMemo(() => {
    return roleConfig.headlineKPIs
      .map((kpiId) => kpisData.find((k: KPI) => k.id === kpiId))
      .filter((kpi): kpi is KPI => kpi !== undefined);
  }, [roleConfig]);

  // Get KPIs grouped by pillar
  const kpisByPillar = useMemo(() => {
    const grouped = new Map<string, KPI[]>();
    pillars.forEach((pillar) => {
      const pillarKPIs = kpisData.filter((kpi: KPI) => kpi.pillar === pillar.id);
      grouped.set(pillar.id, pillarKPIs);
    });
    return grouped;
  }, []);

  // Build breadcrumb items
  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: "Command Center",
        onClick: () => {
          setMode("run");
        },
      },
    ];

    if (mode === "design") {
      const stageLabels = {
        discover: "Discover",
        design: "Design",
        deploy: "Deploy",
        drive: "Drive",
      };

      items.push({
        label: `${stageLabels[journeyStage]} Stage`,
      });

      if (selectedLever) {
        items.push({
          label: selectedLever.name,
          isActive: true,
        });
      }
    }

    return items;
  }, [mode, journeyStage, selectedLever]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-fretron-blue rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Fretron Dispatch Value Audit
                </h1>
                <p className="text-sm text-gray-500">Find 8–15% freight cost savings and 3–5 point OTIF uplift</p>
                <p className="text-xs text-gray-400 mt-0.5">Powered by Move-as-One · Fretron TMS</p>
              </div>
            </div>

            {/* Right: Role + Filters + Mode Toggle */}
            <div className="flex items-center gap-4">
              {/* Role Selector - Only in Run Mode */}
              {mode === "run" && (
                <>
                  <RoleSelector selectedRole={selectedRole} onChange={handleRoleChange} />
                  <div className="h-8 w-px bg-gray-300" />
                  <ViewDensityToggle density={viewDensity} onChange={handleViewDensityChange} />
                  <div className="h-8 w-px bg-gray-300" />
                </>
              )}

              {/* Global Filters */}
              <div className="flex items-center gap-3 text-sm">
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fretron-blue focus:border-transparent"
                >
                  <option value="baseline">Baseline</option>
                  <option value="post-lever">Post-Lever Activation</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fretron-blue focus:border-transparent">
                  <option>Last 90 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 180 Days</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fretron-blue focus:border-transparent">
                  <option>All Plants</option>
                  <option>Jamshedpur</option>
                  <option>Vizag</option>
                  <option>Rourkela</option>
                </select>
              </div>

              <div className="h-8 w-px bg-gray-300" />

              {/* Ladder Status Widget */}
              <LadderStatusWidget />

              <div className="h-8 w-px bg-gray-300" />

              <ModeToggle mode={mode} onChange={setMode} />
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        {breadcrumbItems.length > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main>
        {mode === "run" ? (
          <div>
            {/* Headline KPIs Row */}
            <HeadlineKPIs
              kpis={headlineKPIs}
              kpiValues={kpiValuesMap}
              onKPIClick={(kpiId) => router.push(`/kpi/${kpiId}?scenario=${selectedScenario}`)}
            />

            {/* Unified Scroll - All Pillar Sections */}
            {pillars.map((pillar) => {
              const pillarKPIs = kpisByPillar.get(pillar.id) || [];
              const isExpanded = roleConfig.primaryPillars.includes(pillar.id);

              return (
                <PillarSection
                  key={pillar.id}
                  pillar={pillar}
                  kpis={pillarKPIs}
                  kpiValues={kpiValuesMap}
                  getActiveLeversForKPI={getActiveLeversForKPI}
                  onKPIClick={(kpiId) => router.push(`/kpi/${kpiId}?scenario=${selectedScenario}`)}
                  defaultExpanded={isExpanded}
                  viewDensity={viewDensity}
                />
              );
            })}

            {/* Scenario Info Footer */}
            {selectedScenario === "post-lever" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-green-900">
                      {scenario.name}
                    </h3>
                    <p className="text-sm text-green-700 mt-0.5">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">-13–17%</div>
                    <div className="text-sm text-green-700">PKMMT Reduction</div>
                    <div className="text-xs text-green-600 mt-1">
                      {scenario.activeLevers.length} levers active
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Journey Navigation */}
            <JourneyNavigation
              currentStage={journeyStage}
              onStageChange={setJourneyStage}
              completedStages={completedStages}
            />

            {/* Stage Content */}
            <div className="p-6">
              {journeyStage === "discover" && (
                <div className="space-y-6">
                  {/* Sub-tabs for Discover stage */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="border-b border-gray-200">
                      <div className="flex gap-1 px-6">
                        <button
                          onClick={() => setDesignView("diagnostic")}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                            designView === "diagnostic"
                              ? "border-fretron-blue text-fretron-blue"
                              : "border-transparent text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          Diagnostic Summary
                        </button>
                        <button
                          onClick={() => setDesignView("ladders")}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                            designView === "ladders"
                              ? "border-fretron-blue text-fretron-blue"
                              : "border-transparent text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <TrendingUp className="w-4 h-4" />
                          Ladder View
                        </button>
                        <button
                          onClick={() => setDesignView("library")}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                            designView === "library"
                              ? "border-fretron-blue text-fretron-blue"
                              : "border-transparent text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Library className="w-4 h-4" />
                          Lever Library
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {designView === "diagnostic" ? (
                        <DiagnosticSummary onLeverSelect={(lever) => setSelectedLever(lever)} />
                      ) : designView === "ladders" ? (
                        <LadderView onLeverSelect={(lever) => setSelectedLever(lever)} />
                      ) : (
                        <LeverLibrary onLeverSelect={(lever) => setSelectedLever(lever)} />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {journeyStage === "design" && (
                <DesignStage onLeverSelect={(lever) => setSelectedLever(lever)} />
              )}

              {journeyStage === "deploy" && <DeployStage />}

              {journeyStage === "drive" && (
                <DriveStage onGoToRunMode={() => setMode("run")} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Lever Detail Panel */}
      <LeverDetailPanel
        isOpen={selectedLever !== null}
        onClose={() => setSelectedLever(null)}
        lever={selectedLever}
      />
    </div>
  );
}
