import { Metadata } from 'next'
import { Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'My Tax Accounting Terms of Service — conditions for accounting services.',
}

export default function TermsPage() {
  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600">Last updated: November 2024</p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using My Tax Accounting&apos;s services (&quot;Services&quot;), you agree to be
              bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms,
              please do not use our Services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              My Tax Accounting provides accounting services (GST, payroll, annual accounts, tax returns).
              We deliver compliant filings, clear reports, and advisory where requested.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To use our Services, you must create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <h3>4.1 Pricing</h3>
            <p>
              Our pricing is as published on our website. Prices are subject to change
              with reasonable notice. Current pricing includes:
            </p>
            <ul>
              <li>Starter: $599/month (1 proposal)</li>
              <li>Professional: $999/month (2 proposals)</li>
              <li>Business: $1,799/month (4 proposals)</li>
              <li>Enterprise: Custom pricing for 8+ proposals</li>
            </ul>

            <h3>4.2 Payment</h3>
            <p>
              Payment is due at the time of order. We accept major credit cards and other
              payment methods as indicated at checkout.
            </p>

            <h3>4.3 Subscriptions</h3>
            <p>
              Subscription plans automatically renew monthly unless cancelled. You may
              cancel your subscription at any time through your account settings. Unused
              proposals do not roll over to the next billing period.
            </p>

            <h2>5. Delivery and Revisions</h2>
            <p>
              Standard delivery is within 24 hours of receiving all required materials.
              One round of minor revisions is included. Additional revisions or major
              changes may incur additional fees.
            </p>

            <h2>6. Intellectual Property</h2>
            <h3>6.1 Your Content</h3>
            <p>
              You retain all rights to the documents, financial records, payroll data, and other
              content you provide to us (&quot;Your Content&quot;). You grant us a limited license
              to use Your Content solely for providing the Services.
            </p>

            <h3>6.2 Generated Outputs</h3>
            <p>
              Upon full payment, you receive all rights to reports, filings (where applicable), and materials we produce for
              you. You may use and store these outputs as needed.
            </p>

            <h3>6.3 Our Platform</h3>
            <p>
              We retain all rights to our platform, technology, methodologies, and any
              improvements developed during the provision of Services.
            </p>

            <h2>7. Confidentiality</h2>
            <p>
              We treat all Your Content as confidential. We will not disclose your
              information to third parties except as necessary to provide the Services
              or as required by law. An automatic NDA applies to all engagements.
            </p>

            <h2>8. Quality Guarantee</h2>
            <p>
              If a delivered proposal does not meet the quality standards outlined in
              your order, we will either:
            </p>
            <ul>
              <li>Re-work the proposal at no additional cost</li>
            </ul>
            <p>
              Claims must be submitted within 7 days of delivery.
            </p>

            <h2>9. Limitations of Liability</h2>
            <p>
              To the maximum extent permitted by law:
            </p>
            <ul>
              <li>
                We do not guarantee specific tax outcomes or regulatory decisions
              </li>
              <li>
                We are not liable for any indirect, incidental, or consequential damages
              </li>
              <li>
                Our total liability is limited to the amount you paid for the specific
                Service giving rise to the claim
              </li>
            </ul>

            <h2>10. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our Services for any unlawful purpose</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to reverse engineer our technology</li>
              <li>Resell or redistribute our Services without authorization</li>
              <li>Use automated systems to access our platform</li>
            </ul>

            <h2>11. Termination</h2>
            <p>
              We may suspend or terminate your access to the Services at any time for
              violation of these Terms or for any other reason at our discretion. Upon
              termination, your right to use the Services ceases immediately.
            </p>

            <h2>12. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or our Services shall be resolved
              through binding arbitration in New Zealand, in accordance with applicable rules.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of New Zealand, without
              regard to conflict of law principles.
            </p>

            <h2>14. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Changes will be effective upon
              posting to our website. Continued use of the Services after changes
              constitutes acceptance of the modified Terms.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@mytaxaccountant.co.nz<br />
              <strong>Address:</strong> My Tax Accounting, Level 10, 21 Queen Street, Auckland 1010, New Zealand
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
