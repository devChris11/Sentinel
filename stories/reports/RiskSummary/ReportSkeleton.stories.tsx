import type { Meta, StoryObj } from '@storybook/react'
import { ReportSkeleton } from '@/components/reports/risk-summary/report-skeleton'

const meta = {
  title: 'Reports/RiskSummary/ReportSkeleton',
  component: ReportSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading skeleton displayed during data fetch operations. Matches the structure of the full Risk Summary Report with placeholder elements for hero metric, charts, table, and info cards. Uses subtle pulsing animation to indicate loading state. Ensures smooth user experience during date range changes and initial page load.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReportSkeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default loading skeleton state shown during data fetch.
 * Matches the exact layout structure of the loaded report.
 */
export const Default: Story = {}

/**
 * Loading state demonstration - matches final report layout
 * with hero metric, two charts, top risks table, and info cards.
 */
export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton shown when switching date ranges or during initial page load. The structure mirrors the actual report components to minimize layout shift when data loads.'
      }
    }
  }
}
