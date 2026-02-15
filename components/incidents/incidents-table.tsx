"use client"

import { AlertOctagon, AlertTriangle, AlertCircle, Info, ArrowUp, ArrowDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { Incident, Severity, Status } from "@/lib/incidents-data"
import { getAvatarColor, getInitials, formatRelativeTime } from "@/lib/incidents-data"

interface IncidentsTableProps {
  incidents: Incident[]
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onRowClick: (incident: Incident) => void
  sortColumn: string
  sortDirection: "asc" | "desc"
  onSort: (column: string) => void
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function SeverityIcon({ severity }: { severity: Severity }) {
  switch (severity) {
    case "critical":
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-danger" />
          <AlertOctagon className="h-4 w-4 text-danger" />
        </div>
      )
    case "high":
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-orange" />
          <AlertTriangle className="h-4 w-4 text-orange" />
        </div>
      )
    case "medium":
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-warning" />
          <AlertCircle className="h-4 w-4 text-warning" />
        </div>
      )
    case "low":
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-success" />
          <Info className="h-4 w-4 text-success" />
        </div>
      )
  }
}

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { bg: string; text: string; border: string; label: string }> = {
    new: { bg: "bg-info/10", text: "text-info", border: "border-info/20", label: "New" },
    acknowledged: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", label: "Acknowledged" },
    "in-progress": { bg: "bg-orange/10", text: "text-orange", border: "border-orange/20", label: "In Progress" },
    resolved: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "Resolved" },
    dismissed: { bg: "bg-content-text-muted/10", text: "text-content-text-muted", border: "border-content-text-muted/20", label: "Dismissed" },
  }
  const c = config[status]
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  )
}

function SortIndicator({ column, sortColumn, sortDirection }: { column: string; sortColumn: string; sortDirection: "asc" | "desc" }) {
  if (column !== sortColumn) return null
  return sortDirection === "asc" ? (
    <ArrowUp className="ml-1 inline h-3 w-3" />
  ) : (
    <ArrowDown className="ml-1 inline h-3 w-3" />
  )
}

export function IncidentsTable({
  incidents,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: IncidentsTableProps) {
  const allSelected = incidents.length > 0 && incidents.every((inc) => selectedIds.has(inc.id))
  const pageSize = 20
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalCount)

  return (
    <div className="overflow-hidden rounded-lg border border-content-border bg-content-surface shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-content-border bg-content-bg">
            <th className="w-12 px-4 py-3 text-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
                aria-label="Select all incidents"
                className="border-content-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            </th>
            <th
              className="w-24 cursor-pointer px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-content-text-muted"
              onClick={() => onSort("severity")}
            >
              Severity
              <SortIndicator column="severity" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-content-text-muted"
              onClick={() => onSort("title")}
            >
              Incident
              <SortIndicator column="title" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="w-48 cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-content-text-muted"
              onClick={() => onSort("user")}
            >
              User
              <SortIndicator column="user" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="w-36 cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-content-text-muted"
              onClick={() => onSort("time")}
            >
              Time
              <SortIndicator column="time" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="w-36 cursor-pointer px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-content-text-muted"
              onClick={() => onSort("status")}
            >
              Status
              <SortIndicator column="status" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="cursor-pointer border-b border-content-border bg-content-surface transition-colors hover:bg-content-bg-alt"
              onClick={() => onRowClick(incident)}
            >
              <td className="w-12 px-4 py-4 text-center">
                <Checkbox
                  checked={selectedIds.has(incident.id)}
                  onCheckedChange={() => onToggleSelect(incident.id)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select ${incident.title}`}
                  className="border-content-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
              </td>
              <td className="w-24 px-4 py-4">
                <div className="flex justify-center">
                  <SeverityIcon severity={incident.severity} />
                </div>
              </td>
              <td className="px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-content-text-strong">{incident.title}</p>
                  <p className="truncate text-xs text-content-text-muted" style={{ maxWidth: "400px" }}>
                    {incident.description}
                  </p>
                </div>
              </td>
              <td className="w-48 px-4 py-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getAvatarColor(incident.user.name) }}
                  >
                    {getInitials(incident.user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-content-text-strong">
                      {incident.user.name}
                    </p>
                    <p className="truncate text-xs text-content-text-muted">
                      {incident.user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="w-36 px-4 py-4">
                <span className="text-sm text-content-text">
                  {formatRelativeTime(incident.timestamp)}
                </span>
              </td>
              <td className="w-36 px-4 py-4">
                <StatusBadge status={incident.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-content-border px-6 py-4 sm:flex-row">
        <p className="text-sm text-content-text-muted">
          Showing {start}-{end} of {totalCount} incidents
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                className={`border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  onPageChange(Math.max(1, currentPage - 1))
                }}
              />
            </PaginationItem>
            
            {/* Always show page 1 */}
            <PaginationItem>
              <PaginationLink 
                href="#" 
                isActive={currentPage === 1}
                className={currentPage === 1 ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong"}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  onPageChange(1)
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Show ellipsis if currentPage > 3 */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis className="text-content-text-muted" />
              </PaginationItem>
            )}

            {/* Show currentPage - 1 if currentPage > 2 */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  className="border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    onPageChange(currentPage - 1)
                  }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show currentPage if not first or last */}
            {currentPage !== 1 && currentPage !== totalPages && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  isActive
                  className="border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show currentPage + 1 if currentPage < totalPages - 1 */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  className="border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    onPageChange(currentPage + 1)
                  }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if currentPage < totalPages - 2 */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis className="text-content-text-muted" />
              </PaginationItem>
            )}

            {/* Always show last page if totalPages > 1 */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === totalPages}
                  className={currentPage === totalPages ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong"}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    onPageChange(totalPages)
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext 
                href="#" 
                className={`border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
