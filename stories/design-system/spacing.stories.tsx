import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spacing scale and patterns for consistent layout and component spacing in Sentinel. Based on Tailwind CSS spacing utilities.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Spacing scale data
const spacingScale = [
  { value: '0', px: '0px', tailwind: '0', rem: '0rem' },
  { value: '0.5', px: '2px', tailwind: '0.5', rem: '0.125rem' },
  { value: '1', px: '4px', tailwind: '1', rem: '0.25rem' },
  { value: '1.5', px: '6px', tailwind: '1.5', rem: '0.375rem' },
  { value: '2', px: '8px', tailwind: '2', rem: '0.5rem' },
  { value: '3', px: '12px', tailwind: '3', rem: '0.75rem' },
  { value: '4', px: '16px', tailwind: '4', rem: '1rem' },
  { value: '5', px: '20px', tailwind: '5', rem: '1.25rem' },
  { value: '6', px: '24px', tailwind: '6', rem: '1.5rem' },
  { value: '8', px: '32px', tailwind: '8', rem: '2rem' },
  { value: '10', px: '40px', tailwind: '10', rem: '2.5rem' },
  { value: '12', px: '48px', tailwind: '12', rem: '3rem' },
  { value: '16', px: '64px', tailwind: '16', rem: '4rem' },
  { value: '20', px: '80px', tailwind: '20', rem: '5rem' },
  { value: '24', px: '96px', tailwind: '24', rem: '6rem' },
  { value: '32', px: '128px', tailwind: '32', rem: '8rem' },
]

