import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SupplierAttendance } from "@/components/supplier-attendance"

export default function SupplierAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Attendance</h1>
        <p className="text-muted-foreground">Track and manage attendance for your clubs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierAttendance />
        </CardContent>
      </Card>
    </div>
  )
}
