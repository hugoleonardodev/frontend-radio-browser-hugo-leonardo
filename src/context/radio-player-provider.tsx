'use client'
import React from 'react'

interface RadioPlayerContextProps {
  currentRadio: HTMLAudioElement | null
  playRadio: (audioRef: HTMLAudioElement | null) => void
  stopRadio: (audioRef: HTMLAudioElement | null) => void
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  refreshFavorites: boolean
  setRefreshFavorites: React.Dispatch<React.SetStateAction<boolean>>
}

const RadioPlayerContext = React.createContext<RadioPlayerContextProps | undefined>(undefined)

interface RadioPlayerProviderProps {
  children: React.ReactNode
}

export const RadioPlayerProvider = ({ children }: RadioPlayerProviderProps): React.JSX.Element => {
  const [currentRadio, setCurrentRadio] = React.useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [refreshFavorites, setRefreshFavorites] = React.useState(false)

  console.log('refreshFavorites', refreshFavorites)

  const playRadio = React.useCallback(
    (audioRef: HTMLAudioElement | null): void => {
      if (currentRadio != null && currentRadio !== audioRef) {
        currentRadio.pause()
      }
      setCurrentRadio(audioRef)
      if (audioRef == null) return
      audioRef.play().catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error playing audio:', error)
      })
    },
    [currentRadio],
  )

  const stopRadio = React.useCallback((audioRef: HTMLAudioElement | null): void => {
    if (audioRef != null) {
      audioRef.pause()
      setCurrentRadio(null)
    }
  }, [])

  const radioPlayerContext = React.useMemo(
    () => ({ currentRadio, playRadio, stopRadio, isPlaying, setIsPlaying, refreshFavorites, setRefreshFavorites }),
    [currentRadio, playRadio, stopRadio, isPlaying, setIsPlaying, refreshFavorites, setRefreshFavorites],
  )

  return <RadioPlayerContext.Provider value={radioPlayerContext}>{children}</RadioPlayerContext.Provider>
}

export const useRadioPlayer = (): RadioPlayerContextProps => {
  const context = React.useContext(RadioPlayerContext)
  if (context == null) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider')
  }
  return context
}
