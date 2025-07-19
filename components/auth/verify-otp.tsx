"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function VerifyOTP() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timer, setTimer] = useState(60)
  const [isResending, setIsResending] = useState(false)

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  // Apply theme from localStorage on component mount
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light"
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(0, 1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)

      // Focus the last input
      inputRefs.current[5]?.focus()
    }
  }

  const handleResendOTP = () => {
    if (timer === 0) {
      setIsResending(true)
      // Simulate OTP resend
      setTimeout(() => {
        setTimer(60)
        setIsResending(false)
      }, 1000)
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if OTP is complete
    if (otp.every((digit) => digit !== "")) {
      router.push("/welcome")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side with illustration */}
      <div className="hidden w-1/2 bg-light-bg dark:bg-dark-bg lg:flex lg:items-center lg:justify-center p-8 relative">
        <div className="absolute top-8 left-8">
          <Image
            src="/edemics-logo.png"
            alt="Edemics Logo"
            width={120}
            height={40}
            className="bg-transparent"
            style={{ backgroundColor: "transparent" }}
          />
        </div>

        <div className="absolute top-8 right-8">
          <ModeToggle />
        </div>

        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boy-with-laptop-light%201-sngSFNKe88dwwZ1PN8ExeK00dotUsC.png"
          alt="Verify OTP Illustration"
          width={500}
          height={500}
          className="mx-auto bg-transparent"
          style={{ backgroundColor: "transparent" }}
          priority
        />
      </div>

      {/* Right side with OTP verification form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-light-card dark:bg-dark-card">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Image
              src="/edemics-logo.png"
              alt="Edemics Logo"
              width={120}
              height={40}
              className="bg-transparent"
              style={{ backgroundColor: "transparent" }}
            />
            <ModeToggle />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Verify Your Email 📧
            </h1>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              We've sent a verification code to your email. Please enter the code below.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="form-input w-12 h-12 text-center text-xl font-bold border-primary focus:border-primary"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Didn't receive the code?{" "}
                {timer > 0 ? (
                  <span>Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-primary hover:underline"
                    disabled={isResending}
                  >
                    {isResending ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </p>
            </div>

            <button type="submit" className="form-button-primary w-full" disabled={!otp.every((digit) => digit !== "")}>
              Verify & Continue
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <Link href="/register" className="text-primary hover:underline">
                ← Back to registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
