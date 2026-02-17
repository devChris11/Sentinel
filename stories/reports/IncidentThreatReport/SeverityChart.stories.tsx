import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SeverityChart } from "@/components/reports/incident-threat-report/severity-chart"
import type { SeverityDistribution } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/SeverityChart",
  component: SeverityChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Severity Distribution Chart\n\nDonut chart (320×320px) showing incident breakdown by severity (Critical/High/Medium/Low). Height matches Incidents by Category chart. Center displays total count. Legend on right shows count and percentage. Click slice or legend to filter—updates Severity filter dropdown (no chip), auto-scrolls to Recent Incidents table. Tap same segment again to clear. Tooltip has elevated z-index. Colors: Critical (red), High (orange), Medium (amber), Low (green).\n\nRelated: [Category Chart](./CategoryChart), [Incidents Table](./IncidentsTable), [Report Filters](./ReportFilters)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    activeSeverity: {
      control: "select",
      options: [null, "critical", "high", "medium", "low"],
    },
  },
} satisfies Meta<typeof SeverityChart>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: SeverityDistribution = {
  critical: 10,
  high: 12,
  medium: 18,
  low: 7,
}

export const Default: Story = {
  args: {
    data: defaultData,
    activeSeverity: null,
    onSeverityClick: () => {},
  },
}

export const SeveritySelected: Story = {
  args: {
    data: defaultData,
    activeSeverity: "critical",
    onSeverityClick: () => {},
  },
}
