"use client"

import * as React from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
  /**
   * Whether the sidebar should be collapsed by default on desktop
   * @default false
   */
  sidebarDefaultCollapsed?: boolean
}

export function RootLayout({
  children,
  className,
  sidebarDefaultCollapsed = false,
}: RootLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - fixed on left, overlay on mobile */}
      <Sidebar defaultCollapsed={sidebarDefaultCollapsed} />

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 overflow-auto bg-[#F8FAFC]",
          "min-h-screen",
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
