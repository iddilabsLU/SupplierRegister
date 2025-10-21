import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils/formatters"
import { highlightText } from "@/lib/utils/highlight-text"

interface FieldDisplayProps {
  label: string
  circularRef: string
  value: string | number | boolean | string[] | undefined
  className?: string
  searchTerm?: string
}

/**
 * Displays a field with its CSSF Circular reference
 * Handles different data types and formatting
 */
export function FieldDisplay({
  label,
  circularRef,
  value,
  className = "",
  searchTerm = "",
}: FieldDisplayProps) {
  // Handle undefined/null values
  if (value === undefined || value === null) {
    return (
      <div className={`space-y-1 ${className}`}>
        <div className="text-base font-medium text-muted-foreground">
          {label} <span className="text-sm">({circularRef})</span>
        </div>
        <div className="text-base text-muted-foreground italic">Not provided</div>
      </div>
    )
  }

  // Format value based on type
  let displayValue: React.ReactNode

  if (typeof value === "boolean") {
    displayValue = (
      <Badge variant={value ? "default" : "secondary"} className="text-sm">
        {value ? "Yes" : "No"}
      </Badge>
    )
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      displayValue = <span className="text-muted-foreground italic">None</span>
    } else {
      displayValue = (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="outline" className="text-sm">
              {searchTerm ? highlightText(item, searchTerm) : item}
            </Badge>
          ))}
        </div>
      )
    }
  } else if (typeof value === "number") {
    // Check if this looks like a currency amount (label contains "cost" or "budget")
    if (label.toLowerCase().includes("cost") || label.toLowerCase().includes("budget")) {
      displayValue = <span className="font-medium">{formatCurrency(value)}</span>
    } else {
      displayValue = <span>{value.toLocaleString()}</span>
    }
  } else {
    // String value
    const strValue = String(value)

    // Check if it looks like a date (YYYY-MM-DD format)
    if (/^\d{4}-\d{2}-\d{2}$/.test(strValue)) {
      const formattedDate = formatDate(strValue)
      displayValue = (
        <span className="break-words">
          {searchTerm ? highlightText(formattedDate, searchTerm) : formattedDate}
        </span>
      )
    } else {
      // Long text gets more spacing
      const isLongText = strValue.length > 100
      displayValue = (
        <span className={isLongText ? "block text-base leading-relaxed break-words" : "break-words"}>
          {searchTerm ? highlightText(strValue, searchTerm) : strValue}
        </span>
      )
    }
  }

  return (
    <div className={`space-y-1 min-w-0 ${className}`}>
      <div className="text-base font-medium text-foreground break-words whitespace-normal">
        {label} <span className="text-sm text-muted-foreground">({circularRef})</span>
      </div>
      <div className="text-base text-foreground break-words whitespace-normal">{displayValue}</div>
    </div>
  )
}
