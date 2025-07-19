"use client"

import { Suspense, lazy, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

// Lazy load components to improve initial load time
const FeeHead = lazy(() =>
  import("@/components/admin/fee-management/fee-head").then((mod) => ({ default: mod.FeeHead })),
)
const FeeTerm = lazy(() =>
  import("@/components/admin/fee-management/fee-term").then((mod) => ({ default: mod.FeeTerm })),
)
const FeeAssignment = lazy(() =>
  import("@/components/admin/fee-management/fee-assignment").then((mod) => ({ default: mod.FeeAssignment })),
)
const FeeDistribution = lazy(() =>
  import("@/components/admin/fee-management/fee-distribution").then((mod) => ({ default: mod.FeeDistribution })),
)
const StudentInvoice = lazy(() =>
  import("@/components/admin/fee-management/student-invoice").then((mod) => ({ default: mod.StudentInvoice })),
)

// Loading fallback component
const LoadingFallback = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-3 gap-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  </div>
)

export default function FeeManagementPage() {
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
                <h1 className="text-2xl font-bold mb-1">Fee Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Finance</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Fee Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Manage fee structures, terms, distributions, assignments, and student invoices with our comprehensive
                  fee management system.
                </p>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/finance-illustration.png"
                  alt="Finance Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="fee-head" className="space-y-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <TabsTrigger value="fee-head">Fee Head</TabsTrigger>
                <TabsTrigger value="fee-term">Fee Term</TabsTrigger>
                <TabsTrigger value="fee-distribution">Fee Distribution</TabsTrigger>
                <TabsTrigger value="fee-assignment">Fee Assignment</TabsTrigger>
                <TabsTrigger value="student-invoice">Student Invoice</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fee-head">
                <Suspense fallback={<LoadingFallback />}>
                  <FeeHead />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="fee-term">
                <Suspense fallback={<LoadingFallback />}>
                  <FeeTerm />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="fee-distribution">
                <Suspense fallback={<LoadingFallback />}>
                  <FeeDistribution />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="fee-assignment">
                <Suspense fallback={<LoadingFallback />}>
                  <FeeAssignment />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="student-invoice">
                <Suspense fallback={<LoadingFallback />}>
                  <StudentInvoice />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
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