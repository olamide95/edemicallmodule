"use client"

export function ThemeScript() {
  const themeScript = `
    (function() {
      // Check localStorage first
      const storedTheme = window.localStorage.getItem('theme')
      
      // If theme is stored in localStorage, use that
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
        return
      } else if (storedTheme === 'light') {
        document.documentElement.classList.remove('dark')
        return
      }
      
      // Otherwise, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })()
  `

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
