"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ChartDataPoint } from "@/lib/dashboard-data"

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-[#64748B]">{label}</p>
      <p className="text-sm font-semibold text-[#0F172A]">
        Risk Score: {payload[0].value}
      </p>
    </div>
  )
}

export function RiskTrendChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Risk Score Trend
          </h3>
          <p className="text-sm text-[#64748B]">7-day rolling average</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-md p-1.5 hover:bg-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Chart actions"
          >
            <MoreVertical className="h-4 w-4 text-[#64748B]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export CSV</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      <div className="p-6" style={{ minHeight: 320 }}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickLine={false}
              axisLine={false}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={7}
              stroke="#EF4444"
              strokeDasharray="6 4"
              label={{
                value: "Danger Threshold",
                position: "insideTopRight",
                fontSize: 11,
                fill: "#EF4444",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
