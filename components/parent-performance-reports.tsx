"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon, StarIcon } from "lucide-react"

// Mock data
const children = [
  { id: 1, name: "Alex Smith", class: "JSS 2" },
  { id: 2, name: "Emma Smith", class: "Primary 5" },
]

const mockReports = [
  {
    id: 1,
    childId: 1,
    club: "Chess Club",
    term: "1st Term",
    date: "2023-11-15",
    attendance: "92%",
    skills: ["Strategic thinking", "Patience", "Critical analysis"],
    achievements: ["Won inter-class tournament", "Achieved level 3 certification"],
    areas: ["Time management during matches", "Opening strategies"],
    rating: 4,
  },
  {
    id: 2,
    childId: 1,
    club: "Science Club",
    term: "1st Term",
    date: "2023-11-10",
    attendance: "85%",
    skills: ["Experimental design", "Data analysis", "Teamwork"],
    achievements: ["Completed science fair project", "Led team experiment"],
    areas: ["Documentation of experiments", "Theoretical understanding"],
    rating: 3,
  },
  {
    id: 3,
    childId: 2,
    club: "Art Club",
    term: "1st Term",
    date: "2023-11-12",
    attendance: "100%",
    skills: ["Color theory", "Composition", "Mixed media techniques"],
    achievements: ["Artwork selected for school exhibition", "Mastered watercolor technique"],
    areas: ["Time management on projects", "Perspective drawing"],
    rating: 5,
  },
  {
    id: 4,
    childId: 2,
    club: "Music Club",
    term: "1st Term",
    date: "2023-11-08",
    attendance: "95%",
    skills: ["Rhythm", "Sight reading", "Ensemble playing"],
    achievements: ["Performed solo at school concert", "Learned 5 new pieces"],
    areas: ["Practice consistency", "Advanced techniques"],
    rating: 4,
  },
]

export function ParentPerformanceReports() {
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedTerm, setSelectedTerm] = useState("1st Term")

  // Filter reports based on selected child and term
  const filteredReports = mockReports.filter(
    (report) =>
      (selectedChild === "all" || report.childId === Number(selectedChild)) &&
      (!selectedTerm || report.term === selectedTerm),
  )

  // Group reports by child when "all" is selected
  const groupedReports =
    selectedChild === "all"
      ? children
          .map((child) => ({
            child,
            reports: filteredReports.filter((report) => report.childId === child.id),
          }))
          .filter((group) => group.reports.length > 0)
      : null

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  const renderReportCard = (report) => (
    <Card key={report.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{report.club}</CardTitle>
            <CardDescription>
              {selectedChild === "all" ? "" : `${children.find((c) => c.id === report.childId)?.name} - `}
              {report.term}
            </CardDescription>
          </div>
          <Badge variant="outline">{report.date}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="improvement">Improvement</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Attendance</h4>
              <p>{report.attendance}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Overall Rating</h4>
              <div className="flex">{renderStars(report.rating)}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Skills Developed</h4>
              <div className="flex flex-wrap gap-1">
                {report.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="achievements" className="pt-4">
            <ul className="list-disc pl-5 space-y-1">
              {report.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="improvement" className="pt-4">
            <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
            <ul className="list-disc pl-5 space-y-1">
              {report.areas.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <FileTextIcon className="h-4 w-4 mr-2" />
          View Full Report
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Select a child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id.toString()}>
                  {child.name} ({child.class})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/2">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st Term">1st Term</SelectItem>
              <SelectItem value="2nd Term">2nd Term</SelectItem>
              <SelectItem value="3rd Term">3rd Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReports.length > 0 ? (
        selectedChild === "all" ? (
          <div className="space-y-8">
            {groupedReports.map((group) => (
              <div key={group.child.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{group.child.name}'s Performance</h2>
                  <Badge variant="outline">{group.child.class}</Badge>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {group.reports.map((report) => renderReportCard(report))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">{filteredReports.map((report) => renderReportCard(report))}</div>
        )
      ) : (
        <div className="text-center py-10">
          <FileTextIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No reports found</h3>
          <p className="text-muted-foreground">
            {selectedChild
              ? "No performance reports available for the selected child and term."
              : "Please select a child to view their performance reports."}
          </p>
        </div>
      )}
    </div>
  )
}
