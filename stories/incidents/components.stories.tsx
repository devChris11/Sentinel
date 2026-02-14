import type { Meta, StoryObj } from '@storybook/react'
import { 
  AlertOctagon, 
  AlertTriangle, 
  AlertCircle, 
  Info 
} from 'lucide-react'

const meta = {
  title: 'Incidents/Components',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          'Visual components used throughout the Incidents page: severity icons, status badges, and filter elements.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Severity Icons
 * 
 * All four severity levels with their visual indicators.
 * Each uses a colored dot and corresponding Lucide icon.
 */
export const SeverityIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      <div className="rounded-lg border border-content-border bg-content-surface p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-danger" />
          <AlertOctagon className="h-5 w-5 text-danger" />
        </div>
        <h3 className="font-semibold text-content-text-strong mb-1">Critical</h3>
        <p className="text-xs text-content-text-muted mb-2">#EF4444</p>
        <p className="text-xs text-content-text-muted">
          Score: 8.0-10.0<br/>
          Immediate attention required
        </p>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-orange" />
          <AlertTriangle className="h-5 w-5 text-orange" />
        </div>
        <h3 className="font-semibold text-content-text-strong mb-1">High</h3>
        <p className="text-xs text-content-text-muted mb-2">#F97316</p>
        <p className="text-xs text-content-text-muted">
          Score: 6.5-7.9<br/>
          Urgent review needed
        </p>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-warning" />
          <AlertCircle className="h-5 w-5 text-warning" />
        </div>
        <h3 className="font-semibold text-content-text-strong mb-1">Medium</h3>
        <p className="text-xs text-content-text-muted mb-2">#F59E0B</p>
        <p className="text-xs text-content-text-muted">
          Score: 4.0-6.4<br/>
          Monitor and triage
        </p>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-success" />
          <Info className="h-5 w-5 text-success" />
        </div>
        <h3 className="font-semibold text-content-text-strong mb-1">Low</h3>
        <p className="text-xs text-content-text-muted mb-2">#10B981</p>
        <p className="text-xs text-content-text-muted">
          Score: 2.0-3.9<br/>
          Informational only
        </p>
      </div>
    </div>
  ),
}

/**
 * ## Status Badges
 * 
 * All five status types used in the Incidents page.
 * Shows both table size (small) and panel size (default).
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Table Size (Small)
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex rounded-full border border-info/20 bg-info/10 px-2 py-0.5 text-xs font-medium text-info">
            New
          </span>
          <span className="inline-flex rounded-full border border-warning/20 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
            Acknowledged
          </span>
          <span className="inline-flex rounded-full border border-orange/20 bg-orange/10 px-2 py-0.5 text-xs font-medium text-orange">
            In Progress
          </span>
          <span className="inline-flex rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            Resolved
          </span>
          <span className="inline-flex rounded-full border border-content-text-muted/20 bg-content-text-muted/10 px-2 py-0.5 text-xs font-medium text-content-text-muted">
            Dismissed
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Side Panel Size (Default)
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex rounded-full border border-info/20 bg-info/10 px-3 py-1 text-xs font-medium text-info">
            New
          </span>
          <span className="inline-flex rounded-full border border-warning/20 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
            Acknowledged
          </span>
          <span className="inline-flex rounded-full border border-orange/20 bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
            In Progress
          </span>
          <span className="inline-flex rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-medium text-success">
            Resolved
          </span>
          <span className="inline-flex rounded-full border border-content-text-muted/20 bg-content-text-muted/10 px-3 py-1 text-xs font-medium text-content-text-muted">
            Dismissed
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-sm font-semibold text-content-text-strong mb-3">
          Status Definitions
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-full border border-info/20 bg-info/10 px-2 py-0.5 text-xs font-medium text-info shrink-0">
              New
            </span>
            <p className="text-content-text-muted">
              Unacknowledged incident, requires first look by security team
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-full border border-info/20 bg-info/10 px-2 py-0.5 text-xs font-medium text-info shrink-0">
              Acknowledged
            </span>
            <p className="text-content-text-muted">
              Seen and triaged by security team, not yet assigned for investigation
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-full border border-orange/20 bg-orange/10 px-2 py-0.5 text-xs font-medium text-orange shrink-0">
              In Progress
            </span>
            <p className="text-content-text-muted">
              Actively being investigated, has assigned owner
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-xs font-medium text-success shrink-0">
              Resolved
            </span>
            <p className="text-content-text-muted">
              Issue fixed and closed, successful outcome
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-full border border-content-text-muted/20 bg-content-text-muted/10 px-2 py-0.5 text-xs font-medium text-content-text-muted shrink-0">
              Dismissed
            </span>
            <p className="text-content-text-muted">
              False positive or irrelevant, no action taken
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Filter Bar
 * 
 * The four filter dropdowns used to filter incidents.
 */
