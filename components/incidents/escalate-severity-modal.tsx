"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Severity } from "@/lib/incidents-data"

const SEVERITY_OPTIONS: { value: Severity; label: string; class: string }[] = [
  { value: "critical", label: "Critical (8.0+)", class: "text-danger" },
  { value: "high", label: "High (6.5-7.9)", class: "text-orange" },
  { value: "medium", label: "Medium (4.0-6.4)", class: "text-warning" },
  { value: "low", label: "Low (<4.0)", class: "text-success" },
]

const SEVERITY_DISPLAY: Record<Severity, { label: string; class: string }> = {
  critical: { label: "Critical (8.0+)", class: "text-danger" },
  high: { label: "High (6.5-7.9)", class: "text-orange" },
  medium: { label: "Medium (4.0-6.4)", class: "text-warning" },
  low: { label: "Low (<4.0)", class: "text-success" },
}

interface EscalateSeverityModalProps {
  open: boolean
  currentSeverity: Severity
  onClose: () => void
  onConfirm: (newSeverity: Severity, reason: string) => void
}

export function EscalateSeverityModal({
  open,
  currentSeverity,
  onClose,
  onConfirm,
}: EscalateSeverityModalProps) {
  const [newSeverity, setNewSeverity] = useState<Severity>(currentSeverity)
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (open) {
      setNewSeverity(currentSeverity)
      setReason("")
    }
  }, [open, currentSeverity])

  function handleConfirm() {
    onConfirm(newSeverity, reason.trim())
    setNewSeverity(currentSeverity)
    setReason("")
    onClose()
  }

  function handleClose() {
    setNewSeverity(currentSeverity)
    setReason("")
    onClose()
  }

  const canConfirm =
    reason.trim().length > 0 && newSeverity !== currentSeverity

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="border-content-border bg-content-surface">
        <DialogHeader>
          <DialogTitle className="text-content-text-strong">
            Change Incident Severity
          </DialogTitle>
          <DialogDescription className="text-content-text-muted">
            Adjust the severity level of this incident. This action will be
            logged for audit purposes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Section 1 - Current Severity */}
          <div className="space-y-2">
            <Label className="text-content-text-strong">Current Severity</Label>
            <div className="rounded-md border border-content-border bg-content-bg px-3 py-2">
              <span
                className={`font-medium ${SEVERITY_DISPLAY[currentSeverity].class}`}
              >
                {SEVERITY_DISPLAY[currentSeverity].label}
              </span>
            </div>
          </div>

          {/* Section 2 - New Severity */}
          <div className="space-y-2">
            <Label className="text-content-text-strong">New Severity</Label>
            <Select
              value={newSeverity}
              onValueChange={(v) => setNewSeverity(v as Severity)}
            >
              <SelectTrigger className="w-full border-content-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEVERITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <span className={opt.class}>{opt.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section 3 - Reason */}
          <div className="space-y-2">
            <Label className="text-content-text-strong">
              Reason for Change <span className="text-danger">*</span>
            </Label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you're changing the severity (required)..."
              className="w-full rounded-md border border-content-border bg-content-surface p-3 text-sm text-content-text placeholder:text-content-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <p className="text-right text-xs text-content-text-muted">
              {reason.length} characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-content-border text-content-text"
          >
            Cancel
          </Button>
          <Button
            disabled={!canConfirm}
            onClick={handleConfirm}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
