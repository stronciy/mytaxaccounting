import { Metadata } from 'next'
import { Button, Card, Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with V39 Consultancy. We respond within 4 hours.',
}

export default function ContactPage() {
  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Let us Talk About Your Next RFP</h1>
            <p className='text-xl text-gray-600'>We typically respond within 4 hours during business hours.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='grid md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            <Card className='p-8'>
              <h2 className='text-2xl font-bold mb-6'>Send us a Message</h2>
              <form className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                  <input type='text' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent' placeholder='Your name' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <input type='email' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent' placeholder='your@email.com' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Company</label>
                  <input type='text' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent' placeholder='Your company' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                  <textarea rows={4} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent' placeholder='Tell us about your RFP needs...'></textarea>
                </div>
                <Button variant='default' className='w-full'>Send Message</Button>
              </form>
            </Card>
            
            <div className='space-y-8'>
              <div>
                <h3 className='text-xl font-semibold mb-4'>Contact Information</h3>
                <div className='space-y-3 text-gray-600'>
                  <p>Email: hello@v39-consultancy.com</p>
                  <p>Response Time: Within 4 hours</p>
                  <p>Location: Dubai, UAE</p>
                </div>
              </div>
              
              <div>
                <h3 className='text-xl font-semibold mb-4'>Book a Free Consultation</h3>
                <p className='text-gray-600 mb-4'>Schedule a 30-minute call to discuss your RFP needs.</p>
                <Button variant='outline'>Schedule a Call</Button>
              </div>
              
              <div>
                <h3 className='text-xl font-semibold mb-4'>Why Contact V39?</h3>
                <ul className='space-y-2 text-gray-600'>
                  <li>Free RFP assessment</li>
                  <li>No obligation quote</li>
                  <li>Expert guidance</li>
                  <li>Quick response</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
