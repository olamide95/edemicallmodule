"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Users,
  X,
  Search,
  Paperclip,
  Mic,
  Smile,
  Send,
  ThumbsUp,
  MessageCircle,
  ListChecks,
  CalendarPlus,
  UsersRound,
  Settings2,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileArchive,
  FileQuestion,
  Trash2,
  MoreVertical,
  Reply,
  Copy,
  Forward,
  CheckSquare,
  Pin,
  UserPlus,
  Settings,
  BellOff,
  LogOut,
  Info,
  Star,
  Check,
  CheckCheck,
  Download,
  Play,
  Pause,
  Edit3,
  Volume2,
  Heart,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// --- Helper Functions ---
const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  if (!extension) return <FileQuestion className="h-8 w-8 text-light-text-secondary dark:text-dark-text-secondary" />

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return <FileImage className="h-8 w-8 text-blue-500" />
  }
  if (["pdf"].includes(extension)) {
    return <FileText className="h-8 w-8 text-red-500" />
  }
  if (["doc", "docx"].includes(extension)) {
    return <FileText className="h-8 w-8 text-sky-600" />
  }
  if (["xls", "xlsx", "csv"].includes(extension)) {
    return <FileText className="h-8 w-8 text-green-600" />
  }
  if (["ppt", "pptx"].includes(extension)) {
    return <FileText className="h-8 w-8 text-orange-500" />
  }
  if (["mp3", "wav", "ogg"].includes(extension)) {
    return <FileAudio className="h-8 w-8 text-purple-500" />
  }
  if (["mp4", "mov", "avi", "mkv"].includes(extension)) {
    return <FileVideo className="h-8 w-8 text-pink-500" />
  }
  if (["zip", "rar", "tar", "gz"].includes(extension)) {
    return <FileArchive className="h-8 w-8 text-yellow-500" />
  }
  return <FileQuestion className="h-8 w-8 text-light-text-secondary dark:text-dark-text-secondary" />
}

// --- Emoji Data ---
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "👍",
  "👎",
  "👌",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👈",
  "👉",
  "👆",
  "👇",
  "☝️",
  "👋",
  "🤚",
  "🖐️",
  "✋",
  "🖖",
  "👏",
  "🙌",
  "🤝",
  "🙏",
  "✍️",
  "💪",
  "🦾",
  "🦿",
  "🦵",
  "🦶",
  "👂",
  "👃",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💔",
  "❣️",
  "💕",
  "💞",
  "💓",
  "💗",
  "💖",
  "💘",
  "💝",
  "💟",
  "☮️",
]

// --- Mock Data & Interfaces ---
interface ChatListItem {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unreadCount?: number
  isOnline?: boolean
  isTyping?: boolean
  type: "direct" | "group"
  members?: GroupMember[]
}

interface GroupMember {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
}

interface Attachment {
  id: string
  name: string
  type: "image" | "pdf" | "doc" | "audio" | "video" | "archive" | "other"
  url: string
  previewUrl?: string
  size?: number
}

interface VoiceNote {
  id: string
  url: string
  duration: number
}

interface Poll {
  id: string
  question: string
  type: "single" | "multiple" | "yesno" | "custom"
  options: { id: string; text: string; votes: number }[]
  allowCustomOptions: boolean
  totalVotes: number
  userVote?: string[]
}

interface Task {
  id: string
  title: string
  description?: string
  assignedTo: string[]
  dueDate?: string
  status: "not-started" | "ongoing" | "completed"
  createdBy: string
}

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  isAllDay: boolean
  isRepeating: boolean
  reminder?: string
}

interface Message {
  id: string
  sender: string
  senderName?: string
  avatar?: string
  content?: string
  attachments?: Attachment[]
  voiceNote?: VoiceNote
  poll?: Poll
  task?: Task
  event?: Event
  timestamp: string
  status?: "sent" | "delivered" | "read"
  replyTo?: { messageId: string; content: string; sender: string }
  isEdited?: boolean
  editedAt?: string
  mentions?: string[]
  reactions?: { emoji: string; users: string[] }[]
}

const mockGroupMembers: GroupMember[] = [
  { id: "alice", name: "Alice Wonderland", avatar: "/placeholder.svg?width=32&height=32", isOnline: true },
  { id: "bob", name: "Bob The Builder", avatar: "/placeholder.svg?width=32&height=32", isOnline: false },
  { id: "charlie", name: "Charlie Chaplin", avatar: "/placeholder.svg?width=32&height=32", isOnline: true },
  { id: "diana", name: "Diana Prince", avatar: "/placeholder.svg?width=32&height=32", isOnline: false },
]

const mockDirectChats: ChatListItem[] = [
  {
    id: "d1",
    name: "Alice Wonderland",
    avatar: "/placeholder.svg?width=40&height=40",
    lastMessage: "Check out this image!",
    time: "10:35 AM",
    unreadCount: 1,
    isOnline: true,
    type: "direct",
  },
  {
    id: "d2",
    name: "Bob The Builder",
    avatar: "/placeholder.svg?width=40&height=40",
    lastMessage: "Sent the document.",
    time: "Yesterday",
    isOnline: false,
    type: "direct",
  },
]

const mockGroupChats: ChatListItem[] = [
  {
    id: "g1",
    name: "Project Phoenix Team",
    avatar: "/placeholder.svg?width=40&height=40",
    lastMessage: "Alice: New designs attached.",
    time: "11:15 AM",
    unreadCount: 3,
    type: "group",
    members: mockGroupMembers,
  },
]

