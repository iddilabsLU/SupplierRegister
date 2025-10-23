"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import { SupplierFormTabNav, type FormTabType } from "./supplier-form-tab-nav"
import { SupplierFormBasicInfo } from "./supplier-form-basic-info"
import { SupplierFormProvider } from "./supplier-form-provider"
import { SupplierFormCloud } from "./supplier-form-cloud"
import { SupplierFormCritical } from "./supplier-form-critical"
import { IncompleteFieldsDialog } from "./incomplete-fields-dialog"
import { FormActions } from "./form-actions"
import { supplierFormSchema, type SupplierFormData } from "@/lib/validations/supplier-schema"
import { checkIncompleteFields, generateNextReferenceNumber } from "@/lib/utils/check-completeness"
import { createPendingFieldResolver } from "@/lib/utils/pending-field-resolver"
import { OutsourcingCategory, OutsourcingStatus } from "@/lib/types/supplier"
import type { SupplierOutsourcing } from "@/lib/types/supplier"
import { toast } from "sonner"

interface SupplierFormProps {
  existingSuppliers: SupplierOutsourcing[]
  onSave: (supplier: SupplierOutsourcing) => void
  onCancel: () => void
  initialData?: Partial<SupplierOutsourcing>
  mode?: "add" | "edit"
}

const DRAFT_STORAGE_KEY = "supplier-form-draft"

/**
 * Main supplier form container
 * Manages all form state, validation, and submission logic
 */
