export interface NavItem {
  label: string
  href: string
}

export interface FooterNavSection {
  title: string
  links: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Fixed Fee Packages", href: "/#packages" },
  { label: "Add-ons", href: "/#advisory" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
]

export const footerNav: Record<string, FooterNavSection> = {
  product: {
    title: "Product",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Fixed Fee Packages", href: "/#packages" },
      { label: "Add-ons", href: "/#advisory" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
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
