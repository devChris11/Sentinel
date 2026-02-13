"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { SecurityAlert } from "@/lib/dashboard-data"
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  MapPin,
  Monitor,
  Wifi,
  Search,
} from "lucide-react"

interface AlertDetailModalProps {
  alert: SecurityAlert | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (alertId: string, status: SecurityAlert["status"]) => void
}

// Severity config
const severityConfig: Record<
  SecurityAlert["severity"],
  { dot: string; icon: React.ElementType; iconColor: string; bgColor: string }
> = {
  critical: {
    dot: "bg-[#EF4444]",
    icon: AlertOctagon,
    iconColor: "text-[#EF4444]",
    bgColor: "bg-[#EF4444]/10",
  },
  high: {
    dot: "bg-orange-500",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  medium: {
    dot: "bg-[#F59E0B]",
    icon: AlertCircle,
    iconColor: "text-[#F59E0B]",
    bgColor: "bg-[#F59E0B]/10",
  },
  low: {
    dot: "bg-[#3B82F6]",
    icon: Info,
    iconColor: "text-[#3B82F6]",
    bgColor: "bg-[#3B82F6]/10",
  },
}

// Status badge styles
const statusConfig: Record<
  SecurityAlert["status"],
  { bg: string; text: string; label: string }
> = {
  new: { bg: "bg-primary/10", text: "text-primary", label: "New" },
  "in-progress": {
    bg: "bg-[#F59E0B]/10",
    text: "text-[#F59E0B]",
    label: "In Progress",
  },
  resolved: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Resolved" },
  dismissed: { bg: "bg-gray-100", text: "text-gray-500", label: "Dismissed" },
}

// Generate consistent avatar color
function getAvatarColor(name: string): string {
  const colors = [
    "bg-primary",
    "bg-[#3B82F6]",
    "bg-[#10B981]",
    "bg-orange-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-rose-500",
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// Generate realistic metadata
function generateMetadata(alert: SecurityAlert) {
  const ipAddresses = [
    "192.168.1.45",
    "192.168.2.103",
    "10.0.0.28",
    "10.0.1.156",
    "172.16.0.42",
  ]
  const devices = [
    "Windows 11 Workstation",
    "MacBook Pro",
    "iPhone 13",
    "Windows 10 Desktop",
    "iPad Pro",
    "Android Phone",
  ]
  const locations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "San Francisco, USA",
    "Singapore",
    "Toronto, Canada",
  ]
  const detectionMethods = [
    "Behavioral Analysis",
    "Pattern Matching",
    "ML Model",
    "Rule-Based Detection",
    "Anomaly Detection",
  ]

  // Use alert ID to generate consistent metadata
  const idHash = alert.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return {
    ipAddress: ipAddresses[idHash % ipAddresses.length],
    device: devices[idHash % devices.length],
    location: locations[idHash % locations.length],
    detectionMethod: detectionMethods[idHash % detectionMethods.length],
  }
}

export function AlertDetailModal({
  alert,
  isOpen,
  onClose,
  onStatusChange,
}: AlertDetailModalProps) {
  if (!alert) return null

  const sev = severityConfig[alert.severity]
  const status = statusConfig[alert.status]
  const SevIcon = sev.icon
  const metadata = generateMetadata(alert)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FEFEFE] border-[#E2E8F0]">
        <DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-[#64748B]" />
          </button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Severity Indicator */}
          <div className={`flex items-center gap-3 rounded-lg p-4 ${sev.bgColor}`}>
            <span
              className={`h-3 w-3 shrink-0 rounded-full ${sev.dot}`}
              aria-hidden="true"
            />
            <SevIcon className={`h-6 w-6 shrink-0 ${sev.iconColor}`} />
            <span className={`text-sm font-semibold uppercase ${sev.iconColor}`}>
              {alert.severity} Severity
            </span>
          </div>

          {/* Alert Title */}
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">{alert.title}</h2>
            <p className="mt-2 text-[#475569]">{alert.description}</p>
          </div>

          {/* User Section */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#0F172A]">User Information</h3>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(alert.user.name)}`}
              >
                {getInitials(alert.user.name)}
              </div>
              <div>
                <p className="font-medium text-[#0F172A]">{alert.user.name}</p>
                <p className="text-sm text-[#64748B]">{alert.user.email}</p>
              </div>
            </div>
          </div>

          {/* Timestamp and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-[#0F172A]">Detected</h3>
              <p className="text-lg font-medium text-[#475569]">{alert.timestamp}</p>
            </div>
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-[#0F172A]">Current Status</h3>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${status.bg} ${status.text}`}
              >
                {status.label}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <h3 className="mb-4 text-sm font-semibold text-[#0F172A]">Additional Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Wifi className="h-4 w-4 text-[#64748B]" />
                <span className="text-sm text-[#64748B]">IP Address:</span>
                <span className="text-sm font-medium text-[#0F172A]">{metadata.ipAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Monitor className="h-4 w-4 text-[#64748B]" />
                <span className="text-sm text-[#64748B]">Device:</span>
                <span className="text-sm font-medium text-[#0F172A]">{metadata.device}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#64748B]" />
                <span className="text-sm text-[#64748B]">Location:</span>
                <span className="text-sm font-medium text-[#0F172A]">{metadata.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-[#64748B]" />
                <span className="text-sm text-[#64748B]">Detection Method:</span>
                <span className="text-sm font-medium text-[#0F172A]">
                  {metadata.detectionMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 border-t border-[#E2E8F0] pt-6">
            {alert.status === "new" && (
              <button
                onClick={() => onStatusChange(alert.id, "in-progress")}
                className="flex-1 rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6366F1]/90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
              >
                Assign to Me
              </button>
            )}
            {alert.status !== "resolved" && (
              <button
                onClick={() => onStatusChange(alert.id, "resolved")}
                className="flex-1 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#10B981]/90 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2"
              >
                Mark Resolved
              </button>
            )}
            <button
              onClick={() => onStatusChange(alert.id, "dismissed")}
              className="flex-1 rounded-lg bg-[#EF4444] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#EF4444]/90 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
