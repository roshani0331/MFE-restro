'use client'

import React, { useState, useCallback, useMemo, memo } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useTranslations, type Locale } from '@/lib/i18n'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

type FormErrors = {
  [K in keyof FormState]?: string
}

export const ContactForm: React.FC<{
  title?: string
  successMessage?: string
  errorMessage?: string
}> = memo(({ 
  title = 'Contact Us', 
  successMessage = 'Thank you for your message. We will get back to you soon!',
  errorMessage = 'There was an error submitting your form. Please try again.'
}) => {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as Locale) || 'en'
  const { t } = useTranslations(locale)
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formState.name.trim()) {
      newErrors.name = t('contactForm.requiredField')
    }
    
    if (!formState.email.trim()) {
      newErrors.email = t('contactForm.requiredField')
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t('contactForm.invalidEmail')
    }
    
    if (!formState.message.trim()) {
      newErrors.message = t('contactForm.requiredField')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formState, t])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setFormStatus('success')
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setFormStatus('error')
        
        // Handle specific error cases
        if (response.status === 429) {
          setErrors({ name: t('contactForm.rateLimitMessage') })
        } else if (response.status === 400 && data.error) {
          // Handle validation errors
          if (data.error.includes('email')) {
            setErrors({ email: data.error })
          } else if (data.error.includes('Name')) {
            setErrors({ name: data.error })
          } else if (data.error.includes('message')) {
            setErrors({ message: data.error })
          } else {
            setErrors({ name: data.error })
          }
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      setFormStatus('error')
      setErrors({ name: t('contactForm.networkError') })
    } finally {
      setIsSubmitting(false)
      
      // Reset form status after 8 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 8000)
    }
  }, [formState, validateForm, t])

  return (
    <div className="w-full">
      <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-6 xs:mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-center">{t('contactForm.title')}</h2>
      
      {formStatus === 'success' && (
        <div 
          className="mb-6 xs:mb-8 p-4 xs:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl xs:rounded-2xl shadow-lg animate-fade-in-up"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 xs:h-6 xs:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 xs:ml-3">
              <p className="text-base xs:text-lg font-medium">{t('contactForm.successMessage')}</p>
            </div>
          </div>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div 
          className="mb-6 xs:mb-8 p-4 xs:p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 rounded-xl xs:rounded-2xl shadow-lg animate-fade-in-up"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 xs:h-6 xs:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 xs:ml-3">
              <p className="text-base xs:text-lg font-medium">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 xs:space-y-8" noValidate>
        <div className="group">
          <label htmlFor="name" className="block text-base xs:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 xs:mb-3">
            {t('contactForm.nameLabel')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 xs:px-6 py-3 xs:py-4 text-base xs:text-lg border-2 rounded-lg xs:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg ${
              errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contactForm.namePlaceholder')}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 xs:mt-3 text-sm xs:text-base text-red-600 font-medium animate-fade-in-up" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="group">
          <label htmlFor="email" className="block text-base xs:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 xs:mb-3">
            {t('contactForm.emailLabel')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 xs:px-6 py-3 xs:py-4 text-base xs:text-lg border-2 rounded-lg xs:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg ${
              errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contactForm.emailPlaceholder')}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 xs:mt-3 text-sm xs:text-base text-red-600 font-medium animate-fade-in-up" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        
        <div className="group">
          <label htmlFor="phone" className="block text-base xs:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 xs:mb-3">
            {t('contactForm.phoneLabel')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            aria-describedby="phone-help"
            className="w-full px-4 xs:px-6 py-3 xs:py-4 text-base xs:text-lg border-2 border-gray-300 rounded-lg xs:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg"
            placeholder={t('contactForm.phonePlaceholder')}
          />
          <p id="phone-help" className="mt-2 xs:mt-3 text-sm xs:text-base text-gray-600 dark:text-gray-400">
            {t('contactForm.phoneOptional')}
          </p>
        </div>
        
        <div className="group">
          <label htmlFor="message" className="block text-base xs:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 xs:mb-3">
            {t('contactForm.messageLabel')} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formState.message}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
            className={`w-full px-4 xs:px-6 py-3 xs:py-4 text-base xs:text-lg border-2 rounded-lg xs:rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 hover:shadow-lg resize-none ${
              errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contactForm.messagePlaceholder')}
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 xs:mt-3 text-sm xs:text-base text-red-600 font-medium animate-fade-in-up" role="alert">
              {errors.message}
            </p>
          ) : (
            <p id="message-help" className="mt-2 xs:mt-3 text-sm xs:text-base text-gray-600 dark:text-gray-400">
              Please provide details about your inquiry
            </p>
          )}
        </div>
        
        <div className="pt-3 xs:pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-describedby="submit-help"
            className="w-full px-6 xs:px-8 py-4 xs:py-5 text-lg xs:text-xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl xs:rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 xs:mr-3 h-5 w-5 xs:h-6 xs:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('contactForm.submittingButton')}
              </div>
            ) : (
              t('contactForm.submitButton')
            )}
          </button>
          <p id="submit-help" className="mt-3 xs:mt-4 text-sm xs:text-base text-gray-600 dark:text-gray-400 text-center">
            We&apos;ll respond to your message within 24 hours
          </p>
        </div>
      </form>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'