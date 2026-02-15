import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MetricCards } from "@/components/reports/incident-threat-report/metric-cards"
import type { Metrics } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Metrics Dashboard\n\nFour key operational metrics for SOC teams: Total Incidents (with % change), Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), and Resolution Rate. Each card shows trend vs last period with color-coded indicators. Lower is better for MTTD/MTTR (green down arrow = improvement). Card padding p-6, vertical spacing gap-2 between elements. Matches dashboard and High-Risk table card styling.\n\nRelated: [Trend Chart](./TrendChart), [Incidents Table](./IncidentsTable), [Incident Report](./IncidentThreatReportPage)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MetricCards>

export default meta
type Story = StoryObj<typeof meta>

const defaultMetrics: Metrics = {
  totalIncidents: 47,
  percentChange: 12,
  meanTimeToDetect: 3.2,
  mttdChange: -8,
  meanTimeToRespond: 8.5,
  mttrChange: -15,
  resolutionRate: 87,
  resolutionChange: 5,
  resolvedCount: 41,
}

export const Default: Story = {
  args: { metrics: defaultMetrics },
}

export const AllImproving: Story = {
  args: {
    metrics: {
      ...defaultMetrics,
      percentChange: -15,
      mttdChange: -20,
      mttrChange: -25,
      resolutionChange: 10,
    },
  },
}

export const AllDeclining: Story = {
  args: {
    metrics: {
      ...defaultMetrics,
      percentChange: 25,
      mttdChange: 18,
      mttrChange: 22,
      resolutionChange: -8,
    },
  },
}
