import clsx from 'clsx'
import React from 'react'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegister } from 'react-hook-form'

export type ValidFieldNames = 'searchBy' | 'searchTerm'

export interface SearchRadioData {
  searchTerm: string
  searchBy: string
}

export interface SearchByOptions {
  value: string
  description: string
}

export interface InputSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  name: ValidFieldNames
  label: string
  disabled?: boolean
  options: Array<Record<string, string>>
  defaultValue?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  register: UseFormRegister<SearchRadioData>
  dirtyField?: boolean
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | undefined
}

function InputSelect({
  label,
  name,
  options,
  disabled,
  className,
  register,
  dirtyField,
  error,
}: InputSelectProps): React.JSX.Element {
  const inputClass = clsx(
    'block min-w-[7.125rem] px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer',
    {
      'bg-green-50 border border-green-500 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500':
        disabled === false && dirtyField === true && error == null,
    },
    {
      'bg-purple-50 border border-purple-500 text-purple-900 placeholder-purple-700 text-sm rounded-lg focus:ring-purple-500 dark:bg-gray-700 focus:border-purple-500 block w-full p-2.5 dark:text-purple-500 dark:placeholder-purple-500 dark:border-purple-500':
        disabled === false && dirtyField === true && error,
    },
    {
      'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500':
        disabled === true,
    },
    className,
  )
  const labelClasses = clsx(
    'absolute text-sm text-gray-500 bg-gray-200 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
    { 'text-sm font-medium dark:text-green-500': disabled === false && error == null },
    { 'text-sm font-medium text-purple-700 dark:text-purple-500': disabled === false && error },
    {
      'text-sm font-medium text-gray-500 dark:text-gray-300 peer-focus:text-gray-400 peer-focus:dark:text-gray-300':
        disabled === true,
    },
  )
  return (
    <div className="relative " aria-roledescription="input-container">
      <label
        htmlFor={name}
        // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        className={labelClasses}
      >
        {label}
      </label>

      <select
        defaultValue={options[0].description}
        // defaultChecked
        id={name}
        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        className={inputClass}
        {...register(name)}
      >
        {/* {defaultValue != null ? <option selected>{defaultValue}</option> : null} */}

        {options.map(({ description, value }, index) => (
          <option value={value} key={`${index}-${value}`} className="text-gray-900 dark:bg-gray-500 dark:text-white">
            {description}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InputSelect
