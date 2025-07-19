"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Printer,
  Download,
  Send,
  ArrowLeft,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  ChevronRight,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import html2pdf from "html2pdf.js"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

// Add a loading skeleton component
const InvoiceSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between">
      <Skeleton className="h-8 w-64" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
    <Skeleton className="h-20 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
)

// Invoice templates
const INVOICE_TEMPLATES = {
  DEFAULT: "default",
  BLUE: "blue",
  GREEN: "green",
}

export default function InvoiceViewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailData, setEmailData] = useState({ email: "", subject: "", message: "" })
  const [selectedTemplate, setSelectedTemplate] = useState(INVOICE_TEMPLATES.DEFAULT)
  const invoiceRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Check if we should print
  useEffect(() => {
    if (searchParams.get("print") === "true" && !loading && invoice) {
      setTimeout(() => {
        window.print()
      }, 1000)
    }
  }, [searchParams, loading, invoice])

  // Check if we should download
  useEffect(() => {
    if (searchParams.get("download") === "true" && !loading && invoice) {
      handleDownload()
    }
  }, [searchParams, loading, invoice])

  // Fetch invoice data with a delay to simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data for demonstration
      setInvoice({
        id: params.id,
        studentName: "John Smith",
        studentId: "STU-2023-001",
        class: "Grade 10",
        section: "A",
        invoiceNumber: `INV-2023-${params.id}`,
        invoiceDate: "2023-09-01",
        dueDate: "2023-09-15",
        status: "Unpaid",
        items: [
          { id: 1, description: "Tuition Fee", amount: 5000, dueDate: "2023-09-15" },
          { id: 2, description: "Library Fee", amount: 500, dueDate: "2023-09-15" },
          { id: 3, description: "Computer Lab Fee", amount: 800, dueDate: "2023-09-15" },
          { id: 4, description: "Sports Fee", amount: 300, dueDate: "2023-09-15" },
        ],
        subtotal: 6600,
        discount: 0,
        fine: 0,
        total: 6600,
        amountPaid: 0,
        balance: 6600,
        paymentHistory: [
          { id: 1, date: "2023-09-05", amount: 2000, method: "Bank Transfer", reference: "REF123456" },
          { id: 2, date: "2023-09-10", amount: 3000, method: "Credit Card", reference: "CC789012" },
        ],
        notes: "Please pay before the due date to avoid late fees.",
        schoolInfo: {
          name: "Greenfield Academy",
          address: "123 Education Street, Lagos, Nigeria",
          phone: "+234 123 456 7890",
          email: "info@greenfieldacademy.edu.ng",
          website: "www.greenfieldacademy.edu.ng",
          logo: "/abstract-school-crest.png",
        },
        parentInfo: {
          name: "Mr. & Mrs. Smith",
          address: "456 Family Road, Lagos, Nigeria",
          phone: "+234 987 654 3210",
          email: "smith@example.com",
        },
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  // Memoize handlers to prevent unnecessary re-renders
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleDownload = useCallback(async () => {
    if (!invoiceRef.current || !invoice) return

    setIsDownloading(true)

    try {
      // Configure PDF options
      const opt = {
        margin: 0.5,
        filename: `Invoice_${invoice.invoiceNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      }

      // Generate and download PDF
      await html2pdf().set(opt).from(invoiceRef.current).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }, [invoice])

  const handleSendEmail = useCallback(() => {
    setIsEmailDialogOpen(true)
    setEmailData({
      email: invoice?.parentInfo?.email || "",
      subject: `Invoice ${invoice?.invoiceNumber} from ${invoice?.schoolInfo?.name}`,
      message: `Dear ${invoice?.parentInfo?.name},\n\nPlease find attached the invoice ${invoice?.invoiceNumber} for ${invoice?.studentName}.\n\nTotal Amount: ${formatCurrency(invoice?.total)}\nDue Date: ${invoice?.dueDate}\n\nThank you,\n${invoice?.schoolInfo?.name}`,
    })
  }, [invoice])

  const handleSendEmailConfirm = useCallback(() => {
    // In a real application, this would send the email
    alert(`Email sent to ${emailData.email}`)
    setIsEmailDialogOpen(false)
  }, [emailData])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  // Memoize status badge to prevent unnecessary re-renders
  const getStatusBadge = useCallback((status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return (
          <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00] flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Paid
          </Badge>
        )
      case "partially paid":
        return (
          <Badge className="bg-[#FFB400] bg-opacity-[0.16] text-[#FFB400] flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            Partially Paid
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-[#FF4C51] bg-opacity-[0.16] text-[#FF4C51] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Unpaid
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-[#FF4C51] bg-opacity-[0.16] text-[#FF4C51] flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Overdue
          </Badge>
        )
      default:
        return null
    }
  }, [])

  // Memoize currency formatter to prevent unnecessary re-renders
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuToggle={toggleSidebar} />
          <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
            <InvoiceSkeleton />
          </main>
        </div>
      </div>
    )
  }

  // Default invoice template
  const DefaultInvoiceTemplate = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm print:shadow-none" ref={invoiceRef}>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <img src={invoice.schoolInfo.logo || "/placeholder.svg"} alt="School Logo" className="h-16 w-16" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{invoice.schoolInfo.name}</h1>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.address}</p>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.phone}</p>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.email}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">INVOICE</h2>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Invoice Number:</span>
              <span>{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Date Issued:</span>
              <span>{invoice.invoiceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Due Date:</span>
              <span>{invoice.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">BILL TO:</h3>
          <p className="font-medium">{invoice.parentInfo.name}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.address}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.phone}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">STUDENT INFORMATION:</h3>
          <p className="font-medium">{invoice.studentName}</p>
          <p className="text-sm text-gray-600">Student ID: {invoice.studentId}</p>
          <p className="text-sm text-gray-600">
            Class: {invoice.class} {invoice.section}
          </p>
          <div className="mt-2">{getStatusBadge(invoice.status)}</div>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-right font-semibold">Subtotal:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.subtotal)}</td>
            </tr>
            {invoice.discount > 0 && (
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right font-semibold">Discount:</td>
                <td className="py-3 px-4 text-right text-green-600">-{formatCurrency(invoice.discount)}</td>
              </tr>
            )}
            {invoice.fine > 0 && (
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right font-semibold">Fine:</td>
                <td className="py-3 px-4 text-right text-red-600">+{formatCurrency(invoice.fine)}</td>
              </tr>
            )}
            <tr className="bg-gray-50">
              <td className="py-3 px-4 text-right font-bold">Total:</td>
              <td className="py-3 px-4 text-right font-bold">{formatCurrency(invoice.total)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 text-right font-semibold">Amount Paid:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.amountPaid)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-4 text-right font-bold">Balance Due:</td>
              <td className="py-3 px-4 text-right font-bold">{formatCurrency(invoice.balance)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">NOTES:</h3>
          <p className="text-sm text-gray-600 p-4 bg-gray-50 rounded-md">{invoice.notes}</p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">PAYMENT INFORMATION:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-1">Bank Transfer</h4>
            <p className="text-sm text-gray-600">
              Account Name: Greenfield Academy
              <br />
              Account Number: 1234567890
              <br />
              Bank: First Bank Nigeria
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-1">Online Payment</h4>
            <p className="text-sm text-gray-600">
              Visit our parent portal at
              <br />
              portal.greenfieldacademy.edu.ng
              <br />
              and log in to make payments
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-1">Contact</h4>
            <p className="text-sm text-gray-600">
              Finance Office: +234 123 456 7890
              <br />
              Email: finance@greenfieldacademy.edu.ng
              <br />
              Hours: Mon-Fri, 8am-4pm
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // Blue invoice template (CODESO style)
  const BlueInvoiceTemplate = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm print:shadow-none" ref={invoiceRef}>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 relative">
        {/* Blue geometric pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500 rounded-tr-lg rounded-br-lg overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: "300px 300px",
            }}
          ></div>
        </div>

        <div className="flex items-center mb-4 md:mb-0 z-10">
          <div className="mr-4">
            <img src={invoice.schoolInfo.logo || "/placeholder.svg"} alt="School Logo" className="h-16 w-16" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">{invoice.schoolInfo.name}</h1>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.address}</p>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.phone}</p>
            <p className="text-sm text-gray-600">{invoice.schoolInfo.email}</p>
          </div>
        </div>
        <div className="bg-blue-600 text-white p-4 rounded-md z-10">
          <h2 className="text-xl font-bold mb-2">INVOICE</h2>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium">Invoice Number:</span>
              <span>{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Date Issued:</span>
              <span>{invoice.invoiceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Due Date:</span>
              <span>{invoice.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-blue-600 mb-2">BILL TO:</h3>
          <p className="font-medium">{invoice.parentInfo.name}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.address}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.phone}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-600 mb-2">STUDENT INFORMATION:</h3>
          <p className="font-medium">{invoice.studentName}</p>
          <p className="text-sm text-gray-600">Student ID: {invoice.studentId}</p>
          <p className="text-sm text-gray-600">
            Class: {invoice.class} {invoice.section}
          </p>
          <div className="mt-2">{getStatusBadge(invoice.status)}</div>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-blue-200">
              <td className="py-3 px-4 text-right font-semibold">Subtotal:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.subtotal)}</td>
            </tr>
            {invoice.discount > 0 && (
              <tr className="border-t border-blue-200">
                <td className="py-3 px-4 text-right font-semibold">Discount:</td>
                <td className="py-3 px-4 text-right text-green-600">-{formatCurrency(invoice.discount)}</td>
              </tr>
            )}
            {invoice.fine > 0 && (
              <tr className="border-t border-blue-200">
                <td className="py-3 px-4 text-right font-semibold">Fine:</td>
                <td className="py-3 px-4 text-right text-red-600">+{formatCurrency(invoice.fine)}</td>
              </tr>
            )}
            <tr className="bg-blue-600 text-white">
              <td className="py-3 px-4 text-right font-bold">Total:</td>
              <td className="py-3 px-4 text-right font-bold">{formatCurrency(invoice.total)}</td>
            </tr>
            <tr className="border-t border-blue-200">
              <td className="py-3 px-4 text-right font-semibold">Amount Paid:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.amountPaid)}</td>
            </tr>
            <tr className="bg-blue-100">
              <td className="py-3 px-4 text-right font-bold">Balance Due:</td>
              <td className="py-3 px-4 text-right font-bold">{formatCurrency(invoice.balance)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-blue-600 mb-2">NOTES:</h3>
          <p className="text-sm text-gray-600 p-4 bg-blue-50 rounded-md">{invoice.notes}</p>
        </div>
      )}

      <div className="border-t border-blue-200 pt-6">
        <h3 className="text-sm font-semibold text-blue-600 mb-2">PAYMENT INFORMATION:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium mb-1 text-blue-600">Bank Transfer</h4>
            <p className="text-sm text-gray-600">
              Account Name: Greenfield Academy
              <br />
              Account Number: 1234567890
              <br />
              Bank: First Bank Nigeria
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium mb-1 text-blue-600">Online Payment</h4>
            <p className="text-sm text-gray-600">
              Visit our parent portal at
              <br />
              portal.greenfieldacademy.edu.ng
              <br />
              and log in to make payments
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-medium mb-1 text-blue-600">Contact</h4>
            <p className="text-sm text-gray-600">
              Finance Office: +234 123 456 7890
              <br />
              Email: finance@greenfieldacademy.edu.ng
              <br />
              Hours: Mon-Fri, 8am-4pm
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
      </div>
    </div>
  )

  // Green invoice template (Creative Painting style)
  const GreenInvoiceTemplate = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm print:shadow-none" ref={invoiceRef}>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 relative">
        {/* Header with green accent */}
        <div className="w-full h-24 bg-gradient-to-r from-green-500 to-blue-500 absolute top-0 left-0 rounded-t-lg"></div>

        <div className="flex items-center mb-4 md:mb-0 z-10 mt-6">
          <div className="mr-4">
            <img
              src={invoice.schoolInfo.logo || "/placeholder.svg"}
              alt="School Logo"
              className="h-16 w-16 bg-white p-1 rounded-full"
            />
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">{invoice.schoolInfo.name}</h1>
            <p className="text-sm">{invoice.schoolInfo.address}</p>
            <p className="text-sm">{invoice.schoolInfo.phone}</p>
            <p className="text-sm">{invoice.schoolInfo.email}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md z-10 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Invoice Number:</span>
              <span className="text-gray-800">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-600">Date Issued:</span>
              <span className="text-gray-800">{invoice.invoiceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Due Date:</span>
              <span className="text-gray-800">{invoice.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-16">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-semibold text-green-600 mb-2">BILL TO:</h3>
          <p className="font-medium">{invoice.parentInfo.name}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.address}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.phone}</p>
          <p className="text-sm text-gray-600">{invoice.parentInfo.email}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-semibold text-green-600 mb-2">STUDENT INFORMATION:</h3>
          <p className="font-medium">{invoice.studentName}</p>
          <p className="text-sm text-gray-600">Student ID: {invoice.studentId}</p>
          <p className="text-sm text-gray-600">
            Class: {invoice.class} {invoice.section}
          </p>
          <div className="mt-2">{getStatusBadge(invoice.status)}</div>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left font-semibold bg-green-500 text-white rounded-tl-md">Description</th>
              <th className="py-3 px-4 text-right font-semibold bg-green-500 text-white rounded-tr-md">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4 border-b border-gray-200">{item.description}</td>
                <td className="py-3 px-4 text-right border-b border-gray-200">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4 text-right font-semibold">Subtotal:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.subtotal)}</td>
            </tr>
            {invoice.discount > 0 && (
              <tr>
                <td className="py-3 px-4 text-right font-semibold">Discount:</td>
                <td className="py-3 px-4 text-right text-green-600">-{formatCurrency(invoice.discount)}</td>
              </tr>
            )}
            {invoice.fine > 0 && (
              <tr>
                <td className="py-3 px-4 text-right font-semibold">Fine:</td>
                <td className="py-3 px-4 text-right text-red-600">+{formatCurrency(invoice.fine)}</td>
              </tr>
            )}
            <tr className="bg-green-100">
              <td className="py-3 px-4 text-right font-bold">Total:</td>
              <td className="py-3 px-4 text-right font-bold">{formatCurrency(invoice.total)}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-right font-semibold">Amount Paid:</td>
              <td className="py-3 px-4 text-right">{formatCurrency(invoice.amountPaid)}</td>
            </tr>
            <tr className="bg-green-500 text-white">
              <td className="py-3 px-4 text-right font-bold rounded-bl-md">Balance Due:</td>
              <td className="py-3 px-4 text-right font-bold rounded-br-md">{formatCurrency(invoice.balance)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-green-600 mb-2">NOTES:</h3>
          <p className="text-sm text-gray-600 p-4 bg-gray-50 rounded-md border-l-4 border-green-500">{invoice.notes}</p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-green-600 mb-2">PAYMENT INFORMATION:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-green-500">
            <h4 className="font-medium mb-1 text-gray-800">Bank Transfer</h4>
            <p className="text-sm text-gray-600">
              Account Name: Greenfield Academy
              <br />
              Account Number: 1234567890
              <br />
              Bank: First Bank Nigeria
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
            <h4 className="font-medium mb-1 text-gray-800">Online Payment</h4>
            <p className="text-sm text-gray-600">
              Visit our parent portal at
              <br />
              portal.greenfieldacademy.edu.ng
              <br />
              and log in to make payments
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border-l-4 border-purple-500">
            <h4 className="font-medium mb-1 text-gray-800">Contact</h4>
            <p className="text-sm text-gray-600">
              Finance Office: +234 123 456 7890
              <br />
              Email: finance@greenfieldacademy.edu.ng
              <br />
              Hours: Mon-Fri, 8am-4pm
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>Thank you for your business!</p>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border-2 border-red-300 rotate-[-15deg]">
              <span>PAID</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Authorized Signature</p>
            <div className="mt-2 border-b border-gray-400 w-40"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Invoice Details</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Finance</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Invoices</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Invoice #{params.id}</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  View and manage invoice details. Print, download, or email this invoice to parents or guardians.
                </p>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/invoice-illustration.png"
                  alt="Invoice Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Header with back button and actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 print:hidden">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                Back
              </Button>
              <div>
                {invoice && <h1 className="text-2xl font-bold">Invoice #{invoice.invoiceNumber}</h1>}
                {invoice && (
                  <p className="text-muted-foreground">
                    {invoice.studentName} • {invoice.class} {invoice.section}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
                <Download className="h-4 w-4 mr-2 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                {isDownloading ? "Generating..." : "Download"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                Email
              </Button>
              <Button variant="default" size="sm">
                <FileEdit className="h-4 w-4 mr-2 text-[#2E263D] dark:text-[#E7E3FC] dark:text-opacity-70 text-opacity-90" />
                Edit
              </Button>
            </div>
          </div>

          {/* Status banner */}
          {invoice && (
            <div
              className={`mb-6 p-4 rounded-lg print:hidden ${
                invoice.status.toLowerCase() === "paid"
                  ? "bg-[#56CA00] bg-opacity-[0.16] border border-[#56CA00] border-opacity-20"
                  : invoice.status.toLowerCase() === "partially paid"
                    ? "bg-[#FFB400] bg-opacity-[0.16] border border-[#FFB400] border-opacity-20"
                    : "bg-[#FF4C51] bg-opacity-[0.16] border border-[#FF4C51] border-opacity-20"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <div className="mr-4">{getStatusBadge(invoice.status)}</div>
                  <div>
                    <p className="font-medium">
                      {invoice.status === "Paid"
                        ? "This invoice has been fully paid."
                        : invoice.status === "Partially Paid"
                          ? `Partially paid. Remaining balance: ${formatCurrency(invoice.balance)}`
                          : `Payment due by ${invoice.dueDate}`}
                    </p>
                  </div>
                </div>
                {invoice.status !== "Paid" && (
                  <Button size="sm" className="bg-[#8C57FF] hover:bg-[#8C57FF]/90 text-white">
                    Record Payment
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Template selector */}
          <div className="mb-6 print:hidden">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={INVOICE_TEMPLATES.DEFAULT}>Default Template</SelectItem>
                <SelectItem value={INVOICE_TEMPLATES.BLUE}>Blue Template</SelectItem>
                <SelectItem value={INVOICE_TEMPLATES.GREEN}>Green Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoice template */}
          {selectedTemplate === INVOICE_TEMPLATES.BLUE ? (
            <BlueInvoiceTemplate />
          ) : selectedTemplate === INVOICE_TEMPLATES.GREEN ? (
            <GreenInvoiceTemplate />
          ) : (
            <DefaultInvoiceTemplate />
          )}

          {/* Email Dialog */}
          <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Invoice via Email</DialogTitle>
                <DialogDescription>Send this invoice to the parent or guardian via email.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    To:
                  </label>
                  <input
                    id="email"
                    value={emailData.email}
                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subject" className="text-right">
                    Subject:
                  </label>
                  <input
                    id="subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="message" className="text-right">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                    rows={5}
                    className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendEmailConfirm}>Send Email</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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