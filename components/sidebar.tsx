"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Bus,
  Mail,
  MessageCircle,
  Calendar,
  Kanban,
  FileIcon as FileInvoice,
  ShieldCheck,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { getMenuItemsForRole } from "@/components/sidebar-configs"
import { PortalSwitcher } from "@/components/portal-switcher"

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

interface MenuItem {
  title: string
  icon: React.ReactNode
  path?: string
  badge?: string | number
  submenu?: MenuItem[]
  expanded?: boolean
}

export function Sidebar({ collapsed: propCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(propCollapsed)
  const [isHovering, setIsHovering] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setCollapsed(propCollapsed)
  }, [propCollapsed])

  const toggleCollapse = () => {
    const newCollapsedState = !collapsed
    setCollapsed(newCollapsedState)
    if (onToggle) {
      onToggle()
    }
  }

  const handleMouseEnter = () => {
    if (collapsed) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (collapsed) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovering(false)
      }, 300)
    }
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    // Get user role from localStorage or default to admin
    const userRole = localStorage.getItem("userRole") || "admin"
    const roleMenuItems = getMenuItemsForRole(userRole)
    setMenuItems(roleMenuItems)
  }, [])

  const appPages = [
    {
      title: "Email",
      icon: <Mail size={20} />,
      path: "/email",
    },
    {
      title: "Chat",
      icon: <MessageCircle size={20} />,
      path: "/chat",
    },
    {
      title: "Calendar",
      icon: <Calendar size={20} />,
      path: "/calendar",
    },
    {
      title: "Kanban",
      icon: <Kanban size={20} />,
      path: "/kanban",
    },
    {
      title: "Invoice",
      icon: <FileInvoice size={20} />,
      path: "/invoice",
      submenu: [],
    },
    {
      title: "School Bus",
      icon: <Bus size={20} />,
      path: "/school-bus-app",
      submenu: [],
    },
    {
      title: "Academics",
      icon: <GraduationCap size={20} />,
      path: "/academics-app",
      submenu: [],
    },
    {
      title: "Roles & Permissions",
      icon: <ShieldCheck size={20} />,
      path: "/roles-permissions",
      submenu: [],
    },
  ]

  const toggleSubmenu = (index: number) => {
    const updatedMenuItems = [...menuItems]
    updatedMenuItems[index].expanded = !updatedMenuItems[index].expanded
    setMenuItems(updatedMenuItems)
  }

  const isExpanded = collapsed && isHovering
  const effectiveCollapsed = collapsed && !isHovering

  return (
    <aside
      className={`h-screen flex flex-col border-r border-divider bg-light-bg dark:bg-dark-bg transition-all duration-300 ${
        effectiveCollapsed ? "w-[70px]" : "w-[260px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4 flex items-center justify-between border-b border-divider">
        <Logo collapsed={effectiveCollapsed} />
        {!effectiveCollapsed && (
          <button
            className="w-6 h-6 rounded-full border border-divider flex items-center justify-center"
            onClick={toggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          </button>
        )}
      </div>

      {/* Main Menu - with flex-1 to take available space */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="mb-4">
          {!effectiveCollapsed && (
            <div className="text-xs uppercase font-semibold mb-2 px-4 text-light-text-secondary dark:text-dark-text-secondary">
              Apps
            </div>
          )}
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={item.title}>
                  {item.submenu ? (
                    <div>
                      <div
                        className={`flex items-center gap-3 px-4 py-2 ${
                          pathname === item.path || pathname.startsWith(item.path + "/")
                            ? "bg-gradient-to-r from-[#8C57FF] to-[#5B34C0] text-white"
                            : "hover:bg-primary-light hover:text-primary text-light-text-primary dark:text-[#EFE3FC] dark:text-opacity-90"
                        } transition-colors rounded-r-full`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        {!effectiveCollapsed && (
                          <>
                            <Link href={item.path || "#"} className="flex-1 text-left">
                              {item.title}
                            </Link>
                            {item.badge && (
                              <span className="bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                            <button
                              onClick={() => toggleSubmenu(index)}
                              className="p-1 hover:bg-white/20 rounded"
                              aria-label={item.expanded ? "Collapse submenu" : "Expand submenu"}
                            >
                              {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                          </>
                        )}
                      </div>
                      {!effectiveCollapsed && item.expanded && item.submenu && (
                        <ul className="mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.path || "#"}
                                className={`flex items-center gap-3 pl-12 pr-4 py-2 ${
                                  pathname === subItem.path
                                    ? "bg-gradient-to-r from-[#8C57FF] to-[#5B34C0] text-white rounded-r-full"
                                    : "hover:bg-primary-light hover:text-primary text-light-text-primary dark:text-[#EFE3FC] dark:text-opacity-90"
                                } transition-colors`}
                              >
                                <span className="flex-shrink-0 text-current">{subItem.icon}</span>
                                <span className="flex-1">{subItem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path || "#"}
                      className={`flex items-center gap-3 px-4 py-2 ${
                        pathname === item.path
                          ? "bg-gradient-to-r from-[#8C57FF] to-[#5B34C0] text-white"
                          : "hover:bg-primary-light hover:text-primary text-light-text-primary dark:text-[#EFE3FC] dark:text-opacity-90"
                      } transition-colors rounded-r-full`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!effectiveCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {!effectiveCollapsed && (
          <>
            <div className="mb-4">
              <div className="text-xs uppercase font-semibold mb-2 px-4 text-light-text-secondary dark:text-dark-text-secondary">
                PAGES
              </div>
              <div className="h-4"></div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase font-semibold mb-2 px-4 text-light-text-secondary dark:text-dark-text-secondary">
                USER INTERFACE
              </div>
              <div className="h-4"></div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase font-semibold mb-2 px-4 text-light-text-secondary dark:text-dark-text-secondary">
                FORMS & TABLES
              </div>
              <div className="h-4"></div>
            </div>

            <div className="mb-4">
              <div className="text-xs uppercase font-semibold mb-2 px-4 text-light-text-secondary dark:text-dark-text-secondary">
                CHARTS & MISC
              </div>
              <div className="h-4"></div>
            </div>
          </>
        )}
      </div>

      {/* Portal Switcher - Now at the bottom of sidebar and sticky */}
      <div className="mt-auto border-t border-divider sticky bottom-0 bg-light-bg dark:bg-dark-bg py-3 px-4">
        {!effectiveCollapsed && <PortalSwitcher />}
      </div>
    </aside>
  )
}
