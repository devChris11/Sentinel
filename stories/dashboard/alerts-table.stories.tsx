import type { Meta, StoryObj } from '@storybook/react'
import { AlertsTable } from '@/components/dashboard/alerts-table'
import type { SecurityAlert } from '@/lib/dashboard-data'

const meta = {
  title: 'Dashboard/AlertsTable',
  component: AlertsTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Recent Security Alerts Table\n\n' +
          'Displays the first 8 incidents from the unified INCIDENTS data source.\n\n' +
          '### Key Changes (Incidents Integration)\n\n' +
          '- ✅ **Actions Column Removed**: Table now has 5 columns (was 6)\n' +
          '- ✅ **Direct Navigation**: Row click navigates to `/incidents?open={id}` with auto-open side panel\n' +
          '- ✅ **Unified Data**: Uses `getDashboardAlerts()` from incidents-data.ts\n' +
          '- ✅ **View All Button**: Added "View All Incidents →" button below table\n\n' +
          '### Table Columns\n\n' +
          '1. **Severity**: Colored dot + icon (Critical/High/Medium/Low)\n' +
          '2. **Alert**: Title and description\n' +
          '3. **User**: Avatar, name, email\n' +
          '4. **Time**: Relative timestamp (uses formatRelativeTime)\n' +
          '5. **Status**: Badge (New/Acknowledged/In Progress/Resolved/Dismissed)\n\n' +
          '### Design Tokens\n\n' +
          'Uses Sentinel design tokens: Card Surface (#FEFEFE), Border (#E2E8F0), BG (#F8FAFC), Text colors (#0F172A, #475569, #64748B).\n\n' +
          '### Severity Colors\n\n' +
          '- Critical: #EF4444 (Red)\n' +
          '- High: #F97316 (Orange)\n' +
          '- Medium: #F59E0B (Amber)\n' +
          '- Low: #10B981 (Green)\n\n' +
          '### Status Colors\n\n' +
          '- New: #3B82F6 (Blue - Info)\n' +
          '- Acknowledged: #F59E0B (Amber - Warning)\n' +
          '- In Progress: #F97316 (Orange)\n' +
          '- Resolved: #10B981 (Green - Success)\n' +
          '- Dismissed: #6B7280 (Gray)',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-[#F8FAFC] p-8">
        <Story />
      </div>
    ),
  ],
  args: {
    setAlerts: (() => {}) as import('react').Dispatch<import('react').SetStateAction<SecurityAlert[]>>,
  },
} satisfies Meta<typeof AlertsTable>

export default meta
type Story = StoryObj<typeof meta>

const defaultAlerts: SecurityAlert[] = [
  {
    id: "alert-1",
    severity: "critical",
    title: "Multiple Failed Login Attempts",
    description: "15 failed login attempts from IP 192.168.1.45",
    user: { name: "Sarah Chen", email: "s.chen@company.com" },
    timestamp: "2 minutes ago",
    status: "new"
  },
  {
    id: "alert-2",
    severity: "high",
    title: "Suspicious File Download",
    description: "Large dataset downloaded outside business hours",
    user: { name: "Michael Rodriguez", email: "m.rodriguez@company.com" },
    timestamp: "12 minutes ago",
    status: "in-progress"
  },
  {
    id: "alert-3",
    severity: "medium",
    title: "Unusual Login Location",
    description: "Login from new geographic location (Tokyo, Japan)",
    user: { name: "Emma Thompson", email: "e.thompson@company.com" },
    timestamp: "1 hour ago",
    status: "in-progress"
  },
  {
    id: "alert-4",
    severity: "high",
    title: "Privilege Escalation Attempt",
    description: "Unauthorized admin access attempt detected",
    user: { name: "David Park", email: "d.park@company.com" },
    timestamp: "2 hours ago",
    status: "new"
  },
  {
    id: "alert-5",
    severity: "low",
    title: "Policy Violation",
    description: "Accessed restricted website during work hours",
    user: { name: "Jessica Martinez", email: "j.martinez@company.com" },
    timestamp: "3 hours ago",
    status: "resolved"
  },
  {
    id: "alert-6",
    severity: "critical",
    title: "Ransomware Pattern Detected",
    description: "File encryption activity detected on endpoint",
    user: { name: "Robert Kim", email: "r.kim@company.com" },
    timestamp: "4 hours ago",
    status: "in-progress"
  },
  {
    id: "alert-7",
    severity: "medium",
    title: "Phishing Email Interaction",
    description: "User clicked on suspicious email link",
    user: { name: "Olivia Brown", email: "o.brown@company.com" },
    timestamp: "5 hours ago",
    status: "resolved"
  },
  {
    id: "alert-8",
    severity: "low",
    title: "USB Device Connected",
    description: "Unregistered USB device connected to workstation",
    user: { name: "James Wilson", email: "j.wilson@company.com" },
    timestamp: "6 hours ago",
    status: "dismissed"
  }
]

const criticalOnlyAlerts: SecurityAlert[] = [
  {
    id: "alert-1",
    severity: "critical",
    title: "Multiple Failed Login Attempts",
    description: "15 failed login attempts from IP 192.168.1.45",
    user: { name: "Sarah Chen", email: "s.chen@company.com" },
    timestamp: "2 minutes ago",
    status: "new"
  },
  {
    id: "alert-6",
    severity: "critical",
    title: "Ransomware Pattern Detected",
    description: "File encryption activity detected on endpoint",
    user: { name: "Robert Kim", email: "r.kim@company.com" },
    timestamp: "4 hours ago",
    status: "in-progress"
  },
  {
    id: "alert-9",
    severity: "critical",
    title: "Data Breach Attempt",
    description: "Unauthorized database access detected",
    user: { name: "Alice Johnson", email: "a.johnson@company.com" },
    timestamp: "1 hour ago",
    status: "new"
  }
]

