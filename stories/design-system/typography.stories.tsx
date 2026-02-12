import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography system for Sentinel using Inter font family. Includes headings, body text, UI text, and font weight variations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Helper component for typography showcase
const TypographyShowcase = ({ background = 'light' }: { background?: 'light' | 'dark' }) => {
  const isDark = background === 'dark'
  const bgClass = isDark ? 'bg-slate-900' : 'bg-slate-50'
  const textClass = isDark ? 'text-white' : 'text-slate-900'
  const mutedClass = isDark ? 'text-slate-400' : 'text-slate-600'
  const dividerClass = isDark ? 'border-slate-700' : 'border-slate-200'

  return (
    <div className={`min-h-screen p-8 ${bgClass}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Headings Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            Headings
          </h2>
          <div className="space-y-6">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <h1 className={`text-5xl font-bold mb-2 ${textClass}`}>
                Heading 1 - The quick brown fox
              </h1>
              <p className={`text-sm ${mutedClass}`}>
                text-5xl (48px) · font-bold (700)
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <h2 className={`text-4xl font-bold mb-2 ${textClass}`}>
                Heading 2 - The quick brown fox
              </h2>
              <p className={`text-sm ${mutedClass}`}>
                text-4xl (36px) · font-bold (700)
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <h3 className={`text-3xl font-semibold mb-2 ${textClass}`}>
                Heading 3 - The quick brown fox
              </h3>
              <p className={`text-sm ${mutedClass}`}>
                text-3xl (30px) · font-semibold (600)
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <h4 className={`text-2xl font-semibold mb-2 ${textClass}`}>
                Heading 4 - The quick brown fox
              </h4>
              <p className={`text-sm ${mutedClass}`}>
                text-2xl (24px) · font-semibold (600)
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <h5 className={`text-xl font-semibold mb-2 ${textClass}`}>
                Heading 5 - The quick brown fox
              </h5>
              <p className={`text-sm ${mutedClass}`}>
                text-xl (20px) · font-semibold (600)
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <h6 className={`text-lg font-semibold mb-2 ${textClass}`}>
                Heading 6 - The quick brown fox
              </h6>
              <p className={`text-sm ${mutedClass}`}>
                text-lg (18px) · font-semibold (600)
              </p>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            Body Text
          </h2>
          <div className="space-y-6">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-lg mb-2 ${textClass}`}>
                Large body text - The quick brown fox jumps over the lazy dog. This is
                typically used for introductory paragraphs or emphasis sections where
                larger text improves readability and hierarchy.
              </p>
              <p className={`text-sm ${mutedClass}`}>text-lg (18px) · font-normal (400)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base mb-2 ${textClass}`}>
                Base body text - The quick brown fox jumps over the lazy dog. This is
                the standard text size for most content, providing optimal readability
                for longer passages of text and general content.
              </p>
              <p className={`text-sm ${mutedClass}`}>text-base (16px) · font-normal (400)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-sm mb-2 ${textClass}`}>
                Small body text - The quick brown fox jumps over the lazy dog. This
                size is used for secondary content, captions, and supporting
                information that doesn't need as much visual prominence.
              </p>
              <p className={`text-sm ${mutedClass}`}>text-sm (14px) · font-normal (400)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-xs mb-2 ${textClass}`}>
                Extra small body text - The quick brown fox jumps over the lazy dog.
                Used for fine print, timestamps, metadata, and other tertiary
                information.
              </p>
              <p className={`text-sm ${mutedClass}`}>text-xs (12px) · font-normal (400)</p>
            </div>
          </div>
        </section>

        {/* UI Text Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            UI Text
          </h2>
          <div className="space-y-6">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <div className={`inline-block px-4 py-2 bg-indigo-500 text-white rounded-md mb-2`}>
                <span className="text-sm font-medium">Button Text</span>
              </div>
              <p className={`text-sm ${mutedClass}`}>text-sm (14px) · font-medium (500)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <label className={`block text-sm font-medium mb-1 ${textClass}`}>
                Label Text
              </label>
              <p className={`text-sm ${mutedClass}`}>text-sm (14px) · font-medium (500)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-xs ${mutedClass} mb-2`}>
                Caption Text - Used for image captions, helper text, and annotations
              </p>
              <p className={`text-sm ${mutedClass}`}>text-xs (12px) · font-normal (400)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-xs font-medium uppercase tracking-wide ${mutedClass} mb-2`}>
                Overline Text
              </p>
              <p className={`text-sm ${mutedClass}`}>
                text-xs (12px) · font-medium (500) · uppercase · tracking-wide
              </p>
            </div>
          </div>
        </section>

        {/* Font Weights Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            Font Weights
          </h2>
          <div className="space-y-4">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-light mb-2 ${textClass}`}>
                Light (300) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-light · weight: 300</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-normal mb-2 ${textClass}`}>
                Regular (400) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-normal · weight: 400</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-medium mb-2 ${textClass}`}>
                Medium (500) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-medium · weight: 500</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-semibold mb-2 ${textClass}`}>
                Semibold (600) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-semibold · weight: 600</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-bold mb-2 ${textClass}`}>
                Bold (700) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-bold · weight: 700</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-2xl font-extrabold mb-2 ${textClass}`}>
                Extrabold (800) - The quick brown fox jumps over the lazy dog
              </p>
              <p className={`text-sm ${mutedClass}`}>font-extrabold · weight: 800</p>
            </div>
          </div>
        </section>

        {/* Text Colors Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            Text Colors
          </h2>
          <div className="space-y-4">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base ${textClass} mb-2`}>
                Primary Text - Used for main content and headings
              </p>
              <p className={`text-sm ${mutedClass}`}>
                {isDark ? 'text-white / text-slate-50' : 'text-slate-900'}
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base ${mutedClass} mb-2`}>
                Muted Text - Used for secondary content and descriptions
              </p>
              <p className={`text-sm ${mutedClass}`}>
                {isDark ? 'text-slate-400' : 'text-slate-600'}
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className="text-base text-indigo-600 dark:text-indigo-400 mb-2">
                Link Text - Used for interactive links and actions
              </p>
              <p className={`text-sm ${mutedClass}`}>
                text-indigo-600 / dark:text-indigo-400
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className="text-base text-green-600 dark:text-green-400 mb-2">
                Success Text - Used for positive feedback and success states
              </p>
              <p className={`text-sm ${mutedClass}`}>
                text-green-600 / dark:text-green-400
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className="text-base text-red-600 dark:text-red-400 mb-2">
                Error Text - Used for errors and destructive actions
              </p>
              <p className={`text-sm ${mutedClass}`}>
                text-red-600 / dark:text-red-400
              </p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className="text-base text-orange-600 dark:text-orange-400 mb-2">
                Warning Text - Used for warnings and caution states
              </p>
              <p className={`text-sm ${mutedClass}`}>
                text-orange-600 / dark:text-orange-400
              </p>
            </div>
          </div>
        </section>

        {/* Line Heights Section */}
        <section>
          <h2 className={`text-sm font-semibold uppercase tracking-wide mb-6 ${mutedClass}`}>
            Line Heights
          </h2>
          <div className="space-y-6">
            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base leading-tight mb-2 ${textClass}`}>
                Tight line height - The quick brown fox jumps over the lazy dog. This
                line height is used for headings and display text where compact spacing
                is desired.
              </p>
              <p className={`text-sm ${mutedClass}`}>leading-tight (1.25)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base leading-normal mb-2 ${textClass}`}>
                Normal line height - The quick brown fox jumps over the lazy dog. This
                is the default line height for most text, providing balanced spacing for
                good readability.
              </p>
              <p className={`text-sm ${mutedClass}`}>leading-normal (1.5)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base leading-relaxed mb-2 ${textClass}`}>
                Relaxed line height - The quick brown fox jumps over the lazy dog. This
                line height provides extra breathing room and is ideal for longer form
                content where enhanced readability is important.
              </p>
              <p className={`text-sm ${mutedClass}`}>leading-relaxed (1.625)</p>
            </div>

            <div className={`pb-4 border-b ${dividerClass}`}>
              <p className={`text-base leading-loose mb-2 ${textClass}`}>
                Loose line height - The quick brown fox jumps over the lazy dog. This
                generous line height creates maximum breathing room and is used for
                special cases where extra spacing enhances the design.
              </p>
              <p className={`text-sm ${mutedClass}`}>leading-loose (2)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const LightBackground: Story = {
  render: () => <TypographyShowcase background="light" />,
  parameters: {
    docs: {
      description: {
        story: 'Typography examples on a light background (Slate 50).',
      },
    },
  },
}

