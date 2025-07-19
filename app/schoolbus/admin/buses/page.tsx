import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

const buses = [
  {
    id: "1",
    name: "Bus A",
    plateNumber: "ABC-123",
    year: "2020",
    capacity: 42,
    driver: "John Smith",
    administrator: "Sarah Johnson",
    route: "North Route",
    status: "active",
  },
  {
    id: "2",
    name: "Bus B",
    plateNumber: "DEF-456",
    year: "2019",
    capacity: 38,
    driver: "Michael Brown",
    administrator: "Emily Davis",
    route: "East Route",
    status: "active",
  },
  {
    id: "3",
    name: "Bus C",
    plateNumber: "GHI-789",
    year: "2021",
    capacity: 42,
    driver: "Robert Wilson",
    administrator: "Jessica Taylor",
    route: "West Route",
    status: "maintenance",
  },
  {
    id: "4",
    name: "Bus D",
    plateNumber: "JKL-012",
    year: "2018",
    capacity: 36,
    driver: "David Martinez",
    administrator: "Jennifer Anderson",
    route: "South Route",
    status: "active",
  },
  {
    id: "5",
    name: "Bus E",
    plateNumber: "MNO-345",
    year: "2022",
    capacity: 44,
    driver: "James Thomas",
    administrator: "Lisa Robinson",
    route: "Central Route",
    status: "inactive",
  },
]

export default function BusesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Buses</h1>
        <p className="text-muted-foreground">Manage your school bus fleet</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search buses..." className="w-full bg-background pl-8" />
        </div>
        <Link href="/schoolbus/admin/buses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Bus
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bus Fleet</CardTitle>
          <CardDescription>View and manage all buses in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Plate Number</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Administrator</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.name}</TableCell>
                  <TableCell>{bus.plateNumber}</TableCell>
                  <TableCell>{bus.year}</TableCell>
                  <TableCell>{bus.capacity} seats</TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>{bus.administrator}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        bus.status === "active" ? "default" : bus.status === "maintenance" ? "destructive" : "outline"
                      }
                    >
                      {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/buses/${bus.id}`}>
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
    </div>
  )
}
