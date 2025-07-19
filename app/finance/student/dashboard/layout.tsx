import type { ReactNode } from "react"
import { StudentSidebar } from "@/components/student/sidebar"
import { StudentHeader } from "@/components/student/header"

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <StudentHeader />
      <div className="flex">
        <StudentSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
