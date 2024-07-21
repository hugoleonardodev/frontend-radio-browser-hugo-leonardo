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
    metadataBase: new URL('https://www.rollershub.com'),
    generator: 'Rollers Hub',
    applicationName: 'Rollers Hub',
    referrer: 'origin-when-cross-origin',
    keywords: ['Patins', 'Onde Patinar', 'Mapa da Patinação', 'Grupos', 'Eventos', 'Notícias', 'Rollers Hub'],
    authors: [{ name: 'Rollers Hub', url: 'https://www.rollershub.com' }],
    creator: 'Rollers Hub',
    publisher: 'Rollers Hub',
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
    title: 'Rollers Hub',
    description: 'Rollers Hub - Conectando patinadores do mundo todo',
    openGraph: {
      title: 'Rollers Hub',
      description: 'Rollers Hub - Conectando patinadores do mundo todo',
      url: 'https://www.rollershub.com/' + params.lang,
      siteName: 'Rollers Hub',
      images: [
        {
          url: '/assets/en-home-thumb-resized.png', // Must be an absolute URL
          width: 1200,
          height: 600,
          alt: 'Rollers Hub - Logo',
          type: 'image/png',
        },
      ],
      locale: params.lang,
      type: 'article',
    },
  }
}
export default async function Home({ params }: { params: { lang: LocalesAvailable } }): Promise<React.JSX.Element> {
  const { lang } = params
  const dictionary = await getDictionary(lang)
  return <HomePage homePageDictionary={dictionary} />
}
