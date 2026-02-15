"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Info,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { SecurityAlert } from "@/lib/dashboard-data"

// Severity config: dot color, icon component, icon color
const severityConfig: Record<
  SecurityAlert["severity"],
  { dot: string; icon: React.ElementType; iconColor: string }
> = {
  critical: { dot: "bg-[#EF4444]", icon: AlertOctagon, iconColor: "text-[#EF4444]" },
  high: { dot: "bg-orange-500", icon: AlertTriangle, iconColor: "text-orange-500" },
  medium: { dot: "bg-[#F59E0B]", icon: AlertCircle, iconColor: "text-[#F59E0B]" },
  low: { dot: "bg-[#3B82F6]", icon: Info, iconColor: "text-[#3B82F6]" },
}

// Status badge styles
const statusConfig: Record<SecurityAlert["status"], { bg: string; text: string; label: string }> = {
  new: { bg: "bg-primary/10", text: "text-primary", label: "New" },
  acknowledged: { bg: "bg-warning/10", text: "text-warning", label: "Acknowledged" },
  "in-progress": { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", label: "In Progress" },
  resolved: { bg: "bg-[#10B981]/10", text: "text-[#10B981]", label: "Resolved" },
  dismissed: { bg: "bg-gray-100", text: "text-gray-500", label: "Dismissed" },
}

// Generate a consistent avatar color from a name
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

interface AlertsTableProps {
  alerts: SecurityAlert[]
  setAlerts: React.Dispatch<React.SetStateAction<SecurityAlert[]>>
}

export function AlertsTable({ alerts, setAlerts }: AlertsTableProps) {
  const router = useRouter()
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleStatusChange = (
    alertId: string,
    newStatus: SecurityAlert["status"],
    message: string
  ) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    )
    toast.success(message)
    setIsDetailOpen(false)
  }

  const handleViewDetails = (alert: SecurityAlert) => {
    // Navigate to incidents page with auto-open panel
    router.push(`/incidents?open=${alert.id}`)
  }

  const handleModalStatusChange = (alertId: string, newStatus: SecurityAlert["status"]) => {
    const messages: Record<SecurityAlert["status"], string> = {
      new: "Alert status updated",
      acknowledged: "Alert acknowledged",
      "in-progress": "Alert assigned to you",
      resolved: "Alert marked as resolved",
      dismissed: "Alert dismissed",
    }
    handleStatusChange(alertId, newStatus, messages[newStatus])
  }

  // Empty state
  if (alerts.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
          Recent Security Alerts
        </h2>
        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm">
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle2 className="mb-4 h-16 w-16 text-[#10B981]" />
            <h3 className="mb-2 text-2xl font-semibold text-[#0F172A]">All Clear!</h3>
            <p className="mb-1 text-[#64748B]">No active alerts at the moment</p>
            <p className="text-sm text-[#64748B]">
              We&apos;ll notify you when something needs attention
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
        Recent Security Alerts
      </h2>
      <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FEFEFE] shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] text-[#64748B] text-center">Severity</TableHead>
              <TableHead className="text-[#64748B]">Alert</TableHead>
              <TableHead className="w-[200px] text-[#64748B]">User</TableHead>
              <TableHead className="w-[140px] text-[#64748B]">Time</TableHead>
              <TableHead className="w-[120px] text-[#64748B]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => {
              const sev = severityConfig[alert.severity]
              const status = statusConfig[alert.status] || statusConfig.new // Fallback to 'new' if status not found
              const SevIcon = sev?.icon || AlertCircle // Fallback icon

              return (
                <TableRow
                  key={alert.id}
                  className="cursor-pointer hover:bg-[#F8FAFC] focus-within:bg-[#F8FAFC]"
                  tabIndex={0}
                  onClick={() => handleViewDetails(alert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleViewDetails(alert)
                    }
                  }}
                >
                  {/* Severity */}
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${sev.dot}`}
                        aria-hidden="true"
                      />
                      <SevIcon
                        className={`h-4 w-4 shrink-0 ${sev.iconColor}`}
                        aria-label={`${alert.severity} severity`}
                      />
                    </div>
                  </TableCell>

                  {/* Alert info */}
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">
                        {alert.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64748B]">
                        {alert.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(alert.user.name)}`}
                        aria-hidden="true"
                      >
                        {getInitials(alert.user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-content-text">
                          {alert.user.name}
                        </p>
                        <p className="truncate text-xs text-[#64748B]">
                          {alert.user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell>
                    <span className="text-xs text-[#64748B]">
                      {alert.timestamp}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.bg} ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* View All Incidents Button */}
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => router.push('/incidents')}
          className="border-content-border text-content-text"
        >
          View All Incidents
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
