"use client"

import { useState, useMemo, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MoreHorizontal, ArrowUp, ArrowDown, UserCircle, BookOpen, Mail } from "lucide-react"
import type { HighRiskUser, RiskLevel } from "@/lib/user-behavior-data"

interface HighRiskTableProps {
  users: HighRiskUser[]
}

type SortField = "name" | "department" | "reportingRate" | "timeToReport" | "riskLevel"
type SortDirection = "asc" | "desc"

const riskOrder: Record<RiskLevel, number> = { critical: 0, high: 1, medium: 2, low: 3 }

const riskStyles: Record<RiskLevel, string> = {
  critical: "border-danger/20 bg-danger/10 text-danger",
  high: "border-orange/20 bg-orange/10 text-orange",
  medium: "border-warning/20 bg-warning/10 text-warning",
  low: "border-success/20 bg-success/10 text-success",
}

function getRateBarColor(rate: number) {
  if (rate < 50) return "bg-danger"
  if (rate < 70) return "bg-orange"
  if (rate < 85) return "bg-warning"
  return "bg-success"
}

const PAGE_SIZE = 20

export function HighRiskTable({ users }: HighRiskTableProps) {
  const [sortField, setSortField] = useState<SortField>("riskLevel")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case "name":
          cmp = a.name.localeCompare(b.name)
          break
        case "department":
          cmp = a.department.localeCompare(b.department)
          break
        case "reportingRate":
          cmp = a.reportingRate - b.reportingRate
          break
        case "timeToReport":
          cmp = a.timeToReport - b.timeToReport
          break
        case "riskLevel":
          cmp = riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
          break
      }
      return sortDirection === "asc" ? cmp : -cmp
    })
  }, [users, sortField, sortDirection])

  const totalCount = sortedUsers.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const start = (currentPage - 1) * PAGE_SIZE
  const end = Math.min(currentPage * PAGE_SIZE, totalCount)
  const visibleUsers = sortedUsers.slice(start, end)

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
      } else {
        setSortDirection("asc")
      }
      return field
    })
  }, [])

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3" aria-hidden />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" aria-hidden />
    )
  }

  if (users.length === 0) {
    return (
      <Card className="border-content-border bg-content-surface p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-sm text-content-text-muted">No users match the current filters</p>
          <p className="mt-1 text-xs text-content-text-muted">Adjust filters to see results</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-content-border bg-content-surface p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSort("name"); } }}
                tabIndex={0}
                role="columnheader"
                aria-sort={sortField === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
              >
                User {renderSortIndicator("name")}
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("department")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSort("department"); } }}
                tabIndex={0}
                role="columnheader"
                aria-sort={sortField === "department" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
              >
                Department {renderSortIndicator("department")}
              </TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("reportingRate")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSort("reportingRate"); } }}
                tabIndex={0}
                role="columnheader"
                aria-sort={sortField === "reportingRate" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
              >
                Reporting Rate {renderSortIndicator("reportingRate")}
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none lg:table-cell"
                onClick={() => handleSort("timeToReport")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSort("timeToReport"); } }}
                tabIndex={0}
                role="columnheader"
                aria-sort={sortField === "timeToReport" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
              >
                Avg Time {renderSortIndicator("timeToReport")}
              </TableHead>
              <TableHead className="hidden xl:table-cell">Last Activity</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("riskLevel")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSort("riskLevel"); } }}
                tabIndex={0}
                role="columnheader"
                aria-sort={sortField === "riskLevel" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
              >
                Risk Level {renderSortIndicator("riskLevel")}
              </TableHead>
              <TableHead className="w-10">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <p className="font-medium text-content-text-strong">{user.name}</p>
                    <p className="text-xs text-content-text-muted">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-content-text">{user.department}</TableCell>
                <TableCell className="hidden text-content-text md:table-cell">{user.role}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-content-text-strong">{user.reportingRate}%</span>
                    <div className="h-1 w-24 overflow-hidden rounded-full bg-muted" role="presentation">
                      <div
                        className={`h-full rounded-full ${getRateBarColor(user.reportingRate)}`}
                        style={{ width: `${user.reportingRate}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-content-text lg:table-cell">
                  {user.timeToReport} hrs
                </TableCell>
                <TableCell className="hidden text-xs text-content-text-muted xl:table-cell">
                  {user.lastActivity}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize ${riskStyles[user.riskLevel]}`}
                  >
                    {user.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={`Open menu for ${user.name}`}>
                        <MoreHorizontal className="h-4 w-4" aria-hidden />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" aria-hidden />
                        View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BookOpen className="mr-2 h-4 w-4" aria-hidden />
                        Assign Training
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" aria-hidden />
                        Send Reminder Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-content-border pt-4 sm:flex-row">
        <p className="text-sm text-content-text-muted">
          Showing {start + 1}-{end} of {totalCount} users
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
