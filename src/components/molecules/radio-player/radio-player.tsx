'use client'
import { useRadioPlayer } from '@/context/radio-player-provider'
import { useWindowSize } from '@/hooks'
import { type RadioData } from '@/types/AllTypes'
import React from 'react'

interface RadioPlayerProps {
  radioData: RadioData
}

const RadioPlayer = ({ radioData }: RadioPlayerProps): React.JSX.Element => {
  const audioRef = React.useRef<null | HTMLAudioElement>(null)
  const { width } = useWindowSize()
  const { currentRadio, playRadio, stopRadio, setRefreshFavorites } = useRadioPlayer()
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(100)

  const handlePlayPause = React.useCallback(() => {
    if (audioRef.current != null && currentRadio === audioRef.current) {
      stopRadio(audioRef.current)
    } else {
      playRadio(audioRef.current)
    }
  }, [currentRadio, playRadio, stopRadio])

  const handleTimeUpdate = React.useCallback(() => {
    if (audioRef.current != null) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = React.useCallback(() => {
    if (audioRef.current != null) {
      setDuration(audioRef.current.duration)
    }
  }, [])

  const handleVolumeChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current != null) {
      const newVolume = parseFloat(event.target.value)
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }, [])

  const handleProgressChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current != null) {
      const newTime = parseFloat(event.target.value)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }, [])

  const removeRadioFromFavorites = React.useCallback(() => {
    const store = localStorage.getItem('radio-browser')
    if (store != null) {
      const parsedStore = JSON.parse(store) as RadioData[]
      const result = parsedStore.filter((item: RadioData) => item.stationuuid !== radioData.stationuuid)
      localStorage.setItem('radio-browser', JSON.stringify(result))
      setRefreshFavorites(true)
    }
  }, [radioData.stationuuid, setRefreshFavorites])

  const formatTime = React.useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }, [])

  React.useEffect(() => {
    const currentAudioRef = audioRef.current
    if (currentAudioRef != null) {
      currentAudioRef.addEventListener('timeupdate', handleTimeUpdate)
      currentAudioRef.addEventListener('loadedmetadata', handleLoadedMetadata)
    }
    return () => {
      if (currentAudioRef != null) {
        currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate)
        currentAudioRef.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [handleLoadedMetadata, handleTimeUpdate])

  return (
    <div
      className={`text-gray-400 bg-gray-200 hover:bg-gray-200 flex ${
        currentRadio === audioRef.current ? 'bg-gray-400 dark:bg-gray-800' : 'dark:bg-gray-600'
      } hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white`}
    >
      <audio ref={audioRef}>
        <source src={radioData.url} type="audio/mpeg" />
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>

      {width > 768 ? (
        <div className="w-20">
          <label htmlFor="volume">Volume</label>
          <input
            type="range"
            name="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="-rotate-90 w-12"
          />
        </div>
      ) : null}

      <button onClick={handlePlayPause}>
        {currentRadio === audioRef.current ? (
          <>
            <svg
              className="w-10 h-10 text-gray-800 dark:text-white"
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
                d="M9 6H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 0h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"
              />
            </svg>
            <span className="sr-only">Pause</span>
          </>
        ) : (
          <>
            <svg
              className="w-10 h-10 text-gray-800 dark:text-white"
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
                d="M8 18V6l8 6-8 6Z"
              />
            </svg>
            <span className="sr-only">Play</span>
          </>
        )}
      </button>
      <div className="flex justify-between w-full ml-4">
        <div>
          <h2 className="text-gray-700 dark:text-gray-200 font-bold">
            {width < 768 ? `${radioData.name.substring(0, 32)}...` : radioData.name}
          </h2>
          <h3 className="text-gray-600 dark:text-gray-300 ">
            {radioData.country.length > 32 && width < 768
              ? `${radioData.country.substring(0, 32)}...`
              : radioData.country}
            {/* {radioData.country.length > 0 ? `${radioData.country}` : ''} */}
            {radioData.country.length > 32 ? '' : radioData.state.length > 0 ? `, ${radioData.state}` : ''}
            {radioData.country.length > 32 ? '' : `${radioData.tags.length > 0 ? `, ${radioData.tags}` : ''}`}
          </h3>
          {/* <img className="w-20 h-20 rounded" src={radioData.favicon} alt={radioData.name} /> */}
          <div className="w-52 flex">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              // style={{ width: '100%' }}
              className="w-full"
            />
            <div className="ml-4 text-gray-900 dark:text-gray-300 font-black">{formatTime(currentTime)}</div>
          </div>
        </div>
        <div className="flex">
          {width > 768 ? (
            <button>
              <svg
                className="w-[24px] h-[24px] text-gray-800 dark:text-white"
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
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
              <span className="sr-only">Edit</span>
            </button>
          ) : null}
          <button onClick={removeRadioFromFavorites} value={radioData.stationuuid}>
            <svg
              className="w-[24px] h-[24px] text-gray-800 dark:text-white"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RadioPlayer
