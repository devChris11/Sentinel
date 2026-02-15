"use client"

import { Card } from "@/components/ui/card"
import type { TrendDataPoint } from "@/lib/incident-threat-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface TrendChartProps {
  data: TrendDataPoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-content-border bg-content-surface px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-content-text-strong">{label}</p>
      <p className="text-sm text-content-text">{payload[0].value} incidents</p>
    </div>
  )
}

export function TrendChart({ data }: TrendChartProps) {
  const avg = data.length > 0 ? Math.round((data.reduce((sum, d) => sum + d.incidents, 0) / data.length) * 10) / 10 : 0

  return (
    <Card className="bg-content-surface border-content-border p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-content-text-strong">Incident Volume Trend</h3>
        <p className="text-xs text-content-text-muted mt-0.5">Daily incident count</p>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--color-content-text)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-content-text)" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 8]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={avg}
              stroke="var(--color-content-text-muted)"
              strokeDasharray="6 4"
              strokeWidth={1}
              label={{
                value: `Weekly Avg (${avg})`,
                position: "insideTopRight",
                fill: "var(--color-content-text)",
                fontSize: 11,
              }}
            />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="var(--color-danger)"
              strokeWidth={2}
              fill="url(#incidentGradient)"
              dot={{ r: 4, fill: "var(--color-danger)", stroke: "var(--color-content-surface)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "var(--color-danger)", stroke: "var(--color-content-surface)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
