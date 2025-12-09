import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { logInfo, logError, makeRequestId, sanitizeRequest } from '@/lib/logger'

const SECRET = process.env.BLAZE_SECRET as string
const USERNAME = process.env.BLAZE_USERNAME as string
const PASSWORD = process.env.BLAZE_PASSWORD as string

export async function POST(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('blaze.token.request', { requestId, req: sanitizeRequest(req) })
  if (!SECRET || !USERNAME || !PASSWORD) {
    logError('blaze.token.error', { requestId, error: 'Server not configured' })
    return NextResponse.json({ error: 'Server not configured' }, { status: 500, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  const { username, password } = await req.json()

  if (username !== USERNAME || password !== PASSWORD) {
    logError('blaze.token.invalid_credentials', { requestId, username })
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const now = Math.floor(Date.now() / 1000)
  const forwardedHost = req.headers.get('x-forwarded-host')
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
  const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin)
  const payload = {
    iss: publicOrigin,
    iat: now,
    nbf: now,
    exp: now + 300,
    data: { user_id: 1 },
  }

  const token = jwt.sign(payload, SECRET, { algorithm: 'HS256' })
  logInfo('blaze.token.issued', { requestId, userId: 1 })
  return NextResponse.json({ token }, { headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
  } })
}

export async function GET(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('blaze.token.route_check', { requestId, req: sanitizeRequest(req) })
  return NextResponse.json({ ok: true, method: 'POST' }, { headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
  } })
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
