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
                href="/#price-by-type"
                className="inline-flex items-center justify-center gap-2 border border-[#006400] text-[#006400] hover:bg-[#006400]/10 px-8 py-4 text-lg font-medium rounded-none transition-all duration-300"
              >
                See Price List
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
             Why Choose My Tax Accountant?
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
              <p className="text-slate-600">Transparent pricing</p>
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
              href="/#price-by-type"
              className="inline-flex items-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              See Price List
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


      <section id="price-by-type" className="bg-white section-md scroll-mt-16 lg:scroll-mt-20 border-t border-slate-100">
        <div className="container-lg">
          <div className="text-center mb-12">
            <h2 className="display-lg text-[#0f172a] mb-4">Price List</h2>
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

      <section id="core-expertise" className="bg-emerald-50 section-md scroll-mt-16 lg:scroll-mt-20">
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="display-lg text-green-700 mb-4">Our Core Expertise</h2>
              <p className="text-body-lg text-slate-700 max-w-xl">
                Our dedicated team brings a wealth of knowledge to complex tax situations, focusing on:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 bg-emerald-100">
                <div className="w-12 h-12 mb-4 text-green-700">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6M9 12h6M9 16h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a]">Individual and Business Tax Returns</h3>
              </div>
              <div className="rounded-xl p-6 bg-emerald-100">
                <div className="w-12 h-12 mb-4 text-green-700">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6a2 2 0 012 2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a]">Audits and Litigation Support</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advisory-bundle" className="relative section-lg bg-[#0d5e24]">
        <div className="container-lg">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-[#d4a853] text-[#0f172a] text-xs font-semibold mb-4">ADVISORY UPGRADE</span>
              <h2 className="display-lg text-white mb-4">Performance – Advisory bundle</h2>
              <p className="text-white/80 mb-8 max-w-2xl">
                For SMEs wanting proactive advice, add annual budgeting, cash‑flow forecasting, quarterly reports and accountability meetings, and tax planning before year‑end.
              </p>
              <div className="border border-[#1c7a35] bg-[#115320] text-white p-6 mb-6">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="font-semibold">What You Get:</span>
                  <span className="text-white/90">Budget &amp; Forecast</span>
                  <span className="text-white/60">Quarterly reports</span>
                  <span className="text-[#d4a853] font-semibold">Tax planning</span>
                </div>
              </div>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Annual budget, cash‑flow and profit forecast for the year and variance analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Monthly management reports with KPI dashboard and commentary</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Monthly strategy and accountability meetings</span>
                </li>
                 <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Rolling 12‑month cash‑flow forecasting and scenario modelling</span>
                </li>
                 <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Mid‑year and pre‑year‑end tax planning and estimate of tax payable</span>
                </li>
                 <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Support with pricing, margins and break‑even analysis for growth decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-emerald-300 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>Email access for quick questions on numbers between meetings</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-2">Upgrade any package</div>
                  <div className="text-2xl font-bold text-[#0f172a] mb-2">from ~$650–$900+/month</div>
                  <div className="text-xs text-slate-500 mb-6">depending on scope</div>
                  <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-[#d4a853] text-[#0f172a] font-semibold hover:bg-[#e4be6a] transition-colors">
                    Request Advisory Bundle
                  </Link>
                  <div className="text-xs text-slate-500 mt-6">Recommended for growth‑stage SMEs</div>
                </div>
              </div>
            </div>
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

      <section className="bg-slate-50 section-lg">
        <div className="container-lg">
          <div className="text-center mb-16">
              <span className="text-mono text-[#d4a853] text-sm mb-4 block">Capabilities</span>
              <h2 className="display-lg text-[#0f172a] mb-4">Tools We Work With</h2>
              <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">Modern software and robust processes for reliable accounting</p>
          </div>

          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Xero (NZ)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cloud‑native, built in NZ, very strong for SMEs; real‑time bank feeds, GST and payroll filing to IRD,
                  large app ecosystem, and integrated payroll for smaller teams.
                </p>
              </div>
              <div className="bg-white p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">MYOB (NZ)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hybrid desktop/cloud options, strong compliance tooling (GST, trust forms, ACC, payroll), and good fit
                  where you want more “all‑in‑one” with deeper job/costing modules.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Payroll tools</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-slate-100">
                  <h4 className="text-base font-semibold text-[#0f172a] mb-2">Xero Payroll</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Best when you want a simple, integrated solution with Xero Accounting for small to mid‑sized teams;
                    handles PAYE, KiwiSaver and payday filing.
                  </p>
                </div>
                <div className="bg-white p-6 border border-slate-100">
                  <h4 className="text-base font-semibold text-[#0f172a] mb-2">PaySauce / PayHero / iPayroll</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    NZ‑focused cloud payrolls with IRD payday filing, KiwiSaver, leave and holiday pay tools, and employee
                    self‑service portals; good for clients with more complex rosters or awards.
                  </p>
                </div>
                <div className="bg-white p-6 border border-slate-100">
                  <h4 className="text-base font-semibold text-[#0f172a] mb-2">Smartly</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    “All‑in‑one” payroll and people platform focused on NZ, covering onboarding, timesheets and pay in a
                    single system.
                  </p>
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
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Client Reviews</span>
            <h2 className="display-lg text-[#0f172a] mb-4">What Clients Say</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-slate-200">
              <div className="font-semibold text-[#0f172a] mb-1">Renny Daniel</div>
              <div className="text-slate-900 font-semibold mb-2">Best Tax Agent Ever! 🙌💼</div>
              <p className="text-slate-700 leading-relaxed">
                I was seriously stressed after dealing with a dodgy tax agent who didn’t reply to my messages, missed half my expenses, and basically disappeared once I paid him. Total waste of time and money 😤
              </p>
              <p className="text-slate-700 leading-relaxed mt-2">
                Then a friend told me about EM Tax and OMG — what a difference!! 😍 He was super friendly, professional, and got everything sorted in just over an hour 🔥 Took the time to understand my situation properly and actually knew what he was doing.
              </p>
              <p className="text-slate-700 leading-relaxed mt-2">
                He made the whole process so easy and smooth, and even charged way less than the first guy 💯 No stress, no drama — just straight-up great service.
              </p>
              <div className="text-[#0f172a] font-semibold mt-3">HIGHLY recommend!! 👏👏👏</div>
            </div>
            <div className="bg-white p-8 border border-slate-200">
              <div className="font-semibold text-[#0f172a] mb-1">Ciby John</div>
              <p className="text-slate-700 leading-relaxed">
                Big thanks to Em Tax for making my 2025 income tax filing smooth and stress-free! I had two small businesses to file for—Uber and Ciby’s Kerala Cuisine—and they handled everything with such clarity, professionalism, and efficiency.
              </p>
              <p className="text-slate-700 leading-relaxed mt-2">
                Their team patiently explained the process, helped me claim eligible deductions, and made sure everything was submitted accurately and on time. I highly recommend Em Tax to any small business owners looking for reliable and knowledgeable tax support.
              </p>
              <div className="text-[#0f172a] font-semibold mt-3">Appreciate your great service.</div>
            </div>
            <div className="bg-white p-8 border border-slate-200">
              <div className="font-semibold text-[#0f172a] mb-1">Shyam K Menon </div>
              <div className="text-slate-900 font-semibold mb-2">I am very pleased with my experience with them. They are incredibly helpful and maintain a high level of professionalism.</div>
              <p className="text-slate-700 leading-relaxed">
                Highly recommended.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section id="cta" className="relative bg-[#006400] section-lg scroll-mt-16 lg:scroll-mt-20">
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
                href="/#price-by-type"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-white text-white px-10 py-5 text-lg font-medium transition-all duration-300"
              >
                 See Price List
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
