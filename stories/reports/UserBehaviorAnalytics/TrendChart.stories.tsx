import type { Meta, StoryObj } from "@storybook/react"
import { TrendChart } from "@/components/reports/user-behavior-analytics/trend-chart"
import { userBehaviorData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/TrendChart",
  component: TrendChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Trend Chart Component\n\nLine chart with three series: Your Company (solid), Company Avg (dashed), Industry Benchmark (dotted). Weekly granularity. Tooltip shows gap vs industry. Used for tracking reporting rate over 12 weeks.\n\nRelated: [DepartmentChart](./DepartmentChart), [MetricsCards](./MetricsCards), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TrendChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data: userBehaviorData.trendData },
}
