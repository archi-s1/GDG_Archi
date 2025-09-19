"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Save, FileText, Trash2, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ResumeData } from "@/app/page"

interface ExportControlsProps {
  resumeData: ResumeData
  onSave: () => void
  onLoad: (data: ResumeData) => void
  onClear: () => void
}

export function ExportControls({ resumeData, onSave, onLoad, onClear }: ExportControlsProps) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    onSave()
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 500)
  }

  const handleExportPDF = () => {
    // Add a small delay to ensure the print styles are applied
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `resume-${resumeData.personalInfo.name || "untitled"}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        onLoad(data)
      } catch (error) {
        alert("Error importing file. Please make sure it's a valid resume JSON file.")
      }
    }
    reader.readAsText(file)
    event.target.value = "" // Reset input
  }

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving..."
      case "saved":
        return "Saved!"
      default:
        return "Save"
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Save Button */}
      <Button
        variant="outline"
        onClick={handleSave}
        disabled={saveStatus === "saving"}
        className={`gap-2 transition-colors ${
          saveStatus === "saved" ? "bg-green-50 border-green-200 text-green-700" : ""
        }`}
      >
        <Save className="h-4 w-4" />
        {getSaveButtonText()}
      </Button>

      {/* Export PDF Button */}
      <Button onClick={handleExportPDF} className="gap-2">
        <Download className="h-4 w-4" />
        Export PDF
      </Button>

      {/* Export JSON Button */}
      <Button variant="outline" onClick={handleExportJSON} className="gap-2 bg-transparent">
        <FileText className="h-4 w-4" />
        Export Data
      </Button>

      {/* Import JSON Button */}
      <div className="relative">
        <Input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="import-json"
        />
        <Button variant="outline" className="gap-2 bg-transparent" asChild>
          <Label htmlFor="import-json" className="cursor-pointer">
            <Upload className="h-4 w-4" />
            Import Data
          </Label>
        </Button>
      </div>

      {/* Clear Data Button */}
      <Button
        variant="outline"
        onClick={onClear}
        className="gap-2 text-destructive hover:text-destructive bg-transparent"
      >
        <Trash2 className="h-4 w-4" />
        Clear All
      </Button>
    </div>
  )
}
