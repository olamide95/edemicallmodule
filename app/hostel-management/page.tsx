"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useTheme } from "@/components/theme-provider"
import { ChevronRight, Home, Users, Bed, ClipboardList, Calendar, Settings, DollarSign, Bell } from "lucide-react"

export default function HostelManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const hostelSubmodules = [
    {
      title: "Room Management",
      icon: <Home className="w-10 h-10 text-primary" />,
      href: "/hostel-management/rooms",
      description: "Manage hostel rooms, blocks, and room types with comprehensive tracking.",
    },
    {
      title: "Student Allocation",
      icon: <Users className="w-10 h-10 text-success" />,
      href: "/hostel-management/allocation",
      description: "Allocate students to rooms, manage room changes, and track occupancy.",
    },
    {
      title: "Bed Management",
      icon: <Bed className="w-10 h-10 text-info" />,
      href: "/hostel-management/beds",
      description: "Track individual beds, their conditions, and maintenance requirements.",
    },
    {
      title: "Attendance",
      icon: <ClipboardList className="w-10 h-10 text-warning" />,
      href: "/hostel-management/attendance",
      description: "Record and monitor student attendance and presence in the hostel.",
    },
    {
      title: "Leave Management",
      icon: <Calendar className="w-10 h-10 text-error" />,
      href: "/hostel-management/leave",
      description: "Manage student leave requests, approvals, and tracking.",
    },
    {
      title: "Fee Management",
      icon: <DollarSign className="w-10 h-10 text-primary" />,
      href: "/hostel-management/fees",
      description: "Track hostel fees, payments, dues, and generate invoices.",
    },
    {
      title: "Complaints",
      icon: <Bell className="w-10 h-10 text-info" />,
      href: "/hostel-management/complaints",
      description: "Manage student complaints, maintenance requests, and resolutions.",
    },
    {
      title: "Settings",
      icon: <Settings className="w-10 h-10 text-secondary" />,
      href: "/hostel-management/settings",
      description: "Configure hostel rules, policies, and system parameters.",
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Hostel Management Header */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Hostel Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Apps</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Hostel Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Efficiently manage your institution's hostels — from room allocation and attendance tracking to fee
                  management and maintenance requests. Streamline hostel operations and enhance student living
                  experience with our comprehensive hostel management system.
                </p>

                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
                  View Hostel Dashboard
                </button>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=hostel+dormitory+illustration"
                  alt="Hostel Management Illustration"
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
                    Total Rooms
                  </p>
                  <h3 className="text-3xl font-bold mt-1">248</h3>
                </div>
                <div className="p-2 bg-primary-light rounded-md">
                  <Home className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+12</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last term</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Occupancy Rate
                  </p>
                  <h3 className="text-3xl font-bold mt-1">87%</h3>
                </div>
                <div className="p-2 bg-success-light rounded-md">
                  <Users className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+5%</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last month</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Pending Requests
                  </p>
                  <h3 className="text-3xl font-bold mt-1">32</h3>
                </div>
                <div className="p-2 bg-info-light rounded-md">
                  <ClipboardList className="w-6 h-6 text-info" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-error font-medium">+8</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since yesterday</span>
              </div>
            </div>

            <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
                    Fee Collection
                  </p>
                  <h3 className="text-3xl font-bold mt-1">$42.5K</h3>
                </div>
                <div className="p-2 bg-error-light rounded-md">
                  <DollarSign className="w-6 h-6 text-error" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-success font-medium">+$4.2K</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary ml-2">since last week</span>
              </div>
            </div>
          </div>

          {/* Hostel Submodules Container */}
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
                Hostel Management Features
              </h2>
            </div>

            {/* Submodules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hostelSubmodules.map((submodule, index) => (
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
