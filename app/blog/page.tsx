import Link from 'next/link'
import Image from 'next/image'
import { Section, Container, Badge } from '@/components/ui'
import { getPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function BlogIndexPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  try {
    posts = await getPosts({ perPage: 9 })
  } catch (e) {
    return (
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-gray-600">Blog is temporarily unavailable.</p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-gray-600">Insights on GST, payroll, and SME accounting.</p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((p) => (
              <article key={p.id} className="bg-slate-50 p-6 border border-slate-200 hover:border-[#d4a853]/40 transition-all card-lift">
                <div className="h-1 bg-[#d4a853] mb-4" />
                {p.featured?.src && (
                  <div className="relative w-full h-40 mb-4">
                    <Image src={p.featured.src} alt={p.featured.alt} fill className="object-cover" />
                  </div>
                )}
                <Link href={`/blog/${p.slug}`} className="text-xl font-semibold text-[#0f172a] hover:text-[#d4a853] transition-colors">
                  {p.title}
                </Link>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {p.categories?.map((c) => (
                    <Badge key={c.id} variant="secondary" className="bg-[#d4a853] text-[#0a0f1a] border-[#d4a853]">{c.name}</Badge>
                  ))}
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {new Date(p.date).toLocaleDateString()}
                </div>
                <div className="prose prose-sm max-w-none text-slate-700 mt-4" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                <div className="mt-6">
                  <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#d4a853] font-medium transition-colors">
                    Read more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
