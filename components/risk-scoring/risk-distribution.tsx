import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string
  percentage: string
  trend: "up" | "down" | "stable"
  trendLabel: string
  badgeLabel: string
  color: string
  badgeClassName: string
  trendIsGood?: boolean
}

function StatCard({
  title,
  value,
  percentage,
  trend,
  trendLabel,
  badgeLabel,
  color,
  badgeClassName,
  trendIsGood,
}: StatCardProps) {
  const trendColor = trendIsGood ? "#10B981" : trend === "up" ? "#EF4444" : trend === "down" ? "#10B981" : undefined

  return (
    <div className="rounded-lg border border-content-border bg-content-surface p-6 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-content-text-muted">{title}</p>
        <Badge className={badgeClassName}>{badgeLabel}</Badge>
      </div>
      <p className="mt-3 text-3xl font-bold" style={{ color }}>{value}</p>
      <p className="mt-1 text-xs text-content-text-muted">{percentage}</p>
      <div className="mt-3 flex items-center gap-1.5">
        {trend === "up" && (
          <TrendingUp className="h-3.5 w-3.5" style={{ color: trendColor }} />
        )}
        {trend === "down" && (
          <TrendingDown className="h-3.5 w-3.5" style={{ color: trendColor }} />
        )}
        {trend === "stable" && (
          <ArrowRight className="h-3.5 w-3.5 text-content-text-muted" />
        )}
        <span
          className="text-xs"
          style={{ color: trend === "stable" ? "#64748B" : trendColor }}
        >
          {trendLabel}
        </span>
      </div>
    </div>
  )
}

export function RiskDistribution() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        title="Critical Risk"
        value="47"
        percentage="3.8% of total"
        trend="up"
        trendLabel="12% vs last week"
        badgeLabel="Critical"
        color="#EF4444"
        badgeClassName="border border-danger/20 bg-danger/10 text-danger hover:bg-danger/10"
      />
      <StatCard
        title="High Risk"
        value="186"
        percentage="14.9% of total"
        trend="down"
        trendLabel="3% vs last week"
        badgeLabel="High"
        color="#F97316"
        badgeClassName="border border-orange/20 bg-orange/10 text-orange hover:bg-orange/10"
        trendIsGood
      />
      <StatCard
        title="Medium Risk"
        value="214"
        percentage="17.2% of total"
        trend="stable"
        trendLabel="No change"
        badgeLabel="Medium"
        color="#F59E0B"
        badgeClassName="border border-warning/20 bg-warning/10 text-warning hover:bg-warning/10"
      />
    </div>
  )
}
