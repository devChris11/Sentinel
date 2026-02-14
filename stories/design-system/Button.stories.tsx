import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Check, 
  X, 
  Loader2, 
  AlertCircle,
  Save,
  Trash2,
  Download,
  Upload
} from 'lucide-react'

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 
          '## Button Hierarchy\n\n' +
          'Sentinel uses a four-tier button hierarchy to establish clear visual importance:\n\n' +
          '- **Primary**: High-emphasis actions (bg-primary, white text) - Main actions that advance the user\'s primary goal\n' +
          '- **Secondary/Outline**: Medium-emphasis actions (border only) - Supporting or cancel actions\n' +
          '- **Destructive**: Dangerous actions (bg-danger, white text) - Irreversible or high-risk operations\n' +
          '- **Ghost**: Low-emphasis actions (no border) - Tertiary optional actions\n\n' +
          '## Design Tokens\n\n' +
          'All buttons use Sentinel design tokens:\n' +
          '- `bg-primary` (#6366F1) - Primary button background\n' +
          '- `bg-danger` (#EF4444) - Destructive button background\n' +
          '- `border-content-border` (#E2E8F0) - Secondary button border\n' +
          '- `text-content-text` (#475569) - Secondary button text\n\n' +
          '## Accessibility\n\n' +
          '- All buttons support keyboard navigation (Tab, Enter, Space)\n' +
          '- Disabled state prevents interaction and changes opacity\n' +
          '- Icon-only buttons should include aria-label for screen readers\n' +
          '- Focus states use ring-2 for clear keyboard navigation\n\n' +
          '## Usage in Sentinel\n\n' +
          '- **Dashboard**: "View All Incidents →" (Secondary)\n' +
          '- **Incidents**: "Acknowledge" (Secondary), "Dismiss" (Destructive)\n' +
          '- **Risk Scoring**: "Assign Training" (Primary), "Cancel" (Secondary)\n' +
          '- **Navigation**: "Clear Filters" (Ghost)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'destructive', 'ghost'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## All Button Variants
 * 
 * Displays all four button variants side by side for comparison.
 * Primary (filled indigo), Secondary (outline), Destructive (filled red), Ghost (minimal).
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Primary Button</Button>
      <Button variant="outline">Secondary Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  ),
}

/**
 * ## Button Sizes
 * 
 * Three size options: Small (compact), Default (standard), Large (generous).
 * Consistent sizing across all variants.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-content-text-muted mb-3">Small (sm)</p>
        <div className="flex flex-wrap gap-4">
          <Button size="sm" variant="default">Primary</Button>
          <Button size="sm" variant="outline">Secondary</Button>
          <Button size="sm" variant="destructive">Destructive</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Default (md)</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Large (lg)</p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" variant="default">Primary</Button>
          <Button size="lg" variant="outline">Secondary</Button>
          <Button size="lg" variant="destructive">Destructive</Button>
          <Button size="lg" variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Buttons with Icons
 * 
 * Common icon patterns: icon left, icon right, icon only.
 * Uses Lucide React icons for consistency.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-content-text-muted mb-3">Icon Left</p>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Icon Right</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">
            View All Incidents
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Open in Incidents Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Icon Only</p>
        <div className="flex flex-wrap gap-4">
          <Button size="sm" variant="ghost" aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" aria-label="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Button States
 * 
 * Visual representation of all interactive states.
 * Includes disabled and loading states.
 */
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-content-text-muted mb-3">Default State</p>
        <div className="flex flex-wrap gap-4">
          <Button>Normal Button</Button>
          <Button variant="outline">Normal Outline</Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Disabled State</p>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button variant="destructive" disabled>Disabled Destructive</Button>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-content-text-muted mb-3">Loading State</p>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </Button>
          <Button variant="outline" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Usage Examples in Sentinel
 * 
 * Real-world button usage with context from the application.
 * Demonstrates proper variant selection for different actions.
 */
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Primary Actions (High Emphasis)
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Main actions that advance the user's primary goal. Use sparingly - typically one per screen.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Save Changes</Button>
          <Button>Submit Report</Button>
          <Button>Assign Training</Button>
          <Button>Create User</Button>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Secondary Actions (Medium Emphasis)
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Supporting actions or navigation. Used in Dashboard and Incidents for cross-page flows.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            Open in Incidents Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            View All Incidents
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="outline">Clear Filters</Button>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Destructive Actions (High Risk)
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Irreversible or dangerous actions. Always require confirmation dialog.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Dismiss
          </Button>
          <Button variant="destructive">Delete User</Button>
          <Button variant="destructive">Revoke Access</Button>
        </div>
      </div>

      <div className="rounded-lg border border-content-border bg-content-surface p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-4">
          Ghost Actions (Low Emphasis)
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Tertiary optional actions. Minimal visual weight.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost">Clear Selection</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="ghost">Learn More</Button>
          <Button variant="ghost">
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * ## Decision Tree
 * 
 * Guide for choosing the correct button variant.
 */
export const DecisionTree: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-lg border-2 border-primary bg-primary/5 p-6 mb-4">
        <h3 className="text-lg font-semibold text-primary mb-3">
          Is this the main action?
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          The primary goal the user wants to accomplish on this screen.
        </p>
        <div className="flex gap-3">
          <Button>Yes → Use Primary</Button>
        </div>
      </div>

      <div className="rounded-lg border-2 border-danger bg-danger/5 p-6 mb-4">
        <h3 className="text-lg font-semibold text-danger mb-3">
          Is this action dangerous or irreversible?
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Deletes data, dismisses alerts, revokes access - requires confirmation.
        </p>
        <div className="flex gap-3">
          <Button variant="destructive">Yes → Use Destructive</Button>
        </div>
      </div>

      <div className="rounded-lg border-2 border-content-border bg-content-bg p-6 mb-4">
        <h3 className="text-lg font-semibold text-content-text-strong mb-3">
          Is this a supporting action?
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Navigation, cancel, or alternative action with medium importance.
        </p>
        <div className="flex gap-3">
          <Button variant="outline">Yes → Use Secondary</Button>
        </div>
      </div>

      <div className="rounded-lg border-2 border-content-border bg-content-bg p-6">
        <h3 className="text-lg font-semibold text-content-text-strong mb-3">
          Is this optional or tertiary?
        </h3>
        <p className="text-sm text-content-text-muted mb-4">
          Low importance action that shouldn't draw attention.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost">Yes → Use Ghost</Button>
        </div>
      </div>
    </div>
  ),
}

// Individual variant stories for Storybook controls
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outline',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}
