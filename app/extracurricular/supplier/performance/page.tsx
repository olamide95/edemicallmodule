import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceReportForm } from "@/components/performance-report-form"

export default function SupplierPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Reports</h1>
        <p className="text-muted-foreground">Create and manage performance reports for club members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Report</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceReportForm />
        </CardContent>
      </Card>
    </div>
  )
}
