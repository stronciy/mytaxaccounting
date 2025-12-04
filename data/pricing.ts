export interface PricingTier {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  proposals: number
  overagePrice?: number
  popular?: boolean
  features: string[]
  cta: string
}

export interface PayAsYouGo {
  id: string
  name: string
  price: number
  pricePerProposal: number
  savings?: string
  proposals: number
}

export const subscriptionTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for occasional RFP responses",
    monthlyPrice: 599,
    annualPrice: 499,
    proposals: 1,
    overagePrice: 650,
    features: [
      "1 proposal per month",
      "5-hour standard delivery",
      "9-point quality validation",
      "English OR Arabic",
      "Email support (24-48h)",
      "1 revision per proposal",
    ],
    cta: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses with regular RFPs",
    monthlyPrice: 1299,
    annualPrice: 1099,
    proposals: 3,
    overagePrice: 600,
    popular: true,
    features: [
      "3 proposals per month",
      "Everything in Starter",
      "Priority email support (24h)",
      "Monthly usage report",
      "2 revisions per proposal",
    ],
    cta: "Get Started",
  },
  {
    id: "business",
    name: "Business",
    description: "For teams with high proposal volume",
    monthlyPrice: 2499,
    annualPrice: 2099,
    proposals: 8,
    overagePrice: 500,
    features: [
      "8 proposals per month",
      "Everything in Professional",
      "Dedicated account manager",
      "2 free Premium Intelligence",
      "Bilingual (EN + AR) included",
      "Unlimited revisions",
    ],
    cta: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: 0,
    annualPrice: 0,
    proposals: -1,
    features: [
      "Unlimited proposals",
      "Custom SLA",
      "API access",
      "White-label option",
      "Dedicated team",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
]

export const payAsYouGo: PayAsYouGo[] = [
  {
    id: "single",
    name: "Single Proposal",
    price: 799,
    pricePerProposal: 799,
    proposals: 1,
  },
  {
    id: "pack-3",
    name: "3-Pack",
    price: 1997,
    pricePerProposal: 666,
    savings: "17%",
    proposals: 3,
  },
  {
    id: "pack-10",
    name: "10-Pack",
    price: 5990,
    pricePerProposal: 599,
    savings: "25%",
    proposals: 10,
  },
]

export const faqItems = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period. No hidden fees or cancellation penalties.",
  },
  {
    question: "What happens if I need more proposals than my plan includes?",
    answer: "You can purchase additional proposals at the overage rate for your plan, or upgrade to a higher tier. Business plan customers get the best overage rates at $500/proposal.",
  },
  {
    question: "Do unused proposals roll over?",
    answer: "Unused proposals do not roll over to the next month. We recommend choosing a plan that matches your typical monthly volume, or using pay-as-you-go for irregular needs.",
  },
  {
    question: "What's included in the Premium Intelligence add-on?",
    answer: "Premium Intelligence ($499) runs your RFP through all three AI engines (Claude, GPT-4, Gemini), then combines the best elements from each for a superior result. It includes unlimited regenerations for that proposal.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! If we miss any requirement from your RFP, you get a full refund. We've never had to pay out because our 9-point validation ensures 100% requirement coverage.",
  },
  {
    question: "Can I try before I subscribe?",
    answer: "We offer a free consultation where we review your RFP and provide a detailed scope assessment. For your first proposal, we recommend the pay-as-you-go single proposal option to experience our quality firsthand.",
  },
  {
    question: "How does billing work for annual plans?",
    answer: "Annual plans are billed upfront for the full year at a 17% discount. You get all 12 months of proposals immediately available. No monthly billing hassle.",
  },
]
