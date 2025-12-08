import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, CardContent, CardHeader, CardTitle, Section, Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Fixed Fee Packages',
  description: 'Transparent fixed-fee accounting packages for small businesses.',
}

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter – Compliance only',
      priceLabel: 'from ~$150–$220/month',
      features: [
        'For sole traders, micro companies, simple GST.',
        'Annual financial statements and income tax return',
        'IRD account management and tax payment reminders',
        'One annual review meeting',
        'Basic email support',
      ],
      popular: false,
    },
    {
      name: 'Core – Compliance + GST',
      priceLabel: 'from ~$250–$350/month',
      features: [
        'For small GST‑registered businesses.',
        'Everything in Starter, plus:',
        'GST return preparation and filing',
        'Quarterly or bi‑monthly management reports from Xero',
        'Companies Office annual return',
        'Occasional “quick queries” support by email/phone',
      ],
      popular: true,
    },
    {
      name: 'Growth – Compliance + GST + Payroll',
      priceLabel: 'from ~$400–$550/month',
      features: [
        'For trading companies with a few staff.',
        'Everything in Core, plus:',
        'Payroll processing (e.g. up to 5 employees) and payday filing',
        'Debtor/creditor review and basic cash‑flow commentary',
        'Up to 2–4 check‑in meetings per year',
      ],
      popular: false,
    },
    {
      name: 'Performance – Advisory bundle',
      priceLabel: 'from ~$650–$900+/month',
      features: [
        'For SMEs wanting proactive advice.',
        'Everything in Growth, plus:',
        'Annual budget and cash‑flow forecast',
        'Quarterly management reports and accountability meetings',
        'Tax planning session before year‑end',
        'Simple strategic/benchmarking review each year',
      ],
      popular: false,
    },
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Fixed Fee Packages</h1>
            <p className='text-xl text-gray-600'>Simple monthly pricing for compliance, GST, payroll, and advisory.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <h2 className='text-3xl font-bold text-center mb-12'>Choose Your Plan</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
            {tiers.map((tier) => (
              <Card key={tier.name} className={tier.popular ? 'ring-2 ring-[#0066CC] relative shadow-lg' : ''}>
                {tier.popular && <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066CC] text-white'>Most Popular</Badge>}
                <CardHeader className='text-center pb-2'>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className='mt-2 text-gray-700'>{tier.priceLabel}</div>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-3 mb-6'>
                    {tier.features.map((f, i) => (
                      <li key={i} className='flex items-start gap-2'>
                        <span className='text-green-500'>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href='/contact' className='block'>
                    <Button variant={tier.popular ? 'default' : 'outline'} className='w-full'>Request a Quote</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='text-center mt-12 pt-8 border-t border-gray-200'>
            <p className='text-gray-600'>Add payroll, rental schedules, or complex structures as add-ons when needed.</p>
          </div>
        </Container>
      </Section>

      <Section background='dark'>
        <Container>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-4'>Need a tailored package?</h2>
            <p className='text-xl text-gray-300 mb-8'>We can scope custom bundles for groups, trusts, or multi-entity structures.</p>
            <Link href='/contact'><Button variant='accent' size='lg'>Contact Us</Button></Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
