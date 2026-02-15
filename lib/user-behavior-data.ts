/**
 * User Behavior Analytics - Type Definitions & Data
 * Phishing simulation metrics, training effectiveness, and user risk assessment
 */

// TypeScript Interfaces
export interface SummaryMetrics {
  avgReportingRate: number
  avgReportingRateChange: number
  avgTimeToReport: number
  avgTimeToReportChange: number
  trainingCompletion: number
  trainingCompletionChange: number
  realThreatReports: number
  realThreatReportsChange: number
  realThreatReportsLastMonth: number
}

export interface DepartmentData {
  department: string
  reportingRate: number
  userCount: number
  usersNeedingTraining: number
  trend: "up" | "down" | "stable"
}

export interface TrendDataPoint {
  week: string
  reportingRate: number
  companyAvg: number
  industryBenchmark: number
}

export type RiskLevel = "critical" | "high" | "medium" | "low"

export interface HighRiskUser {
  id: string
  name: string
  email: string
  department: string
  role: string
  reportingRate: number
  timeToReport: number
  lastActivity: string
  riskLevel: RiskLevel
}

export interface UserBehaviorData {
  summary: SummaryMetrics
  departmentBreakdown: DepartmentData[]
  trendData: TrendDataPoint[]
  highRiskUsers: HighRiskUser[]
}

