# Supplier Outsourcing Register

A demo application for managing supplier outsourcing arrangements in compliance with **CSSF Circular 22/806 Section 4.2.7**. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

---

## 📋 Project Overview

### Purpose
This is a **demo application** showcasing a CSSF-compliant supplier outsourcing register for Luxembourg financial institutions. The register tracks both mandatory and critical outsourcing arrangements as required by CSSF Circular 22/806 Section 4.2.7.

### Current State
- **Status**: Frontend-only demo with dummy data
- **Target Platform**: Desktop-first (mobile responsiveness not prioritized)
- **Deployment**: Vercel (accessible directly from landing page)
- **User Interaction**: To be investigated - session-based changes per user (no login) or pop-up fallback

### Target Audience
- CSSF-regulated financial institutions
- Compliance officers and risk managers
- Portfolio visitors exploring compliance solutions

### Future Development
- **Phase 2**: Desktop application packaged with Tauri + SQLite backend
- **Reasoning**: Low concurrent users, offline capability, easy implementation
- **Alternative**: Backend migration possible for client-specific requirements

---

## 🚀 Quick Start

### Development Server
```bash
$ npm run dev
```
Visit: http://localhost:3000

### Build for Production
```bash
$ npm run build
$ npm start
```

### Lint Code
```bash
$ npm run lint
```

---

## 📁 Project Structure

```
supplierregister/
├── app/
│   ├── layout.tsx               # Root layout (light mode only)
│   ├── page.tsx                 # Main supplier register page
│   ├── loading.tsx              # Loading state
│   ├── error.tsx                # Error boundary
│   ├── global-error.tsx         # Root error handler
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Theme tokens (light mode)
├── components/
│   ├── ui/                      # shadcn/ui components (25+)
│   ├── shared/                  # Custom reusable components
│   │   ├── supplier-register-table.tsx    # Main register table
│   │   ├── field-display.tsx              # CSSF-compliant field display
│   │   └── icon-badge.tsx
│   ├── layouts/                 # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── app-layout.tsx
│   └── providers/               # Context providers (theme removed)
├── lib/
│   ├── types/                   # TypeScript types
│   │   └── supplier.ts          # CSSF-compliant supplier types
│   ├── data/                    # Dummy data
│   │   └── suppliers.ts         # 5 sample suppliers (3 critical, 2 non-critical)
│   ├── utils/                   # Utility functions
│   │   ├── cn.ts                # Tailwind class merger
│   │   ├── formatters.ts        # Date, currency formatting
│   │   └── validators.ts        # Runtime validators
│   ├── validations/             # Zod schemas (for future forms)
│   └── constants.ts             # App-wide constants
├── hooks/                       # Custom React hooks
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── use-api.ts
└── public/
    ├── images/
    └── icons/
```

---

## 🏛️ CSSF Circular 22/806 Compliance

### Section 4.2.7 Requirements

This application implements the outsourcing register requirements from CSSF Circular 22/806, specifically:
- **Point 53**: Status of outsourcing arrangement
- **Point 54**: Mandatory fields for ALL outsourcing arrangements
- **Point 55**: Additional requirements for CRITICAL outsourcing functions

### Compliance Mapping

#### Mandatory Fields (Point 54) - All Suppliers

