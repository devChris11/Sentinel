import type { Meta, StoryObj } from '@storybook/react'
import { RiskTrendChart } from '@/components/dashboard/risk-trend-chart'
import type { ChartDataPoint } from '@/lib/dashboard-data'

const meta = {
  title: 'Dashboard/RiskTrendChart',
  component: RiskTrendChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          'The RiskTrendChart component displays risk score trends over time using a line chart. ' +
          'Features a danger threshold reference line at 7.0 and interactive tooltips. ' +
          'Uses Sentinel design tokens: Primary line (#6366F1), Danger threshold (#EF4444), ' +
          'Card Surface (#FEFEFE), Border (#E2E8F0), Text colors (#0F172A, #64748B). ' +
          'Built with Recharts library.',
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
} satisfies Meta<typeof RiskTrendChart>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: ChartDataPoint[] = [
  { date: "Jan 1", value: 6.2 },
  { date: "Jan 2", value: 6.5 },
  { date: "Jan 3", value: 6.8 },
  { date: "Jan 4", value: 7.1 },
  { date: "Jan 5", value: 6.9 },
  { date: "Jan 6", value: 6.7 },
  { date: "Jan 7", value: 6.4 },
  { date: "Jan 8", value: 6.3 },
  { date: "Jan 9", value: 6.6 },
  { date: "Jan 10", value: 6.8 },
  { date: "Jan 11", value: 7.0 },
  { date: "Jan 12", value: 6.9 },
  { date: "Jan 13", value: 6.5 },
  { date: "Jan 14", value: 6.2 },
  { date: "Jan 15", value: 6.4 },
  { date: "Jan 16", value: 6.7 },
  { date: "Jan 17", value: 6.9 },
  { date: "Jan 18", value: 7.2 },
  { date: "Jan 19", value: 7.0 },
  { date: "Jan 20", value: 6.8 },
  { date: "Jan 21", value: 6.5 },
  { date: "Jan 22", value: 6.3 },
  { date: "Jan 23", value: 6.1 },
  { date: "Jan 24", value: 5.9 },
  { date: "Jan 25", value: 6.0 },
  { date: "Jan 26", value: 6.3 },
  { date: "Jan 27", value: 6.5 },
  { date: "Jan 28", value: 6.7 },
  { date: "Jan 29", value: 6.8 },
  { date: "Jan 30", value: 6.6 },
]

const highRiskData: ChartDataPoint[] = [
  { date: "Jan 1", value: 7.5 },
  { date: "Jan 2", value: 7.8 },
  { date: "Jan 3", value: 8.0 },
  { date: "Jan 4", value: 8.2 },
  { date: "Jan 5", value: 7.9 },
  { date: "Jan 6", value: 7.7 },
  { date: "Jan 7", value: 7.5 },
]

const lowRiskData: ChartDataPoint[] = [
  { date: "Jan 1", value: 3.2 },
  { date: "Jan 2", value: 3.5 },
  { date: "Jan 3", value: 3.8 },
  { date: "Jan 4", value: 3.6 },
  { date: "Jan 5", value: 3.3 },
  { date: "Jan 6", value: 3.1 },
  { date: "Jan 7", value: 3.4 },
]

const emptyData: ChartDataPoint[] = []

export const Default: Story = {
  args: {
    data: defaultData
  },
  parameters: {
    docs: {
      description: {
        story: 'Default 30-day risk trend chart with values fluctuating around the danger threshold.'
      }
    }
  }
}

export const HighRisk: Story = {
  args: {
    data: highRiskData
  },
  parameters: {
    docs: {
      description: {
        story: 'Risk trend showing consistently high values above the danger threshold (7.0).'
      }
    }
  }
}

export const LowRisk: Story = {
  args: {
    data: lowRiskData
  },
  parameters: {
    docs: {
      description: {
        story: 'Risk trend showing low values well below the danger threshold.'
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
        story: 'Chart with no data points (empty state).'
      }
    }
  }
}

export const SingleWeek: Story = {
  args: {
    data: [
      { date: "Mon", value: 6.5 },
      { date: "Tue", value: 6.8 },
      { date: "Wed", value: 7.1 },
      { date: "Thu", value: 6.9 },
      { date: "Fri", value: 6.6 },
      { date: "Sat", value: 6.3 },
      { date: "Sun", value: 6.4 },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'One week of risk data showing daily trends.'
      }
    }
  }
}

export const VolatilePattern: Story = {
  args: {
    data: [
      { date: "Day 1", value: 5.5 },
      { date: "Day 2", value: 7.5 },
      { date: "Day 3", value: 6.0 },
      { date: "Day 4", value: 8.0 },
      { date: "Day 5", value: 5.8 },
      { date: "Day 6", value: 7.2 },
      { date: "Day 7", value: 6.5 },
      { date: "Day 8", value: 7.8 },
      { date: "Day 9", value: 6.2 },
      { date: "Day 10", value: 7.0 },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Highly volatile risk pattern with sharp fluctuations.'
      }
    }
  }
}
