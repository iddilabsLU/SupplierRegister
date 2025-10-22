import { z } from "zod"
import {
  OutsourcingCategory,
  OutsourcingStatus,
  CloudServiceModel,
  DeploymentModel,
  RiskLevel,
  SubstitutabilityOutcome,
} from "@/lib/types/supplier"

/**
 * Zod validation schema for Supplier Outsourcing Form
 *
 * NOTE: All fields are optional to allow partial saves.
 * Mandatory field checking is handled separately by check-completeness.ts
 * This schema only validates data types and formats.
 */

// Helper regex for date validation (YYYY-MM-DD format)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

export const supplierFormSchema = z.object({
  // 54.a - Reference Number
  referenceNumber: z.string().min(1, "Reference number is required").optional(),

  // 53 - Status
  status: z.nativeEnum(OutsourcingStatus).optional(),

  // 54.b - Dates
  dates: z
    .object({
      startDate: z
        .string()
        .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
        .optional(),
      nextRenewalDate: z
        .string()
        .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
        .optional()
        .or(z.literal("")),
      endDate: z
        .string()
        .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
        .optional()
        .or(z.literal("")),
      serviceProviderNoticePeriod: z.string().optional().or(z.literal("")),
      entityNoticePeriod: z.string().optional().or(z.literal("")),
    })
    .optional(),

  // 54.c - Function Description
  functionDescription: z
    .object({
      name: z.string().min(1, "Function name is required").optional(),
      description: z.string().min(10, "Description must be at least 10 characters").optional(),
      dataDescription: z.string().min(10, "Data description must be at least 10 characters").optional(),
      personalDataInvolved: z.boolean().optional(),
      personalDataTransferred: z.boolean().optional(),
    })
    .optional(),

  // 54.d - Category
  category: z.nativeEnum(OutsourcingCategory).optional(),

  // 54.e - Service Provider Information
  serviceProvider: z
    .object({
      name: z.string().min(2, "Provider name must be at least 2 characters").optional(),
      corporateRegistrationNumber: z.string().min(1, "Registration number is required").optional(),
      legalEntityIdentifier: z.string().optional().or(z.literal("")),
      registeredAddress: z.string().min(10, "Address must be at least 10 characters").optional(),
      contactDetails: z.string().min(5, "Contact details must be at least 5 characters").optional(),
      parentCompany: z.string().optional().or(z.literal("")),
    })
    .optional(),

  // 54.f - Location Information
  location: z
    .object({
      servicePerformanceCountries: z
        .array(z.string().min(1))
        .min(1, "At least one country is required")
        .optional(),
      dataLocationCountry: z.string().min(1, "Data location country is required").optional(),
      dataStorageLocation: z.string().optional().or(z.literal("")),
    })
    .optional(),

  // 54.g - Criticality Assessment
  criticality: z
    .object({
      isCritical: z.boolean().optional(),
      reasons: z.string().min(10, "Criticality reasons must be at least 10 characters").optional(),
    })
    .optional(),

  // 54.i - Criticality Assessment Date
  criticalityAssessmentDate: z
    .string()
    .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
    .optional(),

  // 54.h - Cloud Service Information (conditional)
  cloudService: z
    .object({
      serviceModel: z.nativeEnum(CloudServiceModel).optional(),
      deploymentModel: z.nativeEnum(DeploymentModel).optional(),
      dataNature: z.string().min(10, "Data nature must be at least 10 characters").optional(),
      storageLocations: z.array(z.string().min(1)).min(1, "At least one location is required").optional(),
      cloudOfficer: z.string().optional().or(z.literal("")),
      resourceOperator: z.string().optional().or(z.literal("")),
    })
    .optional()
    .nullable(),

  // Critical Fields (Point 55) - only if critical
  criticalFields: z
    .object({
      // 55.a - Entities Using
      entitiesUsing: z
        .object({
          inScopeEntities: z.array(z.string().min(1)).min(1, "At least one entity is required").optional(),
          groupEntities: z.array(z.string().min(1)).optional(),
        })
        .optional(),

      // 55.b - Group Relationship
      groupRelationship: z
        .object({
          isPartOfGroup: z.boolean().optional(),
          isOwnedByGroup: z.boolean().optional(),
        })
        .optional(),

      // 55.c - Risk Assessment
      riskAssessment: z
        .object({
          risk: z.nativeEnum(RiskLevel).optional(),
          lastAssessmentDate: z
            .string()
            .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
            .optional(),
          mainResults: z.string().min(10, "Assessment results must be at least 10 characters").optional(),
        })
        .optional(),

      // 55.d - Approval
      approval: z
        .object({
          approverName: z.string().min(1, "Approver name is required").optional(),
          approverRole: z.string().min(1, "Approver role is required").optional(),
        })
        .optional(),

      // 55.e - Governing Law
      governingLaw: z.string().min(1, "Governing law is required").optional(),

      // 55.f - Audit Information
      audit: z
        .object({
          lastAuditDate: z
            .string()
            .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
            .optional()
            .or(z.literal("")),
          nextScheduledAudit: z
            .string()
            .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
            .optional()
            .or(z.literal("")),
        })
        .optional(),

      // 55.g - Sub-Outsourcing Information
      subOutsourcing: z
        .object({
          subContractors: z
            .array(
              z.object({
                activityDescription: z
                  .string()
                  .min(10, "Activity description must be at least 10 characters")
                  .optional(),
                name: z.string().min(1, "Sub-contractor name is required"),
                registrationCountry: z.string().min(1, "Registration country is required"),
                servicePerformanceCountry: z.string().min(1, "Service performance country is required"),
                dataStorageLocation: z.string().min(1, "Data storage location is required"),
              })
            )
            .min(1, "At least one sub-contractor is required")
            .optional(),
        })
        .optional()
        .nullable(),

      // 55.h - Substitutability Assessment
      substitutability: z
        .object({
          outcome: z.nativeEnum(SubstitutabilityOutcome).optional(),
          reintegrationAssessment: z
            .string()
            .min(10, "Reintegration assessment must be at least 10 characters")
            .optional(),
          discontinuationImpact: z
            .string()
            .min(10, "Discontinuation impact must be at least 10 characters")
            .optional(),
        })
        .optional(),

      // 55.i - Alternative Service Providers
      alternativeProviders: z.array(z.string().min(1)).min(1, "At least one alternative provider is required").optional(),

      // 55.j - Time Criticality
      isTimeCritical: z.boolean().optional(),

      // 55.k - Cost Information
      estimatedAnnualCost: z.number().min(0, "Cost must be a positive number").optional(),
      costComments: z.string().optional().or(z.literal("")),

      // 55.l - Regulatory Notification
      regulatoryNotification: z
        .object({
          notificationDate: z
            .string()
            .regex(dateRegex, "Invalid date format (use YYYY-MM-DD)")
            .optional(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),

  // Incomplete fields tracking (populated on save)
  incompleteFields: z.array(z.string()).optional(),
})

export type SupplierFormData = z.infer<typeof supplierFormSchema>
