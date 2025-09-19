"use client"

import { useState, useEffect } from "react"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import type { ResumeData } from "@/app/page"

interface ResumePreviewProps {
  data: ResumeData
  template: "modern" | "classic"
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 150)
    return () => clearTimeout(timer)
  }, [template])

  return (
    <div
      className={`resume-preview bg-white text-black min-h-[11in] w-full max-w-[8.5in] mx-auto shadow-lg transition-opacity duration-150 ${
        isTransitioning ? "opacity-50" : "opacity-100"
      }`}
    >
      {template === "modern" ? <ModernTemplate data={data} /> : <ClassicTemplate data={data} />}
    </div>
  )
}
