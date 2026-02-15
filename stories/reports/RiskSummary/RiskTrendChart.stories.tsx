import type { Meta, StoryObj } from '@storybook/react'
import { RiskTrendChart } from '@/components/reports/risk-summary/risk-trend-chart'

const meta = {
  title: 'Reports/RiskSummary/RiskTrendChart',
  component: RiskTrendChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Area chart showing risk score trend over time with danger threshold reference line at 7.0. The gradient fill and interactive tooltips provide clear visualization of risk trajectory. Supports daily, weekly, and monthly date ranges for different analysis periods.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Time series data with date labels and risk scores',
    },
  },
} satisfies Meta<typeof RiskTrendChart>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default 6-month trend showing gradual improvement
 * in organizational risk score over time.
 */
export const Default: Story = {
  args: {
    data: [
      { date: 'Sep', score: 7.8 },
      { date: 'Oct', score: 7.6 },
      { date: 'Nov', score: 7.2 },
      { date: 'Dec', score: 7.0 },
      { date: 'Jan', score: 6.8 },
      { date: 'Feb', score: 6.8 },
    ]
  }
}

/**
 * Improving trend showing consistent downward trajectory.
 * Indicates successful security initiatives and training programs.
 */
export const ImprovingTrend: Story = {
  args: {
    data: [
      { date: 'Sep', score: 8.2 },
      { date: 'Oct', score: 7.8 },
      { date: 'Nov', score: 7.4 },
      { date: 'Dec', score: 7.0 },
      { date: 'Jan', score: 6.6 },
      { date: 'Feb', score: 6.2 },
    ]
  }
}

/**
 * Worsening trend showing consistent upward trajectory.
 * Indicates deteriorating security posture requiring intervention.
 */
export const WorseningTrend: Story = {
  args: {
    data: [
      { date: 'Sep', score: 5.8 },
      { date: 'Oct', score: 6.2 },
      { date: 'Nov', score: 6.6 },
      { date: 'Dec', score: 7.0 },
      { date: 'Jan', score: 7.4 },
      { date: 'Feb', score: 7.8 },
    ]
  }
}

/**
 * Volatile pattern with significant ups and downs.
 * May indicate inconsistent security practices or external factors.
 */
export const Volatile: Story = {
  args: {
    data: [
      { date: 'Sep', score: 6.5 },
      { date: 'Oct', score: 7.8 },
      { date: 'Nov', score: 6.2 },
      { date: 'Dec', score: 8.1 },
      { date: 'Jan', score: 6.8 },
      { date: 'Feb', score: 7.5 },
    ]
  }
}

/**
 * Stable trend showing minimal variation over time.
 * Indicates consistent security posture.
 */
export const Stable: Story = {
  args: {
    data: [
      { date: 'Sep', score: 6.7 },
      { date: 'Oct', score: 6.8 },
      { date: 'Nov', score: 6.6 },
      { date: 'Dec', score: 6.9 },
      { date: 'Jan', score: 6.7 },
      { date: 'Feb', score: 6.8 },
    ]
  }
}

/**
 * All scores above danger threshold (7.0) indicating
 * elevated risk across entire time period.
 */
export const AboveDangerThreshold: Story = {
  args: {
    data: [
      { date: 'Sep', score: 7.8 },
      { date: 'Oct', score: 8.2 },
      { date: 'Nov', score: 7.9 },
      { date: 'Dec', score: 8.5 },
      { date: 'Jan', score: 8.1 },
      { date: 'Feb', score: 7.6 },
    ]
  }
}

/**
 * Weekly view with 7 days of data showing
 * short-term risk fluctuations.
 */
export const WeeklyView: Story = {
  args: {
    data: [
      { date: 'Feb 9', score: 7.3 },
      { date: 'Feb 10', score: 7.2 },
      { date: 'Feb 11', score: 7.1 },
      { date: 'Feb 12', score: 7.0 },
      { date: 'Feb 13', score: 7.1 },
      { date: 'Feb 14', score: 7.1 },
      { date: 'Feb 15', score: 7.1 },
    ]
  }
}
