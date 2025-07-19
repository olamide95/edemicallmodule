"use server"
import { convertToCSV, prepareStudentDataForExport, studentExportHeaders } from "@/lib/export-utils"

// Mock email implementation - no actual email server needed
const mockTransporter = {
  sendMail: async (mailOptions: { from: string; to: string; subject: any; attachments: any[]; text?: string; html?: string }) => {
    console.log("MOCK EMAIL SENT:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
      attachments: mailOptions.attachments?.map((a) => a.filename) || [],
    })

    // Return a successful mock response
    return {
      messageId: `mock-${Date.now()}@school.edu`,
      accepted: mailOptions.to.split(", "),
    }
  },
}

/**
 * Send student data as CSV attachment via email
 */
export async function sendStudentDataEmail({
  recipients,
  subject,
  message,
  data,
  selectedFields,
  filename,
}: {
  recipients: string[]
  subject: string
  message: string
  data: Record<string, any>[]
  selectedFields: string[]
  filename: string
}) {
  try {
    // Validate inputs
    if (!recipients.length) {
      return { success: false, error: "No recipients specified" }
    }

    if (!data.length) {
      return { success: false, error: "No data to export" }
    }

    // Create a filtered version of the data based on selected fields
    const filteredData = data.map((student) => {
      const filtered: Record<string, any> = {}
      selectedFields.forEach((field) => {
        if (student[field] !== undefined) {
          filtered[field] = student[field]
        }
      })
      return filtered
    })

    // Create custom headers for selected fields
    const customHeaders: Record<string, string> = {}
    selectedFields.forEach((field) => {
      customHeaders[field] = studentExportHeaders[field as keyof typeof studentExportHeaders] || field
    })

    // Process the data for export
    const processedData = prepareStudentDataForExport(filteredData)

    // Convert to CSV
    const csvContent = convertToCSV(processedData, customHeaders)

    // Send email with CSV attachment using mock transporter
    const info = await mockTransporter.sendMail({
      from: "Admissions System <noreply@school.edu>",
      to: recipients.join(", "),
      subject: subject,
      text: message,
      html: message.replace(/\n/g, "<br>"),
      attachments: [
        {
          filename: `${filename}.csv`,
          content: csvContent,
          contentType: "text/csv",
        },
      ],
    })

    return {
      success: true,
      messageId: info.messageId,
      recipients: info.accepted,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Get list of administrator emails
 * In a real app, this would fetch from a database
 */
export async function getAdministratorEmails() {
  // Mock data - in a real app, this would come from a database
  return [
    { email: "principal@school.edu", name: "Principal" },
    { email: "vice.principal@school.edu", name: "Vice Principal" },
    { email: "admissions@school.edu", name: "Admissions Office" },
    { email: "registrar@school.edu", name: "Registrar" },
    { email: "academic.director@school.edu", name: "Academic Director" },
  ]
}
