"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Education } from "@/app/page"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}

      {data.map((education, index) => (
        <Card key={education.id} className="p-4 relative">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4 pr-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`school-${education.id}`}>School/University *</Label>
                <Input
                  id={`school-${education.id}`}
                  value={education.school}
                  onChange={(e) => updateEducation(education.id, "school", e.target.value)}
                  placeholder="Harvard University"
                />
              </div>

              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>

              <div>
                <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`start-${education.id}`}>Start Date</Label>
                  <Input
                    id={`start-${education.id}`}
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-${education.id}`}>End Date</Label>
                  <Input
                    id={`end-${education.id}`}
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${education.id}`}>Description</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                placeholder="Relevant coursework, achievements, GPA, etc."
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {500 - education.description.length} characters remaining
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
