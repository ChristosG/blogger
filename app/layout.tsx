// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/Header'
import React from 'react'
import ClientLayout from '@/components/ClientLayout'
import Footer from '../components/Footer'
import Providers from './providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Coding Blog',
  description: 'A blog about coding, AI, and tutorials',
  openGraph: {
    title: 'Coding Blog',
    description: 'A blog about coding, AI, and tutorials',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://your-domain.com/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className="
          flex flex-col
          w-full min-h-screen
          bg-[#E6E7EA] text-gray-900
          dark:bg-[#171C26] dark:text-gray-100
          transition-colors antialiased
        "
      >
        <Providers>
          <Header />
          {/* Make sure ClientLayout does NOT center or max-width its children */}
          <main className="flex-1 flex overflow-hidden">
          <ClientLayout>{children}</ClientLayout> </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

