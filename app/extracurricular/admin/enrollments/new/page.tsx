import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NewEnrollmentForm } from "@/components/new-enrollment-form"

export default function NewEnrollmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Enrollment</h1>
          <p className="text-muted-foreground">Enroll students in extracurricular activities</p>
        </div>
        <Link href="/admin/enrollments">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <NewEnrollmentForm />
        </CardContent>
      </Card>
    </div>
  )
}
