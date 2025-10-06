import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppLayout } from "@/components/layouts/app-layout"

export default function RegisterLoading() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8 md:px-8">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Registration Form Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>

            {/* Info Card Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Skeleton className="h-5 w-8" />
                    <Skeleton className="h-16 flex-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Table Skeleton */}
          <div className="mt-12">
            <div className="mb-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-32 mt-1" />
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-2 p-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
