import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = [
  'en-US',
  'pt-BR',
  'es-ES',
  // 'fr-FR',
  // 'de-DE',
  // 'nl-NL',
  // 'it-IT',
  // 'ru-RU',
  // 'pl-PL',
  // 'en-GB',
  // 'ja-JP',
  // 'ko-KR',
  // 'zh-CN',
  // 'zh-TW',
]

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': 'pt-BR,pt,es-ES,es;q=0.9' }
  const languages = new Negotiator({ headers }).languages()
  const defaultLocale = 'en-US'
  const result = match(languages, locales, defaultLocale)
  return result // -> 'en-US'
}

export function middleware(request: NextRequest): NextResponse<unknown> | undefined {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  // skiping robots.txt and sitemap.xml from adding locale
  if (pathname.endsWith('robots.txt') || pathname.endsWith('sitemap.xml')) return

  // Check if pathname includes locale
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
