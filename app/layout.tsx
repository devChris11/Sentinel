import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { RootLayout as AppLayout } from "@/components/layout"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Sentinel - AI-Native Behavior Risk Intelligence Platform",
  description:
    "Advanced behavior risk intelligence powered by AI. Monitor, analyze, and respond to threats in real-time with Sentinel's comprehensive risk scoring and alerting system.",
  keywords: [
    "risk intelligence",
    "behavior analysis",
    "AI security",
    "threat detection",
    "risk scoring",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <AppLayout>{children}</AppLayout>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
