import type { Meta, StoryObj } from "@storybook/react"
import { DepartmentChart } from "@/components/reports/user-behavior-analytics/department-chart"
import type { DepartmentData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/DepartmentChart",
  component: DepartmentChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Department Chart Component\n\nHorizontal bar chart showing phishing simulation reporting rates by department. Color coding: green ≥85%, amber 70-84%, red <70%. Click a bar to filter the high-risk users table. Company average reference line shown as dashed. Non-selected departments dim (opacity 0.4) when one is selected.\n\nRelated: [MetricsCards](./MetricsCards), [HighRiskTable](./HighRiskTable), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectedDepartment: {
      control: "select",
      options: [null, "Finance", "Engineering", "HR", "Marketing", "Sales"],
      description: "Currently selected department (from chart click)",
    },
  },
} satisfies Meta<typeof DepartmentChart>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: DepartmentData[] = [
  { department: "Finance", reportingRate: 91, userCount: 24, usersNeedingTraining: 2, trend: "up" },
  { department: "Engineering", reportingRate: 89, userCount: 56, usersNeedingTraining: 4, trend: "up" },
  { department: "HR", reportingRate: 85, userCount: 18, usersNeedingTraining: 3, trend: "stable" },
  { department: "Marketing", reportingRate: 78, userCount: 32, usersNeedingTraining: 8, trend: "down" },
  { department: "Sales", reportingRate: 62, userCount: 45, usersNeedingTraining: 18, trend: "down" },
]

export const Default: Story = {
  args: {
    data: defaultData,
    companyAvg: 84,
    selectedDepartment: null,
    onDepartmentClick: () => {},
  },
}

export const DepartmentSelected: Story = {
  args: {
    data: defaultData,
    companyAvg: 84,
    selectedDepartment: "Sales",
    onDepartmentClick: () => {},
  },
}
