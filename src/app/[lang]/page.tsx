import React from 'react'
import { type LocalesAvailable } from '@/functions/getDictionary'
import RadioPlayer from '@/components/molecules/radio-player'

import tenRadios from '@/data/ten-radios.json'
import HomePage from '@/components/page/home-page/home-page'

export default async function Home({ params }: { params: { lang: LocalesAvailable } }): Promise<React.JSX.Element> {
  const { lang } = params
  return <HomePage />
}
