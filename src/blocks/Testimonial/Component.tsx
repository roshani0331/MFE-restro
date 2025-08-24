'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { Container } from '@/components/Container'

type TestimonialItem = {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: {
    url: string
    alt: string
  }
}

export const TestimonialBlock: React.FC<{
  richText?: any
  testimonials?: TestimonialItem[]
  id?: string
}> = (props) => {
  const { richText, testimonials, id } = props

  return (
    <Container>
      <div id={`block-${id}`} className="py-16">
        {richText && (
          <div className="text-center mb-12">
            <RichText data={richText} />
          </div>
        )}
        
        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <p className="text-lg mb-6 italic text-gray-700 dark:text-gray-300 flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center mt-auto">
                    {testimonial.avatar && testimonial.avatar.url && (
                      <div className="mr-4">
                        <Image 
                          src={testimonial.avatar.url} 
                          alt={testimonial.avatar.alt || `${testimonial.author}'s avatar`} 
                          width={48} 
                          height={48} 
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role && <span>{testimonial.role}</span>}
                          {testimonial.role && testimonial.company && <span> at </span>}
                          {testimonial.company && <span>{testimonial.company}</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}