export interface NavItem {
  label: string
  href: string
}

export interface FooterNavSection {
  title: string
  links: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
]

export const footerNav: Record<string, FooterNavSection> = {
  product: {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
}
