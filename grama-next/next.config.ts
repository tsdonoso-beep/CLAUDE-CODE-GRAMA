import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Prerenderizar páginas de talleres en build time
  // generateStaticParams en cada page.tsx define los slugs
  experimental: {
    // typedRoutes: true, // habilitar cuando todos los links usen href tipado
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
  },
}

export default nextConfig
