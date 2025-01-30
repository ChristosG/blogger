// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/Header'
import React from 'react'
import ClientLayout from '@/components/ClientLayout'
import Footer from '../components/Footer'
import Providers from './providers/ThemeProvider'
import { ScrollProvider } from '@/context/ScrollContext';

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
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen flex flex-col bg-[#E6E7EA] dark:bg-[#171C26]">
        <Providers>
          <ScrollProvider>
            <Header />
            <main className="flex-1 flex ">
              <ClientLayout>{children}</ClientLayout>
            </main>
            <Footer />
          </ScrollProvider>
        </Providers>
      </body>
    </html>
  );
}