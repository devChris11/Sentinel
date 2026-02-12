# Layout Components - Usage Examples

Complete examples showing how to use the Sidebar and RootLayout components in your Sentinel application.

## Quick Start

### 1. Import the Components

```tsx
import { RootLayout } from "@/components/layout"
// or
import { Sidebar } from "@/components/layout"
```

### 2. Use RootLayout (Recommended)

The easiest way to add navigation to your pages:

```tsx
export default function DashboardPage() {
  return (
    <RootLayout>
      <div className="p-8">
        <h1>My Dashboard</h1>
      </div>
    </RootLayout>
  )
}
```

---

## Next.js App Router Examples

### Example 1: Dashboard Layout

Create a layout for all dashboard pages:

```tsx
// app/(dashboard)/layout.tsx
import { RootLayout } from "@/components/layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayout>{children}</RootLayout>
}
```

Then create dashboard pages without repeating the layout:

```tsx
// app/(dashboard)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Dashboard Overview
      </h1>
      {/* Your dashboard content */}
    </div>
  )
}
```

```tsx
// app/(dashboard)/risk-scoring/page.tsx
export default function RiskScoringPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Risk Scoring
      </h1>
      {/* Your risk scoring content */}
    </div>
  )
}
```

### Example 2: With Server Components

```tsx
// app/(dashboard)/reports/page.tsx
import { RootLayout } from "@/components/layout"

async function getReports() {
  // Fetch reports from API
  const res = await fetch('https://api.sentinel.ai/reports')
  return res.json()
}

export default async function ReportsPage() {
  const reports = await getReports()

  return (
    <RootLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Reports</h1>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  )
}
```

### Example 3: With Client Components

```tsx
// app/(dashboard)/alerts/page.tsx
"use client"

import { RootLayout } from "@/components/layout"
import { useState } from "react"

export default function AlertsPage() {
  const [filter, setFilter] = useState("all")

  return (
    <RootLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Alerts</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-md"
          >
            <option value="all">All Alerts</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        {/* Alert content */}
      </div>
    </RootLayout>
  )
}
```

---

## Advanced Examples

### Example 4: Collapsed Sidebar by Default

```tsx
import { RootLayout } from "@/components/layout"

export default function CompactDashboard() {
  return (
    <RootLayout sidebarDefaultCollapsed={true}>
      <div className="p-8">
        <h1>More Space for Content</h1>
        {/* Wide charts, tables, etc. */}
      </div>
    </RootLayout>
  )
}
```

### Example 5: Full-Width Content (No Padding)

```tsx
import { RootLayout } from "@/components/layout"

export default function FullWidthPage() {
  return (
    <RootLayout className="p-0">
      <div className="w-full h-screen">
        {/* Full-width map, canvas, or visualization */}
        <div className="bg-slate-900 h-full flex items-center justify-center">
          <p className="text-white">Full-width content area</p>
        </div>
      </div>
    </RootLayout>
  )
}
```

### Example 6: Custom Background

```tsx
import { RootLayout } from "@/components/layout"

export default function CustomBgPage() {
  return (
    <RootLayout className="bg-white">
      <div className="p-8">
        <h1>White Background Instead of Light Gray</h1>
      </div>
    </RootLayout>
  )
}
```

### Example 7: Centered Content Container

```tsx
import { RootLayout } from "@/components/layout"

export default function CenteredContentPage() {
  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Centered Content
        </h1>
        <p className="text-slate-600">
          Content is centered with max-width for better readability on large
          screens.
        </p>
      </div>
    </RootLayout>
  )
}
```

### Example 8: Scrollable Content

```tsx
import { RootLayout } from "@/components/layout"

export default function LongContentPage() {
  return (
    <RootLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Long Scrollable Content
        </h1>

        {/* This content will scroll while sidebar stays fixed */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold">Section {i + 1}</h3>
            <p className="text-slate-600">Some content here...</p>
          </div>
        ))}
      </div>
    </RootLayout>
  )
}
```

---

## Using Sidebar Standalone

If you need more control, use the Sidebar component directly:

### Example 9: Custom Layout Structure

```tsx
"use client"

import { Sidebar } from "@/components/layout"

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Custom header */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <h1 className="text-xl font-bold">Custom Header</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          {children}
        </main>

        {/* Custom footer */}
        <footer className="bg-white border-t border-slate-200 px-8 py-4">
          <p className="text-sm text-slate-600">© 2026 Sentinel</p>
        </footer>
      </div>
    </div>
  )
}
```

### Example 10: Multiple Layouts

```tsx
// components/layouts/admin-layout.tsx
import { Sidebar } from "@/components/layout"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
```

```tsx
// components/layouts/user-layout.tsx
import { Sidebar } from "@/components/layout"

export function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar defaultCollapsed={true} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
```

---

## Styling Tips

### Add Page-Level Padding

```tsx
<RootLayout>
  <div className="p-4 md:p-8 lg:p-12">
    {/* Responsive padding */}
  </div>
</RootLayout>
```

### Add Maximum Width Container

```tsx
<RootLayout>
  <div className="max-w-7xl mx-auto px-8 py-12">
    {/* Centered with max width */}
  </div>
</RootLayout>
```

### Grid Layouts

```tsx
<RootLayout>
  <div className="p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Responsive grid */}
    </div>
  </div>
</RootLayout>
```

---

## Best Practices

1. **Use RootLayout for consistency**: Prefer RootLayout over manually composing Sidebar + content
2. **Add padding to content**: The content area has no default padding, add it in your page
3. **Responsive design**: Use Tailwind responsive classes (sm:, md:, lg:) for padding and layout
4. **Semantic HTML**: Use appropriate heading levels and landmarks
5. **Accessibility**: Ensure proper heading hierarchy and ARIA labels where needed

---

## Testing

### In Storybook

```bash
npm run storybook
```

Navigate to:
- **Layout → Sidebar** - View sidebar variations
- **Layout → RootLayout** - View complete layout examples

### In Development

```bash
npm run dev
```

Then visit your dashboard routes to see the layouts in action.

---

## Troubleshooting

### Content not scrolling?

Make sure the parent RootLayout has a defined height:

```tsx
<RootLayout className="min-h-screen">
  {/* Your content */}
</RootLayout>
```

### Sidebar not showing on mobile?

The sidebar is hidden by default on mobile. Click the hamburger menu button (top-left) to open it.

### Active state not working?

The active state is based on the current pathname. Make sure your routes match the navigation items in the Sidebar component:

- `/dashboard`
- `/risk-scoring`
- `/alerts`
- `/reports`
- `/settings`

### Want to customize navigation items?

Edit the `navigationItems` array in `components/layout/sidebar.tsx`.
