import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Post } from '@/payload-types'
import config from '@payload-config'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

const Posts = async ({ params, searchParams }: Args) => {
  const { locale } = await params
  const { page: pageParam } = await searchParams
  const { isEnabled: draft } = await draftMode()

  const page = pageParam ? parseInt(pageParam, 10) : 1
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

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={limit}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export default Posts

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generateMeta({
    title: 'Posts',
    description: 'Browse our latest posts and articles.',
    url: `/posts`,
  })
}