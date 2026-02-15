"use client"

import { FileText, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ReportsHeader() {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-content-text-strong">
            Reports
          </h1>
          <p className="text-sm text-content-text-muted">
            Generate and export security intelligence reports
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" />
          <Input
            placeholder="Search reports..."
            className="w-full border-content-border bg-content-surface pl-9 text-sm text-content-text placeholder:text-content-text-muted sm:w-[200px]"
          />
        </div>

        <Select defaultValue="30">
          <SelectTrigger className="w-full border-content-border bg-content-surface text-sm text-content-text sm:w-[160px]">
            <Calendar className="mr-2 h-4 w-4 text-content-text-muted" aria-hidden="true" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent className="border-content-border bg-content-surface">
            <SelectItem value="7" className="text-content-text">Last 7 Days</SelectItem>
            <SelectItem value="30" className="text-content-text">Last 30 Days</SelectItem>
            <SelectItem value="90" className="text-content-text">Last 90 Days</SelectItem>
            <SelectItem value="365" className="text-content-text">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
