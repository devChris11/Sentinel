import { users, type RiskUser } from "./risk-data"

export type Severity = "critical" | "high" | "medium" | "low"
export type Status = "new" | "acknowledged" | "in-progress" | "resolved" | "dismissed"
export type DetectionMethod = "Behavioral Analysis" | "Rule-Based" | "Machine Learning" | "Signature Match" | "Anomaly Detection"

export interface Incident {
  id: string
  title: string
  description: string
  severity: Severity
  severityScore: number
  status: Status
  user: {
    name: string
    email: string
    department: string
  }
  timestamp: Date
  aiReasoning: string
  timeline: {
    time: Date
    event: string
  }[]
  notes: {
    date: Date
    admin: string
    text: string
  }[]
  // Technical details
  ipAddress: string
  device: string
  location: string
  detectionMethod: DetectionMethod
}

const now = new Date()
function minutesAgo(m: number) { return new Date(now.getTime() - m * 60000) }
function hoursAgo(h: number) { return new Date(now.getTime() - h * 3600000) }
function daysAgo(d: number, h = 0) { return new Date(now.getTime() - (d * 86400000 + h * 3600000)) }

// Helper functions for generating technical details
function generateIPAddress(severity: Severity, incidentType: string): string {
  const internalIPs = [
    "192.168.1.45", "192.168.1.67", "192.168.2.102", "192.168.3.89",
    "10.0.1.23", "10.0.2.156", "10.0.5.78", "10.1.10.34"
  ]
  
  const externalIPs = [
    "203.0.113.42", "198.51.100.88", "185.220.101.45", "91.198.174.192",
    "104.244.42.129", "13.107.42.14", "45.33.32.156", "159.89.123.45"
  ]
  
  // Critical and high severity more likely to have external IPs
  // Failed logins and suspicious access often external
  const isExternal = (severity === "critical" && Math.random() < 0.6) ||
                     (severity === "high" && Math.random() < 0.4) ||
                     incidentType.includes("Login") ||
                     incidentType.includes("Access")
  
  const pool = isExternal ? externalIPs : internalIPs
  return pool[Math.floor(Math.random() * pool.length)]
}

function generateDevice(index: number): string {
  const devices = [
    "Windows 11 Workstation",
    "Windows 10 Desktop",
    "macOS 14.2 Laptop",
    "macOS 13.5 MacBook Pro",
    "Ubuntu 22.04 Server",
    "iPhone 15 Pro",
    "iPhone 14",
    "iPad Pro",
    "Android 14 Phone",
    "Samsung Galaxy S24"
  ]
  
  return devices[index % devices.length]
}

function generateLocation(severity: Severity, incidentType: string): string {
  const officeLocations = [
    "New York, USA",
    "San Francisco, USA",
    "London, UK",
    "Tokyo, Japan",
    "Singapore",
    "Sydney, Australia"
  ]
  
  const remoteLocations = [
    "Remote (VPN)",
    "Remote (Home)",
    "Unknown Location",
    "Beijing, China",
    "Moscow, Russia",
    "Mumbai, India"
  ]
  
  // Critical incidents and certain types more likely to be remote/suspicious
  const isRemote = (severity === "critical" && Math.random() < 0.5) ||
                   (severity === "high" && Math.random() < 0.3) ||
                   incidentType.includes("Login") ||
                   incidentType.includes("Access")
  
  const pool = isRemote ? remoteLocations : officeLocations
  return pool[Math.floor(Math.random() * pool.length)]
}

function generateDetectionMethod(incidentType: string): DetectionMethod {
  // Map incident types to appropriate detection methods
  if (incidentType.includes("Phishing") || incidentType.includes("Email")) {
    return "Behavioral Analysis"
  }
  if (incidentType.includes("Login") || incidentType.includes("Failed")) {
    return "Rule-Based"
  }
  if (incidentType.includes("Data") || incidentType.includes("Exfiltration")) {
    return Math.random() < 0.5 ? "Machine Learning" : "Anomaly Detection"
  }
  if (incidentType.includes("Malware") || incidentType.includes("Virus")) {
    return "Signature Match"
  }
  if (incidentType.includes("Policy") || incidentType.includes("Violation")) {
    return "Anomaly Detection"
  }
  
  // Default fallback
  const methods: DetectionMethod[] = ["Behavioral Analysis", "Rule-Based", "Machine Learning", "Signature Match", "Anomaly Detection"]
  return methods[Math.floor(Math.random() * methods.length)]
}

