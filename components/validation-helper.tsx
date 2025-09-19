"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ValidationHelperProps {
  data: ResumeData
}

export function ValidationHelper({ data }: ValidationHelperProps) {
  const validationIssues: string[] = []
  const completedSections: string[] = []

  // Check personal info
  if (!data.personalInfo.name || !data.personalInfo.email) {
    validationIssues.push("Personal information is incomplete (name and email are required)")
  } else {
    completedSections.push("Personal Information")
  }

  // Check email format
  if (data.personalInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    validationIssues.push("Email format is invalid")
  }

  // Check experience
  if (data.experience.length === 0) {
    validationIssues.push("No work experience added")
  } else {
    const incompleteExp = data.experience.some((exp) => !exp.company || !exp.position)
    if (incompleteExp) {
      validationIssues.push("Some work experience entries are incomplete")
    } else {
      completedSections.push("Work Experience")
    }
  }

  // Check education
  if (data.education.length === 0) {
    validationIssues.push("No education added")
  } else {
    const incompleteEdu = data.education.some((edu) => !edu.school || !edu.degree)
    if (incompleteEdu) {
      validationIssues.push("Some education entries are incomplete")
    } else {
      completedSections.push("Education")
    }
  }

  // Check skills
  if (data.skills.length === 0) {
    validationIssues.push("No skills added")
  } else {
    completedSections.push("Skills")
  }

  if (validationIssues.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Your resume looks complete! All sections have been filled out properly.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <div className="space-y-2">
          <p className="font-medium">Resume completion status:</p>
          {completedSections.length > 0 && (
            <p className="text-sm">
              <span className="text-green-700">✓ Completed:</span> {completedSections.join(", ")}
            </p>
          )}
          {validationIssues.length > 0 && (
            <div className="text-sm">
              <span className="text-orange-700">⚠ Issues to address:</span>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {validationIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
