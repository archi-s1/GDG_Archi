"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { EducationForm } from "@/components/education-form"
import { ExperienceForm } from "@/components/experience-form"
import { SkillsForm } from "@/components/skills-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportControls } from "@/components/export-controls"
import { FileText } from "lucide-react"
import { ValidationHelper } from "@/components/validation-helper"

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
}

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  education: [],
  experience: [],
  skills: [],
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic">("modern")
  const [activeSection, setActiveSection] = useState<"personal" | "education" | "experience" | "skills">("personal")

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleExportPDF = () => {
    window.print()
  }

  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
    // Show success message (could be enhanced with toast)
    alert("Resume saved successfully!")
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      setResumeData(initialData)
      localStorage.removeItem("resumeData")
    }
  }

  const handleLoadData = (data: ResumeData) => {
    setResumeData(data)
    localStorage.setItem("resumeData", JSON.stringify(data))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="no-print border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
            </div>
            <ExportControls
              resumeData={resumeData}
              onSave={handleSave}
              onLoad={handleLoadData}
              onClear={handleClearAll}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Left Pane - Form */}
          <div className="no-print space-y-6 overflow-y-auto">
            {/* Template Selector */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Choose Template</h2>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </Card>

            {/* Section Navigation */}
            <Card className="p-6">
              <nav className="flex flex-wrap gap-2">
                {[
                  { key: "personal", label: "Personal Info" },
                  { key: "education", label: "Education" },
                  { key: "experience", label: "Experience" },
                  { key: "skills", label: "Skills" },
                ].map((section) => (
                  <Button
                    key={section.key}
                    variant={activeSection === section.key ? "default" : "outline"}
                    onClick={() => setActiveSection(section.key as any)}
                    className="text-sm"
                  >
                    {section.label}
                  </Button>
                ))}
              </nav>
            </Card>

            {/* Validation Helper */}
            <ValidationHelper data={resumeData} />

            {/* Form Sections */}
            <Card className="p-6">
              {activeSection === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(personalInfo) => setResumeData((prev) => ({ ...prev, personalInfo }))}
                />
              )}
              {activeSection === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(education) => setResumeData((prev) => ({ ...prev, education }))}
                />
              )}
              {activeSection === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(experience) => setResumeData((prev) => ({ ...prev, experience }))}
                />
              )}
              {activeSection === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(skills) => setResumeData((prev) => ({ ...prev, skills }))}
                />
              )}
            </Card>
          </div>

          {/* Right Pane - Preview */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
            <Card className="h-full p-6 overflow-y-auto">
              <div className="no-print mb-4">
                <h2 className="text-lg font-semibold">Live Preview</h2>
                <p className="text-sm text-muted-foreground">Your resume updates in real-time as you type</p>
              </div>
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
