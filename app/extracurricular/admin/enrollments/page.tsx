import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnrollmentTable } from "@/components/enrollment-table"
import { PlusIcon } from "lucide-react"

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enrollments</h1>
          <p className="text-muted-foreground">Manage student club enrollments</p>
        </div>
        <Link href="/extracurricular/admin/enrollments/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-1" />
            New Enrollment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <EnrollmentTable />
        </CardContent>
      </Card>
    </div>
  )
}
