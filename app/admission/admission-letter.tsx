"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DigitalSignature } from "./digital-signature"
import {
  Download,
  PrinterIcon as Print,
  School,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react"

interface AdmissionLetterProps {
  studentName?: string
  parentName?: string
  className?: string
  admissionDate?: string
  sessionYear?: string
  studentId?: string
  applicationId?: string
  admissionFee?: string
  totalFees?: string
  showSignature?: boolean
}

export function AdmissionLetter({
  studentName = "Sarah Elizabeth Johnson",
  parentName = "Mr. & Mrs. Michael Johnson",
  className = "Grade 5 - Advanced Track",
  admissionDate = "September 1, 2024",
  sessionYear = "2024-2025",
  studentId = "EXC2024001",
  applicationId = "APP2024-0156",
  admissionFee = "$2,500",
  totalFees = "$15,000",
  showSignature = true,
}: AdmissionLetterProps) {
  const handleDownload = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Admission Letter - ${studentName}</title>
            <style>
              body { font-family: 'Times New Roman', serif; margin: 0; padding: 20px; }
              .letterhead { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
              .school-name { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
              .tagline { font-size: 14px; color: #6b7280; font-style: italic; }
              .contact-info { font-size: 12px; color: #6b7280; margin-top: 10px; }
              .letter-content { line-height: 1.6; }
              .highlight-box { background: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px; margin: 20px 0; }
              .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
              .seal { width: 80px; height: 80px; border: 2px solid #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            </style>
          </head>
          <body>
            ${document.getElementById("admission-letter-content")?.innerHTML}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Digital Signature - Only show if showSignature is true */}
      {showSignature && (
        <DigitalSignature
          documentType="admission-letter"
          documentId={`ADM-${sessionYear.split("-")[0]}-${studentId}`}
          studentName={studentName}
          signedBy="Dr. Margaret Williams, Principal"
          signedDate={new Date().toLocaleDateString()}
          signatureHash="SHA256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
          isVerified={true}
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end print:hidden">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Print className="h-4 w-4 mr-2" />
          Print Letter
        </Button>
      </div>

      {/* Letter Content */}
      <Card className="print:shadow-none print:border-none overflow-hidden">
        <CardContent id="admission-letter-content" className="p-0">
          {/* Elegant Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <School className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-wide">EXCELLENCE ACADEMY</h1>
                  <p className="text-blue-100 text-lg font-medium">Nurturing Tomorrow's Leaders Since 1985</p>
                </div>
              </div>

              <div className="flex justify-center gap-8 text-sm text-blue-100 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Education Boulevard, Learning City, LC 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>admissions@excellenceacademy.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>www.excellenceacademy.edu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Letter Title Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-full border-2 border-green-200 dark:border-green-800">
                <Award className="h-6 w-6 text-green-600" />
                <span className="text-2xl font-bold text-green-800 dark:text-green-400">OFFICIAL ADMISSION LETTER</span>
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline" className="px-3 py-1">
                  Academic Session {sessionYear}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Application ID: {applicationId}
                </Badge>
              </div>
            </div>

            {/* Date and Reference */}
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Letter Date:</p>
                <p className="font-semibold">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground">Reference Number:</p>
                <p className="font-semibold">
                  ADM-{sessionYear.split("-")[0]}-{studentId}
                </p>
              </div>
            </div>

            {/* Addressee */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-primary">Dear {parentName},</p>
            </div>

            {/* Main Letter Content */}
            <div className="space-y-6 text-base leading-relaxed">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                      🎉 CONGRATULATIONS! ADMISSION GRANTED 🎉
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      We are absolutely delighted to inform you that <strong>{studentName}</strong> has been
                      <strong> SUCCESSFULLY ADMITTED</strong> to <strong>{className}</strong> at Excellence Academy for
                      the <strong>{sessionYear}</strong> academic session.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                After a comprehensive and rigorous evaluation process, including academic assessment, aptitude testing,
                and personal interviews, our admissions committee was thoroughly impressed by {studentName}'s
                exceptional potential, academic readiness, and character. Your child has demonstrated the qualities we
                value most: intellectual curiosity, creativity, leadership potential, and a genuine passion for
                learning.
              </p>

              <p>
                Excellence Academy has maintained its position as the region's premier educational institution for over
                three decades, with a proven track record of nurturing students who go on to excel in top universities
                and become leaders in their chosen fields. We are confident that {studentName} will thrive in our
                academically challenging yet supportive environment.
              </p>

              {/* Detailed Admission Information */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Admission Details & Student Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Student Name:</span>
                      <span className="text-right">{studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Student ID:</span>
                      <span className="text-right font-mono">{studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Admitted to Class:</span>
                      <span className="text-right font-semibold text-blue-600">{className}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Academic Session:</span>
                      <span className="text-right">{sessionYear}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Campus:</span>
                      <span className="text-right">Main Campus</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">House Assignment:</span>
                      <span className="text-right">Phoenix House</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Class Teacher:</span>
                      <span className="text-right">Ms. Jennifer Adams</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">First Day of School:</span>
                      <span className="text-right font-semibold text-green-600">{admissionDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">
                  💰 Financial Information & Payment Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Admission Fee:</span>
                      <span className="text-right font-bold text-green-600">{admissionFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Annual Tuition:</span>
                      <span className="text-right">{totalFees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Deadline:</span>
                      <span className="text-right font-semibold text-red-600">August 15, 2024</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Payment Options Available:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Full payment (5% discount)</li>
                      <li>Two installments (September & January)</li>
                      <li>Monthly payment plan (10 months)</li>
                      <li>Sibling discount: 10% for second child</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Next Steps */}
              <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-400 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Essential Next Steps & Important Deadlines
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                        Immediate Actions Required:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>
                          Complete admission fee payment by <strong>August 15, 2024</strong>
                        </li>
                        <li>Submit medical examination report (Form attached)</li>
                        <li>Provide updated immunization records</li>
                        <li>Complete emergency contact information form</li>
                        <li>Submit passport-size photographs (4 copies)</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                        Upcoming Important Dates:
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>
                            <strong>Aug 20:</strong> New Parent Orientation (10:00 AM)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>
                            <strong>Aug 25:</strong> Uniform Fitting & Purchase
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>
                            <strong>Aug 28:</strong> School Tour & Meet the Teacher
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>
                            <strong>Sep 1:</strong> First Day of School (8:00 AM)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Excellence Highlights */}
              <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/20 dark:to-cyan-950/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Why Excellence Academy Stands Apart
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">98%</div>
                    <div className="text-indigo-700 dark:text-indigo-300">University Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">1:8</div>
                    <div className="text-indigo-700 dark:text-indigo-300">Teacher-Student Ratio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">50+</div>
                    <div className="text-indigo-700 dark:text-indigo-300">Extracurricular Activities</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li>• Advanced STEM & Robotics Programs</li>
                    <li>• International Baccalaureate (IB) Curriculum</li>
                    <li>• Award-winning Arts & Music Programs</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• State-of-the-art Science Laboratories</li>
                    <li>• Olympic-standard Sports Facilities</li>
                    <li>• Global Exchange Programs</li>
                  </ul>
                </div>
              </div>

              <p>
                We understand that choosing the right school for your child is one of the most important decisions you
                will make as parents. Rest assured that {studentName} will receive not just an excellent education, but
                also the guidance, support, and opportunities needed to discover and develop their unique talents and
                passions.
              </p>

              <p>
                Our dedicated team of educators, counselors, and support staff are committed to ensuring that every
                student reaches their full potential. We look forward to partnering with you in {studentName}'s
                educational journey and watching them flourish in our vibrant learning community.
              </p>

              <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800 dark:text-green-300">
                  <strong>Welcome to the Excellence Academy family!</strong> We are excited to begin this incredible
                  journey with {studentName} and look forward to celebrating many achievements together in the years
                  ahead.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Questions? We're Here to Help!
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Admissions Office:</strong>
                  </p>
                  <p>Ms. Sarah Mitchell, Director of Admissions</p>
                  <p>📧 s.mitchell@excellenceacademy.edu</p>
                  <p>📞 +1 (555) 123-4567 ext. 201</p>
                </div>
                <div>
                  <p>
                    <strong>Student Services:</strong>
                  </p>
                  <p>Mr. David Chen, Student Services Coordinator</p>
                  <p>📧 d.chen@excellenceacademy.edu</p>
                  <p>📞 +1 (555) 123-4567 ext. 305</p>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between items-end pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <p className="text-lg">Warmest congratulations and best wishes,</p>
                <div className="space-y-2">
                  <div className="w-48 border-b-2 border-gray-400"></div>
                  <div>
                    <p className="font-bold text-lg">Dr. Margaret Williams</p>
                    <p className="text-sm text-muted-foreground">Principal & Chief Executive</p>
                    <p className="text-sm text-muted-foreground">Excellence Academy</p>
                    <p className="text-xs text-muted-foreground">Ph.D. Educational Leadership, Harvard University</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center border-4 border-blue-300 dark:border-blue-600">
                  <School className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-semibold">OFFICIAL SEAL</p>
                <p className="text-xs text-muted-foreground">Excellence Academy</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-6 border-t space-y-2">
              <p className="font-semibold">
                This is an official admission letter from Excellence Academy. Please retain this document for your
                records.
              </p>
              <p>
                For verification of this admission letter, please contact our admissions office at +1 (555) 123-4567 or
                email verify@excellenceacademy.edu with reference number: ADM-{sessionYear.split("-")[0]}-{studentId}
              </p>
              <p className="text-xs">
                Excellence Academy is accredited by the International Schools Association and the National Education
                Board.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
