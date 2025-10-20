import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierProviderDetailsProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 2: Provider Details - Service provider and location information
 * Contains: Service Provider Information, Location Information
 */
export function SupplierProviderDetails({ supplier }: SupplierProviderDetailsProps) {
  return (
    <div className="space-y-2">
      {/* Card 1: Service Provider Information */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="py-2 pb-1">
          <CardTitle className="text-lg">Service Provider Information</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Provider Name"
              circularRef="54.e"
              value={supplier.serviceProvider.name}
            />
            <FieldDisplay
              label="Parent Company"
              circularRef="54.e"
              value={supplier.serviceProvider.parentCompany}
            />
            <FieldDisplay
              label="Corporate Registration Number"
              circularRef="54.e"
              value={supplier.serviceProvider.corporateRegistrationNumber}
            />
            <FieldDisplay
              label="Legal Entity Identifier (LEI) (if any)"
              circularRef="54.e"
              value={supplier.serviceProvider.legalEntityIdentifier}
            />
            <FieldDisplay
              label="Registered Address"
              circularRef="54.e"
              value={supplier.serviceProvider.registeredAddress}
              className="col-span-2"
            />
            <FieldDisplay
              label="Contact Details"
              circularRef="54.e"
              value={supplier.serviceProvider.contactDetails}
              className="col-span-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Location Information */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="py-2 pb-1">
          <CardTitle className="text-lg">Location Information</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Service Performance Countries"
              circularRef="54.f"
              value={supplier.location.servicePerformanceCountries}
              className="col-span-2"
            />
            <FieldDisplay
              label="Data Location Country"
              circularRef="54.f"
              value={supplier.location.dataLocationCountry}
            />
            <FieldDisplay
              label="Data Storage Location"
              circularRef="54.f"
              value={supplier.location.dataStorageLocation}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
