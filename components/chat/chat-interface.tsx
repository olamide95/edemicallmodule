"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  MoreHorizontal,
  Edit,
  Check,
  X,
  Reply,
  Calendar,
  FileText,
  Users,
  Clock,
  ListTodo,
  BarChart,
  AtSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for direct messages
const directChats = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?key=js",
    lastMessage: "When is the next payment due?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?key=sj",
    lastMessage: "Thank you for the information.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?key=mb",
    lastMessage: "I've submitted the payment.",
    time: "Yesterday",
    unread: 1,
  },
]

// Sample data for group chats
const groupChats = [
  {
    id: 101,
    name: "Finance Team",
    avatar: "/placeholder.svg?key=ft",
    lastMessage: "Meeting at 2 PM tomorrow",
    time: "11:45 AM",
    unread: 5,
    members: 8,
  },
  {
    id: 102,
    name: "School Admin",
    avatar: "/placeholder.svg?key=sa",
    lastMessage: "New policy document shared",
    time: "Yesterday",
    unread: 0,
    members: 12,
  },
  {
    id: 103,
    name: "IT Support",
    avatar: "/placeholder.svg?key=it",
    lastMessage: "System maintenance this weekend",
    time: "Monday",
    unread: 0,
    members: 5,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: {
      id: 101,
      name: "John Smith",
      avatar: "/placeholder.svg?key=js",
    },
    content: "Hello, I have a question about the upcoming fee payment.",
    time: "10:15 AM",
    status: "read",
    isMe: false,
    replyTo: null,
  },
  {
    id: 2,
    sender: {
      id: 999, // current user
      name: "Me",
      avatar: "/placeholder.svg?key=me",
    },
    content: "Hi John, how can I help you today?",
    time: "10:16 AM",
    status: "read",
    isMe: true,
    replyTo: null,
  },
  {
    id: 3,
    sender: {
      id: 101,
      name: "John Smith",
      avatar: "/placeholder.svg?key=js",
    },
    content: "I want to know when the next payment is due and how much I need to pay.",
    time: "10:20 AM",
    status: "read",
    isMe: false,
    replyTo: null,
  },
  {
    id: 4,
    sender: {
      id: 999,
      name: "Me",
      avatar: "/placeholder.svg?key=me",
    },
    content:
      "The next payment is due on May 15th. The amount is $1,250.00. You can pay through the parent portal using any of our supported payment methods.",
    time: "10:25 AM",
    status: "delivered",
    isMe: true,
    replyTo: null,
  },
  {
    id: 5,
    sender: {
      id: 101,
      name: "John Smith",
      avatar: "/placeholder.svg?key=js",
    },
    content: "Is there any discount if I pay the full year in advance?",
    time: "10:28 AM",
    status: "delivered",
    isMe: false,
    replyTo: null,
  },
  {
    id: 6,
    sender: {
      id: 101,
      name: "John Smith",
      avatar: "/placeholder.svg?key=js",
    },
    content: "Also, do you accept bank transfers?",
    time: "10:30 AM",
    status: "sent",
    isMe: false,
    replyTo: null,
  },
  {
    id: 7,
    sender: {
      id: 999,
      name: "Me",
      avatar: "/placeholder.svg?key=me",
    },
    content:
      "Yes, we offer a 5% discount for full year payments. And yes, we do accept bank transfers. I'll send you the details.",
    time: "10:32 AM",
    status: "sent",
    isMe: true,
    replyTo: {
      id: 5,
      content: "Is there any discount if I pay the full year in advance?",
      sender: "John Smith",
    },
  },
]

