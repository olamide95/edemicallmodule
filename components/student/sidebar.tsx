"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, GraduationCap, Calendar, BookMarked, Award, MessageSquare, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: Home,
    color: "#56CA00",
  },
  {
    title: "Courses",
    href: "/student/courses",
    icon: BookMarked,
    color: "#8C57FF",
  },
  {
    title: "Assignments",
    href: "/student/assignments",
    icon: GraduationCap,
    color: "#16B1FF",
  },
  {
    title: "Timetable",
    href: "/student/timetable",
    icon: Calendar,
    color: "#FFB400",
  },
  {
    title: "Grades",
    href: "/student/grades",
    icon: Award,
    color: "#FF4C51",
  },
  {
    title: "Chat",
    href: "/student/chat",
    icon: MessageSquare,
    color: "#8C57FF",
  },
  {
    title: "Settings",
    href: "/student/settings",
    icon: Settings,
    color: "#8A8D93",
  },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card shadow-sm">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/student/dashboard" className="flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">School Enterprise</h1>
            <p className="text-xs text-muted-foreground">Student Portal</p>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 gap-2">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Button
                key={index}
                asChild
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "flex h-10 w-full justify-start gap-3 px-4 text-sm font-medium",
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-primary dark:text-text-primary-dark hover:bg-background dark:hover:bg-background-dark",
                )}
              >
                <Link href={item.href} className="flex items-center w-full">
                  <item.icon
                    className="h-5 w-5 mr-3"
                    style={{
                      color: isActive ? "#FFFFFF" : item.color,
                    }}
                  />
                  <span>{item.title}</span>
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
