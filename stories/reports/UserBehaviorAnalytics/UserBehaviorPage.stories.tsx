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
          "## User Behavior Analytics Report\n\nFull operational report for security admins. Training effectiveness, phishing simulation metrics, departmental gaps. **Layout:** Page header with Export PDF; metrics cards; department and trend charts; Behavioral Insights; High-Risk section (title + pill | Export List, filters below title, table). Filters (department, role, date range, user search) sit below the High-Risk title. Department chart click filters table. Export PDF prints full page; Export List downloads filtered CSV. Scroll position preserved when filters change.\n\nRelated: [MetricsCards](./MetricsCards), [DepartmentChart](./DepartmentChart), [ReportFilters](./ReportFilters), [HighRiskTable](./HighRiskTable)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserBehaviorAnalyticsContent>

export default meta
type Story = StoryObj<typeof meta>

export const FullReport: Story = {}