// Generate realistic incident data based on risk users
function generateIncident(user: RiskUser, index: number, incidentType: string): Incident {
  const severityMap: Record<string, { severity: Severity; scoreRange: [number, number] }> = {
    critical: { severity: "critical", scoreRange: [8.0, 10.0] },
    high: { severity: "high", scoreRange: [6.5, 7.9] },
    medium: { severity: "medium", scoreRange: [4.0, 6.4] },
    low: { severity: "low", scoreRange: [2.0, 3.9] },
  }
  
  // Determine severity based on user's risk level
  const sevConfig = severityMap[user.riskLevel]
  const severityScore = sevConfig.scoreRange[0] + Math.random() * (sevConfig.scoreRange[1] - sevConfig.scoreRange[0])
  
  // Generate realistic timestamps (more recent for higher risk users)
  let timestamp: Date
  if (user.riskLevel === "critical" && Math.random() < 0.6) {
    timestamp = minutesAgo(5 + Math.floor(Math.random() * 120))
  } else if (user.riskLevel === "high" && Math.random() < 0.5) {
    timestamp = hoursAgo(1 + Math.floor(Math.random() * 8))
  } else if (Math.random() < 0.3) {
    timestamp = hoursAgo(8 + Math.floor(Math.random() * 16))
  } else {
    timestamp = daysAgo(1 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 8))
  }
  
  // Status distribution: 40% new, 20% acknowledged, 15% in-progress, 15% resolved, 10% dismissed
  const rand = Math.random()
  let status: Status
  if (rand < 0.4) status = "new"
  else if (rand < 0.6) status = "acknowledged"
  else if (rand < 0.75) status = "in-progress"
  else if (rand < 0.9) status = "resolved"
  else status = "dismissed"
  
  // Generate incident content based on type
  const incidentTemplates = getIncidentTemplate(incidentType, user, severityScore)
  
  // Generate timeline
  const timeline = generateTimeline(timestamp, incidentType, sevConfig.severity)
  
  // Generate notes (more notes for in-progress, resolved, dismissed)
  const notes = generateNotes(timestamp, status, sevConfig.severity)
  
  // Generate technical details
  const ipAddress = generateIPAddress(sevConfig.severity, incidentType)
  const device = generateDevice(index)
  const location = generateLocation(sevConfig.severity, incidentType)
  const detectionMethod = generateDetectionMethod(incidentType)
  
  return {
    id: `INC-${String(index + 1).padStart(3, "0")}`,
    title: incidentTemplates.title,
    description: incidentTemplates.description,
    severity: sevConfig.severity,
    severityScore: parseFloat(severityScore.toFixed(1)),
    status,
    user: {
      name: user.name,
      email: user.email,
      department: user.department,
    },
    timestamp,
    aiReasoning: incidentTemplates.aiReasoning,
    timeline,
    notes,
    ipAddress,
    device,
    location,
    detectionMethod,
  }
}

