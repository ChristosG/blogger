import './globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import Header from '../components/Header';
import React from 'react';
import ClientLayout from '@/components/ClientLayout'; 
import Footer from '../components/Footer';
import Providers from './providers/ThemeProvider';

// Example Google Font
// const inter = Inter({ subsets: ['latin'] });

// You can configure default SEO metadata here
export const metadata: Metadata = {
  title: 'Coding Blog',
  description: 'A blog about coding, AI, and tutorials',
  // Example of open graph / social preview
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="h-full">
      {/* 
        'dark' class can be toggled by next-themes. 
        We add "h-full" so the html element spans full height.
        #24344E
        #182233   0F1319  171C26  1a1e2c
      */} 
      <body className="flex flex-col h-full
          bg-[#E6E7EA] text-gray-900 
          dark:bg-[#171C26] dark:text-gray-100 
          transition-colors font-sans antialiased">  
        <Providers>
          {/* Header with Light/Dark toggle */}
          <Header />
          {/* Main content grows to fill leftover space, pushing footer to the bottom */}
           <ClientLayout>{children}</ClientLayout>
          {/* Footer pinned at bottom if not enough content */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
