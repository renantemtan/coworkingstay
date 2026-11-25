# CoWorkingStay — Project Structure

## Overview
Premium coworking hotel website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, featuring three destinations across the Philippines (*Work 'n Wave* in Puerto Galera, *Work 'n Lake* in Cavinti, and *Work 'n Surf* in La Union).

## Architecture
- **JSON Content Layer**: Centralized, strongly-typed JSON content in `/content` loaded via `/lib/content-loader.ts`.
- **Lead Capture APIs**: Validated Next.js Route Handlers (`/api/contact` and `/api/waitlist`) with honeypot + per-IP rate limiting and Resend / Webhook delivery.
- **Dynamic SEO & Social Cards**: Automated `JSON-LD` schemas (`Organization`, `LodgingBusiness`, `FAQPage`), `sitemap.xml`, `robots.txt`, vector favicon (`app/icon.svg`), and dynamic OpenGraph image routes (`app/opengraph-image.tsx`, `app/locations/[slug]/opengraph-image.tsx`).

## Key Directories

### `/app` — App Router Pages & Endpoints
- `page.tsx` — Home page (Hero, Locations Grid, Pillars, Personas, Standard Amenities, Contact)
- `locations/[slug]/page.tsx` — Modular location pages with dynamic metadata and `LodgingBusiness` schema
- `locations/[slug]/opengraph-image.tsx` — Per-location 1200×630 OpenGraph preview generator
- `experience/page.tsx` — Brand mission, pillars, UVP, and target personas
- `faq/page.tsx` — Grouped FAQ accordions with `FAQPage` structured data
- `contact/page.tsx` — Contact details and interactive `ContactForm` (`?subject=` pre-fill supported)
- `policies/page.tsx` — Section-anchored House, Coworking, Booking, and Liability policies
- `api/contact/route.ts` — Contact inquiry validation, rate-limiting, and delivery endpoint
- `api/waitlist/route.ts` — Waitlist signup validation, rate-limiting, and delivery endpoint
- `icon.svg` / `apple-icon.tsx` / `opengraph-image.tsx` — Brand icons and global social card

### `/content` — Structured CMS Data
- `brand.json` — Brand identity, pillars, locations, personas, amenities, and membership plans
- `site.json` — Global site metadata, navigation order, contact details, and social handles
- `pages/contact.json` — Contact page copy and primary contact channels
- `pages/faq.json` — Categorized FAQs and disclaimers
- `pages/policies.json` — Full policy sections and subsections

### `/components`
- `layout/` — `header.tsx` (scroll/hover-aware navigation) and `footer.tsx`
- `forms/` — `contact-form.tsx` (`react-hook-form` + `zod` client form)
- `sections/` — Home sections (`hero.tsx`, `locations-grid.tsx`, `pillars.tsx`, `target-audience.tsx`, `hardware-specs.tsx`, `contact-section.tsx`) and modular `location/*` sections
- `seo/` — `structured-data.tsx` (`OrganizationSchema`, `LocalBusinessSchema`, `FaqSchema`)
- `analytics/` — `google-analytics.tsx` (optional GA4 loader via `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- `ui/` — `shadcn/ui` primitives and `waitlist-modal.tsx`

### `/lib`
- `content-loader.ts` — Server-side JSON loaders
- `lead-delivery.ts` — Resend transactional email + optional webhook delivery
- `rate-limit.ts` — Sliding-window IP rate limiter
- `socials.ts` — Live social URL filter (suppresses `"tbd"` / placeholder links)
- `analytics.ts` — Safe `trackEvent()` helper for conversion events

## Environment Variables
Copy `.env.example` to `.env.local` and configure:
- `RESEND_API_KEY` — Resend API key for transactional email delivery
- `CONTACT_FROM_EMAIL` — Verified sender address (e.g., `CoWorkingStay <noreply@coworkingstay.com>`)
- `CONTACT_RECEIVER_EMAIL` — Destination inbox (defaults to `worknwave@coworkingstay.com`)
- `LEAD_WEBHOOK_URL` — *(Optional)* Webhook URL (Google Apps Script, Make, Zapier, Slack) for spreadsheet/CRM logging
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — *(Optional)* GA4 Measurement ID (`G-XXXXXXXXXX`)

## Commands
- `npm install` — Install dependencies (`package-lock.json` is the lockfile of record)
- `npm run dev` — Start local development server
- `npm run build` — Run production build & TypeScript checks
- `npm run lint` — Run ESLint
