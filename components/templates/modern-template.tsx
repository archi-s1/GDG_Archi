"use client"

import { Mail, Phone, MapPin, Linkedin, Github, Globe, Star } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
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

  return (
    <div className="p-8 space-y-6">
      {/* Header Section */}
      <header className="text-center border-b-2 border-cyan-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.name || "Your Name"}</h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>

        {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-4 text-sm text-cyan-800 mt-2">
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>{data.personalInfo.github}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-cyan-800 mb-4 border-b border-gray-300 pb-1">WORK EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-800 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                    <p className="text-cyan-800 font-medium">{exp.company || "Company"}</p>
                  </div>
                  {(exp.startDate || exp.endDate || exp.current) && (
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-700 mt-2 whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-cyan-800 mb-4 border-b border-gray-300 pb-1">EDUCATION</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-cyan-800 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-cyan-800 font-medium">{edu.school || "School"}</p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  )}
                </div>
                {edu.description && (
                  <div className="text-sm text-gray-700 mt-2 whitespace-pre-line">{edu.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-cyan-800 mb-4 border-b border-gray-300 pb-1">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= skill.level ? "fill-cyan-800 text-cyan-800" : "text-gray-300"}`}
                    />
                  ))}
                </div>
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
