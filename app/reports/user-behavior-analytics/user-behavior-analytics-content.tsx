"use client"

import { useState, useMemo, useCallback, useEffect, useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ChevronRight, Target } from "lucide-react"
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
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const highRiskSectionRef = useRef<HTMLElement>(null)
  const scrollPreserveRef = useRef<number | null>(null)

  const hasActiveFilters =
    filters.department !== "All Departments" ||
    filters.role !== "All Roles" ||
    filters.dateRange !== "90" ||
    filters.search !== "" ||
    selectedUserIds.length > 0

  const activeDepartmentFilter = filters.department !== "All Departments" ? filters.department : null

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
    setFilters((prev) => ({
      ...prev,
      department: prev.department === department ? "All Departments" : department,
    }))
    setSelectedUserIds([])
    highRiskSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    scrollPreserveRef.current = window.scrollY
    setFilters(newFilters)
    setSelectedUserIds([])
  }, [])

  const handleSelectionChange = useCallback((userIds: string[]) => {
    scrollPreserveRef.current = window.scrollY
    setSelectedUserIds(userIds)
  }, [])

  const handleExportPDF = useCallback(() => {
    window.print()
  }, [])

  const handleExportCSV = useCallback(() => {
    const date = new Date().toISOString().split("T")[0]
    const lines: string[] = []

    lines.push("Sentinel User Behavior Analytics Report")
    lines.push(`Generated,${date}`)
    lines.push("")

    const s = userBehaviorData.summary
    lines.push("Summary Metrics")
    lines.push(`Average Reporting Rate,${s.avgReportingRate}%`)
    lines.push(`Reporting Rate Change,${s.avgReportingRateChange}%`)
    lines.push(`Average Time to Report,${s.avgTimeToReport} hrs`)
    lines.push(`Time to Report Change,${s.avgTimeToReportChange}%`)
    lines.push(`Training Completion,${s.trainingCompletion}%`)
    lines.push(`Training Completion Change,${s.trainingCompletionChange}%`)
    lines.push(`Real Threat Reports,${s.realThreatReports}`)
    lines.push(`Real Threat Reports Change,${s.realThreatReportsChange}%`)
    lines.push("")

    lines.push("Department Breakdown")
    lines.push("Department,Reporting Rate,User Count,Users Needing Training,Trend")
    userBehaviorData.departmentBreakdown.forEach((d) =>
      lines.push(`${escapeCSVValue(d.department)},${d.reportingRate},${d.userCount},${d.usersNeedingTraining},${d.trend}`)
    )
    lines.push("")

    lines.push("Reporting Rate Trend")
    lines.push("Week,Reporting Rate,Company Avg,Industry Benchmark")
    userBehaviorData.trendData.forEach((t) =>
      lines.push(`${escapeCSVValue(t.week)},${t.reportingRate},${t.companyAvg},${t.industryBenchmark}`)
    )
    lines.push("")

    lines.push("High-Risk Users")
    lines.push("Name,Email,Department,Role,Reporting Rate,Time to Report,Risk Level")
    userBehaviorData.highRiskUsers.forEach((u) =>
      lines.push(
        [escapeCSVValue(u.name), escapeCSVValue(u.email), escapeCSVValue(u.department), escapeCSVValue(u.role), `${u.reportingRate}%`, `${u.timeToReport} hrs`, u.riskLevel].join(",")
      )
    )

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sentinel-user-behavior-analytics-${date}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const handleExportList = useCallback(() => {
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

  useLayoutEffect(() => {
    const y = scrollPreserveRef.current
    if (y == null) return
    scrollPreserveRef.current = null
    const id = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: Math.min(y, max), left: 0, behavior: "auto" })
    })
    return () => cancelAnimationFrame(id)
  }, [filteredUsers, filters.department, filters.role, filters.search, selectedUserIds])

  return (
    <div className="min-h-screen bg-background" style={{ overflowAnchor: "none" }}>
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 space-y-6">
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

        {/* Metrics Dashboard */}
        <MetricsCards data={userBehaviorData.summary} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <DepartmentChart
              data={userBehaviorData.departmentBreakdown}
              companyAvg={userBehaviorData.summary.avgReportingRate}
              selectedDepartment={activeDepartmentFilter}
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

        {/* High-Risk Users Section - title + pill | Export, then filters, then table */}
        <section ref={highRiskSectionRef} className="pt-10">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-content-text-strong">
                High-Risk Users Requiring Attention
              </h2>
              <span className="rounded-full bg-danger/10 px-2.5 py-1 text-xs font-medium text-danger">
                {filteredUsers.length} users
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportList} className="gap-1.5 print:hidden">
              <Download className="h-4 w-4" aria-hidden />
              Export List
            </Button>
          </div>

          {/* Filters and search - below title, above table */}
          <div className="mb-4">
            <ReportFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              hasActiveFilters={hasActiveFilters}
              departments={["All Departments", ...userBehaviorData.departmentBreakdown.map((d) => d.department)]}
              userSearch={
                <UserSearchPopover
                  users={userBehaviorData.highRiskUsers}
                  selectedUserIds={selectedUserIds}
                  onSelectionChange={handleSelectionChange}
                />
              }
            />
          </div>

          {/* High-Risk Users Table - key resets pagination when filters change */}
          <HighRiskTable
            key={`${activeDepartmentFilter}-${filters.role}-${filters.search}-${selectedUserIds.join(",")}`}
            users={filteredUsers}
          />
        </section>
      </div>
    </div>
  )
}
