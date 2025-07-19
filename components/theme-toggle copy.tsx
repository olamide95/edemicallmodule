"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Initialize state on mount
  useEffect(() => {
    // Check if theme is already set in localStorage
    const savedTheme = localStorage.getItem("theme")

    // Check if OS prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial theme based on localStorage or OS preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      // Switch to light mode
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      // Switch to dark mode
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9 rounded-full">
      {isDark ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
