"use client"

import { useState } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, Trash2, Pencil, ChevronLeft } from "lucide-react"

export default function AcademicConfigurationPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("settings")
  const [activeVerticalTab, setActiveVerticalTab] = useState("report-card-settings")

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const verticalTabs = [
    { id: "report-card-settings", label: "Report Card Settings" },
    { id: "assessment-group", label: "Assessment Group" },
    { id: "report-card-configuration", label: "Report Card Configuration" },
    { id: "behavior-performance-index", label: "Behavior Performance Index" },
    { id: "transcript-settings", label: "Transcript Settings" },
  ]

  const getPageTitle = () => {
    switch (activeVerticalTab) {
      case "assessment-group":
        return "Assessment Group"
      default:
        return "Report card setting"
    }
  }

  const getTabsList = () => {
    if (activeVerticalTab === "assessment-group") {
      return ["Assessment Group Settings"]
    }
    return ["Settings", "Grading Scale", "Signature Authorities", "Manage Evaluation"]
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#f4f5fa" }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm mx-6 mt-6 overflow-hidden">
            <div className="flex justify-between items-center p-6">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#2e263d" }}>
                  {activeVerticalTab === "assessment-group" ? "Academic Configuration" : "Settings and Configuration"}
                </h1>
                <div className="flex items-center text-sm mt-1" style={{ color: "#8a8d93" }}>
                  <span>Apps</span>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>Academics</span>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>Academic Settings and configuration</span>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="font-medium" style={{ color: "#8c57ff" }}>
                    Academic configuration
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: "#455a64" }}>
                  Setup your Company, Branches, Department, Employee Details, Leave,
                  <br />
                  Attendance and Expense Claims
                </p>
                <Button className="mt-3 text-white rounded-md px-4 py-2 text-sm" style={{ backgroundColor: "#8c57ff" }}>
                  Click To Learn More
                </Button>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/placeholder.svg?height=150&width=200&query=settings configuration illustration with purple gears and people"
                  alt="Configuration Illustration"
                  width={200}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex mx-6 mt-6 gap-0">
            {/* Left Vertical Tabs */}
            <div className="w-64 bg-white rounded-l-lg shadow-sm">
              <div className="p-0">
                <div className="space-y-0">
                  {verticalTabs.map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => setActiveVerticalTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium cursor-pointer transition-colors border-l-4 ${
                        activeVerticalTab === tab.id
                          ? "border-l-[#8c57ff] text-[#8c57ff] bg-[#f0ebff]"
                          : "border-l-transparent hover:bg-[#f4f5fa]"
                      }`}
                      style={{
                        color: activeVerticalTab === tab.id ? "#8c57ff" : "#455a64",
                      }}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demarcation Line */}
            <div className="w-px" style={{ backgroundColor: "#ebebeb" }}></div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-r-lg shadow-sm">
              <div className="flex justify-between items-center p-6" style={{ borderBottom: "1px solid #ebebeb" }}>
                <h2 className="text-lg font-medium" style={{ color: "#2e263d" }}>
                  {getPageTitle()}
                </h2>
                <div className="flex items-center gap-4">
                  <span
                    className="px-3 py-1 rounded text-sm font-medium"
                    style={{ backgroundColor: "#fef2f2", color: "#ef4444" }}
                  >
                    Not Saved
                  </span>
                  <Button className="text-white px-6" style={{ backgroundColor: "#8c57ff" }}>
                    Save
                  </Button>
                </div>
              </div>

              {activeVerticalTab === "assessment-group" ? (
                // Assessment Group Content
                <div className="p-6">
                  <div className="mb-6">
                    <div className="border-b border-gray-200">
                      <div className="flex">
                        <button className="px-6 py-3 text-sm font-medium border-b-2 border-[#8c57ff] text-[#8c57ff]">
                          Assessment Group Settings
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium mb-6" style={{ color: "#8c57ff" }}>
                        Create Assessment Group
                      </h3>

                      <div className="flex justify-end mb-6 gap-2">
                        <Button
                          variant="outline"
                          className="text-white border-gray-300"
                          style={{ backgroundColor: "#6b7280" }}
                        >
                          Create Manually
                        </Button>
                        <Button variant="outline" className="text-gray-600 border-gray-300">
                          Auto Generate
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="grading-group-name" className="text-sm flex items-center">
                            Grading Group Name <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input id="grading-group-name" placeholder="Entrance Exams" defaultValue="Entrance Exams" />
                        </div>
                        <div className="flex items-center gap-6 pt-6">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="group-type"
                              className="h-4 w-4"
                              style={{ accentColor: "#8c57ff" }}
                              defaultChecked
                            />
                            <Label className="text-sm">Academic</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="group-type"
                              className="h-4 w-4"
                              style={{ accentColor: "#8c57ff" }}
                            />
                            <Label className="text-sm">Non Academic</Label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center">
                            Class <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <select className="w-full p-2 border rounded-md bg-white">
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center">
                            Section <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <select className="w-full p-2 border rounded-md bg-white">
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm flex items-center">
                            Grading Scale <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <select className="w-full p-2 border rounded-md bg-white">
                            <option>Select</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <Button className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            + Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <Label className="text-sm flex items-center">
                          Section <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <select className="w-full max-w-xs p-2 border rounded-md bg-white">
                          <option>Select</option>
                        </select>
                      </div>

                      {/* Custom Subject/Activity Fields */}
                      <div className="space-y-4">
                        {/* First row - normal state */}
                        <div className="flex items-center gap-4">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#f9fafb" }}
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-1"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="mark-assign-1" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            Add
                          </Button>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Second row - normal state */}
                        <div className="flex items-center gap-4">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#f9fafb" }}
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-2"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="mark-assign-2" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            Add
                          </Button>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Third row - normal state */}
                        <div className="flex items-center gap-4">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#f9fafb" }}
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-3"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="mark-assign-3" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            Add
                          </Button>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Fourth row - with drag handle */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="cursor-move text-[#8c57ff]">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M10 13a1 1 0 100-2 1 1 0 000 2zM10 8a1 1 0 100-2 1 1 0 000 2zM10 3a1 1 0 100-2 1 1 0 000 2zM6 13a1 1 0 100-2 1 1 0 000 2zM6 8a1 1 0 100-2 1 1 0 000 2zM6 3a1 1 0 100-2 1 1 0 000 2z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="Custom Subject/Activity"
                              className="flex-1"
                              style={{ backgroundColor: "#ffffff" }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-4"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="mark-assign-4" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            Add
                          </Button>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Fifth row - with drag handle and different styling */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="cursor-move text-[#8c57ff]">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M10 13a1 1 0 100-2 1 1 0 000 2zM10 8a1 1 0 100-2 1 1 0 000 2zM10 3a1 1 0 100-2 1 1 0 000 2zM6 13a1 1 0 100-2 1 1 0 000 2zM6 8a1 1 0 100-2 1 1 0 000 2zM6 3a1 1 0 100-2 1 1 0 000 2z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="Custom Subject/Activity"
                              className="flex-1"
                              style={{ backgroundColor: "#ffffff" }}
                            />
                          </div>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Sixth row - grayed out state */}
                        <div className="flex items-center gap-4 opacity-60">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#e5e7eb" }}
                            disabled
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-6"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                              disabled
                            />
                            <Label htmlFor="mark-assign-6" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }} disabled>
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                            disabled
                          >
                            Delete
                          </Button>
                        </div>

                        {/* Seventh row - grayed out state */}
                        <div className="flex items-center gap-4 opacity-60">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#e5e7eb" }}
                            disabled
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-7"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                              disabled
                            />
                            <Label htmlFor="mark-assign-7" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }} disabled>
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                            disabled
                          >
                            Delete
                          </Button>
                        </div>

                        {/* Eighth row - with drag handle */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="cursor-move text-[#8c57ff]">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M10 13a1 1 0 100-2 1 1 0 000 2zM10 8a1 1 0 100-2 1 1 0 000 2zM10 3a1 1 0 100-2 1 1 0 000 2zM6 13a1 1 0 100-2 1 1 0 000 2zM6 8a1 1 0 100-2 1 1 0 000 2zM6 3a1 1 0 100-2 1 1 0 000 2z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="Custom Subject/Activity"
                              className="flex-1"
                              style={{ backgroundColor: "#ffffff" }}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-8"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="mark-assign-8" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                            Add
                          </Button>
                          <Button size="sm" variant="outline" style={{ color: "#ef4444", borderColor: "#ef4444" }}>
                            Delete
                          </Button>
                        </div>

                        {/* Ninth row - grayed out state */}
                        <div className="flex items-center gap-4 opacity-60">
                          <Input
                            placeholder="Custom Subject/Activity"
                            className="flex-1"
                            style={{ backgroundColor: "#e5e7eb" }}
                            disabled
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mark-assign-9"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                              disabled
                            />
                            <Label htmlFor="mark-assign-9" className="text-sm">
                              Mark Assign
                            </Label>
                          </div>
                          <Button size="sm" className="text-white" style={{ backgroundColor: "#8c57ff" }} disabled>
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                            disabled
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Report Card Settings Content
                <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList
                    className="grid grid-cols-4 bg-transparent p-0 h-auto"
                    style={{ borderBottom: "1px solid #ebebeb" }}
                  >
                    {getTabsList().map((tab, index) => {
                      const tabValue = tab.toLowerCase().replace(/\s+/g, "-")
                      return (
                        <TabsTrigger
                          key={tabValue}
                          value={tabValue}
                          className={`py-3 px-6 border-b-2 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none`}
                          style={{
                            borderBottomColor: activeTab === tabValue ? "#8c57ff" : "transparent",
                            color: activeTab === tabValue ? "#8c57ff" : "#8a8d93",
                            backgroundColor: "transparent",
                          }}
                        >
                          {tab}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>

                  {/* Settings Tab Content */}
                  <TabsContent value="settings" className="p-6 space-y-8">
                    {/* Academic Report Appearance */}
                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Academic Report Appearance
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: "#2e263d" }}>
                            Show Consolidated Attendance/Total Average/Average Percentages for the Student performance
                          </span>
                          <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: "#2e263d" }}>
                            Show Each Term's Attendance/Total Average/Average Percentages for the Student performance
                          </span>
                          <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: "#2e263d" }}>
                            Show GPA Reports Options
                          </span>
                          <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: "#2e263d" }}>
                            Show Grades Report Options
                          </span>
                          <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Generation of Report car */}
                      <div>
                        <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                          Generation of Report car
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-5 items-center">
                              <input
                                type="radio"
                                name="report-generation"
                                className="h-4 w-4 border-gray-300 focus:ring-2"
                                style={{ accentColor: "#8c57ff" }}
                                defaultChecked
                              />
                            </div>
                            <div>
                              <Label className="font-medium" style={{ color: "#2e263d" }}>
                                Subject wise Score upload
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                Admin can configure the score upload settings, from these settings report card will show
                                either student's subject or students assigned group score details.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Attendance Comes From */}
                      <div>
                        <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                          Attendance Comes From
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-5 items-center">
                              <input
                                type="radio"
                                name="attendance-source"
                                className="h-4 w-4 border-gray-300 focus:ring-2"
                                style={{ accentColor: "#8c57ff" }}
                                defaultChecked
                              />
                            </div>
                            <div>
                              <Label className="font-medium" style={{ color: "#2e263d" }}>
                                Attendance Bulk Upload
                              </Label>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex h-5 items-center">
                              <input
                                type="radio"
                                name="attendance-source"
                                className="h-4 w-4 border-gray-300 focus:ring-2"
                                style={{ accentColor: "#8c57ff" }}
                              />
                            </div>
                            <div>
                              <Label className="font-medium" style={{ color: "#2e263d" }}>
                                Regular Attendance
                              </Label>
                            </div>
                          </div>
                          <p className="text-xs mt-2" style={{ color: "#8a8d93" }}>
                            Admin can configure the Attendance upload settings, from these settings report card will
                            show students attendance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Report Card Appearance */}
                      <div>
                        <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                          Report Card Appearance
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-attendance"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-attendance" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Student's Attendance Details
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show student's attendance details with student's Present days and Absent days
                                with total working days in respective terms.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-gpa"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-gpa" className="font-medium" style={{ color: "#2e263d" }}>
                                Show GPA Details
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will replicate GPA Calculations in the Report card, there will be a column added in
                                the report card to show GPA.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-grading-scale"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-grading-scale" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Grading Scale details
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                Admin can manage to show or hide grading scales parameters in Report card through this
                                settings.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-signature"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-signature" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Signature & School Stamp
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                Principal and Grade teacher's signature's should appear or not appear on a report card
                                can be managed from this settings.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-total-marks"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-total-marks" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Total Marks: Marks Obtained/Total Scores
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show student's Total Marks details with Obtained Marks
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-average-percentage"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label
                                htmlFor="show-average-percentage"
                                className="font-medium"
                                style={{ color: "#2e263d" }}
                              >
                                Show Student's Average Percentage
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show student's Average Percentage
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-average-grades"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-average-grades" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Student's Average Grades
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show student's Average Grades
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-attendance-total"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label
                                htmlFor="show-attendance-total"
                                className="font-medium"
                                style={{ color: "#2e263d" }}
                              >
                                Show Student's Average Attendance - Total Present/ Total/ Total Working days
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show Student's Average Attendance - Total Present/ Total/ Total Working days
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-student-remark"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label htmlFor="show-student-remark" className="font-medium" style={{ color: "#2e263d" }}>
                                Show Student's Remark
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show Student's Remark on Reportcard
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="show-student-remark-2"
                              className="mt-1 data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <div>
                              <Label
                                htmlFor="show-student-remark-2"
                                className="font-medium"
                                style={{ color: "#2e263d" }}
                              >
                                Show Student's Remark
                              </Label>
                              <p className="text-xs mt-1" style={{ color: "#8a8d93" }}>
                                This will show Student's Remark on Reportcard
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Score Upload Settings */}
                      <div>
                        <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                          Score Upload Settings
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium" style={{ color: "#2e263d" }}>
                              Permission to Report card printing
                            </span>
                            <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                          </div>
                          <p className="text-xs" style={{ color: "#8a8d93" }}>
                            This will allow teachers to print their assigned grades report card from their respective
                            logins.
                          </p>

                          <div className="mt-6">
                            <h4 className="font-medium mb-3" style={{ color: "#2e263d" }}>
                              Select which default Evaluation to include:
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="homework"
                                  className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                                />
                                <Label htmlFor="homework" className="text-sm" style={{ color: "#2e263d" }}>
                                  Homework
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="online-exam"
                                  className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                                />
                                <Label htmlFor="online-exam" className="text-sm" style={{ color: "#2e263d" }}>
                                  Online Exam
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="assignments"
                                  className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                                />
                                <Label htmlFor="assignments" className="text-sm" style={{ color: "#2e263d" }}>
                                  Assignments
                                </Label>
                              </div>
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8a8d93" }}>
                              By checking these features will allow teachers to provide scores for these Academic
                              activities in academic evaluation for each Term and their average scores will appear
                              automatically on Report Card.
                            </p>
                          </div>

                          <div className="mt-6">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium" style={{ color: "#2e263d" }}>
                                Allow students to Exempt any Test or Evaluation
                              </span>
                              <Switch defaultChecked className="data-[state=checked]:bg-[#8c57ff]" />
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8a8d93" }}>
                              By allowing this feature, the can give "E" as Exempt in Score upload and Academic
                              Evaluation if any student is exempted from any exam or any evaluation if a teacher is
                              marking E in any evaluation that will not count in the student's average calculation for
                              that subject or group in Report Card.
                            </p>
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium mb-3" style={{ color: "#2e263d" }}>
                              Allowed values to score upload:
                            </h4>
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="numeric"
                                  className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                                />
                                <Label htmlFor="numeric" className="text-sm" style={{ color: "#2e263d" }}>
                                  Numeric
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="alphabetic"
                                  className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                                />
                                <Label htmlFor="alphabetic" className="text-sm" style={{ color: "#2e263d" }}>
                                  Online(Alphabetic / Special values)
                                </Label>
                              </div>
                            </div>
                            <p className="text-xs mt-2" style={{ color: "#8a8d93" }}>
                              Please turn on for those values that the report card considers to be "0" in order to
                              calculate the total score.
                            </p>
                          </div>

                          <div className="mt-6">
                            <Button className="text-white mb-4" style={{ backgroundColor: "#8c57ff" }}>
                              + Add Grade
                            </Button>
                            <div className="grid grid-cols-3 gap-3">
                              {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="relative">
                                  <Input placeholder="Insert a grade" className="pr-8" />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:text-red-700"
                                    style={{ color: "#ff4c51" }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Grading Scale Tab Content */}
                  <TabsContent value="grading-scale" className="p-6 space-y-8">
                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Create Grading Scale
                      </h3>
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="grading-group-name" className="text-sm flex items-center">
                            Grading Group Name <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input id="grading-group-name" placeholder="Enter Input" />
                        </div>
                        <div className="flex items-center gap-6 pt-6">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="non-academic"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="non-academic" className="text-sm">
                              Non Academic
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="preschool"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="preschool" className="text-sm">
                              Preschool/Nursery
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="grade-school"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="grade-school" className="text-sm">
                              Grade School
                            </Label>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mb-4" style={{ color: "#8a8d93" }}>
                        Fill the grading parameter below :
                      </p>

                      <div className="flex justify-end mb-4">
                        <Button className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                          + Add Grading Parameter
                        </Button>
                      </div>

                      <div className="grid grid-cols-6 gap-3 mb-4">
                        <Input placeholder="Enter Grading Parameter" />
                        <Input placeholder="Max" />
                        <Input placeholder="Min" />
                        <Input placeholder="GPA" />
                        <Input placeholder="Description" />
                        <div className="flex items-center gap-2">
                          <Input placeholder="Report Card Remark" className="flex-1" />
                          <div className="flex items-center gap-1">
                            <Checkbox
                              id="fail-grade"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="fail-grade" className="text-sm">
                              Fail
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Grading Scales List
                      </h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4" style={{ backgroundColor: "#f9fafb" }}>
                          <h4 className="font-medium mb-3">Filters</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Name</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Type of scale</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Status</option>
                            </select>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr style={{ backgroundColor: "#f9fafb" }} className="text-left">
                                <th className="p-3">
                                  <Checkbox className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]" />
                                </th>
                                <th className="p-3 font-medium text-sm">NAME</th>
                                <th className="p-3 font-medium text-sm">TYPE OF SCALE</th>
                                <th className="p-3 font-medium text-sm">SHOW IN REPORT CARD</th>
                                <th className="p-3 font-medium text-sm">VIEW SCALE</th>
                                <th className="p-3 font-medium text-sm">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-t">
                                  <td className="p-3">
                                    <Checkbox className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]" />
                                  </td>
                                  <td className="p-3 text-sm">Nursery</td>
                                  <td className="p-3 text-sm">Academic</td>
                                  <td className="p-3">
                                    <Checkbox className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]" />
                                  </td>
                                  <td className="p-3">
                                    <Button variant="link" className="p-0 text-sm" style={{ color: "#8c57ff" }}>
                                      Click To View
                                    </Button>
                                  </td>
                                  <td className="p-3">
                                    <select className="text-sm border rounded px-2 py-1">
                                      <option>Select</option>
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="p-3 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Rows per page:</span>
                            <select className="border rounded p-1 text-sm">
                              <option>10</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">1-5 of 13</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Signature Authorities Tab Content */}
                  <TabsContent value="signature-authorities" className="p-6 space-y-8">
                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Create Signature Authorities
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm flex items-center">
                              Name <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input id="name" placeholder="Enter Input" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="designation" className="text-sm flex items-center">
                              Designation <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input id="designation" placeholder="Enter Input" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm flex items-center">
                              Upload File Here <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <div className="mb-4">
                                <div className="text-sm text-gray-600 mb-2">Signature Photo</div>
                                <div className="flex justify-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    style={{ color: "#8c57ff", borderColor: "#8c57ff" }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    style={{ color: "#ff4c51", borderColor: "#ff4c51" }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">
                                Click to browse or
                                <br />
                                drag and drop your files
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">supported_types : .pdf, .png,.jpeg,.jpg</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="school-stamp"
                              className="data-[state=checked]:bg-[#8c57ff] data-[state=checked]:border-[#8c57ff]"
                            />
                            <Label htmlFor="school-stamp" className="text-sm">
                              Uploaded File A School Stamp/Seal?
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Signature Authorities List
                      </h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4" style={{ backgroundColor: "#f9fafb" }}>
                          <h4 className="font-medium mb-3">Filters</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Name</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Designation</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select File Type</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-4 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            style={{ color: "#10b981", borderColor: "#10b981" }}
                            className="text-sm"
                          >
                            📊 Excel
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                            className="text-sm"
                          >
                            📧 Email
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#f59e0b", borderColor: "#f59e0b" }}
                            className="text-sm"
                          >
                            🖨️ Print
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                            className="text-sm"
                          >
                            📄 Pdf
                          </Button>
                          <div className="flex-1 flex justify-end">
                            <Input placeholder="Search" className="max-w-xs" />
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr style={{ backgroundColor: "#f9fafb" }} className="text-left">
                                <th className="p-3 font-medium text-sm">#</th>
                                <th className="p-3 font-medium text-sm">NAME</th>
                                <th className="p-3 font-medium text-sm">DESIGNATION</th>
                                <th className="p-3 font-medium text-sm">FILE</th>
                                <th className="p-3 font-medium text-sm">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t">
                                <td className="p-3 text-sm">1</td>
                                <td className="p-3 text-sm">Ayodeji Babashola</td>
                                <td className="p-3 text-sm">Academics</td>
                                <td className="p-3">
                                  <span className="inline-flex items-center gap-1 text-sm">📄 PNG</span>
                                </td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">2</td>
                                <td className="p-3 text-sm">HOS Signature</td>
                                <td className="p-3 text-sm">Admission Officer</td>
                                <td className="p-3">
                                  <span className="inline-flex items-center gap-1 text-sm">📄 PDF</span>
                                </td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">3</td>
                                <td className="p-3 text-sm">Brickmind Signature</td>
                                <td className="p-3 text-sm">Teacher</td>
                                <td className="p-3">
                                  <span className="inline-flex items-center gap-1 text-sm">📄 JPEG</span>
                                </td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">4</td>
                                <td className="p-3 text-sm">temi lojulouwa</td>
                                <td className="p-3 text-sm">Accounts User</td>
                                <td className="p-3">
                                  <span className="inline-flex items-center gap-1 text-sm">📄 PDF</span>
                                </td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="p-3 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Rows per page:</span>
                            <select className="border rounded p-1 text-sm">
                              <option>10</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">1-5 of 13</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Manage Evaluation Tab Content */}
                  <TabsContent value="manage-evaluation" className="p-6 space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium" style={{ color: "#8c57ff" }}>
                        Create Signature Authorities
                      </h3>
                      <Button className="text-white" style={{ backgroundColor: "#8c57ff" }}>
                        + Add Grading Parameter
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="evaluation-title" className="text-sm flex items-center">
                          Evaluation Title <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input id="evaluation-title" placeholder="Enter Input" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4" style={{ color: "#8c57ff" }}>
                        Evaluation List
                      </h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4" style={{ backgroundColor: "#f9fafb" }}>
                          <h4 className="font-medium mb-3">Filters</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Name</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select Designation</option>
                            </select>
                            <select className="w-full p-2 border rounded-md bg-white">
                              <option>Select File Type</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-4 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            style={{ color: "#10b981", borderColor: "#10b981" }}
                            className="text-sm"
                          >
                            📊 Excel
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                            className="text-sm"
                          >
                            📧 Email
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#f59e0b", borderColor: "#f59e0b" }}
                            className="text-sm"
                          >
                            🖨️ Print
                          </Button>
                          <Button
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                            className="text-sm"
                          >
                            📄 Pdf
                          </Button>
                          <div className="flex-1 flex justify-end">
                            <Input placeholder="Search" className="max-w-xs" />
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr style={{ backgroundColor: "#f9fafb" }} className="text-left">
                                <th className="p-3 font-medium text-sm">#</th>
                                <th className="p-3 font-medium text-sm">NAME</th>
                                <th className="p-3 font-medium text-sm">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t">
                                <td className="p-3 text-sm">1</td>
                                <td className="p-3 text-sm">Homework</td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">2</td>
                                <td className="p-3 text-sm">Classwork</td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">3</td>
                                <td className="p-3 text-sm">Online Exam</td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-3 text-sm">4</td>
                                <td className="p-3 text-sm">Project</td>
                                <td className="p-3">
                                  <select className="text-sm border rounded px-2 py-1">
                                    <option>Select</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="p-3 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Rows per page:</span>
                            <select className="border rounded p-1 text-sm">
                              <option>10</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">1-5 of 13</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </main>

        <footer
          className="py-3 px-6 text-sm flex flex-wrap justify-between items-center gap-2"
          style={{ borderTop: "1px solid #ebebeb", color: "#8a8d93" }}
        >
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#8c57ff]">
              License
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              More Themes
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              Documentation
            </a>
            <a href="#" className="hover:text-[#8c57ff]">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
