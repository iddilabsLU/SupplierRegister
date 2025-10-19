"use client"

import React, { useState, useEffect } from "react"
import { MoreVertical, Edit, Copy, Trash2, X, Info } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { SupplierOutsourcing } from "@/lib/types/supplier"
import { FieldDisplay } from "./field-display"
import { formatDateShort } from "@/lib/utils/formatters"
import { toast } from "sonner"

interface SupplierRegisterTableProps {
  suppliers: SupplierOutsourcing[]
}

export function SupplierRegisterTable({ suppliers }: SupplierRegisterTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<SupplierOutsourcing | null>(null)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const hideHint = localStorage.getItem("hideTableHint")
    if (hideHint === "true") {
      setShowHint(false)
    }
  }, [])

  const handleCloseHint = () => {
    setShowHint(false)
    localStorage.setItem("hideTableHint", "true")
  }

  const toggleRow = (referenceNumber: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(referenceNumber)) {
      newExpanded.delete(referenceNumber)
    } else {
      newExpanded.add(referenceNumber)
    }
    setExpandedRows(newExpanded)
  }

  const handleEdit = (supplier: SupplierOutsourcing) => {
    toast.info("Edit functionality coming soon", {
      description: `Editing ${supplier.serviceProvider.name}`,
    })
  }

  const handleDuplicate = (supplier: SupplierOutsourcing) => {
    toast.success("Duplicate functionality coming soon", {
      description: `Duplicating ${supplier.serviceProvider.name}`,
    })
  }

  const handleDeleteClick = (supplier: SupplierOutsourcing) => {
    setSupplierToDelete(supplier)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (supplierToDelete) {
      toast.success("Supplier deleted", {
        description: `${supplierToDelete.serviceProvider.name} has been removed from the register.`,
      })
      setDeleteDialogOpen(false)
      setSupplierToDelete(null)
      // TODO: Actual delete logic will go here when backend is implemented
    }
  }

  return (
    <div className="w-full space-y-3">
      {/* Dismissible Hint Banner */}
      {showHint && (
        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-foreground">
              <span className="font-medium">Tip:</span> Click on any row to view full outsourcing details
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCloseHint}
            className="h-7 w-7 p-0 hover:bg-background"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close hint</span>
          </Button>
        </div>
      )}

      <div className="rounded-md border bg-white">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[2.5%]" />
              <TableHead className="w-[6%]">Ref.</TableHead>
              <TableHead className="w-[17%]">Function</TableHead>
              <TableHead className="w-[14%]">Provider</TableHead>
              <TableHead className="w-[12%]">Category</TableHead>
              <TableHead className="w-[9%]">Status</TableHead>
              <TableHead className="w-[8%]">Critical</TableHead>
              <TableHead className="w-[7%]">Start</TableHead>
              <TableHead className="w-[5%]">CSSF Notif.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => {
              const isExpanded = expandedRows.has(supplier.referenceNumber)
              return (
                <React.Fragment key={supplier.referenceNumber}>
                  <TableRow
                    className="cursor-pointer transition-colors hover:bg-muted/50 even:bg-muted/20"
                    onClick={() => toggleRow(supplier.referenceNumber)}
                  >
                    <TableCell className="align-top">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(supplier)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Supplier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDuplicate(supplier)
                            }}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(supplier)
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal break-words leading-tight align-top">{supplier.referenceNumber}</TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top">
                      {supplier.functionDescription.name}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top">{supplier.serviceProvider.name}</TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top">{supplier.category}</TableCell>
                    <TableCell className="align-top">
                      <Badge
                        variant={
                          supplier.status === "Active" ? "default" :
                          supplier.status === "Not Yet Active" ? "secondary" :
                          "outline"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <Badge variant={supplier.criticality.isCritical ? "destructive" : "secondary"}>
                        {supplier.criticality.isCritical ? "Critical" : "Non-Critical"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm align-top">{formatDateShort(supplier.dates.startDate)}</TableCell>
                    <TableCell className="text-sm align-top">
                      {supplier.criticality.isCritical && supplier.criticalFields?.regulatoryNotification
                        ? formatDateShort(supplier.criticalFields.regulatoryNotification.notificationDate)
                        : "N/A"}
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-muted/30 p-6">
                        <div className="space-y-6">
                          {/* Section 1: Basic Information */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Basic Information (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
                              <FieldDisplay
                                label="Reference Number"
                                circularRef="54.a"
                                value={supplier.referenceNumber}
                              />
                              <FieldDisplay
                                label="Status"
                                circularRef="53"
                                value={supplier.status}
                              />
                              <FieldDisplay
                                label="Function"
                                circularRef="54.c"
                                value={supplier.functionDescription.name}
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

                          {/* Section 2: Service Provider Details */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Service Provider Details (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                              />
                              <FieldDisplay
                                label="Contact Details"
                                circularRef="54.e"
                                value={supplier.serviceProvider.contactDetails}
                              />
                            </CardContent>
                          </Card>

                          {/* Section 3: Location Information */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Location Information (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                                className="col-span-2"
                              />
                            </CardContent>
                          </Card>

                          {/* Section 5: Criticality Assessment */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Criticality Assessment (Mandatory)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                            </CardContent>
                          </Card>

                          {/* Section 6: Cloud Service Information */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Cloud Service Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
                              <FieldDisplay
                                label="Cloud Service?"
                                circularRef="54.h"
                                value={supplier.cloudService ? "Yes" : "No"}
                                className="col-span-2"
                              />
                              {supplier.cloudService && (
                                <>
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
                                  {supplier.criticality.isCritical && supplier.cloudService.cloudOfficer && (
                                    <FieldDisplay
                                      label="Cloud Officer (if critical)"
                                      circularRef="54"
                                      value={supplier.cloudService.cloudOfficer}
                                    />
                                  )}
                                  {supplier.criticality.isCritical && supplier.cloudService.resourceOperator && (
                                    <FieldDisplay
                                      label="Resource Operator (if critical)"
                                      circularRef="54"
                                      value={supplier.cloudService.resourceOperator}
                                    />
                                  )}
                                  <FieldDisplay
                                    label="Data Nature"
                                    circularRef="54.h"
                                    value={supplier.cloudService.dataNature}
                                  />
                                  <FieldDisplay
                                    label="Storage Locations"
                                    circularRef="54.h"
                                    value={supplier.cloudService.storageLocations}
                                  />
                                </>
                              )}
                            </CardContent>
                          </Card>

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
                                  <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                                  <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                                  <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
                                    <FieldDisplay
                                      label="Last Assessment Date"
                                      circularRef="55.c"
                                      value={supplier.criticalFields.riskAssessment.lastAssessmentDate}
                                    />
                                    <FieldDisplay
                                      label="Risk"
                                      circularRef="55.c"
                                      value={supplier.criticalFields.riskAssessment.risk}
                                    />
                                    <FieldDisplay
                                      label="Summary Results"
                                      circularRef="55.c"
                                      value={supplier.criticalFields.riskAssessment.mainResults}
                                      className="col-span-2"
                                    />
                                  </CardContent>
                                </Card>

                                {/* Approval & Governance */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Approval & Governance</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 grid-cols-3 [&>*]:min-w-0">
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
                                    />
                                  </CardContent>
                                </Card>

                                {/* Audit Information */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Audit Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Sub-Outsourcing Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <FieldDisplay
                                      label="Activities sub-outsourced?"
                                      circularRef="55.g"
                                      value={supplier.criticalFields.subOutsourcing ? "Yes" : "No"}
                                    />
                                    {supplier.criticalFields.subOutsourcing && (
                                      <>
                                        <FieldDisplay
                                          label="Activity Sub-Outsourced"
                                          circularRef="55.g"
                                          value={supplier.criticalFields.subOutsourcing.activityDescription}
                                          className="col-span-full"
                                        />
                                        {supplier.criticalFields.subOutsourcing.subContractors.map(
                                          (sub, index) => (
                                            <div
                                              key={index}
                                              className="grid gap-4 rounded-lg border p-4 grid-cols-2"
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
                                      </>
                                    )}
                                  </CardContent>
                                </Card>

                                {/* Substitutability */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Substitutability Assessment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="grid gap-4 [&>*]:min-w-0">
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
                                  <CardContent className="grid gap-4 grid-cols-2 [&>*]:min-w-0">
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
                                    {supplier.criticalFields.costComments && (
                                      <FieldDisplay
                                        label="Comments (if any)"
                                        circularRef="55.k"
                                        value={supplier.criticalFields.costComments}
                                        className="col-span-2"
                                      />
                                    )}
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
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Supplier?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{supplierToDelete?.serviceProvider.name}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
