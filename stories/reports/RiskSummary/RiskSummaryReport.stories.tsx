import type { Meta, StoryObj } from '@storybook/react'
import RiskSummaryReport from '@/app/reports/risk-summary/page'

const meta = {
  title: 'Reports/RiskSummary/FullPage',
  component: RiskSummaryReport,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Risk Summary Report page showcasing all components assembled together. Includes breadcrumb navigation, date range selector, export buttons, hero metric, distribution chart, trend chart, top risks table, and info cards. Demonstrates full workflow: date range selection → loading skeleton → data display → export functionality.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RiskSummaryReport>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Full Risk Summary Report page with all components.
 * Default view loads with "Last 30 Days" date range.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete report page showing executive overview of organizational security posture. Users can switch date ranges (7 days, 30 days, quarter, 6 months) and export data as CSV or PDF.'
      }
    }
  }
}

/**
 * Full page demonstrating component composition.
 * All elements work together to provide comprehensive risk visibility.
 */
export const ComponentComposition: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## Report Components

**Breadcrumb Navigation:** Reports > Risk Summary

**Date Range Selector:** 
- Last 7 Days
- Last 30 Days (default)
- Last Quarter
- Last 6 Months

**Export Options:**
- CSV Export: Downloads formatted spreadsheet with all data
- PDF Export: Opens browser print dialog for PDF generation

**Hero Metric:** 
Overall Risk Score with trend indicator and percentage change

**Risk Distribution Chart:** 
Donut chart showing user distribution across severity levels

**Risk Trend Chart:** 
6-month rolling average with danger threshold reference line

**Top 5 Risks Table:** 
Prioritized risks by severity and impact with affected user counts

**Training Effectiveness:** 
Security training completion rate and quarterly comparison

**Compliance Status:** 
Framework compliance across SOC 2, ISO 27001, and GDPR

## User Workflow

1. Navigate to Reports > Risk Summary
2. Select desired date range from dropdown
3. Review loading skeleton during data fetch
4. Analyze risk metrics and charts
5. Export data for stakeholder reporting
        `
      }
    }
  }
}
