import { NextRequest, NextResponse } from 'next/server'
import { logInfo } from '@/lib/logger'

function sanitizeHeaders(h: Headers) {
  const out: Record<string, string> = {}
  h.forEach((v, k) => {
    const key = k.toLowerCase()
    if (key === 'authorization' || key === 'x-blaze-auth' || key === 'cookie') {
      out[k] = 'REDACTED'
    } else {
      out[k] = v
    }
  })
  return out
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const headers = sanitizeHeaders(req.headers)
  logInfo('http.request', {
    method: req.method,
    path: url.pathname,
    search: url.search,
    headers,
    ua: req.headers.get('user-agent') || '',
    ip: req.headers.get('x-forwarded-for') || '',
  })
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/wp-json/:path*']
}
