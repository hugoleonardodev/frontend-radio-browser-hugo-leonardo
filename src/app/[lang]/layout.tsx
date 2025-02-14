import { Flowbite, ThemeModeScript } from 'flowbite-react'
import React from 'react'
import { Inter, Roboto_Mono } from 'next/font/google'
import { type Metadata } from 'next'
import { type LocalesAvailable } from '@/functions/getDictionary'
import { RadioPlayerProvider } from '@/context/radio-player-provider'
import '@/app/[lang]/globals.css'
import SearchNavigation from '@/components/organisms/search-navigation/search-navigation'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['500'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['500'],
})

export async function generateStaticParams(): Promise<
  Array<{
    lang: string
  }>
> {
  return [{ lang: 'en-US' }, { lang: 'en-GB' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: LocalesAvailable }
}): Promise<React.JSX.Element> {
  return (
    <Flowbite>
      <RadioPlayerProvider>
        <html lang={params.lang}>
          <Head>
            <ThemeModeScript />
          </Head>

          <body className={`${inter.variable} ${robotoMono.variable} flex bg-gray-100 dark:bg-gray-400`}>
            <SearchNavigation />
            <main className="flex items-start w-full">{children}</main>
          </body>
        </html>
      </RadioPlayerProvider>
    </Flowbite>
  )
}

export const metadata: Metadata = {
  title: 'Radio Browser',
  description: 'Radio Browser frontend',
}
