"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BulkPDFGenerator } from "@/components/admin/fee-management/bulk-pdf-generator"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

// Mock data for demonstration
const mockInvoices = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2023-001",
    studentName: "John Doe",
    studentId: "STU-001",
    class: "SS 3",
    term: "Term 1 2023/2024",
    amount: 350000,
    status: "unpaid",
    dueDate: "2023-09-15",
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2023-002",
    studentName: "Jane Smith",
    studentId: "STU-002",
    class: "SS 2",
    term: "Term 1 2023/2024",
    amount: 325000,
    status: "paid",
    dueDate: "2023-09-15",
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2023-003",
    studentName: "Michael Johnson",
    studentId: "STU-003",
    class: "JSS 3",
    term: "Term 1 2023/2024",
    amount: 275000,
    status: "partial",
    dueDate: "2023-09-15",
  },
  {
    id: "INV-004",
    invoiceNumber: "INV-2023-004",
    studentName: "Sarah Williams",
    studentId: "STU-004",
    class: "JSS 1",
    term: "Term 1 2023/2024",
    amount: 250000,
    status: "unpaid",
    dueDate: "2023-09-15",
  },
  {
    id: "INV-005",
    invoiceNumber: "INV-2023-005",
    studentName: "David Brown",
    studentId: "STU-005",
    class: "SS 1",
    term: "Term 1 2023/2024",
    amount: 300000,
    status: "unpaid",
    dueDate: "2023-09-15",
  },
]

export default function BulkPDFPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()
  const [generationResults, setGenerationResults] = useState<any[]>([])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleGenerationComplete = (results: any[]) => {
    setGenerationResults(results)

    const successCount = results.filter((r) => r.status === "success").length
    const errorCount = results.filter((r) => r.status === "error").length

    alert(`PDF Generation Complete!\nSuccess: ${successCount}\nErrors: ${errorCount}`)
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
                <h1 className="text-2xl font-bold mb-1">Bulk PDF Generator</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Finance</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Fee Management</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Bulk PDFs</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Generate multiple fee invoices as PDF documents in bulk for selected students
                </p>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/pdf-illustration.png"  // Update with your PDF-related illustration
                  alt="PDF Generation Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6">
              <BulkPDFGenerator invoices={mockInvoices} onComplete={handleGenerationComplete} />

              {generationResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Generation Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {generationResults.filter((r) => r.status === "success").length}
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">Successful</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {generationResults.filter((r) => r.status === "error").length}
                        </div>
                        <div className="text-sm text-red-600 dark:text-red-400">Failed</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {generationResults.length}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
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