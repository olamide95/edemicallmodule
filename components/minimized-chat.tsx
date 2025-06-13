"use client"

import { MessageSquare, ChevronUp } from "lucide-react"
import { useChat } from "@/contexts/chat-context"

interface MinimizedChatProps {
  onClick: () => void
}

export function MinimizedChat({ onClick }: MinimizedChatProps) {
  const { unreadMessages } = useChat()

  return (
    <button
      onClick={onClick}
      className="w-60 h-12 bg-light-card-bg dark:bg-dark-card-bg rounded-t-lg shadow-lg flex items-center justify-between px-4 cursor-pointer border border-b-0 border-divider hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
      aria-label="Open chat"
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Chat</span>
        {unreadMessages > 0 && (
          <span className="ml-1 px-2 py-0.5 bg-error text-white rounded-full text-xs">{unreadMessages}</span>
        )}
      </div>
      <ChevronUp className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
    </button>
  )
}
