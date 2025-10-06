"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/shared/theme-toggle"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Theme Showcase" },
    { href: "/register", label: "Register Example" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Settings className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground hidden sm:inline-block">
            Boilerplate Theme
          </span>
          <span className="text-lg font-bold text-foreground sm:hidden">
            BT
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary hidden md:inline-block",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Navigation - Simplified */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs font-medium transition-colors px-2 py-1 rounded-md",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.href === "/" ? "Showcase" : "Register"}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
