"use client"

import { useState } from "react"
import { Search, Bell, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ChatIconWithBadge } from "@/components/chat-icon-with-badge"
import { useChat } from "@/contexts/chat-context"

interface HeaderProps {
  onMenuToggle?: () => void
  sidebarCollapsed?: boolean
}

export function Header({ onMenuToggle, sidebarCollapsed }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { isLoggedIn, toggleChatPopup, unreadMessages } = useChat()

  return (
    <header className="h-16 border-b border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-primary-light rounded-lg transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
          </button>
        )}

        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search Field */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            placeholder="Search ⌘K"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary border border-divider focus:outline-none focus:ring-1 focus:ring-primary w-64"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-primary-light relative">
          <Bell className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Chat Icon with Badge */}
        {isLoggedIn && (
          <button
            onClick={toggleChatPopup}
            className="p-2 rounded-full hover:bg-primary-light relative"
            aria-label="Toggle chat"
          >
            <ChatIconWithBadge unreadCount={unreadMessages} />
          </button>
        )}

        {/* User Profile Dropdown */}
        <UserProfileDropdown />
      </div>
    </header>
  )
}
