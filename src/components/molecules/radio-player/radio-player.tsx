'use client'
import { useRadioPlayer } from '@/context/radio-player-provider'
import { type RadioData } from '@/types/AllTypes'
import React from 'react'

interface RadioPlayerProps {
  radioData: RadioData
}

const RadioPlayer = ({ radioData }: RadioPlayerProps): React.JSX.Element => {
  const audioRef = React.useRef(null)

  const { playRadio, stopRadio } = useRadioPlayer()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(100)

  const handlePlayPause = React.useCallback(() => {
    if (audioRef.current != null) {
      if (isPlaying) {
        stopRadio(audioRef.current)
        setIsPlaying(false)
      } else {
        playRadio(audioRef.current)
        setIsPlaying(true)
      }
    }
  }, [isPlaying, playRadio, stopRadio])

  const handleTimeUpdate = React.useCallback(() => {
    if (audioRef.current != null) {
      const unknownRef = audioRef as unknown
      const currentAudio = unknownRef as React.MutableRefObject<HTMLAudioElement>
      setCurrentTime(currentAudio.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = React.useCallback(() => {
    if (audioRef.current != null) {
      const unknownRef = audioRef as unknown
      const currentAudio = unknownRef as React.MutableRefObject<HTMLAudioElement>
      setDuration(currentAudio.current.duration)
    }
  }, [])

  const handleVolumeChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current != null) {
      const unknownRef = audioRef as unknown
      const currentAudio = unknownRef as React.MutableRefObject<HTMLAudioElement>
      const newVolume = parseFloat(event.target.value)
      currentAudio.current.volume = newVolume
      setVolume(newVolume)
    }
  }, [])

  const handleProgressChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current != null) {
      const unknownRef = audioRef as unknown
      const currentAudio = unknownRef as React.MutableRefObject<HTMLAudioElement>
      const newTime = parseFloat(event.target.value)
      currentAudio.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }, [])

  const formatTime = React.useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }, [])

  React.useEffect(() => {
    const unknownRef = audioRef as unknown
    const currentAudio = unknownRef as React.MutableRefObject<HTMLAudioElement>
    if (currentAudio.current != null) {
      currentAudio.current.addEventListener('timeupdate', handleTimeUpdate)
      currentAudio.current.addEventListener('loadedmetadata', handleLoadedMetadata)
    }
    return () => {
      if (currentAudio.current != null) {
        currentAudio.current.removeEventListener('timeupdate', handleTimeUpdate)
        currentAudio.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [])

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={radioData.url} type="audio/mpeg" />
        <track kind="captions" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          style={{ width: '100%' }}
        />
      </div>
      <div>{formatTime(currentTime)}</div>
      <div>
        <label>Volume</label>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  )
}

export default RadioPlayer
