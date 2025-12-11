import Link from 'next/link'
import { Button, Card, CardContent, Section, Container, Badge } from '@/components/ui'

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <Container size="xl" className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">Fixed‑Fee Accounting for SMEs</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Accurate compliance, proactive reminders, and clear financials — without surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact"><Button variant="accent" size="lg" className="w-full sm:w-auto">Get Accounting Support</Button></Link>
              <Link href="/#capabilities"><Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">See How It Works</Button></Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span>99.8% On‑Time Filings</span>
              <span>500+ Returns Filed</span>
              <span>100+ SMEs Supported</span>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose My Tax Accounting?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">On‑time compliance, expert review, and transparent fixed fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⏰</div>
              <h3 className="text-xl font-semibold mb-2">On‑Time Compliance</h3>
              <p className="text-gray-600 mb-4">GST, PAYE/ESCT, payroll and returns filed on schedule.</p>
              <Badge variant="success">Deadline Tracking</Badge>
            </CardContent></Card>
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h3 className="text-xl font-semibold mb-2">Expert Review</h3>
              <p className="text-gray-600 mb-4">AI‑assisted prep + accountant validation and documented checks.</p>
              <Badge variant="success">Accuracy Guarantee</Badge>
            </CardContent></Card>
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">$</div>
              <h3 className="text-xl font-semibold mb-2">Fixed Monthly Fees</h3>
              <p className="text-gray-600 mb-4">Transparent packages for SMEs — no surprises.</p>
              <Badge variant="success">Transparent Pricing</Badge>
            </CardContent></Card>
          </div>
        </Container>
      </Section>

      <Section background="gray" className="py-12">
        <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-[#0066CC] mb-3">Choose Clarity. Choose Compliance.</h3>
              <p className="text-lg text-gray-600">Fixed‑fee accounting for SMEs — on‑time GST, payroll, and annual returns.</p>
            </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2></div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Share Your Details</h3>
              <p className="text-gray-600 mb-2">Business info + access to Xero/MYOB.</p>
              <Badge variant="secondary">5 minutes</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">We Set Up GST/PAYE</h3>
              <p className="text-gray-600 mb-2">Connect Xero/MYOB, set up GST/PAYE and reminders.</p>
              <Badge variant="secondary">1–3 days</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Operate Clean Monthly</h3>
              <p className="text-gray-600 mb-2">We file GST/payroll, send reports, and handle IRD.</p>
              <Badge variant="secondary">Ongoing</Badge>
            </div>
          </div>
          <div className="text-center"><Link href="/#capabilities"><Button variant="outline">Learn More</Button></Link></div>
        </Container>
      </Section>

      <Section background="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Operate Clean?</h2>
            <p className="text-xl text-gray-300 mb-8">On‑time GST, payroll, and annual returns with fixed monthly fees.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"><Button variant="accent" size="lg">Get Accounting Support</Button></Link>
              <Link href="/#price-by-type"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">See Price List</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
