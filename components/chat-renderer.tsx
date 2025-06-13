"use client"

import { useChat } from "@/contexts/chat-context"
import { ChatPopup } from "@/components/chat-popup"
import { MinimizedChat } from "@/components/minimized-chat"
import { Draggable } from "@/components/draggable"
import { useEffect, useState } from "react"

export function ChatRenderer() {
  const { isLoggedIn, isChatPopupOpen, toggleChatPopup, closeChatPopup } = useChat()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to ensure we're running on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isLoggedIn || !mounted) return null

  return (
    <>
      {isChatPopupOpen ? (
        <Draggable
          localStorageKey="chat-popup-position"
          initialPosition="bottom-right"
          popupWidth={384}
          popupHeight={600}
          paddingFromEdge={20}
          animateFromBottom={true}
        >
          <ChatPopup onClose={closeChatPopup} />
        </Draggable>
      ) : (
        <div className="fixed bottom-4 right-4 z-50" style={{ position: "fixed", bottom: "16px", right: "16px" }}>
          <MinimizedChat onClick={toggleChatPopup} />
        </div>
      )}
    </>
  )
}
