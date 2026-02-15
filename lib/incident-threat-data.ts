// Types
export type Severity = "critical" | "high" | "medium" | "low"
export type IncidentStatus = "new" | "acknowledged" | "in-progress" | "resolved"

export interface Incident {
  id: string
  title: string
  category: string
  severity: Severity
  status: IncidentStatus
  user: {
    name: string
    email: string
    department: string
  }
  timestamp: string
  description: string
  ipAddress: string
  device: string
  location: string
  detectionMethod: string
  timeline: Array<{
    event: string
    timestamp: string
  }>
}

export interface CategoryBreakdown {
  category: string
  count: number
  percentChange: number
}

export interface TrendDataPoint {
  date: string
  incidents: number
}

export interface Metrics {
  totalIncidents: number
  percentChange: number
  meanTimeToDetect: number
  meanTimeToRespond: number
  mttdChange: number
  mttrChange: number
  resolutionRate: number
  resolutionChange: number
  resolvedCount: number
}

export interface SeverityDistribution {
  critical: number
  high: number
  medium: number
  low: number
}

// Mock Data
export const mockMetrics: Metrics = {
  totalIncidents: 23,
  percentChange: 28,
  meanTimeToDetect: 3.2,
  meanTimeToRespond: 8.1,
  mttdChange: -12,
  mttrChange: -5,
  resolutionRate: 87,
  resolutionChange: 3,
  resolvedCount: 20,
}

export const mockCategoryBreakdown: CategoryBreakdown[] = [
  { category: "Phishing", count: 14, percentChange: 100 },
  { category: "Malware", count: 4, percentChange: -20 },
  { category: "Policy Violation", count: 3, percentChange: 50 },
  { category: "Unauthorized Access", count: 1, percentChange: -50 },
  { category: "Suspicious Login", count: 1, percentChange: 0 },
]

export const mockSeverityDistribution: SeverityDistribution = {
  critical: 3,
  high: 8,
  medium: 7,
  low: 5,
}

export const mockTrendData: TrendDataPoint[] = [
  { date: "Feb 9", incidents: 2 },
  { date: "Feb 10", incidents: 3 },
  { date: "Feb 11", incidents: 4 },
  { date: "Feb 12", incidents: 2 },
  { date: "Feb 13", incidents: 5 },
  { date: "Feb 14", incidents: 3 },
  { date: "Feb 15", incidents: 4 },
]