export const FilterBar: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-content-border bg-content-surface p-6">
          <h3 className="text-lg font-semibold text-content-text-strong mb-4">
            Filter Components
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-content-text-muted mb-2">
                <strong>Severity Filter:</strong> Filters by incident severity level
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-content-text-muted">Options:</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-danger" />
                  Critical
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange" />
                  High
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  Medium
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Low
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-content-text-muted mb-2">
                <strong>Status Filter:</strong> Filters by incident workflow status
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-content-text-muted">Options:</span>
                <span className="inline-flex rounded-full border border-info/20 bg-info/10 px-2 py-0.5 text-xs font-medium text-info">
                  New
                </span>
                <span className="inline-flex rounded-full border border-warning/20 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                  Acknowledged
                </span>
                <span className="inline-flex rounded-full border border-orange/20 bg-orange/10 px-2 py-0.5 text-xs font-medium text-orange">
                  In Progress
                </span>
                <span className="inline-flex rounded-full border border-success/20 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  Resolved
                </span>
                <span className="inline-flex rounded-full border border-content-text-muted/20 bg-content-text-muted/10 px-2 py-0.5 text-xs font-medium text-content-text-muted">
                  Dismissed
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-content-text-muted mb-2">
                <strong>Time Filter:</strong> Filters by incident age
              </p>
              <p className="text-sm text-content-text">
                Options: Last Hour, Last 24 Hours, Last 7 Days, Last 30 Days
              </p>
            </div>

            <div>
              <p className="text-sm text-content-text-muted mb-2">
                <strong>Department Filter:</strong> Filters by user's department
              </p>
              <p className="text-sm text-content-text">
                Options: Engineering, Finance, Sales, Marketing, IT, HR, Legal, etc.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-content-border bg-content-surface p-6">
          <h3 className="text-lg font-semibold text-content-text-strong mb-4">
            Filter Behavior
          </h3>
          <ul className="space-y-2 text-sm text-content-text-muted">
            <li>✓ Filters are cumulative (AND logic)</li>
            <li>✓ Changing any filter resets pagination to page 1</li>
            <li>✓ "Clear All Filters" button resets all dropdowns and search</li>
            <li>✓ Filter state persists within session (not across page reloads)</li>
            <li>✓ Search query has 300ms debounce for performance</li>
          </ul>
        </div>
      </div>
    )
  },
}

/**
 * ## Bulk Selection Bar
 * 
 * UI shown when incidents are selected via checkboxes.
 */
export const BulkSelectionBar: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-primary bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-content-text-strong">
            5 incidents selected
          </span>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-content-border bg-content-surface px-4 py-2 text-sm font-medium text-content-text hover:bg-content-bg-alt">
              Acknowledge
            </button>
            <button className="rounded-md bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">
              Dismiss
            </button>
            <button className="text-sm text-content-text-muted hover:text-content-text">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Bulk Actions
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-content-text-strong">Acknowledge:</strong>
            <p className="text-content-text-muted mt-1">
              Updates selected incidents to "Acknowledged" status. Shows success toast with count. Clears selection after action.
            </p>
          </div>
          <div>
            <strong className="text-content-text-strong">Dismiss:</strong>
            <p className="text-content-text-muted mt-1">
              Opens modal requiring reason. Updates selected incidents to "Dismissed" status. Shows success toast. Used for false positives.
            </p>
          </div>
          <div>
            <strong className="text-content-text-strong">Clear:</strong>
            <p className="text-content-text-muted mt-1">
              Deselects all selected incidents. Hides the bulk action bar.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}
