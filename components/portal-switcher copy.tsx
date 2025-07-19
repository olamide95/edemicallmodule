"use client"

import { useRouter } from "next/navigation"
import { ChevronDown, User, Users, GraduationCap, LogOut, Briefcase, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PortalType = "admin" | "parent" | "student" | "staff" | "alumni"

interface PortalSwitcherProps {
  currentPortal: PortalType
}

export function PortalSwitcher({ currentPortal }: PortalSwitcherProps) {
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

  const switchToAdmin = () => {
    router.push("/admin/dashboard")
  }

  const switchToStaff = () => {
    router.push("/staff/dashboard")
  }

  const switchToParent = () => {
    router.push("/parent/dashboard")
  }

  const switchToStudent = () => {
    router.push("/student/dashboard")
  }

  const switchToAlumni = () => {
    router.push("/alumni/dashboard")
  }

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-1 px-3 py-2 ${current.color} border-0 hover:bg-opacity-80`}
        >
          {current.icon}
          <span>{current.label}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {currentPortal !== "admin" && (
          <DropdownMenuItem onSelect={switchToAdmin} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            <span>Switch to Admin Portal</span>
          </DropdownMenuItem>
        )}

        {currentPortal !== "staff" && (
          <DropdownMenuItem onSelect={switchToStaff} className="cursor-pointer">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>Switch to Staff Portal</span>
          </DropdownMenuItem>
        )}

        {currentPortal !== "parent" && (
          <DropdownMenuItem onSelect={switchToParent} className="cursor-pointer">
            <Users className="h-4 w-4 mr-2" />
            <span>Switch to Parent Portal</span>
          </DropdownMenuItem>
        )}

        {currentPortal !== "student" && (
          <DropdownMenuItem onSelect={switchToStudent} className="cursor-pointer">
            <GraduationCap className="h-4 w-4 mr-2" />
            <span>Switch to Student Portal</span>
          </DropdownMenuItem>
        )}

        {currentPortal !== "alumni" && (
          <DropdownMenuItem onSelect={switchToAlumni} className="cursor-pointer">
            <Award className="h-4 w-4 mr-2" />
            <span>Switch to Alumni Portal</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
