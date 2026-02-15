"use client"

import { useState, useMemo, useRef, useCallback } from "react"
import { Search, X, ChevronDown, ChevronUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { HighRiskUser } from "@/lib/user-behavior-data"

interface UserSearchPopoverProps {
  users: HighRiskUser[]
  selectedUserIds: string[]
  onSelectionChange: (userIds: string[]) => void
  disabled?: boolean
}

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export function UserSearchPopover({
  users,
  selectedUserIds,
  onSelectionChange,
  disabled = false,
}: UserSearchPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (open) {
        setTempSelectedIds([...selectedUserIds])
        setSearchQuery("")
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
    },
    [selectedUserIds]
  )

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [users, searchQuery])

  const filteredIds = useMemo(() => filteredUsers.map((u) => u.id), [filteredUsers])

  const allVisibleSelected =
    filteredIds.length > 0 &&
    filteredIds.every((id) => tempSelectedIds.includes(id))
  const someVisibleSelected =
    filteredIds.some((id) => tempSelectedIds.includes(id)) && !allVisibleSelected

  const handleSelectAll = useCallback(() => {
    if (allVisibleSelected) {
      setTempSelectedIds((prev) => prev.filter((id) => !filteredIds.includes(id)))
    } else {
      setTempSelectedIds((prev) => {
        const newSet = new Set(prev)
        filteredIds.forEach((id) => newSet.add(id))
        return Array.from(newSet)
      })
    }
  }, [allVisibleSelected, filteredIds])

  const handleClearSelection = useCallback(() => {
    setTempSelectedIds([])
  }, [])

  const handleToggleUser = useCallback((userId: string) => {
    setTempSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }, [])

  const handleApply = useCallback(() => {
    onSelectionChange(tempSelectedIds)
    setIsOpen(false)
  }, [tempSelectedIds, onSelectionChange])

  const handleCancel = useCallback(() => {
    setTempSelectedIds([...selectedUserIds])
    setIsOpen(false)
  }, [selectedUserIds])

  const handleClearFromTrigger = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      onSelectionChange([])
    },
    [onSelectionChange]
  )

  const hasChanges = useMemo(() => {
    if (tempSelectedIds.length !== selectedUserIds.length) return true
    const setA = new Set(tempSelectedIds)
    const setB = new Set(selectedUserIds)
    if (setA.size !== setB.size) return true
    for (const id of setA) {
      if (!setB.has(id)) return true
    }
    return false
  }, [tempSelectedIds, selectedUserIds])

  const triggerPlaceholder =
    selectedUserIds.length > 0
      ? `${selectedUserIds.length} users selected`
      : "Search users..."

  if (users.length === 0) {
    return (
      <div className="relative w-[240px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" aria-hidden />
        <Input
          disabled
          placeholder="No users available"
          className="w-full border-content-border bg-content-surface pl-9 pr-8 text-content-text placeholder:text-content-text-muted"
          aria-label="Search and select users"
        />
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <div className="relative flex w-[240px]">
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="flex w-full items-center overflow-hidden rounded-md border border-content-border bg-content-surface text-left transition-colors hover:bg-content-bg-alt focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Search and select users"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <Search className="absolute left-3 h-4 w-4 shrink-0 text-content-text-muted" aria-hidden />
            <span
              className={`block w-full truncate py-2 pl-9 pr-8 text-sm ${
                selectedUserIds.length > 0 ? "text-content-text-strong" : "text-content-text"
              }`}
            >
              {triggerPlaceholder}
            </span>
            {selectedUserIds.length === 0 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-content-text-muted" aria-hidden>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </button>
        </PopoverTrigger>
        {selectedUserIds.length > 0 && (
          <button
            type="button"
            onClick={handleClearFromTrigger}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded p-1 text-content-text-muted transition-colors hover:bg-content-bg-alt hover:text-content-text-strong"
            aria-label="Clear user selection"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
      <PopoverContent
        className="w-[400px] max-h-[500px] p-0 border-content-border shadow-lg"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        role="dialog"
        aria-label="User selection"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all-users"
              checked={allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false}
              onCheckedChange={handleSelectAll}
              disabled={filteredUsers.length === 0}
              aria-label="Select all visible users"
            />
            <Label
              htmlFor="select-all-users"
              className="cursor-pointer text-sm font-medium text-foreground"
            >
              Select All
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSelection}
              disabled={tempSelectedIds.length === 0}
              className="text-xs text-muted-foreground hover:text-foreground"
              aria-label="Clear selection"
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
              aria-label="Close user search"
            >
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-text-muted" aria-hidden />
            <Input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name or email..."
              className="w-full border-content-border bg-content-surface pl-9 text-content-text placeholder:text-content-text-muted"
              aria-label="Filter users by name or email"
            />
          </div>
        </div>

        {/* User List */}
        <div className="max-h-[320px] overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="mb-2 h-8 w-8 text-content-text-muted" aria-hidden />
              <p className="text-sm text-muted-foreground">No users found</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <ScrollArea className="h-[320px]">
              <div className="p-1">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleToggleUser(user.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleToggleUser(user.id)
                      }
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label={`Select ${user.name}`}
                  >
                    <Checkbox
                      checked={tempSelectedIds.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-hidden
                    />
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback
                        className={`${getAvatarColor(user.name)} text-sm font-semibold text-white`}
                      >
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-4 border-t border-border bg-muted/50 p-3"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-muted-foreground">
            {tempSelectedIds.length === 0
              ? "No users selected"
              : `${tempSelectedIds.length} users selected`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              aria-label="Cancel and close"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleApply}
              disabled={!hasChanges}
              aria-label="Apply user filter"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
