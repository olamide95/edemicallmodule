"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, RefreshCcw, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function FormPreview({ fields, sections, formTitle, formDescription }) {
  const [currentSection, setCurrentSection] = useState(sections[0]?.id || "")
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    })

    // Clear error when field is changed
    if (errors[fieldId]) {
      setErrors({
        ...errors,
        [fieldId]: null,
      })
    }
  }

  const handleNextSection = () => {
    // Validate current section fields before proceeding
    const currentSectionFields = fields.filter((field) => field.sectionId === currentSection)
    const newErrors = {}
    let hasErrors = false

    currentSectionFields.forEach((field) => {
      if (field.required && (!formData[field.id] || formData[field.id] === "")) {
        newErrors[field.id] = "This field is required"
        hasErrors = true
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Find next section
    const currentIndex = sections.findIndex((section) => section.id === currentSection)
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id)
      // Scroll to top when changing sections
      window.scrollTo(0, 0)
    }
  }

  const handlePreviousSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === currentSection)
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id)
      // Scroll to top when changing sections
      window.scrollTo(0, 0)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let hasErrors = false

    fields.forEach((field) => {
      if (field.required && (!formData[field.id] || formData[field.id] === "")) {
        newErrors[field.id] = "This field is required"
        hasErrors = true
      }
    })

    setErrors(newErrors)
    return !hasErrors
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmitting(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted with data:", formData)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({})
    setErrors({})
    setSubmitted(false)
    if (sections.length > 0) {
      setCurrentSection(sections[0].id)
    }
  }

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <div className="space-y-1">
            <Input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder || `Enter ${field.label}`}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={field.required}
              className={errors[field.id] ? "border-destructive" : ""}
            />
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "textarea":
        return (
          <div className="space-y-1">
            <Textarea
              id={field.id}
              placeholder={field.placeholder || `Enter ${field.label}`}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={field.required}
              className={errors[field.id] ? "border-destructive" : ""}
            />
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "date":
        return (
          <div className="space-y-1">
            <Input
              type="date"
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={field.required}
              className={errors[field.id] ? "border-destructive" : ""}
            />
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "select":
        return (
          <div className="space-y-1">
            <Select value={formData[field.id] || ""} onValueChange={(value) => handleInputChange(field.id, value)}>
              <SelectTrigger className={errors[field.id] ? "border-destructive" : ""}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {(field.options || []).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "checkbox":
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                checked={formData[field.id] || false}
                onCheckedChange={(checked) => handleInputChange(field.id, checked)}
                className={errors[field.id] ? "border-destructive" : ""}
              />
              <Label htmlFor={field.id} className="text-sm font-normal">
                {field.checkboxLabel || field.label}
              </Label>
            </div>
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-3">
            <RadioGroup value={formData[field.id] || ""} onValueChange={(value) => handleInputChange(field.id, value)}>
              <div className="space-y-2">
                {(field.options || []).map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                    <Label htmlFor={`${field.id}-${option.value}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      case "file":
        return (
          <div className="space-y-1">
            <Input
              type="file"
              id={field.id}
              onChange={(e) => handleInputChange(field.id, e.target.files[0])}
              required={field.required}
              className={errors[field.id] ? "border-destructive" : ""}
            />
            {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
            {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
          </div>
        )
      default:
        return <div>Unknown field type: {field.type}</div>
    }
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-success">Application Submitted</CardTitle>
          <CardDescription className="text-center">Thank you for submitting your admission application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success-light">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <Alert>
            <AlertTitle>Submission Successful</AlertTitle>
            <AlertDescription>
              Your application has been received. You will receive a confirmation email shortly with further
              instructions.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetForm} className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Start New Application
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{formTitle || "Admission Application Form"}</CardTitle>
          <CardDescription>{formDescription || "Fill out the form below to apply for admission"}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {sections.length > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {sections.find((section) => section.id === currentSection)?.title || "Form Section"}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-medium">
                    {sections.findIndex((section) => section.id === currentSection) + 1}/{sections.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {sections.find((section) => section.id === currentSection)?.description && (
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                {sections.find((section) => section.id === currentSection)?.description}
              </p>
            </div>
          )}

          <ScrollArea className="h-full max-h-[500px]">
            <div className="space-y-6">
              {fields
                .filter((field) => field.sectionId === currentSection)
                .map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className={errors[field.id] ? "text-destructive" : ""}>
                      {field.label}
                      {field.required && <span className="text-destructive"> *</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={sections.findIndex((section) => section.id === currentSection) === 0}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex items-center">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          <div>
            {sections.findIndex((section) => section.id === currentSection) < sections.length - 1 ? (
              <Button onClick={handleNextSection} className="flex items-center">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="flex items-center">
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
