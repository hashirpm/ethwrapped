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
      <script
        type="module"
        defer
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
      ></script>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
