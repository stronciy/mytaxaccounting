import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { promises as fs } from 'fs'
import path from 'path'
import { logInfo, logError, makeRequestId, sanitizeRequest } from '@/lib/logger'

const SECRET = process.env.BLAZE_SECRET as string
const STORE_PATH = path.join(process.cwd(), 'data', 'blog-local.json')

async function readStore(): Promise<any[]> {
  try {
    const data = await fs.readFile(STORE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (e: any) {
    if (e.code === 'ENOENT') return []
    throw e
  }
}

async function writeStore(posts: any[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(posts, null, 2), 'utf8')
}

function getOrigin(req: NextRequest) {
  const forwardedHost = req.headers.get('x-forwarded-host')
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
  return process.env.NEXT_PUBLIC_SITE_URL || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin)
}

export async function POST(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('batch.request', { requestId, req: sanitizeRequest(req) })
  if (!SECRET) {
    logError('batch.error', { requestId, error: 'Server not configured' })
    return NextResponse.json({ error: 'Server not configured' }, { status: 500, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  let payload: any
  try {
    payload = await req.json()
  } catch (e) {
    logError('batch.bad_json', { requestId })
    return NextResponse.json({ error: 'Bad JSON' }, { status: 400, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  const items: Array<{
    path: string
    method: string
    headers?: Record<string, string>
    body?: any
  }> = Array.isArray(payload?.requests) ? payload.requests : []

  if (!items.length) {
    logError('batch.no_requests', { requestId })
    return NextResponse.json({ error: 'No requests' }, { status: 400, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  const publicOrigin = getOrigin(req)
  const outerBearer = req.headers.get('authorization')?.replace('Bearer ', '')
  const outerAuth = req.headers.get('x-blaze-auth') || outerBearer

  const responses: any[] = []

  for (const item of items) {
    const method = (item.method || 'GET').toUpperCase()
    const pathStr = item.path || ''
    const headers = item.headers || {}
    const bearer = headers['authorization']?.replace('Bearer ', '')
    const token = headers['x-blaze-auth'] || bearer || outerAuth

    if (pathStr.startsWith('/wp/v2/posts') && method === 'POST') {
      if (!token) {
        logError('batch.posts.no_token', { requestId })
        responses.push({ status: 403, headers: {}, body: { code: 'rest_cannot_access', message: 'Forbidden' } })
        continue
      }
      try {
        const decoded = jwt.verify(token, SECRET, { algorithms: ['HS256'], issuer: publicOrigin, clockTolerance: 240 }) as any
        if (!decoded.data?.user_id) {
          logError('batch.posts.bad_request', { requestId })
          responses.push({ status: 401, headers: {}, body: { code: 'bad_request', message: 'Incomplete data', data: { status: 401 } } })
          continue
        }
        logInfo('batch.posts.token_ok', { requestId, userId: decoded.data.user_id })
      } catch (e: any) {
        const msg = String(e?.message || '')
        if (msg.includes('jwt issuer invalid')) {
          logError('batch.posts.bad_issuer', { requestId })
          responses.push({ status: 401, headers: {}, body: { code: 'bad_issuer', message: 'The issuer does not match with this server', data: { status: 401 } } })
          continue
        }
        if (e?.name === 'TokenExpiredError') {
          logError('batch.posts.invalid_token_expired', { requestId })
          responses.push({ status: 403, headers: {}, body: { code: 'invalid_token', message: 'Expired token', data: { status: 403 } } })
          continue
        }
        if (msg.includes('invalid signature')) {
          logError('batch.posts.invalid_token_signature', { requestId })
          responses.push({ status: 403, headers: {}, body: { code: 'invalid_token', message: 'Signature verification failed', data: { status: 403 } } })
          continue
        }
        logError('batch.posts.verify_failed', { requestId })
        responses.push({ status: 401, headers: {}, body: { code: 'rest_token_invalid', message: 'Invalid token' } })
        continue
      }

      try {
        const body = item.body || {}
        const { title, content, status = 'publish', date, slug, excerpt, categories = [] } = body
        const titleText = typeof title === 'object' ? title?.rendered : title
        const contentHtml = typeof content === 'object' ? content?.rendered : content
        const publishedAt = date ? new Date(date).toISOString() : new Date().toISOString()
        const slugText = slug || String(titleText || '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')

        logInfo('batch.posts.body_parsed', {
          requestId,
          title: String(titleText || ''),
          slug: slugText,
          status,
          contentLen: typeof contentHtml === 'string' ? contentHtml.length : 0,
          excerptLen: typeof (excerpt || '') === 'string' ? (excerpt || '').length : 0,
          categoriesCount: Array.isArray(categories) ? categories.length : 0,
        })

        const posts = await readStore()
        const id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
        const newPost = {
          id,
          title: titleText,
          content: contentHtml,
          excerpt: excerpt || '',
          slug: slugText,
          status,
          publishedAt,
          categories,
          authorId: 1,
        }
        logInfo('batch.posts.store_prepare', { requestId, id, slug: slugText })
        posts.unshift(newPost)
        await writeStore(posts)
        logInfo('batch.posts.store_written', { requestId, total: posts.length })

        const response = {
          id,
          date: publishedAt,
          title: { rendered: titleText },
          content: { rendered: contentHtml },
          excerpt: { rendered: excerpt || '' },
          slug: slugText,
          status,
          link: `${req.nextUrl.origin}/blog/${slugText}`,
        }

        logInfo('batch.posts.created', { requestId, id, slug: slugText })
        responses.push({ status: 201, headers: {}, body: response })
      } catch (error: any) {
        logError('batch.posts.error', { requestId, error: String(error) })
        responses.push({ status: 500, headers: {}, body: { code: 'rest_cannot_create', message: 'Error creating post' } })
      }
      continue
    }

    responses.push({ status: 404, headers: {}, body: { code: 'not_found', message: 'Endpoint not implemented' } })
  }

  return NextResponse.json({ responses }, { headers: {
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
