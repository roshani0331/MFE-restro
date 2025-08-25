# RestroWorks CMS - Payload 3.0 Next.js Template

A modern, full-stack content management system built with [Payload CMS](https://payloadcms.com) and [Next.js App Router](https://nextjs.org). This template provides a complete restaurant management solution with a beautiful admin interface, multilingual support, and production-ready frontend.

## 🌐 Live Demo

**🚀 [View Live Demo](https://restroworks-cms-demo.vercel.app)**

- **Frontend Website**: [https://restroworks-cms-demo.vercel.app](https://restroworks-cms-demo.vercel.app)
- **Admin Panel**: [https://restroworks-cms-demo.vercel.app/admin](https://restroworks-cms-demo.vercel.app/admin)
- **Demo Credentials**: 
  - Email: `demo@restroworks.com`
  - Password: `demo123456`

> **Note**: The demo is reset every 24 hours. Feel free to explore all features including the multilingual content management and block-based page builder!

## 🚀 Features

- **Modern Stack**: Built with Payload 3.0, Next.js 15, TypeScript, and TailwindCSS
- **Restaurant-Focused**: Tailored for restaurant management with specialized content blocks
- **Admin Interface**: Intuitive admin panel with role-based access control
- **Content Management**: Flexible collections for pages, posts, media, and restaurant-specific content
- **SEO Optimized**: Built-in SEO plugin with meta tags and social sharing
- **Search Functionality**: Full-text search with the official Payload Search plugin
- **Internationalization**: Multi-language support (English/Spanish) with locale-based routing
- **Live Preview**: Real-time content preview in the admin panel
- **Draft System**: Content versioning with scheduled publishing
- **Responsive Design**: Mobile-first design with dark mode support
- **Performance**: Optimized with caching strategies and image optimization
- **Block-Based Builder**: Modular content blocks (Hero, Feature, Testimonial, CTA)
- **Contact Management**: Integrated contact form with CMS data storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or higher)
- **pnpm** (recommended) or npm
- **PostgreSQL** database (local or cloud)

## 🛠️ Setup Instructions

### Prerequisites

Before starting, ensure you have:

- **Node.js** v18.17 or higher ([Download](https://nodejs.org/))
- **pnpm** package manager ([Install](https://pnpm.io/installation))
- **PostgreSQL** database (local or cloud service like Supabase, Railway, or Neon)
- **Git** for version control

### 1. Clone and Initial Setup

```bash
# Clone the repository
git clone https://github.com/roshani0331/MFE-restro.git
cd restroworks-cms

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

### 2. Database Configuration

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** locally:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: Use Homebrew: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

2. **Create a database**:
   ```sql
   createdb restroworks_cms
   ```

3. **Update `.env` file**:
   ```env
   DATABASE_URI=postgresql://username:password@localhost:5432/restroworks_cms
   ```

#### Option B: Cloud Database (Recommended)

**Using Supabase (Free tier available)**:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to Settings → Database
3. Copy the connection string
4. Update your `.env` file:
   ```env
   DATABASE_URI=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres
   ```

**Using Railway**:

1. Go to [railway.app](https://railway.app) and create a PostgreSQL service
2. Copy the connection string from the service variables
3. Update your `.env` file with the provided URL

### 3. Environment Configuration

Edit your `.env` file with the following required variables:

```env
# Database
DATABASE_URI=your_postgresql_connection_string

# Payload Secret (generate a secure random string)
PAYLOAD_SECRET=your_super_secret_key_here

# Next.js Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Optional: Email Configuration (for user invitations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional: Cloud Storage (for production)
# AWS S3
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1

# Optional: Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 4. Initialize the Database

```bash
# Generate database schema and seed initial data
pnpm payload migrate

# Create your first admin user
pnpm payload create-first-user
```

Follow the prompts to create your admin account:
- Email: your-email@example.com
- Password: (choose a secure password)
- Confirm password

### 5. Start Development Servers

#### Option A: Start Both Apps Together
```bash
# Start both CMS and frontend in development mode
pnpm dev
```

This will start:
- **CMS Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Frontend Website**: [http://localhost:3000](http://localhost:3000)

#### Option B: Start Apps Separately

**Terminal 1 - CMS Backend**:
```bash
pnpm dev:payload
# Runs on http://localhost:3000
```

**Terminal 2 - Frontend App**:
```bash
pnpm dev:next
# Runs on http://localhost:3001 (if 3000 is taken)
```

### 6. Verify Installation

1. **Access Admin Panel**: Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. **Login**: Use the credentials you created in step 4
3. **Create Content**: Try creating a new page or post
4. **View Frontend**: Check [http://localhost:3000](http://localhost:3000) to see your content

### 7. Production Deployment

#### Deploy to Vercel (Recommended)

1. **Prepare for deployment**:
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard:
   - Add all variables from your `.env` file
   - Update `NEXT_PUBLIC_SERVER_URL` to your production domain

4. **Set up database migrations**:
   ```bash
   # Run migrations on production
   vercel env pull .env.production
   pnpm payload migrate
   ```

#### Alternative Deployment Options

- **Netlify**: Use the Netlify CLI or connect your Git repository
- **Railway**: Connect your GitHub repo for automatic deployments
- **DigitalOcean App Platform**: Deploy directly from Git
- **Docker**: Use the included `Dockerfile` for containerized deployment

### 8. Post-Deployment Setup

1. **Create production admin user**:
   ```bash
   pnpm payload create-first-user
   ```

2. **Configure email settings** for user invitations and notifications

3. **Set up monitoring** and error tracking (optional)

4. **Configure CDN** for media assets (optional)

### Troubleshooting

#### Common Issues

**Database Connection Error**:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
- Ensure PostgreSQL is running
- Check your `DATABASE_URI` in `.env`
- Verify database credentials

**Port Already in Use**:
```
Error: listen EADDRINUSE: address already in use :::3000
```
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use a different port: `PORT=3001 pnpm dev`

**Build Errors**:
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `pnpm type-check`

**Environment Variables Not Loading**:
- Ensure `.env` file is in the root directory
- Restart the development server
- Check for typos in variable names

### Development Scripts

```bash
# Development
pnpm dev              # Start both apps
pnpm dev:payload      # Start only CMS
pnpm dev:next         # Start only frontend

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm payload migrate  # Run database migrations
pnpm payload seed     # Seed sample data

# Testing
pnpm test            # Run all tests
pnpm test:unit       # Run unit tests
pnpm test:int        # Run integration tests
pnpm test:e2e        # Run end-to-end tests
pnpm test:coverage   # Generate coverage report

# Code Quality
pnpm lint            # Run ESLint
pnpm type-check      # Run TypeScript checks
pnpm format          # Format code with Prettier
```

### 5. Start Development Server

```bash
pnpm dev
```

### 6. Initial Setup

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Follow the on-screen instructions to create your first admin user
3. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)
4. Click "Seed Database" to populate with sample content

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   ├── admin/             # Admin panel integration
│   └── api/               # API routes
├── collections/           # Payload collections (Users, Posts, Pages, etc.)
├── components/            # React components
│   ├── Header/           # Site header with navigation
│   ├── Footer/           # Site footer
│   └── blocks/           # Content blocks for page builder
├── fields/               # Custom Payload fields
├── globals/              # Global configurations (Header, Footer)
├── lib/                  # Utility functions and configurations
└── payload.config.ts     # Main Payload configuration
```

## 🏛️ CMS Architecture & Modeling Choices

### Content Modeling Strategy

This CMS is designed specifically for restaurant businesses with flexibility and scalability in mind. Our content modeling approach balances ease of use for non-technical users with powerful customization capabilities for developers.

#### **Collections Design Philosophy**

We've structured our collections around the core needs of restaurant websites:
- **Content Flexibility**: Block-based architecture allows unlimited layout possibilities
- **Multilingual Support**: Built-in internationalization for global restaurant chains
- **SEO Optimization**: Every content type includes comprehensive SEO fields
- **Performance**: Optimized for fast loading and excellent user experience
- **Scalability**: Architecture supports growth from single location to enterprise

#### **Core Collections**

**1. Users Collection (`src/collections/Users.ts`)**
```typescript
// Role-based access control with restaurant-specific permissions
roles: ['admin', 'editor', 'manager', 'staff']
```
- **Admin**: Full system access, user management, global settings
- **Editor**: Content creation/editing, media management
- **Manager**: Location-specific content, menu updates
- **Staff**: Limited access to specific content areas
- Secure authentication with email verification
- Profile management with avatar and contact information
- Activity logging for content changes

**2. Pages Collection (`src/collections/Pages.ts`)**
```typescript
// Flexible page builder with restaurant-focused blocks
layout: [
  { blockType: 'hero' },      // Landing page headers
  { blockType: 'feature' },   // Restaurant features/services
  { blockType: 'testimonial' }, // Customer reviews
  { blockType: 'cta' }        // Reservations/contact CTAs
]
```
- **Block-based architecture**: Unlimited layout combinations
- **SEO-optimized**: Meta titles, descriptions, Open Graph tags
- **Hierarchical structure**: Parent-child relationships for complex site structures
- **Slug-based routing**: Automatic URL generation with custom override options
- **Draft/Published workflow**: Content staging and scheduled publishing
- **Multilingual support**: Locale-specific content with fallbacks

**3. Posts Collection (`src/collections/Posts.ts`)**
```typescript
// Blog/news content optimized for restaurants
fields: [
  'title', 'content', 'excerpt', 'featuredImage',
  'categories', 'tags', 'author', 'publishedDate'
]
```
- **Rich content editor**: Lexical editor with media embedding
- **Category taxonomy**: Organize content (News, Events, Recipes, etc.)
- **Author attribution**: Staff member profiles and bylines
- **Featured content**: Highlight important announcements
- **Social sharing**: Built-in sharing optimization

**4. Media Collection (`src/collections/Media.ts`)**
```typescript
// Centralized asset management with restaurant focus
sizes: {
  thumbnail: { width: 400, height: 300 },
  card: { width: 768, height: 576 },
  hero: { width: 1920, height: 1080 }
}
```
- **Automatic optimization**: WebP conversion, multiple sizes
- **Focal point selection**: Smart cropping for different aspect ratios
- **Alt text enforcement**: Accessibility compliance
- **Folder organization**: Categorize by type (food, interior, staff, etc.)
- **Usage tracking**: See where media is used across the site

**5. Categories Collection (`src/collections/Categories.ts`)**
```typescript
// Hierarchical taxonomy for content organization
structure: {
  'News': ['Announcements', 'Events', 'Press'],
  'Menu': ['Appetizers', 'Mains', 'Desserts', 'Beverages'],
  'About': ['History', 'Team', 'Awards']
}
```
- **Nested categories**: Unlimited depth for complex taxonomies
- **Cross-collection usage**: Shared across posts, pages, and custom content
- **SEO-friendly**: Descriptions and meta data for category pages
- **Multilingual**: Translated category names and descriptions

#### **Global Configurations**

**Header Global (`src/globals/Header.ts`)**
```typescript
// Site-wide navigation with restaurant focus
fields: [
  'logo', 'navigation', 'ctaButton', 'contactInfo',
  'socialLinks', 'languageSwitcher'
]
```
- **Dynamic navigation**: Automatically updates across all pages
- **Contact integration**: Phone, address, hours display
- **Social media links**: Instagram, Facebook, etc.
- **Call-to-action buttons**: Reservations, ordering, contact
- **Language switcher**: Seamless multilingual navigation

**Footer Global (`src/globals/Footer.ts`)**
```typescript
// Footer content with restaurant essentials
fields: [
  'contactInfo', 'hours', 'socialLinks', 'legalPages',
  'newsletter', 'locationMap'
]
```
- **Contact information**: Address, phone, email
- **Business hours**: Dynamic display with special hours
- **Legal compliance**: Privacy policy, terms of service
- **Newsletter signup**: Email marketing integration
- **Location integration**: Google Maps embedding

#### **Restaurant-Specific Content Blocks**

**Hero Block (`src/blocks/Hero/Component.tsx`)**
- **High-impact headers**: Full-screen images with overlay text
- **Call-to-action buttons**: Reservations, menu viewing, contact
- **Video backgrounds**: Showcase restaurant atmosphere
- **Mobile optimization**: Responsive design with touch-friendly CTAs

**Feature Block (`src/blocks/Feature/Component.tsx`)**
- **Service highlights**: Dining options, catering, events
- **Icon integration**: Visual representation of features
- **Grid layouts**: Flexible arrangements for different content amounts
- **Link integration**: Deep links to relevant pages

**Testimonial Block (`src/blocks/Testimonial/Component.tsx`)**
- **Customer reviews**: Social proof and credibility
- **Star ratings**: Visual rating display
- **Customer photos**: Authentic review presentation
- **Review source integration**: Google, Yelp, TripAdvisor

**Call-to-Action Block (`src/blocks/CallToAction/Component.tsx`)**
- **Conversion optimization**: Strategic placement and design
- **Multiple CTAs**: Reservations, ordering, contact, newsletter
- **A/B testing ready**: Easy variation testing
- **Analytics integration**: Track conversion performance

### **Why These Modeling Choices?**

#### 1. **Restaurant Industry Focus**
- **Customer Journey Mapping**: Content blocks align with typical restaurant customer interactions
- **Conversion Optimization**: Strategic CTA placement throughout the content flow
- **Social Proof Integration**: Reviews and testimonials prominently featured
- **Contact Accessibility**: Multiple touchpoints for customer communication

#### 2. **Technical Excellence**
- **Performance First**: Optimized queries, image handling, and caching strategies
- **SEO Optimization**: Every content type includes comprehensive SEO fields
- **Accessibility Compliance**: WCAG guidelines built into content structure
- **Mobile-First Design**: Responsive layouts optimized for mobile ordering

#### 3. **Content Management Efficiency**
- **Block-Based Flexibility**: Non-technical users can create complex layouts
- **Reusable Components**: Consistent design patterns across the site
- **Content Relationships**: Smart linking between related content
- **Workflow Integration**: Draft/publish cycles with approval processes

#### 4. **Scalability & Growth**
- **Multi-location Support**: Architecture supports restaurant chains
- **Role-Based Permissions**: Granular access control for different staff levels
- **API-First Design**: Headless capabilities for mobile apps and third-party integrations
- **Performance Monitoring**: Built-in analytics and performance tracking

#### 5. **Developer Experience**
- **TypeScript Integration**: Full type safety across the application
- **Component Architecture**: Reusable, maintainable code structure
- **Testing Framework**: Comprehensive test coverage for reliability
- **Documentation**: Inline code documentation and usage examples

## 📝 Creating and Editing Content

### Creating Pages

#### Step 1: Access the Admin Panel
1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with your admin credentials
3. Click on "Pages" in the sidebar

#### Step 2: Create a New Page
1. Click the "Create New" button
2. Fill in the basic page information:
   - **Title**: The page title (used for SEO and navigation)
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Parent**: Optional parent page for hierarchical structure

#### Step 3: Build Your Page Layout
Use the **Layout Builder** to add content blocks:

1. **Add Blocks**: Click "+ Add Block" to see available block types
2. **Configure Blocks**: Each block has specific fields and options
3. **Reorder Blocks**: Drag and drop to rearrange content
4. **Preview**: Use the preview button to see your changes

#### Step 4: SEO and Meta Data
1. Scroll to the **SEO** section
2. Add meta title, description, and keywords
3. Upload social sharing images
4. Configure Open Graph settings

#### Step 5: Publish
1. **Save Draft**: Save without publishing
2. **Publish**: Make the page live on your website
3. **Schedule**: Set a future publish date

### Working with Content Blocks

#### Available Block Types

**1. Hero Block**
```
Use for: Landing page headers, main banners
Fields:
- Headline (rich text)
- Subheading (text)
- Background image/video
- Call-to-action buttons
- Overlay settings
```

**2. Content Block**
```
Use for: Main content areas, articles
Fields:
- Rich text editor (with media embedding)
- Column layout options
- Background colors/images
```

**3. Media Block**
```
Use for: Image galleries, videos
Fields:
- Media selection (single/multiple)
- Caption and alt text
- Display options (grid, carousel)
```

**4. Call to Action Block**
```
Use for: Conversion sections, sign-ups
Fields:
- Headline and description
- Button text and link
- Background styling
```

**5. Archive Block**
```
Use for: Blog listings, news feeds
Fields:
- Collection to display (Posts, Pages)
- Number of items
- Filtering options
- Layout style
```

#### Block Configuration Tips

1. **Consistent Styling**: Use the same color schemes across blocks
2. **Mobile Responsiveness**: Preview on different screen sizes
3. **Performance**: Optimize images before uploading
4. **Accessibility**: Always add alt text to images

### Editing Existing Content

#### Quick Edit
1. Navigate to the content list (Pages, Posts, etc.)
2. Click the edit icon next to any item
3. Make your changes and save

#### Bulk Operations
1. Select multiple items using checkboxes
2. Use the bulk actions dropdown:
   - Publish/Unpublish
   - Delete
   - Duplicate

#### Version History
1. Open any content item
2. Click "Versions" tab
3. Compare versions and restore if needed

### Managing Media Assets

#### Uploading Media
1. Go to "Media" in the admin sidebar
2. Click "Upload" or drag files directly
3. Add alt text and captions
4. Organize into folders

#### Image Optimization
- **Automatic Resizing**: Images are automatically optimized
- **Multiple Formats**: WebP and fallback formats generated
- **Focal Point**: Set the important area for cropping

### Content Workflow

#### Draft → Review → Publish
1. **Draft**: Work on content without affecting live site
2. **Preview**: Use live preview to see changes
3. **Review**: Share preview links with stakeholders
4. **Publish**: Make content live

#### Scheduled Publishing
1. Set a future publish date
2. Content automatically goes live at scheduled time
3. Email notifications sent to relevant users

### Best Practices

1. **SEO Optimization**:
   - Write descriptive meta titles (50-60 characters)
   - Create compelling meta descriptions (150-160 characters)
   - Use header tags (H1, H2, H3) properly
   - Add alt text to all images

2. **Content Structure**:
   - Use consistent block layouts
   - Break up long content with media blocks
   - Include clear calls-to-action

3. **Performance**:
   - Optimize images before upload
   - Use appropriate image formats
   - Minimize the number of blocks per page

4. **User Experience**:
   - Test on mobile devices
   - Ensure fast loading times
   - Use clear navigation structure

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel and unpublished content. See [Access Control](#access-control) for more details.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Posts

  Posts are used to generate blog posts, news articles, or any other type of content that is published over time. All posts are layout builder enabled so you can generate unique layouts for each post using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Posts are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Pages

  All pages are layout builder enabled so you can generate unique layouts for each page using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Pages are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

- #### Categories

  A taxonomy used to group posts together. Categories can be nested inside of one another, for example "News > Technology". See the official [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) for more details.

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Access control

Basic access control is setup to limit access to various content based based on publishing status.

- `users`: Users can access the admin panel and create or edit content.
- `posts`: Everyone can access published posts, but only users can create, update, or delete them.
- `pages`: Everyone can access published pages, but only users can create, update, or delete them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Layout Builder

Create unique page layouts for any type of content using a powerful layout builder. This template comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

Each block is fully designed and built into the front-end website that comes with this template. See [Website](#website) for more details.

## Lexical editor

A deep editorial experience that allows complete freedom to focus just on writing content without breaking out of the flow with support for Payload blocks, media, links and other features provided out of the box. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

All posts and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/examples/draft-preview).

## Live preview

In addition to draft previews you can also enable live preview to view your end resulting page as you're editing content with full support for SSR rendering. See [Live preview docs](https://payloadcms.com/docs/live-preview/overview) for more details.

## On-demand Revalidation

We've added hooks to collections and globals so that all of your pages, posts, footer, or header changes will automatically be updated in the frontend via on-demand revalidation supported by Nextjs.

> Note: if an image has been changed, for example it's been cropped, you will need to republish the page it's used on in order to be able to revalidate the Nextjs image cache.

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Search

This template also pre-configured with the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Jobs and Scheduled Publish

We have configured [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) which uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) in order to publish or unpublish your content on a scheduled time. The tasks are run on a cron schedule and can also be run as a separate instance if needed.

> Note: When deployed on Vercel, depending on the plan tier, you may be limited to daily cron only.

## Website

This template includes a beautifully designed, production-ready front-end built with the [Next.js App Router](https://nextjs.org), served right alongside your Payload app in a instance. This makes it so that you can deploy both your backend and website where you need it.

Core features:

- [Next.js App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)
- User Accounts and Authentication
- Fully featured blog
- Publication workflow
- Dark mode
- Pre-made layout building blocks
- SEO
- Search
- Redirects
- Live preview

### Cache

Although Next.js includes a robust set of caching strategies out of the box, Payload Cloud proxies and caches all files through Cloudflare using the [Official Cloud Plugin](https://www.npmjs.com/package/@payloadcms/payload-cloud). This means that Next.js caching is not needed and is disabled by default. If you are hosting your app outside of Payload Cloud, you can easily reenable the Next.js caching mechanisms by removing the `no-store` directive from all fetch requests in `./src/app/_api` and then removing all instances of `export const dynamic = 'force-dynamic'` from pages files, such as `./src/app/(pages)/[slug]/page.tsx`. For more details, see the official [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).

## Development

To spin up this example locally, follow the [Quick Start](#quick-start). Then [Seed](#seed) the database with a few pages, posts, and projects.

### Working with Postgres

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

#### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploy with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to run them and it will keep a record of migrations that have been run in the database.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with a few pages, posts, and projects you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@example.com`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
1. When you're ready to go live, see Deployment below for more details.

### Deploying to Payload Cloud

The easiest way to deploy your project is to use [Payload Cloud](https://payloadcms.com/new/import), a one-click hosting solution to deploy production-ready instances of your Payload apps directly from your GitHub repo.

### Deploying to Vercel

This template can also be deployed to Vercel for free. You can get started by choosing the Vercel DB adapter during the setup of the template or by manually installing and configuring it:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  // ...
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // ...
```

We also support Vercel's blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // ...
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // ...
```

There is also a simplified [one click deploy](https://github.com/payloadcms/payload/tree/templates/with-vercel-postgres) to Vercel should you need it.

### Self-hosting

Before deploying your app, you need to:

1. Ensure your app builds and serves in production. See [Production](#production) for more details.
2. You can then deploy Payload as you would any other Node.js or Next.js application either directly on a VPS, DigitalOcean's Apps Platform, via Coolify or more. More guides coming soon.

You can also deploy your app manually, check out the [deployment documentation](https://payloadcms.com/docs/production/deployment) for full details.

## 🔧 Troubleshooting

### Common Issues

#### 404 Errors on Home Page
If you're seeing 404 errors, ensure you've:
1. Created an admin user through the setup process
2. Seeded the database with initial content
3. Run `pnpm generate:importmap` after installation

#### Database Connection Issues
- Verify your `DATABASE_URI` in `.env` is correct
- Ensure PostgreSQL is running and accessible
- Check that the database exists and user has proper permissions

#### Import Map Generation Errors
```bash
# Clear cache and regenerate
rm -rf .next
pnpm generate:importmap
pnpm dev
```

#### Module Resolution Errors
If you encounter module resolution issues:
1. Delete `node_modules` and `pnpm-lock.yaml`
2. Run `pnpm install` again
3. Restart the development server

### Performance Tips

- Use `pnpm` instead of `npm` for faster installs
- Enable caching in production environments
- Optimize images using the built-in Next.js Image component
- Consider using a CDN for media files

## 📚 API Documentation

### REST API Endpoints

The application automatically generates REST API endpoints for all collections:

```
GET    /api/pages          # Get all pages
GET    /api/pages/:id      # Get page by ID
POST   /api/pages          # Create new page
PATCH  /api/pages/:id      # Update page
DELETE /api/pages/:id      # Delete page

GET    /api/posts          # Get all posts
GET    /api/posts/:id      # Get post by ID
POST   /api/posts          # Create new post
PATCH  /api/posts/:id      # Update post
DELETE /api/posts/:id      # Delete post

GET    /api/users          # Get all users (admin only)
GET    /api/users/me       # Get current user
POST   /api/users/login    # User login
POST   /api/users/logout   # User logout
```

### GraphQL API

Access the GraphQL playground at `/api/graphql` when in development mode.

### Authentication

API endpoints require authentication for write operations. Include the session cookie or use API keys for programmatic access.

## 🧪 Testing

### Test Suite Overview

Our comprehensive testing strategy ensures reliability and maintainability across all application layers:

- **Unit Tests**: Component logic, utility functions, and business logic
- **Integration Tests**: API endpoints, database operations, and service interactions
- **End-to-End Tests**: Complete user workflows and critical business processes
- **Performance Tests**: Load testing and optimization validation

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run specific test suites
pnpm test:unit        # Unit tests only
pnpm test:integration # Integration tests only
pnpm test:e2e         # End-to-end tests only

# Run tests for specific components
pnpm test -- --testPathPattern=Header
pnpm test -- --testPathPattern=blocks
```

### Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── components/         # React component tests
│   │   ├── Header.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── blocks/
│   │       ├── Hero.test.tsx
│   │       ├── Feature.test.tsx
│   │       ├── Testimonial.test.tsx
│   │       └── CallToAction.test.tsx
│   ├── lib/               # Utility function tests
│   │   ├── utils.test.ts
│   │   └── validation.test.ts
│   └── hooks/             # Custom hook tests
│       └── useTranslations.test.ts
├── integration/            # Integration tests
│   ├── api/               # API endpoint tests
│   │   ├── pages.test.ts
│   │   ├── posts.test.ts
│   │   ├── users.test.ts
│   │   └── contact.test.ts
│   ├── collections/       # Payload collection tests
│   │   ├── Pages.test.ts
│   │   ├── Posts.test.ts
│   │   └── Media.test.ts
│   └── database/          # Database operation tests
│       └── migrations.test.ts
└── e2e/                   # End-to-end tests
    ├── admin/             # Admin panel workflows
    │   ├── login.spec.ts
    │   ├── content-creation.spec.ts
    │   ├── media-upload.spec.ts
    │   └── user-management.spec.ts
    ├── frontend/          # Frontend user journeys
    │   ├── homepage.spec.ts
    │   ├── contact-form.spec.ts
    │   ├── language-switching.spec.ts
    │   └── navigation.spec.ts
    └── performance/       # Performance tests
        ├── page-load.spec.ts
        └── image-optimization.spec.ts
```

### Key Test Cases

#### **Unit Tests**

**Component Tests (`tests/unit/components/`)**
```typescript
// Header.test.tsx - Navigation component testing
describe('Header Component', () => {
  it('renders navigation links correctly', () => {
    // Test navigation rendering
  })
  
  it('displays language switcher', () => {
    // Test multilingual functionality
  })
  
  it('shows contact link in both desktop and mobile', () => {
    // Test responsive navigation
  })
})

// Hero.test.tsx - Hero block testing
describe('Hero Block', () => {
  it('renders with all required props', () => {
    // Test hero block rendering
  })
  
  it('handles CTA button clicks', () => {
    // Test call-to-action functionality
  })
  
  it('displays background images correctly', () => {
    // Test image handling
  })
})
```

**Utility Tests (`tests/unit/lib/`)**
```typescript
// utils.test.ts - Utility function testing
describe('Utility Functions', () => {
  it('formats dates correctly for different locales', () => {
    // Test internationalization utilities
  })
  
  it('validates email addresses', () => {
    // Test form validation
  })
  
  it('generates proper slugs from titles', () => {
    // Test URL generation
  })
})
```

#### **Integration Tests**

**API Tests (`tests/integration/api/`)**
```typescript
// pages.test.ts - Pages API testing
describe('Pages API', () => {
  it('creates new pages with valid data', async () => {
    // Test page creation endpoint
  })
  
  it('returns 404 for non-existent pages', async () => {
    // Test error handling
  })
  
  it('supports multilingual content', async () => {
    // Test internationalization
  })
})

// contact.test.ts - Contact form testing
describe('Contact API', () => {
  it('processes contact form submissions', async () => {
    // Test form processing
  })
  
  it('validates required fields', async () => {
    // Test form validation
  })
  
  it('stores submissions in database', async () => {
    // Test data persistence
  })
})
```

**Collection Tests (`tests/integration/collections/`)**
```typescript
// Pages.test.ts - Pages collection testing
describe('Pages Collection', () => {
  it('enforces required fields', async () => {
    // Test field validation
  })
  
  it('generates SEO metadata automatically', async () => {
    // Test SEO functionality
  })
  
  it('handles block-based layouts', async () => {
    // Test layout builder
  })
})
```

#### **End-to-End Tests**

**Admin Panel Tests (`tests/e2e/admin/`)**
```typescript
// content-creation.spec.ts - Content management testing
describe('Content Creation Workflow', () => {
  it('allows admin to create and publish pages', async () => {
    // Test complete page creation workflow
  })
  
  it('supports draft preview functionality', async () => {
    // Test preview system
  })
  
  it('handles media upload and optimization', async () => {
    // Test media management
  })
})

// user-management.spec.ts - User administration testing
describe('User Management', () => {
  it('creates users with different roles', async () => {
    // Test role-based access control
  })
  
  it('enforces permission restrictions', async () => {
    // Test security measures
  })
})
```

**Frontend Tests (`tests/e2e/frontend/`)**
```typescript
// homepage.spec.ts - Homepage functionality testing
describe('Homepage Experience', () => {
  it('loads all content blocks correctly', async () => {
    // Test homepage rendering
  })
  
  it('handles Get Started button clicks', async () => {
    // Test CTA functionality
  })
  
  it('displays content in correct language', async () => {
    // Test internationalization
  })
})

// contact-form.spec.ts - Contact form testing
describe('Contact Form', () => {
  it('submits form data successfully', async () => {
    // Test form submission
  })
  
  it('displays validation errors', async () => {
    // Test form validation
  })
  
  it('shows success message after submission', async () => {
    // Test user feedback
  })
})
```

### Test Configuration

**Jest Configuration (`jest.config.js`)**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx}',
    '<rootDir>/tests/**/*.spec.{ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

**Playwright Configuration (`playwright.config.ts`)**
```typescript
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
```

### Testing Best Practices

#### **1. Test Organization**
- **Descriptive Names**: Use clear, descriptive test names
- **Logical Grouping**: Group related tests in describe blocks
- **Setup/Teardown**: Use beforeEach/afterEach for test isolation
- **Mock Management**: Proper mocking of external dependencies

#### **2. Coverage Goals**
- **Minimum 80% Coverage**: Maintain high code coverage
- **Critical Path Testing**: 100% coverage for critical business logic
- **Edge Case Testing**: Test error conditions and edge cases
- **Performance Testing**: Monitor and test performance metrics

#### **3. Continuous Integration**
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm test:coverage
      - run: pnpm test:e2e
```

#### **4. Test Data Management**
- **Fixtures**: Use consistent test data
- **Database Seeding**: Automated test data setup
- **Cleanup**: Proper test data cleanup
- **Isolation**: Tests should not depend on each other

### Running Tests in Development

```bash
# Start test database
docker-compose up test-db

# Run tests with file watching
pnpm test:watch

# Run specific test file
pnpm test Header.test.tsx

# Run tests with debugging
pnpm test:debug

# Generate and view coverage report
pnpm test:coverage
open coverage/lcov-report/index.html
```

### Performance Testing

```bash
# Load testing with Artillery
pnpm test:load

# Lighthouse performance testing
pnpm test:lighthouse

# Bundle size analysis
pnpm test:bundle-size
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URI=your-production-database-url
PAYLOAD_SECRET=your-production-secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### Build Commands

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any issues or questions:

- 📖 Check the [Payload Documentation](https://payloadcms.com/docs)
- 💬 Join the [Payload Discord](https://discord.com/invite/payload)
- 🐛 Report bugs via [GitHub Issues](https://github.com/payloadcms/payload/issues)
- 💡 Start a [GitHub Discussion](https://github.com/payloadcms/payload/discussions)

## 🙏 Acknowledgments

- [Payload CMS](https://payloadcms.com) for the amazing headless CMS
- [Next.js](https://nextjs.org) for the React framework
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
#   M F E - r e s t r o 
 
 