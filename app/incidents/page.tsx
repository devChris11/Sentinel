"use client"

import { useState, useMemo, useCallback, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { INCIDENTS, type Incident, type Severity, type Status } from "@/lib/incidents-data"
import { IncidentsHeader } from "@/components/incidents/incidents-header"
import { IncidentsFilters } from "@/components/incidents/incidents-filters"
import { IncidentsTable } from "@/components/incidents/incidents-table"
import { IncidentDetailPanel } from "@/components/incidents/incident-detail-panel"
import { DismissModal } from "@/components/incidents/dismiss-modal"
import {
  IncidentsLoading,
  IncidentsEmptyAll,
  IncidentsEmptyFiltered,
} from "@/components/incidents/incidents-states"

const PAGE_SIZE = 20
const SEVERITY_ORDER: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1 }
const STATUS_ORDER: Record<Status, number> = { new: 5, acknowledged: 4, "in-progress": 3, resolved: 2, dismissed: 1 }

function IncidentsPageContent() {
  const searchParams = useSearchParams()
  
  // Simulated loading state
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Sorting
  const [sortColumn, setSortColumn] = useState("time")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Side panel
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [detailEscalateModalOpen, setDetailEscalateModalOpen] = useState(false)
  const [detailDismissModalOpen, setDetailDismissModalOpen] = useState(false)

  // Auto-open panel if incident ID is in URL params (from Dashboard navigation)
  useEffect(() => {
    const openId = searchParams.get('open')
    if (openId && !isLoading) {
      const incident = INCIDENTS.find((inc: Incident) => inc.id === openId)
      if (incident) {
        // eslint-disable-next-line
        setSelectedIncident(incident)
      }
    }
  }, [searchParams, isLoading])

  // Dismiss modal
  const [dismissModalOpen, setDismissModalOpen] = useState(false)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    let result = [...INCIDENTS]

    // Search
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (inc) =>
          inc.title.toLowerCase().includes(q) ||
          inc.description.toLowerCase().includes(q) ||
          inc.user.name.toLowerCase().includes(q)
      )
    }

    // Severity filter
    if (severityFilter !== "all") {
      result = result.filter((inc) => inc.severity === severityFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((inc) => inc.status === statusFilter)
    }

    // Time filter
    if (timeFilter !== "all") {
      const now = new Date()
      const cutoffs: Record<string, number> = {
        "1h": 3600000,
        "24h": 86400000,
        "7d": 604800000,
        "30d": 2592000000,
      }
      const cutoff = cutoffs[timeFilter]
      if (cutoff) {
        result = result.filter((inc) => now.getTime() - inc.timestamp.getTime() <= cutoff)
      }
    }

    // Department filter
    if (departmentFilter !== "all") {
      result = result.filter((inc) => inc.user.department === departmentFilter)
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortColumn) {
        case "severity":
          cmp = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
          break
        case "title":
          cmp = a.title.localeCompare(b.title)
          break
        case "user":
          cmp = a.user.name.localeCompare(b.user.name)
          break
        case "time":
          cmp = a.timestamp.getTime() - b.timestamp.getTime()
          break
        case "status":
          cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
          break
        default:
          cmp = 0
      }
      return sortDirection === "asc" ? cmp : -cmp
    })

    return result
  }, [debouncedSearch, severityFilter, statusFilter, timeFilter, departmentFilter, sortColumn, sortDirection])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredIncidents.length / PAGE_SIZE))
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // Reset page on filter change
  useEffect(() => {
    // eslint-disable-next-line
    setCurrentPage(1)
  }, [debouncedSearch, severityFilter, statusFilter, timeFilter, departmentFilter])

  // Handlers
  const handleSort = useCallback(
    (column: string) => {
      if (column === sortColumn) {
        setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
      } else {
        setSortColumn(column)
        setSortDirection(column === "time" ? "desc" : "asc")
      }
    },
    [sortColumn]
  )

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleToggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const allOnPage = paginatedIncidents.map((inc) => inc.id)
      const allSelected = allOnPage.every((id) => prev.has(id))
      if (allSelected) {
        const next = new Set(prev)
        allOnPage.forEach((id) => next.delete(id))
        return next
      }
      return new Set([...prev, ...allOnPage])
    })
  }, [paginatedIncidents])

  const handleRowClick = useCallback((incident: Incident) => {
    setSelectedIncident(incident)
    setDetailEscalateModalOpen(false)
    setDetailDismissModalOpen(false)
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedIncident(null)
    setDetailEscalateModalOpen(false)
    setDetailDismissModalOpen(false)
  }, [])

  const handleBulkAcknowledge = useCallback(() => {
    const count = selectedIds.size
    // In a real app, this would update the incident statuses in the backend
    toast.success(`Acknowledged ${count} incident${count === 1 ? '' : 's'}`)
    setSelectedIds(new Set())
  }, [selectedIds])

  const handleBulkDismiss = useCallback(() => {
    setDismissModalOpen(true)
  }, [])

  const handleConfirmDismiss = useCallback(
    (reason: string) => {
      const count = selectedIds.size
      // In a real app, this would update the incident statuses in the backend
      console.log('Dismiss reason:', reason) // Keep reason in scope
      toast.success(`Dismissed ${count} incident${count === 1 ? '' : 's'}`)
      setSelectedIds(new Set())
      setDismissModalOpen(false)
    },
    [selectedIds]
  )

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearchQuery("")
    setSeverityFilter("all")
    setStatusFilter("all")
    setTimeFilter("all")
    setDepartmentFilter("all")
  }, [])

  const hasActiveFilters =
    debouncedSearch !== "" ||
    severityFilter !== "all" ||
    statusFilter !== "all" ||
    timeFilter !== "all" ||
    departmentFilter !== "all"

  return (
    <main className="min-h-screen bg-content-bg">
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 space-y-6">
        <IncidentsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <IncidentsFilters
          severity={severityFilter}
          status={statusFilter}
          time={timeFilter}
          department={departmentFilter}
          selectedCount={selectedIds.size}
          onSeverityChange={setSeverityFilter}
          onStatusChange={setStatusFilter}
          onTimeChange={setTimeFilter}
          onDepartmentChange={setDepartmentFilter}
          onBulkAcknowledge={handleBulkAcknowledge}
          onBulkDismiss={handleBulkDismiss}
          onClearSelection={handleClearSelection}
        />

        {isLoading ? (
          <IncidentsLoading />
        ) : filteredIncidents.length === 0 && !hasActiveFilters ? (
          <IncidentsEmptyAll />
        ) : filteredIncidents.length === 0 && hasActiveFilters ? (
          <IncidentsEmptyFiltered onClearFilters={handleClearFilters} />
        ) : (
          <>
            <IncidentsTable
              incidents={paginatedIncidents}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onRowClick={handleRowClick}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              totalCount={filteredIncidents.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <IncidentDetailPanel
        incident={selectedIncident}
        onClose={handleClosePanel}
        escalateModalOpen={detailEscalateModalOpen}
        onEscalateModalOpenChange={setDetailEscalateModalOpen}
        dismissModalOpen={detailDismissModalOpen}
        onDismissModalOpenChange={setDetailDismissModalOpen}
      />

      <DismissModal
        open={dismissModalOpen}
        count={selectedIds.size}
        onClose={() => setDismissModalOpen(false)}
        onConfirm={handleConfirmDismiss}
      />
    </main>
  )
}

export default function IncidentsPage() {
  return (
    <Suspense fallback={<IncidentsLoading />}>
      <IncidentsPageContent />
    </Suspense>
  )
}
