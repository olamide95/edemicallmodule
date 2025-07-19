"use client"

import type React from "react"

import { useCallback } from "react"
import html2pdf from "html2pdf.js"

interface PDFInvoiceGeneratorProps {
  invoiceRef: React.RefObject<HTMLElement>
  invoice: any
  onStart?: () => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export function PDFInvoiceGenerator({ invoiceRef, invoice, onStart, onComplete, onError }: PDFInvoiceGeneratorProps) {
  const generatePDF = useCallback(
    async (options?: any) => {
      if (!invoiceRef.current || !invoice) {
        onError?.(new Error("Invoice reference or data not available"))
        return
      }

      onStart?.()

      try {
        // Default PDF options
        const defaultOptions = {
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: `Invoice_${invoice.invoiceNumber}_${invoice.studentName.replace(/\s+/g, "_")}.pdf`,
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            letterRendering: true,
            removeContainer: true,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
            compress: true,
          },
          pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
          },
        }

        // Merge with custom options
        const finalOptions = { ...defaultOptions, ...options }

        // Clone the invoice element to avoid modifying the original
        const clonedElement = invoiceRef.current.cloneNode(true) as HTMLElement

        // Apply PDF-specific styles
        clonedElement.style.width = "8.5in"
        clonedElement.style.minHeight = "11in"
        clonedElement.style.backgroundColor = "#ffffff"
        clonedElement.style.color = "#000000"
        clonedElement.style.fontFamily = "Arial, sans-serif"

        // Remove any elements that shouldn't be in PDF
        const elementsToRemove = clonedElement.querySelectorAll(".print\\:hidden, [data-pdf-exclude]")
        elementsToRemove.forEach((el) => el.remove())

        // Generate PDF
        const pdf = html2pdf().set(finalOptions).from(clonedElement)

        await pdf.save()

        onComplete?.()
      } catch (error) {
        console.error("PDF generation error:", error)
        onError?.(error as Error)
      }
    },
    [invoiceRef, invoice, onStart, onComplete, onError],
  )

  const generateAndPreview = useCallback(async () => {
    if (!invoiceRef.current || !invoice) return

    onStart?.()

    try {
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Invoice_${invoice.invoiceNumber}_Preview.pdf`,
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

      const clonedElement = invoiceRef.current.cloneNode(true) as HTMLElement
      clonedElement.style.width = "8.5in"
      clonedElement.style.backgroundColor = "#ffffff"

      const pdf = html2pdf().set(options).from(clonedElement)
      const pdfBlob = await pdf.outputPdf("blob")

      // Create blob URL and open in new tab
      const blobUrl = URL.createObjectURL(pdfBlob)
      const newWindow = window.open(blobUrl, "_blank")

      if (newWindow) {
        newWindow.onload = () => {
          URL.revokeObjectURL(blobUrl)
        }
      }

      onComplete?.()
    } catch (error) {
      console.error("PDF preview error:", error)
      onError?.(error as Error)
    }
  }, [invoiceRef, invoice, onStart, onComplete, onError])

  const generateMultipleFormats = useCallback(async () => {
    if (!invoiceRef.current || !invoice) return

    onStart?.()

    try {
      const baseOptions = {
        margin: [0.5, 0.5, 0.5, 0.5],
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        },
      }

      const clonedElement = invoiceRef.current.cloneNode(true) as HTMLElement
      clonedElement.style.width = "8.5in"
      clonedElement.style.backgroundColor = "#ffffff"

      // Generate A4 PDF
      const a4Options = {
        ...baseOptions,
        filename: `Invoice_${invoice.invoiceNumber}_A4.pdf`,
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      }

      await html2pdf().set(a4Options).from(clonedElement).save()

      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate Letter size PDF
      const letterOptions = {
        ...baseOptions,
        filename: `Invoice_${invoice.invoiceNumber}_Letter.pdf`,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      await html2pdf().set(letterOptions).from(clonedElement).save()

      onComplete?.()
    } catch (error) {
      console.error("Multiple format generation error:", error)
      onError?.(error as Error)
    }
  }, [invoiceRef, invoice, onStart, onComplete, onError])

  return {
    generatePDF,
    generateAndPreview,
    generateMultipleFormats,
  }
}