const singleAlert: SecurityAlert[] = [
  {
    id: "alert-1",
    severity: "critical",
    title: "Multiple Failed Login Attempts",
    description: "15 failed login attempts from IP 192.168.1.45",
    user: { name: "Sarah Chen", email: "s.chen@company.com" },
    timestamp: "2 minutes ago",
    status: "new"
  }
]

const emptyAlerts: SecurityAlert[] = []

const resolvedAlerts: SecurityAlert[] = [
  {
    id: "alert-1",
    severity: "medium",
    title: "Phishing Email Interaction",
    description: "User clicked on suspicious email link",
    user: { name: "Olivia Brown", email: "o.brown@company.com" },
    timestamp: "5 hours ago",
    status: "resolved"
  },
  {
    id: "alert-2",
    severity: "low",
    title: "Policy Violation",
    description: "Accessed restricted website during work hours",
    user: { name: "Jessica Martinez", email: "j.martinez@company.com" },
    timestamp: "3 hours ago",
    status: "resolved"
  },
  {
    id: "alert-3",
    severity: "high",
    title: "Suspicious File Download",
    description: "Large dataset downloaded outside business hours",
    user: { name: "Michael Rodriguez", email: "m.rodriguez@company.com" },
    timestamp: "yesterday",
    status: "resolved"
  }
]

export const Default: Story = {
  args: {
    alerts: defaultAlerts
  },
  parameters: {
    docs: {
      description: {
        story: 
          'Full table with 8 security alerts showing various severity levels and statuses. ' +
          'This is the standard view on the Dashboard page. ' +
          'Note: In production, this uses the first 8 incidents from `INCIDENTS` array via `getDashboardAlerts()`. ' +
          'Clicking any row navigates to `/incidents?open={id}` with auto-open side panel. ' +
          'Actions column has been removed - no three-dot menu.'
      }
    }
  }
}

export const CriticalOnly: Story = {
  args: {
    alerts: criticalOnlyAlerts
  },
  parameters: {
    docs: {
      description: {
        story: 'Table filtered to show only critical severity alerts.'
      }
    }
  }
}

export const SingleRow: Story = {
  args: {
    alerts: singleAlert
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a single alert row.'
      }
    }
  }
}

export const EmptyState: Story = {
  args: {
    alerts: emptyAlerts
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with no alerts (empty state).'
      }
    }
  }
}

export const ResolvedOnly: Story = {
  args: {
    alerts: resolvedAlerts
  },
  parameters: {
    docs: {
      description: {
        story: 'Table showing only resolved alerts with green status badges.'
      }
    }
  }
}

export const AllSeverities: Story = {
  args: {
    alerts: [
      {
        id: "alert-1",
        severity: "critical",
        title: "Critical Alert Example",
        description: "This is a critical severity alert",
        user: { name: "John Doe", email: "j.doe@company.com" },
        timestamp: "1 min ago",
        status: "new"
      },
      {
        id: "alert-2",
        severity: "high",
        title: "High Alert Example",
        description: "This is a high severity alert",
        user: { name: "Jane Smith", email: "j.smith@company.com" },
        timestamp: "5 min ago",
        status: "in-progress"
      },
      {
        id: "alert-3",
        severity: "medium",
        title: "Medium Alert Example",
        description: "This is a medium severity alert",
        user: { name: "Bob Johnson", email: "b.johnson@company.com" },
        timestamp: "10 min ago",
        status: "resolved"
      },
      {
        id: "alert-4",
        severity: "low",
        title: "Low Alert Example",
        description: "This is a low severity alert",
        user: { name: "Alice Williams", email: "a.williams@company.com" },
        timestamp: "15 min ago",
        status: "dismissed"
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all four severity levels: critical (red), high (orange), medium (yellow), low (blue).'
      }
    }
  }
}

export const AllStatuses: Story = {
  args: {
    alerts: [
      {
        id: "alert-1",
        severity: "critical",
        title: "New Status Example",
        description: "Alert with new status",
        user: { name: "John Doe", email: "j.doe@company.com" },
        timestamp: "1 min ago",
        status: "new"
      },
      {
        id: "alert-2",
        severity: "high",
        title: "In Progress Status Example",
        description: "Alert with in-progress status",
        user: { name: "Jane Smith", email: "j.smith@company.com" },
        timestamp: "5 min ago",
        status: "in-progress"
      },
      {
        id: "alert-3",
        severity: "medium",
        title: "Resolved Status Example",
        description: "Alert with resolved status",
        user: { name: "Bob Johnson", email: "b.johnson@company.com" },
        timestamp: "10 min ago",
        status: "resolved"
      },
      {
        id: "alert-4",
        severity: "low",
        title: "Dismissed Status Example",
        description: "Alert with dismissed status",
        user: { name: "Alice Williams", email: "a.williams@company.com" },
        timestamp: "15 min ago",
        status: "dismissed"
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all four status types: new (primary), in-progress (warning), resolved (success), dismissed (gray).'
      }
    }
  }
}
