import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IncidentThreatReportContent } from "@/app/reports/incident-threat-report/incident-threat-report-content"

const meta = {
  title: "Reports/IncidentThreatReport/IncidentThreatReportPage",
  component: IncidentThreatReportContent,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          "## Incident & Threat Intelligence Report\n\nComplete operational report for SOC analysts and security teams. **Layout:** Page header with Export CSV + Export PDF; metrics cards; category and severity charts; trend chart; Recent Incidents section (title + count | Export List button, filters left / Sort by right below title, table). **Chart interaction:** Click Category or Severity chart segment to filter—updates filter dropdown (no chips), auto-scrolls to table. Tap same segment again to clear. **Export options:** Export CSV downloads entire page; Export PDF prints full page; Export List downloads filtered table only. Click row to see details; change status in sidebar.\n\nRelated: [Metric Cards](./MetricCards), [Category Chart](./CategoryChart), [Severity Chart](./SeverityChart), [Trend Chart](./TrendChart), [Incidents Table](./IncidentsTable), [Incident Detail](./IncidentDetail)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IncidentThreatReportContent>

export default meta
type Story = StoryObj<typeof meta>

export const FullReport: Story = {}