export function SupplierForm({
  existingSuppliers,
  onSave,
  onCancel,
  initialData,
  mode = "add", // eslint-disable-line @typescript-eslint/no-unused-vars
}: SupplierFormProps) {
  const [activeTab, setActiveTab] = useState<FormTabType>("basic-info")
  const [showIncompleteDialog, setShowIncompleteDialog] = useState(false)
  const [incompleteFieldLabels, setIncompleteFieldLabels] = useState<string[]>([])
  const [pendingData, setPendingData] = useState<SupplierFormData | null>(null)
  const [hasSubOutsourcing, setHasSubOutsourcing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraftSaving, setIsDraftSaving] = useState(false)
  const [pendingFields, setPendingFields] = useState<string[]>(initialData?.pendingFields || [])

  // Initialize form with React Hook Form
  const form = useForm<SupplierFormData>({
    resolver: createPendingFieldResolver(supplierFormSchema, () => pendingFields),
    mode: "onBlur",
    defaultValues: initialData || {
      referenceNumber: generateNextReferenceNumber(existingSuppliers),
      status: OutsourcingStatus.NOT_YET_ACTIVE,
      criticalityAssessmentDate: new Date().toISOString().split("T")[0],
      dates: {
        startDate: "",
        nextRenewalDate: "",
        endDate: "",
        serviceProviderNoticePeriod: "",
        entityNoticePeriod: "",
      },
      functionDescription: {
        name: "",
        description: "",
        dataDescription: "",
        personalDataInvolved: false,
        personalDataTransferred: false,
      },
      criticality: {
        isCritical: false,
        reasons: "",
      },
      serviceProvider: {
        name: "",
        corporateRegistrationNumber: "",
        legalEntityIdentifier: "",
        registeredAddress: "",
        contactDetails: "",
        parentCompany: "",
      },
      location: {
        servicePerformanceCountries: [""],
        dataLocationCountry: "",
        dataStorageLocation: "",
      },
    },
  })

  // Watch critical fields for conditional tab visibility
  const isCritical = form.watch("criticality.isCritical")
  const category = form.watch("category")

  // Determine tab visibility
  const showCloudTab = category === OutsourcingCategory.CLOUD
  const showCriticalTab = isCritical === true

  // Pending fields helper functions
  const toggleFieldPending = (fieldPath: string) => {
    setPendingFields((prev) => {
      if (prev.includes(fieldPath)) {
        // Remove from pending
        return prev.filter((path) => path !== fieldPath)
      } else {
        // Add to pending
        return [...prev, fieldPath]
      }
    })
  }

  const isFieldPending = (fieldPath: string): boolean => {
    return pendingFields.includes(fieldPath)
  }

  // Handle form submission
  const onSubmit = (data: SupplierFormData) => {
    // Run completeness check
    const completenessResult = checkIncompleteFields(data as Partial<SupplierOutsourcing>, pendingFields)

    if (!completenessResult.isComplete) {
      // Show incomplete fields dialog
      setIncompleteFieldLabels(completenessResult.labels)
      setPendingData(data)
      setShowIncompleteDialog(true)
      return
    }

    // All mandatory fields complete - save directly
    saveSupplier(data, [])
  }

  // Handle validation errors (Zod validation failures)
  const onError = () => {
    // Get the first error field
    const errors = form.formState.errors
    const firstErrorField = Object.keys(errors)[0]

    if (firstErrorField) {
      // Find the first error element and scroll to it
      const firstErrorElement = document.getElementsByName(firstErrorField)[0]
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
        firstErrorElement.focus()
      }
    }

    // Show toast message
    toast.error("Please fill all required fields", {
      description: "Some required fields are missing or have invalid values. Please check the form and try again.",
    })
  }

  // Save supplier (called after confirmation or if complete)
  const saveSupplier = (data: SupplierFormData, incompleteFields: string[], isDraft: boolean = false, pendingFieldsOverride?: string[]) => {
    setIsSubmitting(true)

    try {
      // Use override if provided, otherwise use state
      const finalPendingFields = pendingFieldsOverride !== undefined ? pendingFieldsOverride : pendingFields

      // Transform form data to SupplierOutsourcing
      const supplier: SupplierOutsourcing = {
        referenceNumber: data.referenceNumber!,
        status: data.status!,
        dates: {
          startDate: data.dates?.startDate || "",
          nextRenewalDate: data.dates?.nextRenewalDate,
          endDate: data.dates?.endDate,
          serviceProviderNoticePeriod: data.dates?.serviceProviderNoticePeriod,
          entityNoticePeriod: data.dates?.entityNoticePeriod,
        },
        functionDescription: {
          name: data.functionDescription?.name || "",
          description: data.functionDescription?.description || "",
          dataDescription: data.functionDescription?.dataDescription || "",
          personalDataInvolved: data.functionDescription?.personalDataInvolved || false,
          personalDataTransferred: data.functionDescription?.personalDataTransferred || false,
        },
        category: data.category!,
        serviceProvider: {
          name: data.serviceProvider?.name || "",
          corporateRegistrationNumber: data.serviceProvider?.corporateRegistrationNumber || "",
          legalEntityIdentifier: data.serviceProvider?.legalEntityIdentifier,
          registeredAddress: data.serviceProvider?.registeredAddress || "",
          contactDetails: data.serviceProvider?.contactDetails || "",
          parentCompany: data.serviceProvider?.parentCompany,
        },
        location: {
          servicePerformanceCountries: data.location?.servicePerformanceCountries || [],
          dataLocationCountry: data.location?.dataLocationCountry || "",
          dataStorageLocation: data.location?.dataStorageLocation,
        },
        criticality: {
          isCritical: data.criticality?.isCritical || false,
          reasons: data.criticality?.reasons || "",
        },
        criticalityAssessmentDate: data.criticalityAssessmentDate || "",
        cloudService: data.cloudService
          ? {
              serviceModel: data.cloudService.serviceModel!,
              deploymentModel: data.cloudService.deploymentModel!,
              dataNature: data.cloudService.dataNature!,
              storageLocations: data.cloudService.storageLocations!,
              cloudOfficer: data.cloudService.cloudOfficer,
              resourceOperator: data.cloudService.resourceOperator,
            }
          : undefined,
        criticalFields: data.criticalFields as any || undefined,
        incompleteFields: incompleteFields.length > 0 ? incompleteFields : undefined,
        pendingFields: finalPendingFields.length > 0 ? finalPendingFields : undefined,
      } as SupplierOutsourcing

      // Call parent save handler
      onSave(supplier)

      // Clear draft
      sessionStorage.removeItem(DRAFT_STORAGE_KEY)

      // Show success toast based on action type
      if (isDraft) {
        if (finalPendingFields.length > 0) {
          toast.success("Draft saved", {
            description: `${finalPendingFields.length} field(s) marked as pending for later completion.`,
          })
        } else {
          toast.success("Draft saved successfully", {
            description: "You can continue editing this supplier later.",
          })
        }
      } else if (incompleteFields.length > 0) {
        toast.success("Supplier saved as draft", {
          description: `${incompleteFields.length} mandatory field(s) still need to be completed.`,
        })
      } else if (finalPendingFields.length > 0) {
        toast.success("Supplier saved", {
          description: `${finalPendingFields.length} field(s) marked as pending. You can complete them later.`,
        })
      } else {
        toast.success("Supplier saved successfully", {
          description: "All mandatory fields are complete.",
        })
      }
    } catch (error) {
      console.error("Failed to save supplier:", error)
      toast.error("Failed to save supplier", {
        description: "Please try again or contact support.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle dialog confirmation - mark incomplete fields as pending
  const handleIncompleteConfirm = () => {
    if (pendingData) {
      // Get current incomplete fields (not marked as pending)
      const completenessResult = checkIncompleteFields(pendingData as Partial<SupplierOutsourcing>, pendingFields)

      // Mark all incomplete fields as pending
      const updatedPendingFields = [...pendingFields, ...completenessResult.incomplete]

      // Update state for current session
      setPendingFields(updatedPendingFields)

      // Save supplier with updated pending fields (no incomplete fields since they're all pending now)
      saveSupplier(pendingData, [], false, updatedPendingFields)

      setShowIncompleteDialog(false)
      setPendingData(null)
    }
  }

  // Handle save as draft (no validation)
  const handleSaveAsDraft = () => {
    setIsDraftSaving(true)
    try {
      // Get current form data without validation
      const formData = form.getValues()

      // Check for incomplete required fields
      const completenessResult = checkIncompleteFields(formData as Partial<SupplierOutsourcing>, [])

      // Auto-mark all incomplete fields as pending
      const fieldsToMarkPending = completenessResult.incomplete

      // Update the pendingFields state (for the current form session)
      setPendingFields(fieldsToMarkPending)

      // Force status to "Draft"
      const draftData = {
        ...formData,
        status: OutsourcingStatus.DRAFT,
      }

      // Save with auto-marked pending fields
      saveSupplier(draftData, [], true, fieldsToMarkPending)
    } catch (error) {
      console.error("Failed to save draft:", error)
      toast.error("Failed to save draft", {
        description: "Please try again or contact support.",
      })
    } finally {
      setIsDraftSaving(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY)
      onCancel()
    }
  }



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Tab Navigation */}
          <SupplierFormTabNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showCloudTab={showCloudTab}
            showCriticalTab={showCriticalTab}
          />

          {/* Tab Content - All tabs always rendered for validation */}
          <div className="min-h-[400px] relative">
            <div className={activeTab === "basic-info" ? "relative z-10" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none z-0"}>
              <SupplierFormBasicInfo
                control={form.control}
                toggleFieldPending={toggleFieldPending}
                isFieldPending={isFieldPending}
              />
            </div>
            <div className={activeTab === "provider" ? "relative z-10" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none z-0"}>
              <SupplierFormProvider
                control={form.control}
                toggleFieldPending={toggleFieldPending}
                isFieldPending={isFieldPending}
              />
            </div>
            <div className={activeTab === "cloud" ? "relative z-10" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none z-0"}>
              <SupplierFormCloud
                control={form.control}
                isCritical={isCritical === true}
                toggleFieldPending={toggleFieldPending}
                isFieldPending={isFieldPending}
              />
            </div>
            <div className={activeTab === "critical" ? "relative z-10" : "absolute top-0 left-0 w-full opacity-0 pointer-events-none z-0"}>
              <SupplierFormCritical
                control={form.control}
                hasSubOutsourcing={hasSubOutsourcing}
                onSubOutsourcingChange={setHasSubOutsourcing}
                toggleFieldPending={toggleFieldPending}
                isFieldPending={isFieldPending}
              />
            </div>
          </div>

          {/* Form Actions */}
          <FormActions
            onCancel={handleCancel}
            onSaveAsDraft={handleSaveAsDraft}
            isSubmitting={isSubmitting}
            isDraftSaving={isDraftSaving}
          />
        </form>
      </Form>

      {/* Incomplete Fields Dialog */}
      <IncompleteFieldsDialog
        open={showIncompleteDialog}
        onOpenChange={setShowIncompleteDialog}
        incompleteFields={incompleteFieldLabels}
        onConfirm={handleIncompleteConfirm}
      />
    </>
  )
}
