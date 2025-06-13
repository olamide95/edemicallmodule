import { ChevronRight, FileText } from "lucide-react"
import Link from "next/link"

interface ShortcutItem {
  title: string
  count: string | number
  href: string
}

export function ShortcutsSection() {
  const shortcuts: ShortcutItem[] = [
    { title: "Mark Student Attendance", count: "30", href: "/academics/attendance" },
    { title: "Create Event & Task", count: "396k", href: "/academics/events" },
    { title: "Parent Communication", count: "36k", href: "/academics/communication" },
    { title: "Create Homework", count: "0", href: "/academics/homework" },
    { title: "Create Activity Upload", count: "0", href: "/academics/activity-upload" },
    { title: "School Pickup", count: "0", href: "/academics/school-pickup" },
    { title: "Parent Teacher Conference", count: "0", href: "/academics/ptc" },
    { title: "Publish Report Card", count: "0", href: "/academics/publish-report" },
    { title: "Extracurricular Activities", count: "0", href: "/academics/extracurricular" },
    { title: "Payment Entry Request", count: "0", href: "/academics/payment-entry" },
    { title: "Request Expense Entry", count: "0", href: "/academics/expense-entry" },
    { title: "Daily Work Summary", count: "0", href: "/academics/daily-summary" },
  ]

  return (
    <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
        <h2 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">Your Shortcuts</h2>
        <Link
          href="/"
          className="flex items-center gap-1 text-[#8C57FF] hover:text-[#7C3AED] transition-colors text-sm font-medium"
        >
          Go back to Academic dashboard
          <div className="flex items-center ml-1">
            <ChevronRight size={14} />
            <ChevronRight size={14} className="-ml-1" />
          </div>
        </Link>
      </div>

      {/* Shortcuts Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {shortcuts.map((shortcut, index) => (
            <Link
              key={index}
              href={shortcut.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] hover:border-[#8C57FF] dark:hover:border-[#8C57FF] hover:shadow-sm transition-all duration-200 group bg-white dark:bg-[#312D4B]"
            >
              <div className="flex-shrink-0">
                <FileText size={18} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] leading-tight">
                  {shortcut.title}
                </span>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.15)] text-[#8C57FF] text-xs font-semibold rounded-md">
                  {shortcut.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
