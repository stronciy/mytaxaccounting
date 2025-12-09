import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { promises as fs } from 'fs'
import path from 'path'
import { insertPost, getPostsFromDb } from '@/lib/db'
import { logInfo, logError, makeRequestId, sanitizeRequest } from '@/lib/logger'

const SECRET = process.env.BLAZE_SECRET as string
const STORE_PATH = path.join(process.cwd(), 'data', 'blog-local.json')

async function readStore(): Promise<any[]> {
  return []
}
async function writeStore(posts: any[]) {}

export async function GET(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('wp.posts.get.request', { requestId, req: sanitizeRequest(req) })
  const url = new URL(req.url)
  const perPage = Number(url.searchParams.get('per_page') ?? 10)
  const page = Number(url.searchParams.get('page') ?? 1)
  const slug = url.searchParams.get('slug')
  const rows = await getPostsFromDb({ page, perPage, slug })
  const wpShape = rows.map((p: any) => ({
    id: p.id,
    date: p.published_at,
    title: { rendered: p.title },
    content: { rendered: p.content },
    excerpt: { rendered: p.excerpt ?? '' },
    slug: p.slug,
    status: p.status ?? 'publish',
  }))

  logInfo('wp.posts.get.response', { requestId, count: wpShape.length })
  return NextResponse.json(wpShape, { headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
  } })
}

export async function POST(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('wp.posts.post.request', { requestId, req: sanitizeRequest(req) })
  if (!SECRET) {
    logError('wp.posts.post.error', { requestId, error: 'Server not configured' })
    return NextResponse.json({ code: 'server_not_configured' }, { status: 500 })
  }

  const userAgent = req.headers.get('user-agent')
  const bearer = req.headers.get('authorization')?.replace('Bearer ', '')
  const authHeader = req.headers.get('x-blaze-auth') || bearer

  const ua = (userAgent || '').toLowerCase()
  if (!authHeader) {
    logError('wp.posts.post.forbidden', { requestId, reason: 'Token missing', ua })
    return NextResponse.json({ code: 'rest_cannot_access', message: 'Forbidden' }, { status: 403, headers: {
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
      logError('wp.posts.post.bad_request', { requestId })
      return NextResponse.json({ code: 'bad_request', message: 'Incomplete data', data: { status: 401 } }, { status: 401, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    logInfo('wp.posts.post.token_ok', { requestId, userId: decoded.data.user_id })
  } catch (e: any) {
    const msg = String(e?.message || '')
    if (msg.includes('jwt issuer invalid')) {
      logError('wp.posts.post.bad_issuer', { requestId })
      return NextResponse.json({ code: 'bad_issuer', message: 'The issuer does not match with this server', data: { status: 401 } }, { status: 401, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    if (e?.name === 'TokenExpiredError') {
      logError('wp.posts.post.invalid_token_expired', { requestId })
      return NextResponse.json({ code: 'invalid_token', message: 'Expired token', data: { status: 403 } }, { status: 403, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    if (msg.includes('invalid signature')) {
      logError('wp.posts.post.invalid_token_signature', { requestId })
      return NextResponse.json({ code: 'invalid_token', message: 'Signature verification failed', data: { status: 403 } }, { status: 403, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      } })
    }
    logError('wp.posts.post.verify_failed', { requestId })
    return NextResponse.json({ code: 'rest_token_invalid', message: 'Invalid token' }, { status: 401, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  }

  try {
    const body = await req.json()
    logInfo('wp.posts.post.body_raw', { requestId, body })
    const { title, content, status = 'publish', date, slug, excerpt, categories = [] } = body

    const titleText = typeof title === 'object' ? title?.rendered : title
    const contentHtml = typeof content === 'object' ? content?.rendered : content
    const publishedAt = date ? new Date(date).toISOString() : new Date().toISOString()
    const slugText = slug || String(titleText || '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    logInfo('wp.posts.post.body_parsed', {
      requestId,
      title: String(titleText || ''),
      slug: slugText,
      status,
      contentLen: typeof contentHtml === 'string' ? contentHtml.length : 0,
      excerptLen: typeof (excerpt || '') === 'string' ? (excerpt || '').length : 0,
      categoriesCount: Array.isArray(categories) ? categories.length : 0,
    })

    const id = await insertPost({ title: titleText, content: contentHtml, excerpt: excerpt || '', slug: slugText, status, publishedAt, authorId: 1 })
    logInfo('wp.posts.post.store_prepare', { requestId, id, slug: slugText })
    logInfo('wp.posts.post.store_written', { requestId })

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

    logInfo('wp.posts.post.created', { requestId, id, slug: slugText })
    return NextResponse.json(response, { status: 201, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    } })
  } catch (error) {
    logError('wp.posts.post.error', { requestId, error: String(error) })
    return NextResponse.json({ code: 'rest_cannot_create', message: 'Error creating post' }, { status: 500, headers: {
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
