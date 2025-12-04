import { Metadata } from 'next'
import { Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'V39 Consultancy Privacy Policy - How we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: November 2024</p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Introduction</h2>
            <p>
              V39 Consultancy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our RFP proposal generation services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company name and business information</li>
              <li>Payment and billing information</li>
              <li>Account credentials</li>
            </ul>

            <h3>2.2 RFP Documents and Business Data</h3>
            <p>
              When you use our services, you may upload RFP documents, company materials,
              and other business-related content. This information is processed solely to
              generate your proposals and is treated with the highest confidentiality.
            </p>

            <h3>2.3 Automatically Collected Information</h3>
            <p>We automatically collect certain information when you visit our website, including:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our proposal generation services</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul>
              <li>AES-256 encryption for all documents at rest and in transit</li>
              <li>SOC 2 Type II certified infrastructure</li>
              <li>Regular third-party security audits</li>
              <li>Automatic NDA coverage for all projects</li>
              <li>Permanent deletion of files 30 days after project completion</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our
              services and fulfill the purposes outlined in this policy. RFP documents and
              generated proposals are automatically deleted 30 days after delivery unless
              you opt-in to extended storage.
            </p>

            <h2>6. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors (lawyers, accountants)</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal information</li>
              <li>Rectify or update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience.
              You can control cookie settings through your browser preferences.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than
              your own. We ensure appropriate safeguards are in place to protect your
              information in accordance with applicable data protection laws.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@v39-consultancy.com<br />
              <strong>Address:</strong> V39 Consultancy, Dubai, UAE
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
