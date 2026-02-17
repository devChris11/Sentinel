"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { SummaryMetrics } from "@/lib/user-behavior-data"

interface MetricsCardsProps {
  data: SummaryMetrics
}

const metrics = [
  {
    key: "avgReportingRate" as const,
    label: "Avg Reporting Rate",
    format: (v: number) => `${v}%`,
    changeKey: "avgReportingRateChange" as const,
    benchmark: "Industry avg: 72%",
  },
  {
    key: "avgTimeToReport" as const,
    label: "Avg Time to Report",
    format: (v: number) => `${v} hrs`,
    changeKey: "avgTimeToReportChange" as const,
    benchmark: "Target: <2 hours",
  },
  {
    key: "trainingCompletion" as const,
    label: "Training Completion",
    format: (v: number) => `${v}%`,
    changeKey: "trainingCompletionChange" as const,
    benchmark: "Company goal: 90%",
  },
  {
    key: "realThreatReports" as const,
    label: "Real Threats Reported",
    format: (v: number) => `${v}`,
    changeKey: "realThreatReportsChange" as const,
    benchmarkKey: "realThreatReportsLastMonth" as const,
  },
]

export function MetricsCards({ data }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const value = data[metric.key]
        const change = data[metric.changeKey]
        const isPositive = metric.key === "avgTimeToReport" ? change < 0 : change > 0

        return (
          <Card key={metric.key} className="border-content-border bg-content-surface p-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-content-text-muted">
                {metric.label}
              </span>
              <span className="text-3xl font-bold text-content-text-strong">
                {metric.format(value)}
              </span>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" aria-hidden />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-danger" aria-hidden />
                )}
                <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-danger"}`}>
                  {change > 0 ? "+" : ""}{change}% vs last period
                </span>
              </div>
              <p className="text-xs text-content-text-muted">
                {"benchmark" in metric
                  ? metric.benchmark
                  : `Last month: ${data[metric.benchmarkKey!]}`}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
