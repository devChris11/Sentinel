"use client"

import { useState, useMemo, useEffect } from "react"
import { Calendar, LayoutDashboard } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"

const dateRangeLabels: Record<DateRange, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
}

// Skeleton Components
function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] p-6 shadow-sm">
      <Skeleton className="h-4 w-32 mb-3" />
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm">
      <div className="border-b border-[#E2E8F0] px-6 py-4">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="p-6">
        <Skeleton className="h-[320px] w-full rounded-md" />
      </div>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div>
      <Skeleton className="h-7 w-48 mb-4" />
      <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm p-6">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>("7d")
  const [lastUpdated, setLastUpdated] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const data = useMemo(() => getDashboardData(dateRange), [dateRange])
  
  // SESSION-ONLY state for alerts - resets on page refresh
  const [alerts, setAlerts] = useState(data.alerts)

  // Sync alerts when date range changes
  useEffect(() => {
    setAlerts(data.alerts)
  }, [data.alerts])

  // Initialize timestamp on client side only (prevents hydration mismatch)
  useEffect(() => {
    setLastUpdated(getLastUpdatedTimestamp())
  }, [])

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

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
              <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
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
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </>
          ) : (
            data.metrics.map((metric) => (
              <StatCard key={metric.id} metric={metric} />
            ))
          )}
        </section>

        {/* Charts */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2" aria-label="Charts">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <RiskTrendChart data={data.riskTrend} />
              <IncidentChart data={data.incidents} />
            </>
          )}
        </section>

        {/* Alerts Table */}
        <div className="mt-6">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <AlertsTable alerts={alerts} setAlerts={setAlerts} />
          )}
        </div>
      </main>
    </div>
  )
}
