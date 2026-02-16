import type { Meta, StoryObj } from "@storybook/react"
import { ReportFilters, type FilterState } from "@/components/reports/user-behavior-analytics/report-filters"
import { UserSearchPopover } from "@/components/reports/user-behavior-analytics/user-search-popover"
import { userBehaviorData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/ReportFilters",
  component: ReportFilters,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Report Filters Component\n\nDepartment, role, date range selects + optional user search popover. Rendered **below** the \"High-Risk Users Requiring Attention\" title, above the table. Filters combine with AND logic. Clear Filters resets all. Chart department selection overrides dropdown when active.\n\nRelated: [DepartmentChart](./DepartmentChart), [HighRiskTable](./HighRiskTable), [UserSearchPopover](./UserSearchPopover), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReportFilters>

export default meta
type Story = StoryObj<typeof meta>

const defaultFilters: FilterState = {
  department: "All Departments",
  role: "All Roles",
  dateRange: "90",
  search: "",
}

export const Default: Story = {
  args: {
    filters: defaultFilters,
    onFilterChange: () => {},
    hasActiveFilters: false,
  },
}

export const DepartmentSelected: Story = {
  args: {
    filters: { ...defaultFilters, department: "Sales" },
    onFilterChange: () => {},
    hasActiveFilters: true,
  },
}

export const SearchActive: Story = {
  args: {
    filters: { ...defaultFilters, search: "sarah" },
    onFilterChange: () => {},
    hasActiveFilters: true,
  },
}

export const WithUserSearchPopover: Story = {
  args: {
    filters: defaultFilters,
    onFilterChange: () => {},
    hasActiveFilters: false,
    userSearch: (
      <UserSearchPopover
        users={userBehaviorData.highRiskUsers}
        selectedUserIds={[]}
        onSelectionChange={() => {}}
      />
    ),
  },
}
