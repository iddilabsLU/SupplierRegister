/**
 * TypeScript types for CSSF Circular 22/806 Supplier Outsourcing Register
 * Reference: Section 4.2.7
 */

// Enums
export enum OutsourcingCategory {
  CLOUD = "Cloud",
  ICT = "ICT Services",
  INTERNAL_CONTROL = "Internal Control Functions",
  PAYMENT_PROCESSING = "Payment Processing",
  DATA_STORAGE = "Data Storage & Hosting",
  CUSTOMER_SERVICE = "Customer Service",
  FACILITIES = "Facilities Management",
  MARKETING = "Marketing & Communications",
  COMPLIANCE = "Compliance Services",
  AUDIT = "Audit Services",
  OTHER = "Other",
}

export enum CloudServiceModel {
  IAAS = "IaaS (Infrastructure as a Service)",
  PAAS = "PaaS (Platform as a Service)",
  SAAS = "SaaS (Software as a Service)",
  NOT_APPLICABLE = "N/A",
}

export enum DeploymentModel {
  PUBLIC = "Public Cloud",
  PRIVATE = "Private Cloud",
  HYBRID = "Hybrid Cloud",
  COMMUNITY = "Community Cloud",
  NOT_APPLICABLE = "N/A",
}

export enum SubstitutabilityOutcome {
  EASY = "Easy",
  DIFFICULT = "Difficult",
  IMPOSSIBLE = "Impossible",
}

export enum OutsourcingStatus {
  DRAFT = "Draft",
  ACTIVE = "Active",
  NOT_YET_ACTIVE = "Not Yet Active",
  TERMINATED = "Terminated",
}

export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

// Mandatory fields for ALL outsourcing arrangements (Point 54)
export interface MandatoryOutsourcingFields {
  // 54.a - Reference Number
  referenceNumber: string

  // 54.b - Dates
  dates: {
    startDate: string
    nextRenewalDate?: string
    endDate?: string
    serviceProviderNoticePeriod?: string
    entityNoticePeriod?: string
  }

  // 53 - Status
  status: OutsourcingStatus

  // 54.c - Function Description
  functionDescription: {
    name: string
    description: string
    dataDescription: string
    personalDataInvolved: boolean
    personalDataTransferred: boolean
  }

  // 54.d - Category
  category: OutsourcingCategory

  // 54.e - Service Provider Information
  serviceProvider: {
    name: string
    corporateRegistrationNumber: string
    legalEntityIdentifier?: string
    registeredAddress: string
    contactDetails: string
    parentCompany?: string
  }

  // 54.f - Location Information
  location: {
    servicePerformanceCountries: string[]
    dataLocationCountry: string
    dataStorageLocation?: string
  }

  // 54.g - Criticality Assessment
  criticality: {
    isCritical: boolean
    reasons: string
  }

  // 54.i - Criticality Assessment Date
  criticalityAssessmentDate: string

  // 54.h - Cloud Service Information (if applicable)
  cloudService?: {
    serviceModel: CloudServiceModel
    deploymentModel: DeploymentModel
    dataNature: string
    storageLocations: string[]
    cloudOfficer?: string
    resourceOperator?: string
  }
}

// Additional fields for CRITICAL functions only (Point 55)
export interface CriticalOutsourcingFields {
  // 55.a - Entities Using the Outsourcing
  entitiesUsing: {
    inScopeEntities: string[]
    groupEntities?: string[]
  }

  // 55.b - Group Relationship
  groupRelationship: {
    isPartOfGroup: boolean
    isOwnedByGroup: boolean
  }

  // 55.c - Risk Assessment
  riskAssessment: {
    risk: RiskLevel
    lastAssessmentDate: string
    mainResults: string
  }

  // 55.d - Approval
  approval: {
    approverName: string
    approverRole: string
  }

  // 55.e - Governing Law
  governingLaw: string

  // 55.f - Audit Information
  audit: {
    lastAuditDate?: string
    nextScheduledAudit?: string
  }

  // 55.g - Sub-Outsourcing Information (where applicable)
  subOutsourcing?: {
    subContractors: Array<{
      activityDescription: string
      name: string
      registrationCountry: string
      servicePerformanceCountry: string
      dataStorageLocation: string
    }>
  }

  // 55.h - Substitutability Assessment
  substitutability: {
    outcome: SubstitutabilityOutcome
    reintegrationAssessment: string
    discontinuationImpact: string
  }

  // 55.i - Alternative Service Providers
  alternativeProviders: string[]

  // 55.j - Time Criticality
  isTimeCritical: boolean

  // 55.k - Cost Information
  estimatedAnnualCost: number
  costComments?: string

  // 55.l - Regulatory Notification
  regulatoryNotification?: {
    notificationDate: string
  }
}

// Complete supplier outsourcing type
export interface SupplierOutsourcing extends MandatoryOutsourcingFields {
  // Critical fields are optional - only present if criticality.isCritical is true
  criticalFields?: CriticalOutsourcingFields

  // Incomplete fields tracking - array of field paths that are mandatory but not filled
  // Used to show red "!" indicator in register and for future dashboard/filter functionality
  incompleteFields?: string[]

  // Pending fields tracking - array of field paths that are marked as "to be completed later"
  // Pending fields skip validation and are highlighted in amber in the register view
  // Field path examples: "referenceNumber", "dates.startDate", "serviceProvider.name", "criticalFields.riskAssessment.risk"
  pendingFields?: string[]
}
