"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Ensure theme persistence
  useEffect(() => {
    if (mounted && theme) {
      // Save theme to localStorage for persistence across pages
      localStorage.setItem("theme", theme)

      // Apply theme directly to document
      document.documentElement.classList.toggle("dark", theme === "dark")
      document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light"

      // Force update all elements that might depend on theme
      const event = new Event("themechange")
      window.dispatchEvent(event)
    }
  }, [theme, mounted])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-md border border-divider"></div>
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      onClick={() => {
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        setTheme(newTheme)
      }}
      className="w-10 h-10 rounded-md border border-divider flex items-center justify-center bg-light-card dark:bg-dark-card"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-[#2E263D]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
