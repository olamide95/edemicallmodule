import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParentPerformanceReports } from "@/components/parent-performance-reports"

export default function ParentPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Reports</h1>
        <p className="text-muted-foreground">View your children's club performance reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ParentPerformanceReports />
        </CardContent>
      </Card>
    </div>
  )
}
