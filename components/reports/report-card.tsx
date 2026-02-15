"use client"

import { Clock } from "lucide-react"
import type { ReportCard as ReportCardType } from "@/lib/reports-data"

interface ReportCardProps {
  report: ReportCardType
  onClick: (report: ReportCardType) => void
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const Icon = report.icon
  
  return (
    <button
      type="button"
      onClick={() => onClick(report)}
      className="flex min-h-[200px] cursor-pointer flex-col rounded-lg border border-content-border bg-content-surface p-5 text-left transition-all duration-200 hover:border-primary/40 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-content-text-strong">
          {report.title}
        </h3>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-content-text">
        {report.description}
      </p>

      {report.lastGenerated && (
        <p className="mt-4 text-xs text-content-text-muted">
          Last generated: {report.lastGenerated}
        </p>
      )}

      <div className="mt-auto flex items-center gap-1.5 pt-4">
        <Clock className="h-4 w-4 text-content-text-muted" />
        <span className="text-xs text-content-text-muted">
          {report.estimatedTime}
        </span>
      </div>
    </button>
  )
}
