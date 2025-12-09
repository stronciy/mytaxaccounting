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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_WP_BASE_URL || 'https://mytaxaccountant.co.nz'),
  title: {
    default: 'My Tax Accounting | GST, Payroll, Annual Returns',
    template: '%s | My Tax Accounting',
  },
  description:
    'Fixed-fee accounting for SMEs: annual financial statements, income tax returns, GST preparation/filing, PAYE/ESCT payroll, Companies Office annual returns, and advisory.',
  keywords: [
    'accounting',
    'GST returns',
    'PAYE',
    'ESCT',
    'payroll',
    'financial statements',
    'income tax return',
    'Companies Office annual return',
    'Xero',
    'MYOB',
    'SME accounting',
    'fixed fee packages',
  ],
  authors: [{ name: 'My Tax Accounting' }],
  creator: 'My Tax Accounting',
  publisher: 'My Tax Accounting',
  category: 'Accounting Services',
  classification: 'Tax and Compliance',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'My Tax Accounting | GST, Payroll, Annual Returns',
    description:
      'Accounting services for small businesses: compliance, GST, payroll, and advisory.',
    siteName: 'My Tax Accounting',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Tax Accounting — small business accounting services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Tax Accounting | GST, Payroll, Annual Returns',
    description:
      'Fixed-fee accounting for SMEs: compliance, GST, payroll, and advisory.',
    images: ['/og-image.png'],
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
