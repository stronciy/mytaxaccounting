import { Section, Container, Card, CardContent, Badge } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'Accounting Services',
  description: 'Comprehensive compliance and tax services for small businesses.'
}

export default function ServicesPage() {
  const services = [
    'Annual financial statements and income tax return for: sole traders, partnerships, companies, and LTCs.',
    'GST registration and periodic GST returns.',
    'PAYE/ESCT and payroll filings, FBT returns where relevant.',
    'Rental property returns, shareholder/director personal returns, provisional tax calculations, tax pooling assistance, and Companies Office annual returns.'
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Accounting Services for Small Businesses</h1>
            <p className='text-xl text-gray-600'>Compliance, tax, payroll, and filings handled end-to-end.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {services.map((s, i) => (
              <Card key={i} className='p-6'>
                <CardContent className='space-y-3 pt-2'>
                  <Badge variant='secondary'>Service</Badge>
                  <p className='text-gray-800'>{s}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Link href='/pricing' className='inline-flex items-center gap-2 text-[#0f172a] hover:text-[#0066CC] font-medium'>
              See Fixed Fee Packages
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}

