"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample messages data
const messages = [
  {
    id: 1,
    sender: "Admin",
    avatar: "/abstract-admin-interface.png",
    content: "Hello! How can I help you today?",
    timestamp: "10:30 AM",
    isUser: false,
  },
  {
    id: 2,
    sender: "You",
    content: "I have a question about my invoice",
    timestamp: "10:32 AM",
    isUser: true,
  },
  {
    id: 3,
    sender: "Admin",
    avatar: "/abstract-admin-interface.png",
    content: "Sure, what would you like to know?",
    timestamp: "10:33 AM",
    isUser: false,
  },
]

export function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(messages)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    }
    
    setChatMessages([...chatMessages, userMessage])
    setNewMessage('')
    
    // Simulate admin response after a short delay
    setTimeout(() => {
      const adminResponse = {
        id: chatMessages.length + 2,
        sender: 'Admin',
        avatar: '/abstract-admin-interface.png',
        content: 'Thanks for your message. I\'ll get back to you shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      }
      setChatMessages(prev => [...prev, adminResponse])
    }, 1000)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
          <h3 className="font-medium">Messages</h3>
          <Button variant="ghost" size="sm" className="h-8 text-primary-foreground" onClick={() => window.location.href = '/admin/chat'}>
            View All
          </Button>
        </div>
        <ScrollArea className="h-[300px] p-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 mb-4 ${message.isUser ? 'flex-row-reverse' : ''}`}
            >
              {!message.isUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.is

\
Let's update the sidebar to include links to the new modules:
