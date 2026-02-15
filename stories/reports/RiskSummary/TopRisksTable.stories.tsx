import type { Meta, StoryObj } from '@storybook/react'
import { TopRisksTable } from '@/components/reports/risk-summary/top-risks-table'

const meta = {
  title: 'Reports/RiskSummary/TopRisksTable',
  component: TopRisksTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table displaying the top 5 risks requiring attention, prioritized by severity and user impact. Severity badges match the Incidents page pattern with 10% background, 20% border opacity. Responsive design hides the Impact column on mobile devices. Used in risk summary reports to highlight priority areas for security teams.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    risks: {
      description: 'Array of top risk items with severity, affected users, and impact details',
    },
  },
} satisfies Meta<typeof TopRisksTable>

export default meta
type Story = StoryObj<typeof meta>

const standardRisks = [
  {
    id: 'R-001',
    category: 'Data Exfiltration',
    description: 'Large file transfers to personal cloud storage detected',
    severity: 'critical' as const,
    affectedUsers: 12,
    impact: 'Potential intellectual property theft, regulatory compliance violation'
  },
  {
    id: 'R-002',
    category: 'Phishing Susceptibility',
    description: 'Users clicked simulated phishing links in recent tests',
    severity: 'high' as const,
    affectedUsers: 28,
    impact: 'Credential compromise risk, potential ransomware entry point'
  },
  {
    id: 'R-003',
    category: 'Weak Authentication',
    description: 'Single-factor authentication without MFA enabled',
    severity: 'high' as const,
    affectedUsers: 45,
    impact: 'Account takeover vulnerability, unauthorized access risk'
  },
  {
    id: 'R-004',
    category: 'Policy Violations',
    description: 'Repeated violations of data handling policies',
    severity: 'medium' as const,
    affectedUsers: 18,
    impact: 'Data leakage risk, audit findings, regulatory penalties'
  },
  {
    id: 'R-005',
    category: 'Outdated Software',
    description: 'Using unsupported software versions with known CVEs',
    severity: 'medium' as const,
    affectedUsers: 33,
    impact: 'Vulnerability exploitation, malware infection potential'
  }
]

/**
 * Default state with standard mix of severity levels.
 * Represents typical organizational risk profile.
 */
export const Default: Story = {
  args: {
    risks: standardRisks
  }
}

/**
 * All critical severity risks requiring immediate attention.
 * Indicates severe security posture requiring urgent action.
 */
export const AllCritical: Story = {
  args: {
    risks: [
      {
        id: 'R-001',
        category: 'Data Exfiltration',
        description: 'Massive unauthorized data transfer to external servers',
        severity: 'critical' as const,
        affectedUsers: 25,
        impact: 'Major intellectual property theft, regulatory breach'
      },
      {
        id: 'R-002',
        category: 'Ransomware Activity',
        description: 'Indicators of ransomware deployment detected',
        severity: 'critical' as const,
        affectedUsers: 15,
        impact: 'Business continuity threat, financial extortion'
      },
      {
        id: 'R-003',
        category: 'Privilege Escalation',
        description: 'Unauthorized admin access attempts detected',
        severity: 'critical' as const,
        affectedUsers: 8,
        impact: 'Complete system compromise, data breach potential'
      },
      {
        id: 'R-004',
        category: 'Insider Threat',
        description: 'Suspicious access patterns indicating malicious intent',
        severity: 'critical' as const,
        affectedUsers: 3,
        impact: 'Targeted data theft, sabotage risk'
      },
      {
        id: 'R-005',
        category: 'Zero-Day Exploit',
        description: 'Active exploitation of unpatched vulnerabilities',
        severity: 'critical' as const,
        affectedUsers: 42,
        impact: 'Widespread compromise, lateral movement'
      }
    ]
  }
}

/**
 * Mixed severities showing variety of risk levels.
 * Tests badge color rendering across all severity types.
 */
