import type React from "react"
import { AlumniSidebar } from "@/components/alumni/sidebar"
import { PortalSwitcher } from "@/components/portal-switcher"

export default function AlumniDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AlumniSidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">Alumni Dashboard</h1>
          <PortalSwitcher currentPortal="alumni" />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
