"use client"
import { MessageSquare } from "lucide-react"

interface ChatIconWithBadgeProps {
  unreadCount: number
}

export function ChatIconWithBadge({ unreadCount }: ChatIconWithBadgeProps) {
  return (
    <div className="relative">
      <MessageSquare className="h-5 w-5 text-light-text-primary dark:text-[#EFE3FC] dark:text-opacity-90" />
      {unreadCount > 0 && (
        <span className="absolute top-[-2px] right-[-2px] w-4 h-4 bg-error text-white rounded-full text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  )
}
