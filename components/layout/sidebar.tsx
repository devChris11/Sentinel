"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Shield, 
  AlertCircle, 
  FileText, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navigationItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Risk Scoring",
    href: "/risk-scoring",
    icon: Shield,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: AlertCircle,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
  defaultCollapsed?: boolean
}

export function Sidebar({ className, defaultCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Handle ESC key to close mobile menu
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-lg"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out",
          "bg-[#0F172A] text-slate-200 flex flex-col",
          // Desktop: collapsed/expanded states
          "hidden lg:flex",
          isCollapsed ? "w-16" : "w-60",
          // Mobile: slide in from left
          "lg:translate-x-0",
          isMobileOpen
            ? "flex translate-x-0 w-60"
            : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-bold text-lg text-white">
              <Shield className="h-6 w-6 text-indigo-400" />
              <span>Sentinel</span>
            </div>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center w-full">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
          )}

          {/* Desktop Toggle Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-700/50"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              // Dashboard is active for both "/" and "/dashboard"
              const isActive = 
                (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard" || pathname?.startsWith("/dashboard/"))) ||
                (item.href !== "/dashboard" && (pathname === item.href || pathname?.startsWith(`${item.href}/`)))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                      "text-sm font-medium",
                      "hover:bg-slate-700/50 hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                      isActive
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "text-slate-300",
                      isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0")} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-slate-700/50 p-4">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md p-2",
              "hover:bg-slate-700/50 transition-colors cursor-pointer",
              isCollapsed && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8 ring-2 ring-slate-600">
              <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                AD
              </div>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-400 truncate">
                  admin@sentinel.ai
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer for main content (desktop only) */}
      <div
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-300",
          isCollapsed ? "w-16" : "w-60"
        )}
        aria-hidden="true"
      />
    </>
  )
}
