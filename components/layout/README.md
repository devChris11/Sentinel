# Layout Components

A collection of layout components for the Sentinel platform.

## Components

- **Sidebar**: Navigation sidebar with collapsible design
- **RootLayout**: Main application wrapper that combines sidebar and content area

---

## Sidebar Component

A fully-featured sidebar navigation component for the Sentinel platform.

## Features

✨ **Collapsible Design**: Toggle between 240px (expanded) and 64px (collapsed) widths
🎨 **Active State Highlighting**: Indigo 500 background for the current page
🖱️ **Hover Effects**: Smooth hover transitions on all navigation items
📱 **Responsive**: Mobile-friendly with hamburger menu on small screens
👤 **User Profile**: Persistent user info at the bottom
⌨️ **Keyboard Accessible**: Full keyboard navigation support
🎯 **Brand Logo**: Sentinel branding with shield icon

## Usage

### Basic Implementation

```tsx
import { Sidebar } from "@/components/layout/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-slate-50">
        {children}
      </main>
    </div>
  )
}
```

### With Collapsed State by Default

```tsx
<Sidebar defaultCollapsed={true} />
```

### Custom Styling

```tsx
<Sidebar className="border-r border-slate-200" />
```

## Navigation Items

The sidebar includes the following navigation items:

| Label | Route | Icon |
|-------|-------|------|
| Dashboard | `/dashboard` | LayoutDashboard |
| Risk Scoring | `/risk-scoring` | Shield |
| Alerts | `/alerts` | AlertCircle |
| Reports | `/reports` | FileText |
| Settings | `/settings` | Settings |

## Styling Details

- **Background**: `#0F172A` (Slate 900)
- **Expanded Width**: `240px` (60/60rem)
- **Collapsed Width**: `64px` (16/4rem)
- **Active State**: Indigo 500 (`#6366f1`) with shadow
- **Hover State**: Slate 700/50 opacity
- **Text Colors**: Slate 200-300 for normal, white for active
- **Border**: Slate 700/50 opacity

## Responsive Behavior

### Desktop (lg and above)
- Sidebar is always visible
- Toggle button collapses/expands in place
- Smooth width transition

### Mobile (below lg)
- Sidebar slides in from left when hamburger menu is clicked
- Overlay appears behind sidebar
- Press ESC or click overlay to close
- Auto-closes when navigating to a new page

## Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- Focus visible states
- Semantic HTML structure
- ESC key closes mobile menu

## Customization

### Changing Navigation Items

Edit the `navigationItems` array in `sidebar.tsx`:

```tsx
const navigationItems: NavItem[] = [
  {
    label: "Your Page",
    href: "/your-route",
    icon: YourLucideIcon,
  },
  // ... more items
]
```

### Changing User Info

Update the user profile section (around line 195):

```tsx
<p className="text-sm font-medium text-white truncate">
  Your Name
</p>
<p className="text-xs text-slate-400 truncate">
  your.email@example.com
</p>
```

### Theming

The sidebar uses CSS variables defined in `app/globals.css`:

```css
--color-sidebar-bg: #0f172a;
--color-sidebar-surface: #1e293b;
--color-sidebar-border: #334155;
--spacing-sidebar-expanded: 240px;
--spacing-sidebar-collapsed: 64px;
```

## Storybook

View the component in Storybook:

```bash
npm run storybook
```

Then navigate to **Layout → Sidebar** to see all variations:
- Default (expanded)
- Collapsed
- With Light Background
- Interactive Demo
- Mobile Preview

## Dependencies

- `lucide-react` - Icons
- `next/navigation` - Router integration
- `@/components/ui/button` - Button component
- `@/components/ui/avatar` - User avatar
- `@/components/ui/separator` - Visual separator

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface SidebarProps {
  className?: string
  defaultCollapsed?: boolean
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## RootLayout Component

A wrapper component that provides the main application structure with a sidebar and scrollable content area.

### Features

✨ **Integrated Sidebar**: Automatically includes the Sidebar component
📱 **Responsive**: Sidebar becomes overlay on mobile/tablet
🎨 **Light Background**: Content area uses #F8FAFC (Slate 50)
📜 **Scrollable Content**: Main content area scrolls independently
🔧 **Configurable**: Control sidebar collapsed state

### Usage

#### Basic Implementation

```tsx
import { RootLayout } from "@/components/layout/root-layout"

export default function DashboardPage() {
  return (
    <RootLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Your content here...</p>
      </div>
    </RootLayout>
  )
}
```

#### With Collapsed Sidebar by Default

```tsx
<RootLayout sidebarDefaultCollapsed={true}>
  {/* Your content */}
</RootLayout>
```

#### With Custom Content Styling

```tsx
<RootLayout className="bg-white">
  {/* Content with white background instead of default #F8FAFC */}
</RootLayout>
```

#### As Next.js App Layout

```tsx
// app/layout.tsx or app/(dashboard)/layout.tsx
import { RootLayout } from "@/components/layout/root-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
```

### Props

```tsx
interface RootLayoutProps {
  children: React.ReactNode
  className?: string
  sidebarDefaultCollapsed?: boolean
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to display in main area |
| `className` | `string` | `undefined` | Additional CSS classes for main content |
| `sidebarDefaultCollapsed` | `boolean` | `false` | Whether sidebar starts collapsed on desktop |

### Layout Structure

```
┌─────────────────────────────────────┐
│  RootLayout (flex container)        │
│  ┌──────────┬─────────────────────┐ │
│  │          │                     │ │
│  │ Sidebar  │  Main Content Area  │ │
│  │ (fixed)  │  (flex-1, scroll)   │ │
│  │          │                     │ │
│  │  240px   │     Remaining       │ │
│  │  or      │     space           │ │
│  │  64px    │                     │ │
│  │          │  bg-[#F8FAFC]       │ │
│  │          │                     │ │
│  └──────────┴─────────────────────┘ │
└─────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px)**: Sidebar fixed on left, content area takes remaining space
- **Tablet/Mobile (<1024px)**: Sidebar slides over content as overlay, hamburger menu visible

### Styling

- **Main Content Background**: `#F8FAFC` (Slate 50)
- **Min Height**: `100vh` (full viewport height)
- **Overflow**: Content area is scrollable
- **Sidebar Width**: 240px expanded, 64px collapsed (on desktop)

### Storybook Examples

View the component in Storybook:

```bash
npm run storybook
```

Navigate to **Layout → RootLayout** to see:
- Default layout with sample content
- Collapsed sidebar variation
- Scrollable content demo
- Dashboard example
- Reports page example
- Mobile preview

### Common Patterns

#### Dashboard Layout

```tsx
<RootLayout>
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-3 gap-4">
      {/* Stats cards */}
    </div>
  </div>
</RootLayout>
```

#### Full-Width Content

```tsx
<RootLayout className="p-0">
  <div className="w-full h-full">
    {/* Full-width content like maps, charts */}
  </div>
</RootLayout>
```

#### Centered Container

```tsx
<RootLayout>
  <div className="max-w-7xl mx-auto p-8">
    {/* Centered content */}
  </div>
</RootLayout>
```

### TypeScript Support

Fully typed with TypeScript for excellent IDE autocomplete and type safety.

### Performance

- Client-side component (`"use client"`)
- Minimal re-renders
- Efficient sidebar state management
- Smooth transitions with CSS
