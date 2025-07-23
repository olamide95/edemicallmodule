"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight } from "lucide-react"
import { ConfettiCanvas } from "@/components/confetti/confetti-canvas"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function OnboardingComplete() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const { schoolData } = useContext(OnboardingContext)

  // Get admin name from the head office branch
  const adminName =
    schoolData.branches && schoolData.branches.length > 0 ? schoolData.branches[0].admin : "Administrator"

  useEffect(() => {
    // Trigger confetti after a short delay
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true)
    }, 500)

    // Trigger items animation after confetti starts
    const animationTimer = setTimeout(() => {
      setAnimateItems(true)
    }, 800)

    return () => {
      clearTimeout(confettiTimer)
      clearTimeout(animationTimer)
    }
  }, [])

  const handleGoToDashboard = async () => {
    try {
      setIsCompleting(true)
      // Mark onboarding as complete
      const response = await api.post('/school-setup/onboarding/complete',)
      if (response.success) {
        toast({
          title: "Success",
          description: "Onboarding completed successfully!",
        })
        const userRole = localStorage.getItem("userRole") || "admin"
        router.push(`/dashboard/${userRole}`)
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete onboarding",
        variant: "destructive",
      })
      // Still redirect even if there's an error
      const userRole = localStorage.getItem("userRole") || "admin"
      router.push(`/dashboard/${userRole}`)
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
      {showConfetti && <ConfettiCanvas />}

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
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div
          className={`max-w-3xl w-full bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transition-all duration-700 ${
            animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div
                className={`w-20 h-20 rounded-full bg-success flex items-center justify-center transition-all duration-1000 ${
                  animateItems ? "scale-100" : "scale-0"
                }`}
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1
              className={`text-3xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary transition-all duration-700 delay-100 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Onboarding Complete!
            </h1>
            <p
              className={`text-lg mb-4 text-light-text-secondary dark:text-dark-text-secondary transition-all duration-700 delay-200 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Congratulations, <span className="font-semibold text-primary">{adminName}</span>! You've successfully set
              up <span className="font-semibold text-primary">{schoolData.name}</span> in Edemics ERP.
            </p>
            <p
              className={`text-md mb-8 text-light-text-secondary dark:text-dark-text-secondary transition-all duration-700 delay-250 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              You're now ready to start managing your school more efficiently.
            </p>

            <div
              className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Image src="/colorful-celebration.png" alt="Celebration" width={300} height={200} className="mx-auto" />
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-700 delay-400 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">School Details</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Your school profile and branches are set up and ready.
                </p>
              </div>
              <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">Academic Structure</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Classes, subjects, and departments are configured.
                </p>
              </div>
              <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">People</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Students, parents, and staff are ready to be managed.
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-500 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <button
                onClick={handleGoToDashboard}
                className="form-button-primary mx-auto px-8 hover:scale-105 transition-transform"
                disabled={isCompleting}
              >
                {isCompleting ? "Completing..." : "Go to Dashboard"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}