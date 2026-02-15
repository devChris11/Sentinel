import type { Meta, StoryObj } from '@storybook/react'
import { ComingSoonModal } from '@/components/reports/coming-soon-modal'
import { reports } from '@/lib/reports-data'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Reports/ComingSoonModal',
  component: ComingSoonModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 
          '## Coming Soon Modal Component\n\n' +
          'Dialog modal that displays detailed information about upcoming report features. ' +
          'Shown when users click on placeholder report cards (status: "coming-soon").\n\n' +
          '## Design Tokens\n\n' +
          '- `bg-content-surface` (#FEFEFE) - Modal background\n' +
          '- `border-content-border` (#E2E8F0) - Modal and separator borders\n' +
          '- `text-primary` (#6366F1) - Icon color\n' +
          '- `text-content-text-strong` (#0F172A) - Title and section headers\n' +
          '- `text-content-text` (#475569) - Description and metrics\n' +
          '- `text-content-text-muted` (#64748B) - Timestamp and italic text\n\n' +
          '## Modal Structure\n\n' +
          '1. **Header**: Icon + Report title\n' +
          '2. **Full Description**: Detailed explanation of report purpose\n' +
          '3. **Key Metrics List**: Bullet points of included data\n' +
          '4. **Time Estimate**: Estimated generation time with icon\n' +
          '5. **Status Message**: Italic text explaining development status\n' +
          '6. **Action Button**: "Notify Me When Available" (outline variant)\n\n' +
          '## Content Spacing\n\n' +
          '- Sections wrapped in space-y-6 for consistent vertical rhythm\n' +
          '- Separators between major sections\n' +
          '- Key metrics list uses space-y-2 for readability\n' +
          '- Bullet character (•) instead of dots for list items\n\n' +
          '## Accessibility\n\n' +
          '- DialogDescription for screen readers (sr-only)\n' +
          '- Focus trap within modal\n' +
          '- ESC key closes modal\n' +
          '- Backdrop click closes modal\n' +
          '- All interactive elements keyboard accessible\n\n' +
          '## Animation\n\n' +
          '- Entry: Fade in + scale from 95% to 100%\n' +
          '- Exit: Fade out + scale to 95%\n' +
          '- Duration: 200ms (Shadcn Dialog defaults)\n' +
          '- Smooth and non-jarring',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComingSoonModal>

export default meta
type Story = StoryObj<typeof meta>

// Helper component for interactive stories
function ModalTrigger({ reportId }: { reportId: string }) {
  const [open, setOpen] = useState(false)
  const report = reports.find(r => r.id === reportId)!

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open {report.title} Modal
      </Button>
      <ComingSoonModal report={report} open={open} onOpenChange={setOpen} />
    </>
  )
}

/**
 * ## Compliance Overview Report
 * 
 * Executive report for compliance tracking across SOC 2, ISO 27001, and GDPR.
 * Shows audit readiness and control gaps.
 */
