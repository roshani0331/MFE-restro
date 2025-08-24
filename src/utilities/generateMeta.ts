import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

// Overloaded function signatures
export async function generateMeta(args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata>
export async function generateMeta(args: {
  title?: string
  description?: string
  image?: Media | Config['db']['defaultIDType'] | null
  url?: string
}): Promise<Metadata>
export async function generateMeta(args: {
  doc?: Partial<Page> | Partial<Post> | null
  title?: string
  description?: string
  image?: Media | Config['db']['defaultIDType'] | null
  url?: string
}): Promise<Metadata> {
  // Handle doc-based metadata (existing functionality)
  if (args.doc) {
    const { doc } = args
    const ogImage = getImageURL(doc?.meta?.image)

    const title = doc?.meta?.title
      ? doc?.meta?.title + ' | RestroWorks CMS'
      : 'RestroWorks CMS'

    return {
      description: doc?.meta?.description,
      openGraph: mergeOpenGraph({
        description: doc?.meta?.description || '',
        images: ogImage
          ? [
              {
                url: ogImage,
              },
            ]
          : undefined,
        title,
        url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      }),
      title,
    }
  }

  // Handle direct metadata parameters
  const { title, description, image, url } = args
  const ogImage = getImageURL(image)
  const fullTitle = title ? `${title} | RestroWorks CMS` : 'RestroWorks CMS'

  return {
    title: fullTitle,
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: fullTitle,
      url: url || '/',
    }),
  }
}
