import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { UserDetailModal } from '@/components/risk-scoring/user-detail-modal';
import { users, type RiskUser } from '@/lib/risk-data';

/**
 * DEPRECATED: This modal component is no longer used in the application.
 * The user detail view has been migrated to a sidebar panel for consistency
 * with the incidents page. See User Detail Panel stories for the current implementation.
 * 
 * This component is kept for potential future reusability.
 */

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
  title: 'Risk Scoring/User Detail Modal (Deprecated)',
  component: UserDetailModalWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['deprecated'],
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
