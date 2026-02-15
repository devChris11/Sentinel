import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportsGrid } from "@/components/reports/reports-grid"
import { RecentReportsTable } from "@/components/reports/recent-reports-table"

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-content-bg">
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 space-y-6">
        <ReportsHeader />
        <ReportsGrid />
        <div className="mt-12">
          <RecentReportsTable />
        </div>
      </div>
    </main>
  )
}
