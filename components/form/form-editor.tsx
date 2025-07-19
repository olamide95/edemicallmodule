"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  PlusCircle,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Settings,
  Layers,
  PanelLeft,
  Type,
  AlignLeft,
  Calendar,
  List,
  Check,
  FileText,
  Hash,
  Mail,
  Phone,
} from "lucide-react"

// Field type options with icons
const fieldTypes = [
  { value: "text", label: "Text Field", icon: Type },
  { value: "textarea", label: "Text Area", icon: AlignLeft },
  { value: "number", label: "Number", icon: Hash },
  { value: "email", label: "Email", icon: Mail },
  { value: "tel", label: "Phone", icon: Phone },
  { value: "date", label: "Date", icon: Calendar },
  { value: "select", label: "Dropdown", icon: List },
  { value: "checkbox", label: "Checkbox", icon: Check },
  { value: "file", label: "File Upload", icon: FileText },
]

export function FormEditor({
  template,
  fields,
  sections,
  onUpdateForm,
  formTitle,
  formDescription,
  setFormTitle,
  setFormDescription,
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "")
  const [activeTab, setActiveTab] = useState("fields")
  const [selectedField, setSelectedField] = useState(null)
  const [editingField, setEditingField] = useState({
    id: "",
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    helpText: "",
    options: [],
  })

  useEffect(() => {
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id)
    }
  }, [sections, activeSection])

  const handleAddField = (type) => {
    if (!activeSection) return

    const newField = {
      id: `field_${Date.now()}`,
      type: type,
      label: `New ${fieldTypes.find((f) => f.value === type)?.label || "Field"}`,
      placeholder: "",
      required: false,
      helpText: "",
      sectionId: activeSection,
      options:
        type === "select"
          ? [
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ]
          : [],
    }

    const updatedFields = [...fields, newField]
    onUpdateForm(updatedFields, sections)
    setSelectedField(newField.id)
  }

  const handleDeleteField = (fieldId) => {
    const updatedFields = fields.filter((field) => field.id !== fieldId)
    onUpdateForm(updatedFields, sections)

    if (selectedField === fieldId) {
      setSelectedField(null)
    }
  }

  const handleFieldSelect = (fieldId) => {
    setSelectedField(fieldId)
    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      setEditingField({
        ...field,
        options: field.options || [],
      })
    }
  }

  const handleFieldUpdate = () => {
    if (!selectedField) return

    const updatedFields = fields.map((field) => (field.id === selectedField ? { ...field, ...editingField } : field))

    onUpdateForm(updatedFields, sections)
  }

  const handleAddOption = () => {
    const updatedOptions = [
      ...editingField.options,
      { value: `option${editingField.options.length + 1}`, label: `Option ${editingField.options.length + 1}` },
    ]

    setEditingField({
      ...editingField,
      options: updatedOptions,
    })

    setTimeout(handleFieldUpdate, 0)
  }

  const handleUpdateOption = (index, field, value) => {
    const updatedOptions = [...editingField.options]
    updatedOptions[index] = { ...updatedOptions[index], [field]: value }

    setEditingField({
      ...editingField,
      options: updatedOptions,
    })

    setTimeout(handleFieldUpdate, 0)
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = [...editingField.options]
    updatedOptions.splice(index, 1)

    setEditingField({
      ...editingField,
      options: updatedOptions,
    })

    setTimeout(handleFieldUpdate, 0)
  }

  const handleMoveField = (fieldId, direction) => {
    const sectionFields = fields.filter((field) => field.sectionId === activeSection)
    const fieldIndex = sectionFields.findIndex((field) => field.id === fieldId)

    if (fieldIndex === -1) return
    if (direction === "up" && fieldIndex === 0) return
    if (direction === "down" && fieldIndex === sectionFields.length - 1) return

    const newIndex = direction === "up" ? fieldIndex - 1 : fieldIndex + 1
    const updatedSectionFields = [...sectionFields]
    const temp = updatedSectionFields[fieldIndex]
    updatedSectionFields[fieldIndex] = updatedSectionFields[newIndex]
    updatedSectionFields[newIndex] = temp

    const otherFields = fields.filter((field) => field.sectionId !== activeSection)
    onUpdateForm([...otherFields, ...updatedSectionFields], sections)
  }

  const handleDuplicateField = (fieldId) => {
    const fieldToDuplicate = fields.find((field) => field.id === fieldId)
    if (!fieldToDuplicate) return

    const newField = {
      ...fieldToDuplicate,
      id: `field_${Date.now()}`,
      label: `${fieldToDuplicate.label} (Copy)`,
    }

    const updatedFields = [...fields, newField]
    onUpdateForm(updatedFields, sections)
  }

  const handleAddSection = () => {
    const newSection = {
      id: `section_${Date.now()}`,
      title: "New Section",
      description: "Section description",
    }

    const updatedSections = [...sections, newSection]
    onUpdateForm(fields, updatedSections)
    setActiveSection(newSection.id)
  }

  const handleUpdateSection = (sectionId, updates) => {
    const updatedSections = sections.map((section) => (section.id === sectionId ? { ...section, ...updates } : section))

    onUpdateForm(fields, updatedSections)
  }

  const handleDeleteSection = (sectionId) => {
    // Don't delete if it's the only section
    if (sections.length <= 1) return

    const updatedSections = sections.filter((section) => section.id !== sectionId)
    const updatedFields = fields.filter((field) => field.sectionId !== sectionId)

    onUpdateForm(updatedFields, updatedSections)

    if (activeSection === sectionId) {
      setActiveSection(updatedSections[0]?.id || "")
    }
  }

  const renderFieldPreview = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return <Input type={field.type} placeholder={field.placeholder || `Enter ${field.label}`} disabled />
      case "textarea":
        return <Textarea placeholder={field.placeholder || `Enter ${field.label}`} disabled />
      case "date":
        return <Input type="date" disabled />
      case "select":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
          </Select>
        )
      case "checkbox":
        return <Checkbox disabled />
      case "file":
        return <Input type="file" disabled />
      default:
        return <div>Unknown field type</div>
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left sidebar - Sections */}
      <div className="col-span-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Form Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={`mb-2 rounded-md border p-3 cursor-pointer ${activeSection === section.id ? "bg-secondary" : ""}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{section.title}</div>
                      <Badge variant="outline">
                        {fields.filter((field) => field.sectionId === section.id).length} fields
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{section.description}</div>

                    {activeSection === section.id && (
                      <div className="flex items-center space-x-2 mt-2 pt-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            const title = prompt("Section title:", section.title)
                            const description = prompt("Section description:", section.description)
                            if (title) {
                              handleUpdateSection(section.id, {
                                title,
                                description: description || section.description,
                              })
                            }
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm("Are you sure you want to delete this section?")) {
                              handleDeleteSection(section.id)
                            }
                          }}
                          disabled={sections.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>

              <Button onClick={handleAddSection} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle - Fields */}
      <div className="col-span-5">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {sections.find((s) => s.id === activeSection)?.title || "Form Fields"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fields" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="fields">
                  <Layers className="mr-2 h-4 w-4" />
                  Fields
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Form Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fields" className="space-y-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {fieldTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => handleAddField(type.value)}
                    >
                      <type.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs">{type.label}</span>
                    </Button>
                  ))}
                </div>

                <ScrollArea className="h-[calc(100vh-450px)]">
                  <div className="space-y-2">
                    {fields
                      .filter((field) => field.sectionId === activeSection)
                      .map((field) => (
                        <div
                          key={field.id}
                          className={`rounded-md border p-3 cursor-pointer ${selectedField === field.id ? "border-primary" : ""}`}
                          onClick={() => handleFieldSelect(field.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{field.label}</div>
                            <Badge variant="outline">{field.type}</Badge>
                          </div>

                          <div className="mt-2">{renderFieldPreview(field)}</div>

                          <div className="flex items-center space-x-1 mt-2 pt-2 border-t">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveField(field.id, "up")
                              }}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveField(field.id, "down")
                              }}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDuplicateField(field.id)
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (confirm("Are you sure you want to delete this field?")) {
                                  handleDeleteField(field.id)
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                    {fields.filter((field) => field.sectionId === activeSection).length === 0 && (
                      <div className="text-center p-8 border border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          No fields added yet. Select a field type above to add one.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="formTitle">Form Title</Label>
                    <Input id="formTitle" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formDescription">Form Description</Label>
                    <Textarea
                      id="formDescription"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                    />
                  </div>

                  {activeSection && (
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Section Settings</h3>

                      <div className="space-y-2">
                        <Label htmlFor="sectionTitle">Section Title</Label>
                        <Input
                          id="sectionTitle"
                          value={sections.find((s) => s.id === activeSection)?.title || ""}
                          onChange={(e) => handleUpdateSection(activeSection, { title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sectionDescription">Section Description</Label>
                        <Textarea
                          id="sectionDescription"
                          value={sections.find((s) => s.id === activeSection)?.description || ""}
                          onChange={(e) => handleUpdateSection(activeSection, { description: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right sidebar - Properties */}
      <div className="col-span-4">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Field Properties</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedField ? (
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fieldLabel">Label</Label>
                    <Input
                      id="fieldLabel"
                      value={editingField.label}
                      onChange={(e) => {
                        setEditingField({ ...editingField, label: e.target.value })
                        setTimeout(handleFieldUpdate, 0)
                      }}
                    />
                  </div>

                  {(editingField.type === "text" ||
                    editingField.type === "email" ||
                    editingField.type === "tel" ||
                    editingField.type === "number" ||
                    editingField.type === "textarea" ||
                    editingField.type === "select") && (
                    <div className="space-y-2">
                      <Label htmlFor="fieldPlaceholder">Placeholder</Label>
                      <Input
                        id="fieldPlaceholder"
                        value={editingField.placeholder || ""}
                        onChange={(e) => {
                          setEditingField({ ...editingField, placeholder: e.target.value })
                          setTimeout(handleFieldUpdate, 0)
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fieldHelpText">Help Text</Label>
                    <Input
                      id="fieldHelpText"
                      value={editingField.helpText || ""}
                      onChange={(e) => {
                        setEditingField({ ...editingField, helpText: e.target.value })
                        setTimeout(handleFieldUpdate, 0)
                      }}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fieldRequired"
                      checked={editingField.required}
                      onCheckedChange={(checked) => {
                        setEditingField({ ...editingField, required: !!checked })
                        setTimeout(handleFieldUpdate, 0)
                      }}
                    />
                    <Label htmlFor="fieldRequired">Required field</Label>
                  </div>

                  {editingField.type === "select" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Options</Label>
                        <Button variant="outline" size="sm" onClick={handleAddOption}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {editingField.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              placeholder="Label"
                              value={option.label}
                              onChange={(e) => handleUpdateOption(index, "label", e.target.value)}
                            />
                            <Input
                              placeholder="Value"
                              value={option.value}
                              onChange={(e) => handleUpdateOption(index, "value", e.target.value)}
                            />
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced">
                      <AccordionTrigger>Advanced Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="fieldId">Field ID</Label>
                            <Input id="fieldId" value={editingField.id} disabled />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fieldType">Field Type</Label>
                            <Select
                              value={editingField.type}
                              onValueChange={(value) => {
                                setEditingField({
                                  ...editingField,
                                  type: value,
                                  options:
                                    value === "select"
                                      ? editingField.options?.length
                                        ? editingField.options
                                        : [
                                            { value: "option1", label: "Option 1" },
                                            { value: "option2", label: "Option 2" },
                                          ]
                                      : [],
                                })
                                setTimeout(handleFieldUpdate, 0)
                              }}
                            >
                              <SelectTrigger id="fieldType">
                                <SelectValue placeholder="Select field type" />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-350px)]">
                <PanelLeft className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">Select a field to edit its properties</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
