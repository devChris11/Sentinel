"use client"

import { ShieldCheck, SearchX, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function IncidentsLoading() {
  return (
    <div className="overflow-hidden rounded-lg border border-content-border bg-content-surface shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-content-border bg-content-bg">
            <th className="w-12 px-4 py-3"><Skeleton className="mx-auto h-4 w-4" /></th>
            <th className="w-24 px-4 py-3"><Skeleton className="mx-auto h-4 w-16" /></th>
            <th className="px-4 py-3"><Skeleton className="h-4 w-20" /></th>
            <th className="w-48 px-4 py-3"><Skeleton className="h-4 w-12" /></th>
            <th className="w-36 px-4 py-3"><Skeleton className="h-4 w-12" /></th>
            <th className="w-36 px-4 py-3"><Skeleton className="h-4 w-16" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="border-b border-content-border">
              <td className="w-12 px-4 py-4"><Skeleton className="mx-auto h-4 w-4" /></td>
              <td className="w-24 px-4 py-4"><Skeleton className="mx-auto h-8 w-8 rounded-full" /></td>
              <td className="px-4 py-4">
                <Skeleton className="mb-2 h-4 w-64" />
                <Skeleton className="h-3 w-96" />
              </td>
              <td className="w-48 px-4 py-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </td>
              <td className="w-36 px-4 py-4"><Skeleton className="h-4 w-24" /></td>
              <td className="w-36 px-4 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function IncidentsEmptyAll() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-content-border bg-content-surface py-24 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
        <ShieldCheck className="h-7 w-7 text-success" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-content-text-strong">All Clear</h2>
      <p className="mt-1 text-sm text-content-text-muted">No security incidents to review</p>
    </div>
  )
}

export function IncidentsEmptyFiltered({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-content-border bg-content-surface py-24 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-7 w-7 text-content-text-muted" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-content-text-strong">No incidents found</h2>
      <p className="mt-1 text-sm text-content-text-muted">
        Try adjusting your filters or search criteria
      </p>
      <Button
        variant="outline"
        className="mt-4 border-content-border text-content-text"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  )
}

export function IncidentsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-content-border bg-content-surface py-24 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/10">
        <AlertTriangle className="h-7 w-7 text-warning" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-content-text-strong">Failed to load incidents</h2>
      <p className="mt-1 text-sm text-content-text-muted">Something went wrong while loading incidents</p>
      <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  )
}
