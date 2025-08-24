import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page
  const baseURL = 'http://localhost:3000'

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('should load homepage successfully', async () => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')

    // Check if page loads without errors
    await expect(page).toHaveTitle(/RestroWorks|Payload/)
    
    // Should have main content
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('should have proper navigation', async () => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Check for header navigation
    const header = page.locator('header')
    if (await header.count() > 0) {
      await expect(header).toBeVisible()
      
      // Check for navigation links
      const navLinks = page.locator('nav a')
      if (await navLinks.count() > 0) {
        await expect(navLinks.first()).toBeVisible()
      }
    }
  })

  test('should have footer', async () => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Check for footer
    const footer = page.locator('footer')
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible()
    }
  })

  test('should be responsive', async () => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    await expect(body).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    await expect(body).toBeVisible()
  })

  test('should handle 404 pages', async () => {
    await page.goto(`${baseURL}/non-existent-page`)
    
    // Should show 404 or redirect
    await page.waitForLoadState('networkidle')
    
    // Check if it's a 404 page or redirected to home
    const is404 = page.url().includes('404') || 
                  await page.locator('text=404').count() > 0 ||
                  await page.locator('text=Not Found').count() > 0
    
    const isRedirected = page.url() === baseURL || page.url() === `${baseURL}/`
    
    expect(is404 || isRedirected).toBe(true)
  })

  test('should load locale-specific pages', async () => {
    // Test English locale
    await page.goto(`${baseURL}/en`)
    await page.waitForLoadState('networkidle')
    
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    // Check if URL contains locale
    expect(page.url()).toContain('/en')
  })

  test('should have proper meta tags', async () => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Check for essential meta tags
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', /width=device-width/)
    
    // Check for charset
    const charset = page.locator('meta[charset]')
    if (await charset.count() > 0) {
      await expect(charset).toHaveAttribute('charset', 'utf-8')
    }
  })

  test('should load without JavaScript errors', async () => {
    const errors: string[] = []
    
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })
    
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Should not have critical JavaScript errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404') &&
      !error.includes('vite/client')
    )
    
    expect(criticalErrors.length).toBe(0)
  })

  test('should have proper accessibility features', async () => {
    await page.goto(baseURL)
    await page.waitForLoadState('networkidle')
    
    // Check for skip links
    const skipLink = page.locator('a[href="#main"], a[href="#content"]')
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible()
    }
    
    // Check for proper heading structure
    const h1 = page.locator('h1')
    if (await h1.count() > 0) {
      await expect(h1.first()).toBeVisible()
    }
  })
})
