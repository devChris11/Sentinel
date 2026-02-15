"use client"

import type { ReactNode } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export interface FilterState {
  department: string
  role: string
  dateRange: string
  search: string
}

interface ReportFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  hasActiveFilters: boolean
  /** Optional: Replace search input with custom component (e.g. UserSearchPopover). When provided, Clear Filters also clears user selection via onFilterChange. */
  userSearch?: ReactNode
}

const departments = ["All Departments", "Engineering", "Sales", "Marketing", "Finance", "HR"]
const roles = ["All Roles", "Admin", "Manager", "Individual Contributor"]
const dateRanges = [
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
  { value: "180", label: "Last 6 Months" },
  { value: "365", label: "Last Year" },
]

export function ReportFilters({ filters, onFilterChange, hasActiveFilters, userSearch }: ReportFiltersProps) {
  function update(key: keyof FilterState, value: string) {
    onFilterChange({ ...filters, [key]: value })
  }

  function clearAll() {
    onFilterChange({
      department: "All Departments",
      role: "All Roles",
      dateRange: "90",
      search: "",
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filters.department} onValueChange={(v) => update("department", v)}>
        <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-content-text" aria-label="Filter by department">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.role} onValueChange={(v) => update("role", v)}>
        <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-content-text" aria-label="Filter by role">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.dateRange} onValueChange={(v) => update("dateRange", v)}>
        <SelectTrigger className="w-[160px] border-content-border bg-content-surface text-content-text" aria-label="Filter by date range">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          {dateRanges.map((d) => (
            <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {userSearch ?? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" aria-hidden />
          <Input
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search users..."
            className="w-[240px] border-content-border bg-content-surface pl-9 text-content-text placeholder:text-content-text-muted"
            aria-label="Search users by name or email"
          />
        </div>
      )}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="gap-1 text-content-text-muted hover:text-content-text-strong"
          aria-label="Clear all filters"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
