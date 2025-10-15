import { AppLayout } from "@/components/layouts/app-layout"
import { SupplierRegisterTable } from "@/components/shared/supplier-register-table"
import { suppliers } from "@/lib/data/suppliers"
import { Badge } from "@/components/ui/badge"

export default function SuppliersPage() {
  const criticalCount = suppliers.filter((s) => s.criticality.isCritical).length
  const nonCriticalCount = suppliers.length - criticalCount

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Supplier Outsourcing Register</h1>
            <p className="text-muted-foreground">
              Compliance with CSSF Circular 22/806 (as amended by Circular CSSF 25/883), Section 4.2.7
            </p>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">{suppliers.length}</div>
              <div className="text-sm text-muted-foreground">Total Suppliers</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{criticalCount}</div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Critical Functions</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{nonCriticalCount}</div>
                <Badge variant="secondary">Non-Critical</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Non-Critical Functions</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Click the <span className="font-medium text-foreground">chevron icon (▶)</span> to expand a row and
              view all mandatory and critical-only fields. Each field is labeled with its corresponding circular
              reference (e.g., 54.a, 55.b) for traceability.
            </p>
          </div>
        </div>

        {/* Register Table */}
        <SupplierRegisterTable suppliers={suppliers} />
      </div>
    </AppLayout>
  )
}
