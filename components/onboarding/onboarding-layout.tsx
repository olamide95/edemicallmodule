"use client"

import React from "react"

import { type ReactNode, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Building2,
  FileSpreadsheet,
  Layers,
  Network,
  Save,
  School,
  Settings,
  Users,
  Bell,
} from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { OnboardingPreview } from "@/components/onboarding/onboarding-preview"
import { AnimatedTransition } from "@/components/onboarding/animated-transition"
import Image from "next/image"

interface OnboardingLayoutProps {
  children: ReactNode
}

const steps = [
  { id: "school-details", label: "School Details", icon: School, path: "/onboarding/onboarding/school-details" },
  { id: "branches", label: "Branches", icon: Building2, path: "/onboarding/onboarding/branches" },
  { id: "organogram", label: "Organogram", icon: Network, path: "/onboarding/onboarding/organogram" },
  { id: "employees", label: "Employees", icon: Users, path: "/onboarding/onboarding/employees" },
  { id: "classes", label: "Classes & Sections", icon: Layers, path: "/onboarding/onboarding/classes" },
  { id: "subjects", label: "Subjects", icon: FileSpreadsheet, path: "/onboarding/onboarding/subjects" },
  { id: "students", label: "Parents & Students", icon: Users, path: "/onboarding/onboarding/students" },
  { id: "sessions", label: "Session Settings", icon: Settings, path: "/onboarding/onboarding/sessions" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/onboarding/onboarding/notifications" },
]

// Create a context to share data between components
export const OnboardingContext = React.createContext<{
  schoolData: any
  updateSchoolData: (data: any) => void
}>({
  schoolData: {},
  updateSchoolData: () => {},
})

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const currentStepIndex = steps.findIndex((step) => pathname.includes(step.id))
  const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null)

  const [schoolData, setSchoolData] = useState({
    name: "Edemics International School",
    address: "123 Education Street, Learning City",
    email: "info@edemics.edu",
    phone: "+1 (555) 123-4567",
    academicYear: "2024-2025",
    country: "us",
    logo: null,
    branches: [
      {
        name: "Head Office",
        address: "123 Education Street, Learning City",
        admin: "Dr. John Principal",
        startTime: "08:00",
        startTimeTill: "08:30",
        endTimeFrom: "15:00",
        endTime: "15:30",
        recess1Start: "10:30",
        recess1End: "11:00",
        recess2Start: "13:00",
        recess2End: "13:30",
      },
      {
        name: "East Campus",
        address: "456 Knowledge Avenue, Learning City",
        admin: "Jane Director",
        startTime: "08:30",
        startTimeTill: "09:00",
        endTimeFrom: "15:30",
        endTime: "16:00",
        recess1Start: "11:00",
        recess1End: "11:30",
        recess2Start: "13:30",
        recess2End: "14:00",
      },
    ],
    departments: [
      {
        id: "dept-1",
        name: "Academic Department",
        isAcademic: true,
        type: "parent",
        parentDepartment: null,
      },
      {
        id: "dept-2",
        name: "Science Department",
        isAcademic: true,
        type: "department",
        parentDepartment: "dept-1",
      },
      {
        id: "dept-3",
        name: "Arts Department",
        isAcademic: true,
        type: "department",
        parentDepartment: "dept-1",
      },
      {
        id: "dept-4",
        name: "Administration",
        isAcademic: false,
        type: "parent",
        parentDepartment: null,
      },
    ],
    employees: [
      {
        id: "EMP001",
        name: "Dr. Robert Smith",
        email: "robert.smith@edemics.edu",
        phone: "+1 (555) 234-5678",
        department: "Science Department",
        subDepartment: "Physics",
        class: "Class 10",
        branch: "Head Office",
      },
      {
        id: "EMP002",
        name: "Ms. Sarah Johnson",
        email: "sarah.johnson@edemics.edu",
        phone: "+1 (555) 345-6789",
        department: "Arts Department",
        subDepartment: "Music",
        class: "Class 8",
        branch: "East Campus",
      },
    ],
    classes: [
      {
        name: "Class 10",
        department: "Science Department",
        branch: "Head Office",
        sections: [
          {
            name: "Section A",
            teacher: "Dr. Robert Smith",
            assistantTeacher: "Ms. Lisa Brown",
            capacity: "30",
            building: "Main Building",
            floor: "Second Floor",
            wing: "East Wing",
          },
          {
            name: "Section B",
            teacher: "Mr. James Wilson",
            assistantTeacher: "Ms. Emily Davis",
            capacity: "28",
            building: "Main Building",
            floor: "Second Floor",
            wing: "West Wing",
          },
        ],
      },
    ],
    subjects: [
      {
        code: "PHY10",
        name: "Physics",
        class: "Class 10",
        section: "Section A",
        teacher: "Dr. Robert Smith",
        assistantTeacher: "Ms. Lisa Brown",
      },
      {
        code: "CHEM10",
        name: "Chemistry",
        class: "Class 10",
        section: "Section A",
        teacher: "Dr. Michael Brown",
        assistantTeacher: "",
      },
    ],
    students: [
      {
        name: "Alex Johnson",
        admissionNumber: "ST2024001",
        class: "Class 10",
        section: "Section A",
        parents: [
          {
            name: "David Johnson",
            type: "Father",
            email: "david.johnson@example.com",
            phone: "+1 (555) 987-6543",
          },
          {
            name: "Maria Johnson",
            type: "Mother",
            email: "maria.johnson@example.com",
            phone: "+1 (555) 876-5432",
          },
        ],
      },
    ],
    sessions: [
      {
        branch: "Head Office",
        startDate: "2024-08-15",
        endDate: "2025-05-30",
      },
      {
        branch: "East Campus",
        startDate: "2024-08-20",
        endDate: "2025-06-05",
      },
    ],
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
    },
  })

  const updateSchoolData = (newData: any) => {
    // Only update if the data is actually different to prevent infinite loops
    setSchoolData((prevData) => {
      // Deep comparison to prevent unnecessary updates
      const isEqual = JSON.stringify({ ...prevData, ...newData }) === JSON.stringify(prevData)
      if (isEqual) {
        return prevData // Return the previous state if no changes
      }
      return { ...prevData, ...newData }
    })
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setAnimatingToIndex(currentStepIndex + 1)
      setTimeout(() => {
        router.push(steps[currentStepIndex + 1].path)
      }, 100)
    } else if (currentStepIndex === steps.length - 1) {
      // If we're on the last step, go to the completion page
      setTimeout(() => {
        router.push("/onboarding/onboarding/complete")
      }, 100)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setAnimatingToIndex(currentStepIndex - 1)
      setTimeout(() => {
        router.push(steps[currentStepIndex - 1].path)
      }, 100)
    }
  }

  const handleStepClick = (path: string, index: number) => {
    setAnimatingToIndex(index)
    setTimeout(() => {
      router.push(path)
    }, 100)
  }

  // Reset animating state after navigation
  useEffect(() => {
    setAnimatingToIndex(null)
  }, [pathname])

  // Calculate progress percentage
  const progressPercentage = (currentStepIndex / (steps.length - 1)) * 100

  return (
    <OnboardingContext.Provider value={{ schoolData, updateSchoolData }}>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
        <header className="border-b border-divider p-4">
          <div className="container flex items-center justify-between">
            <div className="edemics-logo">
              <Image
                src="/edemics-logo.png"
                alt="Edemics Logo"
                width={120}
                height={40}
                className="bg-transparent"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* Enhanced Wizard Steps with connecting lines and animations */}
        <div className="border-b border-divider bg-light-card dark:bg-dark-card p-6">
          <div className="container">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                Onboarding Progress
              </h2>
              <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}% Complete</span>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-secondary-bg rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Wizard steps with connecting lines between icons */}
            <div className="relative flex justify-between items-center max-w-5xl mx-auto" style={{ gap: "2rem" }}>
              {/* Render individual connecting lines between steps */}
              {steps.map((step, index) => {
                // Skip the last step as there's no line after it
                if (index === steps.length - 1) return null

                // Don't show line to the left of School Details when completed
                if (index === 0 && currentStepIndex > 0) {
                  return null
                }

                // For other steps
                if (index > 0) {
                  // Only show lines for completed steps
                  const isCompleted = index < currentStepIndex

                  // Calculate positions
                  const startPercent = (index / (steps.length - 1)) * 100
                  const endPercent = ((index + 1) / (steps.length - 1)) * 100

                  // Adjust width to not touch the circles (add 5px gap on each side)
                  const width = isCompleted ? `calc(${endPercent - startPercent}% - 40px)` : "0%"

                  return (
                    <div
                      key={`line-${index}`}
                      className="absolute top-1/2 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        left: `calc(${startPercent}% + 20px)`, // Add 5px gap
                        width: width,
                        opacity: isCompleted ? 1 : 0,
                        transform: "translateY(-4px)", // Move the line up by 2 times
                      }}
                    ></div>
                  )
                }

                return null
              })}

              {steps.map((step, index) => {
                const isActive = pathname.includes(step.id)
                const isCompleted = index < currentStepIndex
                const isPending = index > currentStepIndex
                const isAnimatingTo = animatingToIndex === index

                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <button
                      className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ease-in-out relative z-10
                        ${
                          isActive
                            ? "bg-primary text-primary-text scale-110"
                            : isCompleted
                              ? "bg-success text-white"
                              : "bg-secondary-bg text-light-text-primary dark:text-dark-text-primary"
                        }
                        ${isAnimatingTo ? "scale-125" : ""}
                      `}
                      onClick={() => handleStepClick(step.path, index)}
                      title={step.label}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-7 w-7 transition-transform duration-300 ease-bounce" />
                      ) : (
                        <step.icon className={`h-7 w-7 ${isActive ? "animate-pulse" : ""}`} />
                      )}
                    </button>

                    <span
                      className={`text-xs mt-2 font-medium whitespace-nowrap transition-all duration-300
                        ${
                          isActive
                            ? "text-primary scale-110"
                            : isCompleted
                              ? "text-success"
                              : "text-light-text-secondary dark:text-dark-text-secondary"
                        }`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Main content with animation */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">
                {steps[currentStepIndex]?.label || "Onboarding"}
              </h1>

              <AnimatedTransition>{children}</AnimatedTransition>

              <div className="mt-8 flex justify-between">
                <button
                  className="form-button-secondary transition-all duration-300 hover:scale-105"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>

                <button
                  className="form-button-primary transition-all duration-300 hover:scale-105"
                  onClick={handleNext}
                  disabled={currentStepIndex === steps.length - 1 && pathname.includes("complete")}
                >
                  {currentStepIndex === steps.length - 1 ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live preview with animation */}
          <div
            className="border-l border-divider bg-light-card dark:bg-dark-card p-4 overflow-auto"
            style={{
              width: pathname.includes("organogram") || pathname.includes("employees") ? "45%" : "33.333%",
              flex: pathname.includes("organogram") || pathname.includes("employees") ? "0 0 45%" : "0 0 33.333%",
            }}
          >
            <h2 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
              Live Preview
            </h2>
            <div className="transition-all duration-500 ease-in-out">
              <OnboardingPreview currentStep={steps[currentStepIndex]?.id} schoolData={schoolData} />
            </div>
          </div>
        </div>
      </div>
    </OnboardingContext.Provider>
  )
}
