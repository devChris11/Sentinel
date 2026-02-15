"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts"
import type { DepartmentData } from "@/lib/user-behavior-data"

interface DepartmentChartProps {
  data: DepartmentData[]
  companyAvg: number
  selectedDepartment: string | null
  onDepartmentClick: (department: string) => void
}

/** Color coding: green ≥85%, amber 70-84%, red <70% - uses Sentinel tokens */
function getBarColor(rate: number) {
  if (rate >= 85) return "var(--color-success)"
  if (rate >= 70) return "var(--color-warning)"
  return "var(--color-danger)"
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DepartmentData }> }) {
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md" role="tooltip">
      <p className="text-sm font-semibold text-popover-foreground">{d.department}</p>
      <p className="text-sm text-muted-foreground">
        Reporting Rate: <span className="font-medium text-popover-foreground">{d.reportingRate}%</span>
      </p>
      <p className="text-xs text-muted-foreground">
        {d.usersNeedingTraining} users need training
      </p>
    </div>
  )
}

export function DepartmentChart({ data, companyAvg, selectedDepartment, onDepartmentClick }: DepartmentChartProps) {
  const sortedData = [...data].sort((a, b) => b.reportingRate - a.reportingRate)

  return (
    <Card className="border-content-border bg-content-surface p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-content-text-strong">Department Performance</h3>
        <p className="text-xs text-content-text-muted">Phishing simulation reporting rates</p>
      </div>
      <ResponsiveContainer width="100%" height={280} aria-label="Department reporting rates bar chart">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
          barCategoryGap="20%"
          role="img"
          aria-label="Department reporting rates"
        >
          <CartesianGrid horizontal={false} stroke="var(--color-content-border)" strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "var(--color-content-text-muted)" }}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="department"
            width={90}
            tick={{ fontSize: 13, fill: "var(--color-content-text)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-accent)", opacity: 0.5 }} />
          <ReferenceLine
            x={companyAvg}
            stroke="var(--color-content-text-muted)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: `Avg ${companyAvg}%`,
              position: "top",
              fill: "var(--color-content-text-muted)",
              fontSize: 11,
            }}
          />
          <Bar
            dataKey="reportingRate"
            radius={[0, 4, 4, 0]}
            maxBarSize={36}
            onClick={(data: unknown) => {
              const payload = (data as { payload?: DepartmentData })?.payload
              if (payload?.department) onDepartmentClick(payload.department)
            }}
            className="cursor-pointer"
            aria-label="Department reporting rates, click to filter"
          >
            {sortedData.map((entry) => (
              <Cell
                key={entry.department}
                fill={getBarColor(entry.reportingRate)}
                opacity={selectedDepartment && selectedDepartment !== entry.department ? 0.4 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
