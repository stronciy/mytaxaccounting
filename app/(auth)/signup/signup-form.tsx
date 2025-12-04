"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement signup logic with authentication provider
  }

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth signup
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase and lowercase", met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { text: "Contains a number", met: /\d/.test(formData.password) },
  ]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="John Smith"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          label="Company Name"
          type="text"
          name="companyName"
          placeholder="Acme Inc."
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div>
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formData.password && (
            <div className="mt-2 space-y-1">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      req.met ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span className={req.met ? "text-green-700" : "text-gray-500"}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-[#0066CC] hover:text-[#004499]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-[#0066CC] hover:text-[#004499]">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          variant="accent"
          className="w-full"
          size="lg"
          disabled={!formData.agreeToTerms}
        >
          Create Account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        size="lg"
        onClick={handleGoogleSignup}
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#0066CC] hover:text-[#004499]"
        >
          Log in
        </Link>
      </div>
    </div>
  )
}
