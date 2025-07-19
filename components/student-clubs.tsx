"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClockIcon, MapPinIcon, UsersIcon, BookOpenIcon } from "lucide-react"

// Mock data for student clubs
const studentClubs = [
  {
    id: 1,
    name: "Chess Club",
    day: "Monday",
    time: "2:00 PM - 3:00 PM",
    location: "Room 101",
    coordinator: "Mr. John Smith",
    members: 25,
    description: "Learn strategic thinking and problem-solving through the game of chess. All skill levels welcome.",
    nextSession: "2023-11-20",
    materials: ["Chess board (provided)", "Notebook"],
    image: "/chess-club.jpg",
  },
  {
    id: 2,
    name: "Science Club",
    day: "Wednesday",
    time: "3:00 PM - 4:00 PM",
    location: "Science Lab",
    coordinator: "Ms. Jane Wilson",
    members: 22,
    description: "Explore the wonders of science through hands-on experiments and projects.",
    nextSession: "2023-11-22",
    materials: ["Lab coat", "Safety goggles", "Notebook"],
    image: "/science-club.jpg",
  },
  {
    id: 3,
    name: "Art Club",
    day: "Friday",
    time: "2:00 PM - 3:00 PM",
    location: "Art Room",
    coordinator: "Mrs. Sarah Williams",
    members: 18,
    description:
      "Express yourself through various art forms and techniques. Develop your creativity and artistic skills.",
    nextSession: "2023-11-24",
    materials: ["Sketchbook", "Pencils", "Watercolors"],
    image: "/art-club.jpg",
  },
]

export function StudentClubs() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">You are enrolled in {studentClubs.length} clubs</h3>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={club.image || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(club.name)}`}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{club.name}</CardTitle>
                  <CardDescription>
                    {club.day}, {club.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{club.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{club.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Next session: {club.nextSession}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {studentClubs.map((club) => (
              <Card key={club.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{club.name}</CardTitle>
                    <Badge>{club.day}</Badge>
                  </div>
                  <CardDescription>
                    {club.time} at {club.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-4">{club.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{club.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Next: {club.nextSession}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpenIcon className="h-4 w-4 mr-1" />
                    <span>Coordinator: {club.coordinator}</span>
                  </div>
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-md border p-4">
        <h3 className="font-medium mb-2">Weekly Schedule</h3>
        <div className="grid grid-cols-5 gap-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
            const dayClubs = studentClubs.filter((club) => club.day === day)
            return (
              <div key={day} className="border rounded-md p-2">
                <h4 className="text-sm font-medium mb-2">{day}</h4>
                {dayClubs.length > 0 ? (
                  <div className="space-y-2">
                    {dayClubs.map((club) => (
                      <div key={club.id} className="text-xs p-2 bg-muted rounded-md">
                        <div className="font-medium">{club.name}</div>
                        <div className="text-muted-foreground">{club.time}</div>
                        <div className="text-muted-foreground">{club.location}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center py-4">No clubs</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