| Field Name | CSSF Point | Data Type | Implementation Path | Notes |
|------------|-----------|-----------|---------------------|-------|
| Reference Number | 54.a | `string` | `supplier.referenceNumber` | Unique identifier |
| Status | 53 | `OutsourcingStatus` enum | `supplier.status` | Active / Not Yet Active / Terminated |
| Start Date | 54.b | `string` (date) | `supplier.dates.startDate` | Required |
| Next Renewal Date | 54.b | `string?` (date) | `supplier.dates.nextRenewalDate` | Optional |
| End Date | 54.b | `string?` (date) | `supplier.dates.endDate` | Optional |
| Service Provider Notice Period | 54.b | `string?` | `supplier.dates.serviceProviderNoticePeriod` | Optional |
| Entity Notice Period | 54.b | `string?` | `supplier.dates.entityNoticePeriod` | Optional |
| Function Name | 54.c | `string` | `supplier.functionDescription.name` | Brief name |
| Function Description | 54.c | `string` | `supplier.functionDescription.description` | Detailed description |
| Data Description | 54.c | `string` | `supplier.functionDescription.dataDescription` | Description of data processed |
| Personal Data Involved | 54.c | `boolean` | `supplier.functionDescription.personalDataInvolved` | Yes/No |
| Personal Data Transferred | 54.c | `boolean` | `supplier.functionDescription.personalDataTransferred` | Yes/No |
| Category | 54.d | `OutsourcingCategory` enum | `supplier.category` | Cloud, ICT, Payment, etc. |
| Provider Name | 54.e | `string` | `supplier.serviceProvider.name` | Required |
| Corporate Registration Number | 54.e | `string` | `supplier.serviceProvider.corporateRegistrationNumber` | Required |
| Legal Entity Identifier (LEI) | 54.e | `string?` | `supplier.serviceProvider.legalEntityIdentifier` | Optional (if any) |
| Registered Address | 54.e | `string` | `supplier.serviceProvider.registeredAddress` | Required |
| Contact Details | 54.e | `string` | `supplier.serviceProvider.contactDetails` | Required |
| Parent Company | 54.e | `string?` | `supplier.serviceProvider.parentCompany` | Optional |
| Service Performance Countries | 54.f | `string[]` | `supplier.location.servicePerformanceCountries` | Array |
| Data Location Country | 54.f | `string` | `supplier.location.dataLocationCountry` | Required |
| Data Storage Location | 54.f | `string?` | `supplier.location.dataStorageLocation` | Optional |
| Is Critical | 54.g | `boolean` | `supplier.criticality.isCritical` | Yes/No |
| Criticality Reasons | 54.g | `string` | `supplier.criticality.reasons` | Justification |
| Criticality Assessment Date | 54.i | `string` (date) | `supplier.criticalityAssessmentDate` | Required |

#### Cloud Service Fields (Point 54.h) - If Applicable

| Field Name | CSSF Point | Data Type | Implementation Path | Notes |
|------------|-----------|-----------|---------------------|-------|
| Cloud Service? | 54.h | Conditional | `supplier.cloudService ? "Yes" : "No"` | Indicator |
| Service Model | 54.h | `CloudServiceModel` enum | `supplier.cloudService.serviceModel` | IaaS/PaaS/SaaS |
| Deployment Model | 54.h | `DeploymentModel` enum | `supplier.cloudService.deploymentModel` | Public/Private/Hybrid |
| Cloud Officer (if critical) | 54 | `string?` | `supplier.cloudService.cloudOfficer` | Only for critical cloud |
| Resource Operator (if critical) | 54 | `string?` | `supplier.cloudService.resourceOperator` | Only for critical cloud |
| Data Nature | 54.h | `string` | `supplier.cloudService.dataNature` | Description |
| Storage Locations | 54.h | `string[]` | `supplier.cloudService.storageLocations` | Array |

#### Critical Function Fields (Point 55) - Critical Suppliers Only

