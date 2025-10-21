import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import { NotApplicablePlaceholder } from "./not-applicable-placeholder"
import { useSearch } from "@/lib/contexts/search-context"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierCloudServicesProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 3: Cloud Services - Cloud service information (conditional)
 * Shows N/A placeholder if supplier doesn't use cloud services
 */
export function SupplierCloudServices({ supplier }: SupplierCloudServicesProps) {
  const { searchTerm } = useSearch()
  // Show N/A placeholder if no cloud service
  if (!supplier.cloudService) {
    return (
      <NotApplicablePlaceholder
        type="cloud"
        title="Not Applicable"
        description="This supplier does not use cloud services"
        circularRef="CSSF Point 54.h"
      />
    )
  }

  return (
    <div className="space-y-2 max-w-7xl mx-auto">
      {/* Cloud Service Information Card */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Cloud Service Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Service Model"
              circularRef="54.h"
              value={supplier.cloudService.serviceModel}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Deployment Model"
              circularRef="54.h"
              value={supplier.cloudService.deploymentModel}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Data Nature"
              circularRef="54.h"
              value={supplier.cloudService.dataNature}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Storage Locations"
              circularRef="54.h"
              value={supplier.cloudService.storageLocations}
              searchTerm={searchTerm}
            />
            {/* Cloud Officer and Resource Operator - only for critical suppliers */}
            {supplier.criticality.isCritical && supplier.cloudService.cloudOfficer && (
              <FieldDisplay
                label="Cloud Officer (if critical)"
                circularRef="54"
                value={supplier.cloudService.cloudOfficer}
                searchTerm={searchTerm}
              />
            )}
            {supplier.criticality.isCritical && supplier.cloudService.resourceOperator && (
              <FieldDisplay
                label="Resource Operator (if critical)"
                circularRef="54"
                value={supplier.cloudService.resourceOperator}
                searchTerm={searchTerm}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
