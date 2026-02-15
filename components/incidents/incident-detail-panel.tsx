"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { X, Building2, ArrowRight, Wifi, Monitor, Smartphone, Laptop, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Incident, type Severity, type Status, type DetectionMethod } from "@/lib/incidents-data"
import { getAvatarColor, getInitials, formatRelativeTime } from "@/lib/incidents-data"
import { DismissModal } from "@/components/incidents/dismiss-modal"
import { EscalateSeverityModal } from "@/components/incidents/escalate-severity-modal"

const TEAM_MEMBERS = [
  { name: "Alex Chen", role: "Security Analyst", initials: "AC", color: "bg-primary" },
  { name: "Maria Garcia", role: "SOC Lead", initials: "MG", color: "bg-orange" },
  { name: "James Park", role: "Incident Responder", initials: "JP", color: "bg-success" },
  { name: "Lisa Wong", role: "Security Engineer", initials: "LW", color: "bg-info" },
  { name: "David Kumar", role: "Threat Hunter", initials: "DK", color: "bg-violet-500" },
] as const

const DETECTION_METHOD_TOAST: Record<DetectionMethod, string> = {
  "Behavioral Analysis": "Detected unusual patterns in user behavior compared to baseline",
  "Rule-Based": "Triggered predefined security rule or policy violation",
  "Machine Learning": "AI model identified anomalous activity",
  "Signature Match": "Matched known threat signature in database",
  "Anomaly Detection": "Statistical analysis detected deviation from normal patterns",
}

interface AvailableActions {
  showAcknowledge: boolean
  showAssign: boolean
  showEscalateSeverity: boolean
  showDismiss: boolean
  showMarkResolved: boolean
  showReopen: boolean
  assignIsPrimary: boolean
  reopenFromStatus?: Status
}

function getAvailableActions(status: Status): AvailableActions {
  switch (status) {
    case "new":
      return {
        showAcknowledge: true,
        showAssign: true,
        showEscalateSeverity: true,
        showDismiss: true,
        showMarkResolved: false,
        showReopen: false,
        assignIsPrimary: false,
      }
    case "acknowledged":
      return {
        showAcknowledge: false,
        showAssign: true,
        showEscalateSeverity: true,
        showDismiss: true,
        showMarkResolved: false,
        showReopen: false,
        assignIsPrimary: true, // Primary action in this state
      }
    case "in-progress":
      return {
        showAcknowledge: false,
        showAssign: false,
        showEscalateSeverity: true,
        showDismiss: true,
        showMarkResolved: true,
        showReopen: false,
        assignIsPrimary: false,
      }
    case "resolved":
      return {
        showAcknowledge: false,
        showAssign: false,
        showEscalateSeverity: false,
        showDismiss: false,
        showMarkResolved: false,
        showReopen: true,
        assignIsPrimary: false,
        reopenFromStatus: "resolved",
      }
    case "dismissed":
      return {
        showAcknowledge: false,
        showAssign: false,
        showEscalateSeverity: false,
        showDismiss: false,
        showMarkResolved: false,
        showReopen: true,
        assignIsPrimary: false,
        reopenFromStatus: "dismissed",
      }
  }
}

interface IncidentDetailPanelProps {
  incident: Incident | null
  onClose: () => void
  /** Controlled state for Escalate modal so parent can reset when panel closes or incident changes */
  escalateModalOpen?: boolean
  onEscalateModalOpenChange?: (open: boolean) => void
  /** Controlled state for Dismiss modal so parent can reset when panel closes or incident changes */
  dismissModalOpen?: boolean
  onDismissModalOpenChange?: (open: boolean) => void
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

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { bg: string; text: string; border: string; label: string }> = {
    new: { bg: "bg-info/10", text: "text-info", border: "border-info/20", label: "New" },
    acknowledged: { bg: "bg-info/10", text: "text-info", border: "border-info/20", label: "Acknowledged" },
    "in-progress": { bg: "bg-orange/10", text: "text-orange", border: "border-orange/20", label: "In Progress" },
    resolved: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "Resolved" },
    dismissed: { bg: "bg-content-text-muted/10", text: "text-content-text-muted", border: "border-content-text-muted/20", label: "Dismissed" },
  }
  const c = config[status]
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
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