export const ComplianceOverview: Story = {
  args: { report: reports.find(r => r.id === 'compliance-overview') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="compliance-overview" />,
}

/**
 * ## Financial Impact Analysis
 * 
 * Executive report quantifying security program ROI and breach cost avoidance.
 * Essential for CFO reporting and budget justification.
 */
export const FinancialImpact: Story = {
  args: { report: reports.find(r => r.id === 'financial-impact') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="financial-impact" />,
}

/**
 * ## Training Effectiveness Report
 * 
 * Operational report analyzing security training performance.
 * Tracks completion rates, assessment scores, and knowledge retention.
 */
export const TrainingEffectiveness: Story = {
  args: { report: reports.find(r => r.id === 'training-effectiveness') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="training-effectiveness" />,
}

/**
 * ## Department Breakdown Report
 * 
 * Operational report segmenting security risk by department and role.
 * Enables targeted interventions across business units.
 */
export const DepartmentBreakdown: Story = {
  args: { report: reports.find(r => r.id === 'department-breakdown') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="department-breakdown" />,
}

/**
 * ## Response Time Metrics Report
 * 
 * SecOps report tracking incident response times and SLA compliance.
 * Essential for SOC optimization and staffing decisions.
 */
export const ResponseTimeMetrics: Story = {
  args: { report: reports.find(r => r.id === 'response-time') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="response-time" />,
}

/**
 * ## Threat Landscape Analysis Report
 * 
 * SecOps report aggregating threat intelligence on attack vectors.
 * Supports proactive defense planning and threat hunting.
 */
export const ThreatLandscape: Story = {
  args: { report: reports.find(r => r.id === 'threat-landscape') ?? null, open: false, onOpenChange: () => {} },
  render: () => <ModalTrigger reportId="threat-landscape" />,
}

/**
 * ## All Coming Soon Modals
 * 
 * Grid view of all 6 placeholder reports.
 * Click any button to see its modal content.
 */
export const AllComingSoonModals: Story = {
  args: { report: null, open: false, onOpenChange: () => {} },
  render: () => {
    const comingSoonReports = reports.filter(r => r.status === 'coming-soon')
    
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comingSoonReports.map(report => (
          <div key={report.id}>
            <ModalTrigger reportId={report.id} />
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    layout: 'padded',
  },
}

/**
 * ## Modal Content Structure
 * 
 * Detailed breakdown of the modal's content sections.
 * Shows spacing, typography, and visual hierarchy.
 */
export const ContentStructure: Story = {
  args: { report: reports.find(r => r.id === 'compliance-overview') ?? null, open: false, onOpenChange: () => {} },
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-sm font-semibold text-content-text-strong mb-4">
          Section Breakdown
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-primary bg-primary/5 p-4">
            <p className="text-xs font-semibold text-primary mb-1">1. Header (with icon)</p>
            <p className="text-sm text-content-text">
              Icon (h-6 w-6 text-primary) + Title (text-xl font-bold)
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">2. Separator</p>
            <p className="text-sm text-content-text">
              Divider line (bg-content-border)
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">3. Full Description</p>
            <p className="text-sm text-content-text">
              Paragraph text (text-sm leading-relaxed)
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">4. Key Metrics</p>
            <p className="text-sm text-content-text">
              Section header + bulleted list (• character, space-y-2)
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">5. Time Estimate</p>
            <p className="text-sm text-content-text">
              Clock icon + small text (text-xs text-muted)
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">6. Separator</p>
            <p className="text-sm text-content-text">
              Divider line with mt-2
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">7. Status Message</p>
            <p className="text-sm text-content-text italic">
              Italic text explaining development status
            </p>
          </div>
          
          <div className="rounded-lg border border-content-border bg-content-bg p-4">
            <p className="text-xs font-semibold text-content-text-strong mb-1">8. Action Button</p>
            <p className="text-sm text-content-text">
              Bell icon + "Notify Me When Available" (outline variant, w-full)
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <ModalTrigger reportId="compliance-overview" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

/**
 * ## Typography Hierarchy
 * 
 * Demonstrates the text sizing and weight progression.
 * From title (text-xl) to metrics (text-sm) to timestamp (text-xs).
 */
export const TypographyHierarchy: Story = {
  args: { report: reports.find(r => r.id === 'compliance-overview') ?? null, open: false, onOpenChange: () => {} },
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-xs font-mono text-content-text-muted mb-2">text-xl font-bold</p>
        <h2 className="text-xl font-bold text-content-text-strong">
          Compliance Overview
        </h2>
      </div>
      
      <div>
        <p className="text-xs font-mono text-content-text-muted mb-2">text-sm font-semibold</p>
        <p className="text-sm font-semibold text-content-text-strong">
          Key Metrics:
        </p>
      </div>
      
      <div>
        <p className="text-xs font-mono text-content-text-muted mb-2">text-sm</p>
        <p className="text-sm text-content-text">
          This report provides comprehensive compliance tracking across security frameworks.
        </p>
      </div>
      
      <div>
        <p className="text-xs font-mono text-content-text-muted mb-2">text-xs</p>
        <p className="text-xs text-content-text-muted">
          Estimated generation time: ~20 seconds
        </p>
      </div>
      
      <div>
        <p className="text-xs font-mono text-content-text-muted mb-2">text-sm italic</p>
        <p className="text-sm italic text-content-text-muted">
          This report is currently in development and will be available in a future release.
        </p>
      </div>
      
      <div className="mt-6">
        <ModalTrigger reportId="compliance-overview" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

/**
 * ## Key Metrics List Pattern
 * 
 * Shows the improved bullet list styling.
 * Uses • character instead of tiny dots for better readability.
 */
export const KeyMetricsPattern: Story = {
  args: { report: reports.find(r => r.id === 'compliance-overview') ?? null, open: false, onOpenChange: () => {} },
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <p className="mb-3 text-sm font-semibold text-content-text-strong">
          Key Metrics:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-content-text">
            <span className="mt-1 text-content-text-muted">•</span>
            SOC 2 compliance percentage
          </li>
          <li className="flex items-start gap-2 text-sm text-content-text">
            <span className="mt-1 text-content-text-muted">•</span>
            ISO 27001 control status
          </li>
          <li className="flex items-start gap-2 text-sm text-content-text">
            <span className="mt-1 text-content-text-muted">•</span>
            Policy violation trends
          </li>
          <li className="flex items-start gap-2 text-sm text-content-text">
            <span className="mt-1 text-content-text-muted">•</span>
            Audit finding remediation
          </li>
        </ul>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-4">Pattern Details:</p>
        <ul className="text-sm text-content-text space-y-1">
          <li>• Bullet: • character (not tiny dot)</li>
          <li>• Color: text-content-text-muted</li>
          <li>• Gap: 2 units between bullet and text</li>
          <li>• Spacing: space-y-2 between items</li>
          <li>• Text: text-sm text-content-text</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <ModalTrigger reportId="compliance-overview" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

/**
 * ## Button Styling
 * 
 * Shows the "Notify Me When Available" button pattern.
 * Outline variant with full width, matching Sentinel button standards.
 */
export const ButtonStyling: Story = {
  args: { report: reports.find(r => r.id === 'compliance-overview') ?? null, open: false, onOpenChange: () => {} },
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <Button variant="outline" className="w-full border-content-border text-content-text-strong hover:bg-content-bg-alt">
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notify Me When Available
        </Button>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-4">Button Details:</p>
        <ul className="text-sm text-content-text space-y-1">
          <li>• Variant: outline</li>
          <li>• Width: w-full</li>
          <li>• Border: border-content-border</li>
          <li>• Text: text-content-text-strong</li>
          <li>• Hover: hover:bg-content-bg-alt</li>
          <li>• Icon: Bell (h-4 w-4)</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <ModalTrigger reportId="compliance-overview" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

/**
 * ## Icon Consistency
 * 
 * Demonstrates icon usage across different reports.
 * All icons use h-6 w-6 text-primary for consistency.
 */
export const IconConsistency: Story = {
  args: { report: null, open: false, onOpenChange: () => {} },
  render: () => {
    const comingSoonReports = reports.filter(r => r.status === 'coming-soon')
    
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-content-text-muted mb-4">Report Icons (all h-6 w-6 text-primary)</p>
          <div className="flex flex-wrap gap-4">
            {comingSoonReports.map(report => {
              const Icon = report.icon
              return (
                <div key={report.id} className="flex flex-col items-center gap-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <p className="text-xs text-content-text-muted text-center max-w-[100px]">
                    {report.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {comingSoonReports.slice(0, 3).map(report => (
            <div key={report.id}>
              <ModalTrigger reportId={report.id} />
            </div>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
  },
}
