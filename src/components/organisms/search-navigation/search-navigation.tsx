'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useWindowSize } from '@/hooks'
import clsx from 'clsx'

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
      className={`${toggleSettings ? 'w-full' : width < 767 ? 'w-fit' : 'w-64'} sm:min-w-96 transition-transform ${
        toggleSettings ? '' : '-translate-x-[100vw]'
      } ${width < 767 ? '' : 'fixed'} fixed min-w-fit sm:translate-x-0 sm:relative z-20`}
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
          } sm:translate-x-0 sm:relative text-gray-400 bg-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white`}
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

      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <svg
              className={returnSvgClsx('/profile')}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>

            <span className={returnSpanClsx('/profile')}>{searchNavigationDictionary?.hello ?? 'Profile'}</span>
          </li>

          <li>
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
              <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
              <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
            </svg>

            <span className="flex-1 ms-3 whitespace-nowrap text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white sm:text-2xl sm:font-extrabold">
              {searchNavigationDictionary?.hello ?? 'Dashboard'}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SearchNavigation
