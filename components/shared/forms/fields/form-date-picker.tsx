"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  circularRef?: string
  required?: boolean
  tooltip?: string
  className?: string
}

/**
 * Date picker component for forms
 * Uses HTML5 date input for simplicity and cross-browser compatibility
 * Integrates with React Hook Form and displays CSSF circular references
 *
 * @example
 * <FormDatePicker
 *   control={form.control}
 *   name="dates.startDate"
 *   label="Start Date"
 *   circularRef="54.b"
 *   required
 * />
 */
export function FormDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  circularRef,
  required = false,
  tooltip,
  className = "",
}: FormDatePickerProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-base">
            {label}
            {circularRef && <span className="text-sm text-muted-foreground ml-1">({circularRef})</span>}
            {required && <span className="text-destructive ml-1">*</span>}
            {tooltip && (
              <span className="text-xs text-muted-foreground ml-2" title={tooltip}>
                ⓘ
              </span>
            )}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="date"
                {...field}
                value={field.value || ""}
                className="text-base"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
