import { Suspense } from "react"
import { IncidentThreatReportContent } from "./incident-threat-report-content"

export default function IncidentThreatReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen animate-pulse bg-background" />
      }
    >
      <IncidentThreatReportContent />
    </Suspense>
  )
}
