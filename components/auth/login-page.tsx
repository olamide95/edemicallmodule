"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Apply theme from localStorage on component mount
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light"
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/welcome")
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boy-with-rocket-light%20%281%29%201-LOQnRo4VlH1EsGpROl00jOhzBnHsO6.png"
          alt="Edemics Illustration"
          width={600}
          height={600}
          className="mx-auto bg-transparent"
          style={{ backgroundColor: "transparent" }}
          priority
        />
      </div>

      {/* Right side with login form */}
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
              Welcome to Edemics ERP! 👋
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary italic">
              "one platform, endless possibilities."
            </p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Please sign-in to your account with your default password and start the adventure
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
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
            </div>

            <button type="submit" className="form-button-primary w-full">
              Login →
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              New on our platform?
              <Link href="/register" className="ml-1 text-primary hover:underline">
                Create an account
              </Link>
            </p>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-light-card dark:bg-dark-card text-light-text-secondary dark:text-dark-text-secondary">
                    or
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#333333">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
