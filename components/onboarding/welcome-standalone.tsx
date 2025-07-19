"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function WelcomePageStandalone() {
  const router = useRouter()
  const [animateElements, setAnimateElements] = useState(false)
  const [animateButton, setAnimateButton] = useState(false)
  const [animateText, setAnimateText] = useState(false)

  useEffect(() => {
    // Apply theme from localStorage on component mount
    const theme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light"

    // Trigger animations in sequence
    setTimeout(() => setAnimateElements(true), 300)
    setTimeout(() => setAnimateText(true), 800)
    setTimeout(() => setAnimateButton(true), 1200)
  }, [])

  const handleStartOnboarding = () => {
    router.push("/onboarding/onboarding/school-details")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with illustration */}
      <div className="w-full lg:w-3/5 bg-[#F4F5FA] dark:bg-[#28243D] flex flex-col">
        <div className="p-8 flex justify-between">
          <div className="edemics-logo">
            <Image
              src="/edemics-logo.png"
              alt="Edemics Logo"
              width={120}
              height={40}
              className="bg-transparent"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <ModeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="relative w-full max-w-xl mx-auto">
            {/* Main illustration with animations */}
            <div className={`transition-all duration-1000 ${animateElements ? "opacity-100" : "opacity-0"}`}>
              <Image
                src="/welcome-illustration.png"
                alt="Welcome Illustration"
                width={600}
                height={600}
                className="mx-auto bg-transparent"
                style={{ backgroundColor: "transparent" }}
                priority
              />
            </div>

            {/* Animated elements */}
            <div
              className={`absolute top-1/4 left-1/4 transition-all duration-700 delay-300 ${
                animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-float">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </div>

            <div
              className={`absolute top-1/3 right-1/4 transition-all duration-700 delay-500 ${
                animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-14 h-14 bg-[#56CA00] rounded-full flex items-center justify-center animate-float-delay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
            </div>

            <div
              className={`absolute bottom-1/3 left-1/3 transition-all duration-700 delay-700 ${
                animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-12 h-12 bg-[#FF4C51] rounded-full flex items-center justify-center animate-float-delay-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with content */}
      <div className="hidden lg:flex lg:w-2/5 bg-white dark:bg-[#312D4B] flex-col justify-center p-12">
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div
              className={`transition-all duration-700 ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-2xl font-medium text-[#2E263D] dark:text-white">
                "Welcome aboard! Start your seamless onboarding journey and embark on a path to success with us!"
              </h1>
            </div>

            <button
              onClick={handleStartOnboarding}
              className={`w-full py-3 px-4 bg-[#8C57FF] text-white rounded-md hover:bg-[#7E57C2] transition-all duration-500 ${
                animateButton ? "opacity-100 translate-y-0 animate-pulse" : "opacity-0 translate-y-10"
              }`}
            >
              click to start your onboarding
            </button>

            <div
              className={`text-center transition-all duration-700 delay-300 ${
                animateButton ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-sm text-[#2E263D] dark:text-gray-300">
                Didn't get the mail? <button className="text-[#8C57FF] hover:underline">Resend</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view for the right side content */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-[#312D4B] p-6 rounded-t-3xl shadow-lg">
        <div className="space-y-4">
          <h1
            className={`text-xl font-medium text-[#2E263D] dark:text-white transition-all duration-700 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            "Welcome aboard! Start your seamless onboarding journey and embark on a path to success with us!"
          </h1>

          <button
            onClick={handleStartOnboarding}
            className={`w-full py-3 px-4 bg-[#8C57FF] text-white rounded-md hover:bg-[#7E57C2] transition-all duration-500 ${
              animateButton ? "opacity-100 translate-y-0 animate-pulse" : "opacity-0 translate-y-10"
            }`}
          >
            click to start your onboarding
          </button>

          <div
            className={`text-center transition-all duration-700 delay-300 ${
              animateButton ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm text-[#2E263D] dark:text-gray-300">
              Didn't get the mail? <button className="text-[#8C57FF] hover:underline">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
