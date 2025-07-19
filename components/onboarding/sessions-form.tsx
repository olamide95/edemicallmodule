"use client"

import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { api } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface Session {
  id?: string
  branch: string
  startDate: string
  endDate: string
}

export function SessionsForm() {
  const { schoolData, updateSchoolData } = useContext(OnboardingContext)
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Load sessions from backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/school-setup/sessions')
        if (response.success && response.data) {
          setSessions(response.data)
          updateSchoolData({ sessions: response.data })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch sessions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const handleChange = (index: number, field: keyof Session, value: string) => {
    const updatedSessions = [...sessions]
    updatedSessions[index] = { ...updatedSessions[index], [field]: value }
    setSessions(updatedSessions)
  }

  const saveSession = async (index: number) => {
    const session = sessions[index]
    try {
      setIsLoading(true)
      let response
      
      if (session.id) {
        // Update existing session
        response = await api.put(`/school-setup/session/${session.id}`, session)
      } else {
        // Create new session
        response = await api.post('/school-setup/session', session)
      }

      if (response.success) {
        const updatedSessions = [...sessions]
        updatedSessions[index] = response.data
        setSessions(updatedSessions)
        updateSchoolData({ sessions: updatedSessions })
        toast({
          title: "Success",
          description: session.id ? "Session updated successfully" : "Session created successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save session",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        branch: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const removeSession = async (index: number) => {
    const session = sessions[index]
    if (!session.id) {
      // Session not saved yet, just remove from local state
      const updatedSessions = [...sessions]
      updatedSessions.splice(index, 1)
      setSessions(updatedSessions)
      updateSchoolData({ sessions: updatedSessions })
      return
    }

    try {
      setIsDeleting(session.id)
      const response = await api.delete(`/school-setup/session/${session.id}`)
      if (response.success) {
        const updatedSessions = [...sessions]
        updatedSessions.splice(index, 1)
        setSessions(updatedSessions)
        updateSchoolData({ sessions: updatedSessions })
        toast({
          title: "Success",
          description: "Session deleted successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete session",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card dark:bg-card-dark p-4 rounded-md border border-border mb-6">
        <h3 className="font-medium mb-2">Session Settings</h3>
        <p className="text-sm text-secondary dark:text-secondary">
          Configure the academic session start and end dates for each branch.
        </p>
      </div>

      {sessions.map((session, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Session {index + 1}</h3>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => removeSession(index)}
              disabled={isDeleting === session.id}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting === session.id ? "Deleting..." : "Remove"}
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
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Head Office">Head Office</SelectItem>
                  <SelectItem value="Branch 1">Branch 1</SelectItem>
                  <SelectItem value="Branch 2">Branch 2</SelectItem>
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