export const MixedSeverities: Story = {
  args: {
    risks: [
      {
        id: 'R-001',
        category: 'Critical Issue',
        description: 'Urgent security concern requiring immediate action',
        severity: 'critical' as const,
        affectedUsers: 10,
        impact: 'High impact security event'
      },
      {
        id: 'R-002',
        category: 'High Priority',
        description: 'Important security concern needing attention',
        severity: 'high' as const,
        affectedUsers: 20,
        impact: 'Significant risk factor'
      },
      {
        id: 'R-003',
        category: 'Medium Risk',
        description: 'Moderate security concern for monitoring',
        severity: 'medium' as const,
        affectedUsers: 30,
        impact: 'Medium impact potential'
      },
      {
        id: 'R-004',
        category: 'Low Priority',
        description: 'Minor security concern for future addressing',
        severity: 'low' as const,
        affectedUsers: 40,
        impact: 'Low impact observation'
      },
      {
        id: 'R-005',
        category: 'Informational',
        description: 'Security observation requiring awareness',
        severity: 'low' as const,
        affectedUsers: 50,
        impact: 'Minimal risk factor'
      }
    ]
  }
}

/**
 * Long descriptions to test text truncation.
 * Ensures UI remains clean with verbose content.
 */
export const LongDescriptions: Story = {
  args: {
    risks: [
      {
        id: 'R-001',
        category: 'Data Exfiltration',
        description: 'Multiple users have been detected transferring extremely large volumes of sensitive corporate data to unauthorized personal cloud storage accounts, including proprietary source code, customer databases, and financial records',
        severity: 'critical' as const,
        affectedUsers: 12,
        impact: 'Severe intellectual property theft risk, potential multi-million dollar liability, SEC reporting requirements, customer notification mandates under GDPR and CCPA, potential class action lawsuits'
      },
      {
        id: 'R-002',
        category: 'Credential Compromise',
        description: 'Advanced persistent threat actors have gained unauthorized access to administrative credentials through sophisticated phishing campaign targeting C-level executives and IT administrators',
        severity: 'critical' as const,
        affectedUsers: 8,
        impact: 'Complete infrastructure compromise potential, unauthorized access to all systems and data repositories, ability to deploy ransomware or destructive malware across entire network'
      },
      {
        id: 'R-003',
        category: 'Policy Violations',
        description: 'Systematic non-compliance with established data handling and security policies',
        severity: 'high' as const,
        affectedUsers: 35,
        impact: 'Regulatory audit failures, compliance violations'
      },
      {
        id: 'R-004',
        category: 'Training Gap',
        description: 'Insufficient security awareness training completion rates',
        severity: 'medium' as const,
        affectedUsers: 67,
        impact: 'Increased susceptibility to social engineering'
      },
      {
        id: 'R-005',
        category: 'Software Updates',
        description: 'Delayed application of critical security patches',
        severity: 'medium' as const,
        affectedUsers: 23,
        impact: 'Vulnerability window exposure'
      }
    ]
  }
}

/**
 * High user counts to test number formatting.
 * Validates display of large affected user populations.
 */
export const HighUserCounts: Story = {
  args: {
    risks: [
      {
        id: 'R-001',
        category: 'Password Policy',
        description: 'Weak passwords not meeting complexity requirements',
        severity: 'high' as const,
        affectedUsers: 1247,
        impact: 'Brute force attack vulnerability'
      },
      {
        id: 'R-002',
        category: 'MFA Adoption',
        description: 'Multi-factor authentication not enabled',
        severity: 'high' as const,
        affectedUsers: 892,
        impact: 'Account takeover risk'
      },
      {
        id: 'R-003',
        category: 'Training Compliance',
        description: 'Mandatory security training not completed',
        severity: 'medium' as const,
        affectedUsers: 456,
        impact: 'Knowledge gap exposure'
      },
      {
        id: 'R-004',
        category: 'Device Encryption',
        description: 'Endpoint encryption not deployed',
        severity: 'medium' as const,
        affectedUsers: 334,
        impact: 'Data at rest exposure'
      },
      {
        id: 'R-005',
        category: 'VPN Usage',
        description: 'Remote access without VPN protection',
        severity: 'low' as const,
        affectedUsers: 178,
        impact: 'Network traffic interception risk'
      }
    ]
  }
}
