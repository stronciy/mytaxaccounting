import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "light" | "dark"
  className?: string
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-opacity hover:opacity-80",
        className
      )}
    >
      {/* Logo Mark */}
      <div className="relative">
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center font-bold text-lg",
            variant === "dark"
              ? "bg-[#0f172a] text-white"
              : "bg-[#d4a853] text-[#0a0f1a]"
          )}
        >
          V39
        </div>
        {/* Gold accent corner */}
        <div
          className={cn(
            "absolute -top-0.5 -right-0.5 w-2 h-2",
            variant === "dark" ? "bg-[#d4a853]" : "bg-white"
          )}
        />
      </div>

      {/* Wordmark */}
      <div className="hidden sm:block">
        <span
          className={cn(
            "text-xs uppercase tracking-[0.2em] font-medium",
            variant === "dark" ? "text-slate-500" : "text-slate-400"
          )}
        >
          Consultancy
        </span>
      </div>
    </Link>
  )
}
