import type { Meta, StoryObj } from "@storybook/react"
import { MetricsCards } from "@/components/reports/user-behavior-analytics/metrics-cards"
import type { SummaryMetrics } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/MetricsCards",
  component: MetricsCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Metrics Cards Component\n\nDisplays four key metrics for User Behavior Analytics: Avg Reporting Rate, Avg Time to Report, Training Completion, and Real Threats Reported. Design matches dashboard and risk scoring: title in camel/title case, no icon. Each card shows the current value, trend vs last period (green up = positive for most metrics; for Time to Report, green down = positive as lower is better), and benchmark comparison. Card padding p-6, vertical spacing gap-2.\n\nRelated: [DepartmentChart](./DepartmentChart), [ReportFilters](./ReportFilters), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MetricsCards>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: SummaryMetrics = {
  avgReportingRate: 84,
  avgReportingRateChange: 5,
  avgTimeToReport: 1.8,
  avgTimeToReportChange: -15,
  trainingCompletion: 94,
  trainingCompletionChange: 7,
  realThreatReports: 127,
  realThreatReportsChange: 18,
  realThreatReportsLastMonth: 108,
}

export const Default: Story = {
  args: { data: defaultData },
}

export const PositiveTrends: Story = {
  args: {
    data: {
      ...defaultData,
      avgReportingRateChange: 12,
      avgTimeToReportChange: -20,
      trainingCompletionChange: 8,
      realThreatReportsChange: 25,
    },
  },
}

export const NegativeTrends: Story = {
  args: {
    data: {
      ...defaultData,
      avgReportingRateChange: -5,
      avgTimeToReportChange: 10,
      trainingCompletionChange: -3,
      realThreatReportsChange: -8,
    },
  },
}
