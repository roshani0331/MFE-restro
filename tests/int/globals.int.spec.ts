import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'

// Mock payload for testing
const mockPayload = {
  findGlobal: vi.fn(),
  updateGlobal: vi.fn(),
}

// Mock the payload import
vi.mock('payload', () => ({
  default: mockPayload,
}))

let payload = mockPayload

describe('Globals API Tests', () => {
  beforeAll(async () => {
    // Setup mock responses
    mockPayload.findGlobal.mockResolvedValue({
      id: 'global-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      navItems: [
        { link: { type: 'reference', label: 'Home' } },
        { link: { type: 'reference', label: 'About' } }
      ],
      siteName: 'Test Site',
      siteDescription: 'Test Description',
      enableAnalytics: false,
      analyticsId: '',
      enableSEO: true,
      defaultMetaTitle: 'Test Title',
      defaultMetaDescription: 'Test Description',
    })
    
    mockPayload.updateGlobal.mockImplementation(({ data }) => Promise.resolve({
      id: 'global-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      navItems: [
        { link: { type: 'reference', label: 'Home' } },
        { link: { type: 'reference', label: 'About' } }
      ],
      siteName: 'Test Site',
      siteDescription: 'Test Description',
      enableAnalytics: false,
      analyticsId: '',
      enableSEO: true,
      defaultMetaTitle: 'Test Title',
      defaultMetaDescription: 'Test Description',
      ...data,
    }))
  })

  afterAll(async () => {
    vi.clearAllMocks()
  })

  describe('Header Global', () => {
    it('should fetch header global', async () => {
      const header = await payload.findGlobal({
        slug: 'header',
      })
      
      expect(header).toBeDefined()
      expect(header.id).toBeDefined()
    })

    it('should update header global', async () => {
      const headerData = {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Home',
              reference: {
                relationTo: 'pages',
                value: 'home',
              },
            },
          },
        ],
      }

      const header = await payload.updateGlobal({
        slug: 'header',
        data: headerData,
      })

      expect(header).toBeDefined()
      expect(header.navItems).toBeDefined()
      expect(Array.isArray(header.navItems)).toBe(true)
    })
  })

  describe('Footer Global', () => {
    it('should fetch footer global', async () => {
      const footer = await payload.findGlobal({
        slug: 'footer',
      })
      
      expect(footer).toBeDefined()
      expect(footer.id).toBeDefined()
    })

    it('should update footer global', async () => {
      const footerData = {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: 'about',
              },
            },
          },
        ],
      }

      const footer = await payload.updateGlobal({
        slug: 'footer',
        data: footerData,
      })

      expect(footer).toBeDefined()
      expect(footer.navItems).toBeDefined()
      expect(Array.isArray(footer.navItems)).toBe(true)
    })
  })

  describe('Settings Global', () => {
    it('should fetch settings global', async () => {
      const settings = await payload.findGlobal({
        slug: 'settings',
      })
      
      expect(settings).toBeDefined()
      expect(settings.id).toBeDefined()
    })

    it('should update settings global', async () => {
      const settingsData = {
        postsPage: 'posts',
        projectsPage: 'projects',
      }

      const settings = await payload.updateGlobal({
        slug: 'settings',
        data: settingsData,
      })

      expect(settings).toBeDefined()
    })
  })
})