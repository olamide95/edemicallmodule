"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface ChatContextType {
  isChatPopupOpen: boolean
  openChatPopup: () => void
  closeChatPopup: () => void
  toggleChatPopup: () => void
  isLoggedIn: boolean
  unreadMessages: number
  setUnreadMessages: React.Dispatch<React.SetStateAction<number>>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(3) // Initial example unread count

  useEffect(() => {
    setIsClient(true)
  }, [])

  const checkLoginStatus = useCallback(() => {
    if (isClient) {
      const userRole = localStorage.getItem("userRole")
      if (userRole) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        setIsChatPopupOpen(false) // Ensure chat is closed if logged out
      }
    }
  }, [isClient])

  useEffect(() => {
    checkLoginStatus()
  }, [checkLoginStatus])

  // Listen for storage changes to handle login/logout from other tabs or direct localStorage manipulation
  useEffect(() => {
    if (!isClient) return

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userRole") {
        checkLoginStatus()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    // Also check on focus in case localStorage was changed while tab was inactive
    window.addEventListener("focus", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", checkLoginStatus)
    }
  }, [isClient, checkLoginStatus])

  const openChatPopup = useCallback(() => setIsChatPopupOpen(true), [])
  const closeChatPopup = useCallback(() => setIsChatPopupOpen(false), [])
  const toggleChatPopup = useCallback(() => setIsChatPopupOpen((prev) => !prev), [])

  return (
    <ChatContext.Provider
      value={{
        isChatPopupOpen,
        openChatPopup,
        closeChatPopup,
        toggleChatPopup,
        isLoggedIn,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
