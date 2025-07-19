import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, PartyPopper, School, Smile } from "lucide-react"

type NoticeItem = {
  id: string
  title: string
  date: string
  author: string
  timeAgo: string
  icon: React.ReactNode
  highlight?: string
}

const notices: NoticeItem[] = [
  {
    id: "1",
    title: "New Admission Inquiry",
    date: "",
    author: "By Jhon Doe",
    timeAgo: "45 Mins ago",
    icon: <Bell className="h-5 w-5 text-purple-500" />,
    highlight: "Just Now",
  },
  {
    id: "2",
    title: "Holiday",
    date: "24 Feb 2024",
    author: "By Jhon Doe",
    timeAgo: "2 Hrs ago",
    icon: <Smile className="h-5 w-5 text-red-400" />,
  },
  {
    id: "3",
    title: "Meeting with Mark",
    date: "24 Feb 2024",
    author: "By Jhon Doe",
    timeAgo: "2 Hrs ago",
    icon: <Calendar className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: "4",
    title: "School Anniversary",
    date: "19 Dec 2024",
    author: "By Jhon Doe",
    timeAgo: "12 Days ago",
    icon: <PartyPopper className="h-5 w-5 text-red-400" />,
  },
  {
    id: "5",
    title: "New Admitted Student",
    date: "19 Dec 2024",
    author: "By Jhon Doe",
    timeAgo: "12 Days ago",
    icon: <School className="h-5 w-5 text-green-500" />,
  },
]

export function NoticeBoard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Notice Board</CardTitle>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">{notice.icon}</div>
              <div className="flex-1">
                {notice.highlight && <p className="text-sm font-medium text-purple-500">{notice.highlight}</p>}
                <h4 className="text-base font-medium">{notice.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col text-sm text-gray-500">
                    {notice.date && <span className="text-gray-500">{notice.date}</span>}
                    <span>{notice.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>{notice.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
