import { Header } from "./header"
import { Footer } from "./footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-8">{children}</main>
      <Footer />
    </div>
  )
}
