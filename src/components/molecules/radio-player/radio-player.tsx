'use client'
import { useRadioPlayer } from '@/context/radio-player-provider'
import { useWindowSize } from '@/hooks'
import { type RadioData } from '@/types/AllTypes'
import React from 'react'
import ModalEditRadio from '../modal-edit-radio/modal-edit-radio'
import ModalDeleteRadio from '../modal-delete-radio/modal-delete-radio'

interface RadioPlayerProps {
  radioData: RadioData
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const RadioPlayer = ({ radioData, currentPage, setCurrentPage }: RadioPlayerProps): React.JSX.Element => {
  const audioRef = React.useRef<null | HTMLAudioElement>(null)
  const { width } = useWindowSize()
  const { currentRadio, playRadio, stopRadio } = useRadioPlayer()
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

  // const removeRadioFromFavorites = React.useCallback(() => {
  //   const store = localStorage.getItem('radio-browser')
  //   if (store != null) {
  //     const parsedStore = JSON.parse(store) as RadioData[]
  //     const result = parsedStore.filter((item: RadioData) => item.stationuuid !== radioData.stationuuid)
  //     localStorage.setItem('radio-browser', JSON.stringify(result))
  //     setRefreshFavorites(true)
  //   }
  // }, [radioData.stationuuid, setRefreshFavorites])

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
    // <Tooltip content={radioData.user_notes != null ? radioData.user_notes : 'No notes'}>
    <div
      className={`text-gray-400 bg-gray-300 hover:bg-gray-400 flex w-full sm:mx-2 ${
        currentRadio === audioRef.current ? 'bg-gray-400 dark:bg-gray-800' : 'dark:bg-gray-600'
      } hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white`}
      title={`${radioData.name}, ${radioData.country}, ${radioData.tags} \n*** User Notes: ${
        radioData.user_notes ?? 'No notes'
      }`}
    >
      <audio ref={audioRef}>
        <source src={radioData.url} type="audio/mpeg" />
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>

      {width > 768 ? (
        <div className="w-20">
          <label htmlFor={`${radioData.changeuuid}-volume`} className="text-gray-900 dark:text-gray-300">
            Volume
          </label>
          <input
            type="range"
            id={`${radioData.changeuuid}-volume`}
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="-rotate-90 w-12 relative top-2"
          />
        </div>
      ) : null}

      <button onClick={handlePlayPause} className="rounded-full">
        {currentRadio === audioRef.current ? (
          <>
            <svg
              className="w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="sr-only">Pause</span>
          </>
        ) : (
          <>
            <svg
              className="w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="sr-only">Play</span>
          </>
        )}
      </button>
      <div className="flex justify-between w-full sm:ml-4">
        <div>
          <h2 className="text-gray-700 dark:text-gray-200 font-bold">
            {width < 768
              ? `${radioData.name.trim() === '' ? 'Invalid name' : radioData.name.substring(0, 24)}...`
              : `${
                  radioData.name.trim() === ''
                    ? 'Invalid name. Click edit to update.'
                    : radioData.name.length > 64
                      ? `${radioData.name.substring(0, 64)}...`
                      : radioData.name
                }`}
          </h2>
          <h3 className="text-gray-600 dark:text-gray-300 ">
            {radioData.country.length > 16 && width < 768
              ? `${radioData.country.substring(0, 16)}...`
              : radioData.country}
            {radioData.country.length > 16 ? '' : radioData.state.length > 0 ? `, ${radioData.state}` : ''}
            {radioData.tags.length > 8
              ? `${radioData.tags
                  .split(',')
                  .filter(item => item.length < 8)
                  .slice(0, 3)
                  .join(',')}...`
              : `, ${radioData.tags}`}
          </h3>
          <label htmlFor={`${radioData.changeuuid}-progress`} className="sr-only">
            Progress
          </label>
          <div className="w-52 flex">
            <input
              id={`${radioData.changeuuid}-progress`}
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full"
            />
            <div className="ml-2 sm:ml-4 text-gray-900 dark:text-gray-300 font-black">{formatTime(currentTime)}</div>
          </div>
        </div>
        <div className="flex">
          {width > 768 ? (
            <ModalEditRadio radioData={radioData}>
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
            </ModalEditRadio>
          ) : null}
          <ModalDeleteRadio radioData={radioData} currentPage={currentPage} setCurrentPage={setCurrentPage}>
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
          </ModalDeleteRadio>
        </div>
      </div>
    </div>
  )
}

export default RadioPlayer