| Field Name | CSSF Point | Data Type | Implementation Path | Notes |
|------------|-----------|-----------|---------------------|-------|
| In-Scope Entities | 55.a | `string[]` | `supplier.criticalFields.entitiesUsing.inScopeEntities` | Array |
| Group Entities (if any) | 55.a | `string[]?` | `supplier.criticalFields.entitiesUsing.groupEntities` | Optional array |
| Part of Group | 55.b | `boolean` | `supplier.criticalFields.groupRelationship.isPartOfGroup` | Yes/No |
| Owned by Group | 55.b | `boolean` | `supplier.criticalFields.groupRelationship.isOwnedByGroup` | Yes/No |
| Risk | 55.c | `RiskLevel` enum | `supplier.criticalFields.riskAssessment.risk` | Low/Medium/High |
| Last Assessment Date | 55.c | `string` (date) | `supplier.criticalFields.riskAssessment.lastAssessmentDate` | Required |
| Summary Results | 55.c | `string` | `supplier.criticalFields.riskAssessment.mainResults` | Assessment summary |
| Approver Name | 55.d | `string` | `supplier.criticalFields.approval.approverName` | Required |
| Approver Role | 55.d | `string` | `supplier.criticalFields.approval.approverRole` | Required |
| Governing Law | 55.e | `string` | `supplier.criticalFields.governingLaw` | Required |
| Last Audit Date | 55.f | `string?` (date) | `supplier.criticalFields.audit.lastAuditDate` | Optional |
| Next Scheduled Audit | 55.f | `string?` (date) | `supplier.criticalFields.audit.nextScheduledAudit` | Optional |
| Activities sub-outsourced? | 55.g | Conditional | `supplier.criticalFields.subOutsourcing ? "Yes" : "No"` | Indicator |
| Activity Sub-Outsourced | 55.g | `string` | `supplier.criticalFields.subOutsourcing.activityDescription` | Description |
| Sub-Contractors | 55.g | `Array<Object>` | `supplier.criticalFields.subOutsourcing.subContractors` | Array of sub-contractor details |
| Substitutability Outcome | 55.h | `SubstitutabilityOutcome` enum | `supplier.criticalFields.substitutability.outcome` | Easy/Difficult/Impossible |
| Reintegration Assessment | 55.h | `string` | `supplier.criticalFields.substitutability.reintegrationAssessment` | Analysis |
| Discontinuation Impact | 55.h | `string` | `supplier.criticalFields.substitutability.discontinuationImpact` | Impact description |
| Alternative Providers | 55.i | `string[]` | `supplier.criticalFields.alternativeProviders` | Array |
| Time-Critical Function | 55.j | `boolean` | `supplier.criticalFields.isTimeCritical` | Yes/No |
| Estimated Annual Cost | 55.k | `number` | `supplier.criticalFields.estimatedAnnualCost` | Numeric value |
| Comments (if any) | 55.k | `string?` | `supplier.criticalFields.costComments` | Optional cost notes |
| Prior Notification Date | 55.l | `string?` (date) | `supplier.criticalFields.regulatoryNotification.notificationDate` | Optional |

**⚠️ [REVIEW REQUIRED]**: Please verify this compliance mapping matches the current implementation in `components/shared/supplier-register-table.tsx` and confirm field types are suitable for future SQLite schema.

---

## 🛠 Technology Stack

- **Framework:** Next.js 15.5.4 (App Router, Turbopack)
- **React:** 19.1.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (25+ components)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod (for future features)
- **Toasts:** Sonner
- **Theme:** Light mode only (dark mode removed)

---

## ✨ Current Features (Frontend Only)

### Supplier Register Table ✅
- **Expandable Rows**: Click anywhere on row to expand/collapse full supplier details
- **Tabbed Detail View**: Four-tab navigation system (Basic Info, Provider Details, Cloud Services, Critical Functions)
- **CSSF Annotations**: All fields labeled with circular reference points (54.a, 55.c, etc.)
- **Conditional Display**:
  - Cloud service fields only shown when applicable
  - Sub-outsourcing details only shown when applicable
  - Critical fields only shown for critical suppliers
  - "Not Applicable" placeholders with multi-line centered text
- **Actions Menu**: Edit, Duplicate, Delete with confirmation dialog (UI only - shows toast notifications)
- **User Hint**: Dismissible hint explaining how to expand rows (stored in localStorage)
- **Desktop-First Design**: Optimized for desktop viewing with enhanced text sizes
- **Dummy Data**: 5 sample suppliers (3 critical, 2 non-critical)
- **Improved Typography**: text-base (16px) for table content, text-xl (20px) for card titles, text-base for field labels/values
- **Three-Column Layout**: Reference & Status and Service Provider Information cards use 3-column grid with empty 3rd column for visual alignment

### View Navigation System ✅
- **Segmented Control**: Tab-based navigation with 3 views
  - **Register List**: Main supplier table with filtering
  - **New Entry**: Add new supplier form (placeholder - to be implemented)
  - **Dashboard**: Analytics and insights (placeholder - to be implemented)
- **Centered Layout**: Control positioned between page header and content
- **Accessible Design**: WCAG AAA contrast ratios, clear active state
- **Semantic Colors**: Uses project color tokens (primary/primary-foreground)
- **Smooth Transitions**: No layout shifts when switching between views

