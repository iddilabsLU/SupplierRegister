"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  QuickFilters,
  CustomFilter,
  FILTER_FIELD_OPTIONS,
} from "@/lib/types/filters"

interface ActiveFilterBadgesProps {
  quickFilters: QuickFilters
  customFilters: CustomFilter[]
  onRemoveQuickFilter: (filterType: "critical" | "cloud") => void
  onRemoveCustomFilter: (filterId: string) => void
}

export function ActiveFilterBadges({
  quickFilters,
  customFilters,
  onRemoveQuickFilter,
  onRemoveCustomFilter,
}: ActiveFilterBadgesProps) {
  const hasActiveFilters =
    quickFilters.critical ||
    quickFilters.cloud ||
    customFilters.some((f) => f.field && f.value)

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>

      {/* Quick Filter: Critical */}
      {quickFilters.critical && (
        <Badge variant="destructive" className="gap-1 pr-1">
          Critical
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveQuickFilter("critical")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Quick Filter: Cloud */}
      {quickFilters.cloud && (
        <Badge variant="default" className="gap-1 pr-1">
          Cloud
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveQuickFilter("cloud")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}

      {/* Custom Filters */}
      {customFilters
        .filter((f) => f.field && f.value)
        .map((filter) => {
          const fieldOption = FILTER_FIELD_OPTIONS.find((opt) => opt.value === filter.field)
          const fieldLabel = fieldOption?.label || filter.field

          return (
            <Badge key={filter.id} variant="secondary" className="gap-1 pr-1">
              {fieldLabel}: {filter.value}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onRemoveCustomFilter(filter.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )
        })}
    </div>
  )
}
