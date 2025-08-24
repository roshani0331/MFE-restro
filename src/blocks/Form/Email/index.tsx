import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from '@/lib/i18n'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const params = useParams()
  const locale = params?.locale as string || 'en'
  const { t } = useTranslations(locale)
  return (
    <Width width={width}>
      <div className="group">
        <Label htmlFor={name} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          {label}
          {required && (
            <span className="text-red-500 ml-1">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="email"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
          className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg ${
            errors[name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={t('contactForm.emailPlaceholder')}
        />
        {errors[name] && (
          <div className="mt-3">
            <Error name={name} />
          </div>
        )}
      </div>
    </Width>
  )
}
