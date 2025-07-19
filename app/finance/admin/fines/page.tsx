"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FineConfiguration } from "@/components/admin/fines/fine-configuration"
import { FineAssignment } from "@/components/admin/fines/fine-assignment"
import { FineWaivers } from "@/components/admin/fines/fine-waivers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

export default function FinesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Header with Illustration */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Fine Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Finance</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Fine Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Configure and manage fines for late payments, disciplinary actions, and other violations with our comprehensive fine management system.
                </p>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/fines-illustration.png"
                  alt="Fines Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="configuration" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="configuration">Fine Configuration</TabsTrigger>
              <TabsTrigger value="assignment">Fine Assignment</TabsTrigger>
              <TabsTrigger value="waivers">Fine Waivers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="configuration">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Fine Configuration</CardTitle>
                  <CardDescription>Configure different types of fines and their calculation methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <FineConfiguration />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assignment">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Fine Assignment</CardTitle>
                  <CardDescription>Assign fines to students or classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <FineAssignment />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="waivers">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Fine Waivers</CardTitle>
                  <CardDescription>Manage fine waivers and exemptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <FineWaivers />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2 bg-light-card-bg dark:bg-dark-card-bg">
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