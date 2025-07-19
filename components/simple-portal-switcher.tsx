"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, User, Users, GraduationCap, LogOut, Briefcase, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

type PortalType = "admin" | "parent" | "student" | "staff" | "alumni"

interface SimplePortalSwitcherProps {
  currentPortal: PortalType
}

export function SimplePortalSwitcher({ currentPortal }: SimplePortalSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const portalInfo = {
    admin: {
      label: "Admin Portal",
      icon: <User className="h-4 w-4 mr-2" />,
      color: "bg-blue-100 text-blue-700",
    },
    staff: {
      label: "Staff Portal",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      color: "bg-green-100 text-green-700",
    },
    parent: {
      label: "Parent Portal",
      icon: <Users className="h-4 w-4 mr-2" />,
      color: "bg-purple-100 text-purple-700",
    },
    student: {
      label: "Student Portal",
      icon: <GraduationCap className="h-4 w-4 mr-2" />,
      color: "bg-green-100 text-green-700",
    },
    alumni: {
      label: "Alumni Portal",
      icon: <Award className="h-4 w-4 mr-2" />,
      color: "bg-amber-100 text-amber-700",
    },
  }

  const current = portalInfo[currentPortal]

  const handlePortalSwitch = (portal: string) => {
    setIsOpen(false)
    router.push(`/${portal}/dashboard`)
  }

  const handleLogout = () => {
    setIsOpen(false)
    router.push("/login")
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 px-3 py-2 ${current.color} border-0 hover:bg-opacity-80`}
      >
        {current.icon}
        <span>{current.label}</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {currentPortal !== "admin" && (
              <button
                onClick={() => handlePortalSwitch("admin")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <User className="h-4 w-4 mr-2" />
                <span>Switch to Admin Portal</span>
              </button>
            )}

            {currentPortal !== "staff" && (
              <button
                onClick={() => handlePortalSwitch("staff")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Switch to Staff Portal</span>
              </button>
            )}

            {currentPortal !== "parent" && (
              <button
                onClick={() => handlePortalSwitch("parent")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Switch to Parent Portal</span>
              </button>
            )}

            {currentPortal !== "student" && (
              <button
                onClick={() => handlePortalSwitch("student")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>Switch to Student Portal</span>
              </button>
            )}

            {currentPortal !== "alumni" && (
              <button
                onClick={() => handlePortalSwitch("alumni")}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <Award className="h-4 w-4 mr-2" />
                <span>Switch to Alumni Portal</span>
              </button>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
