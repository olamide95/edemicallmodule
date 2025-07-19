"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { PortalSelector } from "@/components/portal-selector"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-4 lg:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center">
        <span className="text-lg font-bold">Extra-Curricular Activities</span>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <PortalSelector />
      </div>
    </header>
  )
}
