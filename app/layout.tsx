import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BEAM Landscaping - Transforming Communities Through Green Spaces',
  description: 'BEAM Landscaping creates beautiful, sustainable outdoor spaces while building stronger communities. Join us in making a difference through landscaping projects, volunteer opportunities, and donations.',
  keywords: 'landscaping, community service, volunteer, sustainable landscaping, before after photos, donations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
