/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Next.js Image Optimization enabled (default).
    // Serves WebP/AVIF for better Core Web Vitals.
    // If deploying to a static host without image processing,
    // set unoptimized: true and revisit when moving to VPS.
    formats: ['image/avif', 'image/webp'],
  },
  devIndicators: false,

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https:",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/worknwave',
        destination: '/locations/work-n-wave-puerto-galera',
        permanent: true,
      },
      {
        source: '/worknlake',
        destination: '/locations/work-n-lake-cavinti-laguna',
        permanent: true,
      },
      {
        source: '/worknsurf',
        destination: '/locations/work-n-surf-la-union',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
