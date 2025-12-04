import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'V39 Consultancy | RFP Proposals in 24 Hours',
    template: '%s | V39 Consultancy',
  },
  description:
    'Professional RFP proposals delivered in 24 hours starting at $599/month. AI-powered, expert-reviewed, quality-guaranteed. 82% client win rate. Cancel anytime. Globally available.',
  keywords: [
    'RFP proposals',
    'proposal writing',
    'UAE',
    'Dubai',
    'bid writing',
    'tender response',
    'RFP services',
    'proposal generation',
    'RaaS',
    'government RFP',
    'proposal automation',
    'AI proposal writing',
    'request for proposal',
    'bid management',
    'tender writing services',
    'professional proposal services',
    'fast proposal delivery',
  ],
  authors: [{ name: 'V39 Consultancy' }],
  creator: 'V39 Consultancy',
  publisher: 'V39 Consultancy',
  metadataBase: new URL('https://v39-consultancy.com'),
  alternates: {
    canonical: 'https://v39-consultancy.com',
    languages: {
      'en-US': 'https://v39-consultancy.com',
    },
  },
  category: 'Business Services',
  classification: 'RFP Proposal Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://v39-consultancy.com',
    title: 'V39 Consultancy | RFP Proposals in 24 Hours',
    description:
      'Professional RFP proposals delivered in 24 hours starting at $599/month. AI-powered RaaS for global businesses. 82% win rate.',
    siteName: 'V39 Consultancy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'V39 Consultancy - Professional RFP Proposals in 24 Hours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V39 Consultancy | RFP Proposals in 24 Hours',
    description:
      'Professional RFP proposals delivered in 24 hours starting at $599/month. AI-powered, expert-reviewed, 82% win rate.',
    images: ['/og-image.png'],
    creator: '@v39consultancy',
    site: '@v39consultancy',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    // Add when you have verification codes
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
  other: {
    'msapplication-TileColor': '#0f172a',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header transparent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
