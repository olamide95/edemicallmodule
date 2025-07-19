// components/layout-wrapper.tsx
"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

export function LayoutWrapper({
  children,
  title,
  breadcrumbs,
  description,
  headerAction
}: {
  children: React.ReactNode
  title: string
  breadcrumbs: Array<{ label: string; href: string; isCurrent?: boolean }>
  description: string
  headerAction?: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
   
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Header with Illustration */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">{title}</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  {breadcrumbs.map((crumb, index) => (
                    <>
                      <span 
                        className={`${crumb.isCurrent ? 'text-primary italic' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}
                      >
                        {crumb.label}
                      </span>
                      {index < breadcrumbs.length - 1 && (
                        <ChevronRight size={16} className="inline text-light-text-secondary dark:text-dark-text-secondary" />
                      )}
                    </>
                  ))}
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  {description}
                </p>

                {headerAction}
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/education-illustration-new.png"
                  alt="Education Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>
          
          {children}
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2 bg-light-card-bg dark:bg-dark-card-bg">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}