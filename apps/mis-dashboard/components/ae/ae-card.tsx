'use client'

import { cn, formatCurrency, getComplianceColor, getComplianceBg } from '@/lib/utils'
import { AEData } from '@/lib/data'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Badge } from '@/components/ui/badge'
import { User, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react'

interface AECardProps {
  name: string
  data: AEData
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function AECard({ name, data, isSelected, onClick, className }: AECardProps) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)
  const staleCount = data.deal_health.stale_deals.length
  const mismatchCount = data.deal_health.stage_mismatches.length
  const touchRate = data.deal_health.total_active > 0
    ? Math.round((data.deal_health.touched_this_period / data.deal_health.total_active) * 100)
    : 0

  // Calculate total pipeline value from stale deals
  const stalePipelineValue = data.deal_health.stale_deals.reduce(
    (sum, deal) => sum + deal.value, 0
  )

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer rounded-xl border bg-card p-6 transition-all duration-300',
        isSelected
          ? 'border-accent ring-2 ring-accent/20'
          : 'border-border hover:border-accent/50',
        'card-glow',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
            <User className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{displayName}</h3>
            <p className="text-sm text-muted-foreground">
              {data.deal_health.total_active} active deals
            </p>
          </div>
        </div>

        <div className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl',
          getComplianceBg(data.overall_score)
        )}>
          <span className={cn('text-2xl font-bold', getComplianceColor(data.overall_score))}>
            {data.overall_score}
          </span>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="space-y-3 mb-6">
        <ProgressBar
          value={data.activity_metrics.calls_logged}
          max={data.activity_metrics.calls_target}
          label="Calls"
          size="sm"
        />
        <ProgressBar
          value={data.activity_metrics.emails_logged}
          max={data.activity_metrics.emails_target}
          label="Emails"
          size="sm"
        />
        <ProgressBar
          value={data.activity_metrics.meetings_held}
          max={data.activity_metrics.meetings_target}
          label="Meetings"
          size="sm"
        />
        <ProgressBar
          value={data.activity_metrics.notes_added}
          max={data.activity_metrics.notes_target}
          label="Notes"
          size="sm"
        />
      </div>

      {/* Health Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <div className={cn(
          'rounded-lg p-3',
          staleCount > 0 ? 'bg-destructive/10' : 'bg-success/10'
        )}>
          <div className="flex items-center gap-2 mb-1">
            {staleCount > 0
              ? <TrendingDown className="h-4 w-4 text-destructive" />
              : <CheckCircle className="h-4 w-4 text-success" />
            }
            <span className="text-xs text-muted-foreground">Stale Deals</span>
          </div>
          <p className={cn(
            'text-lg font-bold',
            staleCount > 0 ? 'text-destructive' : 'text-success'
          )}>
            {staleCount}
          </p>
        </div>

        <div className={cn(
          'rounded-lg p-3',
          mismatchCount > 0 ? 'bg-warning/10' : 'bg-success/10'
        )}>
          <div className="flex items-center gap-2 mb-1">
            {mismatchCount > 0
              ? <AlertCircle className="h-4 w-4 text-warning" />
              : <CheckCircle className="h-4 w-4 text-success" />
            }
            <span className="text-xs text-muted-foreground">Mismatches</span>
          </div>
          <p className={cn(
            'text-lg font-bold',
            mismatchCount > 0 ? 'text-warning' : 'text-success'
          )}>
            {mismatchCount}
          </p>
        </div>
      </div>

      {/* At Risk Value */}
      {stalePipelineValue > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">Pipeline at Risk</p>
          <p className="text-lg font-bold text-destructive">
            {formatCurrency(stalePipelineValue)}
          </p>
        </div>
      )}
    </div>
  )
}
