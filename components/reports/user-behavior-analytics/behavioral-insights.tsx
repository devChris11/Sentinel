"use client"

import { Card } from "@/components/ui/card"
import { Lightbulb, AlertCircle } from "lucide-react"
import type { DepartmentData } from "@/lib/user-behavior-data"

interface BehavioralInsightsProps {
  departments: DepartmentData[]
  companyAvg: number
}

export function BehavioralInsights({ departments, companyAvg }: BehavioralInsightsProps) {
  const sorted = [...departments].sort((a, b) => a.reportingRate - b.reportingRate)
  const weakest = sorted[0]
  const strongest = sorted[sorted.length - 1]
  const gap = companyAvg - weakest.reportingRate

  return (
    <Card className="border-info/20 bg-info/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-info" aria-hidden />
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-content-text-strong">Behavioral Insights</h3>

          <p className="text-base font-medium text-content-text-strong">
            <span className="rounded bg-warning/20 px-2 py-0.5">
              {weakest.usersNeedingTraining} {weakest.department} users need remediation training
            </span>
          </p>

          <ul className="space-y-1.5 text-sm text-content-text" role="list">
            <li>
              {weakest.department} department reporting rate ({weakest.reportingRate}%) is {gap}% below company average
            </li>
            <li>
              Average time-to-report for {weakest.department} is 4.2 hours (target: {'<'}2 hours)
            </li>
            <li>
              {strongest.department} department shows strongest performance with {strongest.reportingRate}% reporting rate
            </li>
          </ul>

          <div className="flex items-start gap-2 pt-1">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-content-text-muted" aria-hidden />
            <p className="text-sm italic text-content-text-muted">
              Recommended Action: Schedule targeted phishing awareness session for {weakest.department} team focusing on email threat recognition.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
