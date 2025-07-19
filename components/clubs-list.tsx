"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontalIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  AlertTriangleIcon,
} from "lucide-react"
import Link from "next/link"

// Updated mock data for clubs with multiple clubs at same time slots
const mockClubs = [
  {
    id: 1,
    name: "Chess Club",
    coordinator: "John Smith",
    type: "In-house",
    day: "Monday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 15000,
    students: 25,
    status: "active",
  },
  {
    id: 2,
    name: "Debate Club",
    coordinator: "Jane Doe",
    type: "In-house",
    day: "Monday",
    time: "3:00 PM - 4:00 PM",
    timeSlot: "15:00-16:00",
    amount: 18000,
    students: 18,
    status: "active",
  },
  {
    id: 11,
    name: "Math Club",
    coordinator: "Robert Wilson",
    type: "In-house",
    day: "Monday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 16000,
    students: 20,
    status: "active",
  },
  {
    id: 3,
    name: "Science Club",
    coordinator: "Michael Johnson",
    type: "In-house",
    day: "Tuesday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 20000,
    students: 22,
    status: "active",
  },
  {
    id: 4,
    name: "Art Club",
    coordinator: "Sarah Williams",
    type: "Vendor",
    day: "Tuesday",
    time: "3:00 PM - 4:00 PM",
    timeSlot: "15:00-16:00",
    amount: 22000,
    students: 15,
    status: "active",
  },
  {
    id: 12,
    name: "Photography Club",
    coordinator: "Lisa Anderson",
    type: "Vendor",
    day: "Tuesday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 24000,
    students: 18,
    status: "active",
  },
  {
    id: 5,
    name: "Coding Club",
    coordinator: "Robert Brown",
    type: "Vendor",
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 25000,
    students: 20,
    status: "active",
  },
  {
    id: 6,
    name: "Drama Club",
    coordinator: "Emily Davis",
    type: "In-house",
    day: "Wednesday",
    time: "3:00 PM - 4:00 PM",
    timeSlot: "15:00-16:00",
    amount: 15000,
    students: 12,
    status: "inactive",
  },
  {
    id: 13,
    name: "Robotics Club",
    coordinator: "Tech Innovations Ltd",
    type: "Vendor",
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 30000,
    students: 15,
    status: "active",
  },
  {
    id: 7,
    name: "Music Club",
    coordinator: "David Wilson",
    type: "Vendor",
    day: "Thursday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 20000,
    students: 18,
    status: "active",
  },
  {
    id: 14,
    name: "Dance Club",
    coordinator: "Maria Garcia",
    type: "In-house",
    day: "Thursday",
    time: "2:00 PM - 3:00 PM",
    timeSlot: "14:00-15:00",
    amount: 17000,
    students: 22,
    status: "active",
  },
]

export function ClubsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClubs = mockClubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.coordinator.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group clubs by day and time slot to identify conflicts
  const getTimeConflicts = (club: (typeof mockClubs)[0]) => {
    return mockClubs.filter(
      (otherClub) =>
        otherClub.id !== club.id &&
        otherClub.day === club.day &&
        otherClub.timeSlot === club.timeSlot &&
        otherClub.status === "active",
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Link href="/admin/clubs/create">
          <Button>Create Club</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Club Name</TableHead>
              <TableHead>Coordinator</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Conflicts</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClubs.map((club) => {
              const conflicts = getTimeConflicts(club)
              const hasConflicts = conflicts.length > 0

              return (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.coordinator}</TableCell>
                  <TableCell>
                    <Badge variant={club.type === "In-house" ? "default" : "secondary"}>{club.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{club.day}</div>
                      <div className="text-muted-foreground">{club.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>₦{club.amount.toLocaleString()}</TableCell>
                  <TableCell>{club.students}</TableCell>
                  <TableCell>
                    <Badge variant={club.status === "active" ? "default" : "secondary"}>{club.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {hasConflicts ? (
                      <div className="flex items-center gap-1">
                        <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          {conflicts.length} conflict{conflicts.length > 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit Club
                        </DropdownMenuItem>
                        {hasConflicts && (
                          <DropdownMenuItem>
                            <AlertTriangleIcon className="mr-2 h-4 w-4" />
                            View Conflicts
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <TrashIcon className="mr-2 h-4 w-4" />
                          Delete Club
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
