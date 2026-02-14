"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { DashboardMetric } from "@/lib/dashboard-data"

export function StatCard({ metric }: { metric: DashboardMetric }) {
  const trendColor = metric.trend.isPositive
    ? "text-[#10B981]"
    : "text-[#EF4444]"

  const thresholdStyles: Record<string, string> = {
    normal: "bg-[#10B981]/10 text-[#10B981]",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B]",
    critical: "bg-[#EF4444]/10 text-[#EF4444]",
  }

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] p-6 shadow-sm">
      {/* Top row: label + badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#64748B]">
          {metric.label}
        </span>
        {metric.threshold && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${thresholdStyles[metric.threshold.status]}`}
          >
            {metric.threshold.label}
          </span>
        )}
      </div>

      {/* Main value */}
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-[#0F172A]">
          {metric.value.toLocaleString()}
        </span>
        {metric.unit && (
          <span className="text-lg font-medium text-[#475569]">
            {metric.unit}
          </span>
        )}
      </div>

      {/* Trend row */}
      <div className="mt-2 flex items-center gap-1.5">
        {metric.trend.direction === "up" ? (
          <TrendingUp className={`h-4 w-4 ${trendColor}`} aria-hidden="true" />
        ) : metric.trend.direction === "down" ? (
          <TrendingDown className={`h-4 w-4 ${trendColor}`} aria-hidden="true" />
        ) : (
          <Minus className="h-4 w-4 text-[#64748B]" aria-hidden="true" />
        )}
        <span className={`text-sm font-semibold ${trendColor}`}>
          {metric.trend.direction === "up" ? "+" : "-"}
          {metric.trend.percentage}%
        </span>
        <span className="text-xs text-[#64748B]">{metric.timeContext}</span>
      </div>

      {/* Description */}
      {metric.description && (
        <p className="mt-2 text-xs text-[#64748B]">{metric.description}</p>
      )}
    </div>
  )
}
