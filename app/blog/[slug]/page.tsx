import Image from 'next/image'
import Link from 'next/link'
import { Section, Container, Badge } from '@/components/ui'
import { getPostBySlug } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null as Awaited<ReturnType<typeof getPostBySlug>> | null
  try {
    post = await getPostBySlug(slug)
  } catch (e) {}

  if (!post) {
    return (
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Not Found</h1>
            <p className="text-gray-600">The requested post could not be found.</p>
            <div className="mt-6">
              <Link href="/blog" className="text-[#0066CC] hover:underline">Back to blog</Link>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section background="white">
        <Container>
          <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {post.categories?.map((c) => (
                <Badge key={c.id} variant="secondary" className="bg-[#d4a853] text-[#0a0f1a] border-[#d4a853]">{c.name}</Badge>
              ))}
            </div>
            <div className="text-sm text-slate-500 mb-6">{new Date(post.date).toLocaleDateString()}</div>
            {post.featured?.src && (
              <div className="relative w-full h-64 mb-8">
                <Image src={post.featured.src} alt={post.featured.alt} fill className="object-cover" />
              </div>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            {!!post.tags?.length && (
              <div className="mt-8 text-sm text-slate-600">
                Tags: {post.tags.map((t) => t.name).join(', ')}
              </div>
            )}
            <div className="mt-10">
              <Link href="/blog" className="text-[#0066CC] hover:underline">Back to blog</Link>
            </div>
          </article>
        </Container>
      </Section>
    </>
  )
}
