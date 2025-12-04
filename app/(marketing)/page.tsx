import Link from 'next/link'
import { Button, Card, CardContent, Section, Container, Badge } from '@/components/ui'

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <Container size="xl" className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">RaaS - Result as a Service</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              RFP Proposals in <span className="text-[#FF9900]">5 Hours</span> for <span className="text-[#FF9900]">$799</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              While consultants schedule kickoff calls, we deliver finished proposals. World-class quality. UAE-licensed. Guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup"><Button variant="accent" size="lg" className="w-full sm:w-auto">Get Your Proposal Now</Button></Link>
              <Link href="/how-it-works"><Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">See How It Works</Button></Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span>100+ UAE Businesses</span>
              <span>68% Win Rate</span>
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose V39?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We deliver results, not software access.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⚡</div>
              <h3 className="text-xl font-semibold mb-2">5-Hour Delivery</h3>
              <p className="text-gray-600 mb-4">Traditional consultants take 2-4 weeks. We deliver same day.</p>
              <Badge variant="success">50x Faster</Badge>
            </CardContent></Card>
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h3 className="text-xl font-semibold mb-2">World-Class Quality</h3>
              <p className="text-gray-600 mb-4">Professional methodologies from elite consulting frameworks.</p>
              <Badge variant="success">9-Point Validation</Badge>
            </CardContent></Card>
            <Card className="text-center p-8"><CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">$</div>
              <h3 className="text-xl font-semibold mb-2">$799 Per Proposal</h3>
              <p className="text-gray-600 mb-4">vs $5,000-$15,000 from traditional consultants.</p>
              <Badge variant="success">85% Savings</Badge>
            </CardContent></Card>
          </div>
        </Container>
      </Section>

      <Section background="gray" className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold text-[#0066CC] mb-2">100+</div><div className="text-gray-600">Proposals Delivered</div></div>
            <div><div className="text-4xl font-bold text-[#0066CC] mb-2">68%</div><div className="text-gray-600">Client Win Rate</div></div>
            <div><div className="text-4xl font-bold text-[#0066CC] mb-2">$2.8M+</div><div className="text-gray-600">Contracts Won</div></div>
            <div><div className="text-4xl font-bold text-[#0066CC] mb-2">4.8hr</div><div className="text-gray-600">Avg Delivery</div></div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2></div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Upload Your RFP</h3>
              <p className="text-gray-600 mb-2">Share your RFP document and company materials.</p>
              <Badge variant="secondary">5 minutes</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">We Work Our Magic</h3>
              <p className="text-gray-600 mb-2">AI + expert review creates your proposal.</p>
              <Badge variant="secondary">5 hours</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive and Win</h3>
              <p className="text-gray-600 mb-2">Get your professional proposal ready to submit.</p>
              <Badge variant="secondary">Review and submit</Badge>
            </div>
          </div>
          <div className="text-center"><Link href="/how-it-works"><Button variant="outline">Learn More</Button></Link></div>
        </Container>
      </Section>

      <Section background="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Win More RFPs?</h2>
            <p className="text-xl text-gray-300 mb-8">Join 100+ UAE businesses winning contracts with V39.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><Button variant="accent" size="lg">Get Your Proposal Now</Button></Link>
              <Link href="/pricing"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">View Pricing</Button></Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
