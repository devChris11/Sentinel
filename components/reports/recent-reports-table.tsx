"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, FileSpreadsheet } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { recentReports } from "@/lib/reports-data"

function getCategoryBadge(category: string) {
  const config: Record<string, { bg: string; text: string; border: string }> = {
    Executive: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
    Operational: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
    SecOps: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
  }
  const c = config[category] || config.Executive
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {category}
    </span>
  )
}

export function RecentReportsTable() {
  const router = useRouter()

  const handleExportCSV = (report: { reportType?: string; route?: string }) => {
    if (report.reportType === "user-behavior-analytics" && report.route) {
      router.push(`${report.route}?export=csv`)
    }
  }

  return (
    <div className="rounded-lg border border-content-border bg-content-surface p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-content-text-strong">
          Recent Reports
        </h2>
        <p className="mt-1 text-xs text-content-text-muted">
          Last 5 generated reports
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
        <TableHeader>
          <TableRow className="border-content-border hover:bg-transparent">
            <TableHead className="bg-content-bg-alt text-xs font-semibold uppercase text-content-text-strong">
              Report Name
            </TableHead>
            <TableHead className="bg-content-bg-alt text-xs font-semibold uppercase text-content-text-strong">
              Category
            </TableHead>
            <TableHead className="bg-content-bg-alt text-xs font-semibold uppercase text-content-text-strong">
              Generated
            </TableHead>
            <TableHead className="bg-content-bg-alt text-xs font-semibold uppercase text-content-text-strong">
              By
            </TableHead>
            <TableHead className="bg-content-bg-alt text-right text-xs font-semibold uppercase text-content-text-strong">
              Export
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((report) => (
            <TableRow
              key={report.id}
              className="border-content-border transition-colors hover:bg-content-bg-alt"
            >
              <TableCell className="text-sm font-medium text-content-text-strong">
                {report.route ? (
                  <Link
                    href={report.route}
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  >
                    {report.name}
                  </Link>
                ) : (
                  report.name
                )}
              </TableCell>
              <TableCell>
                {getCategoryBadge(report.category)}
              </TableCell>
              <TableCell className="text-sm text-content-text">
                {report.generated}
              </TableCell>
              <TableCell className="text-sm text-content-text">
                {report.generatedBy}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => handleExportCSV(report)}
                    className="flex flex-col items-center gap-0.5 rounded p-1 text-content-text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                    aria-label={`Export ${report.name} as CSV`}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="text-[10px] font-medium uppercase tracking-wide">
                      CSV
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center gap-0.5 rounded p-1 text-content-text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                    aria-label={`Export ${report.name} as PDF`}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-[10px] font-medium uppercase tracking-wide">
                      PDF
                    </span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