const mockMessages: Message[] = [
  {
    id: "m1",
    sender: "Alice Wonderland",
    avatar: "/placeholder.svg?width=32&height=32",
    content: "Hey, are you free for a call?",
    timestamp: "10:28 AM",
  },
  {
    id: "m2",
    sender: "me",
    content: "Hi Alice! Yes, I am. What time works for you?",
    timestamp: "10:29 AM",
    status: "read",
  },
  {
    id: "m3",
    sender: "Alice Wonderland",
    avatar: "/placeholder.svg?width=32&height=32",
    content: "How about 11 AM? Also, check this out:",
    attachments: [
      { id: "att1", name: "landscape.jpg", type: "image", url: "/placeholder.svg?width=300&height=200", size: 1200000 },
    ],
    timestamp: "10:30 AM",
  },
  {
    id: "m4",
    sender: "me",
    content: "Wow, beautiful! And 11 AM sounds good! 👍",
    timestamp: "10:31 AM",
    status: "delivered",
    reactions: [
      { emoji: "❤️", users: ["Alice Wonderland"] },
      { emoji: "👍", users: ["Bob The Builder", "Charlie Chaplin"] },
    ],
  },
  {
    id: "m5",
    sender: "Alice Wonderland",
    avatar: "/placeholder.svg?width=32&height=32",
    content: "Great, I'll send you the meeting link. Here's the report as well.",
    attachments: [{ id: "att2", name: "annual_report.pdf", type: "pdf", url: "#", size: 2500000 }],
    timestamp: "10:32 AM",
    replyTo: { messageId: "m2", content: "Hi Alice! Yes, I am. What time works for you?", sender: "You" },
  },
  {
    id: "m6",
    sender: "me",
    content: "Perfect! And here's a quick voice update:",
    voiceNote: { id: "vn1", url: "#mock-audio-placeholder", duration: 15 },
    timestamp: "10:33 AM",
    status: "sent",
  },
]

interface ChatPopupProps {
  onClose: () => void
}

