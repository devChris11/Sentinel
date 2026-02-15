import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IncidentThreatReportContent } from "@/app/reports/incident-threat-report/incident-threat-report-content"

const meta = {
  title: "Reports/IncidentThreatReport/IncidentThreatReportPage",
  component: IncidentThreatReportContent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "## Incident & Threat Intelligence Report\n\nComplete operational report for SOC analysts and security teams. Weekly security review + spike investigation. Metrics: Total Incidents, MTTD, MTTR, Resolution Rate. Charts: Category breakdown (bar), Severity distribution (donut), Volume trend (area). Table: Recent incidents (paginated 20/page). Interactions: Click chart to filter table, click row to see details, change status in sidebar. CSV export respects filters.\n\nRelated: [Metric Cards](./MetricCards), [Category Chart](./CategoryChart), [Severity Chart](./SeverityChart), [Trend Chart](./TrendChart), [Incidents Table](./IncidentsTable), [Incident Detail](./IncidentDetail)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IncidentThreatReportContent>

export default meta
type Story = StoryObj<typeof meta>

export const FullReport: Story = {}
