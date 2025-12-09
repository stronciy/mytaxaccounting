import { getPostsFromDb, getDb } from '@/lib/db'

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
  const rows = await getPostsFromDb({ page, perPage })
  return rows.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: sanitizeHtml(p.excerpt ?? ''),
    date: p.published_at,
    featured: undefined,
    categories: [],
    tags: [],
  })) as Array<{
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
  const rows = await getPostsFromDb({ slug })
  const p = rows?.[0]
  if (!p) return null
  const db = await getDb()
  const tagsStmt = db.prepare('SELECT t.id, t.name, t.slug FROM tags t INNER JOIN post_tags pt ON pt.tag_id = t.id WHERE pt.post_id = ?')
  tagsStmt.bind([p.id])
  const tags: Array<{ id: number; name: string; slug: string }> = []
  while (tagsStmt.step()) tags.push(tagsStmt.getAsObject() as any)
  tagsStmt.free()
  const catsStmt = db.prepare('SELECT c.id, c.name, c.slug FROM categories c INNER JOIN post_categories pc ON pc.category_id = c.id WHERE pc.post_id = ?')
  catsStmt.bind([p.id])
  const categories: Array<{ id: number; name: string; slug: string }> = []
  while (catsStmt.step()) categories.push(catsStmt.getAsObject() as any)
  catsStmt.free()
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    content: sanitizeHtml(p.content ?? ''),
    excerpt: sanitizeHtml(p.excerpt ?? ''),
    date: p.published_at,
    categories,
    tags,
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
  const db = await getDb()
  const stmt = db.prepare('SELECT id, name, slug FROM categories ORDER BY name ASC')
  const list: Array<{ id: number; name: string; slug: string }> = []
  while (stmt.step()) list.push(stmt.getAsObject() as any)
  stmt.free()
  return list
}
