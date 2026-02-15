import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TrendChart } from "@/components/reports/incident-threat-report/trend-chart"
import { mockTrendData } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/TrendChart",
  component: TrendChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Incident Volume Trend\n\nArea chart showing daily incident count over 7 days. Red gradient fill, dashed weekly average reference line. Useful for identifying spikes or unusual patterns. Tooltip shows exact count per day.\n\nRelated: [Metric Cards](./MetricCards), [Category Chart](./CategoryChart), [Incident Report](./IncidentThreatReportPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TrendChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data: mockTrendData },
}
