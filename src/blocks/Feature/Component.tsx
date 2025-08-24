'use client'

import React, { memo, useMemo } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { Star, Shield, Bolt, BarChart, Globe, Clock, Clipboard, Package } from 'lucide-react'
import { Container } from '@/components/Container'

type FeatureItem = {
  title: string
  description?: string
  icon?: 'star' | 'shield' | 'bolt' | 'chart' | 'globe' | 'clock' | 'clipboard' | 'package'
  image?: {
    url: string
    alt: string
  }
}

const IconComponent = {
  star: Star,
  shield: Shield,
  bolt: Bolt,
  chart: BarChart,
  globe: Globe,
  clock: Clock,
  clipboard: Clipboard,
  package: Package,
}

const FeatureItem = memo<{ feature: FeatureItem; index: number }>(({ feature, index }) => {
  const Icon = IconComponent[feature.icon || 'star']
  
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      {feature.icon && (
        <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          <Icon className="w-6 h-6" />
        </div>
      )}
      
      {feature.image && feature.image.url && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image 
            src={feature.image.url} 
            alt={feature.image.alt || feature.title} 
            width={300} 
            height={200} 
            className="object-cover w-full h-auto"
            loading="lazy"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      
      {feature.description && (
        <p className="text-gray-600 dark:text-gray-300">
          {feature.description}
        </p>
      )}
    </div>
  )
})

FeatureItem.displayName = 'FeatureItem'

export const FeatureBlock: React.FC<{
  richText?: any
  features?: FeatureItem[]
  id?: string
}> = memo((props) => {
  const { richText, features, id } = props

  const memoizedFeatures = useMemo(() => {
    return features?.map((feature, index) => (
      <FeatureItem key={`${feature.title}-${index}`} feature={feature} index={index} />
    ))
  }, [features])

  return (
    <Container>
      <div id={`block-${id}`} className="py-16">
        {richText && (
          <div className="text-center mb-12">
            <RichText data={richText} />
          </div>
        )}
        
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memoizedFeatures}
          </div>
        )}
      </div>
    </Container>
  )
})

FeatureBlock.displayName = 'FeatureBlock'