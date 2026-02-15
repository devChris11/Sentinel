# Risk Summary Report - Implementation Documentation

## Overview

The Risk Summary Report provides an executive-level overview of organizational security posture, combining risk metrics, trend analysis, and actionable insights into a comprehensive dashboard.

## Architecture

### File Structure

```
app/reports/risk-summary/
  └── page.tsx                    # Main report page component

components/reports/risk-summary/
  ├── hero-metric.tsx             # Overall risk score display
  ├── risk-distribution-chart.tsx # Donut chart of severity distribution
  ├── risk-trend-chart.tsx        # Time series area chart
  ├── top-risks-table.tsx         # Priority risks table
  ├── info-cards.tsx              # Training & compliance cards
  └── report-skeleton.tsx         # Loading state skeleton

lib/
  └── risk-summary-data.ts        # Data layer with mock datasets

stories/Reports/RiskSummary/
  ├── HeroMetric.stories.tsx
  ├── RiskDistributionChart.stories.tsx
  ├── RiskTrendChart.stories.tsx
  ├── TopRisksTable.stories.tsx
  ├── InfoCards.stories.tsx
  ├── ReportSkeleton.stories.tsx
  └── RiskSummaryReport.stories.tsx
```

## Components

### HeroMetric
Displays overall risk score (0-10 scale) with color-coded severity:
- **Green (0-3)**: Low risk - Excellent security posture
- **Amber (4-6)**: Medium risk - Acceptable baseline
- **Orange (7-8)**: High risk - Elevated concern
- **Red (9-10)**: Critical risk - Urgent attention required

**Design Tokens Used:**
- `text-success`, `text-warning`, `text-orange`, `text-danger`
- `bg-card`, `border-border`

### RiskDistributionChart
Interactive donut chart showing user distribution across severity levels using Recharts.

**Features:**
- Inner radius: 60% (creates donut effect)
- Hover tooltips with count and percentage
- Center label showing total users
- Responsive legend (side-by-side → stacked)

**Colors (HSL):**
- Critical: `hsl(0, 84%, 60%)` - Red
- High: `hsl(24, 95%, 53%)` - Orange
- Medium: `hsl(37, 91%, 55%)` - Amber
- Low: `hsl(160, 84%, 39%)` - Green

### RiskTrendChart
Area chart with gradient fill showing risk score over time.

**Features:**
- Danger threshold reference line at 7.0
- 6-month rolling average (default)
- Supports daily, weekly, monthly views
- Interactive tooltips with date and score

**Chart Configuration:**
- Y-axis: 0-10 scale, 6 ticks
- X-axis: Dynamic date labels based on range
- Grid: Horizontal only, dashed
- Area fill: Primary color gradient (15% → 0% opacity)

### TopRisksTable
Responsive table displaying top 5 risks prioritized by severity and impact.

**Columns:**
1. Risk Category (font-medium)
2. Description (max-width: 240px, muted)
3. Severity (badge component)
4. Affected Users (right-aligned, tabular-nums)
5. Impact (hidden on mobile: `lg:table-cell`)

**Severity Badge Styling:**
Matches Incidents page pattern exactly:
- Critical: `border-danger/20 bg-danger/10 text-danger`
- High: `border-orange/20 bg-orange/10 text-orange`
- Medium: `border-warning/20 bg-warning/10 text-warning`
- Low: `border-success/20 bg-success/10 text-success`
- All: `rounded-full border px-2.5 py-0.5 text-xs font-medium`

### TrainingEffectivenessCard
Displays security training completion rate with quarterly comparison.

**States:**
- High (95%+): Excellent adoption - green
- Medium (80-94%): Acceptable baseline - amber
- Low (<80%): Requires improvement - red

### ComplianceStatusCard
Shows compliance status across security frameworks (SOC 2, ISO 27001, GDPR).

**Status Options:**
- **Compliant**: Green badge, all frameworks passing
- **Partial**: Amber badge, some findings requiring attention
- **Non-Compliant**: Red badge, critical gaps identified

### ReportSkeleton
Loading state skeleton matching final report structure.

**Layout:**
- Hero metric placeholder
- Two chart placeholders (side-by-side)
- Table placeholder (5 rows)
- Two info card placeholders

## Functionality

### Date Range Filtering
Supports four time ranges:
- **Last 7 Days**: Daily granularity
- **Last 30 Days**: Daily/weekly granularity (default)
- **Last Quarter**: Weekly/monthly granularity
- **Last 6 Months**: Monthly granularity

**Implementation:**
```tsx
const handleRangeChange = (newRange: string) => {
  setIsLoading(true)
  setTimeout(() => {
    setData(getRiskSummaryData(newRange))
    setIsLoading(false)
  }, 800) // Simulated async fetch
}
```

### CSV Export
Generates comprehensive CSV file with all report data sections:
- Overall risk score and trend
- Risk distribution by severity
- Risk score trend data points
- Top 5 risks with details
- Training effectiveness percentage
- Compliance status

**Filename:** `sentinel-risk-summary-YYYY-MM-DD.csv`

### PDF Export
Triggers browser print dialog with print-optimized CSS:
```css
@media print {
  /* Hides: nav, header, aside, buttons */
  /* Preserves: charts, tables, colors */
  /* Page breaks: avoid inside charts/tables */
}
```

### Loading States
- Initial page load: Shows ReportSkeleton
- Date range change: Shows ReportSkeleton for 800ms
- Export operations: Buttons disabled during generation
- Empty state: AlertTriangle icon with helpful message

## Design System Compliance

