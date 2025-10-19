"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/layouts/app-layout"
import { SupplierRegisterTable } from "@/components/shared/supplier-register-table"
import { FilterPanel } from "@/components/shared/filter-panel"
import { suppliers } from "@/lib/data/suppliers"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { QuickFilters, CustomFilter } from "@/lib/types/filters"
import { filterSuppliers } from "@/lib/utils/filter-suppliers"

export default function SuppliersPage() {
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

  // Statistics
  const totalCount = suppliers.length
  const filteredCount = filteredSuppliers.length
  const criticalCount = filteredSuppliers.filter((s) => s.criticality.isCritical).length
  const nonCriticalCount = filteredCount - criticalCount

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
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Supplier Outsourcing Register</h1>
            <p className="text-muted-foreground">
              Compliance with CSSF Circular 22/806 (as amended by Circular CSSF 25/883), Section 4.2.7
            </p>
          </div>

          {/* Statistics */}
          <div className="flex gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">{totalCount}</div>
              <div className="text-sm text-muted-foreground">Total Suppliers</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{criticalCount}</div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Critical Functions</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{nonCriticalCount}</div>
                <Badge variant="secondary">Non-Critical</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Non-Critical Functions</div>
            </div>
          </div>
        </div>

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
      </div>
    </AppLayout>
  )
}
