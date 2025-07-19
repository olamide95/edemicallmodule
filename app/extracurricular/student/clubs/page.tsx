import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentClubs } from "@/components/student-clubs"

export default function StudentClubsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Clubs</h1>
        <p className="text-muted-foreground">View your club enrollments and schedules</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentClubs />
        </CardContent>
      </Card>
    </div>
  )
}
