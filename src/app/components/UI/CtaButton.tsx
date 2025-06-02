import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the MotionLink component to avoid client boundary issues
const MotionLink = dynamic(
  () => import('../UI/MotionLink').then(mod => mod.default),
  { ssr: false }
);

interface CtaButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'link' | 'motion.a';
  href?: string;
  variant?: 'primary' | 'secondary';
  // Animation props for motion.a variant
  whileHover?: object;
  whileTap?: object;
  transition?: object;
  // Standard HTML attributes
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-describedby'?: string;
  id?: string;
  [key: string]: any; // Allow for other props to be passed through
}

const CtaButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, CtaButtonProps>(({
  children,
  className,
  as = 'button',
  href = '#',
  variant = 'primary',
  whileHover,
  whileTap,
  transition,
  ...restProps
}, ref) => {
  // Base classes for all button variants
  const baseClasses = twMerge(
    clsx(
      'font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-safetyOrange focus:ring-opacity-50 inline-flex items-center justify-center',
      // Primary variant styling
      variant === 'primary' && 'bg-brand-safetyOrange hover:bg-brand-safetyOrangeDarker text-brand-brandCream shadow-inner-md',
      // Add support for secondary variant if needed in the future
      variant === 'secondary' && 'bg-transparent border border-brand-safetyOrange text-brand-safetyOrange hover:bg-brand-safetyOrange/10',
      className
    )
  );

  // Render as regular button (default)
  if (as === 'button') {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        type={restProps.type || 'button'}
        {...restProps}
      >
        {children}
      </button>
    );
  }

  // Render as Next.js Link
  if (as === 'link') {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  // Render as Framer Motion motion.a
  if (as === 'motion.a') {
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        whileHover={whileHover || { transform: 'translateY(-2px)' }}
        whileTap={whileTap || { scale: 0.97, transform: 'translateY(-1px)' }}
        transition={transition || { duration: 0.15 }}
        {...restProps}
      >
        {children}
      </MotionLink>
    );
  }

  // Fallback to button if invalid 'as' prop
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses}
      type={restProps.type || 'button'}
      {...restProps}
    >
      {children}
    </button>
  );
});

CtaButton.displayName = 'CtaButton';

export default CtaButton; 