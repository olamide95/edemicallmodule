"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"

// Sample data
const conversations = [
  {
    id: 1,
    name: "John Smith",
    role: "Parent",
    avatar: "/abstract-parent-avatar.png",
    lastMessage: "When is the next payment due?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Parent",
    avatar: "/abstract-parent-avatar.png",
    lastMessage: "Thank you for the information.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Parent",
    avatar: "/abstract-parent-avatar.png",
    lastMessage: "I've submitted the payment.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Staff",
    avatar: "/abstract-admin-interface.png",
    lastMessage: "Can you check this student's record?",
    time: "Monday",
    unread: 0,
  },
]

const messages = [
  {
    id: 1,
    sender: "John Smith",
    role: "parent",
    content: "Hello, I have a question about my son's tuition fee.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Admin",
    role: "admin",
    content: "Hi John, how can I help you today?",
    time: "10:16 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "John Smith",
    role: "parent",
    content: "I want to know when the next payment is due and how much I need to pay.",
    time: "10:20 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Admin",
    role: "admin",
    content:
      "The next payment is due on May 15th. The amount is $1,250.00. You can pay through the parent portal using any of our supported payment methods.",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "John Smith",
    role: "parent",
    content: "Is there any discount if I pay the full year in advance?",
    time: "10:28 AM",
    isMe: false,
  },
  {
    id: 6,
    sender: "John Smith",
    role: "parent",
    content: "Also, do you accept bank transfers?",
    time: "10:30 AM",
    isMe: false,
  },
]

export function ChatInterface() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<any>(conversations[0])
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
      sender: "Admin",
      role: "admin",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "parents" && conversation.role === "Parent") ||
      (activeTab === "staff" && conversation.role === "Staff") ||
      (activeTab === "unread" && conversation.unread > 0)

    return matchesSearch && matchesTab
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
          <CardDescription>Chat with parents and staff</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-4 py-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="parents">Parents</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 hover:bg-muted cursor-pointer ${
                  selectedConversation?.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conversation.name}</p>
                      <p className="text-xs text-muted-foreground">{conversation.time}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">No conversations found</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b px-4 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                  />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                  <CardDescription>{selectedConversation.role}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
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
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
