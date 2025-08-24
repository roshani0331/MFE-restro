'use client'

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslations } from '@/lib/i18n';

interface NavigationProps {
  navItems?: Array<{
    label: string;
    href: string;
  }>;
}

export const Navigation: React.FC<NavigationProps> = memo(({ navItems = [] }) => {
  const { locale } = useParams() as { locale: string };
  const { t } = useTranslations(locale);
  
  // Memoize default navigation items
  const defaultNavItems = useMemo(() => [
    { label: t('Home'), href: `/${locale}` },
    { label: t('Contact'), href: `/${locale}/contact` },
  ], [t, locale]);
  
  const items = useMemo(() => 
    navItems.length > 0 ? navItems : defaultNavItems,
    [navItems, defaultNavItems]
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-xl font-bold text-blue-600">
              {t('navigation.brand')}
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button - simplified version */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});