### Advanced Filtering System ✅
- **Quick Filters**: Toggle buttons for Critical and Cloud suppliers
- **Custom Filters** (up to 3 simultaneous):
  - Provider Name (text search)
  - Category (dropdown: Cloud, ICT, Payment, etc.)
  - Status (dropdown: Active, Not Yet Active, Terminated)
  - Service Performance Countries (text search)
  - Data Location Country (text search)
  - Data Storage Location (text search)
  - Risk (dropdown: Low/Medium/High)
  - Activities Sub-Outsourced (dropdown: Yes/No)
  - Time-Critical Function (dropdown: Yes/No)
- **Active Filter Badges**: Visual indicators showing all active filters with individual remove buttons
- **Filter Counter**: Shows number of active filters in collapsible panel header
- **Clear All**: Reset all filters with one click
- **Empty State**: Friendly message when no suppliers match filters
- **Auto-Add Logic**: Automatically adds new filter row when all existing rows are filled (max 3)
- **Contextual Display**: Filters only visible on Register List view

### Landing Page ✅
- **Hero Section**: Clean introduction with demo badge
- **Feature Cards**: Highlights CSSF compliance, traceability, and comprehensive data
- **About Section**: Explains the demo purpose and how to use the register
- **Direct Link**: "View Register" button navigates to `/suppliers`

### Data Model
- **Type-Safe**: Fully typed with TypeScript enums and interfaces
- **Enums**:
  - `OutsourcingCategory`: Cloud, ICT, Payment Processing, etc.
  - `CloudServiceModel`: IaaS, PaaS, SaaS
  - `DeploymentModel`: Public, Private, Hybrid, Community
  - `OutsourcingStatus`: Active, Not Yet Active, Terminated
  - `RiskLevel`: Low, Medium, High
  - `SubstitutabilityOutcome`: Easy, Difficult, Impossible
- **Filter Types**: Comprehensive filter field types with validation (`lib/types/filters.ts`)

### Compliance Display
- **Mandatory/Critical Distinction**: Clear separation between required fields for all vs. critical suppliers
- **Conditional Sections**: "Cloud Service? Yes/No" and "Activities sub-outsourced? Yes/No" indicators
- **Field Annotations**: All field labels include CSSF point references
- **Risk Badges**: Color-coded badges for risk levels (Low=secondary, Medium=default, High=destructive)
- **Status Badges**: Visual indicators for Active/Not Yet Active/Terminated status
- **Critical Badge**: Destructive variant badge for critical functions

---

## 🚧 Remaining Features & Roadmap

### Phase 1 (Frontend Enhancements) - IN PROGRESS

**Completed:**
- ✅ View Navigation System (Segmented control with Register List / New Entry / Dashboard tabs)
- ✅ Quick Filters (Critical, Cloud)
- ✅ Custom Filters (9 filter fields, max 3 simultaneous)
- ✅ Filter UI with collapsible panel
- ✅ Active filter badges with remove buttons
- ✅ Contextual filtering (only shown on Register List view)
- ✅ Empty state when no results
- ✅ Actions menu (UI only - Edit, Duplicate, Delete)
- ✅ Delete confirmation dialog
- ✅ Toast notifications
- ✅ Code quality cleanup (ESLint warnings fixed)
- ✅ Accessibility improvements (WCAG AAA contrast)
- ✅ UI text size improvements (increased readability across all components)
- ✅ Three-column card layout with visual alignment
- ✅ Enhanced segmented control spacing and sizing
- ✅ Multi-line text wrapping for "Not Applicable" placeholders

**Next Steps:**
1. **Add Supplier Form** (High Priority)
   - Multi-step form with validation (React Hook Form + Zod)
   - Step 1: Basic Info (reference, provider, function)
   - Step 2: Dates & Location
   - Step 3: Criticality Assessment
   - Step 4: Cloud Service (conditional)
   - Step 5: Critical Fields (conditional)
   - Preview before submission
   - Store in client-side state (sessionStorage or React Context)

2. **Edit Supplier** (High Priority)
   - Reuse add form with pre-filled data
   - Update supplier in client-side state

