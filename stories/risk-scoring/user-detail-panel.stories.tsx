import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { UserDetailPanel } from '@/components/risk-scoring/user-detail-panel';
import { users, type RiskUser } from '@/lib/risk-data';

/**
 * User Detail Panel - The current implementation for displaying user details
 * in the risk scoring page. This sidebar follows the same pattern as the
 * Incident Detail Panel for consistency across the application.
 * 
 * Features:
 * - Slides in from the right with smooth animations
 * - Displays comprehensive user risk information
 * - Includes risk breakdown, trend charts, activity timeline
 * - Auto-saves admin notes to localStorage
 * - Click outside or press Escape to close
 */

// Wrapper component to manage panel state
function UserDetailPanelWrapper({ userIndex }: { userIndex: number }) {
  const [selectedUser, setSelectedUser] = useState<RiskUser | null>(users[userIndex]);

  return (
    <div className="relative h-screen w-full bg-content-bg">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-content-text-strong mb-4">Risk Scoring Page</h1>
        <p className="text-content-text-muted mb-4">
          The user detail panel is open. Click outside the panel or press Escape to close it.
        </p>
        <button
          onClick={() => setSelectedUser(users[userIndex])}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
        >
          Reopen Panel
        </button>
      </div>
      <UserDetailPanel
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}

const meta = {
  title: 'Risk Scoring/User Detail Panel',
  component: UserDetailPanelWrapper,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UserDetailPanelWrapper>;

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

export const MediumRiskUser: Story = {
  args: {
    userIndex: 5, // Michael Wilson
  },
};

export const LowRiskUser: Story = {
  args: {
    userIndex: 9, // Thomas Brown
  },
};
