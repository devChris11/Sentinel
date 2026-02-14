import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from '@/components/dashboard/stat-card'
import type { DashboardMetric } from '@/lib/dashboard-data'

const meta = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          'The StatCard component displays key dashboard metrics with trend indicators and threshold badges. ' +
          'Uses Sentinel design tokens: Primary (#6366F1), Success (#10B981), Warning (#F59E0B), Danger (#EF4444), ' +
          'Text Strong (#0F172A), Text Default (#475569), Text Muted (#64748B), Card Surface (#FEFEFE), Border (#E2E8F0).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-[#F8FAFC] p-8">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

const riskScoreMetric: DashboardMetric = {
  id: "risk-score",
  label: "Overall Risk Score",
  value: 6.8,
  unit: "/10",
  trend: {
    direction: "down",
    percentage: 8,
    isPositive: true
  },
  timeContext: "vs. last period",
  description: "Aggregated risk across all monitored users",
  threshold: {
    label: "Moderate Risk",
    status: "warning"
  }
}

const incidentsMetric: DashboardMetric = {
  id: "active-incidents",
  label: "Active Incidents",
  value: 23,
  trend: {
    direction: "up",
    percentage: 12,
    isPositive: false
  },
  timeContext: "vs. last period",
  description: "Incidents requiring investigation",
  threshold: {
    label: "High Activity",
    status: "critical"
  }
}

const usersMetric: DashboardMetric = {
  id: "users-monitored",
  label: "Users Monitored",
  value: 1247,
  trend: {
    direction: "up",
    percentage: 3,
    isPositive: true
  },
  timeContext: "vs. last period",
  description: "Active user accounts under surveillance"
}

const responseTimeMetric: DashboardMetric = {
  id: "response-time",
  label: "Avg Response Time",
  value: 2.3,
  unit: "hrs",
  trend: {
    direction: "down",
    percentage: 15,
    isPositive: true
  },
  timeContext: "vs. last period",
  description: "Mean time to incident response",
  threshold: {
    label: "Optimal",
    status: "normal"
  }
}

export const RiskScore: Story = {
  args: {
    metric: riskScoreMetric
  },
  parameters: {
    docs: {
      description: {
        story: 'Risk score metric with warning threshold badge and positive downward trend.'
      }
    }
  }
}

export const ActiveIncidents: Story = {
  args: {
    metric: incidentsMetric
  },
  parameters: {
    docs: {
      description: {
        story: 'Incidents metric with critical threshold badge and negative upward trend.'
      }
    }
  }
}

export const UsersMonitored: Story = {
  args: {
    metric: usersMetric
  },
  parameters: {
    docs: {
      description: {
        story: 'Users metric without threshold badge, showing positive upward trend.'
      }
    }
  }
}

export const ResponseTime: Story = {
  args: {
    metric: responseTimeMetric
  },
  parameters: {
    docs: {
      description: {
        story: 'Response time metric with normal threshold badge and positive downward trend.'
      }
    }
  }
}

export const AllMetrics: Story = {
  args: {
    metric: riskScoreMetric
  },
  parameters: {
    docs: {
      description: {
        story: 'All four dashboard metrics displayed in a grid layout.'
      }
    }
  },
  decorators: [
    () => (
      <div className="bg-[#F8FAFC] p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard metric={riskScoreMetric} />
          <StatCard metric={incidentsMetric} />
          <StatCard metric={usersMetric} />
          <StatCard metric={responseTimeMetric} />
        </div>
      </div>
    ),
  ],
}

export const PositiveTrend: Story = {
  args: {
    metric: {
      id: "resolved",
      label: "Resolved Issues",
      value: 89,
      trend: {
        direction: "up",
        percentage: 24,
        isPositive: true
      },
      timeContext: "vs. yesterday",
      threshold: {
        label: "Excellent",
        status: "normal"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric showing positive upward trend (green color).'
      }
    }
  }
}

export const NegativeTrend: Story = {
  args: {
    metric: {
      id: "breaches",
      label: "Security Breaches",
      value: 5,
      trend: {
        direction: "up",
        percentage: 67,
        isPositive: false
      },
      timeContext: "vs. last week",
      description: "Unauthorized access attempts",
      threshold: {
        label: "Critical",
        status: "critical"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric showing negative upward trend (red color).'
      }
    }
  }
}

export const NeutralTrend: Story = {
  args: {
    metric: {
      id: "stable",
      label: "System Uptime",
      value: 99.9,
      unit: "%",
      trend: {
        direction: "neutral",
        percentage: 0,
        isPositive: true
      },
      timeContext: "this month",
      description: "Platform availability"
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Metric showing neutral trend with no change.'
      }
    }
  }
}
