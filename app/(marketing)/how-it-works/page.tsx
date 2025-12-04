import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how V39 delivers professional RFP proposals in 24 hours using AI-powered automation and expert review.',
}

export default function HowItWorksPage() {
  const steps = [
    { num: 1, title: 'Submit Your RFP', time: '1 hour', desc: 'Upload your RFP document (PDF, Word) along with company profile, case studies, and team CVs.' },
    { num: 2, title: 'AI Analysis', time: '3 hours', desc: 'AI extracts all requirements, identifies evaluation criteria, maps compliance requirements.' },
    { num: 3, title: 'Content Generation', time: '8 hours', desc: 'AI generates 80% baseline content, applies proven consulting frameworks, creates executive summary.' },
    { num: 4, title: 'Expert Enhancement', time: '6 hours', desc: 'Senior consultant reviews, adds strategic positioning, applies win themes, refines messaging.' },
    { num: 5, title: 'Quality Validation', time: '4 hours', desc: '9-point quality checklist, 100% requirement coverage verified, compliance matrix generated.' },
    { num: 6, title: 'Delivery', time: '2 hours', desc: 'PDF + Word formats, executive summary, compliance matrix, submission checklist delivered.' },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <Badge className='mb-4'>Our Process</Badge>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>How We Deliver World-Class Proposals in 5 Hours</h1>
            <p className='text-xl text-gray-600 mb-8'>A perfect blend of AI efficiency and human expertise.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-12'>The 6-Step Process</h2>
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
            <h2 className='text-3xl font-bold text-center mb-12'>9-Point Quality Validation</h2>
            <div className='grid md:grid-cols-3 gap-4'>
              {['100% requirement coverage', 'Evaluation criteria mapped', 'Executive summary quality', 'Technical approach clarity', 'Pricing accuracy', 'Compliance verified', 'Grammar and formatting', 'Brand consistency', 'Submission readiness'].map((item, i) => (
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
            <h2 className='text-3xl font-bold text-white mb-4'>Experience the V39 Difference</h2>
            <p className='text-xl text-gray-300 mb-8'>See why 100+ UAE businesses trust us with their RFP responses.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/pricing'><Button variant='accent' size='lg'>View Pricing</Button></Link>
              <Link href='/contact'><Button variant='outline' size='lg' className='border-white text-white hover:bg-white hover:text-gray-900'>Talk to an Expert</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
