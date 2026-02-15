import type { Meta, StoryObj } from '@storybook/react'
import { RecentReportsTable } from '@/components/reports/recent-reports-table'

const meta = {
  title: 'Reports/RecentReportsTable',
  component: RecentReportsTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Recent Reports Table Component\n\n' +
          'Displays the last 5 generated reports with category badges and export actions. ' +
          'Table styling matches the Incidents page table exactly for design consistency.\n\n' +
          '## Design Tokens\n\n' +
          '- `bg-content-surface` (#FEFEFE) - Table container\n' +
          '- `bg-content-bg-alt` (#F8FAFC) - Header background and row hover\n' +
          '- `border-content-border` (#E2E8F0) - Table borders\n' +
          '- `text-content-text-strong` (#0F172A) - Headers and report names\n' +
          '- `text-content-text` (#475569) - Body text\n' +
          '- `text-primary` (#6366F1) - Executive badge\n' +
          '- `text-warning` (#F59E0B) - Operational badge\n' +
          '- `text-info` (#3B82F6) - SecOps badge\n\n' +
          '## Category Badges\n\n' +
          'Three category types with distinct colors:\n' +
          '- **Executive**: Primary color (indigo) - Strategic reports\n' +
          '- **Operational**: Warning color (amber) - Training/awareness\n' +
          '- **SecOps**: Info color (blue) - Technical operations\n\n' +
          '## Export Actions\n\n' +
          'Two export options per report:\n' +
          '- **CSV**: FileSpreadsheet icon with "CSV" label\n' +
          '- **PDF**: FileText icon with "PDF" label\n' +
          '- Hover: Background color (primary/5) and text color change\n' +
          '- Gap: 4 units between actions for better targeting\n\n' +
          '## Table Features\n\n' +
          '- Shows last 5 generated reports\n' +
          '- Subtitle clarifies scope\n' +
          '- Horizontal scroll on mobile (overflow-x-auto)\n' +
          '- Row hover effect matches Incidents table\n' +
          '- Export labels improve icon differentiation\n\n' +
          '## Accessibility\n\n' +
          '- Semantic table markup\n' +
          '- Uppercase headers for visual hierarchy\n' +
          '- Export buttons have descriptive aria-labels\n' +
          '- Keyboard navigable throughout',
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
} satisfies Meta<typeof RecentReportsTable>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Default Table
 * 
 * Standard recent reports table showing the last 5 generated reports.
 * Includes colored category badges and labeled export icons.
 */
export const Default: Story = {}

/**
 * ## Category Badges
 * 
 * Demonstrates the three category badge styles.
 * Each category has a distinct color matching its purpose.
 */
export const CategoryBadges: Story = {
  parameters: {
    docs: {
      description: {
        story: 
          'Executive (Primary - Indigo): Strategic reports for C-level\n\n' +
          'Operational (Warning - Amber): Training and awareness reports\n\n' +
          'SecOps (Info - Blue): Technical security operations',
      },
    },
  },
}

/**
 * ## Export Actions
 * 
 * Highlights the export icon differentiation.
 * CSV and PDF options have clear labels and hover states.
 */
export const ExportActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 
          'Hover over the export buttons to see:\n' +
          '- Background color change (primary/5)\n' +
          '- Text color change (primary)\n' +
          '- Clear CSV/PDF labels prevent confusion\n' +
          '- 4-unit gap improves click targeting',
      },
    },
  },
}

/**
 * ## Table Header Styling
 * 
 * Shows the uppercase header pattern matching Incidents table.
 * Headers use bg-content-bg-alt for visual separation.
 */
export const HeaderStyling: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-content-text-muted mb-4">Reports Table Header</p>
            <RecentReportsTable />
          </div>
          
          <div className="border-t border-content-border pt-6">
            <p className="text-sm text-content-text-muted mb-4">Header Pattern Details</p>
            <div className="space-y-2 text-sm">
              <p className="text-content-text">
                <span className="font-semibold">Font:</span> text-xs font-semibold uppercase
              </p>
              <p className="text-content-text">
                <span className="font-semibold">Background:</span> bg-content-bg-alt (#F8FAFC)
              </p>
              <p className="text-content-text">
                <span className="font-semibold">Text Color:</span> text-content-text-strong (#0F172A)
              </p>
              <p className="text-content-text-muted text-xs mt-3">
                This pattern matches the Incidents table headers exactly
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Row Hover States
 * 
 * Demonstrates the table row hover effect.
 * Hover changes background to content-bg-alt with smooth transition.
 */
export const RowHoverStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover over any table row to see the background color change. Matches Incidents table hover behavior.',
      },
    },
  },
}

/**
 * ## Mobile Responsive
 * 
 * Shows table behavior on mobile devices.
 * Horizontal scroll allows viewing all columns on small screens.
 */
export const MobileResponsive: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-4">
        <div className="max-w-xs">
          <RecentReportsTable />
        </div>
      </div>
    ),
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Table uses overflow-x-auto to enable horizontal scrolling on mobile devices.',
      },
    },
  },
}

/**
 * ## Section Title with Subtitle
 * 
 * Highlights the title/subtitle pattern.
 * Subtitle clarifies the scope ("Last 5 generated reports").
 */
export const TitleWithSubtitle: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <RecentReportsTable />
        
        <div className="mt-8 border-t border-content-border pt-6">
          <p className="text-sm text-content-text-muted mb-4">Title Pattern</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-mono text-content-text-muted mb-1">text-lg font-semibold</p>
              <h2 className="text-lg font-semibold text-content-text-strong">Recent Reports</h2>
            </div>
            <div>
              <p className="text-xs font-mono text-content-text-muted mb-1">text-xs text-muted mt-1</p>
              <p className="mt-1 text-xs text-content-text-muted">Last 5 generated reports</p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Badge Color Comparison
 * 
 * Side-by-side comparison of all three category badge colors.
 * Shows consistency with Sentinel's design system.
 */
export const BadgeColorComparison: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <div className="space-y-8">
          <RecentReportsTable />
          
          <div className="border-t border-content-border pt-6">
            <p className="text-sm text-content-text-muted mb-4">Badge Color System</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Executive
                </span>
                <p className="text-sm text-content-text">
                  Primary (#6366F1) - Strategic/C-level reports
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                  Operational
                </span>
                <p className="text-sm text-content-text">
                  Warning (#F59E0B) - Training/awareness focus
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center rounded-full border border-info/20 bg-info/10 px-2.5 py-0.5 text-xs font-medium text-info">
                  SecOps
                </span>
                <p className="text-sm text-content-text">
                  Info (#3B82F6) - Technical operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Export Icon Labels
 * 
 * Demonstrates the improved export icon differentiation.
 * Labels make it clear which format each button exports.
 */
export const ExportIconLabels: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg p-8">
        <RecentReportsTable />
        
        <div className="mt-8 border-t border-content-border pt-6">
          <p className="text-sm text-content-text-muted mb-4">Export Button Pattern</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-content-text-strong mb-2">Icon + Label Stack</p>
              <p className="text-sm text-content-text mb-3">
                Each button uses flex-col to stack icon and label vertically
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex flex-col items-center gap-0.5 rounded p-1 text-content-text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[10px] font-medium uppercase tracking-wide">
                    CSV
                  </span>
                </button>
                
                <button
                  type="button"
                  className="flex flex-col items-center gap-0.5 rounded p-1 text-content-text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[10px] font-medium uppercase tracking-wide">
                    PDF
                  </span>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-content-text-strong mb-2">Styling Details</p>
              <ul className="text-sm text-content-text space-y-1">
                <li>• Label: text-[10px] font-medium uppercase</li>
                <li>• Gap: 0.5 units between icon and label</li>
                <li>• Hover: bg-primary/5 background + primary text</li>
                <li>• Spacing: 4 units between CSV and PDF buttons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

/**
 * ## Full Table in Context
 * 
 * Shows the complete table as it appears in the Reports page.
 * Includes all features: title, subtitle, badges, and export actions.
 */
export const FullTableContext: Story = {
  decorators: [
    () => (
      <div className="bg-content-bg min-h-screen">
        <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-content-text-strong mb-2">Reports</h1>
            <p className="text-sm text-content-text-muted">
              Generate and export security intelligence reports
            </p>
          </div>
          
          <div className="mt-12">
            <RecentReportsTable />
          </div>
        </div>
      </div>
    ),
  ],
}
