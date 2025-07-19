import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParentClubChangeForm } from "@/components/parent-club-change-form"

export default function ParentClubChangePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Change Club</h1>
        <p className="text-muted-foreground">Request to change your child's club enrollment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Change Request</CardTitle>
        </CardHeader>
        <CardContent>
          <ParentClubChangeForm />
        </CardContent>
      </Card>
    </div>
  )
}



