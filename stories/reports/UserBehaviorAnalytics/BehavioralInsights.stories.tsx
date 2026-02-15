import type { Meta, StoryObj } from "@storybook/react"
import { BehavioralInsights } from "@/components/reports/user-behavior-analytics/behavioral-insights"
import type { DepartmentData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/BehavioralInsights",
  component: BehavioralInsights,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Behavioral Insights Component\n\nAuto-generated insight card. Identifies weakest department (lowest reporting rate), strongest department, gap vs company average. Shows actionable recommendation for targeted phishing awareness. Info card styling with lightbulb icon.\n\nRelated: [DepartmentChart](./DepartmentChart), [HighRiskTable](./HighRiskTable), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BehavioralInsights>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: DepartmentData[] = [
  { department: "Finance", reportingRate: 91, userCount: 24, usersNeedingTraining: 2, trend: "up" },
  { department: "Sales", reportingRate: 62, userCount: 45, usersNeedingTraining: 18, trend: "down" },
]

export const Default: Story = {
  args: {
    departments: defaultData,
    companyAvg: 84,
  },
}
