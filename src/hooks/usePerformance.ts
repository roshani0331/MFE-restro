'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for monitoring component performance
 * Tracks render times and provides performance metrics
 */
export const usePerformance = (componentName: string) => {
  const renderStartTime = useRef<number>(0)
  const renderCount = useRef<number>(0)
  const totalRenderTime = useRef<number>(0)

  useEffect(() => {
    renderStartTime.current = performance.now()
    renderCount.current += 1
  })

  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current
      totalRenderTime.current += renderTime
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${componentName}:`, {
          renderTime: `${renderTime.toFixed(2)}ms`,
          renderCount: renderCount.current,
          averageRenderTime: `${(totalRenderTime.current / renderCount.current).toFixed(2)}ms`
        })
      }
    }
  })

  return {
    renderCount: renderCount.current,
    averageRenderTime: totalRenderTime.current / renderCount.current
  }
}

/**
 * Hook for measuring component mount time
 */
export const useMountTime = (componentName: string) => {
  const mountStartTime = useRef<number>(performance.now())

  useEffect(() => {
    const mountTime = performance.now() - mountStartTime.current
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Mount Time] ${componentName}: ${mountTime.toFixed(2)}ms`)
    }
  }, [componentName])
}

/**
 * Hook for debouncing values to prevent excessive re-renders
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}