import type { Metadata } from "next"
import { Poppins, Lora, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/providers/theme-provider"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Supplier Outsourcing Register - CSSF Circular 22/806 Demo",
    template: "%s | Supplier Register",
  },
  description: "A comprehensive demo showcasing CSSF Circular 22/806 compliance for financial institutions managing outsourcing arrangements. Includes all mandatory and critical-only fields with full traceability.",
  keywords: ["CSSF", "Outsourcing Register", "Luxembourg", "Financial Compliance", "Circular 22/806", "Regulatory"],
  authors: [{ name: "Demo Application" }],
  creator: "Demo Application",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    title: "Supplier Outsourcing Register - CSSF Circular 22/806 Demo",
    description: "A comprehensive demo showcasing CSSF Circular 22/806 compliance for financial institutions managing outsourcing arrangements.",
    siteName: "Supplier Outsourcing Register",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supplier Outsourcing Register - CSSF Circular 22/806 Demo",
    description: "A comprehensive demo showcasing CSSF Circular 22/806 compliance for financial institutions.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${lora.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
