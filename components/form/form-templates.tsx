"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, FileText, Plus } from "lucide-react"

// Sample template data
const templates = [
  {
    id: 1,
    name: "Standard Admission Form",
    description: "A comprehensive form with all standard fields for school admission.",
    fields: 24,
    popular: true,
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        description: "Basic details about the student",
        fields: [
          {
            id: "firstName",
            type: "text",
            label: "First Name",
            placeholder: "Enter first name",
            required: true,
          },
          {
            id: "lastName",
            type: "text",
            label: "Last Name",
            placeholder: "Enter last name",
            required: true,
          },
          {
            id: "dob",
            type: "date",
            label: "Date of Birth",
            required: true,
          },
          {
            id: "gender",
            type: "select",
            label: "Gender",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ],
            required: true,
          },
          {
            id: "nationality",
            type: "text",
            label: "Nationality",
            required: true,
          },
        ],
      },
      {
        id: "contact",
        title: "Contact Information",
        description: "Address and contact details",
        fields: [
          {
            id: "address",
            type: "textarea",
            label: "Address",
            placeholder: "Enter full address",
            required: true,
          },
          {
            id: "city",
            type: "text",
            label: "City",
            required: true,
          },
          {
            id: "state",
            type: "text",
            label: "State/Province",
            required: true,
          },
          {
            id: "zipCode",
            type: "text",
            label: "Zip/Postal Code",
            required: true,
          },
          {
            id: "phone",
            type: "tel",
            label: "Phone Number",
            required: true,
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
          },
        ],
      },
      {
        id: "parent",
        title: "Parent/Guardian Information",
        description: "Details about parents or guardians",
        fields: [
          {
            id: "parentName1",
            type: "text",
            label: "Parent/Guardian 1 Name",
            required: true,
          },
          {
            id: "relationship1",
            type: "select",
            label: "Relationship",
            options: [
              { value: "father", label: "Father" },
              { value: "mother", label: "Mother" },
              { value: "guardian", label: "Legal Guardian" },
              { value: "other", label: "Other" },
            ],
            required: true,
          },
          {
            id: "parentPhone1",
            type: "tel",
            label: "Phone Number",
            required: true,
          },
          {
            id: "parentEmail1",
            type: "email",
            label: "Email Address",
            required: true,
          },
          {
            id: "parentName2",
            type: "text",
            label: "Parent/Guardian 2 Name",
            required: false,
          },
          {
            id: "relationship2",
            type: "select",
            label: "Relationship",
            options: [
              { value: "father", label: "Father" },
              { value: "mother", label: "Mother" },
              { value: "guardian", label: "Legal Guardian" },
              { value: "other", label: "Other" },
            ],
            required: false,
          },
          {
            id: "parentPhone2",
            type: "tel",
            label: "Phone Number",
            required: false,
          },
          {
            id: "parentEmail2",
            type: "email",
            label: "Email Address",
            required: false,
          },
        ],
      },
      {
        id: "education",
        title: "Educational Background",
        description: "Previous schools and academic history",
        fields: [
          {
            id: "previousSchool",
            type: "text",
            label: "Previous School (if any)",
            required: false,
          },
          {
            id: "grade",
            type: "select",
            label: "Last Grade Completed",
            options: [
              { value: "none", label: "None" },
              { value: "preschool", label: "Preschool" },
              { value: "kindergarten", label: "Kindergarten" },
              { value: "grade1", label: "Grade 1" },
              { value: "grade2", label: "Grade 2" },
              { value: "grade3", label: "Grade 3" },
              { value: "grade4", label: "Grade 4" },
              { value: "grade5", label: "Grade 5" },
            ],
            required: true,
          },
          {
            id: "applyingFor",
            type: "select",
            label: "Applying For",
            options: [
              { value: "toddlers", label: "Toddlers" },
              { value: "nursery1", label: "Nursery 1" },
              { value: "nursery2", label: "Nursery 2" },
              { value: "grade1", label: "Grade 1" },
              { value: "grade2", label: "Grade 2" },
              { value: "grade3", label: "Grade 3" },
              { value: "grade4", label: "Grade 4" },
              { value: "grade5", label: "Grade 5" },
              { value: "grade6", label: "Grade 6" },
            ],
            required: true,
          },
        ],
      },
      {
        id: "additional",
        title: "Additional Information",
        description: "Other relevant details and documents",
        fields: [
          {
            id: "medicalConditions",
            type: "textarea",
            label: "Medical Conditions (if any)",
            required: false,
          },
          {
            id: "specialNeeds",
            type: "textarea",
            label: "Special Educational Needs (if any)",
            required: false,
          },
          {
            id: "emergencyContact",
            type: "text",
            label: "Emergency Contact Name",
            required: true,
          },
          {
            id: "emergencyPhone",
            type: "tel",
            label: "Emergency Contact Phone",
            required: true,
          },
          {
            id: "birthCertificate",
            type: "file",
            label: "Birth Certificate",
            required: true,
          },
          {
            id: "passportPhoto",
            type: "file",
            label: "Passport Photo",
            required: true,
          },
          {
            id: "previousReports",
            type: "file",
            label: "Previous School Reports (if any)",
            required: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "International Student Form",
    description: "Specialized form for international student applications with visa information.",
    fields: 32,
    popular: false,
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        description: "Basic details about the student",
        fields: [
          {
            id: "firstName",
            type: "text",
            label: "First Name",
            placeholder: "Enter first name",
            required: true,
          },
          {
            id: "lastName",
            type: "text",
            label: "Last Name",
            placeholder: "Enter last name",
            required: true,
          },
          {
            id: "dob",
            type: "date",
            label: "Date of Birth",
            required: true,
          },
          {
            id: "gender",
            type: "select",
            label: "Gender",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ],
            required: true,
          },
          {
            id: "nationality",
            type: "text",
            label: "Nationality",
            required: true,
          },
          {
            id: "passportNumber",
            type: "text",
            label: "Passport Number",
            required: true,
          },
          {
            id: "passportExpiry",
            type: "date",
            label: "Passport Expiry Date",
            required: true,
          },
        ],
      },
      // Additional sections would be defined here
    ],
  },
  {
    id: 3,
    name: "Scholarship Application",
    description: "Form for students applying for scholarships with financial information sections.",
    fields: 28,
    popular: false,
    sections: [
      // Sections would be defined here
    ],
  },
  {
    id: 4,
    name: "Minimal Form",
    description: "A simplified form with only essential fields for quick applications.",
    fields: 12,
    popular: false,
    sections: [
      // Sections would be defined here
    ],
  },
  {
    id: 5,
    name: "Special Needs Form",
    description: "Specialized form with additional fields for students with special educational needs.",
    fields: 36,
    popular: false,
    sections: [
      // Sections would be defined here
    ],
  },
]

export function FormTemplates({ onSelectTemplate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Choose a Template</h2>
        <Button
          variant="outline"
          onClick={() =>
            onSelectTemplate({
              id: "blank",
              name: "Blank Form",
              description: "Start with a blank form",
              sections: [
                {
                  id: "section_1",
                  title: "New Section",
                  description: "Section description",
                  fields: [],
                },
              ],
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Blank Form
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription className="mt-1">{template.description}</CardDescription>
                </div>
                {template.popular && <Badge className="bg-primary-light text-primary">Popular</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <FileText className="mr-1 h-4 w-4" />
                  <span>{template.fields} Fields</span>
                </div>
                <div>{template.sections?.length || 0} Sections</div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" onClick={() => onSelectTemplate(template)}>
                <Check className="mr-2 h-4 w-4" />
                Use This Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
