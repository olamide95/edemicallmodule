import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, CalendarIcon, FileTextIcon, UsersIcon } from "lucide-react"
import { EnrollmentCharts } from "@/components/enrollment-charts"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage extracurricular activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+2 from last term</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students Enrolled</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">86% of student body</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">For current term</p>
          </CardContent>
        </Card>
      </div>

      <EnrollmentCharts />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Student enrolled in Chess Club", time: "2 hours ago" },
                { action: "Performance report submitted for Debate Club", time: "3 hours ago" },
                { action: "Club change request approved", time: "5 hours ago" },
                { action: "New club created: Photography Club", time: "1 day ago" },
                { action: "Unenrollment request rejected", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { club: "Chess Club", day: "Monday", time: "2:00 PM - 3:00 PM", students: 25 },
                { club: "Debate Club", day: "Monday", time: "3:00 PM - 4:00 PM", students: 18 },
                { club: "Science Club", day: "Tuesday", time: "2:00 PM - 3:00 PM", students: 22 },
                { club: "Art Club", day: "Tuesday", time: "3:00 PM - 4:00 PM", students: 15 },
                { club: "Coding Club", day: "Wednesday", time: "2:00 PM - 3:00 PM", students: 20 },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{session.club}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.day}, {session.time}
                    </p>
                  </div>
                  <div className="text-sm font-medium">{session.students} students</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
