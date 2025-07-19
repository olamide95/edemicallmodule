"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure theme is persisted across page navigations
  useEffect(() => {
    // Get the theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light"

    // Apply the theme to the document
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
    document.documentElement.style.colorScheme = savedTheme === "dark" ? "dark" : "light"

    // Listen for storage events (in case theme is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        document.documentElement.classList.toggle("dark", e.newValue === "dark")
        document.documentElement.style.colorScheme = e.newValue === "dark" ? "dark" : "light"
      }
    }

    // Listen for navigation events to ensure theme persists
    const handleBeforeUnload = () => {
      const currentTheme = localStorage.getItem("theme") || "light"
      sessionStorage.setItem("theme_transition", currentTheme)
    }

    // Listen for theme change events
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem("theme") || "light"
      document.documentElement.classList.toggle("dark", currentTheme === "dark")
      document.documentElement.style.colorScheme = currentTheme === "dark" ? "dark" : "light"
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("themechange", handleThemeChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("themechange", handleThemeChange)
    }
  }, [])

  return (
    <NextThemesProvider {...props} enableSystem={false} enableColorScheme={true}>
      {children}
    </NextThemesProvider>
  )
}
