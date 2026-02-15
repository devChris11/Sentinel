"use client"

import { Bell, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ReportCard } from "@/lib/reports-data"

interface ComingSoonModalProps {
  report: ReportCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComingSoonModal({
  report,
  open,
  onOpenChange,
}: ComingSoonModalProps) {
  if (!report || !report.modalContent) return null

  const Icon = report.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-content-border bg-content-surface shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-content-text-strong">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            {report.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details about the {report.title} report that is coming soon.
          </DialogDescription>
        </DialogHeader>

        <Separator className="bg-content-border" />

        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-content-text">
            {report.modalContent.fullDescription}
          </p>

          <div>
            <p className="mb-3 text-sm font-semibold text-content-text-strong">
              Key Metrics:
            </p>
            <ul className="space-y-2">
              {report.modalContent.keyMetrics.map((metric) => (
                <li
                  key={metric}
                  className="flex items-start gap-2 text-sm text-content-text"
                >
                  <span className="mt-1 text-content-text-muted">•</span>
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-content-text-muted" />
            <span className="text-xs text-content-text-muted">
              Estimated generation time: {report.estimatedTime}
            </span>
          </div>
        </div>

        <Separator className="mt-2 bg-content-border" />

        <p className="text-sm italic text-content-text-muted">
          This report is currently in development and will be available in a
          future release.
        </p>

        <Button variant="outline" className="w-full border-content-border text-content-text-strong hover:bg-content-bg-alt">
          <Bell className="h-4 w-4" />
          Notify Me When Available
        </Button>
      </DialogContent>
    </Dialog>
  )
}
