"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface RiskTrendChartProps {
  data: Array<{ date: string; score: number }>
}

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Risk Score Trend
        </CardTitle>
        <CardDescription>6-month rolling average</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full" aria-label="Risk score trend chart showing scores over time">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(239, 84%, 67%)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(239, 84%, 67%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(214, 32%, 91%)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }}
                tickLine={false}
                axisLine={false}
                tickCount={6}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm">
                        <p className="font-medium text-card-foreground">
                          {label}
                        </p>
                        <p className="text-muted-foreground">
                          Score: {(payload[0].value as number).toFixed(1)}/10
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <ReferenceLine
                y={7}
                stroke="hsl(0, 84%, 60%)"
                strokeDasharray="6 4"
                label={{
                  value: "Danger Threshold",
                  position: "insideTopRight",
                  fill: "hsl(0, 84%, 60%)",
                  fontSize: 11,
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(239, 84%, 67%)"
                strokeWidth={2}
                fill="url(#riskGradient)"
                dot={{
                  r: 3,
                  fill: "hsl(239, 84%, 67%)",
                  stroke: "hsl(0, 0%, 99.6%)",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "hsl(239, 84%, 67%)",
                  stroke: "hsl(0, 0%, 99.6%)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
