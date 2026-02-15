"use client"

import { Card } from "@/components/ui/card"
import type { CategoryBreakdown } from "@/lib/incident-threat-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"

interface CategoryChartProps {
  data: CategoryBreakdown[]
  activeCategory: string | null
  onCategoryClick: (category: string) => void
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CategoryBreakdown }> }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="rounded-lg border border-content-border bg-content-surface px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-content-text-strong">{item.category}</p>
      <p className="text-sm text-content-text">
        {item.count} incidents
        <span className={`ml-1.5 text-xs font-medium ${item.percentChange > 0 ? "text-danger" : item.percentChange < 0 ? "text-success" : "text-content-text-muted"}`}>
          ({item.percentChange > 0 ? "+" : ""}{item.percentChange}% vs last week)
        </span>
      </p>
    </div>
  )
}

function ChangeLabel({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: number }) {
  if (value === undefined || Math.abs(value) <= 10) return null
  const isPositive = value > 0
  return (
    <text
      x={(x ?? 0) + (width ?? 0) / 2}
      y={(y ?? 0) - 8}
      textAnchor="middle"
      className="text-[10px] font-medium"
      fill={isPositive ? "var(--color-danger)" : "var(--color-success)"}
    >
      {isPositive ? "+" : ""}{value}%
    </text>
  )
}

export function CategoryChart({ data, activeCategory, onCategoryClick }: CategoryChartProps) {
  return (
    <Card className="bg-content-surface border-content-border p-6 flex-1 min-w-0">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-content-text-strong">Incidents by Category</h3>
        <p className="text-xs text-content-text-muted mt-0.5">7-day distribution</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: "var(--color-content-text)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-content-text)" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 16]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-accent)" }} />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              maxBarSize={44}
              onClick={(_: unknown, index: number) => {
                const item = data[index]
                if (item?.category) onCategoryClick(item.category)
              }}
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeCategory === entry.category ? "var(--color-primary)" : "var(--chart-1)"}
                  opacity={activeCategory && activeCategory !== entry.category ? 0.4 : 1}
                />
              ))}
              <LabelList dataKey="percentChange" content={<ChangeLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
