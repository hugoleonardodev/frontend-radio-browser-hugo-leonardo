import React from 'react'
import { type LocalesAvailable, getDictionary } from '@/functions/getDictionary'
import HomePage from '@/components/page/home-page/home-page'
import { type Metadata, type ResolvingMetadata } from 'next'

interface Props {
  params: { id: string; lang: LocalesAvailable }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    metadataBase: new URL('https://frontend-radio-browser-hugo-leonardo.vercel.app'),
    generator: 'Radio Browser',
    applicationName: 'Radio Browser',
    referrer: 'origin-when-cross-origin',
    keywords: ['radio', 'browser', 'am', 'fm', 'language', 'country', 'streaming', 'music'],
    authors: [{ name: 'Radio Browser', url: 'https://frontend-radio-browser-hugo-leonardo.vercel.app' }],
    creator: 'Radio Browser',
    publisher: 'Radio Browser',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // alternates: {
    //   canonical: '/',
    //   languages: {
    //     'en-US': '/en-US',
    //     'de-DE': '/de-DE',
    //   },
    // },
    title: 'Radio Browser',
    description: 'Radio Browser - Search and hear your favorite radios',
    openGraph: {
      title: 'Radio Browser',
      description: 'Radio Browser - Search and hear your favorite radios',
      url: 'https://frontend-radio-browser-hugo-leonardo.vercel.app/' + params.lang,
      siteName: 'Radio Browser',
      images: [
        {
          url: '/assets/resized-radio-browser.jpg', // Must be an absolute URL
          width: 1200,
          height: 600,
          alt: 'Radio Browser - Logo',
          type: 'image/jpg',
        },
      ],
      locale: params.lang,
      type: 'website',
    },
  }
}

export default async function Home({ params }: { params: { lang: LocalesAvailable } }): Promise<React.JSX.Element> {
  const { lang } = params
  const dictionary = await getDictionary(lang)
  return <HomePage homePageDictionary={dictionary} />
}
