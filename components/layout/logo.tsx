import Link from "next/link"
import Image from "next/image"
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
        "flex items-center transition-opacity hover:opacity-80",
        className
      )}
    >
      {/* Logo Image only, larger and crisp, proportional to toolbar */}
      <div className="relative h-20 w-20 lg:h-[180px] lg:w-[180px]">
        <Image
          src="/logo.png"
          alt="My Tax Accounting"
          fill
          sizes="(min-width: 1024px) 180px, 80px"
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}
