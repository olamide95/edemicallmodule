import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/contexts/chat-context"
import { ChatRenderer } from "@/components/chat-renderer"
import { AuthProvider } from '@/contexts/auth-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edemics - Academic Module",
  description: "Academic management system for educational institutions",
    generator: 'Edemics'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
                <AuthProvider>
        
        <ThemeProvider defaultTheme="light" storageKey="edemics-theme">
          <ChatProvider>
            {children}
            <ChatRenderer />
          </ChatProvider>
        </ThemeProvider>
        
      </AuthProvider>
      </body>
    </html>
  )
}
