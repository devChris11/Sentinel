export type RiskLevel = "critical" | "high" | "medium" | "low"
export type Trend = "up" | "down" | "stable"
export type UserStatus = "needs-attention" | "in-progress" | "monitored" | "dismissed"

export interface RiskUser {
  id: string
  name: string
  email: string
  avatar: string
  department: string
  riskScore: number
  riskLevel: RiskLevel
  trend: Trend
  trendDelta: number
  topRiskFactor: string
  topRiskDetail: string
  lastActivity: string
  status: UserStatus
}

export interface RiskBreakdownItem {
  category: string
  score: number
  maxScore: number
  weight: number
  details: string[]
}

export interface ActivityEvent {
  date: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  detail: string
}

export interface TrendDataPoint {
  date: string
  score: number
  event?: string
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 8.0) return "critical"
  if (score >= 6.5) return "high"
  if (score >= 4.0) return "medium"
  return "low"
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "critical": return "#EF4444"
    case "high": return "#F97316"
    case "medium": return "#F59E0B"
    case "low": return "#10B981"
  }
}

export function getStatusConfig(status: UserStatus) {
  switch (status) {
    case "needs-attention":
      return { label: "Needs Attention", className: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" }
    case "in-progress":
      return { label: "In Progress", className: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" }
    case "monitored":
      return { label: "Monitored", className: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" }
    case "dismissed":
      return { label: "Dismissed", className: "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]" }
  }
}

export const users: RiskUser[] = [
  {
    id: "1", name: "Sarah Chen", email: "s.chen@company.com", avatar: "SC",
    department: "Finance", riskScore: 9.2, riskLevel: "critical", trend: "up", trendDelta: 1.2,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Clicked 3/10 simulations",
    lastActivity: "12 minutes ago", status: "needs-attention"
  },
  {
    id: "2", name: "Michael Rodriguez", email: "m.rodriguez@company.com", avatar: "MR",
    department: "Engineering", riskScore: 8.7, riskLevel: "critical", trend: "up", trendDelta: 0.8,
    topRiskFactor: "Policy Violations", topRiskDetail: "0/5 training completed",
    lastActivity: "2 hours ago", status: "needs-attention"
  },
  {
    id: "3", name: "Emma Thompson", email: "e.thompson@company.com", avatar: "ET",
    department: "Sales", riskScore: 7.8, riskLevel: "high", trend: "up", trendDelta: 0.5,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "No MFA enabled",
    lastActivity: "1 day ago", status: "in-progress"
  },
  {
    id: "4", name: "James Wilson", email: "j.wilson@company.com", avatar: "JW",
    department: "Marketing", riskScore: 7.2, riskLevel: "high", trend: "down", trendDelta: 0.3,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "200MB download flagged",
    lastActivity: "3 hours ago", status: "in-progress"
  },
  {
    id: "5", name: "Lisa Anderson", email: "l.anderson@company.com", avatar: "LA",
    department: "HR", riskScore: 6.8, riskLevel: "high", trend: "stable", trendDelta: 0,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Clicked 2/10 simulations",
    lastActivity: "Yesterday", status: "monitored"
  },
  {
    id: "6", name: "David Martinez", email: "d.martinez@company.com", avatar: "DM",
    department: "IT", riskScore: 6.5, riskLevel: "high", trend: "down", trendDelta: 0.4,
    topRiskFactor: "Policy Violations", topRiskDetail: "3/5 training completed",
    lastActivity: "2 days ago", status: "monitored"
  },
  {
    id: "7", name: "Jennifer Lee", email: "j.lee@company.com", avatar: "JL",
    department: "Legal", riskScore: 5.9, riskLevel: "medium", trend: "stable", trendDelta: 0,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "Unusual location detected",
    lastActivity: "4 hours ago", status: "monitored"
  },
  {
    id: "8", name: "Robert Taylor", email: "r.taylor@company.com", avatar: "RT",
    department: "Operations", riskScore: 5.2, riskLevel: "medium", trend: "down", trendDelta: 0.6,
    topRiskFactor: "Malware Detected", topRiskDetail: "1 incident resolved",
    lastActivity: "1 week ago", status: "monitored"
  },
  {
    id: "9", name: "Maria Garcia", email: "m.garcia@company.com", avatar: "MG",
    department: "Finance", riskScore: 3.8, riskLevel: "low", trend: "down", trendDelta: 0.2,
    topRiskFactor: "Policy Violations", topRiskDetail: "4/5 training completed",
    lastActivity: "3 days ago", status: "monitored"
  },
  {
    id: "10", name: "Thomas Brown", email: "t.brown@company.com", avatar: "TB",
    department: "Engineering", riskScore: 2.9, riskLevel: "low", trend: "down", trendDelta: 0.5,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "0/10 clicks - excellent",
    lastActivity: "5 days ago", status: "monitored"
  },
  {
    id: "11", name: "Olivia Patel", email: "o.patel@company.com", avatar: "OP",
    department: "Product", riskScore: 8.1, riskLevel: "critical", trend: "up", trendDelta: 1.0,
    topRiskFactor: "Unauthorized Access", topRiskDetail: "3 privilege escalation attempts",
    lastActivity: "30 minutes ago", status: "needs-attention"
  },
  {
    id: "12", name: "Kevin Nguyen", email: "k.nguyen@company.com", avatar: "KN",
    department: "Data Science", riskScore: 7.5, riskLevel: "high", trend: "up", trendDelta: 0.9,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "500MB bulk download",
    lastActivity: "1 hour ago", status: "in-progress"
  },
  {
    id: "13", name: "Ashley Cooper", email: "a.cooper@company.com", avatar: "AC",
    department: "Customer Success", riskScore: 6.9, riskLevel: "high", trend: "stable", trendDelta: 0,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "VPN from 3 countries",
    lastActivity: "6 hours ago", status: "in-progress"
  },
  {
    id: "14", name: "Daniel Kim", email: "d.kim@company.com", avatar: "DK",
    department: "Engineering", riskScore: 5.4, riskLevel: "medium", trend: "down", trendDelta: 0.3,
    topRiskFactor: "Policy Violations", topRiskDetail: "2/5 training completed",
    lastActivity: "2 days ago", status: "monitored"
  },
  {
    id: "15", name: "Rachel Foster", email: "r.foster@company.com", avatar: "RF",
    department: "Design", riskScore: 4.7, riskLevel: "medium", trend: "up", trendDelta: 0.4,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "1/10 clicks",
    lastActivity: "Yesterday", status: "monitored"
  },
  {
    id: "16", name: "Christopher Lee", email: "c.lee@company.com", avatar: "CL",
    department: "Sales", riskScore: 4.1, riskLevel: "medium", trend: "stable", trendDelta: 0,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "After-hours access pattern",
    lastActivity: "3 days ago", status: "monitored"
  },
  {
    id: "17", name: "Sophia Adams", email: "s.adams@company.com", avatar: "SA",
    department: "Marketing", riskScore: 3.5, riskLevel: "low", trend: "down", trendDelta: 0.7,
    topRiskFactor: "Policy Violations", topRiskDetail: "5/5 training completed",
    lastActivity: "4 days ago", status: "monitored"
  },
  {
    id: "18", name: "Brandon Wright", email: "b.wright@company.com", avatar: "BW",
    department: "IT", riskScore: 2.3, riskLevel: "low", trend: "down", trendDelta: 0.4,
    topRiskFactor: "Malware Detected", topRiskDetail: "No incidents",
    lastActivity: "1 week ago", status: "dismissed"
  },
  {
    id: "19", name: "Amanda Scott", email: "a.scott@company.com", avatar: "AS",
    department: "Legal", riskScore: 1.8, riskLevel: "low", trend: "down", trendDelta: 0.3,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "0/10 clicks - excellent",
    lastActivity: "2 weeks ago", status: "dismissed"
  },
  {
    id: "20", name: "Nathan Hughes", email: "n.hughes@company.com", avatar: "NH",
    department: "Operations", riskScore: 1.2, riskLevel: "low", trend: "stable", trendDelta: 0,
    topRiskFactor: "Policy Violations", topRiskDetail: "5/5 training completed",
    lastActivity: "1 week ago", status: "dismissed"
  },
  {
    id: "21", name: "Rachel Kim", email: "r.kim@company.com", avatar: "RK",
    department: "Data Science", riskScore: 8.7, riskLevel: "critical", trend: "up", trendDelta: 1.2,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "Downloaded 5GB of training data to personal device",
    lastActivity: "15 minutes ago", status: "needs-attention"
  },
  {
    id: "22", name: "Marcus Rodriguez", email: "m.rodriguez@company.com", avatar: "MR",
    department: "Customer Success", riskScore: 3.5, riskLevel: "low", trend: "down", trendDelta: 0.8,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Reported 12 suspicious emails this month",
    lastActivity: "2 hours ago", status: "monitored"
  },
  {
    id: "23", name: "Angela Foster", email: "a.foster@company.com", avatar: "AF",
    department: "Design", riskScore: 5.8, riskLevel: "medium", trend: "stable", trendDelta: 0.1,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "2 failed login attempts, MFA enabled",
    lastActivity: "45 minutes ago", status: "in-progress"
  },
  {
    id: "24", name: "Derek Chen", email: "d.chen@company.com", avatar: "DC",
    department: "Engineering", riskScore: 9.1, riskLevel: "critical", trend: "up", trendDelta: 1.5,
    topRiskFactor: "Unauthorized Access", topRiskDetail: "Attempted to access production DB without approval",
    lastActivity: "30 minutes ago", status: "needs-attention"
  },
  {
    id: "25", name: "Isabella Martinez", email: "i.martinez@company.com", avatar: "IM",
    department: "Legal", riskScore: 2.1, riskLevel: "low", trend: "stable", trendDelta: 0.2,
    topRiskFactor: "Policy Violations", topRiskDetail: "All compliance training up to date",
    lastActivity: "4 hours ago", status: "monitored"
  },
  {
    id: "26", name: "Tyler Jackson", email: "t.jackson@company.com", avatar: "TJ",
    department: "Sales", riskScore: 7.3, riskLevel: "high", trend: "up", trendDelta: 0.9,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Clicked 4 phishing simulations, training assigned",
    lastActivity: "1 hour ago", status: "in-progress"
  },
  {
    id: "27", name: "Sophia Nguyen", email: "s.nguyen@company.com", avatar: "SN",
    department: "Product", riskScore: 4.2, riskLevel: "medium", trend: "down", trendDelta: 0.6,
    topRiskFactor: "Policy Violations", topRiskDetail: "Completed 4/5 training modules",
    lastActivity: "3 hours ago", status: "in-progress"
  },
  {
    id: "28", name: "Brandon Lee", email: "b.lee@company.com", avatar: "BL",
    department: "IT", riskScore: 8.4, riskLevel: "critical", trend: "stable", trendDelta: 0.3,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "Multiple VPN connections from different countries",
    lastActivity: "20 minutes ago", status: "needs-attention"
  },
  {
    id: "29", name: "Olivia Parker", email: "o.parker@company.com", avatar: "OP",
    department: "Marketing", riskScore: 6.1, riskLevel: "medium", trend: "up", trendDelta: 0.7,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "Uploaded customer lists to personal cloud",
    lastActivity: "1 day ago", status: "in-progress"
  },
  {
    id: "30", name: "Kevin Walsh", email: "k.walsh@company.com", avatar: "KW",
    department: "Finance", riskScore: 3.8, riskLevel: "low", trend: "stable", trendDelta: 0.1,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Passed all phishing simulations",
    lastActivity: "6 hours ago", status: "monitored"
  },
  {
    id: "31", name: "Natalie Turner", email: "n.turner@company.com", avatar: "NT",
    department: "HR", riskScore: 7.8, riskLevel: "high", trend: "up", trendDelta: 1.1,
    topRiskFactor: "Malware Detected", topRiskDetail: "Trojan detected in downloaded attachment",
    lastActivity: "10 minutes ago", status: "needs-attention"
  },
  {
    id: "32", name: "Gregory Mitchell", email: "g.mitchell@company.com", avatar: "GM",
    department: "Operations", riskScore: 2.9, riskLevel: "low", trend: "down", trendDelta: 0.5,
    topRiskFactor: "Policy Violations", topRiskDetail: "Security awareness score: 95%",
    lastActivity: "2 days ago", status: "dismissed"
  },
  {
    id: "33", name: "Samantha Brooks", email: "s.brooks@company.com", avatar: "SB",
    department: "Engineering", riskScore: 6.8, riskLevel: "high", trend: "stable", trendDelta: 0.2,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "Login from new device, MFA challenge passed",
    lastActivity: "1 hour ago", status: "monitored"
  },
  {
    id: "34", name: "Aaron Cooper", email: "a.cooper@company.com", avatar: "AC",
    department: "Sales", riskScore: 5.3, riskLevel: "medium", trend: "up", trendDelta: 0.4,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Clicked 1 phishing link, reported immediately",
    lastActivity: "5 hours ago", status: "in-progress"
  },
  {
    id: "35", name: "Victoria Hayes", email: "v.hayes@company.com", avatar: "VH",
    department: "Data Science", riskScore: 9.5, riskLevel: "critical", trend: "up", trendDelta: 1.4,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "Shared API keys in public GitHub repository",
    lastActivity: "5 minutes ago", status: "needs-attention"
  },
  {
    id: "36", name: "Justin Reed", email: "j.reed@company.com", avatar: "JR",
    department: "Customer Success", riskScore: 4.7, riskLevel: "medium", trend: "stable", trendDelta: 0.0,
    topRiskFactor: "Policy Violations", topRiskDetail: "Missed 1 mandatory training deadline",
    lastActivity: "8 hours ago", status: "in-progress"
  },
  {
    id: "37", name: "Elena Vasquez", email: "e.vasquez@company.com", avatar: "EV",
    department: "Design", riskScore: 2.5, riskLevel: "low", trend: "stable", trendDelta: 0.1,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Completed advanced security training",
    lastActivity: "3 days ago", status: "monitored"
  },
  {
    id: "38", name: "Cameron Price", email: "c.price@company.com", avatar: "CP",
    department: "Legal", riskScore: 7.6, riskLevel: "high", trend: "down", trendDelta: 0.8,
    topRiskFactor: "Unauthorized Access", topRiskDetail: "Attempted to access restricted documents",
    lastActivity: "2 hours ago", status: "in-progress"
  },
  {
    id: "39", name: "Megan Sullivan", email: "m.sullivan@company.com", avatar: "MS",
    department: "Marketing", riskScore: 3.1, riskLevel: "low", trend: "down", trendDelta: 0.9,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "All logins from approved locations",
    lastActivity: "1 day ago", status: "monitored"
  },
  {
    id: "40", name: "Christopher Bell", email: "c.bell@company.com", avatar: "CB",
    department: "Product", riskScore: 8.9, riskLevel: "critical", trend: "up", trendDelta: 1.3,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Entered credentials into fake login page",
    lastActivity: "25 minutes ago", status: "needs-attention"
  },
  {
    id: "41", name: "Hannah Russell", email: "h.russell@company.com", avatar: "HR",
    department: "Finance", riskScore: 6.5, riskLevel: "medium", trend: "up", trendDelta: 0.6,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "Downloaded financial reports to USB drive",
    lastActivity: "4 hours ago", status: "in-progress"
  },
  {
    id: "42", name: "Patrick Gray", email: "p.gray@company.com", avatar: "PG",
    department: "IT", riskScore: 1.8, riskLevel: "low", trend: "stable", trendDelta: 0.0,
    topRiskFactor: "Policy Violations", topRiskDetail: "100% compliance rate",
    lastActivity: "1 week ago", status: "dismissed"
  },
  {
    id: "43", name: "Nicole Butler", email: "n.butler@company.com", avatar: "NB",
    department: "HR", riskScore: 5.9, riskLevel: "medium", trend: "stable", trendDelta: 0.2,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "Multiple failed password attempts",
    lastActivity: "2 hours ago", status: "monitored"
  },
  {
    id: "44", name: "Bryan Coleman", email: "b.coleman@company.com", avatar: "BC",
    department: "Engineering", riskScore: 7.1, riskLevel: "high", trend: "down", trendDelta: 0.7,
    topRiskFactor: "Malware Detected", topRiskDetail: "Adware removed from workstation",
    lastActivity: "3 hours ago", status: "in-progress"
  },
  {
    id: "45", name: "Allison Barnes", email: "a.barnes@company.com", avatar: "AB",
    department: "Sales", riskScore: 4.4, riskLevel: "medium", trend: "stable", trendDelta: 0.3,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "1 suspicious email reported",
    lastActivity: "12 hours ago", status: "monitored"
  },
  {
    id: "46", name: "Ryan Powell", email: "r.powell@company.com", avatar: "RP",
    department: "Operations", riskScore: 9.3, riskLevel: "critical", trend: "up", trendDelta: 1.5,
    topRiskFactor: "Unauthorized Access", topRiskDetail: "Bypassed VPN to access company systems",
    lastActivity: "8 minutes ago", status: "needs-attention"
  },
  {
    id: "47", name: "Stephanie Long", email: "s.long@company.com", avatar: "SL",
    department: "Customer Success", riskScore: 3.3, riskLevel: "low", trend: "stable", trendDelta: 0.1,
    topRiskFactor: "Policy Violations", topRiskDetail: "Strong password practices observed",
    lastActivity: "2 days ago", status: "monitored"
  },
  {
    id: "48", name: "Jordan Foster", email: "j.foster@company.com", avatar: "JF",
    department: "Data Science", riskScore: 6.9, riskLevel: "high", trend: "up", trendDelta: 0.8,
    topRiskFactor: "Data Exfiltration", topRiskDetail: "Excessive database queries detected",
    lastActivity: "1 hour ago", status: "in-progress"
  },
  {
    id: "49", name: "Rebecca Howard", email: "r.howard@company.com", avatar: "RH",
    department: "Design", riskScore: 2.7, riskLevel: "low", trend: "down", trendDelta: 0.4,
    topRiskFactor: "Phishing Attempts", topRiskDetail: "Perfect score on security awareness test",
    lastActivity: "5 days ago", status: "dismissed"
  },
  {
    id: "50", name: "Austin Ward", email: "a.ward@company.com", avatar: "AW",
    department: "Product", riskScore: 8.2, riskLevel: "critical", trend: "up", trendDelta: 1.0,
    topRiskFactor: "Suspicious Logins", topRiskDetail: "Account accessed from compromised network",
    lastActivity: "35 minutes ago", status: "needs-attention"
  },
]

export const sarahChenBreakdown: RiskBreakdownItem[] = [
  { category: "Phishing Attempts", score: 9.2, maxScore: 10, weight: 30, details: ["Clicked 3/10 phishing simulations", "Failed to report 5 suspicious emails"] },
  { category: "Suspicious Logins", score: 8.0, maxScore: 10, weight: 20, details: ["MFA not enabled", "3 logins from unusual locations"] },
  { category: "Policy Violations", score: 7.5, maxScore: 10, weight: 25, details: ["Completed 2/5 required training modules", "Password unchanged for 180+ days"] },
  { category: "Data Exfiltration", score: 5.0, maxScore: 10, weight: 15, details: ["Downloaded 200MB sensitive files (unusual)"] },
  { category: "Unauthorized Access", score: 3.0, maxScore: 10, weight: 5, details: ["1 failed privilege escalation attempt"] },
  { category: "Malware Detected", score: 2.0, maxScore: 10, weight: 5, details: ["No malware detected"] },
]

export const sarahChenActivity: ActivityEvent[] = [
  { date: "Feb 12, 2026 at 2:45 PM", severity: "critical", title: "Clicked phishing simulation", detail: "Simulation: \"Fake IT Support Request\"" },
  { date: "Feb 10, 2026 at 9:20 AM", severity: "high", title: "Failed to report suspicious email", detail: "Subject: \"Urgent: Verify Your Account\"" },
  { date: "Feb 8, 2026 at 11:15 AM", severity: "low", title: "Completed training module", detail: "Module: \"Mobile Phishing Detection\"" },
  { date: "Feb 3, 2026 at 3:30 PM", severity: "critical", title: "Attempted MFA enrollment (failed)", detail: "Error: Invalid authentication code" },
  { date: "Jan 28, 2026 at 10:05 AM", severity: "medium", title: "Login from unusual location", detail: "Location: Manila, Philippines (VPN suspected)" },
]

export const sarahChenTrend: TrendDataPoint[] = [
  { date: "Nov 15", score: 5.2 },
  { date: "Nov 22", score: 5.5 },
  { date: "Nov 29", score: 5.1 },
  { date: "Dec 6", score: 5.8 },
  { date: "Dec 13", score: 6.2 },
  { date: "Dec 15", score: 7.1, event: "Clicked phishing sim" },
  { date: "Dec 20", score: 7.0 },
  { date: "Dec 27", score: 6.8 },
  { date: "Jan 3", score: 7.2 },
  { date: "Jan 8", score: 6.5, event: "Completed training" },
  { date: "Jan 10", score: 6.3 },
  { date: "Jan 17", score: 6.8 },
  { date: "Jan 24", score: 7.4 },
  { date: "Jan 31", score: 7.8 },
  { date: "Feb 3", score: 8.5, event: "Failed MFA enrollment" },
  { date: "Feb 7", score: 8.8 },
  { date: "Feb 10", score: 9.0 },
  { date: "Feb 14", score: 9.2 },
]

export const adminNotes = [
  { date: "Feb 12, 2026 at 2:30 PM", author: "John Smith (Admin)", content: "Contacted user about MFA setup. User confirmed will enable by end of day." },
  { date: "Feb 10, 2026 at 9:15 AM", author: "Sarah Johnson", content: "User clicked phishing sim, assigned refresher training module. Following up next week." },
]
