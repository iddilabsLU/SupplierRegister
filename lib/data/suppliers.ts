import {
  SupplierOutsourcing,
  OutsourcingCategory,
  CloudServiceModel,
  DeploymentModel,
  SubstitutabilityOutcome,
  OutsourcingStatus,
  RiskLevel,
} from "@/lib/types/supplier"

/**
 * Dummy data for 5 suppliers demonstrating CSSF Circular 22/806 compliance
 * Mix of critical (3) and non-critical (2) outsourcing arrangements
 */
export const suppliers: SupplierOutsourcing[] = [
  // SUPPLIER 1: Critical - IT Infrastructure Provider
  {
    referenceNumber: "2024-001",
    status: OutsourcingStatus.ACTIVE,
    dates: {
      startDate: "2022-01-15",
      nextRenewalDate: "2025-01-15",
      serviceProviderNoticePeriod: "90 days",
      entityNoticePeriod: "180 days",
    },
    functionDescription: {
      name: "Cloud Hosting Infrastructure",
      description: "Cloud hosting infrastructure for core banking systems and customer databases",
      dataDescription: "Customer account data, transaction records, personal identification information",
      personalDataInvolved: true,
      personalDataTransferred: true,
    },
    category: OutsourcingCategory.CLOUD,
    serviceProvider: {
      name: "CloudTech Solutions S.A.",
      corporateRegistrationNumber: "B123456",
      legalEntityIdentifier: "5493001KJTIIGC8J1R12",
      registeredAddress: "15 Avenue de la Liberté, L-1931 Luxembourg",
      contactDetails: "contact@cloudtech.lu | +352 26 12 34 56",
      parentCompany: "Global CloudTech Holdings Inc.",
    },
    location: {
      servicePerformanceCountries: ["Luxembourg", "Germany", "Ireland"],
      dataLocationCountry: "Luxembourg",
      dataStorageLocation: "Luxembourg, Germany (backup)",
    },
    criticality: {
      isCritical: true,
      reasons: "Hosts critical banking infrastructure. Disruption would immediately impact customer-facing services and regulatory reporting capabilities.",
    },
    criticalityAssessmentDate: "2024-09-15",
    cloudService: {
      serviceModel: CloudServiceModel.IAAS,
      deploymentModel: DeploymentModel.PRIVATE,
      dataNature: "Customer personal data, financial transactions, account balances",
      storageLocations: ["Luxembourg (primary)", "Germany (disaster recovery)"],
      cloudOfficer: "Jean Dupont",
      resourceOperator: "CloudTech Operations S.A.",
    },
    criticalFields: {
      entitiesUsing: {
        inScopeEntities: ["BankCorp S.A.", "BankCorp Investment Services S.A."],
        groupEntities: ["BankCorp Asset Management S.A."],
      },
      groupRelationship: {
        isPartOfGroup: false,
        isOwnedByGroup: false,
      },
      riskAssessment: {
        risk: RiskLevel.HIGH,
        lastAssessmentDate: "2024-09-15",
        mainResults: "High dependency risk identified. Mitigation: Multi-cloud strategy in progress. Data encryption and access controls adequate. Exit strategy documented.",
      },
      approval: {
        approverName: "Board of Directors",
        approverRole: "Management Body",
      },
      governingLaw: "Luxembourg Law",
      audit: {
        lastAuditDate: "2024-06-20",
        nextScheduledAudit: "2025-06-20",
      },
      subOutsourcing: {
        activityDescription: "Physical data center infrastructure and network connectivity services",
        subContractors: [
          {
            name: "SecureNet Data Centers GmbH",
            registrationCountry: "Germany",
            servicePerformanceCountry: "Germany",
            dataStorageLocation: "Frankfurt, Germany",
          },
        ],
      },
      substitutability: {
        outcome: SubstitutabilityOutcome.DIFFICULT,
        reintegrationAssessment: "Reintegration would require 18-24 months and significant capital investment (estimated €5M+). Internal IT team lacks specialized expertise.",
        discontinuationImpact: "Severe impact. Would result in complete service outage for 6-12 months during migration. Regulatory reporting would be compromised.",
      },
      alternativeProviders: ["Azure Government Cloud", "AWS Financial Services", "IBM Cloud for Financial Services"],
      isTimeCritical: true,
      estimatedAnnualCost: 850000,
      costComments: "Annual cost includes infrastructure hosting, data center services, and 24/7 technical support. Cost reviewed quarterly.",
      regulatoryNotification: {
        notificationDate: "2021-11-10",
      },
    },
  },

  // SUPPLIER 2: Non-Critical - Office Cleaning Services
  {
    referenceNumber: "2024-002",
    status: OutsourcingStatus.ACTIVE,
    dates: {
      startDate: "2023-03-01",
      nextRenewalDate: "2025-03-01",
      serviceProviderNoticePeriod: "30 days",
      entityNoticePeriod: "30 days",
    },
    functionDescription: {
      name: "Office Cleaning & Maintenance",
      description: "Office cleaning and maintenance services for headquarters building",
      dataDescription: "Access to office spaces during non-business hours. No access to IT systems or documents.",
      personalDataInvolved: false,
      personalDataTransferred: false,
    },
    category: OutsourcingCategory.FACILITIES,
    serviceProvider: {
      name: "CleanPro Services Sàrl",
      corporateRegistrationNumber: "B987654",
      registeredAddress: "42 Rue de Hollerich, L-1740 Luxembourg",
      contactDetails: "info@cleanpro.lu | +352 26 98 76 54",
    },
    location: {
      servicePerformanceCountries: ["Luxembourg"],
      dataLocationCountry: "Luxembourg",
    },
    criticality: {
      isCritical: false,
      reasons: "Standard facility management. Multiple alternative providers available. No impact on core business operations or customer services.",
    },
    criticalityAssessmentDate: "2024-08-10",
  },

  // SUPPLIER 3: Critical - Payment Processing
  {
    referenceNumber: "2024-003",
    status: OutsourcingStatus.ACTIVE,
    dates: {
      startDate: "2021-06-01",
      nextRenewalDate: "2026-06-01",
      endDate: "2031-06-01",
      serviceProviderNoticePeriod: "180 days",
      entityNoticePeriod: "365 days",
    },
    functionDescription: {
      name: "Payment Processing Services",
      description: "Payment processing services for SEPA transfers, card payments, and international wire transfers",
      dataDescription: "Payment transaction data, beneficiary information, IBAN/BIC codes, transaction amounts",
      personalDataInvolved: true,
      personalDataTransferred: true,
    },
    category: OutsourcingCategory.PAYMENT_PROCESSING,
    serviceProvider: {
      name: "EuroPayments Network S.A.",
      corporateRegistrationNumber: "B555123",
      legalEntityIdentifier: "7245001KJTIIGC8J1R88",
      registeredAddress: "78 Boulevard Royal, L-2449 Luxembourg",
      contactDetails: "support@europayments.eu | +352 26 55 51 23",
      parentCompany: "EuroPayments International AG (Switzerland)",
    },
    location: {
      servicePerformanceCountries: ["Luxembourg", "Belgium", "France"],
      dataLocationCountry: "Luxembourg",
      dataStorageLocation: "Luxembourg (primary), Belgium (backup)",
    },
    criticality: {
      isCritical: true,
      reasons: "Essential for payment processing operations. Disruption would prevent customers from making payments and receiving funds. Regulatory obligation to maintain payment services.",
    },
    criticalityAssessmentDate: "2024-10-01",
    cloudService: {
      serviceModel: CloudServiceModel.SAAS,
      deploymentModel: DeploymentModel.HYBRID,
      dataNature: "Payment transaction data, customer identification for AML/KYC",
      storageLocations: ["Luxembourg", "Belgium"],
      cloudOfficer: "Pierre Martin",
      resourceOperator: "EuroPayments Cloud Services S.A.",
    },
    criticalFields: {
      entitiesUsing: {
        inScopeEntities: ["BankCorp S.A."],
      },
      groupRelationship: {
        isPartOfGroup: false,
        isOwnedByGroup: false,
      },
      riskAssessment: {
        risk: RiskLevel.MEDIUM,
        lastAssessmentDate: "2024-10-01",
        mainResults: "Medium risk. Provider is financially stable with ISO 27001 certification. Concentration risk noted - provider handles 60% of our payment volume. Business continuity plans tested annually.",
      },
      approval: {
        approverName: "Executive Committee",
        approverRole: "Senior Management",
      },
      governingLaw: "Luxembourg Law",
      audit: {
        lastAuditDate: "2024-05-10",
        nextScheduledAudit: "2025-05-10",
      },
      subOutsourcing: {
        activityDescription: "International wire transfer messaging and settlement services via SWIFT network",
        subContractors: [
          {
            name: "SWIFT Belgium",
            registrationCountry: "Belgium",
            servicePerformanceCountry: "Belgium",
            dataStorageLocation: "Brussels, Belgium",
          },
        ],
      },
      substitutability: {
        outcome: SubstitutabilityOutcome.DIFFICULT,
        reintegrationAssessment: "Reintegration feasible but complex. Would require payment license and 12-18 months implementation. Estimated cost €3M.",
        discontinuationImpact: "High impact. Would disrupt payment services for 6-9 months. Requires customer notification and regulatory approval for migration.",
      },
      alternativeProviders: ["LuxPayments S.A.", "CETREL S.A.", "SIX Payment Services"],
      isTimeCritical: true,
      estimatedAnnualCost: 420000,
      costComments: "Includes transaction processing fees, SWIFT network access, and compliance monitoring. Volume-based pricing with annual cap.",
      regulatoryNotification: {
        notificationDate: "2021-04-15",
      },
    },
  },

  // SUPPLIER 4: Non-Critical - Marketing Services
  {
    referenceNumber: "2024-004",
    status: OutsourcingStatus.NOT_YET_ACTIVE,
    dates: {
      startDate: "2024-01-10",
      nextRenewalDate: "2025-01-10",
      serviceProviderNoticePeriod: "60 days",
      entityNoticePeriod: "60 days",
    },
    functionDescription: {
      name: "Digital Marketing Services",
      description: "Digital marketing services including social media management, content creation, and email campaigns",
      dataDescription: "Marketing contact lists (names, emails, preferences), campaign performance data",
      personalDataInvolved: true,
      personalDataTransferred: false,
    },
    category: OutsourcingCategory.MARKETING,
    serviceProvider: {
      name: "Digital Reach Agency SA",
      corporateRegistrationNumber: "B778899",
      registeredAddress: "12 Rue Glesener, L-1631 Luxembourg",
      contactDetails: "hello@digitalreach.lu | +352 26 77 88 99",
    },
    location: {
      servicePerformanceCountries: ["Luxembourg", "France"],
      dataLocationCountry: "Luxembourg",
      dataStorageLocation: "Luxembourg (EU cloud servers)",
    },
    criticality: {
      isCritical: false,
      reasons: "Marketing activities are non-essential to core banking operations. Service interruption would not affect customer service delivery or regulatory compliance. Multiple alternatives available.",
    },
    criticalityAssessmentDate: "2024-07-15",
  },

  // SUPPLIER 5: Critical - Core Banking Software (SaaS)
  {
    referenceNumber: "2024-005",
    status: OutsourcingStatus.ACTIVE,
    dates: {
      startDate: "2020-09-01",
      nextRenewalDate: "2025-09-01",
      serviceProviderNoticePeriod: "12 months",
      entityNoticePeriod: "24 months",
    },
    functionDescription: {
      name: "Core Banking Platform (SaaS)",
      description: "Core banking platform providing account management, transaction processing, loan management, and regulatory reporting",
      dataDescription: "Complete customer database including accounts, transactions, loans, personal information, financial history",
      personalDataInvolved: true,
      personalDataTransferred: true,
    },
    category: OutsourcingCategory.CLOUD,
    serviceProvider: {
      name: "BankingSoft International S.A.",
      corporateRegistrationNumber: "B334455",
      legalEntityIdentifier: "5493006789IGC8J1R99",
      registeredAddress: "88 Route d'Esch, L-1470 Luxembourg",
      contactDetails: "enterprise@bankingsoft.com | +352 26 33 44 55",
      parentCompany: "BankingSoft Global Corp (USA)",
    },
    location: {
      servicePerformanceCountries: ["Luxembourg", "Ireland", "USA (support)"],
      dataLocationCountry: "Luxembourg",
      dataStorageLocation: "Luxembourg only (contractual requirement)",
    },
    criticality: {
      isCritical: true,
      reasons: "Entire core banking operations depend on this system. Manages all customer accounts, processes all transactions, generates regulatory reports. No alternative system in place.",
    },
    criticalityAssessmentDate: "2024-09-30",
    cloudService: {
      serviceModel: CloudServiceModel.SAAS,
      deploymentModel: DeploymentModel.PRIVATE,
      dataNature: "Full customer database, all financial transactions, account balances, credit information, PII",
      storageLocations: ["Luxembourg (contractually restricted)"],
      cloudOfficer: "Marie Schmidt",
      resourceOperator: "BankingSoft Cloud Services Ltd.",
    },
    criticalFields: {
      entitiesUsing: {
        inScopeEntities: ["BankCorp S.A."],
      },
      groupRelationship: {
        isPartOfGroup: false,
        isOwnedByGroup: false,
      },
      riskAssessment: {
        risk: RiskLevel.HIGH,
        lastAssessmentDate: "2024-09-30",
        mainResults: "Critical dependency risk. Provider is market leader with strong financial position. Single point of failure identified. Exit costs prohibitive (estimated €15M+). Data sovereignty controls adequate.",
      },
      approval: {
        approverName: "Board of Directors",
        approverRole: "Management Body",
      },
      governingLaw: "Luxembourg Law",
      audit: {
        lastAuditDate: "2024-08-15",
        nextScheduledAudit: "2025-02-15",
      },
      subOutsourcing: {
        activityDescription: "Cloud infrastructure hosting and managed database services for core banking platform",
        subContractors: [
          {
            name: "AWS Europe (Luxembourg) S.à r.l.",
            registrationCountry: "Luxembourg",
            servicePerformanceCountry: "Luxembourg",
            dataStorageLocation: "Luxembourg",
          },
        ],
      },
      substitutability: {
        outcome: SubstitutabilityOutcome.IMPOSSIBLE,
        reintegrationAssessment: "Not feasible. Building an in-house core banking system would require 3-5 years, €20M+ investment, and specialized team of 50+ developers. Regulatory approval would be complex.",
        discontinuationImpact: "Catastrophic. Bank would be unable to operate. All customer services would cease. Migration to alternative provider would take minimum 18-24 months.",
      },
      alternativeProviders: ["Temenos T24 (implementation required)", "Mambu (limited functionality)", "Avaloq Banking Suite"],
      isTimeCritical: true,
      estimatedAnnualCost: 1250000,
      costComments: "SaaS license includes core banking platform, regulatory reporting modules, customer portal, and dedicated support. Annual increase capped at 3%.",
      regulatoryNotification: {
        notificationDate: "2020-06-15",
      },
    },
  },
]
