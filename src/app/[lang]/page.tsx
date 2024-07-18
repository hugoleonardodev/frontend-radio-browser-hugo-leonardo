import React from 'react'
import { type LocalesAvailable } from '@/functions/getDictionary'
import RadioPlayer from '@/components/molecules/radio-player'

import tenRadios from '@/data/ten-radios.json'

export default async function Home({ params }: { params: { lang: LocalesAvailable } }): Promise<React.JSX.Element> {
  const { lang } = params
  return (
    <div className="flex flex-col">
      Home page main {lang}
      {/* <SearchRadio /> */}
      <section>
        {tenRadios.map((radio, index) => (
          <div key={`${index}-${radio.name}`}>
            <h2>{radio.name}</h2>
            {/* <p>{radio.url}</p> */}
            <RadioPlayer radioData={radio} />
          </div>
        ))}
      </section>
    </div>
  )
}
