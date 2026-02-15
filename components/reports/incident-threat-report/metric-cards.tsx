"use client"

import { AlertTriangle, Target, Clock, Shield, TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Metrics } from "@/lib/incident-threat-data"

interface MetricCardsProps {
  metrics: Metrics
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change: number
  changeLabel: string
  context: string
  isPositiveGood?: boolean
}

function MetricCard({ icon, label, value, change, changeLabel, context, isPositiveGood = false }: MetricCardProps) {
  const isImproved = isPositiveGood ? change > 0 : change < 0
  const TrendIcon = change > 0 ? TrendingUp : TrendingDown

  return (
    <Card className="border-content-border bg-content-surface p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wider text-content-text-muted">{label}</span>
        </div>
        <div className="text-3xl font-bold text-content-text-strong">{value}</div>
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 text-xs font-medium ${isImproved ? "text-success" : "text-danger"}`}>
            <TrendIcon className="h-3 w-3" />
            <span>{change > 0 ? "+" : ""}{change}% {changeLabel}</span>
          </div>
        </div>
        <p className="text-xs text-content-text-muted">{context}</p>
      </div>
    </Card>
  )
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={<AlertTriangle className="h-5 w-5 text-danger" aria-hidden />}
        label="Total Incidents"
        value={String(metrics.totalIncidents)}
        change={metrics.percentChange}
        changeLabel="vs last week"
        context={`${metrics.totalIncidents - metrics.resolvedCount + (metrics.percentChange > 0 ? 5 : 0)} more than last period`}
        isPositiveGood={false}
      />
      <MetricCard
        icon={<Target className="h-5 w-5 text-info" aria-hidden />}
        label="Mean Time to Detect"
        value={`${metrics.meanTimeToDetect} hrs`}
        change={metrics.mttdChange}
        changeLabel="vs last week"
        context={`Target: <4 hours`}
        isPositiveGood={false}
      />
      <MetricCard
        icon={<Clock className="h-5 w-5 text-warning" aria-hidden />}
        label="Mean Time to Respond"
        value={`${metrics.meanTimeToRespond} hrs`}
        change={metrics.mttrChange}
        changeLabel="vs last week"
        context={`Target: <12 hours`}
        isPositiveGood={false}
      />
      <MetricCard
        icon={<Shield className="h-5 w-5 text-success" aria-hidden />}
        label="Resolution Rate"
        value={`${metrics.resolutionRate}%`}
        change={metrics.resolutionChange}
        changeLabel="vs last week"
        context={`${metrics.resolvedCount}/${metrics.totalIncidents} incidents resolved`}
        isPositiveGood={true}
      />
    </div>
  )
}
