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
      className={`w-[100vw] sm:w-[50vw] min-h-[100vh] ${toggleSettings ? 'overflow-scroll' : ''} transition-transform ${
        toggleSettings ? '' : '-translate-x-[100vw]'
      } absolute sm:translate-x-0 sm:relative z-20 bg-gray-400 dark:bg-gray-900`}
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
          } md:translate-x-0 md:relative z-30 text-gray-100 bg-gray-200 absolute hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm top-1 end-1 items-center justify-center dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white`}
        >
          {toggleSettings ? (
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          ) : (
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
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          )}

          <span className="sr-only">Close menu</span>
        </button>
      ) : null}

      <SearchRadioForm />
    </aside>
  )
}

export default SearchNavigation
