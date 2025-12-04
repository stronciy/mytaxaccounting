"use client"

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
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

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <span ref={ref} className="stat-number">
      {prefix}{count}{suffix}
    </span>
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
          HERO SECTION - Dramatic Dark with Mesh Gradient
          ============================================ */}
      <section className="relative min-h-screen bg-gradient-mesh bg-noise flex items-center">
        <FloatingShapes />

        <div className="container-xl relative z-10 py-32 lg:py-40">
          <div className="max-w-5xl">
            {/* Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-3 mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`}
            >
              <span className="text-mono text-[#d4a853] tracking-widest">Result as a Service</span>
              <span className="w-12 h-px bg-gradient-to-r from-[#d4a853] to-transparent" />
            </div>

            {/* Main Headline */}
            <h1
              className={`display-hero text-white mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-100' : ''}`}
            >
              Stop Losing RFPs to{' '}
              <span className="block">
                Firms With Better Proposals
              </span>
              <span className="block text-3xl lg:text-5xl mt-6 text-slate-300 font-normal">
                Win-ready responses in{' '}
                <span className="gold-text relative font-bold">
                  24 Hours
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 9C50 9 50 3 100 3C150 3 150 9 200 9"
                      stroke="url(#gold-gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gold-gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop offset="0%" stopColor="#d4a853" />
                        <stop offset="50%" stopColor="#e4be6a" />
                        <stop offset="100%" stopColor="#d4a853" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                {' '}— guaranteed quality
              </span>
            </h1>

            {/* Natural tagline */}
            <p
              className={`text-xl text-slate-400 italic max-w-2xl mb-8 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-150' : ''}`}
            >
              We read the RFP like we&apos;re the ones bidding on it. Because that&apos;s what it takes to win.
            </p>

            {/* Subheadline */}
            <p
              className={`text-body-lg text-slate-300 max-w-2xl mb-12 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-200' : ''}`}
            >
              Join 100+ global businesses who stopped overpaying consultants and started winning more contracts.
              Expert-quality proposals at 85% less cost. Next-day delivery. Starting at $599/month.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-16 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-300' : ''}`}
            >
              <Link
                href="/signup"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,168,83,0.3)]"
              >
                Start Your Next-Day Proposal
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-[#d4a853] text-white px-8 py-4 text-lg font-medium rounded-none transition-all duration-300 hover:bg-white/5"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div
              className={`flex flex-wrap items-center gap-8 pt-8 border-t border-slate-800 opacity-0 ${isLoaded ? 'animate-fade-in-up delay-400' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">82%</span>
                <span className="text-sm text-slate-400">Win Rate</span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">$15M+</span>
                <span className="text-sm text-slate-400">Contracts Won</span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">4 Continents</span>
                <span className="text-sm text-slate-400">Served</span>
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
      <section className="relative bg-white section-md overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#d4a853]/5 to-transparent" />

        <div className="container-lg relative z-10">
          <div className="text-center mb-12">
            <h2 className="display-lg text-[#0f172a] mb-4">
              Why V39?
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Professional RFP proposals delivered in 24 hours. No consultants. No delays. Just results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">24-Hour Delivery</h3>
              <p className="text-slate-600">Get your proposal tomorrow, not in 2-4 weeks</p>
            </div>

            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">85% Cost Savings</h3>
              <p className="text-slate-600">Pay $599-$2,499/month vs. $5K-$15K per consultant</p>
            </div>

            <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">Expert Quality</h3>
              <p className="text-slate-600">World-class methodologies, AI-powered precision</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              View Subscription Plans
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
      <section className="bg-[#0f172a] py-20">
        <div className="container-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 100, suffix: '+', label: 'Proposals Delivered' },
              { value: 82, suffix: '%', label: 'Client Win Rate' },
              { value: 15, suffix: 'M+', prefix: '$', label: 'Contracts Won' },
              { value: 24, suffix: 'hr', label: 'Avg. Delivery' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix || ''}
                    duration={1500 + index * 200}
                  />
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SUBSCRIPTION PRICING PREVIEW
          ============================================ */}
      <section className="bg-white section-md">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Simple, Transparent Pricing</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Subscription Plans
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Flexible monthly subscriptions with no commitment. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift">
              <div className="text-sm text-slate-500 font-semibold mb-2">Starter</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$599</div>
              <div className="text-slate-500 text-sm mb-6">per month</div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">1 proposal/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">24-hour delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Email support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">1 revision</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Cancel anytime</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center py-3 border border-slate-300 hover:border-[#0f172a] hover:bg-slate-100 text-[#0f172a] font-medium transition-colors">
                Subscribe
              </Link>
            </div>

            {/* Professional - MOST POPULAR */}
            <div className="relative bg-white p-8 border-2 border-[#d4a853] shadow-lg hover:shadow-xl transition-all card-lift">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4a853] text-[#0f172a] text-xs font-bold px-4 py-1">
                MOST POPULAR
              </div>
              <div className="text-sm text-[#d4a853] font-semibold mb-2">Professional</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$999</div>
              <div className="text-slate-500 text-sm mb-6">per month</div>
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-2 mb-6">
                <div className="text-emerald-700 font-semibold text-sm">$499 per proposal</div>
                <div className="text-emerald-600 text-xs">Save 29%</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">2 proposals/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Monthly report</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">2 revisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Cancel anytime</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold transition-colors">
                Subscribe
              </Link>
              <div className="mt-3 text-xs text-center text-slate-500">
                40-50% choose this tier
              </div>
            </div>

            {/* Business */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift">
              <div className="text-sm text-slate-500 font-semibold mb-2">Business</div>
              <div className="text-4xl font-bold text-[#0f172a] mb-2">$1,799</div>
              <div className="text-slate-500 text-sm mb-6">per month</div>
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-2 mb-6">
                <div className="text-emerald-700 font-semibold text-sm">$450 per proposal</div>
                <div className="text-emerald-600 text-xs">Save 36% + rush</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">4 proposals/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">+1 FREE rush/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Unlimited revisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600">Cancel anytime</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center py-3 border border-slate-300 hover:border-[#0f172a] hover:bg-slate-100 text-[#0f172a] font-medium transition-colors">
                Subscribe
              </Link>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              <span className="font-semibold text-[#0f172a]">Need more?</span> Enterprise plans start at $2,999/month for 8+ proposals with VIP support
            </p>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#d4a853] font-medium transition-colors">
              View all plans, features, and annual pricing options
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - Timeline Style
          ============================================ */}
      <section className="bg-slate-50 section-lg">
        <div className="container-lg">
          <div className="text-center mb-20">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">The Process</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              How V39 Works
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              From RFP to winning proposal in three simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  step: '01',
                  title: 'Submit Your RFP',
                  description: 'Upload your RFP document and company materials. Our AI analyzes requirements instantly.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  ),
                },
                {
                  step: '02',
                  title: 'AI + Expert Generation',
                  description: 'Our proprietary 9-phase methodology combines AI analysis with human expertise.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  step: '03',
                  title: 'Receive & Win',
                  description: 'Get your polished, compliant proposal delivered in 24 hours. Ready to submit and win.',
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
              <span className="text-mono text-[#d4a853] text-sm mb-4 block">Our Edge</span>
              <h2 className="display-lg text-[#0f172a] mb-6">
                The 9-Phase<br />
                <span className="gold-text">Framework</span>
              </h2>
              <p className="text-body-lg text-slate-600 mb-8">
                A proven methodology combining AI automation with world-class
                consulting frameworks. Every proposal passes through rigorous validation.
              </p>
              <Link
                href="/how-it-works"
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
                { phase: '01', title: 'Discovery & Requirements Analysis', time: '~2 hours' },
                { phase: '02', title: 'Competitive Intelligence Gathering', time: '~2 hours' },
                { phase: '03', title: 'Strategy Formulation', time: '~3 hours' },
                { phase: '04', title: 'Solution Architecture', time: '~2 hours' },
                { phase: '05', title: 'Value Quantification', time: '~2 hours' },
                { phase: '06', title: 'Content Development', time: '~6 hours' },
                { phase: '07', title: 'Quality Assurance', time: '~3 hours' },
                { phase: '08', title: 'Executive Review', time: '~3 hours' },
                { phase: '09', title: 'Final Delivery', time: '~1 hour' },
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
                <span className="text-[#d4a853] font-bold text-xl">~24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          QUALITY ASSURANCE SECTION
          ============================================ */}
      <section className="bg-white section-lg border-t border-slate-100">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Quality You Can Trust</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Every Proposal Passes 9 Quality Gates
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              We read the RFP like we&apos;re the ones bidding on it. Because that&apos;s what it takes to win.
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
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">
                Zero AI Fingerprints
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Your proposals will never contain telltale AI phrases like &quot;Here is the section...&quot; or &quot;Word count: 1,500.&quot;
                Our 3-layer defense system ensures evaluators see pure, professional content.
              </p>
              <div className="text-xs text-slate-500">
                100% artifact-free guarantee
              </div>
            </div>

            {/* 100-Point Quality Rubric */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/30 transition-all">
              <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">
                Every Section Scored
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Each section passes our 100-point quality rubric covering word count accuracy,
                professional tone, win theme integration, and grammar. Only content scoring 75+ makes it into your proposal.
              </p>
              <div className="text-xs text-slate-500">
                Average section score: 87/100
              </div>
            </div>

            {/* 9-Point Validation */}
            <div className="bg-slate-50 p-8 border border-slate-200 hover:border-[#d4a853]/30 transition-all">
              <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-3">
                9-Point Compliance Check
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Before delivery, your proposal passes 9 automated checks: section completeness,
                evaluation criteria coverage, mandatory requirements, win theme consistency, and zero placeholders.
              </p>
              <div className="text-xs text-slate-500">
                296 proposals delivered successfully.
              </div>
            </div>
          </div>

          {/* Quality Details Expandable */}
          <div className="max-w-4xl mx-auto bg-[#0f172a] p-8 text-white">
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
            <h2 className="display-lg text-[#0f172a] mb-4">
              Powered by Intelligence
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Cutting-edge AI combined with domain expertise delivers unmatched results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced AI Analysis',
                description: 'Rapid content analysis powered by state-of-the-art language models trained on thousands of winning proposals.',
                icon: '01',
              },
              {
                title: 'Proprietary Scoring',
                description: 'Automated algorithms validate proposal strength and win probability based on 500+ historical proposals.',
                icon: '02',
              },
              {
                title: 'Compliance Checking',
                description: 'Real-time validation against RFP requirements ensures every mandatory section is addressed.',
                icon: '03',
              },
              {
                title: 'Expert Review',
                description: 'Human oversight from seasoned consultants ensures strategic alignment and polish.',
                icon: '04',
              },
              {
                title: 'ROI Modeling',
                description: 'Quantitative value propositions backed by data-driven ROI calculations.',
                icon: '05',
              },
              {
                title: 'Multi-Format Export',
                description: 'Deliver in Word, PDF, or custom formats matching your submission requirements.',
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
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Match Your RFP to the Right AI</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              Pick the AI That Fits Your RFP
            </h2>
            <p className="text-body-lg text-slate-600 max-w-3xl mx-auto">
              Different RFPs need different approaches. A government compliance bid requires precision.
              A creative pitch needs storytelling. A technical proposal demands data depth.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* The Strategist */}
            <div className="bg-slate-50 border border-slate-200 hover:border-blue-500/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">The Strategist</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Structure. Compliance. Authority.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Your proposal will follow a bulletproof structure that government evaluators love.
                  Every requirement addressed. Every compliance box checked. Zero ambiguity.
                </p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Government and public sector RFPs
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Highly regulated industries
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    RFPs with strict compliance checklists
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">
                  Choose this if your RFP has formal scoring rubrics
                </div>
              </div>
            </div>

            {/* The Storyteller */}
            <div className="bg-slate-50 border border-slate-200 hover:border-[#d4a853]/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">The Storyteller</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Persuasion. Emotion. Memorability.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Facts tell, but stories sell. This AI crafts proposals that connect emotionally and
                  stick in evaluators&apos; minds. Your solution becomes the hero of a narrative.
                </p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Marketing and creative agency pitches
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Partnership and sponsorship proposals
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    When you are NOT the lowest bidder
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">
                  Choose this if relationship and fit matter most
                </div>
              </div>
            </div>

            {/* The Analyst */}
            <div className="bg-slate-50 border border-slate-200 hover:border-blue-400/50 transition-all card-lift overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">The Analyst</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Depth. Precision. Data.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When your RFP involves complex technical specifications or deep subject matter expertise,
                  this AI dives deep, pulls relevant research, and backs every claim with evidence.
                </p>
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-4">Perfect For</h4>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    IT, engineering, and technology RFPs
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Research and scientific proposals
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Data-heavy consulting engagements
                  </li>
                </ul>
                <div className="text-xs text-slate-500 italic">
                  Choose this if technical depth wins
                </div>
              </div>
            </div>
          </div>

          {/* Decision Helper */}
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 p-8 mb-16">
            <h4 className="text-lg font-semibold text-[#0f172a] mb-6 text-center">
              Not Sure Which to Pick?
            </h4>
            <p className="text-slate-600 text-center mb-8">
              Ask yourself: &quot;What will make evaluators say YES to my proposal?&quot;
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">
                  &quot;We need to prove we meet every single requirement.&quot;
                </p>
                <p className="font-bold text-[#0f172a]">→ The Strategist</p>
              </div>
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">
                  &quot;We need to stand out and be memorable.&quot;
                </p>
                <p className="font-bold text-[#0f172a]">→ The Storyteller</p>
              </div>
              <div className="text-center p-4 bg-white border border-slate-200">
                <p className="text-slate-600 mb-3 italic">
                  &quot;We need to demonstrate deep technical expertise.&quot;
                </p>
                <p className="font-bold text-[#0f172a]">→ The Analyst</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm text-center mt-6">
              Still unsure? All three AIs produce professional, submission-ready proposals.
              The difference is emphasis, not quality.
            </p>
          </div>

          {/* Premium Intelligence */}
          <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1">
                  <span className="inline-block bg-[#d4a853] text-[#0f172a] text-xs font-bold px-3 py-1 mb-6">
                    MAXIMUM WIN PROBABILITY
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Why Choose One When You Can Have All Three?
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    For high-stakes RFPs where losing is not an option, Premium Intelligence runs your proposal
                    through ALL THREE AI engines simultaneously. The result? A unified proposal combining compliance rigor,
                    persuasive power, and technical depth.
                  </p>
                  <div className="bg-white/5 border border-slate-700 p-4 mb-6">
                    <p className="text-white font-semibold mb-2">The Math That Matters:</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-400">Standard: 1 AI = Good</span>
                      <span className="text-slate-600">vs</span>
                      <span className="text-[#d4a853] font-bold">Premium: 3 AIs = 40% higher win rate</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300 mb-8">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      All 3 AI engines analyze your RFP
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Best responses automatically combined
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Priority expert review
                    </li>
                  </ul>
                </div>
                <div className="lg:w-80">
                  <div className="bg-white p-8 text-center">
                    <p className="text-sm text-slate-500 font-semibold mb-2">Add to any proposal</p>
                    <div className="text-5xl font-bold text-[#0f172a] mb-2">+$499</div>
                    <p className="text-slate-500 text-sm mb-6">per proposal</p>
                    <Link
                      href="/signup"
                      className="block w-full bg-[#d4a853] hover:bg-[#e4be6a] text-[#0f172a] py-4 font-semibold transition-colors mb-4"
                    >
                      Add Premium Intelligence
                    </Link>
                    <p className="text-xs text-slate-500">
                      Recommended for RFPs valued over $500K
                    </p>
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
      <section className="bg-white section-lg">
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
            {/* Case Study 1: Deadline Crisis */}
            <div className="bg-slate-50 p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#d4a853] font-bold">Deadline Crisis</div>
              </div>
              <blockquote className="text-slate-900 mb-6 leading-relaxed">
                &quot;RFP came in Friday at 3pm. Deadline Monday 9am. Our consultant couldn&apos;t help on that timeline.
                V39 delivered a complete proposal by Sunday evening - well before our deadline. We won the $850K contract.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Partner</div>
                <div className="text-sm text-slate-500 mb-3">Consulting Firm</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Contract: $850K</span>
                  <span>Delivery: 24hr</span>
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
                &quot;We used to pay consultants $8K-$12K per proposal. 15 RFPs cost us $135,000 in 2023.
                This year with V39 Professional plan: 18 proposals for $17,982 total. Quality is better, delivery is faster.
                We saved $117,000.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Business Development Director</div>
                <div className="text-sm text-slate-500 mb-3">Engineering Firm</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Professional Tier</span>
                  <span>Saved: $117K</span>
                </div>
              </div>
            </div>

            {/* Case Study 3: Quality Skeptic */}
            <div className="bg-slate-50 p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#d4a853]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#d4a853] font-bold">Quality Proven</div>
              </div>
              <blockquote className="text-slate-900 mb-6 leading-relaxed">
                &quot;I didn&apos;t believe AI could match our senior consultants. Then I compared V39&apos;s proposal
                side-by-side with our $15K consultant draft. V39 was MORE detailed, better structured,
                and caught 3 requirements our consultant missed. I&apos;m a believer.&quot;
              </blockquote>
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">Managing Director</div>
                <div className="text-sm text-slate-500 mb-3">Strategy Consulting Firm</div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Now: Annual Subscriber</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT YOU RECEIVE - DELIVERABLES
          ============================================ */}
      <section className="bg-slate-50 section-lg">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="text-mono text-[#d4a853] text-sm mb-4 block">Complete Package</span>
            <h2 className="display-lg text-[#0f172a] mb-4">
              You Don&apos;t Just Get a Proposal
            </h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Every V39 delivery includes comprehensive documentation, quality reports, and strategic insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Final Proposal',
                description: 'Professional Word document, submission-ready with proper formatting, headers, and table of contents.',
                icon: '01',
              },
              {
                title: 'RFP Intelligence Summary',
                description: 'Complete analysis of all requirements, evaluation criteria, mandatory items, and strategic priorities.',
                icon: '02',
              },
              {
                title: 'Quality Scorecard',
                description: 'Each section scored 0-100 across 7 quality dimensions. See exactly how your proposal performed.',
                icon: '03',
              },
              {
                title: 'Validation Report',
                description: '9-point compliance check results with proof that every requirement was addressed and verified.',
                icon: '04',
              },
              {
                title: 'Compliance Matrix',
                description: 'Professional spreadsheet mapping every RFP requirement to the exact proposal section that addresses it.',
                icon: '05',
              },
              {
                title: 'Strategic Insights',
                description: 'Win themes identified, competitive positioning recommendations, and scoring optimization guidance.',
                icon: '06',
              },
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
            <h4 className="text-xl font-semibold text-[#0f172a] mb-4">
              Complete Transparency. Full Audit Trail.
            </h4>
            <p className="text-slate-600 leading-relaxed mb-6">
              You can audit every decision we made. See exactly why we chose certain win themes,
              how we optimized for evaluation criteria, and which requirements we prioritized.
              No black boxes. Just clear, documented strategy.
            </p>
            <div className="text-sm text-slate-500">
              All deliverables included in every subscription tier
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ / OBJECTION HANDLING
          ============================================ */}
      <section className="bg-slate-50 section-md">
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
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                How can you deliver consultant quality starting at $599/month?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Traditional consultants spend 60+ hours manually drafting proposals. We use AI to handle 40 hours
                of repetitive work (research, initial drafting, compliance checking), then our expert consultants
                review and enhance everything. Same quality, faster delivery, 90% less cost. You get
                the strategic expertise that matters—without paying for manual data entry.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                Won&apos;t evaluators know it&apos;s AI-generated?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                No - because it&apos;s NOT just AI. Every proposal is reviewed and enhanced by our consulting partner
                (20+ years experience). AI handles the grunt work; our experts add strategic positioning,
                win themes, and industry insights that AI can&apos;t provide. The result is indistinguishable from
                pure consultant work - because it includes real consultant expertise.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-emerald-600">Our 82% win rate proves it works.</span>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                What if I need revisions?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                One round of minor revisions is included at no additional charge. Typical revisions
                (timeline adjustments, adding credentials, tweaking 2-3 sections) are handled within 24 hours.
                95% of clients approve as-is or with minor tweaks. Major rewrites can be quoted separately
                based on scope.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                How do you ensure my confidential RFP data is secure?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We use bank-level AES-256 encryption for all documents. Every project is covered by automatic NDA.
                We&apos;re SOC 2 Type II certified with annual third-party security audits. Your files are permanently
                deleted 30 days after delivery (unless you opt-in to save them). Enterprise-grade security for global compliance.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                How do I choose the right AI for my RFP?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Think about what will make evaluators say yes. Government contracts with compliance checklists? Choose The Strategist.
                Marketing pitch where you need to stand out? Choose The Storyteller. Technical bid requiring deep expertise? Choose The Analyst.
                All three produce professional proposals - the difference is emphasis. Still unsure? Any choice works, or upgrade to Premium Intelligence
                and get all three working together.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                What does &quot;9-point validation&quot; actually check?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Before you receive your proposal, it passes 9 automated quality gates: section completeness (100% match to plan),
                word count compliance, evaluation criteria coverage (all addressed 2+ times), win theme consistency (integrated across 5+ sections),
                compliance matrix verification, placeholder detection (zero [INSERT] or [TODO] remaining), mandatory requirements coverage (100%),
                visual placeholders specified, and AI artifact detection (zero telltale language).
                We&apos;ve delivered 296 proposals with 100% quality compliance.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/faq" className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#d4a853] font-medium transition-colors">
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
      <section className="relative bg-[#0f172a] section-lg overflow-hidden">
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
            <span className="text-mono text-[#d4a853] text-sm mb-6 block">Stop Overpaying. Start Winning.</span>
            <h2 className="display-xl text-white mb-6">
              Every Day You Wait Is Another<br />
              <span className="gold-text">Contract Your Competitors Could Win</span>
            </h2>
            <p className="text-body-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              The firms winning more RFPs aren&apos;t working harder - they&apos;re working smarter.
              Join 100+ businesses who chose speed, quality, and savings with V39.
            </p>

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
                  <span>Upload your RFP document (2 minutes)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">3.</span>
                  <span>We analyze requirements and begin work (5 minutes)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">4.</span>
                  <span>You receive your complete, submission-ready proposal (24 hours)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a853] font-bold mt-0.5">5.</span>
                  <span>You submit and win with 82% probability</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/signup"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] px-10 py-5 text-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,168,83,0.3)]"
              >
                Get Your Proposal Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-white text-white px-10 py-5 text-lg font-medium transition-all duration-300"
              >
                Book Free Consultation
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
    </main>
  )
}
