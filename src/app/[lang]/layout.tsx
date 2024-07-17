import { Flowbite } from 'flowbite-react'
import React from 'react'
import { Inter, Roboto_Mono } from 'next/font/google'
import { type Metadata } from 'next'
import { type LocalesAvailable } from '@/functions/getDictionary'
import '../../app/[lang]/globals.css'

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
      <html lang={params.lang}>
        {/* <Head>
          <ThemeModeScript />
        </Head> */}

        <body className={`${inter.variable} ${robotoMono.variable} `}>
          <main className="flex items-start sm:items-start justify-center p-4 sm:p-8 gap-8">{children}</main>
        </body>
      </html>
    </Flowbite>
  )
}

export const metadata: Metadata = {
  title: 'Radio Browser',
  description: 'Radio Browser frontend',
}
