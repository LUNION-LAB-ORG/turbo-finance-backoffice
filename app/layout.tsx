// app/layout.tsx
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Layout from "@/components/layout/layout"
import QueryProvider from "@/providers/query-provider"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import getQueryClient from "@/lib/get-query-client"
import { NuqsAdapter } from "nuqs/adapters/next/app";
import MountedProvider from "@/providers/mounted.provider"
import { Toaster } from "sonner"

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

  const queryClient = getQueryClient();

  return (
    <html lang="fr" className={roboto.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <Layout>
            <QueryProvider>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <NuqsAdapter>
                  <MountedProvider>
                    {children}
                  </MountedProvider>
                  <Toaster />
                </NuqsAdapter>
              </HydrationBoundary>
            </QueryProvider>
          </Layout>

        </ThemeProvider>
      </body>
    </html>
  )
}
