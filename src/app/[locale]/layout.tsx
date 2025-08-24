import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WebVitals } from '@/components/Analytics/WebVitals'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    template: '%s | RestroWorks CMS',
    default: 'RestroWorks CMS - Modern Restaurant Management System',
  },
  description: 'A modern, multilingual restaurant management system built with Next.js and PayloadCMS. Manage your restaurant operations efficiently with our comprehensive CMS solution.',
  keywords: ['restaurant management', 'CMS', 'Next.js', 'PayloadCMS', 'multilingual', 'modern web app'],
  authors: [{ name: 'RestroWorks Team' }],
  creator: 'RestroWorks',
  publisher: 'RestroWorks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: mergeOpenGraph({
    title: 'RestroWorks CMS - Modern Restaurant Management System',
    description: 'A modern, multilingual restaurant management system built with Next.js and PayloadCMS.',
    url: '/',
    siteName: 'RestroWorks CMS',
    images: [
      {
        url: '/website-template-OG.webp',
        width: 1200,
        height: 630,
        alt: 'RestroWorks CMS - Modern Restaurant Management System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'RestroWorks CMS - Modern Restaurant Management System',
    description: 'A modern, multilingual restaurant management system built with Next.js and PayloadCMS.',
    images: ['/website-template-OG.webp'],
    creator: '@restroworks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config })
  
  // Fetch header and footer data with localization
  const [headerData, footerData] = await Promise.all([
    payload.findGlobal({
      slug: 'header',
      locale: locale as "all" | "en" | "es",
    }),
    payload.findGlobal({
      slug: 'footer',
      locale: locale as "all" | "en" | "es",
    }),
  ])

  return (
    <ErrorBoundary>
      <Providers>
        {/* Skip navigation link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header header={headerData} />
        <main id="main-content" className="flex-grow">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer footer={footerData} />
        <WebVitals />
      </Providers>
    </ErrorBoundary>
  )
}