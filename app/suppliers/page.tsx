"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/layouts/app-layout"
import { SupplierRegisterTable } from "@/components/shared/supplier-register-table"
import { FilterPanel } from "@/components/shared/filter-panel"
import { ViewSegmentedControl, type ViewType } from "@/components/shared/view-segmented-control"
import { PlaceholderView } from "@/components/shared/placeholder-view"
import { suppliers } from "@/lib/data/suppliers"
import { AlertCircle, FileText, BarChart3 } from "lucide-react"
import type { QuickFilters, CustomFilter } from "@/lib/types/filters"
import { filterSuppliers } from "@/lib/utils/filter-suppliers"

export default function SuppliersPage() {
  // View state
  const [activeView, setActiveView] = useState<ViewType>("list")

  // Filter state
  const [quickFilters, setQuickFilters] = useState<QuickFilters>({
    critical: false,
    cloud: false,
  })

  const [customFilters, setCustomFilters] = useState<CustomFilter[]>([
    {
      id: "filter-initial",
      field: "",
      value: "",
    },
  ])

  // Counter for generating unique filter IDs
  const [filterCounter, setFilterCounter] = useState(1)

  // Apply filters
  const filteredSuppliers = useMemo(() => {
    return filterSuppliers(suppliers, quickFilters, customFilters)
  }, [quickFilters, customFilters])

  // Statistics (kept for future Dashboard tab)
  const totalCount = suppliers.length
  const filteredCount = filteredSuppliers.length

  // Clear all filters
  const handleClearAll = () => {
    setQuickFilters({ critical: false, cloud: false })
    setCustomFilters([
      {
        id: "filter-initial",
        field: "",
        value: "",
      },
    ])
    setFilterCounter(1)
  }

  // Handle custom filter changes with auto-add logic
  const handleCustomFiltersChange = (filters: CustomFilter[]) => {
    // Check if we should auto-add a new filter row
    const filledFilters = filters.filter((f) => f.field && f.value)
    const shouldAddNew =
      filledFilters.length === filters.length && filters.length < 3

    if (shouldAddNew) {
      const newCounter = filterCounter + 1
      setFilterCounter(newCounter)
      setCustomFilters([
        ...filters,
        {
          id: `filter-${newCounter}`,
          field: "",
          value: "",
        },
      ])
    } else {
      setCustomFilters(filters)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Supplier Outsourcing Register</h1>
          <p className="text-muted-foreground">
            Compliance with CSSF Circular 22/806 (as amended by Circular CSSF 25/883), Section 4.2.7
          </p>
        </div>

        {/* View Segmented Control */}
        <ViewSegmentedControl activeView={activeView} onViewChange={setActiveView} />

        {/* Register List View */}
        {activeView === "list" && (
          <>
            {/* Filter Panel */}
            <FilterPanel
              quickFilters={quickFilters}
              customFilters={customFilters}
              onQuickFilterChange={setQuickFilters}
              onCustomFiltersChange={handleCustomFiltersChange}
              onClearAll={handleClearAll}
            />

            {/* Result Counter */}
            {filteredCount !== totalCount && (
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium text-foreground">
                  Displaying {filteredCount} of {totalCount} suppliers
                </p>
              </div>
            )}

            {/* Register Table or Empty State */}
            {filteredCount > 0 ? (
              <SupplierRegisterTable suppliers={filteredSuppliers} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No suppliers match your filters</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting or clearing your filters to see more results.
                </p>
              </div>
            )}
          </>
        )}

        {/* New Entry View */}
        {activeView === "new" && (
          <PlaceholderView
            icon={FileText}
            title="Coming Soon - Add Supplier"
            description="The Add Supplier form will appear here. You'll be able to create new outsourcing arrangements with full CSSF compliance validation."
          />
        )}

        {/* Dashboard View */}
        {activeView === "dashboard" && (
          <PlaceholderView
            icon={BarChart3}
            title="Coming Soon - Analytics Dashboard"
            description="Visual analytics and insights about your outsourcing arrangements will be displayed here, including charts for critical vs non-critical functions, risk distribution, and upcoming renewals."
          />
        )}
      </div>
    </AppLayout>
  )
}
