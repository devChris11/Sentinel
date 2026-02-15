"use client"

import { Card } from "@/components/ui/card"
import type { SeverityDistribution } from "@/lib/incident-threat-data"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface SeverityChartProps {
  data: SeverityDistribution
  activeSeverity: string | null
  onSeverityClick: (severity: string) => void
}

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "var(--color-danger)",
  High: "var(--color-orange)",
  Medium: "var(--color-warning)",
  Low: "var(--color-success)",
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { percent: number } }> }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="rounded-lg border border-content-border bg-content-surface px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-content-text-strong">{item.name}</p>
      <p className="text-sm text-content-text">
        {item.value} incidents ({Math.round(item.payload.percent)}%)
      </p>
    </div>
  )
}

export function SeverityChart({ data, activeSeverity, onSeverityClick }: SeverityChartProps) {
  const total = data.critical + data.high + data.medium + data.low
  const chartData = [
    { name: "Critical", value: data.critical, percent: (data.critical / total) * 100 },
    { name: "High", value: data.high, percent: (data.high / total) * 100 },
    { name: "Medium", value: data.medium, percent: (data.medium / total) * 100 },
    { name: "Low", value: data.low, percent: (data.low / total) * 100 },
  ]

  return (
    <Card className="bg-content-surface border-content-border p-6 flex-1 min-w-0">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-content-text-strong">Severity Distribution</h3>
        <p className="text-xs text-content-text-muted mt-0.5">Incident priority levels</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative h-[280px] w-[280px] shrink-0">
          <div className="absolute inset-0 z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                dataKey="value"
                stroke="var(--color-content-surface)"
                strokeWidth={2}
                onClick={(entry) => onSeverityClick(entry.name.toLowerCase())}
                className="cursor-pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={SEVERITY_COLORS[entry.name]}
                    opacity={activeSeverity && activeSeverity !== entry.name.toLowerCase() ? 0.35 : 1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 50 }} />
            </PieChart>
          </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-content-text-strong">{total}</span>
            <span className="text-xs text-content-text-muted">Total</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {chartData.map((item) => (
            <button
              key={item.name}
              onClick={() => onSeverityClick(item.name.toLowerCase())}
              className={`flex items-center gap-2.5 text-left transition-opacity ${activeSeverity && activeSeverity !== item.name.toLowerCase() ? "opacity-40" : "opacity-100"}`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: SEVERITY_COLORS[item.name] }}
              />
              <span className="text-sm text-content-text">
                {item.name}: {item.value}{" "}
                <span className="text-content-text-muted">({Math.round(item.percent)}%)</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
