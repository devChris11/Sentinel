import type { Meta, StoryObj } from '@storybook/react'
import { HeroMetric } from '@/components/reports/risk-summary/hero-metric'

const meta = {
  title: 'Reports/RiskSummary/HeroMetric',
  component: HeroMetric,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Hero metric card displaying overall risk score with trend indicator and comparison to previous period. The score is color-coded based on severity: green (0-3), amber (4-6), orange (7-8), and red (9-10). Used in executive dashboards and board reporting to provide an at-a-glance view of organizational security posture.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'Current risk score (0-10 scale)',
    },
    previous: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'Previous period risk score for comparison',
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'stable'],
      description: 'Trend direction relative to previous period',
    },
    percentChange: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Percentage change from previous period',
    },
  },
} satisfies Meta<typeof HeroMetric>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default state showing a medium-high risk score with improving trend.
 * Score of 6.8 is displayed in amber color, indicating moderate risk.
 */
export const Default: Story = {
  args: {
    current: 6.8,
    previous: 7.4,
    trend: 'down',
    percentChange: 8
  }
}

/**
 * Low risk scenario - score under 3 displays in green, indicating
 * excellent security posture across the organization.
 */
export const LowRisk: Story = {
  args: {
    current: 2.4,
    previous: 2.8,
    trend: 'down',
    percentChange: 14
  }
}

/**
 * Medium risk range (4-6) displays in amber/yellow, suggesting
 * acceptable but improvable security posture.
 */
export const MediumRisk: Story = {
  args: {
    current: 5.3,
    previous: 5.0,
    trend: 'up',
    percentChange: 6
  }
}

/**
 * High risk scenario (7-8) displays in orange, indicating
 * elevated risk requiring immediate attention.
 */
export const HighRisk: Story = {
  args: {
    current: 7.6,
    previous: 7.2,
    trend: 'up',
    percentChange: 5
  }
}

/**
 * Critical risk scenario (9-10) displays in red, indicating
 * severe security concerns requiring urgent action.
 */
export const CriticalRisk: Story = {
  args: {
    current: 9.2,
    previous: 8.8,
    trend: 'up',
    percentChange: 5
  }
}

/**
 * Improving trend shown with down arrow and green color,
 * indicating positive security posture changes.
 */
export const ImprovingTrend: Story = {
  args: {
    current: 5.1,
    previous: 6.9,
    trend: 'down',
    percentChange: 26
  }
}

/**
 * Worsening trend shown with up arrow and red color,
 * indicating deteriorating security posture.
 */
export const WorseningTrend: Story = {
  args: {
    current: 7.8,
    previous: 6.2,
    trend: 'up',
    percentChange: 26
  }
}

/**
 * Stable trend with horizontal line indicator, showing
 * minimal change from previous period.
 */
export const StableTrend: Story = {
  args: {
    current: 6.8,
    previous: 6.9,
    trend: 'stable',
    percentChange: 1
  }
}
