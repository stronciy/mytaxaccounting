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

export async function GET(req: NextRequest) {
  const requestId = makeRequestId()
  logInfo('wp.posts.get.request', { requestId, req: sanitizeRequest(req) })
  const url = new URL(req.url)
  const perPage = Number(url.searchParams.get('per_page') ?? 10)
  const page = Number(url.searchParams.get('page') ?? 1)
  const slug = url.searchParams.get('slug')
  const posts = await readStore()

  let filtered = posts
  if (slug) filtered = filtered.filter((p) => p.slug === slug)

  const start = (page - 1) * perPage
  const paged = filtered.slice(start, start + perPage)

  const wpShape = paged.map((p) => ({
    id: p.id,
    date: p.publishedAt,
    title: { rendered: p.title },
    content: { rendered: p.content },
    excerpt: { rendered: p.excerpt ?? '' },
    slug: p.slug,
    status: p.status ?? 'publish',
  }))

  logInfo('wp.posts.get.response', { requestId, count: wpShape.length })
  return NextResponse.json(wpShape)
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

  if (userAgent !== 'Blaze' || !authHeader) {
    logError('wp.posts.post.forbidden', { requestId, reason: 'UA or token missing' })
    return NextResponse.json({ code: 'rest_cannot_access', message: 'Forbidden' }, { status: 403 })
  }

  try {
    const decoded = jwt.verify(authHeader, SECRET) as any
    if (decoded.iss !== req.nextUrl.origin || !decoded.data?.user_id) {
      logError('wp.posts.post.invalid_token', { requestId })
      return NextResponse.json({ code: 'rest_token_invalid', message: 'Invalid token' }, { status: 401 })
    }
  } catch {
    logError('wp.posts.post.verify_failed', { requestId })
    return NextResponse.json({ code: 'rest_token_invalid', message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, content, status = 'publish', date, slug, excerpt, categories = [] } = body

    const titleText = typeof title === 'object' ? title?.rendered : title
    const contentHtml = typeof content === 'object' ? content?.rendered : content
    const publishedAt = date ? new Date(date).toISOString() : new Date().toISOString()
    const slugText = slug || String(titleText || '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

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
    posts.unshift(newPost)
    await writeStore(posts)

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
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    logError('wp.posts.post.error', { requestId, error: String(error) })
    return NextResponse.json({ code: 'rest_cannot_create', message: 'Error creating post' }, { status: 500 })
  }
}
