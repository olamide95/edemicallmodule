"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, CreditCard, MapPin, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for enrollments
const enrollments = [
  {
    id: "1",
    student: "Alice Doe",
    class: "Primary 3",
    route: "North Route",
    stop: "Main Street",
    term: "First Term 2023/2024",
    status: "active",
    paymentStatus: "paid",
    fee: "₦15,000",
    seat: "A12",
  },
  {
    id: "2",
    student: "Bob Doe",
    class: "Primary 1",
    route: "North Route",
    stop: "Main Street",
    term: "First Term 2023/2024",
    status: "active",
    paymentStatus: "paid",
    fee: "₦15,000",
    seat: "A13",
  },
]

export default function ParentEnrollmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bus Enrollment</h1>
        <p className="text-muted-foreground">Manage your children's bus service enrollment</p>
      </div>

      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertTitle>Enrollment Period Active</AlertTitle>
        <AlertDescription>
          Enrollment for the Second Term 2023/2024 is now open. Please complete your enrollment by December 15, 2023.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Current Enrollments</h2>
        <Link href="/schoolbus/parent/enrollment/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Enrollment
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Enrollments</TabsTrigger>
          <TabsTrigger value="pending">Pending Enrollments</TabsTrigger>
          <TabsTrigger value="history">Enrollment History</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4">
            {enrollments.map((enrollment) => (
              <Card key={enrollment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{enrollment.student}</h3>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{enrollment.class}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>
                          {enrollment.route} - {enrollment.stop}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Pickup: 07:15 AM | Dropoff: 02:30 PM</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CreditCard className="mr-1 h-3 w-3" />
                        <span>
                          Fee: {enrollment.fee} - {enrollment.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{enrollment.term}</Badge>
                        <Badge variant="outline">Seat: {enrollment.seat}</Badge>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>No Pending Enrollments</CardTitle>
              <CardDescription>You don't have any pending enrollments at the moment</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <Link href="/parent/enrollment/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Enrollment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Enrollments</CardTitle>
              <CardDescription>History of your past bus service enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">Alice Doe</h3>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Primary 2</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>North Route - Main Street</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CreditCard className="mr-1 h-3 w-3" />
                      <span>Fee: ₦15,000 - Paid</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <Badge variant="outline">Third Term 2022/2023</Badge>
                    <Button variant="outline" size="sm" className="mt-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
