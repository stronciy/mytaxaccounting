import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, CardContent, CardHeader, CardTitle, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent subscription pricing for professional RFP proposals. Starting at $599/month. Cancel anytime.',
}

export default function PricingPage() {
  const tiers = [
    { name: 'Starter', price: 599, proposals: 1, features: ['1 proposal/month', '24-hour delivery', 'Email support', '1 revision'], popular: false },
    { name: 'Professional', price: 999, proposals: 2, features: ['2 proposals/month', 'Priority support', 'Monthly report', '2 revisions'], popular: true },
    { name: 'Business', price: 1799, proposals: 4, features: ['4 proposals/month', '+ 1 FREE rush/month', 'Account manager', 'Unlimited revisions'], popular: false },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Transparent Pricing. No Hidden Fees.</h1>
            <p className='text-xl text-gray-600'>Professional RFP proposals at a fraction of consultant rates.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <h2 className='text-3xl font-bold text-center mb-12'>Choose Your Plan</h2>
          <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {tiers.map((tier) => (
              <Card key={tier.name} className={tier.popular ? 'ring-2 ring-[#d4a853] relative shadow-lg' : ''}>
                {tier.popular && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4a853] text-gray-900'>Most Popular</Badge>}
                <CardHeader className='text-center pb-4'>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className='mt-4'>
                    <span className='text-4xl font-bold'>${tier.price}</span>
                    <span className='text-gray-500'>/month</span>
                  </div>
                  {tier.popular && (
                    <div className='mt-2 text-sm text-emerald-600 font-semibold'>
                      ${Math.round(tier.price / tier.proposals)} per proposal
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className='space-y-3 mb-6'>
                    {tier.features.map((f, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <span className='text-green-500'>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href='/signup' className='block'>
                    <Button variant={tier.popular ? 'default' : 'outline'} className='w-full'>Subscribe</Button>
                  </Link>
                  {tier.popular && (
                    <div className='mt-3 text-xs text-center text-gray-500'>40-50% choose this tier</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='text-center mt-12 pt-8 border-t border-gray-200'>
            <p className='text-gray-600 mb-4'>
              <span className='font-semibold text-gray-900'>Need more?</span> Enterprise plans start at $2,999/month for 8+ proposals with VIP support
            </p>
            <p className='text-sm text-gray-500'>All subscriptions: Cancel anytime • No long-term commitment • Save up to 46%</p>
          </div>
        </Container>
      </Section>

      <Section background='dark'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-4'>Ready to Get Started?</h2>
            <p className='text-xl text-gray-300 mb-8'>Join 100+ global businesses winning more contracts with V39.</p>
            <Link href='/signup'><Button variant='accent' size='lg'>Start Your First Proposal</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
