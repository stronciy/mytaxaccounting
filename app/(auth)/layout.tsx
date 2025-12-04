import Link from "next/link"
import { Logo } from "@/components/layout"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {children}
      </div>
      <div className="mt-8 flex gap-6 text-sm text-gray-500">
        <Link href="/privacy" className="hover:text-gray-900">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-gray-900">
          Terms
        </Link>
        <Link href="/contact" className="hover:text-gray-900">
          Support
        </Link>
      </div>
    </div>
  )
}
