import { Section, Container } from '@/components/ui'
import { BlogIndexClient } from '@/components/blog/BlogIndexClient'

export const dynamic = 'force-dynamic'

export default async function BlogIndexPage() {
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
      <BlogIndexClient />
    </>
  )
}
