import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { logInfo, logError, makeRequestId, sanitizeRequest } from '@/lib/logger'

const SECRET = process.env.BLAZE_SECRET as string

export async function GET(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('blaze.can_publish.request', { requestId, req: sanitizeRequest(req) })
  if (!SECRET) {
    logError('blaze.can_publish.error', { requestId, error: 'Server not configured' })
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const authHeader = req.headers.get('x-blaze-auth')
  if (!authHeader) {
    logError('blaze.can_publish.no_token', { requestId })
    return NextResponse.json({ error: 'No token' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(authHeader, SECRET) as any
    if (decoded.iss !== req.nextUrl.origin || !decoded.data?.user_id) {
      logError('blaze.can_publish.invalid_token', { requestId })
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    logInfo('blaze.can_publish.ok', { requestId, userId: decoded.data.user_id })
    return NextResponse.json({ can_publish: true })
  } catch {
    logError('blaze.can_publish.verify_failed', { requestId })
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }
}
