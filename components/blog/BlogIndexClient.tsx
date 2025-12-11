"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Section, Container, Badge, Button } from '@/components/ui'

type PostItem = {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  featured?: { src: string; alt: string }
  categories: Array<{ id: number; name: string; slug: string }>
  tags: Array<{ id: number; name: string; slug: string }>
}

function sanitize(html: string) {
  if (!html) return ''
  let out = html
  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
  out = out.replace(/on[a-zA-Z]+\s*=\s*"[^"]*"/g, '')
  out = out.replace(/on[a-zA-Z]+\s*=\s*'[^']*'/g, '')
  out = out.replace(/javascript:/gi, '')
  return out
}

function hashString(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return (h >>> 0).toString(16)
}

export function BlogIndexClient() {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [posts, setPosts] = React.useState<PostItem[]>([])
  const [unchanged, setUnchanged] = React.useState(false)
  const [lastUpdated, setLastUpdated] = React.useState<string>('')

  const load = React.useCallback(async () => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const url = `/wp-json/wp/v2/posts?per_page=9&page=1&_embed=1`
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(String(res.status))
      const json = await res.json()
      if (!Array.isArray(json)) throw new Error('Invalid response')
      const mapped: PostItem[] = json.map((p: any) => {
          const embed = p._embedded || {}
          const media = embed?.["wp:featuredmedia"]?.[0]
          const featured = media ? {
            src: media.source_url || media?.media_details?.sizes?.medium?.source_url || media?.media_details?.sizes?.full?.source_url,
            alt: media.alt_text || media?.title?.rendered || '',
          } : undefined
          const terms = embed?.["wp:term"] || []
          const flat = Array.isArray(terms) ? terms.flat() : []
          const categories = flat.filter((t: any) => t.taxonomy === 'category').map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
          const tags = flat.filter((t: any) => t.taxonomy === 'post_tag').map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
          return {
            id: p.id,
            slug: p.slug,
            title: p.title?.rendered ?? '',
            excerpt: sanitize(p.excerpt?.rendered ?? ''),
            date: p.date,
            featured: featured?.src ? featured : undefined,
            categories,
            tags,
          }
        })
      const serialized = JSON.stringify(mapped)
      const newHash = hashString(serialized)
      const prevHash = sessionStorage.getItem('blogPostsHash') || ''
      if (prevHash && prevHash === newHash) {
        setUnchanged(true)
        const cached = sessionStorage.getItem('blogPostsData')
        if (cached) {
          try { setPosts(JSON.parse(cached) as PostItem[]) } catch {}
        } else {
          setPosts(mapped)
        }
      } else {
        setPosts(mapped)
        sessionStorage.setItem('blogPostsHash', newHash)
        sessionStorage.setItem('blogPostsData', serialized)
      }
      setLastUpdated(new Date().toISOString())
      setError(null)
    } catch (e: any) {
      setError(typeof e?.message === 'string' ? e.message : 'Failed to load')
    } finally {
      clearTimeout(timer)
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="inline-block animate-pulse rounded-full h-6 w-6 bg-[#0066CC] mr-2" />
            <span className="text-slate-600">Loading posts…</span>
          </div>
        </Container>
      </Section>
    )
  }

  if (error) {
    return (
      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-red-600">Failed to load posts</p>
            <p className="text-slate-500 text-sm">{error}</p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section background="white">
      <Container>
        <div className="flex items-center justify-between mb-4">
          <div>
            {!!unchanged && (
              <div className="text-xs text-slate-500">No new posts since last visit</div>
            )}
            {!!lastUpdated && (
              <div className="text-xs text-slate-400">Updated at {new Date(lastUpdated).toLocaleTimeString()}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { setLoading(true); setUnchanged(false); load() }}>Refresh</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.id} className="bg-slate-50 p-6 border border-slate-200 hover:border-[#d4a853]/40 transition-all card-lift">
              <div className="h-1 bg-[#d4a853] mb-4" />
              {p.featured?.src && (
                <div className="relative w-full h-40 mb-4">
                  <Image src={p.featured.src} alt={p.featured.alt} fill className="object-cover" />
                </div>
              )}
              <h3 className="text-xl font-semibold text-[#0a0f1a] mb-2">{p.title}</h3>
              <div className="text-sm text-slate-500 mb-3">{new Date(p.date).toLocaleDateString()}</div>
              <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {p.categories.map((c) => (
                  <Badge key={c.id} variant="secondary" className="bg-[#d4a853] text-[#0a0f1a] border-[#d4a853]">{c.name}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link href={`/blog/${p.slug}`} className="text-[#0066CC] hover:underline">Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
