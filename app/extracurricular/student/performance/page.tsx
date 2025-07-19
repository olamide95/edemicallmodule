import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentPerformance } from "@/components/student-performance"

export default function StudentPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Performance</h1>
        <p className="text-muted-foreground">View your club performance reports and feedback</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentPerformance />
        </CardContent>
      </Card>
    </div>
  )
}
