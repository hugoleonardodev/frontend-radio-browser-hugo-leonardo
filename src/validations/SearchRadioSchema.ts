import { z } from 'zod'

export const searchBy: readonly [string, ...string[]] = [
  'byname',
  'bynameexact',
  'bycountry',
  'bycountryexact',
  'bylanguage',
  'bylanguageexact',
]

export const SearchRadioSchema = z.object({
  searchTerm: z.string().min(2).max(32),
  searchBy: z.enum(searchBy),
})

export type SearchRadioSchemaData = z.infer<typeof SearchRadioSchema>
