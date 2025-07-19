"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicSettings } from "@/components/settings/basic-settings"
import { AgeCriteria } from "@/components/settings/age-criteria"
import { FeeConfiguration } from "@/components/settings/fee-configuration"
import { SchoolWorkflow } from "@/components/settings/school-workflow"

export function AdmissionSettings() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admission Settings</h1>
        <p className="text-muted-foreground">
          Configure admission parameters, age criteria, fees, and workflow settings.
        </p>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="age">Age Criteria</TabsTrigger>
          <TabsTrigger value="fee">Fee Configuration</TabsTrigger>
          <TabsTrigger value="workflow">School Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <BasicSettings />
        </TabsContent>

        <TabsContent value="age" className="space-y-4">
          <AgeCriteria />
        </TabsContent>

        <TabsContent value="fee" className="space-y-4">
          <FeeConfiguration />
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <SchoolWorkflow />
        </TabsContent>
      </Tabs>
    </div>
  )
}
