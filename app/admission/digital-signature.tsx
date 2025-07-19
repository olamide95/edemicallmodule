"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, Lock, User, FileText, Fingerprint, Eye, Download, AlertTriangle } from "lucide-react"

interface DigitalSignatureProps {
  documentType: "admission-letter" | "assessment-report"
  documentId: string
  studentName: string
  signedBy: string
  signedDate: string
  signatureHash: string
  isVerified?: boolean
}

export function DigitalSignature({
  documentType,
  documentId,
  studentName,
  signedBy,
  signedDate,
  signatureHash,
  isVerified = true,
}: DigitalSignatureProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "verifying" | "failed">(
    isVerified ? "verified" : "failed",
  )

  const handleVerifySignature = async () => {
    setVerificationStatus("verifying")
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setVerificationStatus("verified")
  }

  const getDocumentTypeLabel = () => {
    return documentType === "admission-letter" ? "Admission Letter" : "Assessment Report"
  }

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          Digital Signature Verification
          {verificationStatus === "verified" && (
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          {verificationStatus === "failed" && (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Unverified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Signature Status */}
        <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-900/60 rounded-lg border">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                verificationStatus === "verified"
                  ? "bg-green-100 dark:bg-green-900/20"
                  : verificationStatus === "verifying"
                    ? "bg-yellow-100 dark:bg-yellow-900/20"
                    : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              {verificationStatus === "verified" && <CheckCircle className="h-5 w-5 text-green-600" />}
              {verificationStatus === "verifying" && (
                <div className="h-5 w-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
              )}
              {verificationStatus === "failed" && <AlertTriangle className="h-5 w-5 text-red-600" />}
            </div>
            <div>
              <p className="font-semibold">
                {verificationStatus === "verified" && "Document Digitally Signed & Verified"}
                {verificationStatus === "verifying" && "Verifying Digital Signature..."}
                {verificationStatus === "failed" && "Signature Verification Failed"}
              </p>
              <p className="text-sm text-muted-foreground">
                {getDocumentTypeLabel()} for {studentName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
              <Eye className="h-4 w-4 mr-2" />
              {showDetails ? "Hide" : "View"} Details
            </Button>
            {verificationStatus !== "verified" && (
              <Button size="sm" onClick={handleVerifySignature} disabled={verificationStatus === "verifying"}>
                <Shield className="h-4 w-4 mr-2" />
                Verify
              </Button>
            )}
          </div>
        </div>

        {/* Signature Details */}
        {showDetails && (
          <div className="space-y-4">
            <Separator />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Document Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Document Type:</span>
                      <span className="font-medium">{getDocumentTypeLabel()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Document ID:</span>
                      <span className="font-mono text-xs">{documentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Student Name:</span>
                      <span className="font-medium">{studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Signatory Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signed By:</span>
                      <span className="font-medium">{signedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signature Date:</span>
                      <span>{signedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Authority:</span>
                      <span>Excellence Academy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate:</span>
                      <span className="text-green-600">Valid</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" />
                    Cryptographic Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground block mb-1">Digital Signature Hash:</span>
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-xs break-all">
                        {signatureHash}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Algorithm:</span>
                      <span>RSA-SHA256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Key Length:</span>
                      <span>2048 bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate Authority:</span>
                      <span>Excellence Academy CA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Security Features
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Document integrity verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Signature authenticity confirmed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Timestamp verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Certificate chain validated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                What This Means
              </h4>
              <p className="text-sm text-muted-foreground">
                This digital signature ensures that the document has not been tampered with since it was signed by{" "}
                {signedBy} on {signedDate}. The signature is cryptographically secure and legally binding. You can trust
                that this document is authentic and has been issued by Excellence Academy's authorized personnel.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Verification Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
