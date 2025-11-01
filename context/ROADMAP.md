# Product Roadmap

This document outlines the planned features and priorities for the Supplier Register application.

---

## Current Status

**Phase 1: Frontend Demo - 100% COMPLETE** ✅

### What's Working:
- ✅ Supplier Register Table with expand/collapse rows
- ✅ 4-tab detail view (Basic Info, Provider, Cloud, Critical)
- ✅ **Add Supplier Form** - Complete 4-tab form with all 73 CSSF fields
- ✅ **Edit Supplier Form** - Edit existing suppliers with pre-filled data
- ✅ **Delete Supplier** - Remove suppliers with confirmation dialog and toast notification
- ✅ **Duplicate Supplier** - Instantly clone suppliers with new reference number and Draft status
- ✅ **Data Persistence** - sessionStorage saves changes across page refreshes (within session)
- ✅ **Pending Fields Feature** - Mark incomplete fields, skip validation, amber badges
- ✅ **Form Validation** - Two-layer system (see `VALIDATION.md`)
- ✅ **Save as Draft** - Auto-marks empty required fields as pending
- ✅ **Filtering System** - Quick filters, custom filters, global text search with highlighting
- ✅ **View Navigation** - Segmented control (Register List / New Entry / Dashboard)
- ✅ **CSSF Compliance** - All 73 fields from Circular 22/806 Points 53, 54, 55

### What's NOT Working:
- ❌ **Dashboard View** - Placeholder only (Coming Soon message)

---

## Phase 1: Frontend Completion

### 1. Data Persistence (HIGH PRIORITY) 🔥

**Goal:** Preserve supplier data across page refreshes

**Options:**

#### Option A: `sessionStorage` (Recommended for Demo)
**Pros:**
- Simple implementation
- Data persists within browser session
- Automatic cleanup when tab closes
- Perfect for demo "try it out" experience

**Cons:**
- Data lost when tab closed
- Not shared across tabs
- Maximum 5-10MB storage

**Implementation:**
```typescript
// lib/utils/session-storage.ts
export function saveSuppliers(suppliers: SupplierOutsourcing[]) {
  sessionStorage.setItem("suppliers", JSON.stringify(suppliers))
}

export function loadSuppliers(): SupplierOutsourcing[] {
  const stored = sessionStorage.getItem("suppliers")
  return stored ? JSON.parse(stored) : defaultSuppliers
}

// Use in components:
const [suppliers, setSuppliers] = useState<SupplierOutsourcing[]>(() => loadSuppliers())

useEffect(() => {
  saveSuppliers(suppliers)
}, [suppliers])
```

#### Option B: `localStorage` (Alternative)
**Pros:**
- Data persists across sessions
- Survives browser restart
- Shared across tabs (same domain)

**Cons:**
- Data persists indefinitely (might confuse demo users)
- No automatic cleanup
- Could conflict with future authentication

**Implementation:** Same as sessionStorage, just replace `sessionStorage` with `localStorage`

#### Option C: Demo Banner (User Education)
**Combine with either storage option:**

```tsx
// components/shared/demo-banner.tsx
"This is a demo. Changes are saved in your browser session only.
When you close this tab, all data will be lost.
Download the desktop version for persistent storage."

[Dismiss] [Learn More]
```

**Show banner:**
- On first add/edit/delete action
- Can be dismissed (store in localStorage)
- Reappears on browser restart

**Recommended Approach:** Option A (sessionStorage) + Option C (Demo Banner)

**Files to Create:**
- `lib/utils/session-storage.ts` - Storage helper functions
- `components/shared/demo-banner.tsx` - User education banner
- `hooks/use-session-storage.ts` - React hook for storage

**Files to Modify:**
- `app/page.tsx` - Load suppliers from sessionStorage on mount
- `components/shared/supplier-register-table.tsx` - Save on add/edit/delete

**Estimated Effort:** 1-2 hours

---

### 2. Duplicate Supplier (MEDIUM PRIORITY)

**Goal:** Clone existing supplier with new reference number

**Implementation:**
- Deep clone supplier data
- Auto-generate next reference number
- Clear pending fields (start fresh)
- Open in Edit mode with pre-filled data
- Allow user to modify before saving

**User Flow:**
```
1. User clicks "Duplicate" button in actions menu
2. System clones supplier data
3. System generates new reference: "2024-006"
4. Clears pending fields array (fresh start)
5. Opens form in "Add Mode" with pre-filled data
6. Form title: "Duplicate Supplier - Based on {originalRef}"
7. User modifies fields as needed
8. User clicks "Save Supplier"
9. New supplier added to table
```

