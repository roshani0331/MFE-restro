'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en'
  const { t } = useTranslations(currentLocale)

  const locales = useMemo(() => {
    if (!t || typeof t !== 'function') {
      return [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
      ]
    }
    return [
      { code: 'en', label: t('languageSwitcher.english'), flag: '🇺🇸' },
      { code: 'es', label: t('languageSwitcher.spanish'), flag: '🇪🇸' },
    ]
  }, [t])

  const currentLocaleLabel = useMemo(() => 
    locales.find(locale => locale.code === currentLocale)?.label || 'English',
    [locales, currentLocale]
  )

  const switchLanguage = useCallback((locale: string) => {
    // Close dropdown
    setIsOpen(false)
    setFocusedIndex(-1)

    // Handle language switching - always redirect to home page
    if (currentLocale !== locale) {
      if (locale === 'es') {
        // Switch to Spanish - redirect to Spanish home page
        router.push('/es')
      } else {
        // Switch to English - redirect to English home page
        router.push('/')
      }
    }
  }, [router, currentLocale])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
        setFocusedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        buttonRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % locales.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => prev <= 0 ? locales.length - 1 : prev - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0) {
          switchLanguage(locales[focusedIndex].code)
        }
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }, [isOpen, focusedIndex, switchLanguage])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) setFocusedIndex(0)
        }}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('languageSwitcher.selectLanguage')}
        id="language-switcher-button"
      >
        <span>{currentLocaleLabel}</span>
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-1"
            role="listbox"
            aria-labelledby="language-switcher-button"
            aria-label="Language options"
          >
            {locales.map((locale, index) => (
              <li
                key={locale.code}
                role="option"
                aria-selected={currentLocale === locale.code}
                tabIndex={-1}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  currentLocale === locale.code 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
                    : focusedIndex === index
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => switchLanguage(locale.code)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {locale.label}
                {currentLocale === locale.code && (
                  <span className="sr-only"> (current)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher