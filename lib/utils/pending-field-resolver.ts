import { zodResolver } from "@hookform/resolvers/zod"
import type { FieldErrors, Resolver } from "react-hook-form"
import type { z } from "zod"

/**
 * Creates a custom resolver that filters out validation errors for pending fields
 *
 * This allows pending fields to skip validation while non-pending fields still
 * get proper validation and error highlighting in the UI.
 *
 * @param schema - Zod schema for validation
 * @param getPendingFields - Function that returns array of pending field paths
 * @returns Custom resolver for React Hook Form
 */
export function createPendingFieldResolver<T extends z.ZodType>(
  schema: T,
  getPendingFields: () => string[]
): Resolver<z.infer<T>> {
  const baseResolver = zodResolver(schema)

  return async (values, context, options) => {
    // Run full Zod validation first
    const result = await baseResolver(values, context, options)

    // If no errors, return as-is
    if (!result.errors || Object.keys(result.errors).length === 0) {
      return result
    }

    // Get current pending fields
    const pendingFields = getPendingFields()

    // Filter out errors for pending fields
    const filteredErrors = filterPendingFieldErrors(result.errors, pendingFields)

    return {
      ...result,
      errors: filteredErrors,
    }
  }
}

/**
 * Recursively filters out errors for fields in the pending array
 *
 * @param errors - React Hook Form errors object
 * @param pendingFields - Array of pending field paths (e.g., ["referenceNumber", "dates.startDate"])
 * @param parentPath - Current parent path for nested fields
 * @returns Filtered errors object
 */
function filterPendingFieldErrors(
  errors: FieldErrors,
  pendingFields: string[],
  parentPath = ""
): FieldErrors {
  const filtered: FieldErrors = {}

  for (const [key, error] of Object.entries(errors)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key

    // Skip if this field is pending
    if (pendingFields.includes(fullPath)) {
      continue
    }

    // Handle nested errors (objects)
    if (error && typeof error === "object" && !error.message && !error.type) {
      const nestedFiltered = filterPendingFieldErrors(error as FieldErrors, pendingFields, fullPath)
      if (Object.keys(nestedFiltered).length > 0) {
        filtered[key] = nestedFiltered
      }
    } else {
      // Keep error if not pending
      filtered[key] = error
    }
  }

  return filtered
}
