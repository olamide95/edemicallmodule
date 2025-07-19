"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SimplePortalSwitcher } from "@/components/simple-portal-switcher"
import { ChatIcon } from "@/components/chat/chat-icon"

export function StudentHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/student/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl hidden md:inline-block">EduFinance Student</span>
            <span className="font-bold text-xl md:hidden">EFS</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ChatIcon />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <SimplePortalSwitcher currentPortal="student" />
          <Avatar>
            <AvatarImage src="/diverse-students-studying.png" alt="Student" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