export const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    title: "Password Policy Violation",
    category: "Policy Violation",
    severity: "critical",
    status: "new",
    user: { name: "Michael Rodriguez", email: "m.rodriguez@sentinel.io", department: "Engineering" },
    timestamp: "43 min ago",
    description: "User attempted to set a password that violates the organization's complexity requirements. Multiple failed attempts detected within a 5-minute window, suggesting either a brute-force attempt or a user unaware of updated policy.",
    ipAddress: "10.0.12.45",
    device: "Windows 11 Desktop",
    location: "Office - Floor 3",
    detectionMethod: "Policy Engine",
    timeline: [
      { event: "Password change attempted with weak credentials", timestamp: "43 min ago" },
      { event: "Policy violation alert triggered", timestamp: "43 min ago" },
      { event: "Account temporarily locked after 5 failed attempts", timestamp: "40 min ago" },
    ],
  },
  {
    id: "INC-002",
    title: "Privilege Escalation Attempt",
    category: "Unauthorized Access",
    severity: "high",
    status: "in-progress",
    user: { name: "Olivia Patel", email: "o.patel@sentinel.io", department: "DevOps" },
    timestamp: "1 hour ago",
    description: "Detected an attempt to escalate privileges on a production server. The user attempted to access admin-level resources without proper authorization clearance.",
    ipAddress: "192.168.1.105",
    device: "macOS 14.2 Laptop",
    location: "Remote (VPN)",
    detectionMethod: "SIEM Correlation",
    timeline: [
      { event: "Unusual sudo command executed", timestamp: "1 hour ago" },
      { event: "SIEM alert triggered for privilege escalation", timestamp: "58 min ago" },
      { event: "Incident assigned to SOC Analyst", timestamp: "45 min ago" },
      { event: "Investigation in progress", timestamp: "30 min ago" },
    ],
  },
  {
    id: "INC-003",
    title: "Multiple Phishing Emails Clicked",
    category: "Phishing",
    severity: "critical",
    status: "new",
    user: { name: "Sarah Chen", email: "s.chen@sentinel.io", department: "Finance" },
    timestamp: "1 hour ago",
    description: "User clicked on multiple phishing links in emails that impersonated internal IT communications. Credential harvesting page was loaded, and user may have entered corporate credentials.",
    ipAddress: "10.0.8.22",
    device: "Windows 11 Desktop",
    location: "Office - Floor 2",
    detectionMethod: "Email Gateway",
    timeline: [
      { event: "Phishing email delivered to inbox", timestamp: "2 hours ago" },
      { event: "User clicked malicious link", timestamp: "1 hour ago" },
      { event: "Credential harvesting page detected", timestamp: "1 hour ago" },
      { event: "Email gateway alert triggered", timestamp: "58 min ago" },
    ],
  },
  {
    id: "INC-004",
    title: "After-Hours Login Spike",
    category: "Suspicious Login",
    severity: "low",
    status: "resolved",
    user: { name: "Angela Foster", email: "a.foster@sentinel.io", department: "Marketing" },
    timestamp: "18 hours ago",
    description: "Multiple login attempts detected outside normal business hours from the user's registered device. Investigation confirmed legitimate overtime work approved by department manager.",
    ipAddress: "198.51.100.88",
    device: "macOS 14.2 Laptop",
    location: "Remote (VPN)",
    detectionMethod: "Rule-Based",
    timeline: [
      { event: "Login from unusual time detected", timestamp: "18 hours ago" },
      { event: "MFA challenge issued", timestamp: "18 hours ago" },
      { event: "MFA successfully completed", timestamp: "18 hours ago" },
      { event: "Confirmed legitimate access - resolved", timestamp: "16 hours ago" },
    ],
  },
  {
    id: "INC-005",
    title: "Suspicious File Download from External Source",
    category: "Malware",
    severity: "high",
    status: "acknowledged",
    user: { name: "David Kim", email: "d.kim@sentinel.io", department: "Research" },
    timestamp: "2 hours ago",
    description: "User downloaded an executable file from an unverified external source. File signature matches known malware patterns. Endpoint protection quarantined the file automatically.",
    ipAddress: "10.0.15.67",
    device: "Windows 11 Desktop",
    location: "Office - Floor 4",
    detectionMethod: "Endpoint Protection",
    timeline: [
      { event: "File download initiated from external URL", timestamp: "2 hours ago" },
      { event: "Malware signature detected by endpoint agent", timestamp: "2 hours ago" },
      { event: "File quarantined automatically", timestamp: "2 hours ago" },
      { event: "Alert acknowledged by SOC team", timestamp: "1 hour ago" },
    ],
  },
  {
    id: "INC-006",
    title: "Spear Phishing Targeting CFO",
    category: "Phishing",
    severity: "critical",
    status: "in-progress",
    user: { name: "James Thornton", email: "j.thornton@sentinel.io", department: "Finance" },
    timestamp: "3 hours ago",
    description: "A targeted spear-phishing email was sent to the CFO impersonating the CEO. The email requested an urgent wire transfer. User reported the email to IT before taking action.",
    ipAddress: "10.0.2.10",
    device: "macOS 14.2 Laptop",
    location: "Office - Executive Suite",
    detectionMethod: "User Report",
    timeline: [
      { event: "Spear phishing email received", timestamp: "3 hours ago" },
      { event: "User reported suspicious email to IT", timestamp: "2.5 hours ago" },
      { event: "SOC investigation initiated", timestamp: "2 hours ago" },
      { event: "Email sender domain analysis in progress", timestamp: "1 hour ago" },
    ],
  },
  {
    id: "INC-007",
    title: "Bulk Email Forward Rule Created",
    category: "Phishing",
    severity: "high",
    status: "new",
    user: { name: "Lisa Wang", email: "l.wang@sentinel.io", department: "Finance" },
    timestamp: "4 hours ago",
    description: "A mail forwarding rule was created that sends copies of all incoming emails to an external address. This may indicate a compromised account attempting data exfiltration via email.",
    ipAddress: "10.0.8.34",
    device: "Windows 11 Desktop",
    location: "Office - Floor 2",
    detectionMethod: "Mail Flow Policy",
    timeline: [
      { event: "Mail forwarding rule created to external address", timestamp: "4 hours ago" },
      { event: "Policy alert triggered", timestamp: "4 hours ago" },
      { event: "Forwarding rule disabled automatically", timestamp: "3.5 hours ago" },
    ],
  },
  {
    id: "INC-008",
    title: "Credential Stuffing Attack Detected",
    category: "Phishing",
    severity: "high",
    status: "in-progress",
    user: { name: "Robert Santos", email: "r.santos@sentinel.io", department: "Finance" },
    timestamp: "5 hours ago",
    description: "Multiple login attempts using known compromised credentials from breach databases. Attack originated from multiple IP addresses suggesting a coordinated credential stuffing campaign.",
    ipAddress: "Multiple IPs",
    device: "N/A - External",
    location: "Multiple Geolocations",
    detectionMethod: "Threat Intelligence Feed",
    timeline: [
      { event: "Spike in failed login attempts detected", timestamp: "5 hours ago" },
      { event: "Credential stuffing pattern identified", timestamp: "5 hours ago" },
      { event: "Affected accounts locked", timestamp: "4.5 hours ago" },
      { event: "IP addresses added to block list", timestamp: "4 hours ago" },
      { event: "User password resets initiated", timestamp: "3.5 hours ago" },
    ],
  },
  {
    id: "INC-009",
    title: "Unauthorized USB Device Connected",
    category: "Policy Violation",
    severity: "medium",
    status: "acknowledged",
    user: { name: "Emma Johnson", email: "e.johnson@sentinel.io", department: "HR" },
    timestamp: "6 hours ago",
    description: "An unauthorized USB storage device was connected to a corporate workstation in violation of the removable media policy. DLP agent blocked the device from mounting.",
    ipAddress: "10.0.6.12",
    device: "Windows 11 Desktop",
    location: "Office - Floor 1",
    detectionMethod: "DLP Agent",
    timeline: [
      { event: "USB device insertion detected", timestamp: "6 hours ago" },
      { event: "Device blocked by DLP policy", timestamp: "6 hours ago" },
      { event: "Alert sent to user's manager", timestamp: "5.5 hours ago" },
    ],
  },
  {
    id: "INC-010",
    title: "Phishing Link in Teams Message",
    category: "Phishing",
    severity: "medium",
    status: "resolved",
    user: { name: "Kevin O'Brien", email: "k.obrien@sentinel.io", department: "Sales" },
    timestamp: "8 hours ago",
    description: "A phishing link was shared via Microsoft Teams from a compromised external partner account. Link was detected and blocked before any users could click it.",
    ipAddress: "External",
    device: "N/A",
    location: "External Partner",
    detectionMethod: "URL Scanning",
    timeline: [
      { event: "Malicious URL detected in Teams message", timestamp: "8 hours ago" },
      { event: "Link blocked by URL protection", timestamp: "8 hours ago" },
      { event: "Partner organization notified", timestamp: "7 hours ago" },
      { event: "Incident resolved - no user impact", timestamp: "6 hours ago" },
    ],
  },
  {
    id: "INC-011",
    title: "Ransomware Signature Detected",
    category: "Malware",
    severity: "high",
    status: "resolved",
    user: { name: "Tom Bradley", email: "t.bradley@sentinel.io", department: "Engineering" },
    timestamp: "10 hours ago",
    description: "Endpoint protection detected a file with ransomware signatures during a routine scan. The file was quarantined before execution. Source traced to a third-party software update.",
    ipAddress: "10.0.14.89",
    device: "Windows 11 Desktop",
    location: "Office - Floor 3",
    detectionMethod: "Endpoint Protection",
    timeline: [
      { event: "Ransomware signature detected in downloaded file", timestamp: "10 hours ago" },
      { event: "File quarantined by endpoint protection", timestamp: "10 hours ago" },
      { event: "Full system scan initiated", timestamp: "9 hours ago" },
      { event: "System clean - incident resolved", timestamp: "8 hours ago" },
    ],
  },
  {
    id: "INC-012",
    title: "Phishing Campaign Targeting HR",
    category: "Phishing",
    severity: "medium",
    status: "resolved",
    user: { name: "Nancy Reeves", email: "n.reeves@sentinel.io", department: "HR" },
    timestamp: "12 hours ago",
    description: "A phishing campaign targeting HR department personnel was detected. Emails impersonated job applicants and contained malicious resume attachments. All emails were quarantined.",
    ipAddress: "External",
    device: "N/A",
    location: "External",
    detectionMethod: "Email Gateway",
    timeline: [
      { event: "Multiple phishing emails targeting HR detected", timestamp: "12 hours ago" },
      { event: "Emails quarantined by email gateway", timestamp: "12 hours ago" },
      { event: "HR department notified", timestamp: "11 hours ago" },
      { event: "Phishing awareness reminder sent", timestamp: "10 hours ago" },
    ],
  },
  {
    id: "INC-013",
    title: "Anomalous Data Transfer Volume",
    category: "Malware",
    severity: "medium",
    status: "acknowledged",
    user: { name: "Chris Evans", email: "c.evans@sentinel.io", department: "Engineering" },
    timestamp: "14 hours ago",
    description: "An unusually large volume of data was transferred from a development server to an external endpoint. Investigation ongoing to determine if this is legitimate or potential data exfiltration via malware.",
    ipAddress: "10.0.14.102",
    device: "Linux Server",
    location: "Data Center",
    detectionMethod: "Network Monitoring",
    timeline: [
      { event: "Anomalous outbound data transfer detected", timestamp: "14 hours ago" },
      { event: "Transfer rate exceeded 500MB threshold", timestamp: "14 hours ago" },
      { event: "Connection throttled pending investigation", timestamp: "13 hours ago" },
    ],
  },
  {
    id: "INC-014",
    title: "Phishing QR Code in Office Printer",
    category: "Phishing",
    severity: "low",
    status: "resolved",
    user: { name: "Patricia Moore", email: "p.moore@sentinel.io", department: "Operations" },
    timestamp: "16 hours ago",
    description: "A document containing a phishing QR code was found on a shared office printer. The QR code linked to a credential harvesting page. Physical security team removed the document.",
    ipAddress: "N/A",
    device: "N/A",
    location: "Office - Floor 1 Print Room",
    detectionMethod: "Physical Security",
    timeline: [
      { event: "Suspicious document reported by employee", timestamp: "16 hours ago" },
      { event: "QR code analyzed - confirmed phishing", timestamp: "15.5 hours ago" },
      { event: "Document removed and disposed of securely", timestamp: "15 hours ago" },
      { event: "All-hands security reminder sent", timestamp: "14 hours ago" },
    ],
  },
  {
    id: "INC-015",
    title: "VPN Brute Force Attempt",
    category: "Phishing",
    severity: "high",
    status: "resolved",
    user: { name: "Derek Huang", email: "d.huang@sentinel.io", department: "IT" },
    timestamp: "20 hours ago",
    description: "Multiple failed VPN authentication attempts from foreign IP addresses. Attack pattern consistent with automated credential brute-forcing tools targeting VPN gateway.",
    ipAddress: "203.0.113.42",
    device: "N/A - External",
    location: "Foreign IP - Eastern Europe",
    detectionMethod: "VPN Gateway Logs",
    timeline: [
      { event: "Excessive failed VPN login attempts detected", timestamp: "20 hours ago" },
      { event: "Source IP blocked at firewall", timestamp: "20 hours ago" },
      { event: "VPN access logs reviewed", timestamp: "19 hours ago" },
      { event: "No successful unauthorized access confirmed", timestamp: "18 hours ago" },
    ],
  },
  {
    id: "INC-016",
    title: "Shadow IT Application Discovered",
    category: "Policy Violation",
    severity: "low",
    status: "new",
    user: { name: "Samantha Lee", email: "s.lee@sentinel.io", department: "Marketing" },
    timestamp: "22 hours ago",
    description: "An unapproved cloud storage application was discovered being used by marketing team members to share files externally. Application bypasses DLP controls.",
    ipAddress: "10.0.9.45",
    device: "macOS 14.2 Laptop",
    location: "Office - Floor 2",
    detectionMethod: "CASB",
    timeline: [
      { event: "Unapproved SaaS application usage detected", timestamp: "22 hours ago" },
      { event: "CASB alert generated", timestamp: "22 hours ago" },
    ],
  },
  {
    id: "INC-017",
    title: "Phishing Voicemail (Vishing) Attack",
    category: "Phishing",
    severity: "medium",
    status: "resolved",
    user: { name: "Brian Torres", email: "b.torres@sentinel.io", department: "Finance" },
    timestamp: "1 day ago",
    description: "A vishing attack targeted finance department via voicemail, impersonating a bank representative requesting account verification. User reported the suspicious voicemail to security.",
    ipAddress: "N/A",
    device: "N/A",
    location: "Phone System",
    detectionMethod: "User Report",
    timeline: [
      { event: "Suspicious voicemail reported by user", timestamp: "1 day ago" },
      { event: "Voicemail analyzed and confirmed as vishing", timestamp: "1 day ago" },
      { event: "Phone number blocked", timestamp: "1 day ago" },
      { event: "Finance team alerted to vishing campaign", timestamp: "1 day ago" },
    ],
  },
  {
    id: "INC-018",
    title: "Malicious Browser Extension Found",
    category: "Malware",
    severity: "medium",
    status: "resolved",
    user: { name: "Rachel Adams", email: "r.adams@sentinel.io", department: "Design" },
    timestamp: "1 day ago",
    description: "A browser extension with data collection capabilities was found installed on a user's workstation. Extension was silently capturing form data and sending it to an external server.",
    ipAddress: "10.0.11.33",
    device: "macOS 14.2 Laptop",
    location: "Office - Floor 2",
    detectionMethod: "Endpoint Protection",
    timeline: [
      { event: "Suspicious browser extension detected", timestamp: "1 day ago" },
      { event: "Extension behavior analyzed", timestamp: "1 day ago" },
      { event: "Extension removed from all devices", timestamp: "1 day ago" },
      { event: "User passwords reset as precaution", timestamp: "1 day ago" },
    ],
  },
  {
    id: "INC-019",
    title: "Phishing Email with Macro Attachment",
    category: "Phishing",
    severity: "medium",
    status: "resolved",
    user: { name: "Andrew Park", email: "a.park@sentinel.io", department: "Finance" },
    timestamp: "1 day ago",
    description: "A phishing email containing a Word document with malicious macros was delivered to several finance department users. Email gateway caught 90% of copies; remaining were reported by users.",
    ipAddress: "External",
    device: "N/A",
    location: "External",
    detectionMethod: "Email Gateway",
    timeline: [
      { event: "Phishing email detected by gateway", timestamp: "1 day ago" },
      { event: "90% of copies quarantined automatically", timestamp: "1 day ago" },
      { event: "Remaining copies reported by users", timestamp: "1 day ago" },
      { event: "All copies removed from mailboxes", timestamp: "1 day ago" },
    ],
  },
  {
    id: "INC-020",
    title: "Phishing SMS (Smishing) Campaign",
    category: "Phishing",
    severity: "low",
    status: "resolved",
    user: { name: "Maria Gonzalez", email: "m.gonzalez@sentinel.io", department: "Customer Support" },
    timestamp: "2 days ago",
    description: "A smishing campaign targeted employees via SMS, sending fake package delivery notifications with malicious links. Several employees reported the messages to security.",
    ipAddress: "N/A",
    device: "Mobile Devices",
    location: "Various",
    detectionMethod: "User Report",
    timeline: [
      { event: "Multiple employees report suspicious SMS", timestamp: "2 days ago" },
      { event: "Smishing campaign confirmed", timestamp: "2 days ago" },
      { event: "Company-wide SMS phishing alert issued", timestamp: "2 days ago" },
    ],
  },
  {
    id: "INC-021",
    title: "Phishing Link via Social Media DM",
    category: "Phishing",
    severity: "low",
    status: "resolved",
    user: { name: "Jessica Turner", email: "j.turner@sentinel.io", department: "Marketing" },
    timestamp: "2 days ago",
    description: "A phishing link was sent via a social media direct message to the company's marketing account. The message impersonated a potential business partner. Link was not clicked.",
    ipAddress: "N/A",
    device: "N/A",
    location: "External - Social Media",
    detectionMethod: "User Report",
    timeline: [
      { event: "Suspicious DM reported by social media manager", timestamp: "2 days ago" },
      { event: "Link analyzed - confirmed phishing", timestamp: "2 days ago" },
      { event: "Social media account secured", timestamp: "2 days ago" },
    ],
  },
  {
    id: "INC-022",
    title: "Phishing Email Impersonating Vendor",
    category: "Phishing",
    severity: "high",
    status: "resolved",
    user: { name: "William Chen", email: "w.chen@sentinel.io", department: "Procurement" },
    timestamp: "3 days ago",
    description: "A sophisticated phishing email impersonating a legitimate vendor requested urgent invoice payment to a new bank account. Finance team flagged the unusual payment request.",
    ipAddress: "External",
    device: "N/A",
    location: "External",
    detectionMethod: "User Report",
    timeline: [
      { event: "Suspicious vendor email received", timestamp: "3 days ago" },
      { event: "Finance team flagged unusual payment request", timestamp: "3 days ago" },
      { event: "Vendor contacted directly - confirmed fraud", timestamp: "3 days ago" },
      { event: "Email reported and blocked", timestamp: "3 days ago" },
    ],
  },
  {
    id: "INC-023",
    title: "Phishing Website Clone Detected",
    category: "Phishing",
    severity: "high",
    status: "resolved",
    user: { name: "System", email: "system@sentinel.io", department: "IT Security" },
    timestamp: "3 days ago",
    description: "A clone of the company's login portal was discovered hosted on a recently registered domain. The fake site was designed to harvest employee credentials. Takedown request submitted.",
    ipAddress: "External",
    device: "N/A",
    location: "External Hosting",
    detectionMethod: "Threat Intelligence Feed",
    timeline: [
      { event: "Fake login portal discovered by threat intel", timestamp: "3 days ago" },
      { event: "Domain analyzed and confirmed malicious", timestamp: "3 days ago" },
      { event: "Takedown request submitted to hosting provider", timestamp: "3 days ago" },
      { event: "Domain taken down", timestamp: "2 days ago" },
    ],
  },
]

export const CATEGORIES = [
  "All Categories",
  "Phishing",
  "Malware",
  "Policy Violation",
  "Unauthorized Access",
  "Suspicious Login",
] as const

export const SEVERITIES = ["All Severities", "Critical", "High", "Medium", "Low"] as const
export const STATUSES = ["All Statuses", "New", "Acknowledged", "In Progress", "Resolved"] as const
export const DATE_RANGES = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const
