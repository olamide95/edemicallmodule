"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bus,
  Settings,
  Users,
  Map,
  CreditCard,
  ClipboardList,
  MessageSquare,
  Bell,
  UserCheck,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatPopout } from "@/components/chat-popout"
import { useState } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Bus className="mr-2 h-4 w-4" />,
    },
    {
      name: "Buses",
      href: "/buses",
      icon: <Bus className="mr-2 h-4 w-4" />,
    },
    {
      name: "Staff",
      href: "/staff",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: "Routes & Stops",
      href: "/routes",
      icon: <Map className="mr-2 h-4 w-4" />,
    },
    {
      name: "Fees",
      href: "/fees",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      name: "Enrollments",
      href: "/enrollments",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      name: "Bus Tracking",
      href: "/admin/tracking",
      icon: <Map className="mr-2 h-4 w-4" />,
    },
    {
      name: "Pickup & Dropoff",
      href: "/admin/register",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "Authorized Agents",
      href: "/admin/agents",
      icon: <UserCheck className="mr-2 h-4 w-4" />,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-20 w-64 flex-col border-r border-card bg-card flex">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-card">
          <h1 className="text-xl font-bold text-primary-custom">School Bus Module</h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === route.href
                    ? "bg-primary-light text-primary-solid"
                    : "text-primary-custom hover:bg-primary-light hover:text-primary-solid",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <Button size="icon" className="rounded-full btn-primary shadow-lg" onClick={() => setIsChatOpen(!isChatOpen)}>
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
      {isChatOpen && <ChatPopout onClose={() => setIsChatOpen(false)} />}
    </>
  )
}
