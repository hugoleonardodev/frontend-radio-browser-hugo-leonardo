'use client'
import React from 'react'
import RadioPlayer from '@/components/molecules/radio-player'

import { type RadioData } from '@/types/AllTypes'
import { useRadioPlayer } from '@/context/radio-player-provider'

export default function HomePage(): React.JSX.Element {
  const { setRefreshFavorites, refreshFavorites } = useRadioPlayer()
  const [storedValue, setValue] = React.useState([] as RadioData[])

  React.useEffect(() => {
    const store = localStorage.getItem('radio-browser')
    if (store == null) {
      localStorage.setItem('radio-browser', JSON.stringify([]))
      setValue([] as RadioData[])
    } else {
      setValue(JSON.parse(store) as RadioData[])
    }
  }, [])

  React.useEffect(() => {
    if (refreshFavorites) {
      const store = localStorage.getItem('radio-browser')
      if (store != null) {
        const parsedStore = JSON.parse(store) as RadioData[]
        setValue(parsedStore)
        setRefreshFavorites(false)
      }
    }
  }, [refreshFavorites])
  // console.log('storedValue', storedValue)
  // console.log('storedValue', localStorage.getItem('test'))
  return (
    <div className="flex flex-col w-full">
      <h1>Radio Browser</h1>
      <h2>Favorite Radios</h2>
      <section>
        {storedValue.length > 0
          ? storedValue.map((radio, index) => <RadioPlayer radioData={radio} key={`${index}-${radio.name}`} />)
          : null}
      </section>
    </div>
  )
}
