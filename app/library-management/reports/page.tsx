"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { LibraryAnalytics } from "@/components/library/library-analytics"
import { MemberReadingAnalytics } from "@/components/library/member-reading-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LibraryReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-4">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="overview">Library Overview</TabsTrigger>
                <TabsTrigger value="reading-habits">Reading Habits</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-0">
              <LibraryAnalytics />
            </TabsContent>

            <TabsContent value="reading-habits" className="mt-0">
              <MemberReadingAnalytics />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
