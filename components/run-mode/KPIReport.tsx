"use client";

import { X, Download, TrendingDown, TrendingUp } from "lucide-react";
import { formatNumber, formatCurrency, cn } from "@/lib/utils";
import type { KPI } from "@/types";
import mockShipmentsData from "@/data/mock-shipments.json";

interface KPIReportProps {
  isOpen: boolean;
  onClose: () => void;
  kpi: KPI | null;
}

export function KPIReport({ isOpen, onClose, kpi }: KPIReportProps) {
  if (!isOpen || !kpi) return null;

  const { lanes, vendors } = mockShipmentsData;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-500">{kpi.id}</span>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-600">Full Report</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{kpi.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white">
              <option>All Plants</option>
              <option>Jamshedpur</option>
              <option>Vizag</option>
              <option>Rourkela</option>
            </select>
            <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white">
              <option>All Vendors</option>
              {vendors.map(v => (
                <option key={v.id}>{v.name}</option>
              ))}
            </select>
            <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white">
              <option>Last 90 Days</option>
              <option>Last 30 Days</option>
              <option>Last 180 Days</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {kpi.id === "C02" && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Cost per MT-km by Lane & Vendor
              </h3>

              {/* Lane Performance Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Lane</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Distance</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Volume (MT)</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Shipments</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Total Cost</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">PKMMT</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">OTIF %</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lanes.map((lane, idx) => {
                      const isWorst = idx < 3;
                      return (
                        <tr
                          key={lane.id}
                          className={cn(
                            "border-b border-gray-100 hover:bg-gray-50",
                            isWorst && "bg-red-50/50"
                          )}
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{lane.origin} → {lane.destination}</div>
                            <div className="text-xs text-gray-500">{lane.id}</div>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">{formatNumber(lane.distance)} km</td>
                          <td className="px-4 py-3 text-right text-gray-700">{formatNumber(lane.totalVolume)}</td>
                          <td className="px-4 py-3 text-right text-gray-700">{lane.shipmentCount}</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900">
                            {formatCurrency(lane.totalCost)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={cn(
                              "font-semibold",
                              isWorst ? "text-red-600" : "text-gray-900"
                            )}>
                              ₹{lane.avgPKMMT.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={cn(
                              "font-medium",
                              lane.otifPercent >= 85 ? "text-green-600" :
                              lane.otifPercent >= 75 ? "text-amber-600" : "text-red-600"
                            )}>
                              {lane.otifPercent}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {isWorst && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                Priority
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Vendor Performance Table */}
              <h3 className="text-sm font-semibold text-gray-900 mb-4 mt-8">
                Vendor Performance Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Vendor</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Shipments</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">PKMMT</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">OTIF %</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Avg Detention</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{vendor.name}</div>
                          <div className="text-xs text-gray-500">{vendor.id}</div>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700">{vendor.shipmentCount}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "font-semibold",
                            vendor.avgPKMMT > 3.8 ? "text-red-600" :
                            vendor.avgPKMMT > 3.5 ? "text-amber-600" : "text-green-600"
                          )}>
                            ₹{vendor.avgPKMMT.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn(
                            "font-medium",
                            vendor.otifPercent >= 85 ? "text-green-600" :
                            vendor.otifPercent >= 75 ? "text-amber-600" : "text-red-600"
                          )}>
                            {vendor.otifPercent}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700">
                          {vendor.detentionHours.toFixed(1)} hrs
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={cn(
                                  "text-lg",
                                  i < Math.round(vendor.otifPercent / 20) ? "text-amber-400" : "text-gray-300"
                                )}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other KPI report views can be added similarly */}
          {kpi.id !== "C02" && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Detailed report view for {kpi.name} coming soon
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {lanes.length} lanes, {vendors.length} vendors
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-fretron-blue text-white rounded-lg font-medium hover:bg-fretron-blue/90"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
