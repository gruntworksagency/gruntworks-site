import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  // Add any other specific props if needed
}

const CtaButton: React.FC<CtaButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          'bg-brand-safetyOrange hover:bg-brand-safetyOrangeDarker text-brand-brandCream font-semibold py-3 px-8 rounded-lg shadow-inner-md transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-safetyOrange focus:ring-opacity-50',
          // Example of an inset shadow: shadow-inner-md (ensure this is defined in tailwind.config.js if custom)
          // Or use a predefined Tailwind inset shadow: shadow-inner
          // The global UI system asks for "inset shadow". I've used 'shadow-inner-md' assuming it's defined or similar to the 'inner-md' I added to the config.
          // If not, it might default to a standard shadow or no shadow if the class isn't recognized.
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CtaButton; 