export function IncidentDetailPanel({
  incident,
  onClose,
  escalateModalOpen: controlledEscalateOpen,
  onEscalateModalOpenChange: setControlledEscalateOpen,
  dismissModalOpen: controlledDismissOpen,
  onDismissModalOpenChange: setControlledDismissOpen,
}: IncidentDetailPanelProps) {
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const [internalEscalateOpen, setInternalEscalateOpen] = useState(false)
  const [internalDismissOpen, setInternalDismissOpen] = useState(false)
  const escalateModalOpen = setControlledEscalateOpen ? (controlledEscalateOpen ?? false) : internalEscalateOpen
  const setEscalateModalOpen = setControlledEscalateOpen ?? setInternalEscalateOpen
  const dismissModalOpen = setControlledDismissOpen ? (controlledDismissOpen ?? false) : internalDismissOpen
  const setDismissModalOpen = setControlledDismissOpen ?? setInternalDismissOpen

  function handleAcknowledge() {
    toast.success("Incident acknowledged - Status updated")
    setTimeout(() => onClose(), 500)
  }

  function handleAssign(name: string) {
    toast.success(`Assigned to ${name} - Status: In Progress`)
    setTimeout(() => onClose(), 500)
  }

  function handleMarkResolved() {
    toast.success("Incident resolved - Case closed successfully")
    setTimeout(() => onClose(), 500)
  }

  function handleReopen() {
    if (!incident) return
    
    if (incident.status === "resolved") {
      toast.success("Incident reopened - Status: In Progress")
    } else if (incident.status === "dismissed") {
      toast.success("Incident reopened - Status: New")
    } else {
      toast.success("Incident reopened")
    }
    
    setTimeout(() => onClose(), 500)
  }

  function handleEscalate(newSeverity: Severity) {
    const label = { critical: "Critical", high: "High", medium: "Medium", low: "Low" }[newSeverity]
    toast.success(`Severity changed to ${label} - Incident updated`)
    setEscalateModalOpen(false)
  }

  function handleConfirmDismiss(
    reason: string // Required by DismissModal; would be logged in production
  ) {
    const shortReason = reason.length > 50 ? reason.substring(0, 50) + "..." : reason
    toast.success(`Incident dismissed - ${shortReason}`)
    setDismissModalOpen(false)
    onClose()
  }

  async function copyToClipboard(text: string, successMessage: string) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        toast.success(successMessage)
      } else {
        toast.error("Failed to copy to clipboard")
      }
    } catch {
      toast.error("Failed to copy to clipboard")
    }
  }

  function handleDetectionMethodInfo(method: DetectionMethod) {
    toast.info(DETECTION_METHOD_TOAST[method])
  }

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
                  <StatusBadge status={incident.status} />
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
                          <button
                            type="button"
                            onClick={() => copyToClipboard(incident.ipAddress, "IP address copied to clipboard")}
                            className="text-sm font-medium text-content-text hover:text-primary hover:underline cursor-pointer transition-colors text-left"
                          >
                            {incident.ipAddress}
                          </button>
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
                          <p className="text-sm text-content-text font-medium select-text">{incident.device}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-content-text-muted">Location</p>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(incident.location, "Location copied to clipboard")}
                            className="text-sm font-medium text-content-text hover:text-primary hover:underline cursor-pointer transition-colors text-left"
                          >
                            {incident.location}
                          </button>
                        </div>
                      </div>

                      {/* Detection Method */}
                      <div className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-content-text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-content-text-muted">Detection Method</p>
                          <button
                            type="button"
                            onClick={() => handleDetectionMethodInfo(incident.detectionMethod)}
                            className="text-sm font-medium text-content-text hover:text-primary hover:underline cursor-pointer transition-colors text-left"
                          >
                            {incident.detectionMethod}
                          </button>
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
              {(() => {
                const availableActions = getAvailableActions(incident.status)
                const hasMultipleButtons = 
                  [availableActions.showAcknowledge, availableActions.showAssign, availableActions.showMarkResolved, 
                   availableActions.showEscalateSeverity, availableActions.showDismiss].filter(Boolean).length > 1
                
                return (
                  <div className={`flex items-center gap-3 ${!hasMultipleButtons ? "justify-center" : ""}`}>
                    {availableActions.showAcknowledge && (
                      <Button
                        variant="outline"
                        className="border-content-border text-content-text"
                        onClick={handleAcknowledge}
                      >
                        Acknowledge
                      </Button>
                    )}
                    
                    {availableActions.showMarkResolved && (
                      <Button
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={handleMarkResolved}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    
                    {availableActions.showAssign && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant={availableActions.assignIsPrimary ? "default" : "outline"}
                            className={availableActions.assignIsPrimary 
                              ? "w-[120px]" 
                              : "border-content-border text-content-text w-[120px]"}
                          >
                            Assign to...
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 border-content-border">
                          {TEAM_MEMBERS.map((member) => (
                            <DropdownMenuItem
                              key={member.name}
                              className="cursor-pointer flex items-center gap-2 py-2"
                              onClick={() => handleAssign(member.name)}
                            >
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white ${member.color}`}
                              >
                                {member.initials}
                              </div>
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-sm font-medium">{member.name}</span>
                                <span className="text-xs text-muted-foreground">{member.role}</span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    
                    {availableActions.showEscalateSeverity && (
                      <Button
                        variant="outline"
                        className="border-content-border text-content-text"
                        onClick={() => setEscalateModalOpen(true)}
                      >
                        Escalate Severity
                      </Button>
                    )}
                    
                    {availableActions.showReopen && (
                      <Button
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={handleReopen}
                      >
                        Reopen Incident
                      </Button>
                    )}
                    
                    {availableActions.showDismiss && (
                      <Button
                        className="ml-auto bg-danger text-white hover:bg-danger/90"
                        onClick={() => setDismissModalOpen(true)}
                      >
                        Dismiss
                      </Button>
                    )}
                  </div>
                )
              })()}
            </div>
          </>
        )}
      </div>

      {incident && (
        <>
          <EscalateSeverityModal
            open={escalateModalOpen}
            currentSeverity={incident.severity}
            onClose={() => setEscalateModalOpen(false)}
            onConfirm={handleEscalate}
          />
          <DismissModal
            open={dismissModalOpen}
            count={1}
            onClose={() => setDismissModalOpen(false)}
            onConfirm={handleConfirmDismiss}
          />
        </>
      )}
    </>
  )
}
