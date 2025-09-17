// app/layout.tsx
import type { Metadata } from "next"
  import { Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Layout from "@/components/layout/layout"


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", 
})

export const metadata: Metadata = {
  title: "Turbo Finance",
  description:
    "Gestion financière de turbo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={roboto.className} suppressHydrationWarning>
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
