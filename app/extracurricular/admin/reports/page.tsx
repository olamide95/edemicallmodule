import { AttendanceReports } from "@/components/attendance-reports"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and export detailed attendance reports</p>
      </div>

      <AttendanceReports />
    </div>
  )
}
