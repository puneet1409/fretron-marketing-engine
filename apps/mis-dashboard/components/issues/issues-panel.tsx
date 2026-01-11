'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

interface IssuesPanelProps {
  issues: {
    critical: string[]
    high: string[]
    medium: string[]
  }
  className?: string
}

export function IssuesPanel({ issues, className }: IssuesPanelProps) {
  const sections = [
    {
      level: 'critical',
      title: 'Critical Issues',
      icon: AlertTriangle,
      items: issues.critical,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/30'
    },
    {
      level: 'high',
      title: 'High Priority',
      icon: AlertCircle,
      items: issues.high,
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/30'
    },
    {
      level: 'medium',
      title: 'Medium Priority',
      icon: Info,
      items: issues.medium,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/30'
    }
  ]

  return (
    <div className={cn('space-y-4', className)}>
      {sections.map((section) => (
        section.items.length > 0 && (
          <div
            key={section.level}
            className={cn(
              'rounded-xl border p-4',
              section.border,
              section.bg
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <section.icon className={cn('h-5 w-5', section.color)} />
              <h3 className={cn('font-semibold', section.color)}>
                {section.title}
              </h3>
              <span className={cn(
                'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
                section.bg,
                section.color
              )}>
                {section.items.length}
              </span>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className={cn('mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0', section.color.replace('text-', 'bg-'))} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  )
}
