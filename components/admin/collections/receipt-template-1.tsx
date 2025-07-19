"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, Download } from "lucide-react"

function Logo() {
  return (
    <div className="flex justify-center mb-2">
      <img src="/abstract-school-crest.png" alt="School Logo" className="h-16" />
    </div>
  )
}

export function ReceiptTemplate1({ data }: { data: any }) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 500)
  }

  return (
    <div className="p-4 max-w-[297mm] mx-auto">
      {/* Print Controls - Hidden during printing */}
      <div className={`flex gap-4 mb-6 ${isPrinting ? "hidden" : "flex"} print:hidden`}>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer size={16} />
          Print Receipt
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Download PDF
        </Button>
      </div>

      {/* A4 Landscape Page Container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        <div className="flex flex-col print:flex-col">
          {/* Original Receipt */}
          <div className="w-full p-6 border-b border-dashed border-gray-300">
            {/* Receipt Type Watermark */}
            <div className="absolute top-6 right-6 bg-[#8C57FF] text-white px-4 py-1 rounded-bl-lg font-bold">
              ORIGINAL
            </div>

            {/* Header Section with Logo, Company and Customer */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Logo and Company Info */}
              <div className="flex-1 text-center">
                <Logo />
                <h1 className="text-2xl font-bold text-[#8C57FF]">{data.company}</h1>
                <p className="text-gray-600">{data.address}</p>
                <p className="text-gray-600">
                  {data.phone} | {data.email}
                </p>
                <p className="text-gray-600">{data.website}</p>
              </div>

              {/* Receipt Info */}
              <div className="flex-1">
                <div className="border-t border-b border-[#8C57FF]/20 py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Receipt No:</span>
                    <span>{data.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>{data.date}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Payment Method:</span>
                    <span>{data.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex-1">
                <div className="bg-[#8C57FF]/10 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-[#8C57FF] mb-2">Customer</h2>
                  <p className="text-gray-700">{data.customer.name}</p>
                  <p className="text-gray-600">{data.customer.email}</p>
                  <p className="text-gray-600">{data.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8 mb-6">
              <div className="bg-[#8C57FF]/10 p-6 rounded-lg">
                <div className="flex justify-between py-2 text-lg">
                  <span className="font-semibold text-[#8C57FF]">Amount Paid:</span>
                  <span className="font-bold">₦{data.amountPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Invoice Reference:</span>
                  <span className="font-bold">{data.invoice.reference}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Invoice Amount:</span>
                  <span className="font-bold">₦{data.invoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Balance Due:</span>
                  <span className="font-bold">₦{data.balanceDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[#8C57FF] text-xl font-bold mt-2">
                  <span className="text-[#8C57FF]">Total:</span>
                  <span className="text-[#8C57FF]">₦{(data.amountPaid + data.balanceDue).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-600 text-sm mt-12">
              <p>{data.notes}</p>
              <p className="mt-2">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>

          {/* Duplicate Receipt */}
          <div className="w-full p-6 bg-[#8C57FF]/5 print:bg-[#8C57FF]/5">
            {/* Receipt Type Watermark */}
            <div className="absolute top-6 right-6 bg-[#8C57FF] text-white px-4 py-1 rounded-bl-lg font-bold">
              DUPLICATE
            </div>

            {/* Header Section with Logo, Company and Customer */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Logo and Company Info */}
              <div className="flex-1 text-center">
                <Logo />
                <h1 className="text-2xl font-bold text-[#8C57FF]">{data.company}</h1>
                <p className="text-gray-600">{data.address}</p>
                <p className="text-gray-600">
                  {data.phone} | {data.email}
                </p>
                <p className="text-gray-600">{data.website}</p>
              </div>

              {/* Receipt Info */}
              <div className="flex-1">
                <div className="border-t border-b border-[#8C57FF]/20 py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Receipt No:</span>
                    <span>{data.receiptNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>{data.date}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold">Payment Method:</span>
                    <span>{data.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex-1">
                <div className="bg-white p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-[#8C57FF] mb-2">Customer</h2>
                  <p className="text-gray-700">{data.customer.name}</p>
                  <p className="text-gray-600">{data.customer.email}</p>
                  <p className="text-gray-600">{data.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8 mb-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-between py-2 text-lg">
                  <span className="font-semibold text-[#8C57FF]">Amount Paid:</span>
                  <span className="font-bold">₦{data.amountPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Invoice Reference:</span>
                  <span className="font-bold">{data.invoice.reference}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Invoice Amount:</span>
                  <span className="font-bold">₦{data.invoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="font-semibold text-[#8C57FF]">Balance Due:</span>
                  <span className="font-bold">₦{data.balanceDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[#8C57FF] text-xl font-bold mt-2">
                  <span className="text-[#8C57FF]">Total:</span>
                  <span className="text-[#8C57FF]">₦{(data.amountPaid + data.balanceDue).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-600 text-sm mt-12">
              <p>{data.notes}</p>
              <p className="mt-2">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
