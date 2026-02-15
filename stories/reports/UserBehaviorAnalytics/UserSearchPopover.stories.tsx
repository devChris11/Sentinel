import type { Meta, StoryObj } from "@storybook/react"
import { UserSearchPopover } from "@/components/reports/user-behavior-analytics/user-search-popover"
import { userBehaviorData } from "@/lib/user-behavior-data"

const meta = {
  title: "Reports/UserBehaviorAnalytics/UserSearchPopover",
  component: UserSearchPopover,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## User Search Popover\n\nAdvanced multi-select user picker with search, bulk selection, and explicit apply/cancel workflow. Opens on click to show alphabetically sorted users with avatar, name, and email. User selection takes precedence over department/role filters when applied. Select All affects only visible (filtered) users. Apply Filter commits selection; Cancel discards changes.\n\nRelated: [ReportFilters](./ReportFilters), [HighRiskTable](./HighRiskTable), [User Behavior Report](./UserBehaviorPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserSearchPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: userBehaviorData.highRiskUsers,
    selectedUserIds: [],
    onSelectionChange: () => {},
  },
}

export const WithSelection: Story = {
  args: {
    users: userBehaviorData.highRiskUsers,
    selectedUserIds: ["u1", "u3", "u5"],
    onSelectionChange: () => {},
  },
}

export const FewUsers: Story = {
  args: {
    users: userBehaviorData.highRiskUsers.slice(0, 3),
    selectedUserIds: [],
    onSelectionChange: () => {},
  },
}
