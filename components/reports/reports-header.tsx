"use client"

import { FileText } from "lucide-react"

export function ReportsHeader() {
  return (
    <header>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-content-text-strong">
            Reports
          </h1>
          <p className="text-sm text-content-text-muted">
            Generate and export security intelligence reports
          </p>
        </div>
      </div>
    </header>
  )
}
