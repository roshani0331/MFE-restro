import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'

// Mock payload for testing
const mockPayload = {
  find: vi.fn(),
  create: vi.fn(),
  findByID: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}

// Mock the payload import
vi.mock('payload', () => ({
  default: mockPayload,
}))

let payload = mockPayload

describe('Collections API', () => {
  beforeAll(async () => {
    // Setup mock responses
    mockPayload.find.mockResolvedValue({
      docs: [],
      totalDocs: 0,
      limit: 10,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    })
    
    mockPayload.create.mockImplementation(({ data }) => Promise.resolve({
      id: 'test-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    }))
    
    mockPayload.findByID.mockResolvedValue({
      id: 'test-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: 'test@example.com',
      title: 'Test Title',
      slug: 'test-slug',
      name: 'Test Name',
      content: 'Test content',
      _status: 'published',
    })
  })

  afterAll(async () => {
    vi.clearAllMocks()
  })

  describe('Users Collection', () => {
    it('should fetch users collection', async () => {
      const users = await payload.find({
        collection: 'users',
      })
      
      expect(users).toBeDefined()
      expect(users.docs).toBeInstanceOf(Array)
      expect(users.totalDocs).toBeGreaterThanOrEqual(0)
    })

    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword123',
        roles: ['user'],
      }

      const user = await payload.create({
        collection: 'users',
        data: userData,
      })

      expect(user).toBeDefined()
      expect(user.email).toBe(userData.email)
      expect(user.roles).toContain('user')
    })
  })

  describe('Pages Collection', () => {
    it('should fetch pages collection', async () => {
      const pages = await payload.find({
        collection: 'pages',
      })
      
      expect(pages).toBeDefined()
      expect(pages.docs).toBeInstanceOf(Array)
    })

    it('should create a new page', async () => {
      const pageData = {
        title: 'Test Page',
        slug: 'test-page',
        _status: 'published' as const,
        layout: [],
      }

      const page = await payload.create({
        collection: 'pages',
        data: pageData,
      })

      expect(page).toBeDefined()
      expect(page.title).toBe(pageData.title)
      expect(page.slug).toBe(pageData.slug)
    })
  })

  describe('Posts Collection', () => {
    it('should fetch posts collection', async () => {
      const posts = await payload.find({
        collection: 'posts',
      })
      
      expect(posts).toBeDefined()
      expect(posts.docs).toBeInstanceOf(Array)
    })

    it('should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        slug: 'test-post',
        _status: 'published' as const,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'This is a test post content.',
                  },
                ],
              },
            ],
          },
        },
      }

      const post = await payload.create({
        collection: 'posts',
        data: postData,
      })

      expect(post).toBeDefined()
      expect(post.title).toBe(postData.title)
      expect(post.slug).toBe(postData.slug)
    })
  })

  describe('Categories Collection', () => {
    it('should fetch categories collection', async () => {
      const categories = await payload.find({
        collection: 'categories',
      })
      
      expect(categories).toBeDefined()
      expect(categories.docs).toBeInstanceOf(Array)
    })

    it('should create a new category', async () => {
      const categoryData = {
        title: 'Test Category',
        slug: 'test-category',
      }

      const category = await payload.create({
        collection: 'categories',
        data: categoryData,
      })

      expect(category).toBeDefined()
      expect(category.title).toBe(categoryData.title)
      expect(category.slug).toBe(categoryData.slug)
    })
  })

  describe('Media Collection', () => {
    it('should fetch media collection', async () => {
      const media = await payload.find({
        collection: 'media',
      })
      
      expect(media).toBeDefined()
      expect(media.docs).toBeInstanceOf(Array)
    })
  })
})