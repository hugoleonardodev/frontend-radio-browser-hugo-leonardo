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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hugoleonardodev.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'postimg.cc',
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
      //   source: '/:path*.txt',
      //   destination: '/:path*.txt',
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
}

module.exports = nextConfig
