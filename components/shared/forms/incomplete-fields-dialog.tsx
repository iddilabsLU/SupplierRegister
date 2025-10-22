"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface IncompleteFieldsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  incompleteFields: string[]
  onConfirm: () => void
}

/**
 * Dialog shown when user tries to save a supplier with incomplete mandatory fields
 * Lists all missing fields and allows user to go back or save as draft
 */
export function IncompleteFieldsDialog({
  open,
  onOpenChange,
  incompleteFields,
  onConfirm,
}: IncompleteFieldsDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-100 p-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <AlertDialogTitle className="text-xl">Incomplete Mandatory Fields</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base pt-4">
            <span className="font-medium text-foreground">
              {incompleteFields.length} mandatory field{incompleteFields.length === 1 ? "" : "s"} not filled:
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="max-h-60 overflow-y-auto rounded-md border bg-muted/30 p-4">
          <ul className="space-y-1.5">
            {incompleteFields.map((field, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-destructive mt-0.5">•</span>
                <span className="text-foreground">{field}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3">
          <p className="text-sm text-foreground">
            You can save this supplier as a <strong>draft</strong>, but these fields should be completed for
            full CSSF compliance. The supplier will be marked with a{" "}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              !
            </span>{" "}
            indicator in the register.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Go Back to Form</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-yellow-600 hover:bg-yellow-700">
            Save as Draft
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
