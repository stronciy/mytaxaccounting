import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { logInfo, logError, makeRequestId, sanitizeRequest } from '@/lib/logger'

const SECRET = process.env.BLAZE_SECRET as string

export async function GET(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('blaze.can_publish.request', { requestId, req: sanitizeRequest(req) })
  if (!SECRET) {
    logError('blaze.can_publish.error', { requestId, error: 'Server not configured' })
    return NextResponse.json({ error: 'Server not configured' }, { status: 500, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  const userAgent = req.headers.get('user-agent')
  const ua = (userAgent || '').toLowerCase()
  if (!ua.startsWith('blaze')) {
    logError('blaze.can_publish.forbidden', { requestId, reason: 'Invalid UA' })
    return NextResponse.json({ error: 'rest_cannot_access', message: 'Forbidden' }, { status: 403, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  const authHeader = req.headers.get('x-blaze-auth')
  if (!authHeader) {
    logError('blaze.can_publish.no_token', { requestId })
    return NextResponse.json({ error: 'No token' }, { status: 401, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  try {
    const forwardedHost = req.headers.get('x-forwarded-host')
    const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
    const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin)
    const decoded = jwt.verify(authHeader, SECRET, { algorithms: ['HS256'], issuer: publicOrigin, clockTolerance: 240 }) as any
    if (!decoded.data?.user_id) {
      logError('blaze.can_publish.bad_request', { requestId })
      return NextResponse.json({ code: 'bad_request', message: 'Incomplete data', data: { status: 401 } }, { status: 401, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    logInfo('blaze.can_publish.ok', { requestId, userId: decoded.data.user_id })
    return NextResponse.json({ can_publish: true }, { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  } catch (e: any) {
    const msg = String(e?.message || '')
    if (msg.includes('jwt issuer invalid')) {
      logError('blaze.can_publish.bad_issuer', { requestId })
      return NextResponse.json({ code: 'bad_issuer', message: 'The issuer does not match with this server', data: { status: 401 } }, { status: 401, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    if (e?.name === 'TokenExpiredError') {
      logError('blaze.can_publish.invalid_token_expired', { requestId })
      return NextResponse.json({ code: 'invalid_token', message: 'Expired token', data: { status: 403 } }, { status: 403, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    if (msg.includes('invalid signature')) {
      logError('blaze.can_publish.invalid_token_signature', { requestId })
      return NextResponse.json({ code: 'invalid_token', message: 'Signature verification failed', data: { status: 403 } }, { status: 403, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    logError('blaze.can_publish.verify_failed', { requestId })
    return NextResponse.json({ code: 'invalid_token', message: 'Invalid token', data: { status: 403 } }, { status: 403, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      'Access-Control-Max-Age': '86400',
    },
  })
}