**Files to Modify:**
- `components/shared/supplier-register-table.tsx` - Wire up Duplicate button
- `components/shared/forms/supplier-form.tsx` - Support duplicate mode

**Estimated Effort:** 1 hour

---

### 3. Delete Supplier (MEDIUM PRIORITY)

**Goal:** Remove supplier from register

**Implementation:**
- Show confirmation dialog with supplier details
- Remove from client-side state
- Show success toast
- If using storage, persist updated list

**User Flow:**
```
1. User clicks "Delete" button in actions menu
2. Confirmation dialog appears:
   "Are you sure you want to delete supplier {referenceNumber}?
    Provider: {providerName}
    This action cannot be undone."
   [Cancel] [Delete]
3. If "Delete" clicked → remove from state
4. Toast: "Supplier {referenceNumber} deleted successfully"
```

**Files to Modify:**
- `components/shared/supplier-register-table.tsx` - Wire up Delete button

**Estimated Effort:** 30 minutes (mostly done, just needs state update)

---

### 4. Dashboard View (LOW PRIORITY)

**Goal:** Analytics and insights for compliance officers

**Planned Features:**

#### Key Metrics Cards
- Total Suppliers
- Critical Functions (count + percentage)
- Cloud Services (count + percentage)
- Suppliers with Pending Fields

#### Charts
1. **Pie Chart: Critical vs Non-Critical**
   - Visual breakdown of critical suppliers
   - Color-coded: Destructive (critical), Secondary (non-critical)

2. **Bar Chart: Suppliers by Category**
   - X-axis: Category (Cloud, ICT, Payment, etc.)
   - Y-axis: Count
   - Color: Primary

3. **Bar Chart: Risk Distribution**
   - X-axis: Risk Level (Low, Medium, High)
   - Y-axis: Count (critical suppliers only)
   - Color: Risk badges (secondary, default, destructive)

4. **Timeline: Upcoming Renewals/Audits**
   - Next 3 months
   - List view with dates
   - Sort by urgency

#### Filters
- Show stats for filtered results only
- Update charts when filters applied
- "Export Dashboard" button (PDF)

**Libraries to Use:**
- **Recharts** (recommended) - React charting library, integrates with Tailwind
- **Chart.js** (alternative) - Popular, well-documented

**Files to Create:**
- `components/shared/dashboard/dashboard-view.tsx` - Main dashboard container
- `components/shared/dashboard/metrics-cards.tsx` - Key metrics grid
- `components/shared/dashboard/charts/*.tsx` - Individual chart components

**Estimated Effort:** 4-6 hours

---

### 5. Export Functionality (MEDIUM PRIORITY)

**Goal:** Export supplier data to Excel/PDF

#### Excel Export (.xlsx)
**Library:** SheetJS (xlsx)

**Features:**
- Export all suppliers or filtered results
- One row per supplier
- All 73 CSSF fields as columns
- Column headers with CSSF references (e.g., "Provider Name (54.e)")
- Conditional columns (Cloud/Critical fields)
- Auto-column width
- Header row bold + background color

**Implementation:**
```typescript
import * as XLSX from 'xlsx'

function exportToExcel(suppliers: SupplierOutsourcing[]) {
  const data = suppliers.map(supplier => ({
    'Reference Number (54.a)': supplier.referenceNumber,
    'Status (53)': supplier.status,
    'Provider Name (54.e)': supplier.serviceProvider.name,
    // ... map all 73 fields
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers')
  XLSX.writeFile(workbook, 'supplier-register.xlsx')
}
```

#### PDF Export
**Library:** jsPDF + jsPDF-AutoTable (recommended) or react-pdf

**Features:**
- Export all suppliers or filtered results
- Table format with all fields
- Multi-page support
- Header: "CSSF Supplier Outsourcing Register"
- Footer: Page numbers, export date
- Conditional sections (show Cloud/Critical only if applicable)

**Implementation:**
```typescript
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function exportToPDF(suppliers: SupplierOutsourcing[]) {
  const doc = new jsPDF({ orientation: 'landscape' })

  doc.text('CSSF Supplier Outsourcing Register', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22)

  const tableData = suppliers.map(s => [
    s.referenceNumber,
    s.serviceProvider.name,
    s.category,
    s.status,
    s.criticality.isCritical ? 'Yes' : 'No',
    // ... key fields
  ])

  autoTable(doc, {
    head: [['Ref', 'Provider', 'Category', 'Status', 'Critical', ...]],
    body: tableData,
    startY: 25,
  })

  doc.save('supplier-register.pdf')
}
```

