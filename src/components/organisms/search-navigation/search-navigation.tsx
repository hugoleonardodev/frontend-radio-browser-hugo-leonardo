'use client'
import React from 'react'
import { useWindowSize } from '@/hooks'
import SearchRadioForm from '../search-radio-form/search-radio-form'

interface SearchNavigationProps {
  searchNavigationDictionary?: {
    hello: string
  }
}

function SearchNavigation({ searchNavigationDictionary }: SearchNavigationProps): React.JSX.Element {
  const { width } = useWindowSize()
  const [toggleSettings, setToggleSettings] = React.useState(false)

  const handleToggle = React.useCallback(() => {
    setToggleSettings(!toggleSettings)
  }, [toggleSettings])

  return (
    <aside
      id="default-sidebar"
      className={`w-[100vw] sm:w-[40vw] transition-transform ${
        toggleSettings ? '' : '-translate-x-[100vw]'
      } fixed sm:translate-x-0 sm:relative z-20`}
      aria-label="Sidebar"
    >
      {width < 767 ? (
        <button
          type="button"
          onClick={handleToggle}
          data-drawer-hide="drawer-left-example"
          aria-controls="drawer-left-example"
          className={`transition-transform ${
            toggleSettings ? '' : 'translate-x-[100vw]'
          } sm:translate-x-0 sm:relative z-30 text-gray-400 bg-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white`}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>

          <span className="sr-only">Close menu</span>
        </button>
      ) : null}

      <SearchRadioForm />
    </aside>
  )
}

export default SearchNavigation
