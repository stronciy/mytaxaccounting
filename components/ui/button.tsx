import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "accent"
  size?: "sm" | "default" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#0066CC] text-white hover:bg-[#004499] focus-visible:ring-[#0066CC]":
              variant === "default",
            "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-400":
              variant === "secondary",
            "border border-[#0066CC] text-[#0066CC] bg-transparent hover:bg-[#0066CC] hover:text-white focus-visible:ring-[#0066CC]":
              variant === "outline",
            "text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400":
              variant === "ghost",
            "bg-[#FF9900] text-white hover:bg-[#CC7A00] focus-visible:ring-[#FF9900]":
              variant === "accent",
          },
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "default",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
