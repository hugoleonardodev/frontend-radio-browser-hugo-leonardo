'use client'
import { Button, Spinner } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import ClientHTTP from '@/classes/ClientHTTP'
import { API_BASE_URL } from '@/constants/api'

import InputSelect from '@/components/atoms/input-select'
import InputText from '@/components/atoms/input-text'
import SkeletonCard from '@/components/atoms/skeleton-card'
import { type RadioData } from '@/types/AllTypes'
import { SearchRadioSchema, type SearchRadioSchemaData } from '@/validations/SearchRadioSchema'
import PaginationRadio from '@/components/molecules/pagination-radio/pagination-radio'
import CardRadio from '@/components/molecules/card-radio'

const api = new ClientHTTP()

function SearchRadioForm(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)

  const { register, formState, handleSubmit, getValues } = useForm<SearchRadioSchemaData>({
    mode: 'all',
    resolver: zodResolver(SearchRadioSchema),
  })

  const [hasError, setHasError] = React.useState<null | unknown>(null)
  const [responseRadioData, setResponseRadioData] = React.useState<RadioData[]>([])

  const { errors, dirtyFields } = formState

  const onSubmit = async (data: SearchRadioSchemaData): Promise<void> => {
    setIsLoading(true)
    const { searchBy, searchTerm } = data
    try {
      const response = await api.get(API_BASE_URL + `/${searchBy}/${searchTerm}?limit=10&offset=0`)
      if (response.status === 200) {
        setResponseRadioData(response.data as RadioData[])
        setIsLoading(false)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error.searchRadioForm', error)
      setResponseRadioData([])
      setHasError(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setIsLoading(true)

    api
      .get(
        API_BASE_URL + `/${getValues('searchBy')}/${getValues('searchTerm')}?limit=10&offset=${(currentPage - 1) * 10}`,
      )
      .then(response => {
        if (response.status === 200) {
          setResponseRadioData(response.data as RadioData[])
          setIsLoading(false)
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('error.searchRadioForm', error)
        setResponseRadioData([])
        setHasError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentPage, getValues])

  return (
    <section className="h-full bg-gray-200 dark:bg-gray-900">
      <h1 className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Radio Browser</h1>
      <h2 className="ml-2 font-bold tracking-tight text-gray-900 dark:text-gray-300">
        Search by name, country or language
      </h2>
      <div className="sm:py-4 px-2 sm:px-4 mx-auto max-w-screen-2xl text-center lg:py-8 z-10 relative">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto sm:flex text-start"
        >
          <div className="flex flex-row sm:flex-col xl:flex-row gap-2 sm:gap-4">
            <div className="flex  justify-between">
              <div className="">
                <h3 className="mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white">Filter</h3>

                <InputSelect
                  label="Filter by"
                  name="searchBy"
                  options={[
                    { value: 'byname', description: 'Name' },
                    { value: 'bycountry', description: 'Country' },
                    { value: 'bylanguage', description: 'Language' },
                  ]}
                  error={errors.searchBy}
                  register={register}
                  id="searchBy"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="relative">
              <h4 className="mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white">Search term</h4>

              <InputText
                label="Type a search term"
                name="searchTerm"
                type="text"
                id="searchTerm"
                placeholder="BBC Radio, England, English"
                tabIndex={0}
                error={errors.searchTerm}
                dirtyField={dirtyFields.searchTerm}
                register={register}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center">
              <Button
                type="submit"
                color="primary"
                className="mt-[1.825rem] sm:mt-[2.125rem] w-full sm:w-fit font-extrabold p-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="fill-purple-600 mr-2" />
                ) : (
                  <svg
                    className="text-gray-900 dark:text-white"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                )}
                <span className="hidden sm:block text-gray-900 dark:text-white">Search</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="w-full h-4">
          {hasError != null && hasError instanceof Error ? (
            <h6 className="mt-2 text-sm text-purple-600 dark:text-purple-500 font-medium">{hasError.message}</h6>
          ) : hasError != null ? (
            <h6 className="mt-2 text-sm text-purple-600 dark:text-purple-500 font-medium">
              There was an error. Try again later.
              {JSON.stringify(hasError)}
            </h6>
          ) : null}
        </div>
      </div>

      <h2 className="text-2xl text-center mb-2 sm:mb-4 dark:text-gray-200">Radios found</h2>

      <div className="grid grid-cols-1 gap-2 w-full h-full">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={`${index}-event-skeleton-card`} />)
        ) : responseRadioData.length > 0 ? (
          <div>
            {responseRadioData.map((radio, index) => (
              <CardRadio key={`${index}-radio-${radio.name}-card`} radio={radio} />
            ))}
            <PaginationRadio
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageHasLessThanMaxItems={responseRadioData.length < 10}
            />
          </div>
        ) : (
          <div>
            <h3>No results for the search term:</h3>
            <p>
              filter: {getValues('searchBy')}, term: {getValues('searchTerm')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchRadioForm
