import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/ui/footer'

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

        <title>ETH Unwrapped 2023</title>
        <meta name="description" content="ETH Unwrapped 2023 by Shiyas & Hashir" />

        <meta property="og:url" content="https://www.ethwrapped.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ETH Unwrapped 2023" />
        <meta property="og:description" content="ETH Unwrapped 2023 by Shiyas & Hashir" />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/documents/42e48fee-8830-4aba-a07d-4ca0372fefa7.png?token=Q8zMnp-zWhthcAybj7eyFz6L8L6GSDr2FA88iz5F3ls&height=843&width=1200&expires=33239918663" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ethwrapped.vercel.app" />
        <meta property="twitter:url" content="https://www.ethwrapped.xyz/" />
        <meta name="twitter:title" content="ETH Unwrapped 2023" />
        <meta name="twitter:description" content="ETH Unwrapped 2023 by Shiyas & Hashir" />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/documents/42e48fee-8830-4aba-a07d-4ca0372fefa7.png?token=Q8zMnp-zWhthcAybj7eyFz6L8L6GSDr2FA88iz5F3ls&height=843&width=1200&expires=33239918663" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
