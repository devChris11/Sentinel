"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// Filter types are handled inline

interface IncidentsFiltersProps {
  severity: string
  status: string
  time: string
  department: string
  selectedCount: number
  onSeverityChange: (value: string) => void
  onStatusChange: (value: string) => void
  onTimeChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onBulkAcknowledge: () => void
  onBulkDismiss: () => void
  onClearSelection: () => void
}

const SEVERITY_OPTIONS: { value: string; label: string; color: string }[] = [
  { value: "all", label: "All Severities", color: "" },
  { value: "critical", label: "Critical (8.0+)", color: "bg-danger" },
  { value: "high", label: "High (6.5-7.9)", color: "bg-orange" },
  { value: "medium", label: "Medium (4.0-6.4)", color: "bg-warning" },
  { value: "low", label: "Low (<4.0)", color: "bg-success" },
]

const STATUS_OPTIONS: { value: string; label: string; color: string }[] = [
  { value: "all", label: "All Statuses", color: "" },
  { value: "new", label: "New", color: "bg-info" },
  { value: "acknowledged", label: "Acknowledged", color: "bg-warning" },
  { value: "in-progress", label: "In Progress", color: "bg-orange" },
  { value: "resolved", label: "Resolved", color: "bg-success" },
  { value: "dismissed", label: "Dismissed", color: "bg-content-text-muted" },
]

const TIME_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "1h", label: "Last Hour" },
  { value: "24h", label: "Last 24 Hours" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
]

const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Customer Success",
  "Data Science",
  "Design",
  "Engineering",
  "Finance",
  "HR",
  "IT",
  "Legal",
  "Marketing",
  "Operations",
  "Product",
  "Sales",
]

export function IncidentsFilters({
  severity,
  status,
  time,
  department,
  selectedCount,
  onSeverityChange,
  onStatusChange,
  onTimeChange,
  onDepartmentChange,
  onBulkAcknowledge,
  onBulkDismiss,
  onClearSelection,
}: IncidentsFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Select value={severity} onValueChange={onSeverityChange}>
          <SelectTrigger className="w-48 border-content-border bg-content-surface text-content-text">
            <SelectValue placeholder="All Severities" />
          </SelectTrigger>
          <SelectContent>
            {SEVERITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  {opt.color && (
                    <span className={`h-2 w-2 rounded-full ${opt.color}`} />
                  )}
                  {opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-48 border-content-border bg-content-surface text-content-text">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  {opt.color && (
                    <span className={`h-2 w-2 rounded-full ${opt.color}`} />
                  )}
                  {opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={time} onValueChange={onTimeChange}>
          <SelectTrigger className="w-48 border-content-border bg-content-surface text-content-text">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-48 border-content-border bg-content-surface text-content-text">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENT_OPTIONS.map((dept) => (
              <SelectItem key={dept} value={dept === "All Departments" ? "all" : dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-3 rounded-md border border-content-border bg-content-bg-alt px-4 py-2.5">
          <span className="text-sm font-medium text-content-text">
            {selectedCount} incident{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkAcknowledge}
            className="border-content-border text-content-text"
          >
            Acknowledge
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDismiss}
            className="border-danger/30 bg-danger/5 text-danger hover:bg-danger/10 hover:text-danger"
          >
            Dismiss
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-content-text-muted"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
