"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  BookOpenIcon,
  CalendarIcon,
  GraduationCapIcon,
  HomeIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  Settings2Icon,
  UsersIcon,
  TruckIcon,
  FileTextIcon,
  ClipboardListIcon,
  DollarSignIcon,
} from "lucide-react"

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
  portal: "admin" | "student" | "parent" | "supplier" | "all"
}

const navLinks: NavLink[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/clubs",
    label: "Clubs",
    icon: <BookOpenIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/enrollments",
    label: "Enrollments",
    icon: <UsersIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/unenrollments",
    label: "Unenrollments",
    icon: <ClipboardListIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/change-club",
    label: "Change Club",
    icon: <CalendarIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    icon: <ListChecksIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/performance",
    label: "Performance",
    icon: <GraduationCapIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/accounting",
    label: "Accounting",
    icon: <DollarSignIcon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: <Settings2Icon className="h-5 w-5" />,
    portal: "admin",
  },
  {
    href: "/parent/dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    portal: "parent",
  },
  {
    href: "/parent/enrollments",
    label: "Enrollments",
    icon: <BookOpenIcon className="h-5 w-5" />,
    portal: "parent",
  },
  {
    href: "/parent/club-change",
    label: "Change Club",
    icon: <CalendarIcon className="h-5 w-5" />,
    portal: "parent",
  },
  {
    href: "/parent/performance",
    label: "Performance",
    icon: <FileTextIcon className="h-5 w-5" />,
    portal: "parent",
  },
  {
    href: "/student/dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    portal: "student",
  },
  {
    href: "/student/clubs",
    label: "My Clubs",
    icon: <BookOpenIcon className="h-5 w-5" />,
    portal: "student",
  },
  {
    href: "/student/performance",
    label: "Performance",
    icon: <GraduationCapIcon className="h-5 w-5" />,
    portal: "student",
  },
  {
    href: "/supplier/dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    portal: "supplier",
  },
  {
    href: "/supplier/enrollments",
    label: "Enrollments",
    icon: <UsersIcon className="h-5 w-5" />,
    portal: "supplier",
  },
  {
    href: "/supplier/attendance",
    label: "Attendance",
    icon: <ListChecksIcon className="h-5 w-5" />,
    portal: "supplier",
  },
  {
    href: "/supplier/invoices",
    label: "Invoices",
    icon: <TruckIcon className="h-5 w-5" />,
    portal: "supplier",
  },
  {
    href: "/supplier/performance",
    label: "Performance",
    icon: <FileTextIcon className="h-5 w-5" />,
    portal: "supplier",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  // Determine which portal we're in
  let portalType: "admin" | "student" | "parent" | "supplier" | "all" = "all"

  if (pathname?.includes("/admin")) {
    portalType = "admin"
  } else if (pathname?.includes("/student")) {
    portalType = "student"
  } else if (pathname?.includes("/parent")) {
    portalType = "parent"
  } else if (pathname?.includes("/supplier")) {
    portalType = "supplier"
  }

  // Filter links by portal type
  const filteredLinks = navLinks.filter((link) => link.portal === portalType || link.portal === "all")

  return (
    <aside className="fixed inset-y-0 left-0 z-20 mt-16 hidden w-64 border-r bg-card text-card-foreground lg:block">
      <div className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-4">
        <nav className="space-y-1">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
