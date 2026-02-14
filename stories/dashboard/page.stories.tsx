import type { Meta, StoryObj } from '@storybook/react'
import DashboardPage from '@/app/dashboard/page'

const meta = {
  title: 'Dashboard/FullPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 
          'The complete Dashboard page combining StatCard metrics, RiskTrendChart, IncidentChart, ' +
          'and AlertsTable components. Features a date range selector (24h/7d/30d/90d) that dynamically ' +
          'updates all data. Layout structure: header with title and controls, 4-column stats grid, ' +
          '2-column charts section, and full-width alerts table. ' +
          'Uses Sentinel design tokens throughout: Primary (#6366F1), Success (#10B981), Warning (#F59E0B), ' +
          'Danger (#EF4444), Main BG (#F8FAFC), Card Surface (#FEFEFE), Border (#E2E8F0), ' +
          'Text colors (#0F172A, #475569, #64748B).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 
          'Default dashboard view with 7-day date range selected. Shows all components in a cohesive layout ' +
          'with responsive grid system. Header includes ShieldAlert icon, title, last updated timestamp, ' +
          'and date range selector.'
      }
    }
  }
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 
          'Dashboard optimized for mobile devices. Stats grid collapses to single column, charts stack vertically, ' +
          'and table becomes horizontally scrollable. Header elements wrap to maintain usability on small screens.'
      }
    }
  }
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 
          'Dashboard on tablet-sized screens. Stats grid shows 2 columns, charts remain in 2-column layout, ' +
          'providing an optimal balance between density and readability.'
      }
    }
  }
}

export const DesktopWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 
          'Dashboard on wide desktop displays. Full 4-column stats grid, side-by-side charts, ' +
          'and expansive table view. Maximum width capped at 1600px for optimal readability.'
      }
    }
  }
}

export const WithSidebar: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <aside className="w-64 bg-[#0F172A] text-white p-6 flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1">Sentinel</h2>
            <p className="text-xs text-[#64748B]">Risk Intelligence Platform</p>
          </div>
          <nav className="flex-1 space-y-2">
            <div className="bg-[#6366F1] text-white px-4 py-2 rounded-md font-medium">
              Dashboard
            </div>
            <div className="text-[#64748B] px-4 py-2 rounded-md hover:bg-[#1E293B] cursor-pointer">
              Risk Scoring
            </div>
            <div className="text-[#64748B] px-4 py-2 rounded-md hover:bg-[#1E293B] cursor-pointer">
              Alerts
            </div>
            <div className="text-[#64748B] px-4 py-2 rounded-md hover:bg-[#1E293B] cursor-pointer">
              Reports
            </div>
            <div className="text-[#64748B] px-4 py-2 rounded-md hover:bg-[#1E293B] cursor-pointer">
              Settings
            </div>
          </nav>
        </aside>
        <div className="flex-1 overflow-auto">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 
          'Dashboard integrated with a sidebar navigation. Shows how the dashboard page fits within ' +
          'the larger application layout with left navigation panel.'
      }
    }
  }
}

export const DataLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 
          'Dashboard in its initial state. In production, this could show skeleton loaders or loading ' +
          'states. Current implementation loads data immediately from the data layer.'
      }
    }
  }
}

export const ScrollBehavior: Story = {
  decorators: [
    (Story) => (
      <div className="h-[600px] overflow-auto border border-[#E2E8F0] rounded-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 
          'Demonstrates dashboard scroll behavior within a constrained viewport. Header remains at top ' +
          'while content scrolls naturally. Useful for testing sticky headers or scroll-based interactions.'
      }
    }
  }
}

export const LayoutStructure: Story = {
  parameters: {
    docs: {
      description: {
        story: 
          'Complete layout breakdown:\n\n' +
          '**Header Section:**\n' +
          '- Left: ShieldAlert icon + Dashboard title + subtitle\n' +
          '- Right: Last updated timestamp + date range selector\n\n' +
          '**Stats Grid:** 4 columns on desktop (lg:grid-cols-4), 2 on tablet (md:grid-cols-2), 1 on mobile\n' +
          '- Overall Risk Score (6.8/10) with warning threshold\n' +
          '- Active Incidents (23) with critical threshold\n' +
          '- Users Monitored (1,247)\n' +
          '- Avg Response Time (2.3 hrs) with optimal threshold\n\n' +
          '**Charts Section:** 2 columns on desktop (lg:grid-cols-2), 1 on mobile\n' +
          '- Risk Trend Chart: 30-day line chart with danger threshold\n' +
          '- Incident Chart: Bar chart showing 6 incident categories\n\n' +
          '**Alerts Section:** Full-width table\n' +
          '- 8 recent security alerts with severity, user, time, status\n' +
          '- Interactive row hover states\n' +
          '- Action dropdown menus'
      }
    }
  }
}
