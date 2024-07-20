import React from 'react'

function SkeletonCard(): React.JSX.Element {
  return (
    <div role="status" className="rounded shadow animate-pulse dark:border-gray-700">
      <div className="flex items-center justify-center h-12 bg-gray-200 text-gray-400 rounded dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SkeletonCard
