import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import dynamic from 'next/dynamic'
import RichText from '@/components/RichText'

// Lazy load heavy components
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
})

const RenderBlocks = dynamic(() => import('@/blocks/RenderBlocks').then(mod => ({ default: mod.RenderBlocks })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-4"></div>
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config })
  
  try {
    const contactPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'contact',
        },
      },
      locale: locale as "all" | "en" | "es",
    })

    if (!contactPage.docs[0]) {
      return {
        title: 'Contact Us',
        description: 'Get in touch with our team',
      }
    }

    const { meta } = contactPage.docs[0]

    return {
      title: meta?.title || 'Contact Us',
      description: meta?.description || 'Get in touch with our team',
      openGraph: meta?.image && typeof meta.image === 'object' && 'url' in meta.image && meta.image.url
        ? {
            images: [{ url: meta.image.url }],
          }
        : undefined,
    }
  } catch (_error) {
    return {
      title: 'Contact Us',
      description: 'Get in touch with our team',
    }
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  
  try {
    const contactPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'contact',
        },
      },
      locale: locale as "all" | "en" | "es",
    })

    if (!contactPage.docs[0]) {
      notFound()
    }

    const { layout, hero } = contactPage.docs[0]

    return (
      <main>
        {/* Hero section */}
        {hero && hero.type !== 'none' && (
          <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {hero.richText && (
                   <div className="prose prose-xl mx-auto dark:prose-invert animate-fade-in-up">
                     <RichText data={hero.richText} enableGutter={false} />
                   </div>
                 )}
              </div>
            </div>
          </section>
        )}

        {/* Contact form section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="mb-12 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  We&apos;d love to hear from you. Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-700/50">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">info@restroworks.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-700/50">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phone</h3>
                      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">+1 (123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-700/50">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Address</h3>
                      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">123 Restaurant Street, Food City, FC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in-up delay-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:bg-gray-800/90 dark:border-gray-700/50">
                  <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional content blocks */}
        {layout && layout.length > 0 && (
          <div className="mt-24">
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-4"></div>}>
              <RenderBlocks blocks={layout} />
            </Suspense>
          </div>
        )}
      </main>
    )
  } catch (error) {
    console.error('Error fetching contact page:', error)
    notFound()
  }
}