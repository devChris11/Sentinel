import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const ColorSwatch = ({ 
  name, 
  hex, 
  className, 
  usage 
}: { 
  name: string; 
  hex: string; 
  className: string; 
  usage: string;
}) => (
  <div className="space-y-2">
    <div className={`w-32 h-32 rounded-lg border border-content-border ${className}`} />
    <div>
      <p className="font-semibold text-sm text-content-text-strong">{name}</p>
      <p className="text-xs text-content-text-muted font-mono">{hex}</p>
      <p className="text-xs text-content-text-muted mt-1">{usage}</p>
    </div>
  </div>
);

const ColorsShowcase = () => (
  <div className="p-8 space-y-12 bg-content-bg min-h-screen">
    {/* Primary */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-content-text-strong">Primary Color</h2>
      <div className="grid grid-cols-1 gap-6">
        <ColorSwatch
          name="Indigo 500"
          hex="#6366F1"
          className="bg-primary"
          usage="Primary buttons, links, active states"
        />
      </div>
    </section>

    {/* Semantic */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-content-text-strong">Semantic Colors</h2>
      <div className="grid grid-cols-5 gap-6">
        <ColorSwatch
          name="Success"
          hex="#10B981"
          className="bg-success"
          usage="Low risk, positive actions"
        />
        <ColorSwatch
          name="Warning"
          hex="#F59E0B"
          className="bg-warning"
          usage="Medium risk, caution"
        />
        <ColorSwatch
          name="Danger"
          hex="#EF4444"
          className="bg-danger"
          usage="High risk, critical alerts"
        />
        <ColorSwatch
          name="Orange"
          hex="#F97316"
          className="bg-orange"
          usage="High risk level, urgent warnings"
        />
        <ColorSwatch
          name="Info"
          hex="#3B82F6"
          className="bg-info"
          usage="Informational messages"
        />
      </div>
    </section>

    {/* Dark Sidebar */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-content-text-strong">Dark Sidebar Palette</h2>
      <div className="grid grid-cols-3 gap-6">
        <ColorSwatch
          name="Sidebar BG"
          hex="#0F172A"
          className="bg-sidebar-bg"
          usage="Main sidebar background"
        />
        <ColorSwatch
          name="Sidebar Surface"
          hex="#1E293B"
          className="bg-sidebar-surface"
          usage="Elevated elements"
        />
        <ColorSwatch
          name="Sidebar Border"
          hex="#334155"
          className="bg-sidebar-border"
          usage="Dividers, borders"
        />
        <ColorSwatch
          name="Text Strong"
          hex="#F1F5F9"
          className="bg-sidebar-text-strong"
          usage="Headings, active items"
        />
        <ColorSwatch
          name="Text Default"
          hex="#CBD5E1"
          className="bg-sidebar-text"
          usage="Navigation items"
        />
        <ColorSwatch
          name="Text Muted"
          hex="#94A3B8"
          className="bg-sidebar-text-muted"
          usage="Secondary text"
        />
      </div>
    </section>

    {/* Light Content */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-content-text-strong">Light Content Palette</h2>
      <div className="grid grid-cols-4 gap-6">
        <ColorSwatch
          name="Content BG"
          hex="#F8FAFC"
          className="bg-content-bg border"
          usage="Main content background"
        />
        <ColorSwatch
          name="BG Alt"
          hex="#F1F5F9"
          className="bg-content-bg-alt"
          usage="Zebra stripes, hover"
        />
        <ColorSwatch
          name="Surface"
          hex="#FEFEFE"
          className="bg-content-surface border"
          usage="Cards, panels"
        />
        <ColorSwatch
          name="Border"
          hex="#E2E8F0"
          className="bg-content-border"
          usage="Dividers, outlines"
        />
        <ColorSwatch
          name="Text Strong"
          hex="#0F172A"
          className="bg-content-text-strong"
          usage="Headings, emphasis"
        />
        <ColorSwatch
          name="Text Default"
          hex="#475569"
          className="bg-content-text"
          usage="Body text"
        />
        <ColorSwatch
          name="Text Muted"
          hex="#64748B"
          className="bg-content-text-muted"
          usage="Secondary text"
        />
      </div>
    </section>
  </div>
);

const meta = {
  title: 'Design System/Colors',
  component: ColorsShowcase,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};