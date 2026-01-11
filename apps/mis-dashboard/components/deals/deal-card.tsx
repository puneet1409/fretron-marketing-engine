'use client'

import { cn, formatCurrency, getDaysAgoText, getUrgencyLevel } from '@/lib/utils'
import { StaleDeal } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Clock, AlertTriangle, ArrowRight, Building2 } from 'lucide-react'

interface DealCardProps {
  deal: StaleDeal
  className?: string
}

export function DealCard({ deal, className }: DealCardProps) {
  const urgency = getUrgencyLevel(deal.days_since_activity)

  const urgencyConfig = {
    critical: { badge: 'danger', text: 'Critical', icon: AlertTriangle },
    high: { badge: 'warning', text: 'High', icon: Clock },
    medium: { badge: 'default', text: 'Medium', icon: Clock },
    low: { badge: 'outline', text: 'Low', icon: Clock }
  }

  const config = urgencyConfig[urgency]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:bg-card hover:border-border/80',
        urgency === 'critical' && 'border-destructive/30 bg-destructive/5',
        urgency === 'high' && 'border-warning/30 bg-warning/5',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <h4 className="font-medium text-foreground truncate">{deal.deal_name}</h4>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-accent">
              {formatCurrency(deal.value)}
            </span>
            {deal.stage && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground truncate">{deal.stage}</span>
              </>
            )}
          </div>

          {deal.known_reality && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <ArrowRight className="h-3 w-3 text-success" />
              <span className="text-success">Actually: {deal.known_reality}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant={config.badge as any}>
            <Icon className="h-3 w-3 mr-1" />
            {deal.days_since_activity}d
          </Badge>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-warning">{config.text}:</span>{' '}
          {deal.recommended_action}
        </p>
      </div>
    </div>
  )
}
