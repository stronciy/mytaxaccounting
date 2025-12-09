import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { promises as fs } from 'fs'
import path from 'path'
import { upsertTag, upsertCategory, insertPost } from '@/lib/db'
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

function normalizePath(p: string) {
  const qIndex = p.indexOf('?')
  const clean = qIndex >= 0 ? p.slice(0, qIndex) : p
  return clean.replace(/^\s+|\s+$/g, '').replace(/^\/wp-json/, '')
}

function pickText(v: any) {
  if (typeof v === 'object' && v !== null) {
    return typeof v.raw === 'string' ? v.raw : (typeof v.rendered === 'string' ? v.rendered : '')
  }
  return typeof v === 'string' ? v : ''
}

function sanitizeHeaders(h: Record<string, string>) {
  const out: Record<string, string> = {}
  Object.entries(h).forEach(([k, v]) => {
    const key = k.toLowerCase()
    if (key === 'authorization' || key === 'x-blaze-auth') {
      out[k] = 'REDACTED'
    } else {
      out[k] = v
    }
  })
  return out
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
  let nextTagId = 1001
  let nextCategoryId = 2001

  const summary = items.map((it, idx) => ({ idx, method: (it.method || 'GET').toUpperCase(), path: it.path || '' }))
  logInfo('batch.summary', { requestId, count: items.length, items: summary })

  for (const item of items) {
    const method = (item.method || 'GET').toUpperCase()
    const pathStr = item.path || ''
    logInfo('batch.item.start', { requestId, method, path: pathStr })
    const headers = item.headers || {}
    const bearer = headers['authorization']?.replace('Bearer ', '')
    const token = headers['x-blaze-auth'] || bearer || outerAuth
    logInfo('batch.item.headers', { requestId, headers: sanitizeHeaders(headers) })
    logInfo('batch.item.auth', { requestId, source: {
      hasXBlazeAuth: Boolean(headers['x-blaze-auth']),
      hasAuthorization: Boolean(headers['authorization']),
      usedOuterAuth: Boolean(!headers['x-blaze-auth'] && !headers['authorization'] && outerAuth),
      tokenPresent: Boolean(token),
    } })

    const normalized = normalizePath(pathStr)
    if (normalized.startsWith('/wp/v2/posts') && method === 'POST') {
      logInfo('batch.posts.body_raw', { requestId, body: item.body })
      if (!token) {
        logError('batch.posts.no_token', { requestId })
        responses.push({ status: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_cannot_access', message: 'Forbidden' }) })
        continue
      }
      try {
        const decoded = jwt.verify(token, SECRET, { algorithms: ['HS256'], issuer: publicOrigin, clockTolerance: 240 }) as any
        if (!decoded.data?.user_id) {
          logError('batch.posts.bad_request', { requestId })
          responses.push({ status: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'bad_request', message: 'Incomplete data', data: { status: 401 } }) })
          continue
        }
        logInfo('batch.posts.token_ok', { requestId, userId: decoded.data.user_id })
      } catch (e: any) {
        const msg = String(e?.message || '')
        if (msg.includes('jwt issuer invalid')) {
          logError('batch.posts.bad_issuer', { requestId })
          responses.push({ status: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'bad_issuer', message: 'The issuer does not match with this server', data: { status: 401 } }) })
          continue
        }
        if (e?.name === 'TokenExpiredError') {
          logError('batch.posts.invalid_token_expired', { requestId })
          responses.push({ status: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'invalid_token', message: 'Expired token', data: { status: 403 } }) })
          continue
        }
        if (msg.includes('invalid signature')) {
          logError('batch.posts.invalid_token_signature', { requestId })
          responses.push({ status: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'invalid_token', message: 'Signature verification failed', data: { status: 403 } }) })
          continue
        }
        logError('batch.posts.verify_failed', { requestId })
        responses.push({ status: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_token_invalid', message: 'Invalid token' }) })
        continue
      }

      try {
        const body = item.body || {}
        const { title, content, status = 'publish', date, slug, excerpt, categories = [], tags = [] } = body
        const titleText = pickText(title)
        const contentHtml = pickText(content)
        const excerptText = pickText(excerpt)
        const publishedAt = date ? new Date(date).toISOString() : new Date().toISOString()
        const slugText = slug || String(titleText || '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        let tagIds = Array.isArray(tags) ? tags.filter((n: any) => Number.isFinite(n)).map((n: any) => Number(n)) : []
        let categoryIds = Array.isArray(categories) ? categories.filter((n: any) => Number.isFinite(n)).map((n: any) => Number(n)) : []
        // Resolve non-numeric tags/categories by upserting and collecting IDs
        if (Array.isArray(tags) && tags.length && tagIds.length !== tags.length) {
          const resolved: number[] = []
          for (const t of tags) {
            if (Number.isFinite(t)) { resolved.push(Number(t)); continue }
            const name = typeof t === 'string' ? t : pickText(t?.name) || ''
            const slugT = (t?.slug) || String(name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            const id = await upsertTag({ name, slug: slugT, description: '' })
            resolved.push(id)
          }
          tagIds = resolved
        }
        if (Array.isArray(categories) && categories.length && categoryIds.length !== categories.length) {
          const resolved: number[] = []
          for (const c of categories) {
            if (Number.isFinite(c)) { resolved.push(Number(c)); continue }
            const name = typeof c === 'string' ? c : pickText(c?.name) || ''
            const slugC = (c?.slug) || String(name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            const id = await upsertCategory({ name, slug: slugC, description: '' })
            resolved.push(id)
          }
          categoryIds = resolved
        }

        logInfo('batch.posts.body_parsed', {
          requestId,
          title: String(titleText || ''),
          slug: slugText,
          status,
          contentLen: typeof contentHtml === 'string' ? contentHtml.length : 0,
          excerptLen: typeof (excerpt || '') === 'string' ? (excerpt || '').length : 0,
          categoriesCount: Array.isArray(categories) ? categories.length : 0,
        })

        const id = await insertPost({ title: titleText, content: contentHtml, excerpt: excerptText || '', slug: slugText, status, publishedAt, authorId: 1, tagsIds: tagIds, categoriesIds: categoryIds })
        logInfo('batch.posts.store_prepare', { requestId, id, slug: slugText })
        logInfo('batch.posts.store_written', { requestId })

        const response = {
          id,
          date: publishedAt,
          title: { rendered: titleText },
          content: { rendered: contentHtml },
          excerpt: { rendered: excerptText || '' },
          slug: slugText,
          status,
          link: `${req.nextUrl.origin}/blog/${slugText}`,
        }

        logInfo('batch.posts.created', { requestId, id, slug: slugText })
        logInfo('batch.posts.terms_linked', { requestId, tagsCount: tagIds.length, categoriesCount: categoryIds.length, tagIds, categoryIds })
        responses.push({ status: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(response) })
      } catch (error: any) {
        logError('batch.posts.error', { requestId, error: String(error) })
        responses.push({ status: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_cannot_create', message: 'Error creating post' }) })
      }
      continue
    }

    if (normalized.startsWith('/wp/v2/tags') && method === 'POST') {
      logInfo('batch.tags.body_raw', { requestId, body: item.body })
      if (!token) {
        logError('batch.tags.no_token', { requestId })
        responses.push({ status: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_cannot_access', message: 'Forbidden' }) })
        continue
      }
      try {
        jwt.verify(token, SECRET, { algorithms: ['HS256'], issuer: publicOrigin, clockTolerance: 240 })
      } catch (e: any) {
        logError('batch.tags.verify_failed', { requestId })
        responses.push({ status: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_token_invalid', message: 'Invalid token' }) })
        continue
      }
      const body = item.body || {}
      const name = pickText(body.name) || pickText(body.title) || ''
      const slug = body.slug || String(name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const description = pickText(body.description)
      const id = await upsertTag({ name, slug, description })
      const term = {
        id,
        name,
        slug,
        taxonomy: 'post_tag',
        description: description || '',
        link: `${req.nextUrl.origin}/blog/tag/${slug}`,
      }
      logInfo('batch.tags.created', { requestId, id, slug })
      responses.push({ status: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(term) })
      continue
    }

    if (normalized.startsWith('/wp/v2/categories') && method === 'POST') {
      logInfo('batch.categories.body_raw', { requestId, body: item.body })
      if (!token) {
        logError('batch.categories.no_token', { requestId })
        responses.push({ status: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_cannot_access', message: 'Forbidden' }) })
        continue
      }
      try {
        jwt.verify(token, SECRET, { algorithms: ['HS256'], issuer: publicOrigin, clockTolerance: 240 })
      } catch (e: any) {
        logError('batch.categories.verify_failed', { requestId })
        responses.push({ status: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'rest_token_invalid', message: 'Invalid token' }) })
        continue
      }
      const body = item.body || {}
      const name = pickText(body.name) || pickText(body.title) || ''
      const slug = body.slug || String(name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const description = pickText(body.description)
      const id = await upsertCategory({ name, slug, description })
      const term = {
        id,
        name,
        slug,
        taxonomy: 'category',
        description: description || '',
        link: `${req.nextUrl.origin}/blog/category/${slug}`,
      }
      logInfo('batch.categories.created', { requestId, id, slug })
      responses.push({ status: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(term) })
      continue
    }

    logError('batch.item.unhandled', { requestId, method, path: pathStr })
    responses.push({ status: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: 'not_found', message: 'Endpoint not implemented' }) })
  }

  const statuses = responses.map((r) => r.status)
  logInfo('batch.responses_summary', { requestId, count: responses.length, statuses })
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
