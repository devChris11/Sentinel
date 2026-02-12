import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/components/layout/sidebar'

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Sidebar component provides navigation for the Sentinel platform. It features a collapsible design with active state highlighting, hover effects, and responsive mobile support.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-slate-50">
        <Story />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Main Content Area
          </h1>
          <p className="text-slate-600">
            This is the main content area. The sidebar is shown on the left with
            expanded state by default.
          </p>
        </main>
      </div>
    ),
  ],
}

export const Collapsed: Story = {
  args: {
    defaultCollapsed: true,
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-slate-50">
        <Story />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Main Content Area
          </h1>
          <p className="text-slate-600">
            This is the main content area with the sidebar in collapsed state.
            Only icons are visible.
          </p>
        </main>
      </div>
    ),
  ],
}

export const WithLightBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-white">
        <Story />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">
                  Total Risks
                </h3>
                <p className="text-3xl font-bold text-slate-900">1,247</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">
                  Active Alerts
                </h3>
                <p className="text-3xl font-bold text-red-600">23</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600 mb-2">
                  Resolved Today
                </h3>
                <p className="text-3xl font-bold text-green-600">89</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    ),
  ],
}

export const InteractiveDemo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing the sidebar with all navigation items. Click the navigation items to see the active state, and use the toggle button to collapse/expand.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <Story />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Sentinel Platform
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              AI-Native Behavior Risk Intelligence
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Sidebar Features
                </h2>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>
                      <strong>Collapsible:</strong> Click the chevron icon to
                      collapse/expand
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>
                      <strong>Active State:</strong> Indigo 500 background for
                      current page
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>
                      <strong>Hover Effects:</strong> Subtle hover states on all
                      items
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>
                      <strong>Responsive:</strong> Hamburger menu on mobile
                      screens
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>
                      <strong>User Profile:</strong> Fixed at bottom with avatar
                      and info
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Navigation Items
                </h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                      <span className="text-indigo-600 text-sm">📊</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Dashboard</p>
                      <p className="text-sm text-slate-500">Overview & metrics</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                      <span className="text-indigo-600 text-sm">🛡️</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Risk Scoring</p>
                      <p className="text-sm text-slate-500">AI-powered analysis</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 text-sm">⚠️</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Alerts</p>
                      <p className="text-sm text-slate-500">Real-time notifications</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                      <span className="text-indigo-600 text-sm">📄</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Reports</p>
                      <p className="text-sm text-slate-500">Analytics & exports</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                      <span className="text-slate-600 text-sm">⚙️</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Settings</p>
                      <p className="text-sm text-slate-500">Configuration</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                💡 Try It Out
              </h3>
              <p className="text-indigo-700">
                Resize your browser window to see the responsive mobile menu, or
                click the chevron button in the sidebar header to toggle between
                expanded and collapsed states.
              </p>
            </div>
          </div>
        </main>
      </div>
    ),
  ],
}

export const MobilePreview: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Preview of the sidebar on mobile devices. A hamburger menu button appears in the top-left corner.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-slate-50">
        <Story />
        <main className="flex-1 p-4 pt-20">
          <h1 className="text-xl font-bold text-slate-900 mb-4">
            Mobile View
          </h1>
          <p className="text-slate-600 text-sm">
            Click the hamburger menu in the top-left to open the sidebar.
          </p>
        </main>
      </div>
    ),
  ],
}
