import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RiskDistribution } from '@/components/risk-scoring/risk-distribution';

const meta = {
  title: 'Risk Scoring/Distribution Cards',
  component: RiskDistribution,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8FAFC' },
      ],
    },
  },
} satisfies Meta<typeof RiskDistribution>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
