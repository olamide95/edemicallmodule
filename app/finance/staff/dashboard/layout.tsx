import type React from "react"
import { StaffSidebar } from "@/components/staff/sidebar"
import { PortalSwitcher } from "@/components/portal-switcher"

export default function StaffDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <StaffSidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">Staff Dashboard</h1>
          <PortalSwitcher currentPortal="staff" />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
