'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { MetricCard } from '@/components/ui/metric-card'
import { AECard } from '@/components/ae/ae-card'
import { DealCard } from '@/components/deals/deal-card'
import { PriorityActionCard } from '@/components/deals/priority-action'
import { IssuesPanel } from '@/components/issues/issues-panel'
import { sampleData } from '@/lib/data'
import { formatCurrency, cn } from '@/lib/utils'
import {
  Target,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Users,
  LayoutGrid,
  List
} from 'lucide-react'

export default function Dashboard() {
  const [selectedAE, setSelectedAE] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const data = sampleData
  const aeEntries = Object.entries(data.by_ae)

  // Get selected AE data or show all
  const selectedAEData = selectedAE ? data.by_ae[selectedAE] : null

  // Combine all stale deals if no AE selected
  const allStaleDeals = selectedAE
    ? selectedAEData?.deal_health.stale_deals || []
    : aeEntries.flatMap(([name, ae]) =>
        ae.deal_health.stale_deals.map(deal => ({ ...deal, ae: name }))
      )

  // Combine all priority actions if no AE selected
  const allPriorityActions = selectedAE
    ? selectedAEData?.priority_actions || []
    : aeEntries.flatMap(([name, ae]) =>
        ae.priority_actions.map(action => ({ ...action, ae: name }))
      ).sort((a, b) => a.priority - b.priority)

  return (
    <div className="min-h-screen bg-background">
      <Header
        date={data.date}
        period={data.period}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Overview Metrics */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Team Overview</h2>
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  viewMode === 'grid' ? 'bg-card text-foreground' : 'text-muted-foreground'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  viewMode === 'list' ? 'bg-card text-foreground' : 'text-muted-foreground'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Compliance Score"
              value={`${data.team_summary.overall_compliance_score}%`}
              subtitle="Team average"
              icon={Target}
              variant={data.team_summary.overall_compliance_score >= 60 ? 'warning' : 'danger'}
            />
            <MetricCard
              title="Total Pipeline"
              value={formatCurrency(data.team_summary.total_pipeline_value)}
              subtitle={`${data.team_summary.total_active_deals} active deals`}
              icon={DollarSign}
            />
            <MetricCard
              title="Deals at Risk"
              value={data.team_summary.deals_at_risk}
              subtitle={formatCurrency(data.team_summary.deals_at_risk_value)}
              icon={TrendingDown}
              variant="danger"
            />
            <MetricCard
              title="Activity Rate"
              value={`${data.team_summary.activity_volume_vs_target}%`}
              subtitle="vs weekly target"
              icon={Users}
              variant="danger"
            />
          </div>
        </section>

        {/* AE Cards */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Account Executives</h2>
            {selectedAE && (
              <button
                onClick={() => setSelectedAE(null)}
                className="text-sm text-accent hover:underline"
              >
                View All
              </button>
            )}
          </div>

          <div className={cn(
            'grid gap-4',
            viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'
          )}>
            {aeEntries.map(([name, aeData]) => (
              <AECard
                key={name}
                name={name}
                data={aeData}
                isSelected={selectedAE === name}
                onClick={() => setSelectedAE(selectedAE === name ? null : name)}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Priority Actions */}
          <section className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">Priority Actions</h2>
              <span className="ml-auto rounded-full bg-warning/20 px-2.5 py-0.5 text-xs font-medium text-warning">
                {allPriorityActions.length} actions
              </span>
            </div>

            <div className="space-y-3">
              {allPriorityActions.slice(0, 6).map((action, index) => (
                <PriorityActionCard
                  key={`${action.deal_name}-${index}`}
                  action={action}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Issues Panel */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">System Issues</h2>
            <IssuesPanel issues={data.issues_identified} />
          </section>
        </div>

        {/* Stale Deals */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">
              Stale Deals
              {selectedAE && <span className="text-muted-foreground font-normal"> - {selectedAE}</span>}
            </h2>
            <span className="ml-auto rounded-full bg-destructive/20 px-2.5 py-0.5 text-xs font-medium text-destructive">
              {allStaleDeals.length} deals
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allStaleDeals.slice(0, 9).map((deal, index) => (
              <DealCard key={deal.deal_id || index} deal={deal} />
            ))}
          </div>

          {allStaleDeals.length > 9 && (
            <button className="mt-4 w-full rounded-lg border border-border py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              View all {allStaleDeals.length} stale deals
            </button>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Last updated: {new Date(data.generated_at).toLocaleString('en-IN')}
          </p>
        </div>
      </footer>
    </div>
  )
}
