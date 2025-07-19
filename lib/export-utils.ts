/**
 * Utility functions for exporting data to CSV format
 */

/**
 * Convert array of objects to CSV string
 * @param data Array of objects to convert
 * @param headers Optional custom headers mapping (key: column header)
 * @returns CSV formatted string
 */
export function convertToCSV(data: Record<string, any>[], headers?: Record<string, string>): string {
  if (data.length === 0) return ""

  // Use provided headers or extract from first object
  const headerMap: Record<string, string> =
    headers ||
    Object.keys(data[0]).reduce((acc, key) => {
      // Convert camelCase to Title Case
      const header = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
      return { ...acc, [key]: header }
    }, {} as Record<string, string>)

  const headerKeys = Object.keys(headerMap)
  const headerRow = headerKeys.map((key) => headerMap[key])

  // Create CSV rows
  const rows = data.map((item) =>
    headerKeys.map((key) => {
      const value = item[key]
      // Handle values with commas by wrapping in quotes
      if (value === null || value === undefined) return ""
      const cellValue = String(value).replace(/"/g, '""')
      return cellValue.includes(",") ? `"${cellValue}"` : cellValue
    }),
  )

  // Combine header and rows
  return [headerRow, ...rows].map((row) => row.join(",")).join("\n")
}

/**
 * Generate a downloadable CSV file from data
 * @param data Array of objects to convert
 * @param filename Name of the file to download
 * @param headers Optional custom headers mapping
 */
export function downloadCSV(data: Record<string, any>[], filename: string, headers?: Record<string, string>): void {
  // Convert data to CSV
  const csv = convertToCSV(data, headers)

  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

  // Create a download link
  const link = document.createElement("a")

  // Create a URL for the blob
  const url = URL.createObjectURL(blob)

  // Set link properties
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"

  // Add link to the document
  document.body.appendChild(link)

  // Click the link to trigger download
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format date object to YYYY-MM-DD string
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatDateForExport(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().split("T")[0]
}

/**
 * Prepare student data for export by formatting complex fields
 * @param students Array of student objects
 * @returns Processed student data ready for export
 */
export function prepareStudentDataForExport(students: Record<string, any>[]): Record<string, any>[] {
  return students.map((student) => {
    const exportData = { ...student }

    // Format dates
    if (exportData.admissionDate) {
      exportData.admissionDate = formatDateForExport(exportData.admissionDate)
    }
    if (exportData.birthdate) {
      exportData.birthdate = formatDateForExport(exportData.birthdate)
    }

    // Handle nested objects
    if (exportData.parents) {
      if (exportData.parents.father) {
        exportData.fatherName = exportData.parents.father.name
        exportData.fatherPhone = exportData.parents.father.phone
        exportData.fatherEmail = exportData.parents.father.email
        exportData.fatherOccupation = exportData.parents.father.occupation
      }

      if (exportData.parents.mother) {
        exportData.motherName = exportData.parents.mother.name
        exportData.motherPhone = exportData.parents.mother.phone
        exportData.motherEmail = exportData.parents.mother.email
        exportData.motherOccupation = exportData.parents.mother.occupation
      }

      if (exportData.parents.guardian) {
        exportData.guardianName = exportData.parents.guardian.name
        exportData.guardianPhone = exportData.parents.guardian.phone
        exportData.guardianEmail = exportData.parents.guardian.email
        exportData.guardianRelationship = exportData.parents.guardian.relationship
      }

      // Remove the nested object from export
      delete exportData.parents
    }

    // Handle emergency contact
    if (exportData.emergencyContact) {
      exportData.emergencyContactName = exportData.emergencyContact.name
      exportData.emergencyContactPhone = exportData.emergencyContact.phone
      exportData.emergencyContactRelationship = exportData.emergencyContact.relationship

      // Remove the nested object from export
      delete exportData.emergencyContact
    }

    // Remove avatar path since it's not useful in CSV
    delete exportData.avatar

    return exportData
  })
}

/**
 * Define default headers mapping for student export
 */
export const studentExportHeaders = {
  id: "Student ID",
  admissionNumber: "Admission Number",
  fullName: "Full Name",
  gender: "Gender",
  birthdate: "Date of Birth",
  age: "Age",
  yearOfAdmission: "Year of Admission",
  admissionDate: "Admission Date",
  class: "Class",
  section: "Section",
  specialNeeds: "Special Needs",
  address: "Address",
  bloodGroup: "Blood Group",
  medicalConditions: "Medical Conditions",
  allergies: "Allergies",
  fatherName: "Father's Name",
  fatherPhone: "Father's Phone",
  fatherEmail: "Father's Email",
  fatherOccupation: "Father's Occupation",
  motherName: "Mother's Name",
  motherPhone: "Mother's Phone",
  motherEmail: "Mother's Email",
  motherOccupation: "Mother's Occupation",
  guardianName: "Guardian's Name",
  guardianPhone: "Guardian's Phone",
  guardianEmail: "Guardian's Email",
  guardianRelationship: "Guardian's Relationship",
  emergencyContactName: "Emergency Contact Name",
  emergencyContactPhone: "Emergency Contact Phone",
  emergencyContactRelationship: "Emergency Contact Relationship",
  classCapacity: "Class Capacity",
  availableSlots: "Available Slots",
}
