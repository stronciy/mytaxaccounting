const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL
const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL

function isLocalHost(url: string) {
  try {
    const u = new URL(url)
    const h = u.hostname.toLowerCase()
    return h === 'localhost' || h === '127.0.0.1'
  } catch {
    return false
  }
}

function buildUrl(path: string, params?: Record<string, string | number | boolean>) {
  const base = WP_BASE_URL || SITE_BASE_URL
  const hasBase = typeof base === 'string' && base.length > 0 && !isLocalHost(base)
  if (hasBase) {
    const url = new URL(path, base)
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
    return url.toString()
  }
  const qp = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])) : null
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return qp ? `${cleanPath}?${qp.toString()}` : cleanPath
}

function sanitizeHtml(html: string) {
  if (!html) return ''
  let out = html
  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
  out = out.replace(/on[a-zA-Z]+\s*=\s*"[^"]*"/g, '')
  out = out.replace(/on[a-zA-Z]+\s*=\s*'[^']*'/g, '')
  out = out.replace(/javascript:/gi, '')
  return out
}

function mapFeaturedImage(embed: any) {
  const media = embed?.["wp:featuredmedia"]?.[0]
  if (!media) return undefined
  const src = media.source_url || media.media_details?.sizes?.medium?.source_url || media.media_details?.sizes?.full?.source_url
  const alt = media.alt_text || media.title?.rendered || ''
  return src ? { src, alt } : undefined
}

function mapTerms(embed: any) {
  const terms = embed?.["wp:term"] || []
  const flat = Array.isArray(terms) ? terms.flat() : []
  const categories = flat.filter((t: any) => t.taxonomy === 'category').map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
  const tags = flat.filter((t: any) => t.taxonomy === 'post_tag').map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
  return { categories, tags }
}

export async function getPosts(opts?: { page?: number; perPage?: number }) {
  const page = opts?.page ?? 1
  const perPage = opts?.perPage ?? 10
  const url = buildUrl('/wp-json/wp/v2/posts', { per_page: perPage, page, _embed: true })
  let json: any
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(String(res.status))
    json = await res.json()
  } catch {
    const rel = buildUrl('/wp-json/wp/v2/posts', { per_page: perPage, page, _embed: true })
    const res2 = await fetch(rel, { cache: 'no-store' })
    if (!res2.ok) throw new Error(`Failed to load posts: ${res2.status}`)
    json = await res2.json()
  }
  return json.map((p: any) => {
    const terms = mapTerms(p._embedded)
    return ({
      id: p.id,
      slug: p.slug,
      title: p.title?.rendered ?? '',
      excerpt: sanitizeHtml(p.excerpt?.rendered ?? ''),
      date: p.date,
      featured: mapFeaturedImage(p._embedded),
      categories: terms.categories,
      tags: terms.tags,
    })
  }) as Array<{
    id: number
    slug: string
    title: string
    excerpt: string
    date: string
    featured?: { src: string; alt: string }
    categories: Array<{ id: number; name: string; slug: string }>
    tags: Array<{ id: number; name: string; slug: string }>
  }>
}

export async function getPostBySlug(slug: string) {
  const url = buildUrl('/wp-json/wp/v2/posts', { slug, _embed: true })
  let list: any
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(String(res.status))
    list = await res.json()
  } catch {
    const rel = buildUrl('/wp-json/wp/v2/posts', { slug, _embed: true })
    const res2 = await fetch(rel, { cache: 'no-store' })
    if (!res2.ok) throw new Error(`Failed to load post: ${res2.status}`)
    list = await res2.json()
  }
  const p = list?.[0]
  if (!p) return null
  const terms = mapTerms(p._embedded)
  return {
    id: p.id,
    slug: p.slug,
    title: p.title?.rendered ?? '',
    content: sanitizeHtml(p.content?.rendered ?? ''),
    excerpt: sanitizeHtml(p.excerpt?.rendered ?? ''),
    date: p.date,
    featured: mapFeaturedImage(p._embedded),
    categories: terms.categories,
    tags: terms.tags,
  } as {
    id: number
    slug: string
    title: string
    content: string
    excerpt: string
    date: string
    featured?: { src: string; alt: string }
    categories: Array<{ id: number; name: string; slug: string }>
    tags: Array<{ id: number; name: string; slug: string }>
  }
}

export async function getCategories() {
  const url = buildUrl('/wp-json/wp/v2/categories', { per_page: 100 })
  let json: any
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(String(res.status))
    json = await res.json()
  } catch {
    const rel = buildUrl('/wp-json/wp/v2/categories', { per_page: 100 })
    const res2 = await fetch(rel, { cache: 'no-store' })
    if (!res2.ok) throw new Error(`Failed to load categories: ${res2.status}`)
    json = await res2.json()
  }
  return json.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug })) as Array<{ id: number; name: string; slug: string }>
}
