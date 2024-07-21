/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['en','en-US', 'en-GB', 'pt', 'pt-BR', 'es', 'es-ES'], // Suas localidades suportadas
  //   defaultLocale: 'en-US',
  // },
  images: {
    dangerouslyAllowSVG: true,
    //   contentDispositionType: 'attachment',
    //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hugoleonardodev.github.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:locale/assets/:path*',
        destination: '/assets/:path*',
      },
      // {
      //   source: '/:locale/:path*',
      //   destination: '/:path*',
      // },
      {
        source: '/:path*.xml',
        destination: '/:path*.xml',
      },
      // {
      //   source: '/:locale/robots.txt',
      //   destination: '/robots.txt',
      // },
      {
        source: '/robots.txt',
        destination: '/robots.txt',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:lang/api/:path*',
        has: [
          {
            type: 'query',
            key: 'limit',
          },
          {
            type: 'query',
            key: 'offset',
          },
        ],
        destination: '/api/:path*',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
