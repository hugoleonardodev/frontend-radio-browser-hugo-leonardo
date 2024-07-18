'use client'
import { useRadioPlayer } from '@/context/radio-player-provider'
import { type RadioData } from '@/types/AllTypes'
import React from 'react'

interface RadioPlayerProps {
  radioData: RadioData
}

const RadioPlayer = ({ radioData }: RadioPlayerProps): React.JSX.Element => {
  const audioRef = React.useRef<null | HTMLAudioElement>(null)

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
  }, [])

  return (
    <div
      className={`text-gray-400 bg-gray-200 hover:bg-gray-200 ${
        currentRadio === audioRef.current ? 'bg-gray-400 dark:bg-gray-600' : 'Play'
      } hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white`}
    >
      <audio ref={audioRef}>
        <source src={radioData.url} type="audio/mpeg" />
        <track kind="captions" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <button onClick={handlePlayPause}>{currentRadio === audioRef.current ? 'Pause' : 'Play'}</button>
      <div className="w-52">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          // style={{ width: '100%' }}
          className="w-full"
        />
      </div>
      <div>{formatTime(currentTime)}</div>
      <div>
        <label htmlFor="volume">Volume</label>
        <input type="range" name="volume" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  )
}

export default RadioPlayer
