import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes

  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Input sanitization
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>"'&]/g, '')
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate field types and lengths
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid field types' },
        { status: 400 }
      )
    }

    if (name.length > 100 || email.length > 254 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum allowed' },
        { status: 400 }
      )
    }

    if (phone && (typeof phone !== 'string' || phone.length > 20)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      message: sanitizeInput(message),
    }

    // Check for empty fields after sanitization
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      return NextResponse.json(
        { error: 'Invalid characters detected in form fields' },
        { status: 400 }
      )
    }

    // Initialize Payload
    const payload = await getPayload({ config: configPromise })

    // Create contact submission in PayloadCMS
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        ...sanitizedData,
        status: 'new',
      },
    })

    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted successfully: ID ${submission.id}`, {
      name: sanitizedData.name,
      email: sanitizedData.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully. We will get back to you soon!' 
    })
  } catch (error) {
    console.error('Error submitting contact form:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}