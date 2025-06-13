"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"

export default function AcademicSetupPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* New Header with Illustration - Shadow Removed */}
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={theme === "dark" ? "/academic-setup-header-dark.png" : "/academic-setup-header-light.png"}
                alt="Academic Setup and Configuration"
                width={1200}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Submodules Container */}
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
              <h2 className="text-xl font-bold text-[#2E263D] dark:text-[rgba(231,227,252,0.9)]">
                Academic Setup and Configuration
              </h2>
            </div>

            {/* Submodules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <a
                  href="/academic-setup/configuration"
                  className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
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
                  <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                    <Image
                      src="/academic-configuration-icon.png"
                      alt="Academic Configuration"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                    Academic Configuration
                  </h3>
                </a>

                <a
                  href="/academic-setup/uploads"
                  className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
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
                  <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                    <Image src="/uploads-icon.png" alt="Uploads" width={48} height={48} className="object-contain" />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                    Uploads
                  </h3>
                </a>

                <a
                  href="/academic-setup/publish-report-card"
                  className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
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
                  <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                    <Image
                      src="/publish-report-card-icon.png"
                      alt="Publish Report Card"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                    Publish Report Card
                  </h3>
                </a>

                <a
                  href="/academic-setup/classes-subjects"
                  className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
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
                  <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                    <Image
                      src="/classes-subjects-icon.png"
                      alt="Classes and Subjects"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                    Classes and Subjects
                  </h3>
                </a>

                <a
                  href="/academic-setup/create-student"
                  className="bg-[#F4F5FA] dark:bg-[#28243D] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
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
                  <div className="flex items-center justify-center h-16 w-16 overflow-hidden">
                    <Image
                      src="/create-student-icon.png"
                      alt="Create Student"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                    Create Student
                  </h3>
                </a>
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
