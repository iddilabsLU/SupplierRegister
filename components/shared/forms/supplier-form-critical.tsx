"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormTextInput } from "./fields/form-text-input"
import { FormTextarea } from "./fields/form-textarea"
import { FormSelect } from "./fields/form-select"
import { FormRadioGroup } from "./fields/form-radio-group"
import { FormDatePicker } from "./fields/form-date-picker"
import { FormMultiText } from "./fields/form-multi-text"
import { FormSubContractor } from "./fields/form-sub-contractor"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RiskLevel, SubstitutabilityOutcome } from "@/lib/types/supplier"
import type { Control } from "react-hook-form"
import type { SupplierFormData } from "@/lib/validations/supplier-schema"

interface SupplierFormCriticalProps {
  control: Control<SupplierFormData>
  hasSubOutsourcing: boolean
  onSubOutsourcingChange: (enabled: boolean) => void
}

/**
 * Tab 4: Critical Functions (Conditional - only if isCritical = Yes)
 * Contains all Point 55 fields with sub-outsourcing section
 */
export function SupplierFormCritical({
  control,
  hasSubOutsourcing,
  onSubOutsourcingChange,
}: SupplierFormCriticalProps) {
  // Risk Level options
  const riskOptions = Object.values(RiskLevel).map((risk) => ({
    value: risk,
    label: risk,
  }))

  // Substitutability options
  const substitutabilityOptions = Object.values(SubstitutabilityOutcome).map((outcome) => ({
    value: outcome,
    label: outcome,
  }))

  return (
    <div className="space-y-2 max-w-7xl mx-auto">
      {/* Card 1: Entities, Risk & Approval */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Entities, Risk & Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
            <FormMultiText
              control={control}
              name="criticalFields.entitiesUsing.inScopeEntities"
              label="In-Scope Entities"
              circularRef="55.a"
              placeholder="e.g., BankCorp S.A."
              required
              addButtonLabel="Add Entity"
            />
            <FormMultiText
              control={control}
              name="criticalFields.entitiesUsing.groupEntities"
              label="Group Entities"
              circularRef="55.a"
              placeholder="e.g., BankCorp Asset Management S.A."
              addButtonLabel="Add Entity"
            />
            <FormRadioGroup
              control={control}
              name="criticalFields.groupRelationship.isPartOfGroup"
              label="Part of Group"
              circularRef="55.b"
              required
            />
            <FormRadioGroup
              control={control}
              name="criticalFields.groupRelationship.isOwnedByGroup"
              label="Owned by Group"
              circularRef="55.b"
              required
            />
            <FormSelect
              control={control}
              name="criticalFields.riskAssessment.risk"
              label="Risk Level"
              circularRef="55.c"
              options={riskOptions}
              placeholder="Select risk level"
              required
            />
            <FormDatePicker
              control={control}
              name="criticalFields.riskAssessment.lastAssessmentDate"
              label="Last Assessment Date"
              circularRef="55.c"
              required
            />
            <FormTextarea
              control={control}
              name="criticalFields.riskAssessment.mainResults"
              label="Summary Results"
              circularRef="55.c"
              placeholder="Main results of the risk assessment"
              rows={4}
              required
              className="col-span-2"
            />
            <FormTextInput
              control={control}
              name="criticalFields.approval.approverName"
              label="Approver Name"
              circularRef="55.d"
              placeholder="e.g., Board of Directors"
              required
            />
            <FormTextInput
              control={control}
              name="criticalFields.approval.approverRole"
              label="Approver Role"
              circularRef="55.d"
              placeholder="e.g., Management Body"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Legal, Audit & Regulatory */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Legal, Audit & Regulatory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
            <FormTextInput
              control={control}
              name="criticalFields.governingLaw"
              label="Governing Law"
              circularRef="55.e"
              placeholder="e.g., Luxembourg Law"
              required
              className="col-span-2"
            />
            <FormDatePicker
              control={control}
              name="criticalFields.audit.lastAuditDate"
              label="Last Audit Date"
              circularRef="55.f"
            />
            <FormDatePicker
              control={control}
              name="criticalFields.audit.nextScheduledAudit"
              label="Next Scheduled Audit"
              circularRef="55.f"
            />
            <FormDatePicker
              control={control}
              name="criticalFields.regulatoryNotification.notificationDate"
              label="Prior Notification Date"
              circularRef="55.l"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Sub-Outsourcing (Conditional) */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Sub-Outsourcing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Toggle for sub-outsourcing */}
            <div className="flex items-center space-x-2">
              <Switch
                id="has-sub-outsourcing"
                checked={hasSubOutsourcing}
                onCheckedChange={onSubOutsourcingChange}
              />
              <Label htmlFor="has-sub-outsourcing" className="text-base cursor-pointer">
                Activities are sub-outsourced <span className="text-sm text-muted-foreground">(55.g)</span>
              </Label>
            </div>

            {hasSubOutsourcing && (
              <div className="space-y-4 pt-2">
                <FormSubContractor
                  control={control}
                  name="criticalFields.subOutsourcing.subContractors"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Substitutability & Operations */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Substitutability & Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
            <FormSelect
              control={control}
              name="criticalFields.substitutability.outcome"
              label="Substitutability Outcome"
              circularRef="55.h"
              options={substitutabilityOptions}
              placeholder="Select outcome"
              required
            />
            <FormRadioGroup
              control={control}
              name="criticalFields.isTimeCritical"
              label="Time-Critical Function"
              circularRef="55.j"
              required
            />
            <FormTextarea
              control={control}
              name="criticalFields.substitutability.reintegrationAssessment"
              label="Reintegration Assessment"
              circularRef="55.h"
              placeholder="Assess the feasibility of reintegrating this function"
              rows={3}
              required
              className="col-span-2"
            />
            <FormTextarea
              control={control}
              name="criticalFields.substitutability.discontinuationImpact"
              label="Discontinuation Impact"
              circularRef="55.h"
              placeholder="Describe the impact if this service is discontinued"
              rows={3}
              required
              className="col-span-2"
            />
            <FormMultiText
              control={control}
              name="criticalFields.alternativeProviders"
              label="Alternative Providers"
              circularRef="55.i"
              placeholder="e.g., Azure Government Cloud"
              required
              addButtonLabel="Add Provider"
              className="col-span-2"
            />
            <FormTextInput
              control={control}
              name="criticalFields.estimatedAnnualCost"
              label="Estimated Annual Cost"
              circularRef="55.k"
              placeholder="e.g., 850000"
              required
              tooltip="Enter cost in EUR"
            />
            <FormTextarea
              control={control}
              name="criticalFields.costComments"
              label="Cost Comments"
              circularRef="55.k"
              placeholder="Optional - any relevant cost notes"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
