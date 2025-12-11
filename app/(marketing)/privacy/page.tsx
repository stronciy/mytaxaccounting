import { Metadata } from 'next'
import { Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'My Tax Accounting Privacy Policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              My Tax Accounting – Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: December 2025</p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto text-[17px] leading-relaxed font-serif text-slate-800 space-y-6">
            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">1. Introduction</h2>
            <p className="pl-6">1.1 My Tax Accounting (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides tax and accounting services to individuals and businesses in New Zealand and is committed to protecting your privacy.</p>
            <p className="pl-6">1.2 This Privacy Policy explains how we collect, use, disclose and protect your personal information in accordance with the New Zealand Privacy Act 2020 and its Information Privacy Principles.</p>
            <p className="pl-6">1.3 By engaging us or using our website or services, you agree to the collection and use of your information as described in this Policy.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">2. Information We Collect</h2>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">2.1 Personal identification and contact details</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Name, postal and physical address</li>
              <li>Email address and phone numbers</li>
              <li>Date of birth and IRD number where required for tax purposes</li>
              <li>Employer or business details and position/title</li>
            </ul>

            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">2.2 Financial, tax and business information</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Financial statements, trial balances and general ledger data</li>
              <li>Invoices, bank statements, payroll records and expense information</li>
              <li>Tax returns, assessments, correspondence with Inland Revenue (IR) and related documents</li>
              <li>Company, trust, partnership and shareholder information needed to provide tax and accounting services</li>
            </ul>

            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">2.3 Website and technical data</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>IP address, device identifiers, browser type and operating system</li>
              <li>Pages visited, time and date of visits and referring website addresses</li>
              <li>Cookie and analytics data used to improve our website and services (see section 9)</li>
            </ul>

            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">2.4 Other information you choose to provide</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Information provided in meetings, phone calls, emails or online forms</li>
              <li>Information provided when you subscribe to newsletters, webinars or events</li>
            </ul>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">3. How We Use Your Information</h2>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">3.1 Service delivery</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>To provide tax, accounting, payroll and advisory services you have requested</li>
              <li>To prepare and lodge tax returns, statements and other filings with IR and other authorities, as authorised by you</li>
              <li>To communicate with you about your engagements, deadlines and obligations</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">3.2 Business operations</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>To manage our client relationship, including invoicing, payments and administration</li>
              <li>To maintain and improve our systems, processes and quality assurance</li>
              <li>To train staff and contractors (using deidentified or limited information where practical)</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">3.3 Marketing and communications</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>To send you technical updates, newsletters, event invitations and service information where you have opt‑in or where permitted by law</li>
              <li>You may unsubscribe from marketing communications at any time by using the unsubscribe link or contacting us directly</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">3.4 Legal, compliance and risk management</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>To meet our legal, regulatory and professional obligations (including those imposed by IR, the Privacy Act 2020 and professional bodies)</li>
              <li>To detect, investigate and help prevent fraud, misuse of our services or other unlawful activity</li>
              <li>To respond to lawful requests from government agencies or regulators</li>
            </ul>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">4. Legal Bases for Processing</h2>
            <p className="pl-6">4.1 We collect and use your personal information where it is reasonably necessary for our business functions as a tax and accounting practice.</p>
            <p className="pl-6">4.2 Our primary legal bases include:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Your consent (for example, to marketing communications)</li>
              <li>Performance of a contract with you or your organisation</li>
              <li>Compliance with legal obligations (including tax and record‑keeping laws)</li>
              <li>Our legitimate interests in operating and improving our practice, balanced against your privacy interests</li>
            </ul>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">5. Tax Agent and Confidentiality Obligations</h2>
            <p className="pl-6">5.1 As a tax agent, we are subject to strict confidentiality obligations in relation to your tax affairs. Your information will only be disclosed to IR or other authorities as authorised by you or as required or permitted by law.</p>
            <p className="pl-6">5.2 We take reasonable steps to ensure that all staff and contractors who access your information are bound by confidentiality agreements and professional duties of confidence.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">6. Information Sharing and Disclosure</h2>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">6.1 Service providers and suppliers</h3>
            <p className="pl-6">We may share your personal information with trusted third parties who assist us to operate our business, such as:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Cloud accounting, document management and practice‑management platforms</li>
              <li>IT, hosting, security and backup providers</li>
              <li>External bookkeepers, payroll providers and other professional support services</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">6.2 Professional advisers and counterparties</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Our lawyers, auditors, insurers and other professional advisers where reasonably necessary for advice, audit, risk management or dispute resolution</li>
              <li>Other parties in a corporate transaction (such as a merger or business sale) where your information is relevant and appropriate safeguards are in place</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">6.3 Government agencies and regulators</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Inland Revenue and other government agencies where required or permitted by law, including for tax compliance, anti‑money laundering or law‑enforcement purposes</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">6.4 Overseas recipients</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>Some of our service providers or team members may be located outside New Zealand. Where your information is transferred overseas, we take reasonable steps to ensure it is protected by privacy safeguards that are comparable to those under the New Zealand Privacy Act 2020 (Information Privacy Principle 12).</li>
            </ul>
            <h3 className="font-serif font-normal text-lg md:text-xl mt-6 pl-6">6.5 No sale of personal information</h3>
            <ul className="list-disc pl-10 space-y-2">
              <li>We do not sell your personal information to third parties.</li>
            </ul>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">7. Data Security</h2>
            <p className="pl-6">7.1 We implement reasonable technical and organisational measures to protect your information from unauthorised access, use, alteration or disclosure. These measures may include:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Encryption of data in transit and at rest, where supported by our systems</li>
              <li>Access controls, strong authentication and role‑based permissions</li>
              <li>Secure configuration, patching and monitoring of systems</li>
              <li>Regular backups and secure storage of physical records</li>
            </ul>
            <p className="pl-6">7.2 While we use best‑practice safeguards, no system can be guaranteed as completely secure. If we become aware of a privacy breach that is likely to cause serious harm, we will assess it and, where required, notify the Office of the Privacy Commissioner and affected individuals in accordance with the Privacy Act 2020.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">8. Data Retention</h2>
            <p className="pl-6">8.1 We retain personal information only for as long as it is reasonably required for the purposes set out in this Policy, or as required by law or professional standards.</p>
            <p className="pl-6">8.2 For tax and accounting records, this generally means retaining information for at least the minimum periods required under New Zealand tax and companies’ legislation (which may be seven years or longer), unless a longer period is necessary for legal or business reasons.</p>
            <p className="pl-6">8.3 When information is no longer required, we will take reasonable steps to securely destroy it or anonymise it so that it no longer identifies you.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">9. Cookies and Website Tracking</h2>
            <p className="pl-6">9.1 Our website may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Enable basic site functionality</li>
              <li>Remember your preferences</li>
              <li>Help us understand how our website is used and to improve user experience</li>
            </ul>
            <p className="pl-6">9.2 You can control cookies through your browser settings. If you disable cookies, some website features may not function correctly.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">10. Your Rights</h2>
            <p className="pl-6">10.1 Under the Privacy Act 2020, you have the right to:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of any personal information that is inaccurate or incomplete</li>
              <li>Complain about a potential breach of your privacy rights</li>
            </ul>
            <p className="pl-6">10.2 To exercise these rights, please contact us using the details in section 12. For security reasons, we may need to verify your identity before acting on your request.</p>
            <p className="pl-6">10.3 If you are not satisfied with our response, you may lodge a complaint with the Office of the Privacy Commissioner.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">11. Children’s Information</h2>
            <p className="pl-6">11.1 Our services are generally directed to adults and business clients. Where we act for a minor (for example, in family tax or trust matters), we collect and use their information only with appropriate authority from a parent, guardian or authorised representative.</p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">12. Contact Us</h2>
            <p className="pl-6">12.1 If you have any questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights, please contact:</p>
            <p><strong>My Tax Accounting</strong></p>
            <p><strong>Email:</strong> <a href="mailto:info@mytaxaccountant.co.nz">info@mytaxaccountant.co.nz</a></p>
            <p>
              <strong>Address:</strong><br />
              8 Montserrat Place, Grenada Village<br />
              Wellington 6037, New Zealand
            </p>

            <h2 className="font-serif font-bold text-2xl md:text-3xl mt-10 pt-6 border-t border-slate-200">13. Changes to This Privacy Policy</h2>
            <p className="pl-6">13.1 We may update this Privacy Policy from time to time to reflect changes in our practices, technologies or legal requirements.</p>
            <p className="pl-6">13.2 Any updates will be posted on our website with a revised &quot;Last updated&quot; date. We encourage you to review this Policy periodically to stay informed about how we protect your information.</p>
          </div>
        </Container>
      </Section>
    </>
  )
}
