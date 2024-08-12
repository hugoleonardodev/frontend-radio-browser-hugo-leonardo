'use client'
import { DarkThemeToggle } from 'flowbite-react'
import NextImage from 'next/image'
import React from 'react'
import RadioPlayer from '@/components/molecules/radio-player'
import { type RadioData } from '@/types/AllTypes'
import { useRadioPlayer } from '@/context/radio-player-provider'
import PaginationRadio from '@/components/molecules/pagination-radio/pagination-radio'
import RadioBrowserImage from '@/assets/resized-radio-browser.jpg'
import { type HomePageDictionaryData } from '@/types/DictionaryTypes'

interface HomePageProps {
  children?: React.ReactNode
  homePageDictionary: HomePageDictionaryData
}

export default function HomePage({ homePageDictionary }: HomePageProps): React.JSX.Element {
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
    if (storedValue.length > 0 && currentPage > 1) {
      const start = (currentPage - 1) * 10
      const end = start + 10
      return storedValue.slice(start, end)
    } else {
      setCurrentPage(1)
      return storedValue.slice(0, 10)
    }
  }, [currentPage, storedValue])

  return (
    <div className="flex flex-col h-full w-full bg-gray-200 dark:bg-gray-700">
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
      <section className="flex flex-col gap-1 sm:gap-2 h-full">
        {currentFavoritesPage.length > 0 ? (
          currentFavoritesPage.map((radio, index) => (
            <RadioPlayer
              radioData={radio}
              key={`${index}-${radio.name}`}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center min-h-[94vh] sm:min-h-none bg-gray-200 dark:bg-gray-700">
            <NextImage src={RadioBrowserImage} alt="Radio Browser" width={300} height={300} className="rounded-lg" />
            <h3 className="text-lg font-bold tracking-tight mt-4 text-gray-900 dark:text-white">
              You have not added any favorite radios yet.
            </h3>
            <p className="tracking-tight text-center text-gray-900 dark:text-gray-300">
              Add radios to your favorites by clicking on the search radio button.
            </p>
            <p className="tracking-tight text-gray-900 dark:text-gray-300">
              After adding a radio, it will appear here.
            </p>
            <p className="tracking-tight text-gray-900 dark:text-gray-300">
              You can serch by name, country or language.
            </p>
            <p className="tracking-tight text-gray-900 dark:text-gray-300">Enjoy!</p>
          </div>
        )}
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
