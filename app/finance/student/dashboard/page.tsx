import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentDashboardStats } from "@/components/student/dashboard-stats"
import { StudentUpcomingAssignments } from "@/components/student/upcoming-assignments"
import { StudentRecentGrades } from "@/components/student/recent-grades"
import { StudentAttendanceChart } from "@/components/student/attendance-chart"

export default function StudentDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <StudentDashboardStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Your assignments due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentUpcomingAssignments />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Your most recent assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentRecentGrades />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="academics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Your academic progress across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Academic content will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Your attendance record for the current term</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
