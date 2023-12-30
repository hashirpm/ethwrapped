import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/ui/footer'
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ETH Unwrapped 2023',
  description: 'ETH Unwrapped 2023 by Shiyas & Hashir',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>


        <title>ETH Wrapped 2023</title>
        <meta name="description" content="ETH Wrapped 2023 | Built by XDev" />

        <meta property="og:url" content="https://www.ethwrapped.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ETH Wrapped 2023" />
        <meta property="og:description" content="ETH Wrapped 2023 | Built by XDev" />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/documents/c44451d3-7012-4c9e-88ea-813329be06e1.png?token=M0YaKkhxfy58Vn2x_EWDueSZcK5Rj8kbC0p7WzoW0GQ&height=770&width=1200&expires=33239920044" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ethwrapped.xyz" />
        <meta property="twitter:url" content="https://www.ethwrapped.xyz/" />
        <meta name="twitter:title" content="ETH Wrapped 2023" />
        <meta name="twitter:description" content="ETH Wrapped 2023 | Built by XDev" />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/documents/c44451d3-7012-4c9e-88ea-813329be06e1.png?token=M0YaKkhxfy58Vn2x_EWDueSZcK5Rj8kbC0p7WzoW0GQ&height=770&width=1200&expires=33239920044" />

      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
