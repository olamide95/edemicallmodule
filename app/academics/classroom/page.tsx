"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FeatureCard } from "@/components/feature-card"
import {
  PromotionTransferIcon,
  WelcomeMessageIcon,
  ClassAttendanceIcon,
  ParentCommunicationIcon,
  ClassTimetableIcon,
  AcademicActivityIcon,
  IEPIcon,
  PhotoGalleryIcon,
  HappyMomentIcon,
  ReportIcon,
} from "@/components/classroom-icons"

interface ClassroomFeature {
  title: string
  icon: React.ReactNode
  href: string
}

const classroomFeatures: ClassroomFeature[] = [
  {
    title: "Promotion & Transfer",
    icon: <PromotionTransferIcon />,
    href: "/academics/classroom/promotion-transfer",
  },
  {
    title: "Welcome Message",
    icon: <WelcomeMessageIcon />,
    href: "/academics/classroom/welcome-message",
  },
  {
    title: "Class Attendance",
    icon: <ClassAttendanceIcon />,
    href: "/academics/classroom/attendance",
  },
  {
    title: "Parent Communication",
    icon: <ParentCommunicationIcon />,
    href: "/academics/classroom/parent-communication",
  },
  {
    title: "Class Timetable",
    icon: <ClassTimetableIcon />,
    href: "/academics/classroom/timetable",
  },
  {
    title: "Academic Activity",
    icon: <AcademicActivityIcon />,
    href: "/academics/classroom/academic-activity",
  },
  {
    title: "IEP",
    icon: <IEPIcon />,
    href: "/academics/classroom/iep",
  },
  {
    title: "Photo Gallery",
    icon: <PhotoGalleryIcon />,
    href: "/academics/classroom/photo-gallery",
  },
  {
    title: "Happy Moment",
    icon: <HappyMomentIcon />,
    href: "/academics/classroom/happy-moment",
  },
  {
    title: "Report",
    icon: <ReportIcon />,
    href: "/academics/classroom/report",
  },
]

export default function ClassroomPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Classroom</h1>
          </div>

          {/* Features Grid */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-2xl p-8 shadow-sm border border-divider">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {classroomFeatures.map((feature, index) => (
                <FeatureCard key={feature.title} title={feature.title} icon={feature.icon} href={feature.href} />
              ))}
            </div>
          </div>
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
