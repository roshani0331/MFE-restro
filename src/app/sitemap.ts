import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const locales = ['en', 'es']
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  try {
    // Get all published pages and posts
    const [pagesResponse, postsResponse] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: {
          _status: {
            equals: 'published',
          },
        },
        limit: 1000,
      }),
      payload.find({
        collection: 'posts',
        where: {
          _status: {
            equals: 'published',
          },
        },
        limit: 1000,
      }),
    ])
    
    // Add home pages for each locale
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      })
    })
    
    // Add all other pages for each locale
    pagesResponse.docs.forEach(page => {
      if (page.slug && page.slug !== 'home') {
        locales.forEach(locale => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/${page.slug}`,
            lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          })
        })
      }
    })
    
    // Add posts index pages
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/posts`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      })
    })
    
    // Add all posts for each locale
    postsResponse.docs.forEach(post => {
      if (post.slug) {
        locales.forEach(locale => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/posts/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        })
      }
    })
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return basic sitemap if there's an error
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      })
    })
  }
  
  return sitemapEntries
}