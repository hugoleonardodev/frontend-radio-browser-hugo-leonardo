'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useWindowSize } from '@/hooks'
import clsx from 'clsx'
import SearchRadioForm from '../search-radio-form/search-radio-form'

interface SearchNavigationProps {
  searchNavigationDictionary?: {
    hello: string
  }
}

function SearchNavigation({ searchNavigationDictionary }: SearchNavigationProps): React.JSX.Element {
  const pathname = usePathname()
  const { width } = useWindowSize()
  const [toggleSettings, setToggleSettings] = React.useState(false)

  const handleToggle = React.useCallback(() => {
    setToggleSettings(!toggleSettings)
  }, [toggleSettings])

  function returnSvgClsx(currentPathname: string): string {
    const svgClsx = clsx('w-4 h-4 text-gray-600 lg:w-6 lg:h-6 dark:text-gray-300', {
      'text-purple-600 dark:text-purple-300': pathname.endsWith(currentPathname),
    })
    return svgClsx
  }
  function returnSpanClsx(currentPathname: string): string {
    const spanClsx = clsx(
      'ms-3 flex-1 whitespace-nowrap text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white sm:text-2xl sm:font-extrabold',
      {
        'text-gray-900': pathname.endsWith(currentPathname),
      },
    )
    return spanClsx
  }
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
