"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2, Star } from "lucide-react"
import type { Skill } from "@/app/page"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkillName, setNewSkillName] = useState("")

  const addSkill = () => {
    if (!newSkillName.trim()) return

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      level: 3,
    }
    onChange([...data, newSkill])
    setNewSkillName("")
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSkill()
    }
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills</h3>

        {/* Add new skill */}
        <Card className="p-4 mb-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="new-skill">Add New Skill</Label>
              <Input
                id="new-skill"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., JavaScript, Python, Design..."
                maxLength={50}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} disabled={!newSkillName.trim()} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Add your first skill above.</p>
        </div>
      )}

      {data.length > 0 && (
        <div className="space-y-4">
          {data.map((skill) => (
            <Card key={skill.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                      className="font-medium border-none p-0 h-auto focus-visible:ring-0 bg-transparent"
                      maxLength={50}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Level: {getSkillLevelText(skill.level)}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 cursor-pointer ${
                              star <= skill.level ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                            onClick={() => updateSkill(skill.id, "level", star)}
                          />
                        ))}
                      </div>
                    </div>

                    <Slider
                      value={[skill.level]}
                      onValueChange={(value) => updateSkill(skill.id, "level", value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
