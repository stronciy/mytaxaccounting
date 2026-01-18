import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about accounting services, fixed fee packages, IRD/Companies Office filings, and security.',
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: 'General',
    items: [
      {
        question: 'What does My Tax Accountant actually do?',
        answer: 'My Tax Accountant provides fixed‑fee accounting for New Zealand SMEs, including GST, PAYE/ESCT, payroll, annual financial statements and income tax returns, plus optional advisory support.',
      },
      {
        question: 'Who do you work with?',
        answer: 'Most clients are New Zealand‑based sole traders, partnerships, companies and LTCs, particularly in trades, healthcare and professional services, but we can work with most small‑to‑medium businesses.',
      },
      {
        question: 'Are your services fully online?',
        answer: 'Yes. Onboarding, document uploads, signing and meetings can all be done online, with secure portals and video calls, so we can support clients anywhere in New Zealand.',
      },
    ],
  },
  {
    title: 'Services and pricing',
    items: [
      {
        question: 'What services can you handle for my business?',
        answer: 'We can look after annual accounts and tax returns, GST preparation and filing, payroll and PAYE/ESCT, Companies Office annual returns, management reports and advisory such as budgeting and cash‑flow forecasting.',
      },
      {
        question: 'How does your pricing work now that plans are not listed?',
        answer: 'We use a fixed‑fee model. After a short call to understand your structure, turnover, staff and software, we give you a written proposal with a monthly fee tailored to your business and the services you need.',
      },
      {
        question: 'Can I scale services up or down as my business changes?',
        answer: 'Yes. You can start with core compliance (accounts and tax) and add or remove GST, payroll and advisory services as you grow, with fees adjusted accordingly and no long‑term lock‑in.',
      },
      {
        question: 'Do you offer once‑off work as well as ongoing support?',
        answer: 'Yes. We can help with once‑off jobs such as catch‑up lodgements, IRD reviews, or a standalone budget/forecast, and then move you to an ongoing monthly arrangement if that suits.',
      },
      {
        question: 'How much do your services cost?',
        answer: 'Our fees are based on your entity type and annual turnover, with clear price bands. For example, annual compliance for trading entities (sole trader, partnership, company or trust) typically starts from around $300–$1,000 per year for smaller businesses and scales in steps up to $8,000 per year for entities with turnovers up to $5m (excl. GST). Bookkeeping, payroll, GST‑only, individual returns and tax advisory are priced separately using fixed menus, so you can see exactly what each service costs before you start.',
      },
    ],
  },
  {
    title: 'GST, payroll and tax',
    items: [
      {
        question: 'Can you take over my GST and PAYE/ESCT filings?',
        answer: 'Yes. For clients who opt in, we prepare and file your GST returns, run payroll, process PAYE/ESCT and handle payday filing with IRD so deadlines are not missed.',
      },
      {
        question: 'Do you handle Companies Office and annual returns?',
        answer: 'Yes. We can manage Companies Office annual returns and basic company maintenance, including director/shareholder updates, as part of your engagement.',
      },
      {
        question: 'Can you help if I am behind with IRD or have penalties?',
        answer: 'Yes. We regularly help clients catch up overdue GST, PAYE/ESCT and income tax, correct past filings and put in place processes to avoid future penalties. Audit/objection support is available where needed.',
      },
    ],
  },
  {
    title: 'Onboarding and process',
    items: [
      {
        question: 'How does onboarding work?',
        answer: 'After you accept our proposal, we gather basic details, connect your Xero/MYOB file, review your IRD and Companies Office records, and realign your chart of accounts and deadlines so that future filings are on time.',
      },
      {
        question: 'Which accounting software do you support?',
        answer: 'We primarily work with Xero and MYOB, with direct integrations for bookkeeping, reporting and GST; we can discuss other systems on request.',
      },
      {
        question: 'How often will I hear from you?',
        answer: 'You’ll receive reminders and updates around each GST, payroll and year‑end cycle, plus scheduled review meetings depending on the level of support you choose (for example, annual or quarterly check‑ins).',
      },
    ],
  },
  {
    title: 'Security and data',
    items: [
      {
        question: 'How do you keep my data secure?',
        answer: 'We use encrypted client portals (TLS 1.3 in transit, AES‑256 at rest), role‑based access, MFA and audit logs. Engagements include confidentiality and, if requested, data‑deletion options after set periods.',
      },
      {
        question: 'Can you work directly with my bookkeeper or advisor?',
        answer: 'Yes. We can liaise with your internal or external bookkeeper, finance manager or advisor to divide responsibilities and keep everyone working from the same numbers.',
      },
    ],
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
              Everything you need to know about our accounting services.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
                  {category.title}
                </h2>
                <div className="space-y-6">
                  {category.items.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              Our team is here to help. Reach out and we will get back to you
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="accent" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  See Price List
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
