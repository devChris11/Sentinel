import type { Meta, StoryObj } from '@storybook/react'
import { ReportsHeader } from '@/components/reports/reports-header'

const meta = {
  title: 'Reports/ReportsHeader',
  component: ReportsHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Reports Header Component\n\n' +
          'Page header for the Reports Index, featuring the page title and subtitle with icon.\n\n' +
          '## Design Tokens\n\n' +
          '- `bg-primary` (#6366F1) - Icon container background\n' +
          '- `text-content-text-strong` (#0F172A) - Page title\n' +
          '- `text-content-text-muted` (#64748B) - Subtitle text\n\n' +
          '## Layout Pattern\n\n' +
          '- Icon (FileText) + Title + Subtitle in a single row\n' +
          '- Spacing: gap-3 between elements\n\n' +
          '## Accessibility\n\n' +
          '- FileText icon has aria-hidden="true"',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-content-bg p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReportsHeader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Default Header
 * 
 * Standard Reports page header with icon, title, and subtitle.
 */
export const Default: Story = {}

/**
 * ## Desktop Layout
 * 
 * Shows the header at desktop width (1024px+).
 */
export const DesktopLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

/**
 * ## Tablet Layout
 * 
 * Shows the header at tablet width (768px-1023px).
 */
export const TabletLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

/**
 * ## Mobile Layout
 * 
 * Shows the header at mobile width (<768px).
 */
export const MobileLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

/**
 * ## Icon Comparison
 * 
 * Compares the Reports header icon with Dashboard and Incidents icons.
 * All use the same container styling (bg-primary, rounded-lg, h-10 w-10).
 */
export const IconComparison: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8 space-y-6">
        <div>
          <p className="text-sm text-content-text-muted mb-3">Reports Header</p>
          <ReportsHeader />
        </div>
        
        <div className="border-t border-content-border pt-6">
          <p className="text-sm text-content-text-muted mb-4">Icon Container Consistency</p>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-content-text-muted mt-2">
            All icons use consistent sizing and styling across pages
          </p>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Typography Hierarchy
 * 
 * Demonstrates the text hierarchy in the header.
 * Title (text-3xl), subtitle (text-sm muted).
 */
export const TypographyHierarchy: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <ReportsHeader />
        <div className="mt-8 border-t border-content-border pt-6 space-y-4">
          <div>
            <p className="text-xs font-mono text-content-text-muted mb-1">text-3xl font-bold</p>
            <h1 className="text-3xl font-bold text-content-text-strong">Reports</h1>
          </div>
          <div>
            <p className="text-xs font-mono text-content-text-muted mb-1">text-sm text-muted</p>
            <p className="text-sm text-content-text-muted">
              Generate and export security intelligence reports
            </p>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Full Width Container
 * 
 * Shows the header at maximum width (1600px container).
 * Demonstrates spacing at the largest supported viewport.
 */
export const FullWidthContainer: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg min-h-screen">
        <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
          <ReportsHeader />
        </div>
      </div>
    ),
  ],
}
