"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()

  // Show breadcrumbs on all pages
  const segments = pathname.split("/").filter(Boolean)

  return (
    <div className="flex items-center text-sm">
      <Link
        href="/"
        className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
      >
        <Home size={16} />
      </Link>

      {segments.length > 0 && (
        <>
          <ChevronRight size={14} className="mx-2 text-light-text-secondary dark:text-dark-text-secondary" />
          <span className="text-light-text-primary dark:text-dark-text-primary font-medium">
            {segments.length === 0
              ? "Dashboard"
              : segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1)}
          </span>
        </>
      )}

      {segments.length === 0 && (
        <>
          <ChevronRight size={14} className="mx-2 text-light-text-secondary dark:text-dark-text-secondary" />
          <span className="text-light-text-primary dark:text-dark-text-primary font-medium">Dashboard</span>
        </>
      )}
    </div>
  )
}
