"use client"

import { useState } from "react"
import { ReportCard } from "@/components/reports/report-card"
import { ComingSoonModal } from "@/components/reports/coming-soon-modal"
import {
  reports,
  categoryLabels,
  type ReportCard as ReportCardType,
} from "@/lib/reports-data"

const categories = ["executive", "operational", "secops"] as const

export function ReportsGrid() {
  const [selectedReport, setSelectedReport] = useState<ReportCardType | null>(
    null
  )
  const [modalOpen, setModalOpen] = useState(false)

  const handleCardClick = (report: ReportCardType) => {
    setSelectedReport(report)
    setModalOpen(true)
  }

  return (
    <>
      <div className="space-y-10">
        {categories.map((category) => {
          const categoryReports = reports.filter(
            (r) => r.category === category
          )
          return (
            <section key={category} aria-labelledby={`heading-${category}`}>
              <h2
                id={`heading-${category}`}
                className="mb-6 text-base font-semibold text-content-text-strong"
              >
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <ComingSoonModal
        report={selectedReport}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
