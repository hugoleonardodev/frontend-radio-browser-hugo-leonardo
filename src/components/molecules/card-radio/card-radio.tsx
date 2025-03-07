import { useRadioPlayer } from '@/context/radio-player-provider'
import { type RadioData } from '@/types/AllTypes'
import React from 'react'

interface CardRadioProps {
  radio: RadioData
}

function CardRadio({ radio }: CardRadioProps): React.JSX.Element {
  const { setRefreshFavorites, refreshFavorites } = useRadioPlayer()
  const [isFavorite, setIsFavorite] = React.useState(false)

  const addRadioToFavorite = React.useCallback(() => {
    const store = localStorage.getItem('radio-browser')
    if (store != null) {
      const parsedStore = JSON.parse(store) as RadioData[]
      parsedStore.push(radio)
      localStorage.setItem('radio-browser', JSON.stringify(parsedStore))
      setRefreshFavorites(true)
    }
  }, [radio, setRefreshFavorites])

  React.useEffect(() => {
    const store = localStorage.getItem('radio-browser')
    if (store != null) {
      const parsedStore = JSON.parse(store) as RadioData[]
      const result = parsedStore.some((item: RadioData) => item.stationuuid === radio.stationuuid)
      setIsFavorite(result)
    } else {
      setIsFavorite(false)
    }
  }, [radio.stationuuid])

  React.useEffect(() => {
    if (refreshFavorites) {
      const store = localStorage.getItem('radio-browser')
      if (store != null) {
        const parsedStore = JSON.parse(store) as RadioData[]
        const result = parsedStore.some((item: RadioData) => item.stationuuid === radio.stationuuid)
        setIsFavorite(result)
        setRefreshFavorites(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFavorites])

  return (
    <button className="w-[99%] flex justify-between cursor-pointer" onClick={addRadioToFavorite} disabled={isFavorite}>
      <h3 className="text-xl font-bold dark:text-gray-200">
        {radio.name.trim() === ''
          ? radio.country
          : radio.name.length > 32
            ? `${radio.name.substring(0, 32)}...`
            : radio.name}
      </h3>
      {isFavorite ? (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
      ) : null}
    </button>
  )
}

export default CardRadio
