// Dashboard Data Layer
// Provides TypeScript interfaces and mock data for dashboard components

import { getDashboardAlerts } from "./incidents-data"

export type DateRange = "24h" | "7d" | "30d" | "90d"

export interface DashboardMetric {
  id: string
  label: string
  value: number
  unit?: string
  trend: {
    direction: "up" | "down" | "neutral"
    percentage: number
    isPositive: boolean
  }
  timeContext: string
  description?: string
  threshold?: {
    label: string
    status: "normal" | "warning" | "critical"
  }
}

export interface SecurityAlert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  user: {
    name: string
    email: string
  }
  timestamp: string
  status: "new" | "in-progress" | "resolved" | "dismissed"
}

export interface ChartDataPoint {
  date: string
  value: number
}

export interface IncidentCategory {
  category: string
  fullName: string
  count: number
  color: string
}

export interface DashboardData {
  metrics: DashboardMetric[]
  riskTrend: ChartDataPoint[]
  incidents: IncidentCategory[]
  alerts: SecurityAlert[]
}

// Generate realistic risk trend data
function generateRiskTrendData(days: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Generate values between 5.8 and 7.2 with some variance
    const baseValue = 6.5
    const variance = Math.sin(i * 0.3) * 0.7 + Math.random() * 0.4
    const value = Math.round((baseValue + variance) * 10) / 10
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.max(5.8, Math.min(7.2, value))
    })
  }
  
  return data
}

// Get dashboard data based on date range
export function getDashboardData(dateRange: DateRange): DashboardData {
  const rangeMultipliers = {
    "24h": 0.1,
    "7d": 0.5,
    "30d": 1,
    "90d": 2.5
  }
  
  const multiplier = rangeMultipliers[dateRange]
  const days = dateRange === "24h" ? 24 : dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90
  
  // Metrics
  const metrics: DashboardMetric[] = [
    {
      id: "risk-score",
      label: "Overall Risk Score",
      value: 6.8,
      unit: "/10",
      trend: {
        direction: "down",
        percentage: 8,
        isPositive: true
      },
      timeContext: `vs. last ${dateRange === "24h" ? "day" : "period"}`,
      description: "Aggregated risk across all monitored users",
      threshold: {
        label: "Moderate Risk",
        status: "warning"
      }
    },
    {
      id: "active-incidents",
      label: "Active Incidents",
      value: Math.round(23 * multiplier),
      trend: {
        direction: "up",
        percentage: 12,
        isPositive: false
      },
      timeContext: `vs. last ${dateRange === "24h" ? "day" : "period"}`,
      description: "Incidents requiring investigation",
      threshold: {
        label: "High Activity",
        status: "critical"
      }
    },
    {
      id: "users-monitored",
      label: "Users Monitored",
      value: 1247,
      trend: {
        direction: "up",
        percentage: 3,
        isPositive: true
      },
      timeContext: `vs. last ${dateRange === "24h" ? "day" : "period"}`,
      description: "Active user accounts under surveillance"
    },
    {
      id: "response-time",
      label: "Avg Response Time",
      value: 2.3,
      unit: "hrs",
      trend: {
        direction: "down",
        percentage: 15,
        isPositive: true
      },
      timeContext: `vs. last ${dateRange === "24h" ? "day" : "period"}`,
      description: "Mean time to incident response",
      threshold: {
        label: "Optimal",
        status: "normal"
      }
    }
  ]
  
  // Risk trend chart data
  const riskTrend = generateRiskTrendData(Math.min(days, 30))
  
  // Incident categories
  const incidents: IncidentCategory[] = [
    {
      category: "Phishing",
      fullName: "Phishing Attempts",
      count: Math.round(45 * multiplier),
      color: "#EF4444"
    },
    {
      category: "Logins",
      fullName: "Suspicious Logins",
      count: Math.round(23 * multiplier),
      color: "#F59E0B"
    },
    {
      category: "Exfiltration",
      fullName: "Data Exfiltration",
      count: Math.round(12 * multiplier),
      color: "#6366F1"
    },
    {
      category: "Policy",
      fullName: "Policy Violations",
      count: Math.round(34 * multiplier),
      color: "#8B5CF6"
    },
    {
      category: "Malware",
      fullName: "Malware Detected",
      count: Math.round(8 * multiplier),
      color: "#EC4899"
    },
    {
      category: "Unauth Access",
      fullName: "Unauthorized Access",
      count: Math.round(16 * multiplier),
      color: "#14B8A6"
    }
  ]
  
  // Security alerts - Get from unified incidents data
  const alerts: SecurityAlert[] = getDashboardAlerts()
  
  return {
    metrics,
    riskTrend,
    incidents,
    alerts
  }
}

// Get formatted current timestamp
export function getLastUpdatedTimestamp(): string {
  const now = new Date()
  return now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) +
    " at " +
    now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
}
