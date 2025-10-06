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
    default: "Boilerplate Theme - Next.js + shadcn/ui",
    template: "%s | Boilerplate Theme",
  },
  description: "A production-ready Next.js boilerplate with shadcn/ui, Tailwind CSS, TypeScript, and dark mode support.",
  keywords: ["Next.js", "React", "TypeScript", "shadcn/ui", "Tailwind CSS", "Boilerplate"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    title: "Boilerplate Theme - Next.js + shadcn/ui",
    description: "A production-ready Next.js boilerplate with shadcn/ui, Tailwind CSS, TypeScript, and dark mode support.",
    siteName: "Boilerplate Theme",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boilerplate Theme - Next.js + shadcn/ui",
    description: "A production-ready Next.js boilerplate with shadcn/ui, Tailwind CSS, TypeScript, and dark mode support.",
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
