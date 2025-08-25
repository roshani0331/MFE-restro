// Simple internationalization system for static UI text

export type Locale = 'en' | 'es'

export const translations = {
  en: {
    // Contact Form
    contactForm: {
      title: 'Get in Touch',
      subtitle: 'We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      phoneOptional: 'Optional: Include your phone number for faster response',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your project, questions, or how we can help you...',
      submitButton: 'Send Message',
      submittingButton: 'Sending...',
      successMessage: 'Thank you for your message! We&apos;ll get back to you soon.',
      // Validation messages
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      messageRequired: 'Message is required',
      // API Error messages
      rateLimitError: 'Too many requests. Please try again in 15 minutes.',
      validationError: 'Please check your input and try again.',
      networkError: 'Network error. Please check your connection and try again.'
    },
    // Navigation
    navigation: {
      home: 'Home',
      contact: 'Contact',
      brand: 'RestroWorks'
    },
    // Language Switcher
    languageSwitcher: {
      selectLanguage: 'Select language',
      english: 'English',
      spanish: 'Español'
    },
    // Common UI elements
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
      fieldRequired: 'This field is required',
      required: 'required'
    }
  },
  es: {
    // Contact Form
    contactForm: {
      title: 'Ponte en Contacto',
      subtitle: 'Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Ingresa tu nombre completo',
      emailLabel: 'Dirección de Correo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      phoneLabel: 'Número de Teléfono',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      phoneOptional: 'Opcional: Incluye tu número de teléfono para una respuesta más rápida',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto, preguntas, o cómo podemos ayudarte...',
      submitButton: 'Enviar Mensaje',
      submittingButton: 'Enviando...',
      successMessage: '¡Gracias por tu mensaje! Te responderemos pronto.',
      // Validation messages
      nameRequired: 'El nombre es requerido',
      emailRequired: 'El correo es requerido',
      emailInvalid: 'Por favor ingresa una dirección de correo válida',
      messageRequired: 'El mensaje es requerido',
      // API Error messages
      rateLimitError: 'Demasiadas solicitudes. Por favor intenta de nuevo en 15 minutos.',
      validationError: 'Por favor revisa tu información e intenta de nuevo.',
      networkError: 'Error de red. Por favor verifica tu conexión e intenta de nuevo.'
    },
    // Navigation
    navigation: {
      home: 'Inicio',
      contact: 'Contacto',
      brand: 'RestroWorks'
    },
    // Language Switcher
    languageSwitcher: {
      selectLanguage: 'Seleccionar idioma',
      english: 'English',
      spanish: 'Español'
    },
    // Common UI elements
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      close: 'Cerrar',
      fieldRequired: 'Este campo es requerido',
      required: 'requerido'
    }
  }
} as const

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

export function useTranslations(locale: Locale) {
  return {
    t: (key: string) => getTranslation(locale, key),
    translations: translations[locale]
  }
}