"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat/chat-interface"

export function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)
  const [urgentMessage, setUrgentMessage] = useState<string | null>(null)
  const [showUrgentPopup, setShowUrgentPopup] = useState(false)

  // Simulate receiving an urgent message
  useEffect(() => {
    const timer = setTimeout(() => {
      setUrgentMessage("Urgent: Staff meeting in 15 minutes!")
      setShowUrgentPopup(true)

      // Set up recurring popup for urgent message
      const popupInterval = setInterval(
        () => {
          setShowUrgentPopup(true)
        },
        3 * 60 * 1000,
      ) // Every 3 minutes

      // Clear interval after 20 minutes
      const clearTimer = setTimeout(
        () => {
          clearInterval(popupInterval)
        },
        20 * 60 * 1000,
      ) // After 20 minutes

      return () => {
        clearInterval(popupInterval)
        clearTimeout(clearTimer)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
      return
    }
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
    setIsOpen(false)
  }

  const maximizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(false)
    setIsOpen(true)
  }

  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setIsMinimized(false)
  }

  const dismissUrgentMessage = () => {
    setShowUrgentPopup(false)
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={toggleChat}>
        <MessageSquare className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="fixed right-4 bottom-4 w-96 h-[500px] bg-background border rounded-lg shadow-lg z-50 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">Messages</h3>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={minimizeChat}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={closeChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      )}

      {isMinimized && (
        <div
          className="fixed right-4 bottom-0 bg-background border rounded-t-lg shadow-lg z-50 cursor-pointer"
          onClick={maximizeChat}
        >
          <div className="flex items-center justify-between p-2 w-64">
            <h3 className="font-semibold text-sm">Messages</h3>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={maximizeChat}>
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={closeChat}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {showUrgentPopup && urgentMessage && (
        <div className="fixed top-20 right-4 w-80 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 p-4 animate-pulse">
          <div className="flex justify-between items-start">
            <p className="font-medium text-red-800">{urgentMessage}</p>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={dismissUrgentMessage}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-red-600 mt-1">This message will reappear every 3 minutes</p>
        </div>
      )}
    </>
  )
}
