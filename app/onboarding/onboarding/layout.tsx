"use client"

import type React from "react"
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // If we're on the welcome page, don't apply the onboarding layout
  if (pathname === "/onboarding/welcome") {
    return <>{children}</>
  }

  return <OnboardingLayout>{children}</OnboardingLayout>
}
