"use client";

import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {/* Home Icon */}
      <button
        onClick={items[0]?.onClick}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isClickable = !isLast && item.onClick;

        return (
          <Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isClickable ? (
              <button
                onClick={item.onClick}
                className="text-gray-600 hover:text-fretron-blue transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span
                className={`font-medium ${
                  isLast ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
