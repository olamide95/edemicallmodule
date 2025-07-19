import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldIcon, UserIcon, UsersIcon, TruckIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Extracurricular Activities Management</h1>
        <p className="text-xl text-muted-foreground">Select a portal to continue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <ShieldIcon className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Admin/Teacher Portal</CardTitle>
            <CardDescription>Manage clubs, enrollments, and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create and manage clubs, handle enrollments, track attendance, and generate reports.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/dashboard" className="w-full">
              <Button className="w-full">Enter Portal</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <UsersIcon className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Parent Portal</CardTitle>
            <CardDescription>Enroll children in clubs and view reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Enroll your children in clubs, view performance reports, and manage club changes.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/parent/dashboard" className="w-full">
              <Button className="w-full">Enter Portal</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <UserIcon className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Student Portal</CardTitle>
            <CardDescription>View clubs and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your enrolled clubs, check schedules, and access performance reports.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/student/dashboard" className="w-full">
              <Button className="w-full">Enter Portal</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <TruckIcon className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Supplier Portal</CardTitle>
            <CardDescription>Manage club activities and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View enrollments, track attendance, create invoices, and submit performance reports.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/supplier/dashboard" className="w-full">
              <Button className="w-full">Enter Portal</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
