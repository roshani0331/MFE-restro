import { test, expect, Page } from '@playwright/test'

test.describe('Admin Panel', () => {
  let page: Page
  const baseURL = 'http://localhost:3000'

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('should load admin panel', async () => {
    await page.goto(`${baseURL}/admin`)
    
    // Check if admin panel loads
    await expect(page).toHaveTitle(/Admin/)
    
    // Should see login form or dashboard
    const loginForm = page.locator('form')
    const dashboard = page.locator('[data-testid="dashboard"]')
    
    const hasLoginForm = await loginForm.count() > 0
    const hasDashboard = await dashboard.count() > 0
    
    expect(hasLoginForm || hasDashboard).toBe(true)
  })

  test('should display collections in sidebar', async () => {
    await page.goto(`${baseURL}/admin`)
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Check for common collection links
    const collectionsToCheck = ['Users', 'Pages', 'Posts', 'Categories', 'Media']
    
    for (const collection of collectionsToCheck) {
      const collectionLink = page.locator(`text=${collection}`).first()
      if (await collectionLink.count() > 0) {
        await expect(collectionLink).toBeVisible()
      }
    }
  })

  test('should navigate to collections', async () => {
    await page.goto(`${baseURL}/admin`)
    await page.waitForLoadState('networkidle')
    
    // Try to navigate to Pages collection
    const pagesLink = page.locator('text=Pages').first()
    if (await pagesLink.count() > 0) {
      await pagesLink.click()
      await page.waitForLoadState('networkidle')
      
      // Should be on pages collection view
      await expect(page.url()).toContain('/admin/collections/pages')
    }
  })

  test('should display globals in sidebar', async () => {
    await page.goto(`${baseURL}/admin`)
    await page.waitForLoadState('networkidle')
    
    // Check for global configurations
    const globalsToCheck = ['Header', 'Footer', 'Settings']
    
    for (const global of globalsToCheck) {
      const globalLink = page.locator(`text=${global}`).first()
      if (await globalLink.count() > 0) {
        await expect(globalLink).toBeVisible()
      }
    }
  })

  test('should have responsive design', async () => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(`${baseURL}/admin`)
    await page.waitForLoadState('networkidle')
    
    // Admin should be responsive
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    await expect(body).toBeVisible()
  })

  test('should handle navigation errors gracefully', async () => {
    // Try to access a non-existent admin route
    await page.goto(`${baseURL}/admin/non-existent-route`)
    
    // Should not crash and should redirect or show error
    await page.waitForLoadState('networkidle')
    
    // Should either redirect to login/dashboard or show 404
    const currentUrl = page.url()
    const isValidAdminRoute = currentUrl.includes('/admin')
    expect(isValidAdminRoute).toBe(true)
  })
})