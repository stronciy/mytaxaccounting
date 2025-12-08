import { Section, Container, Card, CardContent, Badge } from '@/components/ui'

export const metadata = {
  title: 'Add-ons',
  description: 'Optional add-ons for subscriptions and complex scenarios.'
}

export default function AddOnsPage() {
  const addons = [
    'Xero/MYOB subscription',
    'Rental property schedules',
    'Complex structures (multiple entities, groups, trusts)',
    'IRD audits/objections, restructures, and one‑off projects'
  ]

  return (
    <>
      <Section background='gray'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Add‑ons</h1>
            <p className='text-xl text-gray-600'>Flexible extras you can add to any package.</p>
          </div>
        </Container>
      </Section>

      <Section background='white'>
        <Container>
          <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {addons.map((a, i) => (
              <Card key={i} className='p-6'>
                <CardContent className='space-y-3 pt-2'>
                  <Badge variant='secondary'>Add‑on</Badge>
                  <p className='text-gray-800'>{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

