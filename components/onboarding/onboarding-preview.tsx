"use client"

import Image from "next/image"
import { Building2, Network, School, Users, Layers, Bell, FileSpreadsheet } from "lucide-react"
import { OrganogramVisualization } from "@/components/onboarding/organogram-visualization"

interface OnboardingPreviewProps {
  currentStep: string | undefined
  schoolData: any
}

export function OnboardingPreview({ currentStep, schoolData }: OnboardingPreviewProps) {
  const renderPreview = () => {
    switch (currentStep) {
      case "school-details":
        return <SchoolDetailsPreview data={schoolData} />
      case "branches":
        return <BranchesPreview data={schoolData} />
      case "organogram":
        return <OrganogramPreview data={schoolData} />
      case "employees":
        return <EmployeesPreview data={schoolData} />
      case "classes":
        return <ClassesPreview data={schoolData} />
      case "subjects":
        return <SubjectsPreview data={schoolData} />
      case "students":
        return <StudentsPreview data={schoolData} />
      case "sessions":
        return <SessionsPreview data={schoolData} />
      case "notifications":
        return <NotificationsPreview data={schoolData} />
      default:
        return <DefaultPreview data={schoolData} />
    }
  }

  return <div className="space-y-4">{renderPreview()}</div>
}

function DefaultPreview({ data }: { data: any }) {
  return (
    <div className="p-6 text-center bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="flex justify-center mb-4">
        {data.logo ? (
          <Image
            src={data.logo || "/placeholder.svg"}
            alt="School Logo"
            width={150}
            height={150}
            className="object-contain bg-transparent"
          />
        ) : (
          <Image
            src="/school-building-illustration.png"
            alt="School"
            width={150}
            height={150}
            className="bg-transparent"
          />
        )}
      </div>
      <h3 className="text-lg font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
        {data.name || "Your School"}
      </h3>
      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
        Complete the onboarding steps to see your school setup take shape
      </p>
    </div>
  )
}

function SchoolDetailsPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-light rounded-full p-3">
          <School className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">School Information</h3>
      </div>

      {data.logo && (
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 relative">
            <Image
              src={data.logo || "/placeholder.svg"}
              alt="School Logo"
              fill
              className="object-contain bg-transparent"
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">School Name</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{data.name || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Address</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{data.address || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Contact</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{data.email || "Not set"}</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{data.phone || "Not set"}</p>
        </div>
        <div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Academic Year</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
            {data.academicYear || "Not set"}
          </p>
        </div>
        <div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Country</p>
          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{data.country || "Not set"}</p>
        </div>
      </div>
    </div>
  )
}

function BranchesPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-light rounded-full p-3">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Branches</h3>
      </div>

      {data.branches && data.branches.length > 0 ? (
        <div className="space-y-4">
          {data.branches.map((branch: any, index: number) => (
            <div key={index} className="border border-divider rounded-md p-3 bg-light-card dark:bg-dark-card">
              <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {branch.name || `Branch ${index + 1}`}
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {branch.address || "No address"}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">Start Time</p>
                  <p className="text-light-text-primary dark:text-dark-text-primary">{branch.startTime || "Not set"}</p>
                </div>
                <div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">End Time</p>
                  <p className="text-light-text-primary dark:text-dark-text-primary">{branch.endTime || "Not set"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No branches added yet</p>
        </div>
      )}
    </div>
  )
}

function OrganogramPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="mb-6">
        <OrganogramVisualization departments={data.departments || []} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-light rounded-full p-3">
          <Network className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
          Organizational Structure
        </h3>
      </div>

      {data.departments && data.departments.length > 0 ? (
        <div className="space-y-4">
          {data.departments
            .filter((dept: any) => !dept.parentDepartment)
            .map((dept: any, index: number) => (
              <div key={index} className="border border-divider rounded-md p-3 bg-light-card dark:bg-dark-card">
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{dept.name}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {dept.isAcademic ? "Academic" : "Non-Academic"}
                </p>

                {data.departments
                  .filter((child: any) => child.parentDepartment === dept.id)
                  .map((child: any, childIndex: number) => (
                    <div key={childIndex} className="ml-4 mt-2 border-l-2 border-primary pl-2">
                      <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{child.name}</p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {child.isAcademic ? "Academic" : "Non-Academic"}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Image
            src="/organizational-chart.png"
            alt="Organogram"
            width={150}
            height={150}
            className="mx-auto mb-3 bg-transparent"
          />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No departments added yet</p>
        </div>
      )}
    </div>
  )
}

function EmployeesPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="mb-6">
        <OrganogramVisualization departments={data.departments || []} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-light rounded-full p-3">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Employees</h3>
      </div>

      {data.employees && data.employees.length > 0 ? (
        <div className="space-y-3">
          {data.employees.map((employee: any, index: number) => (
            <div key={index} className="flex items-center gap-3 border-b border-divider pb-2">
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">{employee.name ? employee.name.charAt(0) : "E"}</span>
              </div>
              <div>
                <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                  {employee.name || `Employee ${index + 1}`}
                </p>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  {employee.department || "No department"} • {employee.email || "No email"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Image
            src="/diverse-employee-team.png"
            alt="Employees"
            width={150}
            height={150}
            className="mx-auto mb-3 bg-transparent"
          />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No employees added yet</p>
        </div>
      )}
    </div>
  )
}

function ClassesPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary-light rounded-full p-3">
          <Layers className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Classes & Sections</h3>
      </div>

      {data.classes && data.classes.length > 0 ? (
        <div className="space-y-4">
          {data.classes.map((cls: any, index: number) => (
            <div key={index} className="border border-divider rounded-md p-3 bg-light-card dark:bg-dark-card">
              <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {cls.name || `Class ${index + 1}`}
              </p>

              {cls.sections && cls.sections.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {cls.sections.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex} className="bg-light-bg dark:bg-dark-bg p-2 rounded-md">
                      <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                        {section.name || `Section ${sectionIndex + 1}`}
                      </p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        Capacity: {section.capacity || "Not set"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                  No sections added
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No classes added yet</p>
        </div>
      )}
    </div>
  )
}

function SubjectsPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <h3 className="text-lg font-medium mb-4 text-light-text-primary dark:text-dark-text-primary">Subjects</h3>

      {data.subjects && data.subjects.length > 0 ? (
        <div className="space-y-2">
          {data.subjects.map((subject: any, index: number) => (
            <div key={index} className="border border-divider rounded-md p-2 bg-light-card dark:bg-dark-card">
              <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {subject.name || `Subject ${index + 1}`}
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {subject.code || "No code"} • {subject.class || "No class"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No subjects added yet</p>
        </div>
      )}
    </div>
  )
}

function StudentsPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <h3 className="text-lg font-medium mb-4 text-light-text-primary dark:text-dark-text-primary">
        Students & Parents
      </h3>

      {data.students && data.students.length > 0 ? (
        <div className="space-y-4">
          {data.students.map((student: any, index: number) => (
            <div key={index} className="border border-divider rounded-md p-3 bg-light-card dark:bg-dark-card">
              <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {student.name || `Student ${index + 1}`}
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {student.admissionNumber || "No ID"} • {student.class || "No class"}
              </p>

              {student.parents && student.parents.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-light-text-primary dark:text-dark-text-primary">Parents:</p>
                  {student.parents.map((parent: any, parentIndex: number) => (
                    <p key={parentIndex} className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {parent.name || `Parent ${parentIndex + 1}`} ({parent.type || "Guardian"})
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Image
            src="/students-parents-illustration.png"
            alt="Students"
            width={150}
            height={150}
            className="mx-auto mb-3 bg-transparent"
          />
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No students added yet</p>
        </div>
      )}
    </div>
  )
}

function SessionsPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <h3 className="text-lg font-medium mb-4 text-light-text-primary dark:text-dark-text-primary">Session Settings</h3>

      {data.sessions && data.sessions.length > 0 ? (
        <div className="space-y-3">
          {data.sessions.map((session: any, index: number) => (
            <div key={index} className="border border-divider rounded-md p-3 bg-light-card dark:bg-dark-card">
              <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {session.branch || `Branch ${index + 1}`}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Start Date</p>
                  <p className="text-light-text-primary dark:text-dark-text-primary">
                    {session.startDate || "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">End Date</p>
                  <p className="text-light-text-primary dark:text-dark-text-primary">{session.endDate || "Not set"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No sessions configured yet</p>
        </div>
      )}
    </div>
  )
}

function NotificationsPreview({ data }: { data: any }) {
  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg rounded-md border border-divider">
      <h3 className="text-lg font-medium mb-4 text-light-text-primary dark:text-dark-text-primary">
        Notification Settings
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-light-text-primary dark:text-dark-text-primary">Email Attendance Alerts</p>
          <div
            className={`w-4 h-4 rounded-full ${data.notifications?.emailAlerts ? "bg-success" : "bg-secondary-bg"}`}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-light-text-primary dark:text-dark-text-primary">Push Notifications</p>
          <div
            className={`w-4 h-4 rounded-full ${data.notifications?.pushNotifications ? "bg-success" : "bg-secondary-bg"}`}
          ></div>
        </div>
      </div>
    </div>
  )
}