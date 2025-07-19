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
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

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

export const OnboardingContext = React.createContext<{
  schoolData: any
  updateSchoolData: (data: any) => Promise<void>
}>({
  schoolData: {},
  updateSchoolData: async () => {},
})

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const currentStepIndex = steps.findIndex((step) => pathname.includes(step.id))
  const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [schoolData, setSchoolData] = useState<any>({})

  // Load school data from backend
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/school')
        if (response.success) {
          setSchoolData(response.data || {})
        } else {
          throw new Error(response.error || "Failed to fetch school data")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load school data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchoolData()
  }, [])

  const updateSchoolData = async (newData: any) => {
    try {
      setIsLoading(true)
      // Update local state first for immediate UI feedback
      setSchoolData((prev: any) => ({ ...prev, ...newData }))
      
      // Send update to backend
      const response = await api.put('/school-setup/school', newData)
      if (!response.success) {
        throw new Error(response.error || "Failed to update school data")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update school data",
        variant: "destructive",
      })
      // Revert local changes if update fails
      setSchoolData((prev: any) => ({ ...prev }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setAnimatingToIndex(currentStepIndex + 1)
      setTimeout(() => {
        router.push(steps[currentStepIndex + 1].path)
      }, 100)
    } else if (currentStepIndex === steps.length - 1) {
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

  useEffect(() => {
    setAnimatingToIndex(null)
  }, [pathname])

  const progressPercentage = (currentStepIndex / (steps.length - 1)) * 100

  if (isLoading && !schoolData.name) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-light-text-primary dark:text-dark-text-primary">Loading school data...</p>
        </div>
      </div>
    )
  }

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

        <div className="border-b border-divider bg-light-card dark:bg-dark-card p-6">
          <div className="container">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                Onboarding Progress
              </h2>
              <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}% Complete</span>
            </div>

            <div className="h-1 w-full bg-secondary-bg rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="relative flex justify-between items-center max-w-5xl mx-auto" style={{ gap: "2rem" }}>
              {steps.map((step, index) => {
                if (index === steps.length - 1) return null
                if (index === 0 && currentStepIndex > 0) return null

                if (index > 0) {
                  const isCompleted = index < currentStepIndex
                  const startPercent = (index / (steps.length - 1)) * 100
                  const endPercent = ((index + 1) / (steps.length - 1)) * 100
                  const width = isCompleted ? `calc(${endPercent - startPercent}% - 40px)` : "0%"

                  return (
                    <div
                      key={`line-${index}`}
                      className="absolute top-1/2 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        left: `calc(${startPercent}% + 20px)`,
                        width: width,
                        opacity: isCompleted ? 1 : 0,
                        transform: "translateY(-4px)",
                      }}
                    ></div>
                  )
                }

                return null
              })}

              {steps.map((step, index) => {
                const isActive = pathname.includes(step.id)
                const isCompleted = index < currentStepIndex
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
                      disabled={isLoading}
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
                  disabled={currentStepIndex === 0 || isLoading}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>

                <button
                  className="form-button-primary transition-all duration-300 hover:scale-105"
                  onClick={handleNext}
                  disabled={(currentStepIndex === steps.length - 1 && pathname.includes("complete")) || isLoading}
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