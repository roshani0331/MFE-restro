'use client'

import React, { useState, memo, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslations } from '@/lib/i18n'
import { Menu, X } from 'lucide-react'

export const Header: React.FC<{
  header?: any
}> = memo(({ header }) => {
  const { locale } = useParams() as { locale: string }
  const { t } = useTranslations(locale || 'en')
  const navItems = header?.navItems || []
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }, [isMobileMenuOpen])

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 py-3 xs:py-4 sm:py-4 md:py-5 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <Link 
            href={`/${locale}`} 
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 flex-shrink-0"
          >
            RestroWorks
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <Link 
              href={`/${locale}`} 
              className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium group text-sm lg:text-base whitespace-nowrap"
            >
              {t('Home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link 
              href={`/${locale}/contact`} 
              className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium group text-sm lg:text-base whitespace-nowrap"
            >
              {t('Contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {navItems?.map((item: any, i: number) => (
              <Link 
                key={i} 
                href={item.link?.url || '#'} 
                className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium group text-sm lg:text-base whitespace-nowrap"
              >
                {item.link?.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <div className="ml-2 lg:ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 xs:p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} className="xs:w-6 xs:h-6" /> : <Menu size={20} className="xs:w-6 xs:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="mt-4 xs:mt-6 pb-4 xs:pb-6 border-t border-gray-200/30 dark:border-gray-700/30">
            <div className="flex flex-col space-y-4 xs:space-y-6 pt-4 xs:pt-6">
              <Link 
                href={`/${locale}`} 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-base xs:text-lg transform hover:translate-x-2 px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Home')}
              </Link>

              <Link 
                href={`/${locale}/contact`} 
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-base xs:text-lg transform hover:translate-x-2 px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Contact')}
              </Link>

              {navItems?.map((item: any, i: number) => (
                <Link 
                  key={i} 
                  href={item.link?.url || '#'} 
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-base xs:text-lg transform hover:translate-x-2 px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.link?.label}
                </Link>
              ))}
              <div className="pt-3 xs:pt-4 border-t border-gray-200/30 dark:border-gray-700/30 px-2">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
})