import type { LucideIcon } from "lucide-react"

export interface ReportCard {
    id: string
    title: string
    icon: LucideIcon
    description: string
    estimatedTime: string
    category: "executive" | "operational" | "secops"
    status: "available" | "coming-soon"
    route?: string
    lastGenerated?: string
    modalContent?: {
      fullDescription: string
      keyMetrics: string[]
    }
  }
  
  import {
  TrendingUp,
  ClipboardCheck,
  DollarSign,
  Target,
  BookOpen,
  Building2,
  Search,
  Zap,
  Globe,
} from "lucide-react"

export const reports: ReportCard[] = [
    // Executive Reports
    {
      id: "risk-summary",
      title: "Risk Summary",
      icon: TrendingUp,
      description: "Overall security posture, trends, and top risks",
      estimatedTime: "~30 seconds",
      category: "executive",
      status: "available",
      route: "/reports/risk-summary",
      lastGenerated: "2 hours ago",
    },
    {
      id: "compliance-overview",
      title: "Compliance Overview",
      icon: ClipboardCheck,
      description: "Audit readiness, control compliance, framework gaps",
      estimatedTime: "~20 seconds",
      category: "executive",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report provides comprehensive compliance tracking across security frameworks including SOC 2, ISO 27001, and GDPR. It helps security teams prepare for audits and identify control gaps requiring remediation.",
        keyMetrics: [
          "SOC 2 compliance percentage",
          "ISO 27001 control status",
          "Policy violation trends",
          "Audit finding remediation",
          "Framework mapping coverage",
        ],
      },
    },
    {
      id: "financial-impact",
      title: "Financial Impact Analysis",
      icon: DollarSign,
      description: "Cost avoidance, breach impact modeling, ROI metrics",
      estimatedTime: "~40 seconds",
      category: "executive",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report quantifies the financial value of your security program by calculating cost avoidance, breach impact modeling, and security investment ROI. Essential for budget justification and CFO reporting.",
        keyMetrics: [
          "Estimated breach cost avoidance",
          "Security program ROI",
          "Cost per incident (by type)",
          "Budget allocation efficiency",
          "Insurance premium impact",
        ],
      },
    },
    // Operational Reports
    {
      id: "user-behavior",
      title: "User Behavior Analytics",
      icon: Target,
      description: "Training effectiveness, phishing metrics, departmental gaps",
      estimatedTime: "~45 seconds",
      category: "operational",
      status: "available",
      route: "/reports/user-behavior-analytics",
      lastGenerated: "3 hours ago",
    },
    {
      id: "training-effectiveness",
      title: "Training Effectiveness",
      icon: BookOpen,
      description: "Course completion, quiz scores, knowledge retention",
      estimatedTime: "~35 seconds",
      category: "operational",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report provides granular analysis of security training program performance, including course completion rates, assessment scores, and knowledge retention metrics. Helps optimize training content and delivery.",
        keyMetrics: [
          "Completion rates by training module",
          "Assessment score trends",
          "Knowledge retention over time",
          "Learning path progression",
          "Engagement by content type",
        ],
      },
    },
    {
      id: "department-breakdown",
      title: "Department Breakdown",
      icon: Building2,
      description: "Risk by business unit, role-based analysis",
      estimatedTime: "~30 seconds",
      category: "operational",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report analyzes security risk and training performance segmented by department, role, and organizational hierarchy. Enables targeted interventions and resource allocation across business units.",
        keyMetrics: [
          "Risk scores by department",
          "Headcount vs incident ratio",
          "Role-specific vulnerability trends",
          "Budget allocation by unit",
          "Department comparison rankings",
        ],
      },
    },
    // Security Operations Reports
    {
      id: "incident-analysis",
      title: "Incident & Threat Intelligence",
      icon: Search,
      description: "Incident trends, MTTD/MTTR, attack patterns",
      estimatedTime: "~60 seconds",
      category: "secops",
      status: "available",
      route: "/reports/incident-threat-report",
      lastGenerated: "1 day ago",
    },
    {
      id: "response-time",
      title: "Response Time Metrics",
      icon: Zap,
      description: "SLA compliance, escalation times, resolution rates",
      estimatedTime: "~25 seconds",
      category: "secops",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report tracks SOC team performance through detailed analysis of incident response times, SLA compliance, and resolution efficiency. Essential for SOC optimization and staffing decisions.",
        keyMetrics: [
          "Mean Time to Detect (MTTD)",
          "Mean Time to Respond (MTTR)",
          "SLA breach incidents",
          "Escalation pattern analysis",
          "Backlog and throughput metrics",
        ],
      },
    },
    {
      id: "threat-landscape",
      title: "Threat Landscape Analysis",
      icon: Globe,
      description: "Attack vectors, geographic origins, threat actor profiling",
      estimatedTime: "~50 seconds",
      category: "secops",
      status: "coming-soon",
      modalContent: {
        fullDescription:
          "This report aggregates threat intelligence on attack vectors, geographic origins, and threat actor campaigns targeting your organization. Supports proactive defense planning and threat hunting operations.",
        keyMetrics: [
          "Top attack vectors (ranked)",
          "Threat source geographies",
          "Malware family distribution",
          "Campaign tracking timelines",
          "Threat actor attribution",
        ],
      },
    },
  ]
  
  export const categoryLabels: Record<string, string> = {
    executive: "Executive Reports",
    operational: "Operational Reports",
    secops: "Security Operations Reports",
  }
  
  export interface RecentReport {
    id: string
    name: string
    category: string
    generated: string
    generatedBy: string
    route?: string
    reportType?: string
  }
  
  export const recentReports: RecentReport[] = [
    {
      id: "1",
      name: "User Behavior Analytics",
      category: "Operational",
      generated: "2 hours ago",
      generatedBy: "Sarah C.",
      route: "/reports/user-behavior-analytics",
      reportType: "user-behavior-analytics",
    },
    {
      id: "2",
      name: "Risk Summary",
      category: "Executive",
      generated: "1 day ago",
      generatedBy: "Sarah C.",
      route: "/reports/risk-summary",
    },
    {
      id: "3",
      name: "Incident & Threat Intelligence",
      category: "SecOps",
      generated: "1 day ago",
      generatedBy: "Mike R.",
      route: "/reports/incident-threat-report",
      reportType: "incident-threat-report",
    },
    {
      id: "4",
      name: "Risk Summary",
      category: "Executive",
      generated: "4 days ago",
      generatedBy: "Alex T.",
    },
    {
      id: "5",
      name: "User Behavior Analytics",
      category: "Operational",
      generated: "1 week ago",
      generatedBy: "Sarah C.",
    },
  ]
  