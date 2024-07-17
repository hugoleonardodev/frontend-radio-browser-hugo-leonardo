'use client'

import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const withDelay = typeof delay === 'object' ? 500 : delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, withDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
