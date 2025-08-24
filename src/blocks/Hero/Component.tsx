'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { Button } from '@/components/Button'

export const HeroBlock: React.FC<{
  title: string
  subtitle?: string
  content?: any
  backgroundType: 'color' | 'image'
  backgroundColor?: 'default' | 'light' | 'dark' | 'primary'
  backgroundImage?: {
    url: string
    alt: string
  }
  alignment?: 'left' | 'center' | 'right'
  links?: {
    link: {
      type: 'reference' | 'custom'
      label: string
      reference?: {
        value: string
        relationTo: string
      }
      url?: string
      appearance?: 'default' | 'outline'
    }
  }[]
  id?: string
}> = (props) => {
  const {
    title,
    subtitle,
    content,
    backgroundType,
    backgroundColor = 'default',
    backgroundImage,
    alignment = 'center',
    links,
    id,
  } = props

  const bgClasses = {
    default: 'bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
    light: 'bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800',
    dark: 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white',
    primary: 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <section
      id={`block-${id}`}
      
    >
      {backgroundType === 'image' && backgroundImage?.url && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt || title}
              fill
              className="object-cover scale-105 transition-transform duration-[20s] ease-out hover:scale-110"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-0" />
        </>
      )}
      
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-indigo-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500" />
      </div> */}

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className={`w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl ${alignmentClasses[alignment]} animate-fade-in-up`}>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-3 sm:mb-4 md:mb-6 leading-[1.1] sm:leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent animate-gradient-x break-words">
            {title}
          </h1>
          
          {subtitle && (
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-light text-gray-700 dark:text-gray-200 leading-relaxed animate-fade-in-up delay-200 break-words">
              {subtitle}
            </h2>
          )}
          
          {content && (
            <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 animate-fade-in-up delay-300 max-w-prose">
              <RichText data={content} />
            </div>
          )}
          
          {links && links.length > 0 && (
            <div className={`flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 ${alignment === 'center' ? 'items-center xs:justify-center' : alignment === 'right' ? 'items-end xs:justify-end' : 'items-start xs:justify-start'} animate-fade-in-up delay-500`}>
              {links.map((link, i) => {
                if (!link.link) return null
                
                const { label, type, reference, url, appearance = 'default' } = link.link
                const href = type === 'reference' ? `/${reference?.relationTo}/${reference?.value}` : url
                
                if (!href) return null
                
                // Map link appearances to Button component appearances
                const buttonAppearance = appearance === 'outline' ? 'secondary' : 'default'
                
                return (
                  <div key={i} className="transform hover:scale-105 transition-transform duration-200">
                    <Button 
                      appearance={buttonAppearance}
                      href={href}
                      label={label}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}