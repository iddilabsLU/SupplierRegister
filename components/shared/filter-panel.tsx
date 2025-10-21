"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type {
  QuickFilters as QuickFiltersType,
  CustomFilter,
  FilterFieldType,
} from "@/lib/types/filters"
import { countActiveFilters } from "@/lib/utils/filter-suppliers"
import { QuickFilters } from "./quick-filters"
import { CustomFilterRow } from "./custom-filter-row"
import { ActiveFilterBadges } from "./active-filter-badges"

interface FilterPanelProps {
  quickFilters: QuickFiltersType
  customFilters: CustomFilter[]
  onQuickFilterChange: (filters: QuickFiltersType) => void
  onCustomFiltersChange: (filters: CustomFilter[]) => void
  onClearAll: () => void
}

export function FilterPanel({
  quickFilters,
  customFilters,
  onQuickFilterChange,
  onCustomFiltersChange,
  onClearAll,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeFilterCount = countActiveFilters(quickFilters, customFilters)

  const handleToggleCritical = () => {
    onQuickFilterChange({ ...quickFilters, critical: !quickFilters.critical })
  }

  const handleToggleCloud = () => {
    onQuickFilterChange({ ...quickFilters, cloud: !quickFilters.cloud })
  }

  const handleFieldChange = (filterId: string, field: FilterFieldType | "") => {
    // If selecting "searchAllFields", remove any existing search filters first
    let updatedFilters = customFilters.map((filter) =>
      filter.id === filterId ? { ...filter, field, value: "" } : filter
    )

    // Enforce "only 1 text search" rule
    if (field === "searchAllFields") {
      updatedFilters = updatedFilters.map((filter) =>
        filter.id !== filterId && filter.field === "searchAllFields"
          ? { ...filter, field: "", value: "" }
          : filter
      )
    }

    onCustomFiltersChange(updatedFilters)
  }

  const handleValueChange = (filterId: string, value: string) => {
    const updatedFilters = customFilters.map((filter) =>
      filter.id === filterId ? { ...filter, value } : filter
    )
    onCustomFiltersChange(updatedFilters)
  }

  const handleRemoveFilter = (filterId: string) => {
    const updatedFilters = customFilters.filter((f) => f.id !== filterId)
    // Ensure at least one empty filter row remains
    if (updatedFilters.length === 0) {
      updatedFilters.push({
        id: "filter-initial",
        field: "",
        value: "",
      })
    }
    onCustomFiltersChange(updatedFilters)
  }

  const handleRemoveQuickFilter = (filterType: "critical" | "cloud") => {
    onQuickFilterChange({ ...quickFilters, [filterType]: false })
  }

  return (
    <div className="space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="rounded-md border bg-card">
          {/* Collapsible Trigger Bar */}
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      ({activeFilterCount} active)
                    </span>
                  )}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                {isOpen ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
            </div>
          </CollapsibleTrigger>

          {/* Collapsible Content */}
          <CollapsibleContent>
            <div className="px-3 pb-2 border-t">
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {/* Quick Filters Section */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quick:</span>
                  <QuickFilters
                    filters={quickFilters}
                    onToggleCritical={handleToggleCritical}
                    onToggleCloud={handleToggleCloud}
                  />
                </div>

                <Separator orientation="vertical" className="h-8" />

                {/* Custom Filters Section */}
                <div className="flex flex-1 items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Custom:</span>
                  <div className="flex flex-wrap items-center gap-2 flex-1">
                    {customFilters.map((filter) => (
                      <CustomFilterRow
                        key={filter.id}
                        filter={filter}
                        onFieldChange={handleFieldChange}
                        onValueChange={handleValueChange}
                        onRemove={handleRemoveFilter}
                        showRemove={customFilters.length > 1 || (filter.field !== "" || filter.value !== "")}
                      />
                    ))}
                  </div>
                </div>

                {/* Clear All Button */}
                {activeFilterCount > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-8" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClearAll}
                      className="h-8 text-xs"
                    >
                      Clear All
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Active Filter Badges */}
      <ActiveFilterBadges
        quickFilters={quickFilters}
        customFilters={customFilters}
        onRemoveQuickFilter={handleRemoveQuickFilter}
        onRemoveCustomFilter={handleRemoveFilter}
      />
    </div>
  )
}
