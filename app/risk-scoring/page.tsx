"use client"

import { useState, useMemo } from "react"
import { RiskHeader } from "@/components/risk-scoring/risk-header"
import { RiskDistribution } from "@/components/risk-scoring/risk-distribution"
import { UserRiskTable } from "@/components/risk-scoring/user-risk-table"
import { UserDetailModal } from "@/components/risk-scoring/user-detail-modal"
import { users, type RiskUser } from "@/lib/risk-data"

const ITEMS_PER_PAGE = 20

export default function RiskScoringPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [sortBy, setSortBy] = useState("score-desc")
  const [selectedUser, setSelectedUser] = useState<RiskUser | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [trendFilter, setTrendFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q)
      )
    }

    if (riskFilter !== "all") {
      filtered = filtered.filter((u) => u.riskLevel === riskFilter)
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((u) => u.department === departmentFilter)
    }

    if (trendFilter !== "all") {
      filtered = filtered.filter((u) => u.trend === trendFilter)
    }

    switch (sortBy) {
      case "score-desc":
        filtered.sort((a, b) => b.riskScore - a.riskScore)
        break
      case "score-asc":
        filtered.sort((a, b) => a.riskScore - b.riskScore)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "recent":
        break
    }

    return filtered
  }, [searchQuery, riskFilter, departmentFilter, trendFilter, sortBy])

  const totalPages = Math.ceil(filteredAndSortedUsers.length / ITEMS_PER_PAGE)
  
  // Ensure current page doesn't exceed total pages
  const safePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedUsers = filteredAndSortedUsers.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleUserClick = (user: RiskUser) => {
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredAndSortedUsers.map(u => u.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleRiskFilterChange = (value: string) => {
    setRiskFilter(value)
    setCurrentPage(1)
  }

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value)
    setCurrentPage(1)
  }

  const handleTrendFilterChange = (value: string) => {
    setTrendFilter(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-content-bg">
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 space-y-6">
        <RiskHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          riskFilter={riskFilter}
          onRiskFilterChange={handleRiskFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          selectedUsersCount={selectedUsers.length}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={handleDepartmentFilterChange}
          trendFilter={trendFilter}
          onTrendFilterChange={handleTrendFilterChange}
          filteredUsers={filteredAndSortedUsers}
        />
        <RiskDistribution />
        {filteredAndSortedUsers.length > 0 ? (
          <UserRiskTable 
            users={paginatedUsers} 
            onUserClick={handleUserClick}
            selectedUsers={selectedUsers}
            onSelectAll={handleSelectAll}
            onSelectUser={handleSelectUser}
            totalCount={filteredAndSortedUsers.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (
          <EmptyState onClearFilters={() => { setSearchQuery(""); setRiskFilter("all") }} />
        )}
      </div>
      <UserDetailModal
        user={selectedUser}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </main>
  )
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-content-border bg-content-surface py-16 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-content-bg-alt">
        <svg className="h-8 w-8 text-content-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <p className="mt-4 text-sm font-medium text-content-text-strong">No users found</p>
      <p className="mt-1 text-sm text-content-text-muted">Try adjusting your filters or search criteria</p>
      <button
        onClick={onClearFilters}
        className="mt-4 rounded-md bg-content-bg-alt px-4 py-2 text-sm text-content-text transition-colors hover:bg-content-border"
      >
        Clear filters
      </button>
    </div>
  )
}
