import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Security and Compliance',
  description: 'Enterprise-grade security for your RFP data. UAE-licensed, SOC 2 compliant, GDPR ready.',
}

export default function SecurityPage() {
  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Enterprise-Grade Security</h1>
            <p className='text-xl text-gray-600'>Your RFP data is protected with bank-level security measures.</p>
            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              <Badge variant='success'>UAE Licensed</Badge>
              <Badge variant='secondary'>SOC 2 Type II</Badge>
              <Badge variant='secondary'>ISO 27001</Badge>
              <Badge variant='secondary'>GDPR Compliant</Badge>
            </div>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='grid md:grid-cols-2 gap-12'>
            <div>
              <h2 className='text-2xl font-bold mb-6'>Security Measures</h2>
              <div className='space-y-4'>
                {['AES-256 encryption at rest', 'TLS 1.3 encryption in transit', 'Regular security audits', 'Penetration testing quarterly', 'Multi-factor authentication'].map((item, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <span className='text-green-500 text-xl'>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className='text-2xl font-bold mb-6'>Data Privacy</h2>
              <div className='space-y-4'>
                {['GDPR compliant processing', 'UAE data residency available', 'No third-party data sharing', 'Automatic deletion after 90 days', 'NDA available on request'].map((item, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <span className='text-green-500 text-xl'>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl font-bold mb-8'>Questions About Security?</h2>
            <p className='text-gray-600 mb-8'>Our security team is available to answer any questions and provide documentation.</p>
            <Link href='/contact'><Button variant='default'>Contact Security Team</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
