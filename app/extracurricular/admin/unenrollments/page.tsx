import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UnenrollmentTable } from "@/components/unenrollment-table"

export default function UnenrollmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Unenrollments</h1>
          <p className="text-muted-foreground">Manage student club unenrollments</p>
        </div>
        <Link href="/admin/enrollments">
          <Button variant="outline">View Enrollments</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unenrollment Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <UnenrollmentTable />
        </CardContent>
      </Card>
    </div>
  )
}
