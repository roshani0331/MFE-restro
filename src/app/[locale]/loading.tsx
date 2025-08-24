import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-gray-600 dark:text-gray-400 font-medium">
          Loading...
        </div>
        
        {/* Skeleton content */}
        <div className="w-full max-w-md space-y-3 mt-8">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </div>
  )
}