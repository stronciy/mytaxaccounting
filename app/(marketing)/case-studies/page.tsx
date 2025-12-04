import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'See how global businesses win more RFPs with V39. Real results from real clients.',
}

export default function CaseStudiesPage() {
  const cases = [
    { industry: 'IT Consulting', company: 'Technology Consultancy', result: '$1.2M contract won', metric: '24 hours delivery' },
    { industry: 'Engineering', company: 'Engineering Firm', result: '4 out of 5 wins', metric: '82% win rate' },
    { industry: 'Healthcare', company: 'Healthcare Services Provider', result: 'First proposal win', metric: '$450K contract' },
    { industry: 'Professional Services', company: 'Business Advisory Firm', result: '40% time savings', metric: '12 proposals/year' },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Real Results from Real Clients</h1>
            <p className='text-xl text-gray-600'>See how global businesses are winning more contracts with V39.</p>
          </div>
        </Container>
      </Section>

      <Section background='white' className='py-8'>
        <Container>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div><div className='text-3xl font-bold text-[#0066CC]'>100+</div><div className='text-gray-600'>Proposals</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>82%</div><div className='text-gray-600'>Win Rate</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>$15M+</div><div className='text-gray-600'>Contracts Won</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>4.9/5</div><div className='text-gray-600'>Rating</div></div>
          </div>
        </Container>
      </Section>

      <Section background='gray'>
        <Container>
          <div className='grid md:grid-cols-2 gap-8'>
            {cases.map((c, i) => (
              <Card key={i} className='p-6'>
                <Badge variant='secondary' className='mb-4'>{c.industry}</Badge>
                <h3 className='text-xl font-semibold mb-2'>{c.company}</h3>
                <p className='text-2xl font-bold text-[#0066CC] mb-2'>{c.result}</p>
                <p className='text-gray-600'>{c.metric}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section background='dark'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-4'>Become Our Next Success Story</h2>
            <p className='text-xl text-gray-300 mb-8'>Join the growing list of global businesses winning with V39.</p>
            <Link href='/signup'><Button variant='accent' size='lg'>Get Your Proposal Now</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
