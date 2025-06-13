"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Building2, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Portal {
  id: string
  name: string
  description: string
  path: string
}

const portals: Portal[] = [
  {
    id: "admin",
    name: "Admin Portal",
    description: "Full system administration",
    path: "/dashboard/admin",
  },
  {
    id: "teacher",
    name: "Teacher Portal",
    description: "Academic management",
    path: "/dashboard/teacher",
  },
  {
    id: "parent",
    name: "Parent Portal",
    description: "Student progress tracking",
    path: "/dashboard/parent",
  },
  {
    id: "student",
    name: "Student Portal",
    description: "Learning dashboard",
    path: "/dashboard/student",
  },
  {
    id: "alumni",
    name: "Alumni Portal",
    description: "Alumni network",
    path: "/dashboard/alumni",
  },
]

export function PortalSwitcher() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentPortal, setCurrentPortal] = useState("admin")

  useEffect(() => {
    // Get current portal from localStorage
    const storedRole = localStorage.getItem("userRole") || "admin"
    setCurrentPortal(storedRole)
  }, [])

  const handlePortalSwitch = (portal: Portal) => {
    setCurrentPortal(portal.id)
    localStorage.setItem("userRole", portal.id)
    router.push(portal.path)
    setIsOpen(false)
  }

  const getCurrentPortal = () => {
    return portals.find((p) => p.id === currentPortal) || portals[0]
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg bg-light-card-bg dark:bg-dark-card-bg border border-divider hover:bg-primary-light transition-colors focus:outline-none">
        <Building2 size={16} className="text-primary" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            {getCurrentPortal().name}
          </span>
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Switch Portal</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-light-text-secondary dark:text-dark-text-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64 bg-light-card-bg dark:bg-dark-card-bg border border-divider">
        <DropdownMenuLabel className="text-light-text-primary dark:text-dark-text-primary">
          Available Portals
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-divider" />

        {portals.map((portal) => (
          <DropdownMenuItem
            key={portal.id}
            onClick={() => handlePortalSwitch(portal)}
            className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${
              currentPortal === portal.id
                ? "bg-primary-light text-primary"
                : "text-light-text-primary dark:text-dark-text-primary hover:bg-primary-light"
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <Building2 size={16} />
              <span className="font-medium">{portal.name}</span>
              {currentPortal === portal.id && (
                <span className="ml-auto text-xs bg-primary text-white px-2 py-1 rounded">Current</span>
              )}
            </div>
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-6">
              {portal.description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
