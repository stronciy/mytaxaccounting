'use client';

import { useState } from 'react';

interface PricingToggleProps {
  onToggle: (isAnnual: boolean) => void;
}

export function PricingToggle({ onToggle }: PricingToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggle(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Monthly
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
          isAnnual ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isAnnual ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors ${
          isAnnual ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Annual
        <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
          Save 17%
        </span>
      </span>
    </div>
  );
}
