import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { homeStatic } from '@/endpoints/seed/home-static'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config })
  
  try {
    const homePage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      locale: locale as "all" | "en" | "es",
    })

    // Use static fallback data if no home page is found in database
    let pageData = homePage.docs[0]
    if (!pageData) {
      pageData = homeStatic as any
    }

    const { meta } = pageData

    return {
      title: meta?.title || 'Home',
      description: meta?.description || 'Welcome to our website',
      openGraph: meta?.image && typeof meta.image === 'object' && meta.image.url
        ? {
            images: [{ url: meta.image.url }],
          }
        : undefined,
    }
  } catch (_error) {
    return {
      title: 'Home',
      description: 'Welcome to our website',
    }
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  
  try {
    const homePage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      locale: locale as "all" | "en" | "es",
    })

    // Use static fallback data if no home page is found in database
    let pageData = homePage.docs[0]
    if (!pageData) {
      pageData = homeStatic as any
    }

    const { layout, hero } = pageData

    return (
      <main>
        {/* Hero section */}
        {hero && hero.type !== 'none' && (
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                {hero.richText && (
                  <div className="prose prose-lg mx-auto dark:prose-invert text-white">
                    <RichText data={hero.richText} enableGutter={false} />
                  </div>
                )}
                {hero.links && hero.links.length > 0 && (
                  <div className="mt-8 space-x-4">
                    {hero.links.map((linkItem, index) => (
                      <CMSLink
                        key={index}
                        {...linkItem.link}
                        appearance="default"
                        size="lg"
                        className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Content blocks */}
        {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
      </main>
    )
  } catch (error) {
    console.error('Error fetching home page:', error)
    notFound()
  }
}