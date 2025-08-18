"use client"

import { useState, useEffect } from "react"
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

interface Club {
  id: string
  name: string
  coordinator: string
  coordinatorId?: string
  type: "In-house" | "Vendor"
  day: string
  time: string
  timeSlot: string
  amount: number
  students: number
  status: "active" | "inactive"
  description?: string
  image?: string
  variants?: { name: string; amount: number }[]
  terms?: string[]
  classes?: string[]
}

export function ClubsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clubs, setClubs] = useState<Club[]>([])

  // Load clubs from localStorage on component mount
  useEffect(() => {
    const savedClubs = localStorage.getItem('clubs')
    if (savedClubs) {
      setClubs(JSON.parse(savedClubs))
    }
  }, [])

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.coordinator.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group clubs by day and time slot to identify conflicts
  const getTimeConflicts = (club: Club) => {
    return clubs.filter(
      (otherClub) =>
        otherClub.id !== club.id &&
        otherClub.day === club.day &&
        otherClub.timeSlot === club.timeSlot &&
        otherClub.status === "active",
    )
  }

  const handleDeleteClub = (id: string) => {
    const updatedClubs = clubs.filter(club => club.id !== id)
    setClubs(updatedClubs)
    localStorage.setItem('clubs', JSON.stringify(updatedClubs))
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
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club) => {
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
                          <Link href={`/admin/clubs/edit/${club.id}`}>
                            <DropdownMenuItem>
                              <PencilIcon className="mr-2 h-4 w-4" />
                              Edit Club
                            </DropdownMenuItem>
                          </Link>
                          {hasConflicts && (
                            <DropdownMenuItem>
                              <AlertTriangleIcon className="mr-2 h-4 w-4" />
                              View Conflicts
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteClub(club.id)}
                          >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete Club
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No clubs found. Create your first club to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}