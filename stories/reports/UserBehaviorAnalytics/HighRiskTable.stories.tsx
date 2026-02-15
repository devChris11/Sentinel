import type { Meta, StoryObj } from "@storybook/react"
import { HighRiskTable } from "@/components/reports/user-behavior-analytics/high-risk-table"
import { userBehaviorData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/HighRiskTable",
  component: HighRiskTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## High-Risk Users Table\n\nTable of users requiring attention, with sortable columns (Name, Department, Reporting Rate, Time to Report, Risk Level). Risk badges: critical (red), high (orange), medium (amber), low (green). Shadcn pagination with 20 rows per page (matches Incidents and Risk Scoring tables). Export List triggers CSV download of filtered data. Row dropdown: View Profile, Assign Training, Send Reminder.\n\nRelated: [DepartmentChart](./DepartmentChart), [ReportFilters](./ReportFilters), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HighRiskTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: userBehaviorData.highRiskUsers,
    onExportCSV: () => {},
  },
}

export const FilteredView: Story = {
  args: {
    users: userBehaviorData.highRiskUsers.filter((u) => u.department === "Sales"),
    onExportCSV: () => {},
  },
}

export const EmptyState: Story = {
  args: {
    users: [],
    onExportCSV: () => {},
  },
}
