"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, Building2, ArrowRight, Wifi, Monitor, Smartphone, Laptop, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Incident, type Severity } from "@/lib/incidents-data"
import { getAvatarColor, getInitials, formatRelativeTime } from "@/lib/incidents-data"

interface IncidentDetailPanelProps {
  incident: Incident | null
  onClose: () => void
}

function SeverityBadge({ severity, score }: { severity: Severity; score: number }) {
  const config: Record<Severity, { bg: string; text: string; border: string; label: string }> = {
    critical: { bg: "bg-danger/10", text: "text-danger", border: "border-danger/20", label: "Critical" },
    high: { bg: "bg-orange/10", text: "text-orange", border: "border-orange/20", label: "High" },
    medium: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", label: "Medium" },
    low: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "Low" },
  }
  const c = config[severity]
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {c.label} ({score.toFixed(1)})
    </span>
  )
}

function TimelineDot({ severity }: { severity: Severity }) {
  const colors: Record<Severity, string> = {
    critical: "bg-danger",
    high: "bg-orange",
    medium: "bg-warning",
    low: "bg-success",
  }
  return <span className={`relative z-10 h-2.5 w-2.5 shrink-0 rounded-full ${colors[severity]}`} />
}

function getDeviceIcon(device: string) {
  const deviceLower = device.toLowerCase()
  if (deviceLower.includes("iphone") || deviceLower.includes("android") || deviceLower.includes("phone")) {
    return Smartphone
  }
  if (deviceLower.includes("laptop") || deviceLower.includes("macbook")) {
    return Laptop
  }
  return Monitor
}

export function IncidentDetailPanel({ incident, onClose }: IncidentDetailPanelProps) {
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (incident) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [incident, onClose])

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 z-50 flex h-screen w-[600px] flex-col border-l border-content-border bg-content-surface shadow-xl transition-transform duration-300 ease-in-out ${
          incident ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Incident details"
      >
        {incident && (
          <>
            {/* Sticky Header */}
            <div className="relative z-10 shrink-0 border-b border-content-border bg-content-surface p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-md p-1.5 text-content-text-muted transition-colors hover:bg-content-bg-alt hover:text-content-text"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col gap-2 pr-8">
                <h2 className="text-xl font-semibold text-content-text-strong">
                  {incident.title}
                </h2>
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={incident.severity} score={incident.severityScore} />
                  <span className="text-sm text-content-text-muted">
                    {incident.id} &middot; {formatRelativeTime(incident.timestamp)}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                {/* Section A - Incident Details */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-content-text-strong">
                    Incident Details
                  </h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm leading-relaxed text-content-text">{incident.description}</p>
                    <div className="rounded-md bg-content-bg p-3">
                      <p className="text-xs leading-relaxed text-content-text-muted">
                        {incident.aiReasoning}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section B - Technical Details */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-content-text-strong">
                    Technical Details
                  </h3>
                  <div className="rounded-lg border border-content-border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* IP Address */}
                      <div className="flex items-start gap-2">
                        <Wifi className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-content-text-muted">IP Address</p>
                          <p className="text-sm text-content-text font-medium">{incident.ipAddress}</p>
                        </div>
                      </div>

                      {/* Device */}
                      <div className="flex items-start gap-2">
                        {(() => {
                          const DeviceIcon = getDeviceIcon(incident.device)
                          return <DeviceIcon className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        })()}
                        <div>
                          <p className="text-xs text-content-text-muted">Device</p>
                          <p className="text-sm text-content-text font-medium">{incident.device}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-content-text-muted">Location</p>
                          <p className="text-sm text-content-text font-medium">{incident.location}</p>
                        </div>
                      </div>

                      {/* Detection Method */}
                      <div className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-content-text-muted">Detection Method</p>
                          <p className="text-sm text-content-text font-medium">{incident.detectionMethod}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section C - User Context */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-content-text-strong">
                    User Context
                  </h3>
                  <div className="rounded-lg border border-content-border p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getAvatarColor(incident.user.name) }}
                      >
                        {getInitials(incident.user.name)}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-content-text-strong">{incident.user.name}</p>
                        <p className="text-sm text-content-text-muted">{incident.user.email}</p>
                        <p className="flex items-center gap-1.5 text-sm text-content-text-muted">
                          <Building2 className="h-3.5 w-3.5" />
                          {incident.user.department}
                        </p>
                        <button 
                          onClick={() => router.push(`/risk-scoring?user=${encodeURIComponent(incident.user.email)}`)}
                          className="mt-1 flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          View User Profile
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section D - Timeline */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-content-text-strong">
                    Timeline
                  </h3>
                  <div className="relative flex flex-col gap-4 pl-4">
                    {/* Vertical line */}
                    <div className="absolute bottom-2 left-[4.5px] top-2 w-px bg-content-border" />
                    {incident.timeline.map((event: { time: Date; event: string }, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <TimelineDot severity={incident.severity} />
                        <div className="flex flex-col gap-0.5 pb-1">
                          <p className="text-xs text-content-text-muted">
                            {formatRelativeTime(event.time)}
                          </p>
                          <p className="text-sm text-content-text">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-sm text-primary hover:underline">
                    View full timeline
                  </button>
                </section>

                {/* Section E - Investigation Notes */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-content-text-strong">
                    Investigation Notes
                  </h3>
                  {incident.notes.length > 0 && (
                    <div className="mb-4 flex flex-col gap-3">
                      {incident.notes.map((note: { date: Date; admin: string; text: string }, idx: number) => (
                        <div key={idx} className="border-l-2 border-content-border pl-3">
                          <p className="text-xs text-content-text-muted">
                            {formatRelativeTime(note.date)} &middot; {note.admin}
                          </p>
                          <p className="mt-1 text-sm text-content-text">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <textarea
                    placeholder="Add investigation notes..."
                    className="w-full rounded-md border border-content-border bg-content-surface p-3 text-sm text-content-text placeholder:text-content-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </section>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="z-10 shrink-0 border-t border-content-border bg-content-surface p-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-content-border text-content-text"
                >
                  Acknowledge
                </Button>
                <Button
                  variant="outline"
                  className="border-content-border text-content-text"
                >
                  Assign to...
                </Button>
                <Button
                  variant="outline"
                  className="border-content-border text-content-text"
                >
                  Escalate Severity
                </Button>
                <Button
                  className="ml-auto bg-danger text-white hover:bg-danger/90"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