3. **Duplicate Supplier** (Medium Priority)
   - Clone supplier data
   - Auto-increment reference number
   - Open in edit mode

4. **Export Functionality** (Medium Priority)
   - Export to Excel (.xlsx) using SheetJS or similar
   - Export to PDF using jsPDF or react-pdf
   - Export filtered results only
   - Include all CSSF fields with proper labels

5. **Data Persistence** (Medium Priority)
   - Session-based state management (per-user session without login)
   - Option 1: sessionStorage (simple, temporary)
   - Option 2: localStorage (persistent across sessions)
   - Option 3: Demo pop-up on first add/delete explaining limitations

6. **Dashboard/Analytics** (Low Priority)
   - Pie chart: Critical vs Non-Critical
   - Bar chart: Suppliers by Category
   - Risk distribution chart
   - Cloud services overview
   - Timeline of upcoming renewals/audits

7. **Enhanced UX** (Low Priority)
   - Sort table columns (provider name, status, criticality, risk)
   - Column visibility toggle
   - Bulk actions (select multiple, delete multiple)
   - Print-friendly view

### Phase 2 (Offline Desktop App) - FUTURE

**Not Started:**
- **Tauri Packaging**: Desktop application for Windows/Mac/Linux
- **SQLite Backend**: Local database for persistent storage
- **Full CRUD Operations**: Add, edit, delete suppliers offline (functional)
- **Data Import**: Import from Excel/CSV
- **Backup/Restore**: Export full database, restore from backup
- **Multi-user Support**: User profiles with separate data

### User Interaction Decision
**Current Plan**: Implement session-based state (sessionStorage) with a demo banner explaining:
- "This is a demo. Changes are temporary and lost when you close the tab."
- "Download the desktop version for persistent data storage."
- Banner appears on first add/edit/delete action
- Can be dismissed and stored in localStorage

---

## 🎨 Theme & Styling

### Color System
The project uses custom oklch color tokens defined in `app/globals.css` (light mode only):

**Light Mode (`:root`):**
- `--background`: #F9FAFB (soft gray)
- `--foreground`: #1C1C1C (near black)
- `--primary`: #2D3E50 (ink blue)
- `--secondary`: #E6E2DA (warm beige)
- `--muted`: #F3F4F6 (light gray)
- `--accent`: #E6E2DA (matches secondary)
- `--destructive`: #D92D20 (red)

### Customizing Colors
Edit the `:root` section in `app/globals.css` to customize the color palette. All components automatically inherit these tokens via CSS variables.

---

## 🧩 Component Organization

### UI Components (`components/ui/`)
shadcn/ui components installed via CLI. **Don't edit directly** unless customizing globally.

**Installed Components:**
- accordion, alert, badge, button, card, checkbox, dialog, input, label, select, separator, skeleton, table, tabs, textarea, tooltip, form, sonner

**Adding More Components:**
```bash
$ npx shadcn@latest add <component-name>
```

### Shared Components (`components/shared/`)
Custom reusable components specific to this project:
- `supplier-register-table.tsx` - Main CSSF-compliant register table with expand/collapse
- `supplier-detail-tabs.tsx` - Tabbed interface for supplier details (Basic Info, Provider Details, Cloud Services, Critical Functions)
- `supplier-detail-tab-nav.tsx` - Tab navigation bar with enhanced spacing (max-w-5xl, gap-1, px-4 py-2)
- `supplier-basic-info.tsx` - Basic Info tab content (4 cards with 3-column layout)
- `supplier-provider-details.tsx` - Provider Details tab content (2 cards with 3-column layout)
- `supplier-cloud-services.tsx` - Cloud Services tab content (conditional display)
- `supplier-critical-functions.tsx` - Critical Functions tab content (Point 55 fields)
- `field-display.tsx` - Displays fields with CSSF annotations (text-base labels/values)
- `not-applicable-placeholder.tsx` - N/A placeholder with multi-line centered text
- `icon-badge.tsx` - Icon container with variants
- `view-segmented-control.tsx` - Tab navigation control (Register List / New Entry / Dashboard)
- `placeholder-view.tsx` - Reusable "Coming Soon" placeholder for future features
- `filter-panel.tsx` - Collapsible filter panel with quick and custom filters
- `quick-filters.tsx` - Critical and Cloud toggle buttons
- `custom-filter-row.tsx` - Individual filter row with field/value inputs
- `active-filter-badges.tsx` - Display active filters as removable badges
- `data-table.tsx` - Generic data table component (from boilerplate)
- `file-upload.tsx` - File upload component (from boilerplate)
- `theme-toggle.tsx` - Theme toggle component (legacy, dark mode removed)

### Layout Components (`components/layouts/`)
- `header.tsx` - Application header (light mode, dark theme toggle removed)
- `footer.tsx` - Application footer
- `app-layout.tsx` - Main layout wrapper

---

## 📋 Development Patterns

### Forms with Validation (For Future Features)
```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  referenceNumber: z.string().min(1, "Reference number required"),
  providerName: z.string().min(2, "Provider name required"),
})

export function SupplierForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { referenceNumber: "", providerName: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference Number (54.a)</FormLabel>
              <FormControl>
                <Input placeholder="OUT-2024-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Toast Notifications
```tsx
import { toast } from "sonner"

// Success
toast.success("Supplier added successfully!")

// Error
toast.error("Failed to add supplier")

// Info
toast.info("Changes saved locally")
```

### Icons with Theme Colors
```tsx
import { FileText, Building2, AlertTriangle } from "lucide-react"

// Icons inherit color via className
<FileText className="h-4 w-4 text-primary" />
<Building2 className="h-6 w-6 text-muted-foreground" />
<AlertTriangle className="h-5 w-5 text-destructive" />
```

---

## 🔧 Deployment & Integration

### Current Deployment
- **Platform**: Vercel
- **Access**: Direct navigation from landing page (not iframe)
- **URL Structure**: TBD - needs to be determined for landing page integration

### Future Deployment (Offline App)
- **Desktop App**: Tauri packaging with SQLite
- **Distribution**: Downloadable installer for Windows/Mac/Linux
- **Data**: Fully offline, no cloud dependency

---

## 📦 Scripts Summary

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 💡 Development Tips

1. **Desktop-First**: Design and test for desktop screens first, mobile not prioritized
2. **Color Tokens**: Use semantic tokens (`text-foreground`, `bg-primary`) not hardcoded colors
3. **CSSF References**: Always include circular point references in field labels
4. **Component Composition**: Build complex UIs from small shadcn components
5. **Validation**: Use Zod schemas for all future form validation
6. **Accessibility**: shadcn components are accessible by default, maintain this standard
7. **Error Handling**: Error boundaries automatically catch errors in route segments
8. **Type Safety**: Leverage TypeScript enums for CSSF-compliant data structures

---

## 🔗 Useful Links

- [CSSF Circular 22/806](https://www.cssf.lu/en/Document/circular-cssf-22-806/)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [Tauri Docs](https://tauri.app/v1/guides/) (for future offline version)

---

## 🐛 Known Issues

### Functional (Non-Critical)
- Delete action shows toast but doesn't actually remove supplier from state (intentional - demo only)
- Edit action shows toast but doesn't open form (not yet implemented)
- Duplicate action shows toast but doesn't clone supplier (not yet implemented)

---

## 📊 Project Metrics

- **Total Components**: 40+ (25+ shadcn/ui + 15+ custom)
- **Lines of Code**: ~3,500+ (excluding dependencies)
- **TypeScript Coverage**: 100%
- **Build Status**: ✅ Successful (no ESLint warnings)
- **Bundle Size**: TBD (run `npm run build` and check `.next/analyze`)
- **Lighthouse Score**: TBD (test on Vercel deployment)

---

**Last Updated:** 2025-10-21
**Project Status:** Phase 1 - Frontend Demo (88% Complete)
**Recent Updates:** UI text size improvements, three-column card layout, enhanced segmented control spacing, multi-line placeholder text
**Next Priority:** Add/Edit Supplier Form Implementation (to replace "New Entry" placeholder)
**Future Phase:** Desktop application with Tauri + SQLite

**Created with Claude Code**
