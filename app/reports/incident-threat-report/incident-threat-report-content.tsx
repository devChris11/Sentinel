"use client"

import { useState, useCallback, useMemo, useEffect, useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, ChevronRight, Search } from "lucide-react"
import { MetricCards } from "@/components/reports/incident-threat-report/metric-cards"
import { CategoryChart } from "@/components/reports/incident-threat-report/category-chart"
import { SeverityChart } from "@/components/reports/incident-threat-report/severity-chart"
import { TrendChart } from "@/components/reports/incident-threat-report/trend-chart"
import { IncidentsTable } from "@/components/reports/incident-threat-report/incidents-table"
import { IncidentDetail } from "@/components/reports/incident-threat-report/incident-detail"
import { ReportFilters } from "@/components/reports/incident-threat-report/report-filters"
import {
  mockMetrics,
  mockCategoryBreakdown,
  mockSeverityDistribution,
  mockTrendData,
  mockIncidents,
  type Incident,
} from "@/lib/incident-threat-data"

interface Filters {
  dateRange: string
  severity: string
  category: string
  status: string
}

const DEFAULT_FILTERS: Filters = {
  dateRange: "Last 7 Days",
  severity: "All Severities",
  category: "All Categories",
  status: "All Statuses",
}

function formatStatusLabel(status: string): string {
  return status
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export function IncidentThreatReportContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [incidents, setIncidents] = useState(mockIncidents)
  const [sortBy, setSortBy] = useState<"recent" | "severity">("recent")
  const recentIncidentsSectionRef = useRef<HTMLElement>(null)
  const scrollPreserveRef = useRef<number | null>(null)

  const hasActiveFilters =
    filters.severity !== "All Severities" ||
    filters.category !== "All Categories" ||
    filters.status !== "All Statuses"

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      if (filters.severity !== "All Severities" && incident.severity !== filters.severity.toLowerCase()) return false
      if (filters.category !== "All Categories" && incident.category !== filters.category) return false
      if (filters.status !== "All Statuses" && formatStatusLabel(incident.status) !== filters.status) return false
      return true
    })
  }, [incidents, filters])

  const handleFilterChange = useCallback((key: keyof Filters, value: string) => {
    scrollPreserveRef.current = window.scrollY
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleClearFilters = useCallback(() => {
    scrollPreserveRef.current = window.scrollY
    setFilters(DEFAULT_FILTERS)
  }, [])

  const handleSortChange = useCallback((value: "recent" | "severity") => {
    scrollPreserveRef.current = window.scrollY
    setSortBy(value)
  }, [])

  const handleCategoryClick = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "All Categories" : category,
    }))
    recentIncidentsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSeverityClick = useCallback((severity: string) => {
    const severityLabel = severity.charAt(0).toUpperCase() + severity.slice(1)
    setFilters((prev) => ({
      ...prev,
      severity: prev.severity === severityLabel ? "All Severities" : severityLabel,
    }))
    recentIncidentsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleRowClick = useCallback((incident: Incident) => {
    setSelectedIncident(incident)
    setSidebarOpen(true)
  }, [])

  const handleStatusChange = useCallback((id: string, newStatus: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, status: newStatus as Incident["status"] } : inc
      )
    )
    setSidebarOpen(false)
    setSelectedIncident(null)
  }, [])

  const handleExportPDF = useCallback(() => {
    window.print()
  }, [])

  const handleExportCSV = useCallback(() => {
    const date = new Date().toISOString().split("T")[0]
    const lines: string[] = []

    lines.push("Sentinel Incident & Threat Intelligence Report")
    lines.push(`Generated,${date}`)
    lines.push("")

    const m = mockMetrics
    lines.push("Metrics")
    lines.push(`Total Incidents,${m.totalIncidents}`)
    lines.push(`Percent Change,${m.percentChange}%`)
    lines.push(`Mean Time to Detect,${m.meanTimeToDetect} hrs`)
    lines.push(`Mean Time to Respond,${m.meanTimeToRespond} hrs`)
    lines.push(`MTTD Change,${m.mttdChange}%`)
    lines.push(`MTTR Change,${m.mttrChange}%`)
    lines.push(`Resolution Rate,${m.resolutionRate}%`)
    lines.push(`Resolution Change,${m.resolutionChange}%`)
    lines.push(`Resolved Count,${m.resolvedCount}`)
    lines.push("")

    lines.push("Category Breakdown")
    lines.push("Category,Count,Percent Change")
    mockCategoryBreakdown.forEach((c) =>
      lines.push(`"${c.category.replace(/"/g, '""')}",${c.count},${c.percentChange}`)
    )
    lines.push("")

    lines.push("Severity Distribution")
    lines.push("Severity,Count")
    lines.push(`Critical,${mockSeverityDistribution.critical}`)
    lines.push(`High,${mockSeverityDistribution.high}`)
    lines.push(`Medium,${mockSeverityDistribution.medium}`)
    lines.push(`Low,${mockSeverityDistribution.low}`)
    lines.push("")

    lines.push("Incident Trend")
    lines.push("Date,Incidents")
    mockTrendData.forEach((t) => lines.push(`"${t.date}",${t.incidents}`))
    lines.push("")

    lines.push("Recent Incidents")
    lines.push("ID,Title,Category,Severity,Status,User,Department,Timestamp,Description")
    incidents.forEach((inc) =>
      lines.push(
        [
          inc.id,
          `"${inc.title.replace(/"/g, '""')}"`,
          inc.category,
          inc.severity,
          inc.status,
          inc.user.name,
          inc.user.department,
          inc.timestamp,
          `"${inc.description.substring(0, 100).replace(/"/g, '""')}..."`,
        ].join(",")
      )
    )

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sentinel-incident-threat-report-${date}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [incidents])

  const handleExportList = useCallback(() => {
    const headers = ["ID", "Title", "Category", "Severity", "Status", "User", "Department", "Timestamp", "Description"]
    const rows = filteredIncidents.map((inc) => [
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
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sentinel-incidents-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [filteredIncidents])

  useEffect(() => {
    if (searchParams.get("export") === "csv") {
      const headers = ["ID", "Title", "Category", "Severity", "Status", "User", "Department", "Timestamp", "Description"]
      const rows = filteredIncidents.map((inc) => [
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
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sentinel-incidents-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [searchParams, filteredIncidents])

  useLayoutEffect(() => {
    const y = scrollPreserveRef.current
    if (y == null) return
    scrollPreserveRef.current = null
    const id = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: Math.min(y, max), left: 0, behavior: "auto" })
    })
    return () => cancelAnimationFrame(id)
  }, [filteredIncidents, filters.dateRange, filters.severity, filters.category, filters.status, sortBy])

  return (
    <div className="min-h-screen bg-background" style={{ overflowAnchor: "none" }}>
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-content-text-muted" aria-label="Breadcrumb">
        <Link href="/reports" className="transition-colors hover:text-content-text-strong">
          Reports
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-content-text-strong">Incident & Threat Intelligence</span>
      </nav>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-content-text-strong">
              Incident & Threat Intelligence
            </h1>
            <p className="mt-1 text-sm text-content-text-muted">
              Security event analysis and response metrics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start print:hidden">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-content-border text-content-text hover:bg-content-bg-alt"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Export</span> CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-content-border text-content-text hover:bg-content-bg-alt"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Export</span> PDF
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <MetricCards metrics={mockMetrics} />
      </div>

      <div className="mb-6 flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 lg:w-[55%]">
          <CategoryChart
            data={mockCategoryBreakdown}
            activeCategory={filters.category !== "All Categories" ? filters.category : null}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <div className="min-w-0 flex-1 lg:w-[45%]">
          <SeverityChart
            data={mockSeverityDistribution}
            activeSeverity={filters.severity !== "All Severities" ? filters.severity.toLowerCase() : null}
            onSeverityClick={handleSeverityClick}
          />
        </div>
      </div>

      <div className="mb-6">
        <TrendChart data={mockTrendData} />
      </div>

      {/* Recent Incidents Section - title + Export List, then filters, then table */}
      <section ref={recentIncidentsSectionRef} className="pt-2">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-content-text-strong">
              Recent Incidents
            </h2>
            <span className="rounded-full bg-content-bg-alt px-2.5 py-1 text-sm font-medium text-content-text-muted">
              {filteredIncidents.length} incidents
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 print:hidden"
            onClick={handleExportList}
          >
            <Download className="h-4 w-4" aria-hidden />
            Export List
          </Button>
        </div>

        {/* Filters left, Sort by right */}
        <div className="mb-4 flex flex-col gap-3 print:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <ReportFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-content-text-muted">Sort by:</span>
              <Select value={sortBy} onValueChange={(v) => handleSortChange(v as "recent" | "severity")}>
                <SelectTrigger className="h-8 w-[140px] border-content-border bg-content-surface text-content-text text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="severity">Severity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <IncidentsTable
          key={`${filters.severity}-${filters.category}-${filters.status}-${sortBy}`}
          incidents={filteredIncidents}
          sortBy={sortBy}
          onRowClick={handleRowClick}
        />
      </section>

      <IncidentDetail
        incident={selectedIncident}
        open={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false)
          setSelectedIncident(null)
        }}
        onStatusChange={handleStatusChange}
      />
      </div>
    </div>
  )
}
