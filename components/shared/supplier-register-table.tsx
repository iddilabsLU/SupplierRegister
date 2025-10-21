"use client"

import React, { useState, useEffect } from "react"
import { MoreVertical, Edit, Copy, Trash2, X, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { SupplierDetailTabs } from "./supplier-detail-tabs"
import { formatDateShort } from "@/lib/utils/formatters"
import { toast } from "sonner"

interface SupplierRegisterTableProps {
  suppliers: SupplierOutsourcing[]
  searchTerm?: string
}

export function SupplierRegisterTable({ suppliers, searchTerm = "" }: SupplierRegisterTableProps) {
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
              <TableHead className="w-[6%] text-base">Ref.</TableHead>
              <TableHead className="w-[17%] text-base">Function</TableHead>
              <TableHead className="w-[14%] text-base">Provider</TableHead>
              <TableHead className="w-[12%] text-base">Category</TableHead>
              <TableHead className="w-[9%] text-base">Status</TableHead>
              <TableHead className="w-[8%] text-base">Critical</TableHead>
              <TableHead className="w-[7%] text-base">Start</TableHead>
              <TableHead className="w-[5%] text-base">CSSF Notif.</TableHead>
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
                    <TableCell className="font-medium whitespace-normal break-words leading-tight align-top text-base">{supplier.referenceNumber}</TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top text-base">
                      {supplier.functionDescription.name}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top text-base">{supplier.serviceProvider.name}</TableCell>
                    <TableCell className="whitespace-normal break-words leading-tight align-top text-base">{supplier.category}</TableCell>
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
                    <TableCell className="text-base align-top">{formatDateShort(supplier.dates.startDate)}</TableCell>
                    <TableCell className="text-base align-top">
                      {supplier.criticality.isCritical && supplier.criticalFields?.regulatoryNotification
                        ? formatDateShort(supplier.criticalFields.regulatoryNotification.notificationDate)
                        : "N/A"}
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-muted/30 p-6">
                        <SupplierDetailTabs supplier={supplier} searchTerm={searchTerm} />
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
