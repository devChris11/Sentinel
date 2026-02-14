import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { users } from "@/lib/risk-data"

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
          className="text-sm font-semibold"
          style={{ color: trend === "stable" ? "#64748B" : trendColor }}
        >
          {trendLabel}
        </span>
      </div>
    </div>
  )
}

export function RiskDistribution() {
  // Calculate actual counts from users array
  const totalUsers = users.length
  const criticalCount = users.filter(u => u.riskLevel === 'critical').length
  const highCount = users.filter(u => u.riskLevel === 'high').length
  const mediumCount = users.filter(u => u.riskLevel === 'medium').length
  const lowCount = users.filter(u => u.riskLevel === 'low').length
  
  // Calculate percentages (of fictional 1,247 users for demo purposes)
  const fictionalTotal = 1247
  const criticalPercent = ((criticalCount / totalUsers) * 100 * (totalUsers / fictionalTotal) * fictionalTotal / totalUsers).toFixed(1)
  const highPercent = ((highCount / totalUsers) * 100 * (totalUsers / fictionalTotal) * fictionalTotal / totalUsers).toFixed(1)
  const mediumPercent = ((mediumCount / totalUsers) * 100 * (totalUsers / fictionalTotal) * fictionalTotal / totalUsers).toFixed(1)
  const lowPercent = ((lowCount / totalUsers) * 100 * (totalUsers / fictionalTotal) * fictionalTotal / totalUsers).toFixed(1)
  
  // Fixed trend percentages for MVP (would be calculated from historical data in production)
  const trends = {
    critical: "12",
    high: "8",
    medium: "5",
    low: "15"
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Critical Risk"
        value={criticalCount.toString()}
        percentage={`${criticalPercent}% of total`}
        trend="up"
        trendLabel={`${trends.critical}% vs last week`}
        badgeLabel="Critical"
        color="#EF4444"
        badgeClassName="border border-danger/20 bg-danger/10 text-danger hover:bg-danger/10"
      />
      <StatCard
        title="High Risk"
        value={highCount.toString()}
        percentage={`${highPercent}% of total`}
        trend="down"
        trendLabel={`${trends.high}% vs last week`}
        badgeLabel="High"
        color="#F97316"
        badgeClassName="border border-orange/20 bg-orange/10 text-orange hover:bg-orange/10"
        trendIsGood
      />
      <StatCard
        title="Medium Risk"
        value={mediumCount.toString()}
        percentage={`${mediumPercent}% of total`}
        trend="stable"
        trendLabel={`${trends.medium}% vs last week`}
        badgeLabel="Medium"
        color="#F59E0B"
        badgeClassName="border border-warning/20 bg-warning/10 text-warning hover:bg-warning/10"
      />
      <StatCard
        title="Low Risk"
        value={lowCount.toString()}
        percentage={`${lowPercent}% of total`}
        trend="up"
        trendLabel={`${trends.low}% vs last week`}
        badgeLabel="Low"
        color="#10B981"
        badgeClassName="border border-success/20 bg-success/10 text-success hover:bg-success/10"
        trendIsGood
      />
    </div>
  )
}
