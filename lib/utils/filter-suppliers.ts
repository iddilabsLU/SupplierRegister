import { SupplierOutsourcing } from "@/lib/types/supplier"
import { QuickFilters, CustomFilter, FilterFieldType } from "@/lib/types/filters"

/**
 * Filters suppliers based on quick filters and custom filters
 * All filters are combined using AND logic
 */
export function filterSuppliers(
  suppliers: SupplierOutsourcing[],
  quickFilters: QuickFilters,
  customFilters: CustomFilter[]
): SupplierOutsourcing[] {
  return suppliers.filter((supplier) => {
    // Quick Filter: Critical
    if (quickFilters.critical && !supplier.criticality.isCritical) {
      return false
    }

    // Quick Filter: Cloud
    if (quickFilters.cloud && supplier.category !== "Cloud") {
      return false
    }

    // Custom Filters: All must match (AND logic)
    for (const filter of customFilters) {
      // Skip empty filters
      if (!filter.field || !filter.value) continue

      if (!matchesCustomFilter(supplier, filter.field, filter.value)) {
        return false
      }
    }

    return true
  })
}

/**
 * Checks if a supplier matches a specific custom filter
 */
function matchesCustomFilter(
  supplier: SupplierOutsourcing,
  field: FilterFieldType,
  value: string
): boolean {
  const normalizedValue = value.toLowerCase().trim()

  switch (field) {
    case "providerName":
      return supplier.serviceProvider.name.toLowerCase().includes(normalizedValue)

    case "category":
      return supplier.category === value

    case "status":
      return supplier.status === value

    case "servicePerformanceCountries":
      // Check if any country in the array matches (case-insensitive partial match)
      return supplier.location.servicePerformanceCountries.some((country) =>
        country.toLowerCase().includes(normalizedValue)
      )

    case "dataLocationCountry":
      return supplier.location.dataLocationCountry.toLowerCase().includes(normalizedValue)

    case "dataStorageLocation":
      // Handle optional field
      if (!supplier.location.dataStorageLocation) return false
      return supplier.location.dataStorageLocation.toLowerCase().includes(normalizedValue)

    case "risk":
      // Only for critical suppliers
      if (!supplier.criticality.isCritical || !supplier.criticalFields) return false
      return supplier.criticalFields.riskAssessment.risk === value

    case "activitiesSubOutsourced":
      // Only for critical suppliers
      if (!supplier.criticality.isCritical || !supplier.criticalFields) return false
      const hasSubOutsourcing = !!supplier.criticalFields.subOutsourcing
      return value === "Yes" ? hasSubOutsourcing : !hasSubOutsourcing

    case "timeCritical":
      // Only for critical suppliers
      if (!supplier.criticality.isCritical || !supplier.criticalFields) return false
      return value === "Yes"
        ? supplier.criticalFields.isTimeCritical
        : !supplier.criticalFields.isTimeCritical

    default:
      return true
  }
}

/**
 * Counts the number of active filters
 */
export function countActiveFilters(
  quickFilters: QuickFilters,
  customFilters: CustomFilter[]
): number {
  let count = 0

  if (quickFilters.critical) count++
  if (quickFilters.cloud) count++

  customFilters.forEach((filter) => {
    if (filter.field && filter.value) count++
  })

  return count
}
