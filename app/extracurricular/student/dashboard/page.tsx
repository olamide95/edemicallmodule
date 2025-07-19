import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, CalendarIcon, GraduationCapIcon } from "lucide-react"

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">View your clubs and activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Clubs</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Performance Reports</CardTitle>
            <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">New report available</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Club Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Chess Club</h3>
                <p className="text-sm text-muted-foreground">Monday, 2:00 PM - 3:00 PM</p>
              </div>
              <div className="text-sm font-medium">Room 101</div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">Science Club</h3>
                <p className="text-sm text-muted-foreground">Wednesday, 3:00 PM - 4:00 PM</p>
              </div>
              <div className="text-sm font-medium">Science Lab</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Art Club</h3>
                <p className="text-sm text-muted-foreground">Friday, 2:00 PM - 3:00 PM</p>
              </div>
              <div className="text-sm font-medium">Art Room</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
