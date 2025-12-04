'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PricingToggle } from './pricing-toggle';

interface Feature {
  name: string;
  included: boolean;
}

interface Tier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  popular: boolean;
  features: Feature[];
  cta: string;
  additionalProposalPrice: number | null;
}

interface PricingCardsProps {
  tiers: Tier[];
}

export function PricingCards({ tiers }: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <PricingToggle onToggle={setIsAnnual} />

      <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-900/10 ${
              tier.popular ? 'ring-2 ring-blue-600' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{tier.description}</p>

              <div className="mt-6">
                {tier.monthlyPrice !== null ? (
                  <>
                    <div className="flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        $
                        {isAnnual
                          ? tier.annualPrice?.toLocaleString()
                          : tier.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">
                        /month
                      </span>
                    </div>
                    {isAnnual && (
                      <p className="mt-1 text-sm text-gray-600">
                        Billed annually at $
                        {((tier.annualPrice || 0) * 12).toLocaleString()}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-5xl font-bold tracking-tight text-gray-900">
                    Custom
                  </div>
                )}
              </div>

              {tier.additionalProposalPrice && (
                <p className="mt-4 text-sm text-gray-600">
                  Additional proposals: ${tier.additionalProposalPrice} each
                </p>
              )}

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-x-3">
                    {feature.included ? (
                      <svg
                        className="h-6 w-5 flex-none text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-5 flex-none text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    )}
                    <span
                      className={`text-sm leading-6 ${
                        feature.included ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={tier.id === 'enterprise' ? '/contact' : '/contact'}
              className={`mt-8 block rounded-lg px-8 py-3 text-center text-sm font-semibold shadow-sm transition-colors ${
                tier.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-white text-blue-600 ring-1 ring-inset ring-blue-200 hover:bg-blue-50'
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
