import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  // match /en/docs/... or /es/docs/... etc.
  if (/^\/(en|es|fr|de)\/docs\//.test(pathname)) {
    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate')
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/en/docs/:path*', '/es/docs/:path*', '/fr/docs/:path*', '/de/docs/:path*']
}
