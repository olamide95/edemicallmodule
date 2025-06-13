"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"
import { ChevronRight, Calendar, Users, BookOpen, ClipboardList, Settings, DollarSign, Bell, Award } from "lucide-react"

export default function AfterSchoolPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const afterSchoolSubmodules = [
    {
      title: "Programs",
      icon: <Award className="w-10 h-10 text-primary" />,
      href: "/after-school/programs",
      description: "Manage after-school programs, activities, and schedules.",
    },
    {
      title: "Enrollment",
      icon: <Users className="w-10 h-10 text-success" />,
      href: "/after-school/enrollment",
      description: "Manage student enrollment, attendance, and participation.",
    },
    {
      title: "Instructors",
      icon: <BookOpen className="w-10 h-10 text-info" />,
      href: "/after-school/instructors",
      description: "Manage program instructors, schedules, and qualifications.",
    },
    {
      title: "Scheduling",
      icon: <Calendar className="w-10 h-10 text-warning" />,
      href: "/after-school/scheduling",
      description: "Create and manage program schedules, venues, and resources.",
    },
    {
      title: "Attendance",
      icon: <ClipboardList className="w-10 h-10 text-error" />,
      href: "/after-school/attendance",
      description: "Track student attendance and participation in programs.",
    },
    {
      title: "Billing",
      icon: <DollarSign className="w-10 h-10 text-primary" />,
      href: "/after-school/billing",
      description: "Manage program fees, payments, and financial records.",
    },
    {
      title: "Communication",
      icon: <Bell className="w-10 h-10 text-info" />,
      href: "/after-school/communication",
      description: "Send notifications to parents, students, and instructors.",
    },
    {
      title: "Settings",
      icon: <Settings className="w-10 h-10 text-secondary" />,
      href: "/after-school/settings",
      description: "Configure program policies, rules, and system parameters.",
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* After School Header */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">After School Programs</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Apps</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">After School</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Manage your institution's after-school programs — from enrollment and scheduling to attendance
                  tracking and billing. Streamline program operations and enhance the educational experience with our
                  comprehensive after-school program management system.
                </p>

                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                  View Programs Dashboard
                </button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=after+school+activities+illustration"
                  alt="After School Programs Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Active Programs
                  </p>
                  <h3 className="text-3xl font-bold mt-1">24</h3>
                </div>
                <div className="p-2 bg-primary-light rounded-md">
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+3</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last term</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Enrolled Students
                  </p>
                  <h3 className="text-3xl font-bold mt-1">487</h3>
                </div>
                <div className="p-2 bg-success-light rounded-md">
                  <Users className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+42</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last month</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Active Instructors
                  </p>
                  <h3 className="text-3xl font-bold mt-1">32</h3>
                </div>
                <div className="p-2 bg-info-light rounded-md">
                  <BookOpen className="w-6 h-6 text-info" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+5</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last term</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Monthly Revenue
                  </p>
                  <h3 className="text-3xl font-bold mt-1">$18.5K</h3>
                </div>
                <div className="p-2 bg-error-light rounded-md">
                  <DollarSign className="w-6 h-6 text-error" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+$2.3K</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last month</span>
              </div>
            </div>
          </div>

          {/* After School Submodules Container */}
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
                After School Program Features
              </h2>
            </div>

            {/* Submodules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {afterSchoolSubmodules.map((submodule, index) => (
                  <Link
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
                    <div className="flex items-center justify-center h-16 w-16 overflow-hidden">{submodule.icon}</div>
                    <h3 className="text-center text-base font-bold text-[#2E263D] dark:text-white antialiased">
                      {submodule.title}
                    </h3>
                  </Link>
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
