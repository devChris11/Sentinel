import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const meta = {
  title: 'Dashboard/Integration',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Dashboard ↔ Incidents Integration\n\n' +
          'Documentation of the navigation flows between Dashboard and Incidents pages.\n\n' +
          '### Integration Changes\n\n' +
          '1. **Unified Data Source**: Both Dashboard and Incidents use the same `INCIDENTS` array\n' +
          '2. **Direct Navigation**: Removed modal, row click navigates to Incidents\n' +
          '3. **URL Parameters**: Uses `?open={id}` to auto-open side panel\n' +
          '4. **Actions Removed**: No three-dot menu, cleaner 5-column table\n' +
          '5. **View All Button**: Added below table for full incident list\n\n' +
          '### Navigation Flow\n\n' +
          '**Dashboard → Incidents:**\n' +
          '1. User clicks any alert row in Dashboard table\n' +
          '2. Router navigates to `/incidents?open={incidentId}`\n' +
          '3. Incidents page reads URL param\n' +
          '4. Auto-opens side panel with that incident\n' +
          '5. User can browse other incidents or close panel\n\n' +
          '**Incidents → Risk Scoring:**\n' +
          '1. User opens incident side panel\n' +
          '2. Clicks "View User Profile" button\n' +
          '3. Router navigates to `/risk-scoring?user={email}`\n' +
          '4. Risk Scoring page auto-opens user modal\n\n' +
          '### Data Flow\n\n' +
          '```typescript\n' +
          '// lib/incidents-data.ts\n' +
          'export const INCIDENTS: Incident[] = generateAllIncidents()\n' +
          'export function getDashboardAlerts(): SecurityAlert[] {\n' +
          '  return INCIDENTS.slice(0, 8).map(incidentToSecurityAlert)\n' +
          '}\n\n' +
          '// lib/dashboard-data.ts\n' +
          'import { getDashboardAlerts } from "./incidents-data"\n' +
          'const alerts: SecurityAlert[] = getDashboardAlerts()\n' +
          '```\n\n' +
          '### Design Rationale\n\n' +
          '**Why remove the modal?**\n' +
          '- Modal had limited functionality (just a preview)\n' +
          '- Users always needed to go to Incidents for full features\n' +
          '- Direct navigation is faster and more predictable\n' +
          '- Reduces duplicate code between modal and side panel\n\n' +
          '**Why use URL parameters?**\n' +
          '- Enables deep linking (share links to specific incidents)\n' +
          '- Browser back button works naturally\n' +
          '- State is preserved in URL, not component state\n' +
          '- Supports Dashboard → Incidents → Back → Dashboard flow',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Dashboard Navigation Components
 * 
 * Visual examples of the navigation elements added to Dashboard.
 */
export const NavigationComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          View All Incidents Button
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Added below the Recent Alerts table. Secondary (outline) variant. Navigates to `/incidents` (no side panel auto-open).
        </p>
        <Button variant="outline">
          View All Incidents
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Table Row Click Behavior
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Previously: Opened modal dialog with limited incident preview<br />
          {"Now: Navigates directly to "}
          <code className="text-xs font-mono">/incidents?open={'{incidentId}'}</code>
        </p>
        <div className="rounded border border-content-border bg-content-bg p-3">
          <p className="text-xs font-mono text-primary">
            onClick={`() => router.push(\`/incidents?open=\${alert.id}\`)`}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Actions Column Removed
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          The three-dot menu (MoreHorizontal icon) has been removed. Table now has 5 columns instead of 6.
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-content-text-muted">
            <strong className="text-content-text-strong">Previous columns:</strong> Severity, Alert, User, Time, Status, Actions
          </p>
          <p className="text-content-text-muted">
            <strong className="text-content-text-strong">Current columns:</strong> Severity, Alert, User, Time, Status
          </p>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Data Unification
 * 
 * How Dashboard and Incidents share the same data source.
 */
export const DataUnification: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">
          Single Source of Truth
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Dashboard and Incidents now share the same `INCIDENTS` array. Changes to incident data automatically reflect on both pages.
        </p>
        <div className="rounded border border-content-border bg-content-surface p-4 text-xs font-mono space-y-2">
          <p className="text-content-text-muted">// lib/incidents-data.ts</p>
          <p className="text-primary">export const INCIDENTS: Incident[] = generateAllIncidents()</p>
          <p className="text-content-text-muted">// 28 dynamically generated incidents</p>
          <br />
          <p className="text-primary">export function getDashboardAlerts(): SecurityAlert[]</p>
          <p className="text-content-text-muted">// Returns first 8 incidents, converted to SecurityAlert format</p>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Data Conversion
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Incident objects are converted to SecurityAlert format for Dashboard compatibility.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-content-text-strong mb-2">Incident (Full)</p>
            <ul className="text-content-text-muted space-y-1 text-xs">
              <li>• id, title, description</li>
              <li>• severity, severityScore</li>
              <li>• status</li>
              <li>• user (name, email, department)</li>
              <li>• timestamp (Date object)</li>
              <li>• aiReasoning</li>
              <li>• timeline (array)</li>
              <li>• notes (array)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-content-text-strong mb-2">SecurityAlert (Dashboard)</p>
            <ul className="text-content-text-muted space-y-1 text-xs">
              <li>• id, title, description</li>
              <li>• severity</li>
              <li>• status</li>
              <li>• user (name, email)</li>
              <li>• timestamp (formatted string)</li>
              <li className="text-danger">• (no aiReasoning)</li>
              <li className="text-danger">• (no timeline)</li>
              <li className="text-danger">• (no notes)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Benefits of Unification
        </h3>
        <ul className="space-y-2 text-sm text-content-text-muted">
          <li>✓ No data synchronization issues between pages</li>
          <li>✓ Single generator function creates all incidents</li>
          <li>✓ Consistent timestamps and user data</li>
          <li>✓ Easier to maintain (one data file)</li>
          <li>✓ Dashboard always shows latest 8 incidents</li>
          <li>✓ Adding incidents automatically updates both pages</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * ## URL Parameter Pattern
 * 
 * How URL parameters enable deep linking and navigation.
 */
export const URLParameters: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          URL Structure
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-content-text-muted mb-1">
              <strong className="text-content-text-strong">Dashboard row click:</strong>
            </p>
            <code className="text-xs font-mono text-primary">
              /incidents?open=INC-001
            </code>
          </div>
          <div>
            <p className="text-content-text-muted mb-1">
              <strong className="text-content-text-strong">"View All" button click:</strong>
            </p>
            <code className="text-xs font-mono text-primary">
              /incidents
            </code>
          </div>
          <div>
            <p className="text-content-text-muted mb-1">
              <strong className="text-content-text-strong">View User Profile click:</strong>
            </p>
            <code className="text-xs font-mono text-primary">
              /risk-scoring?user=s.chen@company.com
            </code>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Implementation
        </h3>
        <div className="rounded border border-content-border bg-content-bg p-4 text-xs font-mono space-y-3">
          <div>
            <p className="text-content-text-muted">// app/incidents/page.tsx</p>
            <p className="text-primary">const searchParams = useSearchParams()</p>
            <p className="text-primary">const openId = searchParams.get('open')</p>
            <br />
            <p className="text-primary">useEffect(() =&gt; {`{`}</p>
            <p className="text-content-text-muted ml-4">// Auto-open panel if ID in URL</p>
            <p className="text-primary ml-4">if (openId && !isLoading) {`{`}</p>
            <p className="text-primary ml-8">const incident = INCIDENTS.find(inc =&gt; inc.id === openId)</p>
            <p className="text-primary ml-8">if (incident) setSelectedIncident(incident)</p>
            <p className="text-primary ml-4">{`}`}</p>
            <p className="text-primary">{`}`}, [searchParams, isLoading])</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          User Experience Benefits
        </h3>
        <ul className="space-y-2 text-sm text-content-text-muted">
          <li>✓ <strong className="text-content-text-strong">Shareable Links:</strong> Copy URL to share specific incident with team</li>
          <li>✓ <strong className="text-content-text-strong">Browser Back Button:</strong> Works naturally, returns to Dashboard</li>
          <li>✓ <strong className="text-content-text-strong">Bookmark Support:</strong> Can bookmark specific incidents</li>
          <li>✓ <strong className="text-content-text-strong">State in URL:</strong> Panel state preserved, not in component state</li>
          <li>✓ <strong className="text-content-text-strong">Deep Linking:</strong> External systems can link directly to incidents</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * ## User Flows
 * 
 * Step-by-step user journeys through the integrated pages.
 */
export const UserFlows: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Flow 1: Morning Triage
        </h3>
        <ol className="space-y-2 text-sm text-content-text-muted">
          <li>1. Security analyst opens Dashboard</li>
          <li>2. Sees Recent Alerts table (8 incidents)</li>
          <li>3. Notices badge on Incidents sidebar: "12" new incidents</li>
          <li>4. Clicks "View All Incidents →" button</li>
          <li>5. Lands on /incidents page (28 total incidents)</li>
          <li>6. Filters to Critical + New status</li>
          <li>7. Selects 5 incidents via checkboxes</li>
          <li>8. Clicks "Acknowledge" → Toast: "Acknowledged 5 incidents"</li>
          <li>9. Badge updates to "7" remaining new incidents</li>
        </ol>
      </div>

      <div className="rounded-lg border-2 border-orange bg-orange/5 p-6">
        <h3 className="text-lg font-semibold text-orange mb-4">
          Flow 2: Investigate Specific Incident
        </h3>
        <ol className="space-y-2 text-sm text-content-text-muted">
          <li>1. Analyst on Dashboard, sees critical alert</li>
          <li>2. Clicks row: "Multiple Failed Login Attempts"</li>
          <li>3. Navigates to /incidents?open=INC-001</li>
          <li>4. Side panel auto-opens (no dim overlay)</li>
          <li>5. Reads incident details and AI reasoning</li>
          <li>6. Clicks "View User Profile" button</li>
          <li>7. Navigates to /risk-scoring?user=s.chen@company.com</li>
          <li>8. User modal auto-opens showing Sarah Chen's risk profile</li>
          <li>9. Reviews risk score, trend, activity history</li>
          <li>10. Browser back button → returns to Incidents</li>
          <li>11. Browser back button → returns to Dashboard</li>
        </ol>
      </div>

      <div className="rounded-lg border-2 border-success bg-success/5 p-6">
        <h3 className="text-lg font-semibold text-success mb-4">
          Flow 3: Bulk Dismissal
        </h3>
        <ol className="space-y-2 text-sm text-content-text-muted">
          <li>1. Analyst on Incidents page</li>
          <li>2. Filters to Low severity + New status</li>
          <li>3. Sees 8 low-priority false positives</li>
          <li>4. Selects 6 incidents (leaves 2 for later review)</li>
          <li>5. Clicks "Dismiss" button (red destructive style)</li>
          <li>6. Modal opens: "Dismiss 6 Incidents"</li>
          <li>7. Types reason: "Automated test alerts, confirmed false positives"</li>
          <li>8. Confirm button enables</li>
          <li>9. Clicks Dismiss → Modal closes</li>
          <li>10. Toast: "Dismissed 6 incidents"</li>
          <li>11. Selection clears, table updates</li>
        </ol>
      </div>
    </div>
  ),
}

