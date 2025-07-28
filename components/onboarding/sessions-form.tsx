"use client"

import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { toast } from "@/components/ui/use-toast"

interface Session {
  id: string
  branch: string
  startDate: string
  endDate: string
}

export function SessionsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [sessions, setSessions] = useState<Session[]>(schoolData.sessions || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load sessions from local storage
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    if (savedSessions.length > 0) {
      setSessions(savedSessions)
      updateSchoolData({ sessions: savedSessions })
    }
    setIsMounted(true)
  }, [])

  // Save to local storage whenever sessions change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sessions', JSON.stringify(sessions))
      updateSchoolData({ sessions })
    }
  }, [sessions, isMounted])

  // Get branches from school data
  const branches = schoolData.branches || []

  const handleChange = (index: number, field: keyof Session, value: string) => {
    const updatedSessions = [...sessions]
    updatedSessions[index] = { ...updatedSessions[index], [field]: value }
    setSessions(updatedSessions)
  }

  const saveSession = (index: number) => {
    const session = sessions[index]
    toast({
      title: "Success",
      description: "Session saved successfully",
    })
  }

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        id: Date.now().toString(), // Simple ID generation
        branch: branches.length > 0 ? branches[0].name : "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const removeSession = (index: number) => {
    const updatedSessions = [...sessions]
    updatedSessions.splice(index, 1)
    setSessions(updatedSessions)
    toast({
      title: "Success",
      description: "Session removed successfully",
    })
  }

  if (!isMounted) return null

  return (
    <div className="space-y-6">
      <div className="bg-card dark:bg-card-dark p-4 rounded-md border border-border mb-6">
        <h3 className="font-medium mb-2">Session Settings</h3>
        <p className="text-sm text-secondary dark:text-secondary">
          Configure the academic session start and end dates for each branch.
        </p>
      </div>

      {sessions.map((session, index) => (
        <Card key={session.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Session {index + 1}</h3>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => removeSession(index)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor={`branch-${index}`}>Branch</Label>
              <Select
                value={session.branch}
                onValueChange={(value) => {
                  handleChange(index, "branch", value)
                  saveSession(index)
                }}
                disabled={isLoading || branches.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.length > 0 ? (
                    branches.map((branch, i) => (
                      <SelectItem key={i} value={branch.name || branch.id || `branch-${i}`}>
                        {branch.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-branches" disabled>
                      No branches available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`start-date-${index}`}>Session Start Date</Label>
                <Input
                  id={`start-date-${index}`}
                  type="date"
                  value={session.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  onBlur={() => saveSession(index)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`end-date-${index}`}>Session End Date</Label>
                <Input
                  id={`end-date-${index}`}
                  type="date"
                  value={session.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  onBlur={() => saveSession(index)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button 
        variant="outline" 
        onClick={addSession} 
        className="w-full"
        disabled={isLoading}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Session
      </Button>
    </div>
  )
}