import React from 'react'
import { type LocalesAvailable } from '@/functions/getDictionary'

export default async function Home({ params }: { params: { lang: LocalesAvailable } }): Promise<React.JSX.Element> {
  const { lang } = params
  return <div className="flex flex-col md:flex lg:flex xl:flex">Home page main {lang}</div>
}
