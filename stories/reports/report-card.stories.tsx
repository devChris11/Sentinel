import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ReportCard } from '@/components/reports/report-card'
import { reports } from '@/lib/reports-data'

const meta = {
  title: 'Reports/ReportCard',
  component: ReportCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Report Card Component\n\n' +
          'Interactive card component for displaying report information in the Reports Index page. ' +
          'Each card shows the report title, description, icon, and estimated generation time.\n\n' +
          '## Design Tokens\n\n' +
          '- `bg-content-surface` (#FEFEFE) - Card background\n' +
          '- `border-content-border` (#E2E8F0) - Card border\n' +
          '- `text-primary` (#6366F1) - Icon color\n' +
          '- `text-content-text-strong` (#0F172A) - Title text\n' +
          '- `text-content-text` (#475569) - Description text\n' +
          '- `text-content-text-muted` (#64748B) - Time estimate\n\n' +
          '## States\n\n' +
          '- **Available**: Shows "Last generated" timestamp for reports ready to view\n' +
          '- **Coming Soon**: No timestamp, opens modal with preview information\n\n' +
          '## Interactions\n\n' +
          '- Hover: Border changes to `primary/40`, shadow appears\n' +
          '- Active: Slight scale down (0.98) for tactile feedback\n' +
          '- Focus: Ring-2 outline for keyboard navigation\n\n' +
          '## Accessibility\n\n' +
          '- Semantic button element for click interaction\n' +
          '- Lucide icons have aria-hidden="true"\n' +
          '- Focus states visible for keyboard users\n' +
          '- All content readable by screen readers',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-content-bg p-8">
        <div className="max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ReportCard>

export default meta
type Story = StoryObj<typeof meta>

const noop = () => {}

/**
 * ## Available Report with Timestamp
 * 
 * Shows a report that's ready to generate with "Last generated" timestamp.
 * Available reports include Risk Summary, User Behavior Analytics, and Incident Analysis.
 */
export const AvailableReport: Story = {
  args: {
    report: reports.find(r => r.id === 'risk-summary')!,
    onClick: noop,
  },
}

/**
 * ## Coming Soon Report
 * 
 * Shows a placeholder report without timestamp.
 * Clicking opens a modal with detailed information about the upcoming report.
 */
export const ComingSoonReport: Story = {
  args: {
    report: reports.find(r => r.id === 'compliance-overview')!,
    onClick: noop,
  },
}

/**
 * ## All Executive Reports
 * 
 * Displays all three executive-level reports in a grid.
 * These are strategic reports for board meetings and C-level briefings.
 */
export const ExecutiveReports: Story = {
  args: { report: reports.find(r => r.id === 'risk-summary')!, onClick: noop },
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports
            .filter(r => r.category === 'executive')
            .map(report => (
              <ReportCard key={report.id} report={report} onClick={noop} />
            ))}
        </div>
      </div>
    ),
  ],
}

/**
 * ## All Operational Reports
 * 
 * Displays all three operational reports in a grid.
 * These focus on training effectiveness and departmental analytics.
 */
export const OperationalReports: Story = {
  args: { report: reports.find(r => r.id === 'user-behavior')!, onClick: noop },
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports
            .filter(r => r.category === 'operational')
            .map(report => (
              <ReportCard key={report.id} report={report} onClick={noop} />
            ))}
        </div>
      </div>
    ),
  ],
}

/**
 * ## All SecOps Reports
 * 
 * Displays all three security operations reports in a grid.
 * These provide detailed incident analysis and threat intelligence.
 */
export const SecOpsReports: Story = {
  args: { report: reports.find(r => r.id === 'incident-analysis')!, onClick: noop },
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports
            .filter(r => r.category === 'secops')
            .map(report => (
              <ReportCard key={report.id} report={report} onClick={noop} />
            ))}
        </div>
      </div>
    ),
  ],
}

/**
 * ## All Report Cards
 * 
 * Complete overview of all 9 report cards across all categories.
 * Demonstrates the full Reports Index page card grid layout.
 */
export const AllReports: Story = {
  args: { report: reports[0], onClick: noop },
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="space-y-10">
          <section>
            <h2 className="mb-6 text-base font-semibold text-content-text-strong">
              Executive Reports
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports
                .filter(r => r.category === 'executive')
                .map(report => (
                  <ReportCard key={report.id} report={report} onClick={noop} />
                ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-base font-semibold text-content-text-strong">
              Operational Reports
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports
                .filter(r => r.category === 'operational')
                .map(report => (
                  <ReportCard key={report.id} report={report} onClick={noop} />
                ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-base font-semibold text-content-text-strong">
              Security Operations Reports
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports
                .filter(r => r.category === 'secops')
                .map(report => (
                  <ReportCard key={report.id} report={report} onClick={noop} />
                ))}
            </div>
          </section>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Hover State Preview
 * 
 * Demonstrates the card's hover interaction.
 * Border color changes and shadow appears for visual feedback.
 */
export const HoverState: Story = {
  args: {
    report: reports.find(r => r.id === 'user-behavior')!,
    onClick: noop,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover over the card to see the border color change to primary/40 and shadow appear.',
      },
    },
  },
}

/**
 * ## Mobile Layout
 * 
 * Shows how cards adapt to mobile screens.
 * Single column layout with adjusted padding (p-5 instead of p-6).
 */
export const MobileLayout: Story = {
  args: { report: reports[0], onClick: noop },
  decorators: [
    () => (
      <div className="bg-content-bg p-4">
        <div className="max-w-xs space-y-6">
          <ReportCard report={reports[0]} onClick={noop} />
          <ReportCard report={reports[3]} onClick={noop} />
        </div>
      </div>
    ),
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
