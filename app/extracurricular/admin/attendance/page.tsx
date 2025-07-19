import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AttendanceRegister } from "@/components/attendance-register"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Club Attendance</h1>
        <p className="text-muted-foreground">Mark and track club attendance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Register</CardTitle>
        </CardHeader>
        <CardContent>
          <AttendanceRegister />
        </CardContent>
      </Card>
    </div>
  )
}
