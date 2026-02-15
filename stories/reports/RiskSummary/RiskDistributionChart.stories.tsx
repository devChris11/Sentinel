import type { Meta, StoryObj } from '@storybook/react'
import { RiskDistributionChart } from '@/components/reports/risk-summary/risk-distribution-chart'

const meta = {
  title: 'Reports/RiskSummary/RiskDistributionChart',
  component: RiskDistributionChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Donut chart displaying the distribution of users across risk severity levels. Color-coded by severity: Critical (red), High (orange), Medium (amber), Low (green). Interactive tooltips show user counts and percentages. Used in executive dashboards to visualize security posture across the user base.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    distribution: {
      description: 'User count distribution across severity levels',
    },
  },
} satisfies Meta<typeof RiskDistributionChart>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default state with balanced distribution across severity levels.
 * Represents a typical organizational risk profile.
 */
export const Default: Story = {
  args: {
    distribution: {
      critical: 10,
      high: 12,
      medium: 13,
      low: 15
    }
  }
}

/**
 * Critical-heavy distribution indicating many high-risk users
 * requiring immediate attention and intervention.
 */
export const CriticalHeavy: Story = {
  args: {
    distribution: {
      critical: 25,
      high: 8,
      medium: 5,
      low: 2
    }
  }
}

/**
 * Low risk majority indicating excellent security posture
 * with most users in the safe zone.
 */
export const LowRiskMajority: Story = {
  args: {
    distribution: {
      critical: 2,
      high: 3,
      medium: 5,
      low: 40
    }
  }
}

/**
 * Equal distribution across all severity levels.
 * Useful for testing chart balance and layout.
 */
export const EqualDistribution: Story = {
  args: {
    distribution: {
      critical: 15,
      high: 15,
      medium: 15,
      low: 15
    }
  }
}

/**
 * Small dataset with minimal users to test
 * chart rendering with low numbers.
 */
export const SmallDataset: Story = {
  args: {
    distribution: {
      critical: 2,
      high: 3,
      medium: 4,
      low: 5
    }
  }
}

/**
 * High and medium focused distribution showing
 * elevated risk requiring attention.
 */
export const ElevatedRisk: Story = {
  args: {
    distribution: {
      critical: 5,
      high: 18,
      medium: 20,
      low: 7
    }
  }
}
