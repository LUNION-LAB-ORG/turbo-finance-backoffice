// app/layout.tsx
import type { Metadata } from "next"
import { Exo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Layout from "@/components/layout/layout"

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", 
})

export const metadata: Metadata = {
  title: "Mon Application",
  description:
    "Une application Next.js avec une sidebar et navbar professionnelles",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={exo.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