/**
 * ## Migration Guide
 * 
 * What changed for developers working on the codebase.
 */
export const MigrationGuide: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Breaking Changes
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-content-text-strong mb-2">
              1. AlertDetailModal no longer used
            </p>
            <p className="text-content-text-muted">
              The alert-detail-modal.tsx component has been removed from the Dashboard flow. 
              Row clicks now navigate directly to Incidents page instead of opening a modal.
            </p>
          </div>
          <div>
            <p className="font-semibold text-content-text-strong mb-2">
              2. Dashboard alerts data source changed
            </p>
            <p className="text-content-text-muted mb-2">
              Previously: dashboard-data.ts had hardcoded alerts array<br />
              Now: Uses getDashboardAlerts() from incidents-data.ts
            </p>
            <code className="text-xs font-mono text-primary bg-content-bg px-2 py-1 rounded">
              import {`{`} getDashboardAlerts {`}`} from "./incidents-data"
            </code>
          </div>
          <div>
            <p className="font-semibold text-content-text-strong mb-2">
              3. AlertsTable props simplified
            </p>
            <p className="text-content-text-muted">
              No longer needs onStatusChange callback. Row clicks handled internally with router.push().
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          New Files Created
        </h3>
        <ul className="space-y-2 text-sm text-content-text-muted font-mono">
          <li>✓ app/incidents/page.tsx</li>
          <li>✓ components/incidents/incidents-header.tsx</li>
          <li>✓ components/incidents/incidents-filters.tsx</li>
          <li>✓ components/incidents/incidents-table.tsx</li>
          <li>✓ components/incidents/incidents-pagination.tsx</li>
          <li>✓ components/incidents/incidents-states.tsx</li>
          <li>✓ components/incidents/incident-detail-panel.tsx</li>
          <li>✓ components/incidents/dismiss-modal.tsx</li>
          <li>✓ lib/incidents-data.ts (replaces old version)</li>
        </ul>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Files Modified
        </h3>
        <ul className="space-y-2 text-sm text-content-text-muted font-mono">
          <li>✓ components/dashboard/alerts-table.tsx (navigation, removed Actions)</li>
          <li>✓ components/layout/sidebar.tsx (added Incidents + badge)</li>
          <li>✓ lib/dashboard-data.ts (uses getDashboardAlerts)</li>
        </ul>
      </div>
    </div>
  ),
}
