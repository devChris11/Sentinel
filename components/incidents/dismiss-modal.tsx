"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DismissModalProps {
  open: boolean
  count: number
  onClose: () => void
  onConfirm: (reason: string) => void
}

export function DismissModal({ open, count, onClose, onConfirm }: DismissModalProps) {
  const [reason, setReason] = useState("")

  function handleConfirm() {
    onConfirm(reason)
    setReason("")
  }

  function handleClose() {
    onClose()
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="border-content-border bg-content-surface">
        <DialogHeader>
          <DialogTitle className="text-content-text-strong">
            Dismiss {count} Incident{count !== 1 ? "s" : ""}
          </DialogTitle>
          <DialogDescription className="text-content-text-muted">
            Please provide a reason for dismissing these incidents. This action will be logged for
            compliance.
          </DialogDescription>
        </DialogHeader>
        <div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for dismissal (required)..."
            className="w-full rounded-md border border-content-border bg-content-surface p-3 text-sm text-content-text placeholder:text-content-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          <p className="mt-1 text-right text-xs text-content-text-muted">
            {reason.length} characters
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="border-content-border text-content-text">
            Cancel
          </Button>
          <Button
            disabled={reason.trim().length === 0}
            onClick={handleConfirm}
            className="bg-danger text-white hover:bg-danger/90 disabled:opacity-50"
          >
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
