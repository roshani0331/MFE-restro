import { Metadata } from 'next';
import { Inter } from 'next/font/google'
import { InitTheme } from '@/providers/Theme/InitTheme'
import './(frontend)/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RestroWorks CMS',
  description: 'A modern CMS for restaurants',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}