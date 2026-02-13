"use client"

import { useState, useMemo } from "react"
import { Calendar, ShieldAlert } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getDashboardData, getLastUpdatedTimestamp } from "@/lib/dashboard-data"
import type { DateRange } from "@/lib/dashboard-data"
import { StatCard } from "@/components/dashboard/stat-card"
import { RiskTrendChart } from "@/components/dashboard/risk-trend-chart"
import { IncidentChart } from "@/components/dashboard/incident-chart"
import { AlertsTable } from "@/components/dashboard/alerts-table"

const dateRangeLabels: Record<DateRange, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>("7d")
  const [lastUpdated, setLastUpdated] = useState(getLastUpdatedTimestamp())

  const data = useMemo(() => getDashboardData(dateRange), [dateRange])

  function handleDateRangeChange(value: string) {
    setDateRange(value as DateRange)
    // Simulate timestamp update
    const now = new Date()
    const formatted = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
      " at " +
      now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    setLastUpdated(formatted)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        {/* Header */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] text-balance">
                Dashboard Overview
              </h1>
              <p className="text-sm text-[#64748B]">
                Real-time security intelligence and risk monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#64748B]">
              Last updated: {lastUpdated}
            </span>
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger
                className="w-[180px] border-[#E2E8F0] bg-[#FEFEFE] text-content-text"
                aria-label="Select date range"
              >
                <Calendar className="mr-2 h-4 w-4 text-[#64748B]" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(dateRangeLabels) as [DateRange, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" aria-label="Key metrics">
          {data.metrics.map((metric) => (
            <StatCard key={metric.id} metric={metric} />
          ))}
        </section>

        {/* Charts */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2" aria-label="Charts">
          <RiskTrendChart data={data.riskTrend} />
          <IncidentChart data={data.incidents} />
        </section>

        {/* Alerts Table */}
        <div className="mt-6">
          <AlertsTable alerts={data.alerts} />
        </div>
      </main>
    </div>
  )
}
