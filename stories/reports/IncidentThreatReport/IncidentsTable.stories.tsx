import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IncidentsTable } from "@/components/reports/incident-threat-report/incidents-table"
import { mockIncidents } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/IncidentsTable",
  component: IncidentsTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Recent Incidents Table\n\nPaginated table (20 per page) showing incident details. Used within Incident & Threat Intelligence report; title \"Recent Incidents\", Export List button, filters, and Sort by control are rendered by the parent. Layout: filters left-aligned, Sort by right-aligned in the same row. Accepts sortBy prop (recent | severity). Columns: Severity, Title, Category, User, Time, Status. Click row to open detail sidebar. Footer shows \"Showing X-Y of Z incidents\" with page navigation. Matches High-Risk Users table styling. Responsive: hides columns on smaller screens.\n\nRelated: [Incident Detail](./IncidentDetail), [Category Chart](./CategoryChart), [Severity Chart](./SeverityChart)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IncidentsTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    incidents: mockIncidents,
    onRowClick: () => {},
  },
}

export const FewIncidents: Story = {
  args: {
    incidents: mockIncidents.slice(0, 5),
    onRowClick: () => {},
  },
}

export const ManyIncidents: Story = {
  args: {
    incidents: [...mockIncidents, ...mockIncidents, ...mockIncidents],
    onRowClick: () => {},
  },
}
