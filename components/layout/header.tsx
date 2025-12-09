"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { MobileNav } from "./mobile-nav"
import { mainNav } from "@/data/navigation"

interface HeaderProps {
  transparent?: boolean
}

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("")
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const ids = [
      "services",
      "packages",
      "advisory",
      "faq",
      "selection",
      "capabilities",
      "case-studies",
      "deliverables",
      "cta",
    ]
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const forceSolid = pathname?.startsWith('/blog')
  const showBackground = isScrolled || !transparent || forceSolid

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          showBackground
            ? "bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        )}
      >
        <div className="container-xl">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Logo variant="light" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-8">
              {mainNav.map((item) => {
                const isAnchor = item.href.startsWith("/#")
                const id = isAnchor ? item.href.split("#")[1] : ""
                const isActive = isAnchor ? activeSection === id : pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (isAnchor && pathname === "/") {
                        e.preventDefault()
                        const el = document.getElementById(id)
                        el?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    }}
                    className={cn(
                      "relative text-sm font-medium transition-colors",
                      isActive ? "text-white" : "text-slate-300 hover:text-white",
                      "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#d4a853] after:transition-all after:duration-300",
                      isActive ? "after:w-full" : "hover:after:w-full"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Link
                href="tel:+64272423432"
                className="btn-glow inline-flex items-center justify-center bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] px-5 py-2.5 text-sm font-semibold transition-all duration-300"
              >
                +64 27 242 3432
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
