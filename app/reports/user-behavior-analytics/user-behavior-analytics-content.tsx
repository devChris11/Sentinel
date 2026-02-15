"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ChevronRight, Target, X } from "lucide-react"
import { MetricsCards } from "@/components/reports/user-behavior-analytics/metrics-cards"
import { DepartmentChart } from "@/components/reports/user-behavior-analytics/department-chart"
import { TrendChart } from "@/components/reports/user-behavior-analytics/trend-chart"
import { BehavioralInsights } from "@/components/reports/user-behavior-analytics/behavioral-insights"
import { HighRiskTable } from "@/components/reports/user-behavior-analytics/high-risk-table"
import { ReportFilters, type FilterState } from "@/components/reports/user-behavior-analytics/report-filters"
import { UserSearchPopover } from "@/components/reports/user-behavior-analytics/user-search-popover"
import { userBehaviorData } from "@/lib/user-behavior-data"

const defaultFilters: FilterState = {
  department: "All Departments",
  role: "All Roles",
  dateRange: "90",
  search: "",
}

/** Escapes CSV values (commas, quotes) for proper export */
function escapeCSVValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function UserBehaviorAnalyticsContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const hasActiveFilters =
    filters.department !== "All Departments" ||
    filters.role !== "All Roles" ||
    filters.dateRange !== "90" ||
    filters.search !== "" ||
    selectedDepartment !== null ||
    selectedUserIds.length > 0

  const activeDepartmentFilter = selectedDepartment || (filters.department !== "All Departments" ? filters.department : null)

  const filteredUsers = useMemo(() => {
    const result = userBehaviorData.highRiskUsers

    if (selectedUserIds.length > 0) {
      return result.filter((user) => selectedUserIds.includes(user.id))
    }

    return result.filter((user) => {
      if (activeDepartmentFilter && user.department !== activeDepartmentFilter) return false
      if (filters.role !== "All Roles" && user.role !== filters.role) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !user.name.toLowerCase().includes(q) &&
          !user.email.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [selectedUserIds, activeDepartmentFilter, filters.role, filters.search])

  const handleDepartmentClick = useCallback((department: string) => {
    setSelectedDepartment((prev) => (prev === department ? null : department))
    setSelectedUserIds([])
  }, [])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setSelectedDepartment(null)
    setSelectedUserIds([])
  }, [])

  const clearChartFilter = useCallback(() => {
    setSelectedDepartment(null)
  }, [])

  const handleExportCSV = useCallback(() => {
    const headers = ["Name", "Email", "Department", "Role", "Reporting Rate", "Time to Report", "Risk Level"]
    const rows = filteredUsers.map((u) => [
      escapeCSVValue(u.name),
      escapeCSVValue(u.email),
      escapeCSVValue(u.department),
      escapeCSVValue(u.role),
      `${u.reportingRate}%`,
      `${u.timeToReport} hrs`,
      u.riskLevel,
    ])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sentinel-high-risk-users-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [filteredUsers])

  useEffect(() => {
    if (searchParams.get("export") === "csv") {
      const headers = ["Name", "Email", "Department", "Role", "Reporting Rate", "Time to Report", "Risk Level"]
      const rows = filteredUsers.map((u) => [
        escapeCSVValue(u.name),
        escapeCSVValue(u.email),
        escapeCSVValue(u.department),
        escapeCSVValue(u.role),
        `${u.reportingRate}%`,
        `${u.timeToReport} hrs`,
        u.riskLevel,
      ])
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sentinel-high-risk-users-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
      window.history.replaceState({}, "", "/reports/user-behavior-analytics")
    }
  }, [searchParams, filteredUsers])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-content-text-muted">
          <Link href="/reports" className="transition-colors hover:text-content-text-strong">
            Reports
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="text-content-text-strong">User Behavior Analytics</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-content-text-strong">
                User Behavior Analytics
              </h1>
              <p className="text-sm text-content-text-muted">
                Training effectiveness and phishing awareness metrics
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleExportCSV} className="gap-1.5 self-start border-content-border">
            <Download className="h-4 w-4" aria-hidden />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <ReportFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          hasActiveFilters={hasActiveFilters}
          userSearch={
            <UserSearchPopover
              users={userBehaviorData.highRiskUsers}
              selectedUserIds={selectedUserIds}
              onSelectionChange={setSelectedUserIds}
            />
          }
        />

        {/* Active Chart Filter Chip */}
        {selectedDepartment && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Department: {selectedDepartment}
              <button
                onClick={clearChartFilter}
                className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-primary/20"
                aria-label={`Remove ${selectedDepartment} filter`}
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          </div>
        )}

        {/* Metrics Dashboard */}
        <MetricsCards data={userBehaviorData.summary} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <DepartmentChart
              data={userBehaviorData.departmentBreakdown}
              companyAvg={userBehaviorData.summary.avgReportingRate}
              selectedDepartment={selectedDepartment}
              onDepartmentClick={handleDepartmentClick}
            />
          </div>
          <div className="lg:col-span-2">
            <TrendChart data={userBehaviorData.trendData} />
          </div>
        </div>

        {/* Behavioral Insights */}
        <BehavioralInsights
          departments={userBehaviorData.departmentBreakdown}
          companyAvg={userBehaviorData.summary.avgReportingRate}
        />

        {/* High-Risk Users Table - key resets pagination when filters change */}
        <HighRiskTable
          key={`${activeDepartmentFilter}-${filters.role}-${filters.search}-${selectedUserIds.join(",")}`}
          users={filteredUsers}
          onExportCSV={handleExportCSV}
        />
      </div>
    </div>
  )
}
