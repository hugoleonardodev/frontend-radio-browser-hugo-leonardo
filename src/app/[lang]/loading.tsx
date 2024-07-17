import { Spinner } from 'flowbite-react'
import React from 'react'

export default function Loading(): JSX.Element {
  return (
    <div className="w-full h-full absolute flex items-center justify-center bg-gray-700 bg-opacity-50 backdrop-blur-sm">
      <Spinner className="fill-purple-600" />
    </div>
  )
}
