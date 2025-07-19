"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the home page where users can select a portal
    router.push("/")
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting...</h1>
        <p className="text-muted-foreground">Please wait</p>
      </div>
    </div>
  )
}
