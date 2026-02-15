import type { Meta, StoryObj } from "@storybook/react"
import { UserBehaviorAnalyticsContent } from "@/app/reports/user-behavior-analytics/user-behavior-analytics-content"

const meta = {
  title: "Reports/UserBehaviorAnalytics/UserBehaviorPage",
  component: UserBehaviorAnalyticsContent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "## User Behavior Analytics Report\n\nFull operational report for security admins. Training effectiveness, phishing simulation metrics, departmental gaps. Use cases: identify weak departments, target training, export high-risk user lists. Filters: department, role, date range, search. Department chart click filters table. CSV export respects filters.\n\nRelated: [MetricsCards](./MetricsCards), [DepartmentChart](./DepartmentChart), [ReportFilters](./ReportFilters)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserBehaviorAnalyticsContent>

export default meta
type Story = StoryObj<typeof meta>

export const FullReport: Story = {}
