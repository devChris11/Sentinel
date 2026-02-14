"use client"

import { MoreVertical, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { type RiskUser, getRiskColor, getStatusConfig } from "@/lib/risk-data"

interface UserRiskTableProps {
  users: RiskUser[]
  onUserClick: (user: RiskUser) => void
  selectedUsers: string[]
  onSelectAll: (checked: boolean) => void
  onSelectUser: (userId: string, checked: boolean) => void
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") return <TrendingUp className="h-3 w-3" />
  if (trend === "down") return <TrendingDown className="h-3 w-3" />
  return <ArrowRight className="h-3 w-3" />
}

function getTrendArrow(trend: "up" | "down" | "stable") {
  if (trend === "up") return "^"
  if (trend === "down") return "v"
  return "-"
}

const avatarColors = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500",
  "bg-blue-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500",
  "bg-cyan-500", "bg-rose-500",
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export function UserRiskTable({ users, onUserClick, selectedUsers, onSelectAll, onSelectUser, totalCount, currentPage, totalPages, onPageChange }: UserRiskTableProps) {
  return (
    <div className="rounded-lg border border-content-border bg-content-surface shadow-sm">
      {/* Desktop table */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-content-border bg-content-bg-alt hover:bg-content-bg-alt">
              <TableHead className="w-[50px] text-xs font-medium uppercase tracking-wider text-content-text-muted">
                <Checkbox
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead className="w-[280px] text-xs font-medium uppercase tracking-wider text-content-text-muted">User</TableHead>
              <TableHead className="w-[140px] text-xs font-medium uppercase tracking-wider text-content-text-muted">Risk Score</TableHead>
              <TableHead className="w-[200px] text-xs font-medium uppercase tracking-wider text-content-text-muted">Top Risk Factor</TableHead>
              <TableHead className="w-[140px] text-xs font-medium uppercase tracking-wider text-content-text-muted">Last Activity</TableHead>
              <TableHead className="w-[120px] text-xs font-medium uppercase tracking-wider text-content-text-muted">Status</TableHead>
              <TableHead className="w-[80px] text-xs font-medium uppercase tracking-wider text-content-text-muted">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const riskColor = getRiskColor(user.riskLevel)
              const statusConfig = getStatusConfig(user.status)
              return (
                <TableRow
                  key={user.id}
                  className="cursor-pointer border-content-border transition-colors hover:bg-content-bg-alt"
                  onClick={() => onUserClick(user)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${user.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onUserClick(user)
                    }
                  }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => onSelectUser(user.id, checked as boolean)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(user.name)}`}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-content-text-strong">{user.name}</p>
                        <p className="text-xs text-content-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: riskColor }}>
                        {user.riskScore.toFixed(1)}
                      </span>
                      <div className="flex flex-col gap-1">
                        <Badge
                          className="text-[10px] leading-none px-1.5 py-0.5"
                          style={{
                            backgroundColor: `${riskColor}15`,
                            color: riskColor,
                            borderColor: `${riskColor}33`,
                          }}
                        >
                          {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
                        </Badge>
                        <span className="flex items-center gap-0.5 text-xs" style={{ color: user.trend === "up" ? "#EF4444" : user.trend === "down" ? "#10B981" : "#64748B" }}>
                          <TrendIcon trend={user.trend} />
                          {getTrendArrow(user.trend)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-content-text-strong">{user.topRiskFactor}</p>
                    <p className="text-xs text-content-text-muted">{user.topRiskDetail}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-content-text-muted">{user.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-content-text-muted hover:bg-content-bg-alt hover:text-content-text-strong"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-content-border bg-content-surface text-content-text">
                        <DropdownMenuItem className="cursor-pointer focus:bg-content-bg-alt focus:text-content-text-strong" onClick={(e) => e.stopPropagation()}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer focus:bg-content-bg-alt focus:text-content-text-strong" onClick={(e) => e.stopPropagation()}>Assign Training</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer focus:bg-content-bg-alt focus:text-content-text-strong" onClick={(e) => e.stopPropagation()}>Add Note</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer focus:bg-content-bg-alt focus:text-content-text-strong" onClick={(e) => e.stopPropagation()}>Dismiss</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-0 lg:hidden">
        {users.map((user) => {
          const riskColor = getRiskColor(user.riskLevel)
          const statusConfig = getStatusConfig(user.status)
          return (
            <div
              key={user.id}
              className="cursor-pointer border-b border-content-border p-4 transition-colors last:border-b-0 hover:bg-content-bg-alt"
              onClick={() => onUserClick(user)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${user.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onUserClick(user)
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => onSelectUser(user.id, checked as boolean)}
                      aria-label={`Select ${user.name}`}
                    />
                  </div>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(user.name)}`}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-content-text-strong">{user.name}</p>
                    <p className="text-xs text-content-text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: riskColor }}>
                    {user.riskScore.toFixed(1)}
                  </span>
                  <Badge
                    className="text-[10px] px-1.5 py-0.5"
                    style={{
                      backgroundColor: `${riskColor}15`,
                      color: riskColor,
                      borderColor: `${riskColor}33`,
                    }}
                  >
                    {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-content-text-muted">{user.topRiskFactor}</p>
                  <p className="text-xs text-content-text-muted">{user.topRiskDetail}</p>
                </div>
                <Badge className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-content-border px-6 py-4 sm:flex-row">
        <p className="text-sm text-content-text-muted">
          Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalCount)} of {totalCount} users
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
