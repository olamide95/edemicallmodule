"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, Download, CreditCard, User } from "lucide-react"

function Logo() {
  return (
    <div className="flex justify-center mb-2">
      <img src="/abstract-school-crest.png" alt="School Logo" className="h-16" />
    </div>
  )
}

export function ReceiptTemplate2({ data }: { data: any }) {
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
        <Button onClick={handlePrint} className="flex items-center gap-2 bg-[#8C57FF] hover:bg-[#8C57FF]/90">
          <Printer size={16} />
          Print Receipt
        </Button>
        <Button variant="outline" className="flex items-center gap-2 border-[#8C57FF] text-[#8C57FF]">
          <Download size={16} />
          Download PDF
        </Button>
      </div>

      {/* A4 Landscape Page Container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        <div className="flex flex-col print:flex-col">
          {/* Original Receipt */}
          <div className="w-full p-6 border-b border-dashed border-gray-300 relative">
            {/* Diagonal Stripe Background */}
            <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#8C57FF,#8C57FF_10px,transparent_10px,transparent_20px)]"></div>
            </div>

            {/* Receipt Type Watermark */}
            <div className="absolute top-4 right-4 transform rotate-12">
              <div className="text-[#8C57FF]/30 text-5xl font-bold opacity-20">ORIGINAL</div>
            </div>

            {/* Header Section with Logo, Company and Customer */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 relative">
              {/* Logo and Company Info */}
              <div className="flex-1 text-center relative">
                <div className="absolute top-0 left-0 w-16 h-16 bg-[#8C57FF] rounded-br-3xl"></div>
                <div className="pt-4">
                  <Logo />
                  <h1 className="text-2xl font-bold text-[#8C57FF] mt-2">{data.company}</h1>
                  <p className="text-gray-600">{data.address}</p>
                  <p className="text-gray-600">{data.phone}</p>
                  <p className="text-gray-600">{data.email}</p>
                </div>
              </div>

              {/* Receipt Info */}
              <div className="flex-1">
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg mb-3">
                  <div className="text-sm text-[#8C57FF]">Receipt No</div>
                  <div className="font-bold">{data.receiptNumber}</div>
                </div>
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg mb-3">
                  <div className="text-sm text-[#8C57FF]">Date</div>
                  <div className="font-bold">{data.date}</div>
                </div>
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg">
                  <div className="text-sm text-[#8C57FF]">Payment Method</div>
                  <div className="font-bold">{data.paymentMethod}</div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex-1">
                <div className="bg-white p-4 rounded-lg border border-[#8C57FF]/20">
                  <h2 className="text-lg font-semibold text-[#8C57FF] mb-2 flex items-center">
                    <User size={18} className="text-[#8C57FF] mr-2" />
                    Customer Details
                  </h2>
                  <p className="text-gray-700 font-medium">{data.customer.name}</p>
                  <p className="text-gray-600">{data.customer.email}</p>
                  <p className="text-gray-600">{data.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8 mb-6">
              <div className="bg-[#8C57FF]/5 p-6 rounded-lg border border-[#8C57FF]/20">
                <div className="flex items-center mb-4">
                  <CreditCard size={24} className="text-[#8C57FF] mr-2" />
                  <h2 className="text-xl font-semibold text-[#8C57FF]">Payment Summary</h2>
                </div>
                <div className="flex justify-between py-2 text-lg">
                  <span className="text-[#8C57FF]">Amount Paid:</span>
                  <span className="font-bold">₦{data.amountPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Invoice Reference:</span>
                  <span className="font-bold">{data.invoice.reference}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Invoice Amount:</span>
                  <span className="font-bold">₦{data.invoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Balance Due:</span>
                  <span className="font-bold">₦{data.balanceDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[#8C57FF] text-xl font-bold mt-2">
                  <span className="text-[#8C57FF]">Total:</span>
                  <span className="text-[#8C57FF]">₦{(data.amountPaid + data.balanceDue).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[#8C57FF] border-t border-[#8C57FF]/20 pt-4 mt-12">
              <p className="font-medium">{data.notes}</p>
              <p className="mt-2 text-sm">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>

          {/* Duplicate Receipt */}
          <div className="w-full p-6 bg-[#8C57FF]/5 print:bg-[#8C57FF]/5 relative">
            {/* Diagonal Stripe Background */}
            <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#8C57FF,#8C57FF_10px,transparent_10px,transparent_20px)]"></div>
            </div>

            {/* Receipt Type Watermark */}
            <div className="absolute top-4 right-4 transform rotate-12">
              <div className="text-[#8C57FF]/30 text-5xl font-bold opacity-20">DUPLICATE</div>
            </div>

            {/* Header Section with Logo, Company and Customer */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 relative">
              {/* Logo and Company Info */}
              <div className="flex-1 text-center relative">
                <div className="absolute top-0 left-0 w-16 h-16 bg-[#8C57FF] rounded-br-3xl"></div>
                <div className="pt-4">
                  <Logo />
                  <h1 className="text-2xl font-bold text-[#8C57FF] mt-2">{data.company}</h1>
                  <p className="text-gray-600">{data.address}</p>
                  <p className="text-gray-600">{data.phone}</p>
                  <p className="text-gray-600">{data.email}</p>
                </div>
              </div>

              {/* Receipt Info */}
              <div className="flex-1">
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg mb-3">
                  <div className="text-sm text-[#8C57FF]">Receipt No</div>
                  <div className="font-bold">{data.receiptNumber}</div>
                </div>
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg mb-3">
                  <div className="text-sm text-[#8C57FF]">Date</div>
                  <div className="font-bold">{data.date}</div>
                </div>
                <div className="bg-[#8C57FF]/10 px-4 py-3 rounded-lg">
                  <div className="text-sm text-[#8C57FF]">Payment Method</div>
                  <div className="font-bold">{data.paymentMethod}</div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex-1">
                <div className="bg-white p-4 rounded-lg border border-[#8C57FF]/20">
                  <h2 className="text-lg font-semibold text-[#8C57FF] mb-2 flex items-center">
                    <User size={18} className="text-[#8C57FF] mr-2" />
                    Customer Details
                  </h2>
                  <p className="text-gray-700 font-medium">{data.customer.name}</p>
                  <p className="text-gray-600">{data.customer.email}</p>
                  <p className="text-gray-600">{data.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-8 mb-6">
              <div className="bg-white p-6 rounded-lg border border-[#8C57FF]/20">
                <div className="flex items-center mb-4">
                  <CreditCard size={24} className="text-[#8C57FF] mr-2" />
                  <h2 className="text-xl font-semibold text-[#8C57FF]">Payment Summary</h2>
                </div>
                <div className="flex justify-between py-2 text-lg">
                  <span className="text-[#8C57FF]">Amount Paid:</span>
                  <span className="font-bold">₦{data.amountPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Invoice Reference:</span>
                  <span className="font-bold">{data.invoice.reference}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Invoice Amount:</span>
                  <span className="font-bold">₦{data.invoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg border-t border-[#8C57FF]/30 mt-2">
                  <span className="text-[#8C57FF]">Balance Due:</span>
                  <span className="font-bold">₦{data.balanceDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-[#8C57FF] text-xl font-bold mt-2">
                  <span className="text-[#8C57FF]">Total:</span>
                  <span className="text-[#8C57FF]">₦{(data.amountPaid + data.balanceDue).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[#8C57FF] border-t border-[#8C57FF]/20 pt-4 mt-12">
              <p className="font-medium">{data.notes}</p>
              <p className="mt-2 text-sm">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
