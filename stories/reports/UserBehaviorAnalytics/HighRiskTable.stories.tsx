import type { Meta, StoryObj } from "@storybook/react"
import { HighRiskTable } from "@/components/reports/user-behavior-analytics/high-risk-table"
import { ReportFilters, type FilterState } from "@/components/reports/user-behavior-analytics/report-filters"
import { UserSearchPopover } from "@/components/reports/user-behavior-analytics/user-search-popover"
import { userBehaviorData } from "@/lib/user-behavior-data"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const meta = {
  title: "Reports/UserBehaviorAnalytics/HighRiskTable",
  component: HighRiskTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## High-Risk Users Table\n\nTable of users requiring attention, with sortable columns (Name, Department, Reporting Rate, Time to Report, Risk Level). Risk badges: critical (red), high (orange), medium (amber), low (green). Shadcn pagination with 20 rows per page (matches Incidents and Risk Scoring tables). Title, pill badge, and Export List are rendered by the page above the table. Filters sit below the title, above the table. Row dropdown: View Profile, Assign Training, Send Reminder.\n\nRelated: [DepartmentChart](./DepartmentChart), [ReportFilters](./ReportFilters), [User Behavior Report](./UserBehaviorPage)",
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
  },
}

export const FilteredView: Story = {
  args: {
    users: userBehaviorData.highRiskUsers.filter((u) => u.department === "Sales"),
  },
}

export const EmptyState: Story = {
  args: {
    users: [],
  },
}

/** Section layout as used on the page: title + pill | Export List, then filters, then table */
export const InSectionLayout: Story = {
  args: {
    users: userBehaviorData.highRiskUsers,
  },
  decorators: [
    (Story, context) => {
      const users = context.args.users ?? []
      const defaultFilters: FilterState = {
        department: "All Departments",
        role: "All Roles",
        dateRange: "90",
        search: "",
      }
      return (
        <section className="pt-10 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-content-text-strong">
                High-Risk Users Requiring Attention
              </h2>
              <span className="rounded-full bg-danger/10 px-2.5 py-1 text-xs font-medium text-danger">
                {users.length} users
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" aria-hidden />
              Export List
            </Button>
          </div>
          <div>
            <ReportFilters
              filters={defaultFilters}
              onFilterChange={() => {}}
              hasActiveFilters={false}
              departments={["All Departments", ...userBehaviorData.departmentBreakdown.map((d) => d.department)]}
              userSearch={
                <UserSearchPopover
                  users={userBehaviorData.highRiskUsers}
                  selectedUserIds={[]}
                  onSelectionChange={() => {}}
                />
              }
            />
          </div>
          <Story />
        </section>
      )
    },
  ],
}
