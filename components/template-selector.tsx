"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TemplateSelectorProps {
  selected: "modern" | "classic"
  onSelect: (template: "modern" | "classic") => void
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Modern Template */}
      <Card
        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
          selected === "modern" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        }`}
        onClick={() => onSelect("modern")}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Modern</h4>
            {selected === "modern" && <Badge variant="default">Selected</Badge>}
          </div>

          {/* Modern template preview */}
          <div className="space-y-2 p-3 bg-white rounded border">
            <div className="text-center space-y-1">
              <div className="h-2 bg-gray-900 rounded w-2/3 mx-auto"></div>
              <div className="flex justify-center gap-1">
                <div className="h-1 bg-primary rounded w-8"></div>
                <div className="h-1 bg-primary rounded w-8"></div>
                <div className="h-1 bg-primary rounded w-8"></div>
              </div>
            </div>
            <div className="border-b-2 border-primary mb-2"></div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-1 h-4 bg-primary rounded"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-1 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-1 bg-primary rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-4 bg-primary rounded"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-1 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-1 bg-primary rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Clean design with colored accents and modern typography</p>
        </div>
      </Card>

      {/* Classic Template */}
      <Card
        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
          selected === "classic" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
        }`}
        onClick={() => onSelect("classic")}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Classic</h4>
            {selected === "classic" && <Badge variant="default">Selected</Badge>}
          </div>

          {/* Classic template preview */}
          <div className="space-y-2 p-3 bg-white rounded border">
            <div className="text-center space-y-1">
              <div className="h-3 bg-gray-900 rounded w-1/2 mx-auto"></div>
              <div className="h-1 bg-gray-600 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="border-b border-gray-400 mb-2"></div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="h-1 bg-gray-900 rounded w-4/5"></div>
                <div className="h-1 bg-gray-600 rounded w-2/3"></div>
                <div className="h-1 bg-gray-500 rounded w-full"></div>
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-900 rounded w-3/4"></div>
                <div className="h-1 bg-gray-600 rounded w-1/2"></div>
                <div className="h-1 bg-gray-500 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Traditional layout with serif fonts and professional styling</p>
        </div>
      </Card>
    </div>
  )
}
