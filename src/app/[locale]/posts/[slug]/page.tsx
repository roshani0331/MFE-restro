import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
// import RichText from '@/components/RichText' // Unused import
import type { Post } from '@/payload-types'
import config from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AdminBar } from '@/components/AdminBar'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    slug?: string
    locale: string
  }>
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as "all" | "en" | "es",
  })

  return result.docs?.[0] || null
})

const Post = async ({ params }: Args) => {
  const { slug = '', locale } = await params
  const post = await queryPostBySlug({ slug, locale })

  if (!post) {
    return notFound()
  }

  const { hero, layout } = post

  return (
    <article className="pt-16 pb-16">
      <AdminBar
        adminBarProps={{
          preview: true,
        }}
      />
      
      {/* Render hero */}
      <RenderHero {...hero} />
      
      {/* Render post content */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <div className="grid-cols-start-1 md:grid-cols-start-2 grid-cols-span-3">
            {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
          </div>
        </div>
      </div>
      
      <LivePreviewListener />
    </article>
  )
}

export default Post

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs
    ?.filter((doc) => {
      return doc.slug
    })
    .map(({ slug }) => ({
      slug,
    }))

  return params || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '', locale } = await params
  const post = await queryPostBySlug({ slug, locale })

  if (!post) {
    return {}
  }

  return generateMeta({
    doc: post,
  })
}