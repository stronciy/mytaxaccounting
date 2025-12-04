import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'V39 Consultancy - 20+ years of consulting expertise powering AI-driven RFP proposals.',
}

export default function AboutPage() {
  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>The Story Behind V39</h1>
            <p className='text-xl text-gray-600'>Combining 20+ years of consulting expertise with cutting-edge AI.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <div className='prose prose-lg mx-auto'>
              <h2 className='text-2xl font-bold mb-4'>Our Mission</h2>
              <p className='text-gray-600 mb-8 text-lg'>Make world-class RFP proposals accessible to every business, regardless of size or budget.</p>

              <h2 className='text-2xl font-bold mb-4'>The Problem We Solve</h2>
              <p className='text-gray-600 mb-8'>Traditional proposal writing is expensive ($5K-$15K), slow (2-4 weeks), and unpredictable. Small and medium businesses are at a disadvantage competing against larger firms with dedicated proposal teams.</p>

              <h2 className='text-2xl font-bold mb-4'>Our Solution</h2>
              <p className='text-gray-600 mb-8'>V39 combines AI efficiency with human expertise to deliver professional proposals in 24 hours. Our subscription plans start at just $599/month, making world-class proposals accessible to every business.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background='gray'>
        <Container>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div><div className='text-4xl font-bold text-[#0066CC] mb-2'>20+</div><div className='text-gray-600'>Years Experience</div></div>
            <div><div className='text-4xl font-bold text-[#0066CC] mb-2'>500+</div><div className='text-gray-600'>Proposals Delivered</div></div>
            <div><div className='text-4xl font-bold text-[#0066CC] mb-2'>82%</div><div className='text-gray-600'>Win Rate</div></div>
            <div><div className='text-4xl font-bold text-[#0066CC] mb-2'>100+</div><div className='text-gray-600'>Happy Clients</div></div>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <Badge variant='success' className='mb-4'>Globally Available</Badge>
            <h2 className='text-2xl font-bold mb-4'>Values We Live By</h2>
            <div className='grid md:grid-cols-4 gap-6 mt-8'>
              <div className='text-center'><div className='text-3xl mb-2'>⚡</div><div className='font-semibold'>Speed</div></div>
              <div className='text-center'><div className='text-3xl mb-2'>✓</div><div className='font-semibold'>Quality</div></div>
              <div className='text-center'><div className='text-3xl mb-2'>🔍</div><div className='font-semibold'>Transparency</div></div>
              <div className='text-center'><div className='text-3xl mb-2'>🌍</div><div className='font-semibold'>Global Reach</div></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background='dark'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-4'>Ready to Win More RFPs?</h2>
            <p className='text-xl text-gray-300 mb-8'>Experience the V39 difference for yourself.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/signup'><Button variant='accent' size='lg'>Get Started</Button></Link>
              <Link href='/contact'><Button variant='outline' size='lg' className='border-white text-white hover:bg-white hover:text-gray-900'>Contact Us</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
