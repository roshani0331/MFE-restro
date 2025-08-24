import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache, Suspense } from 'react'
import type { Post } from '@/payload-types'
import config from '@payload-config'
import dynamic from 'next/dynamic'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { notFound } from 'next/navigation'

// Lazy load heavy components
const CollectionArchive = dynamic(() => import('@/components/CollectionArchive').then(mod => ({ default: mod.CollectionArchive })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-8"></div>
})

const PageRange = dynamic(() => import('@/components/PageRange').then(mod => ({ default: mod.PageRange })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-6 w-32 rounded mb-4"></div>
})

const Pagination = dynamic(() => import('@/components/Pagination').then(mod => ({ default: mod.Pagination })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-12 w-64 rounded mx-auto"></div>
})

type Args = {
  params: Promise<{
    page: string
    locale: string
  }>
}

const PostsPage = async ({ params }: Args) => {
  const { page: pageParam, locale } = await params
  const { isEnabled: draft } = await draftMode()

  const page = parseInt(pageParam, 10)
  
  if (isNaN(page) || page < 1) {
    return notFound()
  }

  const limit = 12

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    draft,
    limit,
    page,
    overrideAccess: draft,
    where: {
      _status: {
        equals: 'published',
      },
    },
    locale,
  })

  if (page > posts.totalPages) {
    return notFound()
  }

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-6 w-32 rounded mb-4"></div>}>
          <PageRange
            collection="posts"
            currentPage={page}
            limit={limit}
            totalDocs={totalDocs}
          />
        </Suspense>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-8"></div>}>
        <CollectionArchive posts={posts} />
      </Suspense>

      <div className="container">
        {totalPages > 1 && (
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-12 w-64 rounded mx-auto"></div>}>
            <Pagination page={page} totalPages={totalPages} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default PostsPage

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
  })

  const totalPages = posts.totalPages || 1
  const params = []

  for (let i = 1; i <= totalPages; i++) {
    params.push({ page: i.toString() })
  }

  return params
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { page, locale } = await params
  return generateMeta({
    title: `Posts - Page ${page}`,
    description: `Browse our latest posts and articles - Page ${page}.`,
    url: `/posts/page/${page}`,
  })
}