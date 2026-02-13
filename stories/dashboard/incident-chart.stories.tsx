import type { Meta, StoryObj } from '@storybook/react'
import { IncidentChart } from '@/components/dashboard/incident-chart'
import type { IncidentCategory } from '@/lib/dashboard-data'

const meta = {
  title: 'Dashboard/IncidentChart',
  component: IncidentChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          'The IncidentChart component displays security incident counts by category using a bar chart. ' +
          'Each category is color-coded for visual distinction. ' +
          'Uses Sentinel design tokens: Card Surface (#FEFEFE), Border (#E2E8F0), Alt BG (#F1F5F9), ' +
          'Text colors (#0F172A, #64748B). Category colors include Danger (#EF4444), Warning (#F59E0B), ' +
          'Primary (#6366F1), and additional accent colors. Built with Recharts library.',
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
} satisfies Meta<typeof IncidentChart>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: IncidentCategory[] = [
  { category: "Phishing", fullName: "Phishing Attempts", count: 45, color: "#EF4444" },
  { category: "Logins", fullName: "Suspicious Logins", count: 23, color: "#F59E0B" },
  { category: "Exfiltration", fullName: "Data Exfiltration", count: 12, color: "#6366F1" },
  { category: "Policy", fullName: "Policy Violations", count: 34, color: "#8B5CF6" },
  { category: "Malware", fullName: "Malware Detected", count: 8, color: "#EC4899" },
  { category: "Unauth Access", fullName: "Unauthorized Access", count: 16, color: "#14B8A6" },
]

const highVolumeData: IncidentCategory[] = [
  { category: "Phishing", fullName: "Phishing Attempts", count: 156, color: "#EF4444" },
  { category: "Logins", fullName: "Suspicious Logins", count: 89, color: "#F59E0B" },
  { category: "Exfiltration", fullName: "Data Exfiltration", count: 45, color: "#6366F1" },
  { category: "Policy", fullName: "Policy Violations", count: 112, color: "#8B5CF6" },
  { category: "Malware", fullName: "Malware Detected", count: 34, color: "#EC4899" },
  { category: "Unauth Access", fullName: "Unauthorized Access", count: 67, color: "#14B8A6" },
]

const lowVolumeData: IncidentCategory[] = [
  { category: "Phishing", fullName: "Phishing Attempts", count: 3, color: "#EF4444" },
  { category: "Logins", fullName: "Suspicious Logins", count: 1, color: "#F59E0B" },
  { category: "Exfiltration", fullName: "Data Exfiltration", count: 0, color: "#6366F1" },
  { category: "Policy", fullName: "Policy Violations", count: 2, color: "#8B5CF6" },
]

const emptyData: IncidentCategory[] = []

const singleCategory: IncidentCategory[] = [
  { category: "Phishing", fullName: "Phishing Attempts", count: 45, color: "#EF4444" },
]

export const Default: Story = {
  args: {
    data: defaultData
  },
  parameters: {
    docs: {
      description: {
        story: 'Default incident breakdown showing 6 security incident categories with moderate counts.'
      }
    }
  }
}

export const HighVolume: Story = {
  args: {
    data: highVolumeData
  },
  parameters: {
    docs: {
      description: {
        story: 'High-volume incident data showing elevated security activity across all categories.'
      }
    }
  }
}

export const LowVolume: Story = {
  args: {
    data: lowVolumeData
  },
  parameters: {
    docs: {
      description: {
        story: 'Low-volume incident data with minimal security incidents and some zero counts.'
      }
    }
  }
}

export const EmptyState: Story = {
  args: {
    data: emptyData
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart with no incident data (empty state).'
      }
    }
  }
}

export const SingleCategory: Story = {
  args: {
    data: singleCategory
  },
  parameters: {
    docs: {
      description: {
        story: 'Chart showing only one incident category.'
      }
    }
  }
}

export const PhishingDominant: Story = {
  args: {
    data: [
      { category: "Phishing", fullName: "Phishing Attempts", count: 234, color: "#EF4444" },
      { category: "Logins", fullName: "Suspicious Logins", count: 12, color: "#F59E0B" },
      { category: "Exfiltration", fullName: "Data Exfiltration", count: 5, color: "#6366F1" },
      { category: "Policy", fullName: "Policy Violations", count: 8, color: "#8B5CF6" },
      { category: "Malware", fullName: "Malware Detected", count: 3, color: "#EC4899" },
      { category: "Unauth Access", fullName: "Unauthorized Access", count: 6, color: "#14B8A6" },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Incident pattern where phishing attacks significantly outnumber other categories.'
      }
    }
  }
}

export const BalancedDistribution: Story = {
  args: {
    data: [
      { category: "Phishing", fullName: "Phishing Attempts", count: 25, color: "#EF4444" },
      { category: "Logins", fullName: "Suspicious Logins", count: 27, color: "#F59E0B" },
      { category: "Exfiltration", fullName: "Data Exfiltration", count: 24, color: "#6366F1" },
      { category: "Policy", fullName: "Policy Violations", count: 26, color: "#8B5CF6" },
      { category: "Malware", fullName: "Malware Detected", count: 23, color: "#EC4899" },
      { category: "Unauth Access", fullName: "Unauthorized Access", count: 25, color: "#14B8A6" },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Evenly distributed incidents across all categories.'
      }
    }
  }
}
