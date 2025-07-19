"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart2"

// Sample data for admission by class
const admissionByClass = [
  { name: "Toddlers", value: 15, color: "#8C57FF" },
  { name: "Nursery 1", value: 20, color: "#16B1FF" },
  { name: "Nursery 2", value: 25, color: "#56CA00" },
  { name: "Grade 1", value: 18, color: "#FFB400" },
  { name: "Grade 2", value: 12, color: "#FF4C51" },
  { name: "Grade 3", value: 8, color: "#8A8D93" },
  { name: "Grade 4", value: 10, color: "#8C57FF" },
  { name: "Grade 5", value: 6, color: "#16B1FF" },
  { name: "Grade 6", value: 4, color: "#56CA00" },
]

// Sample data for sibling admission
const siblingAdmission = [
  { name: "Siblings", value: 35, color: "#8C57FF" },
  { name: "Single", value: 65, color: "#16B1FF" },
]

// Sample data for conversion and growth
const conversionRate = 75 // percentage
const growthRate = 12 // percentage
   
export function AdmissionStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Admission by Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={admissionByClass}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {admissionByClass.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip content={<ChartTooltip active={undefined} payload={undefined} label={undefined} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sibling Admission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={siblingAdmission}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {siblingAdmission.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip content={<ChartTooltip active={undefined} payload={undefined} label={undefined} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admission Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium">Conversion Rate</p>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary-light">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${conversionRate}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{conversionRate}% of applicants convert to students</p>
            </div>

            <div>
              <p className="text-sm font-medium">Growth Rate</p>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary-light">
                <div className="h-2 rounded-full bg-success" style={{ width: `${growthRate * 5}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {growthRate}% increase in admissions compared to last year
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm font-medium">Total Applications</p>
                <p className="text-2xl font-bold">243</p>
              </div>
              <div>
                <p className="text-sm font-medium">Admitted</p>
                <p className="text-2xl font-bold">182</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
