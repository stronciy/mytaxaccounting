import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about V39 Consultancy RFP proposal services, pricing, delivery times, and quality guarantees.',
}

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How can you deliver consultant quality starting at $599/month?',
    answer: 'Traditional consultants spend 60+ hours manually drafting proposals. We use AI to handle 40 hours of repetitive work (research, initial drafting, compliance checking), then our expert consultants review and enhance everything. Same quality, faster delivery, 90% less cost. You get the strategic expertise that matters - without paying for manual data entry.',
  },
  {
    question: "Won't evaluators know it's AI-generated?",
    answer: "No - because it's NOT just AI. Every proposal is reviewed and enhanced by our consulting partner (20+ years experience). AI handles the grunt work; our experts add strategic positioning, win themes, and industry insights that AI can't provide. The result is indistinguishable from pure consultant work - because it includes real consultant expertise. Our 82% win rate proves it works.",
  },
  {
    question: 'What if I need revisions?',
    answer: 'One round of minor revisions is included at no additional charge. Typical revisions (timeline adjustments, adding credentials, tweaking 2-3 sections) are handled within 24 hours. 95% of clients approve as-is or with minor tweaks. Major rewrites can be quoted separately based on scope.',
  },
  {
    question: 'How do you ensure my confidential RFP data is secure?',
    answer: "We use bank-level AES-256 encryption for all documents. Every project is covered by automatic NDA. We're SOC 2 Type II certified with annual third-party security audits. Your files are permanently deleted 30 days after delivery (unless you opt-in to save them). Enterprise-grade security for global compliance.",
  },
  {
    question: 'How long does it typically take to receive my proposal?',
    answer: 'Standard delivery is 24 hours from submission of all required materials. Rush delivery (5-hour turnaround) is available for an additional fee. Business tier subscribers get one free rush delivery per month.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve all industries including technology, healthcare, construction, consulting, professional services, government contracting, and more. Our AI is trained on thousands of winning proposals across diverse sectors.',
  },
  {
    question: 'What if I&apos;m not satisfied with the proposal?',
    answer: 'We include one round of revisions with every proposal. If there are issues with quality or coverage, we will re-work the proposal to meet the standards outlined in your agreement. We stand behind the quality of our work.',
  },
  {
    question: 'Can I use V39 for government RFPs?',
    answer: 'Absolutely. We have extensive experience with federal, state, and local government RFPs. Our proposals follow all required compliance formats and include proper certifications sections.',
  },
  {
    question: 'What do I need to provide to get started?',
    answer: 'At minimum, you need to provide the RFP document and basic company information. The more you share (past proposals, company capabilities, team bios, case studies), the more tailored your proposal will be.',
  },
  {
    question: 'How does the subscription work?',
    answer: 'Monthly subscriptions include a set number of proposals per month (1, 2, or 4 depending on tier). Unused proposals do not roll over. You can cancel anytime with no penalty, making it risk-free to try our service.',
  },
  {
    question: 'Can I see a sample proposal before purchasing?',
    answer: 'Yes! Contact our sales team to request sanitized sample proposals relevant to your industry. We want you to be confident in our quality before committing.',
  },
  {
    question: 'Do you support languages other than English?',
    answer: 'Currently, we support English and Arabic (Phase 2). Additional language support is planned for future releases. Contact us for specific language requirements.',
  },
]

export default function FAQPage() {
  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about V39 proposal services.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is here to help. Reach out and we will get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="accent" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
