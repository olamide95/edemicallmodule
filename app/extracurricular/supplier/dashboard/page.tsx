import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersIcon, ListChecksIcon, FileTextIcon, CreditCardIcon } from "lucide-react"

export default function SupplierDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
        <p className="text-muted-foreground">Manage your club activities and invoices</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students Enrolled</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Across all clubs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <ListChecksIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦720,000</div>
            <p className="text-xs text-muted-foreground">Current term</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">John Doe (JSS 3)</p>
                  <p className="text-sm text-muted-foreground">Chess Club</p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Jane Smith (SSS 1)</p>
                  <p className="text-sm text-muted-foreground">Debate Club</p>
                </div>
                <div className="text-sm text-muted-foreground">3 days ago</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Michael Johnson (JSS 2)</p>
                  <p className="text-sm text-muted-foreground">Science Club</p>
                </div>
                <div className="text-sm text-muted-foreground">5 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Chess Club</p>
                  <p className="text-sm text-muted-foreground">Monday, 2:00 PM - 3:00 PM</p>
                </div>
                <div className="text-sm font-medium">25 students</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Debate Club</p>
                  <p className="text-sm text-muted-foreground">Monday, 3:00 PM - 4:00 PM</p>
                </div>
                <div className="text-sm font-medium">18 students</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Science Club</p>
                  <p className="text-sm text-muted-foreground">Tuesday, 2:00 PM - 3:00 PM</p>
                </div>
                <div className="text-sm font-medium">22 students</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
