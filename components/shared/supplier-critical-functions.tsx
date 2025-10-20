import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldDisplay } from "./field-display"
import { NotApplicablePlaceholder } from "./not-applicable-placeholder"
import type { SupplierOutsourcing } from "@/lib/types/supplier"

interface SupplierCriticalFunctionsProps {
  supplier: SupplierOutsourcing
}

/**
 * Tab 4: Critical Functions - Additional fields for critical suppliers only (Point 55)
 * Shows N/A placeholder if supplier is not critical
 */
export function SupplierCriticalFunctions({ supplier }: SupplierCriticalFunctionsProps) {
  // Show N/A placeholder if not critical
  if (!supplier.criticality.isCritical || !supplier.criticalFields) {
    return (
      <NotApplicablePlaceholder
        type="critical"
        title="Not Applicable - Non-Critical Function"
        description="This supplier is not classified as critical or important. Additional fields under CSSF Circular 22/806 Point 55 are not required for non-critical outsourcing arrangements."
        circularRef="CSSF Point 55"
        additionalBadge="Non-Critical"
      />
    )
  }

  const { criticalFields } = supplier

  return (
    <div className="space-y-2">
      {/* Card 1: Entities, Risk & Approval */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Entities, Risk & Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            {/* Entities Using */}
            <FieldDisplay
              label="In-Scope Entities"
              circularRef="55.a"
              value={criticalFields.entitiesUsing.inScopeEntities}
            />
            <FieldDisplay
              label="Group Entities (if any)"
              circularRef="55.a"
              value={criticalFields.entitiesUsing.groupEntities}
            />
            {/* Group Relationship */}
            <FieldDisplay
              label="Part of Group"
              circularRef="55.b"
              value={criticalFields.groupRelationship.isPartOfGroup}
            />
            <FieldDisplay
              label="Owned by Group"
              circularRef="55.b"
              value={criticalFields.groupRelationship.isOwnedByGroup}
            />
            {/* Risk Assessment */}
            <FieldDisplay
              label="Risk Level"
              circularRef="55.c"
              value={criticalFields.riskAssessment.risk}
            />
            <FieldDisplay
              label="Last Assessment Date"
              circularRef="55.c"
              value={criticalFields.riskAssessment.lastAssessmentDate}
            />
            <FieldDisplay
              label="Summary Results"
              circularRef="55.c"
              value={criticalFields.riskAssessment.mainResults}
              className="col-span-2"
            />
            {/* Approval */}
            <FieldDisplay
              label="Approver Name"
              circularRef="55.d"
              value={criticalFields.approval.approverName}
            />
            <FieldDisplay
              label="Approver Role"
              circularRef="55.d"
              value={criticalFields.approval.approverRole}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Legal, Audit & Regulatory */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Legal, Audit & Regulatory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            <FieldDisplay
              label="Last Audit Date"
              circularRef="55.f"
              value={criticalFields.audit.lastAuditDate}
            />
            <FieldDisplay
              label="Next Scheduled Audit"
              circularRef="55.f"
              value={criticalFields.audit.nextScheduledAudit}
            />
            <FieldDisplay
              label="Governing Law"
              circularRef="55.e"
              value={criticalFields.governingLaw}
            />
            {criticalFields.regulatoryNotification && (
              <FieldDisplay
                label="Prior Notification Date"
                circularRef="55.l"
                value={criticalFields.regulatoryNotification.notificationDate}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Sub-Outsourcing (conditional - only if exists) */}
      {criticalFields.subOutsourcing && (
        <Card className="bg-white shadow-sm gap-3 py-4">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Sub-Outsourcing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FieldDisplay
              label="Activities sub-outsourced?"
              circularRef="55.g"
              value="Yes"
            />
            <FieldDisplay
              label="Activity Sub-Outsourced"
              circularRef="55.g"
              value={criticalFields.subOutsourcing.activityDescription}
              className="col-span-full"
            />
            {criticalFields.subOutsourcing.subContractors.map((sub, index) => (
              <div
                key={index}
                className="grid gap-2 rounded-lg border p-2 grid-cols-2 [&>*]:min-w-0"
              >
                <FieldDisplay
                  label="Sub-Contractor Name"
                  circularRef="55.g"
                  value={sub.name}
                />
                <FieldDisplay
                  label="Registration Country"
                  circularRef="55.g"
                  value={sub.registrationCountry}
                />
                <FieldDisplay
                  label="Service Performance Country"
                  circularRef="55.g"
                  value={sub.servicePerformanceCountry}
                />
                <FieldDisplay
                  label="Data Storage Location"
                  circularRef="55.g"
                  value={sub.dataStorageLocation}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Card 4: Substitutability & Operations */}
      <Card className="bg-white shadow-sm gap-3 py-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Substitutability & Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 [&>*]:min-w-0">
            {/* Substitutability */}
            <FieldDisplay
              label="Substitutability Outcome"
              circularRef="55.h"
              value={criticalFields.substitutability.outcome}
            />
            <FieldDisplay
              label="Time-Critical Function"
              circularRef="55.j"
              value={criticalFields.isTimeCritical}
            />
            <FieldDisplay
              label="Reintegration Assessment"
              circularRef="55.h"
              value={criticalFields.substitutability.reintegrationAssessment}
              className="col-span-2"
            />
            <FieldDisplay
              label="Discontinuation Impact"
              circularRef="55.h"
              value={criticalFields.substitutability.discontinuationImpact}
              className="col-span-2"
            />
            <FieldDisplay
              label="Alternative Providers"
              circularRef="55.i"
              value={criticalFields.alternativeProviders}
              className="col-span-2"
            />
            {/* Operations */}
            <FieldDisplay
              label="Estimated Annual Cost"
              circularRef="55.k"
              value={criticalFields.estimatedAnnualCost}
            />
            {criticalFields.costComments && (
              <FieldDisplay
                label="Comments (if any)"
                circularRef="55.k"
                value={criticalFields.costComments}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