function getIncidentTemplate(type: string, _user: RiskUser, _score: number) {
  const templates: Record<string, () => { title: string; description: string; aiReasoning: string }> = {
    "Phishing Attempts": () => {
      const attempts = Math.floor(3 + Math.random() * 5)
      const simType = ["Fake IT Support Request", "Urgent Account Verification", "Invoice Payment Request", "CEO Impersonation"][Math.floor(Math.random() * 4)]
      return {
        title: `${attempts > 1 ? "Multiple " : ""}Phishing Email${attempts > 1 ? "s" : ""} Clicked`,
        description: `User clicked ${attempts} suspicious email link${attempts > 1 ? "s" : ""} matching phishing patterns. Last incident: "${simType}"`,
        aiReasoning: `Detection: User clicked ${attempts} phishing simulation${attempts > 1 ? "s" : ""} in last 30 days. Behavioral analysis shows low awareness of social engineering tactics. Email contained urgency markers and credential harvesting patterns.`,
      }
    },
    "Failed Logins": () => {
      const attempts = Math.floor(5 + Math.random() * 15)
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      return {
        title: "Multiple Failed Login Attempts",
        description: `${attempts} failed login attempts from IP ${ip} targeting user account within ${Math.floor(2 + Math.random() * 5)} minutes`,
        aiReasoning: `Detection: AI behavioral analysis detected brute-force pattern. ${attempts} attempts in ${Math.floor(2 + Math.random() * 5)} minutes exceeds threshold of 5 per 10 minutes. Source IP has no prior history in authentication logs.`,
      }
    },
    "Policy Violations": () => {
      const violations = [
        { title: "Incomplete Security Training", description: `${Math.floor(0 + Math.random() * 3)}/5 required training modules completed past deadline`, aiReasoning: "User has not completed mandatory security awareness training. Current completion: {modules}/5 modules. Policy requires 100% completion within 30 days of assignment." },
        { title: "Password Policy Violation", description: `Password unchanged for ${Math.floor(180 + Math.random() * 180)} days, exceeding 90-day policy`, aiReasoning: `Password age exceeds company policy of 90 days. Last password change detected {days} days ago. Account flagged for forced password reset.` },
        { title: "Unapproved Software Installation", description: "Installed unauthorized application on company workstation without IT approval", aiReasoning: "Endpoint monitoring detected installation of non-whitelisted software. Application not in approved software catalog. Installation violates acceptable use policy §4.2." },
      ]
      const v = violations[Math.floor(Math.random() * violations.length)]
      return {
        title: v.title,
        description: v.description,
        aiReasoning: v.aiReasoning.replace("{modules}", String(Math.floor(Math.random() * 3))).replace("{days}", String(Math.floor(180 + Math.random() * 180))),
      }
    },
    "Data Exfiltration": () => {
      const sizeMB = Math.floor(100 + Math.random() * 2900)
      const fileCount = Math.floor(50 + Math.random() * 500)
      return {
        title: "Suspicious Data Download",
        description: `Large dataset (${(sizeMB / 1024).toFixed(1)}GB, ${fileCount} files) downloaded ${Math.random() < 0.5 ? "outside business hours" : "to personal cloud storage"}`,
        aiReasoning: `Detection: Anomalous download pattern detected. User typically downloads < ${Math.floor(10 + Math.random() * 40)}MB per session. ${(sizeMB / 1024).toFixed(1)}GB export is ${Math.floor(sizeMB / 50)}x above baseline${Math.random() < 0.5 ? " and occurred at " + Math.floor(Math.random() * 4 + 1) + "AM (outside normal working hours 9AM-6PM)" : ""}.`,
      }
    },
    "Malware Detected": () => {
      const malwareTypes = ["Emotet banking trojan", "Adware bundle", "Ransomware variant", "Spyware", "Trojan downloader"]
      const malware = malwareTypes[Math.floor(Math.random() * malwareTypes.length)]
      return {
        title: "Malware Signature Detected",
        description: `Endpoint protection detected ${malware} in ${Math.random() < 0.5 ? "email attachment" : "downloaded file"} on user workstation`,
        aiReasoning: `Detection: Endpoint protection quarantined suspicious file matching ${malware} signature. File hash: SHA256:${Math.random().toString(36).substr(2, 8)}... matches known IOC database. File originated from ${Math.random() < 0.5 ? "email attachment" : "untrusted website"}.`,
      }
    },
    "Unauthorized Access": () => {
      const resources = ["admin panel", "production database", "restricted file share", "financial reports server", "confidential documents folder"]
      const resource = resources[Math.floor(Math.random() * resources.length)]
      return {
        title: "Privilege Escalation Attempt",
        description: `Unauthorized attempt to access ${resource} without proper permissions via ${Math.random() < 0.5 ? "API endpoint" : "direct access"}`,
        aiReasoning: `Detection: User with standard access attempted ${Math.floor(1 + Math.random() * 4)} requests to restricted resource. Access control logs show ${Math.floor(2 + Math.random() * 3)} failed authorization checks. User role does not grant access to this resource per RBAC policy.`,
      }
    },
    "Suspicious Logins": () => {
      const locations = ["Tokyo, Japan", "Berlin, Germany", "São Paulo, Brazil", "Mumbai, India", "Sydney, Australia", "London, UK", "Singapore"]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const scenarios = [
        { title: "Impossible Travel Detected", description: `Login from ${location} - user typically logs in from ${["San Francisco, CA", "New York, NY", "Chicago, IL"][Math.floor(Math.random() * 3)]}`, aiReasoning: `Impossible travel detected. Last login from home location ${Math.floor(1 + Math.random() * 3)} hours ago. Login from ${location} represents ${Math.floor(5000 + Math.random() * 5000)} miles in ${Math.floor(1 + Math.random() * 3)} hours, physically impossible.` },
        { title: "VPN Connection from Tor Exit Node", description: `Corporate VPN login detected from known Tor exit node IP ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, aiReasoning: "VPN authentication from IP matched Tor exit node database. User has never connected via anonymizing network before. Risk: credential compromise likely." },
        { title: "After-Hours Login Spike", description: `${Math.floor(5 + Math.random() * 10)} login attempts between ${Math.floor(Math.random() * 3 + 1)}AM-${Math.floor(Math.random() * 2 + 4)}AM, unusual for this user`, aiReasoning: `User login pattern analysis shows 97% of logins occur 9AM-6PM. ${Math.floor(5 + Math.random() * 10)} after-hours login attempts deviate significantly from behavioral baseline.` },
      ]
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      return scenario
    },
  }
  
  const generator = templates[type] || templates["Phishing Attempts"]
  return generator()
}

function generateTimeline(timestamp: Date, type: string, severity: Severity): { time: Date; event: string }[] {
  const eventCount = severity === "critical" || severity === "high" ? 4 : Math.floor(2 + Math.random() * 2)
  const timeline: { time: Date; event: string }[] = []
  
  const baseEvents = [
    "Initial detection by AI behavioral analysis engine",
    "Incident automatically created and classified",
    "Security team notification sent",
    "Automated response actions initiated",
  ]
  
  const typeSpecificEvents: Record<string, string[]> = {
    "Phishing Attempts": ["User clicked suspicious link", "Credential harvesting page detected", "Email quarantined", "User account flagged for security awareness training"],
    "Failed Logins": ["First failed login attempt detected", "Rate limit threshold exceeded", "Account temporarily locked per security policy", "IP address flagged for monitoring"],
    "Policy Violations": ["Policy violation detected by compliance engine", "Manager notification sent", "Remediation action assigned", "User access restricted pending resolution"],
    "Data Exfiltration": ["Anomalous data access pattern detected", "Download volume exceeded baseline threshold", "DLP policy triggered", "Network traffic logged for forensic analysis"],
    "Malware Detected": ["Suspicious file detected by endpoint protection", "File quarantined automatically", "Full system scan initiated", "No lateral movement detected"],
    "Unauthorized Access": ["Unauthorized access attempt logged", "Access denied by authorization middleware", "User session terminated", "Incident escalated to security operations"],
    "Suspicious Logins": ["Login from unusual location detected", "MFA challenge issued", "Geolocation analysis completed", "User account flagged for review"],
  }
  
  const events = typeSpecificEvents[type] || baseEvents
  
  for (let i = 0; i < eventCount; i++) {
    const minutesOffset = Math.floor((i + 1) * (5 + Math.random() * 10))
    const time = new Date(timestamp.getTime() - minutesOffset * 60000)
    timeline.unshift({
      time,
      event: events[Math.min(i, events.length - 1)],
    })
  }
  
  return timeline
}

function generateNotes(timestamp: Date, status: Status, _severity: Severity): { date: Date; admin: string; text: string }[] {
  // Only add notes for incidents that have been worked on
  if (status === "new" || (status === "acknowledged" && Math.random() < 0.5)) {
    return []
  }
  
  const admins = ["James Wilson", "Lisa Park", "Mike Chen", "Sarah Johnson", "David Rodriguez", "System (Auto)"]
  const noteCount = status === "resolved" || status === "dismissed" ? Math.floor(1 + Math.random() * 3) : Math.floor(0 + Math.random() * 2)
  
  const noteTemplates = {
    "in-progress": [
      "Investigating incident. Initial analysis shows {finding}.",
      "Contacted user for clarification. Awaiting response.",
      "Reviewing system logs and authentication history.",
      "Coordinating with IT team to gather additional context.",
      "Escalating to security operations for deeper investigation.",
    ],
    resolved: [
      "Incident investigated and resolved. {resolution}",
      "User confirmed action was authorized/legitimate.",
      "False positive - automated system correctly flagged edge case but no actual risk.",
      "Issue resolved through user education and policy reminder.",
      "Security controls updated to prevent recurrence.",
    ],
    dismissed: [
      "After investigation, determined to be false positive. {reason}",
      "Incident dismissed as known safe behavior pattern.",
      "User provided valid business justification. Manager approved.",
      "Automated detection rule adjusted to reduce false positives.",
      "No security risk identified after forensic review.",
    ],
    acknowledged: [
      "Acknowledged. Assigning to security analyst for review.",
      "Incident triaged. Setting priority based on severity.",
    ],
  }
  
  const templates = noteTemplates[status] || noteTemplates["in-progress"]
  const notes: { date: Date; admin: string; text: string }[] = []
  
  for (let i = 0; i < noteCount; i++) {
    const hoursOffset = Math.floor((i + 1) * (1 + Math.random() * 3))
    const time = new Date(timestamp.getTime() + hoursOffset * 3600000)
    const text = templates[Math.floor(Math.random() * templates.length)]
      .replace("{finding}", ["suspicious patterns", "anomalous behavior", "policy violation confirmed", "potential compromise"][Math.floor(Math.random() * 4)])
      .replace("{resolution}", ["No security risk", "User educated", "System clean", "Permissions corrected"][Math.floor(Math.random() * 4)])
      .replace("{reason}", ["Legitimate business activity", "Approved exception", "Testing scenario", "Known safe pattern"][Math.floor(Math.random() * 4)])
    
    notes.push({
      date: time,
      admin: admins[Math.floor(Math.random() * admins.length)],
      text,
    })
  }
  
  return notes
}

// Generate incidents based on users from risk-data.ts
function generateAllIncidents(): Incident[] {
  const incidents: Incident[] = []
  const incidentTypes = [
    "Phishing Attempts",
    "Failed Logins",
    "Policy Violations",
    "Data Exfiltration",
    "Malware Detected",
    "Unauthorized Access",
    "Suspicious Logins",
  ]
  
  // Target distribution: 4-5 Critical, 6-7 High, 8-9 Medium, 6-7 Low
  // Use first 28 users to ensure variety
  const selectedUsers = users.slice(0, 28).map((user, idx) => {
    // Assign incident type based on user's top risk factor or randomize
    let type = incidentTypes[idx % incidentTypes.length]
    if (user.topRiskFactor && incidentTypes.includes(user.topRiskFactor)) {
      type = user.topRiskFactor
    }
    return { user, type }
  })
  
  selectedUsers.forEach(({ user, type }, idx) => {
    incidents.push(generateIncident(user, idx, type))
  })
  
  // Sort by timestamp (most recent first)
  incidents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  
  // Reassign IDs after sorting to maintain order
  incidents.forEach((inc, idx) => {
    inc.id = `INC-${String(idx + 1).padStart(3, "0")}`
  })
  
  return incidents
}

export const INCIDENTS: Incident[] = generateAllIncidents()

export const AVATAR_COLORS = [
  "#6366F1", "#3B82F6", "#10B981", "#F59E0B",
  "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6",
]

export function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const MS_IN_24_HOURS = 86400000
  
  // If less than 24 hours ago: show relative time
  if (diff < MS_IN_24_HOURS) {
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }
  
  // If 24 hours or more ago: show absolute time
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// Type for Dashboard SecurityAlert compatibility
export interface SecurityAlert {
  id: string
  severity: Severity
  title: string
  description: string
  user: {
    name: string
    email: string
  }
  timestamp: string
  status: Status
}

// Converter function for Dashboard compatibility
export function incidentToSecurityAlert(incident: Incident): SecurityAlert {
  return {
    id: incident.id,
    severity: incident.severity,
    title: incident.title,
    description: incident.description,
    user: {
      name: incident.user.name,
      email: incident.user.email,
    },
    timestamp: formatRelativeTime(incident.timestamp),
    status: incident.status,
  }
}

// Get first 8 incidents for Dashboard
export function getDashboardAlerts(): SecurityAlert[] {
  return INCIDENTS.slice(0, 8).map(incidentToSecurityAlert)
}
