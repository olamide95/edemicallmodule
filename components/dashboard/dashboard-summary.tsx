"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartTooltip } from "@/components/ui/chart2"

// Sample data - in a real app this would come from your API
const genderData = [
  { name: "Male", value: 65, color: "#8C57FF" },
  { name: "Female", value: 35, color: "#FF4C51" },
]

const awaitingAssessment = [
  {
    id: "STU001",
    name: "John Smith",
    avatar: "/diverse-students-studying.png",
    date: "2023-04-15",
  },
  {
    id: "STU002",
    name: "Emily Johnson",
    avatar: "/diverse-students-studying.png",
    date: "2023-04-16",
  },
  {
    id: "STU003",
    name: "Michael Davis",
    avatar: "/diverse-students-studying.png",
    date: "2023-04-17",
  },
  {
    id: "STU004",
    name: "Sarah Wilson",
    avatar: "/diverse-students-studying.png",
    date: "2023-04-18",
  },
  {
    id: "STU005",
    name: "David Brown",
    avatar: "/diverse-students-studying.png",
    date: "2023-04-19",
  },
]

const justAdmitted = [
  { name: "Grade 1", value: 12, color: "#16B1FF" },
  { name: "Grade 2", value: 8, color: "#FFB400" },
  { name: "Grade 3", value: 5, color: "#56CA00" },
  { name: "Nursery 1", value: 7, color: "#8C57FF" },
  { name: "Nursery 2", value: 6, color: "#8A8D93" },
]
  
export function DashboardSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Admission by Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip content={<ChartTooltip active={undefined} payload={undefined} label={undefined} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Awaiting Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[220px]">
            <div className="space-y-4">
              {awaitingAssessment.map((student) => (
                <div key={student.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{new Date(student.date).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-auto font-medium">
                    <span className="text-xs text-muted-foreground">Assessment Due</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Just Admitted Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={justAdmitted}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {justAdmitted.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip content={<ChartTooltip active={undefined} payload={undefined} label={undefined} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
