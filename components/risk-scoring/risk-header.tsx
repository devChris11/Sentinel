"use client"

import { Search, Download, UserPlus, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type RiskUser } from "@/lib/risk-data"

interface RiskHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  riskFilter: string
  onRiskFilterChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  selectedUsersCount: number
  departmentFilter: string
  onDepartmentFilterChange: (value: string) => void
  trendFilter: string
  onTrendFilterChange: (value: string) => void
  filteredUsers: RiskUser[]
}

export function RiskHeader({
  searchQuery,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  sortBy,
  onSortChange,
  selectedUsersCount,
  departmentFilter,
  onDepartmentFilterChange,
  trendFilter,
  onTrendFilterChange,
  filteredUsers,
}: RiskHeaderProps) {
  const handleExport = () => {
    const header = "Name,Email,Department,Risk Score,Risk Level,Top Risk Factor,Last Activity,Status\n"
    const rows = filteredUsers.map(user => {
      return [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.department}"`,
        user.riskScore.toFixed(1),
        `"${user.riskLevel}"`,
        `"${user.topRiskFactor}"`,
        `"${user.lastActivity}"`,
        `"${user.status}"`,
      ].join(",")
    }).join("\n")
    
    const csvContent = header + rows
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sentinel-risk-scores-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="space-y-4">
      {/* Level 1: Title + Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-content-text-strong">Risk Scoring</h1>
            <p className="text-sm text-content-text-muted">
              User risk assessment and behavior analysis
            </p>
          </div>
        </div>
        <div className="relative w-full lg:w-1/4 lg:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border-content-border bg-content-surface pl-9 text-sm text-content-text placeholder:text-content-text-muted focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Level 2: Filters (Left) + Actions (Right) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters - Left Aligned */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={riskFilter} onValueChange={onRiskFilterChange}>
            <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-sm text-content-text">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent className="border-content-border bg-content-surface text-content-text">
              <SelectItem value="all" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">
                All Risk Levels
              </SelectItem>
              <SelectItem value="critical" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-danger" />
                  Critical (8.0+)
                </span>
              </SelectItem>
              <SelectItem value="high" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange" />
                  High (6.5-7.9)
                </span>
              </SelectItem>
              <SelectItem value="medium" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  Medium (4.0-6.4)
                </span>
              </SelectItem>
              <SelectItem value="low" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Low (&lt;4.0)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[220px] border-content-border bg-content-surface text-sm text-content-text">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-content-border bg-content-surface text-content-text">
              <SelectItem value="score-desc" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Risk Score (High to Low)</SelectItem>
              <SelectItem value="score-asc" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Risk Score (Low to High)</SelectItem>
              <SelectItem value="name-asc" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Name (A-Z)</SelectItem>
              <SelectItem value="recent" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Recent Activity</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={onDepartmentFilterChange}>
            <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-sm text-content-text">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent className="border-content-border bg-content-surface text-content-text">
              <SelectItem value="all" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">All Departments</SelectItem>
              <SelectItem value="Finance" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Finance</SelectItem>
              <SelectItem value="Engineering" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Engineering</SelectItem>
              <SelectItem value="Sales" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Sales</SelectItem>
              <SelectItem value="Marketing" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Marketing</SelectItem>
              <SelectItem value="HR" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">HR</SelectItem>
              <SelectItem value="IT" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">IT</SelectItem>
              <SelectItem value="Legal" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Legal</SelectItem>
              <SelectItem value="Operations" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Operations</SelectItem>
              <SelectItem value="Product" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Product</SelectItem>
              <SelectItem value="Data Science" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Data Science</SelectItem>
              <SelectItem value="Customer Success" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Customer Success</SelectItem>
              <SelectItem value="Design" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">Design</SelectItem>
            </SelectContent>
          </Select>
          <Select value={trendFilter} onValueChange={onTrendFilterChange}>
            <SelectTrigger className="w-[180px] border-content-border bg-content-surface text-sm text-content-text">
              <SelectValue placeholder="All Trends" />
            </SelectTrigger>
            <SelectContent className="border-content-border bg-content-surface text-content-text">
              <SelectItem value="all" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">All Trends</SelectItem>
              <SelectItem value="up" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">↑ Increasing Risk</SelectItem>
              <SelectItem value="down" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">↓ Decreasing Risk</SelectItem>
              <SelectItem value="stable" className="text-content-text focus:bg-content-bg-alt focus:text-content-text-strong">→ Stable Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions - Right Aligned */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="border-content-border bg-content-surface text-sm text-content-text hover:bg-content-bg-alt hover:text-content-text-strong"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          {selectedUsersCount > 0 && (
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Training to {selectedUsersCount} Users
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
