import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import { useSearch } from "@/lib/contexts/search-context"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierProviderDetailsProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 2: Provider Details - Service provider and location information
 * Contains: Service Provider Information, Location Information
 */
export function SupplierProviderDetails({ supplier }: SupplierProviderDetailsProps) {
  const { searchTerm } = useSearch()
  return (
    <div className="space-y-2 max-w-7xl mx-auto">
      {/* Card 1: Service Provider Information */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Service Provider Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Provider Name"
              circularRef="54.e"
              value={supplier.serviceProvider.name}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Parent Company"
              circularRef="54.e"
              value={supplier.serviceProvider.parentCompany}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Corporate Registration Number"
              circularRef="54.e"
              value={supplier.serviceProvider.corporateRegistrationNumber}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Legal Entity Identifier (LEI) (if any)"
              circularRef="54.e"
              value={supplier.serviceProvider.legalEntityIdentifier}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Registered Address"
              circularRef="54.e"
              value={supplier.serviceProvider.registeredAddress}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Contact Details"
              circularRef="54.e"
              value={supplier.serviceProvider.contactDetails}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Location Information */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Location Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Service Performance Countries"
              circularRef="54.f"
              value={supplier.location.servicePerformanceCountries}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Data Location Country"
              circularRef="54.f"
              value={supplier.location.dataLocationCountry}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Data Storage Location"
              circularRef="54.f"
              value={supplier.location.dataStorageLocation}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
