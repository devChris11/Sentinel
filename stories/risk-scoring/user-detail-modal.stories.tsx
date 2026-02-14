import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { UserDetailModal } from '@/components/risk-scoring/user-detail-modal';
import { users, type RiskUser } from '@/lib/risk-data';

// Wrapper component to manage modal state
function UserDetailModalWrapper({ userIndex }: { userIndex: number }) {
  const [open, setOpen] = useState(true);
  const user = users[userIndex];

  return (
    <UserDetailModal
      user={user}
      open={open}
      onOpenChange={setOpen}
    />
  );
}

const meta = {
  title: 'Risk Scoring/User Detail Modal',
  component: UserDetailModalWrapper,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserDetailModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CriticalRiskUser: Story = {
  args: {
    userIndex: 0, // Sarah Chen
  },
};

export const HighRiskUser: Story = {
  args: {
    userIndex: 2, // Emma Thompson
  },
};

export const LowRiskUser: Story = {
  args: {
    userIndex: 9, // Thomas Brown
  },
};
