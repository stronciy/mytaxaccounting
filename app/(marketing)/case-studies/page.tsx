import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results from SMEs using our accounting services: on-time filings, savings, accuracy.',
}

export default function CaseStudiesPage() {
  const cases = [
    { industry: 'Retail', company: 'Owner‑operated retail SME', result: 'Avoided IRD penalties', metric: 'GST & payroll caught up in 72h' },
    { industry: 'Software', company: 'Startup (Core tier)', result: 'Saved ~65% accounting costs', metric: 'GST + Xero reporting' },
    { industry: 'Manufacturing', company: 'SME (Performance)', result: 'Zero PAYE/ESCT errors', metric: 'Multi‑point accuracy checks' },
    { industry: 'Property', company: 'Investor (Growth)', result: 'Clean year‑end close', metric: 'Rental schedules + annual accounts' },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Real Results from Real Clients</h1>
            <p className='text-xl text-gray-600'>See how SMEs operate clean with My Tax Accounting.</p>
          </div>
        </Container>
      </Section>

      <Section background='white' className='py-8'>
        <Container>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div><div className='text-3xl font-bold text-[#0066CC]'>99.8%</div><div className='text-gray-600'>On‑time filings</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>500+</div><div className='text-gray-600'>Returns filed</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>65%</div><div className='text-gray-600'>Avg. savings</div></div>
            <div><div className='text-3xl font-bold text-[#0066CC]'>4.9/5</div><div className='text-gray-600'>Client rating</div></div>
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
            <p className='text-xl text-gray-300 mb-8'>Join SMEs operating clean with fixed fee accounting.</p>
            <Link href='/contact'><Button variant='accent' size='lg'>Get Accounting Support</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
