/**
 * Report export utilities for direct CSV download (no navigation).
 * Used by Recent Reports table to trigger single-action downloads.
 */

import { userBehaviorData } from "@/lib/user-behavior-data"
import { mockIncidents } from "@/lib/incident-threat-data"
import { getRiskSummaryData } from "@/lib/risk-summary-data"

function escapeCSVValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function triggerDownload(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadReportCSV(
  reportType: string | undefined,
  reportName: string
): boolean {
  const date = new Date().toISOString().split("T")[0]

  switch (reportType) {
    case "user-behavior-analytics": {
      const headers = ["Name", "Email", "Department", "Role", "Reporting Rate", "Time to Report", "Risk Level"]
      const rows = userBehaviorData.highRiskUsers.map((u) => [
        escapeCSVValue(u.name),
        escapeCSVValue(u.email),
        escapeCSVValue(u.department),
        escapeCSVValue(u.role),
        `${u.reportingRate}%`,
        `${u.timeToReport} hrs`,
        u.riskLevel,
      ])
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
      triggerDownload(csv, `sentinel-${reportName.toLowerCase().replace(/\s+/g, "-")}-${date}.csv`)
      return true
    }

    case "incident-threat-report": {
      const headers = ["ID", "Title", "Category", "Severity", "Status", "User", "Department", "Timestamp", "Description"]
      const rows = mockIncidents.map((inc) => [
        inc.id,
        `"${inc.title.replace(/"/g, '""')}"`,
        inc.category,
        inc.severity,
        inc.status,
        inc.user.name,
        inc.user.department,
        inc.timestamp,
        `"${inc.description.substring(0, 100).replace(/"/g, '""')}..."`,
      ])
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
      triggerDownload(csv, `sentinel-incidents-${date}.csv`)
      return true
    }

    case "risk-summary": {
      const data = getRiskSummaryData("30d")
      const lines: string[] = []
      lines.push("Sentinel Risk Summary Report")
      lines.push("Date Range,Last 30 Days")
      lines.push(`Generated,${date}`)
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
      data.trendData.forEach((d) => lines.push(`${d.date},${d.score}`))
      lines.push("")
      lines.push("Top 5 Risks")
      lines.push("Category,Description,Severity,Affected Users,Impact")
      data.topRisks.forEach((r) =>
        lines.push(`"${r.category}","${r.description}",${r.severity},${r.affectedUsers},"${r.impact}"`)
      )
      lines.push("")
      lines.push(`Training Effectiveness,${data.trainingEffectiveness}%`)
      lines.push(`Compliance Status,${data.complianceStatus}`)
      triggerDownload(lines.join("\n"), `sentinel-risk-summary-${date}.csv`)
      return true
    }

    default:
      return false
  }
}

/** Derive reportType from route for reports that don't have it explicitly */
export function getReportTypeFromRoute(route?: string): string | undefined {
  if (!route) return undefined
  const match = route.match(/\/reports\/([^/?]+)/)
  return match ? match[1] : undefined
}
