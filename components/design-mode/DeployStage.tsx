"use client";

import { useState } from "react";
import { FileText, Calendar, Users, CheckSquare, Download } from "lucide-react";

export function DeployStage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Deploy Your Transformation
        </h2>
        <p className="text-gray-600">
          Implementation playbooks, timelines, and change management resources
        </p>
      </div>

      {/* Implementation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Playbooks</h4>
              <p className="text-xs text-gray-600">5 lever playbooks</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Step-by-step implementation guides for each selected lever
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Timeline</h4>
              <p className="text-xs text-gray-600">12-week rollout</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Phased implementation with milestones and dependencies
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Resources</h4>
              <p className="text-xs text-gray-600">3 teams required</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Team structure, roles, and skill requirements
          </p>
        </div>
      </div>

      {/* Playbook Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Implementation Playbooks
        </h3>

        <div className="space-y-3">
          {[
            {
              id: "LU10",
              name: "LTL→FTL Consolidation",
              duration: "8 weeks",
              effort: "Medium",
              status: "ready",
            },
            {
              id: "TB01",
              name: "Digital Spot Bidding",
              duration: "4 weeks",
              effort: "Low",
              status: "ready",
            },
            {
              id: "YG52",
              name: "Gate Scheduling",
              duration: "6 weeks",
              effort: "Medium",
              status: "blocked",
            },
            {
              id: "RS19",
              name: "Route Optimization",
              duration: "10 weeks",
              effort: "High",
              status: "ready",
            },
            {
              id: "CT47",
              name: "Exception Alerting",
              duration: "3 weeks",
              effort: "Low",
              status: "ready",
            },
          ].map((playbook) => (
            <div
              key={playbook.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-fretron-blue hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-mono rounded">
                        {playbook.id}
                      </span>
                      <h4 className="font-semibold text-gray-900">{playbook.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">
                        Duration: {playbook.duration}
                      </span>
                      <span className="text-xs text-gray-600">
                        Effort: {playbook.effort}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {playbook.status === "ready" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    Ready
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    Blocked
                  </span>
                )}
                <button className="px-3 py-1 text-sm font-medium text-fretron-blue hover:bg-blue-50 rounded transition-colors flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-gradient-to-r from-fretron-blue to-blue-600 rounded-lg p-6 text-white">
        <div>
          <h3 className="text-lg font-semibold mb-1">Ready to Execute?</h3>
          <p className="text-blue-100 text-sm">
            Download the complete implementation package with all playbooks, timelines, and resources
          </p>
        </div>
        <button className="px-6 py-3 bg-white text-fretron-blue rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download Package
        </button>
      </div>
    </div>
  );
}