// Component for spacing scale visualization
const SpacingScale = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Spacing Scale</h1>
        <p className="text-lg text-slate-600 mb-8">
          Visual representation of the spacing scale used throughout Sentinel.
        </p>

        <div className="space-y-6">
          {spacingScale.map((space) => (
            <div key={space.value} className="flex items-center gap-6">
              {/* Label */}
              <div className="w-32 text-right">
                <div className="text-sm font-semibold text-slate-900">
                  {space.tailwind}
                </div>
                <div className="text-xs text-slate-500">{space.px}</div>
              </div>

              {/* Visual Box */}
              <div
                className="bg-indigo-500 rounded"
                style={{
                  width: space.px,
                  height: '32px',
                  minWidth: '2px',
                }}
              />

              {/* Code */}
              <div className="flex-1">
                <code className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-800">
                  p-{space.tailwind} · m-{space.tailwind} · gap-{space.tailwind}
                </code>
                <div className="text-xs text-slate-500 mt-1">{space.rem}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Common Padding Values
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-600">Buttons</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  px-4 py-2
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Cards</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  p-6
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Containers</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  p-8
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Sections</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  py-12
                </code>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Common Gap Values
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-600">Dense Lists</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  gap-2
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Default Lists</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  gap-4
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Card Grids</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  gap-6
                </code>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Section Spacing</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  gap-8
                </code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Scale: Story = {
  render: () => <SpacingScale />,
  parameters: {
    docs: {
      description: {
        story: 'Complete spacing scale from 0 to 32 (0px to 128px).',
      },
    },
  },
}

// Component spacing patterns
const SpacingPatterns = () => {
  const patterns = [
    {
      name: 'Tight',
      description: 'Minimal spacing for compact layouts',
      gap: 'gap-2',
      padding: 'p-4',
      example: { gap: '8px', padding: '16px' },
    },
    {
      name: 'Compact',
      description: 'Reduced spacing for denser information',
      gap: 'gap-3',
      padding: 'p-4',
      example: { gap: '12px', padding: '16px' },
    },
    {
      name: 'Default',
      description: 'Standard spacing for most components',
      gap: 'gap-4',
      padding: 'p-6',
      example: { gap: '16px', padding: '24px' },
    },
    {
      name: 'Comfortable',
      description: 'Generous spacing for better readability',
      gap: 'gap-6',
      padding: 'p-8',
      example: { gap: '24px', padding: '32px' },
    },
    {
      name: 'Spacious',
      description: 'Maximum spacing for prominent sections',
      gap: 'gap-8',
      padding: 'p-12',
      example: { gap: '32px', padding: '48px' },
    },
  ]

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Component Spacing Patterns
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Pre-defined spacing patterns for consistent component layouts.
        </p>

        <div className="space-y-8">
          {patterns.map((pattern) => (
            <div
              key={pattern.name}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {pattern.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  {pattern.description}
                </p>
                <div className="flex gap-4 text-xs">
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">
                    {pattern.gap}
                  </code>
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">
                    {pattern.padding}
                  </code>
                </div>
              </div>

              {/* Visual Example */}
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className={`${pattern.padding} flex ${pattern.gap}`}>
                  <div className="flex-1 bg-indigo-500 rounded h-20 flex items-center justify-center text-white text-sm font-medium">
                    Item 1
                  </div>
                  <div className="flex-1 bg-indigo-500 rounded h-20 flex items-center justify-center text-white text-sm font-medium">
                    Item 2
                  </div>
                  <div className="flex-1 bg-indigo-500 rounded h-20 flex items-center justify-center text-white text-sm font-medium">
                    Item 3
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Patterns: Story = {
  render: () => <SpacingPatterns />,
  parameters: {
    docs: {
      description: {
        story:
          'Common spacing patterns for different component density levels.',
      },
    },
  },
}

// Card spacing examples
const CardSpacing = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Card Component Spacing
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Examples of spacing patterns applied to card components.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Compact Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-base font-semibold text-slate-900">
                Compact Card
              </h3>
              <p className="text-xs text-slate-500 mt-1">p-4, gap-2</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="bg-slate-100 rounded p-2 text-sm text-slate-700">
                Item with minimal spacing
              </div>
              <div className="bg-slate-100 rounded p-2 text-sm text-slate-700">
                Item with minimal spacing
              </div>
              <div className="bg-slate-100 rounded p-2 text-sm text-slate-700">
                Item with minimal spacing
              </div>
            </div>
          </div>

          {/* Default Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="text-base font-semibold text-slate-900">
                Default Card
              </h3>
              <p className="text-xs text-slate-500 mt-1">p-6, gap-4</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-100 rounded p-3 text-sm text-slate-700">
                Item with standard spacing
              </div>
              <div className="bg-slate-100 rounded p-3 text-sm text-slate-700">
                Item with standard spacing
              </div>
              <div className="bg-slate-100 rounded p-3 text-sm text-slate-700">
                Item with standard spacing
              </div>
            </div>
          </div>

          {/* Comfortable Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 px-8 py-5">
              <h3 className="text-base font-semibold text-slate-900">
                Comfortable Card
              </h3>
              <p className="text-xs text-slate-500 mt-1">p-8, gap-6</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-slate-100 rounded p-4 text-sm text-slate-700">
                Item with generous spacing
              </div>
              <div className="bg-slate-100 rounded p-4 text-sm text-slate-700">
                Item with generous spacing
              </div>
            </div>
          </div>

          {/* Spacious Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="border-b border-slate-200 px-12 py-6">
              <h3 className="text-base font-semibold text-slate-900">
                Spacious Card
              </h3>
              <p className="text-xs text-slate-500 mt-1">p-12, gap-8</p>
            </div>
            <div className="p-12 space-y-8">
              <div className="bg-slate-100 rounded p-5 text-sm text-slate-700">
                Item with maximum spacing
              </div>
              <div className="bg-slate-100 rounded p-5 text-sm text-slate-700">
                Item with maximum spacing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CardExamples: Story = {
  render: () => <CardSpacing />,
  parameters: {
    docs: {
      description: {
        story: 'Card components demonstrating different spacing patterns.',
      },
    },
  },
}

// Stack spacing examples
const StackSpacing = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Stack Spacing (Vertical)
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Common vertical spacing patterns using <code className="bg-slate-200 px-2 py-1 rounded text-sm">space-y-*</code>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* space-y-1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-1 <span className="text-slate-500 font-normal">(4px)</span>
            </h3>
            <div className="space-y-1">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>

          {/* space-y-2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-2 <span className="text-slate-500 font-normal">(8px)</span>
            </h3>
            <div className="space-y-2">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>

          {/* space-y-4 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-4 <span className="text-slate-500 font-normal">(16px)</span>
            </h3>
            <div className="space-y-4">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>

          {/* space-y-6 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-6 <span className="text-slate-500 font-normal">(24px)</span>
            </h3>
            <div className="space-y-6">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>

          {/* space-y-8 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-8 <span className="text-slate-500 font-normal">(32px)</span>
            </h3>
            <div className="space-y-8">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>

          {/* space-y-12 */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              space-y-12 <span className="text-slate-500 font-normal">(48px)</span>
            </h3>
            <div className="space-y-12">
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
              <div className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                Item
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VerticalStack: Story = {
  render: () => <StackSpacing />,
  parameters: {
    docs: {
      description: {
        story: 'Vertical stack spacing patterns using space-y utilities.',
      },
    },
  },
}

// Grid spacing examples
const GridSpacing = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Grid Spacing
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Common grid gap values for responsive layouts.
        </p>

        <div className="space-y-12">
          {/* gap-2 */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              gap-2 <span className="text-slate-500 font-normal">(8px)</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-indigo-500 rounded h-16 flex items-center justify-center text-white text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* gap-4 */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              gap-4 <span className="text-slate-500 font-normal">(16px)</span>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-indigo-500 rounded h-16 flex items-center justify-center text-white text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* gap-6 */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              gap-6 <span className="text-slate-500 font-normal">(24px)</span>
            </h3>
            <div className="grid grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-indigo-500 rounded h-16 flex items-center justify-center text-white text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* gap-8 */}
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              gap-8 <span className="text-slate-500 font-normal">(32px)</span>
            </h3>
            <div className="grid grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-indigo-500 rounded h-16 flex items-center justify-center text-white text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GridGap: Story = {
  render: () => <GridSpacing />,
  parameters: {
    docs: {
      description: {
        story: 'Grid gap spacing for card layouts and responsive grids.',
      },
    },
  },
}
