"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DigitalSignature } from "./digital-signature"
import {
  Download,
  PrinterIcon as Print,
  School,
  User,
  BookOpen,
  Brain,
  Users,
  Heart,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  Activity,
  Lightbulb,
  Calculator,
  FileText,
  Microscope,
  Palette,
  Music,
  Trophy,
  Globe,
} from "lucide-react"

interface AssessmentReportProps {
  studentName?: string
  assessmentDate?: string
  assessorName?: string
  recommendedClass?: string
  parentName?: string
  studentAge?: string
  assessmentDuration?: string
  sessionYear?: string
  studentId?: string
  showSignature?: boolean
}

export function AssessmentReport({
  studentName = "Sarah Elizabeth Johnson",
  assessmentDate = "January 25, 2024",
  assessorName = "Dr. Emily Chen, Ph.D.",
  recommendedClass = "Grade 5 - Advanced Track",
  parentName = "Mr. & Mrs. Michael Johnson",
  studentAge = "10 years, 3 months",
  assessmentDuration = "3.5 hours",
  sessionYear = "2024-2025",
  studentId = "EXC2024001",
  showSignature = true,
}: AssessmentReportProps) {
  // Comprehensive assessment data with detailed breakdown
  const assessmentData = {
    cognitive: {
      score: 87,
      percentile: 92,
      areas: [
        {
          name: "Logical Reasoning",
          score: 89,
          percentile: 94,
          description: "Exceptional ability to analyze patterns and solve complex problems",
        },
        {
          name: "Abstract Thinking",
          score: 85,
          percentile: 88,
          description: "Strong conceptual understanding and creative problem-solving",
        },
        {
          name: "Working Memory",
          score: 88,
          percentile: 91,
          description: "Excellent capacity to hold and manipulate information mentally",
        },
        {
          name: "Processing Speed",
          score: 86,
          percentile: 89,
          description: "Above-average speed in completing cognitive tasks accurately",
        },
        {
          name: "Spatial Intelligence",
          score: 90,
          percentile: 95,
          description: "Outstanding visual-spatial reasoning and 3D thinking abilities",
        },
      ],
    },
    academic: {
      score: 84,
      percentile: 89,
      areas: [
        {
          name: "Mathematics",
          score: 88,
          percentile: 93,
          description: "Advanced mathematical reasoning, particularly in algebra and geometry",
        },
        {
          name: "Language Arts",
          score: 82,
          percentile: 86,
          description: "Strong writing skills with room for vocabulary expansion",
        },
        {
          name: "Science Reasoning",
          score: 86,
          percentile: 90,
          description: "Excellent scientific inquiry and hypothesis formation skills",
        },
        {
          name: "Reading Comprehension",
          score: 80,
          percentile: 84,
          description: "Good comprehension with potential for improvement in complex texts",
        },
        {
          name: "Critical Analysis",
          score: 85,
          percentile: 88,
          description: "Strong analytical thinking and evidence evaluation skills",
        },
      ],
    },
    social: {
      score: 91,
      percentile: 96,
      areas: [
        {
          name: "Communication Skills",
          score: 93,
          percentile: 97,
          description: "Exceptional verbal and non-verbal communication abilities",
        },
        {
          name: "Teamwork & Collaboration",
          score: 89,
          percentile: 94,
          description: "Natural ability to work effectively in group settings",
        },
        {
          name: "Leadership Potential",
          score: 90,
          percentile: 95,
          description: "Shows initiative and ability to guide peers positively",
        },
        {
          name: "Empathy & Understanding",
          score: 94,
          percentile: 98,
          description: "Outstanding emotional intelligence and social awareness",
        },
        {
          name: "Conflict Resolution",
          score: 88,
          percentile: 92,
          description: "Mature approach to resolving disagreements peacefully",
        },
      ],
    },
    emotional: {
      score: 89,
      percentile: 94,
      areas: [
        {
          name: "Self-Regulation",
          score: 87,
          percentile: 91,
          description: "Good emotional control with developing coping strategies",
        },
        {
          name: "Resilience & Adaptability",
          score: 91,
          percentile: 96,
          description: "Excellent ability to bounce back from challenges",
        },
        {
          name: "Self-Confidence",
          score: 89,
          percentile: 93,
          description: "Healthy self-esteem with realistic self-assessment",
        },
        {
          name: "Motivation & Drive",
          score: 90,
          percentile: 95,
          description: "Strong intrinsic motivation and goal-oriented behavior",
        },
        {
          name: "Stress Management",
          score: 86,
          percentile: 89,
          description: "Developing effective strategies for managing pressure",
        },
      ],
    },
    creative: {
      score: 85,
      percentile: 88,
      areas: [
        {
          name: "Creative Thinking",
          score: 88,
          percentile: 92,
          description: "Innovative approach to problem-solving and idea generation",
        },
        {
          name: "Artistic Expression",
          score: 83,
          percentile: 86,
          description: "Good artistic abilities with potential for development",
        },
        {
          name: "Musical Aptitude",
          score: 84,
          percentile: 87,
          description: "Shows rhythm and melody recognition skills",
        },
        {
          name: "Innovation & Originality",
          score: 87,
          percentile: 90,
          description: "Demonstrates original thinking and creative solutions",
        },
      ],
    },
    physical: {
      score: 82,
      percentile: 85,
      areas: [
        {
          name: "Fine Motor Skills",
          score: 84,
          percentile: 87,
          description: "Well-developed hand-eye coordination and dexterity",
        },
        {
          name: "Gross Motor Skills",
          score: 80,
          percentile: 83,
          description: "Age-appropriate physical development and coordination",
        },
        {
          name: "Physical Fitness",
          score: 82,
          percentile: 85,
          description: "Good overall fitness level with room for improvement",
        },
      ],
    },
  }

  const overallScore = Math.round(
    (assessmentData.cognitive.score +
      assessmentData.academic.score +
      assessmentData.social.score +
      assessmentData.emotional.score +
      assessmentData.creative.score +
      assessmentData.physical.score) /
      6,
  )

  const overallPercentile = Math.round(
    (assessmentData.cognitive.percentile +
      assessmentData.academic.percentile +
      assessmentData.social.percentile +
      assessmentData.emotional.percentile +
      assessmentData.creative.percentile +
      assessmentData.physical.percentile) /
      6,
  )

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-900/20"
    if (score >= 80) return "bg-blue-100 dark:bg-blue-900/20"
    if (score >= 70) return "bg-yellow-100 dark:bg-yellow-900/20"
    return "bg-red-100 dark:bg-red-900/20"
  }

  const getPerformanceLevel = (percentile: number) => {
    if (percentile >= 95) return { level: "Exceptional", color: "text-green-600", icon: Trophy }
    if (percentile >= 85) return { level: "Above Average", color: "text-blue-600", icon: Star }
    if (percentile >= 70) return { level: "Average", color: "text-yellow-600", icon: CheckCircle }
    return { level: "Below Average", color: "text-red-600", icon: AlertCircle }
  }

  const handleDownload = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Assessment Report - ${studentName}</title>
            <style>
              body { font-family: 'Times New Roman', serif; margin: 0; padding: 20px; }
              .report-header { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
              .school-name { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
              .report-title { font-size: 20px; color: #374151; margin-top: 10px; }
              .assessment-content { line-height: 1.6; }
              .score-section { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; margin: 15px 0; border-radius: 8px; }
              .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            ${document.getElementById("assessment-report-content")?.innerHTML}
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Digital Signature - Only show if showSignature is true */}
      {showSignature && (
        <DigitalSignature
          documentType="assessment-report"
          documentId={`ASS-${sessionYear.split("-")[0]}-${studentId}`}
          studentName={studentName}
          signedBy="Dr. Emily Chen, Educational Psychologist"
          signedDate={new Date().toLocaleDateString()}
          signatureHash="SHA256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1"
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
          Print Report
        </Button>
      </div>

      {/* Report Content */}
      <Card className="print:shadow-none print:border-none overflow-hidden">
        <CardContent id="assessment-report-content" className="p-0">
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-wide">EXCELLENCE ACADEMY</h1>
                  <p className="text-blue-100 text-lg font-medium">Educational Assessment & Evaluation Center</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                <h2 className="text-2xl font-bold">COMPREHENSIVE STUDENT ASSESSMENT REPORT</h2>
                <p className="text-blue-100">Detailed Educational & Psychological Evaluation</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Student Information Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 p-6 rounded-lg border">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{studentName}</h3>
                      <p className="text-muted-foreground">Student Assessment Profile</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Student Age:</p>
                      <p className="font-semibold">{studentAge}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assessment Date:</p>
                      <p className="font-semibold">{assessmentDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration:</p>
                      <p className="font-semibold">{assessmentDuration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Report ID:</p>
                      <p className="font-semibold font-mono">
                        ASS-{sessionYear.split("-")[0]}-{studentId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full border-2 border-green-200 dark:border-green-800">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-800 dark:text-green-400">
                        RECOMMENDED FOR {recommendedClass.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">{overallScore}</div>
                    <div className="text-sm text-muted-foreground">Overall Assessment Score</div>
                    <Badge variant="outline" className="px-3 py-1">
                      {overallPercentile}th Percentile
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Overview */}
            <div className="grid md:grid-cols-6 gap-4">
              {[
                { name: "Cognitive", data: assessmentData.cognitive, icon: Brain, color: "blue" },
                { name: "Academic", data: assessmentData.academic, icon: BookOpen, color: "green" },
                { name: "Social", data: assessmentData.social, icon: Users, color: "purple" },
                { name: "Emotional", data: assessmentData.emotional, icon: Heart, color: "pink" },
                { name: "Creative", data: assessmentData.creative, icon: Lightbulb, color: "yellow" },
                { name: "Physical", data: assessmentData.physical, icon: Activity, color: "orange" },
              ].map((domain) => {
                const performance = getPerformanceLevel(domain.data.percentile)
                const IconComponent = domain.icon
                const PerformanceIcon = performance.icon

                return (
                  <Card key={domain.name} className="text-center">
                    <CardContent className="p-4">
                      <div
                        className={`p-3 rounded-full mx-auto mb-3 w-fit bg-${domain.color}-100 dark:bg-${domain.color}-900/20`}
                      >
                        <IconComponent className={`h-6 w-6 text-${domain.color}-600`} />
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{domain.name}</h3>
                      <div className="text-2xl font-bold mb-1">{domain.data.score}</div>
                      <div className="text-xs text-muted-foreground mb-2">{domain.data.percentile}th percentile</div>
                      <div className={`flex items-center justify-center gap-1 text-xs ${performance.color}`}>
                        <PerformanceIcon className="h-3 w-3" />
                        <span>{performance.level}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Detailed Assessment Breakdown */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">Detailed Assessment Analysis</h2>

              {/* Cognitive Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <span>Cognitive Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Intellectual abilities and thinking processes
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-blue-600">{assessmentData.cognitive.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.cognitive.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.cognitive.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{area.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Academic Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <span>Academic Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Subject-specific knowledge and skills
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-green-600">{assessmentData.academic.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.academic.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.academic.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{area.name}</span>
                          {area.name === "Mathematics" && <Calculator className="h-4 w-4 text-blue-500" />}
                          {area.name === "Language Arts" && <FileText className="h-4 w-4 text-purple-500" />}
                          {area.name === "Science Reasoning" && <Microscope className="h-4 w-4 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Skills Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <span>Social Skills Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Interpersonal and communication abilities
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-purple-600">{assessmentData.social.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.social.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.social.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{area.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emotional Intelligence Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <span>Emotional Intelligence Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Self-awareness and emotional regulation
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-pink-600">{assessmentData.emotional.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.emotional.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.emotional.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{area.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Creative & Artistic Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <span>Creative & Artistic Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Innovation and artistic expression
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-yellow-600">{assessmentData.creative.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.creative.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.creative.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{area.name}</span>
                          {area.name === "Artistic Expression" && <Palette className="h-4 w-4 text-pink-500" />}
                          {area.name === "Musical Aptitude" && <Music className="h-4 w-4 text-purple-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Physical Development Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <span>Physical Development Assessment</span>
                      <div className="text-sm font-normal text-muted-foreground">
                        Motor skills and physical coordination
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-orange-600">{assessmentData.physical.score}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessmentData.physical.percentile}th percentile
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.physical.areas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{area.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}</span>
                          <Badge variant="outline" className="text-xs">
                            {area.percentile}th
                          </Badge>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Key Strengths & Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Star className="h-5 w-5" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Exceptional Social Intelligence:</strong> Outstanding empathy and communication skills
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Advanced Mathematical Reasoning:</strong> Shows strong aptitude for complex
                        problem-solving
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Superior Spatial Intelligence:</strong> Excellent 3D thinking and visual-spatial skills
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>High Resilience:</strong> Demonstrates excellent ability to overcome challenges
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Natural Leadership:</strong> Shows initiative and ability to guide peers positively
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Target className="h-5 w-5" />
                    Development Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">
                        <strong>Vocabulary Enhancement:</strong> Encourage extensive reading to expand language skills
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">
                        <strong>Physical Fitness:</strong> Regular physical activities to improve overall fitness
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">
                        <strong>Creative Expression:</strong> Art and music programs to develop artistic abilities
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">
                        <strong>Advanced Challenges:</strong> Provide intellectually stimulating activities
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">
                        <strong>Stress Management:</strong> Teach additional coping strategies for academic pressure
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Educational Pathway Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-indigo-600" />
                  Educational Pathway & Program Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-400 mb-2">
                    Recommended Class Placement: {recommendedClass}
                  </h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    Based on the comprehensive assessment results, {studentName} is well-suited for the Advanced Track
                    program, which offers accelerated learning opportunities and enrichment activities.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Programs:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Advanced Mathematics Program</li>
                      <li>• STEM Enrichment Activities</li>
                      <li>• Leadership Development Program</li>
                      <li>• Creative Arts Workshop</li>
                      <li>• Peer Mentoring Program</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Extracurricular Suggestions:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Math Olympiad Team</li>
                      <li>• Student Council</li>
                      <li>• Science Fair Participation</li>
                      <li>• Art Club</li>
                      <li>• Community Service Projects</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Validity & Confidence */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Assessment Validity & Confidence Intervals</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>
                  <strong>Assessment Reliability:</strong> 0.94 (Excellent) | <strong>Validity Coefficient:</strong>{" "}
                  0.91 (High)
                </p>
                <p>
                  <strong>Confidence Interval:</strong> 95% confidence that true scores fall within ±3 points of
                  reported scores
                </p>
                <p>
                  <strong>Standardization Sample:</strong> Based on national norms (N=15,000) for age-appropriate
                  assessments
                </p>
                <p>
                  <strong>Assessment Tools Used:</strong> Wechsler Intelligence Scale, Woodcock-Johnson Achievement
                  Tests, Social Skills Rating System, Emotional Intelligence Assessment
                </p>
              </CardContent>
            </Card>

            {/* Professional Signature */}
            <div className="flex justify-between items-end pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Assessed by:</p>
                  <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
                  <div>
                    <p className="font-bold text-lg">{assessorName}</p>
                    <p className="text-sm text-muted-foreground">Licensed Educational Psychologist</p>
                    <p className="text-sm text-muted-foreground">Excellence Academy Assessment Center</p>
                    <p className="text-xs text-muted-foreground">
                      License #: PSY-2024-0156 | Ph.D. Educational Psychology, Stanford University
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900 dark:to-purple-800 rounded-full flex items-center justify-center border-4 border-indigo-300 dark:border-indigo-600">
                  <School className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-xs font-semibold">OFFICIAL ASSESSMENT</p>
                <p className="text-xs text-muted-foreground">Excellence Academy</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-6 border-t space-y-2">
              <p className="font-semibold">
                This assessment report is confidential and intended solely for educational planning purposes.
              </p>
              <p>
                For questions about this assessment, please contact Dr. Emily Chen at e.chen@excellenceacademy.edu or +1
                (555) 123-4567 ext. 402
              </p>
              <p>
                Assessment conducted in accordance with APA Standards for Educational and Psychological Testing. Report
                generated on {new Date().toLocaleDateString()}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
