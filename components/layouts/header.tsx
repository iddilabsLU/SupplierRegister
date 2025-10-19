"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navItems: { href: string; label: string }[] = []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-primary">
      <div className="flex h-12 items-center justify-between px-8">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Package className="h-5 w-5 text-primary-foreground" />
          <span className="text-base font-bold text-primary-foreground">
            Supplier Register
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
