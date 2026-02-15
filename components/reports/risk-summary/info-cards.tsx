"use client"

import { Shield, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TrainingCardProps {
  effectiveness: number
}

export function TrainingEffectivenessCard({
  effectiveness,
}: TrainingCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Shield className="h-5 w-5 text-success" aria-hidden="true" />
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Training Effectiveness
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tabular-nums text-success">
            {effectiveness}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Completion Rate</p>
        <p className="text-sm font-medium text-success">
          +7% vs last quarter
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Users completing security awareness training on time
        </p>
      </CardContent>
    </Card>
  )
}

interface ComplianceCardProps {
  status: "compliant" | "partial" | "non-compliant"
}

const statusConfig = {
  compliant: {
    label: "Compliant",
    className: "border-success/20 bg-success/10 text-success",
    iconColor: "text-success",
    description: "Meeting all critical security framework requirements",
  },
  partial: {
    label: "Partial Compliance",
    className: "border-warning/20 bg-warning/10 text-warning",
    iconColor: "text-warning",
    description: "Some frameworks require attention",
  },
  "non-compliant": {
    label: "Non-Compliant",
    className: "border-danger/20 bg-danger/10 text-danger",
    iconColor: "text-danger",
    description: "Critical compliance gaps identified",
  },
}

const frameworks = [
  { name: "SOC 2", compliant: true },
  { name: "ISO 27001", compliant: true },
  { name: "GDPR", compliant: false, note: "2 findings" },
]

export function ComplianceStatusCard({ status }: ComplianceCardProps) {
  const config = statusConfig[status]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Shield
          className={cn("h-5 w-5", config.iconColor)}
          aria-hidden="true"
        />
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-medium",
            config.className
          )}
        >
          {config.label}
        </span>
        <div className="flex flex-col gap-2">
          {frameworks.map((fw) => (
            <div key={fw.name} className="flex items-center gap-2 text-sm">
              {fw.compliant ? (
                <CheckCircle2
                  className="h-4 w-4 text-success"
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  className="h-4 w-4 text-warning"
                  aria-hidden="true"
                />
              )}
              <span className="text-muted-foreground">
                {fw.name}:{" "}
                <span className="font-medium text-card-foreground">
                  {fw.compliant ? "Compliant" : fw.note}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </CardContent>
    </Card>
  )
}
