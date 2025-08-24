'use client'

import React, { Suspense, memo } from 'react'
import { ErrorBoundary } from '../ErrorBoundary'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
  className?: string
}

// Default loading skeleton
const DefaultLoadingSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/2"></div>
    </div>
  </div>
))

DefaultLoadingSkeleton.displayName = 'DefaultLoadingSkeleton'

// Default error fallback
const DefaultErrorFallback = memo(() => (
  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      <span className="text-red-700 dark:text-red-400 text-sm font-medium">
        Failed to load component
      </span>
    </div>
  </div>
))

DefaultErrorFallback.displayName = 'DefaultErrorFallback'

/**
 * LazyWrapper component that provides both Suspense and ErrorBoundary
 * for lazy-loaded components with customizable fallbacks
 */
export const LazyWrapper: React.FC<LazyWrapperProps> = memo(({ 
  children, 
  fallback = <DefaultLoadingSkeleton />, 
  errorFallback = <DefaultErrorFallback />,
  className 
}) => {
  return (
    <div className={className}>
      <ErrorBoundary fallback={errorFallback}>
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
})

LazyWrapper.displayName = 'LazyWrapper'

/**
 * Higher-order component for creating lazy-loaded components
 * with built-in error handling and loading states
 */
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  options?: {
    fallback?: React.ReactNode
    errorFallback?: React.ReactNode
    displayName?: string
  }
) => {
  const LazyComponent = React.lazy(importFn)
  
  const WrappedComponent = memo((props: P) => (
    <LazyWrapper 
      fallback={options?.fallback}
      errorFallback={options?.errorFallback}
    >
      <LazyComponent {...props} />
    </LazyWrapper>
  ))

  WrappedComponent.displayName = options?.displayName || 'LazyComponent'
  
  return WrappedComponent
}

/**
 * Intersection Observer hook for lazy loading components when they enter viewport
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [hasIntersected, setHasIntersected] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, hasIntersected, options])

  return { isIntersecting, hasIntersected }
}

/**
 * Component that only renders children when they enter the viewport
 */
export const ViewportLazyLoader: React.FC<{
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}> = memo(({ 
  children, 
  fallback = <DefaultLoadingSkeleton />, 
  className,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold,
    rootMargin
  })

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  )
})

ViewportLazyLoader.displayName = 'ViewportLazyLoader'