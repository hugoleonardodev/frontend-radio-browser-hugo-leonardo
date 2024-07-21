import { type Infer } from 'next/dist/compiled/superstruct'
import { type FieldError, type FieldErrorsImpl, type Merge, type UseFormRegister } from 'react-hook-form'

export interface RadioData {
  changeuuid: string
  stationuuid: string
  serveruuid: string | null
  name: string
  url: string
  url_resolved: string
  homepage: string
  favicon: string
  tags: string
  country: string
  countrycode: string
  iso_3166_2: any
  state: string
  language: string
  languagecodes: string
  votes: number
  lastchangetime: string
  lastchangetime_iso8601: string
  codec: string
  bitrate: number
  hls: number
  lastcheckok: number
  lastchecktime: string
  lastchecktime_iso8601: string
  lastcheckoktime: string
  lastcheckoktime_iso8601: string
  lastlocalchecktime: string
  lastlocalchecktime_iso8601: string
  clicktimestamp: string
  clicktimestamp_iso8601: string
  clickcount: number
  clicktrend: number
  ssl_error: number
  geo_lat: number | null
  geo_long: number | null
  has_extended_info: boolean
  user_notes?: string
}

export type ValidFieldNames = 'searchBy' | 'searchTerm' | 'radioName' | 'userNotes'

export interface SearchRadioData {
  searchTerm: string
  searchBy: string
}

export interface SearchByOptions {
  value: string
  description: string
}

export interface EditRadioData {
  radioName: string
  userNotes: string
}

export type AuthFormData = Infer<SearchRadioData | EditRadioData>

export interface InputSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  name: ValidFieldNames
  label: string
  disabled?: boolean
  options: Array<Record<string, string>>
  defaultValue?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  register: UseFormRegister<AuthFormData>
  dirtyField?: boolean
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | undefined
}

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
  register: UseFormRegister<AuthFormData>
  dirtyField?: boolean
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
