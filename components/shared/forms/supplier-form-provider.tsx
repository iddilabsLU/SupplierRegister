"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormTextInput } from "./fields/form-text-input"
import { FormTextarea } from "./fields/form-textarea"
import { FormMultiText } from "./fields/form-multi-text"
import type { Control } from "react-hook-form"
import type { SupplierFormData } from "@/lib/validations/supplier-schema"

interface SupplierFormProviderProps {
  control: Control<SupplierFormData>
  toggleFieldPending: (fieldPath: string) => void
  isFieldPending: (fieldPath: string) => boolean
}

/**
 * Tab 2: Service Provider
 * Contains: Provider Information, Location Information
 */
export function SupplierFormProvider({ control, toggleFieldPending, isFieldPending }: SupplierFormProviderProps) {
  return (
    <div className="space-y-2 max-w-7xl mx-auto">
      {/* Card 1: Provider Information */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Provider Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
            <FormTextInput
              control={control}
              name="serviceProvider.name"
              label="Provider Name"
              circularRef="54.e"
              placeholder="e.g., CloudTech Solutions S.A."
              required
              className="col-span-2"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextInput
              control={control}
              name="serviceProvider.corporateRegistrationNumber"
              label="Corporate Registration Number"
              circularRef="54.e"
              placeholder="e.g., B123456"
              required
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextInput
              control={control}
              name="serviceProvider.legalEntityIdentifier"
              label="Legal Entity Identifier (LEI)"
              circularRef="54.e"
              placeholder="Optional - if any"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextarea
              control={control}
              name="serviceProvider.registeredAddress"
              label="Registered Address"
              circularRef="54.e"
              placeholder="e.g., 15 Avenue de la Liberté, L-1931 Luxembourg"
              rows={2}
              required
              className="col-span-2"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextarea
              control={control}
              name="serviceProvider.contactDetails"
              label="Contact Details"
              circularRef="54.e"
              placeholder="Email, phone, website"
              rows={2}
              required
              className="col-span-2"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextInput
              control={control}
              name="serviceProvider.parentCompany"
              label="Parent Company"
              circularRef="54.e"
              placeholder="Optional - if applicable"
              className="col-span-2"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Location Information */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Location Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
            <FormMultiText
              control={control}
              name="location.servicePerformanceCountries"
              label="Service Performance Countries"
              circularRef="54.f"
              placeholder="e.g., Luxembourg"
              tooltip="Add all countries where the service is performed"
              required
              addButtonLabel="Add Country"
              className="col-span-2"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextInput
              control={control}
              name="location.dataLocationCountry"
              label="Data Location Country"
              circularRef="54.f"
              placeholder="e.g., Luxembourg"
              required
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
            <FormTextInput
              control={control}
              name="location.dataStorageLocation"
              label="Data Storage Location"
              circularRef="54.f"
              placeholder="Optional - specific location if known"
              toggleFieldPending={toggleFieldPending}
              isFieldPending={isFieldPending}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
