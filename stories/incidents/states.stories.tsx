import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { 
  IncidentsLoading, 
  IncidentsEmptyAll, 
  IncidentsEmptyFiltered 
} from '@/components/incidents/incidents-states'
import { DismissModal } from '@/components/incidents/dismiss-modal'

const meta = {
  title: 'Incidents/States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading states, empty states, and modals used in the Incidents page.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## Empty States
 * 
 * Three empty states: Loading, No Incidents, No Filtered Results.
 */
export const EmptyStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Loading State
        </h3>
        <div className="rounded-lg border border-content-border bg-content-surface overflow-hidden">
          <IncidentsLoading />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          No Incidents (Empty State)
        </h3>
        <div className="rounded-lg border border-content-border bg-content-surface overflow-hidden">
          <IncidentsEmptyAll />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          No Filtered Results
        </h3>
        <div className="rounded-lg border border-content-border bg-content-surface overflow-hidden">
          <IncidentsEmptyFiltered onClearFilters={() => alert('Filters cleared!')} />
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Dismiss Modal
 * 
 * Modal requiring reason text for dismissing incidents.
 * Used for both individual and bulk dismissal.
 */
export const DismissModalExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <div className="space-y-6">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90"
        >
          Open Dismiss Modal
        </button>

        <DismissModal
          open={open}
          count={3}
          onClose={() => setOpen(false)}
          onConfirm={(reason: string) => {
            alert(`Dismissed 3 incidents with reason: ${reason}`)
            setOpen(false)
          }}
        />

        <div className="rounded-lg border border-content-border bg-content-surface p-6">
          <h3 className="text-lg font-semibold text-content-text-strong mb-4">
            Modal Behavior
          </h3>
          <ul className="space-y-2 text-sm text-content-text-muted">
            <li>✓ Reason text field is required (textarea)</li>
            <li>✓ Confirm button disabled until reason entered</li>
            <li>✓ Escape key or clicking outside closes modal</li>
            <li>✓ Clicking Cancel closes without action</li>
            <li>✓ Confirm triggers dismissal and shows success toast</li>
            <li>✓ Modal title shows count: "Dismiss X Incident(s)"</li>
          </ul>
        </div>
      </div>
    )
  },
}
