"use client"

import { AlertCircle, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QuickFilters as QuickFiltersType } from "@/lib/types/filters"
import { cn } from "@/lib/utils/cn"

interface QuickFiltersProps {
  filters: QuickFiltersType
  onToggleCritical: () => void
  onToggleCloud: () => void
}

export function QuickFilters({
  filters,
  onToggleCritical,
  onToggleCloud,
}: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={filters.critical ? "default" : "outline"}
        size="sm"
        onClick={onToggleCritical}
        className={cn(
          "gap-2 transition-all",
          filters.critical && "bg-destructive hover:bg-destructive/90"
        )}
      >
        <AlertCircle className="h-4 w-4" />
        Critical Outsourcings
      </Button>

      <Button
        variant={filters.cloud ? "default" : "outline"}
        size="sm"
        onClick={onToggleCloud}
        className="gap-2 transition-all"
      >
        <Cloud className="h-4 w-4" />
        Cloud Outsourcings
      </Button>
    </div>
  )
}