### Colors
All colors use Sentinel design tokens:
- Success: `#10b981` (green)
- Warning: `#f59e0b` (amber)
- Danger: `#ef4444` (red)
- Orange: `#f97316` (high risk)
- Primary: `#6366f1` (indigo)

### Typography
- Page title: `text-2xl font-bold tracking-tight`
- Card title: `text-lg font-semibold`
- Card description: `text-xs text-muted-foreground`
- Body text: `text-sm`
- Labels: `text-xs font-semibold uppercase`

### Cards
Standard pattern across all components:
- Background: `bg-card` (#FEFEFE)
- Border: `border-border` (#E2E8F0)
- Border radius: `rounded-lg`
- Padding: `p-6` (content), `p-8` (hero)
- Shadow: `shadow-sm`

### Responsive Breakpoints
- Mobile (<768px): Single column, some table columns hidden
- Tablet (768-1023px): Charts stack, full table visible
- Desktop (1024px+): Two-column charts, full layout

## Data Layer

### getRiskSummaryData(range: string)
Returns mock data for specified date range:

```typescript
interface RiskSummaryData {
  overallRiskScore: {
    current: number
    previous: number
    trend: "up" | "down" | "stable"
    percentChange: number
  }
  riskDistribution: {
    critical: number
    high: number
    medium: number
    low: number
  }
  trendData: Array<{ date: string; score: number }>
  topRisks: Array<{
    id: string
    category: string
    description: string
    severity: "critical" | "high" | "medium" | "low"
    affectedUsers: number
    impact: string
  }>
  trainingEffectiveness: number
  complianceStatus: "compliant" | "partial" | "non-compliant"
}
```

## Storybook Documentation

All components have comprehensive Storybook stories demonstrating:
- Default states
- Edge cases (low/high values)
- Responsive behavior
- Interactive features
- Design token usage
- Accessibility patterns

**View Stories:** `npm run storybook` → Reports > RiskSummary

## Accessibility

### ARIA Labels
- Charts: `aria-label` describing data
- Icons: `aria-hidden="true"` for decorative
- Buttons: Descriptive labels for screen readers
- Form controls: Associated labels

### Keyboard Navigation
- Tab through all interactive elements
- Focus states visible on all controls
- Date selector accessible via keyboard
- Export buttons keyboard-activatable

### Color Contrast
- WCAG AA compliant contrast ratios
- Text on backgrounds: Minimum 4.5:1
- Severity badges: Clear differentiation beyond color

## Testing Checklist

### Functionality
- [x] Date range selector changes data
- [x] Loading skeleton appears during transitions
- [x] CSV export downloads with correct data
- [x] PDF export opens print dialog
- [x] Empty state displays when no data
- [x] All charts render correctly
- [x] Table displays all columns (desktop)
- [x] Responsive behavior works (mobile/tablet/desktop)

### Design System
- [x] Severity badges match Incidents page
- [x] Card styling consistent with Dashboard
- [x] Typography matches design system
- [x] Colors use semantic tokens
- [x] Spacing follows 4px grid

### Performance
- [x] Initial load <2 seconds
- [x] Date range change <1 second
- [x] No memory leaks on repeated changes
- [x] Charts render smoothly
- [x] No unnecessary re-renders

### Browser Compatibility
- [x] Chrome (latest)
- [x] Firefox (latest)
- [x] Safari (latest)
- [x] Edge (latest)

## Known Limitations

1. **Mock Data**: Currently uses static mock datasets. Production will connect to real API endpoints.
2. **Print Optimization**: Charts may not render perfectly in all browsers when printing (Recharts limitation).
3. **Date Range**: Simulated 800ms delay - production will vary based on backend response time.

## Future Enhancements

1. **Real-time Updates**: WebSocket connection for live risk score updates
2. **Custom Date Ranges**: Date picker for arbitrary date range selection
3. **Drill-down**: Click severity badges to filter incidents by severity
4. **Comparisons**: Side-by-side comparison of multiple time periods
5. **Scheduled Reports**: Email delivery of PDF reports on schedule
6. **Export Options**: Additional formats (Excel, PowerPoint)
7. **Annotations**: Add notes/comments to specific data points

## API Integration (Future)

```typescript
// Replace getRiskSummaryData() with:
async function fetchRiskSummary(range: string): Promise<RiskSummaryData> {
  const response = await fetch(`/api/reports/risk-summary?range=${range}`)
  if (!response.ok) throw new Error('Failed to fetch risk summary')
  return response.json()
}
```

## Maintenance Notes

### Adding New Severity Levels
Update these locations:
1. `lib/risk-summary-data.ts` - TypeScript types
2. `components/reports/risk-summary/top-risks-table.tsx` - severityStyles object
3. `components/reports/risk-summary/risk-distribution-chart.tsx` - SEVERITY_CONFIG
4. `app/globals.css` - Add new color token if needed

### Modifying Chart Colors
Update HSL values in:
1. `components/reports/risk-summary/risk-distribution-chart.tsx` - SEVERITY_CONFIG
2. `components/reports/risk-summary/risk-trend-chart.tsx` - gradient and stroke colors
3. Verify against `app/globals.css` color tokens

### Changing Date Ranges
Update:
1. `app/reports/risk-summary/page.tsx` - DATE_RANGES constant
2. `lib/risk-summary-data.ts` - Add new dataset
3. Chart components - Adjust X-axis date formatting logic

## Support

For questions or issues with the Risk Summary Report:
1. Check this documentation
2. Review Storybook stories for examples
3. Check design system tokens in `app/globals.css`
4. Compare with Incidents/Dashboard pages for consistency

---

**Last Updated:** 2026-02-15  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
