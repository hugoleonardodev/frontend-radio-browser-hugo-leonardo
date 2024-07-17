// https://react.dev/reference/react/experimental_taintUniqueValue#using-server-only-and-taintuniquevalue-to-prevent-leaking-secrets
import 'server-only'

import type dataType from '../../public/locales/en/en.json'

export type DictionaryData = typeof dataType

export type LocalesAvailable = 'en' | 'en-US' | 'en-GB' | 'pt' | 'pt-BR' | 'es' | 'es-ES'

const dictionaries = {
  en: async () => await import('../../public/locales/en/en.json').then(module => module.default),
  'en-US': async () => await import('../../public/locales/en/en.json').then(module => module.default),
  'en-GB': async () => await import('../../public/locales/en/en.json').then(module => module.default),
  pt: async () => await import('../../public/locales/pt/pt.json').then(module => module.default),
  'pt-BR': async () => await import('../../public/locales/pt/pt.json').then(module => module.default),
  es: async () => await import('../../public/locales/es/es.json').then(module => module.default),
  'es-ES': async () => await import('../../public/locales/es/es.json').then(module => module.default),
}

export const getDictionary = async (locale: LocalesAvailable): Promise<DictionaryData> => {
  const currentDictionary = dictionaries[locale]
  const result = await currentDictionary()
  if (Object.keys(result).length > 0) return result
  return await dictionaries.en()
}
