"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormActionsProps {
  onCancel: () => void
  onSave: () => void
  onSaveAsDraft?: () => void
  isSubmitting: boolean
  isDraftSaving?: boolean
  submitLabel?: string
}

/**
 * Form action buttons (Cancel / Save as Draft / Save Supplier)
 * Sticky positioned at the bottom - always visible while scrolling
 * Layout: Cancel on left, submit buttons on right
 */
export function FormActions({
  onCancel,
  onSave,
  onSaveAsDraft,
  isSubmitting,
  isDraftSaving = false,
  submitLabel = "Save Supplier",
}: FormActionsProps) {
  const isAnyActionInProgress = isSubmitting || isDraftSaving

  return (
    <div className="sticky bottom-0 z-10 bg-background pt-6 pb-4 border-t">
      <div className="flex justify-between gap-3">
        {/* Left: Cancel button */}
        <Button type="button" variant="outline" onClick={onCancel} disabled={isAnyActionInProgress}>
          Cancel
        </Button>

        {/* Right: Save as Draft + Save Supplier buttons */}
        <div className="flex gap-3">
          {onSaveAsDraft && (
            <Button
              type="button"
              variant="secondary"
              onClick={onSaveAsDraft}
              disabled={isAnyActionInProgress}
            >
              {isDraftSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save as Draft
            </Button>
          )}
          <Button type="button" onClick={onSave} disabled={isAnyActionInProgress}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
