"use client"
import { SetStateAction, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormTemplates } from "@/components/form/form-templates"
import { FormEditor } from "@/components/form/form-editor"
import { FormPreview } from "@/components/form/form-preview"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, FileText, Eye } from "lucide-react"
// Import Edemic FormBuilder components
import { FormBuilder as EdemicFormBuilder, DocTypeProvider } from "edemicformbuilder"

export function FormBuilder() {
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [formFields, setFormFields] = useState([])
  const [formSections, setFormSections] = useState([])
  const [formTitle, setFormTitle] = useState("Admission Form")
  const [formDescription, setFormDescription] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [useEdemicBuilder, setUseEdemicBuilder] = useState(false)

  const handleTemplateSelect = (template: SetStateAction<null>) => {
    if (template.id === "blank") {
      // Special case for blank form using Edemic builder
      setUseEdemicBuilder(true)
      setSelectedTemplate({
        id: "blank",
        name: "Blank Form",
        description: "Custom form using Edemic FormBuilder"
      })
      setActiveTab("editor")
      return
    }

    setUseEdemicBuilder(false)
    setSelectedTemplate(template)
    setFormTitle(template?.name || "Admission Form")
    setFormDescription(template?.description || "")

    setFormFields(
      template.sections?.flatMap(
        (section) => section.fields?.map((field) => ({ ...field, sectionId: section.id })) || [],
      ) || [],
    )
    setFormSections(template.sections || [])
    setActiveTab("editor")
  }

  const handleUpdateForm = (fields, sections) => {
    setFormFields(fields)
    setFormSections(sections)
  }

  const handleSaveForm = () => {
    setIsSaving(true)
    // Here you would save either the regular form or the Edemic form data
    console.log("Saving form:", {
      title: formTitle,
      description: formDescription,
      fields: formFields,
      sections: formSections,
      isEdemic: useEdemicBuilder
    })
    
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  // Handler for Edemic form changes
  const handleEdemicFormChange = (schema) => {
    // Convert Edemic schema to your form format if needed
    setFormFields(schema.fields || [])
    setFormSections(schema.sections || [])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admission Form</h1>
          <p className="text-muted-foreground">
            Create and customize your admission form using templates or build from scratch.
          </p>
        </div>
        <Button onClick={handleSaveForm} disabled={isSaving || !selectedTemplate}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Form"}
        </Button>
      </div>

      <Card>
        <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-4 bg-card border-b rounded-none">
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              disabled={!selectedTemplate}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              Form Editor
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              disabled={!selectedTemplate}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="p-6 m-0">
            <FormTemplates 
              onSelectTemplate={handleTemplateSelect}
              // Add a blank form option to your templates
              templates={[
                {
                  id: "blank",
                  name: "Blank Form (Edemic)",
                  description: "Start with a completely blank form using Edemic FormBuilder"
                },
                              ]}
            />
          </TabsContent>

          <TabsContent value="editor" className="p-6 m-0">
            {selectedTemplate && (
              <>
                {useEdemicBuilder ? (
                  <DocTypeProvider>
                    <EdemicFormBuilder
                      initialSchema={{
                        title: formTitle,
                        description: formDescription,
                        fields: formFields,
                        sections: formSections
                      }}
                      onChange={handleEdemicFormChange}
                      onSave={(schema: any) => {
                        handleEdemicFormChange(schema)
                        handleSaveForm()
                      }}
                    />
                  </DocTypeProvider>
                ) : (
                  <FormEditor
                    template={selectedTemplate}
                    fields={formFields}
                    sections={formSections}
                    onUpdateForm={handleUpdateForm}
                    formTitle={formTitle}
                    formDescription={formDescription}
                    setFormTitle={setFormTitle}
                    setFormDescription={setFormDescription}
                  />
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="preview" className="p-6 m-0">
            {selectedTemplate && (
              <FormPreview
                fields={formFields}
                sections={formSections}
                formTitle={formTitle}
                formDescription={formDescription}
              />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}