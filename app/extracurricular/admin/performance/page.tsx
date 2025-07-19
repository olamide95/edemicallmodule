import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPerformanceReports } from "@/components/admin-performance-reports"

export default function AdminPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Reports</h1>
        <p className="text-muted-foreground">Review and manage club performance reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminPerformanceReports />
        </CardContent>
      </Card>
    </div>
  )
}
