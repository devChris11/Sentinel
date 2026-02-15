export interface RiskSummaryData {
    overallRiskScore: {
      current: number
      previous: number
      trend: "up" | "down" | "stable"
      percentChange: number
    }
    riskDistribution: {
      critical: number
      high: number
      medium: number
      low: number
    }
    trendData: Array<{
      date: string
      score: number
    }>
    topRisks: Array<{
      id: string
      category: string
      description: string
      severity: "critical" | "high" | "medium" | "low"
      affectedUsers: number
      impact: string
    }>
    trainingEffectiveness: number
    complianceStatus: "compliant" | "partial" | "non-compliant"
  }
  
  const dataSets: Record<string, RiskSummaryData> = {
    "7d": {
      overallRiskScore: {
        current: 7.1,
        previous: 7.3,
        trend: "down",
        percentChange: 3,
      },
      riskDistribution: { critical: 8, high: 10, medium: 11, low: 13 },
      trendData: [
        { date: "Feb 9", score: 7.3 },
        { date: "Feb 10", score: 7.2 },
        { date: "Feb 11", score: 7.1 },
        { date: "Feb 12", score: 7.0 },
        { date: "Feb 13", score: 7.1 },
        { date: "Feb 14", score: 7.1 },
        { date: "Feb 15", score: 7.1 },
      ],
      topRisks: [
        {
          id: "R-001",
          category: "Phishing Attempts",
          description: "Multiple users clicked simulated phishing emails",
          severity: "critical",
          affectedUsers: 20,
          impact: "High likelihood of credential compromise",
        },
        {
          id: "R-002",
          category: "Policy Violations",
          description: "Incomplete security training modules",
          severity: "high",
          affectedUsers: 15,
          impact: "Non-compliant with SOC 2 requirements",
        },
        {
          id: "R-003",
          category: "Unauthorized Access",
          description: "VPN logins from unusual locations",
          severity: "high",
          affectedUsers: 10,
          impact: "Potential account takeover",
        },
        {
          id: "R-004",
          category: "Data Exfiltration",
          description: "Large file downloads to personal devices",
          severity: "medium",
          affectedUsers: 6,
          impact: "Sensitive data exposure risk",
        },
        {
          id: "R-005",
          category: "Malware Detection",
          description: "Endpoint protection alerts triggered",
          severity: "medium",
          affectedUsers: 4,
          impact: "System compromise potential",
        },
      ],
      trainingEffectiveness: 91,
      complianceStatus: "compliant",
    },
    "30d": {
      overallRiskScore: {
        current: 6.8,
        previous: 7.4,
        trend: "down",
        percentChange: 8,
      },
      riskDistribution: { critical: 10, high: 12, medium: 13, low: 15 },
      trendData: [
        { date: "Sep", score: 7.2 },
        { date: "Oct", score: 7.0 },
        { date: "Nov", score: 6.9 },
        { date: "Dec", score: 6.8 },
        { date: "Jan", score: 6.7 },
        { date: "Feb", score: 6.8 },
      ],
      topRisks: [
        {
          id: "R-001",
          category: "Phishing Attempts",
          description: "Multiple users clicked simulated phishing emails",
          severity: "critical",
          affectedUsers: 23,
          impact: "High likelihood of credential compromise",
        },
        {
          id: "R-002",
          category: "Policy Violations",
          description: "Incomplete security training modules",
          severity: "high",
          affectedUsers: 18,
          impact: "Non-compliant with SOC 2 requirements",
        },
        {
          id: "R-003",
          category: "Unauthorized Access",
          description: "VPN logins from unusual locations",
          severity: "high",
          affectedUsers: 12,
          impact: "Potential account takeover",
        },
        {
          id: "R-004",
          category: "Data Exfiltration",
          description: "Large file downloads to personal devices",
          severity: "medium",
          affectedUsers: 8,
          impact: "Sensitive data exposure risk",
        },
        {
          id: "R-005",
          category: "Malware Detection",
          description: "Endpoint protection alerts triggered",
          severity: "medium",
          affectedUsers: 5,
          impact: "System compromise potential",
        },
      ],
      trainingEffectiveness: 94,
      complianceStatus: "compliant",
    },
    "quarter": {
      overallRiskScore: {
        current: 6.5,
        previous: 7.8,
        trend: "down",
        percentChange: 17,
      },
      riskDistribution: { critical: 7, high: 14, medium: 16, low: 18 },
      trendData: [
        { date: "Sep", score: 7.8 },
        { date: "Oct", score: 7.4 },
        { date: "Nov", score: 7.0 },
        { date: "Dec", score: 6.8 },
        { date: "Jan", score: 6.6 },
        { date: "Feb", score: 6.5 },
      ],
      topRisks: [
        {
          id: "R-001",
          category: "Phishing Attempts",
          description: "Multiple users clicked simulated phishing emails",
          severity: "critical",
          affectedUsers: 31,
          impact: "High likelihood of credential compromise",
        },
        {
          id: "R-002",
          category: "Unauthorized Access",
          description: "VPN logins from unusual locations",
          severity: "high",
          affectedUsers: 22,
          impact: "Potential account takeover",
        },
        {
          id: "R-003",
          category: "Policy Violations",
          description: "Incomplete security training modules",
          severity: "high",
          affectedUsers: 19,
          impact: "Non-compliant with SOC 2 requirements",
        },
        {
          id: "R-004",
          category: "Data Exfiltration",
          description: "Large file downloads to personal devices",
          severity: "medium",
          affectedUsers: 11,
          impact: "Sensitive data exposure risk",
        },
        {
          id: "R-005",
          category: "Malware Detection",
          description: "Endpoint protection alerts triggered",
          severity: "low",
          affectedUsers: 3,
          impact: "System compromise potential",
        },
      ],
      trainingEffectiveness: 96,
      complianceStatus: "compliant",
    },
    "6m": {
      overallRiskScore: {
        current: 6.2,
        previous: 8.1,
        trend: "down",
        percentChange: 23,
      },
      riskDistribution: { critical: 5, high: 11, medium: 19, low: 22 },
      trendData: [
        { date: "Aug", score: 8.1 },
        { date: "Sep", score: 7.6 },
        { date: "Oct", score: 7.2 },
        { date: "Nov", score: 6.8 },
        { date: "Dec", score: 6.5 },
        { date: "Feb", score: 6.2 },
      ],
      topRisks: [
        {
          id: "R-001",
          category: "Phishing Attempts",
          description: "Multiple users clicked simulated phishing emails",
          severity: "critical",
          affectedUsers: 38,
          impact: "High likelihood of credential compromise",
        },
        {
          id: "R-002",
          category: "Unauthorized Access",
          description: "VPN logins from unusual locations",
          severity: "high",
          affectedUsers: 28,
          impact: "Potential account takeover",
        },
        {
          id: "R-003",
          category: "Policy Violations",
          description: "Incomplete security training modules",
          severity: "high",
          affectedUsers: 20,
          impact: "Non-compliant with SOC 2 requirements",
        },
        {
          id: "R-004",
          category: "Data Exfiltration",
          description: "Large file downloads to personal devices",
          severity: "medium",
          affectedUsers: 14,
          impact: "Sensitive data exposure risk",
        },
        {
          id: "R-005",
          category: "Malware Detection",
          description: "Endpoint protection alerts triggered",
          severity: "low",
          affectedUsers: 4,
          impact: "System compromise potential",
        },
      ],
      trainingEffectiveness: 97,
      complianceStatus: "compliant",
    },
  }
  
  export function getRiskSummaryData(range: string): RiskSummaryData {
    return dataSets[range] || dataSets["30d"]
  }
  