"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3Icon, PieChartIcon } from "lucide-react"

export function EnrollmentCharts() {
  const [activeTab, setActiveTab] = useState("class")

  // In a real implementation, these would be actual charts using a library like Chart.js or Recharts
  // For now, we'll use placeholders

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="class" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="class">By Class</TabsTrigger>
            <TabsTrigger value="gender">By Gender</TabsTrigger>
            <TabsTrigger value="day">By Day</TabsTrigger>
            <TabsTrigger value="club">By Club</TabsTrigger>
          </TabsList>

          <TabsContent value="class">
            <div className="h-80 w-full flex flex-col items-center justify-center">
              <BarChart3Icon className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Enrollment Distribution by Class</p>
                <div className="grid grid-cols-6 gap-2 max-w-2xl mx-auto">
                  {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((cls, i) => (
                    <div key={cls} className="flex flex-col items-center">
                      <div
                        className="bg-primary w-full"
                        style={{
                          height: `${[65, 80, 70, 55, 45, 40][i]}px`,
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                        }}
                      ></div>
                      <p className="text-xs mt-1">{cls}</p>
                      <p className="text-xs font-medium">{[65, 80, 70, 55, 45, 40][i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gender">
            <div className="h-80 w-full flex flex-col items-center justify-center">
              <PieChartIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Enrollment Distribution by Gender</p>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Male (55%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                    <span>Female (45%)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="day">
            <div className="h-80 w-full flex flex-col items-center justify-center">
              <BarChart3Icon className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Enrollment Distribution by Day of Week</p>
                <div className="grid grid-cols-5 gap-2 max-w-2xl mx-auto">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className="bg-primary w-full"
                        style={{
                          height: `${[90, 75, 60, 70, 50][i]}px`,
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                        }}
                      ></div>
                      <p className="text-xs mt-1">{day}</p>
                      <p className="text-xs font-medium">{[90, 75, 60, 70, 50][i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="club">
            <div className="h-80 w-full flex flex-col items-center justify-center">
              <BarChart3Icon className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Top 5 Clubs by Enrollment</p>
                <div className="space-y-4 max-w-md mx-auto mt-4">
                  {[
                    { name: "Chess Club", count: 25, percent: 100 },
                    { name: "Science Club", count: 22, percent: 88 },
                    { name: "Coding Club", count: 20, percent: 80 },
                    { name: "Debate Club", count: 18, percent: 72 },
                    { name: "Music Club", count: 18, percent: 72 },
                  ].map((club) => (
                    <div key={club.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{club.name}</span>
                        <span>{club.count} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${club.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
