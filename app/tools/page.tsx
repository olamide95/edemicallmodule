"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"

export default function ToolsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toolsSubmodules = [
    {
      title: "Form Builder",
      image: "/form-builder.png",
      href: "/tools/form",
      description: "Create dynamic forms with drag-and-drop functionality for data collection and user input.",
    },
    {
      title: "Role Permission Manager",
      image: "/permission-manager.png",
      href: "/tools/role-permission-manager",
      description: "Manage user roles and permissions to control access to different parts of the system.",
    },
    {
      title: "Webform",
      image: "/webform.png",
      href: "/tools/webform",
      description: "Build and deploy web forms for external users with customizable fields and validation.",
    },
    {
      title: "Webpage",
      image: "/webpage.png",
      href: "/tools/webpage",
      description: "Create and manage web pages with content management and layout customization tools.",
    },
    {
      title: "Report Designer",
      image: "/placeholder.svg?height=48&width=48&query=report+designer+icon",
      href: "/tools/report-designer",
      description: "Design custom reports with advanced formatting and data visualization options.",
    },
    {
      title: "Print Designer",
      image: "/placeholder.svg?height=48&width=48&query=print+designer+icon",
      href: "/tools/print-designer",
      description: "Create print-ready documents and templates with professional layout tools.",
    },
    {
      title: "Workflow",
      image: "/workflow.png",
      href: "/tools/workflow",
      description: "Automate business processes with customizable workflow rules and approval chains.",
    },
    {
      title: "Dashboard Builder",
      image: "/dashboard-builder.png",
      href: "/tools/dashboard-builder",
      description: "Build interactive dashboards with charts, widgets, and real-time data visualization.",
    },
    {
      title: "Report & Analytics",
      image: "/placeholder.svg?height=48&width=48&query=analytics+report+icon",
      href: "/tools/report-analytics",
      description: "Generate comprehensive reports and analytics with advanced data insights.",
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={theme === "dark" ? "/tools-header-illustration-dark-new.png" : "/tools-header-illustration.png"}
                alt="Tools Header"
                width={1200}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Tools Submodules Container */}
          <div
            className="bg-white dark:bg-[#312D4B] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] mb-6"
            style={{
              imageRendering: "crisp-edges",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              shapeRendering: "crispEdges",
              textRendering: "geometricPrecision",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            {/* Title Background */}
            <div className="bg-[#F4F5FA] dark:bg-[#3D3759] h-[46px] flex items-center px-6 rounded-t-lg">
              <h2 className="text-xl font-bold text-[#2E263D] dark:text-[rgba(231,227,252,0.9)]">Tools</h2>
            </div>

            {/* Submodules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toolsSubmodules.map((submodule, index) => (
                  <a
                    key={index}
                    href={submodule.href}
                    className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)] group"
                    style={{
                      imageRendering: "crisp-edges",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                      shapeRendering: "crispEdges",
                      textRendering: "geometricPrecision",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                    title={submodule.description}
                  >
                    <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                      <Image
                        src={submodule.image || "/placeholder.svg"}
                        alt={submodule.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                      {submodule.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          </div>
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
