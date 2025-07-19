import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SupplierEnrollments } from "@/components/supplier-enrollments"

export default function SupplierEnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Enrollments</h1>
        <p className="text-muted-foreground">View students enrolled in your clubs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierEnrollments />
        </CardContent>
      </Card>
    </div>
  )
}
