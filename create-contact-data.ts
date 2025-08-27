import { config as dotenvConfig } from 'dotenv'
import { getPayload } from 'payload'
import config from './src/payload.config'
import { contactForm as contactFormData } from './src/endpoints/seed/contact-form'
import { contact as contactPageData } from './src/endpoints/seed/contact-page'

// Load environment variables
dotenvConfig()

async function createContactData() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Creating contact form...')
    const contactForm = await payload.create({
      collection: 'forms',
      data: contactFormData,
    })

    console.log('Creating contact page...')
    const contactPage = await payload.create({
      collection: 'pages',
      data: contactPageData({ contactForm }),
    })

    console.log('Contact form and page created successfully!')
    console.log('Contact Form ID:', contactForm.id)
    console.log('Contact Page ID:', contactPage.id)
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating contact data:', error)
    process.exit(1)
  }
}

createContactData()