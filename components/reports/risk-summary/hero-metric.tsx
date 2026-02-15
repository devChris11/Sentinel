"use client"

import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HeroMetricProps {
  current: number
  previous: number
  trend: "up" | "down" | "stable"
  percentChange: number
}

function getScoreColor(score: number) {
  if (score <= 3) return "text-success"
  if (score <= 6) return "text-warning"
  if (score <= 8) return "text-orange"
  return "text-danger"
}

export function HeroMetric({
  current,
  trend,
  percentChange,
}: HeroMetricProps) {
  const isImproved = trend === "down"
  const TrendIcon =
    trend === "down" ? TrendingDown : trend === "up" ? TrendingUp : Minus

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Overall Risk Score
          </p>
          <p className="w-full text-sm text-muted-foreground">
            Aggregated risk across all monitored users. A lower score indicates
            improved security posture for the organization.
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className={cn("text-6xl font-bold tabular-nums", getScoreColor(current))}
            >
              {current.toFixed(1)}
            </span>
            <span className="text-2xl text-muted-foreground">/10</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium",
              isImproved ? "text-success" : "text-danger"
            )}
          >
            <TrendIcon className="h-4 w-4" aria-hidden="true" />
            <span>
              {isImproved ? "-" : "+"}
              {percentChange}% vs last period
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
