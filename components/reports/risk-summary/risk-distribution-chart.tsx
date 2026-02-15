"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface RiskDistributionChartProps {
  distribution: {
    critical: number
    high: number
    medium: number
    low: number
  }
}

const SEVERITY_CONFIG = [
  { key: "critical", label: "Critical", color: "hsl(0, 84%, 60%)" },
  { key: "high", label: "High", color: "hsl(24, 95%, 53%)" },
  { key: "medium", label: "Medium", color: "hsl(37, 91%, 55%)" },
  { key: "low", label: "Low", color: "hsl(160, 84%, 39%)" },
] as const

export function RiskDistributionChart({
  distribution,
}: RiskDistributionChartProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)

  const data = SEVERITY_CONFIG.map((config) => ({
    name: config.label,
    value: distribution[config.key],
    color: config.color,
    percentage: Math.round(
      (distribution[config.key] / total) * 100
    ),
  }))

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Risk Distribution
        </CardTitle>
        <CardDescription>by severity level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-[200px] w-[200px] shrink-0" aria-label={`Risk distribution: ${data.map(d => `${d.name} ${d.value} users`).join(', ')}`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="hsl(0, 0%, 99.6%)"
                  strokeWidth={2}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload
                      return (
                        <div className="rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm">
                          <p className="font-medium text-card-foreground">
                            {item.name}
                          </p>
                          <p className="text-muted-foreground">
                            {item.value} users ({item.percentage}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-card-foreground">
                {total}
              </span>
              <span className="text-xs text-muted-foreground">Total Users</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}:{" "}
                  <span className="font-medium text-card-foreground">
                    {item.value}
                  </span>{" "}
                  ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
