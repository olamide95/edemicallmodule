"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Apply theme from localStorage on component mount
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light"
  }, [])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/verify-otp")
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/girl-verify-password-light%201-e82f6y0piBtqbvjH4uHMuEd0cNcC50.png"
          alt="Create Account Illustration"
          width={500}
          height={500}
          className="mx-auto bg-transparent"
          style={{ backgroundColor: "transparent" }}
          priority
        />
      </div>

      {/* Right side with registration form */}
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
              Create an Account 🚀
            </h1>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Register your school to start using Edemics ERP
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="form-input w-full border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="form-input w-full border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="form-input w-full pr-10 border-primary focus:border-primary"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-light-text-secondary dark:text-dark-text-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="space-y-2 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="form-input w-full pr-10 border-primary focus:border-primary"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-light-text-secondary dark:text-dark-text-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="form-button-primary w-full">
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Already have an account?
              <Link href="/" className="ml-1 text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
