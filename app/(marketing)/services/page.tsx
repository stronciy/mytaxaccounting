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

    
    </>
  )
}

