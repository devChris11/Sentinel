"use client"

import { ShieldAlert, Search } from "lucide-react"

interface IncidentsHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function IncidentsHeader({ searchQuery, onSearchChange }: IncidentsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-content-text-strong">Incidents</h1>
          <p className="text-sm text-content-text-muted">Security incidents and threat alerts</p>
        </div>
      </div>
      <div className="relative w-full lg:w-1/4 lg:min-w-[300px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" />
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-md border border-content-border bg-content-surface pl-9 text-sm text-content-text placeholder:text-content-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </header>
  )
}
