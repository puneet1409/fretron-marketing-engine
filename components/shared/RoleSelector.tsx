"use client";

import { User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { UserRole } from "@/config/roles";
import { getAllRoles } from "@/config/roles";

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = getAllRoles();
  const currentRole = roles.find((r) => r.id === selectedRole);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
      >
        <User className="w-4 h-4 text-gray-500" />
        <span>{currentRole?.label || "Select Role"}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-700 px-2 py-1">Select Your Role</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  onChange(role.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${
                  selectedRole === role.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{role.label}</span>
                      {selectedRole === role.id && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{role.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {role.headlineKPIs.slice(0, 3).map((kpiId) => (
                        <span
                          key={kpiId}
                          className="text-xs font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded"
                        >
                          {kpiId}
                        </span>
                      ))}
                      {role.headlineKPIs.length > 3 && (
                        <span className="text-xs text-gray-500">+{role.headlineKPIs.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
