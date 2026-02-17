"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronRight } from "lucide-react"
import type { Incident } from "@/lib/incident-threat-data"

interface IncidentsTableProps {
  incidents: Incident[]
  sortBy?: "recent" | "severity"
  onRowClick: (incident: Incident) => void
}

const ITEMS_PER_PAGE = 20

const severityDot: Record<string, string> = {
  critical: "bg-danger",
  high: "bg-orange",
  medium: "bg-warning",
  low: "bg-success",
}

const severityBadge: Record<string, string> = {
  critical: "border-danger/20 bg-danger/10 text-danger",
  high: "border-orange/20 bg-orange/10 text-orange",
  medium: "border-warning/20 bg-warning/10 text-warning",
  low: "border-success/20 bg-success/10 text-success",
}

const statusBadge: Record<string, string> = {
  new: "border-info/20 bg-info/10 text-info",
  acknowledged: "border-warning/20 bg-warning/10 text-warning",
  "in-progress": "border-orange/20 bg-orange/10 text-orange",
  resolved: "border-success/20 bg-success/10 text-success",
}

function formatStatusLabel(status: string): string {
  return status
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export function IncidentsTable({ incidents, sortBy = "recent", onRowClick }: IncidentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const sorted = [...incidents].sort((a, b) => {
    if (sortBy === "severity") {
      const order = { critical: 0, high: 1, medium: 2, low: 3 }
      return order[a.severity] - order[b.severity]
    }
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(incidents.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const start = startIndex + 1
  const end = Math.min(endIndex, incidents.length)
  const paginatedIncidents = sorted.slice(startIndex, endIndex)

  return (
    <Card className="bg-content-surface border-content-border p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-content-border hover:bg-transparent">
              <TableHead className="w-[100px] px-4 py-3 text-sm font-medium text-content-text-muted">Severity</TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-content-text-muted">Incident</TableHead>
              <TableHead className="hidden px-4 py-3 text-sm font-medium text-content-text-muted md:table-cell">Category</TableHead>
              <TableHead className="hidden px-4 py-3 text-sm font-medium text-content-text-muted lg:table-cell">User</TableHead>
              <TableHead className="hidden px-4 py-3 text-sm font-medium text-content-text-muted sm:table-cell">Time</TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-content-text-muted">Status</TableHead>
              <TableHead className="w-[60px] px-4 py-3 text-sm font-medium text-content-text-muted"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedIncidents.map((incident) => (
              <TableRow
                key={incident.id}
                onClick={() => onRowClick(incident)}
                className="cursor-pointer border-content-border hover:bg-content-bg-alt transition-colors"
              >
              <TableCell className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${severityDot[incident.severity]}`} />
                  <Badge className={`${severityBadge[incident.severity]} border px-2.5 py-0.5 text-xs font-medium`}>
                    {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="max-w-[300px] px-4 py-4">
                <p className="truncate font-medium text-content-text-strong">{incident.title}</p>
              </TableCell>
              <TableCell className="hidden px-4 py-4 md:table-cell">
                <span className="text-content-text">{incident.category}</span>
              </TableCell>
              <TableCell className="hidden px-4 py-4 lg:table-cell">
                <div>
                  <p className="font-medium text-content-text-strong">{incident.user.name}</p>
                  <p className="mt-0.5 text-xs text-content-text-muted">{incident.user.department}</p>
                </div>
              </TableCell>
              <TableCell className="hidden px-4 py-4 sm:table-cell">
                <span className="whitespace-nowrap text-content-text">{incident.timestamp}</span>
              </TableCell>
              <TableCell className="px-4 py-4">
                <Badge className={`${statusBadge[incident.status]} border px-2.5 py-0.5 text-xs font-medium`}>
                  {formatStatusLabel(incident.status)}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-4">
                <ChevronRight className="h-4 w-4 text-content-text-muted" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-content-border pt-4 sm:flex-row">
        <p className="text-sm text-content-text-muted">
          Showing {start}-{end} of {incidents.length} incidents
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={`border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.max(1, p - 1))
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
                  setCurrentPage(1)
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
                    setCurrentPage(currentPage - 1)
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
                    setCurrentPage(currentPage + 1)
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
                    setCurrentPage(totalPages)
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                className={`border-content-border text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  )
}
