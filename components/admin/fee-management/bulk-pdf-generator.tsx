"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import html2pdf from "html2pdf.js"

interface Invoice {
  id: string
  invoiceNumber: string
  studentName: string
  studentId: string
  class: string
  term: string
  amount: number
  status: string
  dueDate: string
}

interface BulkPDFGeneratorProps {
  invoices: Invoice[]
  onComplete?: (results: any[]) => void
}

export function BulkPDFGenerator({ invoices, onComplete }: BulkPDFGeneratorProps) {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentInvoice, setCurrentInvoice] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [format, setFormat] = useState("a4")
  const [template, setTemplate] = useState("default")

  const handleSelectAll = useCallback(() => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(invoices.map((inv) => inv.id))
    }
  }, [selectedInvoices, invoices])

  const handleSelectInvoice = useCallback((invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId) ? prev.filter((id) => id !== invoiceId) : [...prev, invoiceId],
    )
  }, [])

  const generateInvoiceHTML = useCallback((invoice: Invoice) => {
    // This would generate the HTML for each invoice based on the selected template
    // For now, we'll create a simple HTML structure
    return `
      <div style="width: 8.5in; min-height: 11in; padding: 0.5in; background: white; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
          <div>
            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 0.5rem;">Greenfield Academy</h1>
            <p style="margin: 0; color: #666;">123 Education Street, Lagos, Nigeria</p>
            <p style="margin: 0; color: #666;">+234 123 456 7890</p>
            <p style="margin: 0; color: #666;">info@greenfieldacademy.edu.ng</p>
          </div>
          <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 0.5rem;">INVOICE</h2>
            <p style="margin: 0.25rem 0;"><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
            <p style="margin: 0.25rem 0;"><strong>Student:</strong> ${invoice.studentName}</p>
            <p style="margin: 0.25rem 0;"><strong>Class:</strong> ${invoice.class}</p>
            <p style="margin: 0.25rem 0;"><strong>Due Date:</strong> ${invoice.dueDate}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 1rem;">Fee Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Description</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd;">Tuition Fee - ${invoice.term}</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">₦${invoice.amount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background: #f5f5f5; font-weight: bold;">
                <td style="padding: 12px; border: 1px solid #ddd;">Total</td>
                <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">₦${invoice.amount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 14px;">Please pay before the due date to avoid late fees.</p>
          <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 14px;">For inquiries, contact the finance office at finance@greenfieldacademy.edu.ng</p>
        </div>
      </div>
    `
  }, [])

  const generateBulkPDFs = useCallback(async () => {
    if (selectedInvoices.length === 0) {
      alert("Please select at least one invoice to generate PDFs")
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setResults([])

    const selectedInvoiceData = invoices.filter((inv) => selectedInvoices.includes(inv.id))
    const generationResults: any[] = []

    try {
      for (let i = 0; i < selectedInvoiceData.length; i++) {
        const invoice = selectedInvoiceData[i]
        setCurrentInvoice(`${invoice.invoiceNumber} - ${invoice.studentName}`)

        try {
          // Create a temporary div with the invoice HTML
          const tempDiv = document.createElement("div")
          tempDiv.innerHTML = generateInvoiceHTML(invoice)
          tempDiv.style.position = "absolute"
          tempDiv.style.left = "-9999px"
          tempDiv.style.top = "-9999px"
          document.body.appendChild(tempDiv)

          const options = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `Invoice_${invoice.invoiceNumber}_${invoice.studentName.replace(/\s+/g, "_")}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#ffffff",
            },
            jsPDF: {
              unit: "in",
              format: format,
              orientation: "portrait",
            },
          }

          await html2pdf().set(options).from(tempDiv.firstChild).save()

          // Clean up
          document.body.removeChild(tempDiv)

          generationResults.push({
            invoiceId: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            studentName: invoice.studentName,
            status: "success",
            message: "PDF generated successfully",
          })

          // Small delay between downloads to prevent browser blocking
          if (i < selectedInvoiceData.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        } catch (error) {
          console.error(`Error generating PDF for invoice ${invoice.invoiceNumber}:`, error)
          generationResults.push({
            invoiceId: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            studentName: invoice.studentName,
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error occurred",
          })
        }

        setProgress(((i + 1) / selectedInvoiceData.length) * 100)
      }

      setResults(generationResults)
      onComplete?.(generationResults)
    } catch (error) {
      console.error("Bulk PDF generation error:", error)
      alert("An error occurred during bulk PDF generation. Please try again.")
    } finally {
      setIsGenerating(false)
      setCurrentInvoice("")
    }
  }, [selectedInvoices, invoices, format, generateInvoiceHTML, onComplete])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-[#56CA00] bg-opacity-[0.16] text-[#56CA00]">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Success
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-[#FF4C51] bg-opacity-[0.16] text-[#FF4C51]">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Bulk PDF Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">PDF Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a4">A4</SelectItem>
                <SelectItem value="letter">Letter</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Template</label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="blue">Blue Theme</SelectItem>
                <SelectItem value="green">Green Theme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={generateBulkPDFs}
              disabled={isGenerating || selectedInvoices.length === 0}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : `Generate ${selectedInvoices.length} PDFs`}
            </Button>
          </div>
        </div>

        {/* Progress */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating PDFs...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            {currentInvoice && <p className="text-sm text-muted-foreground">Current: {currentInvoice}</p>}
          </div>
        )}

        {/* Invoice Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Select Invoices</h3>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedInvoices.length === invoices.length ? "Deselect All" : "Select All"}
            </Button>
          </div>

          <div className="border rounded-md max-h-64 overflow-y-auto">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center space-x-3 p-3 border-b last:border-b-0">
                <Checkbox
                  checked={selectedInvoices.includes(invoice.id)}
                  onCheckedChange={() => handleSelectInvoice(invoice.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{invoice.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {invoice.studentName} - {invoice.class}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">₦{invoice.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{invoice.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Generation Results</h3>
            <div className="border rounded-md max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{result.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{result.studentName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(result.status)}
                    {result.status === "error" && (
                      <span className="text-xs text-muted-foreground max-w-48 truncate" title={result.message}>
                        {result.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