// Data Export
export const userBehaviorData: UserBehaviorData = {
  summary: {
    avgReportingRate: 84,
    avgReportingRateChange: 5,
    avgTimeToReport: 1.8,
    avgTimeToReportChange: -15,
    trainingCompletion: 94,
    trainingCompletionChange: 7,
    realThreatReports: 127,
    realThreatReportsChange: 18,
    realThreatReportsLastMonth: 108,
  },
  departmentBreakdown: [
    { department: "Finance", reportingRate: 91, userCount: 24, usersNeedingTraining: 2, trend: "up" },
    { department: "Engineering", reportingRate: 89, userCount: 56, usersNeedingTraining: 4, trend: "up" },
    { department: "HR", reportingRate: 85, userCount: 18, usersNeedingTraining: 3, trend: "stable" },
    { department: "Marketing", reportingRate: 78, userCount: 32, usersNeedingTraining: 8, trend: "down" },
    { department: "Sales", reportingRate: 62, userCount: 45, usersNeedingTraining: 18, trend: "down" },
  ],
  trendData: [
    { week: "W1", reportingRate: 78, companyAvg: 79, industryBenchmark: 72 },
    { week: "W2", reportingRate: 80, companyAvg: 79, industryBenchmark: 72 },
    { week: "W3", reportingRate: 82, companyAvg: 80, industryBenchmark: 72 },
    { week: "W4", reportingRate: 79, companyAvg: 80, industryBenchmark: 73 },
    { week: "W5", reportingRate: 81, companyAvg: 80, industryBenchmark: 73 },
    { week: "W6", reportingRate: 83, companyAvg: 81, industryBenchmark: 73 },
    { week: "W7", reportingRate: 82, companyAvg: 81, industryBenchmark: 73 },
    { week: "W8", reportingRate: 84, companyAvg: 81, industryBenchmark: 73 },
    { week: "W9", reportingRate: 83, companyAvg: 82, industryBenchmark: 74 },
    { week: "W10", reportingRate: 85, companyAvg: 82, industryBenchmark: 74 },
    { week: "W11", reportingRate: 84, companyAvg: 82, industryBenchmark: 74 },
    { week: "W12", reportingRate: 84, companyAvg: 82, industryBenchmark: 74 },
  ],
  highRiskUsers: [
    { id: "u1", name: "Victoria Hayes", email: "v.hayes@company.com", department: "Sales", role: "Manager", reportingRate: 42, timeToReport: 5.2, lastActivity: "5 min ago", riskLevel: "critical" },
    { id: "u2", name: "Ryan Powell", email: "r.powell@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 38, timeToReport: 6.1, lastActivity: "8 min ago", riskLevel: "critical" },
    { id: "u3", name: "Sarah Chen", email: "s.chen@company.com", department: "Marketing", role: "Individual Contributor", reportingRate: 55, timeToReport: 3.8, lastActivity: "12 min ago", riskLevel: "high" },
    { id: "u4", name: "Marcus Johnson", email: "m.johnson@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 41, timeToReport: 5.8, lastActivity: "22 min ago", riskLevel: "critical" },
    { id: "u5", name: "Emily Rodriguez", email: "e.rodriguez@company.com", department: "Sales", role: "Manager", reportingRate: 48, timeToReport: 4.5, lastActivity: "35 min ago", riskLevel: "critical" },
    { id: "u6", name: "David Kim", email: "d.kim@company.com", department: "Marketing", role: "Manager", reportingRate: 58, timeToReport: 3.2, lastActivity: "1 hr ago", riskLevel: "high" },
    { id: "u7", name: "Jessica Wu", email: "j.wu@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 35, timeToReport: 7.2, lastActivity: "1 hr ago", riskLevel: "critical" },
    { id: "u8", name: "Tom Baker", email: "t.baker@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 44, timeToReport: 5.0, lastActivity: "2 hrs ago", riskLevel: "critical" },
    { id: "u9", name: "Alicia Grant", email: "a.grant@company.com", department: "Marketing", role: "Individual Contributor", reportingRate: 60, timeToReport: 3.5, lastActivity: "2 hrs ago", riskLevel: "high" },
    { id: "u10", name: "Nathan Lee", email: "n.lee@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 39, timeToReport: 6.5, lastActivity: "3 hrs ago", riskLevel: "critical" },
    { id: "u11", name: "Priya Patel", email: "p.patel@company.com", department: "Finance", role: "Individual Contributor", reportingRate: 65, timeToReport: 2.9, lastActivity: "3 hrs ago", riskLevel: "medium" },
    { id: "u12", name: "Chris Nguyen", email: "c.nguyen@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 47, timeToReport: 4.8, lastActivity: "4 hrs ago", riskLevel: "critical" },
    { id: "u13", name: "Anna Torres", email: "a.torres@company.com", department: "Marketing", role: "Individual Contributor", reportingRate: 56, timeToReport: 3.9, lastActivity: "4 hrs ago", riskLevel: "high" },
    { id: "u14", name: "Brandon Clark", email: "b.clark@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 43, timeToReport: 5.6, lastActivity: "5 hrs ago", riskLevel: "critical" },
    { id: "u15", name: "Megan Foster", email: "m.foster@company.com", department: "Sales", role: "Manager", reportingRate: 50, timeToReport: 4.1, lastActivity: "5 hrs ago", riskLevel: "high" },
    { id: "u16", name: "Derek Wang", email: "d.wang@company.com", department: "Engineering", role: "Individual Contributor", reportingRate: 68, timeToReport: 2.5, lastActivity: "6 hrs ago", riskLevel: "medium" },
    { id: "u17", name: "Laura Simmons", email: "l.simmons@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 36, timeToReport: 6.8, lastActivity: "6 hrs ago", riskLevel: "critical" },
    { id: "u18", name: "Kevin Brown", email: "k.brown@company.com", department: "Marketing", role: "Manager", reportingRate: 62, timeToReport: 3.1, lastActivity: "7 hrs ago", riskLevel: "medium" },
    { id: "u19", name: "Rachel Adams", email: "r.adams@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 40, timeToReport: 5.9, lastActivity: "8 hrs ago", riskLevel: "critical" },
    { id: "u20", name: "Steven Park", email: "s.park@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 46, timeToReport: 5.3, lastActivity: "8 hrs ago", riskLevel: "critical" },
    { id: "u21", name: "Nicole Harris", email: "n.harris@company.com", department: "HR", role: "Individual Contributor", reportingRate: 64, timeToReport: 3.0, lastActivity: "9 hrs ago", riskLevel: "medium" },
    { id: "u22", name: "James Cooper", email: "j.cooper@company.com", department: "Sales", role: "Individual Contributor", reportingRate: 37, timeToReport: 7.0, lastActivity: "10 hrs ago", riskLevel: "critical" },
    { id: "u23", name: "Lisa Morgan", email: "l.morgan@company.com", department: "Engineering", role: "Individual Contributor", reportingRate: 66, timeToReport: 2.7, lastActivity: "12 hrs ago", riskLevel: "medium" },
  ],
}