export const DarkBackground: Story = {
  render: () => <TypographyShowcase background="dark" />,
  parameters: {
    docs: {
      description: {
        story: 'Typography examples on a dark background (Slate 900).',
      },
    },
  },
}

// Component for quick reference
const QuickReference = () => {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Typography Quick Reference
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Headings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Headings</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">H1</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-5xl font-bold
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">H2</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-4xl font-bold
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">H3</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-3xl font-semibold
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">H4</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-2xl font-semibold
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">H5</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-xl font-semibold
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">H6</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-lg font-semibold
                </code>
              </div>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Body Text</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Large</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-lg
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Base</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-base
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Small</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-sm
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Extra Small</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-xs
                </code>
              </div>
            </div>
          </div>

          {/* Font Weights */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Font Weights</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Light</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-light (300)
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Regular</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-normal (400)
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Medium</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-medium (500)
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Semibold</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-semibold (600)
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Bold</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-bold (700)
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Extrabold</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  font-extrabold (800)
                </code>
              </div>
            </div>
          </div>

          {/* UI Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">UI Text</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Button</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-sm font-medium
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Label</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-sm font-medium
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Caption</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-xs
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Overline</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  text-xs uppercase
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const QuickReferenceGuide: Story = {
  render: () => <QuickReference />,
  parameters: {
    docs: {
      description: {
        story: 'Quick reference guide with all typography classes and their usage.',
      },
    },
  },
}
