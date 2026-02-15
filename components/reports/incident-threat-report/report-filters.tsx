"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { CATEGORIES, SEVERITIES, STATUSES, DATE_RANGES } from "@/lib/incident-threat-data"

interface Filters {
  dateRange: string
  severity: string
  category: string
  status: string
}

interface ReportFiltersProps {
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ReportFilters({ filters, onFilterChange, onClearFilters, hasActiveFilters }: ReportFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filters.dateRange} onValueChange={(v) => onFilterChange("dateRange", v)}>
        <SelectTrigger className="w-[170px] border-content-border bg-content-surface text-content-text" aria-label="Filter by date range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DATE_RANGES.map((range) => (
            <SelectItem key={range} value={range}>{range}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.severity} onValueChange={(v) => onFilterChange("severity", v)}>
        <SelectTrigger className="w-[160px] border-content-border bg-content-surface text-content-text" aria-label="Filter by severity">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SEVERITIES.map((sev) => (
            <SelectItem key={sev} value={sev}>{sev}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(v) => onFilterChange("category", v)}>
        <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-content-text" aria-label="Filter by category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(v) => onFilterChange("status", v)}>
        <SelectTrigger className="w-[160px] border-content-border bg-content-surface text-content-text" aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-content-text-muted hover:text-content-text-strong"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