export function ChatPopup({ onClose }: ChatPopupProps) {
  const [activeTab, setActiveTab] = useState("direct")
  const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [filesToPreview, setFilesToPreview] = useState<Attachment[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  // New states for chat selection and management
  const [selectedChats, setSelectedChats] = useState<string[]>([])
  const [isChatSelectionMode, setIsChatSelectionMode] = useState(false)
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)
  const [newChatType, setNewChatType] = useState<"direct" | "group">("direct")
  const [newChatForm, setNewChatForm] = useState({
    name: "",
    description: "",
    members: [] as string[],
  })

  // Dialog states
  const [showPollDialog, setShowPollDialog] = useState(false)
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showGroupSettingsDialog, setShowGroupSettingsDialog] = useState(false)

  // Form states
  const [pollForm, setPollForm] = useState({
    question: "",
    type: "single" as "single" | "multiple" | "yesno" | "custom",
    options: ["", ""],
    allowCustomOptions: false,
  })

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: [] as string[],
    dueDate: "",
    status: "not-started" as "not-started" | "ongoing" | "completed",
  })

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    isAllDay: false,
    isRepeating: false,
    reminder: "",
  })

  // Group Settings State
  const [allowAllMembersToSendMessage, setAllowAllMembersToSendMessage] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioPreviewPlayerRef = useRef<HTMLAudioElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Click outside handler to close menus - MOVED TO TOP
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menus = document.querySelectorAll('[id^="chat-menu-"], [id^="msg-menu-"], #input-options-menu')
      menus.forEach((menu) => {
        if (menu instanceof HTMLElement && menu.style.display === "block") {
          const target = event.target as Node
          if (
            !menu.contains(target) &&
            !target.parentElement?.classList.contains("h-6") &&
            !target.parentElement?.classList.contains("h-3")
          ) {
            menu.style.display = "none"
          }
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    return () => {
      filesToPreview.forEach((file) => {
        if (file.previewUrl && file.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(file.previewUrl)
        }
      })
      if (recordedAudioUrl && recordedAudioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(recordedAudioUrl)
      }
    }
  }, [filesToPreview, recordedAudioUrl])

  // Handle typing indicator
  useEffect(() => {
    if (messageInput.trim() && selectedChat) {
      setIsTyping(true)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [messageInput, selectedChat])

  // New function to handle @ mentions properly
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const position = e.target.selectionStart || 0

      setMessageInput(value)

      // Handle @ mentions
      const beforeCursor = value.substring(0, position)
      const atIndex = beforeCursor.lastIndexOf("@")

      if (atIndex !== -1) {
        const afterAt = beforeCursor.substring(atIndex + 1)
        if (!afterAt.includes(" ") && selectedChat?.type === "group") {
          setShowMentions(true)
          setMentionQuery(afterAt)
          setCursorPosition(position)
        } else {
          setShowMentions(false)
        }
      } else {
        setShowMentions(false)
      }
    },
    [selectedChat?.type],
  )

  const handleMentionSelect = useCallback((member: GroupMember) => {
    const input = messageInputRef.current
    if (!input) return

    const value = input.value
    const position = input.selectionStart || 0
    const beforeCursor = value.substring(0, position)
    const atIndex = beforeCursor.lastIndexOf("@")

    if (atIndex !== -1) {
      const beforeAt = value.substring(0, atIndex)
      const afterCursor = value.substring(position)
      const newValue = `${beforeAt}@${member.name} ${afterCursor}`

      setMessageInput(newValue)
      setShowMentions(false)

      setTimeout(() => {
        const newPosition = atIndex + member.name.length + 2
        input.setSelectionRange(newPosition, newPosition)
        input.focus()
      }, 0)
    }
  }, [])

  // New functions for chat management
  const handleChatAction = (chatId: string, action: string) => {
    switch (action) {
      case "select":
        setIsChatSelectionMode(true)
        setSelectedChats([chatId])
        break
      case "reply":
        const chat = [...mockDirectChats, ...mockGroupChats].find((c) => c.id === chatId)
        if (chat) {
          setSelectedChat(chat)
        }
        break
      case "forward":
        setIsChatSelectionMode(true)
        setSelectedChats([chatId])
        break
      case "delete":
        console.log("Delete chat:", chatId)
        break
      case "copy":
        console.log("Copy chat:", chatId)
        break
      case "pin":
        console.log("Pin chat:", chatId)
        break
      case "start":
        console.log("Start chat:", chatId)
        break
    }
  }

  const handleBulkChatAction = (action: "delete" | "forward") => {
    console.log(`Bulk ${action} chats:`, selectedChats)
    setSelectedChats([])
    setIsChatSelectionMode(false)
  }

  const handleNewChat = () => {
    if (newChatType === "direct") {
      console.log("Creating new direct chat with:", newChatForm.name)
    } else {
      console.log("Creating new group chat:", newChatForm)
    }
    setShowNewChatDialog(false)
    setNewChatForm({ name: "", description: "", members: [] })
  }

  const handleGroupSettings = (action: string) => {
    switch (action) {
      case "info":
        setShowGroupSettingsDialog(true)
        break
      case "settings":
        console.log("Group settings")
        break
      case "add-members":
        console.log("Add members")
        break
      case "mute":
        console.log("Mute notifications")
        break
      case "leave":
        console.log("Leave group")
        break
    }
  }

  const filteredMembers =
    selectedChat?.members?.filter((member) => member.name.toLowerCase().includes(mentionQuery.toLowerCase())) || []

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingDuration(0)
    setRecordedAudio(null)
    setRecordedAudioUrl(null)
    console.log("Simulating recording start...")
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1)
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
    console.log("Simulating recording stop. Duration:", recordingDuration)
    const mockBlob = new Blob([new Uint8Array(1024 * 10)], { type: "audio/webm;codecs=opus" })
    setRecordedAudio(mockBlob)
    setRecordedAudioUrl(URL.createObjectURL(mockBlob))
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
    setRecordingDuration(0)
    setRecordedAudio(null)
    if (recordedAudioUrl && recordedAudioUrl.startsWith("blob:")) {
      URL.revokeObjectURL(recordedAudioUrl)
    }
    setRecordedAudioUrl(null)
    console.log("Recording cancelled.")
  }

  const handleDeleteRecordedAudio = () => {
    if (recordedAudioUrl && recordedAudioUrl.startsWith("blob:")) {
      URL.revokeObjectURL(recordedAudioUrl)
    }
    setRecordedAudio(null)
    setRecordedAudioUrl(null)
    setRecordingDuration(0)
    console.log("Recorded audio deleted.")
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFilePreviews: Attachment[] = Array.from(files).map((file, index) => {
        const fileType = file.type.split("/")[0]
        let attachmentType: Attachment["type"] = "other"
        if (fileType === "image") attachmentType = "image"
        else if (file.type === "application/pdf") attachmentType = "pdf"

        return {
          id: `preview-${Date.now()}-${index}`,
          name: file.name,
          type: attachmentType,
          url: "#",
          previewUrl: fileType === "image" ? URL.createObjectURL(file) : undefined,
          size: file.size,
        }
      })
      setFilesToPreview((prev) => [...prev, ...newFilePreviews])
    }
    if (event.target) {
      event.target.value = ""
    }
  }

  const handleRemoveFilePreview = (fileId: string) => {
    const fileToRemove = filesToPreview.find((f) => f.id === fileId)
    if (fileToRemove?.previewUrl && fileToRemove.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(fileToRemove.previewUrl)
    }
    setFilesToPreview((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleSelectChat = (chat: ChatListItem) => {
    // Save draft for current chat
    if (selectedChat && messageInput.trim()) {
      setDrafts((prev) => ({ ...prev, [selectedChat.id]: messageInput }))
    }

    setSelectedChat(chat)
    setFilesToPreview([])
    setReplyingTo(null)
    setEditingMessage(null)
    setIsSelectionMode(false)
    setSelectedMessages([])
    handleCancelRecording()

    // Load draft for new chat
    const draft = drafts[chat.id]
    if (draft) {
      setMessageInput(draft)
    } else {
      setMessageInput("")
    }
  }

  const handleSendMessage = () => {
    if (messageInput.trim() === "" && filesToPreview.length === 0 && !recordedAudio) return

    console.log("Sending message:", messageInput)

    if (selectedChat) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        sender: "me",
        content: messageInput.trim() || undefined,
        attachments:
          filesToPreview.length > 0
            ? filesToPreview.map((f) => ({
                ...f,
                url: f.type === "image" && f.previewUrl ? f.previewUrl : "#uploaded-" + f.name,
              }))
            : undefined,
        voiceNote:
          recordedAudio && recordedAudioUrl
            ? {
                id: `vn-${Date.now()}`,
                url: recordedAudioUrl,
                duration: recordingDuration,
              }
            : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
        replyTo: replyingTo
          ? {
              messageId: replyingTo.id,
              content: replyingTo.content || "Voice note",
              sender: replyingTo.sender === "me" ? "You" : replyingTo.sender,
            }
          : undefined,
      }
      mockMessages.push(newMessage)
    }

    setMessageInput("")
    setFilesToPreview([])
    setRecordedAudio(null)
    setRecordingDuration(0)
    setIsRecording(false)
    setReplyingTo(null)

    // Clear draft
    if (selectedChat) {
      setDrafts((prev) => {
        const newDrafts = { ...prev }
        delete newDrafts[selectedChat.id]
        return newDrafts
      })
    }
  }

  const handleCreatePoll = () => {
    if (!pollForm.question.trim()) return

    const poll: Poll = {
      id: `poll-${Date.now()}`,
      question: pollForm.question,
      type: pollForm.type,
      options:
        pollForm.type === "yesno"
          ? [
              { id: "yes", text: "Yes", votes: 0 },
              { id: "no", text: "No", votes: 0 },
            ]
          : pollForm.options
              .filter((opt) => opt.trim())
              .map((opt, idx) => ({
                id: `opt-${idx}`,
                text: opt.trim(),
                votes: 0,
              })),
      allowCustomOptions: pollForm.allowCustomOptions,
      totalVotes: 0,
    }

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "me",
      poll,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    mockMessages.push(newMessage)
    setShowPollDialog(false)
    setPollForm({ question: "", type: "single", options: ["", ""], allowCustomOptions: false })
  }

  const handleCreateTask = () => {
    if (!taskForm.title.trim()) return

    const task: Task = {
      id: `task-${Date.now()}`,
      title: taskForm.title,
      description: taskForm.description || undefined,
      assignedTo: taskForm.assignedTo,
      dueDate: taskForm.dueDate || undefined,
      status: taskForm.status,
      createdBy: "me",
    }

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "me",
      task,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    mockMessages.push(newMessage)
    setShowTaskDialog(false)
    setTaskForm({ title: "", description: "", assignedTo: [], dueDate: "", status: "not-started" })
  }

  const handleCreateEvent = () => {
    if (!eventForm.title.trim() || !eventForm.date) return

    const event: Event = {
      id: `event-${Date.now()}`,
      title: eventForm.title,
      description: eventForm.description || undefined,
      date: eventForm.date,
      time: eventForm.isAllDay ? undefined : eventForm.time,
      isAllDay: eventForm.isAllDay,
      isRepeating: eventForm.isRepeating,
      reminder: eventForm.reminder || undefined,
    }

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "me",
      event,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    mockMessages.push(newMessage)
    setShowEventDialog(false)
    setEventForm({ title: "", description: "", date: "", time: "", isAllDay: false, isRepeating: false, reminder: "" })
  }

  const handleReaction = (messageId: string, emoji: string) => {
    const messageIndex = mockMessages.findIndex((m) => m.id === messageId)
    if (messageIndex === -1) return

    const message = mockMessages[messageIndex]
    if (!message.reactions) {
      message.reactions = []
    }

    const existingReaction = message.reactions.find((r) => r.emoji === emoji)
    if (existingReaction) {
      if (existingReaction.users.includes("me")) {
        existingReaction.users = existingReaction.users.filter((u) => u !== "me")
        if (existingReaction.users.length === 0) {
          message.reactions = message.reactions.filter((r) => r.emoji !== emoji)
        }
      } else {
        existingReaction.users.push("me")
      }
    } else {
      message.reactions.push({ emoji, users: ["me"] })
    }

    // Force re-render
    setSelectedChat((prev) => (prev ? { ...prev } : null))
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    console.log("Message copied to clipboard")
  }

  const handleDeleteMessage = (messageId: string) => {
    const index = mockMessages.findIndex((m) => m.id === messageId)
    if (index !== -1) {
      mockMessages.splice(index, 1)
      setSelectedChat((prev) => (prev ? { ...prev } : null))
    }
  }

  const handleForwardMessage = (messageId: string) => {
    console.log("Forward message:", messageId)
    // Implementation for forwarding
  }

  const handleBulkDelete = () => {
    selectedMessages.forEach((messageId) => {
      const index = mockMessages.findIndex((m) => m.id === messageId)
      if (index !== -1) {
        mockMessages.splice(index, 1)
      }
    })
    setSelectedMessages([])
    setIsSelectionMode(false)
    setSelectedChat((prev) => (prev ? { ...prev } : null))
  }

  const renderChatListItem = (chat: ChatListItem) => (
    <div key={chat.id} className="relative group">
      <div
        className={`flex items-center p-3 hover:bg-primary-light dark:hover:bg-opacity-10 rounded-lg cursor-pointer transition-colors ${selectedChat?.id === chat.id ? "bg-primary-light dark:bg-opacity-10" : ""}`}
        onClick={() => !isChatSelectionMode && handleSelectChat(chat)}
      >
        {isChatSelectionMode && (
          <Checkbox
            checked={selectedChats.includes(chat.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedChats((prev) => [...prev, chat.id])
              } else {
                setSelectedChats((prev) => prev.filter((id) => id !== chat.id))
              }
            }}
            className="mr-3"
          />
        )}

        <div className="relative mr-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {chat.isOnline && chat.type === "direct" && (
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-light-card-bg dark:ring-dark-card-bg" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
              {chat.name}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{chat.time}</p>
              {!isChatSelectionMode && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const menu = document.getElementById(`chat-menu-${chat.id}`)
                      if (menu) {
                        menu.style.display = menu.style.display === "none" ? "block" : "none"
                      }
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <div
                    id={`chat-menu-${chat.id}`}
                    className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                    style={{ display: "none" }}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingMessage(chat.id)
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "reply")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "forward")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "pin")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Pin className="h-4 w-4 mr-2" />
                        Pin Message
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "select")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Select
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "start")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Star Message
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChatAction(chat.id, "delete")
                          document.getElementById(`chat-menu-${chat.id}`)!.style.display = "none"
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p
              className={`text-xs truncate ${chat.isTyping ? "text-primary italic" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
            >
              {chat.isTyping ? "typing..." : chat.lastMessage}
            </p>
            {chat.unreadCount && chat.unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderMessageStatus = (status?: "sent" | "delivered" | "read") => {
    if (status === "read") return <CheckCheck className="h-4 w-4 text-sky-500" />
    if (status === "delivered")
      return <CheckCheck className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
    if (status === "sent") return <Check className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
    return null
  }

  const renderAttachment = (attachment: Attachment) => {
    if (attachment.type === "image") {
      return (
        <div key={attachment.id} className="mt-2">
          <Image
            src={attachment.url || "/placeholder.svg"}
            alt={attachment.name}
            width={200}
            height={150}
            className="rounded-lg object-cover max-w-xs cursor-pointer border border-divider"
            onClick={() => console.log("Open image preview:", attachment.url)}
          />
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {attachment.name} ({attachment.size ? formatFileSize(attachment.size) : ""})
          </p>
        </div>
      )
    }
    return (
      <div
        key={attachment.id}
        className="mt-2 p-2.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-divider flex items-center gap-3 max-w-xs"
      >
        {getFileIcon(attachment.name)}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
            {attachment.name}
          </p>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            {attachment.size ? formatFileSize(attachment.size) : "N/A"}
          </p>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <a href={attachment.url} download={attachment.name} aria-label={`Download ${attachment.name}`}>
            <Download className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
          </a>
        </Button>
      </div>
    )
  }

  const VoiceNotePlayer: React.FC<{ voiceNote: VoiceNote; isSender: boolean }> = ({ voiceNote, isSender }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)
    const isPlaceholder = voiceNote.url === "#mock-audio-placeholder"

    const togglePlayPause = async () => {
      if (isPlaceholder || !audioRef.current) return
      try {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      }
    }

    useEffect(() => {
      const audio = audioRef.current
      if (isPlaceholder || !audio) return

      const updateAudioState = () => {
        if (audio.duration && Number.isFinite(audio.duration)) {
          setProgress((audio.currentTime / audio.duration) * 100)
          setCurrentTime(audio.currentTime)
        } else {
          setProgress(0)
          setCurrentTime(0)
        }
      }
      const onEnded = () => {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      }

      audio.addEventListener("timeupdate", updateAudioState)
      audio.addEventListener("loadedmetadata", updateAudioState)
      audio.addEventListener("ended", onEnded)

      if (audio.currentSrc !== voiceNote.url) {
        audio.src = voiceNote.url
        audio.load()
      }

      if (audio.readyState >= 2) {
        updateAudioState()
      }

      return () => {
        audio.removeEventListener("timeupdate", updateAudioState)
        audio.removeEventListener("loadedmetadata", updateAudioState)
        audio.removeEventListener("ended", onEnded)
      }
    }, [voiceNote.url, isPlaceholder])

    const formatDuration = (secs: number) => {
      const minutes = Math.floor(secs / 60)
      const seconds = Math.floor(secs % 60)
      return `${minutes}:${String(seconds).padStart(2, "0")}`
    }

    return (
      <div
        className={`flex items-center gap-2 p-2 rounded-lg mt-1.5 w-full max-w-[250px] ${isSender ? "bg-primary/20" : "bg-muted"}`}
      >
        <audio ref={audioRef} preload="metadata" />
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          className={`h-8 w-8 flex-shrink-0 ${isSender ? "text-primary-foreground/80 hover:text-primary-foreground" : "text-foreground/80 hover:text-foreground"}`}
          disabled={isPlaceholder}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="flex-1 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative group">
          <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <span
          className={`text-xs w-12 text-right flex-shrink-0 ${isSender ? "text-primary-foreground/70" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
        >
          {isPlaceholder
            ? formatDuration(voiceNote.duration)
            : isPlaying
              ? formatDuration(currentTime)
              : formatDuration(voiceNote.duration)}
        </span>
      </div>
    )
  }

  const renderPoll = (poll: Poll) => (
    <div className="mt-2 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-divider max-w-xs">
      <h4 className="font-medium text-sm mb-2">{poll.question}</h4>
      <div className="space-y-2">
        {poll.options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-2 rounded bg-background hover:bg-muted cursor-pointer"
          >
            <span className="text-sm">{option.text}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{option.votes}</span>
              <div className="w-16 h-1 bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">{poll.totalVotes} votes</p>
    </div>
  )

  const renderTask = (task: Task) => {
    const assignedMembers = task.assignedTo.map((id) => mockGroupMembers.find((m) => m.id === id)).filter(Boolean)

    return (
      <div className="mt-2 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-divider max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <ListChecks className="h-4 w-4" />
          <h4 className={`font-medium text-sm ${task.status === "completed" ? "line-through" : ""}`}>{task.title}</h4>
        </div>
        {task.description && <p className="text-xs text-muted-foreground mb-2">{task.description}</p>}
        <div className="flex items-center justify-between text-xs">
          <Badge
            variant={task.status === "completed" ? "default" : task.status === "ongoing" ? "secondary" : "outline"}
          >
            {task.status.replace("-", " ")}
          </Badge>
          {task.dueDate && <span className="text-muted-foreground">{task.dueDate}</span>}
        </div>
        {assignedMembers.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-muted-foreground">Assigned to:</span>
            {assignedMembers.map((member) => (
              <Avatar key={member.id} className="h-5 w-5">
                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Change status to not-started")}>Not Started</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Change status to ongoing")}>Ongoing</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Change status to completed")}>Completed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  const renderEvent = (event: Event) => (
    <div className="mt-2 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-divider max-w-xs">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-4 w-4" />
        <h4 className="font-medium text-sm">{event.title}</h4>
      </div>
      {event.description && <p className="text-xs text-muted-foreground mb-2">{event.description}</p>}
      <div className="text-xs text-muted-foreground">
        <p>
          {event.date} {!event.isAllDay && event.time}
        </p>
        {event.isRepeating && <p>Repeating</p>}
      </div>
    </div>
  )

  const renderReactions = (reactions?: { emoji: string; users: string[] }[]) => {
    if (!reactions || reactions.length === 0) return null

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {reactions.map((reaction, index) => (
          <button
            key={index}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted hover:bg-muted/80 text-xs"
            onClick={() => handleReaction("", reaction.emoji)}
          >
            <span>{reaction.emoji}</span>
            <span>{reaction.users.length}</span>
          </button>
        ))}
      </div>
    )
  }

  const handleReadAloud = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content)
    speechSynthesis.speak(utterance)
  }

  // ... (keep all existing render functions for messages, attachments, etc.)

  if (selectedChat) {
    // --- Chat Room View ---
    return (
      <div className="w-96 h-[600px] bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-xl flex flex-col border border-divider">
        {/* Chat Room Header */}
        <div className="p-3 border-b border-divider flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => {
              setSelectedChat(null)
              setFilesToPreview([])
              setReplyingTo(null)
              setEditingMessage(null)
              setIsSelectionMode(false)
              setSelectedMessages([])
              handleCancelRecording()
            }}
          >
            <UsersRound className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
          </Button>
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
            <AvatarFallback>{selectedChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
              {selectedChat.name}
            </h3>
            {selectedChat.type === "direct" && selectedChat.isOnline && <p className="text-xs text-success">Online</p>}
            {selectedChat.type === "group" && (
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {selectedChat.members?.length || 0} members,{" "}
                {selectedChat.members?.filter((m) => m.isOnline).length || 0} online
              </p>
            )}
            {isTyping && (
              <div className="flex items-center gap-1 text-xs text-primary">
                <span>typing</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              aria-label="Select messages"
            >
              <CheckSquare className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
            </Button>

            {selectedChat.type === "group" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings2 className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleGroupSettings("info")}>
                    <Info className="h-4 w-4 mr-2" />
                    Group Info
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGroupSettings("settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Group Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGroupSettings("add-members")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Members
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGroupSettings("mute")}>
                    <BellOff className="h-4 w-4 mr-2" />
                    Mute Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleGroupSettings("leave")} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Leave Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
              <X className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-divider">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <Input
              placeholder="Search messages..."
              className="pl-10 bg-light-bg dark:bg-dark-bg border-divider focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {isSelectionMode && selectedMessages.length > 0 && (
          <div className="p-3 border-b border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between">
            <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
              {selectedMessages.length} selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectedMessages.forEach((id) => handleForwardMessage(id))}
              >
                <Forward className="h-4 w-4 mr-1" />
                Forward
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {mockMessages
              .filter((msg) => {
                if (!searchQuery) return true
                return msg.content?.toLowerCase().includes(searchQuery.toLowerCase())
              })
              .filter((msg) => {
                if (selectedChat.type === "direct" && (msg.sender === selectedChat.name || msg.sender === "me"))
                  return true
                return true
              })
              .map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} group`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                    {isSelectionMode && (
                      <Checkbox
                        checked={selectedMessages.includes(msg.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMessages((prev) => [...prev, msg.id])
                          } else {
                            setSelectedMessages((prev) => prev.filter((id) => id !== msg.id))
                          }
                        }}
                        className="mt-2"
                      />
                    )}

                    {msg.sender !== "me" && (
                      <Avatar className="h-8 w-8 self-end">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {msg.senderName ? msg.senderName.substring(0, 1) : msg.sender.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col">
                      <div
                        className={`rounded-lg px-3 py-2 ${msg.sender === "me" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-bl-none"}`}
                      >
                        {msg.replyTo && (
                          <div className="mb-1 p-2 rounded-md bg-black/10 dark:bg-white/10 text-xs opacity-80 border-l-2 border-primary">
                            <p className="font-semibold">{msg.replyTo.sender}</p>
                            <p className="truncate">{msg.replyTo.content}</p>
                          </div>
                        )}
                        {msg.content && <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}
                        {msg.attachments && msg.attachments.map(renderAttachment)}
                        {msg.voiceNote && <VoiceNotePlayer voiceNote={msg.voiceNote} isSender={msg.sender === "me"} />}
                        {msg.poll && renderPoll(msg.poll)}
                        {msg.task && renderTask(msg.task)}
                        {msg.event && renderEvent(msg.event)}
                        <div
                          className={`text-xs mt-1 flex items-center gap-1 ${msg.sender === "me" ? "justify-end text-primary-foreground/80" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                        >
                          <span>{msg.timestamp}</span>
                          {msg.sender === "me" && renderMessageStatus(msg.status)}
                          {msg.isEdited && <span className="text-xs italic">(edited)</span>}
                        </div>
                      </div>

                      {/* Reactions */}
                      {renderReactions(msg.reactions)}

                      {/* Message Actions */}
                      {!isSelectionMode && (
                        <div
                          className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setReplyingTo(msg)}>
                            <Reply className="h-3 w-3" />
                          </Button>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Heart className="h-3 w-3" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                              <div className="flex gap-1">
                                {["❤️", "👍", "😂", "😮", "😢", "😡"].map((emoji) => (
                                  <Button
                                    key={emoji}
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleReaction(msg.id, emoji)}
                                  >
                                    {emoji}
                                  </Button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>

                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                const menu = document.getElementById(`msg-menu-${msg.id}`)
                                if (menu) {
                                  menu.style.display = menu.style.display === "none" ? "block" : "none"
                                }
                              }}
                            >
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                            <div
                              id={`msg-menu-${msg.id}`}
                              className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                              style={{ display: "none" }}
                            >
                              <div className="py-1" role="menu" aria-orientation="vertical">
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCopyMessage(msg.content || "")
                                    document.getElementById(`msg-menu-${msg.id}`)!.style.display = "none"
                                  }}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy
                                </button>
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleForwardMessage(msg.id)
                                    document.getElementById(`msg-menu-${msg.id}`)!.style.display = "none"
                                  }}
                                >
                                  <Forward className="h-4 w-4 mr-2" />
                                  Forward
                                </button>
                                {msg.sender === "me" && (
                                  <>
                                    <button
                                      className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEditingMessage(msg.id)
                                        document.getElementById(`msg-menu-${msg.id}`)!.style.display = "none"
                                      }}
                                    >
                                      <Edit3 className="h-4 w-4 mr-2" />
                                      Edit
                                    </button>
                                    <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                                    <button
                                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteMessage(msg.id)
                                        document.getElementById(`msg-menu-${msg.id}`)!.style.display = "none"
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </button>
                                  </>
                                )}
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleReadAloud(msg.content || "")
                                    document.getElementById(`msg-menu-${msg.id}`)!.style.display = "none"
                                  }}
                                >
                                  <Volume2 className="h-4 w-4 mr-2" />
                                  Read Aloud
                                </button>
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("View Delivery Report for message:", msg.id)
                                    const menu = document.getElementById(`msg-menu-${msg.id}`)
                                    if (menu) menu.style.display = "none"
                                  }}
                                >
                                  {/* You can add an icon here if desired, e.g., <Info className="h-4 w-4 mr-2" /> */}
                                  View Delivery Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>

        {/* Reply Preview */}
        {replyingTo && (
          <div className="p-3 border-t border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Reply className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-light-text-primary dark:text-dark-text-primary">
                  Replying to {replyingTo.sender === "me" ? "yourself" : replyingTo.sender}
                </p>
                <p className="text-xs text-muted-foreground truncate">{replyingTo.content || "Voice note"}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setReplyingTo(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* File Preview Area */}
        {filesToPreview.length > 0 && (
          <div className="p-3 border-t border-divider bg-light-bg dark:bg-dark-bg">
            <p className="text-xs font-medium mb-2 text-light-text-secondary dark:text-dark-text-secondary">
              Files to send ({filesToPreview.length}):
            </p>
            <ScrollArea className="max-h-32">
              <div className="space-y-2">
                {filesToPreview.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 p-2 rounded-md border border-divider bg-light-card-bg dark:bg-dark-card-bg"
                  >
                    {file.type === "image" && file.previewUrl ? (
                      <Image
                        src={file.previewUrl || "/placeholder.svg"}
                        alt={file.name}
                        width={32}
                        height={32}
                        className="rounded object-cover h-8 w-8"
                      />
                    ) : (
                      getFileIcon(file.name)
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate text-light-text-primary dark:text-dark-text-primary">
                        {file.name}
                      </p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {file.size ? formatFileSize(file.size) : ""}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRemoveFilePreview(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Recording/Preview UI */}
        {isRecording && (
          <div className="p-3 border-t border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
              </span>
              <span className="text-sm font-medium text-destructive">
                Recording: {Math.floor(recordingDuration / 60)}:{String(recordingDuration % 60).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleCancelRecording} aria-label="Cancel recording">
                <X className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
              <Button variant="destructive" size="icon" onClick={handleStopRecording} aria-label="Stop recording">
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {recordedAudioUrl && !isRecording && (
          <div className="p-3 border-t border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <audio ref={audioPreviewPlayerRef} src={recordedAudioUrl} className="hidden" preload="auto" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => audioPreviewPlayerRef.current?.play()}
                aria-label="Play recorded audio"
              >
                <Play className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
              <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                Voice Note ({Math.floor(recordingDuration / 60)}:{String(recordingDuration % 60).padStart(2, "0")})
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDeleteRecordedAudio}
                aria-label="Delete recorded audio"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Message Input Area - Updated */}
        <div className="p-3 border-t border-divider bg-light-bg dark:bg-dark-bg">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,audio/*,video/*,.zip,.rar"
          />

          <div className="flex items-center gap-1">
            {/* Updated Ellipses Menu with all options */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="More options"
                onClick={(e) => {
                  e.stopPropagation()
                  const menu = document.getElementById("input-options-menu")
                  if (menu) {
                    menu.style.display = menu.style.display === "none" ? "block" : "none"
                  }
                }}
              >
                <MoreVertical className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
              <div
                id="input-options-menu"
                className="absolute left-0 bottom-full mb-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                style={{ display: "none" }}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.multiple = true
                      input.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files
                        if (files) {
                          const newFilePreviews: Attachment[] = Array.from(files).map((file, index) => ({
                            id: `preview-${Date.now()}-${index}`,
                            name: file.name,
                            type: "image",
                            url: "#",
                            previewUrl: URL.createObjectURL(file),
                            size: file.size,
                          }))
                          setFilesToPreview((prev) => [...prev, ...newFilePreviews])
                        }
                      }
                      input.click()
                      document.getElementById("input-options-menu")!.style.display = "none"
                    }}
                  >
                    <FileImage className="h-4 w-4 mr-2" />
                    Attach Image
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (fileInputRef.current) {
                        fileInputRef.current.click()
                      }
                      document.getElementById("input-options-menu")!.style.display = "none"
                    }}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File (Docs, PDF, etc.)
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowPollDialog(true)
                      document.getElementById("input-options-menu")!.style.display = "none"
                    }}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Create Poll
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowEventDialog(true)
                      document.getElementById("input-options-menu")!.style.display = "none"
                    }}
                  >
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Create Event
                  </button>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowTaskDialog(true)
                      document.getElementById("input-options-menu")!.style.display = "none"
                    }}
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    Create Task
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 relative min-w-0">
              <Input
                ref={messageInputRef}
                type="text"
                placeholder={isRecording ? "Recording..." : recordedAudioUrl ? "Voice note ready" : "Type a message..."}
                className="bg-light-card-bg dark:bg-dark-card-bg border-divider focus-visible:ring-primary pr-10 w-full"
                value={messageInput}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && !isRecording && handleSendMessage()}
                disabled={isRecording || !!recordedAudioUrl}
              />

              {/* @ Mentions Dropdown - Fixed positioning */}
              {showMentions && selectedChat?.type === "group" && filteredMembers.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-background border border-divider rounded-md shadow-lg max-h-32 overflow-y-auto z-50">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                      onClick={() => handleMentionSelect(member)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                      {member.isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice recording and send buttons */}
            {!isRecording && !recordedAudioUrl && messageInput.trim() === "" && filesToPreview.length === 0 && (
              <Button variant="ghost" size="icon" onClick={handleStartRecording} aria-label="Start recording">
                <Mic className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
            )}

            {!isRecording && !recordedAudioUrl && (messageInput.trim() !== "" || filesToPreview.length > 0) && (
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Add emoji">
                    <Smile className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setMessageInput((prev) => prev + emoji)
                          setShowEmojiPicker(false)
                        }}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {!isRecording && (messageInput.trim() !== "" || filesToPreview.length > 0 || recordedAudioUrl) && (
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* All Dialog Components - Poll, Task, Event, Group Settings */}
        <Dialog open={showPollDialog} onOpenChange={setShowPollDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Poll</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="poll-question">Question</Label>
                <Input
                  id="poll-question"
                  value={pollForm.question}
                  onChange={(e) => setPollForm((prev) => ({ ...prev, question: e.target.value }))}
                  placeholder="What's your question?"
                />
              </div>
              <div>
                <Label>Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={pollForm.type === "single" ? "default" : "outline"}
                    onClick={() => setPollForm((prev) => ({ ...prev, type: "single" }))}
                  >
                    Single Choice
                  </Button>
                  <Button
                    variant={pollForm.type === "multiple" ? "default" : "outline"}
                    onClick={() => setPollForm((prev) => ({ ...prev, type: "multiple" }))}
                  >
                    Multiple Choice
                  </Button>
                  <Button
                    variant={pollForm.type === "yesno" ? "default" : "outline"}
                    onClick={() => setPollForm((prev) => ({ ...prev, type: "yesno" }))}
                  >
                    Yes/No
                  </Button>
                  <Button
                    variant={pollForm.type === "custom" ? "default" : "outline"}
                    onClick={() => setPollForm((prev) => ({ ...prev, type: "custom" }))}
                  >
                    Custom
                  </Button>
                </div>
              </div>
              {pollForm.type === "custom" && (
                <div className="space-y-2">
                  {pollForm.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollForm.options]
                          newOptions[index] = e.target.value
                          setPollForm((prev) => ({ ...prev, options: newOptions }))
                        }}
                        placeholder={`Option ${index + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = [...pollForm.options]
                          newOptions.splice(index, 1)
                          setPollForm((prev) => ({ ...prev, options: newOptions }))
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPollForm((prev) => ({ ...prev, options: [...prev.options, ""] }))}
                  >
                    Add Option
                  </Button>
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-custom-options"
                    checked={pollForm.allowCustomOptions}
                    onCheckedChange={(checked) =>
                      setPollForm((prev) => ({ ...prev, allowCustomOptions: checked || false }))
                    }
                  />
                  <Label htmlFor="allow-custom-options">Allow voters to add options</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreatePoll} className="flex-1">
                  Create Poll
                </Button>
                <Button variant="outline" onClick={() => setShowPollDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="What needs to be done?"
                />
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Add details..."
                />
              </div>
              <div>
                <Label htmlFor="task-assigned-to">Assign To</Label>
                <select
                  id="task-assigned-to"
                  multiple
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={taskForm.assignedTo}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
                    setTaskForm((prev) => ({ ...prev, assignedTo: selected }))
                  }}
                >
                  {selectedChat?.members?.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="task-due-date">Due Date</Label>
                <Input
                  type="date"
                  id="task-due-date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="task-status">Status</Label>
                <select
                  id="task-status"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={taskForm.status}
                  onChange={(e) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      status: e.target.value as "not-started" | "ongoing" | "completed",
                    }))
                  }
                >
                  <option value="not-started">Not Started</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateTask} className="flex-1">
                  Create Task
                </Button>
                <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="What's the event?"
                />
              </div>
              <div>
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Add details..."
                />
              </div>
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, time: e.target.value }))}
                  disabled={eventForm.isAllDay}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="event-is-all-day"
                    checked={eventForm.isAllDay}
                    onCheckedChange={(checked) => setEventForm((prev) => ({ ...prev, isAllDay: checked || false }))}
                  />
                  <Label htmlFor="event-is-all-day">All Day</Label>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="event-is-repeating"
                    checked={eventForm.isRepeating}
                    onCheckedChange={(checked) => setEventForm((prev) => ({ ...prev, isRepeating: checked || false }))}
                  />
                  <Label htmlFor="event-is-repeating">Repeating</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="event-reminder">Reminder</Label>
                <Input
                  id="event-reminder"
                  type="text"
                  value={eventForm.reminder}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, reminder: e.target.value }))}
                  placeholder="Set a reminder..."
                />
              </div>
              <Button variant="link">Open Full Form</Button>
              <div className="flex gap-2">
                <Button onClick={handleCreateEvent} className="flex-1">
                  Create Event
                </Button>
                <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Group Settings Dialog */}
        <Dialog open={showGroupSettingsDialog} onOpenChange={setShowGroupSettingsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Group Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="group-name">Group Name</Label>
                <Input id="group-name" value={selectedChat?.name || ""} placeholder="Group name" />
              </div>
              <div>
                <Label htmlFor="group-description">Description</Label>
                <Textarea id="group-description" placeholder="Group description" />
              </div>
              <div className="space-y-2">
                <Label>Members ({selectedChat?.members?.length || 0})</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {selectedChat?.members?.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 rounded bg-muted">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                        {member.isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Permissions */}
              <div>
                <Label>Group Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-all-members-to-send-messages">Allow all members to send messages</Label>
                    <Switch
                      id="allow-all-members-to-send-messages"
                      checked={allowAllMembersToSendMessage}
                      onCheckedChange={setAllowAllMembersToSendMessage}
                    />
                  </div>
                  {/* Placeholder for more granular permissions */}
                  {/* <div className="flex items-center justify-between">
                    <Label htmlFor="allow-specific-members-to-chat">Allow specific members to chat</Label>
                    <Switch id="allow-specific-members-to-chat" disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-collaboration">Allow collaboration</Label>
                    <Switch id="allow-collaboration" disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-member-removal">Allow member removal</Label>
                    <Switch id="allow-member-removal" disabled />
                  </div> */}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setShowGroupSettingsDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const filteredDirectChats = mockDirectChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredGroupChats = mockGroupChats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // --- Chat List View ---
  return (
    <div className="w-96 h-[600px] bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-xl flex flex-col border border-divider">
      <div className="p-4 border-b border-divider flex justify-between items-center cursor-grab">
        <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <X className="h-5 w-5 text-light-text-primary dark:text-dark-text-primary" />
        </Button>
      </div>

      {/* Bulk Actions Bar for Chat Selection */}
      {isChatSelectionMode && selectedChats.length > 0 && (
        <div className="p-3 border-b border-divider bg-light-bg dark:bg-dark-bg flex items-center justify-between">
          <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
            {selectedChats.length} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleBulkChatAction("forward")}>
              <Forward className="h-4 w-4 mr-1" />
              Forward
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleBulkChatAction("delete")}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsChatSelectionMode(false)
                setSelectedChats([])
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="p-3 border-b border-divider">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-light-bg dark:bg-dark-bg border-divider focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-light-bg dark:bg-dark-bg">
            <TabsTrigger
              value="direct"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Direct
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Group
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        {activeTab === "direct" && (
          <div className="p-3 space-y-1">
            {filteredDirectChats.length > 0 ? (
              filteredDirectChats.map(renderChatListItem)
            ) : (
              <div className="text-center py-10">
                <MessageCircle className="mx-auto h-12 w-12 text-[#16B1FF] mb-2" />
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  No direct chats found.
                </p>
              </div>
            )}
          </div>
        )}
        {activeTab === "group" && (
          <div className="p-3 space-y-1">
            {filteredGroupChats.length > 0 ? (
              filteredGroupChats.map(renderChatListItem)
            ) : (
              <div className="text-center py-10">
                <Users className="mx-auto h-12 w-12 text-[#16B1FF] mb-2" />
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">No group chats found.</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="p-3 border-t border-divider">
        {activeTab === "direct" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setNewChatType("direct")
              setShowNewChatDialog(true)
            }}
          >
            <User className="mr-2 h-4 w-4" /> New Direct Chat
          </Button>
        )}
        {activeTab === "group" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setNewChatType("group")
              setShowNewChatDialog(true)
            }}
          >
            <Users className="mr-2 h-4 w-4" /> New Group Chat
          </Button>
        )}
      </div>

      {/* New Chat Dialog */}
      <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{newChatType === "direct" ? "New Direct Chat" : "New Group Chat"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="chat-name">{newChatType === "direct" ? "Username or Email" : "Group Name"}</Label>
              <Input
                id="chat-name"
                value={newChatForm.name}
                onChange={(e) => setNewChatForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={newChatType === "direct" ? "Enter username or email" : "Enter group name"}
              />
            </div>
            {newChatType === "group" && (
              <div>
                <Label htmlFor="chat-description">Description (Optional)</Label>
                <Textarea
                  id="chat-description"
                  value={newChatForm.description}
                  onChange={(e) => setNewChatForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Group description"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleNewChat} className="flex-1">
                Create {newChatType === "direct" ? "Chat" : "Group"}
              </Button>
              <Button variant="outline" onClick={() => setShowNewChatDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
