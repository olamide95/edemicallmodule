import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParentEnrollmentForm } from "@/components/parent-enrollment-form"

export default function ParentEnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Enrollment</h1>
        <p className="text-muted-foreground">Enroll your children in extracurricular activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <ParentEnrollmentForm />
        </CardContent>
      </Card>
    </div>
  )
}
