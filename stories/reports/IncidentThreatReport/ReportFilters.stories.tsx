import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ReportFilters } from "@/components/reports/incident-threat-report/report-filters"

const meta = {
  title: "Reports/IncidentThreatReport/ReportFilters",
  component: ReportFilters,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Report Filters\n\nFour dropdown filters: Date Range, Severity, Category, Status. Filter sizing matches User Behavior Analytics report (text-sm, default heights). Filters combine with AND logic. Clear Filters button appears when any non-default value selected. Chart-based filters (from CategoryChart/SeverityChart) override dropdown filters.\n\nRelated: [Category Chart](./CategoryChart), [Severity Chart](./SeverityChart), [Incidents Table](./IncidentsTable)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReportFilters>

export default meta
type Story = StoryObj<typeof meta>

const defaultFilters = {
  dateRange: "Last 7 Days",
  severity: "All Severities",
  category: "All Categories",
  status: "All Statuses",
}

export const Default: Story = {
  args: {
    filters: defaultFilters,
    onFilterChange: () => {},
    onClearFilters: () => {},
    hasActiveFilters: false,
  },
}

export const WithActiveFilters: Story = {
  args: {
    filters: {
      ...defaultFilters,
      severity: "Critical",
      category: "Phishing",
    },
    onFilterChange: () => {},
    onClearFilters: () => {},
    hasActiveFilters: true,
  },
}
