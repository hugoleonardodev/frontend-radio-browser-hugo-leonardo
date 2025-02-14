import { type MetadataRoute } from 'next'

const baseUrl = 'https://frontend-radio-browser-hugo-leonardo.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl + '/en-US/',
          es: baseUrl + '/es-ES/',
          pt: baseUrl + '/pt-BR/',
        },
      },
    },
  ]
}
