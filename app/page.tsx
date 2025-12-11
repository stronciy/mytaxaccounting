"use client"

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Animated Counter Component
function AnimatedCounter({ end, duration = 1200, suffix = '', prefix = '', decimals = 0, flickerMs = 400, className = '' }: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  flickerMs?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [flickerDone, setFlickerDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let flickerTimer: any
    let elapsed = 0
    if (!flickerDone && flickerMs > 0) {
      flickerTimer = setInterval(() => {
        elapsed += 50
        const rnd = Math.random() * end
        setCount(rnd)
        if (elapsed >= flickerMs) {
          clearInterval(flickerTimer)
          setFlickerDone(true)
        }
      }, 50)
      return () => clearInterval(flickerTimer)
    }
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(end * progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration, flickerDone, flickerMs])

  const formatted = decimals > 0 ? Number(count).toFixed(decimals) : String(Math.floor(count))
  return (
    <span ref={ref} className={cn("stat-number", className)}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

type PackageKey = 'starter' | 'core' | 'growth' | 'performance'

function PackageDetailsModal({ pkg, onClose }: { pkg: PackageKey, onClose: () => void }) {
  const content: Record<PackageKey, { title: string; who: string; outcome: string }> = {
    starter: {
      title: 'Starter – Compliance Only',
      who: "Sole traders, micro‑companies, and property investors who just need their annual returns filed correctly.",
      outcome: "Your year‑end tax and financials are handled, deadlines are met, and you don’t have to think about IRD/ATO letters or payment dates.",
    },
    core: {
      title: 'Core – Compliance + GST',
      who: "Small GST‑registered businesses with a bit more activity, but no (or very simple) payroll.",
      outcome: "Your GST, annual accounts, and Companies Office obligations are all taken care of, with regular reports so you always know how the business is tracking.",
    },
    growth: {
      title: 'Growth – Compliance + GST + Payroll',
      who: "Growing trading businesses with staff who want bookkeeping, GST, and payroll off their plate.",
      outcome: "Staff are paid correctly and on time, GST is lodged, and you get simple commentary and check‑ins so cash flow and compliance stay under control.",
    },
    performance: {
      title: 'Performance – Advisory Bundle',
      who: "SMEs that want a proactive partner: regular advice, planning, and numbers to support bigger decisions.",
      outcome: "A clear budget and forecast, structured quarterly accountability, intentional tax planning, and virtual CFO‑style support so you can grow with confidence instead of reacting at year‑end.",
    },
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const data = content[pkg]
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white p-8 shadow-xl border border-slate-200">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">{data.title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-[#0f172a] transition-colors" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-sm text-[#d4a853] font-semibold mb-2">Who it’s for</div>
            <p className="text-slate-700 leading-relaxed">{data.who}</p>
          </div>
          <div>
            <div className="text-sm text-[#d4a853] font-semibold mb-2">What outcome you get</div>
            <p className="text-slate-700 leading-relaxed">{data.outcome}</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-[#0f172a] hover:bg-slate-100 transition-colors">Close</button>
          <Link href="/contact" className="px-4 py-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] font-semibold transition-colors">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

type PriceTypeKey = 'individual' | 'sole_trader' | 'company' | 'trust' | 'bookkeeping' | 'payroll' | 'gst' | 'advisory'

function PriceTypeModal({ type, onClose }: { type: PriceTypeKey, onClose: () => void }) {
  const content: Record<PriceTypeKey, { title: string; subtitle?: string; items: { name: string; price?: string; monthly?: string; yearly?: string }[] }> = {
    individual: {
      title: 'Individual income tax',
      items: [
        { name: 'Individual income tax return', price: '$150 (Inc GST)' },
        { name: 'Rental schedule – per property', price: '$75 (Inc GST)' },
        { name: 'Business schedule (sole trader in ITR, simple, client-prepared)', price: '$99 (Inc GST)' },
        { name: 'Investment schedule (shares, overseas income, etc.)', price: '$99 (Inc GST)' },
        { name: 'Crypto schedule', price: '$220 (Inc GST)' },
        { name: 'Uber / Doordash / DiDi / Delivereasy', price: '$150 (Inc GST)' },
      ],
    },
    sole_trader: {
      title: 'Sole trader / partnership annual packages (NZD, Ex GST)',
      items: [
        { name: 'Up to $75k turnover', monthly: '$30', yearly: '$300' },
        { name: 'Up to $150k turnover', monthly: '$50', yearly: '$550' },
        { name: 'Up to $500k turnover', monthly: '$100', yearly: '$1,000' },
        { name: 'Up to $1m turnover', monthly: '$150', yearly: '$1,500' },
        { name: 'Up to $2m turnover', monthly: '$200', yearly: '$2,000' },
        { name: 'Up to $5m turnover', monthly: '$250', yearly: '$2,500' },
      ],
    },
    company: {
      title: 'Company annual packages (Ex GST)',
      items: [
        { name: 'Nil / holding company', yearly: '$150' },
        { name: 'Up to $150k turnover', monthly: '$100', yearly: '$1,000' },
        { name: 'Up to $500k turnover', monthly: '$150', yearly: '$1,500' },
        { name: 'Up to $1m turnover', monthly: '$250', yearly: '$2,500' },
        { name: 'Up to $2m turnover', monthly: '$500', yearly: '$5,000' },
        { name: 'Up to $5m turnover', monthly: '$800', yearly: '$8,000' },
      ],
    },
    trust: {
      title: 'Trust annual packages (Ex GST)',
      items: [
        { name: 'Nil / holding trust', yearly: '$150' },
        { name: 'Up to $150k turnover', monthly: '$100', yearly: '$1,000' },
        { name: 'Up to $500k turnover', monthly: '$150', yearly: '$1,500' },
        { name: 'Up to $1m turnover', monthly: '$250', yearly: '$2,500' },
        { name: 'Up to $2m turnover', monthly: '$500', yearly: '$5,000' },
        { name: 'Up to $5m turnover', monthly: '$800', yearly: '$8,000' },
      ],
    },
    bookkeeping: {
      title: 'Bookkeeping packages (Ex GST)',
      items: [
        { name: 'Up to $75k turnover — Bi‑monthly processing', monthly: '$100', yearly: '$1,000' },
        { name: 'Up to $150k turnover — Bi‑monthly processing', monthly: '$150', yearly: '$1,500' },
        { name: 'Up to $500k turnover — Bi‑monthly processing', monthly: '$300', yearly: '$3,000' },
        { name: 'Up to $1m turnover — monthly', monthly: '$500', yearly: '$5,000' },
        { name: 'Up to $2m turnover — monthly', monthly: '$800', yearly: '$8,000' },
        { name: 'Up to $5m turnover — monthly', monthly: '$1,000', yearly: '$10,000' },
      ],
    },
    payroll: {
      title: 'Payroll',
      items: [
        { name: 'Per employee (includes PAYE filing, KiwiSaver, and usual payroll compliance)', monthly: '$30', yearly: '$300' },
      ],
    },
    gst: {
      title: 'GST / return‑only work (Ex GST)',
      items: [
        { name: 'GST return', price: '$90 per return' },
        { name: 'Instalment / provisional tax statement', price: '$150 per statement' },
        { name: 'Annual GST return', price: '$200 per year' },
      ],
    },
    advisory: {
      title: 'Tax advisory (Ex GST)',
      items: [
        { name: 'Structured tax plan', monthly: '$100', yearly: '$1,000' },
        { name: 'Trust distribution planning', monthly: '$150', yearly: '$1,500' },
        { name: 'Dividend calculations', monthly: '$150', yearly: '$1,500' },
        { name: 'FBT return', monthly: '$100', yearly: '$1,000' },
        { name: 'Accountant’s letter', price: '$200' },
        { name: 'Financial statement to third party institution', price: '$250' },
      ],
    },
  }

  const data = content[type]
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white p-8 shadow-xl border border-slate-200">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f172a]">{data.title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-[#0f172a] transition-colors" aria-label="Close">✕</button>
        </div>
        <div className="space-y-4">
          {data.subtitle && <p className="text-slate-600">{data.subtitle}</p>}
          <div className="border border-slate-200">
            {data.items.some(i => i.monthly || i.yearly) ? (
              <>
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 bg-slate-50 text-sm font-semibold text-slate-700">
                  <div>Item</div>
                  <div className="text-right">Monthly</div>
                  <div className="text-right">Yearly</div>
                </div>
                <div className="divide-y divide-slate-200">
                  {data.items.map((it, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3">
                      <div className="text-slate-700">{it.name}</div>
                      <div className="text-[#0f172a] font-medium text-right">{it.monthly ?? '—'}</div>
                      <div className="text-[#0f172a] font-medium text-right">{it.yearly ?? '—'}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 bg-slate-50 text-sm font-semibold text-slate-700">
                  <div>Item</div>
                  <div className="text-right">Price</div>
                </div>
                <div className="divide-y divide-slate-200">
                  {data.items.map((it, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3">
                      <div className="text-slate-700">{it.name}</div>
                      <div className="text-[#0f172a] font-medium text-right">{it.price}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-[#0f172a] hover:bg-slate-100 transition-colors">Close</button>
          <Link href="/contact" className="px-4 py-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] font-semibold transition-colors">Talk to Us</Link>
        </div>
      </div>
    </div>
  )
}

// Floating geometric shapes for visual interest
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gold accent orb - top right (smaller, more refined) */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,83,0.35) 0%, rgba(212,168,83,0.12) 40%, transparent 70%)',
          top: '-100px',
          right: '-100px',
        }}
      />
      {/* Blue accent orb - bottom left (smaller) */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-18"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)',
          bottom: '-80px',
          left: '-80px',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />
      {/* Geometric lines (smaller, more delicate) */}
      <svg className="absolute top-1/4 left-10 w-24 h-24 opacity-12" viewBox="0 0 100 100">
        <line x1="0" y1="50" x2="100" y2="50" stroke="#d4a853" strokeWidth="0.5" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#d4a853" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" stroke="#d4a853" strokeWidth="0.5" fill="none" />
      </svg>
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageKey | null>(null)
  const [selectedPriceType, setSelectedPriceType] = useState<PriceTypeKey | null>(null)

  useEffect(() => {
    // Set loaded state after mount to trigger entrance animations
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <main className="overflow-x-hidden">
      {/* ============================================
          HERO SECTION - Clean White with Green Accents
          ============================================ */}
      <section className="relative min-h-screen bg-white flex items-center">

        <div className="container-xl relative z-10 py-32 lg:py-40">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow Badge */}
            <div
              className={`inline-flex items-center justify-center gap-3 mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`}
            >
              <span className="inline-block px-4 py-1 bg-[#d4a853] text-[#0f172a] font-semibold tracking-widest">
                Accounting as a Service
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-100' : ''}`}
            >
              Stop stressing over tax deadlines — get your accounting done right.
            </h1>

            {/* Statement */}
            <p
              className={`text-center text-lg text-green-700 max-w-2xl mx-auto mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-150' : ''}`}
            >
              On‑time compliance with guaranteed accuracy.
            </p>

            {/* Subheadline */}
            <p
              className={`text-center text-base md:text-lg text-green-600 max-w-2xl mx-auto mb-12 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-200' : ''}`}
            >
              We handle GST, payroll, and annual accounts so you can focus on growth...
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row justify-center gap-4 mb-16 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-300' : ''}`}
            >
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,168,83,0.3)]"
              >
                Get Accounting Support
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center gap-2 border border-[#006400] text-[#006400] hover:bg-[#006400]/10 px-8 py-4 text-lg font-medium rounded-none transition-all duration-300"
              >
                See Fixed Fee Packages
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div
              className={`flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-slate-200 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-400' : ''}`}
            >
              <div className="flex items-center gap-2">
                <AnimatedCounter end={99.8} decimals={1} suffix="%" flickerMs={500} className="text-2xl font-bold text-green-700" />
                <span className="text-sm text-green-600">On‑Time Filing</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <AnimatedCounter end={100} suffix="+" flickerMs={500} className="text-2xl font-bold text-green-700" />
                <span className="text-sm text-green-600">SMEs Supported</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <AnimatedCounter end={15} suffix="+" flickerMs={500} className="text-2xl font-bold text-green-700" />
                <span className="text-sm text-green-600">Years of Experience</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <AnimatedCounter end={70} suffix="%+" flickerMs={500} className="text-2xl font-bold text-green-700" />
                <span className="text-sm text-green-600">Clients in Trades, Healthcare, Professional Services</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-700 font-semibold">Clients Across New Zealand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-slate-400 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </section>

      {/* ============================================
          VALUE PROPOSITION SECTION
          ============================================ */}
      <section id="services" className="relative bg-white section-md scroll-mt-16 lg:scroll-mt-20 overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#d4a853]/5 to-transparent" />

        <div className="container-lg relative z-10">
          <div className="text-center mb-12">
            <h2 className="display-lg text-[#0f172a] mb-4">
              Why Choose Our Accounting?
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Accurate compliance, proactive reminders, and clear financials—without surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">On‑time Compliance</h3>
              <p className="text-slate-600">GST, PAYE/ESCT, payroll and returns filed on schedule</p>
            </div>

            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Fixed Monthly Fees</h3>
              <p className="text-slate-600">Transparent pricing: Starter, Core, Growth, Performance</p>
            </div>

            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Certified Accountants</h3>
              <p className="text-slate-600">NZ tax expertise and error‑checked filings</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/#packages"
              className="inline-flex items-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              See Fixed Fee Packages
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION - Dark Band
          ============================================ */}
      <section className="bg-[#006400] py-20">
        <div className="container-lg">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="display-md text-white mb-4">Choose Clarity. Choose Compliance.</h3>
            <p className="text-body-lg text-white/80">Fixed‑fee accounting for SMEs — on‑time GST, payroll, and annual returns.</p>
          </div>
        </div>
      </section>

      {/* ============================================
          SUBSCRIPTION PRICING PREVIEW
          ============================================ */}
      <section id="packages" className="bg-white section-md scroll-mt-16 lg:scroll-mt-20">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Simple, Transparent Pricing</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Fixed Fee Packages
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Simple monthly pricing for compliance, GST, payroll, and advisory.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift">
              <div className="text-sm text-slate-500 font-semibold mb-2">Starter – Compliance Only</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$150/month</div>
              <div className="text-slate-500 text-sm mb-6">for sole traders, micro companies, simple GST</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Annual financial statements and income tax return</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">IRD account management and tax payment reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">One annual review meeting (by video or phone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Email support for day‑to‑day questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Cancel anytime</span>
                </li>
              </ul>
              <button onClick={() => setSelectedPackage('starter')} className="block w-full text-center py-3 border border-slate-300 hover:border-[#0f172a] hover:bg-slate-100 text-[#0f172a] font-medium transition-colors">
                See details
              </button>
            </div>

            {/* Professional - MOST POPULAR */}
            <div className="relative bg-white p-8 border-2 border-[#d4a853] shadow-lg hover:shadow-xl transition-all card-lift">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4a853] text-[#0f172a] text-xs font-bold px-4 py-1">
                MOST POPULAR
              </div>
              <div className="text-sm text-[#d4a853] font-semibold mb-2">Core – Compliance + GST</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$250/month</div>
              <div className="text-slate-500 text-sm mb-6">for small GST‑registered businesses</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">GST return preparation and lodgement</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Quarterly or bi‑monthly management reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Companies Office annual return</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Priority email support for quick queries</span>
                </li>
              </ul>
              <button onClick={() => setSelectedPackage('core')} className="block w-full text-center py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold transition-colors">
                See details
              </button>
              <div className="mt-3 text-xs text-center text-slate-500">Most selected by GST‑registered businesses</div>
            </div>

            {/* Growth */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift">
              <div className="text-sm text-slate-500 font-semibold mb-2">Growth – Compliance + GST + Payroll</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$400/month</div>
              <div className="text-slate-500 text-sm mb-6">for trading companies with a few staff</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Everything in Core</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Payroll processing (e.g. up to 5 employees)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">KiwiSaver and leave accrual management</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Debtor/creditor review and basic cash‑flow commentary</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Up to 2–4 check‑in meetings per year</span>
                </li>
              </ul>
              <button onClick={() => setSelectedPackage('growth')} className="block w-full text-center py-3 border border-slate-300 hover:border-[#0f172a] hover:bg-slate-100 text-[#0f172a] font-medium transition-colors">
                See details
              </button>
            </div>

            {/* Performance */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift">
              <div className="text-sm text-slate-500 font-semibold mb-2">Performance – Advisory bundle</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$750/month</div>
              <div className="text-slate-500 text-sm mb-6">for SMEs wanting proactive advice</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Everything in Growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Annual budget and rolling cash‑flow forecast</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Monthly management reports and accountability meetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Tax planning session before year‑end</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Strategic/benchmarking review each year</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Optional virtual CFO support (e.g. board pack prep, KPI tracking) +$150/month</span>
                </li>
              </ul>
              <button onClick={() => setSelectedPackage('performance')} className="block w-full text-center py-3 border border-slate-300 hover:border-[#0f172a] hover:bg-slate-100 text-[#0f172a] font-medium transition-colors">See details</button>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              <span className="font-semibold text-[#0f172a]">Need more?</span> Add-ons available: Xero/MYOB, rental schedules, complex structures, audits/objections
            </p>
            <Link href="/#advisory" className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#d4a853] font-medium transition-colors">
              View all add-ons and options
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="price-by-type" className="bg-white section-md scroll-mt-16 lg:scroll-mt-20 border-t border-slate-100">
        <div className="container-lg">
          <div className="text-center mb-12">
            <h2 className="display-lg text-[#0f172a] mb-4">Price by Type</h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">Price based on entity type and turnover</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <button onClick={() => setSelectedPriceType('individual')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Individual Income Tax</button>
            <button onClick={() => setSelectedPriceType('sole_trader')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Sole Trader / Partnership</button>
            <button onClick={() => setSelectedPriceType('company')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Company</button>
            <button onClick={() => setSelectedPriceType('trust')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Trust</button>
            <button onClick={() => setSelectedPriceType('bookkeeping')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Bookkeeping</button>
            <button onClick={() => setSelectedPriceType('payroll')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Payroll</button>
            <button onClick={() => setSelectedPriceType('gst')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">GST / Returns</button>
            <button onClick={() => setSelectedPriceType('advisory')} className="py-4 px-6 border border-slate-300 hover:border-[#d4a853] hover:bg-[#d4a853]/10 text-[#0f172a] font-medium transition-colors">Tax Advisory</button>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - Timeline Style
          ============================================ */}
      <section id="capabilities" className="bg-slate-50 section-lg scroll-mt-16 lg:scroll-mt-20">
        <div className="container-lg">
          <div className="text-center mb-20">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">The Process</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              How Our Accounting Works
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              From onboarding to year‑end, a simple process
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />

            <div className="grid lg:grid-cols-3 gap-12">
              {[
              {
                step: '01',
                title: 'Onboarding & Setup',
                description: 'We set up GST/PAYE, connect Xero/MYOB, and align your chart of accounts.',
                icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                },
              {
                step: '02',
                title: 'Bookkeeping & GST',
                description: 'Monthly bookkeeping, GST preparation and filing, proactive reminders.',
                icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
              {
                step: '03',
                title: 'Payroll & Annual Accounts',
                description: 'Payroll processing and payday filing; year‑end financial statements and tax returns.',
                icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  {/* Step number bubble */}
                  <div className="relative z-10 w-12 h-12 bg-[#0f172a] text-white rounded-full flex items-center justify-center mx-auto mb-8 text-lg font-bold">
                    {item.step}
                  </div>
                  {/* Card */}
                  <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-[#d4a853]/30 transition-all duration-300 card-lift">
                    <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6 mx-auto text-[#d4a853]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#0f172a] mb-3 text-center">{item.title}</h3>
                    <p className="text-slate-600 text-center leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          9-PHASE METHODOLOGY
          ============================================ */}
      <section className="bg-white section-lg">
        <div className="container-lg">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Sticky header */}
            <div className="lg:sticky lg:top-32">
              <span className="text-mono text-[#d4a853] text-sm mb-4 block">Our Cycle</span>
              <h2 className="display-lg text-[#0f172a] mb-6">
                Annual Accounting<br />
                <span className="gold-text">Cycle</span>
              </h2>
              <p className="text-body-lg text-slate-600 mb-8">
                A structured, year‑round process covering bookkeeping, GST, payroll,
                reporting, year‑end accounts, and tax returns.
              </p>
              <Link
                href="/#selection"
                className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 font-medium transition-colors"
              >
                Learn More About Our Process
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right - Phases list */}
            <div className="space-y-4">
              {[
                { phase: '01', title: 'Onboarding & setup', time: '~1 week' },
                { phase: '02', title: 'Monthly bookkeeping', time: '~monthly' },
                { phase: '03', title: 'GST preparation & filing', time: '~bi‑monthly/quarterly' },
                { phase: '04', title: 'Payroll & PAYE/ESCT', time: '~each payday' },
                { phase: '05', title: 'Management reports', time: '~quarterly' },
                { phase: '06', title: 'Year‑end close', time: '~2 weeks' },
                { phase: '07', title: 'Annual financial statements', time: '~1 week' },
                { phase: '08', title: 'Income tax returns', time: '~2 weeks' },
                { phase: '09', title: 'Companies Office annual return', time: '~1 hour' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-6 p-5 bg-slate-50 hover:bg-[#0f172a] border border-slate-100 hover:border-[#0f172a] transition-all duration-300 cursor-default"
                >
                  <span className="text-mono text-[#d4a853] text-lg font-bold w-8">{item.phase}</span>
                  <span className="flex-1 font-medium text-slate-900 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {item.time}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="font-semibold text-slate-900">Total Time</span>
                <span className="text-[#d4a853] font-bold text-xl">~12 Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          QUALITY ASSURANCE SECTION
          ============================================ */}
      <section id="selection" className="bg-white section-lg scroll-mt-16 lg:scroll-mt-20 border-t border-slate-100">
        <div className="container-lg">
          <div className="text-center mb-16">
              <span className="text-mono text-[#d4a853] text-sm mb-4 block">Compliance You Can Trust</span>
              <h2 className="display-lg text-[#0f172a] mb-4">
                Accurate Filings and Rigorous Checks
              </h2>
              <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
                We handle filings with multi‑point validation and human review so you stay compliant without stress.
              </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* 3-Layer Artifact Prevention */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/30 transition-all">
              <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Zero Penalties</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">Accurate filings and deadline tracking minimize IRD penalties.</p>
              <div className="text-xs text-slate-500">On‑time filing guarantee</div>
            </div>

            {/* 100-Point Quality Rubric */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/30 transition-all">
              <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Multi‑point Accuracy Checks</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">Automated validations and human review ensure correct calculations.</p>
              <div className="text-xs text-slate-500">Dual review before submission</div>
            </div>

            {/* 9-Point Validation */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/30 transition-all">
              <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Compliance Validation</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">GST, PAYE/ESCT, FBT, and tax return checks before filing.</p>
              <div className="text-xs text-slate-500">Audit‑friendly documentation</div>
            </div>
          </div>

          {/* Quality Details Expandable */}
          <div className="max-w-4xl mx-auto bg-[#006400] p-8 text-white">
            <h4 className="text-lg font-semibold mb-6 text-center">
              The 9 Quality Gates Every Proposal Must Pass
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">1.</span>
                <span>Section Completeness - 100% match to plan</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">2.</span>
                <span>Word Count Compliance - Within 15% of target</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">3.</span>
                <span>Evaluation Criteria Coverage - All addressed 2+ times</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">4.</span>
                <span>Win Theme Consistency - Integrated across 5+ sections</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">5.</span>
                <span>Compliance Matrix Verification - All requirements mapped</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">6.</span>
                <span>Placeholder Detection - Zero [INSERT] or [TODO]</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">7.</span>
                <span>Mandatory Requirements - 100% coverage verified</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">8.</span>
                <span>Visual Placeholders - All image slots specified</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#d4a853] font-bold">9.</span>
                <span>AI Artifact Detection - Zero telltale language</span>
              </div>
            </div>
            <p className="text-center mt-8 text-slate-400 text-sm">
              Every proposal passes all 9 checks before delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES GRID
          ============================================ */}
      <section className="bg-slate-50 section-lg">
        <div className="container-lg">
          <div className="text-center mb-16">
              <span className="text-mono text-[#d4a853] text-sm mb-4 block">Capabilities</span>
              <h2 className="display-lg text-[#0f172a] mb-4">Tools We Work With</h2>
              <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">Modern software and robust processes for reliable accounting</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Xero/MYOB Integration',
                description: 'Seamless bookkeeping with direct integrations to popular accounting platforms.',
                icon: '01',
              },
              {
                title: 'GST Returns Automation',
                description: 'Preparation and filing workflows with proactive reminders and checks.',
                icon: '02',
              },
              {
                title: 'Payroll Processing',
                description: 'PAYE/ESCT filings and payday reporting handled accurately and on time.',
                icon: '03',
              },
              {
                title: 'Tax Planning',
                description: 'Provisional tax calculations and year‑end tax planning to avoid surprises.',
                icon: '04',
              },
              {
                title: 'Companies Office Filings',
                description: 'Annual returns prepared and filed; director/shareholder updates managed.',
                icon: '05',
              },
              {
                title: 'Secure Client Portal',
                description: 'Encrypted document exchange and status tracking for complete visibility.',
                icon: '06',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 border border-slate-100 hover:border-[#d4a853]/50 transition-all duration-300 card-lift"
              >
                <div className="flex items-start gap-4">
                  <span className="text-mono text-[#d4a853] text-sm font-bold">{feature.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-2 group-hover:text-[#d4a853] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          AI SELECTION SECTION
          ============================================ */}
      <section className="bg-white section-lg border-t border-slate-100">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Choose Your Package</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Pick the Plan That Fits Your Business
            </h2>
            <p className="text-body-lg text-slate-600 max-w-3xl mx-auto">
              Start simple with compliance, add GST and payroll as you grow, or choose advisory for proactive support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Starter */}
            <div className="bg-slate-50 border border-slate-200 hover:border-blue-500/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Starter – Compliance only</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Begin with essentials</p>
                <p className="text-slate-600 leading-relaxed">Annual financial statements, income tax return, IRD account management, reminders, one annual review meeting.</p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sole traders and micro companies
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Simple or no GST
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    First‑time IRD setup
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">Choose this to get compliant fast</div>
              </div>
            </div>

            {/* Core */}
            <div className="bg-slate-50 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Core – Compliance + GST</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Add GST and reporting</p>
                <p className="text-slate-600 leading-relaxed">Everything in Starter plus GST return preparation/filing, Xero management reports, Companies Office annual return, quick queries support.</p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Small GST‑registered businesses
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Regular GST filings (bi‑monthly/quarterly)
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Need management reporting
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">Choose this if GST is in scope</div>
              </div>
            </div>

            {/* Growth */}
            <div className="bg-slate-50 border border-slate-200 hover:border-blue-400/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Growth – Compliance + GST + Payroll</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Add payroll and cash‑flow</p>
                <p className="text-slate-600 leading-relaxed">Everything in Core plus payroll processing and payday filing, debtor/creditor review, and basic cash‑flow commentary.</p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Trading companies with a few staff
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Need payroll processing and PAYE/ESCT
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Want quarterly insights
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">Choose this if you have employees</div>
              </div>
            </div>
          </div>

          {/* Decision Helper */}
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 p-8 mb-16">
            <h4 className="text-lg font-semibold text-[#0f172a] mb-6 text-center">
              Not Sure Which to Pick?
            </h4>
            <p className="text-slate-600 text-center mb-8">Ask yourself: "What level of support do we need right now?"</p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">"We need compliance covered with basics."</p>
                <p className="font-bold text-[#0f172a]">→ Starter</p>
              </div>
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">"GST filing and regular reporting are key."</p>
                <p className="font-bold text-[#0f172a]">→ Core</p>
              </div>
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">"We have staff and need payroll handled."</p>
                <p className="font-bold text-[#0f172a]">→ Growth</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm text-center mt-6">Still unsure? Any package works; you can add advisory when ready.</p>
          </div>

          {/* Premium Intelligence */}
          <div id="advisory" className="relative bg-[#006400] p-12 scroll-mt-16 lg:scroll-mt-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1">
                  <span className="inline-block bg-[#d4a853] text-[#0f172a] text-xs font-bold px-3 py-1 mb-6">ADVISORY UPGRADE</span>
                  <h3 className="text-3xl font-bold text-white mb-4">Performance – Advisory bundle</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">For SMEs wanting proactive advice, add annual budgeting, cash‑flow forecasting, quarterly reports and accountability meetings, and tax planning before year‑end.</p>
                  <div className="bg-white/5 border border-slate-700 p-4 mb-6">
                    <p className="text-white font-semibold mb-2">What You Get:</p>
                    <div className="flex items-center gap-4 text-sm"><span className="text-slate-400">Budget & Forecast</span><span className="text-slate-600">•</span><span className="text-slate-300">Quarterly reports</span><span className="text-slate-600">•</span><span className="text-[#d4a853] font-bold">Tax planning</span></div>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Annual budget & cash‑flow forecast</li>
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Quarterly management reports + accountability meetings</li>
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Tax planning session before year‑end</li>
                  </ul>
                </div>
                <div className="lg:w-80">
                  <div className="bg-white p-8 text-center">
                    <p className="text-sm text-slate-500 font-semibold mb-2">Upgrade any package</p>
                    <div className="text-2xl font-bold text-[#0f172a] mb-2">from ~$650–$900+/month</div>
                    <p className="text-slate-500 text-sm mb-6">depending on scope</p>
                    <Link href="/contact" className="block w-full bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] py-4 font-semibold transition-colors mb-4">Request Advisory Bundle</Link>
                    <p className="text-xs text-slate-500">Recommended for growth‑stage SMEs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SUCCESS STORIES - SPECIFIC CASE STUDIES
          ============================================ */}
      <section id="case-studies" className="bg-white section-lg scroll-mt-16 lg:scroll-mt-20">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Proven Results</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Real Clients, Real Wins
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - see the measurable results our clients achieve
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Case Study 1: Tax Deadline Saved */}
            <div className="bg-slate-50 p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#d4a853] font-bold">Tax Deadline Saved</div>
              </div>
              <blockquote className="text-slate-900 mb-6 leading-relaxed">
                &quot;IRD deadline was in 72 hours. We were behind on GST and payroll filings. They caught us up, filed correctly, and avoided penalties. Now we&apos;re on the Growth plan.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Owner</div>
                <div className="text-sm text-slate-500 mb-3">Retail SME</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Plan: Growth</span>
                  <span>On‑time filings restored</span>
                </div>
              </div>
            </div>

            {/* Case Study 2: Cost Savings */}
            <div className="bg-slate-50 p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#d4a853] font-bold">ROI Champion</div>
              </div>
              <blockquote className="text-slate-900 mb-6 leading-relaxed">
                &quot;We used to pay $1,200+ quarterly for ad‑hoc accountants. On the Core plan we pay ~$300/month including GST filings and Xero reports. Better visibility, lower cost.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Founder</div>
                <div className="text-sm text-slate-500 mb-3">Software Startup</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Core Tier</span>
                  <span>Saved: ~65%</span>
                </div>
              </div>
            </div>

            {/* Case Study 3: Accuracy Skeptic */}
            <div className="bg-slate-50 p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#d4a853] font-bold">Accuracy Proven</div>
              </div>
              <blockquote className="text-slate-900 mb-6 leading-relaxed">
                &quot;We switched from a freelancer after repeated mistakes in PAYE filings. These folks caught issues, corrected past returns, and set up robust checks. No penalties since.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Director</div>
                <div className="text-sm text-slate-500 mb-3">Manufacturing SME</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Now: Performance Tier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT YOU RECEIVE - DELIVERABLES
          ============================================ */}
      <section id="deliverables" className="bg-slate-50 section-lg scroll-mt-16 lg:scroll-mt-20">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Complete Package</span>
            <h2 className="display-lg text-[#0f172a] mb-4">What You Receive</h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">All packages include core compliance deliverables and documented checks.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Annual Financial Statements', description: 'Compliant year‑end accounts prepared and delivered.', icon: '01' },
              { title: 'Income Tax Return', description: 'Filed with IRD for sole traders, partnerships, companies, or LTCs.', icon: '02' },
              { title: 'GST Filing Confirmations', description: 'Prepared and filed GST returns with documented checks.', icon: '03' },
              { title: 'Payroll & PAYE/ESCT Reports', description: 'Payday filing records and summaries for employees.', icon: '04' },
              { title: 'Management Reports', description: 'Quarterly or bi‑monthly Xero reports and commentary.', icon: '05' },
              { title: 'Companies Office Annual Return', description: 'Filed on time; shareholder/director records maintained.', icon: '06' },
            ].map((deliverable, index) => (
              <div
                key={index}
                className="bg-white p-6 border border-slate-100 hover:border-[#d4a853]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-mono text-[#d4a853] text-sm font-bold">{deliverable.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                      {deliverable.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{deliverable.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-white border border-slate-200 p-8 text-center">
            <h4 className="text-xl font-semibold text-[#0f172a] mb-4">Complete Transparency. Full Audit Trail.</h4>
            <p className="text-slate-600 leading-relaxed mb-6">View filing proofs, reconciliation notes, and checklists. Everything documented for audits and peace of mind.</p>
            <div className="text-sm text-slate-500">All deliverables included in every package</div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ / OBJECTION HANDLING
          ============================================ */}
      <section id="faq" className="bg-slate-50 section-md scroll-mt-16 lg:scroll-mt-20">
        <div className="container-md">
          <div className="text-center mb-12">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Common Questions</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              You&apos;re Probably Wondering...
            </h2>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">What’s included in Starter/Core/Growth/Performance?</h3>
              <p className="text-slate-600 leading-relaxed">Starter: annual financial statements, income tax return, IRD management, reminders, one annual meeting, basic email support.</p>
              <p className="text-slate-600 leading-relaxed">Core: всё из Starter + GST preparation/filing, Xero reports, Companies Office annual return, quick queries support.</p>
              <p className="text-slate-600 leading-relaxed">Growth: всё из Core + payroll processing and payday filing, debtor/creditor review, basic cash‑flow commentary, 2–4 check‑ins/year.</p>
              <p className="text-slate-600 leading-relaxed">Performance: всё из Growth + annual budget and cash‑flow forecast, quarterly management reports & accountability meetings, tax planning before year‑end, simple strategic/benchmarking.</p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">Do you handle IRD, Companies Office, and audits?</h3>
              <p className="text-slate-600 leading-relaxed mb-3">Yes. We manage IRD accounts, reminders, and filings across GST, PAYE/ESCT, FBT, and income tax. Companies Office annual returns are included in Core+. Audit/objection support is available as an add‑on.</p>
              <div className="flex items-center gap-2 text-sm"><span className="font-semibold text-emerald-600">On‑time filings and documented checks.</span></div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">Can I upgrade/downgrade or add add‑ons anytime?</h3>
              <p className="text-slate-600 leading-relaxed">Yes. Packages are month‑to‑month. You can switch tiers or add extras (Xero/MYOB, rental schedules, complex structures, audits/objections) at any time.</p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">How do you keep my financial data secure?</h3>
              <p className="text-slate-600 leading-relaxed">AES‑256 at rest, TLS 1.3 in transit, role‑based access, MFA, audit logs. NDA by default. Optional data deletion after 90 days.</p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">Which package should we choose?</h3>
              <p className="text-slate-600 leading-relaxed">Starter for compliance only, Core for GST, Growth for GST + payroll, Performance for advisory. You can switch tiers anytime.</p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">What checks do you run before filing?</h3>
              <p className="text-slate-600 leading-relaxed">GST reconcile, PAYE/ESCT tests, deadline controls, double human review, filing proofs and reports stored for audit.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/#faq" className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#d4a853] font-medium transition-colors">
              See all frequently asked questions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section id="cta" className="relative bg-[#006400] section-lg scroll-mt-16 lg:scroll-mt-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,168,83,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-lg relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-mono text-[#d4a853] text-sm mb-6 block">Stop Missing Deadlines. Start Operating Clean.</span>
            <h2 className="display-xl text-white mb-6">
              Every Day You Wait Is Another<br />
              <span className="gold-text">Risk of IRD Penalties</span>
            </h2>
            <p className="text-body-lg text-slate-300 mb-10 max-w-2xl mx-auto">Join SMEs who chose on‑time compliance, clear reports, and fixed monthly fees.</p>

            {/* What Happens Next */}
            <div className="bg-white/5 border border-slate-700 p-8 mb-10 text-left max-w-xl mx-auto">
              <div className="text-white font-semibold mb-4 text-center">Here&apos;s what happens next:</div>
              <div className="space-y-3 text-slate-300 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">1.</span>
                  <span>Click the button below (30 seconds)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">2.</span>
                  <span>Share basic business details (2 minutes)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">3.</span>
                  <span>We set up GST/PAYE and connect Xero/MYOB (1–3 days)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">4.</span>
                  <span>We file GST/payroll on schedule and send reports</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">5.</span>
                  <span>Year‑end accounts and income tax returns prepared</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] px-10 py-5 text-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,168,83,0.3)]"
              >
                Get Accounting Support
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-white text-white px-10 py-5 text-lg font-medium transition-all duration-300"
              >
                See Fixed Fee Packages
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-16 pt-12 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
                <span>Globally Available</span>
                <span className="w-px h-4 bg-slate-700" />
                <span>SOC 2 Compliant</span>
                <span className="w-px h-4 bg-slate-700" />
                <span>Enterprise Ready</span>
                <span className="w-px h-4 bg-slate-700" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPackage && (
        <PackageDetailsModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
      )}
      {selectedPriceType && (
        <PriceTypeModal type={selectedPriceType} onClose={() => setSelectedPriceType(null)} />
      )}
    </main>
  )
}
