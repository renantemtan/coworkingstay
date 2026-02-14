# CoWorkingStay - Project Structure

## Overview
A premium co-working space website built with Next.js 16, featuring three locations across the Philippines with dynamic routing, animations, and responsive design.

## Architecture
- **Headless-Local Model**: All content driven by centralized JSON data model in `/lib/content-loader.ts`
- **Type-Safe**: Full TypeScript support with interfaces in `/types/content.ts`
- **Server-Side Rendering**: Leverages Next.js App Router for optimal performance

## Key Directories

### `/app` - Next.js App Router Pages
- **`page.tsx`** - Home page with hero, pillars, locations grid, amenities, and pricing
- **`locations/[slug]/page.tsx`** - Dynamic location detail pages with metadata
- **`experience/page.tsx`** - Experience overview page
- **`faq/page.tsx`** - FAQ with accordion component
- **`contact/page.tsx`** - Contact form and location information
- **`policies/page.tsx`** - Privacy, terms, community guidelines
- **`not-found.tsx`** - 404 error page
- **`layout.tsx`** - Root layout with font imports and metadata

### `/components`
- **`layout/`**
  - `header.tsx` - Navigation with dropdown menu for locations
  - `footer.tsx` - Multi-column footer with links and contact info
- **`sections/`** (Page components)
  - `hero.tsx` - Hero section with animations
  - `pillars.tsx` - 3-pillar feature section (Performance, Freedom, Synergy)
  - `locations-grid.tsx` - Location cards with status badges
  - `hardware-specs.tsx` - Amenities showcase
  - `booking.tsx` - Membership pricing tier section

### `/lib`
- **`content-loader.ts`** - Mock data for locations, pillars, and site content
- Mock data includes gated logic for internet failover capabilities

### `/types`
- **`content.ts`** - TypeScript interfaces for Location, Pillar, Site data structures

### `/public`
- **`/locations/`** - Generated location images (Puerto Galera, Cavinti, La Union)

## Design System

### Typography
- **Sora** - Brand headings (h1, h2, h3)
- **Inter** - UI body text and labels
- **Caveat** - Accent/taglines

### Color Palette
- **Primary**: #0158F5 (Blue) - Main brand color, CTAs
- **Secondary**: #03B1F7 (Sky) - Secondary actions
- **Accent**: #03D2D8 (Aqua) - Highlights
- **Neutral**: White/grays for backgrounds and text

### Visual Elements
- **Border Radius**: 20px (rounded-lg in Tailwind)
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Animations**: Framer Motion for fade-in and slide-up effects

## Content Model

### Locations
Three premium co-working spaces with attributes:
- **Status**: Open or Soon
- **Capabilities**: Internet failover, high-speed internet, private offices, coworking spaces
- **Booking Form**: Links to Google Forms (customizable URLs)
- **Booking Type**: "request" for open locations, "waitlist" for upcoming

### Pillars
Three core value propositions:
1. **Performance** - Elite office infrastructure
2. **Freedom** - Nature and adventure
3. **Synergy** - Community and collaboration

## Key Features

### Dynamic Routing
- Location pages auto-generate from content model
- `generateStaticParams()` enables static generation

### SEO Optimization
- Dynamic metadata for each location page
- Proper page titles and descriptions

### Responsive Design
- Mobile-first approach
- Tailwind responsive prefixes (sm:, md:, lg:)
- Mobile menu with location dropdown

### Animations
- Framer Motion for entrance animations
- Scroll-triggered animations with `whileInView`
- Smooth page transitions

### Booking Integration
- Membership pricing tiers
- Google Forms integration (anchor links to #booking)
- Dynamic CTA based on location status

## Development Notes

### Add New Location
1. Update SITE_CONTENT in `/lib/content-loader.ts`
2. Add location image to `/public/locations/`
3. Dynamic page generates automatically

### Customize Content
- Edit `/lib/content-loader.ts` for text, features, capabilities
- Update colors in `/app/globals.css` CSS variables
- Modify animations in individual component files

### Dependencies
- **framer-motion**: Animations and interactions
- **lucide-react**: Icon library
- **shadcn/ui**: Pre-built components
- **tailwindcss**: Styling framework

## Future Enhancements
- CMS integration (Sanity, Contentful, etc.)
- Member authentication and dashboard
- Booking system integration
- Blog/resources section
- Email newsletter signup
- Analytics tracking
- Multi-language support
