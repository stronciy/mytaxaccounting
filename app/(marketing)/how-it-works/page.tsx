import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how My Tax Accounting delivers compliant GST, payroll, and annual returns with modern tools and expert review.',
}

export default function HowItWorksPage() {
  const steps = [
    { num: 1, title: 'Share Your Details', time: '5 minutes', desc: 'Basic business info and access to Xero/MYOB.' },
    { num: 2, title: 'Set Up & Connect', time: '1–3 days', desc: 'GST, payroll, IRD deadlines configured with checks.' },
    { num: 3, title: 'Monthly Operations', time: 'ongoing', desc: 'On‑time filings, management reports, and reviews.' },
    { num: 4, title: 'Year‑End Close', time: 'seasonal', desc: 'Annual financial statements and income tax returns.' },
    { num: 5, title: 'Advisory (Optional)', time: 'quarterly', desc: 'Budget & cash‑flow forecast, quarterly accountability.' },
    { num: 6, title: 'Audit Trail', time: 'continuous', desc: 'Documented checks, filing proofs, and stored reports.' },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <Badge className='mb-4'>Our Process</Badge>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>How We Keep Your Accounting On‑Time</h1>
            <p className='text-xl text-gray-600 mb-8'>Modern tools + human expertise for clear, compliant financials.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>The 6‑Step Process</h2>
            <div className='space-y-8'>
              {steps.map((step) => (
                <div key={step.num} className='flex gap-6 items-start'>
                  <div className='w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0'>{step.num}</div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h3 className='text-xl font-semibold'>{step.title}</h3>
                      <Badge variant='secondary'>{step.time}</Badge>
                    </div>
                    <p className='text-gray-600'>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background='gray'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>Accuracy & Compliance Checks</h2>
            <div className='grid md:grid-cols-3 gap-4'>
              {['GST reconcile (sales vs returns)', 'PAYE/ESCT tests', 'Payroll totals consistency', 'IRD deadlines controls', 'Companies Office annual return', 'Xero management reports', 'Backup and retention policy', 'Two-person review', 'Filing proofs stored'].map((item, i) => (
                <div key={i} className='flex items-center gap-3 bg-white p-4 rounded-lg'>
                  <span className='text-green-500 text-xl'>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background='dark'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-4'>Experience the My Tax Accounting Difference</h2>
            <p className='text-xl text-gray-300 mb-8'>On‑time GST, payroll, and annual returns with fixed monthly fees.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/#packages'><Button variant='accent' size='lg'>See Packages</Button></Link>
              <Link href='/contact'><Button variant='outline' size='lg' className='border-white text-white hover:bg-white hover:text-gray-900'>Talk to an Expert</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
