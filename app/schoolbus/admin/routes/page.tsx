import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const routes = [
  {
    id: "1",
    name: "North Route",
    stops: 8,
    buses: 3,
    students: 64,
    fee: "₦15,000",
    status: "active",
  },
  {
    id: "2",
    name: "East Route",
    stops: 6,
    buses: 2,
    students: 42,
    fee: "₦12,000",
    status: "active",
  },
  {
    id: "3",
    name: "West Route",
    stops: 7,
    buses: 2,
    students: 38,
    fee: "₦14,000",
    status: "active",
  },
  {
    id: "4",
    name: "South Route",
    stops: 5,
    buses: 1,
    students: 28,
    fee: "₦10,000",
    status: "active",
  },
  {
    id: "5",
    name: "Central Route",
    stops: 6,
    buses: 2,
    students: 46,
    fee: "₦18,000",
    status: "inactive",
  },
]

const stops = [
  {
    id: "1",
    name: "Main Street",
    route: "North Route",
    students: 12,
    fee: "₦15,000",
    time: "7:15 AM",
  },
  {
    id: "2",
    name: "Oak Avenue",
    route: "North Route",
    students: 8,
    fee: "₦15,000",
    time: "7:25 AM",
  },
  {
    id: "3",
    name: "Pine Road",
    route: "East Route",
    students: 10,
    fee: "₦12,000",
    time: "7:10 AM",
  },
  {
    id: "4",
    name: "Cedar Lane",
    route: "East Route",
    students: 7,
    fee: "₦12,000",
    time: "7:20 AM",
  },
  {
    id: "5",
    name: "Maple Drive",
    route: "West Route",
    students: 9,
    fee: "₦14,000",
    time: "7:05 AM",
  },
]

export default function RoutesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Routes & Stops</h1>
        <p className="text-muted-foreground">Manage your bus routes and stops</p>
      </div>

      <Tabs defaultValue="routes">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="stops">Bus Stops</TabsTrigger>
          </TabsList>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8" />
            </div>
            <Link href="/schoolbus/admin/routes/new" className="w-full sm:w-auto">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
        </div>

        <TabsContent value="routes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Routes</CardTitle>
              <CardDescription>View and manage all bus routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Buses</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Base Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.stops}</TableCell>
                      <TableCell>{route.buses}</TableCell>
                      <TableCell>{route.students}</TableCell>
                      <TableCell>{route.fee}</TableCell>
                      <TableCell>
                        <Badge variant={route.status === "active" ? "default" : "outline"}>
                          {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/routes/${route.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stops" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Stops</CardTitle>
              <CardDescription>View and manage all bus stops</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stop Name</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Pickup Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stops.map((stop) => (
                    <TableRow key={stop.id}>
                      <TableCell className="font-medium">{stop.name}</TableCell>
                      <TableCell>{stop.route}</TableCell>
                      <TableCell>{stop.students}</TableCell>
                      <TableCell>{stop.fee}</TableCell>
                      <TableCell>{stop.time}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/stops/${stop.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
