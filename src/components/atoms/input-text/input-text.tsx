import React from 'react'
import clsx from 'clsx'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegister } from 'react-hook-form'
import { type ValidFieldNames, type SearchRadioData } from '../input-select/input-select'

interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  name: ValidFieldNames
  label: string
  touchedField?: boolean
  min?: string | number
  max?: string | number
  minLength?: number
  maxLength?: number
  valueAsNumber?: boolean
  disabled?: boolean
  pattern?: string
  value?: string | number | readonly string[] | undefined
  register: UseFormRegister<SearchRadioData>
  dirtyField?: boolean
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputText: React.FC<InputTextProps> = ({
  type,
  placeholder,
  name,
  label,
  min,
  max,
  minLength,
  maxLength,
  className,
  disabled,
  pattern,
  register,
  error,
  dirtyField,
  onChange,
}) => {
  const inputClass = clsx(
    'block min-w-[9.75rem] px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-800 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer',
    {
      'bg-green-50 border border-green-500 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500':
        disabled === false && dirtyField === true && error == null,
    },
    {
      'bg-purple-50 border border-purple-500 text-purple-900 placeholder-purple-700 text-sm rounded-lg focus:ring-purple-500 dark:bg-gray-700 focus:border-purple-500 block w-full p-2.5 dark:text-purple-500 dark:placeholder-purple-500 dark:border-purple-500':
        disabled === false && dirtyField === true && error,
    },
    {
      'bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-gray-500 dark:focus:border-gray-500':
        disabled === true,
    },
    className,
  )
  const labelClasses = clsx(
    'absolute cursor-text w-[98%] left-[1px] text-base text-gray-500 bg-gray-200 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:w-max peer-[.placeholder-green-700]:w-max peer-[.placeholder-purple-700]:w-max',
    {
      'text-base w-fit text-green-600 font-medium dark:text-green-500':
        disabled === false && dirtyField === true && error == null,
    },
    {
      'text-base w-fit font-medium text-purple-700 dark:text-purple-500':
        disabled === false && dirtyField === true && error != null,
    },
    {
      'text-base w-fit cursor-not-allowed font-medium text-gray-500 dark:text-gray-300 peer-focus:text-gray-400 peer-focus:dark:text-gray-300':
        disabled === true,
    },
  )
  return (
    <div className="relative" aria-roledescription="input-container">
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={inputClass}
        disabled={disabled}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        {...register(name)}
      />

      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
    </div>
  )
}
export default InputText
