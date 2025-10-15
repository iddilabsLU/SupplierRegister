"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SupplierOutsourcing } from "@/lib/types/supplier"
import { FieldDisplay } from "./field-display"
import { formatDate } from "@/lib/utils/formatters"

interface SupplierRegisterTableProps {
  suppliers: SupplierOutsourcing[]
}

export function SupplierRegisterTable({ suppliers }: SupplierRegisterTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (referenceNumber: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(referenceNumber)) {
      newExpanded.delete(referenceNumber)
    } else {
      newExpanded.add(referenceNumber)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="w-full">
      <div className="rounded-md border bg-white dark:bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="min-w-[120px]">
                Ref No. <span className="text-xs text-muted-foreground">(54.a)</span>
              </TableHead>
              <TableHead className="min-w-[200px]">
                Function <span className="text-xs text-muted-foreground">(54.c)</span>
              </TableHead>
              <TableHead className="min-w-[180px]">
                Provider <span className="text-xs text-muted-foreground">(54.e)</span>
              </TableHead>
              <TableHead className="min-w-[150px]">
                Category <span className="text-xs text-muted-foreground">(54.d)</span>
              </TableHead>
              <TableHead className="min-w-[100px]">
                Critical <span className="text-xs text-muted-foreground">(54.g)</span>
              </TableHead>
              <TableHead className="min-w-[120px]">
                Start Date <span className="text-xs text-muted-foreground">(54.b)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => {
              const isExpanded = expandedRows.has(supplier.referenceNumber)
              return (
                <>
                  <TableRow key={supplier.referenceNumber} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRow(supplier.referenceNumber)}
                        className="h-8 w-8 p-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{supplier.referenceNumber}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="truncate" title={supplier.functionDescription.description}>
                        {supplier.functionDescription.description}
                      </div>
                    </TableCell>
                    <TableCell>{supplier.serviceProvider.name}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>
                      <Badge variant={supplier.criticality.isCritical ? "destructive" : "secondary"}>
                        {supplier.criticality.isCritical ? "Critical" : "Non-Critical"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(supplier.dates.startDate)}</TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/30 p-6">
                        <div className="space-y-6">
                          {/* Section 1: Basic Information */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Basic Information (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                              <FieldDisplay
                                label="Reference Number"
                                circularRef="54.a"
                                value={supplier.referenceNumber}
                              />
                              <FieldDisplay
                                label="Category"
                                circularRef="54.d"
                                value={supplier.category}
                              />
                              <FieldDisplay
                                label="Function Description"
                                circularRef="54.c"
                                value={supplier.functionDescription.description}
                                className="md:col-span-2"
                              />
                              <FieldDisplay
                                label="Data Description"
                                circularRef="54.c"
                                value={supplier.functionDescription.dataDescription}
                                className="md:col-span-2"
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
                            </CardContent>
                          </Card>

                          {/* Section 2: Service Provider Details */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Service Provider Details (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                              <FieldDisplay
                                label="Provider Name"
                                circularRef="54.e"
                                value={supplier.serviceProvider.name}
                              />
                              <FieldDisplay
                                label="Corporate Registration Number"
                                circularRef="54.e"
                                value={supplier.serviceProvider.corporateRegistrationNumber}
                              />
                              <FieldDisplay
                                label="Legal Entity Identifier (LEI)"
                                circularRef="54.e"
                                value={supplier.serviceProvider.legalEntityIdentifier}
                              />
                              <FieldDisplay
                                label="Parent Company"
                                circularRef="54.e"
                                value={supplier.serviceProvider.parentCompany}
                              />
                              <FieldDisplay
                                label="Registered Address"
                                circularRef="54.e"
                                value={supplier.serviceProvider.registeredAddress}
                                className="md:col-span-2"
                              />
                              <FieldDisplay
                                label="Contact Details"
                                circularRef="54.e"
                                value={supplier.serviceProvider.contactDetails}
                                className="md:col-span-2"
                              />
                            </CardContent>
                          </Card>

                          {/* Section 3: Dates & Timeline */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Dates & Timeline (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                              <FieldDisplay
                                label="End Date"
                                circularRef="54.b"
                                value={supplier.dates.endDate}
                              />
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
                            </CardContent>
                          </Card>

                          {/* Section 4: Location Information */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Location Information (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                              <FieldDisplay
                                label="Service Performance Countries"
                                circularRef="54.f"
                                value={supplier.location.servicePerformanceCountries}
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
                                className="md:col-span-2"
                              />
                            </CardContent>
                          </Card>

                          {/* Section 5: Criticality Assessment */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Criticality Assessment (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
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
                                className="md:col-span-2"
                              />
                            </CardContent>
                          </Card>

                          {/* Section 6: Cloud Services (if applicable) */}
                          {supplier.cloudService && (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Cloud Service Information (If Applicable)
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="grid gap-4 md:grid-cols-2">
                                <FieldDisplay
                                  label="Service Model"
                                  circularRef="54.h"
                                  value={supplier.cloudService.serviceModel}
                                />
                                <FieldDisplay
                                  label="Deployment Model"
                                  circularRef="54.h"
                                  value={supplier.cloudService.deploymentModel}
                                />
                                <FieldDisplay
                                  label="Data Nature"
                                  circularRef="54.h"
                                  value={supplier.cloudService.dataNature}
                                  className="md:col-span-2"
                                />
                                <FieldDisplay
                                  label="Storage Locations"
                                  circularRef="54.h"
                                  value={supplier.cloudService.storageLocations}
                                  className="md:col-span-2"
                                />
                              </CardContent>
                            </Card>
                          )}

                          {/* Section 7: Critical Function Details (only for critical functions) */}
                          {supplier.criticality.isCritical && supplier.criticalFields && (
                            <>
                              <Separator className="my-6" />
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Badge variant="destructive" className="text-sm">
                                    Critical Function Only
                                  </Badge>
                                  <h3 className="text-lg font-semibold">
                                    Additional Requirements for Critical Functions
                                  </h3>
                                </div>

                                {/* Entities Using */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Entities Using the Outsourcing</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FieldDisplay
                                      label="In-Scope Entities"
                                      circularRef="55.a"
                                      value={supplier.criticalFields.entitiesUsing.inScopeEntities}
                                    />
                                    <FieldDisplay
                                      label="Group Entities"
                                      circularRef="55.a"
                                      value={supplier.criticalFields.entitiesUsing.groupEntities}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Group Relationship */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Group Relationship</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FieldDisplay
                                      label="Part of Group"
                                      circularRef="55.b"
                                      value={supplier.criticalFields.groupRelationship.isPartOfGroup}
                                    />
                                    <FieldDisplay
                                      label="Owned by Group"
                                      circularRef="55.b"
                                      value={supplier.criticalFields.groupRelationship.isOwnedByGroup}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Risk Assessment */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4">
                                    <FieldDisplay
                                      label="Last Assessment Date"
                                      circularRef="55.c"
                                      value={supplier.criticalFields.riskAssessment.lastAssessmentDate}
                                    />
                                    <FieldDisplay
                                      label="Main Results"
                                      circularRef="55.c"
                                      value={supplier.criticalFields.riskAssessment.mainResults}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Approval & Governance */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Approval & Governance</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FieldDisplay
                                      label="Approver Name"
                                      circularRef="55.d"
                                      value={supplier.criticalFields.approval.approverName}
                                    />
                                    <FieldDisplay
                                      label="Approver Role"
                                      circularRef="55.d"
                                      value={supplier.criticalFields.approval.approverRole}
                                    />
                                    <FieldDisplay
                                      label="Governing Law"
                                      circularRef="55.e"
                                      value={supplier.criticalFields.governingLaw}
                                      className="md:col-span-2"
                                    />
                                  </CardContent>
                                </Card>

                                {/* Audit Information */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Audit Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FieldDisplay
                                      label="Last Audit Date"
                                      circularRef="55.f"
                                      value={supplier.criticalFields.audit.lastAuditDate}
                                    />
                                    <FieldDisplay
                                      label="Next Scheduled Audit"
                                      circularRef="55.f"
                                      value={supplier.criticalFields.audit.nextScheduledAudit}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Sub-Outsourcing */}
                                {supplier.criticalFields.subOutsourcing && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Sub-Outsourcing Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {supplier.criticalFields.subOutsourcing.subContractors.map(
                                        (sub, index) => (
                                          <div
                                            key={index}
                                            className="grid gap-4 rounded-lg border p-4 md:grid-cols-2"
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
                                        )
                                      )}
                                    </CardContent>
                                  </Card>
                                )}

                                {/* Substitutability */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Substitutability Assessment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4">
                                    <FieldDisplay
                                      label="Substitutability Outcome"
                                      circularRef="55.h"
                                      value={supplier.criticalFields.substitutability.outcome}
                                    />
                                    <FieldDisplay
                                      label="Reintegration Assessment"
                                      circularRef="55.h"
                                      value={supplier.criticalFields.substitutability.reintegrationAssessment}
                                    />
                                    <FieldDisplay
                                      label="Discontinuation Impact"
                                      circularRef="55.h"
                                      value={supplier.criticalFields.substitutability.discontinuationImpact}
                                    />
                                    <FieldDisplay
                                      label="Alternative Providers"
                                      circularRef="55.i"
                                      value={supplier.criticalFields.alternativeProviders}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Operational Details */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Operational Details</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FieldDisplay
                                      label="Time-Critical Function"
                                      circularRef="55.j"
                                      value={supplier.criticalFields.isTimeCritical}
                                    />
                                    <FieldDisplay
                                      label="Estimated Annual Cost"
                                      circularRef="55.k"
                                      value={supplier.criticalFields.estimatedAnnualCost}
                                    />
                                  </CardContent>
                                </Card>

                                {/* Regulatory Notification */}
                                {supplier.criticalFields.regulatoryNotification && (
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Regulatory Notification</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <FieldDisplay
                                        label="Prior Notification Date"
                                        circularRef="55.l"
                                        value={supplier.criticalFields.regulatoryNotification.notificationDate}
                                      />
                                    </CardContent>
                                  </Card>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
