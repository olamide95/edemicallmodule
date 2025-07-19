"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"


interface DashboardPageProps {
  params: { role: string }
}

export default function RoleDashboard({ params }: DashboardPageProps) {
  const router = useRouter()

  useEffect(() => {
    // Store the role and redirect to main dashboard
    if (params.role) {
      localStorage.setItem("userRole", params.role)
      router.push("/")
    }
  }, [params.role, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#28243D]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C57FF] mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Setting up your {params.role} dashboard...</p>
      </div>
    </div>
  )
}
