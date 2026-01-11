'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
  size = 'md',
  variant,
  className
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0

  // Auto-determine variant based on percentage if not specified
  const autoVariant = variant || (
    percentage >= 80 ? 'success' :
    percentage >= 50 ? 'warning' :
    'danger'
  )

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const variantStyles = {
    default: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive'
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="font-medium text-foreground">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn('overflow-hidden rounded-full bg-muted', sizeStyles[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 progress-animated',
            variantStyles[autoVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
