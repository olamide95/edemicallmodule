"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip } from "lucide-react"

// Sample data
const messages = [
  {
    id: 1,
    sender: "John Smith",
    role: "parent",
    content: "Hello, I have a question about my son's tuition fee.",
    time: "10:15 AM",
    isMe: true,
  },
  {
    id: 2,
    sender: "Admin",
    role: "admin",
    content: "Hi John, how can I help you today?",
    time: "10:16 AM",
    isMe: false,
  },
  {
    id: 3,
    sender: "John Smith",
    role: "parent",
    content: "I want to know when the next payment is due and how much I need to pay.",
    time: "10:20 AM",
    isMe: true,
  },
  {
    id: 4,
    sender: "Admin",
    role: "admin",
    content:
      "The next payment is due on May 15th. The amount is $1,250.00. You can pay through the parent portal using any of our supported payment methods.",
    time: "10:25 AM",
    isMe: false,
  },
  {
    id: 5,
    sender: "John Smith",
    role: "parent",
    content: "Is there any discount if I pay the full year in advance?",
    time: "10:28 AM",
    isMe: true,
  },
  {
    id: 6,
    sender: "John Smith",
    role: "parent",
    content: "Also, do you accept bank transfers?",
    time: "10:30 AM",
    isMe: true,
  },
]

export function ParentChatInterface() {
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: chatMessages.length + 1,
      sender: "John Smith",
      role: "parent",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")

    // Simulate admin response after 1 second
    setTimeout(() => {
      const adminResponse = {
        id: chatMessages.length + 2,
        sender: "Admin",
        role: "admin",
        content: "Thank you for your message. A finance officer will get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: false,
      }
      setChatMessages((prev) => [...prev, adminResponse])
    }, 1000)
  }

  return (
    <Card>
      <CardHeader className="border-b px-4 py-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/abstract-admin-interface.png" alt="School Admin" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">School Finance Support</CardTitle>
            <CardDescription>Typically replies within 1 hour</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
