"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
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
import type { ChartDataPoint, IncidentCategory } from "@/lib/dashboard-data"
import { X } from "lucide-react"

interface ChartDetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  chartType: "line" | "bar"
  data: ChartDataPoint[] | IncidentCategory[]
}

export function ChartDetailModal({
  isOpen,
  onClose,
  title,
  chartType,
  data,
}: ChartDetailModalProps) {
  const isLineChart = chartType === "line"
  const lineData = isLineChart ? (data as ChartDataPoint[]) : []
  const barData = !isLineChart ? (data as IncidentCategory[]) : []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FEFEFE] border-[#E2E8F0]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0F172A] pr-8">
            {title}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-[#64748B]" />
          </button>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Larger Chart */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-6">
            <ResponsiveContainer width="100%" height={400}>
              {isLineChart ? (
                <LineChart data={lineData} margin={{ top: 8, right: 8, bottom: 8, left: -8 }}>
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
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null
                      return (
                        <div className="rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] px-3 py-2 shadow-md">
                          <p className="text-xs font-medium text-[#64748B]">{label}</p>
                          <p className="text-sm font-semibold text-[#0F172A]">
                            Risk Score: {payload[0].value}
                          </p>
                        </div>
                      )
                    }}
                  />
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
              ) : (
                <BarChart
                  data={barData}
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
                  <Tooltip
                    content={({ active, payload }) => {
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
                    }}
                    cursor={{ fill: "#F1F5F9" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h4 className="text-lg font-semibold text-[#0F172A]">Data Table</h4>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {isLineChart ? (
                    <>
                      <TableHead className="text-[#64748B]">Date</TableHead>
                      <TableHead className="text-[#64748B]">Risk Score</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="text-[#64748B]">Category</TableHead>
                      <TableHead className="text-[#64748B]">Count</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLineChart
                  ? lineData.map((item, idx) => (
                      <TableRow key={idx} className="hover:bg-[#F8FAFC]">
                        <TableCell className="text-[#475569]">{item.date}</TableCell>
                        <TableCell className="text-[#0F172A] font-medium">{item.value}</TableCell>
                      </TableRow>
                    ))
                  : barData.map((item, idx) => (
                      <TableRow key={idx} className="hover:bg-[#F8FAFC]">
                        <TableCell className="text-[#475569]">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 rounded-sm"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.fullName}
                          </div>
                        </TableCell>
                        <TableCell className="text-[#0F172A] font-medium">{item.count}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
