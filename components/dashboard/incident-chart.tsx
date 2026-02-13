"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { MoreVertical, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import type { IncidentCategory } from "@/lib/dashboard-data"
import { ChartDetailModal } from "./chart-detail-modal"

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: IncidentCategory }>
}) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-[#64748B]">{d.fullName}</p>
      <p className="text-sm font-semibold text-[#0F172A]">
        Count: {d.count}
      </p>
    </div>
  )
}

export function IncidentChart({ data }: { data: IncidentCategory[] }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleExportCSV = () => {
    const csvContent = [
      ['Category', 'Count'],
      ...data.map(d => [d.fullName, d.count])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'incident-data-export.csv'
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Incident data exported successfully')
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    toast.success('Chart refreshed')
  }

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Incident Breakdown
          </h3>
          <p className="text-sm text-[#64748B]">by category</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-md p-1.5 hover:bg-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Chart actions"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 text-[#64748B] animate-spin" />
            ) : (
              <MoreVertical className="h-4 w-4 text-[#64748B]" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportCSV}>Export CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDetailOpen(true)}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRefresh}>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      <div className="p-6" style={{ minHeight: 320 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 48, left: -8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: "#64748B", dy: 8 }}
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              angle={-25}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F1F5F9" }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail Modal */}
      <ChartDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Incident Breakdown - Detailed View"
        chartType="bar"
        data={data}
      />
    </div>
  )
}
