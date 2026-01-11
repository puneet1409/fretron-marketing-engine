'use client'

import { cn } from '@/lib/utils'
import { BarChart3, RefreshCw, Settings } from 'lucide-react'

interface HeaderProps {
  date: string
  period: { start: string; end: string }
  className?: string
}

export function Header({ date, period, className }: HeaderProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <header className={cn('border-b border-border bg-card/50 backdrop-blur-sm', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <BarChart3 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Fretron <span className="gradient-text">MIS</span>
                </h1>
              </div>
            </div>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <p className="hidden sm:block text-sm text-muted-foreground">
              {formatDate(period.start)} - {formatDate(period.end)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
