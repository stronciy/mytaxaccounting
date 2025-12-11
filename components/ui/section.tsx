import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "white" | "gray" | "dark" | "primary"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background = "white", ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "py-16 md:py-24",
        {
          "bg-white text-gray-900": background === "white",
          "bg-gray-50 text-gray-900": background === "gray",
          "bg-[#006400] text-white": background === "dark",
          "bg-[#0066CC] text-white": background === "primary",
        },
        className
      )}
      {...props}
    />
  )
)
Section.displayName = "Section"

export { Section }
