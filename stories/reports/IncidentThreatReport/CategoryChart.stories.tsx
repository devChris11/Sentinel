import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CategoryChart } from "@/components/reports/incident-threat-report/category-chart"
import type { CategoryBreakdown } from "@/lib/incident-threat-data"

const meta = {
  title: "Reports/IncidentThreatReport/CategoryChart",
  component: CategoryChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "## Incidents by Category Chart\n\nVertical bar chart (320px height) showing incident distribution by type (Phishing, Malware, Policy Violation, etc.). X-axis labels use a custom tick with 12px top padding (so they don't touch the chart) and 8px left padding (so they sit directly under each bar). Each bar shows count with percentage change vs last week above (red = increase, green = decrease). Click bar to filter incidents table. Active category highlighted, others dimmed to 40% opacity. Height matches Severity Distribution chart.\n\nRelated: [Severity Chart](./SeverityChart), [Incidents Table](./IncidentsTable), [Report Filters](./ReportFilters)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    activeCategory: {
      control: "select",
      options: [null, "Phishing", "Malware", "Policy Violation", "Data Exfiltration"],
    },
  },
} satisfies Meta<typeof CategoryChart>

export default meta
type Story = StoryObj<typeof meta>

const defaultData: CategoryBreakdown[] = [
  { category: "Phishing", count: 15, percentChange: 12 },
  { category: "Malware", count: 8, percentChange: -5 },
  { category: "Policy Violation", count: 12, percentChange: 8 },
  { category: "Data Exfiltration", count: 6, percentChange: -15 },
  { category: "Unauthorized Access", count: 4, percentChange: 0 },
  { category: "Suspicious Activity", count: 2, percentChange: -50 },
]

export const Default: Story = {
  args: {
    data: defaultData,
    activeCategory: null,
    onCategoryClick: () => {},
  },
}

export const CategorySelected: Story = {
  args: {
    data: defaultData,
    activeCategory: "Phishing",
    onCategoryClick: () => {},
  },
}
