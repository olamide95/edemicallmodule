import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, CalendarIcon, FileTextIcon, CreditCardIcon } from "lucide-react"

export default function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-muted-foreground">Manage your children's extracurricular activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Children</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Club Enrollments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Performance Reports</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New reports available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦75,000</div>
            <p className="text-xs text-muted-foreground">Current term</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Children's Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Alex Smith (JSS 2)</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Chess Club</p>
                    <p className="text-sm text-muted-foreground">Monday, 2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="text-sm font-medium">₦15,000</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Science Club</p>
                    <p className="text-sm text-muted-foreground">Wednesday, 3:00 PM - 4:00 PM</p>
                  </div>
                  <div className="text-sm font-medium">₦20,000</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Emma Smith (Primary 5)</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Art Club</p>
                    <p className="text-sm text-muted-foreground">Tuesday, 2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="text-sm font-medium">₦22,000</div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Music Club</p>
                    <p className="text-sm text-muted-foreground">Thursday, 3:00 PM - 4:00 PM</p>
                  </div>
                  <div className="text-sm font-medium">₦18,000</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
