"use client"

import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const formatDateRange = (startDate: string, endDate: string, current = false) => {
    const start = formatDate(startDate)
    const end = current ? "Present" : formatDate(endDate)
    return `${start} - ${end}`
  }

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Basic"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

  return (
    <div className="p-8 space-y-6 font-serif">
      {/* Header Section */}
      <header className="text-center border-b border-gray-400 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.personalInfo.name || "Your Name"}</h1>

        <div className="text-sm text-gray-700 space-y-1">
          {data.personalInfo.email && (
            <div className="flex items-center justify-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>

          {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-3 w-3" />
                  <span className="text-xs">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3" />
                  <span className="text-xs">{data.personalInfo.github}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span className="text-xs">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position || "Position"}</h3>
                    <p className="italic text-gray-700">{exp.company || "Company"}</p>
                  </div>
                  {(exp.startDate || exp.endDate || exp.current) && (
                    <span className="text-sm text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="italic text-gray-700">{edu.school || "School"}</p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-sm text-gray-600">{formatDateRange(edu.startDate, edu.endDate)}</span>
                  )}
                </div>
                {edu.description && (
                  <div className="text-sm text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="text-gray-900">{skill.name}</span>
                <span className="text-sm text-gray-600 font-medium">{getSkillLevelText(skill.level)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {data.experience.length === 0 && data.education.length === 0 && data.skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Start filling out your information to see your resume preview</p>
          <p className="text-sm mt-2">Your resume will appear here as you type</p>
        </div>
      )}
    </div>
  )
}
