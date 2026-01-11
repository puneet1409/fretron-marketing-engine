import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`
  }
  return `₹${amount}`
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function getComplianceColor(score: number): string {
  if (score >= 80) return 'text-success'
  if (score >= 60) return 'text-warning'
  return 'text-destructive'
}

export function getComplianceBg(score: number): string {
  if (score >= 80) return 'bg-success/20'
  if (score >= 60) return 'bg-warning/20'
  return 'bg-destructive/20'
}

export function getDaysAgoText(days: number): string {
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 14) return '1 week ago'
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}

export function getUrgencyLevel(daysSinceActivity: number): 'critical' | 'high' | 'medium' | 'low' {
  if (daysSinceActivity >= 30) return 'critical'
  if (daysSinceActivity >= 14) return 'high'
  if (daysSinceActivity >= 7) return 'medium'
  return 'low'
}

export function getUrgencyColor(level: string): string {
  switch (level) {
    case 'critical': return 'text-destructive'
    case 'high': return 'text-orange-500'
    case 'medium': return 'text-warning'
    default: return 'text-muted-foreground'
  }
}
