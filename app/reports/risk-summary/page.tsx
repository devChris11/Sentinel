"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Calendar, Download, AlertTriangle, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { HeroMetric } from "@/components/reports/risk-summary/hero-metric"
import { RiskDistributionChart } from "@/components/reports/risk-summary/risk-distribution-chart"
import { RiskTrendChart } from "@/components/reports/risk-summary/risk-trend-chart"
import { TopRisksTable } from "@/components/reports/risk-summary/top-risks-table"
import {
  TrainingEffectivenessCard,
  ComplianceStatusCard,
} from "@/components/reports/risk-summary/info-cards"
import { ReportSkeleton } from "@/components/reports/risk-summary/report-skeleton"
import { getRiskSummaryData } from "@/lib/risk-summary-data"
import type { RiskSummaryData } from "@/lib/risk-summary-data"

const DATE_RANGES = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "quarter", label: "Last Quarter" },
  { value: "6m", label: "Last 6 Months" },
]

function downloadCSV(data: RiskSummaryData, range: string) {
  const rangeLabel = DATE_RANGES.find((r) => r.value === range)?.label ?? range
  const lines: string[] = []

  lines.push("Sentinel Risk Summary Report")
  lines.push(`Date Range,${rangeLabel}`)
  lines.push(`Generated,${new Date().toISOString().split("T")[0]}`)
  lines.push("")

  lines.push("Overall Risk Score")
  lines.push(`Current Score,${data.overallRiskScore.current}`)
  lines.push(`Previous Score,${data.overallRiskScore.previous}`)
  lines.push(`Trend,${data.overallRiskScore.trend}`)
  lines.push(`Change,${data.overallRiskScore.percentChange}%`)
  lines.push("")

  lines.push("Risk Distribution")
  lines.push("Severity,Users")
  lines.push(`Critical,${data.riskDistribution.critical}`)
  lines.push(`High,${data.riskDistribution.high}`)
  lines.push(`Medium,${data.riskDistribution.medium}`)
  lines.push(`Low,${data.riskDistribution.low}`)
  lines.push("")

  lines.push("Risk Score Trend")
  lines.push("Date,Score")
  data.trendData.forEach((d: { date: string; score: number }) => 
    lines.push(`${d.date},${d.score}`)
  )
  lines.push("")

  lines.push("Top 5 Risks")
  lines.push("Category,Description,Severity,Affected Users,Impact")
  data.topRisks.forEach((r: { category: string; description: string; severity: string; affectedUsers: number; impact: string }) =>
    lines.push(
      `"${r.category}","${r.description}",${r.severity},${r.affectedUsers},"${r.impact}"`
    )
  )
  lines.push("")

  lines.push(`Training Effectiveness,${data.trainingEffectiveness}%`)
  lines.push(`Compliance Status,${data.complianceStatus}`)

  const blob = new Blob([lines.join("\n")], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `sentinel-risk-summary-${new Date().toISOString().split("T")[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function downloadPDF() {
  window.print()
}

export default function RiskSummaryReport() {
  const [range, setRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<RiskSummaryData | null>(() =>
    getRiskSummaryData("30d")
  )

  const handleRangeChange = useCallback((newRange: string) => {
    setRange(newRange)
    setIsLoading(true)
    // Simulate async fetch with loading skeleton
    setTimeout(() => {
      setData(getRiskSummaryData(newRange))
      setIsLoading(false)
    }, 800)
  }, [])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/reports">Reports</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Risk Summary</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-stretch gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center gap-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Risk Summary Report
              </h1>
              <p className="text-sm text-muted-foreground">
                Executive overview of security posture and trends
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => data && downloadCSV(data, range)}
              disabled={!data || isLoading}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span> CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={downloadPDF}
              disabled={!data || isLoading}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span> PDF
            </Button>
          </div>
        </div>

        {/* Date range selector */}
        <div className="flex items-center gap-2">
          <Calendar
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Select value={range} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-[200px] bg-card text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Report content */}
        {isLoading ? (
          <ReportSkeleton />
        ) : !data ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card py-16">
            <AlertTriangle
              className="h-10 w-10 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-card-foreground">
              No risk data available for selected date range
            </p>
            <p className="text-xs text-muted-foreground">
              Adjust date range or contact support
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Hero metric */}
            <HeroMetric
              current={data.overallRiskScore.current}
              previous={data.overallRiskScore.previous}
              trend={data.overallRiskScore.trend}
              percentChange={data.overallRiskScore.percentChange}
            />

            {/* Two column charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RiskDistributionChart distribution={data.riskDistribution} />
              <RiskTrendChart data={data.trendData} />
            </div>

            {/* Top risks table */}
            <TopRisksTable risks={data.topRisks} />

            {/* Bottom info cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TrainingEffectivenessCard
                effectiveness={data.trainingEffectiveness}
              />
              <ComplianceStatusCard status={data.complianceStatus} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
