import React from 'react'

interface PaginationRadionProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function PaginationRadio({ currentPage, setCurrentPage }: PaginationRadionProps): React.JSX.Element {
  const handlePagination = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.currentTarget.value === 'next') {
        setCurrentPage(currentPage + 1)
      } else {
        setCurrentPage(currentPage - 1)
      }
    },
    [currentPage, setCurrentPage],
  )
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            onClick={handlePagination}
            value="previous"
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span>Previous</span>
          </button>
        </li>

        <li>
          <p
            // href="#"
            aria-current="page"
            className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            Current page: {currentPage}
          </p>
        </li>

        <li>
          <button
            onClick={handlePagination}
            value="next"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span>Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationRadio
