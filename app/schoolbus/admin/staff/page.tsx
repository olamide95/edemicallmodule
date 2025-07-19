import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const administrators = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+234 123 456 7890",
    email: "sarah.johnson@example.com",
    bus: "Bus A",
    route: "North Route",
    status: "active",
  },
  {
    id: "2",
    name: "Emily Davis",
    phone: "+234 234 567 8901",
    email: "emily.davis@example.com",
    bus: "Bus B",
    route: "East Route",
    status: "active",
  },
  {
    id: "3",
    name: "Jessica Taylor",
    phone: "+234 345 678 9012",
    email: "jessica.taylor@example.com",
    bus: "Bus C",
    route: "West Route",
    status: "inactive",
  },
  {
    id: "4",
    name: "Jennifer Anderson",
    phone: "+234 456 789 0123",
    email: "jennifer.anderson@example.com",
    bus: "Bus D",
    route: "South Route",
    status: "active",
  },
  {
    id: "5",
    name: "Lisa Robinson",
    phone: "+234 567 890 1234",
    email: "lisa.robinson@example.com",
    bus: "Bus E",
    route: "Central Route",
    status: "active",
  },
]

const drivers = [
  {
    id: "1",
    name: "John Smith",
    phone: "+234 123 456 7890",
    license: "DL12345678",
    bus: "Bus A",
    route: "North Route",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Brown",
    phone: "+234 234 567 8901",
    license: "DL23456789",
    bus: "Bus B",
    route: "East Route",
    status: "active",
  },
  {
    id: "3",
    name: "Robert Wilson",
    phone: "+234 345 678 9012",
    license: "DL34567890",
    bus: "Bus C",
    route: "West Route",
    status: "active",
  },
  {
    id: "4",
    name: "David Martinez",
    phone: "+234 456 789 0123",
    license: "DL45678901",
    bus: "Bus D",
    route: "South Route",
    status: "active",
  },
  {
    id: "5",
    name: "James Thomas",
    phone: "+234 567 890 1234",
    license: "DL56789012",
    bus: "Bus E",
    route: "Central Route",
    status: "inactive",
  },
]

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">Manage bus administrators and drivers</p>
      </div>

      <Tabs defaultValue="administrators">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="administrators">Administrators</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search staff..." className="w-full bg-background pl-8" />
            </div>
            <Link href="/schoolbus/admin/staff/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </Link>
          </div>
        </div>

        <TabsContent value="administrators" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Administrators</CardTitle>
              <CardDescription>Manage bus administrators who oversee bus operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assigned Bus</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {administrators.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.phone}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.bus}</TableCell>
                      <TableCell>{admin.route}</TableCell>
                      <TableCell>
                        <Badge variant={admin.status === "active" ? "default" : "outline"}>
                          {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/staff/${admin.id}`}>
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

        <TabsContent value="drivers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bus Drivers</CardTitle>
              <CardDescription>Manage bus drivers responsible for operating the buses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Assigned Bus</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.license}</TableCell>
                      <TableCell>{driver.bus}</TableCell>
                      <TableCell>{driver.route}</TableCell>
                      <TableCell>
                        <Badge variant={driver.status === "active" ? "default" : "outline"}>
                          {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/staff/${driver.id}`}>
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
