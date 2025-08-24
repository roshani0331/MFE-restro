'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import dynamic from 'next/dynamic'
import React, { useState, memo } from 'react'
import { useRouter } from 'next/navigation'

// Lazy load PayloadAdminBar
const PayloadAdminBar = dynamic(() => import('@payloadcms/admin-bar').then(mod => ({ default: mod.PayloadAdminBar })), {
  loading: () => <div className="h-12 bg-gray-100 animate-pulse"></div>,
  ssr: false
})

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },

  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = memo((props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  const onPreviewExit = React.useCallback(() => {
    fetch('/next/exit-preview').then(() => {
      router.push('/')
      router.refresh()
    })
  }, [router])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <React.Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse"></div>}>
          <PayloadAdminBar
            {...adminBarProps}
            className="py-2 text-white"
            classNames={{
              controls: 'font-medium text-white',
              logo: 'text-white',
              user: 'text-white',
            }}
            cmsURL={getClientSideURL()}
            collectionSlug={collection}
            collectionLabels={{
              plural: collectionLabels[collection]?.plural || 'Pages',
              singular: collectionLabels[collection]?.singular || 'Page',
            }}
            logo={<Title />}
            onAuthChange={onAuthChange}
            onPreviewExit={onPreviewExit}
            style={{
              backgroundColor: 'transparent',
              padding: 0,
              position: 'relative',
              zIndex: 'unset',
            }}
          />
        </React.Suspense>
      </div>
    </div>
  )
})

AdminBar.displayName = 'AdminBar'
