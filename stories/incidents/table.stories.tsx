import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { IncidentsTable } from '@/components/incidents/incidents-table'
import { INCIDENTS, type Incident } from '@/lib/incidents-data'

const meta = {
  title: 'Incidents/Table',
  component: IncidentsTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The main table component showing 20 incidents per page with sorting, selection, and click interactions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IncidentsTable>

export default meta
type Story = StoryObj<typeof meta>

const placeholderArgs = {
  incidents: INCIDENTS.slice(0, 10),
  selectedIds: new Set<string>(),
  onToggleSelect: (_id: string) => {},
  onToggleSelectAll: () => {},
  onRowClick: (_incident: Incident) => {},
  sortColumn: 'time',
  sortDirection: 'desc' as const,
  onSort: (_column: string) => {},
  totalCount: 10,
  currentPage: 1,
  totalPages: 1,
  onPageChange: (_page: number) => {},
}

/**
 * ## Incidents Table
 * 
 * Interactive table with 10 sample incidents.
 * Demonstrates sorting, selection, and row click functionality.
 */
export const Default: Story = {
  args: placeholderArgs,
  render: () => {
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = React.useState('time')
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc')
    const [currentPage, setCurrentPage] = React.useState(1)
    
    const sampleIncidents = INCIDENTS.slice(0, 10)

    return (
      <div className="space-y-6">
        <IncidentsTable
          incidents={sampleIncidents}
          selectedIds={selectedIds}
          onToggleSelect={(id) => {
            setSelectedIds(prev => {
              const next = new Set(prev)
              if (next.has(id)) next.delete(id)
              else next.add(id)
              return next
            })
          }}
          onToggleSelectAll={() => {
            const allIds = sampleIncidents.map(inc => inc.id)
            const allSelected = allIds.every(id => selectedIds.has(id))
            if (allSelected) {
              setSelectedIds(new Set())
            } else {
              setSelectedIds(new Set(allIds))
            }
          }}
          onRowClick={(incident) => alert(`Clicked: ${incident.title}`)}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={(col) => {
            if (col === sortColumn) {
              setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
            } else {
              setSortColumn(col)
              setSortDirection(col === 'time' ? 'desc' : 'asc')
            }
          }}
          totalCount={INCIDENTS.length}
          currentPage={currentPage}
          totalPages={Math.ceil(INCIDENTS.length / 20)}
          onPageChange={setCurrentPage}
        />

        <div className="rounded-lg border border-content-border bg-content-surface p-6">
          <h3 className="text-lg font-semibold text-content-text-strong mb-4">
            Table Features
          </h3>
          <ul className="space-y-2 text-sm text-content-text-muted">
            <li>✓ <strong>6 Columns:</strong> Checkbox, Severity (icon), Incident (title+desc), User (avatar+name), Time, Status (badge)</li>
            <li>✓ <strong>Sortable:</strong> Click column headers to sort (arrow indicator shows direction)</li>
            <li>✓ <strong>Row Click:</strong> Opens side panel with full incident details</li>
            <li>✓ <strong>Checkbox Click:</strong> Selects for bulk actions (doesn't open panel)</li>
            <li>✓ <strong>Select All:</strong> Checkbox in header selects all on current page</li>
            <li>✓ <strong>Hover State:</strong> Row highlights on hover (bg-content-bg-alt)</li>
            <li>✓ <strong>20 Rows Per Page:</strong> Pagination integrated inside table footer (matches Risk Scoring)</li>
          </ul>
        </div>
      </div>
    )
  },
}
