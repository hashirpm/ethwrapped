import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ETH Wrapped 2023',
  description: 'ETH Wrapped 2023 by Shiyas & Hashir',
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
        <meta name="description" content="ETH Wrapped 2023 by Shiyas & Hashir" />

        <meta property="og:url" content="https://ethwrapped.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ETH Wrapped 2023" />
        <meta property="og:description" content="ETH Wrapped 2023 by Shiyas & Hashir" />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/documents/35f9c73e-6a2a-45d6-a9d2-2a74c0b2bd35.png?token=jKEP5Ffr9V0W-QvgINBsGndLs7UtS3HzRImhNdeDbX8&height=574&width=1200&expires=33239881002" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ethwrapped.vercel.app" />
        <meta property="twitter:url" content="https://ethwrapped.vercel.app/" />
        <meta name="twitter:title" content="ETH Wrapped 2023" />
        <meta name="twitter:description" content="ETH Wrapped 2023 by Shiyas & Hashir" />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/documents/35f9c73e-6a2a-45d6-a9d2-2a74c0b2bd35.png?token=jKEP5Ffr9V0W-QvgINBsGndLs7UtS3HzRImhNdeDbX8&height=574&width=1200&expires=33239881002" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
