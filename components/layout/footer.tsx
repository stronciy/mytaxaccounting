import Link from "next/link"
import { Logo } from "./logo"
import { footerNav } from "@/data/navigation"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0f1a] text-slate-400">
      {/* Main Footer */}
      <div className="container-lg">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 text-sm leading-relaxed max-w-sm">
              Fixed-fee accounting for SMEs: annual accounts, GST, payroll, and tax returns.
              Accurate compliance and clear reporting—so you can focus on growth.
            </p>
            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-slate-700 hover:border-[#d4a853] hover:text-[#d4a853] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-slate-700 hover:border-[#d4a853] hover:text-[#d4a853] transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.values(footerNav).map((section) => (
            <div key={section.title}>
              <h3 className="text-mono text-[#d4a853] text-xs tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-600">
              &copy; {currentYear} My Tax Accounting. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                All Systems Operational
              </span>
              <span>Globally Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
