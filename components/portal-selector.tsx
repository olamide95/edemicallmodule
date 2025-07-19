"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, ShieldIcon, UserIcon, UsersIcon, TruckIcon } from "lucide-react"

type Portal = {
  id: string
  name: string
  path: string
  icon: React.ReactNode
}

const portals: Portal[] = [
  {
    id: "admin",
    name: "Admin/Teacher Portal",
    path: "/admin/dashboard",
    icon: <ShieldIcon className="h-4 w-4 mr-2" />,
  },
  {
    id: "parent",
    name: "Parent Portal",
    path: "/parent/dashboard",
    icon: <UsersIcon className="h-4 w-4 mr-2" />,
  },
  {
    id: "student",
    name: "Student Portal",
    path: "/student/dashboard",
    icon: <UserIcon className="h-4 w-4 mr-2" />,
  },
  {
    id: "supplier",
    name: "Supplier Portal",
    path: "/supplier/dashboard",
    icon: <TruckIcon className="h-4 w-4 mr-2" />,
  },
]

export function PortalSelector() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const getCurrentPortal = () => {
    // Get current path
    const path = window.location.pathname

    if (path.includes("/admin")) {
      return portals.find((p) => p.id === "admin")
    } else if (path.includes("/parent")) {
      return portals.find((p) => p.id === "parent")
    } else if (path.includes("/student")) {
      return portals.find((p) => p.id === "student")
    } else if (path.includes("/supplier")) {
      return portals.find((p) => p.id === "supplier")
    }

    return portals[0] // Default to admin
  }

  const handlePortalChange = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  const currentPortal = getCurrentPortal()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentPortal?.icon}
          {currentPortal?.name}
          <ChevronDownIcon className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {portals.map((portal) => (
          <DropdownMenuItem
            key={portal.id}
            onClick={() => handlePortalChange(portal.path)}
            className="flex items-center cursor-pointer"
          >
            {portal.icon}
            {portal.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
