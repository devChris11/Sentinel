"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSeverity, setActiveSeverity] = useState<string | null>(null)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [incidents, setIncidents] = useState(mockIncidents)

  const hasActiveFilters =
    filters.severity !== "All Severities" ||
    filters.category !== "All Categories" ||
    filters.status !== "All Statuses" ||
    activeCategory !== null ||
    activeSeverity !== null

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      if (filters.severity !== "All Severities" && incident.severity !== filters.severity.toLowerCase()) return false
      if (filters.category !== "All Categories" && incident.category !== filters.category) return false
      if (filters.status !== "All Statuses" && formatStatusLabel(incident.status) !== filters.status) return false
      if (activeCategory && incident.category !== activeCategory) return false
      if (activeSeverity && incident.severity !== activeSeverity) return false
      return true
    })
  }, [incidents, filters, activeCategory, activeSeverity])

  const handleFilterChange = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    if (key === "category") setActiveCategory(null)
    if (key === "severity") setActiveSeverity(null)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setActiveCategory(null)
    setActiveSeverity(null)
  }, [])

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category))
    setFilters((prev) => ({ ...prev, category: "All Categories" }))
  }, [])

  const handleSeverityClick = useCallback((severity: string) => {
    setActiveSeverity((prev) => (prev === severity ? null : severity))
    setFilters((prev) => ({ ...prev, severity: "All Severities" }))
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

  const handleExportCSV = useCallback(() => {
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

  const activeFilterChips: Array<{ label: string; onRemove: () => void }> = []
  if (activeCategory) {
    activeFilterChips.push({
      label: `Category: ${activeCategory}`,
      onRemove: () => setActiveCategory(null),
    })
  }
  if (activeSeverity) {
    activeFilterChips.push({
      label: `Severity: ${activeSeverity.charAt(0).toUpperCase() + activeSeverity.slice(1)}`,
      onRemove: () => setActiveSeverity(null),
    })
  }

  return (
    <div className="min-h-screen bg-background">
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
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 border-content-border text-content-text hover:bg-content-bg-alt"
          onClick={handleExportCSV}
        >
          <Download className="mr-1.5 h-4 w-4" aria-hidden />
          Export CSV
        </Button>
      </div>

      <div className="mb-6">
        <ReportFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
        {activeFilterChips.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-content-text-muted">Active filters:</span>
            {activeFilterChips.map((chip) => (
              <Badge
                key={chip.label}
                variant="secondary"
                className="cursor-pointer border-primary/20 bg-primary/10 text-xs text-primary transition-colors hover:bg-primary/20"
                onClick={chip.onRemove}
              >
                {chip.label} ×
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <MetricCards metrics={mockMetrics} />
      </div>

      <div className="mb-6 flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 lg:w-[55%]">
          <CategoryChart
            data={mockCategoryBreakdown}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <div className="min-w-0 flex-1 lg:w-[45%]">
          <SeverityChart
            data={mockSeverityDistribution}
            activeSeverity={activeSeverity}
            onSeverityClick={handleSeverityClick}
          />
        </div>
      </div>

      <div className="mb-6">
        <TrendChart data={mockTrendData} />
      </div>

      <IncidentsTable
        key={`${filters.severity}-${filters.category}-${filters.status}-${activeCategory ?? ""}-${activeSeverity ?? ""}`}
        incidents={filteredIncidents}
        onRowClick={handleRowClick}
      />

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
