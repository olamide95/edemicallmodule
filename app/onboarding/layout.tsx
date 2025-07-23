import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from '@/contexts/AuthContext'

import { ThemeProvider } from "@/components/theme-provider2"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edemics ERP",
  description: "School Management System",
    generator: 'edemic'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || sessionStorage.getItem('theme_transition') || 'light';
                  localStorage.setItem('theme', theme);
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
                  
                  // Clean up the transition storage
                  if (sessionStorage.getItem('theme_transition')) {
                    sessionStorage.removeItem('theme_transition');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>

        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
