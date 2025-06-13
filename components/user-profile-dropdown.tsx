"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Edit, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfileDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("userRole")
    localStorage.removeItem("authToken")

    // Redirect to login page
    router.push("/login")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full hover:bg-primary-light transition-colors focus:outline-none">
        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
          U
        </div>
        <ChevronDown
          size={16}
          className={`text-light-text-primary dark:text-dark-text-primary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-light-card-bg dark:bg-dark-card-bg border border-divider">
        <DropdownMenuLabel className="text-light-text-primary dark:text-dark-text-primary">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-divider" />

        <DropdownMenuItem
          onClick={handleEditProfile}
          className="flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary hover:bg-primary-light cursor-pointer"
        >
          <Edit size={16} />
          Edit Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSettings}
          className="flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary hover:bg-primary-light cursor-pointer"
        >
          <Settings size={16} />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-divider" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-error hover:bg-error/10 cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
