"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Monitor, MapPin, Fingerprint, Wifi } from "lucide-react"
import type { Incident } from "@/lib/incident-threat-data"

interface IncidentDetailProps {
  incident: Incident | null
  open: boolean
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
}

const severityStyles: Record<string, string> = {
  critical: "border-danger/20 bg-danger/10 text-danger",
  high: "border-orange/20 bg-orange/10 text-orange",
  medium: "border-warning/20 bg-warning/10 text-warning",
  low: "border-success/20 bg-success/10 text-success",
}

const statusStyles: Record<string, string> = {
  new: "border-info/20 bg-info/10 text-info",
  acknowledged: "border-warning/20 bg-warning/10 text-warning",
  "in-progress": "border-orange/20 bg-orange/10 text-orange",
  resolved: "border-success/20 bg-success/10 text-success",
}

function formatStatusLabel(status: string): string {
  return status
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export function IncidentDetail({ incident, open, onClose, onStatusChange }: IncidentDetailProps) {
  if (!incident) return null

  return (
    <Sheet open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <SheetContent side="right" className="w-full sm:max-w-[600px] p-0 bg-content-surface flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${severityStyles[incident.severity]} border text-xs`}>
              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
            </Badge>
            <Badge className={`${statusStyles[incident.status]} border text-xs`}>
              {formatStatusLabel(incident.status)}
            </Badge>
          </div>
          <SheetTitle className="text-xl text-content-text-strong text-left">{incident.title}</SheetTitle>
          <SheetDescription className="text-xs text-content-text-muted text-left">{incident.id}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-content-text-strong mb-2">Description</h4>
            <p className="text-sm text-content-text leading-relaxed">{incident.description}</p>
          </div>

          <Separator className="bg-content-border mb-6" />

          {/* User Context */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-content-text-strong mb-3">Affected User</h4>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {incident.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-content-text-strong">{incident.user.name}</p>
                <p className="text-xs text-content-text-muted">{incident.user.email}</p>
                <Badge variant="secondary" className="mt-1.5 text-xs bg-content-bg-alt text-content-text border-0">
                  {incident.user.department}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="bg-content-border mb-6" />

          {/* Technical Details */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-content-text-strong mb-3">Technical Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-3.5 w-3.5 text-content-text-muted" />
                <div>
                  <p className="text-xs text-content-text-muted">IP Address</p>
                  <p className="text-sm text-content-text font-mono">{incident.ipAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-3.5 w-3.5 text-content-text-muted" />
                <div>
                  <p className="text-xs text-content-text-muted">Device</p>
                  <p className="text-sm text-content-text">{incident.device}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-content-text-muted" />
                <div>
                  <p className="text-xs text-content-text-muted">Location</p>
                  <p className="text-sm text-content-text">{incident.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="h-3.5 w-3.5 text-content-text-muted" />
                <div>
                  <p className="text-xs text-content-text-muted">Detection</p>
                  <p className="text-sm text-content-text">{incident.detectionMethod}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-content-border mb-6" />

          {/* Timeline */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-content-text-strong mb-3">Incident Timeline</h4>
            <div className="relative pl-5">
              <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-content-border" />
              {incident.timeline.map((event, i) => (
                <div key={i} className="relative mb-4 last:mb-0">
                  <div className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-content-surface" />
                  <p className="text-sm text-content-text">{event.event}</p>
                  <p className="text-xs text-content-text-muted mt-0.5">{event.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Actions Footer */}
        <div className="border-t border-content-border px-6 py-4 flex flex-wrap gap-2 bg-content-surface">
          {incident.status !== "acknowledged" && incident.status !== "resolved" && (
            <Button
              variant="outline"
              size="sm"
              className="border-content-border text-content-text"
              onClick={() => onStatusChange(incident.id, "acknowledged")}
            >
              Acknowledge
            </Button>
          )}
          {incident.status !== "resolved" && (
            <Button
              variant="outline"
              size="sm"
              className="border-content-border text-content-text"
              onClick={() => onStatusChange(incident.id, "in-progress")}
            >
              Assign to...
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="border-content-border text-content-text"
          >
            Escalate Severity
          </Button>
          {incident.status !== "resolved" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onStatusChange(incident.id, "resolved")}
            >
              Dismiss
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
