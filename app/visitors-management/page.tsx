"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"
import { ChevronRight, UserPlus, Users, Calendar, ClipboardList, Settings, BarChart, Bell, Shield } from "lucide-react"

export default function VisitorsManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const visitorsSubmodules = [
    {
      title: "Visitor Registration",
      icon: <UserPlus className="w-10 h-10 text-primary" />,
      href: "/visitors-management/registration",
      description: "Register new visitors, capture details, and issue visitor passes.",
    },
    {
      title: "Appointments",
      icon: <Calendar className="w-10 h-10 text-success" />,
      href: "/visitors-management/appointments",
      description: "Schedule and manage visitor appointments and meetings.",
    },
    {
      title: "Check-in/Check-out",
      icon: <ClipboardList className="w-10 h-10 text-info" />,
      href: "/visitors-management/checkin",
      description: "Track visitor entry and exit with timestamps and purpose.",
    },
    {
      title: "Host Management",
      icon: <Users className="w-10 h-10 text-warning" />,
      href: "/visitors-management/hosts",
      description: "Manage staff members who can receive visitors and approve visits.",
    },
    {
      title: "Security",
      icon: <Shield className="w-10 h-10 text-error" />,
      href: "/visitors-management/security",
      description: "Configure security protocols, ID verification, and access control.",
    },
    {
      title: "Reports & Analytics",
      icon: <BarChart className="w-10 h-10 text-primary" />,
      href: "/visitors-management/reports",
      description: "Generate visitor reports, analytics, and insights.",
    },
    {
      title: "Notifications",
      icon: <Bell className="w-10 h-10 text-info" />,
      href: "/visitors-management/notifications",
      description: "Configure alerts and notifications for hosts and security personnel.",
    },
    {
      title: "Settings",
      icon: <Settings className="w-10 h-10 text-secondary" />,
      href: "/visitors-management/settings",
      description: "Configure system parameters, policies, and workflows.",
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Visitors Management Header */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Visitors Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Apps</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Visitors Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Efficiently manage visitors to your institution — from registration and check-in to security clearance
                  and reporting. Streamline visitor processing and enhance campus security with our comprehensive
                  visitors management system.
                </p>

                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                  View Visitors Dashboard
                </button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=visitor+management+reception+illustration"
                  alt="Visitors Management Illustration"
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
                    Today's Visitors
                  </p>
                  <h3 className="text-3xl font-bold mt-1">42</h3>
                </div>
                <div className="p-2 bg-primary-light rounded-md">
                  <UserPlus className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+8</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since yesterday</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Scheduled Appointments
                  </p>
                  <h3 className="text-3xl font-bold mt-1">18</h3>
                </div>
                <div className="p-2 bg-success-light rounded-md">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+3</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since yesterday</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Currently Checked In
                  </p>
                  <h3 className="text-3xl font-bold mt-1">12</h3>
                </div>
                <div className="p-2 bg-info-light rounded-md">
                  <ClipboardList className="w-6 h-6 text-info" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-error font-medium">-2</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">in the last hour</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Monthly Visitors
                  </p>
                  <h3 className="text-3xl font-bold mt-1">845</h3>
                </div>
                <div className="p-2 bg-error-light rounded-md">
                  <BarChart className="w-6 h-6 text-error" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+12%</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">vs last month</span>
              </div>
            </div>
          </div>

          {/* Visitors Submodules Container */}
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
                Visitors Management Features
              </h2>
            </div>

            {/* Submodules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visitorsSubmodules.map((submodule, index) => (
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
