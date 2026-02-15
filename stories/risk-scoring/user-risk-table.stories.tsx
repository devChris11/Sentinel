import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UserRiskTable } from '@/components/risk-scoring/user-risk-table';
import { users } from '@/lib/risk-data';

const meta = {
  title: 'Risk Scoring/User Risk Table',
  component: UserRiskTable,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8FAFC' },
      ],
    },
  },
} satisfies Meta<typeof UserRiskTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: users.slice(0, 20),
    onUserClick: (user) => console.log('User clicked:', user),
    selectedUsers: [],
    onSelectAll: (_checked: boolean) => {},
    onSelectUser: (_userId: string, _checked: boolean) => {},
    totalCount: 50,
    currentPage: 1,
    totalPages: 3,
    onPageChange: () => {},
    isFiltered: false,
  },
};

export const WithSelections: Story = {
  args: {
    users: users.slice(0, 20),
    onUserClick: (user) => console.log('User clicked:', user),
    selectedUsers: ["1", "3", "5"],
    onSelectAll: (_checked: boolean) => {},
    onSelectUser: (_userId: string, _checked: boolean) => {},
    totalCount: 50,
    currentPage: 1,
    totalPages: 3,
    onPageChange: () => {},
    isFiltered: false,
  },
};

export const HighRiskOnly: Story = {
  args: {
    users: users.filter(u => u.riskLevel === "critical" || u.riskLevel === "high").slice(0, 20),
    onUserClick: (user) => console.log('User clicked:', user),
    selectedUsers: [],
    onSelectAll: (_checked: boolean) => {},
    onSelectUser: (_userId: string, _checked: boolean) => {},
    totalCount: 15,
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
    isFiltered: true,
  },
};
