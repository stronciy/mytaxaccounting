const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL

function buildUrl(path: string, params?: Record<string, string | number | boolean>) {
  if (!WP_BASE_URL) throw new Error('NEXT_PUBLIC_WP_BASE_URL is not set')
  const url = new URL(path, WP_BASE_URL)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  return url.toString()
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
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load posts: ${res.status}`)
  const json = await res.json()
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
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load post: ${res.status}`)
  const list = await res.json()
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
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`)
  const json = await res.json()
  return json.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug })) as Array<{ id: number; name: string; slug: string }>
}
