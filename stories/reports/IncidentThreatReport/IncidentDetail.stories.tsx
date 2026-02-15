import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IncidentDetail } from "@/components/reports/incident-threat-report/incident-detail"
import { mockIncidents } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/IncidentDetail",
  component: IncidentDetail,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "## Incident Detail Sidebar\n\nRight-side sheet (600px) showing full incident details. Sections: Description, Affected User (with avatar), Technical Details (IP, Device, Location, Detection Method), Timeline. Footer actions: Acknowledge, Assign, Escalate, Dismiss. Status change closes sidebar and updates incident. Responsive: fullwidth on mobile.\n\nRelated: [Incidents Table](./IncidentsTable), [Incident Report](./IncidentThreatReportPage)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IncidentDetail>

export default meta
type Story = StoryObj<typeof meta>

export const CriticalIncident: Story = {
  args: {
    incident: mockIncidents.find((i) => i.severity === "critical") ?? mockIncidents[0],
    open: true,
    onClose: () => {},
    onStatusChange: () => {},
  },
}

export const ResolvedIncident: Story = {
  args: {
    incident: { ...mockIncidents[0], status: "resolved" as const },
    open: true,
    onClose: () => {},
    onStatusChange: () => {},
  },
}
