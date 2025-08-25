'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useTranslations } from '@/lib/i18n'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const params = useParams()
  const locale = params?.locale as string || 'en'
  const { t } = useTranslations(locale as "en" | "es")
  
  return (
    <div className="text-base text-red-600 font-medium animate-fade-in-up">
      {(errors[name]?.message as string) || t('common.fieldRequired')}
    </div>
  )
}

Error.displayName = 'Error'