**Files to Create:**
- `lib/utils/export-excel.ts` - Excel export logic
- `lib/utils/export-pdf.ts` - PDF export logic
- `components/shared/export-menu.tsx` - Export dropdown button

**Files to Modify:**
- `components/shared/supplier-register-table.tsx` - Add export button

**Estimated Effort:** 3-4 hours (Actual: ~4 hours)

**Status:** ✅ COMPLETED (2025-10-31)
- Excel export: Summary (8 columns) + Full (52 fields) ✅
- PDF export: Summary (8 columns) only ✅
- Full PDF intentionally removed (layout too messy for 52 fields)
- Both formats support filtered results
- Export feature complete (Phase 1-4 of ExportFunctionPlan.md)

---

## Phase 2: Offline Desktop Application (FUTURE)

**Not started yet. Planned for Q2 2025 or later.**

### Goals:
- Package web app as desktop application
- Add local SQLite database
- Support full CRUD operations offline
- Multi-user support with user profiles
- Data import/export (Excel, CSV)
- Automatic backups

### Technology Stack:
- **Tauri** - Rust-based desktop framework
- **SQLite** - Local database
- **Prisma** or **Drizzle ORM** - Database access
- **Existing Next.js frontend** - Reuse 100% of current UI

### Migration Strategy:
1. Create Tauri project shell
2. Integrate Next.js build as frontend
3. Design SQLite schema (1:1 mapping to TypeScript types)
4. Implement backend API (Rust or Node.js)
5. Replace sessionStorage with API calls
6. Add user authentication (optional)
7. Create installers (Windows, Mac, Linux)

### Estimated Effort: 2-3 weeks

---

## Future Enhancements (Backlog)

### User Experience
- **Sort table columns** - Click column headers to sort
- **Column visibility toggle** - Show/hide columns
- **Bulk actions** - Select multiple suppliers, delete/export in bulk
- **Print view** - Print-friendly table format
- **Keyboard shortcuts** - Power user navigation

### Compliance Features
- **Audit trail** - Track all changes to suppliers (who, when, what changed)
- **Version history** - Revert to previous versions
- **Approval workflow** - Require manager approval for critical suppliers
- **Reminders** - Email notifications for upcoming renewals/audits
- **Risk monitoring** - Flag suppliers with overdue audits

### Data Management
- **Import from Excel** - Bulk import suppliers
- **Data validation rules** - Custom business rules per field
- **Duplicate detection** - Warn when adding similar suppliers
- **Archive suppliers** - Soft delete instead of hard delete

### Integration
- **API access** - RESTful API for third-party integrations
- **Webhook notifications** - Real-time updates
- **CSSF reporting** - Direct export to CSSF format
- **Active Directory integration** - Corporate user management

---

## Priority Matrix

| Feature | Priority | Effort | Impact | Status |
|---------|----------|--------|--------|--------|
| Edit Supplier | 🔥 High | 2h | High | ✅ Done |
| Data Persistence | 🔥 High | 1-2h | High | ✅ Done |
| Delete Supplier | 🔸 Medium | 30m | Medium | ✅ Done |
| Duplicate Supplier | 🔸 Medium | 1h | Medium | ✅ Done |
| Export (Excel/PDF) | 🔸 Medium | 3-4h | Medium | ✅ Done |
| Dashboard View | 🔹 Low | 4-6h | Medium | Pending |
| Desktop App (Tauri) | 🔹 Future | 2-3w | High | Not Started |

---

## Next Steps (Immediate)

**Phase 1 is COMPLETE!** All planned frontend features implemented.

### Step 1: Dashboard View (Optional - Next Priority)
1. Create metrics cards (total, critical, cloud, pending)
2. Add charts (Recharts recommended)
3. Implement filter integration
4. Add PDF export option

### Step 2: Phase 2 Planning (Future)
1. Design Tauri desktop app architecture
2. Plan SQLite database schema
3. Migrate frontend to desktop
4. Add local persistence layer

---

**Last Updated:** 2025-10-31
**Phase Status:** Phase 1 - 100% Complete ✅
**Next Priority:** Dashboard View (Optional)
**Related Files:** CLAUDE.md, VALIDATION.md, ARCHITECTURE.md
