"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { TrendDataPoint } from "@/lib/user-behavior-data"

interface TrendChartProps {
  data: TrendDataPoint[]
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color: string }>
  label?: string
}) {
  if (!active || !payload || !payload.length) return null
  const company = payload.find((p) => p.dataKey === "reportingRate")
  const industry = payload.find((p) => p.dataKey === "industryBenchmark")
  const diff = company && industry ? company.value - industry.value : 0

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md" role="tooltip">
      <p className="mb-1 text-sm font-semibold text-popover-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-xs text-muted-foreground" style={{ color: entry.color }}>
          {entry.dataKey === "reportingRate"
            ? "Your Company"
            : entry.dataKey === "companyAvg"
              ? "Company Avg"
              : "Industry Benchmark"}: {entry.value}%
        </p>
      ))}
      {diff !== 0 && (
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          +{diff}% vs industry
        </p>
      )}
    </div>
  )
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <Card className="border-content-border bg-content-surface p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-content-text-strong">Reporting Rate Trend</h3>
        <p className="text-xs text-content-text-muted">Weekly progress tracking</p>
      </div>
      <ResponsiveContainer width="100%" height={280} aria-label="Reporting rate trend line chart">
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }} role="img" aria-label="Weekly reporting rate trend">
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                reportingRate: "Your Company",
                companyAvg: "Company Avg",
                industryBenchmark: "Industry Benchmark",
              }
              return (
                <span className="text-xs text-content-text">{labels[value] || value}</span>
              )
            }}
          />
          <Line
            type="monotone"
            dataKey="reportingRate"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "var(--chart-1)" }}
            activeDot={{ r: 5 }}
            name="reportingRate"
          />
          <Line
            type="monotone"
            dataKey="companyAvg"
            stroke="var(--color-muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            name="companyAvg"
          />
          <Line
            type="monotone"
            dataKey="industryBenchmark"
            stroke="var(--chart-2)"
            strokeWidth={1.5}
            strokeDasharray="8 4"
            dot={false}
            name="industryBenchmark"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
