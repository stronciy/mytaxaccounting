"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { mainNav } from "@/data/navigation"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#0f172a] shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <Logo variant="light" />
            <button
              type="button"
              className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-2">
              {mainNav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 py-4 border-b border-slate-800 text-lg font-medium text-white hover:text-[#d4a853] transition-colors"
                    onClick={onClose}
                  >
                    <span className="text-mono text-[#d4a853] text-xs">
                      0{index + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="border-t border-slate-800 px-6 py-8 space-y-4">
            <Link
              href="/login"
              className="block w-full py-3 text-center text-white border border-slate-600 hover:border-[#d4a853] transition-colors"
              onClick={onClose}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block w-full py-3 text-center bg-[#d4a853] hover:bg-[#e4be6a] text-[#0a0f1a] font-semibold transition-colors"
              onClick={onClose}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
