/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
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
