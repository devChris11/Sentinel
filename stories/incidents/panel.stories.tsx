import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Incidents/Panel',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The incident detail side panel that slides in from the right without a dim overlay.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Side Panel Features
 * 
 * Key features and design decisions of the incident detail panel.
 */
export const SidePanelFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Panel Structure
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-content-text-strong">Sticky Header:</strong>
            <p className="text-content-text-muted mt-1">
              Incident title, severity badge, ID, and timestamp. Close X button top-right.
            </p>
          </div>
          <div>
            <strong className="text-content-text-strong">Scrollable Body (6 sections):</strong>
            <ul className="text-content-text-muted mt-1 ml-4 space-y-1">
              <li>1. Incident Details - Description + AI reasoning</li>
              <li>2. User Context - Avatar, name, email, department, "View Profile" link</li>
              <li>3. Timeline - Event sequence with time dots</li>
              <li>4. Investigation Notes - Admin notes + textarea</li>
            </ul>
          </div>
          <div>
            <strong className="text-content-text-strong">Sticky Footer:</strong>
            <p className="text-content-text-muted mt-1">
              Action buttons: Acknowledge, Assign to..., Escalate Severity, Dismiss
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Key Features
        </h3>
        <ul className="space-y-2 text-sm text-content-text-muted">
          <li>✓ <strong>No dim overlay</strong> - Jira-style side panel, content behind stays visible</li>
          <li>✓ <strong>600px width</strong> - Fixed width, slides in from right</li>
          <li>✓ <strong>Click outside closes</strong> - Anywhere on page (except panel) closes it</li>
          <li>✓ <strong>Escape key closes</strong> - Keyboard accessibility</li>
          <li>✓ <strong>Cross-page navigation</strong> - "View User Profile" → Risk Scoring page</li>
          <li>✓ <strong>URL param support</strong> - ?open=INC-001 auto-opens panel (from Dashboard)</li>
        </ul>
      </div>

      <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">
          📌 Design Decision: No Overlay
        </h3>
        <p className="text-sm text-content-text-muted">
          Unlike modal dialogs, the incident detail panel intentionally has NO dim overlay. This Jira-style pattern allows security analysts to reference information on the page while viewing incident details. The panel is dismissable by clicking outside or pressing Escape, but the main content remains fully visible and contextually available.
        </p>
      </div>
    </div>
  ),
}
