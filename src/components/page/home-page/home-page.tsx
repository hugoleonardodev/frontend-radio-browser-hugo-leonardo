'use client'
import React from 'react'
import RadioPlayer from '@/components/molecules/radio-player'

import { type RadioData } from '@/types/AllTypes'
import { useRadioPlayer } from '@/context/radio-player-provider'
import PaginationRadio from '@/components/molecules/pagination-radio/pagination-radio'
import { DarkThemeToggle } from 'flowbite-react'

export default function HomePage(): React.JSX.Element {
  const { setRefreshFavorites, refreshFavorites } = useRadioPlayer()
  const [storedValue, setValue] = React.useState([] as RadioData[])
  const [currentPage, setCurrentPage] = React.useState(1)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFavorites])

  const currentFavoritesPage = React.useMemo(() => {
    if (storedValue.length > 0) {
      const start = (currentPage - 1) * 10
      const end = start + 10
      return storedValue.slice(start, end)
    }
    return []
  }, [currentPage, storedValue])

  return (
    <div className="flex flex-col w-full bg-gray-200 dark:bg-gray-700">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Radio Browser</h1>
          <h2 className="ml-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white dark:text-gray-300">
            Your favorite radios
          </h2>
        </div>
        <DarkThemeToggle className="bg-transparent hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800" />
        <div className="w-16 h-16 bg-transparent sm:hidden" />
      </div>
      <section className="flex flex-col gap-1 sm:gap-2">
        {currentFavoritesPage.length > 0
          ? currentFavoritesPage.map((radio, index) => <RadioPlayer radioData={radio} key={`${index}-${radio.name}`} />)
          : null}
      </section>
      {storedValue.length > 10 ? (
        <PaginationRadio
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageHasLessThanMaxItems={currentFavoritesPage.length < 10}
        />
      ) : null}
    </div>
  )
}
