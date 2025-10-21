import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import { useSearch } from "@/lib/contexts/search-context"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierBasicInfoProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 1: Basic Info - Mandatory fields for all suppliers
 * Contains: Reference & Status, Timeline, Function Description, Criticality Assessment
 */
export function SupplierBasicInfo({ supplier }: SupplierBasicInfoProps) {
  const { searchTerm } = useSearch()
  return (
    <div className="space-y-2 max-w-7xl mx-auto">
      {/* Card 1: Reference & Status */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Reference & Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Reference Number"
              circularRef="54.a"
              value={supplier.referenceNumber}
              searchTerm={searchTerm}
            />
            <FieldDisplay label="Status" circularRef="53" value={supplier.status} searchTerm={searchTerm} />
            <FieldDisplay
              label="Function Name"
              circularRef="54.c"
              value={supplier.functionDescription.name}
              searchTerm={searchTerm}
            />
            <FieldDisplay label="Category" circularRef="54.d" value={supplier.category} searchTerm={searchTerm} />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Timeline & Dates */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Timeline & Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Start Date"
              circularRef="54.b"
              value={supplier.dates.startDate}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Next Renewal Date"
              circularRef="54.b"
              value={supplier.dates.nextRenewalDate}
              searchTerm={searchTerm}
            />
            <FieldDisplay label="End Date" circularRef="54.b" value={supplier.dates.endDate} searchTerm={searchTerm} />
            <FieldDisplay
              label="Service Provider Notice Period"
              circularRef="54.b"
              value={supplier.dates.serviceProviderNoticePeriod}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Entity Notice Period"
              circularRef="54.b"
              value={supplier.dates.entityNoticePeriod}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Function Description */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Function Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Function Description"
              circularRef="54.c"
              value={supplier.functionDescription.description}
              className="col-span-2"
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Data Description"
              circularRef="54.c"
              value={supplier.functionDescription.dataDescription}
              className="col-span-2"
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Personal Data Involved"
              circularRef="54.c"
              value={supplier.functionDescription.personalDataInvolved}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Personal Data Transferred"
              circularRef="54.c"
              value={supplier.functionDescription.personalDataTransferred}
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Criticality Assessment */}
      <Card className="bg-white shadow-sm gap-4 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Criticality Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Is Critical or Important"
              circularRef="54.g"
              value={supplier.criticality.isCritical}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Assessment Date"
              circularRef="54.i"
              value={supplier.criticalityAssessmentDate}
              searchTerm={searchTerm}
            />
            <FieldDisplay
              label="Criticality Reasons"
              circularRef="54.g"
              value={supplier.criticality.reasons}
              className="col-span-2"
              searchTerm={searchTerm}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
