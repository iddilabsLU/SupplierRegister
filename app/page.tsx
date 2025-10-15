import Link from "next/link"
import { AppLayout } from "@/components/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <AppLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="space-y-4">
            <Badge variant="outline" className="text-sm">
              Demo Application
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Supplier Outsourcing Register
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A comprehensive demo showcasing CSSF Circular 22/806 compliance for financial institutions
              managing outsourcing arrangements.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/suppliers">
              <Button size="lg" className="gap-2">
                View Register
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle>CSSF Compliant</CardTitle>
              <CardDescription>
                Full compliance with CSSF Circular 22/806, Section 4.2.7, covering all mandatory and
                critical-only fields.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Complete Traceability</CardTitle>
              <CardDescription>
                Every field is clearly labeled with its circular reference (e.g., 54.a, 55.b) for easy
                reconciliation with regulatory requirements.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle>Comprehensive Data</CardTitle>
              <CardDescription>
                Demonstrates both critical and non-critical outsourcing arrangements with realistic dummy data
                covering all regulatory points.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* About Section */}
        <section className="space-y-4 rounded-lg border bg-muted/50 p-8">
          <h2 className="text-2xl font-semibold">About This Demo</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              This application demonstrates a compliant supplier outsourcing register for financial institutions
              operating under CSSF supervision in Luxembourg.
            </p>
            <p>
              The register includes 5 dummy suppliers across different categories (IT infrastructure, payment
              processing, facilities management, etc.), with a mix of critical and non-critical functions.
            </p>
            <p>
              Click on the chevron icon next to any supplier to expand and view all mandatory fields (points
              54.a-54.i) and, where applicable, additional requirements for critical functions (points 55.a-55.l).
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Ready to Explore?</h2>
          <p className="text-muted-foreground">
            View the complete outsourcing register with all CSSF-required fields and references.
          </p>
          <Link href="/suppliers">
            <Button size="lg" variant="outline" className="gap-2">
              View Register
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </AppLayout>
  )
}
