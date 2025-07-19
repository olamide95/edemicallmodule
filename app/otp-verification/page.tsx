"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      const userRole = localStorage.getItem("userRole") || "admin"
      router.push(`../dashboard/${userRole}`)
    }, 1000)
  }

  const handleResendOTP = () => {
    if (resendTimer > 0) return

    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#F4F5FA] dark:bg-[#28243D]">
        <div className="absolute top-6 left-6 z-10">
          <Logo collapsed={false} />
        </div>

        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-center w-full h-full p-8">
          <div className="relative w-full max-w-lg">
            <Image
              src="/otp-illustration.png"
              alt="OTP Verification Illustration"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-[#312D4B]">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo and Theme Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Logo collapsed={false} />
            <ThemeToggle />
          </div>

          {/* Back Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Login
          </Link>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Two Step Verification 💬</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">******1234</p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type your 6 digit security code
              </label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8C57FF] hover:bg-[#7C3AED] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify my account"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center">
            <span className="text-gray-600 dark:text-gray-400">Didn't get the code? </span>
            <button
              onClick={handleResendOTP}
              disabled={resendTimer > 0}
              className="text-[#8C57FF] hover:text-[#7C3AED] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
