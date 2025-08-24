import { getPayload } from 'payload'
import config from '@payload-config'
import { contact } from './src/endpoints/seed/contact-page'

async function createContactPage() {
  try {
    const payload = await getPayload({ config })
    
    // First, check if contact form exists, if not create it
    let contactForm
    const existingForms = await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: 'Contact Form'
        }
      }
    })
    
    if (existingForms.docs.length > 0) {
      contactForm = existingForms.docs[0]
    } else {
      // Create contact form
      contactForm = await payload.create({
        collection: 'forms',
        data: {
          title: 'Contact Form',
          fields: [
            {
              name: 'name',
              label: 'Name',
              width: 50,
              required: true,
              blockType: 'text'
            },
            {
              name: 'email',
              label: 'Email',
              width: 50,
              required: true,
              blockType: 'email'
            },
            {
              name: 'phone',
              label: 'Phone',
              width: 50,
              required: false,
              blockType: 'text'
            },
            {
              name: 'message',
              label: 'Message',
              width: 100,
              required: true,
              blockType: 'textarea'
            }
          ],
          submitButtonLabel: 'Submit',
          confirmationType: 'message',
          confirmationMessage: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Thank you for your message. We will get back to you soon.'
                    }
                  ]
                }
              ]
            }
          }
        }
      })
    }
    
    // Check if contact page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'contact'
        }
      }
    })
    
    if (existingPages.docs.length > 0) {
      console.log('Contact page already exists')
      return
    }
    
    // Create contact page with minimal data to avoid revalidation issues
    const page = await payload.create({
      collection: 'pages',
      data: {
        slug: 'contact',
        title: 'Contact',
        _status: 'published',
        hero: {
          type: 'none',
        },
        layout: [
          {
            blockType: 'formBlock',
            enableIntro: true,
            form: contactForm.id,
            introContent: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Contact Us',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h1',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
      disableVerificationEmail: true
    })
    
    console.log('Contact page created successfully:', page.slug)
    
  } catch (error) {
    console.error('Error creating contact page:', error)
  }
}

createContactPage()