export function ChatInterface() {
  const [activeTab, setActiveTab] = useState("direct")
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedChat, setSelectedChat] = useState(directChats[0])
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [replyingTo, setReplyingTo] = useState<any | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mentionMode, setMentionMode] = useState(false)
  const [mentionSearch, setMentionSearch] = useState("")

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Process message text to highlight dates and mentions
  const processMessageText = (text: string) => {
    // Simple date regex (can be improved for more complex date formats)
    const dateRegex =
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(st|nd|rd|th)?\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g

    // Replace dates with underlined spans
    let processedText = text.replace(
      dateRegex,
      (match) => `<span class="underline text-blue-600 cursor-pointer">${match}</span>`,
    )

    // Replace @mentions with styled spans
    processedText = processedText.replace(/@(\w+)/g, '<span class="text-blue-600 font-medium">@$1</span>')

    return processedText
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: {
        id: 999,
        name: "Me",
        avatar: "/placeholder.svg?key=me",
      },
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      isMe: true,
      replyTo: replyingTo,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setReplyingTo(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "@" && !mentionMode) {
      setMentionMode(true)
      setMentionSearch("")
    } else if (mentionMode) {
      if (e.key === " ") {
        setMentionMode(false)
      } else if (e.key !== "@") {
        setMentionSearch((prev) => prev + e.key)
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startEditMessage = (message: any) => {
    setEditingMessageId(message.id)
    setEditText(message.content)
  }

  const saveEditMessage = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, content: editText } : msg)))
    setEditingMessageId(null)
    setEditText("")
  }

  const cancelEditMessage = () => {
    setEditingMessageId(null)
    setEditText("")
  }

  const startReplyMessage = (message: any) => {
    setReplyingTo({
      id: message.id,
      content: message.content,
      sender: message.sender.name,
    })
  }

  const cancelReply = () => {
    setReplyingTo(null)
  }

  // Function to render message status indicator
  const renderMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <span className="text-xs text-gray-400">Sent</span>
      case "delivered":
        return <span className="text-xs text-gray-400">Delivered</span>
      case "read":
        return <span className="text-xs text-blue-500">Read</span>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct">Direct</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="direct" className="h-[400px] flex flex-col">
          <div className="overflow-y-auto flex-1">
            {directChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-2 hover:bg-muted cursor-pointer ${
                  selectedChat.id === chat.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex flex-col space-y-3">
              {replyingTo && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <div className="flex items-center gap-2">
                    <Reply className="h-4 w-4 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground truncate">
                      <span className="font-medium">{replyingTo.sender}:</span> {replyingTo.content}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-5 w-5" onClick={cancelReply}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Schedule Meeting</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Create Poll</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Create Appointment</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <ListTodo className="mr-2 h-4 w-4" />
                      <span>Create Task</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Share Document</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Paperclip className="h-5 w-5" />
                </Button>

                <div className="relative flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pr-8"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>

                  {mentionMode && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-background border rounded-md shadow-md z-10">
                      <div className="p-2">
                        <div className="flex items-center gap-2 p-1 hover:bg-muted cursor-pointer rounded">
                          <AtSign className="h-4 w-4" />
                          <span>John Smith</span>
                        </div>
                        <div className="flex items-center gap-2 p-1 hover:bg-muted cursor-pointer rounded">
                          <AtSign className="h-4 w-4" />
                          <span>Sarah Johnson</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="h-[400px] flex flex-col">
          <div className="overflow-y-auto flex-1">
            {groupChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-2 hover:bg-muted cursor-pointer ${
                  selectedChat.id === chat.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <p className="font-medium truncate">{chat.name}</p>
                      <Badge variant="outline" className="ml-1 text-xs">
                        {chat.members}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Manage Group</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Create Poll</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Share Document</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon" className="h-9 w-9">
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="relative flex-1">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 border-t">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
            <div className="flex flex-col max-w-[80%]">
              {message.replyTo && (
                <div className={`rounded-t-lg p-2 text-xs ${message.isMe ? "bg-primary/10 text-right" : "bg-muted"}`}>
                  <span className="font-medium">{message.replyTo.sender}:</span>{" "}
                  {message.replyTo.content.length > 50
                    ? message.replyTo.content.substring(0, 50) + "..."
                    : message.replyTo.content}
                </div>
              )}

              <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} items-start gap-2`}>
                {!message.isMe && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg p-3 ${message.replyTo ? "rounded-t-none" : ""} ${
                    message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {editingMessageId === message.id ? (
                    <div className="flex flex-col gap-2">
                      <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="bg-background" />
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={cancelEditMessage}>
                          <X className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => saveEditMessage(message.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: processMessageText(message.content) }}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {message.time}
                        </span>
                        {message.isMe && renderMessageStatus(message.status)}
                      </div>
                    </>
                  )}
                </div>

                {!editingMessageId && (
                  <div className={`opacity-0 hover:opacity-100 transition-opacity ${message.isMe ? "mr-2" : "ml-2"}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => startReplyMessage(message)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reply</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {message.isMe && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => startEditMessage(message)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
