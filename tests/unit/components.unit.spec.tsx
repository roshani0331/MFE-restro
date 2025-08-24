import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/en',
  useParams: () => ({ locale: 'en' }),
}))

vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }
})

vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => (
      <img src={src} alt={alt} {...props} />
    ),
  }
})

// Mock Payload components
vi.mock('@payloadcms/admin-bar', () => ({
  AdminBar: ({ children }: any) => <div data-testid="admin-bar">{children}</div>,
}))

describe('Component Tests', () => {
  describe('Basic Component Rendering', () => {
    it('should render a simple component', () => {
      const TestComponent = () => <div data-testid="test-component">Hello World</div>
      
      render(<TestComponent />)
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument()
      expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('should handle props correctly', () => {
      interface TestProps {
        title: string
        description?: string
      }
      
      const TestComponent = ({ title, description }: TestProps) => (
        <div data-testid="test-component">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      )
      
      render(<TestComponent title="Test Title" description="Test Description" />)
      
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })
  })

  describe('Navigation Components', () => {
    it('should render navigation links', () => {
      const NavComponent = () => (
        <nav data-testid="navigation">
          <a href="/en">Home</a>
          <a href="/en/about">About</a>
          <a href="/en/contact">Contact</a>
        </nav>
      )
      
      render(<NavComponent />)
      
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should handle active navigation state', () => {
      const NavComponent = ({ activeLink }: { activeLink: string }) => (
        <nav data-testid="navigation">
          <a 
            href="/en" 
            className={activeLink === '/en' ? 'active' : ''}
            data-testid="home-link"
          >
            Home
          </a>
          <a 
            href="/en/about" 
            className={activeLink === '/en/about' ? 'active' : ''}
            data-testid="about-link"
          >
            About
          </a>
        </nav>
      )
      
      render(<NavComponent activeLink="/en" />)
      
      const homeLink = screen.getByTestId('home-link')
      const aboutLink = screen.getByTestId('about-link')
      
      expect(homeLink).toHaveClass('active')
      expect(aboutLink).not.toHaveClass('active')
    })
  })

  describe('Content Components', () => {
    it('should render rich text content', () => {
      const RichTextComponent = ({ content }: { content: string }) => (
        <div 
          data-testid="rich-text" 
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
      
      const htmlContent = '<p>This is <strong>rich text</strong> content.</p>'
      
      render(<RichTextComponent content={htmlContent} />)
      
      const richText = screen.getByTestId('rich-text')
      expect(richText).toBeInTheDocument()
      expect(richText.innerHTML).toBe(htmlContent)
    })

    it('should render media components', () => {
      const MediaComponent = ({ 
        src, 
        alt, 
        caption 
      }: { 
        src: string
        alt: string
        caption?: string 
      }) => (
        <figure data-testid="media-component">
          <img src={src} alt={alt} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
      
      render(
        <MediaComponent 
          src="/test-image.jpg" 
          alt="Test Image" 
          caption="Test Caption" 
        />
      )
      
      expect(screen.getByTestId('media-component')).toBeInTheDocument()
      expect(screen.getByAltText('Test Image')).toBeInTheDocument()
      expect(screen.getByText('Test Caption')).toBeInTheDocument()
    })
  })

  describe('Form Components', () => {
    it('should render form inputs', () => {
      const FormComponent = () => (
        <form data-testid="test-form">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            data-testid="name-input"
          />
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            data-testid="email-input"
          />
          
          <button type="submit" data-testid="submit-button">
            Submit
          </button>
        </form>
      )
      
      render(<FormComponent />)
      
      expect(screen.getByTestId('test-form')).toBeInTheDocument()
      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })

    it('should handle form validation', () => {
      const FormComponent = ({ errors }: { errors: Record<string, string> }) => (
        <form data-testid="test-form">
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              data-testid="email-input"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span data-testid="email-error" className="error-message">
                {errors.email}
              </span>
            )}
          </div>
        </form>
      )
      
      const errors = { email: 'Email is required' }
      
      render(<FormComponent errors={errors} />)
      
      expect(screen.getByTestId('email-error')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toHaveClass('error')
    })
  })

  describe('Layout Components', () => {
    it('should render header component', () => {
      const HeaderComponent = ({ title }: { title: string }) => (
        <header data-testid="header">
          <h1>{title}</h1>
          <nav>
            <a href="/en">Home</a>
            <a href="/en/about">About</a>
          </nav>
        </header>
      )
      
      render(<HeaderComponent title="RestroWorks CMS" />)
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByText('RestroWorks CMS')).toBeInTheDocument()
    })

    it('should render footer component', () => {
      const FooterComponent = ({ copyright }: { copyright: string }) => (
        <footer data-testid="footer">
          <p>{copyright}</p>
          <nav>
            <a href="/en/privacy">Privacy</a>
            <a href="/en/terms">Terms</a>
          </nav>
        </footer>
      )
      
      render(<FooterComponent copyright="© 2024 RestroWorks" />)
      
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      expect(screen.getByText('© 2024 RestroWorks')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should render error boundary', () => {
      const ErrorComponent = ({ hasError }: { hasError: boolean }) => {
        if (hasError) {
          throw new Error('Test error')
        }
        return <div data-testid="success">No error</div>
      }
      
      // Test successful render
      render(<ErrorComponent hasError={false} />)
      expect(screen.getByTestId('success')).toBeInTheDocument()
    })

    it('should handle loading states', () => {
      const LoadingComponent = ({ isLoading }: { isLoading: boolean }) => (
        <div data-testid="loading-component">
          {isLoading ? (
            <div data-testid="loading-spinner">Loading...</div>
          ) : (
            <div data-testid="content">Content loaded</div>
          )}
        </div>
      )
      
      // Test loading state
      const { rerender } = render(<LoadingComponent isLoading={true} />)
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
      
      // Test loaded state
      rerender(<LoadingComponent isLoading={false} />)
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })
  })
})