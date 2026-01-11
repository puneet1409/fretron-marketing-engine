'use client'

import { cn, formatCurrency } from '@/lib/utils'
import { PriorityAction } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, RefreshCw, FileText, Phone } from 'lucide-react'

interface PriorityActionCardProps {
  action: PriorityAction
  index: number
  className?: string
}

export function PriorityActionCard({ action, index, className }: PriorityActionCardProps) {
  const actionIcons: Record<string, any> = {
    update_stage: RefreshCw,
    add_note: FileText,
    follow_up: Phone
  }

  const Icon = actionIcons[action.action_type] || ArrowUpRight

  return (
    <div
      className={cn(
        'group relative rounded-lg border bg-card p-4 transition-all duration-300 hover:border-accent/50',
        action.priority === 1 && 'border-accent/30 gradient-border',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
          action.priority === 1
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground'
        )}>
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground truncate">
              {action.deal_name}
            </h4>
            <Badge variant={action.priority === 1 ? 'danger' : 'warning'} size="sm">
              P{action.priority}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {action.description}
          </p>

          {action.context && (
            <p className="text-xs text-accent italic mb-2">
              "{action.context}"
            </p>
          )}

          <div className="flex items-center gap-4 text-xs">
            <span className="font-semibold text-foreground">
              {formatCurrency(action.value_at_stake)} at stake
            </span>
            {action.days_overdue && (
              <span className="text-destructive">
                {action.days_overdue} days overdue
              </span>
            )}
          </div>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">
            {action.action_type === 'update_stage' && 'Update'}
            {action.action_type === 'add_note' && 'Add Note'}
            {action.action_type === 'follow_up' && 'Follow Up'}
          </span>
        </button>
      </div>
    </div>
  )
}
