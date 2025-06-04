import React, { forwardRef, ComponentProps } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowRight, Zap } from 'lucide-react';

interface CtaButtonProps extends Omit<ComponentProps<'a'>, 'children' | 'href' | 'className' | 'ref'> {
  children: React.ReactNode;
  href: string;
  variant?: 'regular' | 'small' | 'urgent';
  className?: string;
  // Removed [key: string]: any; // Allow for other props (e.g., aria-label)
}

const CtaButton = forwardRef<HTMLAnchorElement, CtaButtonProps>(
  ({
    children,
    href,
    variant = 'regular',
    className,
    ...restProps
  }, ref) => {
    const baseClasses = twMerge(
      clsx(
        'group',
        'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 ease-out shadow-md',
        'bg-brand-safetyOrange text-brand-brandCream border-2 border-orange-200',
        'hover:bg-brand-safetyOrangeDarker hover:border-yellow-500 hover:text-brand-pureWhite',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-safetyOrange/80 dark:focus:ring-brand-safetyOrange',
        variant === 'regular' && 'py-4 px-6 text-base gap-2',
        variant === 'small' && 'py-2 px-4 text-sm gap-1.5',
        variant === 'urgent' && [
          'py-4 px-6 text-base gap-2',
          'ring-2 ring-red-500 ring-offset-2',
          'hover:ring-red-600 hover:ring-offset-2',
          'focus:ring-red-500 focus:ring-offset-4',
          'animate-subtle-glow hover:animate-none'
        ],
        className
      )
    );

    const iconSize = variant === 'small' ? 18 : 22;

    return (
      <Link 
        href={href} 
        className={baseClasses} 
        ref={ref} 
        {...restProps}
      >
          <Zap aria-hidden="true" size={iconSize} className="mr-1" />
          <span>{children}</span>
          <ArrowRight aria-hidden="true" size={iconSize} className="ml-1 group-hover:animate-arrow-move" />
      </Link>
    );
  }
);

CtaButton.displayName = 'CtaButton';

export default CtaButton; 