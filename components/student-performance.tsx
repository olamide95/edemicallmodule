"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StarIcon, FileTextIcon, TrophyIcon, BookOpenIcon } from "lucide-react"

// Mock data for student performance
const studentReports = [
  {
    id: 1,
    club: "Chess Club",
    term: "1st Term",
    date: "2023-11-15",
    attendance: 92,
    participation: 85,
    skills: 90,
    overall: 88,
    achievements: [
      "Won inter-class tournament",
      "Achieved level 3 certification",
      "Demonstrated advanced opening strategies",
    ],
    feedback:
      "John shows excellent strategic thinking and patience. He has made significant progress in understanding complex chess positions. Areas for improvement include time management during matches and studying more advanced opening strategies.",
    strengths: ["Strategic thinking", "Patience", "Critical analysis"],
    improvements: ["Time management during matches", "Opening strategies"],
    coordinator: "Mr. John Smith",
  },
  {
    id: 2,
    club: "Science Club",
    term: "1st Term",
    date: "2023-11-10",
    attendance: 85,
    participation: 80,
    skills: 75,
    overall: 78,
    achievements: ["Completed science fair project", "Led team experiment", "Presented findings to class"],
    feedback:
      "John has shown good engagement in the Science Club activities. He demonstrates curiosity and willingness to learn. His experimental skills are developing well, but he needs to improve on documentation and theoretical understanding of concepts.",
    strengths: ["Experimental design", "Data analysis", "Teamwork"],
    improvements: ["Documentation of experiments", "Theoretical understanding"],
    coordinator: "Ms. Jane Wilson",
  },
  {
    id: 3,
    club: "Art Club",
    term: "1st Term",
    date: "2023-11-12",
    attendance: 100,
    participation: 95,
    skills: 90,
    overall: 95,
    achievements: [
      "Artwork selected for school exhibition",
      "Mastered watercolor technique",
      "Created portfolio of 10 pieces",
    ],
    feedback:
      "John has shown exceptional talent and dedication in Art Club. His creativity and attention to detail are impressive. He consistently participates in all activities and helps other students. Areas for improvement include time management on projects and perspective drawing techniques.",
    strengths: ["Color theory", "Composition", "Mixed media techniques"],
    improvements: ["Time management on projects", "Perspective drawing"],
    coordinator: "Mrs. Sarah Williams",
  },
]

export function StudentPerformance() {
  const [selectedClub, setSelectedClub] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("1st Term")

  // Filter reports based on selected club and term
  const filteredReports = studentReports.filter(
    (report) => (!selectedClub || report.club === selectedClub) && (!selectedTerm || report.term === selectedTerm),
  )

  const renderStars = (rating: number) => {
    const normalizedRating = Math.round(rating / 20) // Convert percentage to 5-star scale
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < normalizedRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Select value={selectedClub} onValueChange={setSelectedClub}>
            <SelectTrigger>
              <SelectValue placeholder="Select a club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clubs</SelectItem>
              {studentReports.map((report) => (
                <SelectItem key={report.id} value={report.club}>
                  {report.club}
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
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{report.club}</CardTitle>
                    <CardDescription>
                      {report.term} - {report.date}
                    </CardDescription>
                  </div>
                  <div className="flex">{renderStars(report.overall)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span>{report.attendance}%</span>
                        </div>
                        <Progress value={report.attendance} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Participation</span>
                          <span>{report.participation}%</span>
                        </div>
                        <Progress value={report.participation} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Skills Development</span>
                          <span>{report.skills}%</span>
                        </div>
                        <Progress value={report.skills} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Overall Performance</span>
                          <span>{report.overall}%</span>
                        </div>
                        <Progress value={report.overall} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Strengths</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {report.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {report.improvements.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="achievements" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrophyIcon className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-medium">Key Achievements</h4>
                      </div>
                      <ul className="list-disc pl-5 space-y-2">
                        {report.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="feedback" className="pt-4">
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-md">
                        <p className="italic">{report.feedback}</p>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          <span>Coordinator: {report.coordinator}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FileTextIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No reports found</h3>
          <p className="text-muted-foreground">
            {selectedClub
              ? "No performance reports available for the selected club and term."
              : "Please select a club to view your performance reports."}
          </p>
        </div>
      )}
    </div>
  )
}
