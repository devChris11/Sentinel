import type { Meta, StoryObj } from '@storybook/react'
import { RootLayout } from '@/components/layout/root-layout'

const meta = {
  title: 'Layout/RootLayout',
  component: RootLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The RootLayout component is a wrapper that provides the main application structure with a sidebar and content area. Use this as the base layout for all authenticated pages in the Sentinel platform.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RootLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Dashboard Overview
        </h1>
        <p className="text-slate-600 mb-6">
          Welcome to the Sentinel platform. This is the main content area.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Total Risks
            </h3>
            <p className="text-3xl font-bold text-slate-900">1,247</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Active Alerts
            </h3>
            <p className="text-3xl font-bold text-red-600">23</p>
            <p className="text-sm text-red-600 mt-1">↑ 3 new alerts</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Resolved Today
            </h3>
            <p className="text-3xl font-bold text-green-600">89</p>
            <p className="text-sm text-green-600 mt-1">↑ 5% efficiency gain</p>
          </div>
        </div>
      </div>
    ),
  },
}

export const WithCollapsedSidebar: Story = {
  args: {
    sidebarDefaultCollapsed: true,
    children: (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Collapsed Sidebar View
        </h1>
        <p className="text-slate-600">
          The sidebar is collapsed by default, providing more space for content.
        </p>
      </div>
    ),
  },
}

export const WithScrollableContent: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Scrollable Content Demo
        </h1>
        <p className="text-slate-600 mb-6">
          This demonstrates the scrollable content area. The content area will
          scroll independently while the sidebar remains fixed.
        </p>

        {/* Generate scrollable content */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Content Block {i + 1}
            </h3>
            <p className="text-slate-600">
              This is a content block to demonstrate scrolling. The main content
              area is scrollable while the sidebar remains fixed in position. You
              can scroll through all the content without affecting the sidebar
              navigation.
            </p>
          </div>
        ))}
      </div>
    ),
  },
}

export const DashboardExample: Story = {
  args: {
    children: (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Risk Intelligence Dashboard
            </h1>
            <p className="text-lg text-slate-600">
              Real-time monitoring and AI-powered behavior analysis
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  Risk Score
                </h3>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  High
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900">7.8</p>
              <p className="text-sm text-slate-500 mt-1">out of 10</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  Active Users
                </h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">1,284</p>
              <p className="text-sm text-green-600 mt-1">↑ 23% this week</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  Incidents
                </h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">47</p>
              <p className="text-sm text-orange-600 mt-1">12 pending review</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-600">
                  Response Time
                </h3>
              </div>
              <p className="text-3xl font-bold text-slate-900">2.3m</p>
              <p className="text-sm text-green-600 mt-1">↓ 15% faster</p>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Alerts
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {[
                {
                  id: 1,
                  severity: 'high',
                  title: 'Unusual login pattern detected',
                  time: '5 minutes ago',
                },
                {
                  id: 2,
                  severity: 'medium',
                  title: 'Multiple failed authentication attempts',
                  time: '12 minutes ago',
                },
                {
                  id: 3,
                  severity: 'low',
                  title: 'Password policy violation',
                  time: '1 hour ago',
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          alert.severity === 'high'
                            ? 'bg-red-500'
                            : alert.severity === 'medium'
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-slate-900">
                          {alert.title}
                        </p>
                        <p className="text-sm text-slate-500">{alert.time}</p>
                      </div>
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export const ReportsExample: Story = {
  args: {
    children: (
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Risk Reports
          </h1>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Generate New Report
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Report Type
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                  <option>Weekly Summary</option>
                  <option>Monthly Analysis</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Generate Report
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Reports
            </h2>
            {[
              { name: 'Weekly Risk Summary - Feb 5-12', date: '2026-02-12' },
              { name: 'Monthly Analysis - January 2026', date: '2026-02-01' },
              { name: 'Quarterly Review - Q4 2025', date: '2026-01-15' },
            ].map((report, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium text-slate-900">{report.name}</p>
                  <p className="text-sm text-slate-500">
                    Generated on {report.date}
                  </p>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
}

export const MobilePreview: Story = {
  args: {
    children: (
      <div className="p-4 pt-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Mobile Layout
        </h1>
        <p className="text-slate-600 mb-4">
          On mobile devices, the sidebar becomes an overlay. Click the hamburger
          menu in the top-left corner to access navigation.
        </p>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Quick Stats</h3>
          <p className="text-slate-600">
            The content area remains fully scrollable and responsive.
          </p>
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
