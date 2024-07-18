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

const api = new ClientHTTP()

function SearchRadioForm(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)
  const { register, formState, handleSubmit } = useForm<SearchRadioSchemaData>({
    mode: 'all',
    resolver: zodResolver(SearchRadioSchema),
  })

  const [hasError, setHasError] = React.useState<null | unknown>(null)
  const [radioData, setRadioData] = React.useState<RadioData[]>([])

  const { errors, dirtyFields } = formState

  const onSubmit = async (data: SearchRadioSchemaData): Promise<void> => {
    setIsLoading(true)
    const { searchBy, searchTerm } = data
    try {
      const response = await api.get(API_BASE_URL + `/${searchBy}/${searchTerm}?limit=10&offset=0`)
      console.log('response', response)
      if (response.status === 200) {
        // const result = await response.json()
        setRadioData(response.data as RadioData[])
        setIsLoading(false)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error.searchRadioForm', error)
      setRadioData([])
      setHasError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="sm:py-4 px-2 sm:px-4 mx-auto max-w-screen-2xl text-center lg:py-8 z-10 relative">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto sm:flex text-start"
        >
          <div className="sm:flex justify-around w-full">
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="mt-4">
                <h4 className="mt-6 mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Select a filter
                </h4>

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
              <h4 className="mt-6 mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white">Search term</h4>

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
            <div className="flex items-center mt-6 sm:mt-2">
              <Button
                type="submit"
                color="primary"
                className="mt-6 w-full sm:w-fit font-extrabold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="fill-purple-600 mr-2" />
                ) : (
                  <svg
                    className="mr-2"
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
                )}{' '}
                Search
              </Button>
            </div>
          </div>
        </form>
        <div className="w-full h-8">
          {hasError != null && hasError instanceof Error ? (
            <h6 className="mt-2 text-sm text-purple-600 dark:text-purple-500 font-medium">{hasError.message}</h6>
          ) : hasError != null ? (
            <h6 className="mt-2 text-sm text-purple-600 dark:text-purple-500 font-medium">
              Houve um erro. Tente novamente mais tarde.
              {JSON.stringify(hasError)}
            </h6>
          ) : null}
        </div>
      </div>

      <h2 className="text-4xl text-center mb-4 sm:mb-8 dark:text-gray-200">Radios encontradas</h2>

      <div className="grid grid-cols-1 gap-4 gap-y-8 sm:gap-y-16 w-full h-full sm:ml-12">
        {isLoading ? (
          Array.from({ length: 7 }).map((_, index) => <SkeletonCard key={`${index}-event-skeleton-card`} />)
        ) : radioData.length > 0 ? (
          radioData.map((radio, index) => (
            <div key={`${index}-radio-${radio.name}-card`} className="max-w-[100vw]">
              <h1 className="text-2xl font-bold dark:text-gray-200">{radio.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{radio.url}</p>
            </div>
          ))
        ) : (
          <div> Sem Resultados </div>
        )}
      </div>
    </section>
  )
}

export default SearchRadioForm
