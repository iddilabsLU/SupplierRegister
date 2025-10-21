import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierBasicInfoProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 1: Basic Info - Mandatory fields for all suppliers
 * Contains: Reference & Status, Timeline, Function Description, Criticality Assessment
 */
export function SupplierBasicInfo({ supplier }: SupplierBasicInfoProps) {
  return (
    <div className="space-y-2">
      {/* Card 1: Reference & Status */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Reference & Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-3 [&>*]:min-w-0">
            <FieldDisplay
              label="Reference Number"
              circularRef="54.a"
              value={supplier.referenceNumber}
            />
            <FieldDisplay label="Status" circularRef="53" value={supplier.status} />
            <div></div>
            <FieldDisplay
              label="Function Name"
              circularRef="54.c"
              value={supplier.functionDescription.name}
            />
            <FieldDisplay label="Category" circularRef="54.d" value={supplier.category} />
            <div></div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Timeline & Dates */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Timeline & Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-3 [&>*]:min-w-0">
            <FieldDisplay
              label="Start Date"
              circularRef="54.b"
              value={supplier.dates.startDate}
            />
            <FieldDisplay
              label="Next Renewal Date"
              circularRef="54.b"
              value={supplier.dates.nextRenewalDate}
            />
            <FieldDisplay label="End Date" circularRef="54.b" value={supplier.dates.endDate} />
            <FieldDisplay
              label="Service Provider Notice Period"
              circularRef="54.b"
              value={supplier.dates.serviceProviderNoticePeriod}
            />
            <FieldDisplay
              label="Entity Notice Period"
              circularRef="54.b"
              value={supplier.dates.entityNoticePeriod}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Function Description */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Function Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Function Description"
              circularRef="54.c"
              value={supplier.functionDescription.description}
              className="col-span-2"
            />
            <FieldDisplay
              label="Data Description"
              circularRef="54.c"
              value={supplier.functionDescription.dataDescription}
              className="col-span-2"
            />
            <FieldDisplay
              label="Personal Data Involved"
              circularRef="54.c"
              value={supplier.functionDescription.personalDataInvolved}
            />
            <FieldDisplay
              label="Personal Data Transferred"
              circularRef="54.c"
              value={supplier.functionDescription.personalDataTransferred}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Criticality Assessment */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Criticality Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Is Critical or Important"
              circularRef="54.g"
              value={supplier.criticality.isCritical}
            />
            <FieldDisplay
              label="Assessment Date"
              circularRef="54.i"
              value={supplier.criticalityAssessmentDate}
            />
            <FieldDisplay
              label="Criticality Reasons"
              circularRef="54.g"
              value={supplier.criticality.reasons}
              className="col-span-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
