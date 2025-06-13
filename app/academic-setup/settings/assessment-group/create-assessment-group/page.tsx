import { AppLayout } from "@/components/layout/app-layout"
import { PageHeader } from "@/components/header/page-header"
import { Sidebar } from "@/components/navigation/sidebar"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function CreateAssessmentGroupPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Academic Configuration"
        description="Setup your Company, Branches, Department, Employee Details, Leave, Attendance and Expense Claims"
        breadcrumbs={[
          { label: "Apps", href: "/apps" },
          { label: "Academics", href: "/academics" },
          { label: "Academic Settings and configuration", href: "/academics/settings" },
          { label: "Academic configuration", href: "/academics/settings/configuration" },
        ]}
      />

      <div className="mx-auto flex max-w-7xl">
        <Sidebar activeItem="assessment-group" />

        <div className="flex-1 px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium">Assessment Group</h2>
              <StatusBadge status="not-saved" />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Save</Button>
          </div>

          <div className="mb-6 border-b">
            <div className="flex">
              <div className="inline-flex px-4 py-2 text-sm font-medium text-purple-600 border-b-2 border-purple-600">
                Assessment Group Settings
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-6 text-base font-medium text-purple-600">Create Assessment Group</h3>

            <div className="flex justify-end gap-2 mb-6">
              <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600">
                Create Manually
              </Button>
              <Button variant="outline" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                Auto Generate
              </Button>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Grading Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Input"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="mb-6 flex gap-8">
              <div className="flex items-center gap-2">
                <input
                  id="academic"
                  name="group-type"
                  type="radio"
                  checked
                  className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <label htmlFor="academic" className="text-sm text-gray-700">
                  Academic
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="non-academic"
                  name="group-type"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <label htmlFor="non-academic" className="text-sm text-gray-700">
                  Non Academic
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Class <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Select</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Section <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Select</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Grading Scale <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Select</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Section <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option>Select</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="h-4 w-4" /> Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
